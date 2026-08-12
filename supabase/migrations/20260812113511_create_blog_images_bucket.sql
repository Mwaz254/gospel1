INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-images',
  'blog-images',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
)
ON CONFLICT (id) DO UPDATE
SET name = EXCLUDED.name,
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "public_read_blog_images" ON storage.objects;
CREATE POLICY "public_read_blog_images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'blog-images');

DROP POLICY IF EXISTS "auth_insert_blog_images" ON storage.objects;
CREATE POLICY "auth_insert_blog_images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog-images');

DROP POLICY IF EXISTS "auth_update_blog_images" ON storage.objects;
CREATE POLICY "auth_update_blog_images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'blog-images')
WITH CHECK (bucket_id = 'blog-images');

DROP POLICY IF EXISTS "auth_delete_blog_images" ON storage.objects;
CREATE POLICY "auth_delete_blog_images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'blog-images');