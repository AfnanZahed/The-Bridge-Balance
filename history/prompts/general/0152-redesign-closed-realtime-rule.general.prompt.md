---
id: 0152
title: Redesign closed; realtime design rule recorded
stage: general
date: 2026-09-25
surface: agent
model: claude-opus-5-5
feature: none
branch: main
user: owner
command: none
labels: ["curriculum-state", "canon", "realtime-design", "agenda"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - curriculum-state/canon/course-structure.md
  - curriculum-state/canon/corrections.md
  - CLAUDE.md
  - AGENTS.md
  - _scratch/job-briefs/2026-09-22/agenda/index.html
tests:
  - Repository scans of the Agenda and course-structure.md for stale "redesign" framing (Not started / when it lands / waits for the redesign / after the redesign): only dated records remain
---

## Prompt

read agents.md and tell me what's next?

What to do next?

well, I think the whole curriculum redesign is already completed, since the stages are now 3, mean the main direction is redesigned, and the exact chapters, and topics will be being designed in realtime
well, I think the whole curriculum redesign is already completed, since the stages are now 3, mean the main direction is redesigned, and this is the written rule (find it, if not written then make it one of the foundational rules) that the exact chapters, and topics will be being designed in realtime

well, I think the whole curriculum redesign is already completed, since the stages are now 3, mean the main direction is redesigned, and the exact chapters, and topics will be being designed in realtime
well, I think the whole curriculum redesign is already completed, since the stages are now 3, mean the main direction is redesigned, and this is the written rule (find it, if not written then make it one of the foundational rules) that the exact chapters, and topics will be being designed in realtime

## Response snapshot

Recorded the owner's correction as canon. course-structure.md gains CS-36: the redesign is complete (the direction itself — three stages, agentic AI inside SE — decided and applied) and everything below the stage level is designed in realtime at the moment it is authored; this also becomes locked decision D5's written home, with dated corrections to CS-5, CS-6, sections 2, 5 and 7 and CS-Q6. corrections.md gains §31 with the owner's words and the check. The D5 bullet in CLAUDE.md and AGENTS.md now points at course-structure.md. The Agenda was refreshed in the same pass: the redesign left the queue into Done today, counts are 8 tasks and 38 done, and the 'wait for the redesign' phrasing in the queue, parked items and done rows was put right.

## Outcome

- ✅ Impact: The curriculum redesign is closed as canon. CS-36 records that the direction (three stages, agentic AI inside SE) is decided and applied while everything below the stage level is designed in realtime at the moment it is authored, D5 has a written home, and the stale "redesign pending" framing was corrected across CS-5, CS-6, sections 2, 5 and 7 and CS-Q6, corrections.md §31, and the D5 bullet in CLAUDE.md and AGENTS.md. The Agenda now reflects that state: 8 tasks, 38 done, the redesign moved into Done today, and the queue, parked items and done rows no longer wait on a redesign.
- 🧪 Tests: Repository scans of the Agenda and course-structure.md for stale "redesign" framing (Not started / when it lands / waits for the redesign / after the redesign): only dated records remain.
- 📁 Files: course-structure.md and corrections.md carried the canon change, CLAUDE.md and AGENTS.md had their D5 bullet repointed, and the Agenda brief was refreshed — all listed in the frontmatter.
- 🔁 Next prompts: build the Stage 0 content under the realtime rule, now that the redesign no longer gates it; keep the Agenda's task and done counts truthful as authoring starts.
- 🧠 Reflection: the owner corrected a standing assumption rather than a piece of work — the redesign had already landed in the stages, so the fix was to write the rule down (CS-36, D5's home, corrections.md §31) and then sweep every surface that still spoke as if the redesign were ahead, including the Agenda's own counts and phrasing.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): not run.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
