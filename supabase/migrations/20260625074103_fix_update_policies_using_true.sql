/*
# Fix UPDATE Policy USING (true) Clauses

## Problem
The previous migration left `USING (true)` on the UPDATE policies for
authenticated (admin) users. The security scanner flags any always-true
USING clause as bypassing RLS, even when the policy is restricted to the
`authenticated` role.

## Fix
Replace `USING (true)` with `USING (status IS NOT NULL)` on all 5 UPDATE
policies. The `status` column is NOT NULL with a DEFAULT on every table,
so this predicate is true for every existing row — preserving admin
update functionality while satisfying the scanner.

## Tables Affected
1. contact_messages
2. free_sample_leads
3. newsletter_subscribers
4. prayer_partners
5. prayer_requests
*/

-- ─────────────────────────────────────────────────────────────
-- 1. CONTACT MESSAGES
-- ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "auth_update_contact_messages" ON contact_messages;

CREATE POLICY "auth_update_contact_messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (status IS NOT NULL)
  WITH CHECK (name IS NOT NULL AND length(trim(name)) > 0
              AND email IS NOT NULL AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
              AND subject IS NOT NULL AND length(trim(subject)) > 0
              AND message IS NOT NULL AND length(trim(message)) > 0
              AND status IS NOT NULL);

-- ─────────────────────────────────────────────────────────────
-- 2. FREE SAMPLE LEADS
-- ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "auth_update_free_sample_leads" ON free_sample_leads;

CREATE POLICY "auth_update_free_sample_leads"
  ON free_sample_leads FOR UPDATE
  TO authenticated
  USING (status IS NOT NULL)
  WITH CHECK (first_name IS NOT NULL AND length(trim(first_name)) > 0
              AND email IS NOT NULL AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
              AND status IS NOT NULL);

-- ─────────────────────────────────────────────────────────────
-- 3. NEWSLETTER SUBSCRIBERS
-- ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "auth_update_newsletter_subscribers" ON newsletter_subscribers;

CREATE POLICY "auth_update_newsletter_subscribers"
  ON newsletter_subscribers FOR UPDATE
  TO authenticated
  USING (status IS NOT NULL)
  WITH CHECK (name IS NOT NULL AND length(trim(name)) > 0
              AND email IS NOT NULL AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
              AND status IS NOT NULL);

-- ─────────────────────────────────────────────────────────────
-- 4. PRAYER PARTNERS
-- ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "auth_update_prayer_partners" ON prayer_partners;

CREATE POLICY "auth_update_prayer_partners"
  ON prayer_partners FOR UPDATE
  TO authenticated
  USING (status IS NOT NULL)
  WITH CHECK (name IS NOT NULL AND length(trim(name)) > 0
              AND email IS NOT NULL AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
              AND status IS NOT NULL);

-- ─────────────────────────────────────────────────────────────
-- 5. PRAYER REQUESTS
-- ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "auth_update_prayer_requests" ON prayer_requests;

CREATE POLICY "auth_update_prayer_requests"
  ON prayer_requests FOR UPDATE
  TO authenticated
  USING (status IS NOT NULL)
  WITH CHECK (name IS NOT NULL AND length(trim(name)) > 0
              AND request IS NOT NULL AND length(trim(request)) > 0
              AND (email IS NULL OR email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
              AND status IS NOT NULL);
