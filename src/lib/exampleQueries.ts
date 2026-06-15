export const EXAMPLE_QUERIES = [
  {
    label: "Members (5 rows)",
    sql: "SELECT * FROM members LIMIT 5",
  },
  {
    label: "Members + memberships JOIN",
    sql: `SELECT m.full_name, m.email, ms.plan_name, ms.status
FROM members m
JOIN memberships ms ON m.id = ms.member_id
ORDER BY m.full_name`,
  },
  {
    label: "Member-only products",
    sql: `SELECT name, price_cents / 100.0 AS price_dollars
FROM products
WHERE is_member_only = true
ORDER BY price_cents DESC`,
  },
] as const;
