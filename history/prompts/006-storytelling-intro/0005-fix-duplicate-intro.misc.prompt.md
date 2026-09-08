---
id: 0005
title: Remove duplicate introduction page
stage: misc
date: 2026-08-19
surface: agent
model: opus
feature: 006-storytelling-intro
branch: 006-storytelling-intro
user: Dell
command: (mid-implementation user instruction — "there are 2 introductions. why? Fix it")
labels: [fix, sidebar, duplicate, cleanup]
links:
  spec: specs/006-storytelling-intro/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - edu-site/docs/introduction.md (DELETED)
  - edu-site/sidebars.ts (removed stale "introduction" entry)
  - edu-site/static/search-index.json (regenerated — 21 records, no /introduction entry)
tests:
  - edu-site/docs/introduction.md does not exist
  - sidebars.ts contains only "intro" (no "introduction")
  - search-index.json records = 21 (down from 22)
  - built route /intro/index.html exists; /introduction/index.html does NOT
  - docusaurus build completes successfully
---

## Prompt

> Now, there are 2 introductions. why? Fix it

## Response snapshot

- **Diagnosis**:
  - `edu-site/docs/intro.md` (sidebar_position 0, sidebar_label "Introduction") — the story-driven 30-minute Introduction rewritten in T007–T012.
  - `edu-site/docs/introduction.md` (sidebar_position 1, sidebar_label "Welcome") — the short landing card with brief "What this is" + four-stages list + conventions. Out of scope in the original spec, but functionally a second introduction in the sidebar.
  - The story-driven `intro.md` already absorbs every useful piece of the Welcome card: the four-stage syllabus (Bridge beat), the who-this-is-for table (CTA beat), and the conventions implicit in the prose. The Welcome card therefore duplicated what the deep read now contains.
- **Fix applied**:
  - Deleted `edu-site/docs/introduction.md`.
  - Removed the stale `"introduction"` entry from `edu-site/sidebars.ts` so Docusaurus stops looking for the deleted document id (which had been producing `Invalid sidebar file at "sidebars.ts"` after the delete).
  - Regenerated `edu-site/static/search-index.json` (21 records, down from 22; the prior index still contained the `/introduction` route and the old title).
  - Re-ran `npx docusaurus build` — clean compile, `build/intro/index.html` exists; `build/introduction/index.html` does NOT.
- **Verification**:
  - One intro page exists in the sidebar (`"intro"` only).
  - One intro page in the search index (route `/intro`, title *"Introduction: The Bridge Between Code and Engineering"*).
  - Built site has `/intro/index.html` and no `/introduction/`.

## Outcome

- ✅ **Impact**: the duplicate introduction that the user noticed is removed from the sidebar, the search index, and the build output. The reader now sees exactly one Introduction in the sidebar at position 0 — the story-driven one.
- 🧪 **Tests**: 1 intro page in source · 1 sidebar entry · 1 search record · 1 built route · docusaurus build green.
- 📁 **Files**: `edu-site/docs/introduction.md` (deleted) · `edu-site/sidebars.ts` (1 line removed) · `edu-site/static/search-index.json` (regenerated).
- 🔁 **Next prompts**: push the branch and open a PR (`/sp.git.commit_pr`).
- 🧠 **Reflection**: The diagnostic worth recording — deleting the file alone was not enough; the sidebar config still referenced the deleted document id, so the build broke in a different place. This is the second time in the feature (after the create-new-feature.ps1 prompt-bind bug and the cross-page token delta) that the *visible* fix (delete) revealed a *latent* coupling (sidebar reference). For content features in Docusaurus, deletion requires three coordinated edits: the file, the sidebar, and the regenerated index. Worth recording as a future `spec`/`plan` note: any future deletion of a doc-page must touch all three.

## Evaluation notes (flywheel)

- **Failure modes observed**:
  1. PowerShell `Set-Location` did not persist into the next Bash invocation; running `node scripts/generate-search-index.mjs` from the wrong directory produced `MODULE_NOT_FOUND` for `C:\Users\Dell\Desktop\Book\scripts\generate-search-index.mjs`. Fixed by `cd "C:/Users/Dell/Desktop/Book/edu-site"` in the same Bash call.
  2. Docusaurus's `checkSidebarsDocIds` validator surfaced the stale sidebar reference with a helpful list of "Available document ids" — using that list to confirm `intro` was already there meant the only required edit was the single `,` removal in `sidebars.ts`.
- **Graders run and results (PASS/FAIL)**:
  - Sidebar lists one intro: **PASS**
  - Search index lists one intro: **PASS**
  - Built route exists for /intro: **PASS**
  - Built route does NOT exist for /introduction: **PASS**
  - Docusaurus build: **PASS**
- **Prompt variant (if applicable)**: n/a
- **Next experiment (smallest change to try)**: When the project owner pushes the branch, the README/PR description should explicitly call out the duplicate-intro fix so reviewers do not re-add the welcome page on the next feature.