# Canon — who reads this, and under what conditions

Design decisions that look arbitrary make sense once this file is read. It is
the reason the reading-time baseline is 150 wpm and not 238, and the reason a
wide code block is a real defect rather than a style preference.

**This file says who the reader is and what their reading conditions oblige. It
does not say how to write for them.** That belongs to the `lesson-spine-authoring`
skill, which owns the audience architecture (`reference/mixed-audience.md`) and
every sentence-level language rule (`reference/language-register.md`). Read both
before drafting. Nothing here is repeated there, and nothing there is repeated
here.

> **Revised 2026-09-20.** The two-reader model below was replaced by the owner.
> Stages 0, 1 and 2 are written for absolute beginners and for nobody else. The
> senior-engineer reader, and every rule that existed to keep them rewarded, is
> out of the project for now. `corrections.md` §8 carries the record.

> **(22 September 2026)** The zero-knowledge floor now names **Stages 0–1**, not
> Stages 0, 1 and 2 — `course-structure.md` CS-31. Stage 2 builds on Stage 1.

## The reader

**One reader, in every stage: a beginner when they start, an expert when they
finish.** *(Clarified 2026-09-21; `course-structure.md` CS-1 and CS-2.)*
"Beginner" says where the reader starts. It does not say how far the book goes.
The person who reads the last stage is the person who read the first one,
further along the road. There is no separate senior or experienced reader
anywhere in the book.

**The first stages: absolute beginners, and only them.** Someone who has never
programmed, does not know what Python is, and may not be sure what a terminal
is for. They are not a second audience sharing the page with an expert. They
are *the* audience. Every sentence in those stages is written for them.

**The later stages: the same reader, further along.** The owner decided this on
2026-09-21, and it replaces "not yet decided". How a later stage is written for a
reader who has finished the earlier ones is a question for the redesign. Until
then no rule in this repo may assume a separate senior reader is present, and no
draft may be shaped around one. Do not re-derive a two-reader model from
anything in here.

**What withdrawing the senior reader changed.** These rules are gone, not
softened, because each one converted "keep an expert reading" into dense,
name-and-date prose that lost the beginner:

- *"The senior quits at unrewarded sentences"* — the rule that made a warm or
  gentle sentence count as waste, since it taught an expert nothing.
→ Live rule: `.claude/skills/lesson-spine-authoring/reference/mixed-audience.md` "2. What carries a chapter for a beginner". Moved 2026-09-22 under ADR-0007.

**What the beginner actually needs.** → Live rule: `.claude/skills/lesson-spine-authoring/reference/mixed-audience.md` "1. Why a beginner stops reading". Moved 2026-09-22 under ADR-0007.

**In Stages 0–1, a hard word or a named person must earn its place. If the idea works without it, leave it out.** → Live rule: `.claude/skills/lesson-spine-authoring/reference/mixed-audience.md` "1. Why a beginner stops reading". Moved 2026-09-21 under ADR-0007.

## The named groups

The founding brief named five readers. Since 2026-09-21 the book has one reader
(above). The other four rows stay only as a record of the founding brief, and none
of them is a separate audience.

| Reader | What they need most | In scope now? |
|---|---|---|
| **Real beginner, just starting** | Every term defined, nothing assumed, one safe action | **Yes — this is the reader, in every stage** |
| Career-switcher | An honest map of the distance still to cover | Not a separate audience |
| CS undergraduate | Vocabulary that connects coursework to industry practice | Not a separate audience |
| Junior developer | A rule they can apply on Monday without asking permission | Not a separate audience |
| Working professional | Trade-offs, and what changes about their existing judgment | Not a separate audience |

→ Live rule: `.claude/skills/lesson-spine-authoring/reference/beginner-experience-audit.md` "7. Continuity — is anything assumed in silence?". Moved 2026-09-22 under ADR-0007.

## Where they read, and what each condition obliges

Pakistani learners reading in English, plus international readers. English is a
medium of instruction across Pakistani secondary and tertiary education — these
readers are literate in English, but they are reading a second language about an
unfamiliar subject, often on a phone, often on paid data. Write plainly because
the subject is new, not because the reader is slow.

**Mobile-dominant.** → Live rule: `.claude/skills/lesson-spine-authoring/reference/beginner-experience-audit.md` "8. The page itself — does it look like something a person wants to read?". Moved 2026-09-22 under ADR-0007.

**Metered data.** → Live rule: `.claude/skills/lesson-spine-authoring/reference/beginner-experience-audit.md` "8. The page itself — does it look like something a person wants to read?". Moved 2026-09-22 under ADR-0007.

**Lookups while reading.** → Live rule: `.claude/skills/lesson-spine-authoring/reference/mixed-audience.md` "Tier 1 — explain inline, and mark the word". Moved 2026-09-22 under ADR-0007.

**How long the inline explanation keeps appearing — the 2-to-3-use rule.** → Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "The third hard constraint: every term sorted, nothing assumed". Moved 2026-09-21 under ADR-0007.

**The glossary never repeats.** → Live rule: `.claude/skills/lesson-spine-authoring/reference/mixed-audience.md` "The glossary holds one entry per term, ever". Moved 2026-09-21 under ADR-0007.
`term-ledger.yaml` holds the anchors and `check-references.mjs` fails
a link that does not resolve to one. The ordering is enforced too: a term
carrying `weight: major` in `term-ledger.yaml` must not be used by a chapter
positioned before the chapter recorded as introducing it, and
`check-references.mjs` fails the build on that as well.

**Not every term can be explained in passing — the one-minute test.** → Live rule: `.claude/skills/lesson-spine-authoring/reference/mixed-audience.md` "4. Terms: the one-minute test". Moved 2026-09-21 under ADR-0007.

**Hard English words are handled like technical terms.** → Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "The third hard constraint: every term sorted, nothing assumed". Moved 2026-09-22 under ADR-0007.

**Interruption.** → Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "The opening". Moved 2026-09-22 under ADR-0007.

→ Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "The opening". Moved 2026-09-22 under ADR-0007.

## Formatting is part of the teaching

→ Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "A flat-looking page". Moved 2026-09-22 under ADR-0007.

- **Bullets, tables, short sections and callouts are first-class.** → Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "A flat-looking page". Moved 2026-09-22 under ADR-0007.
- **Bold marks what matters, wherever it sits** → Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "Bold assigned by position". Moved 2026-09-22 under ADR-0007.
- Italics for a term being introduced, for gentle emphasis, and for the reader's
  own inner voice.
- Keep sections short enough to see the end of. A wall of text with no visual
  landmark is where a beginner stops.
- Decent, professional emoji and icons are allowed where they help — never the
  AI-slop set (🚀 and its family). `voice.md` §"Enthusiasm, exclamation marks
  and emoji" has the rule.
- **The target is not "well formatted". It is beautiful.** A chapter should look
  like something a reader wants to sit with.

## Language — the two decisions canon makes

`language-register.md` governs every sentence and is the authority. It
deliberately leaves two things to the project. This is where they are decided.

**Spelling: British.** → Live rule: `.claude/skills/lesson-spine-authoring/reference/language-register.md` "5. Conventions". Moved 2026-09-22 under ADR-0007.

**English only — no Urdu, anywhere.** → Live rule: `.claude/skills/lesson-spine-authoring/reference/language-register.md` "5. Conventions". Moved 2026-09-21 under ADR-0007.

**Examples are Pakistani-first.** *(Changed 2026-09-21; it used to say "on both
sides at once".)* Every analogy and everyday example is chosen first for a
Pakistani reader: a concrete thing from daily life in Pakistan that they can
picture at once, with prices in rupees and places they know. A reader anywhere
else must still be able to follow it, so the sentence around the example carries
any context it needs. Where the two pull apart, the Pakistani reader wins.
`language-register.md` §4 has the anchor tiers.

## Accessibility

The repo runs axe and ships `src/css/a11y.css`. Content should stop generating
findings rather than relying on the audit to catch them.

- Heading levels descend without skipping. The chapter `h1` is the frontmatter
  title; sections start at `h2`.
- Link text describes the destination. → Live rule: `.claude/skills/lesson-spine-authoring/reference/language-register.md` "5. Conventions". Moved 2026-09-21 under ADR-0007.
- Every table has real header cells. → Live rule: `.claude/skills/lesson-spine-authoring/reference/language-register.md` "5. Conventions". Moved 2026-09-21 under ADR-0007.
- Every image has real alt text describing what it shows and why it is there.
- Never encode meaning in colour alone. → Live rule: `.claude/skills/lesson-spine-authoring/reference/language-register.md` "5. Conventions". Moved 2026-09-21 under ADR-0007.
