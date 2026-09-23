# Agentic AI inside SE — decision record, 22 September 2026

Decided by the project owner in discussion with Claude on 22 September 2026. It supersedes the four-stage structure recorded earlier the same day (CS-10: Stage 2 Credentials; Stage 3 SDE Mastery (AI-Native; Agentic AI)). Earlier decisions that still hold: the Stage → Course → Chapter → Lesson → Part hierarchy, parallel and braided learning, a Course as a difficulty band inside a stage, and learning-first naming.

## The idea

Agentic AI is not a separate discipline. It is software engineering with an LLM as one component; everything else in an agentic system (functions, loops, APIs, databases, auth, async work, deployment) is ordinary SE. So agentic AI is taught inside SE, not in a later stage of its own. Each SE topic is taught first and to full depth, practised in a manual project, and then, where the concept genuinely pairs, applied again inside a real agent. This serves the post-AI-era triad the book is built on: using AI, building foundations, building AI.

## Decisions

| | Decision |
|---|---|
| Direction | Agentic AI is taught inside SE, never as its own stage |
| Stage 0 | Introduction to SDE (unchanged) |
| Stage 1 | SDE Mastery (AI-Driven): basic to intermediate SE, with basic to intermediate agentic applications |
| Stage 2 | SDE Mastery (AI-Native): advanced SE, with advanced agentic applications. The old "; Agentic AI" suffix is dropped, because agentic AI now runs through both stages |
| Credentials | Not a stage. A parallel track that maps third-party credentials to what is being learned. Disabled for now; its design is postponed |
| Navigation | Happens at Course level (difficulty bands) inside each stage |
| Stage placement | The project owner decides, topic by topic at authoring time, what goes in Stage 1 and what goes in Stage 2 |
| Inside a topic | SE comes first, at full depth. An agentic application is added only where the concept genuinely pairs. When the two compete for depth, SE wins |
| Who writes the code | Both, in order: the student writes it by hand first, then builds it with a coding agent |
| Pairing types | Substrate, Surface and Practice (defined below). A main philosophy of the book's thesis |
| The one exception | The LLM itself. It is the only component with no SE ancestor, so it is taught on its own terms |
| Agents | Real, working agents from day one, never toy versions, on free providers (Groq, OpenRouter, and others the project owner researches). No paid keys, no local models |
| "Using AI" | Old Stage 3 material (coding agents such as Claude Code and opencode; prompt and context engineering) becomes Stage 1's working medium, used for both SE and agentic implementation |
| The delta | What is genuinely new once an LLM is inside a system: the same input can give different outputs; failures are wrong answers that look right, not crashes; testing means measuring many runs, not asserting one result; plain language can attack it (prompt injection); every call costs money and time. Basics in Stage 1, advanced in Stage 2, each placed where it is naturally needed |
| "10x" | Depth of understanding, from theory and practice done together, both manually and in agents. Less repetition across the book and an earlier first agent come with it |
| Scope | Building with models, not building models. ML, DL and NLP (training, fine-tuning) are out of scope, at least for now |
| Topics and sub-topics | Designed at authoring time, not now. Claude designs topics, sub-topics and technicalities; the project owner places each topic in a stage |
| The topic sketch | A very rough idea, not a plan (the owner's rule, below) |
| Where it is written | course-structure.md for the structure; thesis.md for the philosophy |

## Pairing types: Substrate, Surface, Practice

Adopted by the project owner on 22 September 2026 as a main philosophy of the book.

| Type | Meaning | Examples | How the topic is applied |
|---|---|---|---|
| Substrate | The SE concept is the machinery an agent is built from | Functions become tools; loops become the agent loop; databases become memory; authorization becomes tool permissions; async work becomes streaming | Built by hand in a manual project, then built as agent machinery |
| Surface | The SE concept is what you build around an agent | Chat interfaces; frontend-backend integration; deployment | Built by hand, then built again around an agent |
| Practice | No agentic twin exists | UI/UX, branding, Figma, logos, animation | Built by hand; AI appears only as the tool the student works with |

## The owner's rule for the topic sketch (22 September 2026)

> The values, things and topics written in this table are just a very, very rough idea, not a fixed plan. Everything will be researched, adjusted, updated and redesigned as needed when the time comes.

(The owner's words, lightly edited.) The sketch is not a chapter list. It fixes no chapter count and no order (locked decision D5).

## Topic sketch — a very rough idea, not a plan

| Agentic topic | SE anchor | Type | Stage 1 (rough idea) | Stage 2 (rough idea) |
|---|---|---|---|---|
| The LLM itself | none | The exception | What a model call is; tokens, context, how it fails | Choosing and routing between models |
| Prompt and context engineering | Writing specs; configuration and state | Substrate | A prompt is a spec for a model | Prompts and context under measurement |
| Tool calling | Functions, schemas, validation | Substrate | Your own functions become tools | Tool design and permissions across many agents |
| Agent loop and SDK classes | Loops, conditionals, OOP | Substrate | A loop where the model picks the next step | Long-running, durable agents |
| Handoffs, then multi-agent | Routing; queues and distributed systems | Substrate | One agent hands off to another | Many agents: concurrency, failure, cost |
| Guardrails | Validation, middleware | Substrate | Check what goes in and what comes out | Defending against prompt injection |
| Memory | Sessions, databases | Substrate | Remember one conversation | Remember across users and time |
| RAG | Databases, search, indexing | Substrate | Answer from your own documents | Measure and improve retrieval |
| Streaming | Async, SSE, WebSockets | Substrate | Stream answers to the browser | Realtime and voice agents |
| Tracing | Logging | Substrate | Read what the agent did | Production observability |
| Evals | Testing (new to the SE topic list) | Substrate | Ten examples, pass or fail | Statistical evals, judge models, evals in CI |
| Cost and limits | Rate limiting, caching, Redis | Substrate | Surviving free-tier rate limits | Budgets, caching and routing at scale |
| Security and approval | Web security, authorization | Substrate | Tools get minimum permissions; ask before acting | Agents acting for a user; sandboxing |
| MCP and skills | APIs and protocols; packages | Substrate | Use MCP servers; build a small one | Production MCP: auth, remote servers |
| Agent interfaces | Frontend; frontend-backend integration | Surface | Chat UI, streaming, tool calls on screen | — |
| Deploying apps and agents | Hosting, domains, DNS, HTTPS | Surface | Deploy a web app and an agent on a free host, on your own domain | Separate development, staging and production |
| Secrets and configuration | Environment variables | Surface | API keys in environment variables, never in code or Git | Secret managers, key rotation |
| Containers | Docker | Surface | Package an agent service in a container | Orchestration (Kubernetes) |
| CI/CD | GitHub Actions | Surface | Test and deploy on every push | Evals as a release gate |
| Cloud platforms | Compute, storage, managed databases, access control | Surface | What free-tier platforms give you | AWS, GCP or Azure fundamentals |
| Serverless | Functions as a service | Surface | An agent as a serverless function, and its time limits | Why long agent runs outgrow serverless |
| Background work | Workers, queues, scheduled jobs | Substrate | An agent that runs on a schedule | Job queues and retries for agent work |
| Scaling | Load balancing, autoscaling | Surface | — | Scaling agents under concurrency and provider rate limits |
| Infrastructure as code | Terraform and similar | Practice | — | Infrastructure described in code, written with a coding agent |
| Managed AI on the cloud | Cloud platforms | Surface | — | Hosted models and managed agent runtimes |
| Production monitoring | Metrics, uptime, alerts | Surface | — | Alerts on agent failures, latency and spend |
| Coding agents | Development environment | The medium | The hands for everything | Coding agents inside pipelines |

## Open, not decided (22 September 2026)

1. The zero-knowledge floor is worded "Stages 0–2". Under the new numbering that would include the advanced Stage 2. Claude recommends "Stages 0–1". Waiting on the project owner.
2. Reader-facing promises of CS50 and Harvard credentials while the Credentials track is disabled. Postponed together with the Credentials design.
3. Proposed by Claude, not yet ruled on: every Substrate and Surface pairing names its delta; SDK-specific code sits in its own short Part so it can be re-recorded when the SDK changes.
