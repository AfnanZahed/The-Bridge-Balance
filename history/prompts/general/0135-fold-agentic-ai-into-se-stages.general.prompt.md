---
id: 0135
title: Fold agentic AI into SE stages
stage: general
date: 2026-09-22
surface: agent
model: claude-opus-5
feature: 011-curriculum-redesign
branch: none
user: Afnan Zahed
command: none
labels: ["curriculum-redesign", "stage-restructure", "agentic-ai", "pairing-types", "discussion-only"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files: []
tests: []
---

## Prompt

wait wait, stop. I am rethinked and re imagined the redesign of curriculum, we are also going to merger the last stage of Agentic AI in the stage 1, because we don't have the time first learn the SE foundations seperately, also, the implmenetation of the basics that are going to be learnt is actually the agentic ai, it is like we are going to start the functions is python, we will use the AI to learn the functions, and use the opencode in tutorials to implement the functions, to to practice the actual functions, we will apply the functions is Agentic AI paradigm (like functions in OpenAI Agents SDK). we will apply every concept and thing of the of python/javascriptm, whether in backend, frontend, database or api, or anything once in a manual thing and 1 time in AI Agent. another example than the functions, hooks, once we will learn, we will apply (learn properly and master the application) in any manual project and once in an agentic ai system. in this way, the post AI era paradigm will be satisfied properly: using AI, building foundations, building AI. becuase if we see what the Agentic AI ACTUALLY IS, it is just the same SE working with an llm, just an llm and all the other 99% engineering concepts' are traditional, no new thing. I hope I explained my concept properly. if you didn't understood, let me explain. actually, I am saying that the stage 1 and the agentic ai stage are not contradictory, they are built of each other. see this, in previous stage 1, we planned to teach this: 
- **Software architecture**: High-level system structure, application planning, architecture before coding.

- **Development environment**: Terminal / CLI, IDEs, AI coding agents, coding-agent CLIs, Cursor, Claude Code.

- **Core programming**: Python, JavaScript, variables, data types, conditionals, loops, functions, file handling, error handling.

- **Packages and project management**: PyPI, npm, pip, uv, npm / pnpm / yarn, modules, libraries, frameworks, project structure.

- **OOP and software modeling**: Classes, objects, attributes, methods, real examples.

- **Git and GitHub**: Commits, branches, pull requests, repositories, collaboration.

- **Frontend engineering**: Next.js, page structure, layouts, responsiveness, components, ShadCN / Material UI / DaisyUI.

- **UI/UX and branding**: Figma, colors, fonts, logos, visual identity, portfolio design.

- **Visual effects and deployment**: Animations, transitions, Framer Motion / GSAP, Vercel, domains.

- **Backend engineering**: APIs, HTTP, REST, backend architecture, validation, middleware, logging.

- **Authentication and authorization**: Auth basics, OAuth, role-based auth, resource-based auth.

- **Frontend-backend integration**: API calls, browser DevTools, full-stack data flow.

- **Async and realtime systems**: Background tasks, rate limiting, WebSockets, Server-Sent Events, polling.

- **Databases**: SQL vs NoSQL, PostgreSQL, MongoDB, Redis, graph databases, relationships.

In all of this, is there even ANY 1 concept which is contradictory or not useful when building AI Agents or Agentic AI systems? So, if the engineering and nature are not seperating them, then why should we? the reality is this that while we are claiming the BALANCE, but we are still biased oursleves of the 2 extremes, even though the reality is the Agentic AI IS the new SE we are trying to seperate it from SE, how can we divide the new SE with old SE, the SE is SE by it's nature, and we have to accept this that by nature, there is no new Agentic AI layers, but just an llm and it's API which is using the already developed SE, no new thing. in summary, all the Agentic AI is just stage 1 + an llm working it in. and also, a new side effect of this way will be that the understanding level of both the SE basics and Agentic AI will exponentially grow when we will merge, think how better the understanding of the OpenAI Agents SDK and python will be when we will learn the concept of function using the real functions of and working and actuall documentation of the OpenAI Agents SDK, and also when we will build our own functions both for manual thing and also for the the AI Agent, the extreme level of expertise will be achieved with lesser time than a traditional way of learning coding and agentic AI. we don't need to plan literally each and every SUB topic NOW, we will plan the learning exact learning material time to time, with 2 parameters, 1 parameter will be what should be the next actual topic /s will be in SE (previous stage 1), and the second parameter will be that what's it's equivalent in the Agentic AI/where it is being used or can be used in the Agentic AI or in building AI Agent, like I gave you the function's example. hopefully I explained well,  now this thing have to be discussed properly without any execution as of now. This WILL be a fundamental shift. also, this shift will 10x our speed of learning. starting thinking, critiquing, and critically thinking, creatively thinking and ask me a lot of questions and then we will finalize it.

## Response snapshot

Claude tested the proposal against the old Stage 1 topic list rather than arguing it in the abstract: eleven topics pair strongly with an agentic twin, three pair weakly, and two do not pair at all (UI/UX and branding; visual effects). It argued the stronger case for merging, on the ground that the difference between SE and agent engineering is only visible side by side, and then named where the owner's claim overreaches: the components of an agentic system are ordinary SE, but a system with an LLM is nondeterministic, fails in meaning rather than in mechanics, and faces prompt injection.

It flagged the costs the merge has to carry (Stage 1 growing to most of the book, what "10x" could honestly mean, the zero-knowledge floor, and SE gaps such as testing), proposed the Substrate, Surface and Practice pairing types together with a three-beat rhythm, and asked fourteen questions. No files changed.

## Outcome

- ✅ Impact: the merge proposal was pressure-tested against the actual Stage 1 topic list and converted into a structured argument with its costs, its pairing types and fourteen open questions; nothing was executed.
- 🧪 Tests: none (discussion only; no file in the repository was created or modified).
- 📁 Files: none.
- 🔁 Next prompts: the owner's answers to the fourteen questions, which decide whether Stage 1 and the agentic stage merge.
- 🧠 Reflection: ruling topic by topic on how strongly each old Stage 1 topic pairs with an agentic twin turned a philosophical claim into a testable one, and exposed the two topics (branding, visual effects) that have no twin at all.

## Evaluation notes (flywheel)

- Failure modes observed: the "balance" argument for merging was weaker than the ordering argument; building the case on the metaphor would have made it softer than it needed to be.
- Graders run and results (PASS/FAIL): none (no artifact to grade; the proposal is untested against the topic list until the owner rules).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): critique a merge proposal topic by topic against the current topic list before writing any prose about it.
