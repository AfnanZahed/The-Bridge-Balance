# Whole-book redesign — complete decision record

**Status: non-binding planning record, per this directory's own rule — nothing here is a commitment until it's written into canon, a ledger, or an actual chapter file. Compiled 2026-09-14, in one continuous discussion that started from two simple questions and grew into a full redesign of the book's architecture.**

This document exists because the redesign got large enough, and moved fast enough, that keeping it only in chat history risked losing decisions or re-litigating settled ones. Read this before touching any Stage 0 content, any chapter hierarchy, or any lesson-classification work on this project. See also the two live plan files this record consolidates: `C:\Users\Dell\.claude\plans\when-writing-the-book-rosy-whisper.md` and `C:\Users\Dell\.claude\plans\rosy-stargazing-conway.md`.

---

## 0. Current status at a glance

**Legend:** ✅ Done · 🟡 Planned, not yet executed · ⚪ Not yet planned.

Read this section for orientation. Sections 1–13 below are the historical record, preserved as written, with a forward pointer at any heading whose subject is now settled — so a reader never has to guess whether an old section still reflects reality.

### ✅ Decided in discussion (done)

- **Hierarchy:** Stage → Chapter → Lesson, with an optional **Part** inside a Lesson only when it is too long or mixed to stay one unit. Stage 0 will additionally get its own `stage-00-.../` folder (matching Stages 1–4's pattern) once real content exists to put there — decided today, not yet built, since there is nothing to move yet.
- **CS50's Week-based structure rejected** — the course is self-paced.
- **Ordering principle:** Stage 0 is chronological; Stage 1 onward is pedagogical.
- **Stage 0 officially promoted** — a real, numbered stage (0–4, five total), not "intro" anymore.
- **Reading & Understanding Literacy** declared a permanent thesis principle.
- **Content-kind classification:** two kinds, not three or four — named **Theory** / **Practice**. Re-checked twice (once as an internal planning taxonomy, once under a reader-facing/frontend lens) and held both times.
- **`01-binary.md`'s fate:** it will be replaced by the from-scratch Stage 0 rewrite, not preserved. The exact mechanics — delete vs. reuse fragments — stay open, waiting on the real breakdown.
- **No separate `/sp.adr` filed** — this record file plus the session's PHRs serve as that documentation, per the owner's own call.
- **The software-engineering-methodology / Unix contemporaneity question** (are they interleaved, or flagged as parallel threads, in Stage 0's real sequence) does not need an answer until the real Stage 0 breakdown is designed. It is understood, not yet decided.
- **The live site is not deployed yet**, so there is no migration/transition risk to plan around.
- **Stages 1–4 will eventually need pedagogical revision** once Stage 1 is back in scope — acknowledged, deliberately deferred, not scheduled.
- **Which specific terms are "major" vs "minor"** in `term-ledger.yaml` is a runtime, per-chapter authoring decision for whichever AI writes that chapter — not pre-assigned now, by design.

### ✅ Built in the repo (done, verified)

- **`prerequisite-graph.yaml`:** `lessons:` renamed to `chapters:`; the stale "no official Stage 0" comment fixed.
- **`canon/thesis.md`:** the Reading & Understanding Literacy section written in; the stage table now has 5 rows.
- **`CLAUDE.md`:** the stale "intro is all placeholder" claim fixed; "four-stage" → "five-stage" language fixed.
- **`bridge-balance-project-guide/SKILL.md`, `curriculum-state/README.md`:** the same five-stage / Reading-Literacy updates.
- **`stages.ts`, `stage-icons`, `sidebars.ts`, `specs/007-search-experience/spec.md`:** Stage 0 is real in the site's type system, nav, and search-shortcut spec (using "Orientation" as a placeholder name pending a real one).
- **Glossary enforcement mechanism** (`term-ledger.yaml`, 2 new gate checks in `check-references.mjs`, CSS link styling): built and verified, not used by any chapter yet.
- **Theory/Practice badge mechanism** (frontmatter fields, gate validation, reader-facing badge): built, verified live in the browser in both themes; one ADR-0003 colour violation found and fixed. Not applied to any chapter yet.

### 🟡 Planned / proposed, not yet done

- **The actual Stage 0 chapter/lesson breakdown** — turning the confirmed history eras into real Chapters and Lessons. The owner said "Not Yet."
- **The owner's own pending changes** to the `lesson-spine-authoring` skill — waiting on the owner, not started.
- **Applying Theory/Practice labels to real chapters** — mechanism ready, application deferred on purpose.
- **Applying glossary links into real chapter prose** — mechanism ready, application deferred on purpose.
- **Revisiting Stage 1** (keep / revise / rewrite each chapter) — on hold; the current content is flagged by the owner as unauthorized/hallucinated, off-limits until further notice.
- **Choosing a real name for Stage 0** — "Orientation" is currently just a placeholder.
- **The sweep of other stale "four stages" references and other stale docs** is being closed out in the same pass that produced this summary; that list is not duplicated here.

---

## 1. How this started

*The `CLAUDE.md` staleness noted below has since been fixed — see §0.*

The owner asked two questions: how many "lesson types" the book would have, and whether the first five intro chapters formed a complete, correctly-sequenced timeline. Both were asked because "the exact lesson writing and formation and organization and method is not decided yet. confusion, randomness, assumptions and mismanagement is at every stage."

Research (three parallel audits, then an adversarial second opinion) found the book's real state was further along than the project's own `CLAUDE.md` claimed (all five intro chapters were actually `text-ready`, not `placeholder` — that claim is still stale as of this writing) and surfaced real structural problems: an orphaned-looking file that turned out to be legitimate content, no formal lesson-type system despite an internal "shape" concept nobody enforced, and a labeling conflation between genuine chronology and pedagogical ordering.

The owner's answers escalated scope twice: first confirming the orphaned file was real content, then declaring the entire book's chapter design would be redone from scratch, discussed in chat rather than delivered as a document.

---

## 2. Standing constraints — unchanged from day one, bind every decision below

- Never state or imply a fixed chapter, lesson, or stage count, or a finished table of contents (locked decision D5; this project has already had one incident from breaking this rule).
- Every chapter/lesson stays one continuous document for two simultaneous readers — a senior engineer and a complete beginner — reading the same text at the same time. No audience-labeled sections, no separate editions.
- Claude writes text only. No images, diagrams, or Mermaid, in any form, at any point.
- The textbook is free forever.
- Stage 2's CS50 integrity floor is absolute wherever the redesign reaches it — this project must never produce or complete graded CS50 work.
- No version control in this workflow.

---

## 3. Decided — content hierarchy

*Resolved — see §0 (hierarchy fixed, and the `lessons:` → `chapters:` rename this section flags as open is done). The narrative that follows is preserved as written.*

**`Stage → Chapter → Lesson`, with an optional fourth level, `Part`, used only inside a Lesson that turns out to be too long, mixed, or disorganized to stay one unit.** Most lessons will never need a Part. This is the owner's own final call, made after research recommended a similar but differently-named structure — see §10.1 for what the research found and why the owner's naming choice differs from it.

**A real naming collision this creates, not yet resolved (see §12):** `curriculum-state/ledgers/prerequisite-graph.yaml`'s top-level key is currently `lessons:`, and it currently means what this new hierarchy calls a **Chapter**. `lesson-spine-authoring` also currently calls every one-file unit "a lesson" in the old, coarser sense. Both need to be reconciled with the new, finer-grained meaning of "Lesson" before any of this is implemented — most likely by renaming the ledger's top-level key to `chapters:`.

**Rejected explicitly**: CS50's own `Week`-based structure. The owner's words: "CS50's week is of no use for us, our course is self paced." This matches what the research independently concluded — CS50's "Week" is schedule-bound by name (Week 0-9, 0-10, 0-8) and is the one structure in the whole survey that must not be imported into a course that never fixes an end date.

---

## 4. Decided — the macro ordering principle

**Stage 0 (the intro/orientation sequence) is chronological. Stage 1 onward is pedagogical.**

The owner's own Cause→Effect reasoning, verbatim in substance: Stage 0's job is to build complete WHY/HOW understanding of Spec-Driven Engineering (SDE) — a full mental model, not a practical skill — and that can only be walked in the order it actually happened, mirroring the owner's own lived discovery path (finding both extremes useless, then finding the balance). Stage 1 onward is where practical, technical skill gets built, and tech is inherently adaptive — a fixed, historically-ordered curriculum there would mirror the rigidity of the two extremes SDE itself rejects.

**Consequence already acted on**: the whole intro sequence, not just chapter 1, must become genuinely chronological. This ruled out keeping intro-2 through intro-5's content as-is (they are present-day snapshots with a few historical footnotes, not real chronological chapters) and made the Internet/Web's actual invention a required rung rather than optional detail.

**What Stage 1 actually is, directly answered** (the owner asked): technical and practical, not theory. Per `canon/thesis.md`'s own four-stage table: architecture, dev environment, core programming, packages, OOP, Git/GitHub, frontend, UI/UX, backend, auth, async/realtime, databases, personal branding. Stage 0 carries the philosophy and history; Stage 1 is where the student builds things, with Reading & Understanding Literacy (§6) as the operating discipline while doing so, not a topic re-taught there.

---

## 5. Open — content-kind classification, naming not yet finalized

*Resolved — see §0 (the two kinds are Theory / Practice). The candidate namings below are preserved as written.*

**The underlying structure is decided; the words are not.** Research (see §10.2) diagnosed the existing internal "shape" concept (Concept/Tool/Practice/Procedure) as flawed because its four values sit on three different axes at once, and recommended: keep the station-reweighting mechanism, cut to three values on one consistent axis (**Concept | Procedure | Practice**, each defined by the reader's exit capability), demote "Tool" to a separate tag applied on top, and rename the axis from "shape" to "kind."

**The owner accepted the three-way structure but rejected the plain research wording**, asking instead for original, "professional wording... decent, international level, philosophical and ultra professional yet easy english for beginners" — citing freeCodeCamp's `Theory`/`Workshop`-style naming as the *register* to aim for, explicitly not to copy verbatim, because "our book/platform/course is unique in its own nature."

**Candidate renamings for the three kinds, offered for the owner's reaction, none yet chosen:**

| Concept-equivalent | Procedure-equivalent | Practice-equivalent | Notes |
|---|---|---|---|
| Foundation | Procedure | Fluency | "Fluency" echoes the Reading & Understanding *Literacy* thesis vocabulary without reusing the same word |
| Grounding | Method | Craft | "Craft" is a well-worn, respected word for skill built through repetition, without overclaiming |
| Bearing | Build | Discipline | "Discipline" directly echoes "Spec-Driven Engineering... discipline," already load-bearing vocabulary in this project's own thesis |

None of these copy freeCodeCamp's, CS50's, or any surveyed platform's actual terms. Whichever triad is chosen (or a different one entirely), the axis itself should be named something other than "shape" (which invited the false format-based analogies — Lecture, Walkthrough — that the research had to rule out).

---

## 6. Decided — Stage 0 is promoted, with a new stated purpose

*Resolved — see §0 (Stage 0 is promoted, and the "Not yet done" technical work this section lists is now done).*

**Confirmed.** The owner clarified the earlier, seemingly-contradictory history directly: an original, no-longer-existing first draft of this curriculum also had a "Stage 0," with entirely different content and purpose, which the owner removed themselves — recorded in this project's own history as an explicit past instruction, "rebrand the stage 0 as intro, there is no official stage 0" (PHR `0010-author-sde-intro-chapters-to-site`). This is not that decision being silently reversed; it's a fresh, deliberate reintroduction with a new, specific purpose.

**Stage 0's stated purpose, in the owner's own words**: to make students absorb (a) the Spec-Driven Engineering philosophy and (b) the Reading & Understanding Literacy philosophy — stated as inseparable: **"SDE cannot be completed without Reading and Understanding Literacy."** Both are introduced as major content inside Stage 0. Stage 1 is where they get exercised while learning real technical skills, not re-taught.

**Not yet done**: the technical work this promotion requires. `edu-site/src/lib/stages.ts` hardcodes `StageNumber = 1 | 2 | 3 | 4`; `sidebars.ts`'s intro category is currently labeled "Start Here," not a Stage; `specs/007-search-experience/spec.md` formally requires "the four shortcut circles MUST be the four curriculum stages" — a fifth stage breaks a written spec, not just a label; `canon/thesis.md`, `CLAUDE.md`, and `bridge-balance-project-guide/SKILL.md` all currently say "four stages." None of this has been touched yet.

---

## 7. Decided in substance, not yet written — Reading & Understanding Literacy

*Resolved — see §0 (written into `canon/thesis.md`). The substance below is preserved as written.*

**The principle**: of everything this book covers, only *Programming itself* is where the two extremes (over-trust / over-caution) actually fight — the owner's estimate is roughly 80% of the tension. MCP servers, agentic AI, certifications, and tech history are comparatively uncontroversial. "Reading and Understanding Literacy" — the ability to read and judge code, whoever or whatever wrote it, well enough to verify it and take ownership — is this book's resolution mechanism specifically for Programming: it keeps the speed/leverage argument from over-trust and the rigor argument from over-caution, while dropping both extremes' failure modes. It is the central teaching key for both Stage 1 and Stage 2.

**Checked against the official founding docs, per the owner's explicit request** (§9's item 9): `solution_statement.md` already contains the scaffolding this sits on — "students learn engineering principles through theory, then use AI tools to practice, build, and validate those principles against real systems" (the exact Stage 0 → Stage 1 loop), "fundamentals are what allow you to judge AI output," the traditionalist trap (over-caution) and vibe-coder trap (over-trust) named as the two failure modes this model prevents, and **"specification poverty"** — the inability to write a good spec because the engineer lacks the vocabulary and system literacy to articulate intent — named as the fourth, upstream failure mode nothing else addresses.

**Refined by deep historical research** (see §10.3 in full): the connection to Hoare's 1969 paper is real but narrower than a first pass suggested. Hoare's move — "a specification is a first-class object you verify code against" — is the deepest root of the "compare against stated intent" half of Reading Literacy. But the stronger named ancestor for reading *someone else's (or an AI's) code* specifically is **Parnas's 1972 boundaries paper**, not Hoare directly: Parnas's module boundaries are what make another party's code readable and comprehensible at all; Hoare's pre/postcondition idea is what makes that reading checkable against stated intent. Both belong in the eventual canon text; neither should be overclaimed as the sole ancestor.

**Where this goes when written**: its own new H2 section in `curriculum-state/canon/thesis.md`, immediately after "The two extremes" — confirmed as the structurally correct location by reading that file's exact existing section order.

**Not yet written anywhere.**

---

## 8. Decided in substance, not yet built — term and glossary discipline

*Partly resolved — see §0 (the enforcement mechanism is built; applying glossary links to real chapter prose is still deferred).*

**The rule**: no major or serious term/concept may be referenced in a lesson unless it was already taught (or at least introduced) in an earlier lesson, chapter, or stage. Minor terms may be used without full teaching treatment, but must be linked inline, visually distinct, directly to their definition in the glossary. The owner's clarification: **this is not only a glossary feature — it is also a curriculum-sequencing discipline**, applied when planning what goes in which lesson/chapter, specifically to avoid overwhelming or overwhelming-by-assumption a student who hasn't met a term yet.

**What already exists toward this**: `concept-ledger.yaml` already exists specifically "to stop a term being used before it has ever been glossed," and `canon/voice.md` already mandates a ≤12-word inline gloss at first use, every chapter, every time. `prerequisite-graph.yaml` already has `requires`/`teaches` fields per lesson row that are structurally the right place to enforce "was this taught earlier."

**What's missing, confirmed by direct research**: none of this is automated — enforced only by author discipline. The live glossary page exposes only 5 of 170 defined terms (~3%) and nothing currently links a chapter into it. No inline glossary-link component exists in `edu-site/src/theme/MDXComponents.tsx` (only `Callout` and `StageBanner` are registered today, and that allow-list is duplicated, not shared, between that file and `check-chapter.mjs`). Building real enforcement is genuine new work spanning both the content track (deciding what counts as "major" vs "minor") and the platform track (a new frontend component, gate logic extending `check-references.mjs`, which already parses markdown links and already loads the ledgers).

**Not yet designed in detail or built.**

---

## 9. Resolved in principle, 2026-09-14 — `01-binary.md`'s fate

**Superseded, not preserved.** The owner's words: since "Complete Stage 0 (not intro now) → Chapters → Lessons → Parts are going to be written again, from correct chronological... sequence, complete sequence, content, research, and redesign of stage 0 is going to be done from scratch, so, this file will also be, of course, replaced by the new stage 0's contents." The file is not being kept as-is, merged in place, or treated as a starting draft — whatever Stage 0's real breakdown (§12.7) produces replaces it.

**Still open, and still correctly sequenced last:** the exact mechanics — does any of the current prose survive inside the new chronological sequence in some form, does the file simply get deleted once its replacement ships, does its id/path get reused or retired — stay undecided until the real Stage 0 chapter/lesson breakdown (§12.7) exists to replace it with. Do not pre-empt that design by deciding this now.

Earlier framing for context: the owner's original words, before this resolution — "the finalized plan and complete roadmap when done, will decide itself about this 01-binary.md, this file is the last stage to be discussed."

---

## 10. Research findings archive (condensed — full detail in `rosy-stargazing-conway.md` and the session's scratchpad files)

All three threads below were run via `.claude/skills/command-code-delegation/`, using DeepSeek V4.1 Flash at `--effort max` (a real, confirmed-valid value not advertised in the CLI's own `--help` text — documented as a correction in `command-code-delegation/references/command-code-cli.md`).

### 10.1 — Hierarchy research

Verified real structures against live pages: Coursera (Specialization → Course → Module → item), edX (Section → Subsection → Unit → Component), Udacity (Nanodegree → Course → Lesson, Project parallel), freeCodeCamp (superBlock → chapter → module → block → challenge, deep levels **optional**), Odin Project (Path → Course → Lesson, flat). CS50 corrected precisely (see §3). Found the tooling already has an embryonic, half-built sub-chapter mechanism (`generate-chapter-manifest.mjs`'s `"sub"` kind), and that `01-binary.md` is already an unfinished instance of it. Recommended `Stage → Chapter → Part` naming to avoid a Lesson/lessons collision — the owner instead kept "Lesson" for the third level and introduced "Part" as a fourth (§3), which raises the same collision from a different angle, now tracked in §12. Full 15-point technical touch-list (frontmatter, `sidebars.ts`, three frontend files, all four ledgers, the gate scripts) archived in `rosy-stargazing-conway.md`. Also found `specs/001-book-foundation/contracts/content-schema.md` is independently stale (describes an old `## Lecture outline` format) — unresolved, tracked in §12.

### 10.2 — Classification research

Bloom's Taxonomy confirmed to classify learning objectives, not content types — and CS2013/CC2020 (the real ACM/IEEE computing-education standards) explicitly declined to use Bloom's for content typing, for the same reason. CS2013/CC2020 use three separate orthogonal axes (coverage / mastery / requirement), never one mixed lesson-type list. CS50's real labels, verified against live 2026 pages: Lecture, Shorts, Section, Problem Set, by delivery format — "Walkthrough" (a guess in the original research brief) turned out to be a third-party YouTube convention, not a real CS50 category. Diátaxis (tutorial/how-to/reference/explanation) confirmed as the most rigorous content-kind taxonomy surveyed, but explicitly disqualified here because it mandates separate documents per kind, conflicting with this project's one-continuous-document rule. Full diagnosis and recommendation in §5 above.

### 10.3 — Stage 0 spine deepening

**A correction to something stated as fact since the first research round**: the 1968 NATO Garmisch conference did **not** coin or adopt the phrase "software crisis" as its own — the actual report shows attendees disputing whether a crisis existed at all. Do not repeat the "1968 conference named the software crisis" claim in any future canon text.

Rich, sourced, teachable content confirmed ready for three new eras: the integrated-circuit/microprocessor transition (Kilby 1958, Noyce & Hoerni 1959, the Intel 4004 1971, through to the Altair 8800 and the IBM PC); the 1968-72 software-engineering-methodology lineage (Garmisch 1968, Dijkstra 1968-69, Hoare 1969, Parnas 1971-72), including real hedges the earlier pass lacked (Hoare himself credited Floyd 1967 with priority for the assertion method, and predicted proofs would not become widespread practice); and an AI-history-before-LLMs bridge (Dartmouth 1956 through the 2017 Transformer paper), including an honest scholarly counterpoint (Thomas Haigh's 2023 CACM paper disputing that a "first AI winter" even happened).

**A structural flag not yet resolved**: the software-engineering-methodology era is chronologically *contemporaneous* with the Unix/hardware era (1968-72 vs. 1969-70), not a clean sequential rung after it — the same kind of finding as the editors/terminals merge (§10.1's predecessor round). If the final spine keeps it as a separate, later thematic layer rather than interleaving it, the text will need an explicit dated anchor sentence acknowledging that choice, or it will silently overclaim strict chronology exactly the way the original five-chapter version did.

**Handoff note**: `evidence-ledger.yaml` already has a `parnas-1972` entry from Stage 1's own usage. A Stage 0 reuse of the same source must ask it a *different* question than Stage 1 did, per this project's own evidence-ledger discipline against uncredited reuse.

---

## 11. Process decisions in effect for the rest of this redesign

- `curriculum-architect` is skipped entirely for this work — too narrow a protocol (fixed lesson-brief format) for foundational architecture. `chapter-production`/`lesson-spine-authoring` are unaffected; they remain the eventual drafting skills for a later step.
- Real research/labor is delegated to DeepSeek V4.1 Flash via `.claude/skills/command-code-delegation/`, run directly by Claude (not handed to the owner as copy-paste prompts, as in the very first round). Default effort: `max`, confirmed valid and now documented in that skill's own reference file.
- Nothing gets written to a real chapter, canon, or proposal file until the owner says a given part of the design has converged. This document itself is the one exception the owner explicitly asked for — a record, not an implementation.

---

## 12. Full outstanding punch-list (unordered — see §13 for a sequenced roadmap)

*Mostly resolved — see §0, which is authoritative for current status. Several items below are done; the punch-list itself is preserved as written.*

1. Finalize the naming for the three content kinds (§5).
2. Resolve the Lesson/`lessons:` naming collision created by §3's finalized hierarchy — most likely rename `prerequisite-graph.yaml`'s top-level key to `chapters:`.
3. Decide `01-binary.md`'s exact placement under the finalized hierarchy (§9) — deliberately last.
4. Write the Reading & Understanding Literacy section into `canon/thesis.md` (§7).
5. Design and build real term/glossary enforcement — content rule plus a new frontend component plus gate logic (§8).
6. Carry out the Stage 0 promotion's technical work: `stages.ts`, `sidebars.ts`, `specs/007-search-experience/spec.md`, `canon/thesis.md`'s stage table, `CLAUDE.md`, `bridge-balance-project-guide/SKILL.md` (§6).
7. Design the actual Stage 0 chapter/lesson breakdown — how the confirmed eras (binary, machine code, assembly, high-level languages, IC/microprocessor, OS/Unix, networking/Internet, the Web, software-engineering-methodology, architecture/REST, the merged command-line-toolchain era, AI-history bridge, the AI-coding-agent surge, SDE) become actual Chapters and Lessons, including whether the software-engineering-methodology era is interleaved or explicitly flagged as thematic (§10.3).
8. Implement the hierarchy's technical touch-list: `sidebars.ts`, `src/lib/chapterLocation.ts`, `DocSidebarItem/Link/index.tsx`, `DocSidebar/Desktop/index.tsx`, `generate-chapter-manifest.mjs`'s kinds, `check-chapter.mjs`, `check-frontmatter.mjs`, `check-references.mjs`, `generate-search-index.mjs`, all four ledgers (§10.1).
9. Fix `specs/001-book-foundation/contracts/content-schema.md`, independently stale (§10.1).
10. Fix `CLAUDE.md`'s stale claim that the intro sequence is still all-`placeholder`.
11. Apply the small, previously-identified wording fixes to intro-1 (A-0/Hopper overclaiming "compiler") and intro-2 (the Saltzer & Schroeder non-quote, the 403/409 bug) — held since round 1 because these chapters are being wholesale rewritten anyway.
12. Decide and file the bundled ADR — content hierarchy + content classification + the chronological/pedagogical ordering principle — offered to the owner, not yet answered.
13. Decide what happens to the live site while all of this is in progress.
14. Work outward stage by stage once Stage 0 is settled, reconsidering each already-shipped Stage 1 chapter: keep, revise, or rewrite from zero.
15. Apply the (renamed) content-kind classification chapter by chapter, as part of each chapter's own authoring/revision pass, once naming (§5) is settled.

---

## 13. Finalization roadmap — suggested sequence, for the owner's reaction

*Partly resolved — see §0 (steps 1–2 below are settled). The suggested sequence is preserved as written.*

This is a proposed order, not a decision — the owner asked to "plan the remaining things and move to finalization," and sequencing is exactly where a rigorous process pays off, so this is offered for approval before anything below actually starts.

1. **Close the two remaining naming/identity questions first**, since everything else references them: pick a content-kind naming triad (§5), and resolve the Lesson/`lessons:` collision (§12.2). Both are small, both are blocking, neither requires new research.
2. **Answer the ADR question** (§12.12) — if yes, run `/sp.adr` covering all three bundled decisions before more design work piles on top of them un-recorded.
3. **Design the actual Stage 0 chapter/lesson breakdown** (§12.7) — turn the confirmed eras into a real, named sequence of Chapters and Lessons, resolving the software-engineering-methodology contemporaneity flag (§10.3) explicitly rather than by default.
4. **Resolve `01-binary.md`'s placement** (§9) — now finally answerable, once steps 1 and 3 exist.
5. **Write the Reading & Understanding Literacy section into `canon/thesis.md`** (§12.4) — content-only, no platform work, and unblocks nothing else, so it can happen in parallel with steps 6-7.
6. **Carry out the Stage 0 promotion's technical work** (§12.6) and **the hierarchy's technical touch-list** (§12.8) together, since both touch overlapping files (`sidebars.ts`, `canon/thesis.md`, the ledgers).
7. **Design and build the term/glossary enforcement mechanism** (§12.5) — the heaviest platform lift, reasonable to schedule after the hierarchy work lands so it can enforce against the *final* structure rather than the current one.
8. **Draft Stage 0's actual content** through `chapter-production` + `lesson-spine-authoring`, now that shape, hierarchy, naming, and canon are all settled — this is where the archived research (§10) actually gets turned into prose.
9. **Work outward to Stage 1-4** (§12.14), chapter by chapter, applying the (now-named) content-kind classification as each one is touched (§12.15).
10. Housekeeping that can happen any time, with no dependencies: the `CLAUDE.md` staleness fix (§12.10), the `content-schema.md` staleness fix (§12.9), and the small intro-1/intro-2 wording fixes (§12.11) — bundle these into whichever step is convenient rather than scheduling them separately.
