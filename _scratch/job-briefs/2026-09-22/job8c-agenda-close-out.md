# Job 8c: Agenda page close-out, two task-list fixes, and prompt record 0139

Effort: high. Executor: DeepSeek V4.1 Flash. Planner and verifier: Claude.

Live repository C:/Users/Dell/Desktop/Book only. Never read or write anything under `.claude/worktrees/`. No git commands. Keep every file's line-ending style and encoding.

## Part A: the Agenda page, `_scratch/job-briefs/2026-09-22/agenda/index.html`
The page is the project owner's main dashboard. The same ground rules as `_scratch/job-briefs/2026-09-22/job8b-agenda-refresh.md` apply (read its "Ground rules" section): content edits only inside `<main>`, the page's existing classes and state marks, the page's voice ("I" speaking to the owner, plain and warm, no job numbers), facts copied exactly. First copy the current file byte-for-byte to `agenda/index.job8b.html` (skip if that file exists).
1. Header: set the "Updated 22 September 2026, HH:MM" time to the current local time (24-hour clock). Recount the tally from the finished page.
2. "Where we are": step 2 becomes Done, text "The rules the agents follow: CLAUDE.md, the project map, the skills and the constitution now describe three stages." Step 3 becomes Done, text "The rest of curriculum-state, and the task list for this second pass (T013 to T020 in specs/011)." Steps 4 and 5 keep their state. In the paragraph above the list, replace "Right now the project's files are being brought in line with that decision, in five steps." with "The project's files are being brought in line with that decision, in five steps. Steps 1 to 3 are done. Step 4 waits for your answer."
3. "One by one": remove the rows "Sweep the agent instructions and project docs" and "The rest of curriculum-state". In "Minimal fact fixes on the reader pages", add to its list: "and the repository's own README.md, which still says “5 stages” and “Stages 0–4”". Update the section's count and intro sentence.
4. "Done today": add these three rows at the top, in this order, each marked Done:
   - "The rules the agents follow now describe three stages": "21 files: CLAUDE.md, PROJECT-MAP.md, stack.md, edu-site/README.md, the project-guide skill with its four protocols, and the writing skill with six of its reference files. The constitution is now version 3.1.0 (a MINOR change, amended 22 September): Principle IX's floor says Stages 0–1, and the CS50 integrity floor is now labelled the Credentials track, with every word of the floor kept. CS50 promises and folder paths were left alone on purpose. I read the CLAUDE.md changes line by line, and its new chapter-status line matches the files on disk. Backup: _scratch/backup-2026-09-22-agentic-inside-se-3/."
   - "The rest of curriculum-state": "The README now says three stages. The integrity floor's seven “Stage 2” labels now say the Credentials track, and not a word of the floor itself changed. The research-and-comparison policy, the calibration contract and §8 of corrections.md are fixed, each with a dated note, and one research note has a dated note at the top. Backup: _scratch/backup-2026-09-22-agentic-inside-se-4/."
   - "The task list for this second pass": "T013 to T020, at the end of specs/011-curriculum-redesign/tasks.md. T013 to T016 are done. T017, the site pass, waits for your answer; T018 to T020 follow it."

## Part B: two fixes in `specs/011-curriculum-redesign/tasks.md`
First copy the file byte-for-byte to `_scratch/backup-2026-09-22-agentic-inside-se-5/specs/011-curriculum-redesign/tasks.md` (never overwrite an existing backup). Then, inside the section "Second pass (22 September 2026): the three-stage structure" only, in that section's own format:
1. T015 becomes done: 21 files in inventory category A updated, the constitution 3.0.2 → 3.1.0 (MINOR, amended 2026-09-22), backups in `_scratch/backup-2026-09-22-agentic-inside-se-3/`; tick its acceptance boxes that this satisfies.
2. T018: add the repository root `README.md` ("5 stages", "Stages 0–4" and its status table) to its list of files. Its "2 Harvard certificates" wording is a CS50 promise and stays untouched.
Change nothing else in the file.

## Part C: prompt record 0139
Create `history/prompts/general/0139-continue-after-the-command-code-update.general.prompt.md` from the template `.specify/templates/phr-template.prompt.md`, filling every placeholder. If id 0139 is already taken in `history/prompts/general/`, stop and report instead of writing.
- id 0139; title "Continue after the Command Code update"; stage general; date 2026-09-22; surface agent; model claude-opus-5-5; feature 011-curriculum-redesign; user Afnan Zahed; command none (a plain chat message); labels ["agenda","command-code","three-stage-structure","status"]; links: spec specs/011-curriculum-redesign/spec.md, others null.
- files: CLAUDE.md; PROJECT-MAP.md; stack.md; edu-site/README.md; .specify/memory/constitution.md; nine files under .claude/skills/bridge-balance-project-guide/; seven files under .claude/skills/lesson-spine-authoring/; curriculum-state/README.md; curriculum-state/canon/integrity-floor.md; curriculum-state/canon/research-and-comparison.md; curriculum-state/canon/corrections.md; curriculum-state/contracts/calibration.md; curriculum-state/research/stage-0/cluster-7-language-landscape.md; specs/011-curriculum-redesign/tasks.md; _scratch/job-briefs/2026-09-22/agenda/index.html.
- tests: none run by the build; checks were backup diffs, line-ending and encoding checks, and re-greps for the old stage names.
- The prompt text is the text between the two marker lines below, copied character for character (keep its spelling exactly as written):
=====PROMPT START=====
the command code was auto updating. now it's done. you continue whats remaining, and note that the artifact is the main tool for me to understand what we werer doing, what we are going, what's done and what left and what's plan etc. so keep it update
=====PROMPT END=====
- Response text (use as written): "Command Code's self-update (1.62.1 → 1.63.0) had interrupted three DeepSeek runs. Two had already finished their work (the canon follow-up and the Agenda update); their records were recovered from Command Code's own session logs and verified. The third, the agent-docs sweep, resumed from its turn limit and finished: 21 files, constitution 3.1.0. The curriculum-state sweep ran and wrote tasks T013–T020. The Agenda gained a 'Where we are' block, was refreshed to the verified state and republished; it is now updated after every step. Waiting on the owner: whether another session has finished with sidebars.ts (blocks the site pass), and a yes or no on an ADR for 'agentic AI inside SE'."
- Outcome: impact "the project's instructions, canon and task list now describe three stages; the owner's dashboard is current"; next prompts "the owner's answers on sidebars.ts and the ADR; then the site structure pass (T017)"; reflection "never edit a runner script while a run is using it".

## Verify, then report
1. Part A: every tag inside `<main>` balanced; everything before `<main>` and after `</main>` byte-identical to `index.job8b.html`; the tally matches a count of the marks.
2. Part B: a diff against the backup shows changes only in the T015 and T018 entries.
3. Part C: the prompt text is an exact substring of the new file; no `{{...}}` placeholder is left.
4. Final message, at most 30 lines: the page outline (headings, and each row title with its state), and what changed in parts B and C.
