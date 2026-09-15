---
id: 0046
title: Add "Engineering over development" doctrine to canon and both intros
stage: general
date: 2026-09-09
surface: agent
model: claude-sonnet-5
feature: none
branch: none
user: Book
command: (conversational request, no slash command)
labels: [engineering-over-development, thesis, canon, intro, intro-spine-experiment, doctrine, ledgers]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - curriculum-state/canon/thesis.md (added "## Engineering over development" section, after "## The thesis", before "## The two extremes")
  - edu-site/docs/intro.md (added "### Development versus Engineering — naming the shape" section, after "### The question this table is actually answering"; added one Sources bullet for the new Dice Tech Job Report July 2026 figure)
  - edu-site/docs/intro-spine-experiment.md (added "## The keyboard was never the whole discipline" section, after "## The loop the name predicts"; extended the existing Lineage-station paragraph on the Development/Engineering naming choice with 2 sentences; updated scope_reason to name the addition; added one Sources bullet)
  - curriculum-state/ledgers/concept-ledger.yaml (new entry: "Development (vs. Engineering)", first_defined curriculum-state/canon/thesis.md, used_in both intro chapters)
  - curriculum-state/ledgers/evidence-ledger.yaml (new entry: dice-report-jul-2026, status: proposed, real URL, last_verified 2026-09-09; questions_asked rows for both chapters; notes record that the originally-intended "10% to 50%" solution_statement.md figure could not be independently verified and was dropped in favour of this one)
  - curriculum-state/ledgers/prerequisite-graph.yaml (both intro and intro-spine-experiment rows: extended teaches list with "the Development versus Engineering distinction"; appended dated notes explaining the change)
  - history/prompts/general/0046-scope-engineering-over-development-doctrine.general.prompt.md (this file, updated in place from the scoping-only version written mid-task)
tests:
  - "node scripts/check-chapter.mjs --chapter docs/intro.md -> ok, 3,321 words, ~22.1 min, 1 pre-existing warning (keywords-missing, present before this session touched the file, per PHR 0045's own build output), 0 errors"
  - "node scripts/check-chapter.mjs --chapter docs/intro-spine-experiment.md -> ok, 2,763 words, ~18.4 min, 0 errors, 0 warnings"
  - "npm run build (edu-site) -> check:frontmatter passed; check:refs passed; check:chapter: 2 checked (docs/intro.md, docs/intro-spine-experiment.md), 24 skipped as placeholder (listed by name), 0 errors, 1 pre-existing warning; chapter-manifest: 20 states written; search-index: 26 documents, 26 records written; docusaurus build: client and server both 'Compiled successfully', '[SUCCESS] Generated static files in build'"
  - "js-yaml strict parse (node -e requiring edu-site/node_modules/js-yaml) on concept-ledger.yaml, evidence-ledger.yaml, prerequisite-graph.yaml -> all 3 OK, no syntax errors"
  - "Live browser check against the running edu-site dev server: http://localhost:<port>/intro shows 'Development versus Engineering — naming the shape' in place between 'The question this table is actually answering' and 'The map when you are the reviewer, not the author', and in the right-hand table of contents; http://localhost:<port>/intro-spine-experiment shows 'The keyboard was never the whole discipline' in place after 'The loop the name predicts', also in its table of contents; zero console errors on either page"
  - "WebSearch + WebFetch verification (2026-09-09): the '10% to 50% AI/ML role share' figure originally drafted from The Bridge Balance/Official docs/solution_statement.md's own text could NOT be confirmed against any live Dice report and was dropped rather than shipped unverified. A different, independently verified figure was used instead: Dice Tech Job Report, July 2026 edition, via CIO Dive (https://www.ciodive.com/news/dice-report-tech-hiring-AI/824893/), published 9 July 2026, citing Dice's analysis of 7 million US tech job postings - traditional software-development postings down 22% year over year in Q1 2026, AI-titled postings up 173% over the same period."
---

## Prompt

Turn 1 (task-defining): "In the book, in the official docs and in the thesis, and in the intro chatpers, everywhere write, record and teach this rule that in this new AI era, we have to shift out focus from development to engineering. "ENGINEERING IS THE KEY", not development, that doesn't meant the blindness for AI or for us, we will ofcourse contribute to development and the AI will contribute to engineering, but our main stage is Engineering and AI's main stage is Development + Engineering (research, planinng etc). and in the intro, add this points of Development VS Engineering, and also that coding sytax, and keyboard typing is no longer the game for us, because students often think that when they will be a coder, they will proudly and heroicly type the keys and perform coding, that's major mistake"

Turn 2 (clarifying answers via AskUserQuestion, after research established that "the thesis" = `curriculum-state/canon/thesis.md`, "the official docs" = the sibling project's `Official docs` folder — which already argues almost exactly this point in `solution_statement.md`'s "Part I: The Learning Model — Engineering Over Development" — and that two live `text-ready` intro documents currently exist): "Canon + intro (Recommended)" to the durability question (should this become an explicit canon principle, not just intro prose), and "Both (Recommended)" to which intro document(s) should carry the new section (`intro.md` and `intro-spine-experiment.md`, both currently text-ready and undecided between).

## Response snapshot

Routed through `bridge-balance-project-guide` per CLAUDE.md. Confirmed this task fits neither of the four bundled protocols cleanly (`curriculum-architect`'s three modes don't cover canon amendment; `chapter-production/SKILL.md` line 75 explicitly excludes "revising or copy-editing a chapter that already exists and already passes" from its own scope) — per the guide's own instruction, treated it as a direct, scoped edit: drafted the new prose under `lesson-spine-authoring`'s craft rules (stations.md, mixed-audience.md, language-register.md all read in full first), then handled gate/ledger write-back myself rather than running chapter-production's from-scratch research pipeline.

Found that `intro.md`'s existing four-stage table already splits Implement (execution) from Specify/Design/Verify (judgment) — the Development/Engineering distinction just needed naming, not inventing. Found that `intro-spine-experiment.md`'s existing Lineage station already contrasts "Development" and "Engineering" by name (explaining why this curriculum uses "Engineering" where GitHub's Spec Kit uses "Development") — extended that existing passage by two sentences rather than duplicating it.

Attempted to verify the specific "10% to 50% AI/ML role share" statistic drafted from `solution_statement.md`'s own text (an approved canonical source per `thesis.md`'s Source discipline) via WebSearch, then WebFetch on a CIO Dive article summarizing the Dice Tech Job Report. The exact figure did not check out — the real, verifiable numbers were different (15% to 73% AI-skill-listing share, Jan 2024 to May 2026; 173% YoY growth in AI-titled postings; 22% YoY decline in traditional software-development postings, Q1 2026). Dropped the unverifiable figure per `thesis.md`'s own rule ("Never invent a statistic... If a source is unavailable, stale, disputed, or retracted: stop and surface it") and lesson-spine-authoring's "where a fact cannot be verified, say so or drop it." Used the independently verified 22%-down / 173%-up pair instead, which supports the same point more precisely than the original draft would have.

Made four edits: (1) `canon/thesis.md` gained a new "Engineering over development" section, stated evergreen (no dated stats, since canon "must never drift"), sourced to `solution_statement.md` Part I, deliberately not added as a 7th mandatory chapter invariant (that would be a bigger, unrequested change to the gate's implicit contract); (2) `intro.md` gained a "Development versus Engineering — naming the shape" section, placed to build directly on the chapter's own closing line of the preceding section ("judgment on the human side, execution on the AI side"); (3) `intro-spine-experiment.md` gained "The keyboard was never the whole discipline" (placed right after the responsibility-loop table) plus the two-sentence Lineage-station extension; (4) all four ledgers updated — a new concept-ledger entry for "Development (vs. Engineering)" first-defined in canon, a new evidence-ledger entry for the verified Dice figure (`status: proposed`, per this repo's established promote-on-ship convention), both prerequisite-graph rows' `teaches` lists extended, `example-ledger.yaml` left untouched (no new worked example was introduced, confirmed by reading it).

Ran the gate on both files individually (0 errors each), then the full `npm run build` five-gate pipeline (0 errors), then strict-parsed the three edited YAML ledgers, then did a live browser check against the running dev server confirming both new sections render in place with zero console errors.

## Outcome

- ✅ Impact: "Engineering over Development" is now explicit, durable canon (inherited by every future chapter through the existing canon-read step) and is explicit prose in both live intro documents, each landing at the exact point the chapter's own existing argument already implied it — not bolted on as a new topic.
- 🧪 Tests: `check-chapter.mjs` clean on both files; full `npm run build` clean (0 errors across all five gates); 3 edited ledger YAML files strict-parsed with no syntax errors; live dev-server check confirmed both sections render correctly with zero console errors.
- 📁 Files: 2 canon/chapter edits with real content, 3 ledger files updated, this PHR.
- 🔁 Next prompts: the `dice-report-jul-2026` evidence-ledger entry is `status: proposed` per this repo's convention — a quick human glance would promote it to canonical; whenever the project owner decides between `intro.md` and `intro-spine-experiment.md` (still an open, explicitly-deferred decision per `prerequisite-graph.yaml`), both now carry this section consistently either way.
- 🧠 Reflection: the single biggest risk in this task was shipping an unverified statistic under time pressure to "just add the point" — checking it costs one WebSearch and one WebFetch, and it changed the actual number that shipped. Worth treating as the default move whenever a canon or official-doc source cites an external dated figure, not just when something already looks doubtful.

## Evaluation notes (flywheel)

- Failure modes observed: none that shipped — one was caught before shipping (the unverifiable "10% to 50%" figure) and corrected within the same turn.
- Graders run and results (PASS/FAIL): gate (PASS x2), full build (PASS), YAML strict-parse (PASS x3), live browser render check (PASS x2, zero console errors).
- Prompt variant (if applicable): n/a.
- Next experiment (smallest change to try): n/a.
