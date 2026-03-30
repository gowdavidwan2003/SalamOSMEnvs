const crypto = require('crypto');
const { supabase } = require('../../lib/db');

function sendJson(res, statusCode, payload) {
  return res.status(statusCode).json(payload);
}

function normalizeText(value) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  if (!supabase) {
    return sendJson(res, 500, { error: 'Supabase is not configured.' });
  }

  try {
    const email = normalizeText(req.body?.email)?.toLowerCase();
    const password = normalizeText(req.body?.password);
    const full_name = normalizeText(req.body?.full_name);

    if (!email || !password) {
      return sendJson(res, 400, { error: 'Email and password are required.' });
    }

    const { data: existing } = await supabase
      .from('app_users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existing) {
      return sendJson(res, 409, { error: 'User already exists.' });
    }

    const { count } = await supabase
      .from('app_users')
      .select('*', { count: 'exact', head: true });

    const firstUser = !count;

    const payload = {
      email,
      password_hash: hashPassword(password),
      full_name,
      role: firstUser ? 'admin' : 'user',
      status: firstUser ? 'approved' : 'pending',
      approved_at: firstUser ? new Date().toISOString() : null,
    };

    const { data, error } = await supabase
      .from('app_users')
      .insert([payload])
      .select('id,email,full_name,role,status,approved_at,created_at')
      .single();

    if (error) throw error;
    return sendJson(res, 201, { user: data, requiresApproval: !firstUser });
  } catch (error) {
    console.error('Register API error:', error);
    return sendJson(res, 500, { error: 'Failed to register user.' });
  }
};