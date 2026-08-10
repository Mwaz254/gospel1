/*
# Create blog_posts table for the In Him Daily blog

1. New Tables
- `blog_posts`
  - `id` (uuid, primary key)
  - `title` (text, not null) — article title
  - `slug` (text, unique, not null) — URL-safe identifier used in /blog/:slug
  - `excerpt` (text) — short summary shown on the listing page and cards
  - `content` (text, not null) — full article body stored as HTML
  - `cover_image_url` (text) — optional hero/cover image URL
  - `author` (text) — author name shown on the article
  - `category` (text) — optional category label (e.g. "Devotional", "Testimony")
  - `tags` (text[]) — optional array of tags
  - `status` (text, not null, default 'draft') — 'draft' or 'published'
  - `published_at` (timestamptz) — when the article was published (null = draft)
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now()) — last modification timestamp

2. Indexes
- Unique index on `slug` for fast lookups
- Index on `status` for filtering published/draft
- Index on `published_at` for ordering by date

3. Security
- Enable RLS on `blog_posts`.
- This is a single-tenant app with no sign-in screen, so all CRUD is allowed
  for both anon and authenticated roles. The admin page uses the anon key
  to create/edit/delete posts, and visitors read published posts via anon.
- SELECT: public read (anyone can read all posts — the frontend filters
  drafts vs published)
- INSERT/UPDATE/DELETE: also open to anon, authenticated since there is no
  auth flow and the admin page operates with the anon key.
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title           text NOT NULL,
  slug            text NOT NULL,
  excerpt         text,
  content         text NOT NULL,
  cover_image_url text,
  author          text,
  category        text,
  tags            text[],
  status          text NOT NULL DEFAULT 'draft',
  published_at    timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

-- Unique slug constraint (drop first for idempotency)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'blog_posts_slug_key') THEN
    ALTER TABLE blog_posts ADD CONSTRAINT blog_posts_slug_key UNIQUE (slug);
  END IF;
END $$;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_status       ON blog_posts (status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts (published_at DESC);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policies (single-tenant, no auth — open to anon + authenticated)
DROP POLICY IF EXISTS "anon_select_blog_posts" ON blog_posts;
CREATE POLICY "anon_select_blog_posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_blog_posts" ON blog_posts;
CREATE POLICY "anon_insert_blog_posts"
  ON blog_posts FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_blog_posts" ON blog_posts;
CREATE POLICY "anon_update_blog_posts"
  ON blog_posts FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_blog_posts" ON blog_posts;
CREATE POLICY "anon_delete_blog_posts"
  ON blog_posts FOR DELETE
  TO anon, authenticated USING (true);

-- updated_at trigger
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER trg_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_posts_updated_at();