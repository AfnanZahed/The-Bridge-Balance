# Job 6 — Prompt History Records for the 22 September curriculum discussion

Effort: high. Executor: DeepSeek V4.1 Flash.

## Ground rules
- Live repository C:/Users/Dell/Desktop/Book only. Never touch `.claude/worktrees/`. No git commands.
- Create exactly three new files under `history/prompts/`. Change no existing file.
- Match the existing PHR files' line endings and encoding.

## Steps
1. Read `.specify/templates/phr-template.prompt.md` and the two newest PHRs under `history/prompts/` to learn the house format.
2. Find the highest PHR id in use anywhere under `history/prompts/`. Give PHR A, B and C the next three free ids, in that order.
3. Route: if `history/prompts/011-curriculum-redesign/` exists, use it with stage `plan`; otherwise use `history/prompts/general/` with stage `general`. Follow the house filename pattern.
4. PROMPT_TEXT: copy each prompt exactly, every character, no corrections and no trimming, from `_scratch/job-briefs/2026-09-22/job6-verbatim-prompts.md`. Prompt A sits between the lines `=====PROMPT A START=====` and `=====PROMPT A END=====`; B and C follow the same pattern.
5. Fill every placeholder. Date 2026-09-22. Surface agent. Model: claude-opus-5 for A and B, claude-opus-5-5 for C. User: name the project owner the way the newest PHRs do. Feature 011-curriculum-redesign. Links null. Tests none.

PHR A — title "Fold agentic AI into SE stages". Files: none. Response text: Claude tested the proposal against the old Stage 1 topic list: eleven topics pair strongly with an agentic twin, three weakly, two not at all (UI/UX and branding; visual effects). It argued the stronger case for merging (the difference between SE and agent engineering is only visible side by side) and named where the claim overreaches: the components are ordinary SE, but a system with an LLM is nondeterministic, fails in meaning rather than mechanics, and faces prompt injection. It flagged the costs (Stage 1 growing to most of the book, what "10x" means, the zero-knowledge floor, SE gaps such as testing), proposed the Substrate, Surface and Practice pairing types and a three-beat rhythm, and asked fourteen questions. No files changed.

PHR B — title "Owner answers on the agentic merge". Files: none in the repo (Claude memory only). Response text: Claude turned the owner's answers into a draft decision table: Stage 1 SDE Mastery (AI-Driven) for basic to intermediate SE and agentic work, Stage 2 SDE Mastery (AI-Native) for advanced work, Credentials as a disabled parallel track, navigation at Course level, SE first at full depth, Substrate/Surface/Practice as a thesis-level philosophy, the LLM as the one exception, real agents on free providers, and coding agents as Stage 1's working medium. It sketched where every old agentic topic could sit across the two stages, flagged that SDK churn can outdate recorded videos, asked five questions, and saved the owner's think-only rule to Claude's memory.

PHR C — title "Finalize the agentic-inside-SE record". Files: _scratch/job-briefs/2026-09-22/agentic-inside-se-decisions.md, job4-canon-record.md, job5-stage-inventory.md, job6-phrs.md; job 4 (in progress) edits curriculum-state/canon/course-structure.md, thesis.md, naming.md and specs/011-curriculum-redesign/. Response text: The owner confirmed the final answers: Stage 2 is SDE Mastery (AI-Native) with the Agentic AI suffix dropped; the owner places each topic in Stage 1 or 2 at authoring time; students write code by hand first, then with a coding agent; the Credentials design is postponed; ML, DL and NLP are out of scope. Claude added deployment and cloud to the topic sketch, recorded the owner's rule that the sketch is a very rough idea and not a plan, saved the decision record to memory and to the repo's job-briefs folder, and dispatched DeepSeek at max effort to write it into course-structure.md, thesis.md and naming.md and halt specs/011, plus a read-only inventory of every stale stage reference for the follow-up edits.

6. Re-read the three files: no placeholder left; each PROMPT_TEXT matches its source exactly, apart from line endings.
7. Final message, at most 10 lines: the three ids and paths, and each PROMPT_TEXT's character count.
