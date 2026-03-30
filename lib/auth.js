const crypto = require('crypto');
const { supabase } = require('./db');

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
  if (!supabase) return null;

  const cookies = parseCookies(req.headers?.cookie || '');
  const sessionToken = cookies.env_nav_session;
  if (!sessionToken) return null;

  const token_hash = hashValue(sessionToken);
  const { data: session, error } = await supabase
    .from('app_sessions')
    .select('expires_at,user_id,app_users(id,email,full_name,role,status)')
    .eq('token_hash', token_hash)
    .maybeSingle();

  if (error || !session) return null;
  if (session.expires_at < new Date().toISOString()) return null;
  return session.app_users;
}

async function requireApprovedUser(req, res) {
  const user = await getCurrentUser(req);
  if (!user) {
    res.status(401).json({ error: 'Login required.' });
    return null;
  }

  if (user.status !== 'approved') {
    res.status(403).json({ error: 'Admin approval required.' });
    return null;
  }

  return user;
}

module.exports = {
  parseCookies,
  hashValue,
  getCurrentUser,
  requireApprovedUser,
};
