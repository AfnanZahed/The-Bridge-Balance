---
name: bridge-balance-project-guide
description: Use this skill FIRST, before anything else, for any task touching The Bridge Balance or its Book repo — this is the single entry point for the whole system, content and platform alike. It bundles four specialist protocols (planning a stage or chapter brief and checking the prerequisite graph; producing a chapter file from a bare topic — research, ledgers, gate, text by default with diagrams now possible on request, with the teaching itself delegated to lesson-spine-authoring; hostile-reviewing one finished chapter before it ships; auditing the whole book for drift or contradictions) as reference files reached only through this skill — they no longer trigger on their own. The teaching craft inside a chapter belongs to the peer skill lesson-spine-authoring, which chapter-production loads at its step 3 and holds through step 5 — this guide owns architecture and technical decisions, that skill owns content creation end to end. Trigger on requests like "help me plan Stage 2," "what should the next chapter (or lesson) be," "check the prerequisite graph," "write a chapter (or lesson) on X," "we need a Stage 2 chapter about Y," "review this chapter before it ships," "audit chapter X," "audit the book so far," "check for drift across chapters," or any mention of a chapter's MDX file. Also trigger for any platform/engineering work — frontend, backend, database, API, auth, payments, design — and on vaguer requests like "work on the book," "add a login feature," "fix the site," "what's next for Stage 2," or "help with the curriculum." Every chapter ships as one continuous read. Carries the standing rules that apply no matter what the task is (no fixed chapter count ever, the CS50 academic-integrity floor, Claude Code may generate diagrams via a connector on explicit request (reopened 2026-09-16), free-tier-only platform work, the Apple-Design visual language, the audience rule — Stages 0–1 are written for absolute beginners and nobody else, warmly and plainly, with every term either explained on first meeting or taught before it is used — and which sibling folder to ignore), figures out whether the task is content-track or platform-track, and for content work points to the exact bundled reference file to open and follow. Read this before touching edu-site/ or curriculum-state/ for any reason — nothing else in this repo triggers independently anymore.
---

# Bridge Balance Project Guide

This is the entry point for working on **The Bridge Balance** (`thebridgebalance.app`) — a free, three-stage curriculum that takes a student from zero to spec-driven AI-agent engineering, anchored by two real Harvard credentials (CS50P + CS50W) earned partway through. The textbook is 100% free forever; the business is a paid catalog of Claude Code sub-agents, skills, MCP servers, and plugins sold alongside it.

Almost everything here belongs to one of two tracks, and they barely share files:

- **Content track** — writing, researching, or revising a chapter of the book itself.
- **Platform track** — the Docusaurus site, the FastAPI backend, the database, auth, payments, or any other engineering surface.

Both tracks share this repo, the constitution, and the same SDD discipline (spec → plan → tasks → implement, PHRs, ADRs) already wired into `CLAUDE.md`. This skill doesn't repeat that process discipline — it exists to answer a narrower question every single time: *given this task, which rules apply, and which protocol in this repo should actually do the work?*

**Four bundled protocols, plus one peer skill.** The four specialist protocols — `curriculum-architect`, `chapter-production`, `lesson-adversarial-review`, `book-coherence-audit` — are bundled inside `reference/`, one full folder each. They don't have independent descriptions Claude Code matches against a task anymore; nothing auto-selects them. Once this skill has told you which one fits, open its `SKILL.md` yourself and follow it as your real working instructions for the rest of the task — read it the way you'd read a skill that had just triggered, because for this task, it effectively has.

**`lesson-spine-authoring` is different — a peer skill, not a bundled protocol.** It lives at `.claude/skills/lesson-spine-authoring/`, carries its own description, and does trigger on its own. It is written for this book alone (ADR-0007): the Name-First spine, the beginner-first layering and the language register. The folder keeps its old name because many files point at it; the skill itself says *chapter*. The split:

| This guide and its four protocols | `lesson-spine-authoring` |
|---|---|
| **Architecture and technical decisions.** What is true, what evidence backs it, where the file goes, what the book already knows, what the platform allows, whether it passes the gate | **Content creation, end to end.** What the reader meets and in what order: chapter shape, the name, the twelve stations, the spine, footholds, depth blocks, and every sentence |

`chapter-production` loads it at step 3 and stays inside it through step 5. Neither skill does the other's job; `chapter-production/SKILL.md` has the full boundary table and the one rule that settles borderline cases.

If a task genuinely touches both tracks, or fits neither cleanly, don't force it into one lane — say so and ask.

## Step 0 — standing rules, before anything else

These apply regardless of which track the task turns out to be, and regardless of which skill (if any) ends up running. Check them before drafting a plan, not after.

1. **No fixed chapter list or chapter count, ever.** The curriculum fixes three stages, 0 through 2, and nothing below that — the topic, title, and scope of each chapter is decided at authoring time and keeps changing as the book grows. Never write or imply a finalized table of contents, a target chapter count, or a "the book is N chapters" claim anywhere in this repo — not in a skill file, not in a commit message, not in a status doc. This has already happened once (a draft counted placeholder files on disk and wrote "17 chapters" into four different files; all four needed correcting). If you catch yourself about to write a specific total, stop and rephrase around the stages instead.
2. **The Credentials-track integrity floor is absolute.** CS50's own published policy permits its own Duck for in-course help and forbids any other AI — Claude included — from producing or completing graded CS50P/CS50W work. A task that would have a chapter, a feature, or a prompt coach a reader through graded CS50 work stops and surfaces the conflict. It does not proceed "clearly labelled" or softened. Full policy: `curriculum-state/canon/integrity-floor.md`.
3. **A chapter's lifecycle is `placeholder` → `text-ready` → `video-published`.** Claude Code authors the text; the project owner chooses how each image is made and records the video afterward. `text-ready` is a complete, real milestone — treat it as done, not as a draft waiting on more text.
4. **A chapter is one continuous read.** Every chapter is a single document, read start to finish. `edu-site/src/theme/MDXComponents.tsx` is the component registry — `Callout`, `StageBanner` and the `ChapterState` badge today, and it is open and expected to grow (ADR-0008). A component that is not registered fails the build, and the gate catches it first. What stays closed is a component that draws: no `<Figure />`, no inline SVG or Mermaid in a chapter body. Frontmatter carries only the keys in the chapter contract, and the gate rejects anything else.
5. **Platform work is free-tier by default.** Every new component needs a documented free tier and a "when you'd start paying" line, or it doesn't get added. This isn't a preference, it's Constitution Principle I.
6. **Claude Code may produce diagrams now — reopened 2026-09-16** (Constitution Principle III, step 3; reverses the 2026-09-06 restriction). A diagram is built via a diagramming connector (Eraser, Excalidraw, draw.io, or Mermaid rendered to a static image) and delivered as a static image file under `edu-site/static/img/`, referenced by a plain markdown image — never inline Mermaid, SVG, or JSX in a chapter body, which is still ruled out (Constitution Principle III, step 3, as amended in v3.0.1). On explicit request, `chapter-production` can still write image *prompts* for the owner to run externally instead — that option stays, it's just no longer the only one. The old compiled-figure pipeline (`edu-site/figures/`, the `<Figure />` component, `build:figures` / `check:figures`) stays deleted and is not to be recreated; a Claude-produced diagram today is a connector-rendered static image, not hand-authored figure code.
7. **Stages 0 and 1 are written for absolute beginners, and for nobody else.** *(Replaces the two-reader rule, withdrawn by the owner on 2026-09-20 — `corrections.md` §8. The zero-knowledge floor was renumbered to Stages 0–1 on 2026-09-22, `curriculum-state/canon/course-structure.md` CS-31.)* The reader has never programmed, does not know what Python is, and may not be sure what a terminal is for. There is no second, expert reader sharing the page, and no rule may be justified by keeping one engaged. Stage 2 has the same reader, further along the road (`curriculum-state/canon/audience.md`, "The later stages"); how it is written waits for the redesign, and no separate senior reader may be assumed. `curriculum-state/canon/audience.md` is the canon statement. What binds every task:

   - **Write warmly and plainly, everywhere.** Warmth is not a front-door permission — it is the house register. The register may get gentler where the material gets harder.
   - **Audience labels are allowed and often right.** "If you have never programmed, nothing here assumes you have" is a good sentence. The old ban is withdrawn.
   - **Every term is sorted by the one-minute test.** A term a beginner can hold inside a minute is explained inline at first use in twelve words or fewer and linked to the glossary — for its first two or three appearances in the book, then by link alone. A term that needs longer **cannot be glossed and is taught before it is used**.
   - **Simplify the vocabulary, not only the sentence.** The engineering stays true; the hard word goes if a plain one is also true (`corrections.md` §12).
   - **Every sentence must make sense on the first read** (`corrections.md` §16).

   The working rules are `lesson-spine-authoring/reference/mixed-audience.md` and `reference/beginner-experience-audit.md`.
8. **Ignore the sibling `The Bridge Balance` folder.** It's a separate, currently-paused admissions/marketing website project (where prospective students learn about the program and apply) — not an earlier draft of this book, not in scope, don't read or edit anything in it. The one exception is its `Official docs` subfolder (`problem_statement.md`, `solution_statement.md`, `curriculum_1.md`) — the original planning documents, which are genuine shared source material for this book's content.

9. **Version control: one `main` line, pushed to a private GitHub repo** (owner, 2026-09-23; this reverses the earlier no-version-control rule, which existed only because parallel sessions and worktrees caused confusion). Work on `main` only: no branches, no worktrees, no rebase, no force-push, no pull requests. Commit after each verified step with a clear message, and push to `origin` (`github.com/AfnanZahed/The-Bridge-Balance`, private) only after the owner says OK. Before every commit, confirm no secret is staged (`.env`, `.env.*`, keys, tokens). Spec-Kit Plus (spec → plan → tasks → implement) remains the discipline that structures the work.

10. **Nothing is written from a blank page — and this one runs before the rest.** A core platform policy, `curriculum-state/canon/research-and-comparison.md`, gates every piece of work on either track: a lesson, a chapter, a heading, a feature, a setting, a button, a label. Two passes come first. **(1) Standards research** — not only what is true, but how the strongest sources in the world actually teach or build this, and the reasoning underneath that choice; usually delegated to DeepSeek v4.1 Flash via `command-code-delegation`, after asking the owner which model does it (`corrections.md` §19 and §30), with results read from the real tool trace rather than a summary line. **(2) The project owner's own comparative study** — they work through several real courses or competing implementations and hand over their learnings plus the points they want carried in. **Pass 2 blocks drafting, and your own search results are not a substitute for it** — if it has not been supplied, stop and ask. Several sources are studied so that what *all of them missed* becomes visible; the findings are never averaged. Then the material is **transformed**: external sources teach a learner to *write* the thing, this curriculum teaches them to *read and judge* it, and that conversion is what makes the result original rather than a reproduction with fresh sentences. **Everything learnable is learned** — a source's structure, its ordering, its tone, the shape of its examples, its interface decisions, what it left out. Adopt what is good, then go further; when the owner hands over a reference and asks for its pattern, use its pattern (`corrections.md` §2 and §15). **What is never reproduced is a source's expression** — its sentences, verbatim or lightly reworded, and its exercises. Attribute a framing genuinely owed to a named source where naming it helps the reader. Where CS50 is the source being studied, rule 2 above is checked first and overrides this.

    **And research is not the reader's diet.** What comes back from Pass 1 makes the writer correct. It does not become a list of names and dates the chapter must carry — `corrections.md` §11.

11. **A correction is not made until it lives in this repo.** `curriculum-state/canon/corrections.md` is required reading before any content task, alongside the rest of `canon/`. Every entry is a mistake the owner has had to correct more than once, and each got made twice because the first fix was filed outside the repository — in a PHR, or in an assistant's private memory directory, neither of which a later session loads. **When the owner rejects something and says why, append the reason there before calling the task done.** Four entries bind hardest: **§7**, every chapter opens by welcoming the reader and showing the shape, with the *why* as well as the *what*; **§8**, Stages 0–1 are beginner-only; **§11**, research makes the writer correct and is not the reader's diet; and **§17**, fix the rule that produced the output, never the page beside it.

12. **Never explain the book's own rules or internal vocabulary to a reader.** No *station*, *spine*, *register*, *shape*, *front door*, *invariant*, and no sentence telling the reader how this book handles its own glossary or chapters. `corrections.md` §9.

13. **Every name obeys `curriculum-state/canon/naming.md`** — a stage, chapter, lesson, part or section title explains itself to someone who has not read it, reads like an international, professional course, **and carries a why, not only a what**. The three-second test: a beginner sees the name alone and must be able to say what it is *and* what they get from it. A name is met in a sidebar before any opening exists to rescue it (`corrections.md` §18). Propose a rename to the owner before applying it. **Which levels exist, and what kind of name each level gets, is decided in `curriculum-state/canon/course-structure.md`** — read it before naming or planning any level.
14. **Every chapter names where its knowledge gets applied** (owner rule, 26 Sept 2026 — the learn–apply–teach loop). The owner learns a topic first-hand, applies it on a real project — the book's own website counts, and so does any project or hackathon blueprint — and then teaches from the book. So whenever content is written for any stage, check which project(s) this knowledge can be applied to and name them, each with **one concrete first application**, in `chapter-production`'s step 9 report, appended to `curriculum-state/ledgers/application-ledger.yaml`. The session proposes; the owner applies — it is not a gate, and a chapter ships even when no application is named yet. The projects and the full rule: `curriculum-state/canon/projects.md`.

## Step 1 — which track is this?

Read the request and place it before doing anything else:

- Mentions a chapter, lesson, stage, topic to teach, curriculum content, or "the book" as prose → **content track**.
- Mentions the site, a page, a component, styling, the API, the database, auth, payments, deployment, or "the platform" → **platform track**.
- Genuinely both, or neither → say so, name what's ambiguous, and ask rather than guessing which one the requester meant.

### Content track — which reference protocol to follow

Pick the one row that fits, then actually open the file in the second column and read it in full — it's the real instructions for the task, not a summary of them. This table exists so *you* know which file that is and what it produces, not as something to recite back to the user.

| The task sounds like… | Open and follow | What it produces |
|---|---|---|
| "help me plan Stage 2," "turn this idea into a chapter brief," "check the prerequisite graph" | `reference/curriculum-architect/SKILL.md` | A proposal in `curriculum-state/proposals/`, or a brief — never a commitment to a final scope |
| "write the welcome page," "write the Stage N introduction," "the stage overview page," "the page before the first chapter" | `reference/chapter-production/SKILL.md`, **with the shape pre-declared `FrontDoor`** — `curriculum-state/canon/corrections.md` §1 carries the page skeleton, `lesson-spine-authoring/reference/stations.md` §3 the station weighting | A front door at `edu-site/docs/…`: short, says plainly what this is and what it does for the reader, one call to action held to the very end, and never opening on or hung from a dated artifact |
| "write the chapter on X," "research and draft chapter Y," "produce the chapter file," "make this text-ready" | `reference/chapter-production/SKILL.md`, which loads the peer skill `lesson-spine-authoring` at its step 3 | The live MDX chapter at `edu-site/docs/…` — **how each image is made is the owner's choice** — plus the ledgers written back, with `chapter_state` flipped to `text-ready` only after the gate passes |
| "teach X," "write a lesson on X" with no chapter file in play — a standalone explainer, a section, teaching material outside `edu-site/docs/` | `.claude/skills/lesson-spine-authoring/SKILL.md` **directly** | Teaching prose, spine-structured. No frontmatter, no ledgers, no gate — those only apply to a real chapter |
| "review this chapter before it ships," "is this chapter any good" | `reference/lesson-adversarial-review/SKILL.md` | A hostile, fresh-eyes report — it never edits the chapter itself |
| "check the whole book for contradictions," "does anything drift across chapters" | `reference/book-coherence-audit/SKILL.md` | A corpus-wide report across every `text-ready` chapter — it never edits |

Each of those files may point further into its own `reference/` subfolder (for instance `reference/chapter-production/reference/research.md`) — follow those pointers exactly as that file's own instructions describe, and load them at the step that needs them rather than all at once.

That table assumes the topic already has an identity — an existing placeholder file, or at least a row in the prerequisite graph. Most Stage 1–2 subtopics already do. If someone asks for a chapter on something genuinely new that isn't in either yet, start with `reference/curriculum-architect/SKILL.md` instead, even though the request sounds like a `chapter-production` job — it's what gives a new topic a place in the graph before there's anything for the other protocols to act on.

Before any of these run, `curriculum-state/README.md` is worth a glance — it's the book's shared memory (canon, contracts, ledgers), and each protocol already reads the relevant pieces of it before drafting. You don't need to pre-read the ledgers yourself; the protocol you open does that.

The chapter gate is `edu-site/scripts/check-chapter.mjs`, wired into `npm run build` as `check:chapter`. Validate one with `cd edu-site && node scripts/check-chapter.mjs --chapter docs/<path>` (drop `--chapter` for every shipped chapter). It deliberately **does not police length** — length is judged per topic; what it enforces is that `scope_reason` records the judgment. It fails on unregistered components, missing or junk alt text, a malformed safety-floor callout, and broken heading hierarchy. Chapters still at `placeholder` are skipped, but the run **lists them by name**, so a clean result can't be mistaken for proof about a chapter it never read.

### Platform track — how to approach engineering work

None of the five content skills touch the site. For frontend, backend, database, API, or infra work, there's no dedicated skill — instead, use the repo's own SDD flow (`/sp.specify` → plan → tasks → implement) grounded in these two files, read in this order before proposing any architecture:

1. `stack.md` — the actual stack, the phased rollout, free-tier ceilings, and the do-not-add list.
2. `.specify/memory/constitution.md` — the ratified principles; this supersedes everything else in the repo if there's ever a conflict.

Facts that change what "add a feature" is allowed to mean *right now*, not eventually:

- **Phases B and C are open (owner, 2026-09-22), spec-first.** Each feature gets its own spec and names its phase. The chatbot is feature 012; auth and payments get their own specs later. The free-tier rule, the do-not-add list and the provider abstraction bind every one of them.
- **The do-not-add list is normative**, not a brainstorm someone already dismissed once: no Next.js storefront, no Supabase, no Tailwind/shadcn, no Prisma, no Bun/Deno runtime, no Vercel Functions/Workers as the backend, no custom admin panel, no tRPC/GraphQL, no third-party license-key service. Reversing any one of these takes an ADR, not a default choice made mid-task.
- **Apple-Design Purity is ratified** (Constitution Principle VII): Inter / Instrument Serif / Geist Mono, blur + elevation over hard borders, one accent per surface (`--tbb-accent`), light and dark both first-class, motion that collapses under `prefers-reduced-motion`. Tokens already live in `edu-site/src/css/` — match them rather than introducing a new visual language.
- **Quality gate before anything ships:** `npm run build` in `edu-site/` (this already runs `check:frontmatter` and the search-index step) and `pytest -q` for the backend, both green.

Rough shape of `edu-site/`, so you know where to start rather than exploring blind:

```
edu-site/
├── docs/            MDX chapters (the content track writes here — don't edit from the platform track)
├── src/             Docusaurus theme, pages, React components (MDXComponents is the open component registry — see ADR-0008)
├── api/             FastAPI backend — Phase A today: /health only, no credentials required
├── scripts/         validators — check-frontmatter, check-chapter, a11y/perf/search-index
└── static/img/      chapter images — plain files; the owner chooses how each is made (`corrections.md` §28)
```

## What's inside `reference/`

```
reference/
├── project-map.md                   full path-by-path map of the whole repo
├── curriculum-architect/SKILL.md    (+ reference/brief-format.md)
├── chapter-production/SKILL.md       (+ reference/research.md, gate.md,
│                                       ledgers-protocol.md, image-prompts.md)
├── lesson-adversarial-review/SKILL.md
└── book-coherence-audit/SKILL.md
```

And one level up, the peer skill this guide hands the teaching to:

```
.claude/skills/lesson-spine-authoring/
├── SKILL.md                         the Name-First workflow
└── reference/stations.md            the twelve stations — read in full, first
    reference/name-registers.md      Station 0's four registers + verification
    reference/mixed-audience.md      who the reader is, footholds, depth blocks
    reference/language-register.md   governs every sentence in the book
    reference/comprehension-audit.md ten angles on whether it was understood
    reference/beginner-experience-audit.md  ten angles on whether a beginner
                                     will actually stay — Stages 0–1, required
```

Load only what the current task needs — that's the whole point of bundling these here instead of inlining them. `project-map.md` is the full path-by-path map of the repo, organized by task, with a "read this first" pointer for each; load it when you need an exact path and not before. The four protocol folders are the actual working instructions for content-track tasks — open the one row 1 pointed you to, in full, before starting.

`chapter-production` in particular is built for progressive loading: its `SKILL.md` says which of its four reference files to open at which step. Opening all four before knowing a single fact about the topic is the standing-reference cost that structure exists to avoid.

`PROJECT-MAP.md` also lives at the repo root as a duplicate of `project-map.md`, so the map stays reachable even in the rare case this skill doesn't trigger. The four protocols have no such standalone copy — this skill is the only way to reach them.

## Anti-patterns worth naming

- **Rounding a front door to the nearest chapter shape.** A stage's opening page is not a Concept chapter in a friendlier tone. It is its own shape — `FrontDoor` — with its own station table and its own skeleton in `corrections.md` §1. Getting this wrong has already produced two drafts rejected on sight, the Welcome page on 15 September 2026 and the Stage 0 introduction on 17 September, both of which passed every mechanical check on the way there. An unclear shape is a conversation, not a guess.
- **Inventing a chapter count or table of contents** because it would make a status update or a plan read more concretely. It won't — it'll be wrong within a week, and it's the one thing this project has already had to correct four times in one document. Describe progress by stage and by what's `text-ready`, never by a number of chapters.
- **Treating this skill as a substitute for reading `stack.md` or the constitution** before real platform work. This skill tells you the load-bearing facts and where to look; it isn't a replacement for the source documents when the task is significant enough to need them.
- **Editing `edu-site/docs/` from a platform-track task**, or touching `src/`, `api/`, or config from a content-track task. The tracks share a repo, not a workspace — cross-track edits are the exception, not the default, and worth flagging rather than doing quietly.
- **Naming a reference protocol in the routing table without actually opening and reading its file.** It's tempting to recognize "oh, this is a `chapter-production` task" and start working from memory or general sense of what that means — but the file carries the real rules (the research discipline, the gate, the ledger-write protocol, the handoff to `lesson-spine-authoring`, the anti-patterns), and none of that is optional just because the task looks familiar.
- **Drafting teaching prose without loading `lesson-spine-authoring`.** Writing the chapter straight from `chapter-production` skips the shape classification, Station 0, the beginner-landing set, and every sentence-level language rule. The result reads competent and fails the beginner, silently. If prose is being written for this book, that skill is open.
- **Fixing the page instead of the rule.** When output is wrong, find the rule that produced it and change *that*, then check the layers under it (canon → skill → drafting plan → ledger → gate). Adding a new page in front of a cold chapter, or repairing one chapter's prose while the plan that generated it stays unchanged, guarantees the same complaint returns. This has already happened three times — `corrections.md` §17.
- **Reaching outside the repo for a retired protocol.** Anything archived on the Desktop is out of scope the same way the sibling `The Bridge Balance` folder is. If a task seems to need it, the honest answer is that the current protocols need extending — say that, rather than pulling a retired one back in through the side door.
