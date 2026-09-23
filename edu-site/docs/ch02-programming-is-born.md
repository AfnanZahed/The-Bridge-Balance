---
sidebar_label: "2. How People Told a Machine What to Do"
sidebar_position: 11
title: "From Wires to Words: How Programming Began"
description: "How telling a computer what to do went from physically plugging in cables to writing something that reads like a sentence — machine code, the first assembly language, and the compiler that made FORTRAN possible."
keywords: [machine code, assembly language, assembler, compiler, FORTRAN, ENIAC, Grace Hopper, history of programming]
chapter_state: "text-ready"
video_url: ""
scope_multiplier: 1.0
scope_reason: "Four linked beats — physical rewiring, numeric machine code, assembly's shorthand, and the first working compiler — carried by one everyday example running the length of the chapter, ending exactly at FORTRAN without surveying the languages that followed it."
---

# From Wires to Words: How Programming Began

Good — you have a machine. [The last chapter](/ch01-foundations) left you with one that can hold its own instructions in memory, and nobody had yet told it what to do with them. This chapter is about the people who first tried, and how badly it went before it went well.

We will cover four steps, each one solving the problem the step before it created:

- **Programming by plugging in cables.** Worth seeing, because it shows what the word "programming" had to be invented *away from*.
- **Writing instructions as plain numbers.** The first real fix — and it made programs unreadable to humans.
- **Short words standing in for those numbers.** A small idea with enormous consequences, which you will meet again in every later stage.
- **Something a person could read as a sentence.** The first true programming language, and the thing it never made any easier.

Why this matters to you specifically: every tool you will use later in this book — every editor, every language, every AI coding assistant — exists somewhere on this ladder. Knowing which rung each one sits on is how you judge what it can and cannot do for you.

One thing to carry with you first.

## A Helper Who Does Exactly What You Say

Imagine a helper who will do absolutely anything you ask, tirelessly, at enormous speed — and who has **no judgment whatsoever**.

Ask them to fetch milk from the shop and they will. Ask them to fetch milk from the shop, and say the shop is left when it is actually right, and they will walk left until they reach the sea. They will not stop. They will not wonder. They were told left.

**That helper is a computer**, and every step in this chapter is somebody trying to find a less painful way to talk to them. The speed is real. The absence of judgment never goes away — not in this chapter, and not in the last chapter of this book.

Keep the helper in mind. We are about to watch four generations of people work out how to give them directions.

## When Programming Meant Moving Cables

Before the stored-instruction idea took hold, telling a machine what to do meant something almost nobody today would call programming. It meant **physically rewiring it**: plugging cables into a board by hand and setting rows of switches, one at a time, for every new calculation.

On ENIAC — one of the first large electronic computers — six women did most of this work: Kay McNulty, Betty Jennings, Betty Snyder, Marlyn Wescoff, Fran Bilas and Ruth Lichterman. Their job title was **computer**. That word meant *a person who computes* long before it meant a machine.

Setting the machine up for a new problem could take days of replugging cables and resetting switches. And it had exactly the property our helper has: get one cable wrong, and the whole calculation ran wrong, confidently, silently, until somebody noticed.

Notice what is missing here. There are no words. No symbols. Nothing written down that reads like an instruction at all. This is closer to *assembling* a machine than *writing* to one.

**That is where this chapter starts: no language of any kind.** Everything that follows exists because rewiring a machine by hand, every single time, turned out to be a genuinely terrible way to live.

## Writing the Instructions as Numbers

The first fix did not remove the tedium. It moved it somewhere more useful.

Instead of rewiring the machine for each task, a person could now write down what they wanted as **plain numbers**: one number meaning *add*, another meaning *store this here*, each one standing for an operation or a location. The machine read the numbers and did them, in order. This is **machine code** — instructions written as the raw numbers a processor reads directly, with nothing in between.

This was a real advance. It was also, for a human being, miserable.

A program was now a long column of numbers, and every single one had to be exactly right. Go back to our helper: you are now giving directions entirely in numeric codes, and one mistyped digit does not produce an error. It produces a confident walk into the sea.

And reading it back was worse. Your own program from last week was a page of digits with nothing to tell you what any of it was for. Somebody else's was hopeless.

So the gap is clear: **the machine can read this perfectly and a person can barely read it at all.** That is what the next step closes.

## Short Words Instead of Numbers

A researcher called Kathleen Booth wrote the first **assembly language** — short, word-like commands standing in for the numeric codes underneath. `ADD`. `LOAD`. `STORE`. One command for one machine instruction.

Then she did the thing that actually matters. She wrote a second program, an **assembler**, whose only job was to translate those short commands back into the exact numbers the machine needed.

Stop on that, because it is the most reusable idea in this chapter:

> **Write a small program whose only job is the boring translation — and nobody ever has to do that translation by hand again.**

Every remaining step in this chapter is that same trick, applied at a larger scale. So is a great deal of what you will meet in Stages 1 and 2.

Assembly language genuinely helped. A programmer could now read a program back and roughly see what it did, from the words themselves. But it did not fix everything: each command still matched exactly one machine instruction, in one particular machine's own numbering. Move that program to a different machine and somebody had to rewrite every line of it.

Here is the whole distance so far:

| What a person wrote | What it looked like | What was still wrong |
|---|---|---|
| Nothing — cables and switches | Physical plugs, set by hand | No symbols at all; every change meant rewiring from scratch |
| Machine code | A column of raw numbers | Unreadable at a glance; one wrong digit ran silently, and wrongly |
| Assembly language | Short commands like `ADD`, `LOAD`, `STORE` | Readable — but still one line per instruction, tied to one machine |

Each row is more readable than the one above it. None of them has yet let a person write what they actually *mean*.

## Something You Could Read as a Sentence

By the mid-1950s a cost problem had appeared, and it was not about machines at all. **Programmers' time had become the expensive part**, and writing assembly one instruction at a time was exactly the kind of work eating it.

John Backus, who went on to lead the team that fixed this, later described hand-coding for a machine as "hand-to-hand combat" with it — one instruction, one small victory, no way to fight the whole war at once.

Grace Hopper had already shown something important: a program could take notation closer to ordinary writing and turn it into the numbers a machine needed, automatically. Her early system worked more like a loader pulling together stored routines than a compiler as we would recognise one now, but the idea underneath held. **A machine could do more of its own translating.**

That idea reached its first widely used form in 1957, when Backus's team at IBM delivered **FORTRAN** — short for *Formula Translation*. It let a scientist write something close to ordinary algebra:

```
X = A + B * C
```

…and a program called a **compiler** turned the whole thing into machine code automatically, before any of it ran.

Plenty of working programmers did not believe this could ever produce code fast enough to be worth using. Backus's team measured theirs against carefully hand-written machine code and found it held up well enough to change most of those minds.

### What did not change

A line of FORTRAN reads almost like a sentence a person would write. It is not one.

Every symbol in it still has to mean exactly one thing, with nothing left for the machine to guess at. Our helper is still standing there, still tireless, still fast, and still entirely without judgment. All that happened is that you can now give them directions in something closer to your own language.

**The readability changed. The exactness a machine demands did not — and it never will, however friendly the words on the page look.** That sentence is going to matter a great deal later in this book, when the thing reading your words can also write some of them back.

FORTRAN was not the last language, and it was not the only good one. It is the first that worked well enough, and spread widely enough, to prove the whole approach was worth taking further. Where it got taken next — and how quickly — is Chapter 3.

**Before you move on**, try this from memory: name the four things a program has been in this chapter, in order, starting with cables and ending with something that reads like a sentence. For each one, say in a single phrase what a person still could not do — that the next one made possible.
