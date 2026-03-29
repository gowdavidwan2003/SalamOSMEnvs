const { sql } = require('./lib/db.js');

async function test() {
  const name = 'Test';
  const dev_name = 'Dev';
  const group_name = 'PROD';
  const notes = '';
  const server_host = '';
  const server_user = '';
  const server_password = '';
  const com_data = null;
  const som_data = null;
  const host_entries = '';
  const other_info = '';
  const id = '1234-abcd';
  
  try {
    const query = sql`
      UPDATE environments SET
        name = COALESCE(${name}, name),
        dev_name = COALESCE(${dev_name}, dev_name),
        group_name = COALESCE(${group_name}, group_name),
        notes = COALESCE(${notes}, notes),
        server_host = COALESCE(${server_host}, server_host),
        server_user = COALESCE(${server_user}, server_user),
        server_password = COALESCE(${server_password}, server_password),
        com_data = COALESCE(${com_data ? JSON.stringify(com_data) : null}::jsonb, com_data),
        som_data = COALESCE(${som_data ? JSON.stringify(som_data) : null}::jsonb, som_data),
        host_entries = COALESCE(${host_entries}, host_entries),
        other_info = COALESCE(${other_info}, other_info),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;
    await query;
  } catch(e) {
    console.error(e);
  }
}

test();
