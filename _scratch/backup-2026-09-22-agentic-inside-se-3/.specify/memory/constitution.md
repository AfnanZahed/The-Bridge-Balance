<!--
Sync Impact Report — v3.0.2 (PATCH: the model is chosen every time, research included; one reader in every stage)

Version change: 3.0.1 → 3.0.2 (PATCH — clarification of two principles; no principle
added, removed or redefined)
Amended 2026-09-21, on the owner's answers of that day: "yes, it covers the
research" (question K3 of the ADR-0007 migration plan) and "yes, one reader, but
make it expert. it will be beginner -> Expertise, gradually."
Governance steps: written proposal = section 4 of
`history/reports/spine-migration-2026-09-20/migration-plan.md` (K3) and
`curriculum-state/canon/course-structure.md` CS-1, CS-2 (the reader); owner
consent = the two answers above; migration plan = the ADR-0007 plan itself.

Modified principles:
  VIII. Research-and-Comparison Discipline — pass 1's "delegated to DeepSeek ...
        in the large majority of cases" now reads "usually delegated ... after the
        owner has been asked which model does it, every time". The old wording
        disagreed with `corrections.md` §19 (no default; ask every time).
        `corrections.md` §30 records the ruling.
  IX. Beginner-First Content Integrity — "The audience for Stages 3–4 is
      undecided" is replaced: there is one reader in every stage, a beginner at
      the start and an expert at the end (`corrections.md` §26;
      `course-structure.md` CS-1, CS-2). The rule for the first stages is unchanged.

Added principles: none. Added sections: none. Removed sections: none.

Templates requiring updates:
  ✅ CLAUDE.md, .claude/skills/bridge-balance-project-guide/SKILL.md,
     .claude/skills/lesson-spine-authoring/SKILL.md,
     .claude/skills/bridge-balance-project-guide/reference/chapter-production/reference/research.md,
     curriculum-state/canon/research-and-comparison.md — the same "around 95%"
     wording, corrected in the same pass.
  ✅ curriculum-state/canon/audience.md — the reader statement.
  ✅ curriculum-state/canon/corrections.md §29 and §30.

Follow-up TODOs:
  - The stage numbers in Principle IX ("Stages 0, 1 and 2") wait for the
    curriculum redesign (`course-structure.md` CS-6 and CS-10).

--- previous report, v3.0.1 (PATCH: Principle III's registry enumeration removed)

Version change: 3.0.0 → 3.0.1 (PATCH — clarification/wording refinement; no
principle added, removed or redefined)
Amended 2026-09-20, on the owner's instruction to complete the amendment
flagged by ADR-0008.

Modified principles:
  III. Co-Authored Text, Video-Second Delivery — step 3's closing clause no
       longer enumerates `MDXComponents.tsx`'s registered set. The enumeration
       existed to explain why inline Mermaid/SVG/JSX fails the build; it was
       read instead as fixing the component palette at three entries, and in
       that stronger form it propagated to `CLAUDE.md` and two skills. The rule
       itself is unchanged: a diagram ships as a static image file, never as
       inline markup in a chapter body. The registry is open and expected to
       grow (ADR-0008).

Added principles: none. Added sections: none. Removed sections: none.

Correction carried in the same pass (not a constitutional change):
  Three files asserted that the 2026-09-06 “Claude never draws” restriction was
  still untouched. It was reversed on 2026-09-16 by v2.3.0 of this document,
  which reopened structural/conceptual diagrams to Claude via a diagramming
  connector. Corrected in `history/adr/0008-chapter-component-palette-is-open.md`,
  `curriculum-state/canon/corrections.md` §21, and
  `curriculum-state/proposals/chapter-component-palette-2026-09-20.md`.
  Root cause: those three were drafted against a stale copy of `CLAUDE.md` in a
  git worktree that predates the 2026-09-16 amendment.

Templates requiring updates:
  ✅ history/adr/0008-chapter-component-palette-is-open.md — decision point 2
     corrected; an `## Amendment` section records what was wrong and why.
  ✅ curriculum-state/canon/corrections.md §21 — “what stays closed” bullet
     restated as a delivery-mechanism rule.
  ✅ curriculum-state/proposals/chapter-component-palette-2026-09-20.md — the
     constraint row restated to match.
  ✅ edu-site/src/theme/MDXComponents.tsx (comment), .claude/skills/bridge-balance-
     project-guide/SKILL.md (rules 4 and 6, and the tree comment) and
     .claude/skills/bridge-balance-project-guide/reference/chapter-production/
     SKILL.md (image section) — all described the registry as a cap. Missed in the
     first pass of this amendment and corrected the same day, after a repo-wide
     search for the enumeration.
  ✅ CLAUDE.md (line 55) and chapter-production/reference/image-prompts.md (line
     34) — both still said the registry was a fixed set. Corrected in the
     same pass. The live CLAUDE.md already carried the 2026-09-16 reopening; the
     stale copy of it lives only in the git worktree.

Follow-up TODOs:
  - None outstanding for Principle III.

--- previous report, v3.0.0 (MAJOR: Principle IX redefined; Principle VIII's
reproduction clause narrowed; Principle III's chapter-section list corrected)

Version change: 2.3.0 → 3.0.0 (MAJOR — a principle is redefined in kind)
Ratified by the project owner on 2026-09-20, in a line-by-line review of every
rule file governing content in this repository.

Modified principles:
  IX. Mixed-Audience Content Integrity → renamed **Beginner-First Content
      Integrity**. The two-reader model is WITHDRAWN. Stages 0, 1 and 2 are
      written for absolute beginners and for nobody else; the audience for
      Stages 3–4 is undecided and no rule may assume a senior reader. The
      two-minute term test becomes a ONE-minute test, and the inline gloss
      stops after a term's first two or three appearances in the book instead
      of repeating in every chapter forever. A second mandatory audit is added:
      the ten-angle beginner-experience audit.
  VIII. Research-Backed Origination — the blanket "no borrowed structure"
      clause is narrowed. A studied source's STRUCTURE, ordering, tone and
      example-shape may now be learned from and adopted; what may not be
      reproduced is its EXPRESSION (its sentences, verbatim or lightly
      reworded) and its exercises. Three owner instructions to copy a supplied
      reference's pattern were refused under the old wording.
  III. Co-Authored Text — step 2's fixed four-section chapter list
      ("outline, lecture content, worked example, check-your-understanding")
      is replaced: it described a structure the book stopped using, and two
      shipped chapters violated it silently.

Rationale: every one of these changes removes a rule that was producing cold,
dense, name-and-date-heavy prose the owner rejected across four separate
drafts. Full record and the owner's own words: curriculum-state/canon/
corrections.md §§8–17.

Follow-up: an ADR should be raised for this amendment. Not auto-created — it
requires the owner's consent per CLAUDE.md.

--- previous report, v2.3.0 (MINOR: Principle III's image/diagram step reopened to Claude) ---

Version change: 2.2.0 → 2.3.0 (MINOR — existing principle materially expanded;
no principle removed or redefined in kind, only its scope changed)

Modified principles:
  III. Co-Authored Text, Video-Second Delivery — step 3 ("Image integration")
       renamed "Image and diagram production" and reopened: diagrams may now
       be produced by Claude Code (via a diagramming connector — Eraser,
       Excalidraw, draw.io, or Mermaid rendered to a static image) as well as
       by the project owner, not by the owner alone. Delivery mechanism is
       unchanged: a static image file under edu-site/static/img/<chapter-slug>/,
       referenced by a plain markdown image — never inline Mermaid/SVG/JSX in
       the chapter body, which stays outside MDXComponents.tsx's registered
       set (Callout, StageBanner, ChapterState) and would fail the build.
       Steps 1, 2 and 4 of Principle III are unchanged.

Added principles: none.
Added sections: none.
Removed sections: none.

Rationale for the reversal: the 2026-09-06 restriction (CLAUDE.md; the
  deleted edu-site/figures/ pipeline) existed because repeated attempts at
  Claude-authored imagery did not reach a usable quality bar at the time.
  The owner decided Claude should produce diagrams again, this time via
  connector-based diagramming tools rather than hand-authored figure code —
  a genuinely different mechanism, since a connector renders legible labels
  natively while an image generator cannot. Confirmed directly 2026-09-16.

Templates requiring updates:
  ✅ CLAUDE.md — the "Claude Code writes text, not images" standing rule
     rewritten to match; the deleted-pipeline note kept as history, not as
     an active prohibition.
  ✅ .claude/skills/bridge-balance-project-guide/SKILL.md — Step 0 rule #6
     rewritten to match.
  ✅ .claude/skills/bridge-balance-project-guide/reference/chapter-production/SKILL.md
     — its own copies of the rule (frontmatter description, the dedicated
     images section, Step 5, and the anti-patterns list) rewritten to match.
  ✅ .claude/skills/bridge-balance-project-guide/reference/chapter-production/reference/image-prompts.md
     — rewritten so it covers both prompt-writing (for the owner's AI image
     generator) and connector-built diagrams (for Claude), and no longer
     states that images are the only image-adjacent output.

Follow-up TODOs:
  - None outstanding. A worked example of a Claude-produced diagram (which
    connector, what the actual output looks like integrated into a real
    chapter) has not shipped yet — worth a fast follow-up once one exists,
    to confirm the delivery mechanism holds up in practice, not just on paper.

Previous Sync Impact Report (v2.2.0):
  MINOR — Principles VIII and IX added. See the block below.
-->

<!--
Sync Impact Report — v2.2.0 (MINOR: Principles VIII and IX added)

Version change: 2.1.1 → 2.2.0 (MINOR — two new principles added; "New
principle/section added")

Modified principles: none renamed or redefined. Principles I–VII unchanged
in substance; no existing principle's normative text was altered.

Added principles:
  VIII. Research-and-Comparison Discipline (NON-NEGOTIABLE) — nothing is
        authored, content or platform, before (1) standards research into
        how the strongest sources actually do this and why, and (2) the
        project owner's own comparative study, which blocks drafting and is
        not substitutable by Claude Code's own research. Findings are
        transformed toward Reading and Understanding Literacy, never
        reproduced from a studied source.
  IX.   Mixed-Audience Content Integrity — the two-minute term test (gloss
        and link a light term, teach a heavy term before use, hard
        zero-knowledge floor in Stages 0–2), the ten-angle comprehension
        audit plus mindmap test on every finished draft, and the humanised-
        prose rule against named machine-cadence tics.

Added sections: none new at top level; both principles are fully
  self-contained, following Principle IV's pattern rather than Principle
  VII's split into Operational Standards — no Operational Standards bullet
  was added, since neither principle needs detail beyond its own text.

Removed sections: none.

Ratification note: both principles formalize decisions the project owner
  ratified in conversation on 2026-09-15 and that were already written into
  `curriculum-state/canon/research-and-comparison.md`,
  `curriculum-state/canon/audience.md`, and the `lesson-spine-authoring` and
  `bridge-balance-project-guide` skills earlier the same day. This amendment
  is the formal ratification of already-implemented behavior, not new
  behavior — no downstream artifact needed to change to comply.

Templates requiring updates:
  ✅ .specify/templates/plan-template.md — Constitution Check gate reads
     "[Gates determined based on constitution file]"; generic by design, no
     change required (consistent with the v2.1.0 report's finding).
  ✅ .specify/templates/spec-template.md — no principle-numbered references;
     no change required.
  ✅ .specify/templates/tasks-template.md — no principle-numbered
     references; no change required.
  ✅ .claude/commands/sp.*.md — generic guidance; no change required.
  ✅ CLAUDE.md — cross-referenced: the "Nothing is written from a blank
     page" standing rule now cites (Constitution Principle VIII); the "Two
     readers, one document" bullet's five consequences now cites
     (Constitution Principle IX).

Affected downstream artifacts (already compliant; cited as this amendment's
authoritative detail per principle, not modified by it):
  ✅ curriculum-state/canon/research-and-comparison.md — Principle VIII.
  ✅ curriculum-state/canon/audience.md — Principle IX, term-test half.
  ✅ curriculum-state/canon/thesis.md — Reading and Understanding Literacy,
     cited by Principle VIII's transformation clause.
  ✅ .claude/skills/lesson-spine-authoring/reference/mixed-audience.md §4,
     reference/comprehension-audit.md, reference/language-register.md §6 —
     Principle IX's three disciplines.
  ✅ .claude/skills/lesson-spine-authoring/SKILL.md — fourth and fifth hard
     constraints already wire both principles into the authoring workflow.
  ✅ .claude/skills/bridge-balance-project-guide/SKILL.md and
     reference/chapter-production/{SKILL.md,reference/research.md} —
     Step 0 / Step 1 stop conditions already wire Principle VIII.

Follow-up TODOs:
  - None outstanding from this amendment. Note for future amendments:
    `curriculum-state/canon/integrity-floor.md` is cited inside Principle
    VIII as an override and is itself load-bearing project canon, but it is
    not yet a ratified constitutional principle in its own right — the
    owner named four specific decisions for this amendment and the
    integrity floor was not among them, so it stays a cited canon file
    rather than being promoted here.

Previous Sync Impact Report (v2.1.1):
  PATCH — Principle VII accent reconciliation. See the block below.
-->

<!--
Sync Impact Report — v2.1.1 (PATCH: Principle VII accent reconciliation)

Version change: 2.1.0 → 2.1.1 (PATCH — clarification/wording refinement; no
principle added, removed, or redefined)

Modified principles:
  VII. Apple-Design Purity — concrete-embodiment "Palette" bullet updated:
       "the bridge-cyan --tbb-accent" → "Apple-system blue --tbb-accent,
       #0071e3 light / #0a84ff dark". The normative rule ("one focused accent
       per surface") is unchanged; only the snapshot token name is corrected
       to match the clarified spec (002-apple-design FR-002) and research R-002.

Added sections: none. Removed sections: none.

Affected downstream artifacts (must reflect Apple-blue as the canonical accent):
  ✅ specs/002-apple-design/spec.md — FR-002 already mandates Apple-system blue.
  ✅ specs/002-apple-design/research.md — R-002 already documents #0071e3/#0a84ff.
  ✅ specs/002-apple-design/tasks.md — T005 already lands the Apple-blue tokens.
  ✅ specs/002-apple-design/contracts/design-system.md — Token Scope already
     names "--tbb-accent* | Apple-system blue + variants".

Follow-up TODOs:
  - None. The /sp.analyze finding C-1 (stale bridge-cyan parenthetical) is now
    resolved in the constitution itself.

Previous Sync Impact Report (v2.1.0):
  MINOR — Principle VII added (Apple-Design Purity). See the block below.
-->

<!--
Sync Impact Report — v2.1.0 (MINOR: Principle VII added)

Version change: 2.0.0 → 2.1.0 (MINOR — new principle added; "New principle/section added")

Modified principles:
  none renamed. Principle III (Co-Authored Text, Video-Second Delivery) untouched.

Added principles:
  VII. Apple-Design Purity — the platform's visual identity models Apple's design
       language: generous negative space, glass-layer translucency, floating
       surfaces with soft elevation, restrained monochrome-neutral palette, one
       focused accent per surface, seamless light/dark. Must be achievable on
       the free tier (system/interchangeable fonts, CSS-native effects, no paid
       icon/font licensing).

Added sections: none new at top level; Principle VII carries a "Rationale" and
  a "Concrete embodiment" sub-bullet. Operational Standards gains a "Design
  fidelity" bullet group describing the mandatory audit before each phase ship.

Removed sections: none.

Templates requiring updates:
  ✅ .specify/templates/plan-template.md — Constitution Check gate is generic;
     no change required, but future plans MUST include a "Design fidelity" line.
  ✅ .specify/templates/spec-template.md — success criteria template stays
     technology-agnostic; no change required.
  ✅ .specify/templates/tasks-template.md — generic; no change required.
  ✅ .specify/templates/phr-template.prompt.md — supports required frontmatter; no change.
  ✅ .claude/commands/sp.* — generic guidance; no change required.

Affected downstream artifacts (must reflect v2.1.0):
  ⚠ edu-site/src/css/radix.css + custom.css — currently Inter / Instrument Serif /
     Geist Mono and phase-appropriate surfaces; verify each surface approaches
     the Apple-Design baseline (per Principle VII). Follow-up: cross-check
     `--tbb-surface` translucency, elevation tokens, and focus-visible states.
  ⚠ spec 001-book-foundation — refreshed this session; already reflects the
     shipped design system. No structural change needed for Principle VII.

Follow-up TODOs:
  - A design-fidelity audit checklist (light/dark contrast, blur fallback,
    reduced-motion, focus rings) SHOULD be drafted before Phase B ships and
    referenced by the Phase B spec.
  - SF Pro / New York typefaces are proprietary; the FAITHFUL free substitutes
    (Inter for SF Pro, Instrument Serif as display accent) are ratified in
    stack.md. If Apple's actual SF Pro asset is ever licensed, an ADR is required.

Previous Sync Impact Report (v2.0.0):
  MAJOR — Principle III redefined (Lecture-First, Text-Second → Co-Authored
  Text, Video-Second). See history/adr/0002-text-first-video-second-workflow.md.
-->

# The Bridge Balance Constitution

> Project principles for **The Bridge Balance** — a student-oriented learning platform for spec-driven AI agent engineering.

## Core Principles

### I. Free-Tier by Default

Every component of the platform MUST run on a free tier until measurable usage justifies a paid tier. The decision to leave a free tier requires evidence — paying-customer count, traffic, or a documented operational need — recorded in an ADR.

- **Applies to:** LLM providers, database (Neon), vector search (Qdrant Cloud), object storage (Cloudflare R2), email (Resend), background jobs (Inngest), hosting (GitHub Pages or Vercel), auth (better-auth self-hosted).
- **Rationale:** the platform is built by and for students; cost must scale with paying users, not with the platform owner's wallet.
- **Counter-evidence required:** a usage metric (active users, paying customers, GB stored, etc.) that crosses the free tier ceiling.

### II. Pluggable Provider Abstraction (no vendor lock-in)

Every external service MUST be accessed through a thin interface owned by this codebase. Provider SDKs are imported lazily inside the implementation module — the app never requires an SDK it isn't actively using.

- **Concrete embodiment:** `app/llm/LLMClient` (see `edu-site/api/app/llm/base.py`). Adding a new LLM provider is a config change, not a code change to callers.
- **OpenAI is gated.** `LLM_PROVIDER=openai` is supported but explicitly last-resort. See ADR-0001 for the preference order.
- **Rationale:** if a free tier throttles, a vendor raises prices, or a model is deprecated, the platform switches providers in hours, not weeks.

### III. Co-Authored Text, Video-Second Delivery (formerly "Lecture-First, Text-Second Delivery")

The textbook content is **co-authored** by the project owner and Claude Code, in this order, for each chapter:

1. **Co-research** — the project owner and Claude Code jointly research the topic and sub-topics. Inputs include the platform spec, prior chapters, and any external references the project owner provides.
2. **Text writing** — Claude Code writes the chapter's text into its MDX file. The chapter becomes `text-ready` once it is a complete, continuous read: an opening that welcomes the reader and shows what is coming and why, the teaching itself, and a close that hands the reader forwards. *(Amended 2026-09-20. This step used to require four fixed sections — "outline, lecture content, worked example, check-your-understanding" — a structure the book stopped using, which two shipped chapters violated while every check reported clean. A chapter's shape is decided by `lesson-spine-authoring`; a worked example a beginner can picture is required by `canon/corrections.md`, and a retrieval prompt by the spine's Station 10 — but not as a fixed heading list.)*
3. **Image and diagram production** — diagrams and explanatory visuals are produced either by the project owner (photos, screen captures, AI-generated images) or by Claude Code (structural/conceptual diagrams, built via a diagramming connector — Eraser, Excalidraw, draw.io, or Mermaid rendered to a static image), saved under `edu-site/static/img/<chapter-slug>/`, and integrated into the MDX with alt text. A diagram is delivered as a static image file referenced by a plain markdown image — never as inline Mermaid/SVG/JSX in the chapter body. *(Amended 2026-09-20, v3.0.1. This clause used to end “which stays outside `MDXComponents.tsx`'s registered set (`Callout`, `StageBanner`, `ChapterState`) and would fail the build”. That enumeration was written to explain why inline markup fails, but it was read as fixing the component registry at three entries, and it reached `CLAUDE.md` and the skills in that stronger form. It never decided that. `MDXComponents.tsx` is a **registry, not a cap**, and it is expected to grow. What this step rules out is a drawing delivered as inline markup in a chapter body — whatever the registry happens to contain at the time. See [ADR-0008](../../history/adr/0008-chapter-component-palette-is-open.md).)*
4. **Video recording** — the project owner records the video lecture against the now-complete text and adds the video URL to the chapter. The chapter becomes `video-published`.

A chapter has one of three explicit states visible to the reader:

- `placeholder` — no text yet.
- `text-ready` — text + images present, no video yet; the chapter explicitly says "video lecture coming soon."
- `video-published` — text + images + video link present.

A chapter that ships `text-ready` is **not** incomplete; it is the textbook's primary authored artifact. The video is the recorded companion that arrives afterward.

- **Rationale:** the project owner's role is video presenter and image producer; Claude Code's role is content author (text lectures). Inverting this would force the project owner to record every video before any text could be written, which discards the value Claude Code provides. See ADR-0002 for the full decision record.
- **Constitutional note:** Claude Code is a *content author*, not just a documentation formatter. The textbook's prose, accuracy, and structure are Claude Code's responsibility within the co-authoring loop.

### IV. Spec-Driven Development (NON-NEGOTIABLE)

Every feature MUST follow the lifecycle: **spec → plan → tasks → implement**. Every meaningful exchange with the AI MUST be recorded as a Prompt History Record (PHR). Every architecturally significant decision MUST be documented as an ADR after user consent.

- **Spec** lives at `specs/<NNN-feature>/spec.md` and is the source of truth for scope.
- **Plan** lives at `specs/<NNN-feature>/plan.md` and may evolve, but never contradicts the spec.
- **Tasks** at `specs/<NNN-feature>/tasks.md` are ordered, testable, and dependency-aware.
- **PHRs** at `history/prompts/<feature-or-general>/` capture every user input verbatim.
- **ADRs** at `history/adr/` are written after user consent; never auto-created.
- **Rationale:** the project's primary author is an AI assistant acting on user intent. Without these artifacts, intent is lost between sessions.

### V. Smallest Viable Change

Every change MUST be the smallest diff that delivers value. No unrelated edits, no invented APIs, no premature abstraction.

- **Prefer:** a small commit that ships one user story, with one task's worth of code, tested.
- **Avoid:** drive-by refactors, speculative generality, "while I'm here" cleanups in unrelated files.
- **When uncertain:** clarify with the user before implementing (per CLAUDE.md Human-as-Tool strategy).
- **Rationale:** smaller diffs are easier to review, easier to revert, and force the project to grow on demand rather than on conjecture.

### VI. Free, Open Curriculum

The textbook is **100% free** for students. There is no paywall on content, no premium chapter, no email-gated download. The only paid surfaces are the digital products in the catalog (Claude Code sub-agents, skills, MCP servers, plugins) — the curriculum itself stays free forever.

- **International proof:** CS50P + CS50W, two Harvard certificates, are the credentialed bridge from skill to résumé.
- **Rationale:** the audience is students. Charging for content excludes the audience; the business model is the product catalog, not the curriculum.

### VII. Apple-Design Purity (guided visual identity)

The platform's visual identity models **Apple's design language** at the level the free tier allows: calm, uncluttered surfaces; generous negative space; floating layered panels with soft elevation; glass-layer translucency; a restrained monochrome-neutral palette with one focused accent per surface; and a seamless light/dark experience. The product is the hero; chrome, borders, and decorative noise recede.

- **Concrete embodiment (the "Apple move," free-tier-compatible):**
  - **Type.** Inter (the freely-licensed stand-in for SF Pro) for UI and reading text; Instrument Serif as the display accent; Geist Mono for code. No proprietary font assets may be hot-linked or bundled unless licensed.
  - **Layering.** Content sits on floating surfaces separated from background by blur + elevation — `backdrop-filter: blur()` with a solid fallback for browsers/OSes without blur support. No flat-on-flat edges.
  - **Palette.** Radix neutral scales for text/surfaces; a single semantic accent per surface (currently Apple-system blue `--tbb-accent`, `#0071e3` light / `#0a84ff` dark); never more than two saturated hues per viewport.
  - **Elevation.** Depth via luminance-differentiated surfaces and soft shadows (Open Props `--op-shadow-*`), not hard borders. Gridlines and hairlines exist only where data or alignment demands them.
  - **Light + dark.** Both modes MUST be first-class: each surface, text tint, and shadow has a defined dark-mode token. No mode defaults to a different visual language.
  - **Motion.** Reticent: scroll-linked reveals and scrub effects (Lenis, GSAP, Framer Motion, R3F) MUST collapse to zero under `prefers-reduced-motion` and MUST never cross the readability threshold (no parallax under text, no full-screen animation).
  - **Detail density.** One telling detail per surface — a soft shadow, a subtle grain, a slow gradient — never all of them together. When in doubt, remove.
- **Free-tier constraint:** Apple's SF Pro / New York typefaces and certain stock assets are proprietary. The constitution mandates the *system* (fonts, layering, restraint) — faithful free substitutes stand in, and a licensed Apple asset requires an ADR.
- **Rationale:** the audience pays $0 and spends their attention generously. An Apple-grade surface signals craft, earns trust, and lets the curriculum's density feel effortless rather than overwhelming. Design is cheap in infrastructure and expensive in goodwill — invest the craft, not the cash.

### VIII. Research-and-Comparison Discipline (NON-NEGOTIABLE)

Nothing is authored from memory or instinct — no lesson, chapter, heading, platform feature, setting, or button — before two research passes complete, for the content track and the platform track alike:

1. **Standards research.** How the strongest sources in the world actually teach or build this, and the reasoning underneath that choice — not only what is true about the topic. Usually delegated to DeepSeek v4.1 Flash via Command Code (the `command-code-delegation` skill), after the owner has been asked which model does it, every time; Claude Code decides what to ask and verifies what comes back from the actual tool trace, never a one-line summary.
2. **The project owner's own comparative study.** For content work, the owner personally works through multiple real courses or platforms on the topic and hands over their own learnings and the specific points they want carried in. This is a **blocking input** — drafting MUST NOT begin until it is supplied, and Claude Code's own research is not a substitute for it.

Findings from both passes are never averaged into a synthesis of what already exists elsewhere; they are read for what every studied source **missed**, and that gap is what the new chapter or feature has to address.

What both passes produce is then **learned from completely, and taken further.** External sources typically teach a learner to write the thing; this curriculum teaches a reader to **read it and judge it** — Reading and Understanding Literacy, per `curriculum-state/canon/thesis.md`.

**What may be learned and adopted:** a source's structure, its ordering, its tone, the kind of example it reaches for, its interface decisions, what it assumes, where it loses a reader, and what it left out. All of it. Where the project owner supplies a reference and asks for its pattern to be used, **use its pattern.**

**What may never be reproduced:** a source's **expression** — its sentences, verbatim or lightly reworded — and its exercises, problem sets and assessment items, whether the source is free or paid. A structure is not expression and a pattern is not a paragraph. A specific framing genuinely owed to a named source is attributed where naming it helps the reader.

*(Amended 2026-09-20. This clause used to read "no verbatim text, reworded paragraph, borrowed structure, or lifted example or exercise survives from a studied source." Because this document supersedes everything else in the repo, that wording defeated three explicit owner instructions to copy a supplied reference's structure — no lower-tier fix could have worked. `canon/corrections.md` §15.)*

- **Platform scope.** A new page, feature, setting, or button undergoes the same two passes: established interface and accessibility conventions stand in for "international standard," and the owner's own comparison against real products is still the blocking second pass. Adopt the reasoning a strong product embodies, never its exact pixels.
- **Overridden by the Stage 2 integrity floor** (`curriculum-state/canon/integrity-floor.md`) wherever CS50P/CS50W material is the source under study — that floor is checked first, and nothing in this principle licenses working around it.
- **Rationale:** a lesson or a feature built from unverified instinct reproduces whatever its author already happened to believe, correct or not. Two independent passes — verified external practice, and the owner's own comparative judgment — are what the platform trusts instead. The owner's pass is named the more important of the two because it is the harder half to fake or automate away.
- **Authoritative detail:** `curriculum-state/canon/research-and-comparison.md`.

### IX. Beginner-First Content Integrity

*(Renamed and redefined 2026-09-20, from "Mixed-Audience Content Integrity".)*

**Stages 0, 1 and 2 are written for absolute beginners and for nobody else** — a reader who has never programmed, does not know what Python is, and may not be sure what a terminal is for. **There is one reader in every stage: a beginner when they start, an expert when they finish** (`curriculum-state/canon/course-structure.md` CS-1 and CS-2, decided 2026-09-21). **No rule, draft or review may assume a separate senior reader is present.**

The two-reader model this principle used to state — *"every chapter is read by a senior engineer and by a reader who has never programmed, in the same document"* — is **withdrawn**, along with every rule built on it, because each of those rules made a warm, gentle or reassuring sentence count as waste. `curriculum-state/canon/corrections.md` §8 carries the record.

Five disciplines make beginner-first real, and each is checked, not assumed:

- **The one-minute term test.** Before sorting a term, ask whether the lesson needs it at all: in Stages 0–2 a hard word MUST earn its place, and if the idea works without it, it goes. Every surviving term MUST be sorted before it reaches a draft. A term a beginner can hold within **one minute** is explained inline at first use in twelve words or fewer and marked as a glossary link (`[*term*](/glossary#slug)`, italic, never code-formatted) — and that inline explanation runs for roughly the term's **first two or three appearances in the book, then stops**, leaving the link alone. A term that needs longer MUST NOT be glossed at all; it MUST be cut, or taught in full before its first use. Stages 0–2 hold a **hard, zero-knowledge floor**. The glossary carries exactly one entry per term for the whole book.
- **Plain vocabulary, unchanged truth.** Sentences AND vocabulary are simplified; accuracy never is. Where a plain word is equally true, the plain word MUST be used. Vagueness is equally a failure — the target is the plain, true, specific middle. **Every sentence MUST make sense on the first read**, and this outranks specificity, concision and elegance.
- **Warmth, everywhere.** Every chapter MUST open by welcoming the reader, linking back, and saying what it covers **and why it matters**. Warmth is the house register in every stage and every position, not a front-door permission, and the register MAY get gentler where the material gets harder.
- **The comprehension audit.** Every finished draft MUST be swept by ten distinct comprehension angles, one angle at a time across the whole draft, before it is presented — closing with a mindmap test: whether the chapter's shape can be redrawn from memory after a single read. A sweep returning zero findings on a first draft is treated as unrun, not as clean.
- **The beginner-experience audit.** Every Stage 0–2 draft MUST additionally be swept by the ten beginner angles in `lesson-spine-authoring/reference/beginner-experience-audit.md` — ease, speed, welcome, why-before-what, dignity, something to picture, continuity, the page itself, payoff, and retention. The comprehension audit asks whether a reader would *understand*; this one asks whether they would *stay*. Two drafts passed the first and were rejected on sight.
- **Humanised prose.** Every sentence MUST read as though a specific person wrote it for this reader, on this page. Named machine-cadence tics — the dramatic fragment, the false pivot, the answered rhetorical question, the triad, the over-used em-dash aside, the portentous closer, signposting, the riddle opening, stacked metaphor, flat symmetry — are checked for by name and removed, and the finished draft is read aloud before it ships.

- **Rationale:** a chapter can be gate-clean, ledger-correct, and voice-compliant by the letter and still fail an actual reader — four drafts of this book have now done exactly that. Mechanical compliance, real comprehension, and a reader actually wanting to keep reading are three different properties, and each needs its own verification step.
- **Authoritative detail:** `.claude/skills/lesson-spine-authoring/reference/mixed-audience.md` §4, `reference/comprehension-audit.md`, and `reference/language-register.md` §6; canon statement in `curriculum-state/canon/audience.md`.

## Stack Constraints

The technology stack is the source of truth in `stack.md`. Any addition to the stack MUST be added there first and justified in an ADR.

- **Free-tier ceiling:** see the table in `stack.md`. Each component has a free tier and a documented "when you start paying" threshold.
- **Do-not-add list:** the explicit rejections in `stack.md` (e.g., no Next.js storefront, no Supabase, no Tailwind + shadcn, no Prisma) are normative. Adding any of these requires an ADR that explains why the rejection is no longer valid.
- **Phase discipline:** components belonging to later phases (Stripe, R2, Resend, Inngest) are NOT enabled until that phase is in scope. The Phase A backend boots with no credentials set.

## Operational Standards

- **Configuration:** all runtime config MUST flow through `app/config.py` (Pydantic Settings). No environment reads in business code. No hardcoded URLs, model names, or thresholds.
- **Secrets:** never committed. `.env` is gitignored. `.env.example` documents every variable and its phase.
- **Logging:** structured (JSON or key=value), request-id correlated where applicable. Free-form `print()` calls MUST be replaced before Phase B ships.
- **Errors:** named, typed, and mapped to HTTP status codes at the router boundary. No raw stack traces to the client in production.
- **Health:** `/health` is liveness (always cheap); `/health/ready` checks downstream services. Phase A: only LLM credential presence. Phase B: adds DB + Qdrant.
- **Dependency upgrades:** tracked in `pyproject.toml` / `package.json` with caret-or-tilde bounds; lockfiles are committed.
- **Design fidelity (per Principle VII):** before each phase ships, an audit MUST verify (a) blur has a non-blur fallback, (b) light/dark both render every surface with defined tokens, (c) `prefers-reduced-motion: reduce` collapses all decorative motion, (d) focus-visible states are visible on every interactive element, (e) no hard borders replace missing elevation.

## Security & Privacy

- **No secrets in code, comments, or commit messages.** Use the env-var contract documented in `.env.example`.
- **No PII in logs.** Student identifiers are pseudonymized where correlation is needed.
- **Auth boundary:** better-auth.com (Phase B). Routes that mutate user state MUST verify the session. Routes that expose student data MUST check ownership.
- **Input validation:** at the edge (Pydantic / FastAPI for backend; Docusaurus / React for frontend). Never trust the input deep in the call stack.
- **Dependency supply chain:** lockfiles committed; CI (when added) runs `pip audit` and `npm audit` on each PR.

## Development Workflow

- **Authoring agent:** Claude Code CLI; Spec-Kit Plus slash commands (`/sp.*`).
- **Version control:** None in the working process. The project is a single working copy of files — no branches, no pull requests, no worktrees. Spec-Kit Plus discipline (spec → plan → tasks → implement) provides the structure instead.
- **Commits:** atomic, named, reviewable. Commit messages reference the spec or task they implement.
- **Reviews:** code reviews check (a) alignment with the spec, (b) test coverage, (c) free-tier compliance, (d) no invented APIs, (e) Apple-Design fidelity per Principle VII.
- **Quality gates:** the textbook MUST build (`npm run build`) and the backend MUST pass `pytest -q` before any phase ships.

## Governance

- **Supersedes:** this constitution supersedes all other practices in the repo. When in conflict, this document wins.
- **Amendments:** require a written proposal, user consent, and a migration plan if existing code is affected. Amendments are recorded as new versions of this file.
- **Versioning:**
  - **MAJOR** — backward-incompatible governance change, principle removal, or principle redefinition.
  - **MINOR** — new principle added or existing principle materially expanded.
  - **PATCH** — clarification, wording fix, non-semantic refinement.
- **Compliance review:** every PR MUST verify alignment with the principles in this constitution. A change that violates a principle MUST either (a) be amended to comply, or (b) trigger an ADR that amends the constitution.
- **Runtime guidance:** `CLAUDE.md` carries the agent's execution contract; `stack.md` carries the stack reference; `history/adr/` carries the architectural decision log.

**Version**: 3.0.2 | **Ratified**: 2026-08-17 | **Last Amended**: 2026-09-21