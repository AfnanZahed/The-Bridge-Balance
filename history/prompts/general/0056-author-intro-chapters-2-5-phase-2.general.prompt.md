---
id: 0056
title: Author intro-2 through intro-5 and close out Phase 2
stage: general
date: 2026-09-10
surface: agent
model: claude-sonnet-5 (orchestrating session); deepseek/deepseek-v4.1-flash (four drafting sub-agents)
feature: none
branch: none (no version control in this project)
user: afnanzahed@gmail.com
command: none (freeform chat — "forget the subagents, do yourself" then "continue and just finish the task")
labels: ["chapter-production", "lesson-spine-authoring", "intro-sequence", "intro-2", "intro-3", "intro-4", "intro-5", "parallel-authoring", "ledgers", "phase-2-execution"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - edu-site/docs/intro-2-architecture-map.md (spine-treated in full; chapter_state flipped to text-ready)
  - edu-site/docs/intro-3-editors-and-ides.md (authored in full; chapter_state flipped to text-ready)
  - edu-site/docs/intro-4-terminals-and-cli-agents.md (authored in full; chapter_state flipped to text-ready)
  - edu-site/docs/intro-5-spec-driven-engineering.md (merge-and-rewritten from the raw concatenation; chapter_state flipped to text-ready)
  - edu-site/docs/intro-1-binary-to-programming.md (three inline gloss defects fixed: operating system, device driver, traceback)
  - edu-site/docs/intro-3-editors-and-ides.md (one inline gloss defect fixed: guard clause)
  - curriculum-state/ledgers/concept-ledger.yaml (~90 first-use terms recorded across the four chapters, canonical wording taken from shipped prose)
  - curriculum-state/ledgers/evidence-ledger.yaml (11 new canonical sources; 5 existing sources gained new questions; dice-report-jul-2026 promoted from proposed to canonical)
  - curriculum-state/ledgers/example-ledger.yaml (club-signup shared object, the broken diff, the shell mismatch and the four one-stage-cut miniatures recorded; intro-worked-examples corrected for what the merge actually kept vs dropped)
  - curriculum-state/ledgers/prerequisite-graph.yaml (intro-2..intro-5 to text-ready with real teaches lists; authored 1 -> 5; three dangling requires: [intro] fixed)
  - curriculum-state/contracts/calibration.md (anchor set to intro-5's measured 3,940 words; scope-multiplier correction recorded)
  - curriculum-state/proposals/stage-00-intro-resequence-2026-09-10.md (fifth pass appended — Phase 2 executed)
  - edu-site/src/data/chapterManifest.ts (regenerated via npm run gen:manifest, 20 states)
tests:
  - node scripts/check-chapter.mjs -> 5 chapters ok, 21 placeholder-skipped, 0 errors, 0 warnings
  - node scripts/check-chapter.mjs --chapter docs/intro-5-spec-driven-engineering.md -> ok, 3,940 words, ~26.3 min
  - npm run build -> check:frontmatter PASS, check:refs PASS, check:chapter PASS, manifest 20 states, search-index 26 docs, Docusaurus build green
---

## Prompt

Two instructions, in sequence. First: "you can use the subagents with deepseek v4.1 max effort this task in parallel to make the task faster" — an approval to parallelise the remaining Phase 2 authoring. Then, after two cancelled waits: "forget the subagents, do yourself", followed by "continue and just finish the task carefully and responsibly."

The underlying task is Phase 2 of the intro resequence (PHR 0054's Phase 1 did the mechanical restructuring; PHR 0055 did chapter 1): author `intro-2` through `intro-5` through `lesson-spine-authoring`, applying two owner corrections that arrived mid-flight — **these five chapters are for the absolute beginner only**, not the book's usual mixed audience — and **a chapter that comes out disproportionately long becomes a sidebar sub-category rather than one flat file**, then gate each chapter, write the four ledgers back, set the calibration anchor, regenerate the manifest, and file PHRs.

## Response snapshot

Opened by launching all four chapters concurrently as background sub-agents from a shared authoring brief written to the scratchpad, which carried the audience exception, the language register, the twelve stations, the six curriculum invariants, the frontmatter contract, the source-verification protocol and the report format — so four writers worked from identical rules rather than four interpretations. The four took `deepseek/deepseek-v4.1-flash`.

Deliberately serialised behind them: the four ledgers, `sidebars.ts` and the build. Four agents appending to the same YAML files would have clobbered each other, and concurrent Docusaurus builds would have thrashed the dev server the owner already had running. The agents were told explicitly to write only their own chapter file and to report the ledger facts back instead.

All four agents completed. Verified their work rather than trusting the handback, because the reports never reached the orchestrator (the waits were cancelled). Confirmed on disk: `intro-2` kept all eleven `/img/lessons/intro-3/` references exactly in place; `intro-3` and `intro-4` reference no image at all and carry the required "Current as of writing" callouts dated 10 September 2026; `intro-5` has a single h1, no Mermaid fence, and the raw-merge marker gone.

Then measured everything before deciding anything. This mattered twice:

1. **The calibration contract reads "There is no word band"** — the multiplier is "a declaration of intended size justified by its own `scope_reason`, not as a ratio against a fixed anchor." So `intro-3` at 4,132 words declaring 1.0 is not a mismatch, and nothing needed "fixing." Reading the contract first prevented a wrong correction.
2. **The split decision turned on real numbers.** With `intro-1` at 2,395 and the four new chapters at 4,500 / 4,132 / 4,001 / 3,940, no chapter is an outlier — and `intro-5`, the chapter the split rule was originally written for, is the **shortest** of the four. The pre-agreed condition was not met, so the split was not taken, and that judgment is recorded in three places rather than left silent.

Write-back, all four ledgers serially: ~90 concepts with canonical wording taken from shipped prose; 11 new evidence sources plus 5 existing ones asked genuinely new questions; four new example entries including the newly-shared club sign-up object; `prerequisite-graph` rows flipped to `text-ready` with real `teaches` lists and `authored` 1 → 5.

Two fixes found by inspection, neither of which any gate catches:

- **A dangling `requires` reference.** `s1-index`, `s1-01` and `s3-prompt` still carried `requires: [intro]` — the chapter id retired in Phase 1. All three now require `intro-5`. Nothing in the check chain validates `requires`-reference integrity, so this survived a clean build.
- **Four unglossed first-use terms** (`operating system`, `device driver`, `traceback` in `intro-1`; `guard clause` in `intro-3`). The per-chapter first-use rule admits no exceptions, and these chapters are for a reader with no prior technical knowledge.

One self-inflicted error, caught by the gate: the first rewrite of the calibration anchor named the retired `intro.md` as a backticked path, and `check-references` failed the build on it. Rephrased to describe the retired chapter without the path.

## Outcome

- ✅ Impact: Phase 2 complete. All five intro chapters are `text-ready` and gate-clean; the resequenced intro sequence is finished, and the SDD-versus-SDE line that Phase 1 left deliberately open is now drawn by name in `intro-5` — placed where the Station 0 prediction is scored, so the reader's own guess turns out to describe SDD, which is why the title's last word is *Engineering*.
- 🧪 Tests: `npm run build` green end to end — frontmatter, references, chapter gate (5 ok / 21 skipped / 0 errors / 0 warnings), manifest 20 states, search-index 26 docs, Docusaurus build. The final word counts are the gate's own, and every ledger records those readings rather than copies of them.
- 📁 Files: four chapters authored or rewritten, two revised for gloss defects, all four ledgers written back, the calibration anchor set, the proposal's fifth pass appended, and the manifest regenerated by script — never hand-edited.
- 🔁 Next prompts: none outstanding for the intro sequence. The open item in the book is unchanged and larger: every Stage 1–4 chapter is still a `placeholder`, and `check-chapter` still lists all 21 by name as "not checked." The obvious next move is Stage 1, starting with `s1-01`.
- 🧠 Reflection: the parallel run worked because the four writers shared one written brief and were forbidden from touching shared state — the split between drafting and write-back was the thing that made concurrency safe, not the number of agents. The more interesting lesson is about measurement: the split decision would have been made wrongly twice over if it had been made on impression. Impressions said `intro-5` was the fat finale that needed splitting; the gate said it was the leanest of the four. And the calibration contract's "no word band" line would have sent the work into correcting four chapters that were never wrong. Read the contract, then measure, then decide.

## Evaluation notes (flywheel)

- Failure modes observed: (1) sub-agent reports were lost to cancelled waits, so results had to be re-derived from disk — the fix is to have agents write their report to a scratchpad file, not to rely on the return value surviving. (2) `check-references` catches retired-path references in prose, which is exactly the bug class it was extended for in PHR 0042 — it caught this session's own regression. (3) `requires`-reference integrity is unvalidated anywhere in the chain, so a retired-id dependency can outlive the retirement invisibly; this is a real gap and a candidate for a fourth check.
- Graders run and results (PASS/FAIL): check-chapter PASS (5/5); npm run build PASS; check:refs initially FAIL (2 dead references, self-inflicted, fixed).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): add a `requires`-integrity assertion to the existing check chain — every `requires` entry must resolve to an `id` present in `prerequisite-graph.yaml`. It is a few lines, it is the exact bug found twice now, and the current chain cannot see it. Cheaper than another inspection pass.
