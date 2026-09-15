# ADR-0005: Search Experience Split — Home Spotlight + Chapter Bar on One Client-Side Engine

> **Scope**: This records the search-surface decision cluster — where search lives per route, what engine backs it, how the two supplied reference components were ported, and what accessibility contract the ports owe.

- **Status:** Accepted
- **Date:** 2026-09-11
- **Feature:** `specs/007-search-experience/`
- **Context:** See below.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
        — yes: it defines the site's search surfaces, their engine, and their
          accessibility contract, and it retires the previous surface.
     2) Alternatives: Multiple viable options considered with tradeoffs?
        — yes: seven, below (flat navbar input, search service, Spotlight
          everywhere, Tailwind-as-is, restyle-to-system, auto-open variants,
          a /search page).
     3) Scope: Cross-cutting concern (not an isolated detail)?
        — yes: navbar, Root, docs layout, CSS token system, a11y stylesheet,
          shared engine, drawer (via the stage list).
     All three true → ADR justified. -->

## Context

Feature `005-redesign-navbar-hero` gave the site one search surface: a flat input in the navbar, backed by a build-time index (`scripts/generate-search-index.mjs` → `static/search-index.json`) and hand-rolled scoring inside `src/theme/SearchBar/index.tsx`. It worked, but it was a compromise — a permanent navbar rectangle, one presentation for every page, and a results dropdown that shared none of its visual language with the rest of the site.

On 2026-09-11 the project owner supplied two reference components and stated the mechanic directly: an **Apple Spotlight** overlay — "at the home page when the website will open" — and an **ExpandableSearchBar** — "at the Chapter sites". Both pastes were React + Framer Motion + Tailwind built for a Next-style project (`@/lib/utils`, `use client`), i.e. neither could be dropped into this Docusaurus/Infima/`--tbb-*` codebase unchanged.

Porting them forced five questions this repo could answer in more than one way: which route gets which surface; whether search stays client-side or gains a service; how much of the pasted look survives the porting rules; how the two surfaces share machinery so they cannot diverge; and what accessibility contract the ports must carry (the pastes carry none). This ADR records the answers as one cluster, because they were decided together and changing any one re-opens the others.

The platform constraints in force: free-tier by default (Constitution Principle I) and Phase A only — no backend routes beyond the scaffolded 501s; Tailwind/shadcn on the normative do-not-add list (`stack.md`); no new dependency without justification; the standing preference that a supplied reference's **look** is kept as given, with only mechanical substitutions allowed.

## Decision

**The site has exactly two search surfaces, one engine, and one result-card language — all client-side, all free.**

**1. Surfaces split by route, decided in one place.** `@theme/SearchBar` — the single node the swizzled `Navbar/Content` renders — becomes a route split:

- **Home (`/`)** → the **AppleSpotlight** overlay: floating field, animated placeholder, four shortcut circles (the four curriculum stages), live result cards. It **auto-opens once per browser session** (skipped when `sessionStorage` is unavailable), and is reopenable via **⌘K / Ctrl+K** or a navbar trigger button.
- **Docs routes (everything else)** → the **ExpandableSearchBar** in the navbar's right slot: a 40px circle that springs open leftward into a 280px pill, autofocusing its input, with results in a dropdown beneath it.

`Navbar/Content`'s swizzle and `docusaurus.config.ts` are untouched; the split lives entirely in the one component Docusaurus already routes search through.

**2. The engine stays client-side, static, and shared.** `src/lib/search.ts` owns the record/hit shapes, the ranking (moved verbatim from the retired single-surface SearchBar: title → heading → body weights, `MIN_QUERY=1`, 150ms debounce, limit 8), and a **module-cached lazy fetch** of the existing `/search-index.json`, so both surfaces share one load and one ranking. `scripts/generate-search-index.mjs` and the record shape are unchanged. No search service, no backend route, no dependency.

**3. One result presentation.** `src/components/Search/SearchResultRow` renders every result on the site — Spotlight list and bar dropdown both feed it — so the two surfaces cannot drift visually or behaviourally.

**4. One source for stage identity.** `src/lib/stages.ts` (`STAGE_LINKS`) feeds the Spotlight's shortcut circles and the SiteMenu drawer alike; the four labels/routes cannot diverge between them.

**5. The supplied look is kept; only mechanical substitutions are made.** Tailwind utilities → CSS Modules on existing `--tbb-*` tokens with explicit dark-mode values; `framer-motion` → the installed `motion/react`; `@/lib/utils` → `clsx`; `target="_blank"` X-placeholder links → in-app routing via `useHistory`; the static app list → live ranked results. Kept verbatim: the `#blob` SVG filter and spring entrance/exit, the 64px shortcut circles at 30% opacity, the result-card shape, and the literal animation math. The `#blob` filter is retained as UI mechanics from the owner's own supplied reference — it is not a generated visual and does not fall under the no-generated-imagery rule.

**6. The ports carry the accessibility contract the pastes lack.** The Spotlight is a labelled modal dialog (`role="dialog"`, `aria-modal`) with Escape, a Tab cycle inside the overlay, focus into the field on open and back to the trigger on close, `role="listbox"/>` options with ArrowUp/ArrowDown + Enter, a scroll lock (`html[data-search-open]`), and reduced-motion guards on every entrance (the copy's blur/scale collapses; springs already collapse via `MotionConfig reducedMotion="user"`). The bar keeps the navbar input's visible focus ring and combobox/listbox semantics; its 40px visual carries an invisible 44px hit area. A `fieldset` groups the Spotlight's field and shortcuts. The old `navbar__search*` CSS and a11y selectors were retired with the surface they styled.

## Consequences

### Positive

- **One engine, one ranking, one card**: the two surfaces were verified to return the same ordered routes for the same query; divergence would require editing one shared module, not two parallel UIs.
- **Zero cost, zero new dependencies**: the index is a build artifact, scoring runs in the browser, and the port reuses `motion`, `lucide-react`, and `clsx` — already installed. Principle I and Phase A are untouched, and the do-not-add list stays intact (no Tailwind entered the codebase).
- **The home page gets the front-door mechanic the owner specified**, including the once-per-session first impression, without touching the reading experience of chapter pages, where search stays compact until used.
- **Accessibility improved beyond the surface it replaced**: the flat input had a focus ring and hit area, but the Spotlight adds modal semantics, focus management, keyboard result navigation, and reduced-motion handling; a chapter page now scans clean under axe's WCAG 2.1 A/AA set.
- **Stage identity is now single-sourced**, closing a drift risk the Spotlight would otherwise have opened against the drawer.
- **The retirement is complete**: no dead `navbar__search*` selectors remain in `src/`, so future readers cannot mistake the old surface for live code.

### Negative

- **Auto-open is opinionated.** A search overlay appearing unbidden on a fresh home visit is unusual for a documentation site; a reader who lands mid-thought must dismiss it. Mitigations: once per session only, Escape/backdrop close, skipped entirely when storage is blocked, and the navbar trigger remains for re-entry. This was the owner's explicit choice among three options.
- **Client-side search has a ceiling.** The corpus is ~27 documents with ~2,000 characters each indexed; O(n) scan per keystroke is imperceptible today, but it will not survive a corpus an order of magnitude larger. Revisit when the index size or query latency becomes noticeable; the shared engine is the single place a swap would land.
- **⌘K is home-only by design**, so the keyboard summon is asymmetric between routes. Deliberate (the bar is click-opened) but worth revisiting if keyboard-first readers ask for it.
- **Two open-state owners**: the bar owns its own state; the Spotlight lives in a provider (`SearchUXContext`) shared with the navbar trigger. The split mirrors the surfaces but is one more thing to hold in mind.
- **Fidelity keeps a few paste quirks**: the placeholder-shows-the-hovered-result-title behaviour was kept, the literal shortcut offset math was kept, and `filter: url(#blob)` combined with `backdrop-filter` glass is a cross-browser risk with a documented fallback (drop the SVG filter, keep the blur).
- **Result rows are buttons, not links**: correct for the listbox pattern, but a user cannot middle-click a result or open it in a new tab.
- **The two pastes' accidental duplicate effects had to be de-duplicated** during porting (no visual change); future pastes from the same source should expect the same kind of mechanical cleanup.

## Alternatives Considered

- **Keep the flat navbar input everywhere (the 005 surface), ignore the supplied components.** Rejected: the owner supplied the mechanics as the specification for this work; the flat input also quantifies the problems it solved (permanent navbar rectangle, one presentation for every route, unshared card language).
- **Add a search service — Algolia DocSearch or a Qdrant-backed endpoint.** Rejected: DocSearch requires an application/approval and injects external JS; Qdrant + embeddings is Phase B work (this repo is Phase A, routers return 501), and Principle I demands a documented free tier and a paid threshold for every new component. The static index already exists and is rebuilt by `npm run build`.
- **Spotlight on every route.** Rejected: it is heavy for pages whose whole job is reading, and it contradicts the owner's stated split ("at home … at the Chapter sites this will be [the bar]").
- **Port the pastes with Tailwind/shadcn as written.** Rejected: Tailwind is explicitly on the stack's normative do-not-add list; importing it for two components would require an ADR reversing `stack.md` and would duplicate a styling system the site already has.
- **Rebuild the look in the site's own visual language (tokens-first, Phosphor icons throughout, monochrome-homepage palette).** Rejected: the owner's standing preference is that a supplied reference's look is kept as given — a previously "improved" port was rejected for exactly this reason. Only mechanical substitutions and the additions the site requires (dark-mode values, a11y behavior) were permitted.
- **Auto-open every home load, or never auto-open.** Rejected in favour of once-per-session: "every load" punishes repeat visits and refreshes; "never" fails the stated mechanic ("when the website will open"). The chosen middle keeps the first impression and drops the annoyance.
- **A dedicated `/search` results page.** Rejected: the specified mechanics are an overlay and a dropdown; a page adds routing and a third presentation without a user need.

## References

- Feature Spec: [`specs/007-search-experience/spec.md`](../specs/007-search-experience/spec.md)
- Implementation Plan: [`specs/007-search-experience/plan.md`](../specs/007-search-experience/plan.md) · Tasks: [`tasks.md`](../specs/007-search-experience/tasks.md)
- Related ADRs: [ADR-0003](./0003-scoped-accent-reintroduction.md) — the accent-scope list; the search surfaces deliberately stay outside it (result-row hover uses surface steps, not `--tbb-accent`; the bar's input focus ring is within the focus-ring scope). No conflict; this ADR adds no accent consumer.
- Evaluator Evidence: [PHR 0001](../prompts/007-search-experience/0001-implement-search-experience.green.prompt.md) — `npm run build` green (five gates + build), typecheck clean, biome clean on the 007 files, axe 0 violations on a chapter page, 13/13 headless Playwright smoke checks (auto-open once/session, Escape, ⌘K, shortcuts, results, Enter navigation on both surfaces, reduced-motion open), `navbar__search` gone from `src/`. This ADR's record: [PHR 0002](../prompts/007-search-experience/0002-create-search-experience-split-adr.misc.prompt.md).
