# Plan 011 — Stage Structure Landing

How the requirements in `spec.md` are met. Every mechanical step is executed by DeepSeek V4.1 Flash through Command Code (`cmdc`) at `--effort high`; Claude plans it, writes the reader-facing text, audits the tool trace, and signs off. Owner's routing decision, 2026-09-22.

## 1. The rename map — the one source of truth for this slice

| Old (live today) | New (decided in canon) |
|---|---|
| Stage 0 — Introduction to Computing: From Switches to AI Agents (docs root) | **Stage 0 — Introduction to SDE** (docs root, unchanged files) |
| Stage 1 — Spec-Aware Vibe Engineering Foundations · `stage-01-spec-aware-vibe-engineering/` | **Stage 1 — SDE Mastery (AI-Driven)** · `stage-01-sde-mastery-ai-driven/` — merged with old Stage 3 |
| Stage 2 — Credible Validation Through International Certification · `stage-02-cs50-certification/` | **Stage 2 — Credentials** · `stage-02-credentials/` |
| Stage 3 — Mastering AI Coding Agents · `stage-03-mastering-ai-coding-agents/` | **retired** — its four chapter placeholders join Stage 1 |
| Stage 4 — Engineering Autonomous AI Agents · `stage-04-engineering-autonomous-ai-agents/` | **Stage 3 — SDE Mastery (AI-Native; Agentic AI)** · `stage-03-sde-mastery-ai-native/` |

Retired folders are backed up to `_scratch/backup-2026-09-22-stage-rename/` before deletion. Only placeholder scaffolding is deleted; no authored prose exists in any of them.

## 2. File groups and what changes in each

**A. Folders** — copy the currently-wired chapter files from the old folders over their counterparts in the two merge folders (the live files are the ones the gate already passed), rename `stage-02-cs50-certification` → `stage-02-credentials`, then delete the three retired folders.

**B. Stage index pages** — exact text in the task brief: Stage 1's index is kept as it is; Stage 2's index is retitled to "Credentials"; Stage 3's index has its stale `Stage 4` H1 and body lines corrected.

**C. Ledgers** — `prerequisite-graph.yaml`: paths, stage numbers, positions, ids and the `progress:` breakdown. Ids: old `s3-*` become `s1-*` (four rows), old `s4-*` become `s3-*` (four rows), old `s3-index` is retired with `path: null` and a note. `term-ledger.yaml` needs no change (every `first_introduced` is `null` today) — verified before editing. Any `path:`/`used_in:`/`first_defined:` value in any ledger naming a retired folder is repointed; dated historical comments are left alone.

**D. Site code** — `sidebars.ts`, `src/lib/stages.ts`, `docusaurus.config.ts` (footer), `src/pages/index.tsx` (stage cards + inline CTA), `src/pages/404.tsx`, `src/components/HomepageHero/index.tsx`. `src/data/chapterManifest.ts` and `static/search-index.json` are generated — never hand-edited; the build regenerates them.

**E. Scanned docs** — `CLAUDE.md`, `PROJECT-MAP.md`, `stack.md`, `edu-site/README.md`, `history/reports/PROJECT-REPORT.md`, `history/reports/INSTALL.md`, `.claude/skills/**`, `curriculum-state/**` (see the task brief for the exact replacement list). `history/prompts/`, `specs/` and `_scratch/` are deliberately not scanned and are not rewritten — they are dated records.

**F. Reader-facing corrections** — `welcome.md` (stage table, "five" claims, FAQ anchor), `faq.md` (the stages question and its heading anchor), `ch00-introduction.md` ("first of five stages"), `code-of-conduct.md` ("five-stage curriculum"), plus a new changelog entry. Claude writes this text; DeepSeek applies it verbatim.

## 3. Contracts

- **Routes:** `/stage-01-sde-mastery-ai-driven/`, `/stage-02-credentials/`, `/stage-03-sde-mastery-ai-native/`.
- **Sidebar labels (full names):** as in the rename map.
- **`STAGE_LINKS` labels:** `Stage 0 — Introduction to SDE`, `Stage 1 — SDE Mastery (AI-Driven)`, `Stage 2 — Credentials`, `Stage 3 — SDE Mastery (AI-Native)`.
- **`StageNumber`:** `0 | 1 | 2 | 3`; `stageNumberFromRoute` matches `/stage-0([0-3])`.
- **Ledger stage numbers:** Stage 0 = the docs-root rows; Stage 1 = 11 rows (1 index + 10 chapters); Stage 2 = 3 rows; Stage 3 = 4 rows.

## 4. Constraints

- No git command of any kind (`CLAUDE.md`: no branches, no commits).
- No chapter prose authored or edited.
- D5 holds: nothing in this slice states or implies a fixed chapter list or count below the stage level.
- Corrections canon first: `curriculum-state/canon/corrections.md` was read before any editing, and the model-routing answer for this workstream is recorded (§19).
- Smallest viable diff: a sentence that does not mention a stage name, a count, or a path is left exactly as it is.

## 5. Verification (all run for real, output read)

1. `cd edu-site && node scripts/check-references.mjs`
2. `node scripts/check-frontmatter.mjs`
3. `node scripts/check-chapter.mjs`
4. `npm run build` (the full five-gate chain)
5. Repo-wide grep for the four retired slugs and five retired stage names over the scanned paths — expected: zero, apart from dated notes kept on purpose.
6. Every reader-facing diff read by hand by Claude, against the trace's literal `old_string`/`new_string`.

## 6. Risks and their controls

| Risk | Control |
|---|---|
| Broken route from a stale link | `onBrokenLinks: "throw"` fails the build loudly; the grep in step 5 finds what the build cannot see (docs, ledgers). |
| A folder deleted before its content is safe | Backup first; copy the wired files into the merge folders before deleting anything. |
| DeepSeek writing outside the brief (it has fabricated records before) | Trace audit: every `tool_use` name and path checked against the brief's file list before the result is accepted. |
| Ledger arithmetic wrong | Counts recomputed from the file by the executor and re-verified by Claude against the ledger's own total (15 lesson rows, 5 authored) — unchanged by this slice. |
| URL churn on a live site | Only placeholder pages change URL; no text-ready chapter is touched except the four named corrections. |
