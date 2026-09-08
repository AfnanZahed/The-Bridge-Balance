---
sidebar_label: "The Architecture Map"
sidebar_position: 2
title: "Let's Build One Thing Together: The Complete Architecture Story"
description: "One imaginary sign-up page, nine walls in a row, and the entire shape of Stage 1 assembling itself in front of you — with a diagram for every piece."
keywords: [frontend, backend, API, REST, database, authentication, authorization, Git, GitHub, deployment, software architecture, HTTP, DNS]
chapter_state: "placeholder"
video_url: ""
---

# Let's Build One Thing Together: The Complete Architecture Story

> Every term in this chapter exists because the story hit a wall that needed it. None of them are here just to be defined.

You're about to build something — not on a laptop, not yet, just in your head, one decision at a time. By the end of this chapter, the entire shape of **Stage 1** will have assembled itself in front of you, one wall at a time, in exactly the order Stage 1 itself teaches it.

The thing you're building: a page where students sign up for a club. The AI club, say — capped at thirty seats.

## Where does this thing even live?

Before anything else, one decision: does this live as a phone app, an installed desktop program, or a website anyone can open in a browser? Each of those is a different **platform** — the environment a piece of software actually runs inside — and each one needs different tools to build for.

This course builds for the web, and it's worth being precise about why a browser is even capable of running someone else's program safely. A **browser** is itself a kind of interpreter — the exact idea from the previous chapter, one level up. It reads HTML (the page's structure), CSS (its appearance), and JavaScript (its behaviour), and turns all three into pixels and interactions on your screen, on the fly, regardless of whether you're on Windows, macOS, Linux, or a phone. That's the specific power a website has that an installed app doesn't: write it once, and any browser, on any device, can run it — the same "translate once, run anywhere" promise a high-level language makes to a chip, made again by a browser to an entire class of devices.

Worth saying plainly, though, before going any further: everything in the rest of this chapter is the same map even if you built this as a phone app instead. Only the tools change — a phone app usually can't run inside a browser sandbox the way a website does, so it needs to be installed and given permission directly. The shape underneath — what has to exist, and why — stays identical. That comes back properly at the end of this chapter.

![A warm coral diagram showing three platform cards, phone app, desktop program, and website, with website highlighted as this course's choice and an arrow down into a browser hub labeled equals an interpreter](/img/lessons/intro-3/choosing-a-platform.png)

## What the student actually sees and touches

The first real thing this page needs is something a student can look at: a form with a name field, an email field, a "Sign up" button. Maybe a list further down, showing who's already joined.

This is the **frontend** — literally, the front end of the software, the part facing the user. Everything the student sees, clicks, and types into lives here. Each piece of it — the form, the button, the list — is a **component**: one reusable piece of interface, built once and used wherever it's needed. A "student card" component showing a name and a cancel button, for instance, gets built exactly once and then repeated once per student on the list, instead of being written out by hand thirty separate times.

Underneath the components sits a genuine division of labour worth knowing by name, because Stage 1 treats each piece as its own skill: **HTML** describes structure (this is a heading, this is a button, this is a list); **CSS** describes appearance (this button is blue, this text is bold, this list has spacing between items); **JavaScript** describes behaviour (when this button is clicked, do this). The browser assembles all three into something called the **DOM** — a live, in-memory model of the page — and it's that model, not the original files, that actually changes the instant you interact with something.

And the fact that this same form has to look right whether a student opens it on a laptop or on a phone between classes has its own name too: **responsiveness** — the interface reshaping itself correctly for whatever screen it lands on, usually by defining a handful of size thresholds (commonly called **breakpoints**) where the layout deliberately changes shape rather than just shrinking. Stage 1 builds all of this with a tool called Next.js — worth knowing the name now, even though what it actually does is a story for that chapter, not this one.

![A violet diagram showing HTML, CSS, and JavaScript cards feeding into one DOM hub, which branches to three repeated identical student card components on one side and a row of shrinking mobile, tablet, and desktop breakpoint bars on the other](/img/lessons/intro-3/anatomy-of-the-frontend.png)

## The trap

Here's where it's worth pausing, because this is the mistake almost everyone makes once, and it's worth making on paper first so it never happens for real.

The club has thirty seats. Where should the code check that there's still room, before letting someone sign up? The obvious-looking answer: right there in the frontend, right before the button submits — something like *"if the current count is already 30, refuse the click."*

It's the wrong answer, and the reason is worth sitting with in real detail. The frontend is code that runs on the **student's own device**, inside their own browser. Every browser ships with a set of **developer tools** — genuinely built for legitimate debugging, but usable by anyone — that let you inspect and edit the exact code running on the page, live, in real time. A curious student doesn't need to be a hacker to find this. Right-click, "Inspect," and there it is: the very check meant to stop them, sitting in plain text, editable. Delete the check. Submit the form five hundred times in a loop. Nothing stops them, because the thing enforcing the rule is sitting on a device they fully control, not yours.

This is usually called the difference between **client-side** checks (run on the user's own device — the browser here is "the client") and **server-side** checks (run on a machine you control). It generalises into one of the oldest working principles in software security, worth carrying with you well past this one example: **never trust the client.** Anything a client-side check catches is a nicety for an honest user — faster feedback, no waiting for a network round-trip — never a real guarantee.

That leaves one rule worth carrying forward through the rest of this course: **the frontend can never be trusted to enforce anything**, no matter how carefully it's written, because you don't control the device it runs on. Almost everything left in this chapter exists because of that single sentence.

![Two side-by-side panels comparing a signup rule enforced in the frontend, shown in red as wrong because any student can open developer tools and rewrite or delete the check leaving the rule not actually enforced, against the same rule enforced in the backend, shown in green as right because the frontend only asks permission while the backend holds the rule on a server the student cannot reach or edit](/img/lessons/intro-3/the-trap.png)

## Something the student can't see or touch

If the rule can't live where the student can reach it, it has to live somewhere the student can't — on a machine you control, running a second program the student never sees directly. That program receives a request — *this student wants to sign up* — checks the rule, and sends back an answer.

This is the **backend**. It's often written in the very same languages as the frontend — Python, JavaScript (via a runtime called Node.js, which is precisely what lets a language born for browsers run as a backend instead), plenty of others — the difference isn't the language, it's the job and the location. The frontend shows things and collects input. The backend decides things, and enforces things the student can never override, because it's running on a machine only you control: a **server**, which despite the almost magical way people talk about it is just an ordinary computer, sitting somewhere — in a data centre, in a cloud provider's warehouse, occasionally still literally under someone's desk — that stays switched on and reachable.

One property of a well-built backend is worth naming early, because it explains a design choice you'll meet properly in the very next section: each request a backend receives is typically treated as its own, independent event, with no memory of the request before it unless something is deliberately built to remember. That sounds like a limitation. It's actually what makes it possible to run many copies of the same backend at once to handle more traffic — but it does mean "remembering things between requests" has to be solved on purpose, not assumed for free.

![A dark charcoal and magenta diagram showing three separate, unconnected request bubbles each independently reaching the backend server with no memory linking them to each other, next to a card explaining that this statelessness is what lets many copies of the backend run at once](/img/lessons/intro-3/the-backends-job.png)

## How the two even talk

Two programs now exist, running on two completely different machines. How does clicking a button on one actually reach the other?

They need an agreed way to talk: a fixed set of questions the backend promises to answer, in a fixed shape, so the frontend knows exactly how to ask. That agreement is called an **API** — an Application Programming Interface. Think of it like a restaurant menu: you don't walk into the kitchen and cook it yourself, you order from a fixed list the kitchen has already agreed to make, phrased the way the kitchen expects to hear it.

The actual language those requests travel in has a name too — **HTTP** (HyperText Transfer Protocol) — and it comes with its own small, worth-knowing vocabulary. Every request names a **method** describing the kind of thing being asked: `GET` to read something without changing it (*show me the signup list*), `POST` to create something new (*add this signup*), `PUT` or `PATCH` to change something existing, `DELETE` to remove it. Every response carries a **status code** telling you, numerically, what happened: `200` means success, `403` means *you're not allowed to do that*, `404` means *that doesn't exist*, `500` means *something broke on our end*. And every request is aimed at a specific **endpoint** — a URL-shaped address identifying exactly which "menu item" is being ordered, such as `/signups` for the whole list or `/signups/14` for one specific student's entry.

**REST** is simply one common, popular house style for organising an API's menu sensibly using exactly this vocabulary, so *"sign up a new student"* consistently becomes `POST /signups` and *"show me the current list"* consistently becomes `GET /signups`, instead of a different, one-off shape being invented every time. Concretely, this is what crossing that gap actually looks like: the frontend sends `POST /signups` with `{ "name": "Alex" }`, and the backend checks the rule and sends back `200 OK` with *"confirmed, you're number 14"* — or `403 Forbidden` with *"sorry, we're full."*

Three more terms live in exactly this box, and they're worth naming while you're here rather than meeting cold later. The checking itself — is this a real name, is there still room — is called **validation**. Code that sits in a request's path running a checklist of jobs like this before the real logic even runs is called **middleware**; a rate limiter that refuses a student's tenth signup attempt in one second is a second, equally common example of the same idea. And keeping a written trail of what actually happened — which request came in, when, what it did — is called **logging**, and it's the difference between finding out *why* something broke in thirty seconds and staring at a broken feature with absolutely no way to know what led to it.

![A six step vertical flow: browser sends a POST request to signups with a name, backend validates whether there is room and the name is real, backend writes the new row to the database, database confirms the row was saved, backend replies 200 OK with the signup number, and browser updates the list on screen, with a side branch showing that if the room check fails the backend replies 403 forbidden and skips the database steps entirely](/img/lessons/intro-3/one-signup-request.png)

## The goldfish problem

One more hole to close. If the backend only remembers signups in its own running memory, what happens the instant it restarts — a deploy, a crash, anything at all? The count resets to zero. Every signup, gone. As built so far, this backend has the memory of a goldfish — which is exactly the "no memory between requests" property from a moment ago, now causing a real problem rather than a design convenience.

What's missing is somewhere data survives a restart: a **database** — a dedicated system whose entire job is storing information reliably and handing it back later, exactly as it was left. Stage 1 shows you two families of these, and the difference is a real design decision, not just two brands of the same thing. **SQL** databases (Postgres is the one you'll use) store data in strict tables — rows and columns, like a very disciplined spreadsheet, where every row in a `signups` table might have exactly a `name`, an `email`, and a `joined_at` timestamp column, no more and no less. A **relationship** is how one table connects to another: this signup row might hold a `club_id` column pointing at a row in a separate `clubs` table, rather than repeating the club's full name and description on every single signup. **NoSQL** databases (MongoDB is the common one) store looser, more flexible bundles called documents instead — closer to a small nested block of data per entry, where one signup could freely carry extra fields another one doesn't, without needing to redesign a table first. Neither is simply better: SQL rewards data with a stable, predictable shape and real relationships worth enforcing; NoSQL rewards data whose shape genuinely varies from one entry to the next. One more name worth knowing: **Redis**, a database built purely for speed, keeping data in memory rather than on disk, used as a shortcut or a cache layered in front of the main store rather than replacing it.

![Three different shapes for three different databases: SQL shown as a strict blue grid of table cells, NoSQL shown as a loose cluster of variably sized green document blobs, and Redis shown as one fast amber cache card](/img/lessons/intro-3/sql-vs-nosql-vs-redis.png)

## Who's allowed to do what

New problem, and it's a sharp one: right now, any request at all can cancel any student's signup, because the backend has no idea *who* is actually asking. It just receives *"cancel signup 14"* and does it, no questions asked.

That splits into two separate ideas, and it's worth keeping them apart — people conflate them for years if nobody draws the line early. **Authentication** is proving who you are: logging in, typically with a password. Worth a genuinely important side note here: a well-built backend never stores that password as plain, readable text — it runs it through a one-way scrambling process called **hashing** and stores only the scrambled result, so that even if the database itself were ever stolen, the actual passwords inside it wouldn't be readable. You've likely already used a lighter version of authentication without thinking about it by name: "Sign in with Google" or "Sign in with Apple" is authentication handled by someone else's system on your behalf, under a broader pattern called **OAuth**.

**Authorization** is the second, separate idea: what you're allowed to do once the system knows who you are. Being logged in doesn't automatically mean you're allowed to do any specific thing — a student should manage their own signup, and only their own; only the club's admin should see or cancel anyone's. In practice, the backend typically hands an authenticated student a **token** — a signed piece of data proving *"yes, this is genuinely Alex, verified a moment ago"* — which the browser then attaches to every later request, so the backend can check both questions, authentication and authorization, on every single one without asking Alex to type a password again each time.

![A vertical flow: student logs in with a password labeled authentication proving who you are, backend issues a token proving identity, student later sends a request with that token to cancel a specific signup, backend checks in a decision diamond labeled authorization whether this student is allowed to cancel this signup, branching to a green allowed box when it is their own signup and a red denied box when it belongs to someone else even though they were successfully authenticated](/img/lessons/intro-3/auth-vs-authz.png)

## More than one builder

Zoom out for a moment. This app isn't realistically built by one person, typing alone, forever — and increasingly, it isn't built only by people at all. You, maybe a teammate, and quite possibly an AI coding agent are all going to touch this same code. What happens when two edits collide — you and the agent both change the same file in different ways? How do you undo a change that turns out, three days later, to have been wrong?

**Git** keeps a complete history of every change ever made to a project — a save-point system, but for an entire codebase, not one file at a time, living in a folder called a **repository**. Each saved snapshot is a **commit**: a labelled, timestamped record of exactly what changed and why. **GitHub** is where that history lives online, so more than one person — or agent — can see it, work on their own separate copy called a **branch**, and propose merging their changes back in through a **pull request**: a formal *"here's what I changed, please review it before it joins the real project."* When two branches genuinely changed the same lines in incompatible ways, Git flags a **merge conflict** and asks a human to decide which version — or what combination of both — should win, rather than silently guessing.

This matters more, not less, once an AI agent is one of the people committing code. An agent can produce a large, fast-moving stream of changes — which is exactly why the "here's what changed, please review it" step of a pull request stops being a bureaucratic formality and becomes the actual place your judgment gets applied, a thread this course picks back up properly once you reach Spec-Driven Engineering.

![A flow showing two branches, You and an AI coding agent, each branching off a main project on GitHub with their own sequence of commits, both feeding into a shared pull request box labeled here's what changed please review before it joins the real project, which leads to a final box labeled reviewed and merged into main](/img/lessons/intro-3/git-and-github.png)

## From your laptop to the real world

One gap left. Everything built so far has been sitting on one laptop — yours. How does it become a real website, at a real address, that any student can actually open?

That's **deployment**: taking the frontend and backend and putting them on machines that are always on, always reachable, rather than a laptop that sleeps the moment you close the lid. Getting a human-readable address to actually point at those machines is its own small piece of infrastructure called **DNS** (Domain Name System) — it's the reason typing `thebridgebalance.app` reaches the right server instead of requiring anyone to memorise a raw numeric address. The human-readable address itself is called a **domain**. Worth naming, not unpacking here: this is what a tool like Vercel exists to do, and it's also common to keep at least two separate copies running — a **production** environment real users touch, and a **development** or **staging** environment where changes get tried first, precisely so a mistake never lands directly in front of a real student mid-signup.

![A sky-blue runway diagram showing a laptop connecting through DNS to a domain, which then branches to a gray staging box for trying changes first and a bold green production box marked with a rocket for real students and real signups](/img/lessons/intro-3/from-laptop-to-live.png)

## What just got built

![A complete system diagram showing the student's browser frontend sending a request through an API contract to a backend that checks the rule with validation middleware and logging, the backend reading and writing a database and checking with an auth service about who is asking, with deployment hosting both the frontend and backend and Git plus GitHub feeding into the backend labeled more than one builder](/img/lessons/intro-3/assembled-system.png)

Step back and notice something. Every one of these boxes is itself high-level-language code, running through the exact journey from the previous chapter: translated down through a compiler or interpreter, into assembly, into binary — sitting, the whole time, on top of an **operating system**, which is itself one more abstraction layer between this entire app and the raw electronics underneath. Nothing new was invented in this chapter. It's more rooms, built on the same ladder.

## The same map, wearing different clothes

Here's the payoff for having built this once, carefully. This shape — frontend, backend, API, database, auth, collaboration, deployment — isn't a website-only idea. It's close to the shape of *all* modern software. Watch it hold as the platform changes.

![A grid comparing platform against frontend role and backend role across five rows: web uses a browser UI in JavaScript or Next.js with a server you control in Python or Node, mobile uses native UI in Swift or Kotlin with the same kind of server, desktop uses an installed app window in C++ C# or Electron with the same kind of server, blockchain keeps the same app UI but replaces the backend with a smart contract running identically on thousands of computers instead of one so no single person can quietly rewrite the rule, and IoT devices use a small sensor as the frontend with a tiny chip or cloud service as the backend](/img/lessons/intro-3/same-map-different-terrain.png)

Build this as a phone app instead, and the boxes don't change — only the frontend's language does: Swift for an iPhone, Kotlin for Android, in place of the web's JavaScript. Everything downstream of that — the API, the backend, the database, the auth check — is identical in shape; only the frontend swaps its outfit. Build it as a desktop program, and the boxes hold again, just packaged differently, often through a tool like Electron that quietly wraps the same web technologies in a desktop window.

The more interesting case: a blockchain application replaces exactly one box. The backend becomes a **smart contract** — code that runs identically on thousands of independent computers at once, instead of one server you control, so that no single person can quietly rewrite the rule after the fact. Everything else — a frontend, the need for auth, the need for an API to reach it — is the same map you just built.

An IoT device — a smart thermostat, a fitness tracker — shrinks the same shape down: a small sensor plays the frontend's role, a tiny chip or a cloud service plays the backend's.

Cybersecurity was never a separate box waiting to be introduced. It's the question *"what happens if someone lies to this box"*, asked at every single one of the boxes above — and you already met it twice, without the word: the trap earlier in this chapter, and the authentication-versus-authorization split, were both cybersecurity, working under a different name. So is the very existence of hashing student passwords instead of storing them as plain text.

And what people usually mean by AI development mostly follows the same pattern one more time: the backend box now holds a trained model instead of hand-written rules. It still needs an API to reach it. It still needs a database, often to store what it's retrieved or learned. It still needs auth — arguably more urgently than ever, given what a model can be tricked into revealing or doing if anyone at all can reach it unchecked.

<Callout type="info" title="Where this sits">
Every box you met in this chapter is not trivia sitting to one side of **Stage 1** — in this order, it *is* the next several chapters of Stage 1: Frontend, Backend, Databases, and Git & GitHub each take one box from this story and go deep on it. You already have the map. Stage 1 hands you the tools for each room on it.
</Callout>

**What you can do next:** pick any app you actually use — a delivery app, a messaging app, anything — and name its version of every box in this chapter: what's the frontend, what's likely the backend's job, where does its data have to survive a restart, who's it checking before it lets you cancel an order that isn't yours. You won't get every detail right. Getting close is the point — it means the map from this chapter is now something you reach for, not something you read once.
