# Lens Registry — Nine Distinct Intro Reading Paths

Each lens is assigned to exactly one cell of the 3 × 3 matrix per FR-003 and `contracts/reading-contracts.md`. Authors select their cell from this registry and consult the audience promise and one-sentence scenario sketch when drafting.

| Cell | Difficulty | Length | Lens | Audience promise | Scenario sketch |
|------|------------|--------|------|------------------|-----------------|
| C1 | beginner | summary | safety rule | "Give me one rule I can apply today." | A learner who has never shipped code needs a single, testable rule for deciding whether an AI-generated change is safe to merge. |
| C2 | beginner | balanced | everyday analogy | "Help me see the difference in plain terms." | A learner who follows analogies needs a familiar story that contrasts a useful assistant with the person who still owns the result. |
| C3 | beginner | detailed | boundary checklist | "Walk me through what to lock down." | A learner ready to follow a procedure needs an enumerated checklist of boundaries, data, failure modes, and verification steps before an agent acts. |
| C4 | intermediate | summary | decision framework | "Give me the framework in one read." | A working developer new to AI agents needs the two failure poles and the bridge between them, condensed into a paragraph they can act on this week. |
| C5 | intermediate | balanced | responsibility map | "Show me where accountability sits." | A developer shipping with AI daily needs a table that names the human responsibility and AI contribution across specify, design, implement, and verify. |
| C6 | intermediate | detailed | experiment → system | "Tell me when to stop calling it a prototype." | A developer whose prototype is gaining users, money, secrets, or durable data needs criteria for when an experiment stops being disposable and starts requiring a spec, review, and ownership. |
| C7 | advanced | summary | strategic scarcity | "Reframe where my team's time should go." | A technical leader needs the strategic reframing that intent and verification become scarce capabilities when code production becomes cheap. |
| C8 | advanced | balanced | governance + trust boundaries | "Help me reason about boundaries and risk." | A security or architecture lead needs a four-boundary analysis (environment, trust, data, apprenticeship) to assess agent authority. |
| C9 | advanced | detailed | ownership architecture | "Show me how to scale human ownership." | A staff engineer designing RAG, tool calling, or multi-agent systems needs an architectural pattern that preserves one accountable owner per system. |

## Evidence mapping (per FR-014, Q3 — canonical sources only)

The official docs are the source of truth for numbers; the canonical reader-facing source list in `edu-site/docs/intro.md` is the citation set. Authors map lens to evidence as follows:

| Cell | Primary evidence |
|------|-------------------|
| C1 | Replit / Lemkin (Ars Technica, PCMag) — capability ≠ accountability |
| C2 | Karpathy origin of "vibe coding"; Collins Dictionary Word of the Year 2025; Lemkin Replit; Acevedo Enrichlead |
| C3 | Lemkin Replit (environment + recovery); Acevedo Enrichlead (trust); Veracode GenAI Code Security Report (verification) |
| C4 | Lemkin Replit; Samsung; Stack Overflow Developer Survey 2025 (84% adoption / 29% trust) |
| C5 | METR study (19% slower on complex tasks; 63% debug more); Stack Overflow Developer Survey 2025; AWS research on tool sprawl |
| C6 | Stack Overflow Developer Survey 2025 (trust gap); Stanford Digital Economy Lab; Dice Tech Job Report; LinkedIn Workforce Report 2025 |
| C7 | METR; Stack Overflow Developer Survey 2025; S&P Global AI Strategy Insights January 2026; Anthropic 2026 Agentic Coding Trends Report |
| C8 | Acevedo Enrichlead (trust boundary); Samsung (data boundary); Lemkin Replit (environment boundary); Stack Overflow AI-content policy (apprenticeship) |
| C9 | Veracode GenAI Code Security Report 2025; Fortune 50 security findings (SecurityWeek/Apiiro); IBM and Cisco tech-debt spend; Deloitte State of AI 2026; EU AI Act compliance timeline 2026 |

## Author rules

1. Pick the cell that matches the author's audience and time budget.
2. Use the audience promise as the version's first paragraph (per FR-004).
3. Use the scenario sketch as the real-world situation (per FR-005).
4. Cite the primary evidence listed above; do not introduce new sources (per FR-014, Q3).
5. Close with the implied action: a one-sentence takeaway (per FR-006).
6. Reference the four curriculum stages at the appropriate depth (per FR-010).
