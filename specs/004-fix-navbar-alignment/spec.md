# Feature Specification: Fix Navbar Alignment and Formatting

**Feature Directory**: `004-fix-navbar-alignment`  
**Created**: 2026-08-18  
**Status**: Draft  
**Input**: User description: "the up bar where the website name, logo, github link, theme toggle is placed, have misaliged and misformatted things and elements. Fix it"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Consistent Navbar Visual Alignment (Priority: P1)

As a visitor to The Bridge Balance textbook, I want the top navigation bar to look clean and professionally aligned, so that the site conveys craft and trustworthiness consistent with the Apple-Design Purity principle.

**Why this priority**: The navbar is the first UI element visitors see on every page. Misaligned or misformatted elements (logo, title, navigation links, theme toggle, GitHub link) immediately undermine the platform's visual credibility and suggest a lack of polish. This is a "hygiene" fix that enables all other design work to land credibly.

**Independent Test**: Load the site in both light and dark modes on desktop and mobile viewport widths. Visually confirm:
- Logo, site title, and "Curriculum" menu align on a consistent baseline
- Right-side elements (theme toggle, GitHub link) align on the same baseline
- Equal visual spacing between groups
- No element is clipped, overlapping, or vertically offset
- Touch targets meet 44×44 px minimum
- Glass/frosted background renders correctly in both themes with solid fallback

**Acceptance Scenarios**:

1. **Given** the site loads in light mode on desktop (≥ 996px), **When** I observe the navbar, **Then** all left-group elements (logo, title, Curriculum) share a common baseline, all right-group elements (theme toggle, GitHub) share a common baseline, and the two groups are visually balanced.
2. **Given** the site loads in dark mode on desktop, **When** I observe the navbar, **Then** the same alignment holds with dark-mode glass token and appropriate contrast.
3. **Given** the viewport is mobile (< 996px), **When** I observe the navbar, **Then** the hamburger menu button is aligned with the logo/title baseline, and the mobile drawer opens cleanly without layout shift.
4. **Given** the user toggles theme, **When** the transition completes, **Then** no navbar element jumps, reflows, or changes baseline position.
5. **Given** keyboard focus moves through navbar items, **When** each item receives focus, **Then** the focus ring is visible and does not cause layout shift.

### User Story 2 - Theme Toggle and GitHub Link Styling Parity (Priority: P2)

As a visitor, I want the theme toggle and GitHub link to appear as first-class, consistently-styled actions in the navbar, not as afterthoughts with mismatched sizing or color.

**Why this priority**: The theme toggle is a primary affordance on this site (light/dark is a first-class experience per Constitution Principle VII). The GitHub link is the main external action. Both should match the visual language of the navbar — same height, same glass/frosted treatment, same focus behavior, same touch target size.

**Independent Test**: In both themes, verify the theme toggle button and GitHub link have matching height, padding, border-radius, and background treatment; both show the Apple-blue focus ring on keyboard focus; both meet 44×44 px touch target.

**Acceptance Scenarios**:

1. **Given** the navbar in either theme, **When** I compare the theme toggle and GitHub link, **Then** they share the same computed height, vertical alignment, and glass/frosted background token.
2. **Given** keyboard navigation, **When** I tab to the theme toggle or GitHub link, **Then** the focus ring uses the Apple-blue accent token with the standard offset and shadow, and no layout shift occurs.
3. **Given** a touch device, **When** I tap either element, **Then** the hit area is at least 44×44 CSS px.

### Edge Cases

- **Reduced motion**: All transitions/animations on navbar elements collapse to near-zero; focus ring still animates in fast.
- **High contrast / forced colors**: Navbar borders become visible; focus rings widen; glass fallback renders as solid surface.
- **Viewport at exact breakpoint (996px)**: No layout thrash; elements don't flicker between desktop/mobile arrangements.
- **Very long site title**: Title truncates with ellipsis rather than pushing other elements off-screen or wrapping.
- **Theme transition during scroll**: The sticky/fixed navbar maintains alignment while backdrop-filter transitions.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The navbar MUST render with all left-group elements (logo, site title, primary navigation) vertically aligned on a shared baseline.
- **FR-002**: The navbar MUST render with all right-group elements (theme toggle, GitHub link, any future actions) vertically aligned on a shared baseline that matches the left-group baseline.
- **FR-003**: The navbar's frosted-glass background (backdrop-filter blur + semi-transparent fill) MUST render correctly in both light and dark modes, with a solid-color fallback for browsers without backdrop-filter support.
- **FR-004**: The theme toggle button and GitHub link MUST share identical height, vertical padding, border-radius, and background treatment.
- **FR-005**: Every interactive navbar element MUST meet the 44×44 CSS px minimum touch target (WCAG 2.2 SC 2.5.8).
- **FR-006**: Keyboard focus on any navbar interactive element MUST show the Apple-blue focus ring (per `a11y.css` tokens) without causing layout shift.
- **FR-007**: The mobile hamburger button MUST align to the same baseline as the logo/title on desktop, and the mobile drawer MUST open without layout shift.
- **FR-008**: Changing theme (light ↔ dark) MUST NOT cause any navbar element to jump, reflow, or change vertical position.
- **FR-009**: The navbar border (hairline separator) MUST be consistent in both themes and not double-render.
- **FR-010**: The site title text MUST truncate gracefully with ellipsis if it would overflow the available navbar space.

### Key Entities

- **Navbar bar**: The persistent top bar containing brand, navigation, and actions.
- **Left group**: Logo + site title + primary navigation (Curriculum sidebar link).
- **Right group**: Theme toggle (color mode button) + GitHub external link.
- **Mobile drawer**: Slide-in panel replacing right-group and primary nav on small viewports.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Visual regression screenshot comparison (desktop light, desktop dark, mobile light, mobile dark) shows zero baseline misalignment across all four configurations.
- **SC-002**: All navbar interactive elements pass the 44×44 px touch target check (automated via a11y CSS or Playwright).
- **SC-003**: Lighthouse Accessibility score ≥ 95 (no new violations introduced; navbar focus/touch-target items pass).
- **SC-004**: Theme toggle in both modes completes within 200ms with zero layout shift (CLS contribution from navbar = 0).
- **SC-005**: Build passes `npm run build` with zero CSS/TypeScript errors; Docusaurus static generation succeeds.