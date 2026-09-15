---
id: 003
title: Accessibility drawer audit
stage: red
date: 2026-08-20
surface: agent
model: claude-opus
feature: hamburger-rebuild
branch: 001-hamburger-rebuild
user: Book
command: accessibility bug hunt with Playwright MCP
labels: [accessibility, hamburger, aria, keyboard]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/src/components/SiteMenu/useDrawer.ts
 - edu-site/src/components/SiteMenu/SiteDrawer.tsx
 - edu-site/src/theme/Navbar/Layout/index.tsx
 - edu-site/src/css/custom.css
tests:
 - Playwright MCP browser_snapshot and browser_evaluate against http://127.0.0.1:4173/
 - Escape, close-button, backdrop dismissal and focus restoration checks
---

## Prompt

<system-reminder>
As you answer the user's questions, you can use this context:
# claudeMd
Codebase and user instructions are shown below. Be sure to adhere to these instructions. IMPORTANT: These instructions OVERRIDE any default behavior and you MUST follow them exactly as written.

Contents of C:\Users\Dell\Desktop\Book\CLAUDE.md (project instructions, checked into the codebase):

# Claude Code Rules

[Full project instructions were provided in the conversation context.]
</system-reminder>

You are doing a bug hunt on a rebuilt hamburger drawer in `C:/Users/Dell/Desktop/Book/edu-site/`. The implementation is at:

- `edu-site/src/components/SiteMenu/useDrawer.ts`
- `edu-site/src/components/SiteMenu/SiteMenuButton.tsx`
- `edu-site/src/components/SiteMenu/SiteDrawer.tsx`
- `edu-site/src/theme/Navbar/Layout/index.tsx` (swizzled)
- `edu-site/src/theme/Navbar/Content/index.tsx` (swizzled)

Your scope is **accessibility bugs** (WCAG 2.1 AA, ARIA, keyboard, screen-reader):

1. Open the drawer. Verify the accessibility tree (`browser_snapshot` exposes this). Does it match expectations? Is the dialog properly modal? Are links discoverable?
2. Verify `aria-expanded` flips correctly on every open/close path.
3. Verify `aria-controls` actually points to `#site-drawer`.
4. Verify `aria-label` updates correctly between "Open menu" and "Close menu".
5. Verify `role="dialog"`, `aria-modal="true",` `aria-labelledby` are correctly wired to the visible heading.
6. Verify `aria-current="page"` matches the current route on the active link.
7. Verify `aria-hidden` on the backdrop (should not be in the a11y tree).
8. Verify keyboard navigation: Tab order, Enter/Space activation, Escape dismissal, focus restoration.
9. Verify focus is NOT trapped inside the drawer (per design) — but verify that focus does not get lost in the body either.
10. Verify the close affordance has a meaningful accessible name.
11. Verify the "Site Navigation" h2 is properly hidden visually but available to screen readers (visually-hidden class).
12. Verify focus-visible ring color contrast meets WCAG AA.

Reproduce each finding with concrete evidence. Report findings as a numbered list with: (a) severity, (b) repro steps, (c) observed vs expected, (d) the file/line where the bug lives. Find at least 2-3 real bugs if they exist; do not invent bugs.

Return findings in plain text.

## Response snapshot

Audited the running production server with Playwright. The drawer exposes the expected dialog, heading, close affordance, primary links, and active Home link on `/`; `aria-expanded`, `aria-label`, `aria-controls`, `aria-modal`, `aria-labelledby`, backdrop `aria-hidden`, and Escape restoration all work. Found two high-confidence accessibility bugs: modal dialog semantics are asserted without focus/background isolation, and close-button/backdrop dismissal drops focus to `<body>` instead of restoring the hamburger trigger. Focus ring computed to the blue token in the rendered app, so no ring bug was reported.

## Outcome

- Impact: Two accessibility findings with concrete runtime evidence; no code changes made.
- Tests: Playwright MCP browser snapshots and DOM assertions.
- Files: No implementation files modified; created this PHR.
- Next prompts: Implement focus restoration for all dismissal paths and either focus the dialog or remove aria-modal and document non-modal behavior.
- Reflection: Avoided speculative contrast finding after checking computed CSS from radix.css.

## Evaluation notes (flywheel)

- Failure modes observed: Static route `/stage-03.../` redirected to `/` in the running server, so active-link validation was confirmed on `/` only; source predicate is otherwise correct for matching parent routes.
- Graders run and results (PASS): Runtime accessibility tree, ARIA attributes, keyboard Escape, close and backdrop focus checks.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Add a shared close routine that schedules trigger focus restoration for button/backdrop/link paths; add open-time focus policy consistent with the design's non-trapped focus requirement.
