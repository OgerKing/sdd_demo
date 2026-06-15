-- 002_seed_data.sql
-- 5 members, varied memberships, products, and orders

INSERT INTO members (email, full_name, joined_at) VALUES
  ('alice@example.com', 'Alice Johnson', '2024-01-15T10:00:00Z'),
  ('bob@example.com', 'Bob Smith', '2024-02-20T14:30:00Z'),
  ('carol@example.com', 'Carol Williams', '2024-03-10T09:15:00Z'),
  ('dave@example.com', 'Dave Brown', '2024-04-05T16:45:00Z'),
  ('eve@example.com', 'Eve Davis', '2024-05-12T11:00:00Z');

INSERT INTO memberships (member_id, plan_name, status, expires_at) VALUES
  (1, 'Gold', 'active', '2026-12-31T23:59:59Z'),
  (2, 'Silver', 'active', '2026-06-30T23:59:59Z'),
  (3, 'Gold', 'expired', '2025-01-01T00:00:00Z'),
  (4, 'Bronze', 'cancelled', '2025-03-15T00:00:00Z'),
  (5, 'Silver', 'active', '2026-09-30T23:59:59Z');

INSERT INTO products (name, price_cents, is_member_only) VALUES
  ('Annual Report PDF', 0, FALSE),
  ('Member Webinar Access', 2500, TRUE),
  ('Conference Ticket', 15000, TRUE),
  ('Newsletter Subscription', 999, FALSE),
  ('Premium Support', 5000, TRUE);

INSERT INTO orders (member_id, product_id, ordered_at, total_cents) VALUES
  (1, 2, '2024-06-01T12:00:00Z', 2500),
  (1, 3, '2024-07-15T09:30:00Z', 15000),
  (2, 4, '2024-08-01T08:00:00Z', 999),
  (3, 1, '2024-09-10T14:00:00Z', 0),
  (5, 5, '2024-10-20T10:15:00Z', 5000),
  (2, 2, '2024-11-05T16:00:00Z', 2500);
