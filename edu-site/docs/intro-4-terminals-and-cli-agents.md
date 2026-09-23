---
sidebar_label: "Terminals and CLI Agents"
sidebar_position: 3
title: "The Terminal and the Rise of CLI Coding Agents"
description: "Every serious engineering workflow eventually reaches the command line. Here is what a terminal actually is, how to tell CMD, PowerShell, Bash and Git Bash apart, and how coding agents came to live there."
keywords: [terminal, command line, CLI, shell, terminal emulator, CMD, PowerShell, Bash, Git Bash, Git for Windows, Windows Terminal, WSL, Claude Code, Codex CLI, Gemini CLI, Antigravity CLI, coding agents, permissions]
chapter_state: "text-ready"
video_url: ""
scope_multiplier: 1.0
scope_reason: "one continuous line from a device at the end of a wire to an agent that drives your shell, where each section is a rung the next one depends on — you cannot judge which agent to trust without first telling CMD, PowerShell, Bash and Git Bash apart, or scope a working directory before you have seen what a shell command does."
---

# The Terminal and the Rise of CLI Coding Agents

A **terminal** is the text window where you type commands instead of clicking. **Before you meet it properly, look at the word itself, because the name carries a history that changes what you think you are looking at.**

## A screen at the end of a wire

**The Online Etymology Dictionary records the noun *terminal* in 1831, meaning the last letter or sound of a word.** By 1838 it had a second sense, in electricity, for the metal posts at the end of a battery. The word comes from the Latin *terminus* — an end, or a boundary line.

**Before reading on, take a guess.** If a terminal is an *end*, what would a computer terminal be?

**Most people answer that it is the window they type into.** Hold that guess. This chapter marks it a few paragraphs from here.

The nearest thing you already hold is an **ATM**. **You type a number on its keypad, and it prints your balance.** Your money is not inside it. The account sits in a bank's computer somewhere else, and the machine in front of you is the end of the wire that reaches it.

**A computer terminal was exactly that, for text.** The computer at the other end was a mainframe or a minicomputer — a machine the size of a wardrobe, shared by many people at once. The terminal was a keyboard and a screen at the end of a single cable. It held nothing on its own and remembered nothing.

**The earliest terminals were typewriters.** A Teletype Model 33 printed letters onto paper and sent them down the cable, and it existed for telegraphy long before it existed for computing. Screens arrived later, and one of them set the standard everyone copied: the DEC VT100, shipped in 1978. Programs still speak its dialect today, which is why a key on your keyboard sends an arrow cursor and not a letter.

## What a terminal actually is

**A terminal is a window that sends characters to another program and shows the characters that come back.** The mechanism is that thin. The terminal does not understand your command. It draws it, sends it, and prints the reply.

Under the window sits a **shell** — the program that reads the line you typed and runs it. Under the shell sits the **operating system**, the software that manages the machine's files, memory and running programs. Three layers, three names, and most tutorials use the three words as though they were one thing.

**The fourth name is the one your work will be driven through.** A **CLI** is a **command-line interface**: an interface you drive by typing lines of text instead of clicking. CLI is compositional, and worth splitting once, because it is the honest half of this chapter's title. A command, on a line, through an interface. Nothing is hidden inside it.

***Terminal* is the other half, and now you can see how the name misleads.** It is a borrowed word from the physical world. It points at a position, the end of a line, and it named a device that was not the computer. The computing sense is recorded by 1954, the decade the first keyboard-and-printer computers were in service.

**So score the guess you made a moment ago.** If you said the terminal is the program you type into, you are right about the object on your screen and wrong about the name. Today's terminal is a **terminal emulator** — a program that pretends to be a physical terminal. It has no paper, no cable, and no computer at the far end unless you connect to one. The far end is usually your own machine.

**That mismatch is worth holding onto, because it explains the confusion ahead.** A window pretending to be an old machine behaves like one. It prints, it scrolls, and it refuses to show you anything as a button.

**GUI**, short for graphical user interface, names the alternative: an interface you drive by pointing and clicking. **The terminal did not replace it.** Your file manager is a GUI. So is the browser reading this page. The terminal sits beside them and is far smaller, which is why the professionals keep returning to it and why that surprises people.

## CMD, PowerShell, Bash, Git Bash — and what your machine already has

**Here is where a beginner is misled most often.** A tutorial hands you a command, you type it into the wrong shell, and it fails with a message that sounds like your mistake. The list of shells is short, and each one belongs to a different family.

| Shell | Made by, and when | Runs on | On a fresh Windows machine |
|---|---|---|---|
| Command Prompt (`cmd.exe`) | Microsoft; inherited from MS-DOS | Windows | Yes |
| Windows PowerShell 5.1 | Microsoft, 2006 | Windows | Yes, on Windows 10 and later |
| PowerShell 7 (`pwsh`) | Microsoft, open source | Windows, Linux, macOS | No, you install it |
| Bash | GNU Project, 1989 | Linux and macOS | No |
| Git Bash | bundled with Git for Windows | Windows | No, it arrives with Git |

**Command Prompt** is Microsoft's older shell, and it still opens on every Windows machine. Its commands are the old MS-DOS ones: `dir` to list a folder, `cd` to change folder, `copy` to copy a file.

**PowerShell** is Microsoft's newer shell and a different design. **Microsoft describes it as a cross-platform automation tool that runs on Windows, Linux and macOS, and that passes objects between commands rather than plain text.** Two versions matter. Windows PowerShell 5.1 is built into current Windows. PowerShell 7 is the modern, open-source one, and you install it yourself.

**Bash** is the shell of the Unix world, short for Bourne Again SHell. **Brian Fox released it in 1989 for the GNU Project, as a free replacement for the earlier Bourne shell.** It is the default shell on most Linux systems, and it was the default on macOS until Apple switched its own default to zsh in 2019.

**Git Bash** is Bash compiled to run on Windows, shipped inside Git for Windows. You get it by installing **Git**, the tool that records the history of a project. Nothing else on a Windows machine brings it.

**So a Windows laptop you unbox today gives you Command Prompt and Windows PowerShell 5.1, and no Bash at all.** That last point explains the most common beginner failure in the field. A tutorial written on a Mac says `ls`. Your Command Prompt answers `'ls' is not recognized as an internal or external command`. The command was right. The shell was the wrong one. If you want the Unix commands, you have two routes: install Git for Windows to get Git Bash, or install **WSL**, the Windows Subsystem for Linux, which runs a real Linux system inside Windows.

**One more piece of the picture, because it confuses people for years.** Since the Windows 11 22H2 update in October 2022, Microsoft hosts Command Prompt and PowerShell inside **Windows Terminal**. Windows Terminal is a window that can hold several shells in tabs. It is not a shell itself. When someone says "open a terminal", they usually mean the window, and which shell opens inside it is a separate choice you can set.

### Picking one, on purpose

**On Windows, and following this course, open Windows Terminal and use PowerShell.** If a tutorial uses Unix commands such as `ls`, `pwd` or `chmod`, move to Git Bash, because those commands are its native language. If a tutorial was written for Linux and says `apt install`, you need WSL, because no Windows shell can run a Linux package manager.

## Why you cannot skip this one

Three reasons, each concrete.

**The first is that the tools you will actually use ship without a graphical window.** Git, the tool that records a project's history, is a command-line program. The package managers that install code libraries are command-line programs. Deploying to a server is a command-line program. When a course tells you to run `npm install`, no button anywhere does the same job.

**The second is that error messages speak in commands.** When a build fails, the suggested fix is a line of text. A reader who cannot open a shell cannot act on the message in front of them. That is the real cost of refusing the command line: you are not safer, you are stuck, and every instruction in the field turns into a dead end.

**The third is newest, and it is the rest of this chapter.** The coding agents now writing much of the world's code live in the terminal. Pointing one at a project means running a command. If you have never run a command, you never reach the door.

**The misconception this chapter corrects is exactly here.** The command line is not optional, and its name does not describe what it is. It is one more interface, with a history, that a specific set of tools has settled on.

## The smallest command that works, then the same one broken

**Open Windows Terminal, or the Terminal app on macOS, or your distribution's terminal on Linux.** A line of text appears, ending in a symbol. That symbol is the **prompt** — the shell telling you it is ready for a command.

Type this, and press Enter:

```
pwd
```

**PWD** stands for print working directory, and a **directory** is a folder. The end state is exact: `pwd` prints the folder you are standing in. Then type this:

```
dir
```

**That lists the files in the folder.** On Bash the same job belongs to `ls`, and on PowerShell `ls` also works, because PowerShell accepts the Unix name as a second spelling of its own command. Two names, two shells, one idea.

**Now break it on purpose, because this is the failure you will actually meet.** Type `ls` into Command Prompt, and read what comes back:

```
'ls' is not recognized as an internal or external command
```

**Read that sentence twice.** It is not saying your command was wrong. It is saying the shell in front of you has never heard of a command by that name. That message is the most useful thing in this section, because it sends you to ask which shell you are in, rather than which command you mistyped.

## Coding agents that live in the terminal

A **coding agent** is a program that reads your files, writes and edits code, and runs commands, mostly without stopping to ask you about each step. A **CLI agent** is one you drive from the terminal. This is where the whole chapter has been heading.

**Three of them defined the category, and each arrived with a date attached.**

**Claude Code** comes from Anthropic. **Anthropic released it as a research preview on 24 February 2025 and made it generally available on 22 May 2025.** It is not open source. Anthropic publishes documentation and an issue tracker on GitHub, and distributes the tool itself as a closed package you install with `npm`, the Node package manager.

**Codex CLI** comes from OpenAI, released on 16 April 2025. **It is open source under the Apache 2.0 licence, which lets anyone read and reuse the code, and it was later rewritten in the Rust programming language.** Codex also ships as an editor extension and a desktop app, and that desktop app is not open source.

**Gemini CLI** came from Google on 25 June 2025, open source under the same Apache 2.0 licence, with a free tier of 60 requests a minute and 1,000 requests a day for anyone with a personal Google account.

<Callout type="info" title="Current as of writing">
This chapter was written on 10 September 2026, and this part of the landscape moves faster than almost any other. Names, prices and whole products change inside a year. Gemini CLI is the proof: Google announced on 19 May 2026 that it was folding the tool into a new closed-source Antigravity CLI, and stopped serving Gemini CLI to individual developers on 18 June 2026. Treat every name and date on this page as a snapshot, and check what is current before you install a tool or follow a guide that names one.
</Callout>

**The three differ in other ways too, and one of them matters for everything that follows.** Anthropic, OpenAI and Google each supply the model that thinks, and each supplies the harness that acts. The harness is the part that touches your machine. That is the part you are deciding to trust.

## How a CLI agent uses the terminal to write code

**The loop is short, and everything else here follows from it.** The agent reads the files it needs. It writes or edits a file. It runs a shell command to check something. It reads the output. Then it goes round again, until it decides the work is done or you stop it.

**That is the same three-layer stack from earlier in this chapter, with a new occupant on top.** The agent sits above the shell and drives it the way you would. When it runs a command, the command runs with your permissions, inside your folders, on your machine. Nothing separates it from your account unless someone built a boundary on purpose.

**The tools know this, so they ship a permission system, and you should learn that before you learn prompting.** Claude Code's is documented and makes a clear worked example. File reads and searches run without asking, as long as the file sits inside the folder you started the tool in. Shell commands ask first, except a built-in set of read-only ones such as `ls`, `cat` and `grep`. Any command that changes a file asks first. Web fetches and web searches ask first.

You control the system from a settings file, with rules in three kinds: **allow**, **ask** and **deny**. **The tool checks them in that order, deny before ask before allow, so a deny rule wins over everything else.** A rule names the tool and puts a pattern in brackets, which reads clearly:

```
{
  "permissions": {
    "allow": ["Bash(npm run *)"],
    "deny": ["Bash(git push *)"]
  }
}
```

That pair says: run any `npm run` script without asking, and never push code to a remote repository without stopping. **Those two lines are the discipline in miniature.** You allow the shape of the work you do often, and you deny the shape of the work that can hurt you.

**The most important setting of all is not a rule.** It is where you started the tool. By default an agent can read and change files in the directory you launched it from, and that folder is its **scope** — the set of places it is allowed to touch. You widen the scope on purpose, with a flag such as `--add-dir`, or a setting called `additionalDirectories`. You can also fence it so the tool refuses anything outside, with a setting named `permissions.blockReadsOutsideWorkingDirectories`.

**Read that with the safe version and the dangerous version side by side, because this is the whole chapter's point.** Start the agent inside `C:\Users\You\projects\signup-page`, and its reach is that one folder. Start it in your home folder, and its reach is every project and every personal document you own, because the tool is running as you and your account can reach them. The permission prompt asks about a command. It never asks about the scope you chose when you pressed Enter.

**The tools also offer a mode that turns the asking off.** Claude Code calls it `bypassPermissions`, and the command-line flag people quote for it is `--dangerously-skip-permissions`. The name is a fair warning. Anthropic's own documentation says to use it only in an isolated environment, such as a container or a virtual machine — a computer inside your computer that you can throw away.

<Callout type="warning" title="Safety floor">
A CLI agent runs commands with your permissions, inside whatever folder you pointed it at, and those commands can delete or overwrite real files. Scope it before you start: launch it inside the project folder and nowhere else, and widen that only when you mean to. Then read what it ran before you accept the result, including the commands and their output, not only the code it wrote. Scoping limits where a mistake can land. Reviewing catches the mistake before it lands anywhere. Neither replaces the other, and an approval you clicked without reading is still an approval you gave.
</Callout>

**An agent types faster than you ever will, and that part of the work is now cheap.** Deciding what it may touch, and checking what it did, is still the engineer's job.

## Which one is used most

**There is no audited market share for coding agents, and any precise figure would be invented.** There are dated signals, and the strongest is the JetBrains Developer Ecosystem Survey 2026, a weighted survey of more than 15,000 professional developers worldwide covering May to July 2026.

**The survey found that 90 per cent of professional developers were using AI coding agents at work at least weekly, and 68 per cent daily.** Among individual tools, Claude Code was the most widely adopted: about 39 per cent of developers used it at work, up from 18 per cent in January 2026, and about 47 per cent in the United States. For 31 per cent of developers it was the single tool they used most. Codex grew roughly five times over the same period, from 3 per cent to 16 per cent. GitHub Copilot, which led this market in 2023, sat at 21 per cent and falling.

**Read that as current practice, not as a permanent fact.** This chapter records it as a snapshot taken on 10 September 2026, in a field where the leader changed once in the past year and the second place moved five-fold in six months. The honest answer to "which is most widely used" is now a date as well as a name: Claude Code, as of the middle of 2026, on published survey data.

## What it costs

Coding agents are billed in **tokens** — chunks of text, roughly three quarters of a word in English, and the unit every language model is priced in. **You pay for the text the agent reads and the text it writes, so a long session costs more than a short one.**

**Anthropic publishes an estimate for its own tool.** Across enterprise deployments, Claude Code averages about **$13 per developer per active day**, and **$150 to $250 per developer per month**, with 90 per cent of users staying below $30 per active day. Those figures come from Anthropic's own cost documentation, read on 10 September 2026, and they replaced an earlier published estimate of about $6 per day, which the company raised in April 2026.

**The comparison that makes those numbers mean something is the subscription.** Claude Pro is $20 a month, and the Max tiers are $100 and $200 a month; on a subscription your usage is included until you reach a limit, rather than metered per token. Codex comes with a paid ChatGPT plan. The graphical alternatives sit in the same range: Cursor Pro is $20 a month, and GitHub Copilot's individual plan is $10 a month.

**Two habits move the bill further than the plan does.** The first is clearing context between unrelated tasks, because every request carries the whole conversation so far, so a session left open all day still pays for a day's history. The second is model choice: the strongest model costs several times the mid-tier one per token, and most routine edits do not need it.

## Who should open an IDE instead

**Cursor** is an **IDE** — an integrated development environment, an editor built to understand code — with an agent inside it. **Claude Code is an agent in a terminal.** The choice between them is not about which is smarter. Both can drive the same frontier models.

**The question that decides it is where you need to watch the work happen.** Cursor keeps the edit visible, inside the file, with the surrounding code on screen, which is what you want when you are shaping a change you can see. Claude Code drives a sequence of commands across many files, which is what you want when the work is a chain of steps rather than one visible edit. It is also the only option when the machine has no screen at all, which is the ordinary state of a server.

**State the counter-indication too, because the choice that looks natural is often wrong.** Reaching for a terminal agent because it feels more advanced is a mistake if you cannot yet read the commands it runs. The permission prompt protects you only if you can judge what you are approving. Until you can, an IDE agent that shows its edit beside the file teaches you more each hour.

**The picture is also blurring, honestly so.** Claude Code ships an extension for Visual Studio Code, Codex ships an editor extension and a desktop app, and Cursor has an agent mode of its own. The durable rule is not the brand. It is: choose the surface where you will actually review the result.

### The failure conditions, and their early symptoms

Three failures are common enough to name.

**The scope failure: the agent was launched from a folder wider than the project, so it can reach everything you own.** The early symptom is a path in its output that you did not expect — a sibling project, a personal file, a folder you have never opened in this session.

**The approval failure: you are asked to confirm so many commands that you stop reading them, and start choosing "yes, and do not ask again".** The early symptom is that you cannot say what the last command you approved actually did.

**The environment failure: the command is right and the shell is wrong.** The early symptom is `'ls' is not recognized`, or `command not found`, on a command copied from a tutorial written for another operating system.

**The first two are the over-trust failures.** The third is what over-caution costs. Refusing the command line does not make you safer. It leaves you unable to run the command your own error message already told you to run, which is a worse place to stand than a shell you do not fully know yet.

## Where this line of tools came from

The lineage is short, and every piece of it is public.

**It starts with Unix and the shell in the 1970s, where the idea of small programs composing with other small programs was written down.** The Bourne shell arrived in 1979, and Bash — Brian Fox's free replacement for it — arrived in 1989 under the GNU Project. Bash's own manual is still the clearest account of what a shell does.

**Microsoft's PowerShell carries a different argument, published as the Monad Manifesto by Jeffrey Snover, that a shell should pass objects rather than text.** That document is the reason PowerShell's commands look unlike Bash's.

**The agents are the newest layer and the least settled.** The live disagreement is about trust by default: how much an agent should be allowed to do without asking, and whether open source makes a tool more trustworthy or only more inspectable. Google's reversal on Gemini CLI is the case to read if you want that argument from both sides, because it shows what a tool's status means when the company behind it changes course.

## Before you turn the page

Close the page and answer from memory.

**Name the shell you would type into on a Windows laptop you unboxed this morning, and name what you would not have on it without installing anything.** Then describe the loop a CLI agent runs, in three sentences, and name the one setting that decides what it is allowed to touch. Finally, say which layer a permission prompt protects, and which layer it does not.

**Those answers are the working knowledge this chapter was for.** **Next:** the chapter that names the discipline all of this sits inside — who specifies the work, who verifies it, and who owns what an agent produces. Everything here sits ahead of **Stage 1**, the first stage of the course, and the agents return at greater depth there.
