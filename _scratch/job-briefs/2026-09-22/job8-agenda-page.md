# Job 8 — Update the "Bridge Balance Agenda" page to the 22 September state

Effort: high. Executor: DeepSeek V4.1 Flash. Planner and verifier: Claude.

## Files
- Input, never modify: `_scratch/job-briefs/2026-09-22/agenda/index.original.html`, the published page.
- Output: `_scratch/job-briefs/2026-09-22/agenda/index.html`, the updated page. Create or change no other file. Live repository C:/Users/Dell/Desktop/Book only; never touch `.claude/worktrees/`; no git.

## Rules
- It is one self-contained HTML page with inline CSS and JS. Keep its design, CSS tokens, markup structure, fonts, light and dark themes, and every script exactly as they are. Change content only.
- Update, don't rewrite. Change only what the facts below touch. Where an existing item is superseded by today's decisions (anything that assumes four or five stages, Credentials as a stage, or agentic AI as its own stage), mark it the way the page already marks done or superseded items, or add a short dated note; don't silently delete it, unless the page's own convention is to drop finished items.
- Keep the `<title>`. Update any "last updated" date to 22 September 2026.
- Load nothing new from outside the page.
- Write like the page's existing copy: plain, warm, direct English. Add a section only if a fact fits nowhere; then reuse an existing section's markup and classes.

## Facts (22 September 2026)

Direction, decided today by the owner:
- Agentic AI is taught inside SE, never as its own stage. Three stages: Stage 0 Introduction to SDE; Stage 1 SDE Mastery (AI-Driven), basic to intermediate SE with basic to intermediate agentic applications; Stage 2 SDE Mastery (AI-Native), advanced SE with advanced agentic applications.
- Credentials (CS50P, CS50W, future certifications) is a parallel track, not a stage. Disabled for now; its design is postponed.
- Navigation happens at Course level (difficulty bands) inside each stage. SE comes first, at full depth; an agentic application is added only where the concept genuinely pairs. Students write code by hand first, then with a coding agent. Real agents on free providers (Groq, OpenRouter). Scope: building with models, not building models (no ML, DL or NLP for now).
- Substrate, Surface and Practice pairing types are now a main philosophy of the book. Every Substrate and Surface pairing names its delta (what is genuinely new in the agentic version). No separate SDK-specific Parts.
- The zero-knowledge floor now names Stages 0–1.
- The 27-row topic sketch (deployment and cloud included) is a very rough idea, not a plan. The owner places each topic in Stage 1 or 2 at authoring time; Claude designs the topics and sub-topics then.

Done today:
- The four-stage folder restructure landed (specs/011 tasks T001–T006) and was superseded the same day; T007–T012 are halted.
- The decision record is in canon: course-structure.md (CS-12 to CS-30), thesis.md (the philosophy and the three-stage table), naming.md. Backups are in `_scratch/backup-2026-09-22-agentic-inside-se/`.
- Prompt records PHR 0135–0137 cover the discussion.
- The working model is confirmed: Claude plans and verifies; DeepSeek V4.1 Flash, through Command Code, does all execution, reading and research.

In progress:
- Canon follow-up: the Stages 0–1 floor, delta naming, no SDK Parts (new ids after CS-30).
- An inventory of every file that still describes an old stage structure.

Next, in order:
1. Sweep agent instructions and project docs (CLAUDE.md, PROJECT-MAP.md, stack.md, the constitution, the skills) to the new structure and the Stages 0–1 floor.
2. Second structure pass on the site: the Stage 3 folder becomes Stage 2; the Credentials folder leaves the published site; targeted sidebar edits; ledger; site code; all build gates green.
3. Minimal fact fixes on reader pages (welcome, FAQ, the Stage 0 introduction). Credential promises stay untouched until the Credentials track is designed.
4. A changelog entry.
5. Then: redesign Stage 0, the thesis page and the welcome page; start authoring with the two-parameter method (the next SE topic, plus its agentic twin).

Waiting on the owner:
- The Credentials track's design, including whether reader pages keep promising CS50 and Harvard certificates.
- Confirmation that the other session which edited sidebars.ts and the ChatAssistant component this morning has finished, before the structure pass edits the sidebar.
- A yes or no on recording the Agentic-inside-SE decision as an ADR (/sp.adr).

## Report
Final message, at most 30 lines: each section you changed and how; anything from the facts you couldn't place; confirmation that the CSS, scripts and title are unchanged.
