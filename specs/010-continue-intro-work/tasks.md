# Tasks: Harden, Verify, and Ship the Differentiated Intros

**Input**: Design documents from `/specs/010-continue-intro-work/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Spec does not request automated tests; verification is audit + live check + typecheck/build + diff-stat + routing resolution. No automated test tasks generated.

**Organization**: Tasks are grouped by user story to enable independent verification of each story.

**Format**: `[ID] [P?] [Story] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Web app (Docusaurus)**: `edu-site/docs/`, `edu-site/src/components/ReaderControls/`, `edu-site/build/`, `specs/009-differentiated-intros/`, `history/prompts/009-differentiated-intros/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the implementation-complete `009-differentiated-intros` branch has every prerequisite before verification starts.

- [x] T001 Confirm presence of `edu-site/docs/intro.md`, `edu-site/src/components/ReaderControls/types.ts`, `edu-site/src/components/ReaderControls/index.tsx`, and `edu-site/src/components/ReaderControls/ReaderControls.module.css` so verification targets exist
- [x] T002 Confirm `specs/009-differentiated-intros/comparison-matrix.md` exists with all nine C1–C9 rows and a Verdict column

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Confirm typecheck and Docusaurus build succeed before any user-story verification. If these fail, no downstream verification is meaningful.

**⚠️ CRITICAL**: No user-story verification can begin until this phase is complete.

- [x] T003 Run `npm run typecheck` in `edu-site/` and verify PASS
- [x] T004 Run `npx docusaurus build` in `edu-site/` and verify SUCCESS, producing `edu-site/build/`

**Checkpoint**: Foundation ready — typecheck and build are green; user-story verification can now begin.

---

## Phase 3: User Story 1 - Verify differentiation empirically (Priority: P1)

**Goal**: The reviewer-blind matrix audit returns `unique` for all nine rows and the audit log records reviewer identity and date.

**Independent Test**: An independent reviewer (blind to version labels) can match each version to its lens from the comparison matrix with ≥ 90% accuracy; pairwise review finds zero duplicate verdicts.

### Implementation for User Story 1

- [x] T005 [US1] Run a pairwise duplicate check on `specs/009-differentiated-intros/comparison-matrix.md` covering primary lens, scenario, structure, and takeaway for every pair of C1–C9 rows; record any duplicate dimension per row
- [x] T006 [US1] Record the audit outcome in `specs/009-differentiated-intros/audit-log.md` per the Audit Log contract (reviewer, date, per-row verdict, summary)
- [x] T007 [US1] If any duplicate verdict is assigned, revert the affected row in `specs/009-differentiated-intros/comparison-matrix.md` to `pending` and document the cause in the audit log

**Checkpoint**: Audit log shows 9/9 rows `unique` with named reviewer and date ≥ 2026-08-20; SC-001 satisfied.

---

## Phase 4: User Story 2 - Confirm reader-control description surface (Priority: P1)

**Goal**: The reader controls above the intro page expose each combination's lens, real-world use, and choosing guidance; switching combinations updates the description live.

**Independent Test**: A live check confirms visibility, content, `aria-describedby` linkage, and live update on at least 4 of the 9 combinations.

### Implementation for User Story 2

- [x] T008 [US2] Start a local Docusaurus serve from `edu-site/` on port 4173 (preferred path); record the URL in `specs/009-differentiated-intros/live-check-result.md` if successful
- [x] T009 [P] [US2] Drive Playwright (via MCP `mcp__playwright__*`) to open the served intro page and verify the description node is visible, contains the lens label, and contains the "choose this if" sentence
- [x] T010 [P] [US2] Drive Playwright to confirm the controls' `aria-describedby` references the description node's `id`
- [x] T011 [P] [US2] Drive Playwright to exercise at least four different combinations (e.g., `beginner|summary`, `beginner|detailed`, `intermediate|balanced`, `advanced|detailed`) and confirm the description text updates without a page reload
- [x] T012 [US2] Record the live check result in `specs/009-differentiated-intros/live-check-result.md` per the Live Check Result contract (mode = `playwright`); if any check fails, document the failure
- [x] T013 [US2] If a live server cannot be started or Playwright cannot run, fall back to static DOM inspection: parse `edu-site/build/index.html` for the description node and `aria-describedby` linkage; record the result in `specs/009-differentiated-intros/live-check-result.md` (mode = `static-dom`)

**Checkpoint**: Live check result has every required check `pass` and at least 4 combinations exercised; SC-002 satisfied.

---

## Phase 5: User Story 3 - Produce a publication-ready branch (Priority: P2)

**Goal**: The `009-differentiated-intros` branch is self-documenting and PR-ready, with build, diff cleanliness, and final PHR in place.

**Independent Test**: `npm run typecheck` and `npx docusaurus build` succeed; `git diff main --stat` shows only files mapped to a task or to this spec; the final PHR lists every changed file.

### Implementation for User Story 3

- [x] T014 [US3] Run `git diff main --stat` from the repo root and list every modified file in the final PHR
- [x] T015 [US3] Verify each modified file maps either to a task in `specs/009-differentiated-intros/tasks.md` or to this spec; if any file is unmapped, revert it as an unrelated drive-by edit
- [x] T016 [P] [US3] Capture the typecheck PASS and build SUCCESS results (already produced in T003/T004) for the final PHR's tests section

**Checkpoint**: Branch is clean, build is green, and the final PHR has the data it needs; SC-003 and SC-005 satisfied.

---

## Phase 6: User Story 4 - Hand off to the next curriculum step (Priority: P3)

**Goal**: The "Where to start" routing table at the bottom of the intro page resolves cleanly in the build, with documented fallbacks for any missing destination.

**Independent Test**: Each Stage link resolves to a file under `edu-site/build/` after `npx docusaurus build`; missing destinations carry a documented fallback.

### Implementation for User Story 4

- [x] T017 [US4] For each routing link in `edu-site/docs/intro.md`'s "Where to start" table, confirm `edu-site/build/<route>/index.html` exists after the build from T004
- [x] T018 [US4] Record the routing resolution result in the `routing` section of `specs/009-differentiated-intros/live-check-result.md` per the Routing Resolution contract; for any missing destination, document a fallback (e.g., use Stage 3 instead)

**Checkpoint**: All Stage links resolve or carry a documented fallback; SC-006 satisfied.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final implementation PHR and branch state transition.

- [x] T019 [P] Write the final implementation PHR at `history/prompts/009-differentiated-intros/0007-differentiated-intros.publish.green.prompt.md` with every changed file, the audit log path, the live check result path, the routing resolution result, the typecheck/build results, the `git diff main --stat` summary, and the explicit ship state
- [x] T020 [P] Mark the branch publication state as `pr-ready` in the final PHR once all previous tasks are complete and the acceptance gate is satisfied

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories.
- **User Stories (Phase 3–6)**: All depend on Foundational phase completion.
  - US1 (Phase 3) and US2 (Phase 4) are P1 and can run in parallel after Foundational.
  - US3 (Phase 5) depends on US1 + US2 because the final PHR references both.
  - US4 (Phase 6) depends on Foundational only (uses the existing `build/` from T004).
- **Polish (Phase 7)**: Depends on all four user-story phases.

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational — no dependencies on other stories.
- **US2 (P1)**: Can start after Foundational — independent of US1.
- **US3 (P2)**: Can start after US1 + US2 — needs audit log + live check result paths.
- **US4 (P3)**: Can start after Foundational — independent of US1/US2/US3.

### Within Each Phase

- Setup tasks (T001, T002) can run in parallel.
- Foundational tasks (T003, T004) must run sequentially — build depends on typecheck.
- US1 tasks (T005–T007) run sequentially: audit before log; log before any revert.
- US2 tasks (T009–T011) can run in parallel after the server is up (T008); fallback (T013) is exclusive with Playwright path.

### Parallel Opportunities

- T001 and T002 (Setup) can run in parallel.
- T009, T010, T011 (US2 Playwright checks) can run in parallel.
- T019 and T020 (Polish) can run in parallel.

---

## Parallel Example: User Story 2

```text
# After the server is running (T008), launch the three Playwright checks in parallel:
Task: "Drive Playwright (via MCP mcp__playwright__*) to open the served intro page and verify the description node is visible, contains the lens label, and contains the 'choose this if' sentence"
Task: "Drive Playwright to confirm the controls' aria-describedby references the description node's id"
Task: "Drive Playwright to exercise at least four different combinations and confirm the description text updates without a page reload"
```

---

## Implementation Strategy

### MVP First (US1 + US2)

1. Complete Phase 1: Setup (T001–T002).
2. Complete Phase 2: Foundational (T003–T004).
3. Complete Phase 3: US1 matrix audit (T005–T007).
4. Complete Phase 4: US2 live check (T008–T013).
5. **STOP and VALIDATE**: Audit log + live check result both present; matrix `unique` for all rows; description surface verified.
6. Demo if ready — the editorial gate and live surface both proven.

### Incremental Delivery

1. Setup + Foundational → prerequisites confirmed.
2. US1 → matrix audit passes.
3. US2 → reader-control description surface verified live (or static fallback).
4. US4 → routing links resolve.
5. US3 → branch is PR-ready.
6. Polish → final PHR + ship state.

### Parallel Team Strategy

With one maintainer:
1. Run T001–T004 sequentially (Setup + Foundational).
2. Run T005–T007 (US1) and T008–T013 (US2) sequentially; the matrix audit and live check both produce small, independent artifacts.
3. T017–T018 (US4 routing) can run as soon as T004 finishes; record its result in the live-check artifact.
4. T019–T020 (Polish) close out the publication pass.

---

## Notes

- [P] tasks = different files, no dependencies.
- [Story] label maps task to specific user story for traceability.
- The branch in scope is `009-differentiated-intros`; this task list produces verification artifacts and a final PHR for that branch.
- The active working branch is `010-continue-intro-work`; the final PHR lives under `history/prompts/009-differentiated-intros/` because it closes the 009 branch.
- Avoid: editing code unless verification fails; introducing new dependencies; opening unrelated drive-by edits.
- Stop at any checkpoint to validate a story independently before proceeding.
