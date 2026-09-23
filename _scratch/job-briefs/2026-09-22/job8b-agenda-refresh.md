# Job 8b: bring the Agenda page up to date, and add "Where we are"

Effort: high. Executor: DeepSeek V4.1 Flash. Planner and verifier: Claude.

The file: `_scratch/job-briefs/2026-09-22/agenda/index.html` (live repository C:/Users/Dell/Desktop/Book). It is the project owner's main dashboard for what we were doing, where we are going, what is done, what is left and what the plan is. Job 8 already updated it this morning; this job refreshes it to the state below. Never read or write anything under `.claude/worktrees/`. No git commands.

## Ground rules
- First copy the current file byte-for-byte to `agenda/index.job8.html` (skip the copy if that file already exists). Never touch `agenda/index.original.html`.
- Content edits only, inside `<main>`. Reuse the page's existing markup patterns and classes: the row markup of "One by one", and the state marks `mark--run` / `pill--run` (In progress), `mark--wait` / `pill--wait` (Waiting on you), `mark--queue` / `pill--queue` (Queued), `mark--park` / `pill--park` (Parked), `mark--done` / `pill--done` (Done).
- If the new "Where we are" block needs a little CSS, add it at the end of the existing `<style>` block, using only the page's existing custom properties (no new colours, fonts, scripts or external links). It must work in light and dark themes and at 400px width.
- Voice: the page speaks as "I" (Claude) to the owner. Plain, warm, direct English; short sentences; no job numbers; no unexplained jargon. Copy the facts below exactly: names, numbers, file paths, ids.
- Everything not named below stays exactly as it is.

## 1. The header
- "Updated 22 September 2026" becomes "Updated 22 September 2026, HH:MM" with the current local time (24-hour clock, from the system clock).
- In the intro paragraph, keep "Nothing new starts until you say so." and add after it: "I update this page after every step."
- Recount the tally from the finished page (in progress, tasks in the queue, questions for you, done today). Keep its wording pattern.

## 2. New section "Where we are", placed after the header and before "One by one"
Heading: "Where we are". Then this paragraph:
"This morning you decided that agentic AI is taught inside software engineering, and that the course has three stages: Stage 0 Introduction to SDE, Stage 1 SDE Mastery (AI-Driven) and Stage 2 SDE Mastery (AI-Native). Credentials becomes a separate track, switched off for now. Right now the project's files are being brought in line with that decision, in five steps."
Then an ordered list of five steps, each carrying its state mark:
1. Done. The record: the decision, the three stages and the Stages 0–1 floor are written into the canon files.
2. In progress. The rules the agents follow: CLAUDE.md, the project map, the skills and the constitution. 13 files are done; the rest is running now.
3. In progress. The rest of curriculum-state, and the task list for this second pass (written into specs/011).
4. Waiting on you. The website's structure: the stage folders, the sidebar, the five stage lists and the icons. It needs your answer about the other session first.
5. Queued. The facts on the reader pages, and one changelog entry. After step 4.
Close with one line: "After these five steps, the redesign itself goes on: see “Redesign the whole curriculum” below."

## 3. "One by one"
- Remove the rows "The canon follow-up" and "The inventory of old stage structures" (they move to "Done today", see 6).
- New row order: "Sweep the agent instructions and project docs"; the new row "The rest of curriculum-state"; "The second structure pass on the site"; "Minimal fact fixes on the reader pages"; "A changelog entry"; "Redesign the whole curriculum"; then every other row in its current order. Update the section's count and intro sentence to match.
- "Sweep the agent instructions and project docs": In progress. Text: "13 files are done: CLAUDE.md, PROJECT-MAP.md, stack.md, the project-guide skill with its four protocols, and the writing skill's main file. Still to do: the constitution (a MINOR version bump), the writing skill's reference files, the .specify templates and the two READMEs. It stopped at Command Code's 100-turn limit and is now carrying on from where it stopped."
- New row "The rest of curriculum-state": In progress. Text: "The curriculum-state README, the calibration contract and one research note. The integrity floor's “Stage 2” label now means the Credentials track; the floor's own words stay exactly as they are. The task list for this second pass goes into specs/011-curriculum-redesign/tasks.md as T013 to T020."
- "The second structure pass on the site": Waiting on you. Keep its current text and add: "It also changes the five hand-written stage lists together, the stage icons, the stage colours in custom.css and the folder paths in the ledgers. It waits for your answer: is the other session finished with sidebars.ts?"
- "Minimal fact fixes on the reader pages": Queued. Add to its list: "ch02-programming-is-born.md, line 74 (“Stages 3 and 4”)". Starts: after the site pass.
- "A changelog entry": Queued. Starts: after the reader-page fixes.

## 4. "Waiting for you"
- Keep "Is the other session finished?" and add: "The site pass (step 4) edits sidebars.ts too, so it waits for your yes."
- Keep "Record the decision as an ADR?" as it is.
- Move "The design of the Credentials track" out of this section (see 5). Update the section's count.

## 5. "Parked on purpose"
Add a row "The design of the Credentials track", Parked: "Postponed by you on 22 September. Until you pick it up again, the CS50 promises on the reader pages stay exactly as they are. Wakes: when you pick Credentials up again."

## 6. "Done today": add these four rows at the top, in this order, each marked Done
1. "Command Code updated itself during three runs": "It moved from version 1.62.1 to 1.63.0 in the middle of the work. Nothing was lost. Two runs had already finished, and I recovered their full record from Command Code's own logs. The third stopped at Command Code's 100-turn limit and is carrying on from where it stopped. The runner now waits out an update, allows 300 turns, and can resume a stopped run."
2. "The canon follow-up": "The zero-knowledge floor now says Stages 0–1 in six canon files: course-structure, thesis, audience, voice, integrity-floor and corrections. The old wording stays visible, marked as superseded. Three new decisions are recorded: CS-31 (the floor), CS-32 (every pairing names what is new in its agentic version) and CS-33 (no separate SDK-specific Parts). Questions CS-Q7 and CS-Q9 are marked answered. Backup: _scratch/backup-2026-09-22-agentic-inside-se-2/."
3. "Your four messages from today, recorded word for word": "Prompt records 0135 to 0138. Three duplicate records were moved to _scratch/removed-2026-09-22/, not deleted."
4. "The inventory of old stage structures": "About 500 lines, in _scratch/job-briefs/2026-09-22/job5-inventory.md, sorted into six groups. It found five hand-written stage lists in the site code that must change together, so the site pass changes them in one go."

## 7. "Small chores for you"
In the row "Save the later work of 21 September to GitHub", add at the end: "Everything from 22 September is not saved there yet either."

## Verify, then report
1. Every tag inside `<main>` is balanced (count opening and closing tags for main, section, div, ol, ul, li, p, h1 to h4, span, a, strong, em, table, tr, td, th).
2. Everything before `<main>` is byte-identical to `index.job8.html` apart from any CSS appended to the `<style>` block; everything after `</main>` is byte-identical.
3. The tally numbers match a count of the marks on the finished page.
4. Final message, at most 40 lines: the new outline (each heading, and each row title with its state) and any fact you could not place.
