-- Run this in the Supabase SQL Editor to create the environments table

CREATE TABLE IF NOT EXISTS public.environments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  dev_name text,
  group_name text NOT NULL,
  notes text,
  server_host text,
  server_user text,
  server_password text,
  com_data jsonb,
  som_data jsonb,
  host_entries text,
  other_info text,
  env_sheet_url text,
  document_links jsonb DEFAULT '[]'::jsonb NOT NULL,
  archived_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.environments
  ADD COLUMN IF NOT EXISTS com_db_details text,
  ADD COLUMN IF NOT EXISTS som_db_details text,
  ADD COLUMN IF NOT EXISTS machine_details text,
  ADD COLUMN IF NOT EXISTS tunnelling text,
  ADD COLUMN IF NOT EXISTS env_sheet_url text,
  ADD COLUMN IF NOT EXISTS document_links jsonb DEFAULT '[]'::jsonb NOT NULL,
  ADD COLUMN IF NOT EXISTS archived_at timestamp with time zone;

UPDATE public.environments
SET document_links = '[]'::jsonb
WHERE document_links IS NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'environments_name_key'
      AND conrelid = 'public.environments'::regclass
  ) THEN
    ALTER TABLE public.environments
      ADD CONSTRAINT environments_name_key UNIQUE (name);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_environments_archived_at
  ON public.environments (archived_at);

-- Note: Ensure Row Level Security (RLS) is disabled if you are strictly relying on server service_role keys
-- or configure correct policies if using anon keys.
ALTER TABLE public.environments DISABLE ROW LEVEL SECURITY;

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
