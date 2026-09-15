---
sidebar_label: "The Architecture Map"
sidebar_position: 1
title: "Let's Build One Thing Together: The Complete Architecture Story"
description: "One sign-up page, thirty seats, and the whole shape of a software system assembling itself one box at a time — each box there because the one before it could not do the job, and every rule tracing back to a single fact: the frontend runs on a machine you do not control."
keywords: [frontend, backend, client-side versus server-side, API, HTTP, REST, DOM, responsiveness, database, SQL, NoSQL, Redis, authentication, authorization, hashing, OAuth, token, Git, GitHub, pull request, deployment, DNS, production versus staging, software architecture]
chapter_state: "text-ready"
video_url: ""
scope_multiplier: 1.5
scope_reason: "one sign-up page pulls roughly forty first-use terms — frontend, backend, API, HTTP, database, auth, deployment — into a single causal chain where each box exists because the previous one hit a wall, so no box can be lifted out or deferred without breaking the chain."
---

# Let's Build One Thing Together: The Complete Architecture Story

You are about to build something — not on a laptop, not yet, in your head, one decision at a time. By the end, the whole shape of **Stage 1** will have assembled itself in front of you, one wall at a time, in the order Stage 1 itself teaches it.

The thing you are building is small on purpose: a page where students sign up for a club. The AI club, capped at thirty seats.

## Two words worth taking apart

Before a single box is built, look at the two words that name its halves. **Frontend** splits into *front* and *end*. **Backend** splits into *back* and *end*. Both are no more than a direction word plus the word *end* — the end at the front, the end at the back.

That is a real win, and it is a small one. The name tells you a split exists, and that the split is about facing. It does not tell you whose computer each half runs on, and that missing half turns out to be the whole chapter.

The nearest thing you already hold is a bank branch. The counter faces the street, with a clerk behind it; the strongroom sits behind a wall you never see. You can stand at the counter all morning. You cannot walk into the strongroom, because the clerk controls that door, not you. That is the front-and-back split exactly: one part facing you, one part facing away.

Here is where the comparison breaks, and the break matters. In a bank, the counter and the strongroom belong to the same organisation, and the clerk is an employee who can be corrected. In software, the part facing the user is a program running on a computer the user owns — one they can open, read and change. The counter is not a clerk. It is a machine you handed to the visitor.

Before reading on, take the guess those two words invite. The club has thirty seats, and the rule is that no thirty-first student gets in. Which half would you put that rule in — the half facing the student, or the half facing away? Most people choose the half facing the student, because that is where the sign-up form sits and where the action seems to happen. Hold that guess. The rest of this chapter tests it.

## Where does this thing even live?

Before anything else, one decision: is this a phone app, an installed desktop program, or a website anyone can open in a browser? Each is a different **platform** — the environment a piece of software actually runs inside — and each needs different tools to build for.

This course builds for the web. A **browser** — the program you open web pages in — is itself a kind of **interpreter**, a program that translates and runs code as it goes. It reads three things: **HTML** (HyperText Markup Language), **CSS** (Cascading Style Sheets) and **JavaScript**. Then it turns all three into pixels and interactions on your screen, whether you are on Windows, macOS, Linux or a phone.

That is the specific power a website has that an installed app does not: write it once, and any browser, on any device, can run it. It is the same promise a high-level language makes to a chip — translate once, run anywhere — made again by a browser to a whole class of devices.

Worth saying plainly before going further: everything in the rest of this chapter is the same map even if you build this as a phone app. Only the tools change. A phone app usually cannot run inside a **browser sandbox** — a locked space where a browser runs code safely. It has to be installed and given permission directly. The shape underneath stays identical. That comes back at the end of the chapter.

![A warm coral diagram showing three platform cards, phone app, desktop program, and website, with website highlighted as this course's choice and an arrow down into a browser hub labeled equals an interpreter](/img/lessons/intro-3/choosing-a-platform.png)

## What the student actually sees and touches

The first real thing this page needs is something a student can look at: a form with a name field, an email field and a **Sign up** button. Further down, a list showing who has already joined.

All of it is the **frontend** — the part of the software that runs on the student's own device and faces them. Everything the student sees, clicks and types into lives here.

Each piece of it is a **component**: one reusable piece of interface, built once and used wherever it is needed. A student card showing one name and a cancel button gets built once. It is then reused once per student, instead of being written out by hand thirty separate times.

Underneath the components sits a division of labour worth knowing by name, because Stage 1 treats each piece as its own skill. HTML arranges the structure — this is a heading, this is a button, this is a list. CSS decides how it looks — this button is blue, this text is bold, this list has space between its items. JavaScript makes it respond — when this button is clicked, do this.

The browser assembles all three into the **DOM** (Document Object Model) — a live, in-memory model of the page. It is that model, not the original files, that changes the instant a student interacts with something.

One more thing the form has to survive: the same page opening on a laptop, and on a phone between classes. That is **responsiveness** — the interface reshaping itself correctly for whatever screen it lands on. It usually works by defining a handful of size thresholds, called **breakpoints**, where the layout deliberately changes shape rather than only shrinking. Stage 1 builds all of this with a tool called **Next.js**, worth knowing the name now even though what it does belongs to its own chapter.

![A violet diagram showing HTML, CSS, and JavaScript cards feeding into one DOM hub, which branches to three repeated identical student card components on one side and a row of shrinking mobile, tablet, and desktop breakpoint bars on the other](/img/lessons/intro-3/anatomy-of-the-frontend.png)

## The trap

Now the guess from the start of this chapter comes back. The club has thirty seats. Almost everyone puts the seat check in the frontend, right before the button submits — something like *if the count is already 30, refuse the click*. It is the wrong answer, and the reason is the sentence this entire chapter rests on.

The frontend is code running on the student's own device, inside the student's own browser. Every browser ships with **developer tools** — panels, built for debugging, that let anyone inspect and edit the page's code live. A curious student does not need to be a security expert to find this. Right-click, Inspect, and there the check is, in plain text, editable. Delete it. Submit the form five hundred times. Nothing stops them, because the thing enforcing the rule is sitting on a machine they control, not on one you do.

This is the difference between **client-side** checks, which run on the user's own device, and **server-side** checks, which run on a machine you control. Seen from the server, the browser is **the client** — the program making the request.

One sentence carries the whole design: **the frontend can never be trusted to enforce anything.** No matter how carefully it is written, you do not control the device it runs on. Almost every box left in this chapter exists because of that sentence. The rule has a name, older than the web: **never trust the client**. A client-side check is still worth writing. It gives honest users fast feedback and catches a typo before the network ever sees it. It is a courtesy, never a guarantee.

That courtesy has a measurable price, which is why people reach for it. Chrome UX Report data across the top 50,000 websites was aggregated for August 2026. The median round-trip time was 92 milliseconds on desktop and 145 on mobile. Visitors in Pakistan saw a median of 270 milliseconds. A check that runs on the student's own device skips that wait completely. The backend cannot.

![Two side-by-side panels comparing a signup rule enforced in the frontend, shown in red as wrong because any student can open developer tools and rewrite or delete the check leaving the rule not actually enforced, against the same rule enforced in the backend, shown in green as right because the frontend only asks permission while the backend holds the rule on a server the student cannot reach or edit](/img/lessons/intro-3/the-trap.png)

## Something the student can't see or touch

If the rule cannot live where the student can reach it, it has to live where the student cannot. That means a machine you control, running a second program the student never sees. That program receives a request — this student wants to sign up — checks the rule, and sends back an answer.

This is the **backend** — the part of the software that runs on a machine you control, away from the user.

It is often written in the very same languages as the frontend. Python and JavaScript both work here, because **Node.js** lets JavaScript, a language born for browsers, run outside one. The difference is not the language. It is the job and the location. The frontend shows things and collects input. The backend decides things and enforces the rules the student can never override. It runs on a **server** — an ordinary computer, always switched on and reachable, in a data centre or a provider's warehouse.

One property of a well-built backend is worth naming early, because it explains a decision in the next section. Each request is normally treated as its own, independent event, with no memory of the request before it unless something is deliberately built to remember. That has a name: **statelessness**, a backend keeping no memory between requests. It sounds like a weakness. It is what lets many copies of the same backend run at once and share the load. It also means anything the backend must remember has to be stored somewhere built to remember it.

The failure is worth stating plainly. When the backend is down, nobody can sign up at all, and the list freezes at whatever it last said. The frontend keeps drawing itself, so the page looks healthy while nothing works. That is why a broken backend usually gets reported as *the button does nothing*.

![A dark charcoal and magenta diagram showing three separate, unconnected request bubbles each independently reaching the backend server with no memory linking them to each other, next to a card explaining that this statelessness is what lets many copies of the backend run at once](/img/lessons/intro-3/the-backends-job.png)

## How the two even talk

Two programs now exist, on two different machines. How does a click on one reach the other?

They need an agreed way to talk: a fixed set of questions the backend promises to answer, in a fixed shape, so the frontend knows exactly how to ask. That agreement is an **API** (Application Programming Interface). Think of a restaurant menu. You do not walk into the kitchen and cook. You order from a fixed list the kitchen has agreed to make, phrased the way the kitchen expects to hear it.

The language those requests travel in has a name too — **HTTP** (HyperText Transfer Protocol) — and it comes with a small vocabulary worth knowing. Every request names a **method**, the kind of thing being asked. `GET` reads something without changing it (*show me the signup list*). `POST` creates something new (*add this signup*). `PUT` or `PATCH` changes something that already exists. `DELETE` removes it. Every response carries a **status code**, a number saying what happened. `200` means success. `403` means you are not allowed to do that. `404` means that does not exist. `500` means something broke on our end. And every request is aimed at a specific **endpoint** — the address naming exactly which menu item is being ordered. `/signups` is the whole list; `/signups/14` is one student's entry.

**REST** (Representational State Transfer) is one common house style for arranging that menu consistently. *Sign this student up* always becomes `POST /signups`; *show me the list* always becomes `GET /signups`. Roy Fielding named it in his 2000 doctoral dissertation. Without a house style, every feature invents its own shape, and every frontend has to learn a new one each time.

Here is that crossing in one line. The frontend sends `POST /signups` with `{ "name": "Alex" }`, a small block of data. The backend checks the rule and sends back `200 OK` with *confirmed, you are number 14* — or `403 Forbidden` with *sorry, we are full*. The contract is the part that breaks worst: change the API's shape without warning, and every frontend built against the old shape breaks at once.

Three more terms live in exactly this box. The checking itself — is this a real name, is there still room — is **validation**. Code that sits in a request's path, running a checklist of jobs before the real logic runs, is **middleware**. A rate limiter, which refuses a student's tenth attempt in one second, is a second, common example. And keeping a written trail of what actually happened — which request came in, when, what it did — is **logging**. Logging is the difference between finding out why something broke in thirty seconds and having no way to know what led to it.

![A six step vertical flow: browser sends a POST request to signups with a name, backend validates whether there is room and the name is real, backend writes the new row to the database, database confirms the row was saved, backend replies 200 OK with the signup number, and browser updates the list on screen, with a side branch showing that if the room check fails the backend replies 403 forbidden and skips the database steps entirely](/img/lessons/intro-3/one-signup-request.png)

## The goldfish problem

One more hole to close. If the backend remembers signups only in its own running memory, what happens the instant it restarts — a deploy, a crash, anything at all? The count resets to zero and every signup is gone. As built so far, this backend has the memory of a goldfish. That is the statelessness from a moment ago, now causing a real problem instead of a convenience.

What is missing is somewhere data survives a restart: a **database** — a dedicated system whose whole job is storing information reliably and handing it back later, exactly as it was left.

Stage 1 shows you two families, and the difference is a real design decision rather than two brands of one thing. **SQL** (Structured Query Language) databases, such as Postgres, store data in strict tables — rows and columns, like a very disciplined spreadsheet. Every row in a `signups` table might hold exactly a name, an email and a `joined_at` timestamp, no more and no fewer. A **relationship** is how one table points at another. This signup row might hold a club-id column that points at a row in a separate `clubs` table, instead of repeating the club's name and description on every signup.

**NoSQL** databases — first sold as *no SQL*, later explained as *not only SQL* — such as MongoDB, store looser, more flexible bundles called documents. One signup can carry an extra field another does not, without a table being redesigned first. Neither beats the other. SQL rewards data with a stable, predictable shape and real relationships worth enforcing. NoSQL rewards data whose shape genuinely varies from one entry to the next.

One more name worth knowing: **Redis**, a database built purely for speed. It holds data in memory rather than on disk, so it works as a shortcut in front of the main store rather than instead of it. A store used that way is called a **cache** — a fast copy that saves a slower trip. What that shortcut costs is visible in its free tier. Upstash's free Redis tier, as of 2026, allows 256 megabytes of data and 500,000 commands a month, and a cache issues a command on nearly every request. Cross that line and the shortcut starts refusing traffic.

The database is the box where failure is permanent. Lose the backend and sign-ups pause. Lose the database and every signup taken so far is gone for good.

![Three different shapes for three different databases: SQL shown as a strict blue grid of table cells, NoSQL shown as a loose cluster of variably sized green document blobs, and Redis shown as one fast amber cache card](/img/lessons/intro-3/sql-vs-nosql-vs-redis.png)

## Who's allowed to do what

A sharper problem. Right now any request at all can cancel any student's signup, because the backend has no idea who is asking. It receives *cancel signup 14* and does it, no questions asked.

That splits into two ideas, worth keeping apart because people run them together for years. **Authentication** is proving who you are — logging in, usually with a password. **Authorization** is what you are allowed to do once the system knows who you are.

A well-built backend never stores a password as readable text. It runs the password through **hashing** — a one-way scramble that produces a code you cannot turn back into the password — and stores only that code. If the database is ever stolen, the passwords inside it are not readable. A hash is deliberately slow and memory-hungry to compute, and that cost is the whole defence. It is what stops an attacker from guessing billions of passwords a second. The OWASP Password Storage Cheat Sheet recommends a hashing method called Argon2id. Its baseline is about 19 megabytes of memory per hash and two passes over the input. A single hash should stay under one second. That memory is spent on every login, on purpose.

You have likely used a lighter version of authentication without naming it. *Sign in with Google* is authentication handled by someone else's system on your behalf, under a pattern called **OAuth** — a way to let one site confirm who you are through another, without your password being shared.

Authorization is the second, separate idea, and it needs its own mechanism. In practice the backend hands an authenticated student a **token** — a signed piece of data proving *this is genuinely Alex, checked a moment ago*. The browser attaches that token to every later request. That is how the backend answers both questions — is this Alex, and is Alex allowed to do this — without asking for the password again.

Get the authorization check wrong and the damage is immediate and quiet. One student can cancel another student's seat, or read a list meant for the club admin, while every other part of the app looks correct.

![A vertical flow: student logs in with a password labeled authentication proving who you are, backend issues a token proving identity, student later sends a request with that token to cancel a specific signup, backend checks in a decision diamond labeled authorization whether this student is allowed to cancel this signup, branching to a green allowed box when it is their own signup and a red denied box when it belongs to someone else even though they were successfully authenticated](/img/lessons/intro-3/auth-vs-authz.png)

## More than one builder

This app is not realistically built by one person typing alone, and increasingly it is not built only by people. You, a teammate and quite possibly an AI coding agent will all touch this same code. What happens when two edits collide — you and the agent both change the same file in different ways? How do you undo a change that turns out, three days later, to have been wrong?

**Git** keeps a complete history of every change ever made to a project. It works like a save-point system, but for an entire codebase rather than one file, and it lives in a folder called a **repository**. Each saved snapshot is a **commit**: a labelled, timestamped record of exactly what changed and why. **GitHub** is where that history lives online, so more than one person or agent can see it. Each of them can work on a separate copy, called a **branch**. Merging that work back happens through a **pull request**: a formal *here is what I changed, please review it before it joins the real project*. When two branches change the same lines in incompatible ways, Git flags a **merge conflict**. It asks a human to decide which version wins, or what combination of both. It will not guess.

This matters more, not less, once an AI agent is one of the people committing. An agent can produce a large, fast-moving stream of changes. That is exactly why the *here is what changed, please review it* step stops being paperwork and becomes the place your judgement gets applied. The pull request is not the agent's paperwork. It is the moment you decide whether the change is yours.

![A flow showing two branches, You and an AI coding agent, each branching off a main project on GitHub with their own sequence of commits, both feeding into a shared pull request box labeled here's what changed please review before it joins the real project, which leads to a final box labeled reviewed and merged into main](/img/lessons/intro-3/git-and-github.png)

## From your laptop to the real world

One gap left. Everything built so far sits on one laptop — yours. How does it become a real website, at a real address, that any student can open?

That is **deployment**: taking the frontend and the backend and putting them on machines that are always on and always reachable, rather than a laptop that sleeps the moment you close the lid. Getting a human-readable address to point at those machines is a small piece of infrastructure called **DNS** (Domain Name System). It is the reason typing `thebridgebalance.app` reaches the right server, without anyone having to memorise a raw numeric address. The human-readable address itself is called a **domain**.

It is common to keep at least two copies running. A **production** environment is the one real users touch. A **staging** or **development** environment is where changes are tried first, so a mistake never lands in front of a real student mid-sign-up. A tool like Vercel does the deployment work for you, including a preview address for every proposed change.

The failure here has the widest reach on the map. A backend failure stops sign-ups. A DNS failure stops the site existing — no page loads and no address reaches it, even though every machine behind it is running perfectly.

<Callout type="warning" title="Safety floor">
The frontend is a machine you do not own, and nothing on it is a guarantee. Never store a password as readable text, never place a rule the club depends on in code the student can edit, and never paste a real key or password into a file you are about to deploy. Before this stack goes live, check on the machine you control that the thirty-seat limit and the cancel rule are enforced there, not merely drawn on the screen.
</Callout>

![A sky-blue runway diagram showing a laptop connecting through DNS to a domain, which then branches to a gray staging box for trying changes first and a bold green production box marked with a rocket for real students and real signups](/img/lessons/intro-3/from-laptop-to-live.png)

## What just got built

![A complete system diagram showing the student's browser frontend sending a request through an API contract to a backend that checks the rule with validation middleware and logging, the backend reading and writing a database and checking with an auth service about who is asking, with deployment hosting both the frontend and backend and Git plus GitHub feeding into the backend labeled more than one builder](/img/lessons/intro-3/assembled-system.png)

Step back and look at what happened. Every box in this chapter is itself code, and it runs through the ladder from the previous chapter. A **compiler** or an interpreter translates it down into **assembly** — a low-level language close to the machine — and then into **binary**. Binary is the raw pattern of ones and zeros a processor runs. All of it sits on top of an **operating system**, the software that manages a computer's hardware and its programs. That is one more layer between this app and the raw electronics underneath. Nothing new was invented here. It is more rooms, built on the same ladder.

## The same map, wearing different clothes

Here is the payoff for building this once. The shape — frontend, backend, API, database, auth, collaboration, deployment — is not a website idea. It is close to the shape of all modern software. Watch it hold as the platform changes.

![A grid comparing platform against frontend role and backend role across five rows: web uses a browser UI in JavaScript or Next.js with a server you control in Python or Node, mobile uses native UI in Swift or Kotlin with the same kind of server, desktop uses an installed app window in C++ C# or Electron with the same kind of server, blockchain keeps the same app UI but replaces the backend with a smart contract running identically on thousands of computers instead of one so no single person can quietly rewrite the rule, and IoT devices use a small sensor as the frontend with a tiny chip or cloud service as the backend](/img/lessons/intro-3/same-map-different-terrain.png)

Build this as a phone app and the boxes do not change; only the frontend's language does — Swift on an iPhone, Kotlin on Android, in place of the web's JavaScript. Everything downstream of that — the API, the backend, the database, the auth check — is identical in shape. Build it as a desktop program and the boxes hold again, usually through a tool like Electron that wraps the same web technologies in a desktop window.

The more interesting case: a **blockchain** application — one built on a shared record that many independent computers keep in step — replaces exactly one box. The backend becomes a **smart contract**, code that runs identically on thousands of independent computers at once instead of one server you control. No single person can quietly rewrite the rule afterwards. Everything else — a frontend, the need for authentication, the need for an API to reach it — is the same map you just built.

An **IoT** (Internet of Things) device — a smart thermostat, a fitness tracker — shrinks the same shape down. A small sensor plays the frontend's role, and a tiny chip or a cloud service plays the backend's.

**Cybersecurity** was never a separate box waiting to be introduced. It is the question *what happens if someone lies to this box*, asked at every box on the map above. You have already met it three times in this chapter: the deleted seat check in the trap, the plain-text password that hashing avoids, and the authentication-versus-authorization split. All three were cybersecurity, working under a different name.

What people usually mean by AI development follows the same pattern one more time: the backend box holds a trained model instead of hand-written rules. It still needs an API to reach it. It still needs a database, often to store what it retrieved or learned. It still needs auth, more urgently than most, given what a model can be pushed into revealing or doing if anyone at all can reach it unchecked.

None of this is one person's invention, and there is a real thread to follow if you want the sources rather than the summary. The rule that a client cannot be trusted goes back to a 1975 paper by Jerome Saltzer and Michael Schroeder. It listed *complete mediation* — every access checked for authority — among its design principles for protecting information. REST was named by Roy Fielding in his 2000 doctoral dissertation. And the password advice changes over time, so the page worth bookmarking is OWASP's Password Storage Cheat Sheet. That is where to check today's recommended settings, instead of trusting any fixed number — including the one in this chapter.

## Two ways to hold the map wrong

You can now build this whole stack by hand, one box at a time. Or you can ask an AI agent to generate it in a single pass: frontend, backend, database write and something that looks like an auth check. Both paths are open to you, and both fail in a specific way.

The first failure is **over-trust**. Accept an agent's stack whole, and you can end up with a seat check sitting in the frontend, a password stored as plain text, and an authorization rule nobody wrote down. Every box is present. Every screen works. And there is no answer to the one question that mattered: which machine enforces what, and who can reach it. The stack looks finished, and the seat cap is a decoration.

The second failure is **over-caution**. Hand-build every box alone, refuse the agent on all of it, and you can spend weekends rebuilding middleware an agent would have drafted in an afternoon. That feels like discipline. It is the same broken relationship with the map, pointed the other way. The boxes are still the boxes, and you are still moving at the speed of one pair of hands.

The move that avoids both is the one this chapter has been building towards, and it fits in a sentence: **decide, box by box, where each rule is enforced, and check that the enforcement sits on a machine you control.** Specify the rule. Bound the frontend to showing and asking, never enforcing. Verify on the machine you own. Own the answer when it breaks. None of that is typing, and the agent cannot do it for you.

<Callout type="info" title="Where this sits">
Every box you met in this chapter is not trivia sitting to one side of **Stage 1**. In this order, it *is* the next several chapters of Stage 1. Frontend, Backend, Databases and Git & GitHub each take one box from this story and go deep on it. You already have the map. Stage 1 hands you the tools for each room on it. The single claim underneath — that a rule is only real where it is enforced — comes back sharper much later, in Spec-Driven Engineering.
</Callout>

**What you can do next:** without looking back at this chapter, pick an app you actually use — a delivery app, a messaging app — and name its version of every box on the map. What runs on your own device, and what runs on a machine you cannot reach? Where must its data survive a restart? And which rule does it enforce somewhere you cannot touch, rather than merely showing you on your phone? Then answer the question your guess at the start of this chapter was testing. Name one check in that app that a person with developer tools could delete from the copy running on their own device. If you cannot find one, say why the copy you hold has nothing worth deleting.
