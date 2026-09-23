# Job 5 — Inventory of stale stage references (read-only)

Date: 2026-09-22. Scope: live repository `C:/Users/Dell/Desktop/Book`.
This file is the only thing this job created. Nothing else was changed. `.claude/worktrees/` was never read.
No git commands were run. This revision was re-verified line by line against the live tree; line numbers and quotes below were re-read directly from each file.

## What changed (the target structure)

- Oldest: five stages — 0 introduction; 1 Spec-Aware Vibe Engineering Foundations; 2 CS50 Certification; 3 Mastering AI Coding Agents; 4 Engineering Autonomous AI Agents.
- Superseded earlier today: four stages — 0 Introduction to SDE; 1 SDE Mastery (AI-Driven); 2 Credentials; 3 SDE Mastery (AI-Native; Agentic AI).
- **Final:** Stage 0 Introduction to SDE; Stage 1 SDE Mastery (AI-Driven); Stage 2 SDE Mastery (AI-Native). **No Stage 3 and no Stage 4 exist.** Credentials (CS50P, CS50W, future third-party credentials) is **not a stage** — a parallel track, disabled for now. Agentic AI is taught inside SE across Stages 1 and 2, never as its own stage.
- The CS50 integrity floor stays absolute. Only its **"Stage 2" label** is stale: it belongs to the Credentials track.

A hit is *stale* when it states the five- or four-stage structure, treats CS50 or Credentials as a stage, treats Agentic AI as its own stage, or names a Stage 3 or Stage 4.
`OWNER DECISION` replaces a fix when the hit is (1) about which stages the zero-knowledge floor names, (2) a promise to readers of CS50/Harvard credentials, or (3) wording not derivable from "What changed".

Exclusions applied: `node_modules`, `build`, `.docusaurus`, `.git`, `_scratch/backup-*`, `_scratch/job-briefs/`, `specs/011-curriculum-redesign/`; and the three files another job is editing — `curriculum-state/canon/course-structure.md`, `thesis.md`, `naming.md`.

Not-stale false positives seen and skipped throughout: the "four-stage loop" of Spec-Driven Engineering (specify → design → implement → verify) in `intro-5`, `contracts/calibration.md` and `concept-ledger.yaml:1195`; API/auth "credentials" (`edu-site/api/README.md`, `.claude/commands/sp.reverse-engineer.md:839`, `.agents/skills/mmx-cli`, `.commandcode/taste/`); the Panaversity "AI Assisted → AI Driven → AI Native" maturity spectrum in `research/stage-0/cluster-5`; "Harvard Mark II" moth references in the etymology bank; the owner's verbatim quotes about "stage 4 and 5" in `corrections.md` §8 and `voice.md` history; `stage === 1` / `Stage 1` references, which are still correct.

## Hit counts at a glance

| Category | Files with hits | Hit lines |
|---|---|---|
| A — agent-instruction and project docs | 21 | 108 |
| B — curriculum-state (minus the three skipped files, ledgers, proposals) | 8 | 23 |
| C — site code, config, ledgers | 16 | 131 (≈35 are in generated files) |
| D — docs folders | 4 | folder-level findings, below |
| E — reader-facing pages and homepage copy | 15 | 77 |
| F — historical records (counts per folder only) | 124 | 492 |

---

## A. Agent-instruction and project docs

### `CLAUDE.md` (7)
- `CLAUDE.md:22 | "a free, five-stage curriculum … anchored by two real Harvard credentials (CS50P + CS50W) earned partway through" | "a free, three-stage curriculum (Stage 0–Stage 2)"; the Harvard-credentials claim is OWNER DECISION (2)`
- `CLAUDE.md:51 | "§8, Stages 0–2 are written for absolute beginners and nobody else" | OWNER DECISION (1) — which stages the zero-knowledge floor names`
- `CLAUDE.md:55 | "The official curriculum fixes five stages and nothing below that" | "The official curriculum fixes three stages (Stage 0 through Stage 2) and nothing below that"`
- `CLAUDE.md:57 | "**The Stage 2 integrity floor is absolute.**" | "The Credentials-track (CS50) integrity floor is absolute."`
- `CLAUDE.md:62 | "Stages 0, 1 and 2 are written for absolute beginners — and for nobody else." | OWNER DECISION (1)`
- `CLAUDE.md:65 | "in Stages 0–2, if the idea works without it, it goes" | OWNER DECISION (1)`
- `CLAUDE.md:77 | "Real stage folders today: `edu-site/docs/stage-01-spec-aware-vibe-engineering/`, `stage-02-cs50-certification/` …" | rewrite to the live folders (`stage-01-sde-mastery-ai-driven/`, `stage-02-credentials/` as the disabled track, the AI-Native folder pending renumber), and to the ledger's real statuses`
- Borderline (not counted): `CLAUDE.md:52` still calls the redesign "now under way" and "the old Stages 1 and 3 merge" — true as history, but the "do not treat the stage list in this file as final" clause is superseded.

### `PROJECT-MAP.md` (8)
- `PROJECT-MAP.md:51 | "Core thesis, the five-stage table, the six invariants" | "the stage table"`
- `PROJECT-MAP.md:52 | "Stages 0–2 are absolute beginners only" | OWNER DECISION (1)`
- `PROJECT-MAP.md:56 | "Any Stage 2 work, even structural planning" | "Any Credentials-track work"`
- `PROJECT-MAP.md:97 | "stages.ts (the five stage labels + routes, shared by the drawer)" | "the stage labels + routes"`
- `PROJECT-MAP.md:115 | "`stage-01-spec-aware-vibe-engineering/` — index + 6 chapters, all `placeholder`" | current folder `stage-01-sde-mastery-ai-driven/` (index + 10 chapters)`
- `PROJECT-MAP.md:116 | "`stage-02-cs50-certification/` — index + 2 placeholder shells: cs50p, cs50w." | Credentials is a parallel track (disabled), not a stage; folder now `stage-02-credentials/``
- `PROJECT-MAP.md:117 | "`stage-03-mastering-ai-coding-agents/` — index + 4 placeholder shells" | no Stage 3 exists; those chapters merged into Stage 1 (AI-Driven)`
- `PROJECT-MAP.md:118 | "`stage-04-engineering-autonomous-ai-agents/` — index + 3 placeholder shells" | no Stage 4 exists; this content is the AI-Native stage, now Stage 2`

### `stack.md` (1)
- `stack.md:9 | "5-stage curriculum, product catalog pages" | "3-stage curriculum, product catalog pages"`

### `.specify/memory/constitution.md` (10)
- `:20 | "IX. Beginner-First Content Integrity — "The audience for Stages 3–4 is" | amendment-report history: annotate as superseded (no Stage 3/4 exists); OWNER DECISION (1) for the floor wording`
- `:37 | "The stage numbers in Principle IX ("Stages 0, 1 and 2") wait for the" | the redesign has landed: the stage numbers are final (0–2); close this TODO`
- `:99 | "The two-reader model is WITHDRAWN. Stages 0, 1 and 2 are" | OWNER DECISION (1); it is a dated v3.0.0 report entry, so also mark it as history`
- `:101 | "Stages 3–4 is undecided and no rule may assume a senior reader." | must not name Stages 3–4; the undecided-audience statement is superseded (one reader in every stage)`
- `:197 | "zero-knowledge floor in Stages 0–2" | OWNER DECISION (1)`
- `:406 | "CS50P + CS50W, two Harvard certificates, are the credentialed bridge from skill to résumé." | OWNER DECISION (2)`
- `:442 | "Overridden by the Stage 2 integrity floor" | "Overridden by the Credentials-track integrity floor"`
- `:450 | "Stages 0, 1 and 2 are written for absolute beginners and for nobody else" | OWNER DECISION (1)`
- `:456 | "in Stages 0–2 a hard word MUST earn its place … Stages 0–2 hold a hard, zero-knowledge floor" | OWNER DECISION (1)`
- `:460 | "Every Stage 0–2 draft MUST additionally be swept by the ten beginner angles" | OWNER DECISION (1)`
- Checked and NOT stale: `:251` ("integrity floor was not among them, so it stays a cited canon file") names no stage.

### `.claude/skills/bridge-balance-project-guide/SKILL.md` (8)
- `:3 (frontmatter description) | ""we need a Stage 3 chapter about Y" … "the audience rule — Stages 0–2 are written for absolute beginners and nobody else"" | drop/replace the Stage 3 trigger example; the floor phrase is OWNER DECISION (1)`
- `:8 | "a free, five-stage curriculum … anchored by two real Harvard credentials (CS50P + CS50W) earned partway through" | three stages; credentials claim OWNER DECISION (2)`
- `:33 | "The curriculum fixes five stages, 0 through 4, and nothing below that" | "three stages, 0 through 2"`
- `:34 | "**The Stage 2 integrity floor is absolute.**" | "The Credentials-track integrity floor is absolute."`
- `:39 | "Stages 3–4 have the same reader, further along the road" | remove — no Stage 3/4 exists`
- `:56 | "§8, Stages 0–2 are beginner-only" | OWNER DECISION (1)`
- `:85 | "Most Stage 1–4 subtopics already do." | "Most Stage 1–2 subtopics"`
- `:139 | "will actually stay — Stages 0–2, required" | OWNER DECISION (1)`
- Checked and NOT stale: `:76` ("help me plan Stage 2,") — a trigger example; Stage 2 now means AI-Native, so it still reads correctly. `:146` "The four protocols" is a skill count, not stages.

### `.../reference/project-map.md` (8) — the skill's duplicate of the root map
- `:49 | "Core thesis, the five-stage table" | "the stage table"`
- `:50 | "Stages 0–2 are absolute beginners only" | OWNER DECISION (1)`
- `:53 | "Any Stage 2 work, even structural planning" | "Any Credentials-track work"`
- `:94 | "stages.ts (the five stage labels + routes, shared by the drawer)" | "the stage labels + routes"`
- `:112 | "`stage-01-spec-aware-vibe-engineering/` — index + 6 chapters" | `stage-01-sde-mastery-ai-driven/` — index + 10 chapters`
- `:113 | "`stage-02-cs50-certification/` — index + 2 placeholder shells: cs50p, cs50w." | Credentials is a parallel track (disabled), not a stage`
- `:114 | "`stage-03-mastering-ai-coding-agents/` — index + 4 placeholder shells" | no Stage 3 exists; merged into Stage 1`
- `:115 | "`stage-04-engineering-autonomous-ai-agents/` — index + 3 placeholder shells" | no Stage 4 exists; the AI-Native stage is now Stage 2`

### `.../reference/curriculum-architect/SKILL.md` (5)
- `:15 | "the official curriculum fixes five stages, 0 through 4, and nothing below that level" | "three stages, 0 through 2"`
- `:17 | "read `curriculum-state/canon/thesis.md` for the five stages' real focus lines" | "the stages' real focus lines"`
- `:29 | "If the planning work touches Stage 2 / CS50 at all" | "the Credentials track / CS50"`
- `:51 | "A stage (0–4) and a rough position" | "A stage (0–2)"`
- `:55 | "e.g. `s3-cc` requiring `[s3-context, s1-06]`" | replace with current ids (e.g. `s1-cc` requiring `[s1-context, s1-06]`); the `s3-` id space is retired`

### `.../reference/curriculum-architect/reference/brief-format.md` (2)
- `:15 | "STAGE & POSITION:       [0-4, and a rough sequence position." | `[0-2``
- `:46 | "EVERYDAY EXAMPLE:       [REQUIRED for Stages 0-2." | OWNER DECISION (1)`

### `.../reference/chapter-production/SKILL.md` (7)
- `:60 | "`curriculum-state/canon/thesis.md` — the five stages, the two extremes, the safety floor" | "the stages"`
- `:86 | "For Stage 3 and Stage 4 topics — the agent tools, multi-agent systems, RAG" | "For Stage 2 topics (AI-native/agentic)"`
- `:100 | "anything under Stage 2 / CS50" | "the Credentials track / CS50"`
- `:107 | "A stage (0–4; 0 is the book's own orientation material)" | "A stage (0–2; …)"`
- `:112 | "web search must actually work for a Stage 3 or Stage 4 topic" | "a Stage 2 topic"`
- `:135 | "in the plain Stage 0–2 wording where that applies" | OWNER DECISION (1)`
- `:139 | "or, in Stages 0–2, an explanation an absolute beginner genuinely understands afterwards" | OWNER DECISION (1)`

### `.../reference/chapter-production/reference/gate.md` (1)
- `:48 | "Years per thousand words above the Stage 0–2 threshold" | OWNER DECISION (1)`

### `.../reference/chapter-production/reference/research.md` (5)
- `:26 | "Treat memory as a hypothesis for Stage 3 and Stage 4 topics." | "Stage 2 topics"`
- `:47 | "90 days for a Stage 3/4 tool-behaviour claim" | "Stage 2"`
- `:88 | "across Stage 3's named tools … Stage 3 material" | "Stage 2 / the AI-Native stage"`
- `:106 | "Writing Stage 3/4 tool claims from memory" | "Stage 2"`
- `:129 | "Stage 3/4 tool claims verified against current search" | "Stage 2"`

### `.../reference/lesson-adversarial-review/SKILL.md` (2)
- `:84 | "Integrity floor, if this chapter touches Stage 2 or an external credential." | "the Credentials track or an external credential"`
- `:111 | "These five run on every Stage 0–2 review" | OWNER DECISION (1)`

### `.../reference/book-coherence-audit/SKILL.md` (1)
- `:67 | "the plain wording in Stages 0–2, the original in Stages 3–4? … the five-stage table" | remove Stages 3–4; "the stage table"`

### `.claude/skills/lesson-spine-authoring/SKILL.md` (12)
- `:53 | "absolute beginners in Stages 0, 1 and 2, and nobody else" | OWNER DECISION (1)`
- `:55 | "The rule, and the named list of withdrawn rules, is … "8. Stages 0–2 are written for absolute beginners"" | OWNER DECISION (1)`
- `:59 | "The requirement that every Stage 0–2 draft passes the ten-angle beginner check" | OWNER DECISION (1)`
- `:91 | "Stages 3 and 4 are written for readers who have the first three behind them" | remove — no Stage 3/4 exists`
- `:111 | "which in Stages 0–2 is making a beginner genuinely understand" | OWNER DECISION (1)`
- `:117 | "The Stage 2 integrity floor that overrides it wherever CS50 material is the source" | "The Credentials-track integrity floor"`
- `:166 | "**Scope, Stages 0–2.**" | OWNER DECISION (1)`
- `:185 | "the stage table is re-derived from the official doc's four stage sections" | "the official doc's stage sections" (three)`
- `:251 | "Required on all Stage 0–2 material" | OWNER DECISION (1)`
- `:320 | "Stage 0–2 material assumes no programming background whatsoever" | OWNER DECISION (1)`
- `:329 | "technical vocabulary simplified wherever a plain word is equally true (Stages 0–2)" | OWNER DECISION (1)`
- `:339 | "Beginner-experience audit run — all ten angles, required on Stage 0–2 material" | OWNER DECISION (1)`

### `.claude/skills/lesson-spine-authoring/reference/` (28)
`stations.md` (8):
- `:9 | "Stages 0–2 are" / :10 | "written for someone who has never programmed; Stages 3–4 have the same reader," | remove the Stages 3–4 clause; the floor phrasing is OWNER DECISION (1)`
- `:50 | "bind hardest in Stages 0–2" | OWNER DECISION (1)`
- `:52 | "the interim parenthetical for Stage 0–2 chapters" | OWNER DECISION (1)`
- `:54 | "The earlier version of this note scoped the exception to Stages 0–2" | OWNER DECISION (1)`
- `:96 | "corrections.md §"8. Stages 0–2 are written for absolute beginners"" | OWNER DECISION (1)`
- `:188 | "the interim parenthetical a Stage 0–2 chapter uses" | OWNER DECISION (1)`
- `:218 | "**Disagreements, in Stages 0–2:**" | OWNER DECISION (1)`

`mixed-audience.md` (12):
- `:10 | "Stages 0–2 are written for absolute beginners, and for nobody else". Open both" | OWNER DECISION (1)`
- `:41 | "**In Stages 0–2 a hard word must earn its place" | OWNER DECISION (1)`
- `:44 | "the engineering phrases of the Stages 3–4 safety wording are" | remove the Stages 3–4 variant`
- `:180 | "In Stages 0–2, if the idea works without it, it goes." | OWNER DECISION (1)`
- `:268 | "in Stages 0–2 it is the first one to try" | OWNER DECISION (1)`
- `:298 | "| **Stages 0, 1, 2** | **Hard** | Nothing." | OWNER DECISION (1)`
- `:299 | "| **Stages 3, 4** | **Soft** | The first three stages, plus what the reader has learned since." | delete the row — no Stage 3/4`
- `:301 | "**When two rules conflict in Stages 0–2, the beginner's side wins.**" | OWNER DECISION (1)`
- `:306 | "One unsorted term in Stage 0 costs more than ten in Stage 4" | remove/renumber (no Stage 4)`
- `:347 | "In Stages 0–2 every part is for" | OWNER DECISION (1)`
- `:381 | "Shape: Concept. Stage 3, so" | "Stage 2"`
- `:431 | "Stage 0–2 material holds the hard floor" | OWNER DECISION (1)`

`name-registers.md` (2): `:43 | "and in Stages 0–2 that is the likelier outcome" | OWNER DECISION (1)`; `:209 | "the rule is in `corrections.md`, "8. Stages 0–2 are written for absolute beginners"" | OWNER DECISION (1)`
`language-register.md` (2): `:11 | "In Stages 0, 1 and 2 they do not know what" | OWNER DECISION (1)`; `:56 | "**In Stages 0–2 a hard word must earn its place" | OWNER DECISION (1)`
`comprehension-audit.md` (2): `:11 | "every Stage 0–2 draft passes it before it is" | OWNER DECISION (1)`; `:42 | "in Stages 0–2, someone who has never programmed" | OWNER DECISION (1)`
`beginner-experience-audit.md` (1): `:3 | "Required on every Stage 0, 1 and 2 draft" | OWNER DECISION (1)`

### `edu-site/README.md` (4)
- `:26 | "stage-01-spec-aware-vibe-engineering/  # Stage 1 (6 chapters)" | current folders: `stage-01-sde-mastery-ai-driven/` (11 files)`
- `:27 | "stage-02-cs50-certification/           # Stage 2 (2 chapters)" | Credentials track (disabled), not a stage`
- `:28 | "stage-03-mastering-ai-coding-agents/   # Stage 3 (4 chapters)" | no Stage 3; merged into Stage 1`
- `:29 | "stage-04-engineering-autonomous-ai-agents/  # Stage 4 (3 chapters)" | no Stage 4; now the AI-Native Stage 2`

### `edu-site/api/README.md`
- No stale hits (only API-sense "credentials", lines 12 and 84).

---

## B. `curriculum-state/**` — apart from the three skipped files

(Dated proposals are counted in F, not listed. Ledgers are in C.)

### `curriculum-state/README.md` (1)
- `:4 | "curriculum sets five stages (0 through 4); it does not fix how many chapters each stage" | "sets three stages (0 through 2)"`

### `curriculum-state/canon/integrity-floor.md` (8)
Every "Stage 2" below means CS50 and becomes the Credentials track (not a stage). The floor itself never changes.
- `:23 | "## Known live conflict — Stage 2, CS50" | "— the Credentials track, CS50"`
- `:25 | "Stage 1 is months of work; Stage 2 is not being authored yet" | "the Credentials track is not being authored yet"`
- `:30 | "(`Official docs/curriculum_1.md`, Stage 2, for both CS50P and CS50W)" | "(the doc's Stage 2 — now the Credentials track — …)"`
- `:42 | "Authored literally, Stage 2 would coach readers into an academic honesty violation" | "the Credentials track"`
- `:47 | "**What happens when Stage 2 authoring begins.**" | "when Credentials-track authoring begins"`
- `:56 | "The stage's real thesis … *Stage 2 is where you prove the judgment Stage 1 built, without the tool." | "The Credentials track is where you prove the judgment Stage 1 built, without the tool."`
- `:60 | "Every Stage 2 body then carries an academic-honesty callout" | "Every Credentials-track body"`
- `:93 | "**In Stages 0–2, disputes mostly stay backstage.**" | OWNER DECISION (1)`
- Also `:9` "external credential" — correct, keep.

### `curriculum-state/canon/research-and-comparison.md` (1)
- `:63 | "**The Stage 2 integrity floor overrides this policy" | "The Credentials-track (CS50) integrity floor overrides this policy"`

### `curriculum-state/canon/corrections.md` (6)
- `:171 | "## 8. Stages 0–2 are written for absolute beginners, and for nobody else" | OWNER DECISION (1)`
- `:177 | (owner's verbatim quote, "about the stage 4 and 5, nothing confirmed yet") | do not edit — verbatim history; a dated note may be added if the owner wants one`
- `:189 | "**Stages 3 and 4 stay open.** … Stages 3 and 4 have the same reader, further along" | no Stage 3/4 exists; one reader in every stage (Stages 0–2); replace the open question`
- `:247 | "the register varies by reader, and Stages 0–2 have a different reader." | OWNER DECISION (1)`
- `:654 | "recorded as *"beginners only for Stages 0-2, Stages 3-4 parked"*" | historical record of the 20 Sep decision; annotate that Stages 3–4 no longer exist`
- `:660 | "**Stages 0 to 2 keep the zero-knowledge floor** (§8). **Stages 3 and 4 stay parked**" | OWNER DECISION (1) for the floor scope; the "Stages 3 and 4 parked" half must go`

### `curriculum-state/canon/audience.md` (2)
- `:15 | "Stages 0, 1 and 2 are written for absolute beginners and for nobody else." | OWNER DECISION (1)`
- `:50 | "**In Stages 0–2, a hard word or a named person must earn its place." | OWNER DECISION (1)`
- (`:54–55` "the founding brief named five readers" is about readers, not stages — not stale.)

### `curriculum-state/canon/voice.md` (1)
- `:125 | "For Stages 0–2, **teaching an absolute beginner something they genuinely" | OWNER DECISION (1)`

### `curriculum-state/contracts/calibration.md` (1)
- `:76 | "| 2.2 | Stage 3–4 architecture: many concepts with real dependency structure. | ×2.2 |" | "Stage 2 (AI-native) architecture" — no Stage 3/4`
- (`:34` "a four-stage loop" is the SDD loop — not stale.)

### `curriculum-state/research/stage-0/cluster-7-language-landscape.md` (3)
- `:22 | "that primes Stage 1's four chapters in order … and that primes Stage 2's two certifications (CS50P …; CS50W …)" | Stage 1 now has 10 chapters; CS50 is the Credentials track, not Stage 2`
- `:103 | "*This is the section that primes Stage 1's four chapters." | "…primes Stage 1's core-programming / frontend / backend / databases chapters."`
- `:107 | "you will meet again in the databases chapter and in Stage 2" | "…and in the Credentials track"`

### No hits
- `curriculum-state/stage-0-drafting-plan.md` (Stage 0/1 references are current); `curriculum-state/proposals/README.md`; `research/stage-0/cluster-3` (its "integrity floor" line is about a myth, not a stage); `cluster-5` (AI maturity spectrum); `cluster-1`, `cluster-2`, `cluster-4`, `cluster-6` (CS50/naming history only).

---

## C. Site code, config and ledgers

### `edu-site/sidebars.ts` (11)
- `:57 | 'label: "Stage 2 — Credentials",' | Credentials is not a stage — remove the category (parallel track, disabled)`
- `:59 | "customProps: { stage: 2 }," | remove the ordinal with the category`
- `:60 | 'link: { type: "doc", id: "stage-02-credentials/index" },' | OWNER DECISION on the new path (track, not a numbered stage)`
- `:62 | '"stage-02-credentials/cs50p",' | OWNER DECISION on the new path`
- `:63 | '"stage-02-credentials/cs50w",' | OWNER DECISION on the new path`
- `:68 | 'label: "Stage 3 — SDE Mastery (AI-Native; Agentic AI)",' | "Stage 2 — SDE Mastery (AI-Native)"`
- `:70 | "customProps: { stage: 3 }," | "{ stage: 2 }"`
- `:71 | 'link: { type: "doc", id: "stage-03-sde-mastery-ai-native/index" },' | "stage-02-sde-mastery-ai-native/index"`
- `:73 | '"stage-03-sde-mastery-ai-native/rag-and-tool-calling",' | "stage-02-sde-mastery-ai-native/…"`
- `:74 | '"stage-03-sde-mastery-ai-native/multi-agent-systems",' | "stage-02-sde-mastery-ai-native/…"`
- `:75 | '"stage-03-sde-mastery-ai-native/evaluations",' | "stage-02-sde-mastery-ai-native/…"`

### `edu-site/docusaurus.config.ts` (3)
- `:70 | "// (named "Four stages" — the curriculum has five, Stage 0 included) and" | "the curriculum has three stages (Stage 0, 1 and 2); Credentials is not a stage"`
- `:118 | '{ label: "Stage 2 — Credentials", to: "/stage-02-credentials/" },' | remove as a stage — Credentials is a parallel track, disabled`
- `:119 | '{ label: "Stage 3 — SDE Mastery (AI-Native; Agentic AI)", to: "/stage-03-sde-mastery-ai-native/" },' | "Stage 2 — SDE Mastery (AI-Native)" → "/stage-02-sde-mastery-ai-native/"`

### `edu-site/src/lib/stages.ts` — one of the five hard-coded stage lists (5)
- `:2 | "* The four curriculum stages — one list of labels and routes." | "The three curriculum stages"`
- `:9 | "export type StageNumber = 0 | 1 | 2 | 3;" | "= 0 | 1 | 2;"`
- `:29–31 | "number: 2, label: "Stage 2 — Credentials", to: "/stage-02-credentials/" | delete the entry — Credentials is not a stage (OWNER DECISION on the track's path)`
- `:34–36 | "number: 3, label: "Stage 3 — SDE Mastery (AI-Native)", to: "/stage-03-sde-mastery-ai-native/" | "number: 2, label: "Stage 2 — SDE Mastery (AI-Native)", to: "/stage-02-sde-mastery-ai-native/"`
- `:42 | "const match = route.match(/^\/stage-0([0-3])(?:\/|$)/);" | "/^\/stage-0([0-2])(?:\/|$)/"`

### `edu-site/src/components/stage-icons/index.tsx` (7)
- `:11 | " *   2 Credentials             → Certificate (fill)  — official recognition" | remove (not a stage)`
- `:12 | " *   3 SDE Mastery (AI-Native) → Atom (duotone)      — atomic-level skill" | "2 SDE Mastery (AI-Native)"`
- `:25 | "export type StageNumber = 0 | 1 | 2 | 3;" | "= 0 | 1 | 2;"`
- `:39 | '2: { … label: "Stage 2 — Credentials" },' | remove the Credentials entry`
- `:40 | '3: { … label: "Stage 3 — SDE Mastery (AI-Native; Agentic AI)" },' | key 2 with "Stage 2 — SDE Mastery (AI-Native)" (Stage-2 token)`
- `:50 | " * The bare stage glyph — same four Phosphor icons, no chip, no tint, no" | "same three Phosphor icons"`
- `:58–59 | "if (stage === 2) return <Certificate …/>" | Stage 2 is AI-Native → Atom; Certificate moves off the stage glyphs`

### `edu-site/src/components/SiteMenu/SiteDrawer.tsx` (1)
- `:50 | "// The four stages come from the shared list (src/lib/stages.ts) that the" | "The three stages"`

### `edu-site/src/components/Search/AppleSpotlight/index.tsx` (1)
- `:22 | " * The four shortcut circles are the four curriculum stages, from the same" | "three shortcut circles … three curriculum stages"`

### `edu-site/src/theme/DocSidebarItem/Category/index.tsx` (2)
- `:16 | " * than parsed out of the href. The four stage glyphs mirror" | "The three stage glyphs"`
- `:170–175 | "} else if (stage === 2) { glyph = <Certificate …/>; } else if (stage === 3) { …Atom… } else if (stage === 4) { …TreeStructure… }" | Stage 2 → Atom (AI-Native); delete the stage 3 and stage 4 branches`

### `edu-site/src/components/StageCard/index.tsx` (1)
- `:4 | "Numbered (01-04), muted Apple-grade accent chip" | "numbered 00–02 (three stages)"`

### `edu-site/src/data/chapterManifest.ts` — GENERATED (5); regenerate after the docs renames
- `:29–30 | '"stage-02-credentials/cs50p|cs50w": "placeholder"' | track ids (OWNER DECISION on the path)`
- `:31–33 | '"stage-03-sde-mastery-ai-native/{evaluations,multi-agent-systems,rag-and-tool-calling}"' | "stage-02-sde-mastery-ai-native/…"`

### `edu-site/static/search-index.json` — GENERATED (30 occurrences)
- 30 lines carry an old stage path or name (`stage-02-credentials/…`, `stage-03-sde-mastery-ai-native/…`, `stage-01-…` legacy titles, "Stage 3 — SDE Mastery (AI-Native; Agentic AI)", "Two Harvard certificates"). Regenerate via the site's `generate-search-index.mjs` step after the docs renames; never hand-edit.

### CSS tokens and one stale asset (11)
- `edu-site/src/css/radix.css:6 | " * scales (indigo/teal/amber/plum for the four stages, red for status) were" | "for the three stages"`
- `edu-site/src/css/custom.css` — the token names still encode a four-stage scheme:
  - `:106–107 | "The four stages read as a descent" | "The three stages"`
  - `:112 | "--tbb-stage-2: …;  /* Credentials  */" | "/* AI-Native */"`
  - `:113–114 | "--tbb-stage-3: … /* Mastery */ ; --tbb-stage-4: … /* Autonomy */" | retire or renumber (no Stage 3/4)`
  - `:119–120 | "--tbb-stage-3-dark / --tbb-stage-4-dark" | retire or renumber`
  - `:371–378 | the same four tokens in the dark block | same`
  - `:1467–1501 | "var(--tbb-stage-4)" usages | retarget to the Stage-2 token`
  - `:2311–2313 | "var(--tbb-stage-3)" callout usages | retarget`
- `edu-site/static/img/hero-illustration.svg:1, :7, :55 | "A level deck carried by four stage hangers…"; "Stage hangers: 01 cyan, 02 amber, 03 violet, 04 pink" | stale asset (four hangers); not referenced by the current hero (the CSS mesh replaced it) — retire or redraw with three`

### `edu-site/scripts/**`
- No stale hits. `check-frontmatter.mjs`'s "five" (`:14`, `:122–127`) is the docs-root reference set, not stages; `check-chapter.mjs:81` "The pre-redesign Stage 0 sequence. These five shipped before" is about five files. `check-references.mjs` reads `stage:` from the ledger generically.

### `curriculum-state/ledgers/**`
`prerequisite-graph.yaml` (36) — the file's own header and change-log tail included:
- `:18 | "# The official curriculum (curriculum_1.md) fixes four STAGES." | "three STAGES (Stage 0, 1, 2)"`
- `:30 | "# Concretely, for Stage 1: it currently has six placeholder files" | "ten chapter files" (stale count)`
- `:81 | "# 1-4, not an internal bucket. The rows below are still the OLD content" | "1-2"`
- `:306 | "carried Stage 3-4 territory - the four safety boundaries, the" | "Stage 2 territory"`
- `:399–400 | "certificate here, with the real credentials named (Stage 2's CS50P and CS50W)" | OWNER DECISION (2); renumber off Stage 2`
- `:479 | '"Welcome to the first of five stages". Five stages is locked canon' | "the first of three stages"`
- `:678 | "coding assistant in Stages 3-4." | "in Stage 2"`
- `:892 | "# --- Stage 2 -------------------------------------------------------------" | relabel as the Credentials parallel track`
- `:893–895 | "s2-index / s2-cs50p / s2-cs50w … stage: 2" | Credentials is not a stage; retire or re-id these rows (Stage 2 is now AI-Native)`
- `:897–899 | "# the four chapters carried over from old Stage 3 … id: old-s3-index … title: "Stage 3 Overview", stage: 3, status: removed" | restate under the final structure; withdraw the Stage 3 id and title`
- `:905 | "# --- Stage 3 (the old Stage 4, renamed 2026-09-22) ---" | "# --- Stage 2 (SDE Mastery AI-Native) ---"`
- `:906 | "s3-index … docs/stage-03-sde-mastery-ai-native/index.md … "Stage 3 Overview" … stage: 3" | s2-index; docs/stage-02-sde-mastery-ai-native/index.md; "Stage 2 Overview"; stage: 2`
- `:907–909 | "s3-rag / s3-multi / s3-evals … stage: 3" | s2-rag / s2-multi / s2-evals; the renumbered path; stage: 2`
- `:922 | "total_lesson_files: 15 # the Stage 1-4 lesson rows" | "the Stage 1–2 lesson rows"`
- `:926 | "remaining_placeholders: 15 # Stage 1 (10) + Stage 2 (2) + Stage 3 (3)" | "Stage 1 (10) + Stage 2 (3) + Credentials track (2)"`
- `:985 | "three rows - s1-index, s1-01 and s3-prompt - still" | "s1-prompt" (no `s3-*` ids remain)`
- `:999 | "the audience for Stages 3-4 is undecided and no rule may assume one." | "Stage 2" — plus OWNER DECISION (1) if the floor wording is in scope here`
- `:1002–1003 | "AUTHORED 2026-09-11 (Stage 1, all six chapters): docs/stage-01-spec-aware-vibe-engineering/…" | docs/stage-01-sde-mastery-ai-driven/`
- `:1009 | "are Stage 2 (2), Stage 3 (4) and Stage 4 (3)." | recount under the final structure`
- `:1074 | "from docs/stage-01-spec-aware-vibe-engineering/." | docs/stage-01-sde-mastery-ai-driven/`
- `:1084 | "check docs/stage-02-cs50-certification/ and" | the Credentials track (docs/stage-02-credentials/) or retired`
- `:1088 | "2026-09-22: four-stage restructure. Old Stage 1 (6) and old Stage 3 (4) merged into Stage 1 (10); old Stage 4 became Stage 3 (3)." | restate as superseded by the final three-stage structure`
- `:1090–1095 | "# RESTRUCTURE 2026-09-22 (four-stage curriculum, owner-approved). The five stages became four: … Stage 2 is Credentials … Stage 3 SDE Mastery (AI-Native; Agentic AI) is the old Stage 4. # Live folders: …" | restate under the final structure: three stages; Credentials a disabled parallel track; the AI-Native folder becomes docs/stage-02-sde-mastery-ai-native/`

`concept-ledger.yaml` (3):
- `:216 | "Stage 4 material appearing in the intro. Acceptable there" | "Stage 2 material"`
- `:222 | "shipped yet; that full definition is still Stage 4's job." | "still Stage 2's job"`
- `:1246 | "# (docs/stage-01-spec-aware-vibe-engineering/*.md) were reverted to" | "docs/stage-01-sde-mastery-ai-driven/…"`
- (`:1195` "The four stages any piece of software work moves through" is the SDD loop — not stale.)

`example-ledger.yaml` (8):
- `:122 | "architecture to be Stage 3-4 territory rather than finale material, now" | "Stage 2 territory"`
- `:125 | "they have no reservation - if a Stage 3 or Stage 4 lesson wants one, it" | "a Stage 1 or Stage 2 lesson"`
- `:214 | "reserved_for: a Stage 1 or Stage 3 lesson" | "a Stage 1 or Stage 2 lesson"`
- `:254 | "agent lesson, feature-add-ticket for Stage 1/3, repo-permission-contract" | "Stage 1/2"`
- `:255 | "for Stage 3/4, and spending one here would rob the lesson it is reserved" | "for Stage 2"`
- `:262 | "reserved_for: a Stage 3 or Stage 4 lesson" | "a Stage 2 lesson"`
- `:326 | "Stage 0-2 chapter. If nothing real fits, invent something concrete." | OWNER DECISION (1)`
- `:341 | "will meet again as an AI coding assistant in Stages 3-4: fast, tireless," | "in Stage 2"`

`evidence-ledger.yaml` (2):
- `:17 | "#   - expires: Stage 3/4 tool claims get 90 days." | "Stage 2 tool claims"`
- `:96 | "Superseded when the 2026 survey lands. Check before Stage 3 authoring." | "before Stage 2 authoring"`

`term-ledger.yaml` — no hits.

### C note — where the site's stage list comes from, and who consumes it (≤10 lines)
1. There is **no single shared stage module**. The rendered curriculum tree is authored by hand in `edu-site/sidebars.ts` — each category hard-codes its `label`, its doc-id `link`, and `customProps: { stage: N }`.
2. `docusaurus.config.ts` loads that sidebar (`sidebarPath`); the swizzled `src/theme/DocSidebarItem/{Category,Link}` components and `src/lib/chapterLocation.ts` read the `customProps` back out.
3. A second hand-written list is `edu-site/src/lib/stages.ts` (`STAGE_LINKS` + `StageNumber`), consumed by `SiteMenu/SiteDrawer.tsx:30`, `Search/AppleSpotlight/index.tsx:37-40` and `Search/ExpandableSearchBar/index.tsx:33`; `src/components/stage-icons/index.tsx` mirrors it.
4. Three more copies that read none of the above: `src/pages/index.tsx` (`STAGES`, lines 29–66), `src/components/DataViz/{KPIGrid,CurriculumDonut,CurriculumBarChart}.tsx`, and the footer links in `docusaurus.config.ts:116-119`.
5. `src/data/chapterManifest.ts` and `static/search-index.json` are generated from `edu-site/docs/` by `scripts/generate-chapter-manifest.mjs` and `scripts/generate-search-index.mjs` — never hand-edit; regenerate.
6. So the stage list must be edited in lockstep across five hand-written sources, then the two generated files rebuilt. That is the whole reason this inventory exists.

---

## D. Docs folders under `edu-site/docs/`

| folder | .md files | index `title` | index `sidebar_label` | referenced by `sidebars.ts`? |
|---|---|---|---|---|
| `intro-1-binary-to-programming/` | 1 (`01-binary.md`) | no index page | — | **No.** The sidebar id `intro-1-binary-to-programming` resolves to the docs-root file `intro-1-binary-to-programming.md`; `01-binary.md` is unreferenced (see G) |
| `stage-01-sde-mastery-ai-driven/` | 11 | `Stage 1 — SDE Mastery (AI-Driven)` | `Stage 1 Overview` | Yes — category link id + explicit list of 10 doc ids |
| `stage-02-credentials/` | 3 | `Stage 2 — Credentials` | `Stage 2 Overview` | Yes — category link id + 2 doc ids. **Stale: Credentials is not a stage** |
| `stage-03-sde-mastery-ai-native/` | 4 | `Stage 3 — SDE Mastery (AI-Native; Agentic AI)` | `Stage 3 Overview` | Yes — category link id + 3 doc ids. **Stale: no Stage 3; this is Stage 2** |

Root of `edu-site/docs/`: 15 `.md` files (accessibility, ch00–ch02, changelog, code-of-conduct, faq, glossary, intro-1–intro-5, perf-targets, welcome). No autogenerated sidebars anywhere — every folder is reached by an explicit doc-id list, so a folder rename breaks the build until `sidebars.ts` is edited too.
Renames implied by the final structure: `stage-03-sde-mastery-ai-native/` → `stage-02-sde-mastery-ai-native/`; `stage-02-credentials/` → a non-stage track location (OWNER DECISION).

---

## E. Reader-facing pages and homepage copy

### `edu-site/docs/welcome.md` (15)
- `:5 | description: "…how the five stages fit together…" | "how the three stages fit together"`
- `:6 | "keywords: [spec-driven engineering, AI coding agent, prerequisites, CS50P, CS50W, edX, five stages]" | drop "five stages"`
- `:9 | scope_reason: "…the five-stage table as one unit…" | "the stage table"`
- `:14 | "Two genuine Harvard credentials sit inside that arc, midway through it." | OWNER DECISION (2)`
- `:46–50 | the five-row table ("0 — Introduction to Computing…", "1 — Spec-Aware Vibe Engineering Foundations", "2 — Credible Validation Through International Certification", "3 — Mastering AI Coding Agents", "4 — Engineering Autonomous AI Agents") | three rows: 0 Introduction to SDE, 1 SDE Mastery (AI-Driven), 2 SDE Mastery (AI-Native); the Credentials row is OWNER DECISION (2) (parallel track, disabled)`
- `:52 | "The [FAQ](/faq#what-are-the-five-stages) … **The five stages are fixed**" | "the three stages"; the anchor changes with the FAQ heading`
- `:57 | "Past two genuine Harvard credentials in Stage 2, the same discipline carries you … in Stage 4." | OWNER DECISION (2) for the credentials half; "Stage 4" must go`
- `:75 | "**Stage** — one of five large arcs, 0 through 4, always in the same order." | "one of three large arcs, 0 through 2"`
- `:84 | "it runs from Stage 0's history lesson to Stage 4's autonomous agents" | "to Stage 2's AI-native work"`
- `:97 | "The only portable credentials here today are CS50's two, earned in Stage 2." | OWNER DECISION (2)`
- `:109 | "the first chapter, and the start of all five stages" | "the start of all three stages"`

### `edu-site/docs/faq.md` (13)
- `:5 | description: "…how the five stages work…" | "how the stages work"`
- `:14 | "A free, five-stage curriculum that takes a student from zero…" | "A free, three-stage curriculum…"`
- `:16 | "earned partway through, in Stage 2." | OWNER DECISION (2); "Stage 2" must go (Credentials track)`
- `:32 | "## What does the CS50 certification cost?" | keep the question; its answer's stage framing changes`
- `:34 | "Stage 2 is built on two Harvard courses: CS50P … and CS50W …" | "The Credentials track is built on two Harvard courses…" (OWNER DECISION (2) on the promise)`
- `:38 | "## What are the five stages?" | "## What are the stages?"`
- `:40–44 | the five bullets (Stage 0 / 1 Spec-Aware Vibe Engineering / 2 Credible Validation / 3 Mastering AI Coding Agents / 4 Engineering Autonomous Agents) | three bullets: 0 Introduction to SDE; 1 SDE Mastery (AI-Driven); 2 SDE Mastery (AI-Native). Credentials → OWNER DECISION (2)`
- `:50 | "The curriculum fixes five stages and commits to nothing below them" | "fixes three stages"`
- `:79 | "The two real, portable credentials in the curriculum are CS50's own — CS50P and CS50W" | OWNER DECISION (2)`

### `edu-site/docs/code-of-conduct.md` (1)
- `:10 | "The Bridge Balance is a free, five-stage curriculum" | "a free, three-stage curriculum"`

### Other `edu-site/docs/` pages (12)
- `ch00-introduction.md:15 | "Welcome to the first of five stages" | "the first of three stages"`
- `ch00-introduction.md:42 | "Both sit in Stage 2, and both are free to complete." | the Credentials track, not a stage; OWNER DECISION (2) on the promise`
- `ch02-programming-is-born.md:74 | "So is a great deal of what you will meet in Stages 3 and 4." | "…in Stage 2"`
- `intro-3-editors-and-ides.md:162 | "the tools on its last rung return in **Stage 3**, where directing coding agents gets the whole stage to itself" | "return in **Stage 1** (SDE Mastery AI-Driven), where directing coding agents is learned alongside the engineering"`
- `intro-4-terminals-and-cli-agents.md:220 | "the agents return at greater depth in **Stage 3**." | "…in **Stage 1**."`
- `stage-02-credentials/index.md:2, :4, :9, :11 | "Stage 2 Overview" / "Stage 2 — Credentials" / "**This stage is about pairing…**" | not a stage: reframe as the Credentials track (disabled) — OWNER DECISION`
- `stage-03-sde-mastery-ai-native/index.md:2, :4, :9 | "Stage 3 Overview" / "Stage 3 — SDE Mastery (AI-Native; Agentic AI)" | "Stage 2 Overview" / "Stage 2 — SDE Mastery (AI-Native)"`
- `intro-5-spec-driven-engineering.md` — "four-stage loop" ×6 (`:5, :10, :58, :60, :186, :204`): **not stale** (the SDD loop, not curriculum stages).
- `stage-01-sde-mastery-ai-driven/index.md:11` — describes the old Stage 1 + Stage 3 merge: **not stale** (accurate history).
- `accessibility.md`, `glossary.md`, `perf-targets.md`, `intro-1`, `intro-2` — no stale stage-structure statements.

### Homepage copy — `src/pages/**` and homepage components (26)
`src/pages/index.tsx` (10):
- `:41 | 'title: "SDE Mastery (AI-Driven)"' | correct as is; it is the array position below that is stale`
- `:50 | 'title: "Credentials"' + :53 | 'href: "/stage-02-credentials/"' | remove as a stage (track, disabled); OWNER DECISION (2) on the promise, and on the track's path`
- `:59 | 'title: "SDE Mastery (AI-Native; Agentic AI)"' + :62 | 'href: "/stage-03-sde-mastery-ai-native/"' | "SDE Mastery (AI-Native)" → "/stage-02-sde-mastery-ai-native/"`
- `:69 | "the four plates descend the silver ramp exactly as the four stages do" | "the three plates … the three stages"`
- `:148 | description="A 4-stage curriculum with 2 Harvard certificates…" | "A 3-stage curriculum…"; credentials ⇒ OWNER DECISION (2)`
- `:157 | "A free, four-stage curriculum teaching spec-driven AI agent engineering … anchored by two Harvard CS50 certificates." | "three-stage"; credentials ⇒ OWNER DECISION (2)`
- `:176 | "Four stages, one bridge from student to engineer." | "Three stages…"`
- `:291–292 | "Open Stage 1 and start with Foundations. Two Harvard certificates wait at the end." | OWNER DECISION (2)`

`HomepageHero/index.tsx` (5):
- `:54 | "<strong>4</strong> stages" | "<strong>3</strong> stages"`
- `:58 | "<strong>2</strong> Harvard certificates" | OWNER DECISION (2)`
- `:69–70 | "a complete 4-stage curriculum with two Harvard certificates (CS50P + CS50W)" | "3-stage"; credentials ⇒ OWNER DECISION (2)`
- `:105 | "CS50P + CS50W credentials" | OWNER DECISION (2)`

`DataViz/index.tsx` (4):
- `:8 | "*   3. CurriculumDonut     — the four stages at a glance" | "the three stages"`
- `:106 | aria-label="The four curriculum stages" | "The three curriculum stages"`
- `:111 | "Four stages at a glance" | "Three stages at a glance"`
- `:114 | "The four stages that shape the curriculum, from orientation" | "The three stages…"`

`DataViz/KPIGrid.tsx` (4):
- `:5 | "4 Stages (Introduction to SDE, SDE Mastery (AI-Driven), Credentials, SDE Mastery (AI-Native; Agentic AI))" | "3 Stages (Introduction to SDE, SDE Mastery (AI-Driven), SDE Mastery (AI-Native))"`
- `:8 | "2 Harvard Certificates (CS50P Python + CS50W Web)" | OWNER DECISION (2)`
- `:30 | "value: 4" (Stages) | "value: 3"`
- `:43 | 'subtext: "Harvard CS50P & CS50W"' | OWNER DECISION (2)`

`DataViz/CurriculumDonut.tsx` (8):
- `:2 | "CurriculumDonut — The four curriculum stages at a glance" | "three curriculum stages"`
- `:5 | "Four equal slices, one per stage." | "Three equal slices"`
- `:6 | "four-stage shape is fixed and real" | "three-stage shape"`
- `:53 | "One unit per stage keeps the four slices equal (25% each)." | "keeps the three slices equal (33% each)"`
- `:80–81 | name: "Credentials" / short: "Stage 2" | remove — not a stage`
- `:84 | "Two Harvard certificates — CS50P (Python) and CS50W (web)…" | OWNER DECISION (2)`
- `:89–90 | name: "SDE Mastery (AI-Native; Agentic AI)" / short: "Stage 3" | "SDE Mastery (AI-Native)" / "Stage 2"`

`DataViz/CurriculumBarChart.tsx` (5):
- `:85–86 | stage: "Credentials" / short: "Stage 2" | remove — not a stage`
- `:90 | "Two Harvard certificates — CS50P (Python) and CS50W (web)…" | OWNER DECISION (2)`
- `:94–95 | stage: "SDE Mastery (AI-Native; Agentic AI)" / short: "Stage 3" | "SDE Mastery (AI-Native)" / "Stage 2"`

---

## F. Historical records — counts only (never edited)

Lines matching the brief's own search terms (case-insensitive union of: five/four-stage phrasing, Spec-Aware Vibe, CS50 Certification, Mastering AI Coding Agents, Engineering Autonomous AI Agents, SDE Mastery, AI-Native, AI-Driven, Agentic AI, Stage 2/3/4, Stages 0–2 / 3–4, `stage-0N-`, `s2-/s3-/s4-/old-s3`, integrity floor, Credentials, CS50/CS50P/CS50W, Harvard):

| area | files with hits | hit lines |
|---|---|---|
| `history/prompts/**` | 88 | 332 |
| — `general/` | 84 | 256 |
| — `001-book-foundation/` | 9 | 36 |
| — `008-faq-page/` | 1 | 16 |
| — `006-storytelling-intro/` | 3 | 8 |
| — `001-hamburger-rebuild/` | 1 | 6 |
| — `constitution/` | 2 | 4 |
| — `007-search-experience/` | 1 | 3 |
| — `002-apple-design/`, `003-remove-llm-providers-page/`, `005-redesign-navbar-hero/` | 1 each | 1 each |
| — `004-fix-navbar-alignment/` | 0 | 0 |
| `history/adr/**` (0004, 0006, 0007) | 3 | 12 |
| `history/reports/**` (spine-migration ×4, course-structure-2026-09-21, PROJECT-REPORT) | 5 | 69 |
| `history/archive/**` (the generic lesson-spine snapshot) | 6 | 30 |
| `curriculum-state/proposals/**` (whole-book-redesign-record, welcome-page-brief, stage-00-sde-intro, stage-00-intro-resequence, intro-resequence-execution-prompt) | 5 | 31 |
| `edu-site/docs/changelog.md` — dated entry lines only (`14, 18, 21, 27, 28, 29, 30, 43, 47, 51, 52, 59, 61, 63` → 9 matching lines) | 1 | 9 |
| **Total** | **108** | **483** |

The brief also names `specs/**` nowhere in A–F; for completeness, `specs/` (excluding `011-curriculum-redesign/`) carries 12 stale-term lines across 6 files — `001-book-foundation` (5), `002-apple-design` (1), `005-redesign-navbar-hero` (1), `006-storytelling-intro` (3), `007-search-experience` (1), `008-faq-page` (1). All are dated feature records; never edited.

---

## G. Outside categories A–F (surprising / stragglers)

- `README.md:31 | "| Docusaurus book | ✅ scaffolded | 6 Stage 1 chapters as MDX shells; Stages 2–4 indexed |" | stale — update to the live three-stage structure` (the brief's category A names no root README, so it is listed here rather than there).
- `edu-site/docs/intro-1-binary-to-programming/01-binary.md` — a folder holding one `placeholder` chapter that no sidebar entry references; the sidebar's `intro-1-binary-to-programming` id resolves to the docs-root file of the same name. Either wire it up or retire it.
- `reference-material/The Bridge Balance - Lesson Reading Page.html:388` — one stale line in non-code reference material; not a live statement.
- `design-reference/Apple-Pro-Silver-light-tokens.css:7` — mentions `--stage-*` tokens in a comment; not a stage-structure statement.
- `.agents/skills/mmx-cli/**` and `.commandcode/taste/**` hits are API/OAuth "credentials" — not stale.
- No `AGENTS.md` or `GEMINI.md` exists anywhere in the repo. `mcclowes-skills-docusaurus/` (the gitignored embedded reference repo) and `edu-site/.claude/skills/` (unrelated local skills) carry no Bridge Balance stage references.
- The two open questions blocking some of the OWNER DECISION items are already recorded elsewhere in the repo: the zero-knowledge floor's stage range and the CS50/Harvard promise. That file is another job's to edit — noted here only so the flags above are not mistaken for gaps.
