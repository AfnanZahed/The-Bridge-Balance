---
id: 0002
title: Create ADR-0005 — search experience split (home Spotlight + chapter bar, one client-side engine)
stage: misc
date: 2026-09-11
surface: agent
model: claude (Command Code agent)
feature: 007-search-experience
branch: none (no version control in this project)
user: afnanzahed@gmail.com
command: /sp.adr search-experience-split
labels: ["adr", "search", "architecture", "spec-007", "references"]
links:
  spec: specs/007-search-experience/spec.md
  ticket: null
  adr: history/adr/0005-search-experience-split.md
  pr: null
files:
  - history/adr/0005-search-experience-split.md (new)
  - history/adr/README.md (index row 0005)
  - edu-site/src/css/custom.css (12 stale ADR-0005 references → ADR-0003)
  - edu-site/src/css/radix.css (1 stale ADR-0005 reference → ADR-0003)
  - edu-site/src/css/a11y.css (1 stale ADR-0005 reference → ADR-0003)
  - specs/007-search-experience/plan.md (accent-scope line corrected to ADR-0003)
tests:
  - grep "ADR-0005" over the repo (excluding node_modules/build) — no stale references remain
  - .specify/scripts/powershell/check-prerequisites.ps1 -Json — FEATURE_DIR=specs/007-search-experience; warns "Git repository not detected; skipped branch validation" (expected, no version control)
---

## Prompt

/sp.adr search-experience-split

## Response snapshot

Ran the repo's own ADR command. Step 1 (prerequisites): `.specify/scripts/powershell/check-prerequisites.ps1 -Json` returned `FEATURE_DIR = specs/007-search-experience` with no auxiliary docs (`specs/007-search-experience/` has spec.md + plan.md + tasks.md, no research.md/data-model.md/contracts). The command's prescribed `create-adr.sh` does not exist in this repo's Spec-Kit copy (only `scripts/powershell/` is installed, and it contains no ADR script), so the ADR was written agent-native following `.specify/templates/adr-template.md` and the house style of ADR-0003/0004.

Step 2–4 (extract, check existing, significance test): the search work yields one decision cluster (surface split by route + one static client-side engine + one result presentation + fidelity porting rules + the added a11y contract). It passes all three significance checks; it conflicts with no existing ADR.

Step 5 (create): wrote `history/adr/0005-search-experience-split.md` — Status Accepted, dated 2026-09-11, feature `specs/007-search-experience/`, with the significance checklist inline, the six decision components, consequences both ways (auto-open is opinionated; client-side index has a corpus ceiling; ⌘K is home-only; buttons-not-links for results; fidelity keeps paste quirks), seven alternatives considered with rejection rationales, and references to the spec/plan/tasks, ADR-0003 (no accent-scope conflict), and PHRs 0001/0002.

A latent defect was found and fixed as part of this: **twelve-plus references to "ADR-0005" for the scoped accent token were stale** — the accent decision is ADR-0003, and the file-by-file index shows no ADR-0005 ever existed. Creating a real ADR-0005 would have made those comments point readers at the wrong decision, so all of them (`custom.css` ×12, `radix.css` ×1, `a11y.css` ×1, and the 007 `plan.md` line that had copied the wrong number) were corrected to ADR-0003.

## Outcome

- ✅ Impact: the search decision is now a permanent, reviewable record with alternatives and tradeoffs; the ADR index lists 0005; the accent-token comments across the CSS layer no longer misdirect to the wrong ADR.
- 🧪 Tests: none required (documentation change); a repo-wide grep confirms no stale `ADR-0005` reference remains.
- 📁 Files: 1 new ADR, 1 index update, 4 files with stale references corrected (16 comment references total).
- 🔁 Next prompts: resolve the two other pre-existing defects surfaced during 007 verification (`.tbb-hero__eyebrow` aria-label on the home page; `scripts/axe.mjs` `Set.reduce` crash) if the owner wants the a11y gate green; owner preview of the search surfaces in Edge.
- 🧠 Reflection: the command presumes Spec-Kit's full bash script set; in this repo the reliable path is reading the template and the nearest existing ADRs and writing the record by hand — which is also how 0003 and 0004 were produced.

## Evaluation notes (flywheel)

- Failure modes observed: a planned-referenced script (`create-adr.sh`) absent from this repo's Spec-Kit install — handled by the documented fallback rather than aborting; stale ADR-number comments in the CSS layer, surfaced by the new ADR's number colliding with them.
- Graders run and results (PASS/FAIL): ADR structure (clustered decision, explicit alternatives with rationale, pros/cons, references) — PASS; index updated — PASS; stale references resolved — PASS.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none.
