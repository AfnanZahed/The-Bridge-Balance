# ADR-0003: Scoped Accent Reintroduction

- **Status:** Accepted
- **Date:** 2026-09-03
- **Feature:** none (direct amendment to the docs-surface design system)
- **Context:** Earlier the same day, a full monochrome/metallic-silver migration removed the site's only hue (`--tbb-accent`, previously Apple-system blue) and replaced it with a ten-step neutral silver ramp (`--tbb-silver-0..9`) used for every surface, text tone, and interactive state, including links, active sidebar/TOC items, and the focus ring. That migration was never itself recorded as an ADR, and it left Constitution Principle VII's "Palette" bullet — which still names "Apple-system blue `--tbb-accent`, `#0071e3` light / `#0a84ff` dark" as the concrete embodiment of "one focused accent per surface" — contradicted by the shipped code. In the course of redesigning the docs chrome (sidebar, TOC, reading column, type scale), the zero-hue system's cost became concrete: a dense reading UI with no color signal for "this is a link," "this is where you are in the sidebar/TOC," or "this is keyboard focus" relies entirely on tone and weight, which is workable but strictly weaker wayfinding than a dedicated accent provides, and is exactly the gap Principle VII's accent concept exists to fill.

<!-- Significance checklist
     1) Impact: reverses part of a same-day site-wide visual decision and changes a shared token every future component reads. — yes.
     2) Alternatives: keep zero-hue everywhere vs. re-hue the shared --ifm-color-primary vs. a new narrowly-scoped token vs. full return to the old blue system — considered below. — yes.
     3) Scope: cross-cuts sidebar, TOC, in-content links, focus rings, footer, search, and the top navbar's active-section indicator. — yes.
     All three true → ADR justified. -->

## Decision

**Reintroduce `--tbb-accent` as a real, hue-bearing token — a cooler/dimmer steel-blue, not saturated system blue — scoped to a short, explicit list of navigation and wayfinding surfaces, with every other surface in the site staying on the zero-hue silver ramp.**

Values (computed via an OKLCH→sRGB→WCAG-contrast script, not eyeballed):
- Light: `--tbb-accent: oklch(0.40 0.08 245)` (`#1c4b70`-ish) — 9.15:1 on `--tbb-silver-0`, 8.26:1 on `--tbb-silver-1`, 7.00:1 on `--tbb-silver-2`. `--tbb-accent-hover: oklch(0.32 0.075 245)` (deepens on hover, the standard light-mode convention).
- Dark: `--tbb-accent: oklch(0.75 0.085 245)` (`#80b4e1`-ish) — 9.52:1 on `--tbb-silver-9`, 8.92:1 on `--tbb-silver-8`, 6.83:1 on `--tbb-silver-7`. `--tbb-accent-hover: oklch(0.82 0.08 245)` (brightens on hover).
- Chroma (0.08 light / 0.085 dark) is roughly half of real Apple system blue's (~0.16-0.19) and sits at the same 245° hue the silver ramp's own faint cool cast already leans toward (`--tbb-silver-*` carry chroma 0.008 at hue 250) — the accent reads as "the ramp's own tint, turned up to a working signal," not a foreign color bolted on.

**`--ifm-color-primary` stops aliasing `--tbb-accent`** and becomes its own literal neutral value (`--tbb-silver-9` light / `--tbb-silver-0` dark, i.e. unchanged in appearance from today). This is the load-bearing part of the decision: `--ifm-color-primary` is what callouts, inline code, pagination hover, the chapter-state badge, and stage cards read today, and none of those are in the approved accent scope. Decoupling the two tokens means redefining `--tbb-accent` cannot silently leak hue into them.

**Approved scope** (three surfaces named directly, extended after explicit confirmation): in-content prose links (`article a`), the active sidebar item at both leaf and category depth, the active TOC item, the focus ring (`--tbb-a11y-focus-color`, already aliases `--tbb-accent`), footer link hover, and the active/hover search-result row. Two additional selectors already consumed `--tbb-accent` before this change and are the same "active navigation item" pattern one level up the nav hierarchy — the top navbar's active-section pill and the mobile hamburger drawer's active/hover link — and stay on the hue rather than being awkwardly split out. The chapter-reading progress bar (a "where am I in this document" signal, docs-only) is kept on the accent as a judgment call. Homepage-only consumers of `--tbb-accent` (`.tbb-hero__eyebrow-item strong`, the `MagicUI/Timeline` spine and dots) are explicitly re-homed to neutral tokens so this morning's homepage monochrome work is not silently undone as a side effect.

## Consequences

### Positive

- **Restores a wayfinding primitive dense reading UI genuinely needs.** "This is a link" and "this is where you are" are now carried by color as well as tone/weight, on top of (not instead of) the existing non-color cues (underlines, rails, `aria-current`, weight) — WCAG 1.4.1 "use of color" was never violated by the zero-hue system and stays satisfied now.
- **Realigns code with the ratified constitution instead of contradicting it.** Principle VII's Palette bullet already named an accent token; the monochrome migration left that bullet stale without amending it. This ADR is the missing amendment, done with a real (if dimmer) blue rather than pretending the mismatch didn't exist.
- **Hue stays rare.** A full grep audit of every `--tbb-accent` consumer in `custom.css` found roughly a dozen selectors total after re-homing the ones that don't belong; the ten-step-ramp-used-equally principle from the same-day monochrome ADR-equivalent decision is supplemented, not reversed — the vast majority of the site (surfaces, text, callouts, code, cards, charts) stays strictly zero-hue.
- **Computed, not eyeballed, contrast.** Every accent value clears WCAG AAA (7:1) against every ground it actually sits on, with headroom to spare.

### Negative

- **Two accent-shaped tokens now exist side by side** — `--ifm-color-primary` (neutral, broad legacy Infima surface) and `--tbb-accent` (hued, narrow scope). A future contributor could reasonably reach for the wrong one. Mitigated by the Part-B/E token-table comment block landing directly above the token definitions in `custom.css`, naming exactly which selectors may consume which.
- **The accent's scope required six judgment-call extensions beyond the three literally-named surfaces** (top-nav active pill, mobile drawer, reading-progress bar, plus the footer/search extension already confirmed with the user). All are documented here and in the implementing commit; none were decided silently.
- **A second migration in one day** on the same token is more churn than ideal. Accepted because the zero-hue system's wayfinding gap surfaced immediately once real docs-chrome design work began, rather than being a preference reversal.

## Alternatives Considered

- **Keep the zero-hue system everywhere, rely on tone/weight/rails alone:** rejected — this is what shipped this morning and what this ADR is responding to; workable but strictly weaker wayfinding than an accent provides, and leaves Principle VII's Palette bullet permanently stale unless the constitution itself is amended to remove the accent concept (a larger, unrequested change).
- **Re-hue `--ifm-color-primary` directly instead of introducing a separate `--tbb-accent`:** rejected — `--ifm-color-primary` is consumed far beyond the approved scope (callouts, inline code, pagination, chapter-state badge, stage-card CTAs), so this would leak blue into every one of those, reopening the original "AI slop blue everywhere" complaint the monochrome migration was written to fix.
- **Full return to the pre-monochrome Apple-system-blue accent, unscoped:** rejected — same reopening risk as above, plus the user explicitly asked for a cooler/dimmer hue rather than saturated system blue this time.
