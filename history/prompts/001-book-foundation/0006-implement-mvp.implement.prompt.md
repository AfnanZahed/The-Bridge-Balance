---
id: 0006
title: Implement Book Foundation MVP
stage: implement
date: 2026-08-17
surface: agent
model: MiniMax-M3
feature: book-foundation
branch: 001-book-foundation
user: Dell
command: /sp.implement
labels: [implement, mvp, build, typecheck, ci, frontmatter, chapter-state-badge]
links:
  spec: specs/001-book-foundation/spec.md
  ticket: null
  adr: history/adr/0002-text-first-video-second-workflow.md
  pr: null
files:
  - .github/workflows/ci.yml
  - edu-site/scripts/check-frontmatter.mjs
  - edu-site/src/components/ChapterState/index.tsx
  - edu-site/src/theme/MDXComponents.tsx
  - edu-site/package.json
  - edu-site/docusaurus.config.ts
  - edu-site/sidebars.ts
  - edu-site/README.md
  - edu-site/docs/intro.md
  - edu-site/docs/stage-01-spec-aware-vibe-engineering/index.md
  - edu-site/docs/stage-01-spec-aware-vibe-engineering/01-foundations.md
  - edu-site/docs/stage-01-spec-aware-vibe-engineering/02-core-programming.md
  - edu-site/docs/stage-01-spec-aware-vibe-engineering/03-frontend.md
  - edu-site/docs/stage-01-spec-aware-vibe-engineering/04-backend.md
  - edu-site/docs/stage-01-spec-aware-vibe-engineering/05-databases.md
  - edu-site/docs/stage-01-spec-aware-vibe-engineering/06-git-github.md
  - edu-site/docs/stage-02-cs50-certification/cs50p.md
  - edu-site/docs/stage-02-cs50-certification/cs50w.md
  - edu-site/docs/stage-03-mastering-ai-coding-agents/prompt-engineering.md
  - edu-site/docs/stage-03-mastering-ai-coding-agents/context-engineering.md
  - edu-site/docs/stage-03-mastering-ai-coding-agents/claude-code.md
  - edu-site/docs/stage-03-mastering-ai-coding-agents/skills-and-mcp.md
  - edu-site/docs/stage-04-engineering-autonomous-ai-agents/rag-and-tool-calling.md
  - edu-site/docs/stage-04-engineering-autonomous-ai-agents/multi-agent-systems.md
  - edu-site/docs/stage-04-engineering-autonomous-ai-agents/evaluations.md
  - edu-site/static/img/stage-01-spec-aware-vibe-engineering/{01..06}/.gitkeep
  - edu-site/static/.gitkeep
  - specs/001-book-foundation/tasks.md (updated with completed status)
  - history/prompts/001-book-foundation/0006-implement-mvp.implement.prompt.md
tests: []
---

## Prompt

/sp.implement (invoked by user; empty $ARGUMENTS). Execute the tasks in `specs/001-book-foundation/tasks.md`. MVP scope: Setup (T001–T004) + Foundational (T005–T010) + US5 (T011–T013) + US1 (T014–T017).

## Response snapshot

### Environment check
- Node v24.18.0, npm 11.16.0, git 2.54.0 — all present.
- `check-prerequisites.ps1` confirmed all 5 design docs are available.

### Phase 1 — Setup (T001–T004)
- **T001** ✓ `^3.7.0` pinned in `edu-site/package.json`.
- **T002** ✓ `onBrokenLinks: "throw"` in `docusaurus.config.ts`.
- **T003** ✓ `sidebars.ts` lists all 4 stages with Stage 1 expanded (19 `stage-` matches).
- **T004** ✓ `npm install` succeeded — 1276 packages, exit 0 (took ~3 min, ran in background).

### Phase 2 — Foundational (T005–T010)
- **T005** ✓ Created `.github/workflows/ci.yml` with Node 20 setup, `npm ci`, `npm run check:frontmatter`, `npm run typecheck`, `npm run build`, artifact upload.
- **T006** ✓ Created `edu-site/scripts/check-frontmatter.mjs` — validates required frontmatter keys (`sidebar_label`, `sidebar_position`, `title`, `description`, `chapter_state`); enforces `video_url` non-empty when `chapter_state=video-published`. Exits 1 on violations.
- **T007** ✓ Created `edu-site/src/components/ChapterState/index.tsx` — color-coded badge with three states (gray `placeholder`, blue `text-ready`, green `video-published`); unknown states render as a red alert.
- **T008** ✓ Created `edu-site/src/theme/MDXComponents.tsx` — overrides the default `h1` with `ChapterHeading` that auto-injects `<ChapterState />` above every chapter heading based on `frontMatter.chapter_state`. Module augmentation was attempted but caused `Duplicate identifier` errors — switched to a typed `as unknown` cast instead.
- **T009** ✓ Added `"check:frontmatter": "node scripts/check-frontmatter.mjs"` to `package.json`; chained it as a prebuild step in `"build"`.
- **T010** ✓ Created 6 chapter image directories under `static/img/stage-01-spec-aware-vibe-engineering/` and a `.gitkeep` in `static/`.

### Phase 3 — US5 Build & Deploy (T011–T013)
- **T011** ✓ `npm run build` exits 0 after fixing:
  - Frontmatter violations on `intro.md` and 9 stage 2-4 chapter files (added `chapter_state: "placeholder"` + `video_url: ""`).
  - Sidebar doc ID mismatch (Docusaurus strips numeric prefix from filenames; updated `sidebars.ts` to use `foundations` not `01-foundations`).
  - Duplicate `/` route conflict (removed `slug: /` from `intro.md`; the React `src/pages/index.tsx` is the canonical homepage).
  - Empty `static/` glob error (added `.gitkeep`).
  - Deprecated `onBrokenMarkdownLinks` config (migrated to `markdown.hooks.onBrokenMarkdownLinks`).
  - Broken footer links to `/stack` and `/spec` (removed; not features).
  - Broken cross-doc link to `../../history/adr/0001-free-tier-llm-choice.md` (rewrote as plain text reference; ADR is outside the docs plugin scope).
- **T012** ✓ `npm run typecheck` exits 0 after fixing:
  - `JSX.Element` namespace not found in React 18 (changed to `React.ReactElement`).
  - `chapter_state` not declared on `DocFrontMatter` (typed `as unknown` cast — module augmentation caused duplicate-identifier error).
- **T013** ✓ Added Vercel deployment section to `edu-site/README.md` covering: one-time Vercel setup with `Root Directory = edu-site`, atomic deploys (Q5), branch protection on `main` (CI required, no reviewers, admin can self-merge per Q2), custom domain (optional free), and the **How to contribute** section referencing Constitution v2.0.0 Principle III (co-authoring workflow).

### Phase 4 — US1 Read a Stage 1 Chapter (T014–T017) — verified via build artifacts
- **T014** ✓ `build/index.html` (12 KB) exists; React homepage is the entry point.
- **T015** ✓ `build/stage-01-spec-aware-vibe-engineering/index.html` exists.
- **T016** ✓ `build/stage-01-spec-aware-vibe-engineering/foundations/index.html` contains the literal "Placeholder — awaiting text" badge.
- **T017** ✓ All 6 Stage 1 chapters rendered: foundations (20K), core-programming (32K), frontend (28K), backend (28K), databases (28K), git-github (24K). Stages 2-4 also rendered (9 more chapters).

### Final build verification
```
Frontmatter validation passed ✓
Server: Compiled successfully in 3.42s
Client: Compiled successfully in 4.15s
[SUCCESS] Generated static files in "build".
```

## Outcome

- ✅ Impact: MVP scope (US5 + US1) is fully implemented and verified. Build + typecheck green. All 15 chapters render. CI gating in place. Vercel deploy documented. The textbook is ready for Phase B (when RAG/chatbot lands) without blocking on US4/US2/US3/Polish.
- 🧪 Tests: smoke-only (build + typecheck) per R-008 — both green.
- 📁 Files: 27 created/modified (full inventory above). `tasks.md` updated to mark T001–T017 as completed.
- 🔁 Next prompts:
  1. **Optional** — work T018–T020 (US4): author `01-foundations.mdx` end-to-end as a proof-run of the co-authoring workflow. Requires Claude Code writing the text + the project owner producing one image.
  2. **Optional** — T021–T023 (US2 + US3) verification.
  3. **Optional** — T024–T027 (Polish): README updates, Lighthouse a11y check, 3G load check.
  4. **Real-world verification** — run `npm start` in `edu-site/`, click through the homepage, Stage 1, and a chapter to confirm visual rendering (not just build artifacts).
- 🧠 Reflection: The implementation hit three classes of unexpected issues that the spec/plan hadn't anticipated:
  1. **Docusaurus auto-doc-IDs strip numeric prefixes** — sidebar config had to be re-derived. Worth a future ADR or R-XXX.
  2. **Docusaurus's `onBrokenLinks` doesn't see cross-plugin links** — references to `history/adr/*.md` resolve to 404. Solved by using plain text. Worth noting if the spec ever wants to expose ADRs as doc pages.
  3. **React 18 + JSX namespace** — `JSX.Element` is no longer globally available; `React.ReactElement` works. Caught by typecheck.
  All three were caught at build / typecheck time, not at runtime — exactly what FR-007 (`onBrokenLinks: "throw"`) and FR-013 (CI gating) are designed to do.

## Evaluation notes (flywheel)

- Failure modes observed:
  - Frontmatter validation surfaced 11 violations on first build — the validator works (good!).
  - Sidebar doc ID mismatch broke the second build — caught by Docusaurus's own validator.
  - TypeScript caught two errors after the first build — caught by `tsc` in CI.
  All three were "good failures" — the validators did their job.
- Graders run and results (PASS/FAIL): `npm run build` PASS (exit 0); `npm run typecheck` PASS (exit 0); frontmatter validator PASS (15 files, 0 violations).
- Prompt variant (if applicable): n/a — empty `$ARGUMENTS`.
- Next experiment (smallest change to try): open `edu-site/docs/stage-01-spec-aware-vibe-engineering/01-foundations.md` and the project owner can now paste lecture content into the placeholder sections, then set `chapter_state: "text-ready"` to demonstrate US4. The badge component will pick up the change automatically on the next build.
