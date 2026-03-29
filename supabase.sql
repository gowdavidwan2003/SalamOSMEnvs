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
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.environments
  ADD COLUMN IF NOT EXISTS com_db_details text,
  ADD COLUMN IF NOT EXISTS som_db_details text,
  ADD COLUMN IF NOT EXISTS machine_details text,
  ADD COLUMN IF NOT EXISTS tunnelling text;

ALTER TABLE public.environments
  ADD CONSTRAINT environments_name_key UNIQUE (name);

-- Note: Ensure Row Level Security (RLS) is disabled if you are strictly relying on server service_role keys
-- or configure correct policies if using anon keys.
ALTER TABLE public.environments DISABLE ROW LEVEL SECURITY;
