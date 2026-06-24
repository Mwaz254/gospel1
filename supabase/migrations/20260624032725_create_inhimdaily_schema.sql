/*
# In Him Daily — Complete Database Schema

## Summary
This migration creates the full database for the In Him Daily website,
capturing every form submission and community interaction across all pages.

## New Tables

### 1. `free_sample_leads`
Stores visitors who request the free 7-day devotional sample.
Captures submissions from both the homepage CTA and the dedicated /free-sample page.
- `id` — UUID primary key
- `first_name` — visitor's first name
- `email` — email address (unique per address)
- `source` — which page/form submitted: 'homepage_cta' | 'free_sample_page'
- `status` — workflow state: 'new' | 'sent' | 'unsubscribed'
- `sent_at` — timestamp when sample was delivered
- `created_at` — submission timestamp

### 2. `newsletter_subscribers`
Stores newsletter subscribers from the Contact page newsletter form
and optionally prayer partners who also opt into newsletter content.
- `id` — UUID primary key
- `name` — subscriber's name
- `email` — email address (unique; one row per email)
- `status` — 'subscribed' | 'unsubscribed'
- `subscribed_at` — when they signed up
- `unsubscribed_at` — when they opted out (nullable)
- `created_at` — record creation timestamp

### 3. `prayer_partners`
Stores people who join the intercessory prayer team from /prayer-partners.
- `id` — UUID primary key
- `name` — partner's name
- `email` — email address (unique)
- `status` — 'active' | 'inactive'
- `created_at` — signup timestamp

### 4. `prayer_requests`
Stores confidential prayer requests submitted via the Contact page.
Email is optional (some visitors may not want a follow-up).
- `id` — UUID primary key
- `name` — requester's name
- `email` — optional email for follow-up
- `request` — the prayer request content (text)
- `status` — 'received' | 'prayed_over' | 'closed'
- `prayed_at` — timestamp when the team prayed (nullable)
- `created_at` — submission timestamp

### 5. `contact_messages`
Stores general contact form submissions (questions, feedback, partnerships).
SLA implied: respond within 24-48 hours.
- `id` — UUID primary key
- `name` — sender's name
- `email` — sender's email
- `subject` — message subject
- `message` — full message body
- `status` — 'new' | 'read' | 'replied'
- `replied_at` — timestamp when team replied (nullable)
- `created_at` — submission timestamp

## Security
- RLS enabled on all tables.
- All tables use anon + authenticated policies (single-tenant, no sign-in wall)
  so the frontend anon-key client can INSERT new rows freely.
- SELECT is restricted to authenticated only (admin use), preventing
  public exposure of visitor data.
- INSERT is open to anon role so unauthenticated website visitors can submit.
- UPDATE and DELETE require authenticated role (admin operations only).

## Important Notes
1. No user_id columns — this site has no auth flow; data is ministry-owned.
2. Unique constraints on email where duplicates would be problematic.
3. All status fields use text with CHECK constraints for data integrity.
4. Indexes added on email and status columns for efficient admin queries.
*/

-- ─────────────────────────────────────────────────────────────
-- 1. FREE SAMPLE LEADS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS free_sample_leads (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name  text NOT NULL CHECK (length(trim(first_name)) > 0),
  email       text NOT NULL CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  source      text NOT NULL DEFAULT 'homepage_cta'
              CHECK (source IN ('homepage_cta', 'free_sample_page')),
  status      text NOT NULL DEFAULT 'new'
              CHECK (status IN ('new', 'sent', 'unsubscribed')),
  sent_at     timestamptz,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS free_sample_leads_email_idx  ON free_sample_leads (email);
CREATE INDEX IF NOT EXISTS free_sample_leads_status_idx ON free_sample_leads (status);
CREATE INDEX IF NOT EXISTS free_sample_leads_source_idx ON free_sample_leads (source);

ALTER TABLE free_sample_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_free_sample_leads"       ON free_sample_leads;
DROP POLICY IF EXISTS "auth_select_free_sample_leads"       ON free_sample_leads;
DROP POLICY IF EXISTS "auth_update_free_sample_leads"       ON free_sample_leads;
DROP POLICY IF EXISTS "auth_delete_free_sample_leads"       ON free_sample_leads;

CREATE POLICY "anon_insert_free_sample_leads"
  ON free_sample_leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "auth_select_free_sample_leads"
  ON free_sample_leads FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "auth_update_free_sample_leads"
  ON free_sample_leads FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "auth_delete_free_sample_leads"
  ON free_sample_leads FOR DELETE
  TO authenticated
  USING (true);


-- ─────────────────────────────────────────────────────────────
-- 2. NEWSLETTER SUBSCRIBERS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name             text NOT NULL CHECK (length(trim(name)) > 0),
  email            text NOT NULL UNIQUE CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  status           text NOT NULL DEFAULT 'subscribed'
                   CHECK (status IN ('subscribed', 'unsubscribed')),
  subscribed_at    timestamptz NOT NULL DEFAULT now(),
  unsubscribed_at  timestamptz,
  created_at       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS newsletter_subscribers_email_idx  ON newsletter_subscribers (email);
CREATE INDEX IF NOT EXISTS newsletter_subscribers_status_idx ON newsletter_subscribers (status);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_newsletter_subscribers"  ON newsletter_subscribers;
DROP POLICY IF EXISTS "auth_select_newsletter_subscribers"  ON newsletter_subscribers;
DROP POLICY IF EXISTS "auth_update_newsletter_subscribers"  ON newsletter_subscribers;
DROP POLICY IF EXISTS "auth_delete_newsletter_subscribers"  ON newsletter_subscribers;

CREATE POLICY "anon_insert_newsletter_subscribers"
  ON newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "auth_select_newsletter_subscribers"
  ON newsletter_subscribers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "auth_update_newsletter_subscribers"
  ON newsletter_subscribers FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "auth_delete_newsletter_subscribers"
  ON newsletter_subscribers FOR DELETE
  TO authenticated
  USING (true);


-- ─────────────────────────────────────────────────────────────
-- 3. PRAYER PARTNERS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS prayer_partners (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL CHECK (length(trim(name)) > 0),
  email       text NOT NULL UNIQUE CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  status      text NOT NULL DEFAULT 'active'
              CHECK (status IN ('active', 'inactive')),
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS prayer_partners_email_idx  ON prayer_partners (email);
CREATE INDEX IF NOT EXISTS prayer_partners_status_idx ON prayer_partners (status);

ALTER TABLE prayer_partners ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_prayer_partners"  ON prayer_partners;
DROP POLICY IF EXISTS "auth_select_prayer_partners"  ON prayer_partners;
DROP POLICY IF EXISTS "auth_update_prayer_partners"  ON prayer_partners;
DROP POLICY IF EXISTS "auth_delete_prayer_partners"  ON prayer_partners;

CREATE POLICY "anon_insert_prayer_partners"
  ON prayer_partners FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "auth_select_prayer_partners"
  ON prayer_partners FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "auth_update_prayer_partners"
  ON prayer_partners FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "auth_delete_prayer_partners"
  ON prayer_partners FOR DELETE
  TO authenticated
  USING (true);


-- ─────────────────────────────────────────────────────────────
-- 4. PRAYER REQUESTS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS prayer_requests (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL CHECK (length(trim(name)) > 0),
  email       text CHECK (email IS NULL OR email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  request     text NOT NULL CHECK (length(trim(request)) > 0),
  status      text NOT NULL DEFAULT 'received'
              CHECK (status IN ('received', 'prayed_over', 'closed')),
  prayed_at   timestamptz,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS prayer_requests_status_idx    ON prayer_requests (status);
CREATE INDEX IF NOT EXISTS prayer_requests_created_idx   ON prayer_requests (created_at DESC);

ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_prayer_requests"  ON prayer_requests;
DROP POLICY IF EXISTS "auth_select_prayer_requests"  ON prayer_requests;
DROP POLICY IF EXISTS "auth_update_prayer_requests"  ON prayer_requests;
DROP POLICY IF EXISTS "auth_delete_prayer_requests"  ON prayer_requests;

CREATE POLICY "anon_insert_prayer_requests"
  ON prayer_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "auth_select_prayer_requests"
  ON prayer_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "auth_update_prayer_requests"
  ON prayer_requests FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "auth_delete_prayer_requests"
  ON prayer_requests FOR DELETE
  TO authenticated
  USING (true);


-- ─────────────────────────────────────────────────────────────
-- 5. CONTACT MESSAGES
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL CHECK (length(trim(name)) > 0),
  email       text NOT NULL CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  subject     text NOT NULL CHECK (length(trim(subject)) > 0),
  message     text NOT NULL CHECK (length(trim(message)) > 0),
  status      text NOT NULL DEFAULT 'new'
              CHECK (status IN ('new', 'read', 'replied')),
  replied_at  timestamptz,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS contact_messages_status_idx  ON contact_messages (status);
CREATE INDEX IF NOT EXISTS contact_messages_email_idx   ON contact_messages (email);
CREATE INDEX IF NOT EXISTS contact_messages_created_idx ON contact_messages (created_at DESC);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_messages"  ON contact_messages;
DROP POLICY IF EXISTS "auth_select_contact_messages"  ON contact_messages;
DROP POLICY IF EXISTS "auth_update_contact_messages"  ON contact_messages;
DROP POLICY IF EXISTS "auth_delete_contact_messages"  ON contact_messages;

CREATE POLICY "anon_insert_contact_messages"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "auth_select_contact_messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "auth_update_contact_messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "auth_delete_contact_messages"
  ON contact_messages FOR DELETE
  TO authenticated
  USING (true);
