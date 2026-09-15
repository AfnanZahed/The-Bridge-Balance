---
id: 0004
title: Ratify research and mixed-audience principles
stage: constitution
date: 2026-09-15
surface: agent
model: claude-opus-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: /sp.constitution
labels: ["constitution", "governance", "research-discipline", "mixed-audience", "term-glossing", "comprehension-audit", "anti-slop"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md (edited — new v2.2.0 Sync Impact Report prepended; Principle VIII "Research-and-Comparison Discipline (NON-NEGOTIABLE)" and Principle IX "Mixed-Audience Content Integrity" added after Principle VII; version/date footer updated)
 - CLAUDE.md (edited — "Nothing is written from a blank page" standing rule now cites Constitution Principle VIII; "Two readers, one document" bullet now cites Principle IX, gained a sixth consequence for humanised prose it was previously missing, and its working-rules citation list now includes `comprehension-audit.md`)
 - history/prompts/constitution/0004-ratify-research-and-mixed-audience-principles.constitution.prompt.md (this file)
tests:
 - No code gate applies — governance document only.
 - Validated: no unresolved `[ALL_CAPS]` placeholder tokens remain anywhere in `constitution.md` (grepped after edit).
 - Validated: version bump is MINOR (2.1.1 → 2.2.0) per the constitution's own Governance rule — two principles added, none removed or redefined — and the number in the Sync Impact Report matches the footer line exactly.
 - Validated: `Last Amended` updated to 2026-09-15 (ISO), `Ratified` left at its original 2026-08-17 per the governance rule that ratification date never moves on an amendment.
 - Verified before writing, not assumed: `.specify/templates/plan-template.md`'s Constitution Check gate reads "[Gates determined based on constitution file]" — generic, confirmed by reading the file, no template edit required. `spec-template.md` and `tasks-template.md` grepped for "constitution|principle" — no matches, confirmed no principle-numbered references exist to go stale.
 - Verified: CLAUDE.md's existing numeric citations (Principle I, III, VI, VII) needed no changes, since VIII/IX were appended rather than inserted — no renumbering occurred.
---

## Prompt

ok, all the major decisions we did add them to the contituion

(Immediately preceded by this turn's own tool invocation, which scoped the request precisely before the skill ran: "Amend the constitution with the major decisions ratified by the project owner on 2026-09-15, each already written into canon and skills: (1) Research-and-comparison core policy — nothing is written (content or platform: lessons, chapters, headings, features, settings, buttons) before two passes: standards research against international and philosophical practice (≈95% delegated to DeepSeek v4.1 Flash via command-code-delegation), and the owner's own comparative study of other courses/products, which blocks drafting; findings transformed toward Reading & Understanding Literacy; nothing studied is reproduced; CS50 integrity floor overrides. Authoritative: curriculum-state/canon/research-and-comparison.md. (2) The two-minute term test and zero-knowledge floor — light terms glossed inline and linked as [*term*](/glossary#slug), heavy terms taught before use; Stages 0–2 assume a reader who has never programmed (hard floor), Stages 3–4 soft floor; glossary holds one entry per term ever. Authoritative: lesson-spine-authoring/reference/mixed-audience.md §4 and canon/audience.md. (3) Nothing written blind — the ten-angle comprehension audit plus mindmap test runs on every finished draft before it is presented. Authoritative: lesson-spine-authoring/reference/comprehension-audit.md. (4) Humanised prose — every sentence reads as written by a person; named machine-cadence tics banned; read-aloud test. Authoritative: lesson-spine-authoring/reference/language-register.md §6.")

## Response snapshot

Read the full existing constitution (v2.1.1, seven principles) before drafting anything, to inherit its exact voice, its bold-lead-term/Rationale/authoritative-citation structure (most visible in Principle VII), and its precedent for how a prior amendment (v2.1.0, Apple-Design Purity) handled the Sync Impact Report stack and downstream propagation.

**The structural call: two new principles, not four, and not one.** The four items named split naturally along scope rather than chronology: item 1 (research-and-comparison) binds *both* tracks — content and platform — and is a hard sequencing gate exactly like Principle IV's spec→plan→tasks→implement lifecycle, so it became **Principle VIII**, tagged `(NON-NEGOTIABLE)` to match that precedent. Items 2–4 (term test, comprehension audit, humanised prose) are all reader-facing quality disciplines specific to the content track, checked at draft time rather than gating when work starts — bundled into **Principle IX** as three labelled sub-disciplines under one head, following the exact pattern Principle VII already uses (one principle, several bold-lead concrete-embodiment bullets) rather than inventing three separate principles for three rules that all serve the same "two readers, one document" claim.

**Kept both principles fully self-contained**, matching Principle IV's style rather than Principle VII's split into a separate Operational Standards bullet group — neither new principle needed detail beyond its own text, so no Operational Standards edit was made. This was a deliberate minimal-diff choice, checked against the constitution's own Principle V (Smallest Viable Change) for self-consistency.

**Verified propagation rather than assuming it was clean.** Read `plan-template.md`, `spec-template.md`, and `tasks-template.md`: the Constitution Check gate is generic ("[Gates determined based on constitution file]"), and the other two carry no principle-numbered references at all — confirmed by grep, not inferred from the prior sync report's claim. No template or command-file edit was needed.

**Named the override precisely rather than promoting a fifth thing.** Principle VIII's text cites `curriculum-state/canon/integrity-floor.md` as an override for CS50 sources, but the integrity floor itself is not promoted to a ratified principle — it wasn't one of the four decisions the owner named for this amendment, and the Sync Impact Report says so explicitly as a deliberate scope boundary rather than an oversight, so a future amendment doesn't have to re-discover why it's absent.

**Ratification note, stated in the report:** both principles formalize behavior already live in canon and skill files as of earlier the same day (PHR 0079, PHR 0080) — this amendment is the constitution catching up to already-implemented behavior, not new behavior taking effect. No downstream artifact needed to change to comply, which the Sync Impact Report lists explicitly rather than leaving implicit.

**CLAUDE.md propagation, and one real gap caught while doing it.** Added `(Constitution Principle VIII)` to the blank-page standing rule and `(Constitution Principle IX)` to the two-readers bullet, matching the citation style already used for Principles I/III/VI/VII. While updating the two-readers bullet, noticed it enumerated only five consequences and never mentioned humanised prose at all — Principle IX's third discipline had no CLAUDE.md presence. Fixed it as a sixth consequence in the same edit, with `comprehension-audit.md` added to the working-rules citation list, rather than leaving the constitution and CLAUDE.md silently out of sync on day one of the new principle's life.

## Outcome

- ✅ Impact: Constitution is now v2.2.0, nine ratified principles. The four decisions the owner named on 2026-09-15 are constitutional, not just canon/skill text — any future compliance review or ADR-trigger test now has these as first-class principles to check against, per the Governance section's own "every PR MUST verify alignment with the principles in this constitution" rule.
- 🧪 Tests: See `tests:` above — no code gate applies; every propagation claim was verified by reading or grepping the target file, not assumed from the prior sync report.
- 📁 Files: See `files:` above.
- 🔁 Next prompts: None required by this amendment. If the owner later wants the Stage 2 integrity floor itself promoted to a numbered principle (it currently exists only as `canon/integrity-floor.md` plus CLAUDE.md/skill citations), that would be a distinct, explicit amendment — flagged in the Sync Impact Report's Follow-up TODOs so it isn't lost.
- 🧠 Reflection: The one-word user message ("add them to the constitution") carried real ambiguity — which decisions counts as "major" was resolved by the tool-call scoping that preceded the skill invocation, not by this message alone. Treating that scoping as authoritative rather than re-deriving "major decisions" from the whole session's history was the right call: the four items were the ones explicitly framed as "core policies" by the owner earlier the same day, and re-scanning the full session for other candidate amendments would have risked either scope creep or a second round of clarifying questions for a request the owner clearly intended as a quick formalization step.

## Evaluation notes (flywheel)

- Failure modes observed: none in the amendment itself. The near-miss was almost leaving CLAUDE.md's two-readers bullet at "five consequences" — it would have been internally consistent (nothing broken) but silently incomplete against the very principle being ratified in the same turn, which is a worse failure mode than a build error because nothing would have flagged it.
- Graders run and results (PASS/FAIL): none applicable to a governance document; manual validation checklist in `tests:` above stands in for a gate here.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none pending from this amendment specifically.
