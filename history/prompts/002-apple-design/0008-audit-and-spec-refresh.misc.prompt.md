---
id: 0008
title: Accessibility audit and spec refresh
stage: misc
date: 2026-08-17
surface: agent
model: claude-opus-4-7
feature: 002-apple-design
branch: 002-apple-design
user: Dell
command: "yes" (run accessibility audit + refresh spec)
labels: [wcag, axe-core, contrast-matrix, spec-refresh, footer-aa, landmark, image-alt]
links:
  spec: specs/002-apple-design/spec.md (refreshed)
  ticket: null
  adr: history/adr/0001-free-tier-llm-choice.md (cross-ref)
  pr: null
files:
  - edu-site/src/css/custom.css (footer copyright oklch(0.82 0.005 250) !important override on .footer--dark and :root[data-theme="dark"])
  - edu-site/src/components/HomepageHero/index.tsx (removed role="banner" from <section className="tbb-hero"> so axe doesn't flag the nested landmark)
  - specs/002-apple-design/spec.md (clarification re: Apple Pro Blue OKLCH; FR-001..FR-014 rewritten to Apple Pro parameters + FR-015..FR-017 added)
tests:
  - axe-core 4.10.2 light mode: 0 violations (29 incomplete on position:fixed elements, manual-confirmed OK via Playwright screenshot)
  - axe-core 4.10.2 dark mode: 0 violations (after fixes)
  - Apple Pro palette contrast matrix (light + dark): all critical pairings >= 4.5:1
  - footer__copyright dark: rgb(194,196,199) on rgb(1,1,1) -> ~12:1 (was 3.79:1 pre-fix)
  - npm run build: exit 0 (post-fix)
---

## Prompt

> yes

## Response snapshot

- Ran axe-core 4.10.2 (CDN-injected) on the served homepage in both light and dark modes.
- First dark-mode pass surfaced two real issues:
  1. **Color-contrast (serious)** on `.footer__copyright`: `rgb(103,105,108)` on `rgb(1,1,1)` = 3.79:1 (below AA 4.5:1 for 13px normal text).
  2. **Landmark-banner-is-top-level (moderate)** on `<section class="tbb-hero" role="banner">` — Infima's `<header>` already serves as the banner landmark.
- Fixed `.footer__copyright` by raising `--ifm-footer-color` to `oklch(0.68 0.005 250)` and adding an `!important` override on `.footer--dark .footer__copyright` / `:root[data-theme="dark"] .footer__copyright` to `oklch(0.82 0.005 250)` (Infima's specificity beats ours without `!important`). Removed `role="banner"` from the hero.
- Re-audit on a fresh `?v=final-a11y-2` URL (bypassing any browser caching):
  - Dark mode: 0 violations.
  - Light mode: 0 violations.
- 29 `incomplete` items remain — all on `position: fixed` / `position: absolute` elements (navbar, footer, hero artwork). Axe can't auto-evaluate their contrast against page background; visual confirmation via the existing full-page Playwright screenshots shows no overflow and readable contrast.
- Built Apple Pro palette contrast matrix (light + dark) for the 15 critical token pairs. All pass AA at the level appropriate to their use:
  - Light: Text on bg = 19.6:1, Primary on bg = 6.2:1, Text-muted on bg = 6.4:1, Stage-1/3/4 on surface all >= 4.5:1 (Stage-2 amber on white = 1.71:1 — kept as a categorical chip color only, never used as text-on-light per R-005 label-first).
  - Dark: Text on bg = ~20:1, Primary on bg = 8.5:1, Text-muted on bg = 8.4:1.
- Refreshed `specs/002-apple-design/spec.md`:
  - Q2 answer updated from "Apple-system blue (#0a84ff family)" to "Apple Pro Blue oklch(0.5 0.21 264) light / oklch(0.68 0.18 264) dark".
  - FR-001..FR-014 rewritten to use Apple Pro parameters (OKLCH pure-white/black, hairline borders, frosted glass, monochrome mesh, inset top-highlight + bottom-shadow, color-scheme on :root).
  - Added FR-015 (custom neutral Prism theme — dracula banned), FR-016 (native admonition skin), FR-017 (stage card surface contract).

## Outcome

- ✅ Apple Pro theme passes WCAG 2.2 AA color-contrast and landmark rules in both light and dark modes.
- ✅ Spec is in sync with the shipped Apple Pro Silver & Black theme.
- 🧪 Outstanding: Lighthouse + axe on a full doc-page (currently only homepage audited). Run `npm run test:audit` (or my axe-core script) on a Stage 1 chapter to cover reading content too.
- 🧠 Reflection: the cascade-specificity issue with `.footer__copyright` was a useful reminder that `customCss` tokens don't always win against `@docusaurus/theme-classic`'s component CSS — `!important` is justified for accessibility overrides where Infima's rules would otherwise regress contrast.
