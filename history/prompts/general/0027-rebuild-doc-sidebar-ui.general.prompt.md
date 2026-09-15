---
id: 0027
title: Rebuild the doc sidebar UI
stage: general
date: 2026-09-05
surface: agent
model: claude-opus-5
feature: none
branch: a
user: Book
command: (direct request)
labels: ["sidebar", "docusaurus", "swizzle", "accessibility", "design-system"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - edu-site/scripts/generate-chapter-manifest.mjs (new)
  - edu-site/src/data/chapterManifest.ts (new, generated)
  - edu-site/src/theme/DocSidebar/Desktop/index.tsx (new, ejected + reworked)
  - edu-site/src/theme/DocSidebar/Desktop/Content/index.tsx (new, ejected + reworked)
  - edu-site/src/theme/DocSidebar/Desktop/CollapseButton/index.tsx (new, ejected)
  - edu-site/src/theme/DocSidebar/Mobile/index.tsx (new, ejected + reworked)
  - edu-site/src/theme/DocSidebarItem/Link/index.tsx (new, ejected + reworked)
  - edu-site/src/theme/DocSidebarItem/Category/index.tsx (new, ejected + reworked)
  - edu-site/src/components/SiteMenu/SiteDrawer.tsx
  - edu-site/src/css/custom.css
  - edu-site/sidebars.ts
  - edu-site/docusaurus.config.ts
  - edu-site/package.json
tests:
  - npm run typecheck — PASS
  - biome check (sidebar files) — PASS, 0 findings
  - npm run build — PASS
  - node scripts/axe.mjs <chapter URL> — 0 sidebar violations (1 pre-existing
    serious violation remains in the ChapterState badge, unrelated)
  - Manual browser regression: category auto-expand, collapse-on-own-header,
    caret toggle, 4 drawer dismissal paths, light + dark contrast audit
---

## Prompt

The left side bar in the lesson's window where all the chapters and topics are listed, this sidbar scored 0.1 out of 10 in the UI, UX and Beauty from all the perspectives. Make it 10/10. Don't ask me any questions

## Response snapshot

Diagnosed the sidebar as 100% stock Docusaurus/Infima markup with a ~92-line
repaint in custom.css and nothing swizzled. Ten concrete defects were recorded
in the plan, the loudest being: a `:visited` grey rail that accumulated into a
wall of bars; no chapter-state signal despite `chapter_state` frontmatter
existing on every doc; no stage identity despite `StageIcon` already branding
the same four stages on the homepage; two docs (glossary, perf-targets)
unreachable from the sidebar entirely; and — below 997px — a drawer showing a
hardcoded 6-item list with no chapters at all.

Rebuilt it as a designed panel: ejected five theme components, added a
build-time chapter-state manifest, restructured `sidebars.ts` into six
categories, and replaced the sidebar CSS block with a token-driven system
(chapter rows as `[rail | ordinal | label | state]`, stage rows as
`[glyph | eyebrow + title | caret]`, a hairline group spine, a frosted header).
The mobile drawer now renders the real tree through Docusaurus's
secondary-menu portal, so one nav serves both widths.

Two problems surfaced during verification and were fixed rather than shipped:

1. The header's scrolled-hairline used `:has()` on a descendant's attribute;
   Chrome did not reliably re-evaluate the ancestor, so the flag moved onto the
   shell and the selector became a plain descendant match.
2. A measured contrast audit showed the planned "dim the placeholders" move
   put most rows at 2.58:1, well under AA. Inverted it to *promote* ready
   chapters instead, and introduced a panel-scoped `--tbb-sb-quiet` token
   because `--tbb-text-muted` on the dark sidebar ground was only 2.84:1 — a
   pre-existing failure. Every sidebar element now measures 4.77:1+ in light
   and 6.8:1+ in dark.

## Outcome

- ✅ Impact: the doc sidebar and the mobile drawer now share one design system,
  surface per-chapter authoring state, and clear WCAG AA in both themes.
- 🧪 Tests: typecheck, biome (scoped), build, and axe all pass; behaviour
  regressions on the ejected Category verified interactively.
- 📁 Files: 8 new (2 generated/scripted, 6 ejected theme components), 5 edited.
- 🔁 Next prompts: reopen the reader-version picker phase; consider
  localStorage read-tracking to replace what `:visited` used to hint at.
- 🧠 Reflection: `npm run lint:fix` runs biome over all of `src scripts`, so it
  reformatted ~27 unrelated files. Reverted them after proving each diff was
  pure formatting by re-running biome on the HEAD copy and comparing. Scope
  biome to changed paths in this repo rather than using the repo-wide script.

## Evaluation notes (flywheel)

- Failure modes observed: (a) a quoted heredoc still consumed `\\` in a regex
  character class, silently breaking doc-id derivation — verified the generated
  output instead of trusting the script; (b) two browser measurement artifacts
  (canvas `fillStyle` silently ignoring `oklch()`, and stale style computation
  after an imperative `data-theme` flip) each produced a false failure that had
  to be distinguished from a real one before acting.
- Graders run and results (PASS/FAIL): typecheck PASS, biome PASS, build PASS,
  axe PASS for sidebar scope.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): fix the pre-existing
  `.tbb-chapter-state` badge contrast (4.43:1) to clear the axe gate entirely,
  and repair `GATE_IMPACTS.reduce` in scripts/axe.mjs (it is a Set).
