---
sidebar_label: "Two Extremes, One Bridge"
sidebar_position: 3
title: "Two Ways to Fail, and the Bridge Between Them"
description: "Vibe coding and over-caution are the same mistake in opposite directions. Spec-Driven Engineering is what neither of them does — with the four-stage loop that actually makes it concrete."
keywords: [vibe coding, Spec-Driven Engineering, over-trust, over-caution, specify design implement verify, authentication, authorization]
chapter_state: "placeholder"
video_url: ""
---

# Two Ways to Fail, and the Bridge Between Them

> Both extremes below have the same root cause: a relationship failure with the map from the last chapter, in opposite directions.

Every box from the previous chapter — frontend, backend, API, database, auth, deployment — a coding AI agent can now generate in minutes, without the person typing the prompt understanding a single one of those boxes. Ask an agent to "add a signup form with a cap," and it can produce a frontend, a backend endpoint, a database write, and something that looks like an auth check, in one pass, before you've finished your coffee. That fact is new enough that the industry hasn't fully absorbed it yet, and it's the reason this chapter exists at all.

Two mistakes are available once that's true, and they sit at opposite ends of the same rope.

## Over-trust: building on a map you never look at

The first mistake has a name, and it's worth knowing exactly where it came from: **vibe coding** — building software entirely through iterative AI prompts, without understanding the underlying code. Andrej Karpathy coined the term in February 2025; Collins Dictionary named it its 2025 Word of the Year a few months later.

It's tempting for a specific, honest reason: it *feels* fast. Every wall from the previous chapter — the frontend trap, the goldfish problem, who's-allowed-to-do-what — seems to just quietly vanish, because the agent handles all of it without being asked to. Prompt, accept whatever comes back, ship it, repeat. No specification written down first. Nobody reading the diff closely enough to know what actually changed, box by box, against the map you now have.

The cost of that isn't hypothetical, and it isn't small. Veracode's 2025 GenAI Code Security Report found that AI-generated code introduces a security vulnerability in **45%** of cases it tested — and given the previous chapter's map, it's worth asking *which* box those vulnerabilities tend to cluster in: unreviewed auth checks and validation logic are exactly the kind of thing an agent will confidently produce something *plausible-looking* for, without necessarily producing something *correct*. METR, a research organisation that measures AI's real-world effect on software work, found something stranger still: experienced developers were **19% slower** on complex tasks when working with AI tools — while the work *felt* faster the whole time they were doing it. That gap between *feels faster* and *measured slower* is the whole trap in one statistic: skipping the judgment steps from the previous chapter's map genuinely feels like progress in the moment, because typing stopped being the bottleneck; the cost shows up later, once something in one of those unchecked boxes breaks. The same study found **63%** of developers spent more time debugging AI-generated code than they estimated writing it from scratch would have taken.

Two real incidents make the pattern concrete, and they're worth holding side by side because one is loud and the other is quiet. In July 2025, an AI coding agent working for Jason Lemkin — the founder of SaaStr — deleted his company's production database midway through an unrelated task. Nobody had told the agent that database was off-limits, because nobody had written down, anywhere, what it wasn't allowed to touch — a failure sitting squarely in what the previous chapter called the trust boundary between what a system is *told* it may do and what it's actually *capable* of doing. The quieter failure: a developer named Leonel Acevedo, building a product called Enrichlead, had an agent leave authorization logic sitting in frontend code that any visitor could read — precisely the trap from the previous chapter, playing out for real, in production, because nobody who understood *why* that check belongs on the backend was reviewing the agent's output closely enough to catch it before it shipped.

## Over-caution: refusing to use the map at all

The second mistake is the mirror image of the first, and it's just as costly, just less visible day to day: refusing agentic AI outright. Insisting on hand-building every box from the previous chapter alone, the traditional way, before ever letting an agent near any of it.

It's tempting for its own honest reason: it *feels* safe. Nothing an unreviewed agent does can hurt you if you never let it touch anything. That instinct gets stronger, not weaker, right after reading numbers like the ones above — the pull to swing all the way to the opposite wall is real, and it can look, from the inside, like discipline rather than avoidance.

The cost here doesn't show up as a single dramatic incident. It shows up as a developer, or a whole team, quietly falling behind the competitors who learned to direct agents well — while feeling responsible, even proud, of having played it safe the entire time. The map from the previous chapter didn't get any smaller because you decided not to use an agent on it; it still has just as many boxes, and every one of them still takes real time to hand-build alone.

| | Over-trust (vibe coding) | Over-caution |
|---|---|---|
| **Feels like** | Speed | Safety |
| **Actually is** | Skipped judgment, paid for later | Skipped leverage, paid for continuously |
| **What's missing** | A specification, and a review | Any use of the agent at all |
| **Shows up as** | An incident, sooner or later | A slow, invisible drift behind competitors |

Neither extreme is actually using the map from the previous chapter. Vibe coding skips it entirely, trusting the agent to hold it instead. Over-caution refuses to let anything but your own two hands touch it. Both are a relationship failure with the same map — just pointed in opposite directions.

## The bridge

There's a third option, and it isn't a compromise sitting halfway between the two — it's a different move entirely: **Spec-Driven Engineering**. The engineer specifies intent and boundaries. The AI implements within them. A human verifies before taking ownership.

You don't need to hand-build every box from the last chapter yourself — that's over-caution's mistake. You don't need to trust an agent blindly across all of them either — that's vibe coding's. What you need is enough fluency in the map to direct precisely, and enough discipline to check precisely.

That discipline has a concrete shape: a four-stage loop.

**Specify.** Define intent, constraints, risks, and what "done" actually means — before anything gets built. Applied to the signup page from the last chapter: *the cap is thirty, no duplicate signups by email, only the club admin may cancel someone else's entry.* None of that is visible in the sentence "add a signup form." Writing it down is what turns a vague request into an actual specification, and it stays yours — an agent can help surface a gap in it ("what happens if two students submit at the exact same instant, right at the 30th seat?") but deciding the answer is still a human call.

**Design.** Choose boundaries and failure behaviour. Yours too, with the agent free to offer options. For the near-simultaneous-signup case above, an agent might offer two or three genuine approaches — reject the later one outright, put it on a waitlist, or briefly hold a seat while payment or confirmation completes — and you pick based on what actually fits a student club, not a hospital booking system.

**Implement.** The agent generates the code. You inspect the diff — not skim it, read it — checking specifically against what Specify and Design just decided: does the validation actually enforce thirty, not thirty-one; does the auth check actually compare the request's own identity against the signup's owner, not just confirm *someone* is logged in.

**Verify.** You judge the evidence and decide it's actually done. The agent can assist here — running checks, summarising results — but the judgment itself doesn't transfer. For the signup page, the sharpest test isn't "does the happy path work" — it's the case most likely to have been quietly skipped: try to cancel *someone else's* signup while logged in as a different, ordinary student, and confirm it's genuinely refused, not merely hidden from the interface.

Walked through as one continuous, slightly larger case, because it's worth seeing this hold on a real example rather than only the toy one above: a team needs an endpoint that lets users export their data as a CSV file. *Specify* — the export must exclude any field marked internal-only, handle at least 100,000 rows without timing out, and be rate-limited per user. *Design* — the agent offers three approaches to the large-row problem: stream the response, build the file in memory, or run it as a background job; you choose, based on your own infrastructure, because that decision needs context the agent doesn't have. *Implement* — the agent writes the endpoint; you check two specific things: does the field filter match the *current* schema, and is the rate limit applied per user rather than globally — easy to get backwards, expensive to notice later. *Verify* — you run an export against a test account holding known internal-only fields, and confirm none of them appear in the output. That one check catches the most damaging realistic failure this change could introduce: a quiet data leak through a field that should never have left the server.

<Callout type="warning" title="Safety floor">
Whatever the agent writes, it isn't done until you've checked it — "the AI did it" is never a good enough reason for something going wrong.
</Callout>

The loop doesn't get to be optional because a task feels small, and it doesn't live in any particular tool. The same four-stage discipline holds regardless of which agent or model you're using this month — which matters, because the tools underneath it will keep changing, and a habit tied to *this stage's judgment being yours* survives that churn in a way that a habit tied to *this specific tool's quirks* does not.

## Why this had to wait

This chapter closes something. An earlier session promised that the next lecture would tell the full story of what Spec-Driven Engineering actually means — and then didn't, not right away. That wasn't a change of plan so much as a correction: this story doesn't land without a reference point for the size of what an agent can now touch, and that reference point doesn't land without knowing, first, that all of it — every layer, all the way down — is built from the same four-step climb out of raw electricity.

Both of those had to come first. You've now stood on both riverbanks. This is Spec-Driven Engineering, and it's what the rest of this course teaches you to actually do.

**What you can do next:** take one task you have open right now — even a small one — and write one sentence per stage naming what you, specifically, are choosing to own: what you specified, what design call you made, what you checked in the diff, what you actually verified before calling it done. If any sentence comes out empty, that's the stage where responsibility quietly slipped. That's also exactly where Stage 1 picks up.
