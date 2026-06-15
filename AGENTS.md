# SQL Primer — Agent Instructions

## Purpose

Browser SQL playground for learning queries against sample membership data.

## Stack (Lovable-compatible)

Vite, React, TypeScript, Tailwind CSS, shadcn/ui, React Router, Supabase.
No custom CSS files. UI components live in `src/components/ui/`.

## Workflow

1. Read `specs/sql-primer-product-spec.json` before implementing
2. Read `.cursor/skills/sql-primer/SKILL.md` before writing SQL or DB code
3. Use Plan mode for multi-file features; Agent mode for execution
4. Verify all acceptance criteria before claiming done

## Conventions

- Functional React components; Tailwind utilities only (no .css modules)
- shadcn/ui for all interactive elements (Button, Table, Card, Textarea, Badge)
- Supabase client at `src/integrations/supabase/client.ts`
- snake_case SQL identifiers
- Never allow mutating SQL statements

## Database

- Tables and seed data are pre-deployed via `supabase/migrations/`
- Query execution uses the `run_readonly_query` RPC — do not add a custom backend
- Do not recreate migrations during implementation; wire the client only
