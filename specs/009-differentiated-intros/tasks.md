# Tasks: Nine Distinct Intro Reading Paths

**Input**: Design documents from `/specs/009-differentiated-intros/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Spec does not explicitly request automated tests; verification is editorial matrix review plus typecheck/build. Tests are NOT generated.

**Organization**: Tasks are grouped by user story to enable independent authoring and review of each story.

**Format**: `[ID] [P?] [Story] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Web app (Docusaurus)**: `edu-site/docs/`, `edu-site/src/components/ReaderControls/`, `specs/009-differentiated-intros/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish the editorial scaffolding before any prose is rewritten.

- [x] T001 Create comparison matrix skeleton at specs/009-differentiated-intros/comparison-matrix.md with header row (Cell id, Difficulty, Length, Audience, Lens, Scenario, Decision value, Structure, Evidence, Takeaway, Verdict)
- [x] T002 Create lens registry at specs/009-differentiated-intros/lens-registry.md listing C1–C9 with assigned lens, audience promise, and one-sentence scenario sketch

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Author the nine reading contracts before any prose is written. No intro-version rewrite can begin until all nine contracts exist.

**⚠️ CRITICAL**: No user-story prose work can begin until this phase is complete.

- [x] T003 [P] Author Reading Contract C1 (beginner/summary — safety rule) at specs/009-differentiated-intros/comparison-matrix.md row 1
- [x] T004 [P] Author Reading Contract C2 (beginner/balanced — everyday analogy) at specs/009-differentiated-intros/comparison-matrix.md row 2
- [x] T005 [P] Author Reading Contract C3 (beginner/detailed — boundary checklist) at specs/009-differentiated-intros/comparison-matrix.md row 3
- [x] T006 [P] Author Reading Contract C4 (intermediate/summary — decision framework) at specs/009-differentiated-intros/comparison-matrix.md row 4
- [x] T007 [P] Author Reading Contract C5 (intermediate/balanced — responsibility map) at specs/009-differentiated-intros/comparison-matrix.md row 5
- [x] T008 [P] Author Reading Contract C6 (intermediate/detailed — experiment-to-system transition) at specs/009-differentiated-intros/comparison-matrix.md row 6
- [x] T009 [P] Author Reading Contract C7 (advanced/summary — strategic scarcity) at specs/009-differentiated-intros/comparison-matrix.md row 7
- [x] T010 [P] Author Reading Contract C8 (advanced/balanced — governance and trust boundaries) at specs/009-differentiated-intros/comparison-matrix.md row 8
- [x] T011 [P] Author Reading Contract C9 (advanced/detailed — scalable ownership architecture) at specs/009-differentiated-intros/comparison-matrix.md row 9
- [x] T012 Verify lens uniqueness across all nine contracts in specs/009-differentiated-intros/comparison-matrix.md (no two rows share the same lens)

**Checkpoint**: Foundation ready — nine contracts exist with unique lenses; user-story prose work can begin.

---

## Phase 3: User Story 1 - Choose the right mental model (Priority: P1) 🎯 MVP

**Goal**: Each of the nine `<Version>` blocks in edu-site/docs/intro.md delivers the lens promised by its contract and produces a unique mental model.

**Independent Test**: Blind lens matching — 90% of reviewers identify each version's lens from opening and body alone; pairwise review confirms different examples, structure, and takeaway.

### Implementation for User Story 1

- [x] T013 [P] [US1] Rewrite <Version difficulty="beginner" length="summary"> in edu-site/docs/intro.md to fulfill Contract C1 (safety rule)
- [x] T014 [P] [US1] Rewrite <Version difficulty="beginner" length="balanced"> in edu-site/docs/intro.md to fulfill Contract C2 (everyday analogy)
- [x] T015 [P] [US1] Rewrite <Version difficulty="beginner" length="detailed"> in edu-site/docs/intro.md to fulfill Contract C3 (boundary checklist)
- [x] T016 [P] [US1] Rewrite <Version difficulty="intermediate" length="summary"> in edu-site/docs/intro.md to fulfill Contract C4 (decision framework)
- [x] T017 [P] [US1] Rewrite <Version difficulty="intermediate" length="balanced"> in edu-site/docs/intro.md to fulfill Contract C5 (responsibility map)
- [x] T018 [P] [US1] Rewrite <Version difficulty="intermediate" length="detailed"> in edu-site/docs/intro.md to fulfill Contract C6 (experiment-to-system transition)
- [x] T019 [P] [US1] Rewrite <Version difficulty="advanced" length="summary"> in edu-site/docs/intro.md to fulfill Contract C7 (strategic scarcity)
- [x] T020 [P] [US1] Rewrite <Version difficulty="advanced" length="balanced"> in edu-site/docs/intro.md to fulfill Contract C8 (governance and trust boundaries)
- [x] T021 [P] [US1] Rewrite <Version difficulty="advanced" length="detailed"> in edu-site/docs/intro.md to fulfill Contract C9 (scalable ownership architecture)
- [x] T022 [US1] Update the Shared sources block at the bottom of edu-site/docs/intro.md so references remain canonical and consistent across versions

**Checkpoint**: All nine versions rewritten; each opens with its promised lens; pairwise differences visible.

---

## Phase 4: User Story 2 - Apply the lesson to a real situation (Priority: P1)

**Goal**: Every version includes one concrete real-world scenario and ends with an explicit actionable takeaway.

**Independent Test**: For each version, an answer is unambiguous to: Which scenario does it illuminate? Which decision does it improve? What action should the reader take next?

### Implementation for User Story 2

- [x] T023 [US2] Audit each <Version> in edu-site/docs/intro.md for a concrete scenario, a decision value statement, and a closing actionable takeaway; record findings in specs/009-differentiated-intros/comparison-matrix.md Verdict column
- [x] T024 [P] [US2] Add an explicit "What you can do next" closing line to every <Version> in edu-site/docs/intro.md that lacks one (no paraphrase; must reference the version's own scenario)
- [x] T025 [US2] Confirm every scenario cited in edu-site/docs/intro.md appears in the canonical Shared sources block and is attributable

**Checkpoint**: Each version passes the scenario + decision + takeaway test.

---

## Phase 5: User Story 3 - Navigate the versions without confusion (Priority: P2)

**Goal**: Reader controls expose each version's difficulty, length, unique lens, and expected practical outcome so a first-time reader can choose a version within 30 seconds.

**Independent Test**: A first-time visitor reads the visible option descriptions and selects the version matching a stated goal within 30 seconds; selected version's content matches the description.

### Implementation for User Story 3

- [x] T026 [US3] Inspect edu-site/src/components/ReaderControls/ for the option-data model and confirm whether each option currently exposes difficulty and length only
- [x] T027 [P] [US3] If the option data model lacks a description field, add a concise description string per cell (C1–C9) to the AuthoredCombinations list in edu-site/src/components/ReaderControls/AuthoredCombinations.ts without adding a new control dimension
- [x] T028 [US3] Verify the reader-control UI in edu-site/src/components/ReaderControls/index.tsx renders the description (or, if no change was needed in T027, document the existing rationale in specs/009-differentiated-intros/comparison-matrix.md Notes)

**Checkpoint**: Reader-control options surface lens and practical value without introducing a new control dimension.

---

## Phase 6: User Story 4 - Preserve one coherent curriculum thesis (Priority: P2)

**Goal**: All nine versions agree on the shared thesis (humans specify, bound, verify, and own; AI may accelerate implementation) and on the four curriculum stages, with no contradictory claims.

**Independent Test**: Editorial thesis check passes for every version; SC-006 holds (zero contradictory claims).

### Implementation for User Story 4

- [x] T029 [US4] Run a shared-thesis compliance pass against every <Version> in edu-site/docs/intro.md using the contract at specs/009-differentiated-intros/contracts/reading-contracts.md; record any gaps in specs/009-differentiated-intros/comparison-matrix.md Notes
- [x] T030 [US4] Resolve any thesis or curriculum-stage gaps by editing the affected <Version> in edu-site/docs/intro.md

**Checkpoint**: All nine versions pass thesis compliance; comparison matrix shows zero contradictory claims.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Editorial matrix review, build verification, and documentation closure.

- [x] T031 [P] Complete the Verdict column in specs/009-differentiated-intros/comparison-matrix.md for all nine rows (unique / duplicate lens / duplicate scenario / duplicate structure / duplicate takeaway); a row with any duplicate verdict blocks publication
- [x] T032 Run npm run typecheck in edu-site/ and verify PASS
- [x] T033 Run npx docusaurus build in edu-site/ and verify PASS
- [ ] T034 If T027 added a description field, run a Playwright live check at / (or localhost) to confirm each option exposes difficulty, length, lens, and practical outcome
- [x] T035 [P] Record the implementation PHR under history/prompts/009-differentiated-intros/ capturing the final state, files changed, and verification results

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories.
- **User Stories (Phase 3–6)**: All depend on Foundational phase completion.
  - US1 (Phase 3) and US2 (Phase 4) are P1; both can run in parallel after Foundational, but US2 audits US1's output, so US2 typically follows US1 by one task.
  - US3 (Phase 5) and US4 (Phase 6) are P2; both depend on US1 and US2 prose being finalized.
  - US4 (Phase 6) depends on US1 (Phase 3) because the thesis check inspects the rewritten versions.
- **Polish (Phase 7)**: Depends on all four user-story phases.

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational — no dependencies on other stories.
- **US2 (P1)**: Can start after Foundational and after US1 prose is in place (T022 done).
- **US3 (P2)**: Can start after Foundational; depends on the reader-control inspection (T026) and conditional UI change (T027).
- **US4 (P2)**: Can start after US1 prose is in place; depends on US1 (T013–T022) so the thesis check inspects the final versions.

### Within Each Phase

- Setup tasks can run in parallel (T001, T002).
- Foundational contracts (T003–T011) can run in parallel; T012 verifies uniqueness.
- User Story 1 rewrites (T013–T021) can run in parallel because each edits a distinct `<Version>` block.
- User Story 3 inspection (T026) must complete before the conditional edit (T027).

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel.
- All Foundational contracts (T003–T011) can run in parallel.
- Once Foundational phase completes, all nine version rewrites (T013–T021) can run in parallel.
- US2 audit (T023) and US3 inspection (T026) can run in parallel because they inspect different files.

---

## Parallel Example: User Story 1

```text
# Launch all nine version rewrites together (different <Version> blocks in the same file, but
# each block is independent — coordinate edits by cell id rather than paragraph position):
Task: "Rewrite <Version difficulty=\"beginner\" length=\"summary\"> in edu-site/docs/intro.md to fulfill Contract C1 (safety rule)"
Task: "Rewrite <Version difficulty=\"beginner\" length=\"balanced\"> in edu-site/docs/intro.md to fulfill Contract C2 (everyday analogy)"
Task: "Rewrite <Version difficulty=\"beginner\" length=\"detailed\"> in edu-site/docs/intro.md to fulfill Contract C3 (boundary checklist)"
Task: "Rewrite <Version difficulty=\"intermediate\" length=\"summary\"> in edu-site/docs/intro.md to fulfill Contract C4 (decision framework)"
Task: "Rewrite <Version difficulty=\"intermediate\" length=\"balanced\"> in edu-site/docs/intro.md to fulfill Contract C5 (responsibility map)"
Task: "Rewrite <Version difficulty=\"intermediate\" length=\"detailed\"> in edu-site/docs/intro.md to fulfill Contract C6 (experiment-to-system transition)"
Task: "Rewrite <Version difficulty=\"advanced\" length=\"summary\"> in edu-site/docs/intro.md to fulfill Contract C7 (strategic scarcity)"
Task: "Rewrite <Version difficulty=\"advanced\" length=\"balanced\"> in edu-site/docs/intro.md to fulfill Contract C8 (governance and trust boundaries)"
Task: "Rewrite <Version difficulty=\"advanced\" length=\"detailed\"> in edu-site/docs/intro.md to fulfill Contract C9 (scalable ownership architecture)"
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 2)

1. Complete Phase 1: Setup (T001–T002).
2. Complete Phase 2: Foundational (T003–T012).
3. Complete Phase 3: User Story 1 (T013–T022).
4. Complete Phase 4: User Story 2 (T023–T025).
5. **STOP and VALIDATE**: Blind lens matching; scenario + decision + takeaway audit.
6. Demo if ready — readers can already choose a different mental model per version.

### Incremental Delivery

1. Setup + Foundational → nine contracts ready.
2. US1 → nine versions rewritten; demo mental-model differentiation.
3. US2 → every version adds a real-world scenario and actionable takeaway.
4. US3 → reader-control descriptions expose lens and practical value.
5. US4 → thesis compliance passes; comparison matrix rows all `unique`.
6. Polish → typecheck/build/live checks pass.

### Parallel Team Strategy

With multiple authors:
1. Setup (one author) + Foundational (one author per cell in parallel: T003–T011).
2. Once Foundational is done:
   - Author A: US1 rewrites T013–T016 (beginner and intermediate summary/balanced).
   - Author B: US1 rewrites T017–T021 (intermediate detailed and all three advanced).
   - Author C: US3 inspection and conditional UI change.
3. US2 audit, US4 compliance, and Polish follow in sequence.

---

## Notes

- [P] tasks = different files OR distinct `<Version>` blocks with no shared dependency.
- [Story] label maps task to specific user story for traceability.
- Each user story should be independently completable and reviewable.
- A duplicate verdict on any row of the comparison matrix blocks publication (FR-013, SC-005).
- Source list in `edu-site/docs/intro.md` is canonical; if any cited claim changes, every version that cites it must be updated.
- Stop at any checkpoint to validate a story independently before proceeding.
- Avoid: paraphrased rewrites that produce near-duplicate prose; introducing a new reader-control dimension; bundling unrelated edits into the same commit.
