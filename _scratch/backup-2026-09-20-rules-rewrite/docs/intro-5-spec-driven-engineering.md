---
sidebar_label: "Spec-Driven Engineering"
sidebar_position: 4
title: "Two Ways to Fail, and the Bridge Between Them: Spec-Driven Engineering"
description: "Over-trust skips the judgment; over-caution skips the advantage. Spec-Driven Engineering is the discipline between them — the four-stage loop that keeps specification, design and verification with the human, and the gap that Spec-Driven Development leaves open."
keywords: [Spec-Driven Engineering, Spec-Driven Development, specification poverty, vibe coding, over-trust, over-caution, specify design implement verify, Development versus Engineering, coding agents, safety floor, METR]
chapter_state: "text-ready"
video_url: ""
scope_multiplier: 1.5
scope_reason: "the finale reconciles two opposing failure modes, a four-stage responsibility loop, the Spec-Driven Development versus Spec-Driven Engineering line and two worked examples into one arc, so it carries several interacting concepts rather than a single one."
---

# Two Ways to Fail, and the Bridge Between Them: Spec-Driven Engineering

## Read the name before the explanation

The discipline this chapter is about is called **Spec-Driven Engineering**. **Before the explanation, read the name in three parts and make a guess.**

*Spec* is short for **specification** — what you want built, written down before work starts. ***Driven* means the specification leads: the code follows it, not the other way round.** Read together, *spec-driven* predicts a workflow you can already picture. You write down what you want. The agent builds it.

So hold the guess the name has already formed: **Spec-Driven Engineering is a way of working where you write the specification first, and the agent writes the code.**

**That guess is close.** It is close enough to write down, because the part it misses is the reason this chapter exists. Hold it, and come back to it once the mechanism is on the page.

## The written order a builder cannot guess

**You met the core of this in the first chapter, *From Electricity to Programming*.** You cannot tell a machine to "make the checkout faster". You tell it to "reject a request when the account has more than 100,000 rows pending". A wish is not an instruction, because the machine cannot ask what you meant.

**The everyday version is a written order you hand a builder.** "Build me a wall" is a wish. A page that says how long, how high, what load the wall must carry, and what to do if the ground turns soft is an order. The builder works from the page.

**There is one difference between that builder and your agent, and the whole chapter turns on it.** A builder who does not understand your page stops and asks you a question. An agent does not stop. It fills the gap with something plausible, and keeps going.

## Who named this, and what it grew out of

**Spec-Driven Engineering** is this book's own name for its discipline. **There is no product by that name to install.** The practice underneath it grew out of something real and current: GitHub shipped a specification toolkit called Spec Kit in 2025, Amazon built an editor named Kiro around the same idea, and Anthropic's Claude Code supports the same way of working. In February 2026, an academic paper gave the movement a formal shape. This chapter draws a careful line between that movement and this discipline, and draws it in full below.

## The problem: speed you can feel, cost you cannot

**The evidence on AI-assisted work is stranger than the advertising.** METR, a research group that measures what AI does to real software work, ran a controlled study in 2025. Sixteen experienced developers worked on 246 real tasks from their own projects. When they were allowed to use AI tools, they took **19% longer**. Afterwards, they still believed the tools had made them about 20% faster. METR published newer data in February 2026 and now says those 2025 numbers no longer describe current tools. Keep both facts in view: the measured slowdown, and the study's own expiry date.

**That gap — a slowdown that feels like speed — is the problem this chapter is about.** It is hard to notice while it is happening, because the work that got skipped, the judging, is the work that feels least like work.

**Two mistakes come out of that gap, and they are the same mistake pointed in opposite directions.**

**Over-trust** is the first. It has a name worth knowing exactly: **vibe coding** — building software entirely through AI prompts, without understanding the underlying code. Andrej Karpathy coined the phrase in February 2025, and Collins Dictionary named it its Word of the Year for 2025. The pull toward it is honest, because it feels fast. Every wall from the architecture map seems to vanish, because the agent handles all of it without being asked. Prompt, accept whatever comes back, ship it, and repeat.

**Over-caution** is the second, and it is the mirror image. **It is refusing agentic AI outright, and hand-building every box from the architecture map alone before letting an agent near any of it.** That feels safe, and it is equally costly. Nothing an unreviewed agent does can hurt you if you never let it touch anything. The cost arrives slowly instead: a developer, or a whole team, falling behind the ones who learned to direct agents well, while feeling responsible for having played it safe.

| | Over-trust (vibe coding) | Over-caution |
|---|---|---|
| **Feels like** | Speed | Safety |
| **Actually is** | Skipped judgment, paid for later | Skipped advantage, paid for continuously |
| **What is missing** | A specification, and a review | Any use of the agent at all |
| **Shows up as** | An incident, sooner or later | A slow drift behind other teams |

**Neither extreme is using the capability well.** Over-trust skips the judgment. Over-caution skips the advantage. Both are a broken relationship with the same tool, pointed in opposite directions.

## What it actually is: four stages, with a line through them

**Strip any piece of software work to its skeleton and it moves through four stages, agent or no agent.** You **specify** what needs to happen. You **design** how it will happen. You **implement** the design. You **verify** that what you built does what you specified.

**An agent can contribute at every one of those stages.** What it cannot do is own any of them. That sentence is the discipline in miniature: **contribution is not ownership.** The claim underneath it is one sentence: AI has made implementation cheap, and engineering still decides what gets built, what may change, how failure is contained, and who owns the result.

| Stage | Human responsibility | Agent contribution |
|---|---|---|
| **Specify** | Define intent, constraints, risks and the checks that mean "done" | Ask clarifying questions, and reveal gaps you had not noticed |
| **Design** | Choose boundaries, interfaces and failure behaviour | Offer alternative approaches and draft structures |
| **Implement** | Decide what may change, and read the diff | Generate and edit the actual code |
| **Verify** | Judge the evidence, the security and the recovery plan | Run checks and summarise results |

**Read the table down the left column, because that is where the judgment sits.** At every stage the human keeps a **judgment** — defining, choosing, deciding, judging. At every stage the agent supplies **execution** — asking, offering, generating, running.

A failed check sends the work back to **Specify**, not to Implement. **When verification fails, the usual cause is that the requirement was wrong or incomplete, not that the code was mistyped.** Settling the requirement is the human's work; regenerating the code is the agent's.

The common misreading is to take the right-hand column as permission to step away. When the table says an agent contributes at Specify "by asking clarifying questions", it does not mean the agent is specifying for you. It means a well-directed agent can surface a gap in your own thinking — what should happen if the export is requested for an account with no rows? — that you then have to settle. **The contribution is a better question, not an answer you are excused from giving.**

**The same misreading appears at Design.** An agent that proposes three approaches slides into "the agent designed this" at the moment nobody notices that choosing between the three still happened. It happened without anyone consciously making the call.

### The guess, scored

**Now score the guess from the opening.** Write the specification first, then let the agent write the code — that is a real thing, and it already has a name. It is called **Spec-Driven Development** (SDD), the current movement arguing that specifications, not prompts, should govern what AI generates. It is what Spec Kit, Kiro and Claude Code are built around, and what the February 2026 paper formalises.

**So the guess described SDD.** It did not describe this chapter, and that is exactly why the last word of the title is *Engineering* rather than *Development*.

| | Spec-Driven Development (SDD) | Spec-Driven Engineering (SDE) |
|---|---|---|
| **What it is** | A workflow, adopted by tools from 2025 and formalised in a February 2026 paper | This book's wider discipline — an education, not a tool |
| **The question it answers** | How do I generate working code from a specification? | How do I learn to write a specification worth generating from? |
| **What it assumes** | An engineer who can already write a good specification | An engineer still being built, one stage at a time |
| **The relationship** | The existing, tool-adopted method | SDD's successor — not SDD renamed |

**SDD's assumption is the gap.** It assumes the person writing the specification can already write a good one, and it never teaches how that ability is built. This book gives that gap a name: **specification poverty** — the inability to write a good specification, because the engineer lacks the vocabulary, the system-design literacy and the requirements reasoning to say precisely what they mean.

**No specification format closes that gap, and no tool does either.** A tool can hold a specification; it cannot build the judgment that writes one. That judgment is what the four chapters before this one have been assembling: what a program is, what a full system is made of, where code gets written, and where an agent runs. Specification poverty is a problem for education, and this chapter says so plainly rather than promising a tool will fix it.

### Development is not Engineering

**Judgment on one side, execution on the other — that shape has a name for each half.** The judgment half is **Engineering**: specifying, bounding, verifying and owning. The execution half is **Development**: producing the syntax, the working code. On the table above, Specify, Design and Verify are Engineering. Implement is Development.

**AI has made Development cheap.** It has not made Engineering cheap, and every row of that table is the evidence. This corrects a picture many people carry into the field: competence as fast, confident typing, code appearing as proof of skill. Producing syntax quickly was never the whole job. It was the visible part.

**The hiring market is starting to price the rest.** The Dice Tech Job Report published in July 2026 analysed 7 million tech job postings in the United States. Postings with "AI" in the title rose 173% year on year in the first quarter of 2026. Postings for traditional software-development roles fell 22% over the same period. You still write code, run commands and read diffs; Implement does not disappear. The claim is narrower: the scarce part of the work moved, and it moved toward judgment.

## The smallest version that works

**Here is the loop at its smallest, on a task you already know: the club signup from the architecture map, capped at thirty seats.**

**Specify.** You write down what "done" means. The cap is thirty. No duplicate signups by email. Only the club admin may cancel someone else's entry. None of that is visible in the phrase "add a signup form". Writing it down is the judgment.

**Design.** You choose the boundaries and what happens when things collide. Two students submit at the exact same instant, with the thirtieth seat free. Does the second one get refused, put on a waitlist, or held while the first completes? An agent can offer all three. You choose, because the answer depends on what a student club actually needs.

**Implement.** The agent writes the code. You inspect the **diff** — the exact list of what changed — against what Specify and Design decided a moment ago. Does the check enforce thirty, and not thirty-one? Does cancellation compare the requester's identity with the signup's owner, or merely confirm that *someone* is logged in?

**Verify.** You judge the evidence and decide it is done. For this page, the sharpest test is not "does the happy path work". It is the case most likely to have been quietly skipped. Log in as an ordinary student, try to cancel someone else's signup, and confirm it is genuinely refused — not merely hidden on the screen.

### The same loop, with one stage cut

**Each stage fails in its own way, and each failure is quiet.**

**Specify, skipped.** You type "add a cache to this page" and nothing more. A **cache** is a stored copy of data kept close by. The agent picks the strategy, the **time to live** — how long the copy stays valid before it is refreshed — and the way the copy is cleared. All reasonable choices, none made by anyone who knew how fresh this page's data must be. Three weeks later, a student sees a price that changed an hour ago. Tracking it down lands on a time to live nobody remembers choosing, because nobody chose it.

**Design, skipped.** You ask the agent to make an endpoint handle more traffic. An **endpoint** is one address the backend answers at, and the **backend** is the part of the system that enforces rules on a machine you control. The agent proposes a **queue** — a waiting line that holds requests until the backend is ready. The queue works. Nobody asked what happens if the queue itself goes down, because the conversation where a human decides what failure looks like never happened. The code is fine. The failure mode nobody chose is not.

**Implement, over-delegated.** The agent returns a large diff, and you accept it because reading it fully would take longer than the task felt like it deserved. This is where the felt speed of the tool quietly becomes a slower cleanup later.

**Verify, treated as optional.** The code runs, the obvious case works, and the change ships. Verify is the first stage cut when time runs short, and the worst one to cut, because it is the only stage nothing else in the loop replaces.

## Two changes, run through the loop

### The CSV export

Your team needs an endpoint that lets users export their data as a **CSV** file — a plain text file, one line per row of data.

*Specify.* The export must leave out any field marked internal-only in the **schema** — the written list of every field the data holds — must handle at least 100,000 rows without timing out, and must be **rate-limited** — capped in how often one user may call it — so it cannot be used to scrape the whole dataset.

*Design.* **You ask for two or three ways to handle the large row count: stream the response as it is built, hold the whole file in memory, or run it as a background job with a download link.** The agent offers real trade-offs. You choose, because the choice rests on your traffic and your infrastructure.

*Implement.* **The agent writes the endpoint.** You check two specific things: does the field filter match the *current* schema, and is the rate limit counted per user rather than globally? Both are common to get backwards, and expensive to notice later.

*Verify.* **You run an export against a test account holding known internal-only fields and confirm none of them appear in the output.** That one check catches the most damaging realistic failure here: a quiet leak of a field that should never have left the server.

### A refactor that passes every test

**The CSV export leaned on Specify and Implement.** This one puts the weight on Verify.

Your team's agent-assisted refactor of a **payment-processing function** — the code that moves money for one order — passes every existing test, and the diff reads cleanly. **No red flags.**

**The trap is treating "passes every existing test" as the same thing as "verified".** It is not, and the gap is exactly where responsibility stays yours: **existing tests check existing behaviour, not the risk this change introduced.** The real verify step asks what could go wrong that the current tests would not catch. For a payment function, that question is usually about partial failure — a network timeout halfway through a multi-step transaction, or a duplicate submission from someone who clicked twice.

**Writing that one extra test, aimed at the risk *this* change introduces, is the verify-stage judgment no amount of assistance replaces.** Deciding which failure mode matters most, for this change, is the context-dependent call that stays on the human side of the line.

<Callout type="warning" title="Safety floor">
An agent's output is not yours to merge until you have checked it against the specification you wrote. Ownership does not transfer because the agent finished, and "the agent generated it" is not an acceptable reason for something going wrong.
</Callout>

## Where this sits, and what breaks without it

**The chapters before this one each handed you a rung: what a program is, the map of a real system, the editor code gets written in, and the terminal where agents run.** This chapter is not a fifth rung. It is the discipline that decides who owns each rung once an agent can climb it for you. It sits upstream of every tool you have met, and it belongs to a different layer than any of them. This chapter sits ahead of **Stage 1**, and it names the discipline Stage 1 starts to build.

**When the loop fails, the damage starts wherever the skipped judgment was and spreads from there.** A skipped Verify on the export leaks a column that should have stayed on the server. A skipped Specify on the cache shows a student a price that is no longer true. The **blast radius** — how much can break, and how far the damage reaches — is not the code itself. It is everything the code was trusted to protect.

### When you are the reviewer, not the author

**Reviewing someone else's agent-assisted change, the instinct is to read the code.** That is the wrong first move, because the code is the one part of the loop an agent is genuinely good at. Review the stages the author was supposed to own. Three questions, in order, before the first line of the diff:

1. **What was specified?** If the **pull request** — the formal proposal to merge a change — cannot say what the change was supposed to do, in the author's own words, then Specify did not happen, and no amount of code reading will recover it.
2. **What design choice was made, and by whom?** If a queue, a cache or a data structure appeared with no sentence explaining why that one, someone let the agent's first suggestion stand in for a decision.
3. **What was verified, specifically?** Not "the tests pass". Which failure mode did the author decide mattered most here, and what evidence do they have that it does not occur?

**When all three answers are present, the code review can be quick.** When any is missing, that missing answer is the review comment, and it is more useful than anything you would have found reading line by line.

## What it costs

Skipping the loop is not free, and the price is measured.

- Veracode's 2025 GenAI Code Security Report tested code from more than 100 AI models across 80 coding tasks. It found a security vulnerability in 45% of the samples it tested. A verification step that misses one of those is a costly miss.
- The 2025 Stack Overflow developer survey found that 84% of developers use or plan to use AI tools, while only 29% trust the accuracy of what those tools produce — down from 40% the year before. The field adopted the tool and lost trust in it in the same year.
- METR's 2025 study measured a 19% slowdown where the developers felt a speed-up, and METR's own February 2026 update says those numbers no longer reflect current tools.

**Those figures describe where AI tools sat when they were measured.** They are not a permanent ceiling, and treating them as one would be its own version of over-caution.

**The cost of the loop itself is small and paid early: a few minutes to write down what "done" means, before the agent starts.** The cost of skipping it is paid late, in debugging, in incidents, and in the hours spent working out what a finished change was even supposed to do.

## When to reach for it, and when it fails

**Reach for the four-stage loop on every change an agent touches.** The rule is not "run it for the important changes". The rule is: know, for this change, which stage you are keeping and why.

**The obvious choice is wrong in one place, and it is the small task.** A change that feels too small to specify is exactly where the loop slips, because the felt speed of a small task hides the same missing judgment that a large one would expose. The loop is not optional because a task feels small.

**The failure has early symptoms, and they are quiet.** You cannot say what a change was supposed to do. A diff is bigger than the request that produced it. Nobody can name which failure mode was checked. Each symptom is cheap to notice at the time and expensive to find later.

**There is also a limit built into the written order itself.** It works only if you accept that nothing will stop and ask you to fill the gap. Your agent will not stop. Silence from an agent is not agreement with your unstated intent.

## Where the idea comes from, and who to read next

**The shorter sibling came first.** GitHub's Spec Kit launched in 2025 with a sentence worth keeping: "we're moving from 'code is the source of truth' to 'intent is the source of truth'." Amazon's Kiro and Anthropic's Claude Code followed with their own versions of the same workflow. In February 2026, the paper *Spec-Driven Development: From Code to Contract in the Age of AI Coding Assistants* gave the movement its academic form.

**The live disagreement is whether tooling alone can close the gap.** SDD's position is that a better specification format, held by a better workflow, gets most of the way. This book's position is that it cannot, because no format writes the specification for you. The ability to write a good one comes from an education in system thinking, not from a format. That disagreement is not settled, and watching it is more useful than picking a side this early.

**To follow it: METR's study pages, for measured effects rather than opinions; the Spec Kit project, for the workflow as a working tool; and the February 2026 paper, for the argument in full.**

## Before you turn the page

**Without looking back, name the four stages of the loop.** For each one, say in a sentence what the human keeps and what the agent contributes. Then answer the question the opening guess was really testing. A colleague says their agent "did the whole feature, so the engineering is done". Which stage did they hand over, and which three do they still owe?

**Next:** Stage 1 begins with architecture before code, and it hands you the tools for every box on the architecture map from the second chapter — now that you know who owns each one.
