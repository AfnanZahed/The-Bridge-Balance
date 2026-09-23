# RAG over a documentation corpus: what real products do, what the evidence says, and what fits your stack

Scope: a few hundred thousand words of MDX chapters, FastAPI backend, free-tier vector DB, free/cheap LLM, and a chat surface with six modes. I'll attribute every substantive claim inline with the source and URL, then flag where the sources conflict.

One framing note before the seven sections, because it changes every downstream decision: **your corpus is small.** A few hundred thousand words is roughly 400k–500k tokens. At ~500-token chunks with ~12% overlap that is on the order of 900–1,200 chunks. At 1,024-dimensional float32 embeddings that is ~4 MB of raw vectors before index overhead. Anthropic's own guidance puts the "just put it all in the prompt" threshold at under ~200,000 tokens, and notes prompt caching cuts cost up to 90% and latency >2x (Anthropic, *Introducing Contextual Retrieval*, https://www.anthropic.com/engineering/contextual-retrieval). You are sitting just above that line — which means **the binding constraint on your system is not vector storage, it is LLM tokens and free-tier request quotas.** Hold that thought; it is the argument that decides (a) and (g).

---

## (a) What "multi-agent RAG" actually means across real shipped systems — and when the extra agents earn their cost

There are three genuinely distinct things people call multi-agent RAG, and conflating them is where most architecture debates go wrong.

**1. Orchestrator/router + narrow specialists.** A lead agent decomposes the job, dispatches subagents with their own instructions, tools and context windows, then synthesises. Anthropic's canonical statement: they draw an architectural line between *workflows* (LLMs and tools on predefined code paths) and *agents* (LLMs dynamically directing their own process), then name five composable patterns: prompt chaining, routing, parallelization, orchestrator-workers, and evaluator-optimizer (Anthropic, *Building effective agents*, https://www.anthropic.com/engineering/building-effective-agents).

**2. One retrieval pipeline parameterised by mode.** This is not, strictly, multi-agent. It is a router plus prompt/parameter variants. OpenAI's guide explicitly offers this as the cheaper alternative to adding agents: use "a single flexible base prompt that accepts policy variables… Rather than maintaining numerous individual prompts for distinct use cases" (OpenAI, *A practical guide to building agents*, https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/). Anthropic's *routing* pattern is the same idea: classify the input, then send it down a specialised path (https://www.anthropic.com/engineering/building-effective-agents).

**3. Agentic tool-use loops (single agent, iterative).** One agent with a `search` tool that can re-query, judge whether the retrieved context suffices, and loop. Anthropic's framing of agents: "LLMs using tools based on environmental feedback in a loop" (same URL). This is what most "agentic RAG" blog posts mean, and it is *not* multi-agent — it is one agent, many turns.

**The evidence that the extra agents earn their cost** is narrower than the marketing suggests.

*For:* Anthropic reports that a multi-agent research system (Opus 4 lead + Sonnet 4 subagents) outperformed single-agent Opus 4 by **90.2% on their internal research eval**, and that it "excel[s] especially for breadth-first queries that involve pursuing multiple independent directions simultaneously." Critically, their own analysis says **token usage alone explains 80% of the performance variance** on BrowseComp, with tool-call count and model choice explaining the rest — i.e. a large part of the observed gain is "spend more compute," not "have more agents" (Anthropic, *How we built our multi-agent research system*, https://www.anthropic.com/engineering/multi-agent-research-system). They also give the counter-conditions explicitly: multi-agent "burn[s] through tokens fast" — agents ~4× and multi-agent systems ~15× the tokens of chat — and it is a **bad fit for domains where agents must share the same context or where there are many dependencies between agents**, naming *most coding tasks* as an example, because "LLM agents are not yet great at coordinating and delegating to other agents in real time."

*Against, or at least heavily qualified:*

- OpenAI: "Our general recommendation is to **maximize a single agent's capabilities first.** More agents can provide intuitive separation of concepts, but can introduce additional complexity and overhead, so often a single agent with tools is sufficient." They give two concrete triggers for splitting: **complex logic** (prompts full of if/then branches) and **tool overload** — and note the issue is similarity/overlap, not count: "Some implementations successfully manage more than 15 well-defined, distinct tools while others struggle with fewer than 10 overlapping tools." (https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/)
- Cognit
