/*
# Add Location Fields & Donations Table

## Summary
Adds country and city/region columns to all lead-capture tables so we can track
visitor location, and creates a new `donations` table for the donation form.

## Modified Tables

### free_sample_leads
- Added `country` (text, nullable) — visitor's country
- Added `city_region` (text, nullable) — visitor's city/region
- Added `referral_source` (text, nullable) — where the visitor came from

### newsletter_subscribers
- Added `country` (text, nullable)
- Added `city_region` (text, nullable)

### prayer_partners
- Added `country` (text, nullable)
- Added `city_region` (text, nullable)

### prayer_requests
- Added `country` (text, nullable)
- Added `city_region` (text, nullable)

### contact_messages
- Added `country` (text, nullable)
- Added `city_region` (text, nullable)

## New Tables

### donations
Stores donation form submissions with full location data.
- `id` — UUID primary key
- `name` — donor's full name
- `email` — donor's email
- `country` — donor's country
- `city_region` — donor's city/region (nullable)
- `amount` — donation amount (numeric, nullable for "choose amount" flows)
- `prayer_request` — optional prayer request (nullable)
- `message` — optional message (nullable)
- `status` — 'new' | 'processed'
- `created_at` — submission timestamp

## Security
- RLS enabled on `donations`.
- anon INSERT allowed; SELECT/UPDATE/DELETE restricted to authenticated (admin).
- All existing table policies unchanged (columns are additive, no policy changes needed).

## Important Notes
1. All new columns are nullable so existing rows are not affected.
2. No data loss — purely additive migration.
3. Indexes added on `country` columns for analytics queries.
*/

-- Add location columns to free_sample_leads
ALTER TABLE free_sample_leads ADD COLUMN IF NOT EXISTS country text;
ALTER TABLE free_sample_leads ADD COLUMN IF NOT EXISTS city_region text;
ALTER TABLE free_sample_leads ADD COLUMN IF NOT EXISTS referral_source text;
CREATE INDEX IF NOT EXISTS free_sample_leads_country_idx ON free_sample_leads (country);

-- Add location columns to newsletter_subscribers
ALTER TABLE newsletter_subscribers ADD COLUMN IF NOT EXISTS country text;
ALTER TABLE newsletter_subscribers ADD COLUMN IF NOT EXISTS city_region text;
CREATE INDEX IF NOT EXISTS newsletter_subscribers_country_idx ON newsletter_subscribers (country);

-- Add location columns to prayer_partners
ALTER TABLE prayer_partners ADD COLUMN IF NOT EXISTS country text;
ALTER TABLE prayer_partners ADD COLUMN IF NOT EXISTS city_region text;
CREATE INDEX IF NOT EXISTS prayer_partners_country_idx ON prayer_partners (country);

-- Add location columns to prayer_requests
ALTER TABLE prayer_requests ADD COLUMN IF NOT EXISTS country text;
ALTER TABLE prayer_requests ADD COLUMN IF NOT EXISTS city_region text;
CREATE INDEX IF NOT EXISTS prayer_requests_country_idx ON prayer_requests (country);

-- Add location columns to contact_messages
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS country text;
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS city_region text;
CREATE INDEX IF NOT EXISTS contact_messages_country_idx ON contact_messages (country);

-- ─────────────────────────────────────────────────────────────
-- DONATIONS TABLE
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS donations (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name            text NOT NULL CHECK (length(trim(name)) > 0),
  email           text NOT NULL CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  country         text,
  city_region     text,
  amount          numeric(10,2),
  prayer_request  text,
  message         text,
  status          text NOT NULL DEFAULT 'new'
                  CHECK (status IN ('new', 'processed')),
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS donations_country_idx ON donations (country);
CREATE INDEX IF NOT EXISTS donations_status_idx  ON donations (status);
CREATE INDEX IF NOT EXISTS donations_created_idx ON donations (created_at DESC);

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_donations"  ON donations;
DROP POLICY IF EXISTS "auth_select_donations"  ON donations;
DROP POLICY IF EXISTS "auth_update_donations"  ON donations;
DROP POLICY IF EXISTS "auth_delete_donations"  ON donations;

CREATE POLICY "anon_insert_donations"
  ON donations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "auth_select_donations"
  ON donations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "auth_update_donations"
  ON donations FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "auth_delete_donations"
  ON donations FOR DELETE
  TO authenticated
  USING (true);
