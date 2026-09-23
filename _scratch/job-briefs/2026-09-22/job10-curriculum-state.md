# Job 10: curriculum-state (inventory category B) and the second-pass task list

Effort: max. Executor: DeepSeek V4.1 Flash. Planner and verifier: Claude.

## What changed (all decided 22 September 2026; the record is `curriculum-state/canon/course-structure.md`, CS-12 to CS-33)
- Three stages: Stage 0 Introduction to SDE; Stage 1 SDE Mastery (AI-Driven), basic to intermediate SE with basic to intermediate agentic applications; Stage 2 SDE Mastery (AI-Native), advanced SE with advanced agentic applications. There is no Stage 3 or Stage 4.
- Agentic AI is taught inside SE, across Stages 1 and 2, never as its own stage. Old Stage 3's material (coding agents, prompt and context engineering) is Stage 1's working medium; old Stage 4's material belongs to Stage 2.
- Credentials (CS50P, CS50W, future third-party credentials) is a parallel track, not a stage, and is switched off for now (CS-16). The CS50 integrity floor stays absolute, word for word.
- The zero-knowledge floor covers Stages 0–1 (CS-31). Job 7 already changed every floor statement in `curriculum-state/canon/`. Do not redo those edits: check each file's current text first.

## Ground rules
- Live repository C:/Users/Dell/Desktop/Book only. Never read or write anything under `.claude/worktrees/`. No git commands.
- Before editing a file, copy it byte-for-byte to `_scratch/backup-2026-09-22-agentic-inside-se-4/` under the same relative path. Never overwrite a backup that already exists.
- Keep each file's line-ending style and encoding.
- Minimal edits, in each file's own voice. Don't restructure or rewrite sections.
- In a binding rule, fix the statement and keep the old wording visible as superseded, with a short dated note (22 September 2026), the way job 7 did it in `corrections.md`. In a dated record (a research note, a proposal, a history entry), never rewrite the body: add one dated note at the top or right after the entry saying what changed.
- Leave alone, and list in your report: every CS50 or Harvard promise (the owner postponed that decision); literal stage folder paths such as `stage-02-credentials/` or `stage-03-sde-mastery-ai-native/` (the site pass renames the folders and updates every path); `curriculum-state/ledgers/**` (the site pass updates them with the folder paths); `curriculum-state/proposals/**` and `history/**`; folder and skill names; `course-structure.md`, `thesis.md` and `naming.md` (already done).

## Part 1: the category B files
Read `_scratch/job-briefs/2026-09-22/job5-inventory.md`, section "B. `curriculum-state/**`", including its "No hits" list. Then fix every stale stage statement it lists that is still present:
- `curriculum-state/README.md`
- `canon/integrity-floor.md`: its "Stage 2" labels that mean CS50 now mean the Credentials track. Change the label only, never a word of the floor itself, and add one dated note saying the label changed and why (CS-16).
- `canon/research-and-comparison.md`, `canon/corrections.md`, `canon/audience.md`, `canon/voice.md`: only the stale stage references job 7 left (job 7 did the floor wording).
- `contracts/calibration.md` (around line 76)
- `research/stage-0/cluster-7-language-landscape.md`: a research record, so a dated note only.

## Part 2: the second-pass task list
Append one new section at the end of `specs/011-curriculum-redesign/tasks.md`, in the file's own task format: "Second pass (22 September 2026): the three-stage structure". Don't touch T001–T012 or their halt notes. Give each task a status and its acceptance checks as checkboxes:
- T013 The canon record of the three-stage decision. Done: CS-12 to CS-33 in `course-structure.md`, plus thesis.md and naming.md; PHRs 0135 to 0138.
- T014 The inventory of stale stage references. Done: `_scratch/job-briefs/2026-09-22/job5-inventory.md`.
- T015 Agent instructions and project docs (inventory category A), with the constitution's MINOR version bump. In progress.
- T016 curriculum-state (inventory category B). Mark it done only after Part 1 passes the verification below.
- T017 The site structure pass (inventory category C). Rename `edu-site/docs/stage-03-sde-mastery-ai-native/` to `stage-02-sde-mastery-ai-native/`. Move `edu-site/docs/stage-02-credentials/` out of the published docs to `edu-site/parked/credentials-track/`. Change the five hand-written stage lists together (take their exact files from category C of the inventory), plus the stage icons, the `--tbb-stage-3` and `--tbb-stage-4` tokens in `custom.css`, and the folder paths in `curriculum-state/ledgers/**`. Generated files (`chapterManifest.ts`, `search-index.json`) are rebuilt by `npm run build`, never hand-edited. Blocked: waits for the owner to confirm that another session has finished editing `edu-site/sidebars.ts`. Acceptance: `npm run build` green; no link or path points to an old stage folder.
- T018 Minimal fact fixes on the reader pages the inventory lists (the welcome page, the FAQ, the Stage 0 introduction, and `edu-site/docs/ch02-programming-is-born.md` line 74, "Stages 3 and 4"). CS50 promises stay untouched. After T017.
- T019 One changelog entry in `edu-site/docs/changelog.md`: agentic AI moves inside SE, and the course goes from four stages to three. After T017 and T018.
- T020 The final gate: `npm run build` green, `node scripts/check-chapter.mjs` clean, and a repository-wide grep for the old stage names where every remaining hit is a dated record, a CS50 promise or history.

## Verify, then report
1. Re-grep the category B files for: Stages 0–2, Stages 0 to 2, Stages 3–4, Stages 3 and 4, five stages, five-stage, four stages, four-stage, Stage 3, Stage 4, CS50 Certification, Mastering AI Coding Agents, Engineering Autonomous AI Agents, and "Stage 2" used for CS50. Every remaining hit must be a dated record, a CS50 promise, a folder path, or a superseded wording kept visible on purpose.
2. Compare every edited file with its backup: no line lost outside the intended edits, line endings and encoding kept.
3. Final message, at most 40 lines: each changed file with a one-line summary; the new task ids; the remaining hits grouped by reason.
