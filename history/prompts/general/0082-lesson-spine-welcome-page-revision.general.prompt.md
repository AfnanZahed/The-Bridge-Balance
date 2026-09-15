---
id: 0082
title: Lesson-spine welcome page revision
stage: general
date: 2026-09-15
surface: agent
model: claude-sonnet-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["lesson-spine-authoring", "welcome", "two-minute-test", "glossary", "name-registers", "voice-canon-sync", "comprehension-audit"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/docs/welcome.md (edited — opening gloss tightened to 12 words and linked to `/glossary#agent`; `Spec-Driven Engineering` switched from bold to the prescribed italic-link `/glossary#spec-driven-engineering`; "Why can't the checking move to the machine?" section rewritten to add a Register-4 name-check on *coding agent*, fix an "an agent's" term-drift instance, add an honest metaphor-limit line, and tie the close back to Spec-Driven Engineering)
 - edu-site/docs/changelog.md (edited — new bullet under the existing 2026-09-15 entry describing today's revision)
 - curriculum-state/canon/voice.md (edited — Register section's flat "gloss every term in twelve words, every time" rule corrected to the two-minute-test tier rule from PHR 0079/0080, a staleness this file carried that those two PHRs missed)
 - curriculum-state/ledgers/concept-ledger.yaml (edited — its own "Rules:" header comment carried the same stale flat-glossing rule, found by a follow-up corpus grep for "twelve words" after fixing voice.md; corrected the same way)
 - history/prompts/general/0082-lesson-spine-welcome-page-revision.general.prompt.md (this file)
tests:
 - cd edu-site && node scripts/check-chapter.mjs --chapter docs/welcome.md — ok, 880 words, 0 errors, 1 pre-existing warning (safety-floor-absent, not introduced by this edit, flagged to the user rather than silently added or silently ignored)
 - cd edu-site && node scripts/check-references.mjs — Reference validation passed (confirms both new `/glossary#agent` and `/glossary#spec-driven-engineering` links resolve to real headings)
 - Browser verification: started the edu-site dev server, loaded the rendered Welcome page, confirmed both new glossary links render in the expected italic/accent/underline style, clicked the `coding agent` link and confirmed it lands on the live Glossary page
---

## Prompt

Now, use the lesson spine skill and re-write the welcome page.

## Response snapshot

**Read before writing anything.** The current shipped `welcome.md` (already `text-ready`, already through two prior rejection-and-fix cycles per PHRs 0074/0076/0077/0078), the `feedback-welcome-page-voice-rejected-robotic` memory, `curriculum-state/proposals/welcome-page-brief-2026-09-14.md` (the CS50P/Hugging-Face comparative study behind the current page), and the full current text of `lesson-spine-authoring/SKILL.md`, `reference/stations.md`, and `reference/name-registers.md` — the last two not read yet this session.

**The blocking tension, surfaced before drafting.** Station 0 of the spine works by staging a guess at a name's meaning and scoring it later ("a prediction that is never scored is worse than no prediction"). That is mechanically the same device as the "guess what *balance* means… you're wrong… guess again" opening the owner rejected on this exact page as "ULTRA Stupid" and "very very robotic." Asked the owner directly, via `AskUserQuestion`, how literally the twelve-station structure should apply given that conflict. They chose **"Full spine, HF-style opening"**: run the complete skill's disciplines, keep the current direct opening intact, and place any name-decomposition device later in the page as elaboration, never as the opening move.

**Deliberately did not restage the guess-and-score device on the word "balance," even relocated.** The current shipped opening already turns that exact word into a plain statement ("That's what *balance* means…") rather than a riddle — confirmed by reading it — and re-introducing the guessing mechanic on the same word felt like resurrecting the rejected device by position alone, not by removing what actually made it land as performance rather than welcome. Instead, ran Station 0's Register-4 ("invert the question — why is it called that when it isn't that") treatment on **"coding agent"** — a different word, a different mechanism (no staged guess, no reveal beat), directly load-bearing for the page's own thesis, and it already had a natural home in the existing "Why can't the checking move to the machine?" section rather than needing a new one. Flagged this substitution explicitly rather than silently deciding it.

**Ran the station sheet against the existing page rather than rebuilding it.** Classified it Concept-shaped (weight on Why/What, cost legitimately thin, HOW replaced by "the smallest next action" rather than a code demo since this is a front door, not a tutorial). Found the existing page already satisfies S1 (courier anchor), S2 (Source — who's behind this), most of S4's contrast class (over-trust vs. over-caution), and S11 (the discipline "carries you through every stage") without changes. Logged S9 (Lineage) as legitimately dropped — a front door capped at "one idea… lands inside the first screen" is the wrong place to open a live disagreement thread; that belongs inside actual chapters.

**Applied the two-minute term test and found a real glossary-consistency gap.** `edu-site/docs/glossary.md` already carries canonical entries for *Agent* and *Spec-Driven Engineering* (first attributed to `intro-5-spec-driven-engineering`), but Welcome's own wording for "coding agent" diverged from the canonical gloss and neither term was link-marked, and the opening gloss ran 18 words against the 12-word ceiling. Tightened the gloss, aligned its meaning with the canonical entry, added both `[*term*](/glossary#slug)` marks, and fixed a term-drift instance ("An agent's answer" → "A coding agent's answer") the shipped page already carried. Did not touch the glossary's own "first defined in" attribution — Welcome now reading before `intro-5` in first-use order is a real observation but changing canonical attribution is a bigger call than this task's scope; flagged instead of silently edited.

**A second, older staleness turned up while checking `voice.md` against PHR 0081** (a prior fix on this exact page's term-glossing, which pointed at `voice.md`'s "Structural tells" list). `voice.md`'s Register section still stated the flat pre-two-minute-test rule ("gloss every term in twelve words, every time") that PHR 0079/0080 superseded everywhere else they touched — a third stale copy those two passes missed. Corrected it to the tier rule, citing `mixed-audience.md` §4 as before.

**Ran the anti-slop and comprehension checks against every added sentence**, not just the finished paragraph: checked for triads, closing-restatement, rhetorical-question transitions, hedge inflation, and the "concrete before abstract" ordering rule in `canon/voice.md` (not read earlier this session; caught mid-task via the PHR 0081 cross-reference) — reordered the coding-agent anchor to lead with the two named anchors (travel agent, real-estate agent) before the abstraction, and split an over-long, multi-clause sentence that had exceeded the 28-word ceiling.

## Outcome

- ✅ Impact: Welcome now applies the two-minute test and the Register-4 name-check to its own core term while keeping the HF-style direct opening the owner explicitly required; the page's two glossary-carried terms are correctly linked and consistent with the canonical wording for the first time. Both gates pass clean.
- 🧪 Tests: See `tests:` above.
- 📁 Files: See `files:` above.
- 🔁 Next prompts: (1) The `safety-floor-absent` warning is pre-existing and unaddressed — worth a deliberate yes/no from the owner rather than a silent add. (2) Welcome now reads before `intro-5-spec-driven-engineering` in first-use order for *Agent* and *Spec-Driven Engineering*, while the glossary still attributes "first defined in" to the later chapter — not a mechanical error (ordering isn't enforced; all `term-ledger.yaml` weights are still `minor`), but an editorial inconsistency worth a deliberate call if the owner wants first-use credit to follow actual reading order. (3) The follow-up grep also found the same stale flat-glossing phrasing in `curriculum-state/ledgers/prerequisite-graph.yaml` (line ~181, a 2026-09-10 revision note scoped to the five intro chapters) — left unedited since it reads as a historical annotation rather than a standing rule, but worth a look if the owner wants every copy converged.
- 🧠 Reflection: The user's own answer to the clarifying question ("keep the opening, move any name-check later") still left a real judgment call open — *which* word gets the name-check and *which* mechanism (staged guess vs. Register-4 inversion). Treating "not the same word, not the same mechanism" as the actual constraint, rather than "anywhere but the top of the page," is what kept this from becoming a relocated version of the same rejected thing.

## Evaluation notes (flywheel)

- Failure modes observed: none in the shipped result. The near-miss was `voice.md` — it was never on this task's initial reading list and would have shipped a third stale copy of the pre-two-minute-test rule if PHR 0081 hadn't been read first to check a different question (whether a banned-opener pattern existed), which happened to surface it.
- Graders run and results (PASS/FAIL): check-chapter.mjs — PASS (1 pre-existing warning). check-references.mjs — PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): a corpus-wide grep for the old flat-glossing phrasing ("in every chapter, every time" near "twelve words") across `canon/*.md` and `.claude/skills/**/*.md`, since it has now been found stale in three separate files (`CLAUDE.md`, `bridge-balance-project-guide/SKILL.md`, `canon/voice.md`) discovered one at a time rather than by a single sweep.
