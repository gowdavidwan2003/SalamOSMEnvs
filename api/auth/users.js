const crypto = require('crypto');
const { supabase } = require('../../lib/db');

function sendJson(res, statusCode, payload) {
  return res.status(statusCode).json(payload);
}

function parseCookies(cookieHeader = '') {
  return Object.fromEntries(
    cookieHeader
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf('=');
        return [part.slice(0, index), decodeURIComponent(part.slice(index + 1))];
      })
  );
}

function hashValue(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

async function getCurrentUser(req) {
  const cookies = parseCookies(req.headers.cookie || '');
  const sessionToken = cookies.env_nav_session;
  if (!sessionToken) return null;

  const token_hash = hashValue(sessionToken);
  const { data: session } = await supabase
    .from('app_sessions')
    .select('expires_at,user_id,app_users(id,email,full_name,role,status)')
    .eq('token_hash', token_hash)
    .maybeSingle();

  if (!session || session.expires_at < new Date().toISOString()) return null;
  return session.app_users;
}

module.exports = async function handler(req, res) {
  if (!supabase) {
    return sendJson(res, 500, { error: 'Supabase is not configured.' });
  }

  const currentUser = await getCurrentUser(req);
  if (!currentUser || currentUser.role !== 'admin') {
    return sendJson(res, 403, { error: 'Admin access required.' });
  }

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('app_users')
        .select('id,email,full_name,role,status,approved_at,created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return sendJson(res, 200, data);
    }

    if (req.method === 'PUT') {
      const userId = req.body?.id;
      const status = req.body?.status;
      const role = req.body?.role;

      if (!userId || !status) {
        return sendJson(res, 400, { error: 'User id and status are required.' });
      }

      const updatePayload = {
        status,
        role: role || 'user',
        updated_at: new Date().toISOString(),
      };

      if (status === 'approved') {
        updatePayload.approved_by = currentUser.id;
        updatePayload.approved_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('app_users')
        .update(updatePayload)
        .eq('id', userId)
        .select('id,email,full_name,role,status,approved_at,created_at')
        .single();

      if (error) throw error;
      return sendJson(res, 200, data);
    }

    res.setHeader('Allow', ['GET', 'PUT']);
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Users API error:', error);
    return sendJson(res, 500, { error: 'Failed to process users request.' });
  }
};