---
id: 0002
title: Clarify Book Foundation Spec
stage: clarify
date: 2026-08-17
surface: agent
model: MiniMax-M3
feature: book-foundation
branch: 001-book-foundation
user: Dell
command: /sp.clarify
labels: [clarify, deployment, review-workflow, co-authoring, constitution-amendment]
links:
  spec: specs/001-book-foundation/spec.md
  ticket: null
  adr: history/adr/0002-text-first-video-second-workflow.md
  pr: null
files:
  - specs/001-book-foundation/spec.md
  - specs/001-book-foundation/checklists/requirements.md
  - history/prompts/001-book-foundation/0002-clarify-book-foundation.clarify.prompt.md
tests: []
---

## Prompt

/sp.clarify (invoked by user; empty $ARGUMENTS). Goal: detect and reduce ambiguity in the active feature spec before `/sp.plan`.

## Response snapshot

1. **Loaded prerequisites** via `.specify/scripts/powershell/check-prerequisites.ps1 -Json -PathsOnly`. Confirmed `FEATURE_SPEC=specs/001-book-foundation/spec.md`, branch `001-book-foundation`.

2. **Ambiguity scan** against the spec-kit taxonomy. Most categories were **Clear** thanks to US/FR/SC/Assumptions coverage. Five candidate questions emerged, prioritized by (Impact × Uncertainty):
   - Q1: Deployment target lock-in (GitHub Pages vs Vercel vs both) — FR-010 said "or."
   - Q2: Single-vs-multi-author review workflow — Assumption said "single author" but US-5 implied PR review.
   - Q3: Chapter completeness definition — when is "awaiting lecture" removed?
   - Q4: Stub depth for Stages 2–4 — implicit.
   - Q5: Build/deploy failure recovery on the chosen host.

3. **Q1 (asked)**: Vercel vs GitHub Pages lock-in.
   - **Recommended:** GitHub Pages. Rationale: zero-config, lives with the repo.
   - **Answer:** **Vercel** (user).
   - **Integration:** FR-010 locked to Vercel; Assumption "configurable" replaced with "locked to Vercel"; Clarifications section added to spec.md.

4. **Q2 (asked)**: Review workflow.
   - **Recommended:** Single-author, self-merge.
   - **Answer:** **C — lecturer + automated CI checks only** (no required human reviewer).
   - **Integration:** New FR-013 added (CI gates merge); Assumption updated.

5. **Q3 (asked)**: Chapter completeness definition.
   - **Recommended:** Transcript + outline required.
   - **Answer:** **Workflow inverted** — user described a co-authoring workflow: Dell + Claude Code co-research each topic; Claude Code writes the text lectures; Dell records the video afterward; Dell produces diagrams / AI-generated images and Claude Code integrates them. This is **text-first, video-second** — opposite of the constitution's Principle III.
   - **Integration:** US-4 rewritten as "Co-authoring a chapter" with three chapter states (placeholder / text-ready / video-published); FR-004 updated to mark state; FR-014 added for image support; Lecture entity updated; new **Image entity** added; Assumptions revised to declare the inversion.

6. **Q3 impact triggered constitution conflict.** Principle III ("Lecture-First, Text-Second") is now inverted. This requires an ADR + constitution amendment. User chose to **pause clarification** and fix the constitution first.

7. **Deferred to planning (low-impact):**
   - Q4: Stages 2–4 stub depth — depends on lecture workflow pace.
   - Q5: Vercel build/deploy failure recovery — operational detail.

8. **Checklist updated** to reflect 3-answered / 2-deferred state and the pending constitution amendment.

## Outcome

- ✅ Impact: Spec is now unambiguous on deployment target (Vercel), review workflow (CI-only), and authoring workflow (co-research → text → video → images). Three of five queued questions answered in-session.
- 🧪 Tests: none — clarification is documentation.
- 📁 Files: `specs/001-book-foundation/spec.md` (3 clarifications + edits), `specs/001-book-foundation/checklists/requirements.md` (updated), this PHR.
- 🔁 Next prompts:
  1. **ADR-0002**: draft and accept the amendment of Principle III.
  2. **Constitution amendment**: bump to v2.0.0; rewrite Principle III; update governance dates.
  3. **`/sp.plan`** for `001-book-foundation` — but only after the constitution is back in sync.
- 🧠 Reflection: Q3 was the highest-impact clarification of the session. The user's free-form answer wasn't a multiple-choice pick — it was a workflow description that fundamentally inverted a principle I'd inferred from the platform spec. The lesson: when the user provides substantive context, treat it as a clarification even when it doesn't match the question's framing. The earlier draft of Principle III assumed "lecture precedes text" because the spec described lectures as the primary medium. The user's actual workflow is the inverse — and that inversion makes Claude Code a content author, not just a documentation formatter. This is a much bigger role and worth constitutional recognition.

## Coverage summary

| Category | Status |
|---|---|
| Functional Scope & Behavior | Clear |
| Domain & Data Model | Clear (Stage, Chapter, Lecture + new Image entity) |
| Interaction & UX Flow | Clear |
| Non-Functional Quality Attributes | Clear |
| Integration & External Dependencies | Resolved (Q1: Vercel locked) |
| Edge Cases & Failure Handling | Partial — Q5 (failure recovery) Deferred to planning |
| Constraints & Tradeoffs | Clear |
| Terminology & Consistency | Resolved (Q3: new roles + Image entity) |
| Completion Signals | Clear |
| Misc / Placeholders | Clear |

**Outstanding (Deferred to planning):**
- Q4 — stub depth for Stages 2–4.
- Q5 — Vercel build/deploy failure recovery.

**Constitution conflict:** 1 principle inverted (III) → ADR-0002 + amendment to v2.0.0 pending.

## Evaluation notes (flywheel)

- Failure modes observed: none. The clarification loop ran smoothly through three substantive questions before the user exercised the early-termination path to address the constitution conflict.
- Graders run and results (PASS/FAIL): n/a — clarification session.
- Prompt variant (if applicable): n/a — empty `$ARGUMENTS`.
- Next experiment (smallest change to try): next session should write ADR-0002, amend the constitution to v2.0.0, then resume `/sp.plan` for `001-book-foundation`. The plan's Constitution Check section should reference v2.0.0 explicitly.
