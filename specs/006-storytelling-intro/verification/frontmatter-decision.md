# Frontmatter Decision — `006-storytelling-intro`

**Date**: 2026-08-19
**Purpose**: Lock the rewritten `edu-site/docs/intro.md` frontmatter values before T007 drafting. Recorded at T006.

## Chosen values

```yaml
---
sidebar_label: "Introduction"
sidebar_position: 0
title: "Introduction: The Bridge Between Code and Engineering"
description: "A 30-minute story of how AI coding agents split the industry into two extremes — and the bridge between them."
chapter_state: "text-ready"
---
```

## Why these values

| Field | Value | Rationale |
|-------|-------|-----------|
| `sidebar_label` | `"Introduction"` | Unchanged — sidebar consistency. |
| `sidebar_position` | `0` | Unchanged — Introduction remains the first item the reader sees. |
| `title` | `"Introduction: The Bridge Between Code and Engineering"` | Sharpened from the current `"Introduction — Why This Book Exists"`. The new title reflects the story arc (two extremes → bridge) and matches the bridge thesis's exact wording. |
| `description` | `"A 30-minute story of how AI coding agents split the industry into two extremes — and the bridge between them."` | 30 min read + the two-extreme frame in a single sentence. SEO-friendly. |
| `chapter_state` | `"text-ready"` | Constitution III (Co-Authored Text): text-first; video later. The Introduction ships as a written artifact regardless of whether a video is added later. |

## Candidates considered and rejected

- `title = "Introduction — Why This Book Exists"` (current) — kept the old "Why this book" framing, which is too tame for the new story-driven prose.
- `title = "The Two Extremes of AI Coding"` — too polemical; misses the bridge.
- `description = "A 30-minute read for students new to programming in 2026."` — true but doesn't convey the story arc.

## Visibility line (FR-014)

The 30-minute badge goes immediately after the H1 title, in the page body:

```markdown
*30 min read · ~7,200 words · updated 2026-08-19*
```

This is plain Markdown text (no custom component) per the Navigation Contract §7.