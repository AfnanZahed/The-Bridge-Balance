# Architecture Decision Records (ADRs)

Significant architectural decisions for **The Bridge Balance**.

## Format

Each ADR is a single Markdown file in this directory, named `NNNN-slug.md` and follows the template in `.specify/templates/adr-template.md`.

## Index

| # | Decision | Status |
|---|---|---|
| 0001 | [Free-tier LLM choice (no OpenAI lock-in)](./0001-free-tier-llm-choice.md) | Accepted |
| 0002 | [Text-first, video-second workflow (Principle III amendment)](./0002-text-first-video-second-workflow.md) | Accepted |
| 0003 | [Scoped accent reintroduction](./0003-scoped-accent-reintroduction.md) | Accepted |
| 0004 | [Two-skill content split — chapter contract vs teaching framework](./0004-two-skill-content-split.md) | Accepted · **amended 2026-09-07** |

An **amended** ADR is still current. The original body records what was decided at
the time and is left as written; an `## Amendment` section at the end carries what
changed since, and that section wins where the two differ.

## When to write one

Test the decision against these three questions:

1. **Impact** — does it have long-term consequences (framework, data model, API, security, platform)?
2. **Alternatives** — were multiple viable options considered?
3. **Scope** — is it cross-cutting and does it influence system design?

If all three are true, write an ADR. Never auto-create — require user consent first.
