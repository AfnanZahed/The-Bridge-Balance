---
name: command-code-delegation
description: Use for any Claude Code task in this environment that involves real labor, not just judgment — implementing something, refactoring, fixing a bug, researching a topic or tradeoff, or verifying that something works. The reason this skill exists: Claude is priced like the most capable model available for every token it spends, but most of the actual labor in a task — reading a large file, drafting a first-pass change, running a check, researching across sources — doesn't need that level of intelligence, it needs a competent executor and a careful reviewer. This skill splits the two roles: Claude is think/reason-first (deciding what to do, catching mistakes, signing off) and DeepSeek V4.1 Flash — reached via the third-party Command Code CLI (`cmdc`) — is execution-first (the actual reading, drafting, running, researching, cheaply and in volume). Apply this cost/labor test to decide whether to trigger, not just keyword-matching: if doing a step directly would burn meaningful tokens on volume work a cheaper model could do just as well, this skill applies; skip it for a one-step lookup Claude can just answer directly, since the round-trip overhead would cost more than it saves. Before starting execution, ask the user whether they want a plan for this task and, if so, who should produce it (Claude itself, an Opus subagent, DeepSeek itself, or a plan the user already made elsewhere) — this choice is deliberately never fixed and must be asked fresh every time. Once execution starts, delegate the token-heavy steps to Command Code running DeepSeek V4.1 Flash instead of doing that work directly, then verify by reading its actual structured tool-call output rather than trusting a prose summary. Trigger for requests like "build/implement/add/fix/refactor X," "research X and tell me Y," "investigate why X happens," or "verify/check that X works" — even when the user doesn't name Command Code or DeepSeek directly — as long as the labor involved is substantial enough that the split actually pays for itself.
---

# Command Code Delegation

## The actual problem — read this before the steps, because it's also the trigger test

Here's the situation this skill responds to. A Claude Code session bills every token at whatever rate the running model costs, regardless of what that token was actually spent on. But most of what happens inside a real task isn't judgment — it's labor: reading a file to see what's in it, writing a first draft of a function, running a command and looking at what came back, searching several sources and summarizing them. None of that intrinsically requires the strongest model available. It requires *correct execution*, plus *someone competent enough to catch it if execution goes wrong*. Paying premium-model prices for the execution half of that pair is spending quality-tier money on a volume-tier task — not because Claude is bad at it, but because being good at it was never the scarce resource there.

So the fix is to stop bundling the two roles into one price tag. Split them:

- **Judgment** (deciding what a step should do, reading the result and catching mistakes, making the final call) stays with Claude — this is the part where intelligence actually changes the outcome, and it's naturally low-volume: a few decisions per task, not thousands of tokens of reading and drafting.
- **Labor** (reading, drafting, running, researching) moves to DeepSeek V4.1 Flash, reached through the third-party **Command Code** CLI — a genuinely capable model at a fraction of the per-token cost, good enough that its actual output can be checked rather than rewritten.

The short version, worth keeping in mind while working through the steps below: **Claude is think/reason-first — the value it adds is in deciding and judging, not in the volume of reading or drafting it personally does. DeepSeek via Command Code (`cmdc`) is execution-first — its value is in actually doing the reading, the drafting, the running, fast and cheap, not in being the one who decides whether the result is good.** Neither role is "better" than the other; they're suited to different halves of the same task. Using Claude for the execution half wastes its actual strength on volume; using DeepSeek for the decision half wastes trust on something that was never asked to be careful. Keep each model doing the half it's actually for.

Done well, this produces work that holds up to the standard of the strongest models available, without paying that model's price for every token the task touched — the user's own framing for this is "maximum (Opus/Fable-level) quality, minimum cost." Done badly — trusting DeepSeek's summary instead of its actual output, or delegating something trivial and eating round-trip overhead for no reason — it either loses the quality half or the cost half, and the whole point evaporates.

**This is also how to decide whether this skill applies to a given task, not just which keywords are present.** Ask: is there real labor here — enough reading, drafting, running, or researching that doing it directly would burn a meaningful number of Claude's own tokens on execution rather than judgment? If yes, this skill's pattern applies, whatever verb the user used to ask for it. If the task is small enough that a human wouldn't call it "work" — a one-line lookup, a question Claude already knows the answer to, a decision that's pure judgment with nothing to execute — delegating it adds a round trip that costs more than it saves, and the right move is to just answer directly. The skill existing doesn't mean every task should go through it; it means tasks with real labor in them should.

None of this works if Claude doesn't actually look at what DeepSeek produced — the literal diff, the literal command output — rather than either blindly trusting a one-line summary (loses the quality half) or re-reading everything itself afterward to be sure (loses the cost half). The steps below exist to make that real review possible without falling into either trap.

## Step 1 — Ask about planning, every time, before doing anything else

Planning quality determines the ceiling on output quality, and the user wants control over where that quality comes from on a per-task basis — sometimes Claude should plan inline, sometimes an Opus subagent should think it through, sometimes DeepSeek itself should draft the plan, and sometimes the user already has a plan from a completely different session with a different model and just wants it executed. There is no default. Treating any one of these as the default silently defeats the reason the user wants the choice at all.

So before starting real work on any task this skill covers, ask something like:

> "Want a plan for this first, or should I just start? If you want one: should I write it, should I spin up an Opus subagent, should DeepSeek draft it, or do you already have one from elsewhere to hand me?"

Adapt the phrasing to the task, but keep all four options on the table plus "no plan." Don't ask this more than once per task — if the user already answered for this task and you're just continuing it across turns, you already have your answer. A brand-new task gets a fresh ask, even in the same conversation.

What each answer means for you:
- **"I'll plan it" / no plan wanted** → skip straight to Step 2 with the task as given.
- **"You plan it"** → think it through yourself, inline, before moving to Step 2.
- **"Opus should plan it"** → use this session's `Agent` tool with `model: "opus"` to get a plan back, then move to Step 2. (This is the specific, per-task exception to the separate standing rule that routine background agents default to sonnet/haiku — it doesn't change that default for anything else.)
- **"DeepSeek should plan it"** → this is still a Command Code call, just with a planning prompt instead of an execution prompt (see Step 3 for the invocation shape) — read the plan back before treating it as final.
- **"Here's my plan"** → take what the user hands you as the plan and move to Step 2.

## Step 2 — Claude stays the engineer

Regardless of how Step 1 resolved, the shape of execution doesn't change: Claude breaks the task (or the plan) into concrete steps, decides what each step needs, and orchestrates. This is the part Claude should keep doing itself — it's judgment-heavy and low-volume, which is exactly what an expensive model is for.

## Step 3 — Delegate the token-heavy steps to Command Code + DeepSeek

For each step that would cost real tokens to do directly — reading and understanding a large file or several files, drafting a nontrivial change, researching a topic, running a first-pass check — call out to Command Code instead of doing it in-context:

```bash
command-code -p "<precise description of this one step>" \
  --model deepseek/deepseek-v4.1-flash \
  --effort high \
  --output-format json \
  --yolo   # only if this step needs to write files or run shell commands — see below
```

Three details here are load-bearing, not stylistic — see `references/command-code-cli.md` for the full mechanics, but at minimum:

- **Always pass `--output-format json`.** Plain text mode gives back a short prose summary and nothing else — there's nothing in it to verify against. The JSON stream carries the actual tool calls: real diffs, real command output.
- **Always pass `--effort` at the maximum level the CLI accepts for the model in use, unless there's a concrete reason a specific step doesn't need it — not just by default inattention, but by deliberately deciding effort isn't needed here.** This matters more than it might look like: DeepSeek is the cheap side of this whole arrangement, so spending more of *its* reasoning tokens is a trade that's almost always worth making — a few extra cents of DeepSeek effort buying a materially better first-pass result is still far cheaper than Claude having to catch and fix a shallow one, or worse, redo the work itself. Economizing on Claude's own tokens while also economizing on DeepSeek's effort defeats the "maximum quality" half of the goal for essentially no savings that matter. The bias should run the opposite way from how you'd think about your own token budget: max effort is the default, and dropping it takes a real reason (e.g. a trivial, mechanical, low-stakes step where more reasoning can't change the outcome) — not the absence of one.
- **`--yolo` is currently the only confirmed way to let DeepSeek actually write files or run shell commands in headless mode.** `--tools-enable` looks like a narrower alternative from its help text, but real testing showed it doesn't cover `edit_file`/`write_file`/`shell_command` at all — those stay blocked regardless, and DeepSeek was observed routing around the block via a different, ungated tool anyway when it needed to. So don't reach for `--tools-enable` expecting it to scope anything write-related; it doesn't. For a read-only step (research, analysis), skip `--yolo` entirely — nothing needs unblocking. For a step that writes, `--yolo` is the tradeoff to make consciously, which is exactly why Step 4's verification matters more than the flag: whatever path DeepSeek took to write something, you check the actual result, not the permission model.

If the task is a multi-step conversation with DeepSeek rather than one shot, reuse the session: the JSON result's `nextState.sessionId` can be passed back via `--session`/`--resume`/`-c` on the next call, so DeepSeek isn't re-discovering context (and burning tokens re-reading things) on every step.

## Step 4 — Verify from the actual trace, not the summary

The JSON stream's `tool_use`/`tool_result` events carry the real work product: `edit_file` calls show the literal `old_string`/`new_string`, `shell_command` calls show real stdout. Read *that* to confirm the step succeeded — the final `finalText` line is a one-sentence gloss and shouldn't be the basis for saying something is done. If a step touches something you'd normally double check by re-reading the file yourself, a quick targeted read is still fine — the point is to avoid re-deriving DeepSeek's work from scratch, not to never look at a file again.

**This cuts both ways — also verify when you did NOT pass `--yolo`.** A read-only step deserves the same trace check as a write step, not less: `grep -ao '"name":"[a-z_]*"' <output-file> | sort | uniq -c` immediately after any call, before trusting anything else about the run. Confirmed for real on 2026-09-16 (see `references/command-code-cli.md`): a call deliberately run without `--yolo` still had DeepSeek write two files into the project, via an ungated `powershell` tool that `--yolo`'s absence never touched. Gating one write tool is not evidence another is gated — check the trace, don't infer from the flag.

## Step 5 — Loop, and know when to go back to Step 1

If verification shows a step failed, send a corrective follow-up to the same Command Code session rather than starting over. If verification reveals the *plan* was wrong, not just one step — go back to Step 1's chosen planning source and redo that part, rather than patching around a bad plan one step at a time.

## Step 6 — Sign-off stays with Claude

Delegating the labor never delegates the approval. Anything destructive, irreversible, or in Claude Code's own explicit-permission-required category (sending messages, publishing content, purchases, deleting data, etc.) still goes through the normal confirmation flow no matter which model — DeepSeek included — proposed it.

## Worked example

> **User:** "Add a discount parameter to `total_price` in `inventory.py` and make sure it's right."
>
> **Claude:** "Want a plan for this first, or should I just go ahead? Small enough that I'd lean toward just starting, but your call — and if you want a plan, who should write it?"
>
> **User:** "Just go ahead."
>
> **Claude** (Step 2–3): runs `command-code -p "In inventory.py, add a discount parameter (percentage, default 0) to total_price and apply it to the returned total" --model deepseek/deepseek-v4.1-flash --output-format json --yolo`
>
> **Claude** (Step 4): reads the JSON stream — sees the `edit_file` call's exact before/after, sees a `shell_command` call that ran a quick sanity check (e.g. `python -c "..."`) with real output confirming the math.
>
> **Claude** (report to user): "Done — `total_price(items, discount=0)` now multiplies the total by `(1 - discount/100)`. Verified: `total_price([('x', 100, 2)], discount=10)` returns `180.0`."

This is close to a real run recorded in `evals/`, with one twist worth knowing about going in: on that run, `edit_file` was blocked even with write tools nominally enabled, and DeepSeek got the change applied through a different, ungated tool instead. Claude didn't need to notice or care *which* tool DeepSeek used — Step 4's read of the actual trace confirmed the real edit and the real verification output regardless of the path it took to get there. That's the pattern to trust: not which flag was passed, but what the trace actually shows happened.

Note what didn't happen: Claude didn't re-read the whole file to double check, and didn't just relay "I added the parameter, it works" — it cited the specific verified number, because it actually looked at DeepSeek's shell output.

## If Command Code isn't available

Check `command-code status` if you're unsure it's working. If auth has lapsed or the CLI is missing/broken, don't retry blindly — fall back to doing the work directly yourself and tell the user why, so they can fix the CLI on their end if they want the delegation back.

## Reference

`references/command-code-cli.md` — confirmed flags, gotchas, and model list, from hands-on testing of this exact setup.
