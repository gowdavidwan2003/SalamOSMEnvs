const { supabase } = require('../../lib/db');
const { getCurrentUser } = require('../../lib/auth');

function sendJson(res, statusCode, payload) {
  return res.status(statusCode).json(payload);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  if (!supabase) {
    return sendJson(res, 500, { error: 'Supabase is not configured.' });
  }

  try {
    const user = await getCurrentUser(req);
    if (!user) {
      return sendJson(res, 401, { error: 'Not authenticated.' });
    }

    return sendJson(res, 200, { user });
  } catch (error) {
    console.error('Me API error:', error);
    return sendJson(res, 500, { error: 'Failed to fetch current user.' });
  }
};