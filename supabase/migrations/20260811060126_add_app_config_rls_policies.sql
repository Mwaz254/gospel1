/*
# Add RLS policies for app_config table

## Summary
The app_config table had RLS enabled but no policies, making it inaccessible
to the admin dashboard. This migration adds policies so authenticated admin
users can read and update configuration values (like the Resend API key).

## Security
- Enable SELECT, INSERT, UPDATE, DELETE for authenticated users only
- Anon role is NOT granted access — config values may contain sensitive API keys
- The edge function uses the service role key which bypasses RLS, so it can
  still read config values regardless of these policies
*/

DROP POLICY IF EXISTS "authenticated_select_app_config" ON app_config;
CREATE POLICY "authenticated_select_app_config"
ON app_config FOR SELECT
TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_insert_app_config" ON app_config;
CREATE POLICY "authenticated_insert_app_config"
ON app_config FOR INSERT
TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_update_app_config" ON app_config;
CREATE POLICY "authenticated_update_app_config"
ON app_config FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_delete_app_config" ON app_config;
CREATE POLICY "authenticated_delete_app_config"
ON app_config FOR DELETE
TO authenticated USING (true);
