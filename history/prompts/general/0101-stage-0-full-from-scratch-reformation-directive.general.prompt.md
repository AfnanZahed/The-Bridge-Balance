---
id: 0101
title: Stage 0 full from-scratch reformation directive
stage: general
date: 2026-09-16
surface: agent
model: claude-sonnet-5
feature: none
branch: main
user: afnanzahed@gmail.com
command: none
labels: ["stage-0", "scope-change", "deepseek-research", "curriculum-architecture"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - curriculum-state/proposals/whole-book-redesign-record-2026-09-14.md (§0: 3 new decided bullets — Panaversity accepted, visual-strategy accepted, full-reformation scope approved; §14: "still open" list resolved/forward-pointed to §15; new §15 appended in full)
 - history/prompts/general/0101-stage-0-full-from-scratch-reformation-directive.general.prompt.md (this file)
tests:
 - Re-read §0 and §14's exact current text before editing (via the prior turn's grounding reads) rather than editing from memory of the summary
---

## Prompt

"🟡 the proposed is done.
🔴 The blocker's answer: you MUST foget all the things in stage 0. Complete topics reformation (as per the chronology) and chapters -> lessons -> parts (if needed) reformation, complete new Content and text writting is going to be done. Whether it is the conte,t voice, tone, wording, text format, tables, chapters, lessons, parts, whole stage, topics in names and variety, whole must be done from scrath. all things highly research backed from deepseek
⚪I allow you to do it using the Deepseek.
Anything else or the complete NEW stage 0 writing should start now?"

## Response snapshot

Read the instruction precisely rather than treating it as a rhetorical intensifier of the already-known "eras 5-8 need research" gap: "forget all the things in stage 0" plus the explicit callout that "chapters -> lessons -> parts... reformation" is itself in scope means §14's illustrative 10-chapter Phase A/B grouping is now a discardable research starting-hypothesis, not a structure to fill in — a genuine scope widening from "4 gap eras need research" to "every topic, every structural boundary, and all prose gets redone." Distinguished this from the meta-principles that survive the reset because they are process/style rules rather than content: chronological ordering (confirmed by the owner's own parenthetical "(as per the chronology)"), the Stage→Chapter→Lesson→Part hierarchy shape itself, the beginner-only exception, the light-register rule, the prefer-finer-granularity rule, Reading-Literacy-inside-SDE, `01-binary.md`'s harvest-only mechanics, and the diagram-production policy.

Logged both §14 holdovers (Panaversity placement, visual-content-strategy taxonomy) as accepted-as-proposed per "the proposed is done," and wrote the full scope change into the redesign record as a new §15, since that file is the standing exception to "nothing written before convergence" and decisions should land there as they're made, not held back pending a later summary.

Did not start any DeepSeek research or drafting yet. Per the standing `command-code-delegation` skill's own Step 1 — which explicitly requires asking, fresh, on every new task, who should plan the approach (Claude itself, an Opus subagent, DeepSeek itself, or an owner-supplied plan), on the stated grounds that defaulting silently "defeats the reason the user wants the choice at all" — asked that question back to the owner rather than assuming the project's general "Claude plans, DeepSeek executes" pattern applied without confirmation for a task this large. Restated the scope understanding plainly in the same turn so the owner can correct it before any research tokens are spent, and named the process consequence: research can start as soon as the planning question is answered, but actual chapter prose still waits for the reformed structure to converge, per this project's own standing practice.

## Outcome

- ✅ Impact: The scope change is now recorded in the living document rather than living only in chat history, and both previously-pending proposals are formally closed as accepted. No research or writing has started — one process question remains open.
- 🧪 Tests: See `tests:` above.
- 📁 Files: See `files:` above.
- 🔁 Next prompts: Owner answers the planning-ownership question; research delegation to DeepSeek via Command Code begins immediately after, scoped to every Stage 0 era (not only the previously-flagged four); a reformed topic/chapter/lesson/part proposal comes back for convergence before any chapter prose is drafted.
- 🧠 Reflection: This is a case where the project's own skill guidance (`command-code-delegation` Step 1) directly overrides the general Auto-Mode bias toward not stopping to ask — the skill's text explicitly names silent-defaulting-from-memory as the failure mode to avoid, which is a stronger and more specific signal than the general "keep going" bias, and a large, direction-setting task is exactly the case that guidance is written for.

## Evaluation notes (flywheel)

- Failure modes observed: none yet — this turn deliberately stopped short of any DeepSeek call so a scope misread costs a clarifying round-trip, not wasted research effort.
- Graders run and results (PASS/FAIL): scope reading cross-checked against the record's own D5 (no fixed chapter list, ever) and against §14's own "still non-binding" framing of its illustrative grouping — PASS, consistent rather than contradictory.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): once the planning-ownership answer lands, verify the per-era DeepSeek research delegations actually come back with real sources in the tool trace (per Constitution Principle VIII's "read from the real tool trace, never a summary line") before treating any single era's research as done.
