-- SQL Primer: apply all migrations in Supabase SQL Editor (paste and run once)

-- 001_create_tables.sql
CREATE TABLE IF NOT EXISTS members (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS memberships (
  id SERIAL PRIMARY KEY,
  member_id INTEGER NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  plan_name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'expired', 'cancelled')),
  expires_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
  is_member_only BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  member_id INTEGER NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  ordered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  total_cents INTEGER NOT NULL CHECK (total_cents >= 0)
);

CREATE INDEX IF NOT EXISTS idx_memberships_member_id ON memberships(member_id);
CREATE INDEX IF NOT EXISTS idx_orders_member_id ON orders(member_id);
CREATE INDEX IF NOT EXISTS idx_orders_product_id ON orders(product_id);

-- 002_seed_data.sql (skip if re-running on existing data)
INSERT INTO members (email, full_name, joined_at) VALUES
  ('alice@example.com', 'Alice Johnson', '2024-01-15T10:00:00Z'),
  ('bob@example.com', 'Bob Smith', '2024-02-20T14:30:00Z'),
  ('carol@example.com', 'Carol Williams', '2024-03-10T09:15:00Z'),
  ('dave@example.com', 'Dave Brown', '2024-04-05T16:45:00Z'),
  ('eve@example.com', 'Eve Davis', '2024-05-12T11:00:00Z')
ON CONFLICT (email) DO NOTHING;

INSERT INTO memberships (member_id, plan_name, status, expires_at)
SELECT m.id, v.plan_name, v.status, v.expires_at::timestamptz
FROM (VALUES
  ('alice@example.com', 'Gold', 'active', '2026-12-31T23:59:59Z'),
  ('bob@example.com', 'Silver', 'active', '2026-06-30T23:59:59Z'),
  ('carol@example.com', 'Gold', 'expired', '2025-01-01T00:00:00Z'),
  ('dave@example.com', 'Bronze', 'cancelled', '2025-03-15T00:00:00Z'),
  ('eve@example.com', 'Silver', 'active', '2026-09-30T23:59:59Z')
) AS v(email, plan_name, status, expires_at)
JOIN members m ON m.email = v.email
WHERE NOT EXISTS (SELECT 1 FROM memberships ms WHERE ms.member_id = m.id);

INSERT INTO products (name, price_cents, is_member_only)
SELECT v.name, v.price_cents, v.is_member_only
FROM (VALUES
  ('Annual Report PDF', 0, FALSE),
  ('Member Webinar Access', 2500, TRUE),
  ('Conference Ticket', 15000, TRUE),
  ('Newsletter Subscription', 999, FALSE),
  ('Premium Support', 5000, TRUE)
) AS v(name, price_cents, is_member_only)
WHERE NOT EXISTS (SELECT 1 FROM products p WHERE p.name = v.name);

-- 003_run_readonly_query.sql
CREATE OR REPLACE FUNCTION run_readonly_query(query text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
BEGIN
  IF query IS NULL OR trim(query) = '' THEN
    RAISE EXCEPTION 'Query cannot be empty';
  END IF;

  IF query !~* '^\s*SELECT' THEN
    RAISE EXCEPTION 'Only SELECT queries are allowed';
  END IF;

  IF query ~* '\b(INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE|GRANT|REVOKE)\b' THEN
    RAISE EXCEPTION 'Only SELECT queries are allowed';
  END IF;

  EXECUTE format('SELECT COALESCE(jsonb_agg(row_to_json(t)), ''[]''::jsonb) FROM (%s) t', query)
    INTO result;

  RETURN result;
END;
$$;

REVOKE ALL ON FUNCTION run_readonly_query(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION run_readonly_query(text) TO anon;
GRANT EXECUTE ON FUNCTION run_readonly_query(text) TO authenticated;
