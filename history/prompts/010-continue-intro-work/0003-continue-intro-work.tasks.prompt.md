---
id: 0003
title: Tasks for hardening and ship pass
stage: tasks
date: 2026-08-20
surface: agent
model: opus
feature: 010-continue-intro-work
branch: 010-continue-intro-work
user: Dell
command: /sp.tasks
labels: [tasks, continue, harden, ship, audit, live-check, publication]
links:
  spec: specs/010-continue-intro-work/spec.md
  plan: specs/010-continue-intro-work/plan.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/010-continue-intro-work/tasks.md

tests:
  - Task format validation — PASS (all 20 tasks follow checkbox + ID + [P]/[Story] + path format)
  - User story coverage — PASS (US1 P1, US2 P1, US3 P2, US4 P3 all mapped to phases)
  - Independence — US1 + US2 run in parallel after Foundational; US4 runs once build is green
---

## Prompt

/sp.tasks

(no additional user input beyond the slash command)

## Response snapshot

**Setup**: ran `check-prerequisites.ps1 -Json`, parsed `FEATURE_DIR=specs/010-continue-intro-work` and `AVAILABLE_DOCS=[research.md, data-model.md, contracts/, quickstart.md, plan.md, spec.md, tasks.md]`. Loaded spec.md (4 user stories), plan.md (Docusaurus web project, verification-only pass), and tasks-template.md.

**Task layout** (20 tasks, no automated tests because spec doesn't request them):

- **Phase 1: Setup (T001–T002)** — confirm prerequisite files exist.
- **Phase 2: Foundational (T003–T004)** — typecheck and build must pass before any verification (sequential because build depends on typecheck).
- **Phase 3: User Story 1 (T005–T007)** — pairwise matrix audit, audit log creation, revert-if-duplicate.
- **Phase 4: User Story 2 (T008–T013)** — server start, three parallel Playwright checks, log result, static-DOM fallback when a live server cannot be reached.
- **Phase 5: User Story 3 (T014–T016)** — diff-stat mapping, branch cleanliness check, capture build results.
- **Phase 6: User Story 4 (T017–T018)** — routing resolution check; record results in the live-check artifact.
- **Phase 7: Polish (T019–T020)** — final PHR + ship state transition.

**Dependencies**:
- US1, US2, US4 can run in parallel after Foundational.
- US3 depends on US1 + US2 because the final PHR references both artifacts.
- Polish depends on all four user stories.

**Parallel opportunities identified**:
- T001 and T002 (Setup).
- T009, T010, T011 (US2 Playwright checks).
- T019 and T020 (Polish).
- US1 + US2 + US4 are parallelizable across stories once Foundational is green.

**MVP scope**: US1 + US2 (Phases 3–4) deliver the editorial gate and live surface verification — already prove the feature is ready.

## Outcome

- ✅ Impact: tasks.md gives a deterministic verification path with explicit fallbacks (Playwright preferred, static DOM mandatory) and a clear publication gate.
- 🧪 Tests: typecheck/build/routing/diff/audit pending /sp.implement.
- 📁 Files: `specs/010-continue-intro-work/tasks.md`.
- 🔁 Next prompts: `/sp.implement` to execute T001–T020 and produce the final PHR.
- 🧠 Reflection: the tasks are explicitly verification-first; the plan section's "no code changes" premise is preserved unless verification surfaces a defect.
