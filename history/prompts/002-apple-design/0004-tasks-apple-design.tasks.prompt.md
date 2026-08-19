---
id: 0004
title: Generate tasks for Apple-inspired theme transformation
stage: tasks
date: 2026-08-17
surface: agent
model: claude-opus-4-7
feature: 002-apple-design
branch: 002-apple-design
user: Dell
command: /sp.tasks
labels: [tasks, apple-design, theme, motion-removal, user-stories, dependencies, parallel-execution]
links:
  spec: specs/002-apple-design/spec.md
  ticket: null
  adr: history/adr/0001-free-tier-llm-choice.md (cross-ref)
  pr: null
files:
  - specs/002-apple-design/tasks.md (created — 48 tasks across 8 phases: Setup, Foundational Tokens, US1 Homepage MVP, US2 Light/Dark, US3 Interaction, US4 Curriculum Personality, Motion Removal & Dep Prune, Polish & Fidelity Review)
tests:
  - checklist format validation — all 48 tasks follow strict `- [ ] [TaskID] [P?] [Story?] Description with file path`
  - user story coverage — US1 (4 tasks), US2 (6 tasks), US3 (5 tasks), US4 (7 tasks)
  - parallel markers — 26 [P] tasks identified
---

## Prompt

> /sp.tasks

## Response snapshot

- Ran `.specify/scripts/powershell/check-prerequisites.ps1 -Json` → confirmed `FEATURE_DIR` is `specs/002-apple-design`, available docs include `research.md`, `data-model.md`, `contracts/`, `quickstart.md`.
- Read active design documents: `spec.md` (4 user stories, 14 FRs, 7 SCs, 5 clarifications), `plan.md` (Technical Context, removed deps `lenis`/`gsap`/`@react-three/*`/`three`, 4 implementation phases), `research.md` (R-001…R-007), `data-model.md` (token, surface, theme-mode entities), `contracts/design-system.md` (FR-014 review checklist, motion/surface/a11y contracts), `quickstart.md` (migration commands + acceptance walk).
- Inspected the live `edu-site/` tree (`package.json`, `src/components/`, `src/css/`) to verify all target file paths exist before writing tasks.
- Generated `specs/002-apple-design/tasks.md` containing **48 dependency-ordered tasks** across 8 phases:
  - **Phase 1: Setup** (T001–T003): Branch check, baseline build capture, token preview.
  - **Phase 2: Foundational — Token & Type Foundation** (T004–T010, BLOCKING): Muted stage accents, Apple-blue primary, glass/surface tokens, typography tuning per R-004, Instrument Serif reserved slot, 2px focus ring in `a11y.css`, Open Props pruning.
  - **Phase 3: User Story 1 — Calm, Premium Homepage (P1, MVP)** (T011–T014): Static CSS hero panel, restyled styles, `index.tsx` wiring, blur fallback.
  - **Phase 4: User Story 2 — Read Comfortably Across Light/Dark (P1)** (T015–T020): Mode parity audit, Callout semantic tokens, dark-mode override layer, blur fallback rules, DataViz mode parity, forced-colors hardening.
  - **Phase 5: User Story 3 — Navigate and Interact with Confident Feedback (P1)** (T021–T025): Focus ring applied to all controls, hover/active/disabled/current-page states, responsive overflow audit at 320/768/1440px, DataViz `overflow-x: auto` wrappers, Root.tsx colorMode toggle.
  - **Phase 6: User Story 4 — Preserve Curriculum's Technical Personality (P2)** (T026–T032): StageCard muted accent chip, ChapterState pill restyle, stage-icons fills, CurriculumBarChart single-accent palette, CurriculumDonut neutral steps, LegendStrip label-first identity, provider chips neutral confirmation.
  - **Phase 7: Motion Removal & Dependency Pruning** (T033–T040): Remove Lenis init from Root.tsx, delete `Hero3D/` and `ScrollFX/` dirs, delete motion CSS files, prune `docusaurus.config.ts`, `npm remove lenis gsap @react-three/* three`, verify `RevealOnScroll` honors `prefers-reduced-motion`, audit MagicUI/Aceternity components.
  - **Phase 8: Polish & Cross-Cutting Concerns** (T041–T048): `npm run build`, `tsc`, `check-frontmatter.mjs`, FR-014 design-fidelity review walk, Lighthouse + axe audit, free-tier guarantee confirmation, site copy check, PHR sync.
- Included Phase Dependencies, User Story Dependencies, 26 Parallel Opportunities (`[P]`), Parallel Execution Example for Phase 6, MVP Strategy (US1 only), Incremental Delivery Strategy, and Parallel Team Strategy.

## Outcome

- ✅ **Artifact**: `specs/002-apple-design/tasks.md` created with 48 tasks, 100% compliant with the `- [ ] [TaskID] [P?] [Story?] Description with file path` checklist format.
- 🎯 **MVP Scope**: Phase 1 + Phase 2 + Phase 3 (T001–T014) delivers the calm static homepage in both modes with no WebGL canvas.
- ⚡ **Parallel Opportunities**: 26 tasks marked `[P]` across 7 phases (file-isolated with no cross-dependencies).
- 🧪 **Independent Test Criteria**: Defined for each of the 4 user stories (US1 homepage, US2 light/dark reading, US3 interaction/a11y, US4 stage/chart personality) plus Phase 7 (motion grep).
- 🔁 **Next prompts**: `/sp.implement` to begin Phase 1 setup and Phase 2 foundational token execution.

## Evaluation notes (flywheel)

- Failure modes observed: none; all target paths verified against live `edu-site/` tree.
- Graders run and results: 100% checklist format pass · all 4 user stories covered · zero cross-story dependency violations.
- Next experiment: execute Phase 1 + Phase 2 via `/sp.implement`, verify baseline `npm run build` exits 0 with new tokens.
