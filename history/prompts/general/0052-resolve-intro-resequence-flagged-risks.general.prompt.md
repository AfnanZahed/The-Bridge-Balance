---
id: 0052
title: Resolve intro resequence flagged risks
stage: general
date: 2026-09-10
surface: agent
model: claude-sonnet-5
feature: none
branch: none (no version control in this project)
user: afnanzahed@gmail.com
command: none (freeform chat message)
labels: ["curriculum-architecture", "intro-sequence", "proposal", "callout"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - curriculum-state/proposals/stage-00-intro-resequence-2026-09-10.md (edited)
tests:
  - none (planning artifact only)
---

## Prompt

FLAGGED RISKS: The finale will be long: You will check it's length against the other chapters, if this is actually long, then it will be written as the subchapters (Appeared beautifully in the Side Bar).
Chapter 3 and 4's tool comparisons will date quickly: Clearly Mentioned (as a seperate design element like a notification, or warning or bloack or box) about this thing that the tools and AI model's named here are as per the date of the writing this, check for the latest.
intro-1's scope grows: Basically the language is already mentioned in the older version, so no major changes to be worried, just the clarity is used here using the programming for the beginners' understanding.

## Response snapshot

Treated this as the user resolving each of the three risks flagged in the
proposal's own "Flagged risks" section, one by one:

1. Finale length — agreed contingency: check `intro-5`'s actual length
   against the other chapters only once it's drafted (not now, nothing is
   written yet); if disproportionately long, restructure it as its own
   sidebar category with nested sub-lesson docs (the same pattern Stage
   1-4 already use: a folder with an index + numbered sub-lessons, wired
   into `sidebars.ts` as a collapsible category) rather than one flat file.

2. Tool-comparison dating — read `edu-site/src/components/Callout/index.tsx`
   to ground the resolution in the component's real API before writing it
   into the proposal (variants: info/tip/important/warning/danger, usage
   `<Callout type="..." title="...">`). Recorded the plan: both chapter 3
   (IDEs) and chapter 4 (Terminals & CLI Agents) get an explicit `<Callout>`
   — likely `type="info"` or `type="important"` — naming the actual
   authoring date and telling the reader to check for the current landscape,
   since Cursor/Windsurf/Zed/Trae and Claude Code/Codex/Gemini CLI are
   exactly the kind of time-boxed claim this book elsewhere dates
   explicitly. Exact placement left as a drafting-time call.

3. `intro-1`'s scope growth — downgraded to a non-issue per the user's own
   reasoning: the concept of a programming *language* already existed
   implicitly in current `intro-2-binary-to-language.md` (it already ends
   at "high-level language"), so "What Is Programming" only makes that
   existing concept explicit for a beginner reader rather than adding real
   new scope.

Edited `curriculum-state/proposals/stage-00-intro-resequence-2026-09-10.md`'s
"Flagged risks" section in place (now "Flagged risks — resolved 2026-09-10
(third pass)"), replacing each open risk with its resolution. No sidebar,
ledger, or chapter file touched — still proposal-only per this directory's
own rule; the sub-chapter split and the Callout placement are both explicitly
recorded as drafting-time decisions, not executed now.

## Outcome

- ✅ Impact: All three flagged risks in the intro-resequence proposal now have an agreed resolution/contingency, recorded for whoever drafts these chapters later.
- 🧪 Tests: None run (no code/content changed; verified the Callout component's real prop API by reading its source before citing it).
- 📁 Files: `curriculum-state/proposals/stage-00-intro-resequence-2026-09-10.md` (risk section rewritten). This PHR file created.
- 🔁 Next prompts: Proposal now has structure, placement reasoning, and risk resolutions all settled — likely next step is either final sign-off to execute (renames, `sidebars.ts`, all four ledgers, `prerequisite-graph.yaml`, `chapterManifest.ts`) or further refinement of chapters 2-5 if the user wants more detail before committing.
- 🧠 Reflection: Verifying the actual `Callout` component API before writing a recommendation into the proposal (rather than assuming a prop shape) kept the resolution technically accurate and immediately actionable at drafting time.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): n/a (planning artifact).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
