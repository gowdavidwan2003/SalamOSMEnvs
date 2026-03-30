const { supabase } = require('../../lib/db');
const { requireApprovedUser } = require('../../lib/auth');

const ALLOWED_GROUPS = new Set(['PROD', 'UAT', 'SIT', 'ST', 'MIG', 'DEV']);

function sendJson(res, statusCode, payload) {
  return res.status(statusCode).json(payload);
}

function normalizeText(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : null;
}

function normalizeObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : null;
}

function validatePayload(payload = {}) {
  const normalizedPayload = {
    name: normalizeText(payload.name),
    dev_name: normalizeText(payload.dev_name),
    group_name: normalizeText(payload.group_name)?.toUpperCase() || null,
    notes: normalizeText(payload.notes),
    server_host: normalizeText(payload.server_host),
    server_user: normalizeText(payload.server_user),
    server_password: normalizeText(payload.server_password),
    com_data: normalizeObject(payload.com_data),
    som_data: normalizeObject(payload.som_data),
    host_entries: normalizeText(payload.host_entries),
    other_info: normalizeText(payload.other_info),
    updated_at: new Date().toISOString(),
  };

  const validationErrors = [];

  if (!normalizedPayload.name) {
    validationErrors.push('Name is required.');
  }

  if (!normalizedPayload.group_name) {
    validationErrors.push('Group is required.');
  } else if (!ALLOWED_GROUPS.has(normalizedPayload.group_name)) {
    validationErrors.push(`Group must be one of: ${Array.from(ALLOWED_GROUPS).join(', ' )}.`);
  }

  return { normalizedPayload, validationErrors };
}

module.exports = async function handler(req, res) {
  if (!supabase) {
    return sendJson(res, 500, { error: 'Supabase is not configured.' });
  }

  const currentUser = await requireApprovedUser(req, res);
  if (!currentUser) return;

  const id = req.query?.id || req.params?.id;

  if (!id) {
    return sendJson(res, 400, { error: 'Environment id is required.' });
  }

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('environments')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return sendJson(res, 404, { error: 'Environment not found.' });
        }
        throw error;
      }

      return sendJson(res, 200, data);
    }

    if (req.method === 'PUT') {
      const { normalizedPayload, validationErrors } = validatePayload(req.body);
      if (validationErrors.length > 0) {
        return sendJson(res, 400, { error: validationErrors.join(' ' ) });
      }

      const { data, error } = await supabase
        .from('environments')
        .update(normalizedPayload)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return sendJson(res, 404, { error: 'Environment not found.' });
        }
        throw error;
      }

      return sendJson(res, 200, data);
    }

    if (req.method === 'DELETE') {
      const { error } = await supabase
        .from('environments')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return res.status(204).end();
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return sendJson(res, 405, { error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error('Environment item API error:', error);
    return sendJson(res, 500, { error: 'Failed to process environment request.' });
  }
};
