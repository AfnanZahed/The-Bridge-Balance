---
sidebar_label: "2. Programming Is Born"
sidebar_position: 11
title: "From Wires to Words: How Programming Began"
description: "How programming went from physically rewiring a machine to writing something that reads like a sentence — machine code, the first assembly language, and the compiler that made FORTRAN possible."
keywords: [machine code, assembly language, assembler, compiler, FORTRAN, ENIAC, Grace Hopper, history of programming]
chapter_state: "text-ready"
video_url: ""
scope_multiplier: 1.0
scope_reason: "Four linked beats — physical rewiring, numeric machine code, assembly's shorthand, and the first working compiler — each a real, distinct historical step the chapter needs to earn on its own, ending exactly at FORTRAN without surveying the languages that followed it."
---

# From Wires to Words: How Programming Began

The last chapter left you a machine that can hold its own instructions in memory. Nobody had yet told it what to do with them, and the way people did that at first barely resembles programming at all. This chapter walks the distance from there to something you could read as a sentence, in four steps:

- **Rewiring by hand** — what "programming" meant when it meant moving cables
- **Numbers a machine reads and a person cannot** — the first fix, and the new problem it created
- **A shorthand for those numbers** — words standing in for codes, and what that still could not do
- **A sentence a scientist could read** — the first language worth the name, and the exactness it never removed

By the end you will know why every layer above the machine exists, and why none of them made the machine any more forgiving about being wrong.

## A Machine You Rewired by Hand

Before the stored-instruction idea took hold, programming ENIAC meant something almost nobody today would recognise as programming. It meant physically rewiring the machine: plugging cables into a board by hand and setting rows of mechanical switches, one at a time, for every new calculation.

Six women — Kay McNulty, Betty Jennings, Betty Snyder, Marlyn Wescoff, Fran Bilas and Ruth Lichterman — did most of this work. Their job title, **computer**, used to mean a person who computed, long before it meant a machine. Reprogramming ENIAC for a new problem could take days of replugging cables and resetting switches, and getting a single cable wrong meant the whole calculation ran wrong, silently, until somebody caught it.

Nothing about this used words, or symbols, or anything you could read as an instruction. A plugboard and a row of switches are physical rather than symbolic — closer to setting up a machine than writing to one.

**That is the starting point of this chapter: no symbols, no language, nothing written down that reads like an instruction.** Everything that follows exists because rewiring a machine by hand, every single time, turned out to be a genuinely bad way to work.

## Numbers a Machine Reads, a Person Can't

The first fix did not remove the tedium. It moved where the tedium lived. Instead of rewiring the machine for every task, a person could write down, as plain numbers, exactly which operation the machine should perform and on what: *add these two numbers*, *store this result here*, with every operation and every location given its own numeric code. This is **machine code** — instructions written as the raw numbers a processor reads directly, with nothing translated in between.

Machine code solved the rewiring problem and created a new one just as bad. A program was a long column of numbers, and every one of them had to be exactly right. Get a single digit wrong, in the wrong position, and the machine would still run it, confidently, and do something else entirely. Reading someone else's machine code back — or your own from the week before — meant reading pure digits with no hint of what any of them meant.

At this point a program is readable to the machine and unreadable to anyone else. That gap is what the next section closes.

## A Shorthand for the Numbers

A researcher named Kathleen Booth wrote the first assembly language: short, word-like commands such as `ADD`, `LOAD` and `STORE`, standing in for the numeric codes underneath, one command per machine instruction. A second program, an **assembler**, translated those short commands back into the exact numbers the machine needed.

That second program is the move worth remembering. **Write a small program whose only job is the tedious translation, and nobody has to do that translation by hand again** — a trick every later step in this chapter reuses at greater scale.

This genuinely helped. A programmer could now read back, roughly, what a program did by reading the commands themselves rather than decoding digits. What assembly language did not fix is that each command still mapped to exactly one machine instruction, tied to one machine's own numbering. Move the program to a different machine with different codes, and someone had to rewrite every line.

Three forms, one gap closing at a time:

| Form | What a person wrote | What was still wrong with it |
|---|---|---|
| Rewiring by hand | Nothing written — cables physically plugged, switches physically set | No symbols at all; every change meant redoing the wiring from scratch |
| Machine code | A column of raw numbers, one per operation | Unreadable at a glance; one wrong digit ran silently, wrong |
| Assembly language | Short commands like `ADD`, `LOAD`, `STORE` | Readable, but still one line per machine instruction, tied to one machine |

## A Sentence a Scientist Could Read

By the mid-1950s a real cost problem had appeared, and it was not about machines. A programmer's time had become the expensive part, and writing assembly language one instruction at a time was exactly the kind of work eating it. John Backus, who went on to lead the team that fixed this, later described hand-coding for a machine as "hand-to-hand combat" with it: one instruction, one small victory, no way to fight the whole war at once.

Grace Hopper had already shown that a program could translate something closer to ordinary written notation into the numbers a machine needed, automatically. Her system worked more like a loader reusing stored routines than a full modern compiler, but the underlying idea held: a machine could do more of its own translation.

That idea reached its first widely used form in 1957, when Backus's team at IBM delivered FORTRAN, short for Formula Translation. It let a scientist write something close to ordinary algebra, such as `X = A + B * C`, and have a program called a **compiler** turn the whole thing into machine code automatically, before any of it ran. Many working programmers doubted a compiler could ever produce code fast enough to be worth using. Backus's team measured their compiled code against carefully hand-written machine code, and found it held up well enough to change most of those minds.

A line of FORTRAN reads almost like a sentence a scientist would actually write. It is not one. Every symbol in it still has to mean exactly one thing to the compiler underneath, with nothing left to guess at. **The readability changed. The exactness a machine has always demanded did not, and never will, however friendly the words on the page look.**

FORTRAN is not the only language this idea produced. It is the first one that worked well enough, and spread widely enough, to prove the whole approach was worth taking further — and taking it further, into the many languages that followed within the next decade, is exactly where this book goes next.

**Before you read on:** without looking back, name the four things a program has been, in order, across this chapter, starting with a physical arrangement of cables and switches and ending with something that reads like a sentence. For each one, say in a single phrase what a person still could not do with it, that the next form made possible.
