# Data Model: Chapter State Transparency

**Branch**: `012-chapter-state-transparency` | **Date**: 2026-08-25
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

Phase 1 data-model artifact. This feature is purely presentational and
introduces **no new persistent storage**; both entities below are
derived at render time from data already in the system. The model is
documented here so future contributors can locate the source of truth
without spelunking through three layers of indirection.

---

## Entity 1 · `ChapterState` (page-level)

**Source of truth**: `chapter_state` frontmatter field on each MDX file
under `edu-site/docs/`.

**Type**: a string enum, expected (not enforced by the schema today) to
be one of:

| Value | Meaning | Visual today (per `ChapterState/STATE_META`) |
|---|---|---|
| `placeholder` | Chapter is reserved but not written yet. | `.tbb-chapter-state--placeholder` badge above the `<h1>`. |
| `text-ready` | Chapter prose is complete; ready to read. | `.tbb-chapter-state--text-ready` badge above the `<h1>`. |
| `video-published` | Chapter has a published video walkthrough. | No badge (the video embed is the headline); badge suppressed via `null` return. |
| (absent) | Stage-index overview pages; not a chapter. | No badge (gated by `useDoc()` returning undefined / `MDXComponents` short-circuit). |
| (any other value) | Schema drift; an honest error state. | `.tbb-chapter-state--unknown` badge with `role="alert"`. |

**Validation rule** (this feature does not add, just notes): a
`check-frontmatter.mjs` extension to enforce the enum would prevent the
"unknown" path from ever firing. Adding such a check is a separate
follow-up (deferred per Constitution Principle V — Smallest Viable
Change).

**Derivation**: `useDoc().frontMatter.chapter_state` →
`MDXComponents.tsx`'s `ChapterHeading` → conditional
`<ChapterState state={state} />`. No new code path introduced by this
feature.

**Ground truth at the time of writing** (from `Grep chapter_state: edu-site/docs/`):
- 2 `text-ready`: `docs/intro.md`, `docs/perf-targets.md`
- 15 `placeholder`: 6 in stage 1, 2 in stage 2, 4 in stage 3, 3 in stage 4
- 4 stage-index overviews with no `chapter_state` field

---

## Entity 2 · `AuthoredCombinationCount` (per-page, runtime-only)

**Source of truth**: `edu-site/src/components/ReaderControls/AuthoredCombinations.ts`'s
`inferAuthoredCombinations(rootEl: HTMLElement)` function. Called at
mount by `ReaderControls` from `rootRef.current`.

**Type**: a `number` in the closed integer interval `[1, 9]`.

**Derivation** (paraphrased from `AuthoredCombinations.ts`):

1. Walk the article DOM (`rootRef.current`) for `data-arc-*` block
   attributes emitted by the reader authoring primitives
   (`<Beginner>`, `<Intermediate>`, `<Advanced>`, `<Summary>`,
   `<Balanced>`, `<Detailed>`).
2. For each tagged block, record one entry per
   `(difficulty, length)` combination the block contributes to.
3. Always add exactly one entry for `intermediate · balanced`
   (unmarked prose rule — even a chapter with zero `data-arc-*`
   blocks contributes this single combination).
4. Return an `AuthoredSet` = `{ combinations: Set<CombinationKey>,
   counts: Map<CombinationKey, number> }`.

**Field of interest to this feature**:
`authored.combinations.size` — the cardinality of the set, equal to
the number of *distinct* `(difficulty, length)` pairs authored on the
page. This is the `N` in "N/9 modes available".

**Why "9"**: `DIFFICULTIES.length * LENGTHS.length` from
`edu-site/src/components/ReaderControls/types.ts` =
3 difficulties (`beginner`, `intermediate`, `advanced`) × 3 lengths
(`summary`, `balanced`, `detailed`) = 9.

**Why minimum 1, never 0**: the unmarked-prose rule (step 3 above)
guarantees `combinations.size >= 1` on every rendered chapter. This
satisfies the spec edge case "A chapter with zero authored adaptive
blocks (pure unmarked prose) must show exactly **1/9** … never 0/9".

**Why the migration-status.md table is NOT used**: see
`spec.md` → `Assumptions`. That file is stale and self-contradictory;
its per-row "9/9 complete" claims contradict its own "fully migrated:
0" summary line, and its "21 files" arithmetic doesn't sum against its
own 15-row placeholder table. The runtime computation in
`AuthoredCombinations.ts` is the canonical source.

---

## What is NOT a new entity

- **No new persisted preference** — the count is derived, not stored.
- **No new component** — the existing `<ChapterState>` and
  `<ReaderControls>` components carry both indicators.
- **No new CSS variable, color, or motion token** — the new
  `.completeness` class reuses existing `--tbb-text-muted`,
  `--tbb-accent-subtle`, and inherits the `.cue` typography.
- **No new API endpoint, schema, or migration** — this is a
  frontend-only presentational feature with zero backend impact.

---

## Validation rules carried forward

These are the validation rules the existing system already enforces;
this feature inherits them and adds no new ones:

| Rule | Source | Effect |
|---|---|---|
| `chapter_state` is optional | Docusaurus frontmatter parser | Stage-index overviews omit the field; `MDXComponents.tsx`'s `ChapterHeading` correctly handles `undefined`. |
| Tagged adaptive blocks must use valid difficulty/length values | `AuthoredCombinations.ts`'s `isCombination()` helper | Unknown values are silently ignored (existing behavior, not changed by this feature). |
| `inferAuthoredCombinations` is called only at mount | `ReaderControls/index.tsx:112` | The count is static for the lifetime of one page render. No re-render storm on pill clicks. |
