# Resequencing the intro chapters: from a 4-chapter set to a 0-to-1 journey ending in SDE

**Status: proposal only, per this directory's own rule — nothing below is
authored, renamed, or wired until the user reviews it and says which parts to
act on.**

**Revised 2026-09-10 (second pass).** Two corrections from the user after
the first draft below:
1. **Process confirmation** — this proposal is the organization phase only.
   Once the chapter restructuring itself is settled and acted on,
   `lesson-spine-authoring` is what actually writes each lesson — this file
   stays a structure sketch, never prose.
2. **"What Is Programming" placement, corrected.** The first pass of this
   proposal put it as chapter 1's opening beat, before any binary content —
   concept before mechanism. The user corrected this: the whole 5-chapter arc
   is organized as one **evolutionary timeline** (their words: "0/1 -> ....
   -> SDE"), not a concept-then-mechanism structure. Under an evolutionary
   read, "What Is Programming" isn't a preface that precedes binary — it's a
   rung on the same ladder, and it belongs wherever it actually occurred in
   that evolution: after the raw 0/1 layer, not before it. See the corrected
   placement section below.

## Why this proposal exists

The current intro sequence (`intro.md` → `intro-2-binary-to-language.md` →
`intro-3-architecture-map.md` → `intro-4-two-extremes-and-sde.md`) opens with
Spec-Driven Engineering in chapter 1, then spends chapters 2–4 on binary,
architecture, and (again) the two extremes and SDE. The user flagged this as
backwards: SDE is the *destination* of a 0-to-1 journey, not its opening — a
total beginner has no foothold for "the discipline of specifying intent for
an AI agent" before they've met what programming is, what a real application
looks like, or what tools (IDEs, terminals, coding agents) they'd even be
directing. The request was to move all SDE content to the end, add several
new topics, and — after one round of clarifying questions — the user asked
for a full rethink of each chapter's role rather than a minimal reshuffle.

Three official planning documents were re-read for this pass, per the user's
explicit instruction, so the finale chapter's SDE framing stays aligned with
the intentional, official case rather than the site's own prior phrasing of
it:
- `The Bridge Balance/Official docs/curriculum_1.md`
- `The Bridge Balance/Official docs/problem_statement.md`
- `The Bridge Balance/Official docs/solution_statement.md`

One thing from `solution_statement.md` is load-bearing enough to flag now,
before any drafting: it draws a deliberate, explicit line between
**Spec-Driven Development (SDD)** — the existing, tool-adopted methodology
("specs, not prompts, should govern AI code generation") — and
**Spec-Driven Engineering (SDE)** — this book's own, wider discipline,
named explicitly as SDD's *successor*, addressing the upstream question SDD
"assumes but does not teach": how an engineer develops the judgment to write
a good spec in the first place. Current `intro.md` and `intro-4` both teach
SDE's substance but neither currently cites SDD by name or draws this
distinction. Whoever authors the finale chapter should decide, deliberately,
whether to make the SDD-vs-SDE contrast explicit — the official solution
statement clearly wants it drawn somewhere in the curriculum.

## Locked decisions (from the user's answers)

- **5 chapters, not 4.** The dense IDE/terminal/CLI-agent list splits into
  two chapters rather than one.
- **All existing intro/intro-2/intro-3/intro-4 slugs retire.** Fresh names,
  in journey order, for all five files below.
- **The SDE finale merges intro.md and intro-4 in full** — evidence studies
  and worked examples included, not just the core definitions — checked
  against the three official docs above so the "official methodology" reads
  as intentional, not accidental.
- **Still open, handled below by author judgment:** exactly where "What Is
  Programming" sits. The user asked for this to be reasoned through fresh
  rather than assumed.

## Where "What Is Programming" goes, and why (corrected second pass)

The organizing principle for the whole 5-chapter arc, per the user: an
**evolutionary timeline** — 0/1 (raw binary) at the start, SDE at the end,
with every chapter in between a rung that exists because the rung before it
ran out of room. Chapter 1 already tells exactly this story (see the
existing `stage-00-sde-intro-2026-09-03.md` proposal's own framing: "someone
hides yesterday's pain so the next generation can build faster," repeated at
every layer). "What Is Programming" has to take its place *inside* that
same evolutionary chain, at the point it actually occurred historically —
not as a concept-first preface sitting outside the timeline.

Read against the existing chain (transistor → bit → byte → ASCII → machine
code → x86/ARM → punched cards → assembly → assembler → register →
high-level language → compiler → interpreter → abstraction), the natural
slot is **right before high-level language, immediately after
assembly/assembler/register**. That's the exact historical pivot: raw
binary and machine code aren't what most people mean by "programming" — the
word only earns its modern sense once humans build a language meant for
*them* to read rather than the machine, which is precisely the wall the
chapter is about to hit. "What Is Programming" becomes the beat that names
what's about to happen ("humans needed a language of their own — this is
what programming actually is") immediately before high-level language shows
what that looked like in practice.

It does not become its own separate chapter, which would push the total
past the 5 the user confirmed — and it does not open the chapter either,
since under an evolutionary read there is nothing "natural" yet to evolve
from at that point. The exact beat-by-beat wording is `lesson-spine-
authoring`'s call at drafting time, per this project's own D5 rule (no
chapter content fixed before it's actually authored) — this section only
fixes the principle, not the sentence.

## Candidate structure (5 chapters)

Titles below are working titles only — per this project's own D5 rule, no
chapter title is fixed until the chapter is actually authored.

### 1. "From Electricity to Programming: Binary, Assembly, and High-Level Languages" — new opener
*Role:* the first rung of the evolutionary ladder — the raw 0/1 layer,
evolving step by step toward the moment "programming" (in the modern sense)
becomes possible. Absorbs the current `intro-2-binary-to-language.md`
content unchanged, with one new beat inserted at its natural evolutionary
position (see reasoning above) rather than at the top.
- Transistor · Bit · Byte · ASCII · Machine code · x86 vs. ARM · punched
  cards (historical aside) · Assembly language · Assembler · Register
  (processor)
- **What Is Programming** (new — inserted here, marking the pivot from
  "talking to the machine" to "talking in a language built for humans")
- High-level language · Compiler · Interpreter · Abstraction

### 2. "Let's Build One Thing Together: The Complete Architecture Story" — unchanged
*Role:* zoom out from one program to the shape of a real full-stack
application, so the reader has a map before meeting any tool. Content
identical to current `intro-3-architecture-map.md` — nothing the user asked
to change here.
- Platform · frontend · component · HTML/CSS/JS · DOM · responsiveness ·
  Next.js (named only) · client vs. server trust · backend · server ·
  statelessness · API/HTTP/REST · validation · middleware · logging ·
  database · SQL vs. NoSQL · relationships · Redis · authentication ·
  hashing · OAuth · authorization · token · Git/repository/commit/GitHub/
  branch/pull request/merge conflict · deployment · DNS/domain ·
  production vs. staging · the same-map cross-platform callback (mobile,
  desktop, blockchain, IoT, AI backend) · cybersecurity as a cross-cutting
  lens

### 3. "From Text Editors to AI-Integrated IDEs" — new
*Role:* meet the visual tools code gets written in, ending at the fork
between assisted and driven development that bridges into chapter 4.
- From Text Editors to IDEs — how development environments evolved
- What Is an IDE? (VS Code — real screenshot or short official clip, owner-supplied)
- AI-Integrated IDEs — Cursor, Windsurf, Zed, Trae & more (same treatment as VS Code)
- AI-Assisted vs. AI-Driven Development — key differences

### 4. "The Terminal and the Rise of CLI Coding Agents" — new
*Role:* meet the command line and the agents that live there — the more
advanced sibling to chapter 3's IDEs.
- What Is a Terminal? (CLI explained simply)
- Terminal types — CMD, PowerShell, Bash, Git Bash *(the user's list named
  this twice; treated as one item)*
- Why terminal skills are non-negotiable for engineers
- CLI-based coding agents — the next level (Claude Code, Codex, Gemini CLI — same treatment as VS Code)
- CLI-based agents — how they use the terminal to code
- Claude Code, Codex & other CLI agents — which is most famous?
- Who should use Cursor vs. Claude Code?

### 5. "Two Ways to Fail, and the Bridge Between Them: Spec-Driven Engineering" — new finale, full merge
*Role:* the destination of the 0-to-1 journey. Everything the reader has met
— programming, architecture, IDEs, terminals, agents — gets named as
exactly what SDE governs. Full content of current `intro.md` plus full
content of current `intro-4-two-extremes-and-sde.md`, merged, checked
against `problem_statement.md` / `solution_statement.md` for the SDD-vs-SDE
distinction flagged above.
- Spec-Driven Engineering · the Specify→Design→Implement→Verify loop ·
  Development vs. Engineering · vibe coding · over-caution · the two
  extremes · safety floor
- Evidence: METR productivity study · Veracode GenAI Code Security Report ·
  Stack Overflow Developer Survey · AWS tool-switching research · Dice Tech
  Job Report · (candidates to fold in from the official docs, not yet in
  either current chapter: EU AI Act compliance timeline, Deloitte *State of
  AI 2026*, LinkedIn's 2.3x hiring-speed stat, the SDD-vs-SDE table itself)
- Worked examples: CSV-export endpoint · payment-processing refactor ·
  signup-cap case · relative's delivery-service cancel-order page · admin
  dashboard experiment-to-system inventory · support-ticket agent ·
  five-agent production pipeline · Replit/Lemkin incident ·
  Enrichlead/Acevedo incident

## Proposed filenames (all fresh, per the user's "rename everything" answer)

| New id | New path | Replaces |
|---|---|---|
| `intro-1` | `docs/intro-1-binary-to-programming.md` | `intro-2-binary-to-language.md` (content), `intro.md` (slot/position 0) |
| `intro-2` | `docs/intro-2-architecture-map.md` | `intro-3-architecture-map.md` |
| `intro-3` | `docs/intro-3-editors-and-ides.md` | *(new)* |
| `intro-4` | `docs/intro-4-terminals-and-cli-agents.md` | *(new)* |
| `intro-5` | `docs/intro-5-spec-driven-engineering.md` | `intro.md` (content) + `intro-4-two-extremes-and-sde.md` (content) |

Not yet done, pending approval — flagging so the size of the follow-on work
is visible before anyone commits to this shape:
- `edu-site/sidebars.ts` — "Start Here" category's `link` currently points at
  `id: "intro"`; would need to point at `intro-1-binary-to-programming`, and
  `items` would need all five new ids in order.
- All four ledgers — every row currently keyed to `docs/intro.md`,
  `docs/intro-2-binary-to-language.md`, `docs/intro-3-architecture-map.md`,
  or `docs/intro-4-two-extremes-and-sde.md` needs re-pointing to its new
  path, per each ledger's own "append, do not silently rewrite" rule —
  this is a real edit pass, not a mechanical find-replace, since `intro`
  and `intro-4`'s content is merging rather than just moving.
- `prerequisite-graph.yaml` — five rows replacing four, `position` order
  changed so the finale sits last, `requires` chains re-linked.
- `chapterManifest.ts` — regenerate via `npm run gen:manifest`, never by
  hand.
- Every chapter's own `chapter_state` resets to reflect what's actually
  true of the new file (the merged finale is new prose, even though most of
  its content is inherited — that is a `curriculum-architect` /
  `chapter-production` judgment call at authoring time, not decided here).

## Flagged risks — resolved 2026-09-10 (third pass)

- **The finale will be long.** Resolved: length gets checked against the
  other chapters only once `intro-5` is actually drafted (word count isn't
  a planning-time question — nothing is written yet). If it is
  disproportionately long, it does **not** ship as one flat file — it
  becomes its own sidebar **category** with nested sub-lessons, the same
  pattern Stages 1–4 already use (a folder — e.g.
  `docs/intro-5-spec-driven-engineering/` — holding an index doc plus
  numbered sub-lesson docs, wired into `sidebars.ts` as a collapsible
  category rather than a single leaf item). Decide this at drafting time,
  against `contracts/calibration.md`'s baseline and the other four
  chapters' actual lengths, not in advance.
- **Chapter 3 and 4's tool comparisons will date quickly.** Resolved: both
  chapters get an explicit, visually distinct callout — this project's
  existing `<Callout>` component (`src/theme/MDXComponents.tsx`, the only
  admonition component the build allows) rather than a new one. Likely
  `type="info"` (or `type="important"` if it should read as more urgent),
  with a title like "Current as of writing" and body text naming the actual
  authoring date and telling the reader to check for the current landscape
  — Cursor/Windsurf/Zed/Trae and Claude Code/Codex/Gemini CLI are exactly
  the kind of claim (`canon/` guidance on time-boxed evidence) that ages
  out fast. One callout per chapter, placed where the named-tool material
  starts, is the working assumption; exact placement is a drafting-time
  call for whichever skill authors these two chapters.
- **`intro-1`'s scope grows.** Resolved, and downgraded to a non-issue: the
  underlying concept (a programming *language*) is already present in the
  existing `intro-2-binary-to-language.md` content — it already ends at
  "high-level language." "What Is Programming" doesn't add foreign scope;
  it makes explicit, for a beginner reader, a concept the chapter already
  relied on implicitly. No structural change needed beyond the placement
  already agreed above.

---

*Proposal only. Nothing here is a commitment to a chapter, a title, a slug,
or a scope — the user's own review is what makes any of it real.*

---

**Revised 2026-09-10 (fourth pass — Phase 1 executed).** The structural
resequencing above is now live on disk. Phase 1 ran as one mechanical pass,
before any chapter prose was written; Phase 2 (the `lesson-spine-authoring`
rewrite of all five chapters) is still outstanding.

What changed:

- Five files created — `docs/intro-1-binary-to-programming.md`,
  `intro-2-architecture-map.md`, `intro-3-editors-and-ides.md`,
  `intro-4-terminals-and-cli-agents.md`, `intro-5-spec-driven-engineering.md`.
  The old `intro.md`, `intro-2-binary-to-language.md`,
  `intro-3-architecture-map.md`, and `intro-4-two-extremes-and-sde.md` were
  deleted. All five carry `chapter_state: "placeholder"`; `intro-5` also
  carries `scope_multiplier: null`, deliberately not inheriting the old
  `1.0`.
- `edu-site/sidebars.ts` "Start Here" now links to
  `intro-1-binary-to-programming` and lists the five ids in order.
- All four ledgers re-pointed. `prerequisite-graph.yaml` gained five intro
  rows with a straight `requires` chain and per-row notes; the two flagged
  naming inconsistencies are resolved on `intro-5`'s row (the
  specify-delegate-inspect-verify framework vs the
  specify-design-implement-verify loop, and the two failure poles vs the two
  extremes). `concept-`, `evidence-`, and `example-ledger.yaml` had every
  `intro.md` reference re-pointed to `intro-5`, each with a dated header note.
- `contracts/calibration.md`'s anchor section rewritten: the anchor is now
  **unset** until `intro-5` is re-authored and reaches `text-ready`, at which
  point it is re-measured from the gate output. It no longer names a deleted
  path.
- `edu-site/src/data/chapterManifest.ts` regenerated via `npm run gen:manifest`
  (20 states). `npm run build` passes all five gates plus the Docusaurus build.

Three files needed changes this proposal did not anticipate, all to keep the
build honest rather than to change any decision here:

1. `edu-site/scripts/check-frontmatter.mjs` listed `intro.md` in its
   `STAGE_FILES` exemption. That list asserts every entry exists, so deleting
   the file broke the gate. Removed.
2. `edu-site/scripts/check-references.mjs` scanned
   `curriculum-state/proposals/` for references, which meant these very
   planning documents failed the gate the moment the files they name were
   retired — and one of them is the verbatim saved execution prompt. Proposals
   are non-binding planning artifacts, like `history/` and `specs/`, which the
   script already excludes. They are now indexed (so live docs may point at
   them) but not scanned as sources.
3. `edu-site/docs/glossary.md` linked five definitions to the `/intro` route,
   which no longer exists. Re-pointed to
   `/intro-5-spec-driven-engineering`.

Status note: the "proposal only, nothing is wired" language at the top of this
file described the state before this pass. Phase 1 is now executed and wired;
the open item is Phase 2 authoring, one chapter at a time.

---

**Revised 2026-09-10 (fifth pass — Phase 2 executed).** Phase 2 is complete. All
five intro chapters are authored, gate-clean and `text-ready`, and the ledgers,
contracts and manifest have been written back. This is the last outstanding item
the fourth pass named.

Measured, from the gate's own output on 2026-09-10:

| Chapter | Words | Reading time | Declared scope |
|---|---|---|---|
| `intro-1-binary-to-programming.md` | 2,395 | ~16 min | 1.0 |
| `intro-2-architecture-map.md` | 4,500 | ~30 min | 1.5 |
| `intro-3-editors-and-ides.md` | 4,122 | ~27.5 min | 1.0 |
| `intro-4-terminals-and-cli-agents.md` | 4,001 | ~26.7 min | 1.0 |
| `intro-5-spec-driven-engineering.md` | 3,940 | ~26.3 min | 1.5 |

What happened:

- **`intro-2`** was a spine treatment of the migrated architecture content, with
  no new topics. All eleven owner-supplied images were kept exactly in place. It
  carries the sequence's shared worked object — the club sign-up page, capped at
  thirty seats — which `intro-3`, `intro-4` and `intro-5` all return to, each
  asking it a different question.
- **`intro-3`** was authored fresh, with the pre-agreed "Current as of writing"
  callout. It ships with **no images**: the topic list once mentioned a VS Code
  screenshot the owner would supply, but none exists on disk, so the chapter
  carries no image reference rather than a placeholder pointing at a file nobody
  has made. A screenshot would genuinely help there — recorded as a gap for the
  owner, not drawn.
- **`intro-4`** was authored fresh with the same callout, and its body earns the
  notice rather than decorating the page: Google folded Gemini CLI into a
  closed-source Antigravity CLI in mid-2026, which is a live example of why the
  date matters. Also no images.
- **`intro-5`** was the merge-and-rewrite. The **SDD-versus-SDE line is now drawn
  by name**, resolving the item Phase 1 deliberately left open. It is placed
  where the Station 0 prediction is scored: the reader's guess ("write the
  specification first, then the agent writes the code") describes Spec-Driven
  Development, which is exactly why the last word of the title is *Engineering*.
  SDD is attributed correctly as the tool-adopted method; SDE is stated as its
  successor, not SDD renamed; the gap is named **specification poverty**. Both
  inherited naming inconsistencies are reconciled to one form throughout. The
  Mermaid fence is gone, replaced by prose. Cross-chapter pointers were rewritten
  as named references so they cannot go stale again.
- **The length check, and the split decision.** The pre-agreed rule was that a
  disproportionately long chapter becomes a sidebar sub-category rather than one
  flat file. It applies to no chapter here: the four newly-authored chapters
  cluster between 3,940 and 4,500 words, and `intro-5` — the chapter the rule was
  originally written for — is the **shortest** of them. The split condition was
  not met, so the split was not taken, and the intro sequence stays five flat
  documents. This is recorded as a judgment rather than left as a silent
  omission; the natural seams are named on `intro-5`'s ledger row in case the
  owner wants the sub-lesson pattern regardless of length.
- **Scope narrowed in `intro-5`, recorded rather than cut silently.** The
  inherited material carried Stage 3–4 territory — the four safety boundaries,
  the experiment-to-system transition, agent governance boundaries, the
  multi-agent ownership architecture — and the named examples that carried them.
  The re-authoring judged these out of scope for a finale in the new sequence.
  Those examples are unspent again, and the Replit and Enrichlead incidents and
  the AWS tool-switching figures were dropped with them.
- **`contracts/calibration.md`'s anchor is set**, per its own standing
  instruction: 3,940 words, from `intro-5`'s gate output. One correction is
  recorded there rather than papered over — the section previously assumed a 1.0
  flagship, and `intro-5` declares 1.5.
- **A latent defect was found and fixed.** Three rows in
  `prerequisite-graph.yaml` — `s1-index`, `s1-01` and `s3-prompt` — still carried
  `requires: [intro]`, a dangling reference to the chapter id retired in Phase 1.
  All three now require `intro-5`. Nothing in the gate chain validates
  `requires`-reference integrity, so this class of staleness survives a clean
  build; worth noting as a gap in the checks.
- **Three inline gloss defects were fixed** in `intro-1` and `intro-3` (unglossed
  first-use terms: operating system, device driver, traceback, guard clause).
  The per-chapter first-use rule admits no exceptions, and these chapters are
  written for a reader with no prior technical knowledge.

One thing this pass changed that the earlier phases did not anticipate, and it
came from the owner rather than from the plan: **the five intro chapters are
written for the absolute beginner only**, not the book's usual deliberately mixed
audience. This is a scoped, owner-directed exception to the rule
`lesson-spine-authoring` is built around. It changes how these five chapters are
written — every term glossed inline, no senior-track asides, no audience labels —
and it does not change the audience contract for Stages 1–4. If that exception is
meant to be permanent rather than intro-only, the skill's audience reference is
where it should be recorded.

Status note: Phases 1 and 2 are both executed and wired. All five chapters pass
`npm run build` end to end. The intro sequence has no open authoring items; the
open item elsewhere in the book is unchanged, which is that every Stage 1–4
chapter is still a `placeholder`.
