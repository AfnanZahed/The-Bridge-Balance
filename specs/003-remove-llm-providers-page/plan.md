# Implementation Plan: Remove Internal LLM Provider Decision from Public Site

**Branch**: `003-remove-llm-providers-page` | **Date**: 2026-08-18 | **Spec**: [./spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-remove-llm-providers-page/spec.md`

## Summary

Remove the future chatbot's internal LLM-provider comparison from the public
Docusaurus textbook. Delete its public documentation source, remove its navbar
and footer links, and replace the backend README's public-doc reference with an
internal architecture reference. Preserve ADR-0001 and every backend provider
interface, implementation, and configuration file. Verify the fresh static
build contains no generated `/llm-providers` route or public link.

This is a smallest-viable-change documentation and navigation cleanup. It does
not implement the chatbot, change provider selection, relocate the ADR, or
change the backend.

---

## Technical Context

**Language/Version:** TypeScript 5.5.x; Node.js ≥ 18; Markdown/MDX; Docusaurus 3.7.x (existing site)  
**Primary Dependencies:** Docusaurus 3.7.x, React 18.x, MDX 3.x; no new dependencies  
**Storage:** N/A — static documentation source files only; no schema or persistent data change  
**Testing:** `npm run build`; targeted repository search; served-site navigation and former-route verification  
**Target Platform:** Vercel/free-tier static hosting (unchanged)  
**Project Type:** Web — Docusaurus static textbook plus an unchanged FastAPI backend  
**Performance Goals:** No regression; removal must not add client-side code or routes  
**Constraints:** Preserve `history/adr/0001-free-tier-llm-choice.md` and all `edu-site/api/app/llm/**` files; no new dependencies; do not implement the chatbot; no public references to the removed page  
**Scale/Scope:** One public Markdown page, two Docusaurus navigation entries, and two backend README references; no new page or API endpoint

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design. Evaluated against v2.1.1.*

| # | Principle | Status | Evidence |
|---|---|---|---|
| I | Free-Tier by Default | ✅ PASS | No new service or dependency; the change only removes public documentation. |
| II | Pluggable Provider Abstraction | ✅ PASS | `edu-site/api/app/llm/**`, provider registry, and configuration remain unchanged; only a public README cross-reference is updated. |
| III | Co-Authored Text, Video-Second | ✅ PASS | No chapter authoring workflow or chapter-state behavior changes. |
| IV | Spec-Driven Development (NON-NEGOTIABLE) | ✅ PASS | Spec, checklist, clarification PHR, and this plan precede implementation. |
| V | Smallest Viable Change | ✅ PASS | Scope is limited to the public page, its two navigation links, and stale public README references. |
| VI | Free, Open Curriculum | ✅ PASS | Learner-facing curriculum remains free and available; internal architecture is simply not presented as curriculum. |
| VII | Apple-Design Purity | ➖ N/A | No visual styling or interaction design change; removing a page cannot introduce a design violation. |

**Gates passed. No violations. No complexity tracking required.**

---

## Phase 0 — Research

No external technology research is required: the behavior is determined by the
existing Docusaurus content and configuration. Research will document the
site's current route-generation and navigation conventions, the internal
artifact that remains authoritative, and the verification approach for a
removed static route.

### Decisions

- Keep the architecture decision in `history/adr/0001-free-tier-llm-choice.md`;
  it is already outside `edu-site/docs/` and is not rendered by Docusaurus.
- Keep the backend's provider abstraction and provider modules unchanged;
  future chatbot implementation can continue from the existing code.
- Remove the public page source and every public navigation/cross-reference;
  do not replace it with a learner-facing summary because the user identified
  the whole page as internal architecture.
- Validate absence from a fresh build rather than relying only on source grep;
  this catches stale generated output or unexpected route generation.

### Alternatives considered

- **Hide only the navigation links:** rejected because the direct route would
  remain public and indexed.
- **Move the page to an unlinked public route:** rejected because the content is
  internal and the former route should not render it.
- **Delete the provider architecture too:** rejected because the future chatbot
  still needs the pluggable provider decision and code.
- **Rewrite the page as a public lesson:** rejected because that expands scope
  and contradicts the user's explicit internal-only boundary.

---

## Phase 1 — Design & Contracts

### Data model

No new data entities, persisted fields, lifecycle states, or migrations exist.
`data-model.md` records this explicitly.

### API contracts

No API contract changes exist. The feature has no new user action endpoint and
must not alter backend routes. `contracts/` records the no-API-change boundary.

### Verification runbook

`quickstart.md` records the exact source scan, static build, served-site checks,
and preservation checks for ADR/backend provider files.

### Constitution re-check

| # | Principle | Post-design status | Evidence |
|---|---|---|---|
| I | Free-Tier by Default | ✅ PASS | No paid dependency or service added. |
| II | Pluggable Provider Abstraction | ✅ PASS | Provider code and ADR remain intact; documentation exposure only is removed. |
| III | Co-Authored Text, Video-Second | ✅ PASS | No textbook chapter workflow changed. |
| IV | Spec-Driven Development | ✅ PASS | Design artifacts are complete before tasks/implementation. |
| V | Smallest Viable Change | ✅ PASS | Four source files are in scope: one page deletion, two config-link removals, one README edit. |
| VI | Free, Open Curriculum | ✅ PASS | No content paywall or learner access restriction added. |
| VII | Apple-Design Purity | ➖ N/A | No visual surface is changed. |

**Post-design gate: PASS.**

---

## Project Structure

### Documentation (this feature)

```text
specs/003-remove-llm-providers-page/
├── plan.md               # This file
├── spec.md               # Feature requirements
├── research.md           # Phase 0 decisions and alternatives
├── data-model.md         # No data-model changes
├── quickstart.md         # Verification runbook
├── contracts/
│   └── documentation-boundary.md  # No API changes; public/internal boundary
├── checklists/
│   └── requirements.md   # Spec quality checklist (all pass)
└── tasks.md              # Generated later by /sp.tasks
```

### Source Code (repository root)

```text
edu-site/
├── docs/
│   └── llm-providers.md          # DELETE: internal page must not be public
├── docusaurus.config.ts          # EDIT: remove navbar and footer links
└── api/
    └── README.md                 # EDIT: remove public-doc references; retain provider guidance

history/adr/
└── 0001-free-tier-llm-choice.md  # PRESERVE: internal architecture decision
```

**Structure Decision**: This is a single Docusaurus web application change
with a colocated FastAPI README reference. No backend source or data layer is
modified. The public documentation tree is the route source of truth; the ADR
is the internal architecture source of truth.

## Complexity Tracking

No constitution violations. No complexity tracking required.
