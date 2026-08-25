# Feature Specification: Chapter State Transparency

**Feature Branch**: `012-chapter-state-transparency`
**Created**: 2026-08-25
**Status**: Draft
**Input**: User description: "Give readers two honest signals about a chapter's real state that the current site does not surface: an unwritten placeholder chapter shows a real designed not-yet-written state using the existing tbb-chapter-state CSS badges instead of default doc chrome, without implying any fixed total chapter count; a text-ready chapter's ReaderControls card shows how many of the 9 difficulty/length combinations are actually authored on that specific page, reusing the availability data ReaderControls already computes to dim pills, instead of leaving that discoverable only via hover. Extends the existing ADR-0003 adaptive-reader-controls architecture; introduces no new architecture, no new dependencies, no Phase B or C surface."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Honest placeholder chapters (Priority: P1)

A reader browsing the sidebar clicks into a chapter that hasn't been written yet. Today they land on default Docusaurus doc chrome with no signal that the page is intentionally unwritten. Instead, they should immediately see a real, designed "not yet written" state.

**Why this priority**: Affects 15 of the 17 real doc pages today — the widest-reaching, lowest-risk of the two changes (pure presentational, no interaction with the already-shipped `ReaderControls` component).

**Independent Test**: Visit any placeholder chapter (e.g. `docs/stage-01-spec-aware-vibe-engineering/01-foundations.md`) and confirm a designed not-yet-written indicator renders where default doc chrome used to be, with no fixed chapter-count language anywhere on the page.

**Acceptance Scenarios**:

1. **Given** a doc page whose frontmatter `chapter_state` is `placeholder`, **When** a reader opens it, **Then** the page shows a visually designed "not yet written" indicator using the existing `.tbb-chapter-state--*` badge classes instead of blank/default chrome.
2. **Given** that same placeholder page, **When** a reader reads the indicator's text, **Then** it never states or implies a fixed total chapter count, a "chapter N of M" position, or a percentage of the book completed.
3. **Given** a stage-index overview page (e.g. `docs/stage-01-spec-aware-vibe-engineering/index.md`, which carries no `chapter_state` field), **When** a reader opens it, **Then** no chapter-state badge appears — the page renders exactly as it does today.

---

### User Story 2 - Reader-mode completeness at a glance (Priority: P2)

A reader on a `text-ready` chapter wants to know how many of the 9 difficulty/length combinations actually have unique content on this page, without having to hover every picker pill one at a time to discover which are dimmed.

**Why this priority**: Real value, but touches the already-shipped, more sensitive `ReaderControls` component — ordered second so a mistake here doesn't also block the simpler, wider-reaching placeholder work.

**Independent Test**: Visit `docs/intro.md`, open the reader-controls card, and confirm an "N/9 modes available" style indicator is visible without interacting with any pill.

**Acceptance Scenarios**:

1. **Given** a `text-ready` chapter, **When** the reader-controls card renders, **Then** it displays a count of how many of the 9 combinations are authored on that specific page, computed from the same data the component already uses to decide which pills to dim.
2. **Given** a chapter where every one of the 9 combinations is authored, **When** the reader-controls card renders, **Then** the indicator plainly shows full coverage (e.g. "9/9") rather than hiding itself or treating full coverage as a special case.
3. **Given** a chapter where the reader's saved preference is unavailable and the page substitutes its page-default combination, **When** both the substitution note and the new completeness indicator are visible, **Then** they read as two distinct, non-duplicating pieces of information.

---

### Edge Cases

- Stage-index overview pages (4 today) carry no `chapter_state` field and MUST NOT receive the placeholder badge or the completeness indicator.
- A future third `chapter_state` value (`video-published`, per the chapter lifecycle already named in this repo's operating rules) must render sensibly through the same generic state→indicator mapping, without requiring edits to individual content files.
- A chapter with zero authored adaptive blocks (pure unmarked prose) must show exactly **1/9** (the default Intermediate · Balanced combination), never 0/9 — unmarked prose already counts as one authored combination under the existing per-block authoring rule.
- A doc page unexpectedly missing `chapter_state` entirely must not crash or render a broken badge; it falls back to showing no chapter-state indicator.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST render a visually designed "not yet written" indicator, using the existing `.tbb-chapter-state--*` CSS badge classes, on every doc page whose frontmatter `chapter_state` is `placeholder`, in place of default Docusaurus doc chrome.
- **FR-002**: The indicator MUST NOT state or imply a fixed total chapter count, a "chapter X of Y" position, or a completion percentage across chapters.
- **FR-003**: The chapter-state indicator MUST be derived from a generic state→indicator mapping keyed on the `chapter_state` frontmatter value, not hardcoded per content file, so that a future state (e.g. `video-published`) can be supported by extending the mapping alone.
- **FR-004**: The 4 stage-index overview pages (which carry no `chapter_state` field) MUST NOT receive the placeholder badge or any chapter-state indicator.
- **FR-005**: On every `text-ready` chapter, the `ReaderControls` card MUST display a count of how many of the 9 difficulty/length combinations are authored on that specific page (e.g. "6/9 modes available").
- **FR-006**: The count in FR-005 MUST be computed from the same per-page authored-combination data the component already uses to determine which picker pills are dimmed/`aria-disabled` — no new data source, no new content-authoring step.
- **FR-007**: The count MUST use the existing strict per-block authoring rule (a combination counts as authored only if directly tagged, with unmarked prose counting as exactly one authored combination — Intermediate · Balanced) rather than the substitution/page-default fallback logic used when a reader's preference is unavailable.
- **FR-008**: When all 9 combinations are authored on a page, the indicator MUST present that plainly (e.g. "9/9") rather than being suppressed or treated as an edge case.
- **FR-009**: The completeness indicator MUST be visually distinct from, and must not duplicate or conflict with, the existing substitution note shown when a reader's preferred combination is unavailable and a fallback combination is rendered instead.
- **FR-010**: Neither indicator may block, delay, or alter access to the page's core reading content — both are supplementary chrome only.
- **FR-011**: Both indicators MUST degrade gracefully with JavaScript disabled, consistent with the existing SSR `<details>` fallback pattern used elsewhere in the reader-controls system.
- **FR-012**: Both indicators MUST meet the site's existing accessibility bar — sufficient color contrast, no color-only signaling, screen-reader-readable text, and any transition respects `prefers-reduced-motion`.
- **FR-013**: Both indicators MUST use only existing Apple-Design Purity design tokens (`edu-site/src/css/`) — no new color, typography, or motion system introduced.

### Key Entities

- **Chapter state**: An enumerated value read from a doc page's `chapter_state` frontmatter field. Known values today: `placeholder`, `text-ready`; a future `video-published` value is anticipated by this repo's own chapter lifecycle. Drives which visual indicator, if any, renders on the page. Absent entirely on the 4 stage-index overview pages, which therefore render no indicator.
- **Authored-combination count**: A per-page integer from 1 to 9, computed at render time from the same difficulty/length authoring data the reader-controls component already uses to decide pill availability. Not stored or persisted anywhere new — derived, not authored.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Every placeholder doc page (15 today) visibly communicates "not yet written" without the reader needing to open reader-controls or inspect page source.
- **SC-002**: Zero doc pages display a specific total chapter count or "chapter N of M" framing anywhere in the new indicators.
- **SC-003**: A reader on a text-ready chapter (2 today) can determine how many of the 9 modes are available within 2 seconds of page load, without hovering or clicking any picker pill.
- **SC-004**: The 4 stage-index overview pages show zero chapter-state or completeness chrome — visually unchanged by this feature.
- **SC-005**: Automated accessibility checks (axe) report zero new violations introduced by either indicator.
- **SC-006**: `npm run build` and the existing quality gates (`check-frontmatter`, `check-chapter-quality.mjs`) remain green with zero new failures after this feature ships.

## Assumptions

- **Ground truth used for scoping** (reconciled via live frontmatter inspection this session, superseding stale docs): 2 `text-ready` chapters (`docs/intro.md`, `docs/perf-targets.md`), 15 `placeholder` chapters, 4 stage-index overview pages with no `chapter_state` field. `docs/introduction.md` does not exist — it is a deliberately deleted duplicate, not a missing third text-ready chapter, despite one stale contributor doc still referencing it.
- **`specs/007-adaptive-reader-controls/checklists/migration-status.md` is stale and internally contradictory** (its own "21 files" summary doesn't sum against its own 15-row placeholder table, and its per-row "9/9 complete" claims contradict its own "fully migrated: 0" summary line). This feature does NOT use that file as a data source for FR-005/FR-006; the authored-combination count is sourced from the same live, per-page runtime computation the reader-controls component already performs to dim pills.
- **Out of scope, deliberately**, from the original 10-item frontend-upgrade proposal: item 1 (fixing the site-wide `COMBINATION_DESCRIPTIONS` constant) requires an ADR and explicit consent not yet given; items 4, 5, and 8 (command palette, reading-time-remaining, extending Timeline/FeatureGrid to stage pages) are deferred as too architecturally or visually risky to execute unsupervised; items 2, 6, 7, and 10 are deferred as too small/disjoint to justify their own feature spec.
- **No new architecture, dependency, or backend surface** is introduced. Both indicators are computed from data already present at render time (frontmatter, existing DOM `data-arc-*` attributes) and extend ADR-0003's existing adaptive-reader-controls architecture rather than replacing any part of it. Phase A constraints from `stack.md` remain fully respected.
