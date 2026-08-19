# Content Schema Contract: book-foundation

**Feature**: `001-book-foundation`
**Date**: 2026-08-17

This document is the **content contract** for the book-foundation feature. It defines the shape of MDX chapters and the validation rules that gate a successful build. There are no API endpoints in Phase A — the contract is the frontmatter schema and the static-asset layout.

---

## 1. Stage overview MDX

**Path:** `edu-site/docs/stage-<NN>-<slug>/index.md`

**Frontmatter (required):**

```yaml
---
sidebar_label: "Stage 1 Overview"      # shown in the sidebar
sidebar_position: 1                     # always 1 for stage overviews
title: "Stage 1 — Spec-Aware Vibe Engineering"
description: "Lead AI coding agents with engineering judgment. ..."
keywords: [stage-1, foundations]
---
```

**Body:** a landing page for the stage — list of chapters, learning outcomes, "how this stage is taught."

---

## 2. Chapter MDX

**Path:** `edu-site/docs/stage-<NN>-<slug>/<NN>-<topic>.mdx`

**Frontmatter (required):**

```yaml
---
sidebar_label: "1. Foundations"
sidebar_position: 2
title: "01 — Foundations: Architecture Before Code"
description: "Software architecture: high-level system structure, planning, architecture before code."
keywords: [architecture, planning, system design, foundation]
chapter_state: "placeholder"            # placeholder | text-ready | video-published
video_url: ""                           # required only when chapter_state == "video-published"
---
```

**Body contract:**

Every chapter MUST contain four sections, in this order:

```markdown
# <chapter title>

## Lecture outline

- [ ] Topic 1
- [ ] Topic 2
- ...

## Lecture content

> _Awaiting video lecture._    # replaced when text is co-authored

```text
[Lecture transcript / text goes here.]
```

## Worked example    (optional)

```python
# Code samples go here.
```

## Check your understanding

1. Question 1?
2. Question 2?

## Further reading

- _To be added._
```

Validation:
- Each heading (`## Lecture outline`, etc.) MUST appear exactly once.
- `## Lecture content` MUST contain at least one paragraph (even placeholder) when `chapter_state != "placeholder"`.
- `## Check your understanding` MUST have ≥ 1 numbered question.
- `## Worked example` is OPTIONAL.

---

## 3. Image asset

**Path:** `edu-site/static/img/<chapter-slug>/<filename>.<ext>`

**Slug convention:** the chapter's URL slug, e.g. `stage-01-spec-aware-vibe-engineering/01-foundations` → `edu-site/static/img/stage-01-spec-aware-vibe-engineering/01-foundations/`.

**Reference syntax (in MDX):**

```markdown
![Architecture flow diagram](/img/stage-01-spec-aware-vibe-engineering/01-foundations/architecture-flow-diagram.png)
```

**Validation:**
- `alt` text MUST be non-empty.
- File MUST exist on disk (Docusaurus fails the build otherwise).
- Allowed extensions: `.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`.

---

## 4. Build-time validation

The CI workflow (`.github/workflows/ci.yml`) runs:

```bash
npm ci
npm run build          # runs: docusaurus build + tsc (via typecheck)
```

`npm run build` fails the build if any of these are violated:

- Missing frontmatter on any `.md` / `.mdx` under `edu-site/docs/`.
- Broken internal link (`onBrokenLinks: "throw"`).
- Broken image reference.
- TypeScript errors in `docusaurus.config.ts` / `sidebars.ts` (via `tsc`).

A separate script `scripts/check-frontmatter.mjs` (added in implementation phase) pre-validates required frontmatter keys. Wired into `npm run build` as a pre-build step.

---

## 5. State transitions

The `chapter_state` frontmatter value drives the `<ChapterState />` badge (R-005).

| State | Visible badge text | Color |
|---|---|---|
| `placeholder` | "Placeholder — awaiting text" | gray |
| `text-ready` | "Text ready — video coming soon" | blue |
| `video-published` | (no badge; the video is the headline) | green |

Transitions (see `data-model.md`):
- `placeholder → text-ready`: Claude Code completes the four sections.
- `text-ready → video-published`: Dell adds `video_url`.

The badge disappears in `video-published` because the video embed itself signals "this chapter is done."

---

## 6. Out-of-scope contracts

- **No API endpoints** in Phase A.
- **No database tables.**
- **No auth / session shapes.**
- **No product / order schemas.**

These belong to later features (Phase B / Phase C).
