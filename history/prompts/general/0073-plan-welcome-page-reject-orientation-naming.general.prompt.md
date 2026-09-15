---
id: 0073
title: Plan the Welcome page, reject Orientation naming
stage: general
date: 2026-09-14
surface: agent
model: claude-sonnet-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["welcome-page", "stage-0", "naming", "curriculum-planning", "voice-canon", "plan-mode"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - curriculum-state/proposals/welcome-page-brief-2026-09-14.md (created)
 - C:\Users\Dell\.claude\plans\snuggly-giggling-anchor.md (created, plan-mode artifact)
 - history/prompts/general/0073-plan-welcome-page-reject-orientation-naming.general.prompt.md (this file)
tests:
 - none (planning/research task, no code changed)
---

## Prompt

now think and plan of the Welcome (not orientation, this word is difficult and is not attractive for pakistani audience and is meaning less for them).

## Response snapshot

Entered Plan Mode (harness-triggered). Investigated via three parallel Explore agents plus targeted direct reads:

1. **"Orientation" blast-radius map** — confirmed Stage 0 is currently shipped and named "Orientation" / "Orientation Through Computing History" across 9+ independent site-code literals (`stages.ts`, `index.tsx`, `docusaurus.config.ts`, `sidebars.ts`, `stage-icons`, both `DataViz` chart components, `KPIGrid.tsx`), 2 content pages (`faq.md`, `changelog.md`), and the canon source (`thesis.md`) — no single canonical source cascades a rename. Separately confirmed several *unrelated* uses of the plain English word "orientation" (code-of-conduct's "sexual orientation," CSS comments, generic "getting your bearings" phrasing) that must not be touched by any rename.

2. **Recovered the CS50P + Hugging Face welcome text** the owner had pasted into an earlier message (point 2 of the 13-point backlog, filed verbatim in PHR 0072) as a web-fetch fallback. Extracted structurally (not reproduced verbatim — third-party copyrighted course pages, capped at short attributed quotes per this session's copyright constraint): CS50P is institutional/logistics-first; Hugging Face is warm/community-first. Confirmed the closing instruction attached to that pasted material, verbatim: "Learn all the maximum points from both to design OUR welcome."

3. **Read both whole-book-redesign planning documents in full** (`curriculum-state/proposals/whole-book-redesign-record-2026-09-14.md`, plus the two plan files it consolidates, `when-writing-the-book-rosy-whisper.md` and `rosy-stargazing-conway.md`) and `canon/thesis.md`. Found Stage 0's name was *already* internally flagged as a placeholder, never a real decision, in two separate documents — meaning today's "not Orientation" instruction lands on a genuinely open, previously-parked question, not a settled one.

4. **Read `canon/voice.md` in full** and found it directly constrains the synthesis: bans opening on a definition (both CS50P and Hugging Face do), requires second person (not Hugging Face's "we/us"), allows question-format headers (the shipped FAQ already proves this pattern works) but bans rhetorical questions as transitions, and bans closing restatements.

Asked one AskUserQuestion before finalizing the plan: whether "not Orientation" should also rename Stage 0 itself, given the collision (Welcome avoids the word; Stage 0, one click later, still carries it). Owner chose: **"No — only the new Welcome page."** Stage 0's name stays parked, by explicit choice, not oversight.

Wrote the plan to `snuggly-giggling-anchor.md` (ExitPlanMode's required plan file) covering: the two orderings (authoring-order vs. reading-order, deliberately not conflated), the CS50P/HF structural synthesis, a borrow/adapt/reject table, a 7-part proposed structure for the page (open on the over-trust/over-caution tension, not a definition; first-screen claim + one action; honest zero-prerequisite statement; five-stage shape anchored on the two real Harvard credentials, no fixed count; how to actually read the book; honest "not live yet" section matching the FAQ/CoC/Accessibility precedent; close on the action, not a summary), and the parked Stage 0 naming question. User approved via ExitPlanMode.

After approval, filed the substance into this project's own durable memory (`curriculum-state/proposals/welcome-page-brief-2026-09-14.md`) rather than leaving it stranded in the Claude-Code-internal plan-mode file, since `curriculum-state/README.md` establishes that every authoring skill reads `curriculum-state/` before drafting — a file under `~/.claude/plans/` would never be seen by `chapter-production`/`lesson-spine-authoring` when the Welcome page is actually drafted later.

## Outcome

- ✅ Impact: A reviewable, non-binding brief for the Welcome page now exists in the project's own proposal register, correctly scoped against this book's real voice/audience constraints rather than a naive copy of either borrowed model. The Stage-0/Orientation naming collision is surfaced and explicitly parked, not lost. No reader-facing content changed — by design, per the owner's own sequencing (Welcome is authored last, right before Stage 0's real content).
- 🧪 Tests: None applicable — no code or content shipped this exchange.
- 📁 Files: `curriculum-state/proposals/welcome-page-brief-2026-09-14.md` (new); `C:\Users\Dell\.claude\plans\snuggly-giggling-anchor.md` (new, plan-mode artifact, ephemeral relative to the proposal file above).
- 🔁 Next prompts: Nothing scheduled to start automatically. Two independent follow-ups exist whenever the owner directs them: (a) Stage 0's real naming decision, then a contained `command-code-delegation` rename pass; (b) resuming the redesign roadmap's steps 1–7 (naming triad, ADR, Stage 0 breakdown design, etc.) — actual Welcome-page drafting waits behind both.
- 🧠 Reflection: The most valuable move this exchange wasn't the CS50P/HF research itself — it was catching that "not Orientation" collided with Stage 0's own already-shipped name before writing anything, and asking rather than assuming the blast radius the owner intended. The answer ("no, just the new page") also usefully confirms the owner is tracking the Stage-0-naming question as its own separate, deliberate decision, not something to fold in opportunistically.

## Evaluation notes (flywheel)

- Failure modes observed: none in this exchange; the main risk avoided was silently assuming "not Orientation" applied to Stage 0's shipped name (a 9+ file rename) without confirming scope first.
- Graders run and results (PASS/FAIL): not applicable — no automated grading harness exists for curriculum-planning prose at this stage.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none proposed — this was a planning exchange, not an authoring experiment.
