# Feature Specification: Redesign Top-of-Page Chrome (Navbar + Hero Top) from Scratch

**Feature Directory**: `005-redesign-navbar-hero`
**Created**: 2026-08-18
**Status**: Draft
**Input**: User description: "transform this part: [Image #4] design, Ui and UX at all from the scrath" + clarification "redesign all of them, and the complete top part of the hero section which has these buttons"

## Context

[Image #4] shows the site's **top navigation bar** (brand "The Bridge Balance" + logo, "Curriculum" link, GitHub link, theme toggle). The user wants this surface **redesigned from scratch** — its design, UI, and UX — not patched. In a clarification the user expanded scope to also redesign **the complete top part of the hero section** (the hero "deck" — brand mark, eyebrow chip, headline, subtitle, primary + secondary CTA buttons, and meta row).

This feature supersedes the presentation of feature `004-fix-navbar-alignment` (which normalized the current navbar's baseline geometry) for the surfaces in scope. The new design MUST preserve the accessibility contract established there (44×44 touch targets, Apple-blue focus rings, glass with solid fallback, no layout shift on theme change, WCAG 2.2) and the Apple Pro token system (Constitution Principle VII). Out of scope: home content sections other than the hero top (stages, marquee, why-this-book, timeline, data-viz, closing CTA), all doc/chapter pages, footer, backend.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Fresh Navbar Visual Design (Priority: P1) 🎯 MVP

As a visitor, I want the top navigation bar to present a new, cohesive visual design — not a tweak of the current one — so that the site opens with a distinctive, Apple-grade first impression that makes the product feel finished.

**Why this priority**: The navbar is the first and most-repeated UI element on every page. A visible, complete redesign is the highest-impact visual change the site can receive, and it is the surface the user explicitly asked to transform from scratch.

**Independent Test**: Load the site at desktop and mobile widths, in light and dark themes. Visually confirm the navbar renders a **new design** (layout, materials, typography, spacing, control styling differ materially from the current bar) while every element remains aligned, legible, and usable. Screenshot the four configurations.

**Acceptance Scenarios**:

1. **Given** the site loads on desktop (≥ 996px), **When** I observe the navbar, **Then** it presents the new design — distinct visual treatment (layout, material, or structure) that differs from the pre-redesign bar — with brand, navigation, and actions arranged coherently.
2. **Given** the site loads in dark mode, **When** I observe the navbar, **Then** the same new design renders with dark-mode tokens at the same alignment quality as light mode.
3. **Given** a mobile viewport (< 996px), **When** I observe the navbar, **Then** the redesigned brand + hamburger arrangement is aligned and the drawer opens cleanly with the new visual language.
4. **Given** the new navbar is live, **When** I compare the four screenshot configurations, **Then** the design is consistent (same geometry, tokens, spacing rules) across all four.
5. **Given** the user changes theme, **When** the transition completes, **Then** no navbar element jumps, reflows, or changes baseline position (CLS contribution = 0).

### User Story 2 - Fresh Hero Top Section Design (Priority: P1)

As a visitor, I want the hero "deck" — the mark, eyebrow, headline, subtitle, primary and secondary CTA buttons, and meta row — to present a new, cohesive visual design so that the first impression after the navbar carries the same level of craft.

**Why this priority**: The hero top is the second thing every visitor sees and contains the primary conversion (Start with Stage 1). Redesigning it alongside the navbar creates a coherent "above the fold" experience; keeping it stale would undermine the navbar redesign.

**Independent Test**: On the homepage, observe the hero deck above the fold. Visually confirm it presents a new design (layout, typography, spacing, button styling, hero artwork relationship) distinct from the pre-redesign hero while preserving readability and the existing copy. Screenshot desktop and mobile, light and dark.

**Acceptance Scenarios**:

1. **Given** the homepage loads on desktop, **When** I observe the hero deck, **Then** it presents a new visual design distinct from the pre-redesign hero, with the primary CTA clearly emphasized.
2. **Given** the homepage loads in dark mode, **When** I observe the hero deck, **Then** the same new design renders with dark-mode tokens.
3. **Given** a mobile viewport, **When** I observe the hero deck, **Then** the redesigned mark + headline + CTAs stack/readably without overflowing or clipping.
4. **Given** the hero is live, **When** I tab through the CTAs, **Then** the Apple-blue focus rings appear with no layout shift and the buttons meet 44×44 px touch targets.
5. **Given** the hero is live, **When** the user changes theme, **Then** no hero element jumps, reflows, or changes baseline position.

### User Story 3 - UX Behaviors and Active-State Cohesion (Priority: P2)

As a visitor, I want the redesigned navbar and hero to behave as polished as they look — clear active state, predictable sticky behavior, and a sense that both surfaces belong to one product.

**Why this priority**: Visual redesign (US1 + US2) delivers the headline change; cohesive UX behaviors complete it. Both are independently testable slices.

**Independent Test**: Navigate between a few pages; verify the current-section indicator updates, the navbar stays predictably available while scrolling, and keyboard/touch interaction behaves identically to the pre-redesign baseline (focus rings, touch targets, drawer).

**Acceptance Scenarios**:

1. **Given** I am on a page inside a curriculum stage, **When** I look at the navbar, **Then** the active section is visually indicated with the new design's active-state treatment.
2. **Given** I scroll down a long page, **When** the navbar is in its default sticky mode, **Then** it remains available (or hides/reappears per the chosen behavior) without covering content or causing layout shift.
3. **Given** the hero is on the homepage, **When** I click the primary CTA, **Then** I land on Stage 1 and the navbar reflects the new active state.
4. **Given** keyboard or touch navigation across navbar and hero CTAs, **When** I tab to or tap each, **Then** the Apple-blue focus ring and ≥ 44×44 touch target contract are preserved under the new design.

### Edge Cases

- **Reduced motion**: All navbar and hero transitions/animations collapse to near-zero; focus rings still appear fast.
- **High contrast / forced colors**: Navbar borders and hero CTAs become visible; glass fallback renders as solid surface; focus rings widen.
- **Viewport at exact breakpoint (996px)**: No layout thrash between desktop and mobile arrangements in either navbar or hero.
- **Very long site title**: Title truncates with ellipsis rather than pushing elements off-screen or wrapping.
- **Theme transition during scroll**: The navbar maintains alignment while materials transition; hero remains stable.
- **Anchor-link offset**: If the navbar remains sticky and content anchors scroll under it, the scroll offset accounts for the navbar height (no hidden headings).
- **No-JS / pre-hydration**: The redesigned navbar and hero render sensibly before client hydration (static HTML/CSS first).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The navbar MUST present a new visual design that differs materially from the pre-redesign navbar (layout, material, typography, or structural treatment).
- **FR-002**: The navbar brand (logo + "The Bridge Balance" title) MUST be legible and hierarchically prominent in both themes.
- **FR-003**: Primary navbar navigation ("Curriculum") MUST be clearly identifiable and visually distinct from actions.
- **FR-004**: All navbar actions (theme toggle, GitHub link, and any new items) MUST share a consistent control treatment (height, padding, radius, material) and align on a common baseline.
- **FR-005**: The navbar material MUST be Apple Pro-consistent (glass/frosted with solid fallback per `@supports`) and render correctly in light and dark.
- **FR-006**: Every interactive navbar element MUST meet the 44×44 CSS px minimum touch target (WCAG 2.2 SC 2.5.8).
- **FR-007**: Keyboard focus on any navbar interactive element MUST show the Apple-blue focus ring without layout shift.
- **FR-008**: Changing theme MUST NOT cause any navbar element to jump, reflow, or change vertical position.
- **FR-009**: The navbar border/hairline MUST be consistent in both themes and not double-render.
- **FR-010**: The site title MUST truncate gracefully with ellipsis if it would overflow.
- **FR-011**: The mobile navbar (hamburger + drawer) MUST present the new design and open without layout shift.
- **FR-012**: The navbar MUST use a **centered-brand arrangement**: brand (logo + title) centered, navigation on the left, actions on the right — an Apple-style layout with strong brand presence.
- **FR-013**: The navbar MUST include a **curriculum search affordance** alongside the existing items (Curriculum link, GitHub link, theme toggle), with all items sharing the new control treatment.
- **FR-019**: The curriculum search MUST provide an in-page client-side search over static curriculum titles, headings, and content, with results presented in a navbar-associated dropdown or panel and no external search service dependency.
- **FR-014**: The hero top section (mark, eyebrow, headline, subtitle, CTA buttons, meta row) MUST present a new visual design that differs materially from the pre-redesign hero.
- **FR-015**: The hero primary CTA MUST remain the dominant action and meet 44×44 px touch target; the secondary CTA MUST remain visually subordinate and equally accessible.
- **FR-016**: The hero redesign MUST use only Apple Pro tokens (typography, color, spacing) and the existing free-tier toolchain — no new paid assets, fonts, or icon libraries.
- **FR-017**: The hero redesign MUST **replace everything**, including the existing arch artwork — a fully new hero composition (new background art, mark, eyebrow, headline, subtitle, CTA row, meta row) while keeping the existing copy.
- **FR-018**: The replacement hero artwork MUST use an **Apple-style soft mesh gradient**: calm, low-contrast OKLCH blue and neutral atmospheric layers with no new raster assets or external image dependencies.

### Key Entities

- **Navbar bar**: The persistent top bar — primary surface in scope (US1).
- **Navbar — brand group**: Logo + site title.
- **Navbar — nav group**: Primary navigation link(s).
- **Navbar — action group**: Theme toggle + GitHub link (and any added items).
- **Navbar — mobile drawer**: Slide-in panel on small viewports.
- **Hero — brand mark**: The keystone/arch graphic above the eyebrow.
- **Hero — eyebrow chip**: Curated-highlights badge ("100% free · 4 stages · 2 Harvard certificates").
- **Hero — headline + subtitle**: Display title and supporting paragraph.
- **Hero — CTA row**: Primary (Start with Stage 1) and secondary (Jump to AI agents) buttons.
- **Hero — meta row**: Three small claims ("Built for working developers", "CS50P + CS50W credentials", "Free-tier stack, forever").

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Four-configuration screenshot comparison (desktop/mobile × light/dark) shows the redesigned navbar applied consistently, with zero baseline misalignment (≤ 2px center-line delta across navbar elements).
- **SC-002**: Visual difference from the pre-redesign navbar is observable in at least one of: layout structure, material treatment, typography scale, or control styling (checked via before/after screenshots).
- **SC-003**: Visual difference from the pre-redesign hero is observable in at least one of: layout, typography scale, button styling, or hero artwork treatment (checked via before/after screenshots).
- **SC-004**: All navbar interactive elements pass the 44×44 px touch target check.
- **SC-005**: Both hero CTAs pass the 44×44 px touch target check.
- **SC-006**: Lighthouse Accessibility score ≥ 95 with no new navbar or hero violations.
- **SC-007**: Theme toggle in both modes causes zero layout shift (navbar CLS = 0) and completes within 200ms.
- **SC-008**: Build passes `npm run build` with zero CSS/TypeScript errors.
- **SC-009**: Active-section indication (US3) is visible on the Curriculum link when viewing a curriculum page.
- **SC-010**: The hero and the navbar visibly belong to the same product (same materials, same focus-ring style, same type scale).

## Assumptions

- The redesign uses only the existing free-tier Apple Pro toolchain (pure CSS/OKLCH tokens, Inter/Instrument Serif/Geist Mono, existing icon set). No new paid assets, fonts, or icon libraries.
- Feature `004-fix-navbar-alignment`'s accessibility contract (touch targets, focus rings, glass fallback, no-reflow) is inherited; where the new design restyles elements, the contract still holds.
- The navbar keeps Docusaurus/Infima markup (no swizzle, no new React component); the centered-brand arrangement and search affordance are achieved with the existing Infima slots/selectors plus CSS (search may use a Docusaurus native search integration if one exists in the free tier, otherwise a small in-page search UI over the curriculum).
- The hero is a redesigned `<section class="tbb-hero">` with new background art and new content-layer composition, keeping the existing copy.
- Centered-brand navbar: the brand is centered with equal left (nav) and right (actions) groups, preserving 44×44 controls and the mobile drawer.
- No backend, IA, or routing changes — visual + interaction only.

## Clarifications

### Session 2026-08-18

- Q: Which navbar structure should the from-scratch redesign use? → A: Centered-brand arrangement: brand centered, navigation left, actions right.
- Q: What should the redesigned navbar contain? → A: Add a curriculum search affordance alongside Curriculum, GitHub, and the theme toggle.
- Q: How deeply should the hero top be redesigned? → A: Replace everything, including the existing arch artwork, while keeping the existing copy.

### Session 2026-08-19

- Q: Which visual direction should the new hero (replacing the existing arch artwork) take? → A: Apple-style soft mesh gradient (calm, low-contrast OKLCH blue and neutral atmospheric layers; no raster assets).
- Q: How should the new navbar search affordance behave? → A: In-page client-side search over static curriculum titles, headings, and content, with a results dropdown/panel and no external search service dependency.