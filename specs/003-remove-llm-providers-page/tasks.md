# Tasks: Remove Internal LLM Provider Decision from Public Site

**Input**: Design documents from `/specs/003-remove-llm-providers-page/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: OPTIONAL - not requested in spec; runtime verification via quickstart.md

**Organization**: Single P1 user story; tasks grouped into Setup → Story → Polish

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Repository State Verification)

**Purpose**: Confirm the feature directory exists and the working copy is in a known-good state

- [x] T001 Verify working directory is clean and on branch `003-remove-llm-providers-page`

---

## Phase 2: Foundational (No blocking prerequisites for this feature)

**Purpose**: No shared infrastructure or foundational code is required before the story; the removal tasks are independent

**Checkpoint**: No foundational tasks required — user story can begin immediately

---

## Phase 3: User Story 1 - Keep Internal Architecture Out of Public Navigation (Priority: P1) 🎯 MVP

**Goal**: Remove the LLM-provider page from the public textbook, remove its navigation entries, fix stale README references, and verify the former route returns the standard not-found behavior — while preserving the internal ADR and backend provider code

**Independent Test**: Build and serve the textbook; confirm no public link/label for LLM providers, the former `/llm-providers` route returns 404/not-found, and ADR + backend provider files remain unchanged

### Implementation for User Story 1

- [x] T002 [P] [US1] Delete the public LLM-provider page source at `edu-site/docs/llm-providers.md`
- [x] T003 [P] [US1] Remove the navbar link to `/llm-providers` from `edu-site/docusaurus.config.ts` (lines 79-81)
- [x] T004 [P] [US1] Remove the footer link to `/llm-providers` from `edu-site/docusaurus.config.ts` (line 105)
- [x] T005 [P] [US1] Remove the `docs/llm-providers.md` reference from `edu-site/api/README.md` (lines 30 and 88); replace with a reference to `history/adr/0001-free-tier-llm-choice.md`
- [x] T006 [US1] Run `cd edu-site && npm run build` and confirm exit 0
- [x] T007 [US1] Verify the fresh build output contains no trace of `/llm-providers` (search `build/` for `llm-providers` → no matches)
- [x] T008 [US1] (Optional) Serve the built site and request `http://localhost:3000/llm-providers` → confirm the site's standard not-found page is shown
- [x] T009 [US1] Verify `history/adr/0001-free-tier-llm-choice.md` exists and is unchanged
- [x] T010 [US1] Verify `edu-site/api/app/llm/` contains all provider modules (base.py, registry.py, router.py, providers/*.py) and no files were removed

**Checkpoint**: User Story 1 is complete when the textbook builds without the page, no public links remain, the former route 404s, and ADR/provider code is intact

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and documentation hygiene

- [x] T011 [P] Run the full quickstart.md checklist from `specs/003-remove-llm-providers-page/quickstart.md` (source scan, build, served check, preservation check, README check)
- [x] T012 [P] Run `cd edu-site && npm run build` a second time to ensure idempotent output
- [x] T013 [P] Run `cd edu-site/api && python -m pytest -q` to confirm no backend regression (smoke tests only)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: No tasks required — skip
- **User Story 1 (Phase 3)**: Depends only on Setup; T002–T005 are parallel; T006–T010 are sequential after T002–T005 complete
- **Polish (Phase 4)**: Depends on Phase 3 completion

### Within User Story 1

- T002–T005 (parallel): Delete page, remove navbar, remove footer, fix README
- T006: Fresh build (depends on T002–T005)
- T007: Build output scan (depends on T006)
- T008: Served check (depends on T006, optional)
- T009–T010: Preservation checks (independent, can run anytime after T006)

### Parallel Opportunities

- T002, T003, T004, T005 run in parallel (all different files)
- T009, T010 run in parallel (different directories)
- T011, T012, T013 in Phase 4 run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all four source edits in parallel:
Task: "Delete edu-site/docs/llm-providers.md"
Task: "Remove navbar link in edu-site/docusaurus.config.ts"
Task: "Remove footer link in edu-site/docusaurus.config.ts"
Task: "Fix edu-site/api/README.md references"

# Launch preservation checks in parallel:
Task: "Verify ADR-0001 exists at history/adr/0001-free-tier-llm-choice.md"
Task: "Verify provider modules exist in edu-site/api/app/llm/"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. T001: Verify branch clean
2. T002–T005 (parallel): Apply the four source edits
3. T006–T010: Validate the result (build, scan, preserve)
4. **STOP and VALIDATE**: Run quickstart.md checklist
5. Commit and ship

### Incremental Delivery

This feature is a single atomic cleanup — no incremental slices beyond the one story.

---

## Notes

- [P] tasks = different files, no dependencies
- [US1] label maps all implementation tasks to the single P1 user story
- No test tasks generated; runtime verification via quickstart.md
- Each task references exact file paths for LLM execution without additional context
- Commit after T005 (edits) and after T011 (final validation)