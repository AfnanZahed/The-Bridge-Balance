---
id: 0005
title: Implement navbar and hero redesign
stage: green
date: 2026-08-19
surface: agent
model: MiniMax-M3
feature: 005-redesign-navbar-hero
branch: 005-redesign-navbar-hero
user: Dell
command: /sp.implement
labels: [implementation, navbar, hero, redesign, search, mesh-gradient, centered-brand, client-side, accessibility, apple-design]
links:
  spec: specs/005-redesign-navbar-hero/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - edu-site/src/css/custom.css (centered-brand layout, search trigger, panel, active-state, scrollbar gutter)
  - edu-site/src/css/a11y.css (search focus + touch rules)
  - edu-site/src/components/HomepageHero/index.tsx (mesh layer, no HeroSpan)
  - edu-site/src/components/HomepageHero/styles.module.css (mesh + deck)
  - edu-site/src/theme/SearchBar/index.tsx (NEW — client-side search)
  - edu-site/scripts/generate-search-index.mjs (NEW — build-time indexer)
  - edu-site/static/search-index.json (NEW — 22 records)
  - edu-site/docusaurus.config.ts (search navbar item)
  - edu-site/package.json (build wiring)
  - specs/005-redesign-navbar-hero/tasks.md (T001-T022 ✓)

tests:
  - npm run build — PASS (×2, idempotent + fresh search index)
  - Centered brand: brandCentered=true, leftRightBias=0
  - Search: returns 4 ranked results for "Git", ArrowDown + Enter navigates to /intro
  - Hero mesh: no raster/external image; pure CSS OKLCH radial gradients
  - 4-config screenshots captured (navbar + hero, before/after, desktop/mobile × light/dark)
  - Theme no-reflow: all 7 tracked elements identical before/after (desktop + mobile)
  - Touch targets: all 7 navbar + hero interactive elements ≥44×44
  - Active state: Curriculum link shows aria-current="page" + Apple-blue pill
  - Hero primary CTA → /stage-01 navigation, active state reflects
  - Sticky: navbar position:sticky, top:0, top stays 0 on scroll
  - Lighthouse: Accessibility 95, Best Practices 100, SEO 100
---

## Prompt

> /sp.implement

## Response snapshot

- Prerequisite check passed; all 22 tasks in tasks.md.
- T001: Branch confirmed (005-redesign-navbar-hero).
- T002: Captured before/geometry + 4 before-screenshots (desktop light, desktop dark, mobile light, mobile dark) into `verification/before/`.
- T003: Created `scripts/generate-search-index.mjs` — build-time indexer (22 records). Fixed a syntax error in the leading `/**...*/` comment containing `*/` and async/sync issues.
- T004: Added centered-brand CSS — `.navbar__inner { position: relative }`, `.navbar__brand` absolutely centered at 50%/50%, left/right groups split via `margin-right: auto`.
- T005: Added search-trigger + control styling to `custom.css` — shared geometry with GitHub and theme toggle.
- T006: Created `src/theme/SearchBar/index.tsx` — fetches `/search-index.json`, debounces input (150ms), ranks results (title → heading → body), keyboard-navigable (ArrowDown/Up, Enter, Escape), 44×44 hit areas, accessible label, listbox semantics.
- T007: Registered `{ type: "search", position: "right" }` in docusaurus.config.ts navbar items.
- T008: Added search focus + touch rules to a11y.css.
- T009: Wired indexer into `npm run build` (after frontmatter check, before docusaurus build).
- T010: `npm run build` PASS.
- T011: 4-config Playwright verification: centered brand verified; search returns 4 results for "Git", ArrowDown+Enter navigates to /intro; 4 after-screenshots captured. Theme no-reflow on desktop initially showed brand width delta due to theme-dependent logo render — fixed with explicit `width: min(196.25px, 48vw)` for the centered brand; final no-reflow exact.
- T012: Removed the wall-scale `HeroSpan` SVG from HomepageHero/index.tsx; replaced with `<div className={styles.mesh} aria-hidden="true" />` rendered as a CSS mesh gradient.
- T013: Rewrote HomepageHero/styles.module.css — `.mesh` is absolute-positioned with three OKLCH radial-gradient layers in light, three more in dark, plus a vertical fade at the bottom. Brand-mark + deck composition kept from the existing JSX, mesh gradient background is the new visual.
- T014: Hero CTAs already 54px tall (≥44×44); touch targets verified.
- T015: `npm run build` PASS.
- T016: 4-config Playwright verification of hero — theme no-reflow found a 10px viewport delta from scrollbar appearing/disappearing. Fixed by adding `html { overflow-y: scroll; scrollbar-gutter: stable }` to `custom.css` `:root` block. Final no-reflow exact on desktop and mobile. Hero after-screenshots captured for all 4 configs. Hamburger 30×44 on mobile — fixed via `.navbar__toggle { min-inline-size: var(--tbb-a11y-touch-target) }`. Mobile theme no-reflow: all 8 elements identical.
- T017: Added active-state CSS for `.navbar__link--active` / `[aria-current="page"]` in left group — Apple-blue color + accent dot via `::before`.
- T018: Verified navbar sticky behavior (`position: sticky; top: 0`; `beforeTop=0, afterTop=0` after scrolling 400px).
- T019: Hero primary CTA → Stage 1 navigation succeeded; Curriculum link on Stage 1 shows aria-current="page" + Apple-blue + 600 weight.
- T020: Quickstart runbook executed across build → serve → 4-config geometry → parity → search → theme no-reflow → hero mesh → focus/touch → Lighthouse → report.
- T021: Lighthouse run via Playwright Chromium — Accessibility 95, Best Practices 100, SEO 100. (Performance 73, out of scope.)
- T022: Second `npm run build` PASS; mobile CLS=0 verified by exact bounding-box comparison.

## Outcome

- ✅ Impact: The top-of-page chrome (navbar + hero) is now redesigned from scratch with a centered-brand navbar that includes a client-side curriculum search, and a hero with a new Apple-style soft mesh gradient background and a redesigned deck. All accessibility, free-tier, and Apple-Design Purity constraints honored.
- 🧪 Tests: All 22 tasks complete; all 10 Success Criteria met. Two unanticipated fixes (brand-width lock and scrollbar gutter) were necessary to achieve exact no-reflow.
- 📁 Files: `custom.css` (centered brand + search + active state + scrollbar gutter), `a11y.css` (search focus + touch), `HomepageHero/{index.tsx,styles.module.css}` (mesh), `src/theme/SearchBar/index.tsx` (new), `scripts/generate-search-index.mjs` (new), `static/search-index.json` (22 records), `docusaurus.config.ts` (search item), `package.json` (build wiring), `tasks.md` (all ✓).
- 🔁 Next prompts: `/sp.git.commit_pr` to commit and open a PR for the feature.
- 🧠 Reflection: Two real bugs emerged from runtime observation: (1) the centered brand width changed between themes (logo render swap) and (2) the scrollbar appearing/disappearing on theme toggle shifted every block. Both were caught and fixed during verification, not pre-empted in the spec. The hand-rolled search indexer with simple substring/heading scoring is more than adequate for the 22-doc curriculum; reaching for fuse.js was unnecessary.

## Evaluation notes (flywheel)

- Failure modes observed: (1) `*/` inside a `/*…*/` block comment in the indexer closed the comment early — fixed by removing the pattern. (2) `await` inside a non-async `main()` was a syntax error — fixed by using sync flow. (3) `performance.getEntriesByType('resource')` from a sync evaluate was rejected (await-only). (4) `main().catch(...)` failed when main was sync. (5) `.mesh` selector didn't match the CSS-module-hashed classname `mesh_Pq43` — used `[class*="mesh"]` instead. (6) Lighthouse CLI ran but the temp-profile cleanup errored on Windows (EPERM); report was still written and parsed.
- Graders run and results (PASS/FAIL): PASS — all 22 tasks; PASS — centered brand ≤2px delta; PASS — 4 ranked results; PASS — theme no-reflow exact (desktop + mobile); PASS — touch targets ≥44×44; PASS — Lighthouse Accessibility 95; PASS — build idempotent.
- Prompt variant (if applicable): n/a.
- Next experiment (smallest change to try): The dropdown glass panel's `backdrop-filter` may need a small visual pass once the design is reviewed; the search input collapses to a 2.75rem icon on mobile but could be expanded inline on focus — currently relies on the panel opening. Either is acceptable per spec; could be iterated.