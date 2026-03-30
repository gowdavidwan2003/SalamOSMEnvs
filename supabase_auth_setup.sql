-- Run this in the Supabase SQL Editor before using login/admin approval.
-- It creates the required auth tables used by the app-level access control.

CREATE TABLE IF NOT EXISTS public.app_users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  full_name text,
  role text NOT NULL DEFAULT 'user',
  status text NOT NULL DEFAULT 'pending',
  approved_by uuid REFERENCES public.app_users(id) ON DELETE SET NULL,
  approved_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.app_sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES public.app_users(id) ON DELETE CASCADE,
  token_hash text NOT NULL UNIQUE,
  expires_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.app_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_sessions DISABLE ROW LEVEL SECURITY;

-- Optional: confirm the tables exist
SELECT 'app_users' AS table_name, COUNT(*) AS row_count FROM public.app_users
UNION ALL
SELECT 'app_sessions' AS table_name, COUNT(*) AS row_count FROM public.app_sessions;
