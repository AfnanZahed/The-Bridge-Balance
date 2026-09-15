---
id: 0003
title: Generate navbar alignment tasks
stage: tasks
date: 2026-08-18
surface: agent
model: MiniMax-M3
feature: 004-fix-navbar-alignment
branch: 004-fix-navbar-alignment
user: Dell
command: /sp.tasks
labels: [tasks, navbar, alignment, css, cards, a11y, verify]
links:
  spec: specs/004-fix-navbar-alignment/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/004-fix-navbar-alignment/tasks.md

tests:
  - Task format validation (checkbox + TaskID + [P?] + [Story?] + file path) — PASS for all 14 tasks
  - Dependency graph — PASS (Setup → Foundational → US1 → US2 → Polish)
---

## Prompt

> /sp.tasks

## Response snapshot

- Ran `check-prerequisites.ps1 -Json` → `FEATURE_DIR` resolved; all design docs present (research.md, data-model.md, contracts/, quickstart.md); plan.md + spec.md loaded in context.
- Generated `specs/004-fix-navbar-alignment/tasks.md` with 14 tasks.
- Phase 1 Setup: T001 verify clean branch.
- Phase 2 Foundational: T002 baseline geometry capture (Playwright, 4 configs, before/ screenshots).
- Phase 3 US1 (P1 — visual alignment, MVP): T003 shared vertical-baseline overrides in `custom.css` (brand/left-group/right-group); T004 ellipsis truncation, single hairline border, theme-transition no-reflow guard; T005 mobile drawer + hamburger baseline alignment; T006 [P] `.navbar__toggle` added to 44×44 touch-target list in `a11y.css`; T007 build; T008 4-config Playwright verify (≤2px center-line delta, CLS=0, drawer no-shift, after/ screenshots).
- Phase 4 US2 (P2 — control parity): T009 theme-toggle + GitHub parity rules in `custom.css`; T010 [P] Apple-blue focus-ring parity for both in `a11y.css`; T011 Playwright parity verification (style + touch + focus) on desktop light/dark.
- Phase 5 Polish: T012 full quickstart.md runbook; T013 Lighthouse a11y ≥ 95 (light + dark); T014 second build idempotency + CLS=0 at mobile theme toggle.
- Dependency graph: Setup → Foundational (baseline before CSS) → US1 → US2 → Polish. Parallel opportunities: T006, T010 (a11y.css vs custom.css), T012/T013/T014 (Polish).
- Implementation strategy: MVP = US1 only; commit after T008 and after T011.
- Tests REQUIRED (not optional here) because spec SC-001..SC-005 mandate Playwright + Lighthouse verification.

## Outcome

- ✅ Impact: An immediately executable, dependency-aware task list now decomposes the navbar fix into two independently testable user stories (US1 P1 alignment MVP, US2 P2 control parity) plus setup, baseline, and polish phases.
- 🧪 Tests: All 14 tasks follow the strict checklist format; verification tasks map to SC-001..SC-005.
- 📁 Files: `specs/004-fix-navbar-alignment/tasks.md`.
- 🔁 Next prompts: `/sp.implement` to execute T001-T014; optionally `/sp.analyze` first for a read-only consistency check across spec/plan/tasks.
- 🧠 Reflection: Baseline-first ordering (T002 before T003) makes the visual diff provable; CSS-file sequencing (custom.css then a11y.css parallel) avoids conflicts; app/backend left untouched per smallest-viable-change.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS — format validation on all 14 tasks; PASS — phase dependency graph.
- Prompt variant (if applicable): n/a.
- Next experiment (smallest change to try): Run `/sp.analyze` for a read-only cross-artifact consistency check before `/sp.implement`, or proceed straight to `/sp.implement`.