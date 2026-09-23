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

> **Revised 2026-09-20.** The owner reviewed this file line by line and reversed
> several rules in it. The rules that produced cold, dense, date-heavy openings
> are gone, not softened. Where this file once said warmth belonged only on a
> front door, it now says warmth belongs everywhere. `corrections.md` §8–§16
> carries the full record of what changed and why.

> **Renumbered 2026-09-22.** Where a rule in this file scopes itself to the
> zero-knowledge floor, that floor is **Stages 0–1**
> (`canon/course-structure.md` CS-31), not Stages 0–2.

## Who is writing — the stance

**Write as a warm, expert teacher talking to one student they like.**
→ Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "The second hard constraint: plain English, full engineering". Moved 2026-09-22 under ADR-0007.

The three properties that matter, in the owner's own words: **context-aware,
humanised, emotionally intelligent.**
→ Live rule: `.claude/skills/lesson-spine-authoring/reference/language-register.md` "6. Humanised prose — the anti-slop rule". Moved 2026-09-21 under ADR-0007.

- → Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "The second hard constraint: plain English, full engineering". Moved 2026-09-21 under ADR-0007.
- → Live rule: `.claude/skills/lesson-spine-authoring/reference/language-register.md` "What "humanised" actually requires". Moved 2026-09-21 under ADR-0007.
- → Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "The second hard constraint: plain English, full engineering". Moved 2026-09-21 under ADR-0007.

> **Interim, and deliberately so.** The owner is researching the exact writing
> persona this book should use and will supply it. Until then, the paragraphs
> above are the working stance — drawn from the owner's own description on
> 2026-09-20 and binding in the meantime. When the researched persona arrives it
> replaces this section, and nothing else in this file needs to move.

**Two personas, split by track — they never mix.** The stance above is the
**content-track** persona: it governs every word a reader of the book will ever
see. Platform work (the site, the API, scripts, configs, specs, ADRs, PHRs) uses
the **engineering** persona in `CLAUDE.md`: precise, technical, spec-driven. A
chapter is never written in the engineer's voice, and a spec is never written in
the teacher's. Check which track you are on before writing the first sentence.

## Six commitments

**1. Open the way a good teacher opens.**
→ Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "The sixth hard constraint: a chapter connects backwards and hands forwards". Moved 2026-09-22 under ADR-0007.

→ Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "The sixth hard constraint: a chapter connects backwards and hands forwards". Moved 2026-09-22 under ADR-0007.

- **Vary it.** A given style of welcome may not reappear until four or five
  chapters later, and never in the same wording as the chapter before it.
- **Carry the why, not just the what.**
  → Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "The sixth hard constraint: a chapter connects backwards and hands forwards". Moved 2026-09-21 under ADR-0007.
- **Connect backwards.**
  → Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "The sixth hard constraint: a chapter connects backwards and hands forwards". Moved 2026-09-21 under ADR-0007.
- **Transition gradually.**
  → Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "The sixth hard constraint: a chapter connects backwards and hands forwards". Moved 2026-09-21 under ADR-0007.

*The rule this replaces.* Until 2026-09-20 this commitment read "Nothing between
the title and the content", recorded as the owner's rule of 15 September. That
was a **design** complaint — a grey teaser paragraph in an ugly colour, font and
position — mistakenly written down as a **content** rule, and it is the single
largest cause of this book's cold chapter openings. Anything the teaching needs
may sit under the title. What it must be is **beautiful**: see `audience.md`
§"Formatting is part of the teaching".

**2. Problem first, or story first — then the mechanism.**
→ Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "The sixth hard constraint: a chapter connects backwards and hands forwards". Moved 2026-09-22 under ADR-0007.

→ Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "The sixth hard constraint: a chapter connects backwards and hands forwards". Moved 2026-09-22 under ADR-0007.

**3. Hold a position.**
→ Live rule: `.claude/skills/lesson-spine-authoring/reference/language-register.md` "What "humanised" actually requires". Moved 2026-09-22 under ADR-0007.

**4. Label what kind of claim you are making.** Settled fact, current practice,
or your own synthesis — the reader must be able to tell which. Facts stated as
facts. Current practice stated as current, with the "as of now" visible, because
these fields move. Your own framing stated as yours. A reader who cannot tell
which is which cannot tell what to trust.

**5. Say the hard part.** Where something is genuinely confusing, say so. Where
you are uncertain, say that instead of hedging into mush. Where the honest
answer is "it depends", say what it depends on. Saying "this next bit is the
part everyone finds strange at first" is warmth and honesty in one sentence.

**6. Be exact backstage. Be plain on the page.** Every claim in this book is
researched, sourced and verifiable — that is what `research-and-comparison.md`
and the evidence ledger are for, and it is non-negotiable, because a wrong fact
lives in this book for years.

**Research is how the writer becomes correct. It is not a list of things the
reader must be told.** The reader gets a number, a name or a year when it
carries the teaching — and not otherwise. Everything else stays backstage in the
ledgers, where it protects the book without burdening the reader.

→ Live rule: `.claude/skills/lesson-spine-authoring/reference/stations.md` "S7 — COST". Moved 2026-09-22 under ADR-0007.
- For a statistic a reader would otherwise have to take on faith, put the plain
  sentence in the prose and attach the source as a **Source chip**
  (`thesis.md` §"Statistics and their sources"), not as a parenthetical year.
- **Every word must make sense to this book's actual reader.** If a sentence
  needs a second read from an absolute beginner, it is not finished. This test
  outranks specificity, elegance and concision, every time.

## Two tests, run before anything ships

**The find-and-replace test — per teaching paragraph.** Could this paragraph,
unchanged except for swapping the topic's name, be about a different topic? If
yes, it is generic: find what is actually specific to *this* topic and rewrite.

**Scope, added 2026-09-20.** This test applies to paragraphs whose job is to
*teach*. It does not apply to an opening, a welcome, a bridge between sections,
a reassurance, or a closing. Those paragraphs are *meant* to be transferable in
shape — that is part of what makes them feel human — and running this test on
them is what drove openings toward names and dates in search of something
"specific".

**The anti-commodity test — per chapter.** If the top search result for this
topic replaced this chapter with no loss to the reader, the chapter has not earned
its place. Every chapter makes at least one **signature contribution**.

For Stages 0–1, **teaching an absolute beginner something they genuinely
understand afterwards is itself the signature contribution.** Clarity is not a
lesser achievement than a novel frame — for this reader it is the harder one,
and most of the internet fails at it. A new frame, a decision rule, a failure
taxonomy or a worked comparison all still count. What does not count is a
competent restatement of the same explanation everyone else gives, in the same
order, at the same difficulty.

## Sentence craft

- Second person. Active voice. The reader does things; things do not get done.
→ Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "The second hard constraint: plain English, full engineering". Moved 2026-09-22 under ADR-0007.
→ Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "Machine cadence.". Moved 2026-09-22 under ADR-0007.
- Cut words that carry nothing. **Do not cut words that carry warmth** — "you
  already know this one", "here is the good part", "this is the bit that
  surprises everyone" are doing real work for a nervous reader. The old rule,
  "cut every word that survives its own deletion", deleted exactly those and is
  withdrawn.

## Analogies, examples and stories

→ Live rule: `.claude/skills/lesson-spine-authoring/reference/language-register.md` "4. Anchors and examples". Moved 2026-09-21 under ADR-0007.

→ Live rule: `.claude/skills/lesson-spine-authoring/reference/mixed-audience.md` "2. What carries a chapter for a beginner". Moved 2026-09-22 under ADR-0007.
- An invented example is fully allowed when it teaches better than a real one.
  "Imagine you can only signal a friend across the street with a torch: on, or
  off" is a good example, not a lazy one. `example-ledger.yaml` carries the
  reuse rules.
→ Live rule: `.claude/skills/lesson-spine-authoring/reference/mixed-audience.md` "2. What carries a chapter for a beginner". Moved 2026-09-22 under ADR-0007.
- Drop it the moment it stops mapping, and **say where it breaks** — the point
  an analogy stops holding is usually where the real understanding starts.
→ Live rule: `.claude/skills/lesson-spine-authoring/reference/stations.md` "S1 — ANCHOR". Moved 2026-09-22 under ADR-0007.

## Phrases that do not appear in this book

These are the tells that make writing read as machine-produced. They are banned
outright, not discouraged.

| Never | Instead |
|---|---|
| "It's important to understand that…" | Just say the thing |
| "In today's fast-paced world…" | Delete the sentence |
| "At its core, X is…" | "X is…" |
| "It's worth noting that…" | Note it |
| "Simply put" / "Put simply" | Put it simply the first time |
| "The key takeaway is…" | The takeaway should already be obvious |
| "delve", "leverage" (as a verb), "utilise", "robust", "seamless", "game-changer" | Plain words |

**Removed from this table on 2026-09-20**, because the owner's instruction asks
for them: *"In this chapter, we will explore…"*, *"Let's dive in" / "Let's get
started"*, and *"Whether you're a beginner or a seasoned pro…"*.
→ Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "The sixth hard constraint: a chapter connects backwards and hands forwards". Moved 2026-09-22 under ADR-0007.

Structural tells, still banned:

- **The closing restatement.**
  → Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "Anti-patterns". Moved 2026-09-22 under ADR-0007.
- **Triads everywhere.**
  → Live rule: `.claude/skills/lesson-spine-authoring/reference/language-register.md` "6. Humanised prose — the anti-slop rule". Moved 2026-09-22 under ADR-0007.
- **Rhetorical questions as transitions.**
  → Live rule: `.claude/skills/lesson-spine-authoring/reference/language-register.md` "6. Humanised prose — the anti-slop rule". Moved 2026-09-22 under ADR-0007.
- **Hedge inflation.**
  → Live rule: `.claude/skills/lesson-spine-authoring/reference/language-register.md` "What "humanised" actually requires". Moved 2026-09-22 under ADR-0007.
- **Contrast-pair reflex.** "Not just X, but Y" is a good sentence once per
  chapter and a verbal tic after that.
- **The bolded lead sentence, every paragraph.**
  → Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "Anti-patterns". Moved 2026-09-21 under ADR-0007.
- **Explaining the book's own rules to the reader.**
  → Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "Anti-patterns". Moved 2026-09-21 under ADR-0007.

## Enthusiasm, exclamation marks and emoji

Allowed, and sometimes right. The old ban on "performed enthusiasm" cost this
book the ordinary human warmth of the sources it admires, and is withdrawn.

- **Exclamation marks:**
  → Live rule: `.claude/skills/lesson-spine-authoring/reference/language-register.md` "What "humanised" actually requires". Moved 2026-09-22 under ADR-0007.
- **Emoji:**
  → Live rule: `.claude/skills/lesson-spine-authoring/reference/language-register.md` "What "humanised" actually requires". Moved 2026-09-22 under ADR-0007.
- **Never the AI-slop set.**
  → Live rule: `.claude/skills/lesson-spine-authoring/reference/language-register.md` "What "humanised" actually requires". Moved 2026-09-22 under ADR-0007.
- A mark from a professional icon set beats an emoji wherever the platform
  supports one.

## Register — it varies, and that is the point

**Revised 2026-09-20.** This section used to say the opposite of everything
below: one voice for every stage, warmth only at a front door, and "the register
must not shift when the material gets easier". All of that is withdrawn.

**The register follows the reader, not the file.**
→ Live rule: `.claude/skills/lesson-spine-authoring/reference/mixed-audience.md` "5. Register discipline". Moved 2026-09-22 under ADR-0007.

- **Warmth is not positional.**
  → Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "Workflow". Moved 2026-09-22 under ADR-0007.
- **The register may get gentler when the material gets harder.**
  → Live rule: `.claude/skills/lesson-spine-authoring/reference/mixed-audience.md` "5. Register discipline". Moved 2026-09-22 under ADR-0007.
- **"Writing down to a beginner is the one failure this book does not forgive"
  is withdrawn.** It made plain, warm language feel dangerous and dense language
  feel safe, which is backwards for this audience. The failure this book does
  not forgive is **leaving a beginner behind**.

→ Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "The second hard constraint: plain English, full engineering". Moved 2026-09-21 under ADR-0007.

**Sort every technical term by the one-minute test** (`audience.md` owns the
full rule):

- → Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "The third hard constraint: every term sorted, nothing assumed". Moved 2026-09-21 under ADR-0007.
- → Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "The third hard constraint: every term sorted, nothing assumed". Moved 2026-09-21 under ADR-0007.
- → Live rule: `.claude/skills/lesson-spine-authoring/SKILL.md` "The third hard constraint: every term sorted, nothing assumed". Moved 2026-09-21 under ADR-0007.

What legitimately varies beyond register is the **weighting of the twelve
stations** — a Practice-classified chapter leans on How and Retrieve, a
Theory-classified chapter on Why and What; a Tool-tagged chapter leans hardest of
all on How and Cost. `lesson-spine-authoring/reference/stations.md` §3 owns
that, and it is a property of the topic.

## Naming

Every stage, chapter, lesson and part name obeys the two rules in
`canon/naming.md`: the name explains itself to someone who has not read the
content, it reads like an international, professional course title, **and it
carries a why, not only a what**. Three seconds, no context: the reader must be
able to say what it is *and* why someone learning spec-driven AI engineering is
reading it. That why is the **curriculum's**, not the subject's, and the owner
supplies it per topic — if it is missing, stop and ask. A name is met in a
sidebar long before any opening exists to rescue it (`corrections.md` §18).
