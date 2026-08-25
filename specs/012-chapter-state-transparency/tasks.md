---
description: "Task list for chapter-state-transparency feature implementation"
---

# Tasks: Chapter State Transparency

**Input**: Design documents from `/specs/012-chapter-state-transparency/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md (R-001 through R-006 micro-decisions), data-model.md (two entities, both already existing in the system), contracts/README.md (intentionally empty — pure presentational feature), quickstart.md (7-step local verification)

**Tests**: Tests are OPTIONAL per the spec; this feature relies on existing quality gates (`npm run build`, `check-frontmatter.mjs`, `check-chapter-quality.mjs`) rather than new test scripts. No new test tasks generated.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story. Per the plan.md finding that both indicators' wiring is **already implemented** in the existing repo (`MDXComponents.tsx`'s `ChapterHeading` + `<ChapterState>` for US1; `ReaderControls/index.tsx`'s `authored.combinations.size` for US2), the tasks below are predominantly verification + small surface additions, not new builds.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2)
- Include exact file paths in descriptions

---

## Phase 1: Foundational (Blocking Prerequisites)

**Purpose**: Verify the ground-truth assumptions the rest of the feature depends on, and confirm the existing wiring actually works for every page in scope. This MUST complete before either user story can be marked done.

**⚠️ CRITICAL**: Both user stories depend on the audit results below. If the audit reveals missing or malformed `chapter_state` values, US1 cannot ship; if the runtime authoring computation has unexpected behavior on any text-ready chapter, US2 cannot ship.

- [ ] T001 Run a fresh `chapter_state` audit across all 17 MDX files under `edu-site/docs/` and confirm: 15 placeholders, 2 text-ready (`intro.md`, `perf-targets.md`), 4 stage-index overviews with no `chapter_state` field, no orphan or duplicate values.
- [ ] T002 Confirm `edu-site/src/theme/MDXComponents.tsx`'s `ChapterHeading` correctly renders `<ChapterState />` only when `useDoc().frontMatter.chapter_state` is present (not on the 4 overview pages with absent field).
- [ ] T003 Confirm `edu-site/src/components/ChapterState/index.tsx`'s `STATE_META` covers all four states (placeholder, text-ready, video-published, unknown) and the `<ChapterState>` rendering preserves D5 (no fixed chapter-count language in any label).
- [ ] T004 Confirm `edu-site/src/css/custom.css` lines 961–1008 define `.tbb-chapter-state`, `.tbb-chapter-state--placeholder`, `.tbb-chapter-state--text-ready`, `.tbb-chapter-state--video-published`, `.tbb-chapter-state--unknown`, `.tbb-chapter-state__dot`, and the `tbb-pulse-cyan` keyframes; verify each passes the site's existing axe baseline at WCAG AA contrast.
- [ ] T005 Confirm `edu-site/src/components/ReaderControls/index.tsx` populates `authored.combinations.size` on mount via `inferAuthoredCombinations(rootRef.current)`, and that `Root` ref points at the chapter article DOM (not the card itself), so the count reflects only this page's authored blocks.
- [ ] T006 Confirm `edu-site/src/components/ReaderControls/types.ts` exports `DIFFICULTIES` (length 3) and `LENGTHS` (length 3) so the "9" in "N/9 modes available" is sourced from the same constants the picker uses (no magic numbers in the new indicator).

**Checkpoint**: Foundation ready — the existing plumbing is verified to support both user stories without new architecture. User story implementation can now begin.

---

## Phase 2: User Story 1 - Honest placeholder chapters (Priority: P1) 🎯 MVP

**Goal**: Every placeholder doc page (15 today) visibly communicates "not yet written" via the existing `.tbb-chapter-state--placeholder` badge above its `<h1>`, without implying a fixed chapter count anywhere.

**Independent Test**: Visit `edu-site/docs/stage-01-spec-aware-vibe-engineering/01-foundations.md` and confirm a muted gray `.tbb-chapter-state--placeholder` badge renders directly above the chapter `<h1>`, with no "chapter N of M" language anywhere on the page; repeat for all 15 placeholders and confirm uniform styling.

### Implementation for User Story 1

- [ ] T007 [US1] For each of the 15 placeholder MDX files under `edu-site/docs/`, verify the frontmatter contains `chapter_state: placeholder` on its own line. Add the field where missing (no content edits). Files: `edu-site/docs/stage-01-spec-aware-vibe-engineering/{01-foundations,02-core-programming,03-frontend,04-backend,05-databases,06-git-github}.md`, `edu-site/docs/stage-02-cs50-certification/{cs50p,cs50w}.md`, `edu-site/docs/stage-03-mastering-ai-coding-agents/{claude-code,context-engineering,prompt-engineering,skills-and-mcp}.md`, `edu-site/docs/stage-04-engineering-autonomous-ai-agents/{evaluations,multi-agent-systems,rag-and-tool-calling}.md`.
- [ ] T008 [US1] Visually verify the `.tbb-chapter-state--placeholder` badge in the Docusaurus build output and confirm: badge text reads "placeholder" (lowercase, exactly per `STATE_META.label`), no pulse animation, no chapter-count framing in any adjacent chrome. Make CSS-only polish edits to `edu-site/src/css/custom.css` if any visual gap is found.
- [ ] T009 [US1] Visually verify the 4 stage-index overview pages (`edu-site/docs/stage-01-spec-aware-vibe-engineering/index.md`, `edu-site/docs/stage-02-cs50-certification/index.md`, `edu-site/docs/stage-03-mastering-ai-coding-agents/index.md`, `edu-site/docs/stage-04-engineering-autonomous-ai-agents/index.md`) render NO chapter-state badge, because they have no `chapter_state` frontmatter field (FR-004). Capture a screenshot for the morning report.
- [ ] T010 [US1] Visually verify the 2 text-ready chapters (`edu-site/docs/intro.md`, `edu-site/docs/perf-targets.md`) render the `.tbb-chapter-state--text-ready` badge with the cyan pulse animation, satisfying FR-001's "using the existing `.tbb-chapter-state--*` CSS badge classes" requirement on the positive case.

**Checkpoint**: At this point, US1 should be fully functional and testable independently. All 17 doc pages render the correct badge for their state (or no badge for overviews), per FR-001 through FR-004 and SC-001, SC-002, SC-004.

---

## Phase 3: User Story 2 - Reader-mode completeness at a glance (Priority: P2)

**Goal**: On every `text-ready` chapter, the `ReaderControls` card displays an "N/9 modes available" count derived from the same per-page authored-combination data the component already computes to dim picker pills.

**Independent Test**: Visit `edu-site/docs/intro.md`, confirm the `ReaderControls` card shows "9/9 modes available" (intro and perf-targets both have all 9 combinations authored per the migration-status table — verified live by the runtime computation), with the new line placed AFTER `.combinationDescription` and BEFORE `.substitutionNote`, visually distinct from both.

### Implementation for User Story 2

- [ ] T011 [US2] In `edu-site/src/components/ReaderControls/ReaderControls.module.css`, add a new `.completeness` class per research.md R-004: muted typography matching `.cue`, with a `::before` dot using `var(--tbb-accent-subtle)` for visual distinctness from no-dot `.cue` and full-accent `.substitution`. Place the class definition adjacent to `.cue` and `.substitution` to keep related selectors grouped.
- [ ] T012 [US2] In `edu-site/src/components/ReaderControls/index.tsx`, compute `const completenessCount = authored.combinations.size;` inside the existing `ReaderControls` function (after the `useEffect` that populates `authored`), guarded by the existing `hydrated` state. No new state, no new effect, no new imports.
- [ ] T013 [US2] In `edu-site/src/components/ReaderControls/index.tsx`, insert a new `<p>` element between the existing `.combinationDescription` block (line 249–267) and the existing `.substitutionNote` block (line 268). Element: `<p className={styles.completeness} role="status">{hydrated ? `${completenessCount}/9 modes available` : ""}</p>`. Render nothing before hydration per research.md R-002 (no SSR "0/9" flash, no static "up to 9" hedge).
- [ ] T014 [US2] In `edu-site/src/components/ReaderControls/index.tsx`, ensure the new `<p>` does NOT render when `hydrated === false` (static SSR HTML must be silent in this slot — verified by viewing the built HTML's source). The conditional expression `hydrated ? ... : ""` is sufficient; an empty `<p></p>` is acceptable but a return of `null` is cleaner. Use the cleaner form.
- [ ] T015 [US2] Manually verify the new indicator on `edu-site/docs/intro.md`: the count shows "9/9 modes available" after hydration, with the `--tbb-accent-subtle` leading dot, the muted text color matching `.cue`, and no layout shift between SSR HTML and the hydrated state.
- [ ] T016 [US2] Manually verify the new indicator on `edu-site/docs/perf-targets.md`: same as T015. Both text-ready chapters should report 9/9 (verified by the runtime computation — both have all 9 combinations authored per the existing migration work).
- [ ] T017 [US2] Manually verify the new indicator does NOT appear on placeholder chapters (US1 placeholder pages have a `ReaderControls` mounted too because `MDXComponents.tsx`'s `ChapterHeading` is unconditional on chapter-state, but the card displays no completeness line because `completenessCount === 0` is hidden behind `hydrated && completenessCount > 0`. If a placeholder DOES render the card and the count shows 1/9, that is acceptable behavior — the unmarked-prose rule guarantees ≥1 — but verify it is visually consistent with the text-ready case, not louder).

**Checkpoint**: At this point, US2 should be fully functional and testable independently. The completeness indicator satisfies FR-005 through FR-009, with SSR/no-JS graceful degradation (FR-011) and a11y via `role="status"` (FR-012). The 1/9 default for chapters with zero tagged adaptive blocks is preserved (edge case 3 in spec.md).

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Build-gate verification, documentation sync, and commit hygiene. Affects the whole feature, not a single user story.

- [ ] T018 [P] Update `PROJECT-MAP.md` (if it still claims a single text-ready chapter and contradicts the 17-page inventory used in plan.md and spec.md) to reflect the current 2 text-ready + 15 placeholder + 4 stage-index overview split. Only edit if the staleness is real; otherwise note it in the morning report.
- [ ] T019 [P] Update `specs/007-adaptive-reader-controls/checklists/migration-status.md` only if its "fully migrated: 0" summary line and "9/9 complete" per-row claims remain unchanged after this feature; otherwise leave it alone (per spec.md Assumptions, this file is stale and out of scope for this feature to fix). Capture the staleness finding in the morning report for a separate follow-up feature.
- [ ] T020 Run `cd edu-site && node scripts/check-frontmatter.mjs` (per research.md R-005); exit 0 required. Catches any frontmatter introduced or modified by T007.
- [ ] T021 Run `cd edu-site && node scripts/check-chapter-quality.mjs` (per research.md R-005); exit 0 required. Re-validates the 2 text-ready chapters end-to-end.
- [ ] T022 Run `cd edu-site && npm run build` (per research.md R-005); exit 0 required. Confirms no bundle-size or LCP regression, no broken MDX, no broken links. Record bundle-size delta vs. pre-feature baseline if the output is meaningful.
- [ ] T023 [P] Run a manual `prefers-reduced-motion` check: open `intro.md` with the browser's "reduce motion" preference set to ON, confirm the `text-ready` badge stops pulsing, confirm the new `.completeness` indicator renders statically (it has no animation by design — R-004).
- [ ] T024 [P] Run the 7-step quickstart.md verification locally (steps 1–6, skipping 7 teardown). Mark each checklist item in `specs/012-chapter-state-transparency/quickstart.md` Steps 3–5 as PASS or FAIL based on the visit. Attach any FAIL items to the morning report.
- [ ] T025 Commit the change as a single feature commit on branch `012-chapter-state-transparency`. Suggested message: `feat(reader-controls): surface chapter-state and per-chapter mode count`. Do NOT push and do NOT open a PR — both require explicit user confirmation per the standing overnight instruction.
- [ ] T026 Create the stage=implement PHR at `history/prompts/012-chapter-state-transparency/0003-implement-chapter-state-transparency.implement.prompt.md` with the full prompt text verbatim, the concise response snapshot listing every task that was executed (T001–T025 by ID), the outcome (build-green / build-broken, FR-001–FR-013 coverage check), and the morning-report items per spec.

**Checkpoint**: All quality gates green, commit made locally (not pushed), PHR written, morning report drafted in the implement PHR's response snapshot. Feature is ready for the user to confirm push/PR on waking.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 1)**: No external dependencies — all tasks are read-only verification of existing files. Can start immediately.
- **User Story 1 (Phase 2)**: Depends on Phase 1 completion. Specifically T007 depends on T001 (the audit must confirm the frontmatter shape before any edits).
- **User Story 2 (Phase 3)**: Depends on Phase 1 completion (T005 specifically — must confirm `authored.combinations.size` is in scope before T012). US2 is independent of US1 at the code level; both can proceed in parallel if staffed.
- **Polish (Phase 4)**: Depends on both US1 and US2 completing. T020–T022 cannot run until T007–T017 are done.

### User Story Dependencies

- **User Story 1 (P1)**: Independent of US2 at the code level. The placeholder badge touches `custom.css` + 15 MDX frontmatter lines; US2 touches `ReaderControls/index.tsx` + `ReaderControls.module.css`. Different files, no shared state.
- **User Story 2 (P2)**: Independent of US1 at the code level. Can be implemented before, after, or in parallel with US1.

### Within Each User Story

- T007 (frontmatter verification) MUST complete before T008 (visual verify) — you can't verify what isn't there.
- T011 (CSS class) MUST complete before T013 (JSX insertion) — the JSX references `styles.completeness`, which must exist.
- T012 (compute `completenessCount`) MUST complete before T013 (insert JSX) — the JSX reads the computed value.
- T018, T019, T023, T024 (independent checks/docs) can run in parallel with each other and with T020–T022.

### Parallel Opportunities

- All Foundational tasks (T001–T006) can run in parallel — they read different files and have no shared state.
- US1 (Phase 2) and US2 (Phase 3) can run in parallel — different files, different components.
- Within US2, T011, T012, T013, T014, T015, T016, T017 are sequential because of the dependency chain above, but T015, T016, T017 (the manual verification steps) can run in any order after T013.
- Within Phase 4, T018, T019, T023, T024 are independent and marked [P].

---

## Parallel Example: User Story 2 (the highest-value parallelization)

```bash
# All Foundational tasks can launch together:
Task: "T001 chapter_state audit"
Task: "T002 MDXComponents wiring check"
Task: "T003 STATE_META coverage check"
Task: "T004 custom.css class coverage check"
Task: "T005 ReaderControls authored.combinations check"
Task: "T006 types.ts constants check"

# Then US2 implementation chain:
Task: "T011 add .completeness CSS class in ReaderControls.module.css"
# → blocks T012 + T013
Task: "T012 compute completenessCount in ReaderControls/index.tsx"
# → blocks T013
Task: "T013 insert new <p> JSX in ReaderControls/index.tsx"
# → blocks T014–T017
Task: "T014 null-before-hydrated guard"
Task: "T015 manual verify on intro.md"
Task: "T016 manual verify on perf-targets.md"
Task: "T017 manual verify on placeholder chapter"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Foundational (all 6 verification tasks)
2. Complete Phase 2: User Story 1 (4 tasks: frontmatter audit + 3 visual verifies)
3. **STOP and VALIDATE**: Visit `01-foundations.md` (placeholder) and `intro.md` (text-ready) — confirm correct badges render.
4. This MVP is meaningful on its own: 15 of 17 doc pages now honestly communicate their state.

### Incremental Delivery

1. Complete Foundational → Foundation ready
2. Add US1 → Test independently → MVP delivered (placeholder badges)
3. Add US2 → Test independently → Full feature delivered (completeness indicator)
4. Run Polish phase → All build gates green → Commit locally (no push)
5. Each story adds value without breaking the previous story.

### Parallel Team Strategy

With multiple implementers:
- Implementer A: US1 (placeholder badges — touches `custom.css` + 15 MDX files)
- Implementer B: US2 (completeness indicator — touches `ReaderControls/*.tsx` + `*.module.css`)
- Both proceed in parallel after Phase 1 completes.
- Implementer C (or A+B sequentially): Polish phase + commit + PHR + morning report.

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Tests are not generated; existing quality gates (`check-frontmatter.mjs`, `check-chapter-quality.mjs`, `npm run build`) are the test surface
- Commit after the Polish phase (T025), not after each user story
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks (all have specific file paths), same-file conflicts (US1 and US2 touch different files), cross-story dependencies (none)
- The single most important guard: T020–T022 must all be green before T025 (commit). Do not commit a build-broken state.
