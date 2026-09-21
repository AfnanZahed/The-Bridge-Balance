---
sidebar_label: "From Binary to Programming"
sidebar_position: 0
title: "From Electricity to Programming: Binary, Assembly, and High-Level Languages"
description: "Every program reduces to electricity switching on and off. Here is the climb from there to the languages you will actually write in — and the moment the word 'programming' earned its modern meaning."
keywords: [binary, bit, byte, ASCII, machine code, assembly language, assembler, register, high-level language, compiler, interpreter, abstraction, x86, ARM]
chapter_state: "text-ready"
video_url: ""
scope_multiplier: 1.0
scope_reason: "one continuous evolutionary ladder — binary, assembly, high-level language, abstraction — with a single added intellectual beat, 'What Is Programming', marking the pivot to human-readable language; each rung exists because the one below it ran out of room, so no section can be cut without breaking the next."
---

# From Electricity to Programming: Binary, Assembly, and High-Level Languages

You are here to learn **programming** — writing the instructions that make a machine do something. **Before that gets defined properly, stop and look at the word itself.**

## The word is older than the machine

***Program* did not begin as a computing term.** It entered English in the 1630s, borrowed from the Greek *programma* — a written public notice, something set down in writing so everyone could see it. The parts are *pro-*, meaning forth or in front, and *gramma*, meaning something written. A printed programme at a wedding, or a list of pieces at a concert, keeps that first sense exactly: a plan written down in advance, for other people to follow.

**So take a guess before reading on.** If *program* means a plan written down in advance, what would *programming* be?

**Most people, asked cold, describe typing.** Fast typing, usually — fingers moving, code appearing, competence measured by how quickly the syntax comes out. Hold that guess. This chapter is going to test it, and the distance between it and the truth is the reason the next four rungs exist at all.

**The nearer thing you already hold is a printed exam timetable.** That is a program in the original sense. Someone decided what happens when, fixed the order, and wrote it down. The timetable does not explain itself, does not negotiate, and does not care whether you agree. It states, in advance, what will happen.

**A computer program is that, with one difference that changes everything: the follower is a machine with no judgement at all.**

## One switch, two states

The machine is built from **transistors** — tiny electrical switches, each with exactly two stable states. **As of 2026, a processor in an ordinary laptop holds somewhere north of ten billion of them, each holding a clear on or off, switching billions of times a second.**

**Engineers could have tried switches with three or five reliable states instead of two.** Building that to work at this scale is not possible, because electrical noise blurs nearby states into one another. Two states, far enough apart to tell apart with certainty, is the bargain computing has kept since the first electronic computers.

One switch's state, on or off, is a **bit**, short for binary digit. **It is the smallest unit of information a machine can hold, and everything else in this chapter is built on it.**

**A bit alone barely says anything, so bits get grouped.** Eight of them make a **byte**, which can hold 256 distinct patterns — every combination of eight 0s and 1s, from `00000000` to `11111111`. That is enough room to give every letter, digit, and punctuation mark on a keyboard its own pattern. **ASCII** does this by agreement: the byte `01000001` means a capital "A," `01000010` means "B," and so on. Nothing about that pattern is inherently an "A." It means "A" because everyone building on top agreed it would.

**Group enough bytes, under enough agreed schemes, and you can represent a number, a colour, a second of sound, a frame of video.** This is not an occasional trick. Everything any computer has ever done happens at the bottom in exactly this way: on, or off, arranged in patterns people agreed on.

## The wall you hit doing it by hand

**Now the honest question.** Using nothing but 0s and 1s, could you write the instruction that adds two numbers together?

**Most people cannot, without a reference table open beside them.** That is the wall. The raw binary a processor executes is called **machine code**, and it is the only language the processor reads natively. Each exact pattern means one tiny operation: add these two numbers, move this value into a slot called a **register**, compare these two things and remember which was larger. Every program, in its final instant before running, is reduced to exactly this.

**One detail matters later.** Machine code is not universal. It belongs to a family of processor. The pattern that means "add these two numbers" on an Intel or AMD chip — a family called **x86** — is a different pattern on the chip inside an iPhone or most Android phones, a family called **ARM**. Code built for one family will not run on the other at all.

**Machine code is also close to unreadable at scale, and the first programmers lived that difficulty directly.** They wired instructions in by hand with physical switches, or fed them in on **punched cards** — stiff paper cards with holes at set positions, one card at a time through a reader. A moderately complex program could need a box of hundreds of cards, in exact order. Dropping the box was a genuine, career-affecting disaster. Holding a few thousand raw bit patterns in your head while trying to build something real is as exhausting as it sounds.

That pain forced the next rung into existence.

## Giving the numbers names

What if, instead of memorising that `10110000` means "load this value into a register," you could write `LOAD`?

That is **assembly language**: short human-readable commands — `MOV` to move a value, `ADD` to add two, `JMP` to jump to a different instruction — each mapping almost one-to-one onto a machine instruction. A separate program called an **assembler** does the translating, turning each word into the exact bits that word means for whichever processor family it targets. Nothing clever happens in that swap. It is a literal, one-for-one substitution, and the assembler has no idea what your program is for.

**This was invented, not discovered.** In the late 1940s, Kathleen Booth and her colleagues at Birkbeck College in London wrote the first assembly language and built the assembler for their ARC machine. The idea spread because the alternative was unmanageable.

**Assembly is still used today, deliberately, in the few places where hardware control genuinely matters: parts of operating systems (the software that manages a computer's hardware and its programs), device drivers (the small programs that let the system talk to one piece of hardware), the first code that runs when a machine powers on, and security research, where reading at this level is often the only way to find out what a program really does.** Almost nowhere else, for a reason worth stating plainly. Assembly fixed readability and left the other problem untouched. You still narrate every microscopic step by hand, and assembly written for x86 will not run on ARM any more than the bits underneath it would. Build for one chip family, and a second family means writing the whole thing again.

## What programming actually is

Go back to your guess at the start of this chapter.

**If you said programming is typing, you are half right in a way that will mislead you for years.** Typing is the part that happens. It is not the part that is hard, and it is not the part the industry kept rebuilding for seventy years.

**Programming is writing down a set of instructions precise enough that a machine with no judgement can carry them out.** The written plan is the program. Programming is the act of making that plan exact.

**Read the definition again beside the exam timetable.** A vague instruction is not a program, because the machine cannot ask what you meant. "Make the checkout faster" is a wish. "Reject a request when the account has more than 100,000 rows pending" is an instruction, because nothing in it is left to interpretation. The whole discipline compresses into that difference. Every rung from here on — assembly, high-level languages, compilers, frameworks, agents — is machinery for stating intent more exactly to a more capable follower.

**That is why the guess was only half right, and the half it missed is the part the industry pays for.** Typing is how an instruction gets written down. Deciding what the instruction must say, and proving it says it, is the work.

## A language built for you, not the machine

**Return to the wall.** Assembly is readable to a specialist and locked to one chip family. What if the language you wrote in did not have to care which chip ran it?

That is a **high-level language** — Python, JavaScript, C, Java, and everything this course uses. **These languages are built to be read and written by people: full words, real structure, ideas instead of raw steps.** You can write "if the cart total is over fifty dollars, apply free shipping" as something close to that sentence, instead of a page of register moves and comparisons.

**Getting from that sentence to something the processor can run happens in one of two ways, and the difference is a real trade-off rather than a ranking.** A **compiler** reads your whole program first and translates all of it into machine code before anything runs — C and Java work this way, which is why they tend to start and run fast, because the translation is already done. An **interpreter** translates and runs your program line by line as it goes — Python and JavaScript work this way, which gives up some speed in exchange for a short feedback loop: change one line, see the result immediately.

**Either way, software now does the translating the assembler used to do, and it does it for whatever machine the code lands on.** The same Python file runs unmodified on a Mac, a Windows laptop, and a server built on different silicon in a data centre, because the last mile into that machine's own binary happens fresh, on that machine. You write once; the translation adapts. That is where almost the whole software industry lives today.

**The people who built that translation have names.** Grace Hopper's team completed the A-0 system in 1952, the first program that turned a written notation into machine code automatically; every compiler and interpreter you will use descends from it. The idea was not obvious at the time — plenty of her contemporaries thought machines should be given raw instructions and nothing else. That argument has restarted at every rung since, which is why the next section is about recognising it.

## The idea doing the work underneath

**Step back and look at what just happened four times.** Binary gave way to assembly. Assembly gave way to a high-level language. Each step did the same thing: someone grew tired of the mess underneath, built a layer on top that hides it, and kept a strict, narrow promise to the layer above.

That move is **abstraction** — hiding one layer's complexity so the layer above can be reasoned about without knowing what is underneath. **Nobody designs a shopping cart while tracking which transistor is lit.** Abstraction is what lets the electrical reality and the idea you are building be thought about separately, by never requiring you to hold both at once.

**Each layer keeps its promise exactly.** Hand an assembler `ADD`, and it becomes voltage, correctly, without the programmer knowing how a transistor works. Hand a compiler a line of Python, and it becomes machine code for whatever chip is running, without you knowing that chip's instruction set — or whether it is x86 or ARM.

**The cost of a layer is what it hides, and that cost is paid in a specific currency: when something breaks inside the hidden layer, the error you see is reported in the language of the layer you stand on, not the one that failed.** A Python traceback — the report Python prints when something fails — tells you which line of Python raised the error. It does not tell you that a chip-specific instruction did something unexpected, because the layer beneath was built to keep exactly that information away from you. Debugging across a rung is a skill, and it starts with knowing the rung is there.

**Now the two ways to get the relationship with a layer wrong, because they sit at opposite ends of the same rope.** **Refusing the layer** looks like discipline and turns into cost: a developer who insists that real work happens in assembly hand-builds what a framework would have handed them, and falls behind while feeling principled. **Trusting a layer without ever looking through it** looks like speed and fails later: a developer who accepts a diff they cannot read has no way to know what the layer beneath actually did. Both mistakes come from the same place — a broken relationship with the layer you are standing on. The first refuses to stand on it; the second stands on it without checking it holds.

**Neither is fixed by learning more syntax.** Both are fixed by knowing which layer you are trusting, and why.

**The newest rung is the one this course exists to put you on.** A **framework** is pre-written code you build on instead of writing from scratch. A **coding agent** is a program that reads your files, writes and edits code, and runs commands — in sequence, without asking you to approve each step. Directing one is standing on a higher abstraction than any compiler: you state intent in plain language, and something else produces the implementation.

<Callout type="warning" title="Safety floor">
Every rung hides the one below it. Use the abstraction, but never mistake not seeing the layer for it not being there. An agent's output becomes yours the moment you accept it, and "the agent wrote it" has never once fixed a broken system.
</Callout>

<Callout type="info" title="Where this sits">
This chapter sits ahead of **Stage 1**, laying the ground the rest of the course builds on rather than teaching one of its numbered chapters. The ladder here — hardware, then language — reappears one level up the moment you look at how a real application is put together.
</Callout>

## Before you turn the page

**Without looking back at the chapter, put the four rungs in order and say what each one hides.** Then answer the question the opening guess was really testing. A colleague says they spent three days "programming" and produced four lines of code. Is that a contradiction? Answer in the terms this chapter gave you, and name which half of the word they were doing.

**Next:** the same ladder, one level up — the map of a real application, assembled one wall at a time.
