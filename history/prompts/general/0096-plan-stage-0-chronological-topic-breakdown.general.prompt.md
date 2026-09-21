---
id: 0096
title: Plan Stage 0's chronological topic breakdown
stage: general
date: 2026-09-16
surface: agent
model: claude-sonnet-5
feature: none
branch: main
user: afnanzahed@gmail.com
command: none
labels: ["curriculum-architecture", "stage-0", "planning", "whole-book-redesign"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/0096-plan-stage-0-chronological-topic-breakdown.general.prompt.md (this file)
tests:
 - Grep on `.claude/skills/lesson-spine-authoring/` for the three MUST rules (two-minute term test, ten-angle comprehension audit, anti-slop) — confirmed present in SKILL.md and reference/language-register.md, clearing a gate the 2026-09-14 redesign record had flagged as "waiting on the owner, not started"
 - Read on `edu-site/docs/intro-1-binary-to-programming/01-binary.md`'s frontmatter — confirmed `chapter_state: "placeholder"` directly rather than trusting memory's looser description of the file
---

## Prompt

"Now the time is came to write the actual stage 0. the voice will be similar like the welcome page. before writing the exact stage 0, write me the complete topics and things that the stage 0 will cover, and what things we will remove, or add or change as per our new work and plan. in bullet points"

## Response snapshot

Routed through `bridge-balance-project-guide` → identified as a `curriculum-architect` Mode 1 (stage-level structuring) request, but per `curriculum-state/proposals/whole-book-redesign-record-2026-09-14.md` §11's own explicit process decision ("`curriculum-architect` is skipped entirely for this work — too narrow a protocol... for foundational architecture"), delivered as a direct chat discussion rather than a `curriculum-architect`-format proposal file, matching the owner's own explicit ask ("write me... in bullet points") and the standing [[feedback-thorough-planning-before-writing]] pattern.

Read the redesign record in full, `canon/thesis.md`, `curriculum-state/ledgers/prerequisite-graph.yaml` (all rows, all notes fields), and cross-checked the redesign record's own §12.7 confirmed-eras list against §10.3's research archive. Produced a 13-row table (chronological era → what Stage 0 needs to teach → today's coverage → the remove/add/change delta), explicitly distinguishing eras that already went through the dedicated DeepSeek research pass (IC/microprocessor, software-engineering-methodology, AI-history-bridge — §10.3) from eras that haven't yet (OS/Unix, networking/Internet, the Web, architecture/REST) — a distinction the redesign record itself never states plainly in one place.

Surfaced six open questions rather than deciding them: the software-engineering-methodology/Unix contemporaneity flag (§10.3, unresolved), whether editors+terminals merge into one chapter (§10.1's own finding, not yet applied), whether AI-history and the AI-coding-agent surge stay separate, Reading & Understanding Literacy's placement (own chapter vs. folded into the SDE finale), `01-binary.md`'s now-answerable mechanics (per §13's own sequencing — this breakdown was the stated prerequisite), and a genuinely new catch: whether Stage 0 keeps its current beginner-only audience exception or moves to the book's standard two-reader architecture — never actually resolved anywhere in the redesign record, just silently inherited from the old intro sequence. Offered a recommendation on each rather than a bare question. Closed with one illustrative 11-chapter grouping, explicitly labelled non-binding per locked decision D5.

Verified rather than assumed two things memory alone would have gotten wrong: grepped the live `lesson-spine-authoring` skill files for the three MUST rules the redesign record had flagged as an owner-pending blocker (confirmed shipped 2026-09-15, so that gate is actually clear), and read `01-binary.md`'s real frontmatter instead of trusting the looser "fully written" description in the `011-intro-editorial-state` memory (confirmed `placeholder`, consistent with but more precise than the memory).

## Outcome

- ✅ Impact: Owner now has a complete, source-grounded Stage 0 topic list with an explicit remove/add/change delta against the five shipped intro chapters, plus every real open question named instead of silently resolved. Nothing committed to a real file — the redesign record's own "nothing written until convergence" rule was followed; this is discussion input only, the way `curriculum-architect` Mode 1 and [[feedback-thorough-planning-before-writing]] both require.
- 🧪 Tests: See `tests:` above — two direct-verification checks against live files rather than trusting memory.
- 📁 Files: None modified. Only this PHR was written.
- 🔁 Next prompts: Owner reacts to the era list and the six open questions. Once they converge, fold the decisions into `whole-book-redesign-record-2026-09-14.md`'s §0 status board and §12 punch-list (item 7 moves from 🟡 to ✅). Eras #5–8 (OS/Unix, networking, the Web, architecture/REST) need their own DeepSeek research pass via `command-code-delegation` before any of those specific chapters can go to `chapter-production` — the other three new eras already have it.
- 🧠 Reflection: The most valuable finding wasn't in the redesign record at all — it was noticing the record never actually decides whether Stage 0 keeps its inherited beginner-only audience exception or moves to the book's standard mixed-audience architecture. Cross-referencing `canon/thesis.md`'s "Stages 0–2 assume a reader who has never programmed" against the intro sequence's own recorded "BEGINNER-ONLY EXCEPTION... scoped to the intro sequence only" note is what surfaced the gap; neither document flags it as unresolved on its own.

## Evaluation notes (flywheel)

- Failure modes observed: A near-miss, caught before it became a real one — the redesign record's 2026-09-14 memory described the owner's pending `lesson-spine-authoring` edits as an unstarted blocker, and it would have been easy to repeat that stale claim verbatim since it reads authoritatively. Grepping the actual skill files first (rather than opening with "that's still pending" in the response) caught that it had in fact shipped the next day.
- Graders run and results (PASS/FAIL): N/A — no automated grader applies to a planning discussion; the applicable check was direct-file verification against two specific memory claims, both PASS (one confirmed cleared, one confirmed more precisely than memory stated).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): once the owner answers the six open questions, the smallest next step is the missing research pass for eras #5–8 (OS/Unix, networking, the Web, architecture/REST) via `command-code-delegation` at max effort — not jumping straight to `chapter-production` on any of those four, since they'd be the only eras in the new Stage 0 drafted without the same research rigor the other three newly-added eras already received.
