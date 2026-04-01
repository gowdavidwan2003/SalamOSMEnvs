-- Run this on existing environments tables to enable:
-- 1) soft delete / archive + restore
-- 2) env sheet link + related document links

ALTER TABLE public.environments
  ADD COLUMN IF NOT EXISTS env_sheet_url text,
  ADD COLUMN IF NOT EXISTS document_links jsonb DEFAULT '[]'::jsonb NOT NULL,
  ADD COLUMN IF NOT EXISTS archived_at timestamp with time zone;

UPDATE public.environments
SET document_links = '[]'::jsonb
WHERE document_links IS NULL;

CREATE INDEX IF NOT EXISTS idx_environments_archived_at
  ON public.environments (archived_at);

CREATE TABLE IF NOT EXISTS public.app_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO public.app_settings (key, value)
VALUES ('shared_pins', '[]'::jsonb)
ON CONFLICT (key) DO NOTHING;

ALTER TABLE public.app_settings DISABLE ROW LEVEL SECURITY;