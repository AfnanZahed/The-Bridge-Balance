---
id: 0007
title: Implement Apple Pro Silver and Black theme
stage: misc
date: 2026-08-17
surface: agent
model: claude-opus-4-7
feature: 002-apple-design
branch: 002-apple-design
user: Dell
command: (ultracode) "copy the 100% theme of the: C:\Users\Dell\Desktop\Habit tracker\habit-tracker-app"
labels: [apple-pro, silver-black, oklch, hairline, frosted-glass, mesh, pro-glow, design-migration]
links:
  spec: specs/002-apple-design/spec.md (will refresh)
  ticket: null
  adr: history/adr/0001-free-tier-llm-choice.md (cross-ref)
  pr: null
files:
  - edu-site/src/css/radix.css (rewritten: Apple-blue oklch tokens; Radix stage scales retained for categorical identity)
  - edu-site/src/css/custom.css (full token rewrite to OKLCH; Apple Pro Mesh hero; silver surface stage cards; platinum text gradient; pro-glow; reading-progress; marquee/timeline CSS restored)
  - edu-site/src/css/openprops.css (pruned: kept radius/ease/size aliases; removed shadow primitives and bare dark-mode selector)
  - edu-site/src/css/a11y.css (focus tokens now reference --tbb-accent so theme tracks primary)
  - edu-site/docusaurus.config.ts (custom neutral prism theme replaces dracula for dark mode)
  - edu-site/src/components/HomepageHero/index.tsx (SVG gradient stops -> oklch electric blue -> silver ramp)
  - edu-site/src/components/HomepageHero/styles.module.css (drop-shadow oklch for Apple Pro blue glow)
  - edu-site/src/components/BrandMark/styles.module.css (mark gradient stops -> oklch Apple Pro + platinum)
  - edu-site/src/components/DataViz/KPIGrid.tsx (accent fallback -> oklch)
  - edu-site/src/components/DataViz/CurriculumBarChart.tsx (fill fallback -> oklch)
  - edu-site/src/components/ReadingProgress/index.tsx (no code change; CSS rules now live in custom.css)
tests:
  - npm run build -> exit 0 (frontmatter + client + server)
  - npx tsc --noEmit -> exit 0
  - Visual: Playwright fullPage screenshot light + dark (apple-pro-home-v2-light.png, apple-pro-home-dark.png) -> Apple Pro silver/black rendering correct, electric-blue accent, frosted navbar, silver surface cards, dark graphite footer
  - Computed-style probe: --tbb-accent = #2154d8 (light) / #6293ff (dark) = oklch(0.5 0.21 264) / oklch(0.68 0.18 264); --tbb-bg = rgb(252,252,252) light / rgb(1,1,1) dark
---

## Prompt

> (mid-turn ultracode) copy the 100% theme of the: C:\Users\Dell\Desktop\Habit tracker\habit-tracker-app

## Response snapshot

- Audited the source `habit-tracker-app/src/index.css` (Apple Pro Silver & Black, OKLCH). Confirmed the theme ports 100% to pure CSS for Docusaurus — no Tailwind required. Ran a 3-audit + 3-review workflow (css-audit, docusaurus-audit, component-audit + adversarial reviewers) that surfaced an exhaustive checklist: token layer (custom.css/radix.css/openprops.css/a11y.css), Apple Pro utilities (hairline, frosted, apple-mesh, surface-silver/graphite/liquid-silver, glow-pro, text-apple-gradient/text-platinum, silver-shine, scrollbar), components (HomepageHero SVG stops, BrandMark gradients, DataViz chart colors, stage-icons color-mix), runtime surfaces (color-scheme, accent-color, prism dark, mobile navbar-sidebar, admonitions), and static assets.

- Design decision: keep the deep Pro blue as primary accent (the target theme itself has a blue primary — Silver & Black is not monochrome). Keep the four muted categorical stage accents (teal/amber/indigo/plum) for curriculum identity per the ratified R-001/R-005. Pure-white/pure-black surfaces, hairline borders, frosted glass, monochrome mesh, platinum text gradient, Pro glow.

- Owned the token layer myself first (single source of truth):
  - `radix.css`: kept 6 Radix scale imports (stage + danger); redefined `--apple-blue-*` to Pro oklch (`0.5 0.21 264` light, `0.68 0.18 264` dark) and hover/subtle/ring.
  - `custom.css`: full rewrite of `:root` and `:root[data-theme="dark"]` to Apple Pro OKLCH. Added Apple Pro Mesh utility, hero with mesh background, silver surface stage cards, frosted glass navbar (24px blur), CTAs with electric-blue gradient + Pro glow, focus rings now use Pro blue, prism overrides removed (replaced in config), reading-progress bar with Pro glow, marquee chips (silver pills with hairline inset), timeline with vertical spine + alternating cards, native admonition skin, mobile drawer, form controls accent-color, Apple Pro utility classes (hairline, frosted, frosted-strong, surface-graphite, text-platinum, glow-pro, silver-shine animation, scrollbar).
  - `openprops.css`: pruned — kept radius/ease/size aliases, removed shadow primitives and bare `[data-theme="dark"]` block.
  - `a11y.css`: focus tokens now reference `--tbb-accent` so they track the active theme.
  - `docusaurus.config.ts`: replaced dracula dark prism with a neutral monochrome theme (Apple Pro graphite background, silver-blue token palette) suitable for `--tbb-bg-alt`.

- Component fan-out: updated `HomepageHero` SVG gradient stops + drop-shadow to oklch, `BrandMark/styles.module.css` mark gradients to oklch, `DataViz/KPIGrid` + `CurriculumBarChart` hex fallbacks to oklch literals (Recharts SVG `fill` attribute fallback).

- Verification: `npm run build` exit 0, `npx tsc --noEmit` exit 0, full-page Playwright screenshots in both themes show the Apple Pro Silver & Black aesthetic (Apple Pro Blue accent on brand mark + CTAs + deck artwork, silver surface stage cards with hairline borders, dark Apple-style footer, frosted navbar with glass blur). Computed-style probe confirms `--tbb-accent` resolves to `#2154d8` light / `#6293ff` dark (Apple Pro blue spectrum).

- Caught and fixed during verification: the Marquee and Timeline global CSS classes were orphaned during the custom.css rewrite (causing the chips to spread horizontally and timeline cards to stack without styling). Re-added the Marquee track/badge/pause-on-hover rules and Timeline spine/entry/responsive rules with Apple Pro surfaces. Build + visual green after the fix.

## Outcome

- ✅ Apple Pro Silver & Black theme implemented 100% (pure CSS, no Tailwind).
- ✅ All gates green: build, typecheck, frontmatter, visual screenshots.
- ✅ Light + dark mode parity verified end-to-end via Playwright.
- 🔁 Follow-ups: refresh `specs/002-apple-design/spec.md` to reflect the new theme parameters (out of scope for this turn per the user's "copy 100%" directive); run `npm run test:audit` (Lighthouse + axe) for full WCAG/contrast matrix on the Apple Pro palette; consider adding an in-CSS `:supports not (color: oklch(0 0 0))` hex-fallback block for legacy browsers.
- 🧠 Reflection: the theme was faithfully ported despite the no-Tailwind constraint — Apple Pro is essentially a token-and-utility system that maps 1:1 to plain CSS custom properties + classes. The biggest risk (per the audits) was the "pure monochrome" misnomer being conflated with "no accent"; preserving the deep Pro blue keeps focus rings, link hovers, and sidebar-active states AA-readable, which is what makes Silver & Black usable rather than merely pretty.
