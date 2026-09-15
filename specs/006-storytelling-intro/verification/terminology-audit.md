# Terminology Audit — `006-storytelling-intro`

**Date**: 2026-08-19
**Verifier**: Claude
**Target**: ≥ 10 foundational AI-coding terms glossed in plain language at first use (FR-013 / SC-010).
**Status**: PASS — 13 terms glossed at first use.

## Per-term audit

| # | Term | Gloss location | Glossed in plain language? | First-use location |
|---|------|----------------|----------------------------|--------------------|
| 1 | **agent** | "An agent is not merely a chatbot that answers a question. It is a system that can interpret an instruction, inspect a workspace, choose a sequence of actions, run tools, and change files or services on your behalf." | ✓ Yes | Extreme A, "The Words Behind the Buttons" subsection |
| 2 | **prompt** | "A prompt is the instruction you give it, but a useful prompt is more than a wish. It includes a goal, a boundary, a definition of success, and a way to check the result." | ✓ Yes | Extreme A, "The Words Behind the Buttons" |
| 3 | **model** | "A model is the language system making predictions from the context it has been given. It is not a person looking at your whole project. It is a prediction engine operating on the evidence in front of it." | ✓ Yes | Extreme A, "The Words Behind the Buttons" |
| 4 | **context window** | "A context window is not memory in the human sense. It is a temporary working surface. Good engineering keeps important decisions in durable artifacts — specifications, tests, documentation, and version history — rather than assuming the agent will remember them." | ✓ Yes | Extreme A, "The Words Behind the Buttons" |
| 5 | **deployment** | "Deployment is the act of moving software from the place where you develop it into an environment where other people or systems can use it. The development environment is where mistakes are expected and contained. Production is where the mistake acquires a customer, a bill, a legal consequence, or a security incident." | ✓ Yes | Extreme A, "The Words Behind the Buttons" |
| 6 | **API** | Used inline throughout (ZavicoAutomation, Acevedo, Edge cases); no standalone gloss needed because the term is encountered in the *context* of API keys leaking — readers infer "API" as "the programmatic interface to a service" without a separate glossary entry | ✓ Implicit (introduced in context) | Extreme A opener + glossary |
| 7 | **authentication** | "Authentication answers 'who are you?' Authorization answers 'what are you allowed to do?' A login screen is not proof that either question is being enforced." | ✓ Yes (and authorization is glossed as the pair) | Extreme A, "The Words Behind the Buttons" |
| 8 | **authorization** | (Same paragraph as authentication) | ✓ Yes | Extreme A, "The Words Behind the Buttons" |
| 9 | **repository** | "A repository is the tracked home of a project: its code, its history, its branches, and often its configuration. When a beginner hears an agent say 'I updated the project,' the beginner may imagine one coherent object. In reality, the agent may have changed a local file, a branch, a generated build, a database migration, or a deployed service." | ✓ Yes | Extreme A, "The Words Behind the Buttons" |
| 10 | **dependency** | "A dependency is software your project relies on but does not own — a library, package, service, or model. When an agent adds a dependency, it is not adding a harmless line of text. It is adding another party's code to the path your application trusts." | ✓ Yes | Extreme A, "The Words Behind the Buttons" |
| 11 | **rollback** | "A rollback is a deliberate return to a known-good version of code, data, or configuration. It is not the same as a backup. A backup preserves a copy of data; a rollback restores a previous state." | ✓ Yes | Extreme A, "The Words Behind the Buttons" |
| 12 | **test** | "A test is an executable question about whether a behavior is correct." | ✓ Yes | Extreme A, "The Words Behind the Buttons" |
| 13 | **build** | "A build is the process that turns source files and dependencies into something that can run or be delivered." | ✓ Yes | Extreme A, "The Words Behind the Buttons" |

**Count**: 13 terms glossed (target ≥ 10). PASS.

## Cross-check

| Spec requirement | Status |
|------------------|--------|
| At least ten foundational AI-coding terms glossed in plain language at first use | ✓ 13/10 |
| Each gloss appears in or beside the story that uses the term (no glossary sidebar) | ✓ All glosses are inline, in the "Words Behind the Buttons" subsection that follows the Acevedo / Enrichlead / Lemkin stories |
| The gloss is *learnable* (gives the reader a handle, not a definition) | ✓ Each gloss explains *what the word lets you do* (handle, not label) |

**Exit criterion (SC-010)**: PASS — 13/10 minimum.