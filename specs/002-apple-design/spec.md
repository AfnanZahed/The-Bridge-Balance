# Feature Specification: Apple-Inspired Visual Theme Transformation

**Feature Directory**: `002-apple-design`  
**Created**: 2026-08-17  
**Status**: Draft  
**Input**: User description: "Apply theme transformation"

## Clarifications

### Session 2026-08-17

- Q: How should the four saturated stage accents be handled under the Apple-inspired visual language? → A: **Mute all to Apple-grade.** Replace cyan, amber, violet, and pink with desaturated Apple-grade equivalents (teal, ochre, lilac, and dusty rose); retain semantic stage distinction but do not use the current saturated hex values as general UI color.
- Q: What should the canonical primary/brand accent be (the single accent per surface per Principle VII)? → A: **Apple Pro Blue.** Primary links, focus rings, primary CTAs, and active states use the deeper OKLCH Apple Pro Blue (`oklch(0.5 0.21 264)` light / `oklch(0.68 0.18 264)` dark); stage accents remain muted categorical marks.
- Q: How aggressively should the transformation reduce motion to honor Apple-Design Purity's "reticent motion"? → A: **Strip to static.** Remove Lenis smooth scroll, GSAP scroll-scrubbed spine, and the R3F 3D bridge hero. Keep only Framer Motion entrance reveals, and those collapse under `prefers-reduced-motion`. The site becomes primarily static, with no parallax, scroll-scrubbed effects, or WebGL decoration.
- Q: How should the existing type system (Inter / Instrument Serif / Geist Mono) be tuned for Apple-grade depth? → A: **Apple-style: ultra-professional, bold, simple, attractive.** Keep the existing type stack (no font swaps) but commit to bolder display weights (700–800 on headings and hero), a tighter tracking hierarchy, generous line-height on body, and reduce type variations so the page reads as confident rather than busy. Instrument Serif is reserved for one or two editorial moments (hero tagline, brand mark, chapter intro quotes) rather than sprinkled through headings.
- Q: Under the muted-accent policy, how should the curriculum dashboard (BarChart + Donut + KPIGrid) handle color? → A: **Single accent + neutrals.** The charts use a single Apple-system blue for the primary series and neutral grayscale steps for secondary/tertiary elements. The four stages are distinguished by clear labels rather than four separate colors, maximizing visual restraint and clarity.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Experience a Calm, Premium Homepage (Priority: P1)

A first-time learner opens The Bridge Balance and immediately understands the product's purpose through a calm, premium visual language. Content feels spacious and intentional rather than crowded, while the curriculum and primary action remain obvious.

**Why this priority**: The homepage is the first trust signal and the primary entry point into the curriculum.

**Independent Test**: Open the homepage at desktop and mobile widths in both light and dark modes. A reviewer can identify the purpose, four stages, and Stage 1 call to action without relying on animation.

**Acceptance Scenarios**:

1. **Given** a first-time visitor opens the homepage, **When** the page finishes loading, **Then** the hero message, primary action, and curriculum entry point are visually dominant within the first viewport.
2. **Given** the visitor scans the homepage, **When** they move between sections, **Then** generous spacing, restrained surfaces, and consistent alignment make the page hierarchy understandable without visual clutter.
3. **Given** the visitor has motion reduction enabled, **When** the homepage loads, **Then** all essential content is immediately visible and usable without scroll-linked or entrance animation.

---

### User Story 2 - Read Comfortably Across Light and Dark Modes (Priority: P1)

A learner reads a long lecture in their preferred appearance mode. Text, code, links, cards, callouts, data visualizations, and navigation remain legible and visually coherent when switching between light and dark modes.

**Why this priority**: The textbook is the core product; theme polish cannot compromise reading comprehension or accessibility.

**Independent Test**: Open the Introduction and one Stage 1 chapter, toggle light/dark mode, and inspect body text, headings, links, code blocks, callouts, chart legends, and focus states.

**Acceptance Scenarios**:

1. **Given** a reader is in light mode, **When** they read a chapter, **Then** body and secondary text meet the project's target contrast and surfaces remain visually separated without heavy borders.
2. **Given** a reader switches to dark mode, **When** the same chapter is displayed, **Then** every semantic surface, text color, chart mark, and focus indicator has a defined dark-mode treatment with no blank, white, or unreadable region.
3. **Given** a browser does not support backdrop blur, **When** a translucent surface is displayed, **Then** a solid opaque fallback preserves contrast, content, and hierarchy.

---

### User Story 3 - Navigate and Interact with Confident Feedback (Priority: P1)

A learner uses the navbar, sidebar, links, buttons, charts, stage cards, and documentation controls with a keyboard, pointer, or touch device. Every interactive element communicates its state through subtle, consistent feedback.

**Why this priority**: Premium visual design must improve confidence and usability, not merely decorate the interface.

**Independent Test**: Navigate the homepage, sidebar, Introduction, and a chapter using keyboard-only input and a touch-sized viewport. Verify focus, hover, active, disabled, and current-page states.

**Acceptance Scenarios**:

1. **Given** a keyboard user tabs through the page, **When** an interactive element receives focus, **Then** a visible focus ring appears without relying on color alone.
2. **Given** a touch user opens the site on a narrow viewport, **When** they use navigation and primary actions, **Then** controls remain reachable, readable, and free of horizontal overflow.
3. **Given** a user hovers or focuses a stage card or chart region, **When** feedback appears, **Then** it uses restrained elevation or color change and does not shift surrounding content unexpectedly.

---

### User Story 4 - Preserve the Curriculum's Technical Personality (Priority: P2)

A learner can still distinguish the curriculum's four stage accents, code-oriented content, provider/service identities, and interactive visualizations inside the restrained Apple-inspired system.

**Why this priority**: The transformation must create a coherent visual system without erasing the information architecture already established for the curriculum.

**Independent Test**: Inspect stage cards, the curriculum dashboard, provider chips, code blocks, and the co-authoring timeline in both modes. Confirm semantic distinctions remain visible without excessive saturated color.

**Acceptance Scenarios**:

1. **Given** a visitor views the four stage cards, **When** they compare stages, **Then** each stage retains a distinct accessible accent and title while shared surface, spacing, and elevation rules remain consistent.
2. **Given** a visitor views the curriculum dashboard, **When** they read the charts and KPI cards, **Then** legends, labels, and values remain understandable without color-only interpretation.
3. **Given** a visitor reads technical documentation, **When** they encounter code, provider chips, or callouts, **Then** typography and icon roles remain consistent with the established content hierarchy.

---

### Edge Cases

- A browser lacks `backdrop-filter`; translucent cards use an opaque surface fallback without reducing contrast.
- A user enables `prefers-reduced-motion`; scroll reveals, smooth-scroll effects, 3D motion, hover transitions, and chart animations collapse while layout and content remain intact.
- A user selects a high-contrast or forced-colors mode; borders, focus indicators, text, and controls remain perceivable and the design does not depend on background images.
- A very narrow viewport or large text setting causes long headings or tables to wrap or scroll inside their own container rather than creating page-level horizontal overflow.
- A chart or decorative 3D asset fails to load; adjacent explanatory text, labels, and navigation remain usable.
- A stage accent is low contrast on a surface; semantic text uses a contrast-safe token and the accent remains a decorative or categorical signal with a non-color label.
- A proprietary Apple font or visual asset is unavailable; the documented free substitute and CSS-native treatment preserve the intended hierarchy.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST present a unified Apple Pro Silver & Black visual system across the homepage, Introduction, documentation pages, stage overviews, chapters, navigation, charts, and shared components. Light mode MUST use near-pure white surfaces (`oklch(0.99 0 0)` body / `oklch(1 0 0)` cards) and dark mode MUST use pure black surfaces (`oklch(0.07 0 0)` body / `oklch(0.12 0 0)` cards).
- **FR-002**: The visual system MUST use generous spacing, clear hierarchy, restrained silver/graphite surfaces, hairline borders, frosted glass, monochrome mesh, and a single primary accent (Apple Pro Blue `oklch(0.5 0.21 264)` light / `oklch(0.68 0.18 264)` dark) applied to links, focus rings, active states, and primary CTAs. Surface elevation MUST use inset top-highlight + bottom-shadow stacks (Pro signature) rather than heavy drop-shadows.
- **FR-003**: Every shared surface treatment MUST define both light and dark appearances, including background, text, border or hairline separator, Pro glow, chart palette, and focus tokens where applicable. The site MUST set `color-scheme: light` and `color-scheme: dark` on `:root` and `:root[data-theme="dark"]` respectively so native form controls, scrollbars, and `<input type="range">` thumbs honor the active theme.
- **FR-004**: Every translucent or blurred surface (navbar, sidebar drawer, hero eyebrow, chart tooltips) MUST provide a solid opaque fallback for browsers that lack `backdrop-filter` (Safari prefix and legacy Edge handled via `@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))`).
- **FR-005**: All text/background pairings MUST meet WCAG 2.2 AA contrast: normal text ≥ 4.5:1, large text ≥ 3:1, non-text UI components (focus rings, chart labels) ≥ 3:1. The Apple Pro palette contrast matrix (light + dark) MUST be documented and re-verified when token values change.
- **FR-006**: Every keyboard-operable control MUST provide a visible `:focus-visible` ring (2px Apple Pro Blue outline + 4px shadow halo) that is not communicated by color alone.
- **FR-007**: The site MUST strip heavy motion libraries: Lenis smooth scroll, GSAP scroll-spine scrub, and the R3F 3D hero MUST remain removed. Motion MUST be limited to short Framer Motion entrance reveals (`MotionConfig reducedMotion="user"`) and a static timeline spine; all motion MUST collapse under `prefers-reduced-motion: reduce`.
- **FR-008**: The site MUST retain four muted categorical stage accents (teal/amber/indigo/plum) used as label-first signals on chips, callout side-rails, chapter-state badges, and the four hero stage hangers. The curriculum BarChart, Donut, and KPIGrid MUST use a single Apple Pro Blue primary series with neutral grayscale steps; stage identity in data visualizations MUST be communicated by explicit labels, not color alone.
- **FR-009**: The design MUST keep the established free-tier typography stack (Inter for UI/body, Instrument Serif for limited editorial accents, Geist Mono for code) with the Apple Pro font order `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "SF Pro", "Inter", "Helvetica Neue"`. Weights, tracking (`-0.011em` body, `-0.022em` headings), and line-height MUST be tuned to an Apple-grade rhythm. The site MUST NOT add unlicensed proprietary Apple fonts, logos, or imagery, and MUST NOT introduce Tailwind or other paid design tooling.
- **FR-010**: The site MUST avoid page-level horizontal overflow at supported responsive widths (320 / 768 / 1440 px). Marquee, tables, charts, and the timeline MUST scroll only inside their own bounded containers; the mobile navbar drawer MUST be styled with the frosted-glass tokens and a solid fallback.
- **FR-011**: The hero MUST use a calm static CSS layout (typography, generous spacing, Apple Pro Mesh monochrome radial gradients, and a static SVG bridge span with the Apple Pro Blue ramp) rather than a WebGL canvas. Core navigation and reading content MUST remain usable without client-side animation.
- **FR-012**: The theme transformation MUST preserve existing curriculum routes, sidebar order, chapter-state indicators, chart semantics, icon taxonomy, and content contracts. The four Apple Pro chart palette tokens (`--chart-1..5`) MUST be available to Recharts via resolved OKLCH literals because Recharts serializes `fill` attributes that don't resolve `var()`.
- **FR-013**: The transformation MUST add no paid infrastructure, paid font dependency, or paid runtime service. The Apple Pro theme MUST be authored as standard CSS (custom properties + utility classes) without Tailwind or any new build pipeline.
- **FR-014**: The implementation MUST include a repeatable design-fidelity review covering light/dark mode, contrast matrix (axe-core), blur fallback, reduced motion, keyboard focus, responsive overflow, and graceful degradation before release.
- **FR-015**: Code blocks MUST use a custom dark Prism theme (monochrome silver/graphite palette, AA-legible token colors on `oklch(0.07 0 0)`); the saturated `dracula` preset MUST NOT be used.
- **FR-016**: Native Docusaurus admonitions (`.alert`, `.alert--info`, `.alert--success`, `.alert--warning`, `.alert--danger`) MUST be skinned with hairline borders, Apple Pro surface tokens, and stage-mapped left-rail accents so they remain visually consistent with the custom `<Callout />` component.
- **FR-017**: Stage card surfaces MUST use the Apple Pro silver surface (`linear-gradient(180deg, oklch(1 0 0) 0%, oklch(0.98 0.001 250) 100%)` + inset top-highlight + bottom-shadow + 1px hairline border). Hover MUST elevate via `--tbb-shadow-glow` and intensify the stage-color wash, not via translate.

### Key Entities *(include if feature involves data)*

- **Design Token**: A semantic visual value for color, type, spacing, elevation, shape, motion, or focus behavior that is shared across surfaces and modes.
- **Surface**: A visually grouped region such as a card, hero panel, callout, navbar, sidebar, chart panel, or code block with defined appearance states.
- **Theme Mode**: The light or dark presentation of the same semantic token system.
- **Interaction State**: A control's default, hover, focus-visible, active, disabled, or current-page presentation.
- **Graceful Fallback**: The usable rendering shown when blur, WebGL, animation, fonts, or remote decorative assets are unavailable.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In a review of the homepage, Introduction, one chapter, provider page, and curriculum dashboard at desktop and mobile widths, 100% of tested surfaces have intentional light and dark states with no unreadable or unstyled region.
- **SC-002**: Keyboard-only reviewers can reach and identify every primary navigation link, sidebar control, chapter link, chart interaction, and primary call to action, with 100% showing a visible focus indicator.
- **SC-003**: The site produces no page-level horizontal overflow at viewport widths of 320px, 768px, and 1440px; wide tables and charts scroll only within their own bounded containers.
- **SC-004**: With reduced motion enabled, the same primary navigation and reading journeys remain fully usable, and no essential content is delayed behind animation.
- **SC-005**: At least 90% of first-time reviewers can identify the site's purpose, the Stage 1 entry point, and the four-stage structure within 30 seconds without instruction.
- **SC-006**: The theme transformation adds $0 to recurring infrastructure, font, asset, and hosting costs and introduces no proprietary Apple asset dependency.
- **SC-007**: The existing frontmatter check, typecheck, production build, and accessibility/performance audit continue to pass after the transformation.

## Assumptions

- "Apple theme" means an Apple-inspired visual language, not a claim of affiliation, official Apple branding, or a reproduction of proprietary Apple assets.
- Inter, Instrument Serif, and Geist Mono remain the free-tier type system unless a separately approved and licensed alternative is documented.
- Existing stage accents, charts, icon roles, chapter-state badges, and content routes are preserved unless a later spec explicitly changes their information architecture.
- CSS-native blur, opacity, gradients, shadows, responsive layout, and progressive enhancement are preferred over new runtime dependencies.
- Existing free-tier and accessibility commitments remain binding; visual polish cannot regress reading usability or cost.

## Out of Scope

- Copying Apple's logos, product screens, proprietary illustrations, or unlicensed typography.
- Rebuilding the curriculum information architecture, chapter content, LLM provider contracts, authentication, RAG chatbot, or payments.
- Adding paid design tooling, paid fonts, paid assets, or a new hosting provider.
- Replacing the established Phosphor/Lucide/Tabler icon taxonomy with a single vendor library.
- Introducing a new application framework solely for visual styling.
