# Content Contract — `006-storytelling-intro`

**Scope**: the rewritten `edu-site/docs/intro.md` Introduction.
**Purpose**: specify the *observable* content surface — what paragraphs/sections MUST exist, in what order, with what shape. The Docusaurus rendering, MDX components, and CSS are governed by `navigation-contract.md`; the dopamine shape of the prose is governed by `pacing-contract.md`; the citation discipline is governed by `sourcing-contract.md`. This file is the structural contract only.

---

## 1. Page identity

| Field | Value |
|-------|-------|
| File | `edu-site/docs/intro.md` (single file, in-place rewrite) |
| Docusaurus `sidebar_label` | `"Introduction"` (unchanged) |
| Docusaurus `sidebar_position` | `0` (unchanged; this is the first item in the sidebar) |
| Docusaurus `title` | may be sharpened; the candidate is `"Introduction — Why This Book Exists"` or `"Introduction: The Bridge Between Code and Engineering"`. Whichever is chosen, it MUST reflect the new story. |
| Docusaurus `description` | may be sharpened; candidate: `"A 30-minute story of how AI coding agents split the industry into two extremes — and the bridge between them."` |
| Frontmatter state | `chapter_state: "video-published"` is acceptable; `text-ready` is also acceptable; `placeholder` is not. The Introduction ships text-first per Constitution III. |
| Route | `/intro` (unchanged; Docusaurus auto-generates) |

---

## 2. Six-beat structural spine (FR-008)

The Introduction MUST contain the following six beats, in this order, with the minimum word budgets below. No other top-level ordering is acceptable.

| # | Beat | Min words | Required contents |
|---|------|-----------|-------------------|
| 1 | **Cold open** | 400 | A real, dated, named (or handle-attributed) actor's story, opening the section with a scene. No opening statistic. Within the first ~120 words, a question or curiosity gap is opened that the doc later answers. |
| 2 | **Extreme A — blind vibe coding** | 2,500 | ≥ 2 distinct verified Story Cards from research.md A.1 (A1, A3, A4, A6, A7 are the most usable); ≥ 4 mandatory retained facts from spec Appendix A.6 rows 1–10 (METR, 63%, vibe coding hangover, Veracode 45%, Veracode Java 70%, Veracode 2.7×, Veracode credentials, Fortune 50, IBM/Cisco, 75%); a section ending that pivots to Extreme B (no recap). |
| 3 | **Extreme B — AI resistance** | 2,500 | ≥ 2 distinct verified Story Cards from research.md A.2 (B2 DHH arc, B4 senior-dev coalition, B5 Martone, B7 university bans are the most usable); ≥ 4 mandatory retained facts from spec Appendix A.6 rows 11–19 (March 2026 30+ models, SO 84%/29%/49k, AWS 40% less/2× defects, entry-level -40%, big tech -50%, 22–25 -20%, 57% hiring managers, AI/ML 10→50%, architect +50%); the empathy clause (no mocking); a section ending that pivots to the shared trap. |
| 4 | **Shared trap** | 600 | The framing that both extremes share the same root (abdication of judgment); the "Specification Poverty" term is named and defined in one sentence. |
| 5 | **Bridge — Spec-Driven Engineering** | 600 | The bridge discipline is named; the four stages (Stage 1 Foundations → Stage 2 CS50 Certification → Stage 3 Mastering AI Coding Agents → Stage 4 Engineering Autonomous AI Agents) appear; the "engineer who directs AI systems" promise sentence is preserved. |
| 6 | **CTA** | 400 | The "Who this is for / start here" guidance (scanable — table or mini-list preserved); the Stage-1 link to `/stage-01-spec-aware-vibe-engineering/`; the consolidated Sources section. |

**Sum of minimums**: 6,800 words. Total target band: **6,800–7,600 words** (SC-001).

---

## 3. Mandatory retained facts (SC-013)

All 24 facts in spec Appendix A.6 MUST appear in the new prose at or above the per-fact minimum word budget. See `research.md` §A.6 for the table.

Implementation delivers a Per-Fact Mapping Table (see `data-model.md` §6). Each row of the mapping table MUST have a populated `prose_span`.

---

## 4. Anchor beats (SC-008)

The following dated, named beats MUST appear with their dates correct:

- **Karpathy coins "vibe coding"** — February 2, 2025.
- **Stack Overflow bans generative-AI content** — December 5, 2022 (permanent 2023).
- **Samsung bans AI on company devices** — effective May 1, 2023.
- **DHH's "I'd retire" essay** — May 2025.
- **DHH's "promoting AI agents" essay** — January 2026.
- **DHH's Pragmatic Engineer interview** — April 2026.
- **JetBrains State of Developer Ecosystem 2025 published** — October 15, 2025.
- **GitHub Octoverse 2025 published** — October 28, 2025.
- **Stanford SCALE pilot** — July 8, 2025.
- **MIT Technology Review "What is vibe coding, exactly?"** — April 16, 2025.
- **Microsoft / Carnegie Mellon critical-thinking study** — 2025.
- **Stack Overflow trust-vs-use paradox** — 2025.
- **Collins Dictionary "vibe coding" Word of the Year** — November 2025.

---

## 5. Scanability blocks preserved

The following scanability aids (from the current `intro.md`) MUST remain in some form. They are functional, not decorative; removing them damages the page's role as a curriculum on-ramp.

| Block | Treatment | Where |
|-------|-----------|-------|
| **Who-this-is-for table** (new | comfortable with code | shipping agents → start here) | Preserved as a table OR as a mini-list. Stage 1 / 3 / 4 entries are unchanged. | Beat 6 (CTA) |
| **Four-stage syllabus block** (Stage 1 / 2 / 3 / 4 with focus + outcome) | Preserved as a table OR as inline prose narrative. The four stages MUST appear; the format may evolve from table to prose-list as long as all four are clearly named. | Beat 5 (Bridge) |
| **Stage-1 link** (`/stage-01-spec-aware-vibe-engineering/`) | Preserved verbatim as the CTA target. | Beat 6 (CTA) |
| **The Promise sentence** ("By the end of this curriculum, you will not be 'a developer who uses AI tools.' You will be an engineer who directs AI systems…") | Preserved with sharpened language. The "engineer who directs AI systems" wording is canonical and must survive. | Beat 5 (Bridge) |
| **Final rallying line** ("The bridge is built on specifications. The crossing is yours.") | May be sharpened. The core image (bridge / crossing / specifications) is preserved. | Beat 6 (CTA) |

---

## 6. Reading-time badge (FR-014)

A meta line MUST be visible near the title or sidebar:

```
30 min read · ~7,200 words · updated {YYYY-MM-DD}
```

Format: a single line; the word figure is approximate (±200) and the date is the day the page was last meaningfully updated (i.e. the implementation ship date).

---

## 7. Out-of-page scope (do NOT add)

- **No new page** anywhere in `edu-site/docs/`. The rewrite is one file.
- **No images, infographics, illustrations, or videos.**
- **No audio / podcast / embed.**
- **No translations.** This is the English source.
- **No new sidebar entries.** `intro.md` keeps `sidebar_position: 0`; nothing else moves.

---

## 8. What "complete" means at ship

The page is ship-ready when **all** of the following are true (these become part of the implementation's Definition of Done):

- Body word count is 6,800–7,600.
- All 24 mandatory retained facts appear at or above their minimum budgets.
- All 13 anchor beats are present and dated correctly.
- The four stages, who-this-is-for, the Stage-1 link, and the Promise sentence are preserved.
- Both extremes are dramatized with ≥ 2 distinct verified Story Cards each.
- The empathy clause holds: no pole is mocked.
- The Sources section is complete, with publisher + date + URL for every cited source.
- `cd edu-site && npm run build` exits 0.
- The Per-Fact Mapping Table ships as a side artifact (in `specs/006-storytelling-intro/verification/`).
- Reader panel (n ≥ 5) ≥ 80% can name both extremes + the bridge thesis (SC-005).