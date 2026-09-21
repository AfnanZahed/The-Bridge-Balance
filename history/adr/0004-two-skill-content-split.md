# ADR-0004: Two-Skill Content Split — Chapter Contract vs Teaching Framework

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted · amended 2026-09-07 · **superseded in part 2026-09-20 by [ADR-0007](./0007-lesson-spine-becomes-book-specific.md)**, which ends this record's deliberate genericness of `lesson-spine-authoring`. The two-skill split itself stands unchanged.
- **Date:** 2026-09-06
- **Feature:** none — repo-wide content-track architecture
- **Context:** See below.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Context

Until now one skill, `chapter-authoring`, owned the entire content path: topic →
research → design → prose → assembled MDX → gate → ledgers. It was created on
2026-09-05 by deliberately *collapsing* a two-skill pipeline, because the seam
between those two skills had been the most expensive thing about the old system.

Three things changed that made a second split worth making anyway.

**1. The audience requirement got stated precisely.** The book is read by senior
engineers learning AI-assisted development and by absolute beginners who stall at
a signup form — in the same document, and in one continuous read. The binding constraint is
that neither may be failed: no senior may feel their time wasted, no beginner may
be confused. Meeting that is a teaching-craft problem, and `chapter-authoring`
had roughly four sentences about it.

**2. A teaching framework was developed to meet it.** In a separate session the
project owner built **Name-First** — twelve stations in three phases (Prime,
Build, Close), derived from the owner's own two methods: the 5W2H interrogative
set reordered for learning rather than investigation, plus etymological
decomposition promoted to Station 0. It carries a two-reader architecture
(spine / footholds / depth blocks, with a delete test) and a language register
for a mainly Pakistani readership — plain sentences, untouched engineering. It is
850 lines across five files and it is not specific to this book.

**3. It existed only in a session-scoped temp directory.** Path:
`AppData/Roaming/Claude/local-agent-mode-sessions/skills-plugin/<uuid>/<uuid>/skills/`.
Not in `~/.claude/skills/`, not in any plugin cache, not in git, not in any
backup. The book's entire teaching method was one session cleanup away from
being gone.

A fourth thing surfaced during the work rather than before it: three canon files
that every authoring run reads in full were still describing retired strategies.
`audience.md` still split the readership into tiers with per-tier rules, and
carried two instructions to prefer Mermaid and inline SVG (the figure pipeline,
deleted 2026-09-06). `voice.md` carried a
stage-register ladder permitting later chapters to assume "generic CS vocabulary."
`thesis.md` had an optional-content column and three tiered safety-floor
wordings. The `voice.md` ladder **directly contradicted** the new
framework's rule that every term is glossed at first use in every chapter.

## Decision

Adopt Name-First as the book's teaching framework and split authoring
responsibility across two skills. Five components, which stand or fall together:

**1. Skill topology — peer, in-repo.** `lesson-spine-authoring` is copied to
`.claude/skills/lesson-spine-authoring/` (git-tracked, verified byte-identical
with `diff -r`). It is a **peer** of `bridge-balance-project-guide`, not a fifth
bundled protocol under it. It keeps its own description and triggers on its own,
because it is general teaching craft rather than Bridge Balance policy.

**2. The responsibility boundary.**

| `bridge-balance-project-guide` + its four protocols | `lesson-spine-authoring` |
|---|---|
| Architecture and technical decisions: the CS50 integrity check, stage and sequence position, research and `dossier.yaml`, the four ledgers, `scope_multiplier`/`scope_reason`, frontmatter, file path, MDX assembly, the gate | Content creation end to end: lesson shape, Station 0 and the name's register, the station sheet, the both-audience list, the spine, footholds, depth blocks, the retrieval prompt, and every sentence |

One rule settles borderline cases: **if it decides what is true and where it
lives, it is the guide; if it decides what the reader meets and in what order, it
is the spine skill.** `chapter-authoring` loads the peer skill at its step 3 and
stays inside it through step 5.

**3. Glossing — always, everywhere.** `voice.md`'s stage-register ladder is cut.
Every technical term is glossed inline at first use, in twelve words or fewer, in
every chapter, every time, regardless of stage. First use is counted per chapter,
independently, because a reader arriving from a search result or a shared link
has no earlier chapter. Audience labels in reader-facing prose are banned in both
directions.

**4. Tree-of-Thoughts is retired.** `chapter-authoring`'s mandatory ToT design
phase — generate distinct candidate designs, evaluate against a fixed chain,
select or synthesise — is removed. Name-First's shape classification (Concept /
Tool / Practice / Procedure) plus Station 0's register gap answer the same
question more specifically. The one obligation ToT carried that survives nowhere
else, the **signature contribution**, is named explicitly at `chapter-authoring`
step 3.

**5. Canon realigned, with the split recorded in it.** `audience.md` rewritten
around the two-reader model and explicitly deferring architecture and language to
the peer skill; `voice.md` and `thesis.md` stripped of grid vocabulary. Canon now
also closes the two questions `language-register.md` deliberately leaves open:
**British spelling** (already the majority usage in `docs/`) and **Urdu glosses
permitted, never required**.

## Consequences

### Positive

- **The framework is version-controlled with the book.** It survives a session
  ending, and it diffs, reviews, and reverts like everything else.
- **Each skill is now about one thing**, and each is legible on its own.
  `chapter-authoring` shrank to the contract it actually enforces.
- **The mixed-audience requirement has real machinery behind it** — the two
  disengagement conditions, the three layers, the delete test — instead of an
  instruction to be careful.
- **A contradiction that would have shipped is closed.** The stage ladder would
  have produced exactly the failure the owner named: a fresher landing on a Stage
  4 chapter from a search result and meeting undefined terms.
- **One design phase instead of two.** ToT and the station sheet were asking
  overlapping questions; running both was ceremony, and ceremony is what this
  project is actively trying to remove.
- **The framework is reusable.** Nothing in `lesson-spine-authoring` depends on
  this book, so it applies to any teaching material the project produces.

### Negative

- **A seam is back.** Collapsing a two-skill seam is precisely why
  `chapter-authoring` was created on 2026-09-05, and this reintroduces one at
  steps 3 and 5. The mitigation is a boundary table plus a single disambiguating
  rule, but a boundary in prose is weaker than no boundary at all.
- **Untested.** Neither skill has authored a real chapter. The handoff is
  theoretical, and the first genuine run is where its cost shows up.
- **The peer skill can fire without the guide's standing rules.** Because
  `lesson-spine-authoring` triggers independently, a request phrased as "teach me
  X" can reach it without loading the CS50 integrity floor, the no-images rule, or
  the no-chapter-count rule. **This is the most serious risk here.** Partially
  mitigated by a routing row that sends chapter work through the guide first, but
  not structurally prevented.
- **Always-gloss costs words in later chapters** and will read as repetitive to
  someone reading the book linearly. Accepted deliberately: the linear reader
  loses a few seconds, the search-arrival reader loses the chapter.
- **Retiring ToT removes the only mechanism that compared competing designs.**
  Name-First selects a shape; it does not weigh three shapes against each other.
  If chapters start feeling structurally samey, this is the first thing to revisit.
- **Two files now govern prose** (`canon/voice.md` and the peer skill's
  `language-register.md`), and an author must hold both. They have been made
  non-overlapping, but that is a property of the current text, not an enforced one.

## Alternatives Considered

**Alternative A — Bundle it as a fifth protocol under `bridge-balance-project-guide`.**
Same directory shape as `curriculum-architect`, `chapter-authoring`, and the other
two. Would have kept one entry point and guaranteed the standing rules always load
first, eliminating this ADR's most serious negative. **Rejected** because it makes
a general teaching framework look like Bridge Balance policy, prevents reuse outside
this book, and misrepresents the split the owner asked for — this is an equal half
of the work, not a sub-protocol.

**Alternative B — Leave the skill outside the repo and reference it by name.**
Zero copying, nothing to keep in sync. **Rejected outright**: it leaves the book's
entire teaching method untracked, unversioned, and outside backups, in a directory
whose path contains two session UUIDs. This was the finding that made the whole
task urgent rather than tidy.

**Alternative C — Keep `voice.md`'s stage ladder and scope the peer skill to
glossing mechanics only.** Preserves the stage progression, in which later chapters
read faster because earlier ones did the teaching. **Rejected**: it assumes a reader
who arrived through the book in order, and most do not. It also leaves an author
judging case by case which of two files applies — the ambiguity through which
ungossed terms actually reach production.

**Alternative D — Keep Tree-of-Thoughts alongside Name-First.** Run the tree to
pick a shape, then the stations to build it. **Rejected**: the two ask overlapping
questions, and a design phase that runs twice is the kind of unreasoned ceremony
that produces complete-but-unthought lessons — a failure `lesson-spine-authoring`
names explicitly.

## References

- Feature Spec: none — this decision originated in conversation, not a `specs/` feature
- Implementation Plan: none — see PHR below, which carries the full change record
- Related ADRs: [ADR-0002](./0002-text-first-video-second-workflow.md) (text-first,
  video-second — compatible and extended by this decision: Claude Code authors text,
  the owner supplies images and video).
- Evaluator Evidence: [PHR 0034](../prompts/general/0034-split-content-authoring-into-lesson-spine-skill.general.prompt.md)
  — full file list, `npm run build` green (0 errors), `diff -r` copy verification,
  canon sweep clean.
- The framework itself: `.claude/skills/lesson-spine-authoring/` — `SKILL.md`,
  `reference/stations.md` (the twelve stations and their 5W2H origin),
  `name-registers.md`, `mixed-audience.md`, `language-register.md`.
- Canon: `curriculum-state/canon/audience.md`, `voice.md`, `thesis.md`.

---

## Amendment — 2026-09-07: `chapter-authoring` renamed to `chapter-production`, boundary hardened

- **Status:** Accepted. This amendment refines the decision above; it does not
  reverse any of the five components.
- **Naming:** wherever the body of this ADR says `chapter-authoring`, read
  **`chapter-production`**. The original text is left as written, because it
  records what was decided on 2026-09-06.

### What prompted it

This ADR predicted the failure. Under *Consequences → Negative*, the first entry
reads: *"A seam is back… the mitigation is a boundary table plus a single
disambiguating rule, but a boundary in prose is weaker than no boundary at all."*

That prediction was correct within a day — and in a worse form than anticipated.
The expectation was that the seam would cost something during a real authoring
run. Instead the boundary eroded through **documentation drift alone**, before
either skill had authored a single chapter. Six duplications had accumulated in
`chapter-authoring`, all of them work `lesson-spine-authoring` already owned:

1. **The same worked example in both skills.** `research.md`'s *"What an AI
   coding agent actually is"* and `lesson-spine-authoring/reference/mixed-audience.md`
   §6 were the same example — same Register 4 verdict on *agent*, same
   both-audience list, same foothold, same depth block, same delete-test verdict.
2. **Step 5 restated the peer skill's workflow steps 6–8**, clause for clause.
3. **Step 3 restated its workflow steps 1–5** — while `research.md`, two files
   away, instructed *"do not re-derive its workflow here."*
4. **Three of seven operative principles were teaching craft**: teach the
   misconception (the Station 0 → Station 4 loop), concrete before abstract (the
   station ordering), curate ruthlessly (the both-audience list).
5. **Four anti-patterns were the peer skill's** — including one whose own text
   admitted the overlap.
6. **Six of seventeen self-check items re-checked the peer skill's self-check.**

### The diagnosis, and the decision

**The name was the cause.** A skill called *authoring* will author. Component 2
above drew the boundary correctly and component 4 removed the competing design
phase, but the folder kept a name describing a job it no longer had, and every
subsequent edit was pulled back toward that name.

**Renamed to `chapter-production`** (`git mv`, history preserved) — the publishing
sense, where production is everything *around* the writing: commissioning,
fact-checking, house style, setting the page, proofing, cataloguing, all done by
people who do not write the book. The skill now opens by stating the constraint
rather than implying its opposite: *one topic in, one shipped chapter out — and
this skill does not write the chapter.*

**Three structural changes make the boundary enforceable rather than described:**

- **A "What this skill must never do" list**, six items, each naming a specific
  act (classify the shape, run Station 0, diagnose the misconception separately,
  decide spine-versus-foothold, rewrite a sentence for register, restate the peer
  skill anywhere). A prohibition an author can check themselves against is
  stronger than a table they must interpret.
- **Step 3 is a two-way contract.** Four named inputs go over; three named canon
  obligations are checked coming back — the curriculum invariants, the
  ledger-checked worked example, and the signature contribution this ADR's
  component 4 preserved. Inventing a fourth check is explicitly forbidden, because
  reviewing against criteria the other skill was never given is how a reviewer
  becomes a second author.
- **Seven operative principles cut to five**, all now about evidence, contract or
  record.

### Consequences

- **The duplicated worked example is gone.** The two skills point at each other's
  halves instead of both holding a copy, so the example can no longer drift.
- **The boundary is now stated in the name**, which is the only place a rule
  survives an author who does not read the boundary table.
- **A stale claim was found and corrected** in `curriculum-architect/reference/brief-format.md`,
  which still described *"the Tree-of-Thoughts design phase `chapter-authoring`
  runs on its own"* — a phase component 4 of this ADR had already retired.
- **This ADR's "Untested" negative still stands, undiminished.** The boundary has
  now been specified twice and exercised zero times. Nothing here is evidence that
  the handoff works; it is only evidence that the previous wording did not hold.
- **The renaming remedy is unproven as a general defence.** If the boundary erodes
  a second time under a name that plainly forbids the drift, the conclusion is
  that prose cannot hold this seam and the split needs a mechanical enforcement
  the repo does not currently have.

### Alternative Considered

**Remove the six duplications and keep the name `chapter-authoring`.** The smaller
diff, and it leaves every cross-reference in the repo untouched. **Rejected**
because it treats the symptom. The duplications were not carelessness; they
accumulated because the folder's name described the peer skill's job, and
deduplicating under the same name leaves the cause in place for the next author to
rediscover. The rename is the load-bearing change — the cleanup mostly followed
from it.

### Follow-on changes, same day

Two further changes to this ADR's decision, made after the rename.

**1. The research artifacts are dropped; the evidence ledger is the only record.**
This ADR's boundary table gave the guide "research and `dossier.yaml`". That file,
`design.md`, and `curriculum-architect`'s `brief.md` all lived under a `research/`
directory that **never existed** — three named deliverables written to a phantom
path, referenced from four workflow steps and two self-checks.

All three are removed rather than relocated. `evidence-ledger.yaml` already stores
per source its URL, what it establishes, `last_verified`, `expires`, and every
`questions_asked` — so `dossier.yaml` was a per-chapter duplicate of the ledger,
with the drift risk that implies. The design trace and the brief now go into the
step 9 report and the reply respectively, where the person deciding whether the
chapter ships actually reads them. **"A claim with no dossier entry doesn't ship"
becomes "a claim with no source doesn't ship,"** enforced in the ledger at step 8.

Replacing them: a standing instruction in `lesson-spine-authoring` to **look
things up rather than guess, at any step** — web search for facts, dates and
figures; Context7 for library and CLI documentation, whose docs are fetched live.
Carried into that skill's self-check and anti-patterns so it binds rather than
advises. Research becomes an activity performed when needed, not paperwork filed
once.

**2. This ADR's most serious negative is now mitigated.** It recorded that
`lesson-spine-authoring` triggers independently, so a request phrased "teach me X"
could reach it without the CS50 integrity floor, the no-images rule, or the
no-chapter-count rule — *"partially mitigated by a routing row… but not
structurally prevented."*

The skill now opens with a conditional block, before any workflow step: if the
lesson is Bridge Balance work — signalled by a chapter, a stage, `edu-site/docs/`,
`curriculum-state/`, an MDX file, or CS50 — stop and load
`bridge-balance-project-guide` first. The four rules it cannot know are named
explicitly, and the block states that a request phrased as "teach me X" can be that
work without saying so.

This is still an instruction, not an enforced gate; the honest status is
**mitigated at the point of entry, not structurally prevented.** But it now lives
in the file that actually loads when the risk occurs, rather than in a routing
table the risky path never reads.

### References

- Evaluator Evidence: [PHR 0038](../prompts/general/0038-rebrand-chapter-authoring-to-chapter-production.general.prompt.md)
  — full file list, the six duplications as found, chapter gate unchanged at
  0 errors, strict-YAML frontmatter 8/8 (up from 6/8), `lesson-spine-authoring/`
  verified untouched.
- The skill: `.claude/skills/bridge-balance-project-guide/reference/chapter-production/`
  — `SKILL.md`, `reference/{research,gate,ledgers-protocol,image-prompts}.md`.
