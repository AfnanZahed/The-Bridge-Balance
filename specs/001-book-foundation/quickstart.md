# Quickstart: book-foundation

**Feature**: `001-book-foundation`
**Date**: 2026-08-17

A developer's first-day guide to working on **The Bridge Balance** textbook. Covers local dev, adding a chapter, image integration, and the deploy flow.

---

## Prerequisites

| Tool | Version | Why |
|---|---|---|
| Node.js | ≥ 18 | Docusaurus 3.x baseline |
| npm | ≥ 9 (bundled with Node 18) | package manager |
| Git | latest | version control |

Optional but recommended:
- A code editor with MDX support (VS Code works well).
- An image-generation tool (the project owner uses AI tools to produce diagrams).

No backend, no database, no Python required for Phase A.

---

## 1. Clone and install

```bash
git clone https://github.com/<org>/the-bridge-balance.git
cd the-bridge-balance
git checkout 001-book-foundation
cd edu-site
npm install
```

This installs Docusaurus 3.7.x and the project's other deps.

---

## 2. Run the dev server

```bash
cd edu-site
npm start
# → http://localhost:3000
```

The dev server hot-reloads on every MDX edit. You should see:

- Homepage with hero + 4 stage cards.
- Sidebar with **Stage 1** expanded.
- Six placeholder chapters under Stage 1.

If the sidebar is empty or the homepage is broken, run `npm run typecheck` to surface TypeScript config errors.

---

## 3. Add or edit a chapter

### 3a. Create a new chapter

```bash
# From edu-site/, create the file:
touch docs/stage-01-spec-aware-vibe-engineering/07-new-chapter.mdx
```

Open the file and paste this template:

```markdown
---
sidebar_label: "7. New Topic"
sidebar_position: 7
title: "07 — New Topic"
description: "One-line summary of the topic."
keywords: [topic, sub-topic]
chapter_state: "placeholder"
video_url: ""
---

# 07 — New Topic

> **Core idea:** <one-sentence summary>.

## Lecture outline

- [ ] Item 1
- [ ] Item 2

## Lecture content

> _Awaiting video lecture._

```text
[Lecture transcript goes here.]
```

## Worked example

```python
# Code sample goes here.
```

## Check your understanding

1. Question 1?

## Further reading

- _To be added._
```

Update `edu-site/sidebars.ts` to include the new chapter id under Stage 1.

### 3b. Move a chapter through states

Per the **co-authoring workflow** (Constitution v2.0.0 Principle III):

1. **Claude Code writes the text** — paste the lecture content into the `## Lecture content` block. Set `chapter_state: "text-ready"`.
2. **Project owner produces images** — generate diagrams with AI tools. Save under `edu-site/static/img/<chapter-slug>/`. Reference with `![alt](/img/...)` syntax.
3. **Project owner records the video** — record against the now-complete text. Add `video_url:` to frontmatter. Set `chapter_state: "video-published"`.
4. **Open a PR.** CI runs `npm run build`; if it passes, merge.

The `<ChapterState />` badge at the top of the chapter updates automatically based on `chapter_state`.

---

## 4. Add an image

```bash
# Project owner generates the image, then:
mkdir -p edu-site/static/img/<chapter-slug>
cp ~/my-diagram.png edu-site/static/img/<chapter-slug>/architecture-flow.png
```

Reference it from the chapter:

```markdown
![Architecture flow diagram](/img/<chapter-slug>/architecture-flow.png)
```

Validation:
- `alt` text is **mandatory** (Lighthouse a11y ≥ 90).
- File path is relative to `/static/` — the leading `/` is required.
- Build fails if the file is missing.

---

## 5. Build and verify

```bash
cd edu-site
npm run build      # static output → build/
npm run typecheck  # tsc --noEmit on the config
```

`npm run build` exits 0 on success. Non-zero exit = broken link, missing image, missing frontmatter, or TypeScript error.

To preview the production build locally:

```bash
npm run serve      # serves build/ on http://localhost:3000
```

---

## 6. Deploy (Vercel)

Vercel auto-detects Docusaurus. On every push to `main`:

1. Vercel runs `npm run build` automatically.
2. The static output is deployed.
3. The previous successful deploy stays live if the new build fails.

**No `npm run deploy` is needed.** The Docusaurus CLI's gh-pages workflow is unused (Q1 lock-in to Vercel).

To set up Vercel for a new repo:

1. Sign up at https://vercel.com/ (free tier is enough).
2. Import the GitHub repo.
3. Vercel auto-detects the framework as Docusaurus.
4. Add a custom domain later if needed (also free).

Branch protection on `main`:
- Require status check `ci / build` to pass.
- No required human reviewers (Q2 — single author).
- Admin can self-merge.

---

## 7. What's NOT in this quickstart (deferred)

- **RAG chatbot / search** — Phase B.
- **Auth / profiles** — Phase B.
- **Translation / personalization** — Phase B.
- **Stripe / product catalog** — Phase C.
- **Python / FastAPI / Postgres / Qdrant** — not used in Phase A.

If you're looking for backend docs, see `edu-site/api/README.md` (scaffold only at this stage; not wired in Phase A).
