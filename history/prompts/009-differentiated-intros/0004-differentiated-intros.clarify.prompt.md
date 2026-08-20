---
id: 0004
title: Clarify differentiated intros spec
stage: misc
date: 2026-08-20
surface: agent
model: opus
feature: 009-differentiated-intros
branch: 009-differentiated-intros
user: Dell
command: /sp.clarify
labels: [clarify, intro, editorial, comparison-matrix, reader-controls]
links:
  spec: specs/009-differentiated-intros/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/009-differentiated-intros/spec.md

tests:
  - Spec Clarifications section present — PASS
  - 5 questions asked, all answered — PASS
  - Recommendations accepted (Q3, Q4) and explicit answers (Q1 C, Q2 A-with-B-content, Q5 A) — PASS
  - No contradictory earlier statement — PASS (no prior text covered these decisions)
---

## Prompt

/sp.clarify

(no additional user input beyond the slash command)

## Response snapshot

**Coverage scan** — 9 categories Clear; 3 Partial/Missing that materially change implementation: comparison-matrix visibility, summary format, scenario-source rule, reader-control description surface, and rejection behavior.

**5 questions asked and resolved**:
1. Q1: Where should the editorial comparison matrix live? → A: Public summary embedded in the intro page (Option C).
2. Q2: Which format should the public summary use? → A: Compact table with nine rows (Option A), but each row should be presented as a short card with a title, lens, real-world use, and "choose this if…" statement (Option B content).
3. Q3: Which scenario-source rule applies to the nine versions? → A: Reuse only the canonical source list; map multiple lenses onto the same incident by answering different questions (Option A) [recommended, accepted].
4. Q4: Where should the reader-control description string surface? → A: Tooltip/popover on hover or focus, with equivalent accessible text via `aria-describedby` (Option B) [recommended, accepted].
5. Q5: What should happen when a version fails the uniqueness review? → A: Block the entire intro release until all nine versions pass (Option A).

**Spec updated**: a new `## Clarifications` section with a `### Session 2026-08-20` subheading now records every accepted answer; no contradictions introduced.

## Outcome

- ✅ Impact: 5 high-impact ambiguities resolved; downstream plan and tasks can now make concrete choices (summary structure, scenario sourcing, reader-control UI, and rejection behavior).
- 🧪 Tests: validation pass — no unresolved placeholders, valid markdown structure, terminology consistent.
- 📁 Files: `specs/009-differentiated-intros/spec.md`.
- 🔁 Next prompts: `/sp.plan` to refresh the plan if the new summary structure changes the project surface; otherwise proceed to `/sp.implement` to execute the existing tasks.
- 🧠 Reflection: the matrix + summary distinction clarifies that the matrix is the editorial gate, while the embedded summary is a reader-facing orientation aid; pairing Option A and Option B content gives both compactness and per-version actionable guidance.
