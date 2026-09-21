# Canon — how the book sounds

The facts in this book are available elsewhere. The voice is not. If a chapter
reads like a competent model summarising the top ten search results, it has
failed as a portfolio piece no matter how accurate it is.

This file defines a house teaching voice explicitly, because no personal writing
samples are in use. It is a real voice with real commitments — not a neutral
default.

> **Extension point.** If founder writing samples are added later, they go in
> `canon/voice-samples/` and this file gains a rule: *where a sample and a rule
> below disagree, the sample wins.* Nothing here needs rewriting for that.

## The stance

Write as an engineer who has actually done the thing, is talking to one person,
and respects them enough to tell them what is hard about it.

Not a syllabus. Not a vendor. Not a cheerleader. Someone who has shipped
something, watched it break, and is explaining what they now do differently.

## Six commitments

**1. Nothing between the title and the content.** A chapter's title is
followed directly by its actual content. No scene-setting or hook paragraph, no
pull-quote, no "Core idea" line and no placeholder note sits under the title,
and nothing opens with "in this lesson". This is the owner's rule, set on
15 September 2026, when every such paragraph was deleted from every chapter.
**The one thing this rule does not forbid is the chapter's own opening
connection** — what the previous chapter left unresolved, and why this subject
arrives now. That is content, and it belongs first. A paragraph whose only job
is to announce that a chapter is beginning is still banned. The full rule is
`SKILL.md`'s sixth hard constraint in the `lesson-spine-authoring` skill.

**2. Concrete before abstract, always in that order.** Earn every abstraction
with a case the reader can picture first. This is what makes a hard thing feel
obvious in retrospect, and it only works in that order. **Inside a teaching
body.** At a front door the case the reader can picture is the reader's own
situation, not a historical artifact. Taken without that scope, this rule is
what put a dated object in the first line of a rejected draft — see
`corrections.md` §1, which governs a stage's opening page and outranks this
one wherever the two meet.

**3. Hold a position.** State what you think and why. "Most teams reach for X
here; that is usually wrong, and here is the case where it isn't" beats a
balanced survey nobody can act on. A lesson with no opinion in it is a
reference page.

**4. Label what kind of claim you are making.** Settled fact, current practice,
or your own synthesis — the reader must be able to tell which. Facts stated as
facts. Current practice stated as current, with the "as of now" visible, because
these fields move. Your own framing stated as yours. A reader who cannot tell
which is which cannot tell what to trust.

**5. Say the hard part.** Where something is genuinely confusing, say so. Where
you are uncertain, say that instead of hedging into mush. Where the honest
answer is "it depends", say what it depends on. Confidence about the uncertain
is the fastest way to lose a technical reader.

**6. Be specific enough to be falsifiable.** Real version numbers, real error
messages, real commands, real numbers with their year attached. Specificity is
the cheapest credibility there is, and vagueness is where AI-written prose is
recognised.

## Two tests, run before anything ships

**The find-and-replace test — per paragraph.** Could this paragraph, unchanged
except for swapping the topic's name, be about a different topic? If yes, it is
generic. Find what is actually specific to *this* topic and rewrite until the
test fails.

**The anti-commodity test — per lesson.** If the top search result for this
topic replaced this lesson with no loss to the reader, the lesson has not earned
its place. Every lesson makes at least one **signature contribution**: a frame,
a decision rule, a failure taxonomy, a worked comparison that did not exist in
this form before. It has to be something the prose does — the images in this
book are the owner's, supplied separately, and are never what makes a chapter
earn its place. Name it explicitly in the authoring record. A lesson that is a
good synthesis of existing sources and nothing more is a draft, not a chapter.

## Sentence craft

- Second person. Active voice. The reader does things; things do not get done.
- Vary sentence length deliberately. A short one lands a point. Then a longer one
  can carry the reasoning that earns it.
- **One idea per sentence, in every chapter.** Average 15 to 18 words, hard
  ceiling around 28, at most one subordinate clause. This does not relax at
  Stage 4. `language-register.md` §2 has the full mechanics — sentence length,
  stacked nouns, tenses, participial openings — and it governs every sentence in
  the book.
- Cut every word that survives its own deletion.

## Analogies

An analogy is good when it makes the idea stick harder, and bad when it is
clever but makes the reader translate back to the real point.

- Let it come from the topic's own mechanics, not from a stock list.
- Drop it the moment it stops mapping. A stretched analogy that starts leaking
  is worse than no analogy — it costs the reader effort and returns confusion.
- One per new concept, at most, at any stage. Two analogies for one idea means
  the first one failed; fix it rather than adding a second.
- **Say where it breaks.** The point an analogy stops holding is one of the few
  things that rewards a senior and a beginner in the same sentence, so it is
  spine material, not a footnote.
- If the analogy could serve five other lessons equally well, it is decoration.
- Draw anchors from `language-register.md` §4 — universal first (a queue, a key
  and a lock, a receipt), Pakistan-legible second (a bank token number, a
  courier tracking number, a university merit list). Never one that needs local
  knowledge the sentence does not supply.

## Phrases that do not appear in this book

These are the tells that make writing read as machine-produced. They are banned
outright, not discouraged.

| Never | Instead |
|---|---|
| "In this lesson, we will explore…" | Open on the actual question |
| "It's important to understand that…" | Just say the thing |
| "Let's dive in" / "Let's get started" | Start |
| "In today's fast-paced world…" | Delete the sentence |
| "At its core, X is…" | "X is…" |
| "It's worth noting that…" | Note it |
| "Simply put" / "Put simply" | Put it simply the first time |
| "The key takeaway is…" | The takeaway should already be obvious |
| "Whether you're a beginner or a seasoned pro…" | Write for this chapter's actual reader |
| "delve", "leverage" (as a verb), "utilise", "robust", "seamless", "game-changer" | Plain words |

Structural tells, equally banned:

- **The closing restatement.** Ending a section by summarising what it just said.
  If the section worked, the summary is padding; if it didn't, the summary won't
  save it.
- **Triads everywhere.** "Clear, concise, and compelling." One adjective, chosen.
- **Rhetorical questions as transitions.** "So what does this mean for you?"
- **Hedge inflation.** "Can potentially help to possibly improve." Say what
  happens, or say you don't know.
- **Contrast-pair reflex.** "Not just X, but Y" is a good sentence once per
  chapter and a verbal tic after that.
- **A paragraph under the title.** Any paragraph, quote or note placed between
  a chapter's title and its content. Banned outright — see commitment 1.

## Register — one voice, every chapter, no stage ladder

There is no register that varies by stage. A Stage 4 chapter is written in the
same voice, for the same two readers, under the same rules as a Stage 1 chapter.

**Position is the one exception, and it is not the stage ladder coming back.**
A stage's opening page, and the first screenful of any page a reader meets before
they have agreed to read anything, is the single place in this book where warmth
and orientation outrank density. Not because that reader is less capable —
because they have not yet decided to read at all, and a door that opens like a
chapter closes itself. Everything else stays exactly as it is: a stage's first
teaching chapter carries the same rules as a Stage 4 chapter. `corrections.md`
§1 is the full rule, and it exists because two drafts failed on exactly this
without any other rule in here noticing.

This replaced a three-column stage ladder on 2026-09-06. That ladder let later
chapters assume "generic CS vocabulary" on the grounds that the reader had come
through the earlier stages. Most readers have not: they arrive from a search
result or a shared link. For them the ladder produced exactly the failure this
book does not accept — a fresher meeting undefined terms and quitting.

**Sort every technical term by the two-minute test, in every chapter, every
time** — even when an earlier chapter already defined it. A term a reader can
hold within two minutes is glossed inline at first use, in twelve words or
fewer, and marked `[*term*](/glossary#slug)` where the glossary carries it. A
term that needs longer cannot be glossed at all — it is taught in a passage of
its own before it is used. First use is counted per chapter, independently.
**The test itself never relaxes by stage; only its strictness does** — Stages
0–2 assume a reader who has never programmed, with no exceptions bought by
pace, while Stages 3–4 may pass field-standard vocabulary on a gloss and a link
alone. `lesson-spine-authoring/reference/mixed-audience.md` §4 has the full
mechanics and the glossary's one-entry-per-term invariant.

**One voice inside a chapter, too.** The register must not shift when the
material gets easier. A chapter that turns noticeably plainer at the moment a
beginner might struggle has just told that reader which parts were meant for
them.

What legitimately varies is not the voice but the **weighting of the twelve
stations** — a Practice-classified lesson leans on How and Retrieve, a
Theory-classified lesson on Why and What; a Tool-tagged lesson (a further tag
inside Practice, not a separate kind) leans hardest of all on How and Cost.
`lesson-spine-authoring/reference/stations.md` §3 owns that, and it is a
property of the topic, never of the stage.

Writing plainly is not simpler thinking. It is the same thinking, said in words
the reader already has. Writing *down* to a beginner is the one failure this
book does not forgive.
