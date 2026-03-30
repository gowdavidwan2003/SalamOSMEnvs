const crypto = require('crypto');
const { supabase } = require('../../lib/db');
const { getCurrentUser } = require('../../lib/auth');

function sendJson(res, statusCode, payload) {
  return res.status(statusCode).json(payload);
}

function normalizeText(value) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function hashValue(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  if (!supabase) {
    return sendJson(res, 500, { error: 'Supabase is not configured.' });
  }

  const currentUser = await getCurrentUser(req);
  if (!currentUser) {
    return sendJson(res, 401, { error: 'Login required.' });
  }

  try {
    const currentPassword = normalizeText(req.body?.currentPassword);
    const newPassword = normalizeText(req.body?.newPassword);

    if (!currentPassword || !newPassword) {
      return sendJson(res, 400, { error: 'Current password and new password are required.' });
    }

    const { data: user, error } = await supabase
      .from('app_users')
      .select('id,password_hash')
      .eq('id', currentUser.id)
      .single();

    if (error) throw error;
    if (user.password_hash !== hashValue(currentPassword)) {
      return sendJson(res, 400, { error: 'Current password is incorrect.' });
    }

    const { error: updateError } = await supabase
      .from('app_users')
      .update({
        password_hash: hashValue(newPassword),
        updated_at: new Date().toISOString(),
      })
      .eq('id', currentUser.id);

    if (updateError) throw updateError;
    return sendJson(res, 200, { success: true });
  } catch (error) {
    console.error('Change password API error:', error);
    return sendJson(res, 500, { error: 'Failed to change password.' });
  }
};