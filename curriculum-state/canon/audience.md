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

## The two readers

Every chapter is read by a senior engineer and by someone who last week
struggled to finish a signup form. There is no separate
edition. Both readers get the same document, and the writing has to be good
enough that neither is insulted.

**Neither may be failed, and they fail for different reasons:**

- **The senior quits at unrewarded sentences** — paragraphs that give them
  nothing they did not already have. They will read a plain explanation of
  something they know well, without irritation, as long as it carries one thing
  they lacked: a number, an origin, a failure mode, a reason. **The variable is
  pace, not level.**
- **The beginner quits at the first silent assumption** — a term, a symbol, or a
  leap that assumed something they lack and did not say so. They will read
  genuinely advanced material, with effort and without quitting, as long as
  nothing was skipped over their head. **The variable is continuity, not
  difficulty.**

These constrain different things, so both can be satisfied at once. The
three-layer architecture that makes that achievable rather than aspirational is
in `mixed-audience.md`. Do not improvise a substitute for it.

## The five named groups

The founding brief names five readers, and they are genuinely different people.
They sit along one spine. They are not five editions.

| Reader | What they need most |
|---|---|
| CS undergraduate | Vocabulary that connects coursework to industry practice |
| Junior developer | A rule they can apply on Monday without asking permission |
| Working professional | Trade-offs, and what changes about their existing judgment |
| Career-switcher | An honest map of the distance still to cover |
| **Real beginner, just starting** | Every term defined, nothing assumed, one safe action |

That last row is named explicitly in the founding brief and is the one most
easily lost. A Stage 1 chapter that assumes a reader already knows what a
repository is has failed them silently.

## Where they read, and what each condition obliges

Pakistani learners reading in English, plus international readers. English is a
medium of instruction across Pakistani secondary and tertiary education,
especially in CS — these are **not** beginning foreign-language learners, and
writing down to them is its own failure. But they are reading a second language
about an unfamiliar subject, often on a phone, often on paid data.

**Mobile-dominant.** A paragraph is whatever fits before the reader has to
scroll mid-thought — two to four lines on a phone viewport. Wide code is the
single worst mobile reading failure. Keep lines under roughly 60 characters
where the language allows, and wrap every wide table in a horizontal scroll
container. The gate warns past 80.

**Metered data.** Keep total chapter weight under 1.5 MB including images. Every
image is the project owner's, generated externally and dropped into
`static/img/`; a page of oversized raster art undermines exactly the reader the
150 wpm baseline exists to serve.

**Lookups while reading.** Terms get an inline gloss at first use, not a
footnote — a phone reader will not scroll to find one. **First use is counted
per chapter, independently, every time.** A reader arriving from a search result
or a shared link has no earlier chapter, so a term glossed in Stage 1 is glossed
again in Stage 4.

**Interruption.** The first screenful of every chapter must alone deliver the
thesis-linked claim and the one action. A reader who leaves after one paragraph
still leaves with something usable.

## Language — the two decisions canon makes

`language-register.md` governs every sentence and is the authority. It
deliberately leaves two things to the project. This is where they are decided.

**Spelling: British.** `language-register.md` §5 says pick one convention and
hold it. This is the pick — *colour, organisation, analyse, behaviour*. It is
the norm in Pakistani education and it is already the majority usage in
`docs/`. Code, commands, and tool names always keep their own spelling:
`color: red` stays `color`. Mixed spelling inside the book is a defect, not a
preference.

**Urdu glosses are permitted, never required.** A single Urdu word for a
genuinely hard term, where it actually helps a reader over a hump. Not
sprinkled for flavour, and never for a term the English already makes plain.

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
