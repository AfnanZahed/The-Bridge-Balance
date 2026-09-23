# Proposal — the chapter component palette

**Status:** candidate list, nothing decided. Written 20 September 2026 on the
owner's instruction to widen the palette (`canon/corrections.md` §21).
**Nothing here is a commitment.** *(21 September 2026: two pending questions added at the owner's request, numbers 6 and 7 below.)* Components are chosen and built one at a time,
in a later discussion, each after both research passes.

---

## Why this exists

A chapter could only use two things: `Callout` and `StageBanner`. That was never
a decision — it was two components existing and a build mechanic being written
up as a rule three layers deep. §21 has the full trace. The owner's instruction:
*"add more and more and more things... innovation is the key to success."*

## The rules that still apply

| Rule | Effect here |
|---|---|
| `canon/research-and-comparison.md` | **Two passes per component** before it is built: how the products that do this well actually handle it and why, plus the owner's own comparison. Not optional because the component is small. |
| No component is a drawing surface | A component may **lay out** content. It may not **draw**. No `<Figure />`, no inline SVG illustration, no inline Mermaid in a chapter body. A diagram ships as a **static image file** referenced by a plain markdown image — whether Claude built it in a connector (reopened 2026-09-16, Constitution v2.3.0) or the owner made it externally. The rule is about the delivery mechanism, not the author. |
| Constitution VII — Apple-Design Purity | Inter / Instrument Serif / Geist Mono, blur and elevation over hard borders, one accent per surface, light and dark both first-class, motion collapsing under `prefers-reduced-motion`. |
| Constitution I — free tier | Anything pulling in a dependency needs a documented free tier and a "when you'd start paying" line. |
| `corrections.md` §9 | A component's own labels never expose internal vocabulary to the reader. |
| Accessibility | Keyboard reachable, screen-reader labelled, and **content inside a collapsed element must still be findable by site search**. |
| `corrections.md` §19 | Ask the owner who builds each one — Claude or DeepSeek — before starting. |

---

## Candidates

Grouped by the job they do. Ordered roughly by how often a chapter would reach
for them, not by difficulty.

### 1. Structure and orientation

| Component | The job it does |
|---|---|
| `KeyTakeaway` | The one thing to carry out of a section, visually distinct from `Callout`'s warning register |
| `Steps` / `Step` | A numbered sequence where each step is a block, not a list item — for procedures that need code, an image or a note per step |
| `Collapse` / `Details` | Optional depth a reader can open — the honest replacement for cutting material. Must stay searchable when closed |
| `Tabs` | One idea, several environments (Windows / macOS / Linux; two ways to do the same thing) |
| `ChapterMap` | A small "you are here" for a long chapter — what is coming, and how far in the reader is |
| `SectionRecap` | A two-line "what just happened" between heavy sections, for a beginner who needs a breath |
| `Aside` | A short margin-note that does not break the main line of the argument |

### 2. Teaching moves

| Component | The job it does |
|---|---|
| `Analogy` | Marks the everyday thread explicitly, so a reader knows when the book is talking about a torch and when about a transistor |
| `AnalogyBreaks` | Where the analogy stops being true — the station the spine already asks for, given a visible home |
| `Misconception` | "You might be thinking X. Here is why it is not quite that." The correction move, made visible |
| `BeforeAfter` | Two states side by side — the world before an idea existed, and after |
| `Annotated` | A block of text or code with numbered callouts pointing at parts of it |
| `Glossary Term` | Inline term with its gloss on hover or tap, instead of a link that leaves the page |
| `PlainEnglish` | A hard sentence, then the same thing in plain words — the "say it twice at the hard part" rule, given a shape |

### 3. Evidence and sourcing

| Component | The job it does |
|---|---|
| **`Source` chip** | **Already specified in `canon/thesis.md`.** The plain sentence stays plain; a small marker after it opens to the figure, the year, the organisation and the link. This is the one with a written spec already |
| `Timeline` | Chronology as a visual object, so dates can leave the prose entirely (`corrections.md` §4) |
| `FactBox` | A dated, sourced fact held outside the sentence flow |
| `Quote` | An attributed quotation with its source, distinct from a blockquote |

### 4. Practice and retrieval

| Component | The job it does |
|---|---|
| `TryIt` | A small "do this now" panel — the thing to attempt before reading on |
| `CheckYourself` | A retrieval prompt with the answer hidden until asked for (Station 10's shape) |
| `Quiz` | A few questions with immediate feedback. Needs a decision on whether answers persist |
| `Exercise` | A longer task with a hint ladder rather than a single answer |
| `Reflection` | An open question with no right answer, for the stages where judgment is the subject |

### 5. Comparison and decision

| Component | The job it does |
|---|---|
| `Compare` | Two or three options as cards, not as a table a phone cannot read |
| `DecisionTree` | "If this, then that" as a walkable thing |
| `ProsCons` | The honest two-column form, with the condition under which each side wins |
| `CostPanel` | What a choice costs — money, time, or risk — which the spine's Cost station asks for and prose renders badly |

### 6. Progress and state

| Component | The job it does |
|---|---|
| `Prerequisites` | What this chapter assumes, with links, at the top |
| `NextUp` | Where to go from here, at the end — the hand-forward made consistent |
| `ReadingTime` | Already computed by the gate; not yet shown to the reader |
| `Progress` | How far through a stage a reader is. Needs a decision on whether it persists per reader |
| `Updated` | When this chapter last changed, and what changed |

### 7. Comfort

| Component | The job it does |
|---|---|
| `Figure` (owner images) | A proper caption, credit and alt-text wrapper for the owner's own images — layout only, nothing generated |
| `Gallery` | Several owner images as a set |
| `Embed` | The video lecture, once a chapter reaches `video-published` |
| `CopyBlock` | Code or a command with a copy button and a "what this does" line |

---

## Open questions for the discussion

1. **How many at once?** The owner wants maximum; the safe path is a first batch
   of three or four that unblock current chapters, then widen.
2. **Which unblock the book today?** On current evidence: `Source` (specified,
   blocking how statistics are written), `KeyTakeaway` and `Steps` (the two
   things ch01 and ch02 reach for and cannot have), `Collapse` (the honest
   alternative to cutting).
3. **Does any of them need to remember the reader?** `Quiz`, `Progress` and
   `CheckYourself` do if answers persist. That is state, and state is a
   different phase of the stack (`stack.md`).
4. **Who builds them?** The owner leaned toward DeepSeek. Confirm per §19 before
   each batch.
5. **Naming.** Every component's reader-facing label obeys `canon/naming.md`,
   including Rule 3, and never shows internal vocabulary (§9).
6. **Depth blocks: does one get built, and what does it look like?** *(Added 21 September 2026,
   at the owner's request.)* A depth block is an optional box that answers "why does it work like
   this?" for a curious beginner. Nothing in the chapter depends on it: delete every depth block and
   the chapter still stands. That is the delete test (`corrections.md` §25). No shipped chapter uses
   one. To decide: does it get its own component or reuse `Collapse` / `Details` (section 1); is it
   closed by default; must its text stay findable by site search when closed (the accessibility rule
   above says yes); what label does the reader see (`naming.md` Rule 3 applies, so the internal
   words "depth block" are not shown to readers); and does the delete test become a gate check.
7. **The `Source` chip.** *(Added 21 September 2026, at the owner's request.)* It is the one
   candidate with a written spec (`canon/thesis.md`, "Source discipline"), and it decides how a
   chapter may state a statistic: the plain sentence stays plain, and a small marker after it opens to
   the figure, the year, the organisation and the link. It waits for the two research passes like every
   other component. When the palette work starts it belongs in the first batch (question 2).

## Promotion

Per `proposals/README.md`, nothing here binds until it is moved into canon or
built. When a component ships, it is registered in
`edu-site/src/theme/MDXComponents.tsx`, documented for authors, added to the
gate's allowed set, and given a changelog entry.
