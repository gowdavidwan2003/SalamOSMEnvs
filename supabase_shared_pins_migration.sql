-- Run this on existing auth-enabled databases to enable shared pinned environments.
-- This stores one shared pin list for all approved users.

CREATE TABLE IF NOT EXISTS public.app_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO public.app_settings (key, value)
VALUES ('shared_pins', '[]'::jsonb)
ON CONFLICT (key) DO NOTHING;

ALTER TABLE public.app_settings DISABLE ROW LEVEL SECURITY;