---
id: 004
title: Routing SSR Drawer Bug Hunt
stage: misc
date: 2026-08-20
surface: agent
model: claude-opus
feature: 001-hamburger-rebuild
branch: 001-hamburger-rebuild
user: Book
command: bug hunt routing SSR Docusaurus hamburger drawer
labels: [routing, ssr, docusaurus, drawer, playwright]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/src/components/SiteMenu/useDrawer.ts
 - edu-site/src/components/SiteMenu/SiteDrawer.tsx
 - edu-site/src/components/SiteMenu/SiteMenuButton.tsx
 - edu-site/src/theme/Navbar/Layout/index.tsx
 - edu-site/src/theme/Navbar/Content/index.tsx
 - history/prompts/001-hamburger-rebuild/004-routing-ssr-drawer-bug-hunt.misc.prompt.md
tests:
 - Playwright prod-server route, drawer, navigation, back, reload, DOM and SSR checks
---

## Prompt

<system-reminder>
As you answer the user's questions, you can use the following context:
# claudeMd
Codebase and user instructions are shown below. Be sure to adhere to these instructions. IMPORTANT: This context may or may not be relevant.
</system-reminder>

You are doing a bug hunt on a rebuilt hamburger drawer in `C:/Users.Dell/Desktop/Book/edu-site/`. The implementation is at:

- `edu-site/src/components/SiteMenu/useDrawer.ts`
- `edu-site/src/components/SiteMenu/SiteDrawer.tsx`
- `edu-site/src/theme/Navbar/Layout/index.tsx` (swizzled)
- `edu-site/src/theme/Navbar/Content/index.tsx` (swizzled)

A prod server is running at `http://127.0.0.1:4173/`. Use the Playwright MCP browser tools. The site has these routes: `/`, `/stage-01-spec-aware-vibe-engineering/`, `/stage-02-cs50-certification/`, `/stage-03-mastering-ai-coding-agents/`, `/stage-04-engineering-autonomous-ai-agents/`.

Your scope is **routing, SSR, and Docusaurus integration bugs**:

1. View source at `http://127.0.0.1:4173/` with JavaScript disabled (use `browser_evaluate` to set `navigator.webdriver` or just inspect the HTML). Verify the drawer is NOT in the initial server-rendered HTML (it's `isOpen=false`, so should render nothing).
2. Navigate to `/stage-02-cs50-certification/`. Open drawer. Verify the "Stage 2 — CS50 Certs" entry has `aria-current="page"` and `data-active="true"`.
3. Open the drawer on `/`, then click "Stage 2 — CS50 Certs" inside the drawer. Verify:
   - URL changes to `/stage-02-cs50-certification/`
   - Drawer closes
   - `data-drawer-open` attribute is removed from `<html>`
   - The drawer doesn't briefly flash open on the new page
4. Open the drawer, then use the BROWSER BACK button. Verify the drawer state resets on the new page (FR-012).
5. Open the drawer, then refresh the page (F5). Verify the drawer stays closed after reload (state is not persisted).
6. Use the keyboard Tab key to navigate: focus the hamburger, press Enter, Tab into the drawer, Tab to a link, press Enter — verify navigation works without a mouse.
7. Verify the drawer does not double-mount if React StrictMode is enabled (check the build / dev server behavior).
8. Verify the swizzled `Navbar/Content/index.tsx` does not import Docusaurus's `useNavbarMobileSidebar` anymore (it shouldn't, since we replaced it).
9. Verify the original Docusaurus `.navbar-sidebar` and `.navbar-sidebar__backdrop` elements are NOT in the DOM after the rebuild.
10. Verify the swizzled Layout correctly drops `navbar-sidebar--show` class on close.

Reproduce each finding with concrete evidence. Report findings as a numbered list with: (a) severity, (b) repro steps, (c) observed vs expected, (d) the file/line where the bug lives. Find at least 2-3 real bugs if they exist; do not invent bugs.

Return findings in plain text.

## Response snapshot

Bug hunt completed with Playwright and source inspection. Confirmed SSR excludes actual drawer markup, Stage 2 active state, route navigation closes drawer and removes html attribute, back/reload reset state, old Docusaurus sidebar absent, no useNavbarMobileSidebar import, and navbar-sidebar--show drops on close. Found two real integration/accessibility bugs: drawer is mounted inside fixed navbar so backdrop/panel stacking and pointer interception can block the hamburger; focus is not trapped in modal drawer, so Tab escapes to page content. Also raw SSR contains aria-controls pointing at a null drawer, which is expected by the requested contract but creates a broken association until opened.

## Outcome

- ✅ Impact: Verified routing and SSR behavior; identified two concrete drawer integration bugs.
- 🧪 Tests: Playwright prod-server checks across root and Stage 2 routes, active link, navigation, back, reload, DOM absence, and classes.
- 📁 Files: Source files inspected; no implementation changes.
- 🔁 Next prompts: Fix drawer stacking/placement and modal focus management.
- 🧠 Reflection: Keep findings limited to reproducible behavior.

## Evaluation notes (flywheel)

- Failure modes observed: Initial browser tab retained open state between checks; reload was used to isolate runs.
- Graders run and results (PASS/FAIL): PASS for requested routing checks; FAIL for keyboard focus containment.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Add focus trap and test drawer interaction with backdrop.
