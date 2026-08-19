---
id: 0005
title: Tasks Book Foundation
stage: tasks
date: 2026-08-17
surface: agent
model: MiniMax-M3
feature: book-foundation
branch: 001-book-foundation
user: Dell
command: /sp.tasks
labels: [tasks, dependency-graph, user-stories, parallel-execution, mvp]
links:
  spec: specs/001-book-foundation/spec.md
  ticket: null
  adr: history/adr/0002-text-first-video-second-workflow.md
  pr: null
files:
  - specs/001-book-foundation/tasks.md
  - history/prompts/001-book-foundation/0005-tasks-book-foundation.tasks.prompt.md
tests: []
---

## Prompt

/sp.tasks (invoked by user; empty $ARGUMENTS). Generate the task list for `001-book-foundation` from the plan, spec, research, data-model, contracts, and quickstart.

## Response snapshot

1. **Setup.** Ran `check-prerequisites.ps1 -Json -PathsOnly`. Confirmed `FEATURE_DIR`, `FEATURE_SPEC`, `IMPL_PLAN`, `TASKS`, `BRANCH=001-book-foundation`.

2. **Loaded design docs** — plan, spec, data-model, contracts, research, quickstart all available. The spec has 5 user stories (3 × P1, 2 × P2); the plan has 5 implementation phases.

3. **Task generation** — produced 27 tasks organized into 8 phases:
   - **Phase 1 — Setup** (4 tasks): verify Docusaurus version, `onBrokenLinks: "throw"`, sidebar, run `npm install`.
   - **Phase 2 — Foundational** (6 tasks): `ci.yml`, `check-frontmatter.mjs`, `<ChapterState />` component, MDX component wiring, package.json script chain, image directory.
   - **Phase 3 — US5 Build & Deploy** (3 tasks): `npm run build` exits 0, `npm run typecheck` exits 0, README Vercel + branch protection docs.
   - **Phase 4 — US1 Read a Stage 1 Chapter** (4 tasks): verify homepage + Stage 1 overview + each of the six chapters renders with badge.
   - **Phase 5 — US4 Co-Authoring a Chapter** (3 tasks): author `01-foundations.mdx` end-to-end, generate + integrate one image, verify badge transition.
   - **Phase 6 — US2 Navigate Between Stages** (2 tasks): sidebar expand/collapse, stage header navigation.
   - **Phase 7 — US3 Find a Chapter by Topic** (1 task): sidebar lists all six Stage 1 chapters.
   - **Phase 8 — Polish** (4 tasks): README "How to contribute", Lighthouse a11y check, 3G load check, Stages 2–4 stub 404 check.

4. **Format compliance.** Every task follows the checklist format:
   `- [ ] [ID] [P?] [Story?] Description with file path`
   - Setup / Foundational / Polish tasks have no `[Story]` label (per the rules).
   - User-story tasks have `[US1]` / `[US2]` / etc. labels.
   - `[P]` markers applied to genuinely parallelizable tasks (different files, no dependencies).
   - Every task includes an exact file path.

5. **Dependencies & Execution Order** section explicitly maps:
   - Setup → Foundational → US5 → US1 → US4 → US2/US3 → Polish.
   - US5 → US1 is a sequential dependency (build must be green before chapter-rendering verification).
   - US1 → US4 is a sequential dependency (the chapter to co-author must render first).
   - US2 and US3 can run in parallel after US1.

6. **MVP scope** identified as US5 + US1 (7 tasks across Setup + Foundational + US5 + US1) — the smallest slice that proves the textbook is reachable.

## Outcome

- ✅ Impact: 27 immediately executable tasks. Each is small, file-path-precise, and independently verifiable. The MVP (US5 + US1) is the natural starting point; US4, US2, US3, and Polish land incrementally.
- 🧪 Tests: none — Phase A is smoke-only per R-008.
- 📁 Files: `specs/001-book-foundation/tasks.md` (generated); this PHR.
- 🔁 Next prompts:
  1. **Run the MVP** — T001–T004 (Setup), T005–T010 (Foundational), T011–T013 (US5), T014–T017 (US1). After these 17 tasks, the textbook is deployable and all six Stage 1 placeholder chapters render with badges.
  2. **Author Stage 1** — T018–T020 (US4) prove the co-authoring workflow on one chapter.
  3. **Verify navigation** — T021–T023 (US2 + US3).
  4. **Polish** — T024–T027.
- 🧠 Reflection: The task list is tight (27 vs. the 60+ files in the bootstrap) because the bootstrap did most of the structural work. The tasks focus on (a) verification that the scaffold matches the spec, (b) wiring the new components (CI, frontmatter validator, ChapterState badge), (c) one proof-run of the co-authoring workflow, and (d) acceptance verification. Each user story has a small, concrete independent test — this is what makes "stop at any checkpoint to validate" possible.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): n/a — task generation is documentation.
- Prompt variant (if applicable): n/a — empty `$ARGUMENTS`.
- Next experiment (smallest change to try): start with `npm install` in `edu-site/` and verify the existing scaffold boots before any code change. Then add the Foundational pieces (T005–T010) one at a time, verifying the build after each.
