# Job 4 — Write the 22 September "Agentic AI inside SE" decision into canon

Effort: max. Executor: DeepSeek V4.1 Flash. Planner and verifier: Claude.

## Ground rules (absolute)
- Live repository C:/Users/Dell/Desktop/Book only. Never read or write anything under `.claude/worktrees/`. No git commands.
- You may modify only the files listed under "Files in scope". You may create only the backup copies described next. If you notice a stale statement anywhere else, list it in your report; a separate job handles the rest of the repo.
- Before editing a file, copy it byte-for-byte to `_scratch/backup-2026-09-22-agentic-inside-se/` under the same relative path. There is no version control; these copies are the only rollback.
- Keep each file's existing line-ending style (most files here use CRLF) and encoding (UTF-8 without BOM). Lines you add must match the file's style.
- Never delete a superseded decision. This repo marks old decisions superseded and keeps their text.
- Invent nothing. Every sentence you add must trace to the decision payload. Write no chapter list, chapter count or lesson order anywhere (locked decision D5).

## The decision payload
`_scratch/job-briefs/2026-09-22/agentic-inside-se-decisions.md` is the owner-approved record. Read it in full before anything else. Its tables (Decisions, Pairing types, Topic sketch) and the owner's rule above the sketch must reach the canon with the same rows and the same meaning. You may change markdown formatting to fit the target file, nothing else.

## Files in scope

### 1. curriculum-state/canon/course-structure.md
Read it in full first and learn its conventions: section numbers, CS-n decision ids, CS-Qn open questions, the §7 action table, the §8 changelog.
a. Record the new decisions under new CS-n ids that continue the file's numbering, at the granularity the file already uses. Include the payload's idea paragraph, the Decisions table, the Pairing types table, the owner's rule (directly above the sketch) and the Topic sketch.
b. Mark superseded, keeping the text, every existing decision or table that presents the four-stage structure (Stage 2 = Credentials; Stage 3 = SDE Mastery (AI-Native; Agentic AI)) or the older five stages as current. Name the new id that replaces each. CS-10 and the §5 stage table are the known cases; find any others. Decisions that still hold (the hierarchy, parallel and braided learning, Course as a difficulty band, learning-first naming) stay untouched; cite their ids where the new record relies on them.
c. Add the payload's "Open, not decided" items as new CS-Qn open questions dated 2026-09-22.
d. §7: nothing about the four-stage migration may stay listed as pending. Mark those rows halted on 2026-09-22 and point to `specs/011-curriculum-redesign/tasks.md`.
e. §8: add a dated changelog entry for this change.

### 2. curriculum-state/canon/thesis.md
Read it in full first; write in its own voice and register.
a. Replace its stage table with three rows: Stage 0 — Introduction to SDE; Stage 1 — SDE Mastery (AI-Driven); Stage 2 — SDE Mastery (AI-Native). Under the table add one sentence: Credentials is a parallel track, not a stage, and is disabled for now. Add one dated sentence saying this replaces the earlier stage table.
b. Add the philosophy, drawn only from the payload: agentic AI is SE with an LLM as one component; the triad of using AI, building foundations, building AI; SE first at full depth, with an agentic application where the concept genuinely pairs; Substrate, Surface and Practice as a main philosophy of the book; the LLM as the one exception.
c. If an existing sentence contradicts the new decision (for example, treating agentic AI as a separate, later stage), change it minimally and list it in your report.

### 3. curriculum-state/canon/naming.md
If it records stage names: Stage 1 is SDE Mastery (AI-Driven); Stage 2 is SDE Mastery (AI-Native); there is no Stage 3; Credentials is recorded as a parallel track, not a stage. Mark old names superseded the way the file already does. If the file is missing or records no stage names, change nothing and say so.

### 4. specs/011-curriculum-redesign/tasks.md, spec.md and plan.md
a. tasks.md: mark T001–T006 done, evidence "verified by Claude on 2026-09-22 with targeted ls and grep checks". Mark T007–T012 halted: "superseded on 2026-09-22 by the Agentic-inside-SE decision (course-structure.md CS-<id>); a new task list for the second structure pass replaces them".
b. Directly under each file's title (after any frontmatter), add: "Status, 22 September 2026: halted. The four-stage structure this spec lands was superseded the same day by the Agentic-inside-SE decision (curriculum-state/canon/course-structure.md, CS-<id>). Do not resume T007–T012." In tasks.md, reword the "Resume point" line so it points at this note.

## Verify, then report
1. Re-read every changed file. Confirm: every Decisions row and every Topic-sketch row is present; the owner's rule sits directly above the sketch; nothing outside your intended edits was removed; line endings match each file's original style.
2. Final message, at most 60 lines of plain text:
   - per file, the headings you added or changed and what you marked superseded;
   - each new CS-n and CS-Qn id and what it covers;
   - every contradiction you found but did not fix, as file:line;
   - anything from the payload you could not place, and why.
