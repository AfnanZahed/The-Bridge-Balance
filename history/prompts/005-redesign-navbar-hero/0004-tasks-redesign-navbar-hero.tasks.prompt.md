---
id: 0004
title: Generate navbar hero tasks
stage: tasks
date: 2026-08-19
surface: agent
model: MiniMax-M3
feature: 005-redesign-navbar-hero
branch: 005-redesign-navbar-hero
user: Dell
command: /sp.tasks
labels: [tasks, navbar, hero, redesign, search, centered-brand, mesh-gradient]
links:
  spec: specs/005-redesign-navbar-hero/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/005-redesign-navbar-hero/tasks.md

tests:
  - Task format validation (checkbox + TaskID + [P?] + [Story?] + file path) — PASS for all 22 tasks
  - Dependency graph — PASS (Setup → Foundational → US1 → US2 → US3 → Polish)
---

## Prompt

> /sp.tasks

## Response snapshot

- Ran `check-prerequisites.ps1 -Json` → `FEATURE_DIR` resolved; all design docs present (research.md, data-model.md, contracts/, quickstart.md); plan.md + spec.md loaded in context.
- Generated `specs/005-redesign-navbar-hero/tasks.md` with 22 tasks.
- Phase 1 Setup: T001 verify clean branch.
- Phase 2 Foundational: T002 [P] baseline geometry + screenshots (4 configs); T003 [P] build-time search index generator `edu-site/scripts/generate-search-index.mjs`.
- Phase 3 US1 (P1 — navbar, MVP): T004 centered-brand CSS; T005 search trigger styling; T006 `src/theme/SearchBar/index.tsx` client-side search; T007 config registration; T008 [P] a11y focus/touch for search; T009 build wiring (package.json); T010 build + fresh index; T011 4-config Playwright verification.
- Phase 4 US2 (P1 — hero): T012 replace arch SVG with pure-CSS mesh gradient; T013 redesign deck (mark/eyebrow/headline/subtitle/CTAs/meta); T014 [P] hero a11y; T015 build; T016 4-config verification + screenshots.
- Phase 5 US3 (P2 — behaviors): T017 active-state CSS; T018 sticky navbar + anchor offset; T019 behavior verification.
- Phase 6 Polish: T020 quickstart runbook; T021 Lighthouse ≥95; T022 idempotent build + CLS=0.
- Dependency graph: Setup → Foundational → US1 → US2 → US3 → Polish. Parallel opportunities: T002/T003, T008, T014, T020/T021/T022.
- Implementation strategy: MVP = US1; incremental slices US1 → US2 → US3; commit after each verified slice.

## Outcome

- ✅ Impact: An immediately executable, dependency-aware task list decomposes the top-of-page chrome redesign into three independently testable user stories (US1 P1 navbar + search, US2 P1 hero, US3 P2 behaviors) plus setup, baseline/index, and polish phases.
- 🧪 Tests: All 22 tasks follow the strict checklist format; verification tasks map to SC-001..SC-010.
- 📁 Files: `specs/005-redesign-navbar-hero/tasks.md`.
- 🔁 Next prompts: `/sp.implement` to execute T001-T022; optionally `/sp.analyze` first for a read-only consistency check across spec/plan/tasks.
- 🧠 Reflection: Baseline-first (T002 before US1) keeps the visual diff provable; the search index generator (T003) is a foundational prerequisite for the US1 search affordance; CSS-file sequencing avoids conflicts; no new npm dependencies.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS — format validation on all 22 tasks; PASS — phase dependency graph.
- Prompt variant (if applicable): n/a.
- Next experiment (smallest change to try): Run `/sp.analyze` for a read-only cross-artifact consistency check before `/sp.implement`, or proceed straight to `/sp.implement`.