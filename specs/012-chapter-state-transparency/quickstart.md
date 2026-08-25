# Quickstart: Chapter State Transparency

**Branch**: `012-chapter-state-transparency` | **Date**: 2026-08-25
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

Local verification steps for the chapter-state-transparency feature.
Designed to run end-to-end in under 5 minutes once `npm install` is
already done in `edu-site/`.

---

## Prerequisites

- Node 18+ and npm 9+ (Docusaurus 3.x baseline).
- A clean clone or branch checkout of `012-chapter-state-transparency`.
- `cd edu-site && npm install` already run at least once.

---

## Step 1 · Static checks (under 30 seconds)

```bash
cd edu-site
node scripts/check-frontmatter.mjs          # exit 0 required
node scripts/check-chapter-quality.mjs      # exit 0 required
```

Expected output: both report zero violations. If either fails, the
feature has regressed existing quality gates — investigate before
proceeding.

---

## Step 2 · Build (1–3 minutes cold, ~30s warm)

```bash
cd edu-site
npm run build
```

Expected output: Docusaurus reports `Generated static files in build/`,
exit 0. Watch for:

- Bundle size delta vs. the pre-feature baseline. Should be effectively
  zero (<1 kB) — the only addition is a few characters of JSX and one
  small CSS rule.
- Any broken-link or broken-MDX warnings. Should be zero.

---

## Step 3 · Serve and visit the two text-ready chapters

```bash
cd edu-site
npm run serve -- --port 4173 &
sleep 3
```

Then open in a browser (or curl + grep):

- `http://localhost:4173/docs/intro/` — should show the `text-ready`
  blue/teal `.tbb-chapter-state--text-ready` badge above the `<h1>`,
  and the new "9/9 modes available" line inside the reader-controls
  card.
- `http://localhost:4173/docs/perf-targets/` — same as above. Also 9/9.

**Visual checks** (each must pass):

- [ ] Badge text reads `text-ready` (lowercase, hyphenated — exactly
  per `STATE_META`).
- [ ] The pulsing dot on the `text-ready` badge animates (verify with
  the browser's motion preferences ON). Disable motion and confirm the
  pulse stops (respects `prefers-reduced-motion`).
- [ ] "9/9 modes available" appears as a small muted line *after* the
  per-combination description and *before* any substitution note.
- [ ] The leading dot before "9/9 modes available" is `--tbb-accent-subtle`
  in light mode and visible in dark mode.

---

## Step 4 · Visit a placeholder chapter

- `http://localhost:4173/docs/stage-01-spec-aware-vibe-engineering/01-foundations/`

**Visual checks**:

- [ ] Badge text reads "placeholder" (lowercase, exact).
- [ ] Badge styling is muted gray (`.tbb-chapter-state--placeholder`),
  no pulse animation.
- [ ] No "1/9 modes available" or any reader-controls-mode count appears
  on this page (placeholder chapters have no `ReaderControls` hydration
  expectation since they have no authored content to count).

---

## Step 5 · Visit a stage-index overview (regression check)

- `http://localhost:4173/docs/stage-01-spec-aware-vibe-engineering/`

**Visual checks**:

- [ ] NO chapter-state badge renders (overview pages have no
  `chapter_state` field; `MDXComponents.tsx`'s `ChapterHeading` gates
  the badge on presence).
- [ ] NO completeness indicator renders (same reason).
- [ ] Page is visually identical to how it was before this feature.

---

## Step 6 · Keyboard and screen-reader smoke (manual)

1. Tab to the reader-controls card on `intro.md`. The count paragraph
   should be reachable by `Tab` like any other static element (or
   skipped, since it's not interactive — both are acceptable).
2. With VoiceOver / NVDA active, the count should announce as
   "status: nine of nine modes available" or similar — `role="status"`
   guarantees the polite announcement.

---

## Step 7 · Teardown

```bash
kill %1        # or `pkill -f docusaurus`
```

---

## What "done" means

All Step 1–6 checks pass with no regressions on the pre-feature
baseline. SC-001 through SC-006 from the spec are all satisfied by
this list.

If any check fails, refer to the morning report's "Open follow-ups"
section for the known deferred items and the per-item reasoning.
