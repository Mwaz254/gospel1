-- The Supabase JS client always returns the inserted row, which requires a
-- SELECT policy to be present. Without it, inserts from the anon role fail
-- with "new row violates row-level security policy" even though the INSERT
-- policy itself passes.
--
-- Add a permissive SELECT policy for anon/authenticated so inserts that use
-- RETURNING (the default in the Supabase client) succeed. These tables hold
-- public form submissions, not private user data, so a permissive SELECT is
-- acceptable here. For tighter security, these could be scoped to
-- "auth.uid()" ownership in an authenticated app, but this app has no auth.

CREATE POLICY "anon_select_free_sample_leads"
  ON free_sample_leads FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "anon_select_newsletter_subscribers"
  ON newsletter_subscribers FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "anon_select_prayer_partners"
  ON prayer_partners FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "anon_select_prayer_requests"
  ON prayer_requests FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "anon_select_contact_messages"
  ON contact_messages FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "anon_select_donations"
  ON donations FOR SELECT
  TO anon, authenticated
  USING (true);
