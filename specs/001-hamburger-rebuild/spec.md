# Feature Specification: Hamburger Drawer Rebuild

**Feature Directory**: `001-hamburger-rebuild`
**Created**: 2026-08-19
**Status**: Draft
**Input**: User description: "rebuild the left-up hamburger entirely from scrath and it's code and logic as  well."

## Summary

The hamburger menu in the top-left of the navigation bar is the primary way readers open the site's navigation drawer. The current implementation has been patched multiple times to keep it working across viewport sizes and across Docusaurus's responsive mounting, but the underlying button, toggle state, drawer container, and dismissal logic have grown brittle. A complete from-scratch rebuild is required so the menu behaves predictably and is easy to extend.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Open and dismiss the hamburger drawer (Priority: P1)

A reader on any device taps or clicks the hamburger in the top-left corner of the navbar. The drawer opens and exposes the site's primary navigation. Tapping the hamburger again, tapping a navigation link, or tapping the backdrop closes the drawer.

**Why this priority**: The hamburger is the only navigation affordance on phones and the most discoverable on tablets. If it does not open or close reliably, every reader is blocked.

**Independent Test**: At mobile (390×844) and desktop (1440×900) viewports, a single click on the hamburger must (a) toggle the drawer between visible and hidden, (b) toggle the corresponding `aria-expanded` state, and (c) be dismissible via the hamburger itself, the backdrop, and any in-drawer link.

**Acceptance Scenarios**:

1. **Given** the page is loaded and the drawer is closed, **When** the reader clicks the hamburger, **Then** the drawer becomes visible, occupies the full viewport height, and `aria-expanded` on the button is `true`.
2. **Given** the drawer is open, **When** the reader clicks the hamburger again, **Then** the drawer closes and `aria-expanded` becomes `false`.
3. **Given** the drawer is open, **When** the reader clicks the backdrop, **Then** the drawer closes.
4. **Given** the drawer is open, **When** the reader clicks any link inside it, **Then** the drawer closes after navigation begins.

---

### User Story 2 - Navigate the documentation from the drawer (Priority: P1)

When the drawer is open, every link inside it routes to the right destination on click and the active route is visually marked.

**Why this priority**: An open drawer that does not navigate is worse than no drawer — it wastes the reader's time and damages trust in the brand.

**Independent Test**: With the drawer open at any viewport, clicking any in-drawer link navigates to the target page, the URL updates, and the link that corresponds to the current route is visually highlighted.

**Acceptance Scenarios**:

1. **Given** the drawer is open on a docs page, **When** the reader clicks a different docs chapter, **Then** the browser navigates to that chapter and the active chapter is highlighted in the drawer.
2. **Given** the drawer is open on the home page, **When** the reader clicks "Get Started", **Then** the docs intro page opens and the drawer highlights the matching entry.

---

### User Story 3 - Keep the hamburger visible and usable at every viewport (Priority: P2)

The hamburger is the single navigation control that is always present, regardless of viewport size. Tapping it must work the same way on a 360-pixel phone, a 768-pixel tablet, and a 1440-pixel desktop.

**Why this priority**: Inconsistent behavior at intermediate breakpoints (768–996px) is what caused the original bug. The rebuild must be tested across the entire range so the same logic works everywhere.

**Independent Test**: At widths 360px, 768px, 996px, and 1440px the hamburger is rendered, has a clickable target of at least 44×44px, and behaves identically to User Story 1.

**Acceptance Scenarios**:

1. **Given** a 360px viewport, **When** the reader opens the drawer, **Then** the drawer fills the screen height and is dismissible via the close affordance inside the drawer header.
2. **Given** a 1440px viewport, **When** the reader opens the drawer, **Then** the drawer appears as an overlay anchored under the navbar and does not displace the main content horizontally.
3. **Given** a viewport between 360px and 1440px, **When** the reader resizes while the drawer is open, **Then** the drawer remains visible and continues to reflect the open state without layout breakage.

---

### User Story 4 - Keyboard and assistive-technology support (Priority: P2)

A reader using a keyboard or screen reader can open the drawer with the `Enter` or `Space` key, hear a meaningful `aria-label`, learn the open/closed state from `aria-expanded`, and escape the drawer with the `Escape` key.

**Why this priority**: Hamburger controls are a well-known accessibility failure point; rebuilding without keyboard support would ship the same regression on a different screen.

**Independent Test**: Using only the keyboard, the reader can focus the hamburger, open and close the drawer with `Enter`/`Space`, dismiss it with `Escape`, and `Tab` order remains sensible while the drawer is open.

**Acceptance Scenarios**:

1. **Given** the hamburger is focused, **When** the reader presses `Enter` or `Space`, **Then** the drawer toggles open or closed.
2. **Given** the drawer is open and focus is inside it, **When** the reader presses `Escape`, **Then** the drawer closes and focus returns to the hamburger button.
3. **Given** the hamburger button, **When** a screen reader inspects it, **Then** the accessible name announces "Open menu" or "Close menu" depending on state, and `aria-expanded` reflects reality.

---

### User Story 5 - Visual polish and motion (Priority: P3)

Opening and closing the drawer has a short, smooth transition (no abrupt pop), and the drawer respects the site's Apple Pro Silver/Black design tokens so it looks at home in light and dark modes.

**Why this priority**: Polish is important but lower than core behavior. The drawer must work first, then look right.

**Independent Test**: With motion enabled, opening and closing the drawer animates in under 250ms; with motion reduced (`prefers-reduced-motion`), it opens and closes instantly.

**Acceptance Scenarios**:

1. **Given** motion is enabled, **When** the drawer opens or closes, **Then** the transition duration is between 150ms and 250ms with an ease curve.
2. **Given** motion is reduced, **When** the drawer opens or closes, **Then** no transition is applied.
3. **Given** light or dark theme, **When** the drawer is open, **Then** the drawer background, text, and shadow use the existing design tokens and remain legible.

---

### Edge Cases

- What happens when the reader resizes the window while the drawer is mid-transition? → The transition cancels and the new geometry is applied without flicker.
- What happens when the reader opens the drawer and immediately navigates away (e.g., uses the browser back button)? → The drawer state resets to closed on the new page so it does not flash open on first paint.
- What happens when JavaScript is disabled? → The hamburger is hidden; the existing top-level inline nav remains the fallback, mirroring Docusaurus's progressive enhancement approach.
- What happens when the reader scrolls the drawer content? → Scrolling stays inside the drawer and does not scroll the page behind it (body scroll lock while open).
- What happens if the navbar is taller than expected (e.g., wrapped title)? → The drawer anchors to the actual navbar height instead of a hard-coded value.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST render a single hamburger button in the top-left of the navbar at every viewport width.
- **FR-002**: The hamburger MUST expose an accessible name ("Open menu" / "Close menu") and reflect open/closed state via `aria-expanded`.
- **FR-003**: Activating the hamburger (mouse, `Enter`, or `Space`) MUST toggle the drawer between visible and hidden.
- **FR-004**: The drawer MUST fill the full viewport height and be anchored under the navbar at every viewport width.
- **FR-005**: The drawer MUST be dismissible via the hamburger button itself, the in-drawer close affordance, the backdrop, any in-drawer navigation link, and the `Escape` key.
- **FR-006**: While the drawer is open, scrolling inside the drawer MUST scroll only the drawer; the page behind the drawer MUST NOT scroll.
- **FR-007**: The drawer MUST list the same primary navigation entries as the navbar and visually highlight the entry that matches the current route.
- **FR-008**: The drawer MUST use the site's existing design tokens (Apple Pro Silver/Black, OKLCH, no Tailwind) for surface, text, divider, shadow, and motion values.
- **FR-009**: The drawer MUST respect `prefers-reduced-motion` and skip the open/close transition when motion is reduced.
- **FR-010**: The hamburger logic MUST NOT depend on Docusaurus's internal `MobileSidebar` mounting rules; the same component MUST function across the full 0px → 2560px viewport range.
- **FR-011**: Resizing the window while the drawer is open MUST NOT corrupt drawer geometry, break dismissal, or leak body scroll.
- **FR-012**: Navigating between routes MUST leave the drawer in the closed state on the destination page.

### Key Entities

- **Hamburger Button**: The toggle control in the navbar. Attributes: open state, accessible name, focusability, click target size ≥ 44×44px.
- **Drawer**: The slide-in panel that hosts navigation. Attributes: open state, current viewport geometry, scroll container, focus trap status, route-aware highlight.
- **Backdrop**: The dimmed overlay behind the drawer that also acts as a dismiss surface. Attributes: pointer-event gating, animation parity with the drawer.
- **Navigation Entries**: The list of routes shown inside the drawer. Attributes: target URL, label, active-route flag.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At every tested viewport (360, 768, 996, 1440 px wide), a single click on the hamburger opens the drawer, and the drawer reaches the correct geometry (height = full viewport, top = navbar height) within 250 ms.
- **SC-002**: After opening the drawer, every one of the five dismissal methods (hamburger re-click, in-drawer close, backdrop, in-drawer link, `Escape`) reliably returns the drawer to the closed state.
- **SC-003**: After closing the drawer, no stray open-state styling (visible backdrop, `aria-expanded=true`, body scroll lock) remains on the page.
- **SC-004**: Activating any in-drawer navigation link navigates the browser to the correct destination and the matching link is visually highlighted in the drawer within one paint frame.
- **SC-005**: The hamburger logic is implemented in no more than three files (a button, a drawer, and a shared state/hook), so the next person who edits it can find everything in one place.
- **SC-006**: Keyboard users can complete the full open → navigate → close flow without ever touching the mouse, and focus returns to the hamburger button after `Escape`.

## Assumptions

- The site's design system (Apple Pro Silver & Black with OKLCH tokens) is already in place; the rebuild will consume existing tokens rather than invent new ones.
- Docusaurus is the framework; the rebuild can rely on `theme-classic` primitives but must not depend on `MobileSidebar`'s internal mounting rules.
- The site has one logical navbar with a known set of entries; the rebuild does not need to introduce a new navigation taxonomy.
- Accessibility level is WCAG 2.1 AA; this matches the project's existing accessibility budget.
- The current production server is running locally on port 4173 for verification.

## Out of Scope

- Re-organizing the navigation taxonomy or adding new pages.
- Replacing Docusaurus as the site framework.
- Adding internationalized hamburger labels in languages other than English.
- Touch-gesture support (swipe to open/close) — keyboard, mouse, and tap are sufficient for the rebuild.
- Building a new design system or new color tokens.
