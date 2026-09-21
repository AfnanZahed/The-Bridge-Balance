---
id: 0114
title: Owner answers applied across every content rule file
stage: general
date: 2026-09-20
surface: agent
model: claude-opus-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["canon", "voice", "audience", "corrections", "constitution", "lesson-spine-authoring", "gate", "stage-0", "beginner-first", "naming"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - curriculum-state/canon/voice.md
 - curriculum-state/canon/audience.md
 - curriculum-state/canon/thesis.md
 - curriculum-state/canon/corrections.md
 - curriculum-state/canon/naming.md
 - curriculum-state/canon/integrity-floor.md
 - curriculum-state/canon/research-and-comparison.md
 - curriculum-state/README.md
 - curriculum-state/stage-0-drafting-plan.md
 - curriculum-state/research/stage-0/cluster-1-foundations.md
 - curriculum-state/proposals/README.md
 - curriculum-state/proposals/whole-book-redesign-record-2026-09-14.md
 - curriculum-state/ledgers/concept-ledger.yaml
 - curriculum-state/ledgers/evidence-ledger.yaml
 - curriculum-state/ledgers/example-ledger.yaml
 - curriculum-state/ledgers/prerequisite-graph.yaml
 - .claude/skills/bridge-balance-project-guide/SKILL.md
 - .claude/skills/bridge-balance-project-guide/reference/project-map.md
 - .claude/skills/bridge-balance-project-guide/reference/chapter-production/SKILL.md
 - .claude/skills/bridge-balance-project-guide/reference/chapter-production/reference/research.md
 - .claude/skills/bridge-balance-project-guide/reference/chapter-production/reference/gate.md
 - .claude/skills/bridge-balance-project-guide/reference/curriculum-architect/reference/brief-format.md
 - .claude/skills/bridge-balance-project-guide/reference/lesson-adversarial-review/SKILL.md
 - .claude/skills/bridge-balance-project-guide/reference/book-coherence-audit/SKILL.md
 - .claude/skills/lesson-spine-authoring/SKILL.md
 - .claude/skills/lesson-spine-authoring/reference/stations.md
 - .claude/skills/lesson-spine-authoring/reference/mixed-audience.md
 - .claude/skills/lesson-spine-authoring/reference/language-register.md
 - .claude/skills/lesson-spine-authoring/reference/name-registers.md
 - .claude/skills/lesson-spine-authoring/reference/comprehension-audit.md
 - .claude/skills/lesson-spine-authoring/reference/beginner-experience-audit.md
 - .specify/memory/constitution.md
 - CLAUDE.md
 - PROJECT-MAP.md
 - edu-site/scripts/check-chapter.mjs
 - edu-site/docs/ch01-foundations.md
 - edu-site/docs/ch02-programming-is-born.md
 - edu-site/docs/glossary.md
 - edu-site/docs/changelog.md
 - edu-site/docs/faq.md
 - edu-site/docs/welcome.md
 - edu-site/src/lib/stages.ts
 - edu-site/src/pages/index.tsx
 - edu-site/src/components/stage-icons/index.tsx
 - edu-site/src/components/DataViz/CurriculumBarChart.tsx
 - edu-site/src/components/DataViz/CurriculumDonut.tsx
 - edu-site/src/components/DataViz/KPIGrid.tsx
tests:
 - "node scripts/check-chapter.mjs — 9 chapters, 0 errors, 5 warnings (all expected)"
 - "npm run build — all five gates green, site compiled"
 - "npm run typecheck — clean"
 - "node scripts/check-references.mjs — passed"
 - "PyYAML parse of all five ledgers — all parse"
---

## Prompt

The owner answered, point by point, the 41-file walkthrough recorded in PHR 0113.
Answers supplied as a file: `C:\Users\Dell\Desktop\updated rules of book.txt`
(~73 KB, structured as "You: <finding> / Me: <decision>", covering files 1–19 in
full). Their instruction:

> I read your first 20 lines' points, but they are burning my hours of manually
> writting the answers for each of the point, so I have written the answers of
> first 20 files, and I think the remaining 20 files' points will be satisfied
> from my already written answers, because I noticed that there are less uniques
> points in the first 20 files and more repeated one... if any thing else unqiue
> needed to be answered from the last 20 files, you can ask me interactively
> here, and if not, then now execute the solution across ALL THE 41 files

A mid-turn question, answered inline with evidence:

> as I am seeing, there are just +82, +321 etc green signals on all file edits,
> that's good, not also red -0 on everyfile edit, why? this mean you are just
> appending the new solutions rather then replacing them with the old problems
> right?

## Response snapshot

Applied the owner's decisions across 45 files. The edits were real replacements,
not appends — verified by line-count deltas (voice.md 192 → 299; corrections.md
143 → 321) and by grepping 17 withdrawn rules, of which 12 are gone entirely and
5 survive only as quotations inside "what is withdrawn" records. The `+N / -0`
display was an artefact of the session running in a stale worktree while writing
to the live checkout.

**The decisions, and where each landed.**

1. **The senior reader is withdrawn; Stages 0–2 are beginner-only.** Constitution
   Principle IX renamed *Mixed-Audience* → *Beginner-First* and redefined
   (v2.3.0 → **3.0.0**, MAJOR). `audience.md` rewritten. Every dependent rule
   removed: "the senior quits at unrewarded sentences", "a number, an origin, a
   failure mode, a reason", "every paragraph carries something a senior did not
   already have", "the variable is continuity, not difficulty". `corrections.md` §8.
2. **Every chapter opens with a welcome, a link back, what it covers, and why.**
   `voice.md` commitment 1 replaced; `corrections.md` §7 rewritten (including the
   ban it had wrongly carried forward); the 120-word cap removed; a *gradual
   transition* requirement added, because a warm block over a cold section is the
   same failure moved down the page.
3. **All bans on natural opening phrases lifted** — in `voice.md`'s table, the
   spine skill, `corrections.md`, `CLAUDE.md`, and three regexes deleted from the
   gate's `VOICE_TELLS`.
4. **"Nothing between the title and the content" identified as a design complaint
   mis-recorded as a content rule** and reversed. `corrections.md` §3 re-corrected,
   with a new standing rule: decide which layer a rejection belongs to before
   writing it into a rule file.
5. **Research is for correctness, not display.** `voice.md` commitment 6,
   `thesis.md`'s year-inline rule, `research.md`'s "citations inline, named, in
   the prose", and `evidence-ledger.yaml`'s "cited inline in the prose" all
   rewritten. Statistics now reach the reader as a plain sentence with the source
   attached at the end; a **Source chip** component is specified in `thesis.md`
   and flagged as unbuilt. §11.
6. **Vocabulary may be simplified, truth may not.** `CLAUDE.md`'s "vocabulary left
   completely untouched" and `language-register.md`'s reader model ("a Pakistani
   computer science graduate", "simple English is what you write for a child")
   replaced. Both over- and under-correction named as failures. §12.
7. **Warmth is the house register everywhere.** `voice.md`'s "no register varies
   by stage", the front-door-only warmth clause in five files, "the register must
   not shift when the material gets easier", and "writing down to a beginner is
   the one failure this book does not forgive" all withdrawn. Exclamation marks
   and decent emoji allowed; the AI-slop set excluded. Audience labels allowed. §13.
8. **Bold by meaning, never by position** — settling PHR 0113's open A/B choice.
   Owner chose: the 16 September topic-sentence convention is stupidity, bold is
   still wanted heavily, visual flatness is fixed with structure. §14.
9. **A studied source may be learned from completely.** Constitution Principle
   VIII's blanket "no borrowed structure" narrowed to expression only —
   the constitutional reason three owner instructions to copy a reference's
   pattern had been refused. §15.
10. **The six invariants are stage-level, not per-chapter**, and the "mechanical
    tell" that classified every warm sentence as padding is deleted. The safety
    floor gains a plain Stage 0–2 wording. §10.
11. **Naming**: new canon file `naming.md`. Stage 0 renamed *Introduction to
    Computing: From Switches to AI Agents* across eight files.
12. **A ten-angle beginner-experience audit** added as a second required pass,
    because the comprehension audit has no angle for tone, pace or formatting and
    passed both rejected drafts.
13. **Fix the rule, not the page beside it** — §17, from the owner's strongest
    reaction in the file, about ch00 being added in front of a cold ch01.

**Also fixed:** the `stations.md` line-314 contradiction (a stage intro "borrows
Concept's weighting", 50 lines after the FrontDoor table); the moth story retired
as an opening device in `name-registers.md` and `evidence-ledger.yaml`; the
staged-guess device scoped off front doors; stale ch01/ch02 notes in three
ledgers corrected against the live files; the "spent example" rule replaced with
log-and-choose; `corrections.md` added to the adversarial review's reading list;
`gate.md` given the four new check codes; the coherence audit told not to flag
the house opening as monotony; `proposals/README.md` given a promotion rule.

**ch01 and ch02 rewritten** under the new rules, each carried by one everyday
thread (a torch across a dark street; a tireless helper with no judgment), with
different welcome styles, self-explaining section titles, and the forced AI/thesis
paragraph removed from ch01. Both gate clean.

**Left alone deliberately:** `welcome.md` (owner-approved; still warns
`orientation-thin` and `bold-lead`) and the five `intro-*` chapters (retirement is
an owner decision, now flagged in the gate source).

## Outcome

- ✅ Impact: every rule the owner named is fixed at its source, in canon, in the
  skills, in the plan, in the ledgers, in the gate, and in the constitution.
- 🧪 Tests: full build green; gate 0 errors; typecheck clean; references pass; all
  five ledgers parse.
- 📁 Files: 45 changed, 2 created (`canon/naming.md`,
  `reference/beginner-experience-audit.md`), full backup at
  `_scratch/backup-2026-09-20-rules-rewrite/`.
- 🔁 Next prompts: owner confirmation on the Stage 0 name; the Source chip
  component; the fate of `intro-1`–`intro-5`; the researched writing persona.
- 🧠 Reflection: the walkthrough that produced this was worth its cost. Almost
  every rule reversed here was individually defensible and collectively fatal —
  no single-file fix would have found them.

## Evaluation notes (flywheel)

- Failure modes observed: an edit script opened a target file in `"w"` mode before
  its content had finished encoding, and a bad surrogate escape (`\ud83d\ude80`
  instead of `\U0001F680`) truncated `language-register.md` to 0 bytes. Restored
  from the backup taken at the start; all subsequent edits routed through an
  atomic write helper (`ed.py`: build the whole string, write a temp file, then
  `os.replace`). **Take the backup before the first edit, not after the first
  scare.**
- Graders run: the gate, the build, typecheck, the reference checker and a YAML
  parse over every ledger — all green.
- Next experiment: run the new beginner-experience audit against ch00 and
  welcome.md, which predate it.
