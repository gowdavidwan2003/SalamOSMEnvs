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

function normalizeDocumentLinks(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => {
      if (typeof entry === 'string') {
        const url = normalizeText(entry);
        return url ? { label: null, url } : null;
      }

      if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
        return null;
      }

      const label = normalizeText(entry.label);
      const url = normalizeText(entry.url);

      if (!url) {
        return null;
      }

      return { label, url };
    })
    .filter(Boolean);
}

function isMissingColumnError(error, columnName) {
  return error?.code === '42703' && String(error?.message || '').includes(`.${columnName}`);
}

function isExtendedSchemaError(error) {
  if (error?.code !== '42703') {
    return false;
  }

  const message = String(error?.message || '');
  return ['archived_at', 'env_sheet_url', 'document_links'].some((columnName) => message.includes(`.${columnName}`));
}

function withCompatibilityDefaults(row) {
  return {
    ...row,
    env_sheet_url: row?.env_sheet_url || null,
    document_links: Array.isArray(row?.document_links) ? row.document_links : [],
    archived_at: row?.archived_at || null,
  };
}

function withCompatibilityDefaultsForRows(rows = []) {
  return rows.map(withCompatibilityDefaults);
}

function getSchemaUpdateMessage() {
  return 'Database schema update required. Run the new migration SQL (supabase_feature_migration.sql) or re-run the updated supabase.sql in Supabase.';
}

function stripExtendedSchemaFields(payload = {}) {
  return {
    name: payload.name,
    dev_name: payload.dev_name,
    group_name: payload.group_name,
    notes: payload.notes,
    server_host: payload.server_host,
    server_user: payload.server_user,
    server_password: payload.server_password,
    com_data: payload.com_data,
    som_data: payload.som_data,
    host_entries: payload.host_entries,
    other_info: payload.other_info,
  };
}

function payloadUsesExtendedSchema(payload = {}) {
  return Boolean(normalizeText(payload.env_sheet_url)) || normalizeDocumentLinks(payload.document_links).length > 0;
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
    env_sheet_url: normalizeText(payload.env_sheet_url),
    document_links: normalizeDocumentLinks(payload.document_links),
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

  try {
    if (req.method === 'GET') {
      const view = String(req.query?.view || 'active').toLowerCase();
      let query = supabase
        .from('environments')
        .select('*')
        .order('group_name', { ascending: true })
        .order('name', { ascending: true });

      if (view === 'archived') {
        query = query.not('archived_at', 'is', null);
      } else if (view !== 'all') {
        query = query.is('archived_at', null);
      }

      const { data, error } = await query;

      if (error && isMissingColumnError(error, 'archived_at')) {
        const fallbackResult = await supabase
          .from('environments')
          .select('*')
          .order('group_name', { ascending: true })
          .order('name', { ascending: true });

        if (fallbackResult.error) throw fallbackResult.error;

        const compatibleRows = withCompatibilityDefaultsForRows(fallbackResult.data || []);

        if (view === 'archived') {
          return sendJson(res, 200, []);
        }

        return sendJson(res, 200, compatibleRows);
      }

      if (error) throw error;
      return sendJson(res, 200, withCompatibilityDefaultsForRows(data || []));
    }

    if (req.method === 'POST') {
      const { normalizedPayload, validationErrors } = validatePayload(req.body);
      if (validationErrors.length > 0) {
        return sendJson(res, 400, { error: validationErrors.join(' ' ) });
      }

      const { data, error } = await supabase
        .from('environments')
        .insert([normalizedPayload])
        .select()
        .single();

      if (error) {
        if (isExtendedSchemaError(error)) {
          if (payloadUsesExtendedSchema(req.body)) {
            return sendJson(res, 409, { error: getSchemaUpdateMessage() });
          }

          const legacyResult = await supabase
            .from('environments')
            .insert([stripExtendedSchemaFields(normalizedPayload)])
            .select()
            .single();

          if (legacyResult.error) throw legacyResult.error;
          return sendJson(res, 201, withCompatibilityDefaults(legacyResult.data));
        }

        throw error;
      }

      return sendJson(res, 201, withCompatibilityDefaults(data));
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return sendJson(res, 405, { error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error('Environments collection API error:', error);
    return sendJson(res, 500, { error: 'Failed to process environments request.' });
  }
};
