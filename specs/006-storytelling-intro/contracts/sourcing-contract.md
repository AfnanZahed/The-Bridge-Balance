# Sourcing Contract — `006-storytelling-intro`

**Purpose**: specify the citation, attribution, and verification rules the rewritten Introduction MUST follow. The contract is the platform's editorial firewall — without it, a story-driven intro drifts into AI-shaped content farms and damages the platform's contract with students.

---

## 1. The rule: every claim traces to a source

Every named person, direct quote, statistic, and incident in the rewritten `edu-site/docs/intro.md` MUST trace to one of:

1. A verified entry in `research.md` §A.1–A.6 (Story Cards, Fact Claims, Quotes, Anchor Beats, Mandatory Retained Facts).
2. An inline or footnote-attributed source on first mention, with publisher + date + URL.

**There is no third category.** Anything else is a fabrication risk and is forbidden.

---

## 2. Inline citation rules

- **First mention**: every Story Card actor, every statistic, every direct quote MUST have an inline or footnote attribution on its first appearance. Format: a Markdown link to the source URL, or a numbered footnote.
- **Subsequent mentions**: a short attribution is acceptable (e.g. "Karpathy's February 2025 essay") without repeating the link.
- **Verbatim quotes**: MUST be in quotation marks with the speaker named, role/context stated, and source URL either inline or in a footnote.
- **Paraphrases**: MUST be clearly marked as paraphrase (e.g. "in his January 2026 essay, DHH wrote that…") and not placed inside quotation marks.

---

## 3. Attribution honesty

| Situation | Attribution |
|-----------|-------------|
| The actor is a real named individual (e.g. Jason Lemkin, DHH) | Use their full name + role/context |
| The actor publishes only under a handle (e.g. "anuraag", "ZavicoAutomation") | Use the handle; do NOT invent a real name |
| The story is sourced from the actor's own blog/LinkedIn/post | Attribute as the author's account ("X wrote", "in his LinkedIn post, X said") |
| The story is sourced from a major news outlet reporting on the actor | Attribute the news outlet, not the actor as the source ("according to Ars Technica, X said") |
| The story is a documented incident (e.g. Samsung's internal memo leaked via Bloomberg) | Attribute the news outlet; cite the underlying document where possible |
| The story is from a research study (e.g. USENIX '25, arXiv) | Cite the paper with author + venue + year |
| A statistic is from a survey | Cite the survey name + sample size + date |

**No invented names, handles, or quotes. No real names invented for handle-only authors.**

---

## 4. Methodology caveats

When a fact has a methodology caveat, the writer MUST honor the caveat in the prose. Specifically:

| Fact | Caveat | Required framing |
|------|--------|------------------|
| Stack Overflow Developer Survey 2025 (84% / 29% / 46%) | Self-selected sample of developer-community respondents (~49,000) | "of the 49,000 developers who responded to the 2025 Stack Overflow Developer Survey" or equivalent |
| JetBrains State of Developer Ecosystem 2025 (85% / 62%) | Skews JetBrains users | "of the ~24,500 respondents to the JetBrains 2025 State of Developer Ecosystem" |
| Stanford SCALE pilot (>25% AI plagiarism) | n=120 single course; self-report underreporting likely | "in a Stanford SCALE pilot, more than 25% admitted…" |
| GitHub Octoverse 2025 (80% new devs on Copilot week 1) | First-party platform telemetry; "use" = activation, not depth | "of new developers joining GitHub, 80% activate Copilot within their first week" |
| METR (19% slower) | One study; the field is in motion | "a 2025 METR study found…" |
| Veracode GenAI (45%, 70%, 2.7×) | Veracode's test corpus; check current figures | "Veracode's 2025 GenAI Code Security Report" |
| LinkedIn Workforce Report (10% → 50% AI/ML roles) | First-party platform | "LinkedIn's 2025 Workforce Report" |
| S&P Global AI Strategy Insights (57% hiring managers) | Survey of HR / hiring managers | "of the hiring managers surveyed by S&P Global in early 2026" |

When a fact does NOT have a known caveat, the writer may attribute it more compactly (e.g. "Karpathy wrote in February 2025…").

---

## 5. Source discipline

The consolidated Sources section at the end of the rewritten page MUST:

- List every source used inline, in the order they first appear (or grouped by section if clearer).
- Include publisher, date, and URL for each.
- Group by section if it helps scanability (e.g. "Sources for Extreme A — Blind Vibe Coding", "Sources for Extreme B — AI Resistance", "Sources for the Bridge and Statistics").
- Contain no dead URLs as of the ship date (SC-012).

**No orphan sources.** A source listed in the Sources section but not used inline is wasteful; a source used inline but not in the Sources section is a missing obligation.

---

## 6. What the writer must NOT do

- **Do not** fabricate a name to fill a missing actor. If the actor is unknown, say "an unnamed developer" and attribute the source.
- **Do not** invent a quote. If a verbatim quote is not available, paraphrase clearly.
- **Do not** modernize dates. If a story is from 2023, the prose says 2023.
- **Do not** lift a number from a different survey to fill a missing data point.
- **Do not** use "(per Reddit)" or "(per Hacker News)" without a specific thread URL. Anonymous social-media claims are not citable.
- **Do not** generalize one verified case into a sweeping claim. If the story is one engineer's experience, the prose says "one engineer" or "an engineer", not "all engineers".

---

## 7. The fact-check pass (during implementation)

A dedicated **fact-check pass** MUST be performed between the draft pass and the pacing-review pass (see `quickstart.md`). Its inputs:

- The Per-Fact Mapping Table (data-model.md §6).
- The Story Card inventory from research.md §A.1, §A.2.
- The Source list (research.md §A.5 anchor beats + Spec §A.3 stat pool + §A.4 quote pool).

Its outputs:

- A pass/fail audit of every named person, direct quote, statistic, and incident.
- A revised Per-Fact Mapping Table with `verified_by` initials and `date_verified`.
- A flag list for any claim that could not be verified; the writer either cuts the claim or attributes the uncertainty explicitly in the prose.

The fact-check pass is the gate to the pacing-review pass. A draft that has unverified claims cannot proceed.

---

## 8. Verifiability-tier rules (recap from research.md R-004)

- **News-covered** (e.g. Samsung ban, Stack Overflow ban, Lemkin's Replit incident): high-confidence prose; the writer can summarize freely.
- **First-person** (e.g. Martone, Miyahira, Morhous, Thomas, ZavicoAutomation): the writer MUST attribute as the author's own account; cannot assert as audited fact.
- **Academic** (e.g. USENIX '25 hallucinated-packages paper, MS/CMU study, Stanford SCALE pilot): high-confidence; the writer may quote findings and cite the paper.
- **Unverified-flag**: anything in this tier MUST be cut or, if retained, surrounded by explicit "as reported" or "according to X" hedging.

---

## 9. Cross-references

- The Research Pool (research.md §A.1–A.6) is the canonical list of citable material.
- The Per-Fact Mapping Table (data-model.md §6) is the implementation deliverable that proves SC-013 / SC-014.
- The Content Contract (`content-contract.md`) defines where the content lives.
- The Pacing Contract (`pacing-contract.md`) governs how the prose feels; this Sourcing Contract governs what the prose claims.