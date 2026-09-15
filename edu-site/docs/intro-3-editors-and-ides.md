---
sidebar_label: "Editors and IDEs"
sidebar_position: 2
title: "From Text Editors to AI-Integrated IDEs"
description: "Code has to be written somewhere. That somewhere has passed through three states — the plain text editor, the one program that integrated the editor, terminal, debugger and language tools, and the AI-integrated editor that now writes code with you. Here is where each came from, who makes it, what it costs, and the real line between AI that suggests and AI that acts."
keywords: [text editor, IDE, integrated development environment, VS Code, Electron, Cursor, Windsurf, Zed, Trae, GitHub Copilot, AI-assisted development, AI-driven development]
chapter_state: "text-ready"
video_url: ""
scope_multiplier: 1.0
scope_reason: "a single evolution thread — text editor to IDE to AI-integrated IDE — that forks at its end into the assisted-versus-driven distinction, so both halves earn their place and neither can be cut without breaking the fork it feeds."
---

# From Text Editors to AI-Integrated IDEs

The difference — between a program that holds text and a program that understands it — is the story of this chapter. Code has to be written somewhere, and that somewhere has changed twice in living memory. It began as a plain text editor. It became one program that put the editor, the terminal, the debugger and the language tools in a single window. Now it is becoming a program that writes code alongside you.

Each of those is a rung, and the last one forks in two.

## Two words, and the gap between them

Start with the word *editor*. A **text editor** is a program for changing text files — letters, numbers and symbols, with no meaning attached. Notepad on Windows is one. To a text editor, a line of code is a string of characters. It can count them and colour them. It has no idea that the line is a program.

Now the longer phrase: **IDE**, short for **integrated development environment**. Three words, and most readers read past the first one.

*Integrated* means joined into a single program. *Development* means building software, not writing prose. *Environment* means everything around the code: the place you run it, the place you watch it fail, the place you read the error. Put together, an IDE is one program where the editor and every other tool you need sit together, and where those tools share what they know about your code.

Here is a guess worth making before you read on. Asked what an IDE is, most people describe a bigger and fancier text editor — the same box, with more buttons and a nicer colour scheme. Hold that guess. The gap between it and the truth is small in words and large in effect, and the exact word it misses is *integrated*.

The point was never the editor. The point is that in an IDE, the editor, the terminal, the debugger, the build tools and the language understanding are wired to each other. One shared understanding of your code reaches all of them at once.

## The nearest thing you already hold

The nearest thing you already own is the phone in your pocket. Twenty years ago, a camera, a torch, a music player, a clock and a map were five separate objects. Your phone is one object that does all five. The win was not that each part became shinier. The win is that they share one screen, one battery and one store of your photographs. They sit in one place, so you stop putting one down and picking up the next.

An IDE makes that same move for the tools a programmer uses. The one difference is worth stating. On the phone, the parts were separate devices. In an IDE, they were separate programs on the same machine — an editor, a terminal, a debugger — each in its own window, and each blind to the others.

## Why anyone needed this

To feel the problem, go back to a time before integrated editors were common. The work was not one activity. It was five, and they lived in five different programs.

You typed the code in an editor. You opened a **terminal** — a program where you type commands as text — to run the **compiler**, the program that turns your code into something the machine can run. The compiler printed its complaints into the terminal, so you read the errors there and then scrolled back up in the editor to find the line. To watch the program run step by step, you opened a **debugger**, a program that stops your code at chosen points so you can see the values inside it. To look up what a function does, you opened a fourth program. To move a file, a fifth.

Every switch cost something. You held the shape of the problem in your head, and each new window pushed part of it out. Worse, the editor and the compiler did not talk. The editor let you type a name that did not exist, because to the editor a name is only letters. You found out an hour later, from the compiler.

The tools that answered this came in two shapes, and neither was complete. One shape was the **heavy IDE** — Visual Studio on Windows, or Eclipse and IntelliJ IDEA for Java. These integrated everything, and they were large, slow to start, and often tied to one language and one operating system. The other shape was the **fast editor** — TextMate, then Sublime Text, then GitHub's Atom. These opened instantly and understood your code barely at all. You chose between an environment that knew a great deal and cost a great deal, and an editor that cost nothing and knew nothing.

The rung that won is the one that refused to choose.

## Who makes these tools, and whether they are alive

An abandoned tool behaves differently from one that ships every week, and a beginner has no reliable way to tell the two apart. So before anything else, learn to ask two questions of any tool: who made it, and is it still alive. For the tools in this chapter, here are the answers.

The plain editor that became the default was made by **Microsoft**. **Visual Studio Code**, or VS Code, was announced on 29 April 2015 and grew into the most widely used code editor in the world. It is still developed, and its core is **open source** — its source code is public, so anyone may read it or build on it.

The AI-first editors are younger, and most are made by small companies. **Cursor** is made by Anysphere, founded in 2022 by four students at MIT, a university in the United States. **Windsurf** began as a product of a company called Codeium, which later renamed itself Windsurf. **Zed** is made by Zed Industries, led by Nathan Sobo, one of the people who built Atom. **Trae** is made by ByteDance, the company behind TikTok.

Beside them sits the cautionary example. **Atom**, made by GitHub, was once the most popular editor in the world. GitHub announced its end on 8 June 2022 and archived it that December. An editor you learn today can be gone in three years, which is why the date on a tool matters as much as the tool.

## What "integrated" actually buys you

Now the mechanism, and the guess you were holding.

The first thing an IDE adds is **language understanding**. A plain editor sees letters. An IDE runs a second program alongside the editor, usually called a **language server**, that reads your code the way the compiler will. It knows that a counter is a number, that a function is a function, and that a misspelled name exists nowhere. That understanding is what turns the editor from a page into something that reacts.

The second thing, and the real gain, is sharing. Every part of the IDE can ask the same language server the same questions, so all of them know the same thing at the same moment. The editor underlines the misspelled name. A list of problems shows the same error. The autocomplete offers the right names. The debugger stops on the exact line. The terminal, running in a panel inside the same window, builds the code with the same settings. Nothing is copied between programs, because there is only one program.

Look back at the guess. If you said an IDE is a fancier text editor, you are right about the surface and wrong about the source of the gain. A fancier editor is a nicer box. An IDE is the same box with the walls between it and its neighbours removed. The win is shared context, not a larger text area — and that is why *integrated* carries the meaning, not *editor*.

The tool that made this normal is VS Code, and how it is built shaped everything after it. VS Code is not one large program written from scratch. It is built on **Electron**, a framework that lets a program be assembled from the same building blocks a web page is made from, then run as an ordinary desktop application. The editor inside it is a component called **Monaco**. Electron was created for GitHub's Atom, and it is why the same editor runs on Windows, macOS and Linux without being rewritten for each.

That choice has a cost you can feel, because it makes the program heavy in memory. A later editor, Zed, exists largely as a reaction to that cost.

## From an editor that completes to one that acts

Everything above shares one assumption: a person is typing, and the machine helps with small pieces of it. The newest rung breaks that assumption. Here the machine does some of the typing, or all of it, and your job moves from writing to directing and checking.

These are the **AI-integrated IDEs**. The first thing to notice is how many are the same editor underneath. Cursor, Windsurf and Trae are built on VS Code's open-source core. That is not a marketing detail. It is why they look and feel alike, and why the real differences sit in what each company built on top.

**Cursor**, by Anysphere, launched in 2023 and is built on a copy of VS Code's core, which programmers call a **fork** — code you take and then take in your own direction. Its bet was to build the AI into the editor itself, so the whole environment is organised around an assistant that can read your project and change it.

**Windsurf**, by the company now called Windsurf, launched in November 2024 around an assistant that works alongside you as you go. It has since changed hands. In July 2025, Google paid to license its technology and hire its leadership, and the product now sits within Cognition, the company behind the Devin coding agent.

**Zed** is the exception, and its difference is one of kind. It is not built on VS Code. It is not built on Electron. Zed Industries started over, wrote the editor in **Rust** — a programming language built for speed and safety — and drew the window with the graphics card instead of a web engine. It is made by the same people who built Atom, which is the honest way to say they are fixing the thing they made first. Zed reached version 1.0 on 29 April 2026.

**Trae** is made by ByteDance, and its difference is who stands behind it and how it is sold. It first appeared in January 2025 for developers in China, then internationally, and it is given away with access to strong models, which is a large company buying adoption.

There is also a tool that is not an editor at all. **GitHub Copilot** is an assistant that plugs into editors you already have, including VS Code. It appeared as a preview on 29 June 2021, built by GitHub with OpenAI, and GitHub describes it as the most widely used AI coding tool. It matters here because it is the clearest example of the first of the two modes below.

<Callout type="info" title="Current as of writing">
This chapter was written on **10 September 2026**. Everything above about Cursor, Windsurf, Zed, Trae and GitHub Copilot — who makes each one, when it appeared, and what it costs — was true on that date and was checked against each maker's own website. This is the fastest-moving corner of the whole book. Editors here are renamed, bought, priced up and priced down within months, and the survey figures below are a year old by design. Before you install anything or pay for anything, open the maker's own page and check what is current now. Read every number in this section as a snapshot with a date on it, never as something that stays true.
</Callout>

## Assisted, or driven: the difference that matters

The two newest tools behave in two different ways, and mixing them up is the mistake this section exists to prevent. The difference is not how clever the model is. It is where the decision to accept a change sits.

In **AI-assisted** mode, the tool suggests and you decide, one small piece at a time. You start typing a line, the editor offers the rest of it in grey, and you press Tab to accept it or keep typing to reject it. A second kind offers the next edit after one you have made. Every one of those decisions is local: one suggestion, at your cursor, accepted or refused in a second. You are still the author. The tool is finishing sentences you were already writing.

In **AI-driven** mode, the decision moves. You stop typing and state what you want in plain language — "let students cancel their own signup, and only their own". An **agent** — a tool that carries out a task in steps on its own — makes a plan, then changes several files to carry it out. It may also run commands: install a package, run the tests, read the output. When it stops, it shows you a **diff**, a view of exactly which lines it added and removed, and you review the whole thing at once. Notice where you now stand. You are not approving one line. You are approving a change set that has already happened, then deciding whether to keep it.

That is the real line between the two, and it fits in one sentence. Assisted keeps the accept-or-reject decision local to each suggestion and keeps the plan in your head. Driven moves the decision to the end of a whole task and moves the plan into the tool.

GitHub's own product split shows this. Its completions and next-edit suggestions are the assisted mode. Its **agent mode**, which works inside the editor, and its cloud agent, which you can hand a task and return to later, are the driven mode. The same split runs through the others: Cursor and Windsurf are organised around an agent, and Zed can run several agents at once, while still offering the keystroke-level predictions of the assisted kind.

## The smallest thing that works

Two demonstrations, one per mode, both on a club sign-up page with thirty seats.

The assisted version first. You open the folder in the editor and begin a line. You type the first few letters of a function name, and the editor offers the rest in grey; you press Tab to accept it. That is the whole loop, and it is small on purpose. Now break it on purpose. Rename the function everywhere except one place that calls it, and watch. In a plain text editor, nothing happens; the file still looks fine. In an IDE, the language server notices within a second, underlines the old name in red, and adds a line to the list of problems. That red underline is the integration made visible. It exists only because something in the editor understands what the code means.

The driven version is larger, and so is its risk. You select the files that handle sign-ups and type one sentence: "refuse a signup when the club is full". The agent reads the project, edits the code, and shows you this:

```
- if (seatsLeft > 0) {
-   signUp(student);
- }
+ signUp(student);
```

It has removed what looked to it like a pointless check. The club is now uncapped. Nothing crashed. The page still saves. The bug is silent, and it will surface only when the thirty-first student signs up.

That example is the whole argument for the section after next. The tool did not fail at writing code. It failed at knowing what the code was for, and it could not ask, because nobody told it.

## Where it sits, and what it can reach

An IDE sits on top of your computer's operating system and its files. It reads and writes the files in your project, and it calls the tools installed on the machine — the compiler or interpreter that runs your code, and the language server that understands it. Your code is stored in a **repository**, the project's full history of saved changes, which is how earlier work came back to you.

When the language understanding fails, the failure is unusually quiet, and that quietness is the danger. An add-on crashes, or a project opens with the wrong interpreter selected, and the red underlines stop appearing. The editor looks the same. The list of problems is empty. A beginner reads that silence as "no problems", when it means "nothing is checking". The early symptom is clear once you know it: your code stops being corrected at all, even when it should be.

Now the reach of an AI-driven tool. Because it edits your files and can run commands, it acts with your permissions, on your machine. It can touch any file your account can touch, and read anything those files contain. It can also send parts of your project to a **model** running on someone else's computer, to be worked on there. None of that is a reason to avoid it. It is the reason the next paragraph is not optional.

<Callout type="warning" title="Safety floor">
An AI-driven tool edits your files and can run commands as you. Before you accept a multi-file change, read it — every file it touched, including the ones you never mentioned. You are not checking that the change looks right. You are checking three things: that nothing you did not ask for changed, that no check or guard was removed, and that no password, key or other secret was written into a file that could be committed. What you accept becomes yours, and "the agent wrote it" has never once fixed a broken system.
</Callout>

## What it costs

Every figure below was checked against the maker's own pricing page on **10 September 2026**. None of them should be trusted without that date attached.

Start with free, because free is real in this category, and beginners often pay before they need to. GitHub Copilot has a free tier that costs nothing and allows 2,000 code completions and 50 chat requests a month. That tier arrived on 18 December 2024, and it brought AI help to people who would never have paid for it. Its paid Pro tier is 10 US dollars per user per month. Cursor has a free Hobby tier with a limited number of agent requests, and a Pro tier at 20 dollars a month. Zed is free to use as an editor, with 2,000 accepted predictions on its Personal plan, and its Pro tier is 10 dollars a month with 5 dollars of model use included. Windsurf is free with a light quota for its agent, and its Pro tier is 20 dollars a month. Trae is free.

For scale, ten to twenty dollars a month is about the price of a single streaming subscription. The money is the smaller cost. In driven mode you also pay per task in **tokens** — the chunks of text a model is billed for — and a long agent session that reads many files and runs several rounds of commands spends far more of them than a single chat message. A paid plan buys a monthly allowance, and when it runs out the agent pauses until the next cycle or a larger payment.

One more number, and it is the most useful. In the 2025 Stack Overflow Developer Survey, which gathered answers from about 49,000 developers, VS Code was the most used editor for the fifth year running. Among the newer AI editors, 18 percent of those developers used Cursor, 10 percent used Claude Code, and 5 percent used Windsurf. Read those together and the picture is plain. The new tools are growing quickly and are still used by a minority. You are not behind for not having adopted one.

## When to reach for which

The decision rule is short. While you are still learning to read code, stay in assisted mode, where you accept or reject one suggestion at a time and can see what each one does. Reach for driven mode when you can already read the diff it produces, and when you have a way to check the result — a test that passes or fails, or a page you can open and click.

Here is the case where the obvious choice is wrong. Once you have seen a driven tool, the obvious choice is to hand it your largest task and let it run. For code you cannot yet read, that is the wrong move, and the reason is timing. A wrong suggestion accepted at your cursor is wrong in front of you. A wrong change made across five files is wrong later, in a place you were not looking, and you have given up the understanding that would let you find it. The tool did not make the mistake harder to fix. It made the mistake arrive where you would not notice.

Two ways to get the relationship wrong sit at opposite ends of the same rope. **Refusing these tools entirely** looks like discipline and becomes cost: a learner who rejects every suggestion on principle types routine code by hand for hours, and gives up the leverage the tools really do provide for the mechanical parts of the work. **Trusting them without checking** looks like speed and fails later. Three silent failures cover almost all of the damage. The change you never asked for, appearing as edits to files you never opened. The guard clause that was deleted — the check that stops something the code should not allow — exactly as the club example showed. And the secret written into a file — a password or key typed into the code to make it run — which is then committed, and stays in the project's history for anyone who looks.

The fix at both ends is the same, and it is the move this whole book is built on. State what you want before you hand over the work. Bound it to the files and the behaviour you mean. Read the result before you accept it. Own it once you do. The tools on this rung make the writing cheap. They do nothing about the judgment, which was always the part that decided whether the work was any good.

## Where this thread leads

The idea is older than the name. The first program usually credited as an integrated development environment is Softlab's Maestro I, built in Munich and first shown in the mid-1970s. The recent thread runs through the editors above: TextMate, Sublime Text, Atom, VS Code, and now the tools built on VS Code's core. Zed is the current argument against that line, made by the people who started it: that a foundation built from a web engine cannot be made fast, and the only fix is to build the foundation yourself.

Three places will keep you current. The Stack Overflow Developer Survey, published each year, measures what working developers actually use, and it separates what people use from what they merely want. Each project's own documentation is the only honest account of what it does today. And the release notes of VS Code itself appear every month, which shows how quickly even a settled tool still moves.

This chapter is part of the ground laid ahead of **Stage 1**, and the tools on its last rung return in **Stage 3**, where directing coding agents gets the whole stage to itself. One quieter tool comes before either. Every IDE in this chapter is built on top of a text-only window that runs commands, and the newest coding agents have moved out of a window altogether to live there. That is the terminal, and it is next.

## Before you turn the page

Close the chapter and answer from memory, without scrolling back.

Say what the word *integrated* is doing in "integrated development environment", then finish this sentence: a fancier text editor makes the box larger, while an IDE ______. Name the one difference between the two newest modes: in assisted mode, where does the accept-or-reject decision sit, and where does it move to in driven mode?

Then decide. A friend has a project they have never opened and cannot yet read, and they want to add a login page. They are about to hand the whole task to a driven tool and accept whatever comes back. Tell them what to do first, and name the three things they must look for in the diff before they accept it.
