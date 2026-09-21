---
name: chapter-production
description: The Bridge Balance's chapter production line — takes a topic and ends with a live, gate-passing MDX chapter at edu-site/docs/. It does NOT write the teaching. It owns everything around it — the CS50 integrity check, required inputs, research and verification, the four ledgers read and written back, scope and its reason, frontmatter and file assembly, the gate, and the handback check. The lesson itself — shape, the name, the stations, the spine, footholds, depth blocks, and every sentence — belongs to the peer skill lesson-spine-authoring, which this skill loads at step 3 and stays inside through step 5 without duplicating or second-guessing it. Text is the default; on explicit request it can also write image PROMPTS for the owner's generator or build a diagram itself via a diagramming connector, delivered as a static image file — never inline Mermaid/SVG/JSX in the chapter body. Every chapter ships as one continuous read. Reached through bridge-balance-project-guide; it does not trigger on its own.
---

# Chapter production

One topic in, one shipped chapter out — and **this skill does not write the chapter.**

That sentence is the whole design. Everything a chapter needs in order to exist, be trusted, and stay consistent with the rest of the book is here: what's true, what backs it, where the file goes, what the book already committed to, and whether it passes. The lesson living inside that container is written by `lesson-spine-authoring`, a peer skill, start to finish.

Think of it the way a publisher does. The production editor commissions the work, checks the facts, holds the house style, sets the page, proofs it, and files it in the catalogue. They do not write the book. **This skill is the production editor.**

The standard has not changed: **one chapter, written well enough that a reader would choose it over the top search result.** This skill is how that chapter gets made real; it is not how it gets written.

## The boundary — read this before anything else

| This skill owns | `lesson-spine-authoring` owns |
|---|---|
| The CS50 integrity check | The lesson shape — Concept, Tool, Practice, Procedure |
| Stage, sequence position, the prerequisite graph | Station 0: the name, its register, the prediction it opens |
| Research, verification, the evidence trail | The station sheet, and which stations carry the weight |
| The four ledgers, read and written back | The both-audience list, and the spine built from it |
| `scope_multiplier` and `scope_reason` | Footholds, depth blocks, the delete test |
| Frontmatter, file path, MDX assembly | Every sentence — `language-register.md` governs all of them |
| The gate, and reaching a clean pass | The retrieval prompt that ends the chapter |
| Ledger write-back, the report, the PHR | Diagnosing what the reader wrongly believes |

**One rule settles every borderline case.** If it decides *what is true and where it lives*, it is this skill. If it decides *what the reader meets, and in what order*, it is `lesson-spine-authoring`.

### What this skill must never do

Not preferences. Each of these is `lesson-spine-authoring`'s job, and doing it here produces two versions of one decision that drift apart:

- **Do not classify the lesson shape.** Hand the topic over and receive the classification.
- **Do not run Station 0, decompose the name, or judge its register.** That includes deciding an etymology is "obvious enough" to state without the verification protocol.
- **Do not diagnose the misconception separately.** Station 0 locates it. A second diagnosis run here produces a second answer.
- **Do not decide what goes in the spine versus a foothold or a depth block**, and do not run the delete test.
- **Do not rewrite a sentence for pace, length, idiom, or register.** `language-register.md` is the authority and it is not this skill's file.
- **Do not restate that skill's workflow, principles, or self-check anywhere in this folder.** Point at it. A copy is a fork.

If prose for this book is being written and `lesson-spine-authoring` is not open, the process has already failed — whatever the prose looks like.

## Images and diagrams — on request only, and by the right method

Reopened 2026-09-16 (Constitution Principle III, step 3), reversing the earlier text-only restriction. **Every atmospheric or photographic image in this book is still the project owner's**, made in ChatGPT or MiniMax — that has not changed, because the underlying reason has not: image generators cannot render legible text (`reference/image-prompts.md` explains why), so anything needing a label, an arrow, or an axis was never a fit for them.

That is exactly why a structural or conceptual diagram is a **different tool for a different job**: built via a diagramming connector (Eraser, Excalidraw, draw.io, or Mermaid rendered to a static image), which renders legible labels natively. On explicit request, this skill can now build that diagram directly, export it as a static image, save it under `edu-site/static/img/<chapter-slug>/`, and reference it as a plain markdown image — exactly how an owner-supplied image is referenced. **Never as inline Mermaid, SVG, or JSX inside the chapter body** — that stays outside `src/theme/MDXComponents.tsx`'s registered set (`Callout`, `StageBanner`, `ChapterState`) and fails the build regardless of this policy change.

The one other image-adjacent thing this skill does, **on request**, is write the image *prompt* — a precise brief the owner pastes into ChatGPT or MiniMax for an atmospheric or photographic image. That option didn't go away; it's for the case a diagram tool can't serve (mood, scene, texture), not the case it can.

**Unasked, produce neither.** A chapter that would be clearer with a diagram and wasn't asked for one still ships without it, naming the gap — this didn't change, only the menu of options once asked did.

**The deliverable is a file on disk that passes the gate.** Not prose in a chat reply, not a draft awaiting a human's assembly pass. A run that ends without a gate-clean file at `edu-site/docs/…` has not finished, however good the prose is.

## Before anything: what to read, and when

Read now, in full — they're short and they change the shape of everything:
- `curriculum-state/canon/corrections.md` — **first.** Standing rules the owner has already had to give more than once. Both repeats happened because nothing in a reading list like this one named it
- `curriculum-state/canon/thesis.md` — the five stages, the two extremes, the safety floor
- `curriculum-state/canon/audience.md` — who reads this and under what conditions
- `curriculum-state/canon/voice.md` — the house voice, its six commitments, and its banned-phrase list

Load the rest **only when the workflow reaches the step that needs it.** Reading all four reference files before you know a single fact about the topic is the standing-reference cost this structure exists to avoid:

| Reference file | Load at |
|---|---|
| `reference/research.md` | Step 2, and not before |
| **`lesson-spine-authoring` (the whole skill)** | **Step 3, and stay in it through step 5** |
| `reference/image-prompts.md` | Only when the user explicitly asks for an image prompt or a diagram. Never by default |
| `reference/gate.md` | Step 7, when you actually run it |
| `reference/ledgers-protocol.md` | Steps 1 and 8 — the read half, then the write half |

`lesson-spine-authoring` is a peer skill at `.claude/skills/lesson-spine-authoring/`, not a reference file under this one. It has its own four references and its own loading order; follow that skill's instructions once you are inside it.

## When this skill does not apply

Not for revising or copy-editing a chapter that already exists and already passes — that's editing, a much smaller job that needs none of this. Not for non-curriculum writing: marketing copy, learner emails, planning notes, site UI text. Not for teaching material with no chapter file in play — a standalone explainer or a section goes to `lesson-spine-authoring` directly, with no frontmatter, no ledgers and no gate. Not for reviewing a finished chapter — that's `lesson-adversarial-review`, and it exists precisely because the author is the worst-positioned person to judge their own chapter. Not for deciding whether a topic should exist at all or where it sits in the sequence — that's `curriculum-architect`, and a genuinely new topic with no place in the prerequisite graph should start there.

## The operative principles

How to think while running the workflow, not a preamble to skip past. Every one of these is about evidence, contract or record — because that is what this skill is for. The principles governing the teaching live in `lesson-spine-authoring` and are not repeated here.

**1. Delegate the teaching completely, then check the handback.** The split only works if it is real in both directions: nothing about what the reader meets gets decided here, and nothing that comes back is waved through unread. Step 3 says exactly what must return and what is checked in it. Partial delegation — handing over the design but "tidying" the prose, or accepting a station sheet without checking the three canon obligations — is the failure this whole structure exists to prevent.

**2. Research like your reputation depends on it.** Don't assert what you haven't checked. For Stage 3 and Stage 4 topics — the agent tools, multi-agent systems, RAG — memory is a hypothesis, not a source; these change monthly and a lesson written from what you already "know" will describe a version that no longer exists. Quote `canon/thesis.md`'s stage descriptions rather than recalling them; an earlier draft of this project's own framework misstated the Stage 3 tool list from memory, and the error shipped in a document meant to be authoritative.

**3. Label what kind of claim you're making.** Settled fact, current practice, or your own synthesis. A reader who can't tell which is which can't tell what to trust — and neither can the next author reading the ledger.

**4. Length is judged, then recorded — never looked up.** There is no word band and no target reading time. How long a chapter runs depends on the topic, chapter to chapter, as the material needs. What replaces the number is `scope_reason`: one specific clause saying what about *this* topic sets its size. The gate enforces the reason, never the number — and the reason is what stops "judged length" quietly becoming "whatever came out."

**5. Record the omissions too.** With no counts to hit, the path of least effort is thin evidence, one worked example, and silence about why. A record that lists only what was included makes under-generation invisible. If a chapter is sparse, the record has to say a reader wouldn't have gained from more.

## Workflow

### Step 0 — Integrity check, before anything else

If the topic touches an external credential, license, examination, or platform — most concretely, anything under Stage 2 / CS50 — read `curriculum-state/canon/integrity-floor.md` **first**. CS50's own published policy permits its Duck for in-course help and forbids any other AI, Claude included, from producing or completing graded CS50P/CS50W work. If what's asked would author through that conflict, **stop, state the conflict in one paragraph, and offer the compliant framing** — do not proceed "clearly labelled" or softened. Not a judgment call weighed against how far along the request is. Cheap to check before investing in research; expensive to discover after a full draft.

### Step 1 — Establish the inputs, and stop rather than invent

Three things must be real before research starts:

1. **A topic specific enough to research.** "Databases" is a stage; "choosing between PostgreSQL and MongoDB for a first backend" is a chapter.
2. **A stage (0–4; 0 is the book's own orientation material) and a rough sequence position**, checked against `curriculum-state/ledgers/prerequisite-graph.yaml`. Not listed? That's a sequencing gap — surface it and propose a position with a one-sentence reason rather than silently picking one. Already listed? Treat its `title` and `teaches` as the last-known shape, not a brief to fulfil verbatim; the graph is a snapshot of what's decided so far, and this run may legitimately retitle or rescope it. Update the graph to match what got authored, not the reverse.
3. **Enough angle to research meaningfully.** "Write something about Git" forces you to invent the chapter's thesis tie-in from nothing — exactly the fabrication risk Principle 2 exists to prevent.

Missing any of the three: **stop and ask for it precisely.** Then read the ledgers per `reference/ledgers-protocol.md` — what's already defined, what evidence is already spent, which examples are reserved, what this chapter's prerequisites actually are.

**A fourth, mechanical stop:** web search must actually work for a Stage 3 or Stage 4 topic. No working search for a topic that changes monthly is not a green light to proceed from memory with a caveat — **stop and say so.**

**A fifth stop, and it blocks step 3 rather than step 2:** `curriculum-state/canon/research-and-comparison.md` requires the project owner's own comparative study — several real courses or implementations worked through, with their learnings and the points they want carried in handed over — before any drafting begins. Research (step 2) may proceed without it. **Drafting may not.** If it has not been supplied when step 3 comes up, stop and ask for it: it is not replaceable by your own search results, because the comparison is the owner's judgment and it is the input the whole policy exists to capture.

### Step 2 — Research

Load `reference/research.md` and follow it. It ends with verified claims, each traceable to a source that was actually opened this session. Nothing is filed in a side folder: the durable record is `evidence-ledger.yaml`, written at step 8 once the gate is clean. **A claim with no source doesn't ship.**

That file also carries the standing instruction to **look things up rather than guess, at any step** — web search for anything current or contested, Context7 for library and CLI documentation.

### Step 3 — Hand the whole design to `lesson-spine-authoring`

Load `.claude/skills/lesson-spine-authoring/SKILL.md` and work inside it. **Follow that skill's own workflow as written.** It is not summarised here and must not be summarised here — a restatement in this folder is a second copy of a decision that already has an owner.

**Hand it four things**, which are what steps 0–2 exist to produce:

1. The topic, its stage, and its sequence position.
2. The verified claims, with their sources and how confident each one is.
3. The ledger constraints: terms already carrying a canonical definition, sources already spent and on which questions, examples already `reserved` or `spent`.
4. The curriculum invariants from `canon/thesis.md` that this chapter must satisfy.

**Three things must come back, and this skill checks each one** — they are Bridge Balance canon rather than general teaching craft, which is why they are checked here rather than there:

1. **The curriculum invariants are present** (`canon/thesis.md`): thesis tie-in, the problem, the two extremes made concrete to this topic, the solution, stage placement, and a safety-floor statement if the topic touches execution, deployment, credentials, or anything a reader could ship without checking.

2. **One worked example, and it was ledger-checked before it was invented.** `example-ledger.yaml` holds `reserved` entries that are pre-approved and waiting; a design that invented a new example without checking has skipped a step, and the fix is to check now. Chosen for legibility, not for how impressive it looked in research.

3. **The signature contribution is named, in one sentence, and it is real.** Per `canon/voice.md`'s anti-commodity test: if the top search result replaced this chapter with no loss to the reader, it has not earned its place. It has to be something the prose *does* — a frame, a decision rule, a worked comparison, a failure taxonomy that did not exist in this form. `lesson-spine-authoring` does not ask for this; this skill does. If nothing qualifies, the design is not finished — send it back rather than shipping a competent synthesis with a label bolted on.

Also returning: the lesson shape and the station sheet, with every dropped station carrying its one-clause reason. Both go into the step 9 report, where they are read by whoever decides the chapter ships. Do not evaluate them against criteria of your own — `lesson-spine-authoring` owns those, and checking someone's work against a standard they were never given is not a check.

### Step 4 — Set the scope, and write its reason

Assign `scope_multiplier` (see `curriculum-state/contracts/calibration.md` for the anchor at 1.0) and write `scope_reason` as one specific clause about *this* topic. "Reference scope" and "standard chapter" are not reasons and the gate rejects them. A real one reads like *"one core concept plus two supporting comparisons, and the CS50 boundary needs its own section"*.

### Step 5 — Drafting happens inside `lesson-spine-authoring`

Its workflow owns the drafting from the first sentence to the last. Stay in it. This skill contributes three things on top, because they are contract obligations rather than teaching ones:

- **`canon/voice.md`'s two tests**, run as you go rather than afterward: find-and-replace per paragraph, anti-commodity per chapter.
- **No image or diagram unless asked.** Where a labelled diagram would genuinely teach better, name the gap in your step 9 report — building one is now possible on request (see the images-and-diagrams section above), but not unrequested, and never inline Mermaid/SVG/JSX in the chapter body itself.
- **Alt text is prose.** If the chapter references an image the owner already supplied, write its alt text properly. The gate checks it.

Nothing else. If you find yourself adjusting pace, glossing, layering or sentence length, you have left this skill's territory — that work belongs to `lesson-spine-authoring` and should happen there, under its rules, not here under improvised ones.

### Step 6 — Assemble the file

Write to `edu-site/docs/stage-0N-<stage-slug>/<NN>-<chapter-slug>.md` (or the docs root for orientation material). Frontmatter:

```yaml
---
sidebar_label: "3. Databases"          # short; what the sidebar shows
sidebar_position: 6                     # integer; index.md is 1
title: "Databases: Choosing How to Store"
description: "One human sentence a person would actually read. Not keyword soup."
keywords: [postgresql, mongodb, schema, normalisation]
chapter_state: "text-ready"
video_url: ""                           # filled when the lecture is recorded
scope_multiplier: 0.7
scope_reason: "one core concept plus two supporting comparisons"
---
```

Safety-floor statements ship as exactly `<Callout type="warning" title="Safety floor">` — fixed so the gate can prove it survived. Only `Callout` and `StageBanner` are registered for a chapter body, and frontmatter carries only the keys in the chapter contract — the gate rejects anything else.

Set `chapter_state: "text-ready"` **now, before running the gate.** The gate skips `placeholder` chapters, so a chapter has to be flipped before it can be checked at all. This briefly marks an unfinished chapter live in the frontmatter sense while step 7 runs; the alternative is checking a chapter the gate ignores, which checks nothing.

### Step 7 — Run the gate

Load `reference/gate.md`. Run, from `edu-site/`:

```bash
node scripts/check-chapter.mjs --chapter docs/<path> && npm run build
```

Work every error using `gate.md`'s failure-reading table until all of it exits 0. **If you can't reach a clean pass in the same sitting, set `chapter_state` back to `placeholder`** — `text-ready` means passes the gate, not merely flipped to say so.

### Step 8 — Write the ledgers back

Per `reference/ledgers-protocol.md`, all four. A chapter that finishes without this isn't finished, whatever the file on disk looks like — the next chapter's author needs what this one just learned, and the ledgers are the only place that knowledge survives between sessions.

### Step 9 — Present

The file path. The gate output, pasted rather than summarised. The signature contribution in one sentence. Any deviation from this protocol with its one-line reason. Anything you judged *out* of the chapter and why (Principle 5). Then emit a PHR per `CLAUDE.md`'s governance.

## Anti-patterns this skill forbids

**Writing the lesson here.** The largest failure available, and the one the old name invited. Shape, name, stations, spine, layering, sentences — none of it is decided in this folder. If a run reaches drafting without `lesson-spine-authoring` open, it has skipped the part that makes the chapter worth reading.

**Re-deriving `lesson-spine-authoring`'s workflow, principles, or checks into this folder** so a run "doesn't have to load it." Every copy is a fork that will drift, and the copy is always the one that goes stale.

**Second-guessing the handback against invented criteria.** Check the three canon obligations in step 3 — that is the whole handback check. Judging the station sheet or the layering against standards this skill made up is not quality control, it is a second author.

**Shipping prose in a chat reply and calling it a chapter.** The deliverable is a file that passes the gate. A human should not have to do the second half of the job.

**Softening a check to make it pass.** A `scope-reason-generic` failure gets a real reason, not a longer generic one. An `alt-junk` failure gets real alt text, not a suppression.

**Treating a number in any reference file as a target.** Every count in this protocol is a worked illustration. The obligation that replaces the number is the recorded reason.

**Making an unrequested image or diagram, in any form.** The default is still no images and no diagrams — asked-for is the only path in, same as it has always been for image prompts. And whether asked or not, an inline Mermaid fence, raw SVG, a `.fig.mjs` module, or ASCII art inside the chapter body is never the delivery mechanism — a diagram is always a static image file, exported from a connector, referenced by a plain markdown image.

**Referencing an image that doesn't exist yet.** A chapter ships with the images it actually has. No `![…](/img/…)` pointing at a file nobody made, and no image TODOs in prose.

**Producing image prompts nobody asked for.** The default is no images and no prompts. The owner generates from their own prompts most of the time; unrequested prompt blocks are noise in the deliverable.

**Finishing without the ledgers.** The file can be perfect and the chapter still not done.

**Under-generating because judging is harder than counting.** With no floor to hit, thin is the path of least resistance. The defence is the omission record: if a chapter is sparse, say a reader wouldn't have gained from more — and mean it.

**Reviving a retired protocol from outside the repo.** Anything archived on the Desktop is out of scope like the sibling `The Bridge Balance` folder. If a task seems to need it, the honest answer is that this protocol needs extending.

---

*The gate proves the chapter is correct. `lesson-spine-authoring` makes it worth reading. This skill's job is making sure both actually happened.*
