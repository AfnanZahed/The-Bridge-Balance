# Research: Chapter State Transparency

**Branch**: `012-chapter-state-transparency` | **Date**: 2026-08-25
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

Phase 0 research for the chapter-state-transparency feature. Resolves the
four remaining micro-design questions that the spec left deliberately
implementation-agnostic, so `/sp.tasks` and `/sp.implement` have unambiguous
targets.

---

## R-001 · Indicator placement inside the `ReaderControls` card

**Decision**: Render the new "N/9 modes available" indicator as a single
`<p>` element placed **between** `.combinationDescription` (the
per-combination "what does this mean" note) and `.substitution` (the
"your selection was substituted" note).

**Reading order top-to-bottom after this change**:

1. Card header (`eyebrow` + `modeLabel` + reset button)
2. Difficulty pill group
3. Length pill group
4. `.cue` ("Summary omits details — switch to Balanced or Detailed…")
5. `.combinationDescription` (per-combination lens · use · "choose this if")
6. **`.completeness` — NEW** ("6/9 modes available")
7. `.substitution` (only when reader's selection was substituted)
8. Hidden `<span role="tooltip">` for dimmed-pill explanations
9. Hidden `data-effective-combination` mirror

**Rationale**:
- Spec FR-009 demands the new indicator be "visually distinct from, and
  must not duplicate or conflict with" `substitutionNote`. Placing them on
  adjacent lines with distinct class names (`.completeness` vs
  `.substitution`) gives a screen-reader user two separate paragraphs to
  navigate, not one merged run-on sentence.
- Placing the count *after* the per-combination description preserves the
  existing flow: the user first sees what their selected combination
  *means*, then sees how many alternatives the page offers. Placing it
  *before* the description would push the most contextually-useful
  element ("you are reading Beginner · Detailed") down the card.
- Conditional render of `.substitution` is preserved as-is — the count
  shows on every hydrated render, the substitution note only when
  triggered. This is the cleanest visual distinction between the two
  pieces of information.

**Code anchor**: `edu-site/src/components/ReaderControls/index.tsx:248-269`
(the trailing section of the card JSX).

---

## R-002 · SSR / no-JS graceful degradation

**Decision**: Gate the count display behind the existing `hydrated` state
(`edu-site/src/components/ReaderControls/index.tsx:98`, set true at
`useEffect` end). Before hydration, render **nothing** in the
`.completeness` slot. After hydration, render the real count.

**Why this is correct for SSR (JavaScript disabled)**:
- `authored.combinations.size` is computed from DOM `data-arc-*` blocks at
  mount via `inferAuthoredCombinations(rootRef.current)` (line 112).
  Before `useEffect` fires — which never happens with JS disabled —
  `authored.combinations.size === 0`.
- Showing "0/9 modes available" on first paint (which is what SSR would
  emit) would be a misleading, transient flash of incorrect data.
- Showing nothing is honest: the count genuinely cannot be computed
  statically, so the static HTML is silent in this slot. The card still
  renders (header, pills, cue, description, substitution note) and the
  page still works — only the new completeness line is absent in the
  no-JS case.
- This mirrors the pattern already established for
  `combinationDescription` (rendered conditionally, line 249) and
  `substitutionNote` (rendered conditionally, line 268). Consistency
  with existing code is a force-multiplier for future maintainers.

**Why this is correct for SSR (JavaScript enabled)**:
- Docusaurus SSR renders the page to static HTML with
  `hydrated === false`. The `.completeness` `<p>` is not in the static
  HTML at all. When the JS bundle loads and `useEffect` runs,
  `setHydrated(true)` fires, the count paragraph appears, and the
  `aria-live="polite"` region announces it (matches SC-003: "within 2
  seconds of page load, without hovering or clicking any picker pill").
- No layout shift: the new `<p>` is a single line of small text inside
  an already-tall card; its absence before hydration does not change
  surrounding element positions meaningfully, and once it appears the
  card simply grows by one line.

**Rationale (alternatives considered and rejected)**:
- ❌ Render "Up to 9 reading modes" as static placeholder. Looks polished
  but is technically wrong on partially-authored pages and contradicts
  FR-008 ("must present that plainly (e.g. '9/9') rather than being
  suppressed or treated as an edge case" — the spec wants the real
  number, not a hedged maximum).
- ❌ Render `0/9` and rely on JS to correct. Causes a brief flash of
  incorrect data on every page load, fails SC-003's "within 2 seconds"
  criterion if the flash is misread by a screen reader.
- ✅ Render nothing before hydration, real count after. Matches existing
  pattern, fails closed, no flash.

**Code anchor**: `edu-site/src/components/ReaderControls/index.tsx:98,103-114`
(`hydrated` state and its setter in the existing `useEffect`).

---

## R-003 · Accessibility ARIA pattern

**Decision**: Render the count `<p>` with `role="status"` and
`aria-live="polite"`. No `aria-atomic` override.

**Rationale**:
- The existing `effectiveDescription` paragraph (line 254) already uses
  `aria-live="polite"`, and `substitutionNote` (line 268) uses
  `role="status"`. These are semantically equivalent for this use case
  (the polite-polite announcement pattern). Choosing `role="status"` for
  the new element avoids two adjacent `aria-live="polite"` regions that
  some screen readers may deduplicate or race against each other.
- `role="status"` implicitly implies `aria-live="polite"` and
  `aria-atomic="true"` (the latter is exactly what we want — announce
  the entire updated content, not just the changed node, in case the
  count ever changes — which it does on `<ReaderControls>` remount but
  not on pill clicks).
- No visual-only signaling: the count is plain text ("6/9 modes
  available"), readable by screen readers, NOT conveyed by color alone
  (satisfies FR-012 and SC-005).
- Color contrast: the new `.completeness` class uses the same
  `--tbb-text-muted` token already validated for the `.cue` paragraph
  (line 132-136 of `ReaderControls.module.css`), which passes the
  site's existing axe check at WCAG AA.

**Rationale (alternatives considered and rejected)**:
- ❌ Plain `<p>` with no role/live. Silent to screen readers on hydration,
  fails SC-003's "without hovering or clicking any picker pill" test
  for screen-reader users.
- ❌ `role="meter"` with `aria-valuenow`/`aria-valuemin`/`aria-valuemax`.
  Semantically more precise (the count IS a meter) but introduces three
  attributes for what is functionally a status update. Mixing ARIA
  pattern idioms inside one small card makes the code harder to reason
  about than two adjacent `role="status"` paragraphs.
- ✅ `role="status"`. Matches the substitutionNote's pattern one line
  below; screen readers will announce both when relevant.

**Code anchor**: `edu-site/src/components/ReaderControls/index.tsx:268`
(the existing `substitutionNote` `<p role="status">` to mirror).

---

## R-004 · Visual styling class for the new indicator

**Decision**: Add a new `.completeness` class to
`edu-site/src/components/ReaderControls/ReaderControls.module.css`, sharing
the muted typography of `.cue` but distinguished by a small
`::before` dot using `--tbb-accent-subtle`.

**Proposed CSS** (to be added in `/sp.implement`, not now):

```css
.completeness {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0;
  color: var(--tbb-text-muted);
  font-size: 0.78rem;
  line-height: 1.45;
}

.completeness::before {
  content: "";
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--tbb-accent-subtle);
}

@media (prefers-reduced-motion: reduce) {
  .completeness::before {
    /* No animation on the dot — its presence is the signal. */
  }
}
```

**Rationale**:
- Shares font-size, line-height, and base color with `.cue` so the
  card's visual rhythm is consistent.
- The leading dot (with `aria-hidden="true"` on the `::before` content)
  visually differentiates it from `.cue` (no dot) and `.substitution`
  (full accent color text). Three visually distinct lines, three
  semantically distinct ARIA regions, no duplication.
- `prefers-reduced-motion` block is present even though there's no
  animation — it documents that no transition was considered, in case
  a future contributor adds one. Zero runtime cost.

**Rationale (alternatives considered and rejected)**:
- ❌ Reuse `.cue` directly. Two adjacent `.cue` paragraphs would look
  like a styling bug, not two distinct pieces of information.
- ❌ Reuse `.combinationDescription` (the boxed surface). Heavier than
  needed for a single-line status; competes visually with the
  per-combination note above it.
- ❌ Use `.substitution` (full accent). Conflates two different
  statuses: "your selection was substituted" (urgent, accent) vs
  "this page has N/9 modes" (informational, muted). FR-009 explicitly
  forbids duplication.
- ✅ New `.completeness` class. Smallest viable addition; one new class
  in one CSS file, no impact on other components.

**Code anchor**: `edu-site/src/components/ReaderControls/ReaderControls.module.css`
(the file that already owns `.cue`, `.substitution`, `.combinationDescription`).

---

## R-005 · Build-gate verification strategy

**Decision**: Run all three gates in this order at the end of
`/sp.implement`. Each must exit 0.

1. `cd edu-site && node scripts/check-frontmatter.mjs`
   - Catches missing `chapter_state` field on any chapter doc.
   - Catches malformed YAML on any frontmatter.
   - Validates all `intro.md` and `perf-targets.md` frontmatter (the
     two `text-ready` chapters) still parses.
2. `cd edu-site && node scripts/check-chapter-quality.mjs`
   - Per-chapter quality gate, transitively re-runs frontmatter checks
     on every `text-ready` chapter and skips `placeholder` chapters.
   - Will exit 0 as long as the two `text-ready` chapters pass.
3. `cd edu-site && npm run build`
   - Full Docusaurus build including `check:frontmatter` and
     `search-index` steps.
   - Validates no broken MDX, no broken internal links, no asset 404s.
   - Reports bundle size and LCP-relevant metrics — confirm zero
     regressions against the pre-feature baseline.

**Rationale**: Running the static checks first (steps 1-2) is fast and
localizes failures; only if they pass do we pay the cost of the full
`npm run build`. This order is the same one the project's existing
`package.json` `build` script uses transitively.

**Axe accessibility check (FR-012 / SC-005)**: ideal addition is to run
`npx @axe-core/cli http://localhost:4173/docs/intro/ --save
axe-report-after.json` against the built site, comparing
`edu-site/axe-report.json` (the existing pre-feature baseline) for any
new violations. If axe is not currently wired into the project's
package scripts (verify in `/sp.implement`), do not add it as part of
this feature — that scope-creep would defeat Principle V
(Smallest Viable Change). Add a follow-up issue in the morning report
instead.

---

## R-006 · Open follow-ups (deferred to morning, not blocking)

- **Verify no flicker on hydration** with a manual Playwright check on
  `intro.md` and `perf-targets.md` after `/sp.implement`. The chosen
  approach (gating on `hydrated`) should be flicker-free, but a real
  eyeball check is the cheapest confirmation. Not blocking; run if
  /sp.implement time permits.
- **Confirm no LCP regression** by comparing `npm run build` LCP/FCP
  metrics before and after. The new `<p>` adds ~50ms of work on a
  path that already includes the full `ReaderControls` mount, well
  under any meaningful threshold. Run as part of R-005 if output is
  available.
- **Future state (`video-published`)**: the existing `STATE_META`
  mapping already returns `null` for `video-published` (verified in
  `ChapterState/index.tsx`). When that state ships, no changes to this
  feature are needed — the badge will simply not render (the video
  embed becomes the headline). FR-003 is satisfied today.
