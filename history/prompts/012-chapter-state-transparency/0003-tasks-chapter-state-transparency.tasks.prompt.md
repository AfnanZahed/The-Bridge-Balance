---
id: 0003
title: Tasks chapter state transparency
stage: tasks
date: 2026-08-25
surface: agent
model: cc/claude-sonnet-5
feature: 012-chapter-state-transparency
branch: 012-chapter-state-transparency
user: Book
command: /sp.tasks
labels: ["frontend", "reader-controls", "tasks", "edu-site"]
links:
  spec: specs/012-chapter-state-transparency/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/012-chapter-state-transparency/tasks.md
tests:
---

## Prompt

specify the above things, and then /sp.plan at your own, and then /sp.tasks at your own and then /sp.implement at your own, because I am going to sleep and till the morning, this all must be done very carefully, note that since i am not here in front of laptop using you, you muse be careful of errors and bugs. also note that my monthly claude code's pro plan has a limited quota, so you has to work efficiently, with same quality as burnig a lot of token, but without burning a lof of token. Now, Go Ahead my lion, My wishes are with you. ultrathink

## Response snapshot

Ran `check-prerequisites.ps1 -Json` and parsed output: `FEATURE_DIR=C:\Users\Dell\Desktop\Book\specs\012-chapter-state-transparency`, `AVAILABLE_DOCS=[research.md, data-model.md, contracts/, quickstart.md]`.

Read `.specify/templates/tasks-template.md` in full and wrote `specs/012-chapter-state-transparency/tasks.md` from it. Structured as 4 phases:

- **Phase 1: Foundational** (T001–T006, all parallelizable) — 6 read-only verification tasks that confirm the existing wiring for both user stories works as the plan assumes. Covers: chapter_state audit, MDXComponents wiring, STATE_META coverage, custom.css class coverage, ReaderControls `authored.combinations.size` access, types.ts constants. These MUST pass before either user story can ship; if any task in this phase reveals a discrepancy, the corresponding user story is blocked.

- **Phase 2: US1 P1 (placeholder badges)** (T007–T010) — frontmatter audit of all 15 placeholder files (T007), visual verification of the `.tbb-chapter-state--placeholder` rendering (T008), visual verification of the 4 stage-index overviews rendering NO badge (T009), visual verification of the 2 text-ready chapters rendering the cyan pulse badge (T010). 4 tasks, sequential within the phase.

- **Phase 3: US2 P2 (completeness indicator)** (T011–T017) — add the `.completeness` CSS class per research.md R-004 (T011), compute `completenessCount` in component scope (T012), insert the new `<p>` JSX (T013), null-before-hydrated guard (T014), manual verify on `intro.md` (T015), manual verify on `perf-targets.md` (T016), manual verify on a placeholder chapter (T017). 7 tasks, mostly sequential.

- **Phase 4: Polish** (T018–T026) — `PROJECT-MAP.md` and `migration-status.md` staleness review (T018, T019, [P]), three build gates (`check-frontmatter.mjs`, `check-chapter-quality.mjs`, `npm run build` — T020, T021, T022), `prefers-reduced-motion` check (T023, [P]), quickstart.md 7-step local verification (T024, [P]), local commit without push (T025), and the stage=implement PHR + morning report (T026).

Total: **26 tasks**. MVP (Phase 1 + Phase 2) is 10 tasks and meaningfully shippable on its own — US1 alone makes 15 of 17 doc pages honestly communicate their state. US2 is independently deliverable without affecting US1 (different files). Within-phase parallelization: Phase 1 has 6 [P] tasks; Phase 4 has 4 [P] tasks; US1 and US2 can run in parallel after Phase 1.

Documented all dependencies (T007 → T008, T011 → T012 → T013 → T014–T017), the within-phase order, the cross-phase blocking, the single shared "everything must be green before commit" guard at T020–T022, and the explicit "do NOT push" instruction at T025 honoring the user's standing overnight authorization boundary.

## Outcome

- ✅ Impact: tasks.md written and self-validated against the template's required sections (Setup merged into Foundational since this is not a greenfield project; Foundational, US1, US2, Polish phases all present; Dependencies & Execution Order, Parallel Example, Implementation Strategy, and Notes all filled). 26 tasks, each with exact file paths and the `[P]`/`[US1]`/`[US2]` markers per the template's strict checklist format.
- 🧪 Tests: no new test tasks generated (tests are OPTIONAL per the spec; existing quality gates are the test surface, documented in T020–T022).
- 📁 Files: `specs/012-chapter-state-transparency/tasks.md` (new, 26 tasks across 4 phases).
- 🔁 Next prompts: proceed autonomously to `/sp.implement`, per the user's standing overnight instruction — no further user input available until morning.
- 🧠 Reflection: the user asked for "spec → plan → tasks → implement at your own" and that contract is now three-quarters done. The tasks file captures the smallest-viable-diff reality of the plan (10 MVP tasks for the wide-reaching P1 work; 7 tasks for the narrower P2 work; 9 polish tasks for gates/docs/commit/PHR) without over-engineering into a 50-task sprawl. The `[P]` markers are honest — Phase 1's 6 read-only verifications are truly independent; Phase 4's docs/gates/quickstart work is truly independent of each other.

## Evaluation notes (flywheel)

- Failure modes observed: none this stretch (one pre-existing Bash/pwsh invocation gotcha from earlier stretches, not re-encountered).
- Graders run and results (PASS/FAIL): checklist format — PASS (all 26 tasks follow `- [ ] [Tnnn] [P?] [Story?] Description with file path`); phase structure — PASS (Foundational + 2 user stories + Polish, in priority order); MVP scope — PASS (US1 alone is a meaningful MVP per spec's "widest-reaching" rationale); dependencies — PASS (no cross-story code dependencies; US1 and US2 touch different files).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): during `/sp.implement`, if any task in Phase 1 reveals a real discrepancy (e.g., a placeholder doc with no `chapter_state` field at all, or `MDXComponents.tsx`'s gating different from what's documented), document the divergence in the implement-stage PHR and adapt the affected downstream tasks rather than re-running the plan stage.
