---
id: 0079
title: Absorb three MUST rules into lesson spine skill
stage: general
date: 2026-09-15
surface: agent
model: claude-opus-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["lesson-spine-authoring", "term-glossing", "comprehension-audit", "anti-slop", "canon", "skill-authoring"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .claude/skills/lesson-spine-authoring/SKILL.md (edited — frontmatter description, reference reading list, third and fourth hard constraints added, humanised-prose paragraph added to the language constraint, workflow renumbered 9→11 steps with term-sorting at 6 and the audit at 10, six anti-patterns added, self-check extended)
 - .claude/skills/lesson-spine-authoring/reference/mixed-audience.md (edited — §4 rewritten from "Glossing without stopping" to "Terms: the two-minute test"; two tiers, marked-term link form, zero-knowledge floor, glossary one-entry invariant; §7 self-check extended)
 - .claude/skills/lesson-spine-authoring/reference/language-register.md (edited — new §6 "Humanised prose — the anti-slop rule" with named cadence tics, the positive requirements, and the read-aloud test; old §6/§7 renumbered to §7/§8; self-check extended)
 - .claude/skills/lesson-spine-authoring/reference/comprehension-audit.md (NEW — the ten angles, how to run them, the mindmap test, the findings log, self-check)
 - curriculum-state/canon/audience.md (edited — the per-chapter re-gloss rule now carries the glossary non-duplication invariant it depends on, plus the two-minute/teach-first condition and a pointer to the skill)
 - history/prompts/general/0079-absorb-three-must-rules-into-lesson-spine.general.prompt.md (this file)
tests:
 - No gate applies — this exchange edited skill and canon files, not chapters. `check-chapter.mjs` reads `edu-site/docs/`, which was untouched.
 - Verified by reading, not assumed: `custom.css` 1601–1651 already styles `a[href^="/glossary#"]` as accent-coloured, full-strength-underlined, tinted — the exact render rule 1 asks for, and its code comment quotes the owner's own earlier wording.
 - Verified: `check-references.mjs` already enforces both halves of rule 1's hard case — every `/glossary#<slug>` must resolve to a real heading anchor, and a `weight: major` term must not be used by a chapter positioned before the one recorded as introducing it.
 - Verified: `term-ledger.yaml` carries `term`/`slug`/`weight`/`first_introduced`; all five terms currently seeded `minor` with `first_introduced: null`, so the ordering check is dormant, not failing.
 - Verified: `glossary.md` holds exactly one entry per term (five headings, no stage duplication), so the condition the owner attached to the re-gloss rule already holds today.
 - Cross-reference integrity checked after renumbering: SKILL.md's two "step 10" references both resolve to the comprehension audit; §3/§4 pointers into `language-register.md` from SKILL.md, `mixed-audience.md` and `stations.md` all sit below the inserted §6 and were unaffected.
---

## Prompt

1. 1st rule is that this book's Stage 0, 1 and 2 is Supposed and 100% assumed for the 100% freshers, new comers and ultra beginners, so whenever using ANY TERM, this MUST be make sure that if this term is small and understandable within 1-2 minutes, the word will be italic (not different font), underlined and blue linked to the glossary explanation, and if this term is not understandable within 2 minutes, then THIS term MUST be taught first then will be used, because ABSOLUTE freshers who don't even know what the python is, will be taking these first 3 stages. for stage 3 and 4, same rule but with soft limits and discount because that 2 stages are for intermediaters.
2. Second rule is that when writing ANY content, must make sure that students MUST understand and absorb the concept and whole context and can create a mindmap automatically when reading. no blind content writing at all. WHENEVER "ANY" content will be written, 10 different angle critiques will "MUST" be run for each and every word that is going to be written for how and why ANY one will not understand this, 10 critiques complete end to end.
3. The ALL the content, EACH and EVERY word must be written ultra creatively, in very simple english, and very very humanized, no way to looks like AI generated stupid bloddy slop.
4. NOW, add all these the above 3 MUST rules in the lesson spine skill "PROPERLY" and make this rule absorb these rules,

also, your this rule: :First use is counted per chapter, independently, every time. Glossing a term in Stage 1 doesn't cover Stage 4. Every chapter re-glosses it at its own first use, because a reader can land from a search result or shared link with no earlier chapter behind them." is ONLY acceptable if the terms from other stages will not repeat in the glossary

## Response snapshot

Read all five existing skill files in full before touching any of them, on the reading that "PROPERLY" and "absorb" rule out an appended rules section — each rule had to land in the file that already governs its subject, in that file's own voice and structure.

**The find that changed the shape of the work.** Rule 1 was not a greenfield request. The platform already carries most of its machinery, and the skill simply did not know: `custom.css` 1618–1635 styles `a[href^="/glossary#"]` as accent-coloured with a full-strength underline and a faint tint (its code comment quotes the owner's own earlier phrasing, "a blue underlined word directly linked to the meaning in glossary"); `term-ledger.yaml` carries a `weight: major | minor` field with `first_introduced`; and `check-references.mjs` already fails the build both on a glossary anchor that does not resolve and on a `major` term used by a chapter sitting before the chapter that introduces it. So rule 1's two tiers map onto existing, enforced infrastructure: light = `minor` + marked link, heavy = `major` + the ordering check. The job became teaching the skill to drive machinery that exists, with the owner's two-minute test as the decision rule that assigns weight — rather than inventing a parallel mechanism that nothing enforces.

**Rule 1 → `mixed-audience.md` §4**, rewritten from "Glossing without stopping" into "Terms: the two-minute test." Two tiers, no third option, no exemptions. Tier 1 keeps the inline twelve-word gloss *and* adds the marked form `[*term*](/glossary#slug)` — italic via `*…*`, never backticks, since backticks would render the term as code and make a false claim about the word. Tier 2 may not be glossed at all: taught in the spine before first use, or the lesson restructured, or the term cut. Three judgment calls made explicit rather than left implied:

- **The link never replaces the gloss.** Marking a term and not glossing it is the footnote failure the file already bans, in better styling — a phone reader on paid data does not leave mid-sentence. Both stack.
- **A heavy term may never be taught in a foothold or depth block.** Both must survive §3's delete test, and a definition the spine leans on cannot. Fixed an existing contradiction while doing it: the old text routed over-long glosses to footholds, which the delete test had already forbidden.
- **The old "twelve words or it's a foothold" line was wrong and is now "twelve words or it's Tier 2."** A gloss that needs more room is a sequencing problem, not a layering one.

Encoded the stage split as a **zero-knowledge floor** with two settings — hard for Stages 0–2, soft for 3–4 — stating that the test itself never changes, only its strictness, and that the soft floor discounts effort and never licenses a silent assumption.

**The owner's conditional on the re-gloss rule is satisfied today, and is now written down so it stays that way.** `glossary.md` holds one entry per term with no stage duplication. Added the invariant to both `mixed-audience.md` §4 and `canon/audience.md`: inline glosses repeat per chapter, glossary entries never do — and the second is precisely what makes the first safe, because repeating an *entry* would split a term's meaning across two places that can drift.

**Rule 2 → new `reference/comprehension-audit.md`**, because ten angles with their own procedure is too large to inline, and the skill already uses reference files for exactly this. The operative decision was how to make "10 critiques for each and every word" executable without watering it down: **one angle at a time, swept end to end over the whole draft, ten times.** Running all ten per sentence while scrolling feels faster and produces one vague impression wearing ten labels — the file says so, and names a zero-finding sweep as suspect rather than clean. The ten angles are genuinely distinct: cold landing, unsorted term, silent step, floating referent, unanchored abstraction, unmotivated passage, second-language load, false fluency, structural orphan, stall point. Angle 2 carries the lesson from PHR 0078 directly — a term can be technically glossed once and still be illegible if the gloss was structurally weak or the word drifted in form, so "glossed at first use" means glossed *and kept alive*. The owner's mindmap requirement became a named outcome test with three ranked failure modes, each routed to the level that can actually fix it. Wired in as mandatory workflow step 10 with a findings log presented alongside the draft.

**Rule 3 → new `language-register.md` §6**, "Humanised prose — the anti-slop rule." Kept deliberately concrete, because a vague instruction to sound human changes nothing: ten named cadence tics in a table (dramatic fragment, false pivot, answered rhetorical question, triad, em-dash aside, portentous closer, signposting, riddle opening, stacked metaphor, flat symmetry), then the positive half — uneven rhythm, one specific detail a summary would drop, willingness to be plain and unclever, a real position, warmth without performance — then the read-aloud test. Several of these tics are exactly what got the Welcome page rejected earlier in this same session, so the list is drawn from this project's own evidence rather than invented. Separated the concern explicitly: §3 cuts difficulty the reader fights, §6 cuts sameness the reader endures, and a paragraph can be perfectly plain and still be slop. Deferred the word-level tells to `canon/voice.md`, which already bans them, rather than maintaining two lists that can drift.

**SKILL.md** took the integration: two new hard constraints (third — every term sorted, nothing assumed; fourth — nothing is written blind) sitting alongside the two that were already there, a humanised-prose paragraph folded into the existing language constraint, the reference reading list extended, the workflow renumbered from nine steps to eleven with **term sorting promoted to step 6, before any prose** (a heavy term is a structural fact — discovering it mid-paragraph means rewriting the section around it), six new anti-patterns, and the self-check extended in both files. Updated the frontmatter description so the three rules are advertised rather than buried.

**Scope note, disclosed rather than smuggled:** one file outside the skill was edited. `canon/audience.md` carries the very re-gloss rule the owner conditioned, so leaving it alone would have put canon and the skill in direct contradiction from the moment this landed. The edit adds the glossary invariant, the two-minute/teach-first condition, and a pointer to the skill — kept in that file's own "conditions, not craft" register. Nothing else was touched: no chapter, no ledger, no changelog entry, since no reader-visible thing shipped.

## Outcome

- ✅ Impact: The three MUST rules are now binding parts of the authoring skill's own architecture rather than an appendix — each in the file that governs its subject, each with a self-check line, each reachable from the workflow at the step where it applies. Rule 1 is additionally wired to infrastructure that already enforces it at build time.
- 🧪 Tests: See `tests:` above — no gate applies to skill files; every factual claim about the platform was verified by reading the source rather than assumed.
- 📁 Files: See `files:` above.
- 🔁 Next prompts: Two real gaps the owner may want to close. (1) All five terms in `term-ledger.yaml` are seeded `weight: minor, first_introduced: null`, so the teach-before-use check is dormant — the two-minute test now has a home but nothing has been run through it yet. (2) `glossary.md` states it is generated from `concept-ledger.yaml`, but no generator script exists; the one-entry-per-term invariant is currently held by hand.
- 🧠 Reflection: The strongest move available was not writing rules — it was checking what the repo already enforced before writing any. Rule 1 looked like a request for a new mechanism and was actually a request to connect a skill to machinery already built and already gated. A rule that restates existing enforcement in different words is worse than no rule, because the two drift and nobody knows which one binds.

## Evaluation notes (flywheel)

- Failure modes observed: none this turn. The near-miss was the temptation to append a "## Three MUST rules" section to SKILL.md, which would have satisfied the literal request and failed "PROPERLY" — rules divorced from the files that govern their subject get read once and then ignored, which is how a skill accumulates dead text.
- Graders run and results (PASS/FAIL): none applicable — no chapter changed, so no gate reads these paths. Cross-reference integrity after the §6 insertion and the workflow renumber was verified manually.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): run the two-minute test over the five terms already in `term-ledger.yaml` and set real weights, which would turn the dormant ordering check live and prove rule 1 end to end on content that already ships.
