---
id: 0008
title: Rework Part 3 architecture story
stage: general
date: 2026-09-03
surface: agent
model: claude-sonnet-5
feature: none
branch: a
user: Book
command: /sp.specify
labels: [curriculum, sde-intro, part-3, teaching-technique]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - curriculum-state/proposals/stage-00-sde-intro-2026-09-03.md (referenced, not yet updated)
tests:
 - none
---

## Prompt

The part 3 is a little bit confused, use the teaching techniques and build a complete story and teach and and every concept and term in this part. also, I am not satisfied with the order of things to be taught that you have listed in the part 3. rearrange the things and make it better, it IS the most important part, and all of the stage 1 is going to be built ON this part's discussions, the lecture can be longer or even has the more parts, but make it correct. Ask me questions and make it better

## Response snapshot

Declined to run `/sp.specify`'s branch+spec-template flow: this is lecture
content directly continuing the curriculum-architect proposal saved last
turn, not a software feature, so no branch/spec.md was created. Diagnosed
the previous Part 3's actual flaw (roles stated as labels before the
example, violating the book's own concrete-before-abstract rule; tangential
domains bolted on as disconnected one-liners). Proposed a full rewrite: one
continuous "build one thing together" narrative (12 beats: platform ->
frontend -> the trust trap -> backend -> API/HTTP/REST -> database -> auth ->
git/collaboration -> deployment -> tie back to Part 2's abstraction ladder ->
zoom out to mobile/desktop/blockchain/IoT/cybersecurity/AI-dev as "same map,
different terrain" -> explicit Stage 1 close), sequenced to mirror Stage 1's
real chapter order (s1-03 frontend, s1-04 backend/API, s1-05 databases,
s1-06 git) so "Stage 1 is built on this part" is literally true rather than
a slogan. Asked 4 clarifying questions via AskUserQuestion: anchor-story
choice (student club sign-up recommended, per canon/audience.md's own
example), whether auth+Git get full beats, how deep the tangential-domain
close should go, and whether Part 3 stays one long lecture or splits at the
beat-9/10 boundary. Proposal file not yet rewritten - waiting on answers
before locking the structure in.

## Outcome

- ✅ Impact: Redirected away from an ill-fitting SDD spec/branch flow back to the correct content-track mechanism; produced a restructured, pedagogically-grounded Part 3 outline pending user confirmation on 4 open decisions.
- 🧪 Tests: none (planning/content stage, no code)
- 📁 Files: none written yet besides this PHR; curriculum-state/proposals/stage-00-sde-intro-2026-09-03.md to be updated once the 4 questions are answered
- 🔁 Next prompts: rewrite Part 3 (and possibly split into Part 3/Part 4) in the proposal file once the user answers; renumber the former Part 4 ("two extremes") if a split is chosen
- 🧠 Reflection: the earlier proposal's Part 3 broke the project's own voice.md rule (concrete before abstract) despite that rule being read minutes earlier - worth double-checking planning output against canon/voice.md explicitly, not just book prose

## Evaluation notes (flywheel)

- Failure modes observed: initial Part 3 draft stated abstract role labels before a concrete example, contradicting canon/voice.md's own stated teaching principle
- Graders run and results (PASS/FAIL): none run
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): when producing curriculum-architect planning output, explicitly re-check it against canon/voice.md's six commitments before presenting, not only when authoring actual chapter prose
