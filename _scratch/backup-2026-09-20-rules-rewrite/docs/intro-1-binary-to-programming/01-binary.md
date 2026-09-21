---
sidebar_label: "1. Binary"
sidebar_position: 1
title: "Binary: The One Fact a Machine Never Doubts"
description: "In 2003, one wrong switch inside a vote-counting computer invented 4,096 votes out of nothing. This chapter explains exactly how a single flipped bit does that — and why computers were ever built on a choice between only two states."
keywords: [binary, bit, byte, transistor, ASCII, Boolean algebra, analog, digital, bit flip]
chapter_state: "placeholder"
video_url: ""
scope_multiplier: 1.0
scope_reason: "one concept carried through its own name, mechanism, a real failure, and its lineage. No sibling concepts are folded in, but two separate live demonstrations — a bit flip and a floating-point rounding error — are both load-bearing to the reader's model, not decorative. That keeps a single-concept chapter at full reference scope."
---

# Binary: The One Fact a Machine Never Doubts

## The word, taken apart

***Binary* comes from the Late Latin *binarius*, "consisting of two."** It is built from *bini*, "two by two, two apiece," which traces back to *bis*, "twice." Strip away the Latin, and the word is telling you something plain: whatever it names comes in exactly two.

**Take a guess before reading on.** If *binary* means "built from exactly two of something," what does a computer hold two of? Most people guess correctly: the digits 0 and 1. Most people also stop there, treating 0 and 1 as a smaller, stranger way to count than 0 through 9. Hold that guess. It is not wrong. It is also not the interesting half of the answer.

## The wall that made two the only option

**Picture an engineer in the 1940s building a machine from physical switches — valves and relays then, transistors now.** Each switch has to report its state correctly. It has to do that billions of times a second, without ever once being misread.

**Two states, held far apart, are easy to tell apart even at enormous speed.** Engineers tried three and five states too, on paper and in early machines, because more states per switch means more information in the same hardware. The idea fails on one ordinary fact: real electrical signals carry noise, and noise blurs whatever sits nearby. Two widely separated states survive that blur. Three or five closely packed ones do not. A signal meant to say "state three" drifts just far enough to read as "state two," and the machine never knows it happened.

**So the choice of two was not elegance.** It was surrender to a wall nobody could build around. Two is the largest number of states a switch can hold and still read reliably, at the speed and scale a computer needs. Everything else in this chapter follows from that one compromise.

## What is actually switching

A **transistor** is a tiny electrical switch with exactly two stable states — a higher voltage or a lower one, nothing meaningful between them. **Apple's own published specification for its M4 chip, released 7 May 2024, puts twenty-eight billion of them on one sliver of silicon.** It uses a second-generation 3-nanometre process. One ordinary laptop chip. Twenty-eight billion switches. Each one simply on or off.

One switch's state is a **bit**, short for *binary digit*. **That is the whole mechanism.** Not a mysterious substance called "binary." The recorded position of one physical switch, at one instant, reported as one of exactly two values.

**Here is where the opening guess gets scored.** "Something to do with two" was correct. What it missed: the two things are not abstract digits, picked for neatness. They are the two positions of a real electrical switch, forced there by a physical wall, with a name attached afterward. An ordinary light dimmer holds a whole range of brightness between fully off and fully on. A bit has no such range — no dim setting between 0 and 1. That absence, not the digits themselves, is the entire point of the word *binary*. A signal that drifts smoothly through every value in between is **analog**. A signal built from separated, countable states is **digital**. Binary is the smallest, sturdiest version digital can take.

Eight bits grouped together make a **byte**, which holds exactly 256 distinct patterns — every combination of eight 0s and 1s, from `00000000` to `11111111`. In 1963, after three years of work, the American Standards Association's X3.4 committee agreed on what 128 of those patterns mean as text: the **ASCII** standard. Under that agreement, the byte `01000001` means the capital letter "A." Nothing about eight switches makes that pattern inherently an "A." It means "A" because a standards committee wrote it down, and everyone building on top agreed.

## Watching one switch fail

Here is that byte, position by position: `01000001`. **Read the whole pattern as a binary number and it equals 65 — the sixty-fifth pattern ASCII assigns, which is "A."**

**Now flip exactly one switch: the last one, from 1 to 0.** The pattern becomes `01000000`. The number is 64. ASCII's table says pattern 64 is not a letter at all. It is the symbol "@". One physical switch. One silent change. The letter "A" has become "@" — no error message, no warning, nothing in the byte that records what it used to be.

**That is the entire mechanism behind a real election failure.** On 18 May 2003, Schaerbeek, near Brussels, counted a regional election on computers. One candidate ended up with more personal votes than her own party's list total, which is impossible. A recount gave her exactly 4,096 fewer. Somewhere in the voting machine's memory, one switch had reported the wrong state. The government's own phrase was "the spontaneous creation of a bit." Physicists later proposed a specific, leading cause: a single-event upset, where a stray particle from cosmic radiation strikes a memory chip and flips exactly one switch. It is a documented, if uncommon, hazard for the electronics of that era. The cause was never proven beyond doubt — only judged the most likely explanation on record.

**Flip the right bit in the right place in a vote count, and the arithmetic does not report an error.** It reports a different, entirely confident, entirely wrong number: 2 to the 12th power. 4,096. Added to one candidate's total as if it had always been there.

## Nothing above a bit checks a bit

**A byte does not know it holds a letter, or a vote count, or a bank balance.** It only knows two states, repeated. Every file, every number, every line of code ever written is built by stacking meaning on top of that one physical fact, one layer at a time. Each layer trusts the layer below it. None of them check.

**This is why Schaerbeek was caught at all — and why the catch was closer to luck than to design.** Nothing in the voting machine's arithmetic flagged the flipped bit. To a circuit that only adds, 4,096 is a number like any other. What caught it was a separate, human-written rule with nothing to do with bits: a candidate's personal votes must be part of her party's list total. The two no longer matched, and a person had written down, in advance, that they should. The machine never knew it had made a mistake.

**That is the shape of every layer built on top of a bit, all the way up to the code someone writes today.** The layer underneath is trusted, not verified — until a person deliberately builds a check that assumes the layer below might be lying.

## When the floor under a number is not exact

**There is a second, quieter way this same floor causes trouble, and it needs no cosmic ray.** Run this on any computer:

```python
>>> 0.1 + 0.2
0.30000000000000004
```

**Running it yourself.** Any Python installation opens this: type `python3` at a terminal, or use a free browser-based one such as replit.com, and type `0.1 + 0.2` at the prompt. The answer comes back instantly, and it will not be `0.3`.

**That is not a bug waiting to be patched.** The number 0.1 has no exact ending pattern in binary — for the same reason 1/3 has no exact ending pattern in decimal. Some fractions simply do not divide evenly in a given base. A computer storing 0.1 in binary stores the closest pattern that fits, not the number itself. Arithmetic on that near-miss produces a near-miss result.

**The two failures in this chapter mark two ways to get a machine's relationship with binary wrong, and they pull in opposite directions.** Treating a stored number as automatically exact, just because a computer produced it, is over-trust. It is what let a flipped switch pass as a real vote for as long as it did. Insisting on personally re-checking every bit of every value, by hand, forever — distrusting seventy years of built layers — is the opposite failure. No working engineer actually does this, because almost nothing above this floor needs it. The judgment that matters sits between the two extremes. Know the floor can lie. Check it specifically where the cost of being wrong is high — money, votes, medicine, safety. Not everywhere. Not nowhere.

## Where this comes from

**Binary numbers are far older than any machine.** Gottfried Leibniz worked out binary arithmetic in 1679. He published it in 1705, in a paper linking 0s and 1s to a passage in the *I Ching* that struck him as philosophically significant. For Leibniz, binary was a mathematical curiosity, not yet anything to build. In 1854, George Boole's *An Investigation of the Laws of Thought* gave true and false their own algebra, with fixed rules for combining them.

**In 1937, a 21-year-old MIT student named Claude Shannon made the connection that matters here.** His master's thesis, "A Symbolic Analysis of Relay and Switching Circuits," showed that Boole's true-and-false algebra was not just logic. It was exactly the mathematics that describes a network of electrical switches. The thesis won the American Institute of Electrical Engineers' 1939 Alfred Noble Prize — a real award, named for a real civil engineer. It is one of history's most confusable near-misses for the Nobel Prize it is not.

**The switch itself came a decade later.** On 16 December 1947, John Bardeen and Walter Brattain, at Bell Labs, got a sliver of germanium to amplify an electrical signal — the first working transistor. Colleague John Pierce named the device the next year, welding *transfer* and *resistor* into one word for what it does. Bardeen, Brattain, and their colleague William Shockley shared the 1956 Nobel Prize in Physics — a different, unambiguous Nobel. The citation reads: "for their researches on semiconductors and their discovery of the transistor effect."

**The words for what the switch holds arrived from two more people, within a decade of each other, working independently.** Mathematician John Tukey suggested *bit* — a squeeze of "binary digit" — around 1947, at Bell Labs and Princeton. Claude Shannon put it into print the following year, crediting Tukey by name. In July 1956, IBM engineer Werner Buchholz needed a word for a group of bits. He reached for *bite*, then deliberately misspelled it *byte* — so a single typo could never turn one word into the other.

## Before you move to the next switch pattern

**Without looking back at this chapter: a single bit flips somewhere inside a stored byte.** Walk through, in your own words, what changes and what does not. What did the byte look like before? What does it look like after? What would that new pattern be read as?

**Then answer plainly: would anything in an ordinary computer notice on its own?** Or does noticing require a rule a person wrote in advance — the way Schaerbeek's list-total check did, by accident?

**Next:** a single switch's state is a fact with no meaning of its own. **The next step is what happens when whole patterns of switches are agreed, in advance, to mean something a processor can act on — an instruction.** That agreement is machine code, and it is where a byte stops being a letter and starts being a command.
