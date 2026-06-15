# SQL Primer SDD Demo — Presenter Notes

30-minute live-build run-of-show for Spec-Driven Development with Cursor.

---

## Run-of-show (timestamps)

| Time | Segment | What you do | Artifact |
|------|---------|-------------|----------|
| 0–4 min | **The problem** | Show the **20x velocity penalty** on cross-system work. Contrast a bad prompt vs a structured spec. | Slide or browser tab with bad prompt |
| 4–7 min | **AGENTS.md** | Create or edit `AGENTS.md` live: project purpose, stack, "read skills before coding", verification rule. | `AGENTS.md` |
| 7–9 min | **Cursor skills** | Open `.cursor/skills/sql-primer/SKILL.md`. Add one rule live (e.g., "always show row count in results footer"). Invoke: *"Use the sql-primer skill."* | Skill file |
| 9–12 min | **The spec** | Paste or edit `specs/sql-primer-product-spec.json`. Walk through scope, nonGoals, constraints, acceptanceCriteria. | ProductSpec JSON |
| 12–14 min | **Plan mode** | Ask Cursor to create an implementation plan from the spec. Show the task breakdown. | `.cursor/plans/*.plan.md` |
| 14–15 min | **Yolo mode** | Show Cursor Settings → Agent → **Auto-run**. Explain allow/deny list. | Settings screen |
| 15–26 min | **Live build** | Agent mode with auto-run. Prompt: *"Implement the SQL Primer plan. Follow AGENTS.md and sql-primer skill. Verify each acceptance criterion."* | Working app |
| 26–28 min | **50X close** | Run acceptance criteria checklist live. Throughput narrative. | Demo + narrative |
| 28–30 min | **Lovable beat** (optional) | Pre-recorded or live Lovable prompt for UI polish. | Beautified UI |

---

## Bad-prompt example (paste in chat)

```
make me a SQL app where I can run queries on some tables
```

**Why it fails:** No stack, no table schema, no safety rules, no acceptance criteria. The agent will guess — often wrong (Express backend, raw DDL, custom CSS, auth scaffold).

**Contrast with:** `specs/sql-primer-product-spec.json` — concrete scope, explicit nonGoals, testable acceptanceCriteria.

---

## Yolo mode (Auto-run) talking points

**What it is:** Cursor Settings → Agent → **Auto-run** (informally "Yolo mode") lets the agent run terminal commands without per-command approval.

**Why enable for live build:** Without it, the audience watches you click "Allow" on `npm install`, `tsc`, `npm run dev` — ten times per feature. With it, the agent iterates: install → typecheck → fix → dev server → verify.

**Recommended allow list:**
```
npm install, npm run, npx, tsc, vite, eslint, prettier
mkdir, touch, cp, mv
git status, git diff, git log
```

**Recommended deny list:**
```
rm -rf, git reset --hard, git push --force, git commit
```

**Safety framing:** *"I'm turning this on because I trust the spec and my allow list more than I trust clicking Allow fifteen times during a demo."* Yolo is delegated execution with guardrails — the spec is the contract, the deny list is the safety net, you review the diff at the end.

---

## 50X throughput narrative

1. **Baseline:** Query UI + seeded tables + schema browser + safety guard = 1–2 dev-days traditionally.
2. **Structural penalty:** Cross-system changes carry a ~20x velocity penalty; even single-system features lose hours to ambiguity.
3. **SDD multiplier:** Spec (~2–3x), skills (~2x), agent execution (~3–5x).
4. **Yolo multiplier:** Auto-run removes approval friction in the verify loop.
5. **Combined:** Afternoon with spec + agents vs. a sprint without — **~20x is defensible** for this playground.

**Anchor line:** *"We're not 50x faster at thinking. We're 50x faster at the part machines are good at — once we've done the thinking in the spec."*

---

## Acceptance criteria checklist

Run these live after the build:

- [ ] **AC1:** App loads with schema browser showing all 4 tables (`members`, `memberships`, `products`, `orders`) and column names.
- [ ] **AC2:** `SELECT * FROM members LIMIT 5` returns 5 rows in < 2 seconds.
- [ ] **AC3:** A JOIN across `members` + `memberships` returns correct rows.
- [ ] **AC4:** `DROP TABLE members` shows a friendly error; schema unchanged (re-run AC1 to confirm).
- [ ] **AC5:** Example query chips populate the editor and run successfully.

---

## Live-build prompt (copy-paste)

```
Implement the SQL Primer playground per specs/sql-primer-product-spec.json.

REQUIRED:
- Read AGENTS.md
- Read and follow .cursor/skills/sql-primer/SKILL.md
- Lovable-compatible stack: Vite + React + TypeScript + Tailwind + shadcn/ui + React Router
- Supabase client at src/integrations/supabase/client.ts (tables already seeded — do NOT recreate migrations)
- Call run_readonly_query RPC for query execution; client-side SELECT guard as backup
- shadcn components: Button, Textarea, Table, Card, Badge for example query chips
- Schema browser + query editor + results table + 3 example queries
- Functional UI only — no custom CSS files, Tailwind utilities only

When done, run npm run dev and verify every acceptance criterion in the spec.
```

---

## Fallback if live build stalls (~20 min)

*"We already have seed data and components spec'd — the agent finishes the wiring."*

Pre-built in this repo:
- Supabase migrations (tables, seed data, `run_readonly_query` RPC)
- Vite + shadcn scaffold
- `AGENTS.md`, skill skeleton, ProductSpec

Narrate the SDD artifacts even if the agent only wires `useRunQuery` + `Index.tsx`.

---

## Lovable handoff (optional close)

1. Push `sdd_demo` to GitHub.
2. Lovable: new project → Connect GitHub.
3. Replace Lovable's `src/` with yours (keep `components.json`, Tailwind config, `.git`).
4. Add Supabase env vars in Lovable settings.
5. Prompt: *"Polish the SQL Primer playground: split-pane layout, schema browser in a Card sidebar, monospace query editor, results in a scrollable Table with row count."*

**Talking point:** *"Spec-driven dev in Cursor gives us correctness and speed. Lovable gives us design velocity on the same codebase — no throwaway prototype."*
