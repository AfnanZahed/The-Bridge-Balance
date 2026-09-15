---
sidebar_label: "Performance & Accessibility Targets"
sidebar_position: 99
title: "Performance & Accessibility Targets"
description: "Lighthouse + axe-core score thresholds that gate the CI pipeline."
---

# Performance & Accessibility Targets

## Performance and accessibility targets, explained

The Bridge Balance runs a quality gate on every pull request so regressions are caught before they reach students.

The gate has two tools. Lighthouse scores four categories: Performance (≥ 90), Accessibility (≥ 95), Best Practices (≥ 95), and SEO (≥ 95). The first covers the loading experience; the second covers WCAG 2.1 AA conformance; the third covers HTTPS, console health, deprecated APIs, and image sizing; the fourth covers discoverability. axe-core supplies rule-level accessibility findings: the blocking rule is zero serious or critical violations, while moderate and minor findings are recorded but do not block.

Running locally is straightforward:

```bash
npm run test:audit   # serve + lighthouse + axe + verdict
npm run test:perf    # just the Lighthouse gate (expects :4173)
npm run test:a11y    # just the axe gate (expects :4173)
```

Understanding variance matters. Simulated throttling and paint timing make scores drift by a few points. Re-run a borderline gate before acting on it; a consistent failure is a real regression.

The common fixes are stable across projects: ensure colour contrast, add image alt text, give links accessible names, keep heading order, use semantic landmarks, and set explicit image dimensions to avoid layout shift. Content authors usually prevent most failures by adding a page description, describing images, and keeping the layout simple.

When a PR must legitimately ship below target, update the thresholds in both `scripts/lighthouse.mjs` and `scripts/serve-and-test.mjs`, and document the rationale. Never change only one copy or the two will drift.

## Commands and fixed thresholds

**Thresholds:** Performance ≥ 90 · Accessibility ≥ 95 · Best Practices ≥ 95 · SEO ≥ 95 · axe-core zero serious/critical (`moderate`/`minor` recorded, non-blocking).

**Local audit commands:**


```bash
npm run test:audit   # serve + lighthouse + axe + verdict (one shot)
npm run test:perf    # Lighthouse gate only (expects something on :4173)
npm run test:a11y    # axe gate only (expects something on :4173)
node scripts/lighthouse.mjs http://localhost:3000   # custom URL
node scripts/axe.mjs https://staging.example.com    # custom URL
```

**Reports produced:** `lighthouse-report.json`, `axe-report.json`, `audit-summary.json` (uploaded as CI artifacts, 90-day retention).

**Threshold locations:** `scripts/lighthouse.mjs` (`TARGETS`) and `scripts/serve-and-test.mjs` (`TARGETS`). Update both together when a threshold changes.
