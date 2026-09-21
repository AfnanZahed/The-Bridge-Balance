---
sidebar_label: "1. How a Machine Holds a Number"
sidebar_position: 10
title: "How a Machine Learned to Hold a Number"
description: "Why computers only ever say yes or no, how an instruction became something you could hold in your hand, and the three different switches that got us here — the machine, built, before anyone had told it what to do."
keywords: [binary, Boolean logic, transistor, relay, vacuum tube, punched cards, stored program, history of computing]
chapter_state: "text-ready"
video_url: ""
scope_multiplier: 1.0
scope_reason: "Three tightly bound beats — two-state logic, physical instructions as objects, and the switch's three generations — carried by one everyday example a beginner can picture, deliberately stopping before any programming content, which belongs entirely to the next chapter."
---

# How a Machine Learned to Hold a Number

Welcome to the first real chapter of the book. You have just read what this stage is for; now we start building, and we start from nothing at all.

Here is what we are going to work out together, and why each piece matters:

- **Why a computer only ever says yes or no.** Everything else a computer does is built on top of this one answer, so it is the right place to begin.
- **How an instruction became something you could hold in your hand.** This is the moment "telling a machine what to do" became possible at all.
- **The same switch, built three different ways.** Knowing this is why the phrase "the computer got faster" will stop sounding like magic to you.

By the end you will have a machine that can hold a number — and still no way to tell it what to do with one. Closing that gap is the whole of the next chapter.

Let's start with something you already know how to do.

## Why a Computer Only Says Yes or No

Imagine you want to send a message to a friend across the street, at night, and all you have is a torch. You cannot shout. You can only switch the light **on** or **off**.

It does not feel like much. But you and your friend can agree in advance what the flashes mean — and the moment you do, that torch can send any message you like. One flash for yes, two for no. A longer code for letters, if you are patient. **Two states, agreed in advance, are enough to carry anything.**

Now here is the part worth slowing down for. Why only two? Why not use the torch's brightness — dim for A, medium for B, bright for C — and send messages far faster?

Try it and you will see the problem immediately. Your friend is across a street, in the dark, possibly in the rain. *Dim* and *medium* start to look the same. A car goes past and its headlights wash out the difference. But **on** and **off** survive all of it. Even a weak, flickering light is unmistakably light, and darkness is unmistakably darkness.

That is the entire reason a computer works on two states rather than ten. Not because two is simpler to build — because **two survives interference that would blur anything in between.** A signal's job is to arrive intact, not to carry the most information per flash.

A system built entirely from two states is called **binary**. Inside a computer, the torch is a *switch*: it either lets electricity through, or it does not. The machine never has to guess which.

### From flashing a message to answering a question

So far the torch only carries messages. It does not work anything out. That step came from somewhere you would not expect.

A mathematician called George Boole spent years on what looked, at the time, like a private hobby: writing ordinary reasoning down as equations. *This AND that. This OR that. NOT this.* He worked with true and false the way the rest of us work with numbers. Nobody thought it had anything to do with machines. There were no machines to do it with.

Decades later a young researcher, Claude Shannon, noticed what Boole could not have. **A switch that is only ever fully on or fully off behaves exactly like one of Boole's true-or-false values.** Wire a few switches together in the right arrangement and the arrangement works out a piece of Boole's logic — not approximately, exactly.

Think about what that means for your torch. Up to now it could only *report*: on, off, yes, no. Now imagine two torches wired together so that the second one lights only when both you *and* your friend are holding yours on. Nobody decided that. The wiring decided it.

**A circuit does not only carry a signal. It can work one out.**

That is real, and it is also less than it sounds — which is the honest and useful thing to notice here. A switch can answer *one* fixed question, the instant current passes through it. It cannot remember what it answered a moment ago. And nobody has told it which question to answer; that was decided by whoever wired it.

Both of those gaps get closed next, and the first one is the more surprising.

## Instructions You Can Hold in Your Hand

Here the story leaves computing entirely for a moment. Stay with it — this is one of the most important turns in the book.

A French weaver called Joseph-Marie Jacquard had a problem that had nothing to do with machines thinking. Weaving a complicated pattern into cloth meant an assistant lifting exactly the right threads by hand, thousands of times, all day. One mistake meant unpicking hours of finished work.

His solution was a chain of stiff cards with holes punched in them. **A hole meant *lift this thread*. No hole meant *leave it*.** The loom read the cards and wove the pattern. Change the cards, and the very same loom wove something completely different.

Look at what just happened, because it is not really about cloth.

Before the cards, the pattern lived in a person's hands and memory. **After them, the pattern was an object.** Something you could hold, hand to someone else, put on a shelf, and run again next year exactly as it ran today. The instructions had become separate from both the machine and the person who thought of them.

That is the idea your torch was missing. A torch signal disappears the moment you let go of the button. A punched card does not.

The idea travelled. An English mathematician, Charles Babbage, designed a calculating machine meant to read cards the way Jacquard's loom did. Working alongside him, Ada Lovelace wrote out, on paper, a full sequence of cards for a calculation — **for a machine that did not exist yet.** Nobody had built it. She wrote the instructions anyway, and they were correct.

That is worth a moment. It means a set of instructions is not a property of a machine. It is an idea in its own right, one you can write down, check, and argue about, with no machine anywhere near it. You will meet that idea again in every stage of this book.

We still have a gap, though. A punched card is fixed: punched once, read the same way every time. The loom cannot change its own cards while it runs, and it remembers nothing from one run to the next. Closing *that* gap needed better switches — which is where we go now.

## The Same Switch, Built Three Different Ways

Everything above works no matter what the switch is physically made of. And over about a century, that switch was rebuilt three times. Each version did the identical job — fully on, or fully off — while getting smaller, faster, and harder to break.

**The idea never changed. Only its body did.**

**The first body was the relay.** An electromagnet physically pulls a small metal arm across to touch a contact, closing the circuit. It is a switch you can hear click, the same mechanism telephone exchanges ran on for decades. Early computers were built from thousands of them, and they worked. But a relay has moving parts, so it wears out, and moving a physical arm takes real time.

**The second body had nothing moving inside it at all.** A **vacuum tube** is a switch made of sealed glass, using a controlled stream of electrons in place of a metal arm. Far faster than a relay, with nothing to wear down. It failed a different way instead: it ran hot, and the same heat that made it work eventually burned it out. One of the great early computers ran on roughly seventeen thousand tubes, and its crew spent part of most weeks hunting down the handful that had died.

Picture that for a second — a room-sized machine, and your job is to find the one burnt-out bulb in seventeen thousand.

**The third body was small, solid, and did not burn out.** In 1947, researchers at Bell Labs built a switch out of a tiny piece of specially treated crystal. It did a relay's job with no moving parts, and a vacuum tube's job without the heat that killed them. They called it the **transistor**, and it is still the body this idea wears today. There are billions of them in whatever you are reading this on.

| Which switch | How it turned on and off | Why it wasn't enough |
|---|---|---|
| Relay | An electromagnet pulls a metal arm onto a contact | Moving parts wear out, and moving takes time |
| Vacuum tube | A stream of electrons inside sealed glass — nothing moves | Ran hot, and the heat burned it out |
| Transistor | A tiny piece of treated crystal controls the current | Fixed both problems, which is why nothing replaced it |

### One switch is never nothing

It would be easy to read all that and think a single switch hardly matters among billions. It is worth seeing why that is wrong.

In a Belgian election in 2003, one candidate's vote count came out too high by exactly 4,096. That number is a giveaway. 4,096 is what you get by doubling 1 twelve times — precisely the size of jump a stored number makes when **one** switch inside it flips from off to on. Investigators concluded it was a one-off fault, most likely a stray particle striking the machine.

Nobody typed a wrong number. Nobody wrote bad instructions. One switch, in one place, said yes when it meant no.

### What the 1940s ended with

Around the same time as the transistor, two more pieces arrived. Someone wrote up a design for a machine that could keep its own instructions in the same memory as its data, instead of being rewired by hand for each new job. And one switch's single yes-or-no state got a name that stuck: the **bit**, short for *binary digit*.

None of this was planned together. It became possible all at once, because each piece needed ideas the others had only just finished proving.

So here is where we have got to. **A reliable switch exists, in enormous numbers. Instructions can exist as a physical object. And a machine can hold those instructions in its own memory.**

What nobody has done yet is tell such a machine, specifically, what to do — and it turns out that the first people who tried did it with cables and their bare hands. That is Chapter 2.

**Before you move on**, try this one out loud or on paper: picture that machine, switched on, memory empty. Someone hands it a single instruction. In your own words, what would have to be true about that instruction for the machine to carry it out correctly — using only what is in this chapter?
