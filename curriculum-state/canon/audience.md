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

## The reader

**Stages 0, 1 and 2: absolute beginners, and only them.** Someone who has never
programmed, does not know what Python is, and may not be sure what a terminal
is for. They are not a second audience sharing the page with an expert. They
are *the* audience. Every sentence in those three stages is written for them.

**Stages 3 and 4: not yet decided.** The audience for the later stages is an
open question the owner will settle later. Until it is settled, no rule in this
repo may assume a senior reader is present, and no draft may be shaped around
one. Do not re-derive a two-reader model from anything in here.

**What withdrawing the senior reader changed.** These rules are gone, not
softened, because each one converted "keep an expert reading" into dense,
name-and-date prose that lost the beginner:

- *"The senior quits at unrewarded sentences"* — the rule that made a warm or
  gentle sentence count as waste, since it taught an expert nothing.
- *"…as long as it carries one thing they lacked: a number, an origin, a failure
  mode, a reason"* — the recipe that attached a year or a proper noun to
  paragraph after paragraph.
- *"Every paragraph must carry something a senior did not already have."*

**What the beginner actually needs.** They quit for more reasons than a silent
assumption, and all of them count:

- **Continuity** — nothing skipped, nothing assumed, no leap taken over their
  head. Still the first thing to get right.
- **Difficulty that matches them.** The old rule said the beginner tolerates
  genuinely advanced material as long as nothing is skipped — "the variable is
  continuity, not difficulty". That was wrong for this reader, and it is
  withdrawn. Difficulty is a variable too. A hard word explained is still a hard
  word, and ten of them in a page is a wall.
- **Speed.** Beginners read to get somewhere, not to admire the scenery.
  Length that a specialist would call thorough reads to them as a stall.
- The full list is the ten-angle beginner check in
  `lesson-spine-authoring/reference/beginner-experience-audit.md`, which every
  Stage 0–2 draft passes before it is presented.

**In Stages 0–2, a hard word or a named person must earn its place. If the idea
works without it, leave it out.**

## The named groups

The founding brief names five readers. They sit along one spine; they are not
five editions. Only the last row is in scope today.

| Reader | What they need most | In scope now? |
|---|---|---|
| **Real beginner, just starting** | Every term defined, nothing assumed, one safe action | **Yes — Stages 0–2 are written for this reader alone** |
| Career-switcher | An honest map of the distance still to cover | Later stages, undecided |
| CS undergraduate | Vocabulary that connects coursework to industry practice | Later stages, undecided |
| Junior developer | A rule they can apply on Monday without asking permission | Later stages, undecided |
| Working professional | Trade-offs, and what changes about their existing judgment | Later stages, undecided |

That first row is the one most easily lost. A Stage 1 chapter that assumes a
reader already knows what a repository is has failed them silently.

## Where they read, and what each condition obliges

Pakistani learners reading in English, plus international readers. English is a
medium of instruction across Pakistani secondary and tertiary education — these
readers are literate in English, but they are reading a second language about an
unfamiliar subject, often on a phone, often on paid data. Write plainly because
the subject is new, not because the reader is slow.

**Mobile-dominant.** A paragraph is whatever fits before the reader has to
scroll mid-thought — two to four lines on a phone viewport. Wide code is the
single worst mobile reading failure. Keep lines under roughly 60 characters
where the language allows, and wrap every wide table in a horizontal scroll
container. The gate warns past 80.

**Metered data.** Keep total chapter weight under 1.5 MB including images. Every
image is the project owner's, generated externally and dropped into
`static/img/`; a page of oversized raster art undermines exactly the reader the
150 wpm baseline exists to serve.

**Lookups while reading.** A term gets an inline explanation the first time the
reader meets it, not a footnote — a phone reader will not scroll to find one.

**How long the inline explanation keeps appearing — the 2-to-3-use rule.** A
term is explained inline for roughly its **first two or three appearances in the
book**. After that it appears as a glossary link alone — `[*term*](/glossary#slug)`
— with no inline explanation. Re-glossing the same term forever is what made
pages read like a dictionary, and it is not required any more.

**The glossary never repeats.** One term, one entry, one canonical wording, one
anchor, for the whole book. Repeating the *entry* would split a term's meaning
across two places, and the moment those drift the book teaches two things under
one word. `term-ledger.yaml` holds the anchors and `check-references.mjs` fails
a link that does not resolve to one.

**Not every term can be explained in passing — the one-minute test.** If an
absolute beginner can hold a term inside **one minute**, it is explained inline
in twelve words or fewer and linked to the glossary. If it needs longer, it
**cannot be glossed at all** — it is taught in a passage of its own, before it
is used. The old threshold was two minutes and was measured against a reader who
had programmed before; one minute, measured against a true beginner, is the
rule now. `lesson-spine-authoring/reference/mixed-audience.md` §4 has the
mechanics and the marked-term link form.

**Hard English words are handled like technical terms.** These readers are reading a second language, so a hard ordinary word can stop them as surely as a technical one. Choose the easy word first (`language-register.md` §3). If a hard English word cannot be replaced, it is explained inline and linked to the glossary, under the same rules as any term: the one-minute test, the 2-to-3-use rule, and one glossary entry per word. *(Added 21 September 2026, on the owner's instruction: `corrections.md` §27.)*

**Interruption.** The first screenful of every chapter tells the reader **what
this chapter is, why it comes now, and what they will have at the end.** A
reader who leaves after one screen still leaves knowing where they were.

*(This replaces "the first screenful must alone deliver the thesis-linked claim
and the one action", which reserved the top of every chapter for the book's
AI-engineering argument and left no room for an ordinary welcome.)*

## Formatting is part of the teaching

A page that looks heavy reads as heavy, whatever the sentences say. Formatting
is not decoration here and it is not optional — it is how a beginner finds their
footing on a screen.

- **Bullets, tables, short sections and callouts are first-class.** Reach for
  them before a long paragraph, not after one has failed.
- **Bold marks what matters, wherever it sits** — a key phrase mid-sentence, a
  rule, a warning, the answer to the question the section asked. It is **not**
  the first sentence of every paragraph. That convention (applied book-wide on
  16 September, reversed on 20 September) turns emphasis into wallpaper: when
  every paragraph opens bold, no bold means anything.
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

**Spelling: British.** `language-register.md` §5 says pick one convention and
hold it. This is the pick — *colour, organisation, analyse, behaviour*. It is
the norm in Pakistani education and it is already the majority usage in
`docs/`. Code, commands, and tool names always keep their own spelling:
`color: red` stays `color`. Mixed spelling inside the book is a defect, not a
preference.

**English only — no Urdu, anywhere.** The permission to gloss a hard term with a
single Urdu word was removed on 2026-09-20. This book is being written for an
international market as well as a Pakistani one, and a bilingual habit
established now would have to be unpicked across thousands of paragraphs later.
Plain English carries every idea in this book. If a term is hard, the fix is a
simpler English sentence, not a second language.

**Examples must land on both sides at once.** Every analogy and everyday example
is chosen so that a reader in Pakistan and a reader anywhere else both
understand it without extra explanation. Not two versions — one example that
works for both. `language-register.md` §4 has the anchor tiers.

## Accessibility

The repo runs axe and ships `src/css/a11y.css`. Content should stop generating
findings rather than relying on the audit to catch them.

- Heading levels descend without skipping. The chapter `h1` is the frontmatter
  title; sections start at `h2`.
- Link text describes the destination. No naked URLs, no "click here", no
  "read more".
- Every table has real header cells.
- Every image has real alt text describing what it shows and why it is there.
- Never encode meaning in colour alone.
