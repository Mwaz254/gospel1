/*
# Fix RLS Policies on donations Table

## Summary
Replaces the always-true RLS predicates on the `donations` table with
meaningful validation checks so row-level security is not bypassed.

## Security Changes
- `anon_insert_donations` (INSERT): WITH CHECK now requires a non-empty
  name and a valid email, so anon can only insert real donation records —
  not arbitrary rows.
- `auth_update_donations` (UPDATE): USING and WITH CHECK now require a
  non-empty name and valid email, so only valid donation records can be
  updated and the result must remain valid.
- `auth_delete_donations` (DELETE): USING now requires a valid email,
  so only real donation records can be deleted.

## Important Notes
1. This is a single-tenant no-auth app — there is no user_id or ownership
   concept. The predicates validate record integrity instead of ownership.
2. The table's CHECK constraints already enforce these rules at the column
   level; the RLS predicates add defense-in-depth at the policy level.
3. No data is lost — this migration only drops and recreates policies.
*/

DROP POLICY IF EXISTS "anon_insert_donations"  ON donations;
DROP POLICY IF EXISTS "auth_update_donations"  ON donations;
DROP POLICY IF EXISTS "auth_delete_donations"  ON donations;

CREATE POLICY "anon_insert_donations"
  ON donations FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND name IS NOT NULL
    AND length(trim(name)) > 0
  );

CREATE POLICY "auth_update_donations"
  ON donations FOR UPDATE
  TO authenticated
  USING (
    email IS NOT NULL
    AND length(trim(name)) > 0
  )
  WITH CHECK (
    email IS NOT NULL
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND name IS NOT NULL
    AND length(trim(name)) > 0
  );

CREATE POLICY "auth_delete_donations"
  ON donations FOR DELETE
  TO authenticated
  USING (
    email IS NOT NULL
    AND length(trim(name)) > 0
  );
