# Job 7 — The owner's three follow-up decisions, the Stages 0–1 floor in canon, and two tidy-ups

Effort: max. Executor: DeepSeek V4.1 Flash. Planner and verifier: Claude.

## Ground rules (absolute)
- Live repository C:/Users/Dell/Desktop/Book only. Never read or write anything under `.claude/worktrees/`. No git commands.
- Before editing any file, copy it byte-for-byte to `_scratch/backup-2026-09-22-agentic-inside-se-2/` under the same relative path. This is a new folder: never touch `_scratch/backup-2026-09-22-agentic-inside-se/`, which holds job 4's backups.
- Keep each file's existing line-ending style and encoding (UTF-8 without BOM).
- Never delete a superseded decision or a dated history entry: mark it superseded or add a dated note after it.
- Invent nothing beyond the decisions below. No chapter list, chapter count or lesson order (locked decision D5).
- Scope: files under `curriculum-state/canon/`, `specs/011-curriculum-redesign/spec.md` and `tasks.md`, the three PHR moves in step 5, and one new PHR in step 6. The floor wording anywhere else (CLAUDE.md, the constitution, skills, reader pages) belongs to the next job: list those hits in your report, don't edit them.

## The owner's decisions (22 September 2026, after job 4)
- D1. The zero-knowledge floor now names **Stages 0–1** (answers CS-Q7). Stage 0 and Stage 1 assume a reader who has never programmed; Stage 2 builds on Stage 1. Old Stage 3's material (coding agents, prompt and context engineering) now sits in Stage 1, so it falls under the floor. Where canon says "Stages 3 and 4 stay parked", that now reads "Stage 2 stays parked" (Stage 2 holds what old Stage 4 held); the owner's 20 September parking decision is otherwise unchanged.
- D2. Every Substrate and Surface pairing names its delta, meaning what is genuinely new about the agentic version (answers the first half of CS-Q9). Adopted.
- D3. No separate SDK-specific Parts (answers the second half of CS-Q9). Rejected, for the owner's two reasons: someone who wants only SE content can already find it elsewhere, so the book's value is SE and agentic work taught together; and AI models and SDKs change so fast that syntax-specific content stops mattering after a while anyway, so the book does not design around re-recording it.
- CS-Q8 (CS50 and Harvard promises while Credentials is disabled) stays open, postponed with the Credentials design.

## Steps
1. `curriculum-state/canon/course-structure.md`: mark CS-Q7 and CS-Q9 answered (dated; keep the question text). Add D1, D2 and D3 as decided ids continuing the numbering after CS-30. Apply D1 to the §1 "What stays the same" floor sentence, keeping the old wording visible as superseded. Add a §8 changelog entry.
2. `curriculum-state/canon/thesis.md`:
   a. Apply D1 to the safety-floor labels that still read "Stages 0–2" and "Stages 3–4" (around lines 202 and 209).
   b. In the stage table, the Stage 1 and Stage 2 description cells must state CS-14's and CS-15's definitions (Stage 1: basic to intermediate SE, with basic to intermediate agentic applications; Stage 2: advanced SE, with advanced agentic applications). If a cell lists tools or topics carried over from the old stage tables, keep that list only after the definition and label it as examples, because the owner places each topic at authoring time (CS-18).
3. Every other file under `curriculum-state/canon/` that states the floor as Stages 0–2, or names Stages 3–4 as the parked or advanced stages: apply D1 in that file's own style. `audience.md` and `corrections.md` are known cases; find the rest.
4. `specs/011-curriculum-redesign/spec.md` (around line 54) and `tasks.md` (around line 23) say the audience question was "Recorded as CS-Q7". Add a short dated note beside each: CS-Q7 in course-structure.md became the zero-knowledge floor question and was answered on 22 September 2026: Stages 0–1.
5. Duplicate PHRs. `history/prompts/general/0138-fold-agentic-ai-into-se-stages.general.prompt.md`, `0139-owner-answers-on-the-agentic-merge.general.prompt.md` and `0140-finalize-the-agentic-inside-se-record.general.prompt.md` duplicate 0135–0137 (the same prompts, created twice by one job). Move them (do not delete) to `_scratch/removed-2026-09-22/history/prompts/general/`. Change nothing in 0135–0137.
6. After step 5, create one new PHR for the owner's latest message, following the same house format as 0137 (read it first). Its id is the next free one (0138 once the moves are done). Title "Floor, delta naming and agenda update"; stage `general`; route `history/prompts/general/`; date 2026-09-22; model claude-opus-5-5; feature 011-curriculum-redesign. PROMPT_TEXT: copy exactly, every character, the text between `=====PROMPT D START=====` and `=====PROMPT D END=====` in `_scratch/job-briefs/2026-09-22/job6-verbatim-prompts.md`. Files: the files this job changed. Response text: Claude verified job 4 on disk: all 19 decision rows, the 3 pairing types and all 27 topic-sketch rows, including the 11 deployment and cloud rows, landed in course-structure.md, with backups, line endings and scope intact. It recorded the owner's three decisions (the zero-knowledge floor names Stages 0–1; every pairing names its delta; no separate SDK Parts), dispatched this job to write them into canon and apply the floor there, moved the duplicate PHRs 0138–0140 aside, and dispatched a job to update the Bridge Balance Agenda page.

## Verify, then report
1. Re-read every changed file: nothing outside your intended edits removed; line endings match each file's original style.
2. Final message, at most 50 lines: per file, what changed; the new ids; every floor statement changed, as file:line with old → new; floor hits outside canon that you left for the next job; the three moves and the new PHR's id and path.
