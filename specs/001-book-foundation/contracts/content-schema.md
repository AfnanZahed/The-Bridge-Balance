# Content Schema Contract: book-foundation

**Feature**: `001-book-foundation`
**Date**: 2026-08-17
**Revised**: 2026-09-14 — the content hierarchy (Stage → Chapter → Lesson → Part), the `content_kind` classification, and the real current frontmatter/body contract, aligned to the gate scripts that enforce it.

This document is the **content contract** for the book-foundation feature. It defines the shape of MDX chapters and the validation rules that gate a successful build. There are no API endpoints in Phase A — the contract is the frontmatter schema, the body rules, and the static-asset layout.

**The scripts are the source of truth.** This document describes what they check; where the two ever disagree, the script wins. Both run inside `npm run build`:

- `edu-site/scripts/check-frontmatter.mjs` — required keys and `chapter_state` / `content_kind` validation, every file under `docs/`.
- `edu-site/scripts/check-chapter.mjs` — the editorial chapter gate, every shipped (`text-ready` / `video-published`) chapter.

An earlier revision of this file described a fixed `## Lecture outline` / `## Lecture content` body. No chapter is written that way, and the gate never required it — that section has been replaced below by the contract that is actually enforced.

---

## 1. Content hierarchy

Content is organized **Stage → Chapter → Lesson**, with an optional fourth level, **Part**.

| Level | What it is | Today |
|---|---|---|
| **Stage** | A numbered division of the curriculum, 0 through 4 (five stages). | Stage 0 is the chronological orientation sequence at the docs root; Stages 1–4 are the numbered stage folders. |
| **Chapter** | A top-level unit of the curriculum, shipped as **one continuous read**. | Each live `edu-site/docs/.../<NN>-<slug>.md` file is one Chapter. |
| **Lesson** | A unit *below* Chapter. | The site does not yet split a Chapter into Lesson files. |
| **Part** | Optional, and only *inside* a Lesson that is too long, mixed, or disorganized to stay one unit. | Most Lessons never need one. |

`lesson-spine-authoring` is a deliberately book-agnostic peer skill. When it calls the one-file unit it writes a "lesson", that is the generic unit — under this hierarchy, a Chapter, or a Lesson-level Part when a Chapter is split.

The chapter count is never fixed (locked decision D5). The hierarchy fixes the *levels*, not how many chapters exist or what they are.

---

## 2. Stage overview MDX

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

`chapter_state` is **not** required on a stage index page (it is not a lesson), and neither `scope_multiplier` nor `scope_reason` applies to it. A stage-index row in `prerequisite-graph.yaml` carries `teaches: []` by design.

---

## 3. Chapter MDX

**Path:** `edu-site/docs/stage-<NN>-<slug>/<NN>-<topic>.md` (or the docs root for Stage 0 orientation material).

**Frontmatter (required for every chapter):**

```yaml
---
sidebar_label: "3. Databases"          # short; what the sidebar shows
sidebar_position: 6                     # integer; index.md is 1
title: "Databases: Choosing How to Store"
description: "One human sentence a person would actually read. Not keyword soup."
keywords: [postgresql, mongodb, schema, normalisation]
chapter_state: "text-ready"             # placeholder | text-ready | video-published
video_url: ""                           # required non-empty when chapter_state == "video-published"
scope_multiplier: 0.7                   # required for a real chapter (not an index/non-chapter page)
scope_reason: "one core concept plus two supporting comparisons"
---
```

`check-frontmatter.mjs` enforces the base keys (`sidebar_label`, `sidebar_position`, `title`, `description`) for every file and requires a valid `chapter_state` on chapter files. Once a chapter is `text-ready`, `check-chapter.mjs` additionally requires `scope_multiplier` and a **specific** `scope_reason` (a generic value like "reference scope" is rejected), and warns when `keywords` is missing.

### Content kind — `content_kind`

A chapter MAY declare its kind with an optional pair of keys (both or neither):

```yaml
content_kind: "practice"                # theory | practice — exactly two values
content_kind_reason: "a repeatable skill the reader practises, not a concept explained"
```

- The value MUST be `theory` or `practice` — two values, not three or four. A named tool is a further tag *inside* `practice`, never a separate kind.
- `content_kind_reason` is REQUIRED whenever `content_kind` is set (the same required-together pattern as `scope_multiplier` / `scope_reason`).
- The key is optional today: no chapter carries it yet, and a chapter without it passes exactly as before. It surfaces through the `<ContentKind />` badge in the chapter masthead when set.

### Body contract

A chapter is **one continuous read** — a single document, read start to finish.

- **Exactly one `h1`**, the chapter title, and it should match frontmatter `title` (the gate warns if it differs). No skipped heading levels.
- **Registered components only.** `src/theme/MDXComponents.tsx` registers `Callout` and `StageBanner` for a chapter body, and nothing else. Any other component in a chapter fails the build, and `check-chapter.mjs` catches it first with a clearer message. The `ChapterState` and `ContentKind` badges are page chrome rendered by the `h1` override — they are **not** author-usable MDX components.
- **Safety floor.** Where the topic touches execution, deployment, credentials, or anything a reader could ship without checking, the statement ships as exactly `<Callout type="warning" title="Safety floor">…</Callout>` — fixed, so the gate can prove it survived — with a body of at least eight words. A missing safety floor is a warning, not an error.
- **Images.** Every chapter that references an image should write real alt text (see §4). Claude Code authors text only: images are the project owner's, generated externally.
- **Warnings** (never fail): voice tells from `canon/voice.md`, a bolded statistic with no source named in its paragraph, and code lines wider than 80 characters.

There is **no fixed body structure** and **no length band**. Length is judged per topic and recorded in `scope_reason`; the gate never polices a word count.

Validation (enforced by `check-chapter.mjs`):
- One `h1`; no heading-level skips.
- No unregistered component names.
- No unknown frontmatter keys.
- Every referenced image exists on disk, with non-empty, non-junk alt text of at least five words.
- A safety-floor callout, if present, uses the exact fixed form and a non-trivial body.
- `scope_reason` present and specific.

---

## 4. Image asset

**Path:** `edu-site/static/img/<chapter-slug>/<filename>.<ext>`

**Slug convention:** the chapter's URL slug, e.g. `stage-01-spec-aware-vibe-engineering/01-foundations` → `edu-site/static/img/stage-01-spec-aware-vibe-engineering/01-foundations/`.

**Reference syntax (in MDX):**

```markdown
![Architecture flow diagram](/img/stage-01-spec-aware-vibe-engineering/01-foundations/architecture-flow-diagram.png)
```

**Validation:**
- `alt` text MUST be non-empty, MUST NOT be a bare word like "diagram", and MUST be at least five words — enough to replace the picture for a reader who cannot see it.
- File MUST exist on disk (Docusaurus fails the build otherwise, and the gate errors first).
- Allowed extensions: `.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`.

---

## 5. Build-time validation

`npm run build` (from `edu-site/`) runs a chain of gates, then the Docusaurus build. Any one failing stops the chain:

1. `check:frontmatter` — `check-frontmatter.mjs`
2. `check:refs` — `check-references.mjs`
3. `check:chapter` — `check-chapter.mjs`
4. `generate-chapter-manifest.mjs`
5. `generate-search-index.mjs`
6. `docusaurus build`

A chapter still at `placeholder` is **skipped** by `check-chapter.mjs`, but the run **lists it by name** — so a clean result can never be mistaken for proof about a chapter it never read.

---

## 6. State transitions

The `chapter_state` frontmatter value drives the `<ChapterState />` badge.

| State | Visible badge text | Meaning |
|---|---|---|
| `placeholder` | "Placeholder — awaiting text" | A shell; skipped by the chapter gate (and listed by name). |
| `text-ready` | "Text ready — video coming soon" | Complete, real prose that passes the gate. A milestone, not a draft. |
| `video-published` | (no badge; the video is the headline) | The owner has recorded the lecture and set `video_url`. |

Transitions:
- `placeholder → text-ready`: the chapter is authored and passes the gate.
- `text-ready → video-published`: the project owner adds `video_url`.

`text-ready` means *passes the gate*, not merely flipped to say so — a chapter that cannot reach a clean pass stays `placeholder`.

---

## 7. Exempt files — real docs, not chapters

Two docs-root pages are deliberately outside the chapter contract and carry no `chapter_state`, `scope_multiplier`, or `scope_reason`:

- `edu-site/docs/glossary.md` — generated from `concept-ledger.yaml` (defined terms only).
- `edu-site/docs/perf-targets.md` — internal performance targets.

Both `check-frontmatter.mjs` (`STAGE_FILES`) and `check-chapter.mjs` (`NON_CHAPTERS`) exempt them, and both scripts verify every exemption entry names a file that actually exists — a stale entry exempts nothing.

---

## 8. Out-of-scope contracts

- **No API endpoints** in Phase A.
- **No database tables.**
- **No auth / session shapes.**
- **No product / order schemas.**

These belong to later features (Phase B / Phase C).
