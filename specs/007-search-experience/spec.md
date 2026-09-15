# Feature Specification: Search Experience — Apple Spotlight (Home) + Expandable Bar (Chapters)

**Feature Directory**: `007-search-experience`
**Created**: 2026-09-11
**Status**: Draft
**Input**: User description: "there is a search bar in the book... the external mechanics of the book will work like this: [AppleSpotlight component] at the home page when the website will open, but at the Chapter sites, this will be: [ExpandableSearchBar component]"

## Context

The site has one search surface today: a flat navbar input styled by the `005-redesign-navbar-hero` feature (FR-013/FR-019), backed by a build-time index (`scripts/generate-search-index.mjs` → `static/search-index.json`) and hand-rolled scoring in `src/theme/SearchBar/index.tsx`.

The owner supplied two reference components — an **Apple Spotlight** overlay (home) and an **ExpandableSearchBar** (chapters) — and wants their mechanics to become the book's search: the Spotlight is what the home page opens with; the expandable bar is what chapter pages carry. This feature ports both into the live Docusaurus site.

Both reference components are React + Framer Motion + Tailwind and target a Next-style project (`@/lib/utils`, `next` conventions). The site is Docusaurus 3 on Infima with the silver `--tbb-*` token system; Tailwind/shadcn is on the normative do-not-add list (`stack.md`, Constitution Stack Constraints). The port therefore keeps the **look** of both references as given — including the SVG blob filter, spring/layout animations, 64px shortcut circles, and result-card shape — and changes only what must change mechanically: Tailwind → CSS Modules with existing tokens, `framer-motion` → the installed `motion/react`, external placeholder links → internal Docusaurus routing, plus the accessibility contract every interactive surface in this repo already owes (Escape, focus behaviour, 44×44 targets, reduced motion, light/dark parity).

No new dependency, no external search service, no backend — the existing generated index and scoring remain the engine (Constitution Principle I; Phase A discipline).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Home page opens with the Spotlight (Priority: P1) 🎯 MVP

As a visitor landing on the home page, I want search to present itself as a Spotlight overlay — a floating field that invites a query, previews the five stages as circular shortcuts, and lists matching chapters — so the site feels Apple-finished and I can reach any chapter immediately.

**Why this priority**: it is the mechanic the owner specified for the site's front door, and it is independently shippable (a complete search surface on the home route).

**Independent Test**: Load `/` on a fresh session: the Spotlight appears; Esc and backdrop click close it; ⌘K/Ctrl+K and the navbar search button reopen it; it does not auto-open again in the same session. Hovering a stage circle animates the circles in and swaps the placeholder to that stage's label; clicking it lands on the stage index. Typing a real curriculum term ("frontend", "spec", "Python") lists ranked results; Arrow keys + Enter open the highlighted chapter without a page reload.

**Acceptance Scenarios**:

1. **Given** a fresh browser session on `/`, **When** the home page loads, **Then** the Spotlight is open and focused.
2. **Given** the Spotlight was closed once, **When** the session continues, **Then** it does not re-open on its own; ⌘K/Ctrl+K and the navbar trigger both reopen it.
3. **Given** the Spotlight is open with an empty field, **When** I hover a stage shortcut, **Then** the shortcut row animates as supplied and the placeholder shows that stage's label; clicking navigates to its stage index.
4. **Given** I type at least one character, **When** results exist, **Then** ranked rows (title, matched heading or excerpt, stage-or-document glyph) render in the supplied card style, and ArrowDown/ArrowUp + Enter open the highlighted chapter in-app.
5. **Given** reduced motion is requested, **When** the Spotlight opens or closes, **Then** the blur/scale entrance collapses and content still appears.

### User Story 2 - Chapter pages carry the ExpandableSearchBar (Priority: P1)

As a reader inside a chapter, I want the navbar search to be a compact circle that expands into a field when I use it and offers the same quality of results, so search stays available without occupying the navbar.

**Why this priority**: chapters are where reading happens; the mechanic is the owner's specified chapter-side counterpart and is independently testable.

**Independent Test**: On any docs route, click the 40px circle → it springs open leftward and focuses; type a term → a dropdown of result cards appears under the bar; Arrow keys + Enter open a chapter in-app; Escape closes and clears; clicking outside with an empty field collapses it.

**Acceptance Scenarios**:

1. **Given** a chapter page, **When** I click the collapsed circle, **Then** the bar expands to the supplied width (right-anchored, growing left), the field focuses, and the icon becomes the close affordance.
2. **Given** the bar is expanded and I type, **When** matches exist, **Then** a results dropdown appears under the bar with the shared result-card look; with no matches, a "No matches." status shows.
3. **Given** results are showing, **When** I use ArrowDown/ArrowUp/Enter, **Then** the active row moves and Enter navigates to it without a full page load.
4. **Given** the bar is expanded with an empty field, **When** I click outside or press Escape, **Then** it collapses and clears.
5. **Given** the expanded bar on a narrow viewport (≤996px), **When** it opens, **Then** it and its dropdown stay inside the viewport.

### User Story 3 - One accessible, maintainable search system (Priority: P2)

As the owner, I want both surfaces driven by one engine and held to the site's accessibility contract, so search quality, wording, and machinery never diverge and the old surface leaves nothing stale behind.

**Why this priority**: it protects the contract (44px targets, focus rings, light/dark, reduced motion) and removes the retired navbar-search CSS/a11y selectors; it is testable only once US1/US2 exist.

**Independent Test**: `grep -rn "navbar__search" edu-site/src` returns nothing; `npm run build`, `npm run typecheck`, `npm run lint` are clean; `npm run test:a11y` reports no violations on home and a chapter page; the two surfaces return identical rankings for the same query; stage labels/routes appear once (shared source).

**Acceptance Scenarios**:

1. **Given** the same query, **When** run on both surfaces, **Then** result order is identical (one shared ranking function, `MIN_QUERY=1`, debounce 150ms, limit 8).
2. **Given** keyboard-only navigation, **When** I tab to the trigger, the bar, an input, or a result row, **Then** a visible focus ring renders, and every target meets 44×44 with no layout shift on focus.
3. **Given** dark mode, **When** either surface renders, **Then** every surface/text pairing has a defined dark token (Principle VII).
4. **Given** the feature has shipped, **When** I search the source for the old selectors, **Then** none remain in `custom.css`, `a11y.css`, or components.

### Edge Cases

- **Search index absent (dev without generation)**: fetch failure surfaces the same graceful behaviour the current SearchBar has (no crash; "No matches."/status only), with a console warning; `node scripts/generate-search-index.mjs` fixes dev.
- **Very long queries / no matches**: status row, no empty dropdown flash; input stays usable.
- **Route change while Spotlight is open** (e.g. clicking a result): overlay closes; state resets on next open.
- **`sessionStorage` unavailable** (privacy modes): auto-open is skipped rather than throwing.
- **Slash-less edge of home route**: only the exact home path (`/`) gets the Spotlight; a chapter always gets the bar.
- **`prefers-reduced-motion: reduce`**: entrance blur/scale/springs collapse; content appears static; focus indicator unchanged.
- **Viewport at 996px**: no overflow or clipped dropdown in either mode.
- **Drawer open + Spotlight trigger**: the drawer keeps its z-order above content; search surfaces sit above the navbar and below the drawer layers.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The home route MUST present the Spotlight overlay as its search surface; it opens automatically once per browser session, and is reopenable via ⌘K/Ctrl+K and a navbar trigger button.
- **FR-002**: The Spotlight's supplied visuals MUST be preserved: blob SVG filter, spring entrance/exit (blur + scale), animated placeholder crossfade, circular shortcut row with supplied animation math and 30%→100% opacity behaviour, supplied result-card shape and staggered reveal.
- **FR-003**: The five shortcut circles MUST be the five curriculum stages, sourced from one shared constant (label + route) that the site drawer also consumes; hovering shows the stage label in the placeholder.
- **FR-004**: Both surfaces MUST search the existing build-time index (`static/search-index.json`) with the existing ranking semantics (title → heading → body; `MIN_QUERY=1`; 150ms debounce; limit 8) via one shared engine module; results MUST navigate in-app (no `target="_blank"`, no reload).
- **FR-005**: Docs routes MUST present the ExpandableSearchBar in the navbar: 40px collapsed circle expanding to the supplied width in the direction that fits the navbar's right slot; input autofocuses on open; clicking outside with an empty field collapses it.
- **FR-006**: Both surfaces MUST satisfy the site accessibility contract: Escape closes; the Spotlight is a labelled modal dialog with focus into the field and focus returned to its trigger on close; result lists use listbox/option semantics with Arrow/Enter; every interactive target meets 44×44 (visual sizes may stay as supplied, with an invisible hit area); scroll is locked while the Spotlight is open.
- **FR-007**: Every surface, text tint, and state in both components MUST have defined light and dark tokens; glass surfaces keep the site's non-blur fallback.
- **FR-008**: No new runtime dependency, external search service, backend route, or paid tier may be introduced (Constitution Principle I; Phase A discipline).
- **FR-009**: Neither component may introduce Tailwind/shadcn classes; styling lands as CSS Modules (plus the navbar trigger's global chrome styling) on existing `--tbb-*` / `--ifm-*` tokens.
- **FR-010**: `scripts/generate-search-index.mjs` and the index record shape MUST NOT change; the index remains generated, never hand-edited.
- **FR-011**: The `Navbar/Content` swizzle and `docusaurus.config.ts` navbar items MUST be unchanged; the swizzled `@theme/SearchBar` decides per route what renders.
- **FR-012**: The retired navbar-search affordance MUST leave no dead CSS or a11y selectors: `navbar__search*` rules are removed/repurposed in `custom.css` and `a11y.css`; the FR-004 action-geometry rule keeps the home trigger in the same 44px pill family as GitHub and the theme toggle.
- **FR-013**: Scroll lock and route changes MUST leave no stuck state (no attribute left on `html`, no overlay across routes).

### Key Entities

- **Search engine module**: shared types + ranking + lazy index loading/debouncing (`src/lib/search.ts`).
- **Stage links constant**: `{number, label, to}` × 5, shared by Spotlight shortcuts and the SiteMenu drawer (`src/lib/stages.ts`).
- **Search UX context**: Spotlight open state, home-only key binding, session auto-open, scroll lock (`SearchUXContext.tsx`, mounted in `Root`).
- **AppleSpotlight**: the home overlay (supplied reference, ported).
- **ExpandableSearchBar**: the chapter navbar bar + results dropdown (supplied reference, ported).
- **SearchResultRow**: the shared result card used by both surfaces.
- **SearchIndex record**: `{title, route, headings, content, excerpt}` — generated, unchanged.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `cd edu-site && npm run build` exits 0 (five gates + Docusaurus) with a freshly generated `search-index.json`.
- **SC-002**: `npm run typecheck` and `npm run lint` are clean.
- **SC-003**: `npm run test:a11y` (axe) reports no violations on the home page and a chapter page.
- **SC-004**: Manual check: fresh session auto-opens the Spotlight exactly once; ⌘K/Ctrl+K reopens; the flag survives in-session navigation and resets per session.
- **SC-005**: Manual check: the same query on both surfaces returns the same ordered routes; Enter navigates without a page reload.
- **SC-006**: `grep -rn "navbar__search" edu-site/src` returns no matches.
- **SC-007**: Manual check with `prefers-reduced-motion: reduce`: both surfaces' entrances/exits collapse; content appears; focus rings intact.
- **SC-008**: Manual check at ≤996px and in dark mode: both surfaces render without overflow, with defined dark tokens on every surface.

## Assumptions

- The owner's clarifications (2026-09-11) hold: auto-open once per session; shortcut circles are Stage 0–4; chapter results appear as a dropdown in the supplied card look; the home navbar keeps an icon button that opens the Spotlight.
- The port keeps the supplied look; only mechanical substitutions (styling system, motion import, routing, a11y additions, dark-mode tokens) are made. The blob SVG filter is retained verbatim from the supplied reference as UI mechanics, not generated artwork.
- The Spotlight is home-only in this feature; ⌘K on chapter routes is a deliberate non-goal (the bar is click-opened).
- `edu-site/api` is untouched; no backend, database, or LLM surface is involved.
- No version control steps are part of the workflow (repo rule).

## Clarifications

### Session 2026-09-11

- Q: When should the Spotlight appear on the home page? → A: Auto-open once per browser session; ⌘K/Ctrl+K or the navbar button reopen it after dismissal.
- Q: What should the five circular shortcuts be? → A: Stage 0–4, each linking to its stage index, with the stage label shown in the placeholder on hover.
- Q: How should chapter-page results appear? → A: A results dropdown under the expandable bar, reusing the existing index/scoring restyled as the supplied result cards.
- Q: What should the home navbar search control be? → A: A compact icon button that opens the Spotlight.
