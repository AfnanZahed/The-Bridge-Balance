---
id: 004
title: Drawer CSS visual bug hunt
stage: misc
date: 2026-08-20
surface: agent
model: Opus
feature: 001-hamburger-rebuild
branch: 001-hamburger-rebuild
user: Book
command: bug hunt hamburger drawer CSS layout visual behavior
labels: [hamburger, drawer, css, layout, playwright]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - C:\\Users\\Dell\\Desktop\\Book\\edu-site\\src\\components\\SiteMenu\\SiteDrawer.tsx
 - C:\\Users\\Dell\\Desktop\\Book\\edu-site\\src\\components\\SiteMenu\\useDrawer.ts
 - C:\\Users\\Dell\\Desktop\\Book\\edu-site\\src\\css\\custom.css
 - C:\\Users\\Dell\\Desktop\\Book\\history\\prompts\\001-hamburger-rebuild\\004-drawer-css-visual-bug-hunt.misc.prompt.md
tests:
 - Playwright viewport and computed-style inspection at 360, 390, 768, 996, and 1440 widths
 - Playwright reduced-motion emulation
 - Playwright theme and backdrop-filter fallback inspection
---

## Prompt

<system-reminder>
As you answer the user's questions, you can use the following context:
# claudeMd
Codebase and user instructions are shown below. Be sure to adhere to these instructions. IMPORTANT: These instructions OVERRIDE any default behavior and you MUST follow them exactly as written.

Contents of C:\\Users\\Dell\\Desktop\\Book\\CLAUDE.md (project instructions, checked into the codebase):

[Full project instructions were supplied in the conversation.]
</system-reminder>

You are doing a bug hunt on a rebuilt hamburger drawer in `C:/Users/Dell/Desktop/Book/edu-site/`. The implementation is at:

- `edu-site/src/components/SiteMenu/SiteDrawer.tsx`
- `edu-site/src/css/custom.css` (the SiteMenu block, search for "SiteMenu")

A prod server is running at `http://127.0.0.1:4173/`. Use the Playwright MCP browser tools to navigate, click, resize, and read computed styles.

Your scope is **CSS / layout / visual bugs**:

1. Open the drawer at 360, 390, 768, 996, 1440 widths. Verify drawer geometry (x, y, w, h) at each width.
2. Verify the drawer is anchored exactly below the navbar at every viewport (navbar.bottom should equal drawer.top).
3. Verify the drawer width matches `min(20rem, 82vw)` at >=768px and `min(20rem, 88vw)` at <768px.
4. Verify the backdrop fully covers the viewport (inset:0). Verify its z-index is correct relative to the drawer and the navbar.
5. Verify the drawer panel does not displace the main content horizontally (no layout shift).
6. Verify body scroll is locked while open (`html[data-drawer-open="true"] overflow: hidden`).
7. Verify the backdrop has a non-zero opacity (visible) and the panel has a non-transparent background.
8. Verify focus-visible outline color contrast (3px solid `var(--tbb-focus-ring)`) — does it have enough contrast on the panel background in both light and dark themes?
9. Toggle dark mode (the navbar has a theme toggle button). Verify the drawer surface, text, and shadow adapt correctly.
10. Verify the `prefers-reduced-motion: reduce` media query actually disables transitions. Use DevTools or emulate via `browser_evaluate` to set the media query.
11. Verify the `@supports not (backdrop-filter)` fallback — emulate a browser without backdrop-filter support and verify the drawer uses `--tbb-surface-solid`.
12. Verify the drawer does not break when the navbar is taller than 60px (e.g., wrapped title or compact mobile mode).
13. Verify there is no horizontal scrollbar introduced by the drawer.

Reproduce each finding with concrete evidence (computed styles, bounding box). Report findings as a numbered list with: (a) severity, (b) repro steps, (c) observed vs expected, (d) the file/line where the bug lives. Find at least 2-3 real bugs if they exist; do not invent bugs.

Return findings in plain text.

## Response snapshot

Performed Playwright inspection across all requested viewport widths and themes. Found two high-confidence CSS/layout defects: the drawer and backdrop are mounted inside the sticky navbar, whose `backdrop-filter` creates a containing block for fixed descendants; this makes the backdrop only navbar-sized despite `inset: 0`, and causes the drawer's fixed positioning to be scoped to the navbar. Also found `--tbb-focus-ring` is a box-shadow token used as an outline color, so the required solid focus outline is invalid and computed outline style remains none. Width/anchor/scroll lock/theme/reduced-motion checks otherwise passed in the tested environment.

## Outcome

- Impact: Report-only visual bug hunt; no product code changed.
- Tests: Playwright MCP checks passed for geometry, widths, scroll lock, theme adaptation, reduced motion, and no horizontal overflow; backdrop coverage and focus outline failed.
- Files: Source files inspected; PHR added.
- Next prompts: Fix drawer mounting outside navbar and split focus-ring color from shadow token.
- Reflection: CSS containing blocks from ancestor backdrop-filter are easy to miss even when `position: fixed` and `inset: 0` look correct.

## Evaluation notes (flywheel)

- Failure modes observed: CSS fixed descendants scoped by ancestor backdrop-filter; invalid outline color token shape.
- Graders run and results (PASS/FAIL): PASS for requested browser checks except two defects above.
- Prompt variant: null
- Next experiment: Render drawer/backdrop as a sibling outside `.navbar`, then re-run all viewport checks.
