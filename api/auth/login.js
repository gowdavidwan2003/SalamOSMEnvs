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

  try {
    const email = normalizeText(req.body?.email)?.toLowerCase();
    const password = normalizeText(req.body?.password);

    if (!email || !password) {
      return sendJson(res, 400, { error: 'Email and password are required.' });
    }

    const { data: user, error } = await supabase
      .from('app_users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) throw error;
    if (!user || user.password_hash !== hashValue(password)) {
      return sendJson(res, 401, { error: 'Invalid credentials.' });
    }

    if (user.status !== 'approved') {
      return sendJson(res, 403, { error: 'Your account is awaiting admin approval.' });
    }

    const rawToken = crypto.randomBytes(32).toString('hex');
    const token_hash = hashValue(rawToken);
    const expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    const { error: sessionError } = await supabase
      .from('app_sessions')
      .insert([{ user_id: user.id, token_hash, expires_at }]);

    if (sessionError) throw sessionError;

    res.setHeader('Set-Cookie', `env_nav_session=${rawToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800; Secure`);
    return sendJson(res, 200, {
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.error('Login API error:', error);
    return sendJson(res, 500, { error: 'Failed to login.' });
  }
};