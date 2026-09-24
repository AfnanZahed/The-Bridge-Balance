---
id: 0006
title: CP0 accepted — build the spec, subagent-driven
stage: misc
date: 2026-09-23
surface: agent
model: deepseek/deepseek-v4.1-flash (Command Code)
feature: 012-chatbot-tutor
branch: main
user: owner
command: none (freeform chat — CP0 sign-off and instruction to continue)
labels: ["012", "cp0", "cp1", "spec", "verification", "constitution"]
links:
  spec: specs/012-chatbot-tutor/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md (modified — amended to v3.2.0; the version-control rule now describes the real git workflow)
  - specs/012-chatbot-tutor/spec.md (new — 386 lines, 116 FRs, 10 NFRs, 16 SCs)
  - specs/012-chatbot-tutor/progress.md (modified — the 0.1 row corrected, a 0.1a row added for the amendment, a CP1 row added)
tests:
  - Independent audit of spec.md — marker re-count from scratch, 142/142 cross-references resolve, zero duplicates
  - Independent audit — quoted strings checked against build prompt §10: 0 invented
  - Independent audit — no library/path/function/SQL in spec.md
  - Independent audit — secret-shape scan of spec.md: 0 hits
  - Independent verification of the eleven fixes — the three verbatim strings byte-identical to their sources
  - git status --short — no owner work staged or committed
---

## Prompt

Ok, done. continue building using the Subagents.

## Response snapshot

Read "Ok, done" as the CP0 sign-off and continued to CP1, keeping every heavy step on a subagent and verifying independently.

**What the sign-off was taken to authorise, and what it was not.** I checked the repo rather than assuming: `gh repo view --json visibility` still returns `{"isPrivate":false,"visibility":"PUBLIC"}` and nothing was pushed. So the sign-off covers CP0 and the pre-approved step-0.1 rule changes — nothing more. The four CP0 questions that remain open were carried forward rather than silently resolved: repo visibility (still public, still unpushed), the `better-auth` removal (no objection raised, so treated as ratified and recorded as such), the constitution diff (pre-approved at §0.1 and now applied), and the agent definitions (still untracked).

**Constitution amended to v3.2.0.** The diff shown at CP0 was applied exactly: `.specify/memory/constitution.md:546` now reads "one `main` line, pushed to a private GitHub repo", a v3.2.0 Sync Impact Report was prepended above the v3.1.0 one, and the Version line moved to 3.2.0 / Last Amended 2026-09-23. The bump was assessed as MINOR — the clause is a Development Workflow rule, not a numbered principle, and the change resolves a contradiction with the **Commits** rule immediately below it, which already required atomic named commits. The report records the alternative reading (removing a standing rule is backward-incompatible, so MAJOR 4.0.0) as a one-line change if the owner prefers it.

**CP1 — `spec.md`.** Delegated the draft to a subagent against build prompt §2 and §7; it produced 386 lines with six prioritised user stories, 29 edge cases, 116 FRs, 10 NFRs, 16 measurable success criteria, Key Entities, Out of Scope and Pending Owner Inputs.

**Then it was audited twice, and both audits found real defects.** The first audit re-counted the markers from scratch and read the sources rather than trusting the coverage table. It confirmed the numbering, the zero HTML comments, the three `[NEEDS CLARIFICATION]` markers as genuine silences, and the three probe constraints — but refuted five things: FR-004 named no identifiable runtime and FR-006 never named the locked model, so §2 rows 3 and 4 were only nominally covered; four quoted strings were not verbatim, one of them existing nowhere in the build prompt at all, against §4's ban on inventing reader-facing words; FR-035 required no heading-anchor parity; and FR-025 gave the twelve refusal codes as prose instead of §7.9's identifiers. Eleven fixes were applied. The second audit confirmed all eleven landed and the three strings are now byte-identical to their sources, then found three more defects — an orphaned parenthetical in FR-044, a runtime name that did not match §2's wording, and thirteen lowercase message references a builder could mistake for render copy. All three were fixed, the last by making FR-087 state that §10's text is authoritative and must be used complete and character-for-character.

**My own bookkeeping error, caught by the audit.** The 0.1 row in `progress.md` still claimed the constitution was "**not** changed", which stopped being true the moment I applied it this turn. Corrected, and a 0.1a row now records the amendment.

## Outcome

- ✅ Impact: the constitution and the spec now agree with the git workflow actually in use, and the spec has been falsified twice before anyone wrote code against it.
- 🧪 Tests: all six checks listed above, run by subagents that did not produce the work.
- 📁 Files: three paths, listed above. Nothing committed yet, and no owner work staged.
- 🔁 Next prompts: CP1 sign-off, then CP2 (the plan, RESEARCH-1 and RESEARCH-2, the ADR drafts and the `stack.md` diff).
- 🧠 Reflection: the audits were worth more than the drafting. Ten of the eleven first-round fixes were things a careful reader would pass over — a runtime named by reference, a model never stated, a quoted string with the wrong capital letter — and one was a reader-facing string that did not exist anywhere in the source. The rule that paid for itself is verifying with an agent that has no memory of producing the work.

## Evaluation notes (flywheel)

- Failure modes observed: (1) over-abstraction — told to keep implementation detail out of a spec, the drafter also removed §2's *locked decisions*, leaving requirements that named nothing identifiable; (2) three quoted strings were paraphrased rather than copied, and one was invented outright; (3) a fix introduced a new grammar defect (an orphaned parenthetical) that only the second pass caught; (4) my own progress ledger contradicted a change I had just made.
- Graders run and results (PASS/FAIL): spec numbering PASS; cross-references PASS; no invented reader-facing strings PASS after fixes (0 failures on the re-run); no implementation detail PASS; probe constraints PASS; no secrets PASS; locked-decision consistency PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): when a spec must exclude implementation detail, state explicitly that the source's *locked decisions* are still to be named — the ban is on the plan's mechanics, not on the owner's choices.
