---
sidebar_label: "0. Introduction"
sidebar_position: 9
title: "Introduction to Stage 0"
description: "What Stage 0 covers, what you will be able to do at the end of it, and why the whole stage runs in date order before a single line of code."
keywords: [stage 0, introduction, how computers work, computing history, spec-driven engineering, coding agent]
chapter_state: "text-ready"
video_url: ""
scope_multiplier: 0.7
scope_reason: "The stage's own welcome and nothing more: what it covers, grouped the way it is actually organised, what you will be able to do at the end of it, what it costs (nothing), and why it comes first. No period is taught, no demonstration is carried, and no later chapter's material is pre-empted, so it is deliberately the shortest thing in the stage."
---

# Introduction to Stage 0

Welcome to the first of three stages, **where you'll build a solid foundation in how a computer actually works**, including:

- **The Machine**
  - What is actually switching inside a computer, and how did two states turn out to be enough?
  - How did a machine learn to hold a number and take an instruction, instead of being rewired for every job?

- **Languages, and Why One Was Never Enough**
  - How instructions stopped being physical wiring and became something you can write.
  - Why every new kind of job pulled a new language into existence.

- **Sharing a Machine**
  - Where the terminal, the file and the screen came from, and what each one replaced.
  - How one machine became many machines, and how they learned to reach each other.
  - Where the web came from, and the split between what runs on your machine and what runs on someone else's.

- **The Toolbox You'll Actually Open**
  - What is on your own machine right now, and what every piece of it was built to replace.
  - The six command lines that look alike and are not the same thing.

- **The AI, and the Workflow:**
  - The long road AI research took before it reached ordinary programming.
  - [*Spec-Driven Engineering*](/glossary#spec-driven-engineering) — the workflow the rest of this book builds on. State what you want and what can't change, then check the result: *Specify* → *Design* → *Implement* → *Verify*. The last chapter of this stage teaches it in full.

After exploring all of it, **you'll be able to say what a computer is actually doing while it runs something**. You'll also understand why every tool on it is shaped the way it is. **Nothing in this stage is code you have to write.** It is the ground that code stands on.

**Your own computer is the worked example.** By the last few chapters you'll be able to point at each tool on it, say what it is, and name what it replaced.

**There is no quiz at the end of this stage, and no certificate.** The credentials this book leads to are real ones. CS50P and CS50W are Harvard's two introduction courses, in programming and in web development. Both sit in the Credentials track rather than in a stage, and both are free to complete.

**You'll also learn why checking an AI's work can't be handed to the machine.** A [*coding agent*](/glossary#agent) — software that writes and edits code and runs commands for you — sounds exactly as confident when it is wrong as when it is right. That steadiness is the real risk, more than any single mistake it makes.

<Callout type="warning" title="Safety floor">
Whatever the agent writes, it isn't done until you have checked it. Agent output is unverified by construction, and "the agent generated it" is not an acceptable postmortem finding.
</Callout>

This stage is your essential starting point. It lays the groundwork for everything after it, and it follows the order in which computing developed. Each idea arrives after the problem that produced it. That is why nothing later in this book asks you to take an earlier idea on faith.

It is a long stage, so take your time, read the chapters in order, and come back to any of them from time to time.

**Ready? Start with [the first chapter](/ch01-foundations).** It opens on a traffic light and a telegraph key — two things that carry only a yes or a no. The question it asks is the one the whole stage begins with. What is the fewest number of states a signal needs, and what happens to them over a long wire? By the end of it you'll have a switch that can hold a number, and no way to tell it what to do with one.
