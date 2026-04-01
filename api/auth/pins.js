const { supabase } = require('../../lib/db');
const { requireApprovedUser } = require('../../lib/auth');

const SHARED_PINS_KEY = 'shared_pins';

function sendJson(res, statusCode, payload) {
  return res.status(statusCode).json(payload);
}

function normalizePinnedEnvIds(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => (typeof entry === 'string' ? entry.trim() : ''))
    .filter(Boolean)
    .slice(0, 8);
}

function isMissingPinnedColumnError(error) {
  const message = String(error?.message || '');
  return (
    (error?.code === '42703' || error?.code === 'PGRST204' || error?.code === 'PGRST205' || error?.code === '42P01')
    && (
      message.includes('app_settings')
      || message.includes('pinned_environment_ids')
      || message.includes('value')
    )
  );
}

function getSchemaUpdateMessage() {
  return 'Shared pinned environments require the latest auth migration SQL.';
}

module.exports = async function handler(req, res) {
  if (!supabase) {
    return sendJson(res, 500, { error: 'Supabase is not configured.' });
  }

  const currentUser = await requireApprovedUser(req, res);
  if (!currentUser) return;

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', SHARED_PINS_KEY)
        .maybeSingle();

      if (error) {
        if (isMissingPinnedColumnError(error)) {
          return sendJson(res, 200, {
            pinnedEnvIds: [],
            persistence: 'local',
            warning: getSchemaUpdateMessage(),
          });
        }

        throw error;
      }

      return sendJson(res, 200, {
        pinnedEnvIds: normalizePinnedEnvIds(data?.value),
        persistence: 'server',
        scope: 'shared',
      });
    }

    if (req.method === 'PUT') {
      const pinnedEnvIds = normalizePinnedEnvIds(req.body?.pinnedEnvIds);

      const { data, error } = await supabase
        .from('app_settings')
        .upsert({
          key: SHARED_PINS_KEY,
          value: pinnedEnvIds,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'key' })
        .select('value')
        .single();

      if (error) {
        if (isMissingPinnedColumnError(error)) {
          return sendJson(res, 409, {
            error: getSchemaUpdateMessage(),
            persistence: 'local',
          });
        }

        throw error;
      }

      return sendJson(res, 200, {
        pinnedEnvIds: normalizePinnedEnvIds(data?.value),
        persistence: 'server',
        scope: 'shared',
      });
    }

    res.setHeader('Allow', ['GET', 'PUT']);
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Pins API error:', error);
    return sendJson(res, 500, { error: 'Failed to manage pinned environments.' });
  }
};