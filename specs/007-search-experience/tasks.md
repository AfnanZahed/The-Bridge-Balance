# Tasks: Search Experience — Apple Spotlight (Home) + Expandable Bar (Chapters)

**Input**: Design documents from `/specs/007-search-experience/`
**Prerequisites**: spec.md, plan.md

**Tests**: Manual verification is REQUIRED by the spec's Success Criteria (SC-001..SC-008): build/typecheck/lint/axe gates, a dev-server pass, and the `navbar__search` cleanliness grep.

**Organization**: Three user stories — US1 (P1, home Spotlight), US2 (P1, chapter bar), US3 (P2, shared engine + a11y + retirement of the old surface); phases Setup → Foundational → US1 → US2 → US3 → Polish.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story the task belongs to

---

## Phase 1: Setup

**Purpose**: Put the formal record in place before any code (Constitution Principle IV)

- [x] T001 Create `specs/007-search-experience/spec.md`, `plan.md`, `tasks.md` and add the index row to `specs/README.md`

---

## Phase 2: Foundational (Shared Engine)

**Purpose**: One engine, one source of stage truth — blocking prerequisites for both surfaces

- [x] T002 [P] Create `edu-site/src/lib/search.ts` — extract the scoring from `src/theme/SearchBar/index.tsx` verbatim (`MIN_QUERY=1`, `DEBOUNCE_MS=150`, `RESULT_LIMIT=8`); add the module-cached lazy index loader, `useSearchIndex()`, `useRankedResults()`, `rank()`, `describeHit()`
- [x] T003 [P] Create `edu-site/src/lib/stages.ts` — `STAGE_LINKS` (labels/routes mirroring `SiteDrawer.tsx`) + `stageNumberFromRoute()`
- [x] T004 Add a bare `StageGlyph` export to `edu-site/src/components/stage-icons/index.tsx` (no tint chip) and render `StageIcon` through it

**Checkpoint**: engine + stage constants + glyph exist and compile

---

## Phase 3: User Story 1 — Home Spotlight (Priority: P1) 🎯 MVP

**Goal**: The home route opens with the Spotlight; stage shortcuts, live results, full a11y behaviour

**Independent Test**: fresh session auto-opens once; Esc/backdrop close; ⌘K and the navbar button reopen; hover/click shortcuts; type → Arrow/Enter opens a chapter in-app; reduced motion + dark mode behave

### Implementation

- [x] T005 [US1] Create `edu-site/src/components/Search/SearchResultRow/{index.tsx,styles.module.css}` — the shared card (icon slot, label, description, chevron-on-hover/active, `role="option"`, 44px min height)
- [x] T006 [US1] Create `edu-site/src/components/Search/AppleSpotlight/{index.tsx,styles.module.css}` — port the supplied component with the plan's fidelity list (blob filter, springs, placeholder logic, shortcut circles, stagger math) and the mechanical substitutions (`motion/react`, CSS Modules, tokens, internal routing, dark tokens)
- [x] T007 [US1] Create `edu-site/src/components/Search/SearchUXContext.tsx` — provider, `useSearchUX()`, home-only ⌘K/Ctrl+K, session auto-open guarded by `sessionStorage` (storage-safe), scroll lock, route-change close, route-gated overlay, focus restore
- [x] T008 [US1] Mount the provider in `edu-site/src/theme/Root.tsx` and refresh its header comment

**Checkpoint**: `/` shows the Spotlight with working shortcuts and results

---

## Phase 4: User Story 2 — Chapter Expandable Bar (Priority: P1)

**Goal**: Docs routes carry the expandable bar with a results dropdown

**Independent Test**: click → expand/focus; type → dropdown/keyboard/no-matches; Enter navigates in-app; Esc/outside-click collapse; narrow viewport safe

### Implementation

- [x] T009 [US2] Create `edu-site/src/components/Search/ExpandableSearchBar/{index.tsx,styles.module.css}` — port the supplied component (40px circle, spring 260/26, animated placeholder, outside-click rule, 120ms focus) with the mechanical substitutions; add the dropdown (shared rows, `min(24rem, calc(100vw - 1.5rem))`, right-aligned), combobox/listbox keyboard handling, "No matches." status, 40px visual + 44px hit area, input focus ring
- [x] T010 [US2] Rewrite `edu-site/src/theme/SearchBar/index.tsx` as the route split — `/` → navbar trigger button (calls `useSearchUX().open`), docs routes → `ExpandableSearchBar expandDirection="left"`; SSR-safe (no window at render)

**Checkpoint**: home and chapter search surfaces both live behind the unchanged navbar swizzle

---

## Phase 5: User Story 3 — Shared System, a11y, Retirement (Priority: P2)

**Goal**: One ranking for both surfaces, the a11y contract held, and no dead selectors left behind

### Implementation

- [x] T011 [US3] Wire `SiteDrawer.tsx`'s stage entries to `STAGE_LINKS` (drift prevention; no behaviour change)
- [x] T012 [P] [US3] `edu-site/src/css/custom.css` — retire the `navbar__search*` block; repoint the FR-004 action-geometry rule at the new trigger (`.tbb-search-trigger`, same 44px pill family as GitHub/theme toggle); add `html[data-search-open="true"] { overflow: hidden; }` and the trigger's chrome styles
- [x] T013 [P] [US3] `edu-site/src/css/a11y.css` — retire the search selectors in §3/§6/§12; keep the global fallback ring; document that the search components own their module-scoped rings/targets (and why: CSS-module hashing)
- [x] T014 [US3] Update `PROJECT-MAP.md` (add `src/lib/` row + `Search/` in the components inventory)

**Checkpoint**: no `navbar__search` reference remains; both surfaces share the engine and the contract

---

## Phase 6: Polish & Verification

- [x] T015 Run `cd edu-site && node scripts/generate-search-index.mjs` so dev serves a fresh index
- [x] T016 Run the gates: `npm run typecheck`, biome on the 007 files, `npm run build` — all green (SC-001..SC-003). Note: `npm run lint` over the whole repo fails on pre-existing CRLF/format conditions in untouched files (see PHR 0001, "Evaluation notes"); the 007 files themselves are LF and biome-clean. `npm run test:a11y` — chapter page 0 violations; home page carries one pre-existing violation in `HomepageHero` (untouched by 007). The axe runner itself crashes after printing (`Set.reduce` bug, pre-existing).
- [x] T017 Automated headless equivalent of the dev-server pass (Playwright + Chromium against the served build): 13/13 checks — auto-open once/session, Escape, Ctrl+K, 4 stage shortcuts, results, Enter navigation (Spotlight → `/stage-01-…/03-frontend`; bar → `/stage-01-…/04-backend`), bar focus, no second auto-open, trigger reopen, reduced-motion open. **Owner's visual pass in Microsoft Edge at localhost:3000 still outstanding** (dark mode, mobile width, and the blob/spring feel are visual calls).
- [x] T018 Cleanliness: `grep -rn "navbar__search" edu-site/src` → no matches (SC-006)
- [x] T019 File the PHR under `history/prompts/007-search-experience/` (0001) and surface the ADR suggestion (client-side search UX split; no search service)

---

## Dependencies & Execution Order

- **Phase 1** → everything (record first).
- **Phase 2** → both user stories (engine, stages, glyph).
- **US1 (Phase 3)**: T005 → T006 (row before overlay); T007 → T008 (provider before mount). T005/T007 are independent files and could be [P].
- **US2 (Phase 4)**: T009 after T005 (shared row) and T002 (engine); T010 after T009 and T008.
- **US3 (Phase 5)**: T011 after T003; T012/T013 [P] after T010 (selectors must match final markup); T014 anytime.
- **Phase 6**: T015 → T016 → T017 → T018 → T019.

## Notes

- [P] tasks = different files, no dependencies.
- No version-control steps: this repo intentionally has none (CLAUDE.md); nothing here commits, branches, or references a PR.
- No new npm dependencies; both reference components port onto `motion/react`, `lucide-react`, `clsx` — all already installed.
- Keep the supplied look: blob SVG filter, springs, circle sizes/opacity, result-card shape are fidelity items; only mechanical substitutions were made (see plan.md).
- PHR: `history/prompts/007-search-experience/0001-implement-search-experience.green.prompt.md`.
