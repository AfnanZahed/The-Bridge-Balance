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
| 0004 | [Two-skill content split — chapter contract vs teaching framework](./0004-two-skill-content-split.md) | Accepted · **amended 2026-09-07** · **superseded in part by 0007** |
| 0005 | [Search experience split — home Spotlight + chapter bar on one client-side engine](./0005-search-experience-split.md) | Accepted |
| 0006 | [Beginner-first content integrity — Constitution v3.0.0](./0006-beginner-first-content-integrity.md) | Accepted |
| 0007 | [`lesson-spine-authoring` becomes Bridge Balance-specific](./0007-lesson-spine-becomes-book-specific.md) | Accepted · **migration in progress** |
| 0008 | [The chapter component palette is open](./0008-chapter-component-palette-is-open.md) | Accepted · **corrected 2026-09-20** |
| 0009 | [Owner input gates — decisions the pipeline must stop for](./0009-owner-input-gates.md) | Accepted |

An **amended** ADR is still current. The original body records what was decided at
the time and is left as written; an `## Amendment` section at the end carries what
changed since, and that section wins where the two differ.

**Superseded in part** means most of the record still holds but one clause has
been replaced by a later ADR, named in the status. Read both; the later one wins
on the clause it names and nowhere else. ADR-0004 is the current example: its
two-skill split stands, its genericness clause does not (ADR-0007).

**Migration not started** flags a decision that is accepted but not yet carried
out in the files. It is a real commitment and a real gap at the same time — the
repo does not yet match it. **Migration in progress** means the first steps have
landed and the ADR's own body says which; the repo still does not fully match
the decision.

**Corrected** means the decision stands but the record stated something false
about the world and has been fixed in place, with an `## Amendment` section
explaining what was wrong. Unlike *amended*, nothing about the decision changed
— only the record's accuracy. ADR-0008 is the current example: it asserted a
rule that had already been reversed four days earlier.

## When to write one

Test the decision against these three questions:

1. **Impact** — does it have long-term consequences (framework, data model, API, security, platform)?
2. **Alternatives** — were multiple viable options considered?
3. **Scope** — is it cross-cutting and does it influence system design?

If all three are true, write an ADR. Never auto-create — require user consent first.
