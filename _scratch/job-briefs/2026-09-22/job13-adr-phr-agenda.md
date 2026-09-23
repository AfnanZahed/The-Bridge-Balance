# Job 13: the ADR, prompt record 0140, and the Agenda (site pass started)

Effort: high. Executor: DeepSeek V4.1 Flash. Planner and verifier: Claude.
Live repository C:/Users/Dell/Desktop/Book only. Never read or write anything under `.claude/worktrees/`. No git commands. Keep each file's line endings and encoding. Another job is editing site files right now; touch only the files named here.

## Part A: the ADR (the owner said yes on 22 September 2026)
Follow `.claude/commands/sp.adr.md` for the format and process: use its create-adr script if it runs, otherwise the ADR template it names and the next free number in `history/adr/`. Title "Agentic AI Taught Inside Software Engineering: the Three-Stage Structure". Status Accepted, date 2026-09-22. Take every fact from `curriculum-state/canon/course-structure.md` (CS-12 to CS-33) and the "Agentic AI inside SE" section of `curriculum-state/canon/thesis.md`; invent nothing.
- Decision (the whole cluster): the three stages, by name; agentic AI taught inside SE across Stages 1 and 2; SE first at full depth, with an agentic application only where a concept genuinely pairs, and each pairing naming what is new about its agentic version; the Substrate, Surface and Practice pairing types; the LLM as the one exception; Credentials as a parallel track, disabled for now; the zero-knowledge floor on Stages 0–1; no separate SDK-specific Parts; real agents on free providers; building with models, not building models; code written by hand first, then with a coding agent.
- Alternatives, each with the reason it lost: agentic AI as a stage of its own (the old five-stage plan); the four-stage structure decided and landed earlier the same day (Stage 2 Credentials, Stage 3 SDE Mastery (AI-Native; Agentic AI)), superseded; separate SDK-specific Parts.
- Consequences, positive and negative. Include: the CS50 promises on the reader pages now point at a disabled track (open question CS-Q8), and the churn of restructuring the site.
- References: the canon ids above, `specs/011-curriculum-redesign/tasks.md` T013 to T020, constitution 3.1.0, PHRs 0135 to 0140.
- If an existing ADR records an older stage structure, add one dated line to it, "Superseded in part by ADR-NNNN (22 September 2026)", and change nothing else in it.

## Part B: prompt record 0140
Use `history/prompts/general/0139-continue-after-the-command-code-update.general.prompt.md` as the model. Id 0140, title "Site pass go-ahead and ADR yes", stage general, date 2026-09-22, feature 011-curriculum-redesign, model claude-opus-5-5, labels ["adr","site-structure","three-stage-structure"], files: the ADR file, this record, the Agenda page. If id 0140 is already taken in `history/prompts/general/`, stop and report. The prompt text is the text between the two marker lines, character for character:
=====PROMPT START=====
yes the other session is done, go ahead. adr yes...all using the deepseek, kindly save your MAXIMUM tokens, becuase if your tokens finish, everything will be finished,literally
=====PROMPT END=====
Response text: "Started the site structure pass (T017), with the reader-page fixes, the changelog entry and the final gate (T018 to T020), as one DeepSeek job, and had the ADR for agentic AI inside SE written. Claude's own token use kept to briefs and short checks."

## Part C: the Agenda page, `_scratch/job-briefs/2026-09-22/agenda/index.html`
First copy it to `agenda/index.v10.html` (skip if that exists). Content edits only, under the "Ground rules" of `_scratch/job-briefs/2026-09-22/job8b-agenda-refresh.md`.
- The header time and the tally.
- "Where we are": step 4 becomes In progress. In the paragraph, "Steps 1 to 3 are done. Step 4 waits for your answer." becomes "Steps 1 to 3 are done. Step 4 is running now."
- "One by one": "The second structure pass on the site" becomes In progress; its sentence about waiting for your answer becomes "You confirmed on 22 September that the other session is done."
- "Waiting for you": remove both questions. The section shows 0 questions, with the intro "Nothing needs an answer from you right now. When something does, it appears here."
- "Done today": add at the top "The ADR for agentic AI inside SE is written": "ADR-NNNN, accepted. It records the three stages, agentic AI taught inside SE, the Credentials track and the options you turned down." (the real number).
- When Part C is finished and verified, create the empty file `_scratch/job-briefs/2026-09-22/agenda/job13.done`. Another job waits for it.

## Verify, then report (at most 25 lines)
The ADR's path and number, with no placeholder left; the prompt text an exact substring of record 0140; the Agenda's tags inside `<main>` balanced, and everything before `<main>` and after `</main>` byte-identical to `index.v10.html`.
