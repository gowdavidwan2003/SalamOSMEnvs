require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_KEY'];

function getMissingEnvVars() {
  return requiredEnvVars.filter((key) => !process.env[key]);
}

function createSupabaseClient() {
  const missingEnvVars = getMissingEnvVars();

  if (missingEnvVars.length > 0) {
    console.warn(`⚠️ Missing Supabase configuration: ${missingEnvVars.join(', ' )}`);
    return null;
  }

  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

const supabase = createSupabaseClient();

module.exports = {
  supabase,
  getMissingEnvVars,
};
