# ADR-0008: The Chapter Component Palette Is Open

> **Scope**: This records what a chapter body may contain, and reverses a constraint that was never decided by anyone. It covers the MDX registry, the research obligation per component, the accessibility contract, and what remains closed.

- **Status:** Accepted
- **Date:** 2026-09-20
- **Feature:** none — spans the content and platform tracks
- **Context:** See below.

## Context

For two weeks the book was written under the understanding that a chapter may
contain only two special elements — `Callout` and `StageBanner` — with
everything else being plain text, headings, bullets, tables, bold, links and
images. It was stated as a rule in `CLAUDE.md` on both tracks, and in
Constitution Principle III.

The owner read it and asked: *"how this rule came from... because I didn't said
this rule."*

They were right. Traced on request, the constraint had four layers and **no
decision underneath any of them**:

1. **A build mechanic.** In Docusaurus, a component used inside MDX must be
   registered in `src/theme/MDXComponents.tsx` or the build fails. Framework
   behaviour, not policy.
2. **Only two were ever built.** `Callout` and `StageBanner`. "The registered
   set" therefore meant those two by accident of history.
3. **One narrow owner decision, on 2026-09-06.** The compiled-figure pipeline
   was deleted and Claude-generated imagery rejected — `<Figure />`, inline SVG,
   Mermaid — because Claude's images did not reach the bar and the owner's did.
   **That decision was about images.**
4. **It was written up as a general cap.** First as a comment in
   `MDXComponents.tsx` itself (*"the only ones available inside a chapter
   body... which is the intended guard"*), then into `CLAUDE.md` as *"and
   nothing else"*, then into the constitution.

The effect was material. When the owner said a page looked "visually flat", the
only tool at hand was bold — which produced the bold-on-every-paragraph
convention that had to be undone (ADR-0006, `corrections.md` §14). Dates could
not leave the prose because there was no timeline to move them to. A specified
`Source` chip sat unbuilt. Material that should have been optional depth had to
be either cut or left in the main line.

This is the **third recorded instance of one pattern**: `corrections.md` §3 (a
design complaint written up as a content rule), §18 (an invented why standing in
for the owner's), and now a build constraint generalised into a design cap.

## Decision

**1. `MDXComponents.tsx` is a registry, not a cap.** It is expected to grow. The
owner's instruction: *"add more and more and more things... be open for tooo
many new ideas and innovation."*

**2. What stays closed is a drawing delivered as inline markup.** No component
added to the registry may be a drawing surface: no `<Figure />`, no inline SVG
illustration, no inline Mermaid in a chapter body. **A component that lays out
content is not a component that draws one** — that distinction is the whole
boundary, and it is about the *delivery mechanism*, not about who is allowed to
draw.

*(Corrected 2026-09-20 · see the Amendment below.* This point originally read
*"The 2026-09-06 decision is untouched... no generated imagery of any kind."*
**That was wrong.** The 2026-09-06 restriction was reversed on 2026-09-16 by
Constitution v2.3.0: Claude may produce structural and conceptual diagrams via a
diagramming connector, delivered as a static image file under
`static/img/<chapter-slug>/` and referenced as a plain markdown image. What
never reopened — and what this ADR's boundary is actually about — is inline
markup inside the chapter body. Pictorial and photographic imagery remains the
owner's.)*

**3. Every component earns its place through the existing gates**, none of which
this ADR relaxes:

- Both research passes (`canon/research-and-comparison.md`) — how the products
  that do this well actually handle it and why, plus the owner's own comparison.
- Constitution Principle VII, Apple-Design Purity — the existing tokens, one
  accent per surface, light and dark both first-class, motion collapsing under
  `prefers-reduced-motion`.
- Constitution Principle I — a documented free tier for anything that adds a
  dependency.
- Accessibility: keyboard reachable, screen-reader labelled, and **content
  inside a collapsed element must remain findable by site search**.
- `canon/naming.md` and `corrections.md` §9 — reader-facing labels carry no
  internal vocabulary.

**4. Components are added one at a time, in deliberate batches.** Each ships
with its registry entry, its author documentation, its gate allowance and a
changelog line.

**5. The candidate list is recorded, not committed**:
`curriculum-state/proposals/chapter-component-palette-2026-09-20.md` — 34
candidates in seven groups. The first batch proposed on current evidence:
`Source` (already specified in `canon/thesis.md`, and blocking how every
statistic is written), `KeyTakeaway`, `Steps`, `Collapse`.

**6. Constitution Principle III needed a wording amendment — now made.** Its
phrase *"stays outside `MDXComponents.tsx`'s registered set (`Callout`,
`StageBanner`, `ChapterState`)"* was correct about **diagrams delivered as
images** but was being read as fixing the registry. **Amended 2026-09-20 as
Constitution v3.0.1**: the enumeration is removed, the rule it was explaining
(no inline markup in a chapter body) is kept, and the registry is stated as open.

## Consequences

### Positive

- **Structure becomes available as a teaching tool.** Flatness is fixed with
  shape rather than with bold, which is what `corrections.md` §14 asks for and
  could not previously deliver.
- **`Timeline` would let dates leave the prose entirely** — the cleanest
  available answer to `corrections.md` §4, which currently relies on authorial
  restraint.
- **The `Source` chip becomes buildable**, unblocking the statistic-handling
  decision in `canon/thesis.md` that has been specified-but-inert.
- **`Collapse` gives an honest alternative to cutting** material a reader might
  want.

### Negative

- **Every component is a permanent maintenance surface** — theme, dark mode,
  print, mobile, accessibility, and a build-time failure mode per component.
- **More components mean more ways for chapters to look inconsistent** with each
  other. The palette needs its own usage guidance or it becomes decoration.
- **State-bearing candidates pull in an unopened phase.** `Quiz` and `Progress`
  need persistence, which is Phase B/C in `stack.md`; they cannot be in an early
  batch without opening that phase.
- **Search indexing and a11y are real work per component**, not a finishing
  touch — especially for collapsed content.
- **Palette growth can become a substitute for good prose.** A chapter that
  needs a better explanation is not fixed by a nicer box.

## Alternatives Considered

**A. Keep the two-component set.** Rejected: it was never decided, and its costs
are now measurable — the bold-as-structure convention that ADR-0006 had to
reverse came directly from having no other tool.

**B. Markdown only; remove `Callout` too.** Rejected: strictly worse than today
and contrary to the owner's stated direction.

**C. Adopt a third-party MDX component library wholesale** (shadcn/ui, Nextra's
set, Docusaurus community components). Rejected on four independent grounds: the
do-not-add list in `stack.md` names Tailwind and shadcn explicitly; Principle
VII requires the project's own visual language; Principle I requires a
documented free tier per dependency; and the research policy requires adopting
*reasoning*, not pixels.

**D. Build everything on the candidate list at once.** Rejected: 34 components
is a platform project, the owner asked for one-at-a-time, and most are not
blocking any current chapter.

## References

- Feature Spec: none
- Implementation Plan: `curriculum-state/proposals/chapter-component-palette-2026-09-20.md`; decision recorded at `curriculum-state/canon/corrections.md` §21
- Related ADRs: [ADR-0006](./0006-beginner-first-content-integrity.md) (the bold convention this unblocks), [ADR-0003](./0003-scoped-accent-reintroduction.md) (the accent contract every component inherits)
- Evaluator Evidence: [PHR 0117](../prompts/general/0117-component-palette-opened-spine-made-specific.general.prompt.md)

---

## Amendment — 2026-09-20 (same day): decision point 2 was factually wrong

**What was wrong.** Decision point 2 asserted that the 2026-09-06 restriction on
Claude-produced imagery was *"untouched"* and that no Mermaid or generated
imagery of any kind was permitted. That restriction had already been **reversed
on 2026-09-16**, four days before this ADR was written, by **Constitution
v2.3.0** · Principle III step 3, which reopened structural and conceptual
diagrams to Claude Code via a diagramming connector (Eraser, Excalidraw, draw.io,
or Mermaid rendered to a static image), delivered as a static image file.

**How it got in.** This ADR, `corrections.md` §21 and the palette proposal were
all drafted in a session whose project instructions came from a **stale
`CLAUDE.md` inside a git worktree**. The live `CLAUDE.md` at the repo root
carries the reopening at line 55; the worktree copy still carried the superseded
2026-09-06 text. Nothing in the drafting checked the constitution itself, which
is the file that actually governs this.

**What the boundary really is.** Unchanged in substance, and this ADR's core
finding survives intact:

| Question | Answer |
|---|---|
| May the component registry grow? | **Yes.** That is this ADR's decision and it stands. |
| May a chapter body contain inline Mermaid, SVG or JSX? | **No.** Never reopened. |
| May Claude build a structural/conceptual diagram? | **Yes**, since 2026-09-16, via a diagramming connector, delivered as a static image file. |
| May Claude generate pictorial or photographic imagery? | **No.** That stays the owner's, made externally. |
| May a *component* be a drawing surface? | **No.** A component lays out content; it does not draw. |

The distinction the original point 2 was reaching for was right — it just
attached it to a rule that no longer existed. The real boundary is the
**delivery mechanism**: a diagram ships as a file, not as markup in the body.

**Process finding.** A rule file was read from a worktree rather than from the
live repo, and three artifacts inherited the error before anyone checked the
governing document. Recorded in `corrections.md` §24.
