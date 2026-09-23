# Job 9 — Agent instructions and project docs: the three-stage structure and the Stages 0–1 floor

Effort: max. Executor: DeepSeek V4.1 Flash. Planner and verifier: Claude.

## What changed (all decided 22 September 2026; the record is `curriculum-state/canon/course-structure.md`, CS-12 onward)
- Three stages: Stage 0 Introduction to SDE; Stage 1 SDE Mastery (AI-Driven), basic to intermediate SE with basic to intermediate agentic applications; Stage 2 SDE Mastery (AI-Native), advanced SE with advanced agentic applications. There is no Stage 3 or Stage 4.
- Agentic AI is taught inside SE, across Stages 1 and 2, never as its own stage. Old Stage 3's material (coding agents, prompt and context engineering) is Stage 1's working medium; old Stage 4's material belongs to Stage 2.
- Credentials (CS50P, CS50W, future third-party credentials) is a parallel track, not a stage, and is disabled for now. The CS50 integrity floor stays absolute, word for word; only a "Stage 2" label on it changes, to the Credentials track.
- The zero-knowledge floor: Stages 0–1 assume a reader who has never programmed (it used to say Stages 0–2). Stage 2 builds on Stage 1. What said "Stages 3 and 4 stay parked" now says "Stage 2 stays parked".
- Also decided: navigation at Course level; SE first, at full depth; an agentic application only where the concept genuinely pairs, and each pairing names what is new about its agentic version; the Substrate, Surface and Practice pairing types; students write code by hand first, then with a coding agent; real agents on free providers; building with models, not building models.
- Locked decision D5 still holds (no fixed chapter list or chapter count). Where a file says the official curriculum fixes five stages, it now fixes three.

## Ground rules
- Live repository C:/Users/Dell/Desktop/Book only. Never read or write anything under `.claude/worktrees/`. No git commands.
- Scope: the category A files listed in `_scratch/job-briefs/2026-09-22/job5-inventory.md` (the repo-root CLAUDE.md, PROJECT-MAP.md, stack.md, `.specify/**`, `.claude/**` except worktrees, edu-site/README.md, edu-site/api/README.md). Read that inventory first. Edit nothing outside category A.
- Before editing a file, copy it byte-for-byte to `_scratch/backup-2026-09-22-agentic-inside-se-3/` under the same relative path.
- Keep each file's line-ending style and encoding.
- Leave these alone and list them in your report: (1) every CS50 or Harvard promise (the inventory's OWNER DECISION type 2; the owner postponed it); (2) literal stage folder paths such as `stage-02-credentials/` or `stage-03-sde-mastery-ai-native/`, because a later job renames the folders and updates every path reference; (3) dated history entries: add a dated note after one if it misleads, never rewrite it; (4) folder and skill names (renaming the lesson-spine-authoring skill is deferred).
- Minimal edits: fix each stale statement in the file's own voice. Don't restructure or rewrite sections.
- `.specify/memory/constitution.md` is an amendment. Follow the file's own amendment and versioning rules: update the Sync Impact Report comment at the top, bump the version as MINOR (the floor now covers old Stage 3's material, and the stage structure the constitution describes changed), and set the last-amended date to 2026-09-22. Change only the floor wording and the stage-structure statements; alter no principle's intent beyond that.

## Verify, then report
1. Re-grep the category A files for: Stages 0–2, Stages 0 to 2, Stages 3–4, Stages 3 and 4, five stages, five-stage, four stages, four-stage, Stage 3, Stage 4, CS50 Certification, Mastering AI Coding Agents, Engineering Autonomous AI Agents, and "Agentic AI" used as a stage name. Every remaining hit must be a dated record, a CS50 promise or a folder path.
2. Final message, at most 50 lines: each changed file with a one-line summary; the constitution's old and new version; the remaining hits grouped by reason.
