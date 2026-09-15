---
sidebar_label: "3. Frontend"
sidebar_position: 4
title: "What the Student Actually Clicks: Components, Layouts, and the Limits of the Frontend"
description: "A sign-up form has to answer in three acts — before, during and after a tap — and the layer that draws it can ask the server and guide the student, but can never enforce the thirty-seat cap, because the student controls the device it runs on."
keywords: [components, props and state, React 19, Next.js 16, shadcn/ui, Material UI, daisyUI, responsive design, CSS breakpoints, design system, form validation, accessibility, WCAG 2.2, frontend]
chapter_state: "text-ready"
video_url: ""
scope_multiplier: 1.5
scope_reason: "the frontend is one layer but five interacting mechanisms — component data flow, rendering on two machines, layout and routes, breakpoints, and the form's three states — all bound by one fact: the device that draws the rule is the device the user can edit, so none of it is one continuous line."
---

# What the Student Actually Clicks: Components, Layouts, and the Limits of the Frontend

Twenty-nine students have already signed up for the AI club. One more student opens the sign-up page on a phone, on a weak connection, between two classes. The screen has to answer three questions in three acts. What is the situation right now, before the tap. Is the tap being handled, during it. And did the sign-up work, after it.

All three answers are drawn by the part of the system that runs on the student's own device — the **frontend**, the layer that faces the user and runs on the user's machine. It is the only layer the student can reach.

The architecture map in the intro put the frontend at the top of the stack, and it left one sentence standing: the frontend can never be trusted to enforce anything. This chapter takes that sentence apart. It shows what the frontend is built from, what it shows the student before, during and after a sign-up attempt, and why the thirty-seat cap cannot live here, however carefully the code is written.

## A component is a thing placed together

Start with the smallest piece, because its name is already arguing. A **component** is one reusable part of the interface, and the word says how it works. It comes from the Latin *componere*, to place together — *com-*, together, plus *ponere*, to place. A component is a part placed together with other parts to make a whole.

Read that name on its own and let it form a guess. A component is a reusable picture: a button, a card, a form, built once and dropped in wherever it is needed. Hold that guess. The name points at what a component looks like, and the difficulty sits somewhere the name never mentions.

The nearest thing you already hold is a printed paper form. You design it once — name, email, a line for the signature — print thirty copies, and hand one to each applicant. One edit to the master reaches all thirty. A component is that master copy, and this is where the comparison parts ways. The printed copy cannot change itself as the applicant fills it in. A component can, and that changing is the whole chapter.

## Where these come from, and which versions this page describes

The framework this curriculum builds the frontend with is **Next.js**, made by Vercel, and this chapter describes the 16.2 line that Vercel marked Active LTS in July 2026. Beneath it sits **React**, the library that defines what a component is, at version 19.2.7 as of 1 June 2026. The styling comes from **Tailwind CSS**, on version 4.3. The three component libraries weighed later in this chapter are each on a named release, and those numbers appear where they matter.

## What this layer was built to fix

Before components, a sign-up page was one long stretch of **HTML** — the language that names the parts of a page. The page listed thirty student cards by hand, so the same eight lines of markup repeated thirty times. When the design changed, you edited one card and missed twenty-nine, and the page went live with two different card styles side by side. That was not carelessness. A copy of a thing has no link back to the thing it copied.

The browser made a second problem sharper. A **browser** — the program that displays web pages — was built for documents, not applications. When a student clicked anything that needed the server, the whole page reloaded: a white flash, the scroll position lost, the form cleared. Building an app inside a document viewer meant rebuilding the page on every action.

React's founding idea, published in 2013, was to treat the page as a function of its data instead of a document edited by hand. You describe what the screen should show for a given set of values, and the framework works out the smallest change that makes the real page match. One card is written once. The list of thirty is that card produced thirty times from data, so a change to the master reaches every card.

## The mechanism: props in, state in place, a redraw on change

Here is what the name left out. A component is not a picture. It is a **function that returns markup** — a small piece of code that takes input and produces the part of the page it describes.

The input flows in two directions, and telling them apart is most of what writing a frontend is. **Props** are values handed down from the component's parent — read-only, one-way, like the arguments to a function. **State** is a value the component owns and can change: the text half-typed into a field, whether a request is still in flight, whether the last attempt failed. Props flow in and never change. State lives inside and changes, and a change to state is what makes the framework **re-render** — run the function again and update the page.

The page itself is the **DOM**, the browser's live model of the document held in memory. The components are the recipe; the DOM is the dish as it stands. When state changes, the framework compares the new output with the previous one and edits only the parts that differ. That is why a tap can change one line on the screen without reloading anything.

### Two renderers, two machines

The word **render** is borrowed from art, where it means producing a finished picture from a plan. The metaphor holds for a single drawing and hides something larger. A modern framework renders in two places. **Server components** run on the machine you control and send finished markup to the browser. **Client components** run on the student's device, in JavaScript — the programming language the browser executes. A component that needs a click handler, a typing field, or local state begins with a line, `"use client"`, that moves it into the second group.

The split exists because one renderer is cheap and safe and the other is interactive and exposed. A seat count sent from the server is a fact at the instant it left. A seat count held in a client component is a copy, and it can go stale before the student finishes reading it. One more term belongs here, because it explains the cost. **Hydration** is the step where the browser attaches interactivity to markup the server already sent — the moment a printed page becomes a live one. It is also the moment the client's copy of your code, and its copy of the data, arrive on a device you do not own.

Now score the guess. You said a component is a reusable picture. The shape is right. The part the guess missed is that a component is a function, and half its inputs — the state — live on the device the student controls. Keep that, because it decides the end of this chapter.

## The smallest sign-up form, then the same form broken

Here is the smallest version that works, split the way the mechanism suggests. The count is handed in as a prop. The form owns only its own state.

```tsx
function SeatCounter({ seatsLeft }: { seatsLeft: number }) {
  return <p>{seatsLeft} of 30 seats left</p>;
}
```

```tsx
"use client";
import { useState } from "react";

export function SignUpForm() {
  const [state, setState] = useState("idle");

  async function onSubmit(event) {
    event.preventDefault();
    setState("sending");
    const reply = await fetch("/signups", { method: "POST" });
    setState(reply.ok ? "joined" : "refused");
  }

  return (
    <form onSubmit={onSubmit}>
      <button disabled={state === "sending"}>
        {state === "sending" ? "Sending..." : "Sign up"}
      </button>
      {state === "refused" && <p>Sorry, the club is full.</p>}
    </form>
  );
}
```

The `fetch` on the fifth line is the call to the server, and it stays a black box here; the chapter on the backend opens it. What matters is the shape around it. The form holds one state value and moves it through three settings: idle, sending, then joined or refused. Before the tap, the button is enabled. During it, the button is disabled so a double tap cannot send twice. After it, either the student is in or the screen says the club is full. Those three acts are the frontend's whole job: show the situation, show the work, show the result.

### The same form, deliberately broken

Now break it in the way almost everyone breaks it first. Put the thirty-seat rule in the page, right where the student can see it.

```tsx
// Broken: the rule now lives on the student's device.
if (seatsLeft === 0) {
  return <p>Sorry, the club is full.</p>;
}
```

This looks like the rule. It is a picture of the rule. The student holds the device this runs on, and the browser on that device ships with panels for reading and editing the page. The three lines can be deleted. The disabled button can be switched back on. And even without touching the page, the request the button sends is a message the device can send again, thirty times over, because sending a message is not the same as being allowed to send it. The button is a courier, not a gate. It carries a request; it does not hold the decision.

Break it a second way, with no editing at all. Two students open the page on two phones at the same moment. Both see *1 seat left*, because both received the same count from the server a second earlier. Both tap. One is admitted and one is refused, and the second student saw a number that was already wrong. The frontend cannot be blamed here. It held the freshest number it could get, and the freshest number is still a claim about the past. The seat count is not the truth. It is the truth as of the last time someone asked.

<Callout type="warning" title="Safety floor">
The sign-up form your student taps can display the seat count and ask for a place, and every line of it runs on a device the student controls. Never let the thirty-seat rule live only in the page, never act on a value a browser sent you without checking it on the server, and test the refusal path — the thirty-first student — before this page goes live.
</Callout>

## The form the student actually fills

Inputs carry the same prop-and-state split, and it shows up in one design choice worth naming. A **controlled input** keeps the text a field shows in state, and updates that state on every keystroke. The field repeats what state holds, instead of holding a value of its own out of sight. That is what lets the page disable the button until the form is valid, or warn about a malformed email before the student has typed the last character.

**Validation** is the check that a value is acceptable — a name is present, an email has the shape of an email. The frontend should do it, and should never rely on it. A check written in the page is a **courtesy**: it gives an honest student fast feedback without a round trip to the server. A dishonest student, or a script, skips it completely. So every frontend check needs a matching check on the machine you control, and the chapter on the backend owns what that check looks like.

### Feedback that a screen reader can announce

An error message that only turns a border red is invisible to a student using a **screen reader**, the software that reads a page aloud for a blind user. Three habits fix most of it. Give every field a **label**, the text that tells a screen reader what the field is for. Connect an error to its field, so the message is read out with the input it belongs to. And announce a failure as it appears, rather than only changing a colour.

The numbers say this is where most pages fail. In the 2026 WebAIM Million report, which scanned the home pages of the top million sites in February 2026, **51% of home pages had form inputs with no label**, and one third of all inputs on the web were not properly labelled. A missing label is not a small defect. It turns a sign-up field into an unnamed box that a screen reader can only call *edit text*.

## How a URL becomes a screen: pages, layouts, and routes

A component is one part of a screen. The screen itself has three names worth separating, because they fail apart. A **page** is one screen at one address. A **route** is the address itself — the path in the URL, and the rule that maps that path to a page. A **layout** is the frame that wraps many pages without changing between them: the club's name, the navigation, the footer.

Next.js maps folders to routes, so the route lives in the file tree: a folder named `signup` answers at `/signup`, and one named `thanks` answers at `/thanks`, each holding the page file for that address. The layout is reused across both, so the seat counter and the club's name stay in place while only the middle of the screen changes. This is the reuse idea again, one level up: a component is reused inside a page, and a layout is reused across pages.

The distinction matters when something breaks. A broken page loses one screen. A broken layout loses every screen that shares it at once, and the failure looks worse than it is, because the header and footer still draw and make the site look half-alive.

## The same component on a phone: responsiveness and breakpoints

The student opens the page on a phone. **Responsiveness** is the interface reshaping itself correctly for whatever screen shows it. It is not one layout that shrinks. It is a small number of layouts, chosen at size thresholds. A **breakpoint** is one of those thresholds — a screen width where the layout deliberately changes shape.

The intro named responsiveness and breakpoints and left them standing. The mechanism underneath is the **media query**, a rule that applies styles only when the screen meets a condition. Tailwind turns media queries into prefixes, so `md:flex` means: stack the cards by default, then switch to a row at 768 pixels and wider. Its five default breakpoints are 640, 768, 1024, 1280 and 1536 pixels, and every one of them is a minimum width. That is the mobile-first rule, and it catches people out. An unprefixed class applies at every size; `md:` applies at the medium breakpoint and above. To style the phone, you write the plain class. To change it on a laptop, you add the prefix. The phone in a student's hand is under 640 pixels wide, so it receives every unprefixed class and none of the `sm:` ones.

Those numbers are defaults, not laws. The breakpoints that matter are the widths where your own layout stops looking right, which is why a framework lets you move them. A newer mechanism moves the threshold again. A **container query** lets a component react to the size of its own box rather than the whole screen, so a single card can rearrange itself correctly whether it sits in a narrow sidebar or a wide main column. Tailwind exposes it through `@container` and variants such as `@md:`. The default viewport breakpoint answers *how wide is the screen*. The container query answers the more useful question: *how much room does this component actually have*.

## Accessibility in the interface you build

Accessibility is not a feature added at the end. It is a set of requirements the interface either meets or does not, written down in **WCAG 2.2**, the Web Content Accessibility Guidelines, the W3C standard for accessible web content. Two of its rules point at things the frontend alone controls. Text must reach a **contrast ratio** of at least 4.5 to 1 against its background, so it stays readable for a reader with low vision; large text is allowed 3 to 1. And nothing may be communicated by colour alone, because a reader who cannot tell red from green loses the meaning along with the colour.

The 2026 WebAIM Million found that accessibility on the web got worse for the first time in six years. It detected **56,114,377 distinct errors** across those million pages, an average of **56.1 errors per page**, up **10.1%** from 51 in 2025. **95.9% of home pages had at least one detectable WCAG failure**, up from 94.8% the year before. Six failure types account for 96% of everything found: low contrast text on 83.9% of pages, missing image descriptions on 53.1%, missing form labels on 51%, empty links on 46.3%, empty buttons on 30.6%, and no page language on 13.5%.

One result in that report is worth a second look, because it is the opposite of what most people assume. **ARIA**, a set of attributes that let a developer describe the meaning of an interface to assistive technology, is meant to improve accessibility. Pages that used ARIA averaged **59.1** errors, against **42** on pages that did not. The report is careful about cause: those pages were also more complex. The safer reading still holds. ARIA added without understanding tends to describe an interface that was not built correctly in the first place, and a wrong description is worse for a screen reader than an honest plain one.

The framework helps and does not fix this. Home pages built with Next.js averaged **40.9** errors in the same scan, against the **56.1** average across all pages. A component library that ships accessible parts moves the floor up. It does not raise the ceiling, because the button is rarely what fails; the missing label on the field beside it is.

## What this layer costs

The frontend's cost is paid on the student's device, in work the device does before anything appears. Every client component is JavaScript the browser must download, parse and run. Server components ship none of that, which is the strongest reason the split exists at all.

Google's Core Web Vitals set puts a number on the interactivity a user feels. **Interaction to Next Paint (INP)** measures the delay between a tap and the screen's response, and the target, per web.dev, is **200 milliseconds or less** at the 75th percentile of real visits. A tap that waits longer than that, on three visits in four, is a page that feels slow in the hand. That budget is spent by the code running on the client, and the cheapest way to protect it is to keep components on the server until they genuinely need the client.

The libraries carry their own costs, and the costs differ in kind. **Material UI**, or MUI, is on version 9, released in April 2026, with a new major version roughly every twelve months; it is a runtime library you import and ship, and the yearly major is real work to absorb. **daisyUI**, on 5.6.18 as of this writing, adds named classes such as `btn` and `card` on top of Tailwind and ships no component JavaScript, because its components are CSS. **shadcn/ui** is not a library in that sense. Its own documentation says it is not a component library but a way to build one: you run a command, the component's source is copied into your project, and from then on you own it. There is no version to upgrade and no upstream patch to receive, and that same fact is the cost, because you maintain what you copied.

There is one more cost that no version number shows. A **design system** is the shared set of components, colours and rules that keeps forty screens looking like one product. It pays back in consistency and pays out in agreement. Someone has to decide what the button is, and every later change goes through that decision. For a single sign-up page, that machinery costs more than it returns.

## Choosing a library, and where the frontend fails

The three libraries are not ranked. They answer different constraints. Reach for shadcn/ui when you want to own the code and shape it to a design that is yours, and can maintain what you own. Reach for Material UI when you want a large set of controls out of the box and are content with Google's Material Design look and an annual major version. Reach for daisyUI when you already style with Tailwind, want short class names with no component JavaScript, and can accept a recognisable default appearance.

The clear counter-indication is the small job. A single form with three fields does not need a design system, a theme token set, or a library decision. It needs two careful components and a label on every field. Reaching for the largest tool on a small page is its own failure, and it hides behind the look of engineering.

Two failures sit at opposite ends, and both leave the cap unenforced. **Over-caution** hand-writes every component and refuses a library, or an agent, for any of it, and spends a weekend rebuilding a button a library would have handed over in a minute. **Over-trust** accepts an agent-built form that checks the seat count in the page, because the page looks finished and every screen works. The first refuses leverage. The second hands away the judgment that leverage depends on.

The move between them is the one this chapter has been building towards. **Specify** what the rule is, in one sentence, before any component is written. **Bound** the frontend to showing and asking, never to deciding. **Verify** the path nobody enjoys testing — the thirty-first sign-up — on the machine you control. And **own** the result when it breaks, because the device that draws the rule is not the device that holds it. None of that is a framework feature. It is the same discipline **Stage 1** builds, applied to the one box the user can reach into.

The frontend fails in ways you can recognise early. It has failed harmlessly when it shows a spinner that never stops, a blank screen where the list should be, or a seat count that disagrees with the list still visible behind it. It has failed dangerously when it looks correct and the rule it appears to enforce is not enforced anywhere. The first kind announces itself. The second kind waits quietly for the thirty-first student.

<Callout type="info" title="Where this sits">
The frontend is one box of the map Stage 1 builds, and this chapter took that box apart. The request it sends opens next in the chapter on the backend, which is where the thirty-seat rule can actually be enforced. From there the chapter on the databases asks where the seat count survives a restart, and the chapter on authentication asks who is allowed to cancel a seat once the club is full.
</Callout>

## Where the idea comes from, and who to read next

React came from Facebook, first described publicly by Jordan Walke in 2013, and the idea that a page should be a function of its data is the idea the field still argues about. Server components, which let part of an interface render on the machine you control, became a stable part of React 19. WCAG 2.2 is maintained by the W3C and is the reference to check rather than any summary, including this one. The WebAIM Million has measured the same million home pages every year since 2019, and its yearly report is the honest baseline for how accessible the web actually is.

The live disagreement is how much of the interface should run on the client at all. One camp pushes work back to the server, where it is cheaper and safer. Another keeps more on the client, where interaction is instant and the network matters less. Both are defensible, and the split between server and client components is where the argument is fought today in real code. To follow it: the Next.js documentation for the framework as it currently ships, the WCAG 2.2 quick reference for the requirements themselves, and the WebAIM Million for the annual numbers rather than anyone's impression of them.

## Before you turn the page

Without looking back, name the three states the sign-up form must show, and say what makes the screen change between them. Then answer the question the chapter was built around. A student opens the page on a phone, sees *1 seat left*, and taps. Explain, in this chapter's terms, why neither the number on the screen nor the button that sent the request can decide whether the student gets in — and name the one machine where that decision can be made.

**Next:** the chapter on the backend opens the black box the form sends its request to, and shows why the thirty-seat rule is only real on the machine the student cannot edit.
