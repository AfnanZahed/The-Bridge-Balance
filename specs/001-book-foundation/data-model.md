# Data Model: book-foundation

**Feature**: `001-book-foundation`
**Date**: 2026-08-17

This document defines the data shapes for the four entities introduced in the spec: **Stage**, **Chapter**, **Lecture**, and **Image**. The book-foundation feature is content-only (no database, no API), so entities are file-system artifacts with metadata embedded in YAML frontmatter.

---

## Entity: Stage

A numbered curriculum level (1–4). Each stage has an overview page and 2–6 chapters.

**Storage:** MDX file at `edu-site/docs/stage-<NN>-<slug>/index.md`

**Frontmatter:**

| Field | Type | Required | Description |
|---|---|---|---|
| `sidebar_label` | string | yes | Sidebar text, e.g. `"Stage 1 Overview"` |
| `sidebar_position` | integer | yes | Position within the docs tree (1 for stage overview) |
| `title` | string | yes | Page `<title>`, e.g. `"Stage 1 — Spec-Aware Vibe Engineering"` |
| `description` | string | yes | `<meta description>` for SEO |
| `keywords` | string[] | no | SEO keywords |

**State:** none — Stages themselves don't have a state; they contain Chapters that do.

**Relationships:**
- 1 Stage → N Chapters (one-to-many)
- 1 Stage → 1 Overview page (the `index.md` file)

---

## Entity: Chapter

A single MDX file under a stage. Has four content sections and a state.

**Storage:** MDX file at `edu-site/docs/stage-<NN>-<slug>/<NN>-<topic>.mdx`

**Frontmatter:**

| Field | Type | Required | Description |
|---|---|---|---|
| `sidebar_label` | string | yes | Sidebar text, e.g. `"1. Foundations"` |
| `sidebar_position` | integer | yes | Position within the stage (1 = first chapter) |
| `title` | string | yes | Page `<title>` |
| `description` | string | yes | `<meta description>` |
| `keywords` | string[] | no | SEO keywords |
| `chapter_state` | enum | yes | One of `placeholder`, `text-ready`, `video-published` (drives the `<ChapterState />` badge) |
| `video_url` | URL string | no | Required only when `chapter_state = "video-published"` |

**State machine:**

```
                  +-------------------+
                  |   placeholder     |
                  | (no text yet)     |
                  +---------+---------+
                            |
                  (Claude Code writes text)
                            |
                            v
                  +-------------------+
                  |   text-ready      |
                  | (text + images,   |
                  |  no video yet)    |
                  +---------+---------+
                            |
                  (Dell records video)
                            |
                            v
                  +-------------------+
                  | video-published   |
                  | (text + images +  |
                  |  video URL)       |
                  +-------------------+
```

Transitions:
- `placeholder → text-ready` — Claude Code completes the four sections; `chapter_state` updated in frontmatter.
- `text-ready → video-published` — Dell records the video and adds `video_url`; `chapter_state` updated.
- `text-ready → placeholder` — possible if text needs to be re-written; rare.
- `video-published → text-ready` — possible if the video is retracted or the text needs revision.

**Content sections (within the MDX body):**

1. **Lecture outline** — a checklist of topics covered.
2. **Lecture content** — the detailed text lecture (the co-authored artifact).
3. **Worked example** — optional; a code sample, diagram walkthrough, or scenario.
4. **Check your understanding** — 3–5 questions for self-assessment.

**Validation rules:**
- All four sections MUST be present (a section may have just a heading if not yet filled).
- Code snippets MUST use triple-backtick fences with a language hint.
- Internal links MUST resolve — Docusaurus's `onBrokenLinks: "throw"` enforces this at build time.

---

## Entity: Lecture

The video that accompanies a chapter. Stored externally; the chapter references it by URL.

**Storage:** external (YouTube, native host, etc.). URL stored in the Chapter's `video_url` frontmatter.

**Fields:**

| Field | Type | Description |
|---|---|---|
| `url` | URL | Required; the canonical video URL |
| `duration_seconds` | integer | Optional; populated when known |
| `recorded_at` | ISO date | Optional; the date Dell recorded |

**Relationships:**
- 0..1 Lecture per Chapter.
- Per Q3 workflow: video is recorded *after* the text is written; never before.

---

## Entity: Image

A diagram, screenshot, or explanatory visual integrated into a chapter.

**Storage:** under `edu-site/static/img/<chapter-slug>/<filename>.<ext>`

**File-name convention:** kebab-case, descriptive: `architecture-flow-diagram.png`, `sql-join-types.svg`, etc.

**Allowed formats:** PNG, JPG, WebP, SVG.

**Markdown reference syntax:**

```markdown
![Architecture flow diagram showing request lifecycle](/img/stage-01-spec-aware-vibe-engineering/01-foundations/architecture-flow-diagram.png)
```

**Required metadata:**
- `alt` text — for accessibility (Lighthouse a11y ≥ 90 per SC-005).
- Optional `caption` — `<figure><figcaption>...</figcaption></figure>` via MDX components.

**Validation:**
- `alt` text MUST be non-empty.
- File path MUST exist (build fails otherwise — Docusaurus's static-asset resolution).
- Files > 1 MB SHOULD be optimized before commit (no automated check in Phase A).

**Relationships:**
- N Images per Chapter (zero-to-many).

---

## Cross-entity invariants

1. **Chapter state matches content.** A chapter marked `text-ready` MUST have all four sections present (even if some are placeholder text). A chapter marked `video-published` MUST have a non-empty `video_url`.
2. **Image paths resolve.** Every image reference in MDX MUST point to a file under `edu-site/static/img/`.
3. **Internal links resolve.** Every relative link in MDX MUST point to an existing route. `onBrokenLinks: "throw"` enforces this at build time.
4. **Frontmatter shape is consistent.** Every `.md`/`.mdx` file under `edu-site/docs/` MUST have the required frontmatter fields.

---

## What's NOT in this data model

- **No users.** Phase A has no auth.
- **No products.** Phase C catalog is deferred.
- **No orders / payments.** Phase C.
- **No comments / discussions.** Out of scope (Assumptions).
- **No analytics.** Out of scope.
