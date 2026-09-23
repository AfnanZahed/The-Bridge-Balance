# Job 5 — Inventory every stale stage reference (read-only)

Effort: max. Executor: DeepSeek V4.1 Flash. Planner and verifier: Claude.

## What changed
On 22 September 2026 the curriculum structure changed twice. Find everything in the repo that still describes an old structure.
- Five stages (oldest): Stage 0 introduction; Stage 1 Spec-Aware Vibe Engineering Foundations; Stage 2 CS50 Certification; Stage 3 Mastering AI Coding Agents; Stage 4 Engineering Autonomous AI Agents.
- Four stages (landed on disk earlier today, now also superseded): Stage 0 Introduction to SDE; Stage 1 SDE Mastery (AI-Driven); Stage 2 Credentials; Stage 3 SDE Mastery (AI-Native; Agentic AI).
- New and final: Stage 0 Introduction to SDE; Stage 1 SDE Mastery (AI-Driven); Stage 2 SDE Mastery (AI-Native). There is no Stage 3 or Stage 4. Credentials (CS50P, CS50W and future third-party credentials) is not a stage: it is a parallel track, disabled for now. Agentic AI is taught inside SE across Stages 1 and 2, never as its own stage.
- The CS50 integrity floor stays absolute. Only a "Stage 2" label on it is stale: it now belongs to the Credentials track.

## Ground rules
- Live repository C:/Users/Dell/Desktop/Book only. Never read or write anything under `.claude/worktrees/`. No git commands.
- You may create exactly one file, `_scratch/job-briefs/2026-09-22/job5-inventory.md`. Change nothing else.
- Skip: node_modules, build, .docusaurus, .git, `_scratch/backup-*`, `_scratch/job-briefs/`, `specs/011-curriculum-redesign/`, and three files another job is editing right now: `curriculum-state/canon/course-structure.md`, `curriculum-state/canon/thesis.md`, `curriculum-state/canon/naming.md`.
- Do search `.claude/skills/`, `.claude/commands/`, `.claude/agents/` (whichever exist) and `.specify/`.

## Search terms (case-insensitive; any dash or hyphen)
five stages, 5 stages, five-stage, 5-stage, four stages, 4 stages, four-stage, 4-stage; Spec-Aware Vibe, CS50 Certification, Mastering AI Coding Agents, Engineering Autonomous AI Agents, SDE Mastery, AI-Native, AI-Driven, Agentic AI; Stage 2, Stage 3, Stage 4, Stages 0–2, Stages 3–4; stage-01-, stage-02-, stage-03-, stage-04-; ledger ids starting s2-, s3-, s4- or old-s3; integrity floor; Credentials; CS50, CS50P, CS50W, Harvard. Also find code that hard-codes a stage count or a stage list.

A hit is stale when it states the five- or four-stage structure, treats CS50 or Credentials as a stage, treats Agentic AI as its own stage, or names a Stage 3 or Stage 4.

## Categories
A. Agent-instruction and project docs: CLAUDE.md, AGENTS.md and GEMINI.md if present, PROJECT-MAP.md, stack.md, `.specify/**`, `.claude/**` (except worktrees), edu-site/README.md, edu-site/api/README.md.
B. `curriculum-state/**`, apart from the three skipped files.
C. Site code, config and ledgers: edu-site/sidebars.ts, `edu-site/src/**`, edu-site/docusaurus.config.ts, `edu-site/scripts/**`, `curriculum-state/ledgers/**`. Also say, in at most 10 lines, which file is the source of the site's stage list and which files consume it.
D. Docs folders: every folder under edu-site/docs/, with its file count, its index page's title and sidebar_label, and whether sidebars.ts references it.
E. Reader-facing pages: `edu-site/docs/**` and the copy in `edu-site/src/pages/**` and homepage components.
F. Historical records, never edited: history/prompts/**, history/adr/**, dated proposals, past changelog entries, dated reports. Counts per folder only; no lines.

For each stale statement in A, B, C and E, record file:line, a quote of at most 100 characters, and what it should say under the new structure. Instead of a fix, write OWNER DECISION when the hit is about (1) which stages the zero-knowledge floor names (for example "Stages 0–2 assume a reader who has never programmed"); (2) a promise to readers of CS50 or Harvard credentials; or (3) anything whose new wording you cannot derive from "What changed".

## Output
1. The full inventory goes to `_scratch/job-briefs/2026-09-22/job5-inventory.md`.
2. Your final message, at most 60 lines: stale-hit counts per category and per file, largest first; the OWNER DECISION items as file:line plus quote (if more than 15, group them by file with counts); the D listing; the C note on the stage list's source; anything surprising.
