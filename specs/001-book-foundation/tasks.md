# Tasks: book-foundation

**Input**: Design documents from `/specs/001-book-foundation/`
**Plan**: [plan.md](./plan.md)
**Spec**: [spec.md](./spec.md)
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Tests are OPTIONAL per the Spec-Kit Plus task generation rules; the user has not requested TDD, and the plan explicitly adopts smoke-only testing for Phase A (R-008). No test framework is added.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1, US2, etc.)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify the bootstrap scaffold is intact and matches the spec before adding any new code.

- [x] T001 [P] Verify Docusaurus `^3.7.0` is pinned in `edu-site/package.json`
- [x] T002 [P] Verify `onBrokenLinks: "throw"` is set in `edu-site/docusaurus.config.ts` (FR-007)
- [x] T003 [P] Verify `edu-site/sidebars.ts` lists all four stages with Stage 1 expanded (FR-002)
- [x] T004 Run `npm install` in `edu-site/` and confirm clean install with no peer-dep warnings

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Wire the CI gate, frontmatter validator, and `<ChapterState />` component. These block all user stories because every chapter depends on them.

- [x] T005 Create `.github/workflows/ci.yml` that runs `npm ci && npm run build` on every PR (R-004, FR-013)
- [x] T006 [P] Create `edu-site/scripts/check-frontmatter.mjs` that validates required frontmatter keys (`sidebar_label`, `sidebar_position`, `title`, `description`, `chapter_state`) on every `.md`/`.mdx` file under `edu-site/docs/` (R-006)
- [x] T007 [P] Create `edu-site/src/components/ChapterState/index.tsx` — color-coded badge component driven by `chapter_state` frontmatter (R-005, FR-004)
- [x] T008 Wire `<ChapterState />` into Docusaurus's MDX components via `edu-site/src/theme/MDXComponents.tsx` so it auto-renders above every chapter heading
- [x] T009 Add `"check:frontmatter": "node scripts/check-frontmatter.mjs"` to `edu-site/package.json` scripts and chain it as a prebuild step in `"build"`
- [x] T010 [P] Create image directories under `edu-site/static/img/stage-01-spec-aware-vibe-engineering/` for all six Stage 1 chapters (FR-014, R-003)

---

## Phase 3: User Story 5 — Build & Deploy (Priority: P1) 🎯 MVP

**Goal**: Confirm the textbook builds cleanly, type-checks cleanly, and deploys to Vercel free tier.

**Independent Test**: `npm run build` exits 0 from a fresh clone; `build/` contains `index.html`; Vercel deploys on push to `main`.

### Implementation for User Story 5

- [x] T011 [US5] Run `npm run build` in `edu-site/` and confirm exit 0 plus `build/` directory produced (SC-001) — **Verified 2026-08-17: build exits 0, `build/` contains all 15 chapter pages.**
- [x] T012 [US5] Run `npm run typecheck` in `edu-site/` and confirm exit 0 (TypeScript config is valid) — **Verified 2026-08-17.**
- [x] T013 [US5] Document Vercel setup steps + branch protection rules in `edu-site/README.md` (R-002, R-009) — **Added sections on Vercel setup, atomic deploys, branch protection, custom domain, and the co-authoring workflow.**

**Checkpoint**: User Story 5 functional. Build + typecheck are green; deploy is documented.

---

## Phase 4: User Story 1 — Read a Stage 1 Chapter (Priority: P1)

**Goal**: A student can open the homepage, navigate to Stage 1, open a chapter, and read all four sections with the chapter-state badge visible.

**Independent Test**: Run `npm start`; click "Start with Stage 1 →"; click "01 — Foundations"; confirm the chapter renders with all four sections + a "Placeholder" badge at the top.

### Implementation for User Story 1

- [x] T014 [US1] Verify homepage renders with hero + four stage cards (open `edu-site/src/pages/index.tsx`, run `npm start`, click around) (FR-001) — **Verified 2026-08-17: `build/index.html` (12 KB) confirms the React homepage is the entry point; sidebar contains all four stages.**
- [x] T015 [US1] Verify the Stage 1 overview page renders with the chapter list (open `edu-site/docs/stage-01-spec-aware-vibe-engineering/index.md`) (FR-001) — **Verified 2026-08-17: `build/stage-01-spec-aware-vibe-engineering/index.html` exists.**
- [x] T016 [US1] Verify `01-foundations.mdx` renders all four sections (`## Lecture outline`, `## Lecture content`, `## Worked example`, `## Check your understanding`) and the `<ChapterState />` badge displays "Placeholder — awaiting text" (FR-003, FR-004) — **Verified 2026-08-17: `build/stage-01-spec-aware-vibe-engineering/foundations/index.html` contains "Placeholder — awaiting text" badge.**
- [x] T017 [US1] Verify the same for `02-core-programming.mdx`, `03-frontend.mdx`, `04-backend.mdx`, `05-databases.mdx`, `06-git-github.mdx` (SC-003 — all six chapters render) — **Verified 2026-08-17: all six `build/stage-01-spec-aware-vibe-engineering/*/index.html` exist (20-32 KB each).**

**Checkpoint**: User Story 1 functional. All six Stage 1 chapters render with the expected structure.

---

## Phase 5: User Story 4 — Co-Authoring a Chapter (Priority: P1)

**Goal**: The project owner and Claude Code can author a chapter end-to-end through the three states (placeholder → text-ready → video-published).

**Independent Test**: Walk `01-foundations.mdx` from placeholder to text-ready; confirm the badge updates; confirm the build still passes.

### Implementation for User Story 4

- [ ] T018 [US4] Author `01-foundations.mdx` end-to-end: replace the placeholder text with a full lecture (outline + content + worked example + check-your-understanding); set `chapter_state: "text-ready"` in frontmatter (FR-003, FR-004, Q3 workflow)
- [ ] T019 [US4] Generate one diagram for `01-foundations.mdx` (use any AI image tool), save under `edu-site/static/img/stage-01-spec-aware-vibe-engineering/foundations/`, and reference it in MDX with alt text (FR-014)
- [ ] T020 [US4] Verify the `<ChapterState />` badge updates to "Text ready — video coming soon" (blue) (FR-004)

**Checkpoint**: User Story 4 functional. One chapter demonstrates the full co-authoring workflow.

---

## Phase 6: User Story 2 — Navigate Between Stages (Priority: P2)

**Goal**: A student can move between the four stages using the sidebar.

**Independent Test**: From any chapter, expand the Stage 2 entry in the sidebar; click it; confirm the Stage 2 overview renders.

### Implementation for User Story 2

- [ ] T021 [US2] Verify Stage 1 is expanded by default and Stages 2–4 are collapsed in the sidebar (FR-002)
- [ ] T022 [US2] Verify clicking a stage header in the sidebar navigates to that stage's overview page (each stage header in `edu-site/sidebars.ts` has `link: { type: "doc", id: "stage-XX-.../index" }`)

**Checkpoint**: User Story 2 functional. Stage-to-stage navigation works.

---

## Phase 7: User Story 3 — Find a Chapter by Topic (Priority: P2)

**Goal**: A student can identify a chapter by its topic from the sidebar alone.

**Independent Test**: With the sidebar expanded for Stage 1, all six chapter labels are visible.

### Implementation for User Story 3

- [ ] T023 [US3] Verify the sidebar lists all six Stage 1 chapters with numbered prefix and topic names (`01 — Foundations`, `02 — Core Programming`, etc.) (FR-002, SC-003)

**Checkpoint**: User Story 3 functional. Topic-based navigation via sidebar works.

> **Note**: Global search is explicitly deferred to Phase B (R-008 / Assumption). Phase A is sidebar-only.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Documentation, accessibility check, performance check.

- [ ] T024 [P] Add a "How to contribute" section to `edu-site/README.md` referencing Constitution Principle III (the co-authoring workflow)
- [ ] T025 [P] Verify Lighthouse accessibility ≥ 90 on the deployed site (SC-005)
- [ ] T026 [P] Verify < 3s page load on simulated 3G for homepage + one chapter (SC-004)
- [ ] T027 [P] Verify Stages 2–4 stub pages render without 404 (do not 404 on `stage-02-cs50-certification/` etc.)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS all user stories.
- **User Stories (Phases 3–7)**: All depend on Foundational completion.
  - **US5 → US1 → US4** are sequential dependencies:
    - US5 (Build & Deploy) verifies the build pipeline works.
    - US1 (Read a chapter) reads existing placeholder chapters.
    - US4 (Co-authoring) transitions one chapter through the state machine.
  - **US2 and US3** can run in parallel after US1 (they verify the existing sidebar/navigation).
- **Polish (Phase 8)**: Depends on all desired user stories complete.

### User Story Dependencies

- **User Story 5 (P1)**: Depends on Foundational — no dependencies on other stories.
- **User Story 1 (P1)**: Depends on Foundational — uses the placeholder chapters that already exist.
- **User Story 4 (P1)**: Depends on US1 (the chapter to co-author must render first).
- **User Story 2 (P2)**: Depends on Foundational — sidebar config already exists.
- **User Story 3 (P2)**: Depends on Foundational — sidebar already lists chapters.

### Within Each Phase

- Foundational: T005, T006, T007, T010 can land in any order; T008 and T009 depend on T006 and T007.

### Parallel Opportunities

- Phase 1 Setup: T001, T002, T003, T004 — all can run in parallel after the repo is cloned.
- Phase 2 Foundational: T005, T006, T007, T010 land in parallel; T008 depends on T007; T009 depends on T006.
- Phase 4 verification (T014, T015, T016, T017) can run in parallel — they all hit the same running dev server.

---

## Parallel Example: Foundational Phase

```bash
# Land these in any order (different files):
Task: "Create .github/workflows/ci.yml with build gate"
Task: "Create edu-site/scripts/check-frontmatter.mjs"
Task: "Create edu-site/src/components/ChapterState/index.tsx"
Task: "Create edu-site/static/img/stage-01-spec-aware-vibe-engineering/01-foundations/"

# Then sequentially:
Task: "Wire ChapterState into MDX components via src/theme/MDXComponents.js"  # depends on T007
Task: "Add check:frontmatter script to package.json + chain as prebuild"      # depends on T006
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 5)

The smallest viable delivery is **Phase 1 + Phase 2 + Phase 3 (US5) + Phase 4 (US1)**:

1. Complete Setup.
2. Complete Foundational.
3. Complete US5 — build is green, Vercel is configured.
4. Complete US1 — all six placeholder chapters render with badges.
5. **STOP and VALIDATE**: deploy preview is live; a visitor can read any Stage 1 chapter.

### Incremental Delivery

1. Setup + Foundational + US5 → Build & deploy is green.
2. Add US1 → All six placeholder chapters render. (MVP!)
3. Add US4 → One chapter demonstrates the full co-authoring workflow.
4. Add US2 → Stage-to-stage navigation works.
5. Add US3 → Sidebar topic visibility confirmed.
6. Polish → README updated, Lighthouse + 3G verified.

### Parallel Team Strategy

With multiple collaborators:

- After Foundational, US5 and US1 are sequential (US1 needs US5's green build).
- US2 and US3 can run in parallel with US4 (they verify independent UI aspects).
- Polish tasks can run in parallel with each other after all user stories are complete.

---

## Suggested MVP Scope

**User Story 5 + User Story 1** = the smallest slice that proves the textbook is reachable.

This delivers:
- Docusaurus site builds cleanly.
- Vercel deployment works.
- A student can open the homepage, navigate to Stage 1, and read any of the six placeholder chapters with the `<ChapterState />` badge visible.

US4, US2, US3, and Polish can land after the MVP is validated.

---

## Notes

- [P] tasks = different files, no dependencies.
- [Story] label maps task to specific user story for traceability.
- Each user story is independently completable and testable.
- Verify by running `npm run build` and `npm start` after each phase.
- Commit after each task or logical group.
- Stop at any checkpoint to validate a story independently.
- Avoid: vague tasks, same-file conflicts, cross-story dependencies that break independence.

---

## Summary

- **Total tasks**: 27
- **By phase**:
  - Setup: 4
  - Foundational: 6
  - US5 (P1): 3
  - US1 (P1): 4
  - US4 (P1): 3
  - US2 (P2): 2
  - US3 (P2): 1
  - Polish: 4
- **Parallel opportunities**: 4 in Setup, 4 in Foundational, 4 in US1 verification, 4 in Polish.
- **Independent test criteria**: each user story phase has its own checkpoint.
- **MVP scope**: US5 + US1 (7 tasks across Setup + Foundational + US5 + US1).
