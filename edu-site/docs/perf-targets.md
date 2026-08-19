---
sidebar_label: "Performance & Accessibility Targets"
sidebar_position: 99
title: "Performance & Accessibility Targets"
description: "Lighthouse + axe-core score thresholds that gate the CI pipeline. What we measure, why we measure it, and how to fix the most common regressions."
chapter_state: "text-ready"
---

# Performance & Accessibility Targets

The CI pipeline runs **Lighthouse** and **axe-core** against the production
build on every pull request. If a category score falls below the threshold,
the PR is blocked until the regression is fixed.

## Targets at a glance

| Category           | Minimum score | Why it matters                                                          |
| ------------------ | :-----------: | ----------------------------------------------------------------------- |
| **Performance**    | **≥ 90**      | Students on mid-tier laptops over Wi-Fi need pages under 2.5s TTI.      |
| **Accessibility**  | **≥ 95**      | WCAG 2.1 AA is a hard floor; 95+ means zero serious axe violations.     |
| **Best Practices** | **≥ 95**      | HTTPS, no console errors, no deprecated APIs, correct image aspect.     |
| **SEO**            | **≥ 95**      | Discoverable by search engines + meta description + mobile viewport.    |

For **axe-core** specifically, the gate is **zero violations** at impact
`serious` or `critical`. `moderate` and `minor` are surfaced in the report
but do not block the build.

## Why these numbers?

### Performance ≥ 90

Lighthouse's performance score weights **LCP** (largest contentful paint),
**CLS** (cumulative layout shift), and **TBT** (total blocking time) most
heavily. A score of 90 means the page is in the top ~25% of the web. For a
textbook whose content is mostly MDX + images, this is achievable without
heroics — but it does require:

- Compressing images to WebP/AVIF.
- Lazy-loading the 3D scene and Lenis scroll (already done).
- Avoiding layout shift when components mount.

### Accessibility ≥ 95

The textbook explicitly targets WCAG 2.1 AA. A Lighthouse a11y score of 95
corresponds to **no axe rule failures** plus strong color-contrast and ARIA
coverage. The remaining 5 points come from heuristics that axe cannot
detect (e.g. cognitive load, focus order) and are reviewed manually.

### Best Practices ≥ 95

This category catches regressions that don't show up in functional tests:

- HTTP→HTTPS redirect
- No `console.error` in production
- No deprecated APIs (`document.write`, etc.)
- Correct image aspect ratios (avoids CLS)

### SEO ≥ 95

Even though the textbook is primarily shared via direct link, search engines
do index public docs and serve them to learners searching for "spec-driven
AI agents". A score of 95 ensures:

- `meta description` is present and non-empty (Docusaurus sets this from frontmatter).
- Viewport meta tag is correct.
- `robots.txt` is reachable.
- Links are crawlable.

## How the gate runs

1. `npm run build` produces `edu-site/build/`.
2. `npm run test:audit` (defined in `package.json`):
   - Boots `docusaurus serve` on port 4173.
   - Polls until the server responds 2xx/3xx (timeout 45 s).
   - Runs Lighthouse via the CLI against the served homepage.
   - Runs axe-core (WCAG 2.1 A/AA tag set) via Playwright Chromium.
   - Aggregates results into `lighthouse-report.json`, `axe-report.json`,
     and `audit-summary.json`.
   - Exits non-zero if any score is below target OR any axe violation is
     `serious` or `critical`.
   - Tears down the server cleanly.

The same three JSON files are uploaded as GitHub Actions artifacts (90-day
retention) so regressions can be diffed across PRs.

## Local usage

```bash
# One-shot: serve + lighthouse + axe + verdict
npm run test:audit

# Just the perf gate (assumes something is already on :4173)
npm run test:perf

# Just the a11y gate (assumes something is already on :4173)
npm run test:a11y
```

To test against a custom URL, pass it as the first argument:

```bash
node scripts/lighthouse.mjs http://localhost:3000
node scripts/axe.mjs https://staging.example.com
```

## Reading the score variance

Lighthouse scores **drift ±2-5 points between runs** even on identical code
because:

- The simulated throttling depends on the runner's CPU/IO.
- Chrome's LCP detection varies with paint timing.
- `lighthouse-report.json` includes the **final URL** and **environment**
  so a CI run can be compared to a previous run.

If a score is borderline (e.g. a11y = 96 on this run, 93 on another), do not
"fix" it — re-run the audit. If it consistently sits below target, the
regression is real and should be addressed.

## Common axe violations and how to fix them

The five violations that show up most often in textbook-class sites:

### 1. `color-contrast` (serious)

Text falls below 4.5:1 contrast against its background.

**Fix:** Use the Radix Colors `gray` / `slate` steps at `step-11` or
`step-12` for body text on light surfaces, and `step-1`/`step-2` on dark.
Verify with the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).

### 2. `image-alt` (critical)

An `<img>` is missing an `alt` attribute.

**Fix:** Always set `alt=""` for decorative images or descriptive `alt`
text for content images. MDX lets you write `![alt text here](image.png)`.

### 3. `link-name` (serious)

A link has no accessible name (`<a href="..."></a>` with no text or `aria-label`).

**Fix:** Add visible link text, or `aria-label="..."` for icon-only links.

### 4. `heading-order` (moderate)

Heading levels skip (e.g. `<h1>` → `<h3>` with no `<h2>`).

**Fix:** Use the `Heading` component from `@mdx-js/react` or Docusaurus's
built-in heading hierarchy. Don't override `<h1>` styling on a non-`<h1>`
element.

### 5. `region` (moderate)

All page content is inside a single `<div>` with no `<main>`, `<header>`,
`<nav>`, `<footer>`, or `<aside>` landmark.

**Fix:** Wrap page sections in semantic landmarks. The 404 page and
HomepageHero were already updated to add `<main>`, `<header>`, and `<nav>`
landmarks (see PHR `0009-a11y-perfect-uplift`).

## Common Lighthouse regressions and how to fix them

### CLS > 0.1 (Performance drops to ~80)

Usually caused by an image without explicit `width`/`height`, or by a
component that mounts after the first paint and shifts layout.

**Fix:** Set `width` and `height` on every `<img>` and `<iframe>` in MDX.
Use CSS `aspect-ratio` for media that can't be sized at the markup level.

### LCP > 2.5 s (Performance drops to ~75)

Usually a hero image or a 3D canvas that's not prioritized.

**Fix:** Mark the LCP element with `fetchpriority="high"` or
`<link rel="preload">`. The 3D canvas already lazy-mounts after first
contentful paint.

### SEO < 95

Usually because a new MDX page is missing `description` in frontmatter, or
the OG image isn't set.

**Fix:** The CI frontmatter check (`npm run check:frontmatter`) already
enforces `description`. For OG images, see `docusaurus.config.ts` →
`themeConfig.image`.

## When the gate is too strict

If a PR legitimately needs to ship below target (e.g. we add a heavy 3D
landing page), update the targets in **both**:

- `scripts/lighthouse.mjs` (`TARGETS` constant)
- `scripts/serve-and-test.mjs` (`TARGETS` constant)

…and bump this doc with the rationale. Never edit only one location — they
will drift.