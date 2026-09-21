---
id: 0103
title: Resolve open items and catch architecture gap
stage: misc
date: 2026-09-16
surface: agent
model: claude-sonnet-5
feature: none
branch: main
user: afnanzahed@gmail.com
command: none
labels: ["stage-0", "curriculum-redesign", "software-architecture", "deepseek-research", "evidence-ledger"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - curriculum-state/proposals/whole-book-redesign-record-2026-09-14.md
 - curriculum-state/research/stage-0/cluster-6-software-architecture.md (pending — background research not yet landed)
tests:
 - none
---

## Prompt

Open question 1: chronologically, time to time
2: about these type of questions: A ledger entry for Parnas 1972 (used in 3 places, 2 different papers — must not get conflated) and a new entry for Hoare 1969.
The Terminals/Surge boundary: both currently want to "land" on CLI agents — needs an owner call on who ends on the fact vs. who owns the explanation.
Chapter 1's internal ordering (above).
A handful of named date disputes inside the individual research files (first email 1971 vs. 1972, ed's creation year, etc.) that need a source decision at drafting time, not now.

well, I don't know exactly. do what is right.

Ok, now the plan is done, start drafting the Core content, and make sure it MUST be very beautiful, having bold words, headings, sub headings, tables etc like the welcome page. also, before finalizing the plan, you will be reading the already written content of the stage 0 to make sure if anything else is written there which we can include in new stage 0 too? start deep research and make sure, because as I am seeing, you have mot included the software architecture completely in this. THIS IS VERY MUST THING.

## Response snapshot

Resolved all four §16.3 open items directly (owner: "do what is right"): (1) Chapter 1 opens on "two states are enough" (1679, Leibniz) before "encoding instructions" (1801, Jacquard) — tie broken strictly by date, per the owner's "chronologically, time to time" answer to open question 1; (2) Parnas citations disambiguated into three distinct papers (Dec 1972 "Criteria" = the only one usable as "Parnas 1972," already canonical in evidence-ledger.yaml as `parnas-1972`; May 1972 "Technique for Module Specification" = distinct, unused; 1976 "Program Families" = not 1972/1985, unused) and a Hoare 1969 CACM citation recorded, both to be added to evidence-ledger.yaml when their chapters actually draft, not speculatively now; (3) Chapter 5/8 boundary resolved as Chapter 5 ending on the bare fact, Chapter 8 owning the explanation, matching the existing handoff-not-a-beat pattern; (4) named date disputes given working answers (first email 1971 not 1972; ARPA→DARPA 1972 not 1971; `ed`'s year kept deliberately soft, circa 1969-1971) with a note that sentence-level verification still happens at drafting time.

Before finalizing the plan and starting to draft, read the currently-shipped `edu-site/docs/intro-2-architecture-map.md` in full plus headings across all five intro-*.md files, per the owner's instruction to check what already exists. Confirmed the owner's flagged gap is real: intro-2 is a Stage-1-facing "build a signup page" walkthrough (frontend/backend, API/REST, SQL/NoSQL/Redis, auth/hashing/OAuth, Git/GitHub, deployment/DNS) with zero chronological-history treatment, and the reformed 9-chapter Stage 0 structure had reduced "architecture" to a single REST capstone Lesson — the origin-story history of client-server, database-model evolution, three-tier/SOA/microservices, containers/cloud, and auth's own history was missing entirely. Launched a sixth DeepSeek research pass (Command Code, deepseek-v4.1-flash, --effort max, real web search, run in background) scoped to that gap, explicitly told not to re-derive the five citations Stage 1 already owns and to recommend its own placement (new standalone chapter vs. distributed additions) rather than assume one. Updated `whole-book-redesign-record-2026-09-14.md`: rewrote §16.2 item 1's lesson order, rewrote all of §16.3 as resolved, added new §17 documenting the gap and the launched research, and added three new §0 pointer bullets. Actual chapter drafting has NOT started yet — it is deliberately held until cluster 6 lands and the structure is revised to include it, consistent with the record's own "nothing written until convergence" rule and to avoid drafting into a chapter shape about to change.

## Outcome

- ✅ Impact: All four previously-open structural questions resolved and recorded; a real, owner-caught content gap (software architecture) is now being researched before drafting starts, rather than silently proceeding with an incomplete structure.
- 🧪 Tests: none (planning/record-keeping work, no code)
- 📁 Files: `curriculum-state/proposals/whole-book-redesign-record-2026-09-14.md` edited (§0, §16.2, §16.3, new §17); `curriculum-state/research/stage-0/cluster-6-software-architecture.md` pending, background job `baiwdfk5d` still running at time of writing
- 🔁 Next prompts: once cluster 6's research lands, synthesize it, revise §16.2's structure to include software architecture (likely a new chapter), report the revision to the owner, then begin actual chapter drafting via `chapter-production`/`lesson-spine-authoring` starting with Chapter 1
- 🧠 Reflection: the owner's read-back request ("before finalizing the plan, you will be reading the already written content") caught a real gap that five parallel research clusters and one synthesis pass had all missed — worth treating any "does this look complete" request as a genuine check, not a formality, before treating a structure as ready to draft against

## Evaluation notes (flywheel)

- Failure modes observed: five independent research clusters plus their synthesis all missed a whole content area (software architecture) because none were briefed to check it against the currently-shipped chapters' actual concept coverage — the research briefs were framed purely around "eras of computing history" and never cross-referenced against what Stage 1's existing content already assumes Stage 0 will have covered.
- Graders run and results (PASS/FAIL): none run
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): future Stage-0-shaped research briefs should always include a "cross-check against currently-shipped chapters' concept/keyword lists" step before being treated as complete, not just "cover every historical era."
