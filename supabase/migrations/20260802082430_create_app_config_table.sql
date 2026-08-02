/*
# Create app_config table for storing secrets

1. New Tables
- `app_config`
  - `key` (text, primary key) — configuration key name
  - `value` (text, not null) — configuration value (e.g. API keys)
  - `created_at` (timestamptz) — when the entry was created
  - `updated_at` (timestamptz) — when the entry was last updated

2. Security
- Enable RLS on `app_config`.
- NO policies are created — the table is completely locked down for anon and authenticated roles.
- Only the service role (used by edge functions) can read/write, since it bypasses RLS.
- This ensures API keys and secrets stored here are never exposed to the frontend.

3. Purpose
- Stores third-party API keys (e.g. RESEND_API_KEY) that edge functions need.
- The edge function reads the key using the service role key, which bypasses RLS.
*/

CREATE TABLE IF NOT EXISTS app_config (
  key text PRIMARY KEY,
  value text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE app_config ENABLE ROW LEVEL SECURITY;
