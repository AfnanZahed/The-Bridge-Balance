# Data Model — `006-storytelling-intro`

**Feature**: Story-driven rewrite of `edu-site/docs/intro.md`.
**Date**: 2026-08-19
**Source**: derived from `spec.md` and `research.md`.

> **Note**: This feature is a content rewrite, not a data-system change. There is no runtime database or schema. The "entities" below are the *editorial artifacts* the writer, fact-checker, and reader-panel operate on. Treat them as the canonical shape the implementation must produce and verify.

---

## Entity overview

```
┌─────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│  Story Card     │──────▶│   Fact Claim     │──────▶│     Source       │
│  (research.md   │       │   (spec A.6 +    │       │   (URL + meta)   │
│   A.1, A.2)     │       │   research A.3)  │       │                  │
└─────────────────┘       └──────────────────┘       └──────────────────┘
        │                          │                          │
        │                          ▼                          │
        │                  ┌──────────────────┐               │
        │                  │     Quote        │───────────────┘
        │                  │   (research A.4) │
        │                  └──────────────────┘
        ▼
┌─────────────────┐       ┌──────────────────────────────┐
│   Beat          │──────▶│  Per-Fact Mapping Table     │
│   (spec FR-008, │       │  (SC-014 — implementation   │
│   FR-012)       │       │   deliverable)               │
└─────────────────┘       └──────────────────────────────┘
```

---

## 1. Story Card

**Description**: A single real-world incident used as a narrative beat. May come from news coverage (verifiability tier: `news-covered`), first-person account (`first-person`), or academic study (`academic`). The writer dramatizes the story but does NOT add invented details beyond what the source reports.

**Fields**:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | string | yes | e.g. `A1`, `B3`. Stable across pool + spec + research + plan. |
| `pole` | enum | yes | `A` (blind vibe coding) or `B` (AI resistance). |
| `actor` | string | yes | Named individual, named company, or handle (e.g. `"anuraag"`, `"ZavicoAutomation"`). Never invented. |
| `incident_summary` | string | yes | 1–3 sentence summary of the action; preserves key numbers and the failure mode. |
| `date` | string | yes | ISO date or date range. e.g. `"2025-07"` for July 2025; `"2025-05..2026-04"` for the DHH arc. |
| `source_url` | URL | yes | Primary source preferred; secondary if no primary. |
| `source_publisher` | string | yes | e.g. `"Ars Technica"`, `"world.hey.com"`. |
| `verifiability_tier` | enum | yes | `news-covered` / `first-person` / `academic` / `unverified-flag`. |
| `lesson` | string | yes | One-sentence framing: what does the story teach? |
| `hook_line` | string | yes | One sentence the writer may use as a cold-open / pull-quote. |
| `prose_span` | span | impl-only | Set during implementation: where in the new `intro.md` the story is dramatized. Used by SC-014 mapping table. |

**Validation rules**:
- `actor` MUST NOT be invented; if the actor is handle-only, write `"anuraag"` (not `"the anonymous product manager"`).
- `incident_summary` MUST NOT add facts beyond what `source_url` reports. If a number is from a different source, attribute it.
- `prose_span` is the only field set during the implementation phase; it MUST be present in the ship-ready per-fact mapping table.

**Count**: 14 Story Cards total (A1–A7, B1–B7) in `research.md`.

---

## 2. Fact Claim

**Description**: A statistic, projection, or measurement used as a data point in prose. Some fact claims come from the current `intro.md` (mandatorily retained per spec Appendix A.6); others come from the research pool (additive per FR-007).

**Fields**:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | string | yes | e.g. `F-A6-12` (mandatory retained row 12) or `F-A3-SO-trust` (from research pool). |
| `claim` | string | yes | Verbatim or close paraphrase of the statistic. |
| `value` | string | yes | The numerical figure or date. |
| `survey_or_source` | string | yes | Survey name + publisher, e.g. `"Stack Overflow Developer Survey 2025"`. |
| `sample_size_n` | int | optional | Sample size when known, e.g. `n=49,009`. |
| `date` | string | yes | Publication date of the survey/study. |
| `caveat` | string | optional | Methodology caveat (sample bias, self-report underreporting, etc.). Must be honored in prose. |
| `pole_lean` | enum | optional | `A` (momentum / cost-of-AI), `B` (cost-of-resistance), `neutral`, `bridge`. |
| `prose_span` | span | impl-only | Where in the new `intro.md` the fact appears. |

**Validation rules**:
- The 24 fact claims in spec Appendix A.6 are MANDATORY retained. SC-013 / SC-014 verify.
- When the fact has a known caveat (e.g. SO 2025 self-selected sample), the writer MUST honor the caveat in the prose (e.g. "of the 49,000 developers who responded…", not "all developers").
- The `prose_span` MUST include the survey/publisher name (inline or footnote).

**Count**: 24 mandatory + 15 additive = 39 fact claims in active scope.

---

## 3. Quote

**Description**: A verbatim citation from a named individual. Used sparingly to land a beat; not every section needs a quote. The writer MUST preserve verbatim wording — paraphrasing must be clearly framed as paraphrase, not quote.

**Fields**:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | string | yes | e.g. `Q-Karpathy-2025-02-02`. |
| `speaker` | string | yes | Named individual with role/context. |
| `date` | string | yes | Date of the speech/post. |
| `verbatim` | string | yes | Exact text. May be a short selection if the original is long. |
| `source_url` | URL | yes | URL of the original post/interview. |
| `prose_span` | span | impl-only | Where in the new `intro.md` the quote is used. |
| `attribution_clarity` | enum | impl-only | `quoted-directly` / `paraphrased-clearly` — the writer's self-attestation. |

**Validation rules**:
- Quotes MUST be verbatim unless explicitly flagged as paraphrase. Paraphrases must keep the meaning, not invent wording.
- A quote's `prose_span` MUST include attribution (name + date + role).

**Count**: 10 quotes in `research.md` A.4.

---

## 4. Source

**Description**: A URL with metadata. All sources used inline and in the consolidated Sources section of the new `intro.md` are first-class entities. Sources have no pole_lean of their own; they live behind facts and quotes.

**Fields**:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | string | yes | e.g. `S-arstechnica-replit-jul2025`. |
| `title` | string | yes | Title of the article / paper / page. |
| `publisher` | string | yes | e.g. `"Ars Technica"`, `"GitHub"`, `"Stanford SCALE"`. |
| `url` | URL | yes | Working URL; no 404s as of ship date (SC-012). |
| `date_published` | string | yes | Publication date. |
| `date_navigated` | string | yes | Date the URL was verified (set during implementation). |
| `used_by` | array of IDs | impl-only | List of Fact Claim / Quote / Story Card ids that cite this source. |

**Validation rules**:
- Every fact and every quote MUST reference at least one source.
- The consolidated Sources section at the end of the new `intro.md` MUST list every source used inline, with publisher, date, and URL.
- No dead URLs (SC-012).

---

## 5. Beat

**Description**: One of the six mandated narrative slots in the story arc. The implementation phase uses these as section anchors; the prose writer places content within a beat, not across beats (no content crosses two beats without explicit justification).

**Fields**:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | enum | yes | One of: `cold-open`, `extreme-A`, `extreme-B`, `shared-trap`, `bridge`, `cta`. |
| `purpose` | string | yes | What the beat must accomplish. |
| `min_word_budget` | int | yes | The minimum word count the beat must contain. Sum of beat minimums = 6,800 (lower bound of SC-001). |
| `mandatory_beats` | array | varies | Anchor beats that MUST appear (e.g. cold-open requires a named dated actor; bridge requires the four stages + the "engineer who directs AI" promise). |
| `prose_span` | span | impl-only | Where in the new `intro.md` the beat lives. |

**Mandatory beats and budgets** (default):

| Beat ID | Purpose | Min words | Mandatory content |
|---------|---------|-----------|-------------------|
| `cold-open` | Hook the reader in first 500 words with a real story | 400 | A Story Card (A1, A3, A4, A6 are good candidates) + the named actor + a date + a visceral line. |
| `extreme-A` | Dramatize blind vibe coding | 2,500 | ≥ 2 Story Cards from A1–A7 + ≥ 4 mandatory retained facts from F-A6-1..F-A6-10 + the "vibe coding hangover" framing |
| `extreme-B` | Dramatize AI resistance | 2,500 | ≥ 2 Story Cards from B1–B7 + ≥ 4 mandatory retained facts from F-A6-11..F-A6-19 + the empathy clause (no mocking) |
| `shared-trap` | Show both extremes come from the same root (abdication of judgment) | 600 | The "Specification Poverty" framing + the bridge concept's first mention |
| `bridge` | Spec-Driven Engineering as synthesis | 600 | The four stages (Stage 1 Foundations → Stage 4) + the "engineer who directs AI systems" promise |
| `cta` | The "Who this is for" guidance + Stage-1 CTA | 400 | Who-this-is-for mini-table + Stage-1 link |

**Validation rules**:
- Beat ordering MUST match the table above (FR-008).
- The sum of `min_word_budget` values is **6,800**; total word count must reach **6,800–7,600** (SC-001).
- No mandatory beat may be skipped.
- `cold-open` MUST NOT open with a statistic (FR-003).
- `bridge` MUST preserve the existing four-stage syllabus (FR-006).

---

## 6. Per-Fact Mapping Table

**Description**: A side-by-side deliverable produced during the implementation phase. Maps each of the 24 mandatory retained facts (spec Appendix A.6) to a span of new prose and the survey/publisher attachment. SC-014 makes this a ship-readiness artifact.

**Fields**:

| Field | Type | Notes |
|-------|------|-------|
| `fact_id` | string | e.g. `F-A6-12` |
| `claim` | string | The fact |
| `prose_span` | span | Where it lands in the new `intro.md` (line range or prose extract) |
| `survey_publisher_attached` | bool | Whether the survey/publisher is inline or in a footnote |
| `min_word_budget_met` | bool | Whether the span reaches the per-fact minimum word budget in research Appendix A.6 |
| `verified_by` | string | Initials / handle of the verifier (the fact-check pass) |
| `date_verified` | string | ISO date |

**Validation rules**:
- Every fact in spec Appendix A.6 has a row. Zero missing rows = SC-013 passes.
- Each row's `prose_span` must contain the named survey/publisher (or the survey/publisher must be attached in a footnote cited within the span).

---

## Cross-entity rules

1. **No entity may stand alone.** Every Fact Claim, Quote, and Story Card references at least one Source.
2. **The Sources section is the union of all Source entities used.** No orphan sources; no orphan facts.
3. **Beats are containers, not content.** A Story Card lives inside exactly one Beat (the writer chooses which); the mapping table records it.
4. **Mandatory retained facts stay.** Spec Appendix A.6 is closed: the 24 rows are exhaustive against the current `intro.md`. New facts from the research pool may be added (FR-007); no current fact may be silently dropped.
5. **No entity changes the design system.** This feature does not add new tokens, components, or images.

---

## Verification matrix (which entity supports which SC)

| SC | Anchored on entity |
|----|--------------------|
| SC-001 (word count) | `Beat.min_word_budget` sum + total body word count |
| SC-002 (both extremes dramatized) | `Story Card` count per pole (≥ 2) + `Beat.min_word_budget` for `extreme-A` and `extreme-B` |
| SC-003 (zero fabrication) | `Fact Claim.prose_span` + `Quote.attribution_clarity` + `Story Card.actor` integrity |
| SC-004 (cold-open is a real story) | `Beat.cold-open.prose_span` + `Story Card` choice |
| SC-005 (reader can name both poles) | Reader panel + `Beat` structure |
| SC-006 (build passes) | Docusaurus build log |
| SC-007 (curriculum preserved) | `Beat.bridge.prose_span` + `Beat.cta.prose_span` |
| SC-008 (verified origin beats retained) | `Beat.cold-open.mandatory_beats` + `Quote Q-Karpathy-2025-02-02` |
| SC-009 (pacing rule) | Pacing contract; paragraph-by-paragraph classification |
| SC-010 (terminology visible) | Glossary audit (writer-implemented) |
| SC-011 (engagement signal) | Reader panel |
| SC-012 (sources complete) | `Source.url` navigation check + consolidated Sources section |
| SC-013 (mandatory retained facts preserved) | Per-Fact Mapping Table |
| SC-014 (per-fact traceability) | Per-Fact Mapping Table |