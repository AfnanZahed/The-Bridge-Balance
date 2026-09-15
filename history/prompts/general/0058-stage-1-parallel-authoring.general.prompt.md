---
id: 0058
title: Author all six Stage 1 chapters in parallel with sub-agents, then verify and write back serially
stage: general
date: 2026-09-11
surface: agent
model: claude-sonnet-5
feature: none
branch: none (no version control in this project)
user: afnanzahed@gmail.com
command: none (freeform chat — "use the subagents with deepseek v4.1 for parallel work")
labels: ["stage-1", "chapter-authoring", "parallel-agents", "ledgers", "gate-chain", "defect-found", "split-question"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - edu-site/docs/stage-01-spec-aware-vibe-engineering/01-foundations.md (placeholder → 4,218-word chapter)
  - edu-site/docs/stage-01-spec-aware-vibe-engineering/02-core-programming.md (→ 4,729 words)
  - edu-site/docs/stage-01-spec-aware-vibe-engineering/03-frontend.md (→ 4,025 words)
  - edu-site/docs/stage-01-spec-aware-vibe-engineering/04-backend.md (→ 6,121 words)
  - edu-site/docs/stage-01-spec-aware-vibe-engineering/05-databases.md (→ 4,618 words)
  - edu-site/docs/stage-01-spec-aware-vibe-engineering/06-git-github.md (→ 5,172 words)
  - curriculum-state/ledgers/prerequisite-graph.yaml (6 rows flipped to text-ready, titles/teaches/scope recorded; progress block rewritten)
  - curriculum-state/ledgers/concept-ledger.yaml (53 Stage 1 concepts; 11 pre-existing terms extended rather than duplicated; Next.js promoted from used-undefined to defined)
  - curriculum-state/ledgers/evidence-ledger.yaml (22 new sources; one pre-existing YAML defect fixed)
  - curriculum-state/ledgers/example-ledger.yaml (shared-object continuation, 8 spent examples, 9 recorded rejections)
tests:
  - node scripts/check-chapter.mjs -> 11 chapters checked, 15 skipped, 0 errors, 0 warnings
  - npm run build -> frontmatter, references, chapter gate, manifest (20 states), search index (26 docs), Docusaurus build all green
  - Gate re-run by the orchestrator, not taken on the agents' word
  - js-yaml parse of all four ledgers -> all OK, correct top-level keys
  - Duplicate-term check -> 0 duplicates across 172 concepts
  - Boundary-guard greps -> s1-04 contains no SQL/transaction/constraint teaching; s1-03 contains no status-code or HTTP-method teaching
  - Positional-reference grep -> no "previous chapter"/"next chapter" anywhere in Stage 1
---

## Prompt

"use the subagents with deepseek v4.1 for parallel work"

A directive about method rather than a new task. Read against the project state: the intro was finished, and the prerequisite graph showed 15 placeholder lesson files with six of them in Stage 1 whose index was already text-ready. Stage 1 was the next coherent unit. The progress block also recorded that this exact method had already worked once — "intro-2 through intro-5 were authored... four chapters drafted concurrently by sub-agents from a shared authoring brief, then verified, gated and written back serially by the orchestrator."

## Response snapshot

**Scoped deliberately.** Wave 1 = Stage 1's six chapters. Stage 2 was excluded because `canon/integrity-floor.md` gates all CS50 work behind an academic-integrity rule that needs its own reading; Stages 3–4 were excluded because they build on Stage 1's concepts. Six agents, one per chapter, on `deepseek/deepseek-v4.1-flash` — validated with a throwaway probe before committing six long runs to it.

**The brief, and the one thing that had to change.** Written to the scratchpad as a shared contract, mirroring the intro's proven brief — with the audience rule reversed. The intro was the beginner-only exception; Stage 1 is the book's standard deliberately **mixed** audience. So the brief teaches footholds and depth blocks instead of "gloss everything for a beginner", and states that the exception was not carried forward.

**Concept allocation was the real work.** Six agents writing concurrently about overlapping material will collide. Each chapter got an explicit ownership list plus boundary guards naming what it must NOT teach, and the stage was given a single question per layer of one shared object — the club sign-up page the intro already built. Verified after the run by grep: the backend chapter states the last-seat race and contains no transaction or constraint; the frontend chapter uses `fetch` as a black box and never enumerates a status code. The guards held.

**Result:** 11 chapters checked, 0 errors, 0 warnings. Stage 1's six: 4,218 / 4,729 / 4,025 / 6,121 / 4,618 / 5,172 words.

**The stage has an arc, and it is load-bearing.** s1-04 poses the two-students-one-seat race and refuses to solve it, because the fix is a database mechanism; s1-05 solves it with a constraint and a transaction. Recorded in the example ledger as a dependency so a future edit to either chapter knows about the other.

**A defect only the full chain could catch.** s1-03's draft named two illustrative Next.js page files inside backticks. `check-references.mjs` treats any backticked token ending in a real file extension as a repo path, so the build failed with two dead references — while the chapter gate had passed that chapter cleanly. Fixed by naming the route folders instead.

**Then I reproduced the same defect while recording it.** The first version of that note lived in `prerequisite-graph.yaml`, which is scanned too, and backticked the same two paths. It failed the reference check a second time. Worth keeping in the record: a defect note is a document under the contract it describes.

**And a pre-existing defect surfaced underneath it.** While validating the ledgers I parsed them rather than trusting them, and found `evidence-ledger.yaml` had never been valid YAML — a quoted scalar with trailing text in parentheses on the `sd-paper-feb-2026` entry. Nothing parses that file, so it had gone unnoticed indefinitely. Fixed, and all four ledgers now parse.

**One rule I broke and then repaired.** My first pass added 11 concept entries whose terms already existed — `component`, `endpoint`, `repository`, `commit`, `branch`, `merge conflict`, `pull request`, `middleware`, `statelessness`, `breakpoint`, `blast radius`. The ledger's own first rule is one canonical definition per term, with register variants under the same entry. Deleted the duplicates and extended the originals instead, with notes recording how Stage 1 deepens each. Two of those notes are substantive: `branch` records that s1-06 **corrects** the intro's "separate copy of the work" (a branch is one file holding one hash), and `component` now carries two registers because s1-01 and s1-03 use it in genuinely different senses. `Next.js` moved from `used-undefined` to `defined`, completing a staged introduction the intro had explicitly deferred.

**The split question, re-opened rather than answered.** s1-04 at 6,121 words is an outlier — 18% above the next longest in the stage, 52% above the shortest. The authoring agent flagged it rather than splitting unilaterally and named its own natural seam. The split was not taken: restructuring a chapter is an editorial decision about the book's shape, and the intro's precedent is to record the judgment and surface it. It is recorded in three places and surfaced to the owner as the one open decision.

## Outcome

- ✅ Impact: Stage 1 is fully authored — 6 chapters, ~28.9k words, gate-clean, built, and ledgers written back. Book progress 5 → 11 authored chapters; 9 placeholders remain (Stage 2 ×2, Stage 3 ×4, Stage 4 ×3).
- 🧪 Tests: chapter gate 11/11 clean; full build green; all four ledgers parse; 0 duplicate concepts across 172; boundary guards and positional references verified by grep.
- 📁 Files: 6 chapter files, 4 ledgers. No sidebar change needed — the placeholder files already carried their nav contract, and all six preserved `sidebar_label`/`sidebar_position` exactly.
- 🔁 Next prompts: (1) decide whether s1-04 is split at "The form validates, and the endpoint validates anyway"; (2) Stage 2 needs `integrity-floor.md` read before any CS50 chapter is drafted; (3) Stages 3–4 follow and depend on Stage 1; (4) the two shipped chapters with recorded problems remain — intro-2 draws a full club as 403 where 409 is correct, and s1-05 ships `transaction` without a standalone definition.
- 🧠 Reflection: the parallel run worked because the brief did the coordinating — concept ownership, boundary guards, one shared object, and an audience rule stated as the reverse of the previous run's. The failures it did produce were both in the last mile: a reference the chapter gate cannot see, and ledger hygiene I broke myself. Running the chain, and parsing the ledgers rather than trusting them, is what found all three.

## Evaluation notes (flywheel)

- Failure modes observed: (1) an illustrative path in backticks fails a check that cannot distinguish illustration from reference — and the same mistake is easy to make again in the note that records it; (2) a ledger can be invalid YAML for months because nothing parses it; (3) authoring fresh concept entries collides with existing ones when six agents work from prose rather than the ledger; (4) an outlier chapter length is a judgment call that agents should flag rather than resolve.
- Graders run and results (PASS/FAIL): chapter gate PASS; full build PASS; ledger YAML parse PASS; duplicate-concept check PASS; boundary-guard grep PASS; positional-reference grep PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): add a ledger validation step to the gate chain — parse all four YAML files and fail on duplicate concept terms and dangling `requires` ids. Both defects found this session (invalid YAML, and the earlier dangling `requires: [intro]`) would have been caught by it, and neither is currently visible to anything.
