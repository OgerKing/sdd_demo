# SQL Primer

Browser-based SQL playground for learning SELECT queries against seeded membership sample data. Built for the Spec-Driven Development (SDD) demo with a Lovable-compatible stack.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- React Router
- Supabase (PostgreSQL + `run_readonly_query` RPC)

## Quick start

```bash
cp .env.example .env.local
# Edit .env.local with your Supabase URL and anon key

npm install
npm run dev
```

## Supabase setup

Migrations live in `supabase/migrations/`:

1. `001_create_tables.sql` — members, memberships, products, orders
2. `002_seed_data.sql` — sample data (5 members)
3. `003_run_readonly_query.sql` — read-only RPC

Deploy to your Supabase project:

```bash
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push
```

Or paste `supabase/apply_all.sql` into the Supabase SQL editor and run once.

## SDD artifacts

| File | Purpose |
|------|---------|
| `AGENTS.md` | Project-wide agent instructions |
| `specs/sql-primer-product-spec.json` | ProductSpec with scope, nonGoals, acceptanceCriteria |
| `.cursor/skills/sql-primer/SKILL.md` | Domain skill for SQL/DB patterns |
| `docs/PRESENTER_NOTES.md` | 30-minute demo run-of-show |

## Acceptance criteria

1. Schema browser shows all 4 tables and columns
2. `SELECT * FROM members LIMIT 5` returns 5 rows in < 2s
3. JOIN across members + memberships works
4. `DROP TABLE members` shows friendly error
5. Example query chips populate editor and run

## Lovable handoff

This repo matches Lovable's default stack (React + Vite + Tailwind + shadcn + Supabase). Push to GitHub, connect Lovable, and use chat to polish the UI without rewriting logic.
