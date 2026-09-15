# Research: book-foundation

**Feature**: `001-book-foundation`
**Date**: 2026-08-17
**Author**: Claude Code (via /sp.plan)
**Spec**: [spec.md](./spec.md)

This document captures the technical decisions for the book-foundation feature. Each unknown from Technical Context was resolved with rationale and rejected alternatives.

---

## R-001: Docusaurus version

**Decision:** Docusaurus **3.7.x** (latest 3.x at the time of writing; `^3.7.0` in `package.json`).

**Rationale:**
- 3.x is the current major version (Docusaurus 4 is not yet released).
- TypeScript config (`docusaurus.config.ts`) is the modern path.
- MDX 3.x is bundled; no extra plugin needed.
- React 18 baseline; matches the project's React 18 dependency.

**Alternatives considered:**
- Docusaurus 2.x — older; MDX 1.x; out of support for new features.
- Docusaurus 4.x (if released) — wait; not yet stable; spec says "Docusaurus 3."
- VitePress — different stack; would invalidate the stack.md choice (Panaversity Hackathon I stack).

**Source:** `.specify/templates/spec-template.md` doesn't pin a version; `stack.md` says "Docusaurus 3."; `edu-site/package.json` already pins `^3.7.0`.

---

## R-002: Vercel + Docusaurus deployment

**Decision:** Deploy via Vercel's native Docusaurus framework detection. No custom `vercel.json` required; Vercel auto-detects Docusaurus and runs `npm run build`. Output served from `build/`.

**Rationale:**
- Vercel has first-class Docusaurus support (zero config).
- Static-site build target fits Vercel's free tier (100 GB bandwidth/mo, unlimited static sites).
- `npm run deploy` from Docusaurus CLI is **not** needed — Vercel builds on every push to `main`.
- Custom domains are free on Vercel; not needed for Phase A.

**Alternatives considered:**
- Manual `npm run deploy` to `gh-pages` branch — Docusaurus CLI workflow; rejected because (a) it requires GitHub Actions secrets for the gh-pages branch and (b) Q1 lock-in to Vercel.
- `vercel.json` with explicit `buildCommand` — possible but unnecessary; framework detection works.

**Source:** Vercel docs (https://vercel.com/docs/frameworks/docusaurus).

---

## R-003: MDX image handling

**Decision:** Images live under `edu-site/static/img/<chapter-slug>/` and are referenced with standard Markdown syntax: `![alt text](/img/<chapter-slug>/<filename>.png)`. Docusaurus copies `static/` verbatim into `build/`.

**Rationale:**
- `static/` is the Docusaurus convention for assets served as-is.
- The chapter slug namespace prevents collisions across chapters.
- Standard Markdown syntax keeps the MDX portable and human-readable.
- Alt text is mandatory for accessibility (FR-014 → also SC-005 Lighthouse).

**Alternatives considered:**
- `require()` for imports — Docusaurus supports it; rejected because (a) it ties images to the build pipeline and (b) absolute paths under `/img/` are simpler.
- External CDN (Cloudinary, Imgix) — overkill for Phase A; adds a third-party dependency.
- Git LFS for large images — not needed; lecture diagrams are < 1 MB typically.

**Source:** Docusaurus docs on static assets (https://docusaurus.io/docs/markdown-features/assets).

---

## R-004: CI gating (FR-013)

**Decision:** GitHub Actions workflow at `.github/workflows/ci.yml` that runs on every PR. Steps: checkout → setup Node 18 → `npm ci` → `npm run build`. Build must exit 0. No required human reviewer (Q2).

**Rationale:**
- GitHub Actions is the natural fit (GitHub is the source-of-truth repo).
- `npm run build` already runs `onBrokenLinks: "throw"` per FR-007 — that's the broken-link gate.
- No additional lint step needed for Phase A; Docusaurus's TypeScript config is type-checked implicitly by `tsc` in the build (or via `npm run typecheck`).
- Self-merge is enabled because there's no required reviewer.

**Alternatives considered:**
- Vercel's build-only CI (no GitHub Actions) — rejected because (a) FR-007 broken-link gate must run on PRs *before* merge, not just on Vercel preview deploys; (b) branch protection needs a status check.
- Husky pre-commit hooks — possible but adds local-only enforcement; CI is the source of truth.

**Source:** GitHub Actions docs; Docusaurus build behavior (`onBrokenLinks: "throw"` in `docusaurus.config.ts`).

---

## R-005: Chapter state badge (FR-004)

**Decision:** A small custom React component `<ChapterState state="placeholder|text-ready|video-published" />` rendered at the top of each chapter. Color-coded: gray for placeholder, blue for text-ready, green for video-published.

**Rationale:**
- Per FR-004, a reader must see the chapter's state at a glance.
- A reusable component avoids ad-hoc markup per chapter.
- Lives under `edu-site/src/components/ChapterState/` — auto-imported by Docusaurus's component-resolution rules.

**Alternatives considered:**
- Docusaurus `admonitions` (`:::note`) — possible; rejected because the visual identity (color-coded badge) is more important than prose-style notes for this state.
- Inline emoji per state — minimalist; rejected because Lighthouse a11y ≥ 90 (SC-005) requires proper labels, not emoji-only indicators.

**Source:** Docusaurus docs on swizzling + custom components (https://docusaurus.io/docs/advanced/swizzling).

---

## R-006: Stage 1 chapter frontmatter contract

**Decision:** Every MDX chapter file MUST include YAML frontmatter:

```yaml
---
sidebar_label: "1. Foundations"
sidebar_position: 2
title: "01 — Foundations: Architecture Before Code"
description: "..."
keywords: [keyword1, keyword2]
chapter_state: "placeholder" | "text-ready" | "video-published"
---
```

**Rationale:**
- `sidebar_label` / `sidebar_position` / `title` are Docusaurus conventions; missing them breaks the sidebar.
- `description` populates `<meta>` tags (SEO, social cards).
- `keywords` helps future search (Phase B).
- `chapter_state` drives the `<ChapterState />` badge per FR-004.

**Validation:** at lint / build time, a small Node script (`scripts/check-frontmatter.mjs`) can scan `edu-site/docs/**/*.mdx` and fail the build if a file is missing required keys. Wired into CI.

**Alternatives considered:**
- Frontmatter optional, state inferred from content — rejected because the badge needs an explicit signal.
- Separate JSON manifest — rejected because colocating with the MDX is more maintainable.

**Source:** Docusaurus frontmatter docs; FR-004 / FR-014 / SC-005.

---

## R-007: Sidebar ordering

**Decision:** Use the file-based sidebar config (`sidebars.ts`) — already in place from the bootstrap. Order: Stage 1 expanded, Stages 2–4 collapsed (per FR-002). Each stage's `index.md` is the link target for the stage header.

**Rationale:**
- File-based is more readable than autogenerated for a hand-curated curriculum.
- `collapsed: false` on Stage 1, `collapsed: true` on Stages 2–4 matches FR-002.
- The `link: { type: "doc", id: "stage-XX/index" }` pattern makes each stage header a clickable link to its overview.

**Alternatives considered:**
- Autogenerated sidebar — possible; rejected because explicit ordering gives the curriculum author control.

**Source:** Docusaurus sidebar docs; existing `edu-site/sidebars.ts`.

---

## R-008: Testing strategy for Phase A

**Decision:** No unit / integration test framework for Phase A. Phase A tests are smoke tests: `npm run build` exits 0 + manual review of the rendered site.

**Rationale:**
- Docusaurus build itself is a compile-time correctness check.
- The acceptance scenarios in spec.md are manual (open the site, click a chapter).
- Adding Vitest / Playwright would be Phase B (when RAG lands and we have runtime behavior to test).

**Alternatives considered:**
- Vitest unit tests for React components — premature; the only custom component is `<ChapterState />` which is pure presentation.
- Playwright E2E — overkill for a 6-chapter static site; defer to Phase B.

**Source:** Principle V (Smallest Viable Change); SC-001 (build exit code).

---

## R-009: Branch protection for `main`

**Decision:** Enable GitHub branch protection on `main`: require CI status check to pass before merge. No required human reviewers (Q2). Admin override allowed (lecturer self-merges).

**Rationale:**
- CI gating is the contract per FR-013.
- No human review per Q2.
- Admin override is needed because there's only one author in Phase A — without it, the lecturer can't self-merge.

**Alternatives considered:**
- No branch protection — rejected; FR-013 requires the gate.
- Strict required-reviewers — rejected per Q2.

**Source:** GitHub branch protection docs; Q2.

---

## Summary of resolved unknowns

| Unknown | Resolution | Cross-ref |
|---|---|---|
| Docusaurus version | 3.7.x | R-001 |
| Deploy target | Vercel (auto-detect) | R-002 |
| Image storage | `static/img/<slug>/` | R-003 |
| CI gating | GitHub Actions `npm run build` | R-004 |
| State badge | `<ChapterState />` React component | R-005 |
| Frontmatter | YAML with `chapter_state` | R-006 |
| Sidebar | File-based, Stage 1 expanded | R-007 |
| Tests | Smoke (build + manual) | R-008 |
| Branch protection | CI required, no reviewers | R-009 |

All unknowns resolved. No `NEEDS CLARIFICATION` carry-over to design phase.
