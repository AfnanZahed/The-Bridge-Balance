---
name: curriculum-architect
description: Use when the user wants help thinking through The Bridge Balance's (thebridgebalance.app) chapter structure before content gets written — deciding what a stage's lessons could be, sequencing them, sharpening a topic they already have in mind into a lesson brief, or checking curriculum-state/ledgers/prerequisite-graph.yaml for structural problems (a broken requires reference, a cycle, two lessons that quietly overlap). Trigger on requests like "help me plan Stage 1," "what should the next lesson be," "turn this idea into a brief," "check the prerequisite graph," or "is this chapter list missing anything." Everything this skill produces is a proposal, never a commitment — it does not decide the book's chapter list, only helps the user decide it faster. Do not use this to write lesson content (that's chapter-production), and do not use it to declare a stage's chapter list finished or final under any circumstance.
---

# Curriculum architect

> **Where this fits.** Every chapter ships as ONE continuous read.
> `chapter-production` owns everything around the lesson (research, ledgers,
> scope, MDX, the gate); the peer skill `lesson-spine-authoring` writes the
> lesson itself.
> This protocol does neither — see its own scope below.


This skill helps think through structure before any lesson gets written — what a stage's lessons could be, what order they make sense in, what one specific lesson needs to say before research starts. It does not decide any of that itself. **Every output is a proposal, written as a proposal, that the user is free to accept whole, edit, partially use, or ignore.** That is the actual job, not a caveat bolted on. The Bridge Balance has no fixed chapter list and no fixed count (`curriculum-state/README.md`, `prerequisite-graph.yaml`'s own header, locked decision D5): the official curriculum fixes four stages and nothing below that level, and the user decides each chapter's topic, title, and scope when they actually sit down to it, changing their mind as often as they want. A skill that quietly started treating its own suggestions as settled would recreate the mistake this project already caught and fixed once. Don't repeat it.

**Before doing anything:** read `curriculum-state/canon/thesis.md` for the four stages' real focus lines, and `curriculum-state/ledgers/prerequisite-graph.yaml` in full, including its own header.

## When this skill does not apply

**The user already knows exactly what they want to write next.** If they can state a topic, a stage, and roughly what it should cover, they have everything `chapter-production`'s required-inputs gate needs — send them there directly. Running this skill first isn't wrong, but it isn't necessary either; don't imply it's a mandatory step in front of authoring, because it is not.

**Writing lesson content.** This skill never drafts prose and never touches an MDX file. `chapter-production` owns that whole path — research, ledgers, scope, MDX assembly and the gate — and it loads the peer skill `lesson-spine-authoring` at its step 3 for the teaching itself. Hand the topic over; do not draft here.

**Finalizing anything.** No mode of this skill locks in a stage's chapter list. If a request is phrased that way ("finalize Stage 1's chapters," "give me the definitive list") — do the planning work, but hand back a proposal and say so plainly, same as any other run.

## Step 0 — Integrity check

If the planning work touches Stage 2 / CS50 at all — even structurally, before any content exists — read `curriculum-state/canon/integrity-floor.md` first. Its rule is not advisory and does not bend by how early the conflict shows up: if a stage-structure proposal would set up lessons coaching a reader through graded CS50 work, that is the exact conflict the floor names, and this skill **stops — it does not produce the proposal with the conflict merely flagged inside it.** State the conflict in one paragraph and offer the compliant framing (`integrity-floor.md`'s own: AI for understanding, CS50's own Duck for in-course help, never AI producing submitted work) instead. Producing the non-compliant structure anyway, even clearly labelled, is the "quietly soften and proceed" pattern `integrity-floor.md` forbids — catching the conflict one step earlier than the authoring skills do doesn't earn a softer version of the same rule.

## Three modes — pick the one the request actually asks for

Don't run all three by default; each answers a different question and most requests only need one.

### Mode 1 — Stage-level structuring help

**When:** the user is starting a stage fresh, or looking at one that already has entries and wondering if it's missing something.

1. Read that stage's focus line in `canon/thesis.md` — the closest thing to an official scope statement. If `Official docs/curriculum_1.md` lists a fuller topic breakdown for this stage, read that too (quoted from the official curriculum, not recalled), but treat it the way `prerequisite-graph.yaml`'s header insists: a list of topic *areas*, not a chapter list to instantiate one-for-one. A topic area can become one chapter, three chapters, or a paragraph inside a different chapter — that judgment belongs to whoever authors it.
2. Read `prerequisite-graph.yaml`'s current entries for this stage, and `concept-ledger.yaml` for terms already defined that this stage's lessons would build on rather than redefine.
3. Sketch candidate lessons: a working title, a one-sentence scope, a plausible position relative to the stage's other candidates and to what earlier stages established. Note real dependency relationships honestly (a lesson that needs Git before it makes sense) rather than inventing a strict linear order where a looser one is true.
4. Flag, don't resolve, any evidence-allocation risk: if several candidates would obviously reach for the same canonical incident (check `evidence-ledger.yaml`), say so, so whoever researches them later knows to look for a distinct angle rather than discovering the collision after drafting.
5. Write the proposal to `curriculum-state/proposals/stage-0N-<slug>-<YYYY-MM-DD>.md` — the candidates, the reasoning, the flagged risks, one line restating this is a proposal, not a plan. Don't add entries to `prerequisite-graph.yaml` in this mode unless the user explicitly confirms specific candidates — cheap to propose, expensive to un-commit once it's sitting in the graph looking authoritative. If confirmed, add exactly as Mode 2 step 4 describes: `status: "planned"`, nothing else.

### Mode 2 — One lesson brief

**When:** the user has a topic in mind and wants it sharpened into what `chapter-production` actually requires.

1. Confirm the three things that skill's required-inputs gate checks for:
   - A topic or lesson title specific enough to research.
   - A stage (0–4) and a rough position, checked against `prerequisite-graph.yaml` — if this lesson isn't listed, that's fine and expected, not an error to fix by inventing false precision.
   - Enough scope or angle that research has something to aim at.
2. Check `concept-ledger.yaml` and `evidence-ledger.yaml` for anything the eventual author should know — a term already canonically defined, a source already heavily used. Note it; don't decide it for them.
3. Present the brief in your reply, in the shape `reference/brief-format.md` sets out — what a `chapter-production` run starts from instead of a bare topic name. It is not written to a file: a brief is a running start for the next run, not an artifact the repo needs to carry. If the user wants it kept, `curriculum-state/proposals/` is where non-binding planning output lives.
4. If this lesson has no entry in `prerequisite-graph.yaml`, add exactly one, `status: "planned"` — what the file's header documents as "in this graph, no file yet." Every real row carries an `id` (short, unique — other rows' `requires:` arrays reference it directly, e.g. `s3-cc` requiring `[s3-context, s1-06]`) and a `path` (the file it would live at once authored, following the existing `docs/stage-0N-<stage-slug>/<NN>-<lesson-slug>.md` convention, even though the file doesn't exist yet). A `planned` row needs both, or nothing downstream can ever reference it as a prerequisite and it has no real place in the site's structure to point to. Title, position, `requires`, `id`, and `path` are all as non-binding as this skill's other outputs — every one can change the moment someone actually authors the lesson. Never set any status other than `planned`; only the authoring skills move a lesson past it.

### Mode 3 — Structural health check

**When:** the user wants to know if the graph has a problem, not add anything new to it.

Read `prerequisite-graph.yaml` in full and check, mechanically. First separate the two kinds of row: a **lesson chapter** (a real chapter candidate — `path` doesn't end in `index.md`, and it isn't listed under `non_lessons`) versus a **stage-index page** (`path` ending `index.md` — a landing page, not a lesson; its `requires` names what precedes the *stage*, not what its own content assumes, and both are legitimately in different states of readiness at the same time). Apply the checks below with that distinction, not uniformly:

- Does every `requires` id actually exist elsewhere in the file? A dangling reference means a lesson assumes a prerequisite that was renamed or removed. Applies to every row, index pages included.
- Is there a cycle (A requires B requires A, however indirectly)? Applies to every row.
- Do any two **lesson chapters** have near-identical `teaches` lists, suggesting unintentional overlap? Stage-index pages carry `teaches: []` by design — not a finding.
- Does any **lesson chapter** marked `text-ready` list a `requires` entry still `placeholder` or `planned` — authored assuming a foundation that doesn't exist yet? A **stage-index page** doing the same is expected: a landing page routinely goes live before every lesson inside its stage does, and before the stage it follows is fully authored — name it only to note the stage is still in progress, not as a violation.

Report findings plainly. This mode never writes anything — a read-only diagnostic, its output a list to look at, not a to-do list this skill executes on its own.

## Anti-patterns this skill forbids

**Treating an official curriculum topic count, or any current file count, as a target.** "Stage 1 has fifteen topic areas, so it needs fifteen chapters" is the same mistake this project already caught and corrected: an earlier pass counted the placeholder files already sitting on disk and wrote that count into several files as the book's settled size. Different number, same failure — a count of what happens to exist right now is not a target for what should exist, in either direction.

**Writing anything other than `planned` for a lesson this skill itself proposed.** `placeholder` means a real file exists; this skill has written no file, so it has no basis to claim one.

**Deciding structure the user didn't ask this run to touch.** A request about one lesson's brief is not an invitation to restructure the whole stage around it.

**Presenting a proposal as if it were a decision.** Every output ends with the same plain statement: this is a proposal, not a plan, and only the user's own review makes it real.

**Running this skill as a gate in front of authoring.** A tool to reach for when planning help is wanted, not a mandatory step `chapter-production` waits on.

---

*This skill proposes. It never decides, and it never gets to call anything finished on its own say-so.*
