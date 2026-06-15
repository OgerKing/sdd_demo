# SQL Primer Skill

Use this skill when building or modifying the SQL Primer playground — query editor, schema browser, Supabase integration, or seed data references.

## When to use

- Implementing query execution, results display, or schema browser
- Writing or reviewing SQL-related code (guards, RPC calls, types)
- Verifying acceptance criteria for the SQL Primer demo

## Table naming

- All identifiers use `snake_case`: `members`, `memberships`, `products`, `orders`
- Column names: `id`, `email`, `full_name`, `joined_at`, `member_id`, `plan_name`, `status`, `expires_at`, `name`, `price_cents`, `is_member_only`, `product_id`, `ordered_at`, `total_cents`

## Seed data expectations

- 5 members with realistic names and emails
- Varied membership statuses: `active`, `expired`, `cancelled`
- Products with member-only and public items
- Orders linking members to products

Migrations are **pre-deployed** in `supabase/migrations/`. Do not recreate tables or seed scripts during the live build — wire the client only.

## SELECT-only guard

Implement defense in depth:

1. **Client** (`src/lib/queryGuard.ts`): Reject queries that do not start with `SELECT` (after trimming) or contain mutating keywords (`INSERT`, `UPDATE`, `DELETE`, `DROP`, `ALTER`, `CREATE`, `TRUNCATE`).
2. **Server** (`run_readonly_query` RPC): Same validation in Postgres before `EXECUTE`.

Return user-friendly error messages, not raw Postgres exceptions when possible.

## UI conventions

- shadcn/ui for all interactive elements: Button, Textarea, Table, Card, Badge
- Tailwind utilities only — no custom `.css` modules
- Always show **row count** in the results table footer
- Example queries as Badge chips that populate the editor on click

## Supabase client

- Client at `src/integrations/supabase/client.ts`
- Call `supabase.rpc('run_readonly_query', { query: sql })` for execution
- Env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

## Verification

Before claiming done:

```bash
npm run build
npm run dev
```

Manual checklist (from ProductSpec):

1. Schema browser shows 4 tables with columns
2. `SELECT * FROM members LIMIT 5` → 5 rows, < 2s
3. JOIN `members` + `memberships` → correct rows
4. `DROP TABLE members` → friendly error, schema intact
5. Example query chips work
