---
sidebar_label: "1. Foundations"
sidebar_position: 2
title: "The Boxes and the Walls: Where a Rule Has to Live Before You Write the Code"
description: "Architecture is the boxes a system is made of and the walls between them, and deciding both before any code is written is what keeps a rule like the club's thirty-seat cap out of reach of the students it applies to."
keywords: [software architecture, architecture before code, components and boundaries, coupling and cohesion, layered architecture, monolith, client-server, event-driven, blast radius, architecture smells, whiteboard test, information hiding, system design, Parnas]
chapter_state: "text-ready"
video_url: ""
scope_multiplier: 1.5
scope_reason: "the chapter carries several interacting ideas — components and boundaries, coupling and cohesion, the four common shapes, and blast radius — that hold together only as one system, because a boundary cannot be judged without knowing what crossing it costs or what fails when it does."
---

# The Boxes and the Walls: Where a Rule Has to Live Before You Write the Code

Before you ask an agent to build a sign-up page for the school AI club, capped at thirty seats, take a sheet of paper. Draw a box for every part you think this system needs, and a line wherever one part talks to another. That sketch is the one decision the agent cannot make for you, and you are about to make it in ink rather than in code.

## Architecture is borrowed from building

*Architecture* entered English in the 1560s, meaning the art of building. It came through French and Latin from the Greek *arkhitektōn* — *arkhi-*, meaning chief, plus *tektōn*, meaning a builder or carpenter. An architect was a chief builder: the person who fixed the shape of a structure before anyone laid a brick.

Read plainly, the name makes a promise. Before the walls go up, someone decides where they go. Get the plan right and the building stands; get it wrong and no careful bricklaying saves it.

So form the guess the name invites. If software architecture works the way a building's does, then the architecture is the finished plan — a drawing you settle once, at the start, and then build to. Hold that guess. This chapter tests it, and the distance between it and the truth is why a thirty-seat rule can sit in the wrong place while every screen still looks correct.

## The nearest thing you already hold

You have stood inside a building, so you already hold the picture. A building has walls that carry the roof, and walls that only divide one room from the next. Take out a partition and the neighbouring room changes shape. Take out a load-bearing wall and the floor above it comes down.

That is the split this chapter is about, and it is real in software. Some lines in a system are structural, and removing one collapses something far away.

Here is the one difference, and it decides where a rule has to live. In a building, a wall holds itself up. The brick is the enforcement, and it is sitting right there in the wall. In software, a wall is a line someone drew, and it holds nothing by itself. A boundary is real only if something, at the moment the system runs, refuses to let anyone cross it. Draw all the walls you like; if nothing enforces them, you have a diagram, not a system.

## Who named this, and whether it is alive

The vocabulary comes from a specific thread rather than one author. In December 1972, David Parnas published "On the Criteria To Be Used in Decomposing Systems into Modules" in *Communications of the ACM*, the paper that named **information hiding** — a part of a system should hide a decision and reveal only what others must know. Larry Constantine was writing down **coupling** and **cohesion** at the same time, and he and Edward Yourdon gathered both into *Structured Design* in 1974. The field those two papers started is still active, and everything in this chapter descends from it.

## The problem that forced these walls into existence

Picture the club page three months old. It has the sign-up form, a list of who joined, and a small admin panel for the club teacher. It works. Then one request arrives: add a waitlist, so the thirty-first student goes onto a list instead of being turned away.

You make the change in one place. It breaks three.

The member list now mixes waitlisted students in with confirmed ones, because it read a single number — how many people had signed up — and that number no longer means what it did. The confirmation email says "you are number 31", because a second piece of code read the same number. The admin panel's "seats left" figure is wrong, because a third piece read it too.

None of those three places is where you made the change. That is the problem, and it has a name. The parts of that system were **coupled** — joined so tightly that one change ripples into the others — and nothing written down said they were joined. A program that starts as one file becomes hundreds, and the person who wrote the first half cannot say what depends on what. Every later change is a guess. The three boxes that broke are easy to fix one at a time; the difficulty is knowing where they are, and that difficulty is what architecture exists to remove.

## What architecture actually is: the boxes and the walls between them

Strip the building out of the word and three pieces remain. A **component** is one part of the system that does a single job: the sign-up form, the seat counter, the member list, the place that remembers signups after a restart. A **boundary** is the wall around a component — what the rest of the system may see, and what stays hidden inside. An **interface** is the agreed way to talk across that boundary: the exact questions one component may ask another, and the answers it will get. **Architecture** is the whole arrangement of those three, plus the rules about who may change which part.

The mechanism is deliberately thin, and that is the point. The inside of a box is not architecture. Whether the seat counter counts with a loop or a lookup is **implementation**, the code inside a box. A **design pattern** is a reusable shape for the code inside a box. The framework you build on is a shape someone else chose for you. Architecture is what is left when you cannot see inside any box at all: the boxes, the walls, and who talks to whom.

Two ideas get confused with this one, so name them. Architecture is not the same as **deployment** — where the boxes physically run — though the two constrain each other. And architecture is not a diagram. A diagram pictures the architecture; the architecture is the arrangement it pictures. Erase the whiteboard and the architecture is unchanged, because it was never the ink.

Now score the guess from the start of the chapter. You guessed that architecture is a plan you settle once and then follow. That is half right, and the half it misses is the part that matters here.

Half right, because you do decide the shape before you build, and you do write it down. Wrong, because a building's plan stays true the moment the concrete sets, while a software architecture is only ever as true as its enforcement. Move the seat check into the form the student controls, and the architecture has changed, even though the diagram has not. That gap is why the rest of this chapter is about walls that hold and walls that only look like they do.

## The two forces that decide where to cut

Two measurements judge every split, and both come from the structured-design work of the early 1970s.

**Cohesion** is how much the parts inside one box belong together — how strongly they serve a single purpose. A component that counts seats and nothing else is highly cohesive. High cohesion is the goal, because a box that does one thing is a box you can understand, test and replace on its own.

**Coupling** is how much one box depends on another. The member list that reads the seat counter's internal number is coupled to it. Low coupling is the goal, because two boxes joined only by a narrow interface can change independently — as long as each keeps its promise at the wall between them.

The rule that falls out is short: **high cohesion inside a box, low coupling between boxes.** A cut is good when it keeps closely related work together and puts everything else behind a wall.

There is a price here, and it is rarely counted. Every boundary you draw buys independence and charges a crossing. Two components that could have called each other directly now talk across an interface, and that interface has to be written, kept stable and taught. When two pieces genuinely change together, a wall between them is not discipline; it is a fee on every change. A boundary in the wrong place is worse than no boundary, because the coupling is still there, now hidden behind a wall that pretends it is not.

## The shapes a system usually takes

When you draw the boxes and walls, you are not inventing a shape. Nearly every system settles into one of four, and each is a different answer to one question: how should the parts be allowed to talk?

A **monolith** is one program that contains the whole system. The form, the seat counter, the member list and the admin panel run as one piece and go out together. Its strength is that calls between parts are ordinary function calls with no network in the middle, so there is nothing extra to break. Its weakness is one shared fate: to change the seat counter you rebuild the whole thing, and a fault in any part can take down every part.

A **layered** system stacks its boxes so each layer may talk only to the one below it, never around it. The familiar stack is a screen layer for what the user sees, a logic layer for the rules such as the thirty-seat cap, and a store layer for what is kept. The shape's value is the rule it enforces: a rule in the logic layer cannot be passed over by a new screen, because every screen must go through the layer beneath it.

A **client-server** system splits the boxes across two machines. The student's device runs the client, the part facing them, and a machine you control runs the server, the part that holds the rules and the data. This is the split the architecture map in the intro traced end to end, and it is why the thirty-seat rule is not a matter for the client.

An **event-driven** system lets parts talk without knowing each other, by announcing events that other parts listen for. Signing a student up does not call the waitlist directly; it announces that a student signed up, and the waitlist, the email sender and the admin panel each react on their own. The gain is that adding a new reaction means adding a new listener, not editing the sign-up code. The cost is that a reader of the sign-up code cannot see what happens next, because the answer is spread across every listener.

Treat the four as a menu, not a ladder. Real systems mix them; the club page is a client-server system whose server is layered inside, with one event-driven thread where a signup triggers an email. What matters is that you pick, on paper, and can say why.

## Where the rule has to live

Now the question the chapter has been walking towards, on the paper from the first page. The club is capped at thirty. Which box holds that rule, and which wall does it sit behind?

Draw the boxes first. There is the form the student fills in. There is the member list they may read. There is the seat counter the rule needs. There is the store that remembers who signed up after the page restarts. Then draw the walls. The form runs on the student's device, so it sits behind a wall the student controls. The counter, the store and the rule belong on a machine you control.

The answer most people reach for puts the rule where the action appears to be: in the form, on the student's device, right where the click happens. It is wrong, and the architecture map in the intro already showed why. The code on the student's device runs on a machine they own, and their browser lets them edit it. Delete the check, submit five hundred times. Nothing on your side objects, because the rule was enforcing itself on the visitor's desk.

The rule has to sit on the far side of the boundary the student cannot cross. It belongs with the seat counter, on the machine you control, where every request for a seat must pass. Put it there, and the only way past it is to reach a machine you never handed out.

There is a real cost to that placement, and honesty asks for it. A check on the student's device answers instantly, because no request leaves the machine; the check on your server costs a round trip — one request out and its answer back — before the student learns the answer. The architecture map counted that price from Chrome UX Report data: a median round trip of 92 milliseconds on desktop and 270 in Pakistan, measured in August 2026. So the working answer keeps both. A check on the student's device gives fast, honest feedback. The rule itself lives on the server, where it is the one that decides.

### Drawing it in five minutes

The sketch has a definite end state. When it is done, you have a box for each part, one wall around everything the student can touch, and a single marked box holding the rule. If a part does not change what the page does or what it remembers, it is not a box yet.

1. List the jobs the system must do, one per line: collect a signup, count seats, decide who gets in, remember who joined, show the list.
2. Draw one box per job. Put each job where it must run — the student's device on the left, your machine on the right.
3. Draw one wall down the middle and label it: on the left, the student's device; on the right, the machine you control.
4. Draw a line for every box that talks to another. Each line that crosses the wall is a request, and every request can be refused.
5. Circle the box holding the thirty-seat rule. Ask one question: can a student reach the code in that circle and change it? If yes, the rule is behind the wrong wall, and it moves.

## When this box fails, what else fails with it

Naming where a box sits raises a second question at once: what depends on it? The set of things that break when one part breaks is its **blast radius** — how far the damage travels from a single failure.

The club page has a short, readable blast radius. If the seat counter fails, signups stop but the member list still reads. If the store that remembers signups fails, the count resets and everything taken so far is gone, which is the one failure with no repair.

Real systems show the shape at a scale you can feel. On 4 October 2021, one routine configuration change to the routers carrying Facebook's traffic took its whole network off the internet. Facebook, Instagram and WhatsApp went down worldwide for about six hours, and the internal tools staff would have used to fix it were inside the same failed network. One box, 2.9 billion monthly users, and the way back taken down with the outage. The point is not that Facebook built the wrong shape. It is that the blast radius of a shared component is everything that depends on it, and no single box can show you that list.

That is why drawing the walls before the code pays off. The blast radius of a boundary you never drew is the one you cannot estimate, because nothing recorded what crossed it.

## What a broken boundary costs

Architecture work is cheap at the front and expensive to skip, and the numbers make the second half concrete.

Uptime Institute's annual outage analysis, built on its 2025 survey, found that 57 per cent of respondents said their most recent major outage cost more than 100,000 US dollars, and for the second year in a row one in five put the cost above a million. Those are data-centre outages, not school club pages, and the point still carries: a failure is billed across its whole reach, not just the part that broke.

The cost of a boundary drawn in the wrong place is slower and harder to bill. It is the fee on every future change that must now cross a wall it did not need. It is the hours spent tracing one behaviour through a system whose walls were never written down. A five-minute sketch is paid once. A missing wall is paid at every change, for as long as the system lives.

## When to draw, and when drawing is the wrong move

The decision rule is short. Draw the boxes and walls before an agent writes a line, whenever the change touches more than one component, more than one rule, or anything a user can reach. That covers almost everything past a first afternoon.

The counter-case is real, and it is the small thing. A script you will run once, a throwaway page, a single function with one caller: drawing architecture for these adds a cost with no return, and a box nobody needed is not discipline. The judgment is not "always draw". It is "draw when the shape is a decision, and stop when it is not".

The failure conditions appear early, and they have a name. **Architecture smells** are patterns in a system that suggest a boundary sits in the wrong place.

A **shared mutable state** smell: two components both read and write the same stored value, so neither can change without breaking the other. That is the club page before the waitlist, where three boxes read one number.

A **cyclic dependency** smell: box A needs box B, and box B needs box A. Neither can be understood or tested alone, and a change to either forces a change to both.

A **leaky boundary** smell: one component reaches past another's wall into its insides, so the hidden half is no longer hidden. The tell is a change inside one box that breaks a box it never appeared to touch.

A **god component** smell: one box that everything depends on and that depends on everything, doing dozens of jobs. Its blast radius is the whole system.

And a **rule in two places** smell, the one this chapter cares about most: the thirty-seat cap written in both the form and the server. Two copies of one rule will eventually disagree, and when they do, nobody can say which is right.

The early symptoms are quieter than the smells. The system takes longer and longer to change. A new reader cannot tell what a component does from its boundary alone. And a change you make in one place keeps surprising you somewhere else.

### When splitting a system makes it worse

Boundaries are good, so the reflex after this chapter is to split everything — small boxes, each talking to the others over the network. That reflex has a cost, and it is rarely counted. Every network boundary is a new failure mode, because a call that used to be a function call now crosses a link that can slow or stop. Two boxes that must be released together are not really two boxes; the field calls the result a **distributed monolith** — services split apart on paper that still rise and fall as one. In 2023, Amazon's Prime Video team published how part of its video-quality monitoring service moved the other way, from a distributed, serverless design back into a single program, and cut the cost of running it by about 90 per cent. The lesson is not that monoliths win. It is that a boundary earns its place only when the two sides genuinely change apart; a wall around work that moves together is a wall you pay to keep and get nothing for.

## Two ways to hold the shape wrong

You can now draw the club page's boxes and walls by hand and hand the agent a shape to fill in. Or you can describe the page in a sentence and keep whatever shape comes back. Both are open, and both fail in a way specific to architecture.

**Over-trust** hands over the sentence and keeps whatever boxes the agent invents. It will return a form, a place to store signups and a seat check — and the check lands wherever its generated code put it, usually in the student's own page, right where the click happens. Every screen works. The control is a decoration. Nobody decided where the rule lives, so the agent's first guess became the architecture.

**Over-caution** refuses to let the agent near the shape, and hand-draws and hand-builds every box before any of it is generated. That feels like control. The cost is a system an agent could have drafted in an afternoon, rebuilt at the speed of one pair of hands, and a shape so fixed that the first requirement you did not foresee costs a rewrite.

The move that avoids both is the one this chapter has been building. **Draw the boxes and the walls, decide where each rule is enforced, then let the agent fill the boxes in.** Specify the shape. Bound each rule to the one wall that can enforce it. Verify the enforcement on the machine you control. Own the result when a boundary turns out to be wrong. None of that is typing, and the agent cannot do it for you.

## Where these ideas come from, and who to read next

The thread is short and public. Parnas's 1972 paper is where **information hiding** was named, and it is the direct ancestor of the boundary. Constantine's coupling and cohesion, gathered with Yourdon in *Structured Design* in 1974, are where the two judgments this chapter leans on were written down. Shaw and Garlan's 1996 book, *Software Architecture: Perspectives on an Emerging Discipline*, is where the field took *software architecture* as its name.

The live disagreement is worth more than any settled rule here. One camp holds that architecture is decided up front and then built to, the way a building is. The other holds that architecture **emerges**, and that the right boundaries become visible only once the system is running and people keep changing it. This chapter stands between the two and says so: decide the boundaries that rules depend on before you build, and let the rest emerge, because the cost of a wrong boundary is only visible after the first change. That argument is not closed, and following it teaches more than picking a side.

To follow it, the primary sources stay the best ones. Parnas's paper for the reasoning behind hiding a decision. Shaw and Garlan for the field's vocabulary. And, for how the arguments are being run today, the architecture notes that large engineering teams publish about their own systems.

<Callout type="info" title="Where this sits">
This is the first chapter of **Stage 1**, and it decides the shape the rest of the stage has to build inside. The chapters that follow open one box each: the frontend chapter takes what the student sees, the backend chapter takes the rules on the machine you control, the databases chapter takes the box that remembers, and the Git chapter takes how two people change the same walls without erasing each other's work. Bring the sketch you drew here to all of them.
</Callout>

<Callout type="warning" title="Safety floor">
A rule is only real where it is enforced, so check the enforcement on the machine you control instead of trusting the diagram. Confirm the thirty-seat cap is refused by the server rather than hidden only in the page a student can edit, and confirm nothing crosses a boundary you did not draw. Agent output is unverified by construction, and a boundary you accepted without checking is not yours.
</Callout>

## Before you turn the page

Close the chapter and answer from memory, without scrolling back.

Redraw the club page from the first page of this chapter: one box per job, one wall where the student's device ends, and one line under each box saying what it does. Then answer the two questions the chapter was built on. Which box holds the thirty-seat rule, and which is the single wall a student cannot cross to reach it? And name the smell you would expect to find in a system whose seat rule was written in the form as well as on the server.

Last, pick an app you use every day and redraw its boxes and walls from memory. Name one thing, on your own device, that it trusts you not to change.

**Next:** Stage 1 opens each box you drew. The chapter on the frontend takes the screen the student touches; the chapter on the backend takes the rules on the machine you control; the chapter on databases takes the box that remembers; and the chapter on Git takes how the walls get changed without being overwritten. Every one of them assumes the boundary lines you drew here, and the discipline underneath them returns much later, in Spec-Driven Engineering, where a boundary is only as good as the verification behind it.
