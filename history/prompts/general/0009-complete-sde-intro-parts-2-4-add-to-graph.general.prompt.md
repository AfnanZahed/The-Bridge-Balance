---
id: 0009
title: Complete SDE Intro Parts 2-4, add to graph
stage: general
date: 2026-09-03
surface: agent
model: claude-sonnet-5
feature: none
branch: a
user: Book
command: null
labels: [curriculum, sde-intro, prerequisite-graph, planned-lessons]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - curriculum-state/proposals/stage-00-sde-intro-2026-09-03.md (Parts 2 and 4 completed to same standard as Part 3; framing sections updated)
 - curriculum-state/ledgers/prerequisite-graph.yaml (3 new `planned` rows: s0-02, s0-03, s0-04; progress counters updated)
tests:
 - python -c "import yaml; yaml.safe_load(...)" against prerequisite-graph.yaml - parses clean, 23 lesson entries
---

## Prompt

all the part 2,3 and 4 completed? complete them and add them into the list.

## Response snapshot

Interpreted "the list" as `prerequisite-graph.yaml`, given curriculum-
architect's own Mode 1/2 protocol describes exactly this moment (user
confirms candidates -> architect adds `planned` rows) and the user has
been treating this content as genuinely load-bearing throughout the
conversation. Completed Part 2 ("From Electricity to English") and Part 4
("Two Ways to Fail, and the Bridge Between Them") to the same standard
Part 3 reached last turn: continuous narrative with hooks/walls, plus
explicit What/Why/How/When/Where for each headline term. Part 2: bit ->
machine code -> assembly -> high-level languages -> abstraction, each
beat motivated by the previous one's pain point. Part 4: names the moment
coding agents can touch every Part-3 box unsupervised, defines both
extremes (over-trust/vibe coding with intro.md's Veracode/METR/Replit
evidence; over-caution), then resolves via the specify-design-implement-
verify loop with the CSV-export worked example and the beginner-register
safety-floor line, closing explicitly against Part 1's original promise.

Added three `planned` rows to prerequisite-graph.yaml under a new "Stage 0
(orientation, ahead of Stage 1)" section: s0-02 (Part 2, requires: []),
s0-03 (Part 3, requires: [s0-02]), s0-04 (Part 4, requires: [s0-03]) -
paths under a newly-invented docs/stage-00-sde-intro/ folder, following
the existing stage-0N folder convention rather than intro.md's one-off
placement. Each row's notes field points back to the proposal file rather
than duplicating content. Updated progress.total_lesson_files (16 -> 19)
and added a `planned: 3` counter with an explicit note that planned rows
are further from becoming real chapters than placeholder rows, not
closer. Validated the graph still parses as valid YAML (23 total lesson
entries) after the edit. Rewrote the proposal file's framing sections
(top revision note, constraints, "relationship to the existing graph")
to stop claiming "nothing is added to prerequisite-graph.yaml," since
that's no longer true.

## Outcome

- ✅ Impact: All three lecture parts (2, 3, 4) now complete to the same pedagogical standard and formally tracked (as non-binding `planned` rows) in the book's own lesson-order graph, closing out this planning thread.
- 🧪 Tests: prerequisite-graph.yaml re-parsed with a YAML loader after editing - clean, no syntax errors, 23 lesson entries (20 prior + 3 new)
- 📁 Files: curriculum-state/proposals/stage-00-sde-intro-2026-09-03.md (Parts 2 + 4 written, framing sections updated); curriculum-state/ledgers/prerequisite-graph.yaml (s0-02, s0-03, s0-04 added; progress counters updated)
- 🔁 Next prompts: if the user wants auth/authorization formalized as its own Stage 1 topic (currently named in curriculum_1.md but with no placeholder row), that's a `curriculum-architect` Mode 2 brief; if the user wants any of s0-02/03/04 actually authored as book chapters rather than staying live-lecture-only, that's `lesson-research-and-authoring`
- 🧠 Reflection: "add them into the list" was genuinely ambiguous (the graph vs. just the proposal doc's own structure) - resolved by inference from conversational momentum and the project's own designed workflow rather than asking, since the action taken (`planned` status) is explicitly the low-commitment, easily-reversible one the project provides for exactly this uncertainty

## Evaluation notes (flywheel)

- Failure modes observed: none this pass
- Graders run and results (PASS/FAIL): YAML parse check - PASS
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): none pending
