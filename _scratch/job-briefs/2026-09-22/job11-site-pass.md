# Job 11: site structure pass, reader-page facts, changelog, final gate (T017 to T020)

Effort: max. Executor: DeepSeek V4.1 Flash. Planner and verifier: Claude.

Read first: "What changed" in `_scratch/job-briefs/2026-09-22/job10-curriculum-state.md`; T017 to T020 in `specs/011-curriculum-redesign/tasks.md` (the tasks you carry out); in `_scratch/job-briefs/2026-09-22/job5-inventory.md`, category C (site code, config and ledgers), every `edu-site/docs/` reader-page entry, and §G (stragglers, including the root `README.md`). The owner confirmed on 22 September that the other session has finished with `edu-site/sidebars.ts`.

## Ground rules
- Live repository C:/Users/Dell/Desktop/Book only. Never read or write anything under `.claude/worktrees/`. No git commands.
- Before editing a file, copy it byte-for-byte to `_scratch/backup-2026-09-22-agentic-inside-se-6/` under the same relative path (never overwrite an existing backup). Folders are moved as they are; list every moved file, old path and new path, in `_scratch/backup-2026-09-22-agentic-inside-se-6/MOVES.txt`.
- Keep each file's line endings and encoding. Minimal edits in each file's own voice and code style; no unrelated refactoring.
- Never hand-edit generated files (`chapterManifest.ts`, `search-index.json`); the build regenerates them.
- Leave alone: the wording of every CS50 or Harvard promise (the owner postponed it); dated records (`history/**`, `curriculum-state/proposals/**`, dated notes); folder and skill names under `.claude/`.
- If the shell tool times out on a long command, run it with its output redirected to a log file and poll the log.

## Step 0: baseline
In `edu-site/`, run `npm run build`, `npm run typecheck` and `npm run lint`, and record each result (pass, or the exact errors). Failures that exist before your changes are not yours to fix; report them.

## Step 1: T017, the site structure (inventory category C)
1. Move `edu-site/docs/stage-02-credentials/` to `edu-site/parked/credentials-track/`, out of the published docs. Then rename `edu-site/docs/stage-03-sde-mastery-ai-native/` to `edu-site/docs/stage-02-sde-mastery-ai-native/`.
2. Update every reference to the old paths, doc ids and URLs: `sidebars.ts`, `docusaurus.config.ts` (the footer), the five hand-written stage lists, the stage icons, `SiteDrawer`, `AppleSpotlight`, `DocSidebarItem/Category`, `StageCard`, the DataViz components, `custom.css`, any script under `edu-site/scripts/` that names stage folders or stage numbers, the frontmatter and links inside the moved chapters (a stage number 3 on the AI-native pages becomes 2), links in other docs, and the folder paths in `curriculum-state/ledgers/**`. Follow each ledger's own schema; point the Credentials entries at their parked paths, or, if the checks accept only published paths, handle them the way the schema allows, and say how.
3. The stage lists show three stages: 0 Introduction to SDE, 1 SDE Mastery (AI-Driven), 2 SDE Mastery (AI-Native). Credentials is not a stage and does not appear in them.
4. Each stage keeps the look of its content: the AI-native stage keeps its own icon and colour, now under number 2 (so `--tbb-stage-2` takes the AI-native colour). Remove the tokens, icons and styles that only Credentials or stage numbers 3 and 4 used, once nothing references them.
5. A published page that links to a Credentials page keeps its words; only the link is removed. List each one.
6. Update the folder paths job 9 left: `CLAUDE.md` (the "Real stage folders today" bullet: drop "pending a renumber"; Credentials now lives in `edu-site/parked/credentials-track/` and is not published), `PROJECT-MAP.md`, `.claude/skills/bridge-balance-project-guide/reference/project-map.md`, `edu-site/README.md`.

## Step 2: T018, minimal fact fixes on the reader pages
The reader pages the inventory lists (the welcome page, the FAQ, the Stage 0 introduction, and `edu-site/docs/ch02-programming-is-born.md` line 74, "Stages 3 and 4"), plus the repository root `README.md` ("5 stages", "Stages 0–4" and its status table). Fix only the stage facts, in each page's own voice: plain, warm English, short sentences, nothing that assumes the reader has programmed. CS50 promises stay word for word.

## Step 3: T019, one changelog entry
Add one entry dated 22 September 2026 to `edu-site/docs/changelog.md`, in that file's own format: the course now has three stages (name them); agentic AI is taught inside software engineering instead of as a stage of its own; the CS50 credential pages are off the site while the Credentials track is redesigned. Nothing else, and no promise withdrawn.

## Step 4: T020, the final gate
1. `npm run build` green; `npm run typecheck` and `npm run lint` no worse than the baseline; `node scripts/check-chapter.mjs` clean.
2. A repository-wide grep (skip `_scratch/`, `history/`, `.claude/worktrees/`, `node_modules/`, `build/`, `.docusaurus/`) for `stage-03-sde-mastery-ai-native`, `stage-02-credentials`, `stage-03`, `stage-04`, "Stages 0–4", "five stages", "four stages", "Stage 3", "Stage 4". Every remaining hit must be a dated record, a CS50 promise or a parked path; group them by reason.
3. In `specs/011-curriculum-redesign/tasks.md` (back it up first), mark T017 to T020 done, each with a one-line evidence note, and tick the boxes this satisfies. Change nothing else.

## Step 5: the Agenda page, last
Wait until the file `_scratch/job-briefs/2026-09-22/agenda/job13.done` exists (check once a minute for up to 30 minutes; if it never appears, skip this step and say so). Then copy `_scratch/job-briefs/2026-09-22/agenda/index.html` to `agenda/index.pre-job11.html` and edit `index.html`: content edits only, under the "Ground rules" of `_scratch/job-briefs/2026-09-22/job8b-agenda-refresh.md`.
- The header time and the tally.
- "Where we are": steps 4 and 5 become Done; the paragraph says all five steps are done (keep the closing line about the redesign).
- "One by one": remove the rows for the site pass, the reader-page fixes and the changelog entry.
- "Done today": add at the top one row each for the site structure, the reader pages and README, the changelog entry, and the final gate, with real numbers (files changed, what moved, the build result).

## Report (at most 45 lines)
Baseline and final results for build, typecheck and lint; every file changed or moved, grouped; the links removed; the remaining grep hits by reason; anything you could not do.
