---
id: 0003
title: Hamburger rebuild tasks
stage: tasks
date: 2026-08-19
surface: agent
model: opus
feature: 001-hamburger-rebuild
branch: 001-hamburger-rebuild
user: Dell
command: /sp.tasks
labels: [tasks, navbar, hamburger, drawer, swizzle, docusaurus, a11y]
links:
  spec: specs/001-hamburger-rebuild/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-hamburger-rebuild/tasks.md

tests:
  - Format audit: 31 task entries, every line matches `- [ ] Txxx [P?] [Story?] Description with file path` — PASS
  - Story coverage: US1 (4 impl), US2 (4 impl), US3 (4 impl), US4 (4 impl), US5 (3 impl), Setup (3), Foundational (4), Polish (5) — PASS
  - Dependency graph: each story labeled; Phase 8 polish blocked on prior phases — PASS
---

## Prompt

/sp.tasks (no additional text — invoked after plan stage)

## Response snapshot

Generated `specs/001-hamburger-rebuild/tasks.md` with eight phases and 31 executable tasks. Setup captures the baseline (T001–T003). Foundational establishes the `useDrawer` controller and the integration seam (T004–T007). US1 delivers the open/dismiss MVP (T008–T011). US2 layers navigation and active-route highlighting on the same drawer shell (T012–T015). US3 retires the old `.navbar-sidebar` viewport anchors and `:has()` projection (T016–T019). US4 closes the keyboard and ARIA gaps (T020–T023). US5 applies Apple-Design polish and reduced-motion compliance (T024–T026). Phase 8 runs `npm run typecheck`, `npx docusaurus build`, a `git diff` scope check, the full 14-row quickstart matrix, and path correction (T027–T031). Every task uses the strict checklist format with sequential IDs, story labels in story phases, optional `[P]` markers, and exact file paths.

## Outcome

- ✅ Impact: Implementation is now sequenced from a stable MVP (US1) to the full rebuild. The brittle CSS `:has()` projection is removed only after the new overlay is verified (T018 is gated on T017 + T019).
- 🧪 Tests: Format audit PASS (all 31 lines match); story coverage PASS (each spec US has implementation tasks); dependency graph PASS (Phase 8 blocked on prior phases).
- 📁 Files: `specs/001-hamburger-rebuild/tasks.md`.
- 🔁 Next prompts: `/sp.implement` to execute the task list. Recommend stopping after US1 for an MVP validation pass before continuing through US5.
- � Reflection: Grouping by user story keeps the smallest viable diff visible at every checkpoint. The CSS removal task (T018) is intentionally sequenced *after* the new overlay is verified — removing the old path prematurely would leave a window with no working drawer.

## Evaluation notes (flywheel)

- Failure modes observed: None at task-generation stage.
- Graders run and results (PASS/FAIL): format PASS; coverage PASS; dependency graph PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): during `/sp.implement`, prefer the file-creation tasks (T004, T008, T009, T016, T020, T024) before any verification task, so the build pipeline can prove source exists before asserting behavior.
