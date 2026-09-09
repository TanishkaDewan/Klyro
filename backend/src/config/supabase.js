const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[Warning] Supabase URL or Anon Key is missing in environment variables.');
}

// Public client (respects Row-Level Security, used with user JWTs)
const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Admin/Service-role client (bypasses RLS, for trusted backend writes like evaluations/scoring)
const supabaseAdmin = createClient(
  supabaseUrl || '',
  supabaseServiceRoleKey || supabaseAnonKey || ''
);

module.exports = {
  supabase,
  supabaseAdmin
};