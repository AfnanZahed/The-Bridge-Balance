---
sidebar_label: "1. Foundations"
sidebar_position: 10
title: "How a Machine Learned to Hold a Number"
description: "How a two-state switch, a physical instruction you could hold in your hand, and three generations of hardware came together by the late 1940s — building the machine, before anyone had told it what to do."
keywords: [binary, Boolean logic, transistor, relay, vacuum tube, punched cards, stored program, history of computing]
chapter_state: "text-ready"
video_url: ""
scope_multiplier: 1.0
scope_reason: "Three tightly bound historical beats — two-state logic, physical instructions as objects, and hardware's three generations — each earning real texture on its own, deliberately stopping before any programming content, which belongs entirely to the next chapter."
---

# How a Machine Learned to Hold a Number

Everything in this book runs on a machine that can hold a number and act on an instruction. Neither of those was obvious, and neither arrived first. This chapter is where both get built, in three steps:

- **A switch that answers one question** — why two states beat ten, and how a circuit came to decide rather than only carry
- **An instruction you can hold in your hand** — the moment a pattern stopped living in somebody's memory and became an object
- **The same switch, three times over** — the three bodies it wore before settling into the one you are reading this on

By the end you will have a machine that can hold a number, and no way yet to tell it what to do with one. That gap is the next chapter.

## Yes, No, and Nothing In Between

A traffic light gives you exactly two real choices: stop, or go. Nobody built a light with fifty shades between red and green, because a signal's whole job is to survive being sent, not to carry every possible message. A telegraph operator worked the same way, tapping a key down a wire in one of two states: a short pulse, or a longer one. **Two states, agreed in advance, are enough to spell out anything** — a stop sign, a word, eventually a number.

Send a full-colour picture down a long wire and the colours blur at the far end as static creeps in. Send a switch that only ever reports fully on or fully off, and even a weak signal is still, unmistakably, one or the other when it arrives. That is the entire reason every computer since the 1940s runs on two states rather than ten. Not because two is simpler to build, but because two survives noise that would blur anything in between.

A system built entirely from two states is called **binary**, from the Latin *bini*, "two together." There is nothing mysterious in the choice. A switch either passes current or it does not, and the machine never has to guess which.

Long before anyone built a machine like this, a mathematician named George Boole tried something that looked, at the time, like a private hobby. He wrote true-and-false reasoning down as equations, the same way you would write ordinary arithmetic: *AND*, *OR*, *NOT*, worked out algebraically. Nobody thought it belonged anywhere near a machine.

Decades later a graduate student, Claude Shannon, noticed something Boole never could have. A switch that is only ever fully on or fully off behaves exactly like one of Boole's true-or-false values. Wire enough switches together in the right pattern, and the pattern computes a piece of Boole's logic — not roughly, but exactly. **A circuit does not only carry a signal. It can decide one.**

That is the whole of what a machine's judgment has ever been, from this first switch onward: a fixed pattern, deciding a fixed question, the instant current passes through it. Nothing about that changes later in this book, even when a machine looks like it is thinking for itself. It is exactly why everything a machine produces still gets checked by a person, all the way through to the last chapter.

A switch can decide *yes* or *no*, once. It cannot yet remember what it decided a moment ago, and nobody has told it what to decide about. The next two sections fill in both.

## Instructions You Can Hold in Your Hand

A French weaver named Joseph-Marie Jacquard solved a completely different problem and, without meaning to, invented something this book depends on. Weaving a complex pattern into cloth meant an assistant lifting the right threads by hand, thousands of times per pattern, and getting it wrong meant unpicking rows of finished work. Jacquard's loom read a chain of **punched cards** instead: a hole meant *lift this thread*, no hole meant *leave it*. Change the cards, and the same loom wove a different pattern.

That is the idea this section is actually about, and it has nothing to do with weaving. Before the cards, the pattern a machine wove lived only in a person's hands and memory. **After them, the pattern was a physical object** — something you could hand to someone else, store on a shelf, or run again next year exactly as before. An instruction had become a thing, separable from both the machine and the person who wrote it.

The same idea travelled. An English mathematician, Charles Babbage, designed a machine meant to calculate from cards the way Jacquard's loom wove from them. Working with him was Ada Lovelace, who wrote out, on paper, a full sequence of cards for a calculation the machine had never run — because nobody had built the machine. It is the first known case of instructions existing before the hardware meant to carry them out, and proof that a set of instructions is an idea you can write down and reason about on its own.

The loom and Babbage's design are both instructed by something physical and fixed: a card, punched once, read the same way every time. Neither can change its own instructions mid-run, and neither remembers anything from one run to the next. That gap — a machine that could *hold* something, rather than read it once and forget — is what the next section closes.

## One Idea, Three Bodies

The switch from the first section of this chapter has worn three different bodies. Each one did the same job, fully on or fully off, while getting smaller, faster and harder to break than the one before it. The idea never changed. Only its body did.

The first body was the **relay**: an electromagnet that physically pulls a metal contact open or shut, the same mechanism telephone exchanges had used for a century. A relay is a switch you can hear click. Early computers were built from thousands of them. They worked, and they were mechanical, so they wore out — and a physical arm takes real time to move.

The second body had no moving parts. A **vacuum tube** is a switch made of glass and a controlled beam of electrons instead of metal contacts. Tubes ran far faster than relays, with nothing to physically wear down, and failed in a different way instead: the same heat that let them work also burned them out, one at a time, among thousands. ENIAC, the machine the next chapter opens on, ran on roughly 17,000 of them, and its crew spent real time most weeks finding and replacing the ones that had failed.

The third body arrived at Bell Labs in 1947. Researchers there built a switch from a sliver of treated germanium that could do a relay's job with no moving parts and none of a tube's fragility. They called it a **transistor**. Small, solid and unlikely to burn out, it is the body this idea still wears in every computer built since — including the one you are reading this on.

Three bodies, one job:

| Body | How it switched | Why it stopped being enough |
|---|---|---|
| Relay | An electromagnet physically pulling a metal contact open or shut | Mechanical parts wear out, and a physical arm takes real time to move |
| Vacuum tube | A controlled beam of electrons inside sealed glass, no moving parts | Ran hot — the same heat that let it work also burned it out, one tube at a time |
| Transistor | A sliver of treated germanium controlling current, no moving parts | Solved both, which is why it never got replaced |

Get a single one of these switches wrong and the effect can be strange rather than small. In a Belgian election in 2003, one candidate's recorded vote count came out exactly 4,096 too high. That is a suspiciously exact number, because 4,096 is precisely two to the twelfth power — the kind of jump a single stored value makes when one switch inside it flips from off to on. Investigators called it an isolated, one-time error. **Even one switch, in the wrong place, is never nothing.**

The transistor did not arrive alone. Within the same few years, a report circulated describing a machine that could hold its own instructions in the same memory as its data, instead of being rewired by hand for every new task. A switch's single yes-or-no state got a short name of its own: the **bit**, short for binary digit. None of this was planned as one project. It became possible all at once, because each piece depended on ideas the others had only just finished proving.

By the end of the 1940s a switch exists that is reliable enough to build by the hundreds of thousands. So does a way to hand a machine its instructions as a physical, storable object. So does a way for a machine to hold those instructions in its own memory. Nobody has yet told such a machine, specifically, what to do with any of it.

**Before you read on:** picture that machine, switched on, memory empty. Someone hands it a single instruction. In your own words, what would have to be true about that instruction for the machine to carry it out correctly, given everything in this chapter and nothing else?
