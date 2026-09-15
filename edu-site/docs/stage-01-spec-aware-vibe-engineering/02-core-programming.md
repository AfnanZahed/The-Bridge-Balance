---
sidebar_label: "2. Core Programming"
sidebar_position: 3
title: "Reading Code You Did Not Write: Variables, Loops, and the Failures That Stay Quiet"
description: "The agent writes the code; your job is to read it and know when it is wrong. Variables, loops and functions in Python and JavaScript, the thirty-seat rule traced to its boundary, and the off-by-one that quietly lets seat thirty-one in."
keywords: [reading code, python, javascript, variables, types, conditionals, loops, functions, scope, collections, error handling, traceback, debugging, off-by-one]
chapter_state: "text-ready"
video_url: ""
scope_multiplier: 1.5
scope_reason: "the chapter has to hold the reading vocabulary a beginner needs — variables, types, conditionals, loops, functions, scope, collections, exceptions — and the worked thirty-seat break at the same time, because a reader who cannot trace a value across a loop cannot see the off-by-one that lets seat thirty-one in, and that vocabulary is only taught to the depth the break requires."
---

# Reading Code You Did Not Write: Variables, Loops, and the Failures That Stay Quiet

This chapter is about the code an agent writes and you do not, and about the one job that stays yours: reading it well enough to catch the change that looks correct and is not.

Before any of that gets explained, look at the word carrying the weight of the chapter.

## The word you already trust

**Reading code** borrows from the way you read a page of prose, and it arrives carrying that model with it. The word is older than the model. It comes from the Old English *rǣdan*, which meant to advise, to counsel, to interpret — the sense you still hear in *read a situation* or *read a room*. Both Etymonline and Wiktionary trace it this way, and the same root gives the German *raten*, to guess. The quieter, modern sense, where reading means receiving letters off a page, is the later drift.

So before reading on, take the guess the word invites. **If you read a piece of code from top to bottom and it makes sense, what have you established?**

Most people answer that they understand what it does, and that understanding it means it works. Hold that guess. The distance between it and the truth is the reason this chapter exists.

## The nearest thing you already hold

Reading code is closer to reading a tenancy agreement than to reading a story. You can follow every clause of an agreement, agree with the plain sense of each one, and still sign away your deposit — because the sentence that costs you is the one you read past. Comprehension and checking are two different acts, and the second is the one that costs money.

Code adds one difference that changes the comparison completely. The agreement acts on you after you sign it. The code has already acted, thousands of times, before you read a word of it.

## Who wrote these two languages, and where to check

Almost everything you will read in **Stage 1** is written in Python or JavaScript, and both are alive and well documented. Guido van Rossum released Python in February 1991, and its official account lives at `docs.python.org`. Brendan Eich wrote the first JavaScript for Netscape in 1995, in about ten days. It is standardised today as ECMAScript, under the Ecma International committee called TC39, and its reference page is MDN, the Mozilla Developer Network.

<Callout type="info" title="Where this chapter sits">
This chapter belongs to **Stage 1**, the stage that builds the architecture map from the intro into working software, one layer at a time. It does not teach you to write code; the agent does that. It teaches you to read what the agent writes, and to know, before you accept it, whether a rule like the thirty-seat cap is actually enforced.
</Callout>

## The problem is not the language

The languages are not the hard part, and treating them as the hard part is the first way to misread the job. The hard part is that the code in front of you was written by something that cannot ask you a question.

An **agent** is a program that writes and edits code and runs commands. It fills every gap you leave with something plausible and keeps going. It does not stop at the ambiguous sentence. So agent code arrives fluent by default: formatted, consistently named, complete-looking. Fluency is not correctness. It is the property that makes you stop checking, which is why it is the thing to distrust.

Until recently, most code you read was your own, and you had written it soon enough to remember why. Now the ordinary case is code you did not write, by an author who cannot be asked what it meant. The rest of Stage 1 hands you the system around that code; this chapter hands you the reading of it.

## What reading code actually is

Strip the metaphor away and reading code is **tracing values**. You hold a little state in your head — the current value of one variable or two — and you move down the lines, updating that state each time a line runs. You are not following a plot. You are running the program, slowly, inside your head, for the values you care about.

The contrast is with ordinary prose, and the difference is worth stating plainly. A prose reader asks what a sentence says. A code reader asks what a variable holds right now, and what the next line does with it. Meaning in prose sits in the sentence; meaning in code sits in the values, and the same sentence is true or false depending on which values arrive.

There is a third thing you can do, and it is not reading: run the code. Running shows you one path with one set of values, the ones you happened to try. Reading shows you the values you did not run — and the value that matters most is usually one nobody types by hand.

### The guess, scored

Now score the guess from the opening. You said that if the code makes sense, you understand it, and that understanding it means it works. The first half is right: you have established that the code is consistent with one reading of it. The second half is wrong almost every time it matters. "Makes sense" tells you the author had an intention. It says nothing about whether the intention was correct, or whether it survives the values a real student will send. Every failure in this chapter is of that one kind: code that makes complete sense and does the wrong thing at exactly one value.

## The kinds of line you are tracing

Seven kinds of statement make up almost everything you will read. Each one is worth knowing for its own small trap, so read them as seven things to trace rather than seven things to write.

### A variable is a name for a value

A **variable** is a name you give a value so you can use it later. The value has a **type**, which is what kind of thing it is: a whole number, a piece of text called a **string**, or a true-or-false value called a **boolean**. The type decides what you may do with the value. Adding two numbers gives a number; adding a number to text fails in Python.

```python
seats = 30              # a whole number
club_name = "AI Club"   # a string
is_open = True          # a boolean
seats = seats + 1       # reassignment
```

```javascript
let seats = 30;              // number
const clubName = "AI Club";  // string
let isOpen = true;           // boolean
seats = seats + 1;           // let allows this
```

**What to look for.** A name that holds a different type later in the file, and a `const` in JavaScript that gets reassigned, which throws rather than quietly changing.

### A conditional is where a rule becomes a decision

A **conditional** runs one block of code if a condition is true and another block if it is not. It is the one place in the program where a written rule becomes an actual decision. The condition is a value tested for **truthiness**, which means whether it counts as true. Both languages treat an empty string and the number zero as false, and that is convenient and dangerous at the same time.

```python
if taken >= 30:
    print("The club is full.")
else:
    print("You are in.")
```

```javascript
if (taken >= 30) {
  console.log("The club is full.");
} else {
  console.log("You are in.");
}
```

**What to look for.** The comparison at the boundary. `>=` and `>` differ by exactly one seat, and one of them is the off-by-one this chapter is built around.

### A loop is one line run once per item

A **loop** runs the same lines once for each item in a collection, or while a condition holds. **Iterating** is walking those items one at a time. A loop multiplies its body by the number of items, and it does that for a correct body and a wrong one alike.

```python
for name in names:
    print(name)
```

```javascript
for (const name of names) {
  console.log(name);
}
```

**What to look for.** Where the count starts and where it stops. A loop that runs `0` up to `29` runs thirty times; one that runs `0` up to `30` runs thirty-one. The empty case matters too, because a loop that never runs can hide a missing default.

### A function is a job with an entrance and an exit

A **function** is a named job you can call from anywhere else in the program. Its **parameters** are the values it asks for when it is called. Its **return value** is what it hands back when it finishes. A function exists so that one rule lives in one place: the seat check is written once, and the page, the admin view and the API all reach the same answer by calling the same name. An **API** is the agreed way one program calls another.

```python
def add_signup(taken, name):
    if taken >= 30:
        return taken, "The club is full."
    return taken + 1, "You are in."
```

```javascript
function addSignup(taken, name) {
  if (taken >= 30) return [taken, "The club is full."];
  return [taken + 1, "You are in."];
}
```

**What to look for.** One function returning two different shapes of answer, sometimes a number and sometimes a pair. A parameter that is declared and never used. And a hidden side effect, where a function named like a question answers differently each time you ask it because it also writes somewhere.

### Scope decides which copy of a name you are reading

**Scope** is the region of a program where a given name is visible. A variable created inside a function normally exists only inside that function, and disappears when the function returns. Two functions may each hold a variable called `taken` and never touch each other's copy, so the `taken` you are reading may not be the one that mattered.

```python
taken = 14            # outer scope

def bump():
    taken = 99        # a new, local name
    return taken      # 99; the outer taken is untouched
```

```javascript
let taken = 14;        // outer scope

function bump() {
  const taken = 99;    // a new, local name
  return taken;        // 99
}
```

**What to look for.** A function that means to change an outer value but only makes a local copy. Python needs the word `global` for the change to escape, and a silent copy is one of the quietest faults in the language.

### A list is reached by position, a dictionary by name

A **collection** is one name holding many values. A **list** in Python, called an **array** in JavaScript, is ordered: you reach an item by its position, called the **index**, which starts at zero. A **dictionary** in Python, called an **object** in JavaScript, is keyed: you reach a value by a name called a **key**. Reach for a list when order or position carries meaning, and for a dictionary when you look things up by name.

```python
names = ["Ayesha", "Bilal"]         # list
ages = {"Ayesha": 16, "Bilal": 17}  # dict
print(names[0])        # "Ayesha"
print(ages["Bilal"])   # 17
```

```javascript
const names = ["Ayesha", "Bilal"];      // array
const ages = { Ayesha: 16, Bilal: 17 }; // object
console.log(names[0]);       // "Ayesha"
console.log(ages.Bilal);     // 17
```

**What to look for.** A missing key. Python raises an error and stops. JavaScript hands back the special value `undefined` and carries on, so the mistake travels further before anyone sees it. That single difference changes which faults you hunt for in each language.

<Callout type="info" title="Where the two languages stop agreeing">
Both languages decide what counts as equal, and they disagree. JavaScript's `==` converts the two values to a common type before comparing, so an empty string and the number zero are judged equal. Python has one equality operator, `==`, and does no such conversion, so the same two values are not equal. JavaScript added a second operator, `===`, which compares type as well as value, and that is the one to expect in careful code. `0 == ""` is true in JavaScript and false in Python — one line that shows the two languages were designed with different ideas of safety. Reading a JavaScript comparison, check which operator is present. Reading a Python one, check what the two types actually are.
</Callout>

<Callout type="info" title="The same idea, written twice">
The differences you will meet most often, in the order you met them.

| Idea | Python | JavaScript |
|---|---|---|
| Declare a value | `seats = 30` | `let seats = 30;` |
| A value's type | `type(x)` | `typeof x` |
| Equal, strictly | `==` | `===` |
| How long a list is | `len(names)` | `names.length` |
| A missing key | raises `KeyError` | gives `undefined` |
| A named job | `def f(x):` | `function f(x) {}` |
| Show a value | `print(x)` | `console.log(x)` |
| Nothing at all | `None` | `null` / `undefined` |
| Handle a failure | `try` / `except` | `try` / `catch` |
</Callout>

## The smallest thing that works

The rule the club cannot get wrong is the thirty-seat cap, and it is small enough to hold in your head. Everything that follows is that same rule, traced out to the values that break it.

Start with one variable and one conditional. `SEATS` holds the cap, `taken` holds how many seats are gone, and a single comparison decides what happens next.

```python
SEATS = 30
taken = 0

if taken >= SEATS:
    print("The club is full.")
else:
    taken = taken + 1
    print("You are in.")
```

```javascript
const SEATS = 30;
let taken = 0;

if (taken >= SEATS) {
  console.log("The club is full.");
} else {
  taken = taken + 1;
  console.log("You are in.");
}
```

Trace it twice, by hand. With `taken` at `29`, the test `29 >= 30` is false, so the seat is granted and the count becomes `30`. With `taken` at `30`, the test is true and the student is refused. That is correct, and it is correct for exactly one reason: `>=` includes the thirtieth seat. Read that operator as the whole rule, because that is what it is.

A cap written in one place is a promise the rest of the page has to keep. Written in five places, it drifts. So the rule moves into a function, and every caller asks the same name for the answer.

```python
SEATS = 30

def add_signup(taken, name):
    if not name:
        return taken, "A name is required."
    if taken >= SEATS:
        return taken, "The club is full."
    return taken + 1, "You are in."
```

```javascript
const SEATS = 30;

function addSignup(taken, name) {
  if (!name) return [taken, "A name is required."];
  if (taken >= SEATS) return [taken, "The club is full."];
  return [taken + 1, "You are in."];
}
```

The name check comes first, because a signup with no name is a seat spent on nobody. `not name` is true when the name is empty, so an empty string is refused before a seat is handed out. Each call now returns a pair: the new count, and the message a student will read.

<Callout type="info" title="Tracing three calls, by hand">
Read the Python function above by calling it three times. The pair after each line is what it returns.

- `add_signup(29, "Ayesha")` — the name is real and `29 >= 30` is false, so the count becomes `30` and the message is *You are in.*
- `add_signup(30, "Bilal")` — the name is real and `30 >= 30` is true, so the count stays `30` and the message is *The club is full.*
- `add_signup(14, "")` — the name is empty, so it stops at the first check and returns *A name is required.*

The end state to look for is this: for each call, you can say what the function returns without running it. Three calls, three answers, all three correct.
</Callout>

## The same thing, broken on purpose

The rule was correct a moment ago. Change one character and it stops being correct, and nothing tells you.

```python
SEATS = 30

def add_signup(taken, name):
    if not name:
        return taken, "A name is required."
    if taken > SEATS:             # was >=
        return taken, "The club is full."
    return taken + 1, "You are in."
```

Trace the same calls again. `add_signup(29, "Ayesha")` still returns seat `30` and *You are in.*, so the happy path is untouched. But `add_signup(30, "Bilal")` now runs `30 > 30`, which is false, so the function grants the seat and the count becomes `31`. Seat thirty-one walks in. Only at `add_signup(31, ...)` does `31 > 30` become true and refuse. The club holds thirty-one, and the code that let it happen is running perfectly.

This is an **off-by-one**, a count that is wrong by exactly one because a comparison sits on the wrong side of a boundary. It is the most common logic fault in real code, and its defining property is that it is invisible everywhere except one value. Every test written with `29` passes. The number `30` — the **boundary value**, the one exactly at the limit — is the one nobody types by hand.

Now remove the name check instead, and watch a different fault appear. Delete `if not name:` and the same three calls change:

```python
def add_signup(taken, name):
    if taken > SEATS:
        return taken, "The club is full."
    return taken + 1, "You are in."
```

`add_signup(14, "")` now returns `(15, "You are in.")`. An empty name is accepted, a seat is spent, and the roster gains a row with nothing in it. Nothing crashed. The student typed nothing, clicked the button, and the page said *You are in.*

There is a sharper version still, and it is the one worth remembering. A check can be present and still wrong:

```python
if name is None:          # reads like a check; misses ""
    return taken, "A name is required."
```

`name is None` is true only when the name is missing altogether. An empty string is not `None`, so it slips past a line that looks like it guards against exactly this. JavaScript has the same trap, where `if (name == null)` misses `""` too. This is the failure that "it reads cleanly" cannot catch, because the line does read correctly. It is checking the wrong thing.

### What the failure looks like when it reaches a reader

Neither fault reaches the reader as a fault. Both reach the reader as a slightly wrong normal.

The sign-up page still works. A student who leaves the name field empty sees *You are in* and a friendly confirmation. The public list of members draws thirty-one rows where the page promises thirty, and one of those rows is blank. The club president opens the roster on Monday morning, counts thirty-one names against thirty chairs, and cannot tell which row is the ghost. The count and the list now disagree, so every number built on them — the room she booked, the certificates she ordered, the budget she wrote — is quietly wrong by one. Nobody reports a bug, because nothing visible broke. The limit the whole page was built around has stopped being true.

This is a different fault from a guard that was never written at all. The guard is present here, and it fails at one value out of thirty-one. Reading code you did not write means checking the value on each side of a boundary, not merely confirming that a check exists.

## When the code fails before it finishes

Not every fault is silent. Some stop the program, and those leave a report you can read.

The club needs to load its members from a file. **File handling** is reading from or writing to a file on disk, and Python does it with a small ceremony, opening the file and closing it again when the block ends.

```python
with open("signups.txt", encoding="utf-8") as f:
    names = f.read().splitlines()
```

```javascript
const fs = require("node:fs");
const text = fs.readFileSync("signups.txt", "utf8");
const names = text.split("\n");
```

If the file is not there, Python does not hand back an empty list. It raises an **exception**, an error that stops the program partway, and prints a **traceback**, the report that names what went wrong and where.

```text
Traceback (most recent call last):
  File "club.py", line 3, in <module>
    names = f.read().splitlines()
FileNotFoundError: [Errno 2] No such file or directory
```

Read it from the bottom. The last line names the error type, `FileNotFoundError`, and the message. The lines above are the **call stack**, the chain of calls each waiting on the next, and the frame nearest the bottom is where the program stopped. Python's traceback says *most recent call last*, which is a gift, because the bottom is the fault and the top is where the program began.

Two kinds of error sit around that traceback. A **syntax error** is a mistake the program cannot start with, such as a missing colon or a bracket left open, and Python refuses to run the file at all. A **runtime error** is a mistake the program runs into partway, like the missing file, and it appears only when that line is reached. The traceback is for the second kind.

<Callout type="info" title="Narrowing a fault, starting from the traceback">
Read the last line first, for the error type and its message. Then read the frame directly above it, for the file and line number where it was raised. That is where the program stopped, which is not always where you went wrong. The missing file is the example: the line that opens the file is fine, and the cause is a path that no longer points where you think, because the program was started from a different folder. When the traceback names a line inside a function you did not write, work outward: what value did that function receive, and where did that value come from? Change one thing, run again, and read the new traceback the same way. As you fix the cause, the chain of frames shrinks from the bottom up.
</Callout>

To keep the page alive when the file is missing, you **handle** the exception, which means running a fallback instead of stopping. Python uses `try` and `except`; JavaScript uses `try` and `catch`.

```python
try:
    with open("signups.txt", encoding="utf-8") as f:
        names = f.read().splitlines()
except FileNotFoundError:
    names = []
```

```javascript
let names = [];
try {
  const text = fs.readFileSync("signups.txt", "utf8");
  names = text.split("\n");
} catch (err) {
  if (err.code !== "ENOENT") throw err;
}
```

**What to look for.** A handler that catches everything. Python's bare `except:` and an empty JavaScript `catch` block both turn every failure into silence, which is worse for the reader than a crash. The club page would then show an empty membership list instead of an error, a wrong answer wearing the face of a real one. A handler should name the failure it expects, as both snippets above do, and let everything else stop the program loudly.

## Where this rule sits in the system

The seat check is one function in the **backend**, the part of the system that enforces rules on a machine you control, away from the student. It talks to two things. On one side, a request to sign up arrives from the **frontend**, the part that runs on the student's own device, through the API, the agreed way one program calls another. On the other side, the function reads and writes the stored roster in a **database**, the system whose whole job is holding data after a restart.

Its interface is small, and worth stating exactly: it takes the current count and a name, and returns a new count and a message. Everything that needs the rule goes through that one entrance.

The **blast radius** — how far the damage reaches when this fails — is wider than the function suggests. When the cap sits one too high, the failure does not stay inside the function. The count the database holds and the list the page draws stop agreeing. A confirmation email goes to a student with no seat. The room booking, sized for thirty, is one person short. The certificates, printed for thirty, run out. Nothing in the system stops working, so nobody is paged, and the alerting that would normally tell you something is wrong stays quiet. The thing that breaks last is the club's trust in its own roster.

That is the case for one small habit, and it is the smallest verification move in this book. For any rule, read the code at exactly two values: the **boundary value**, the one at the limit, which here is thirty; and the value that is legal but empty, like a name that is present and blank. Two values. Reading them takes seconds, and both of the faults above are caught by that and nothing else.

## What it costs

A cap that is wrong by one is cheap to fix and expensive to ship, and the expensive version has flown.

On 4 June 1996, the first Ariane 5 rocket, the European Space Agency's new heavy launcher, was lost 37 seconds after lift-off. It veered off its flight path, broke up under the load, and was ended by its own safety system at 39 seconds. The launcher and its four Cluster research satellites were destroyed, at a reported cost of more than US$370 million, and the payload was uninsured. The European Space Agency's Ariane 501 inquiry report traced the cause to guidance software reused unchanged from the smaller, slower Ariane 4. A value that had stayed small on the old rocket grew large on the new one, and a line converting it into a 16-bit integer — a whole number with a fixed, small range — overflowed and stopped that part of the software. The code had done its job correctly for years. Nobody had re-read it against the machine it now ran on.

The club version of that fault costs a chair and a blank row. The repair costs the same as the fault did to find: one changed character, and one deleted line. What was never cheap is the reading that would have caught them, and even that is measured in seconds, at two values, taken before the change is merged.

## When to reach for it, and when it fails

Read every change before you accept it. That is the rule, and reading is cheap enough that the exceptions are narrow. The narrow exception is code you will never touch and cannot check, such as the internals of a large third-party library. There, the honest move is to bound what you depend on rather than read all of it: you check its interface and its behaviour, not its body.

The decision rule for any rule already written is sharper than "read everything": trace the boundary value and the empty value before you accept it. You do not need the whole file in your head. You need the two values where a rule like this one actually decides.

The counter-indication is the one that catches people, and it is the opposite of what intuition says. The obvious choice is to trust code that reads cleanly, or that passes its tests, and that choice is wrong exactly when the code is fluent and the tests are green, because a boundary fault passes both. Fluency is what stops you reading, and a test written with `29` never reaches `30`. The moment to distrust your own sense that the code is fine is the moment it feels fine.

Two ways to hold this job wrong point in opposite directions. **Over-trust** is accepting the diff because it looks correct, and it ships the off-by-one, with seat thirty-one in the room on Monday. **Over-caution** is refusing to rely on agent code at all until you can rebuild every line yourself, which keeps the agent's output out of your project and keeps the reading skill out of your hands. The first ships the fault. The second means you never learn to see it, because you never had to. The move that avoids both is the one this chapter has been building: specify the rule, let the agent implement it, verify by tracing the two values where it decides, and own what ships. Reading, not writing, is the half that stays yours.

The reading metaphor stops being true at one point worth naming. Prose is finished when it makes sense. Code is finished when it has been checked, and those are different finish lines. A paragraph you understand is a paragraph you have understood. A function you understand may still be wrong at the one value you never traced.

The symptoms arrive before the incident, and they are quiet. You cannot say which value the comparison uses. The number in the tests is a round twenty-nine, but never the boundary. A `try` block catches everything and reports nothing. The roster and the count disagree by one. None of these stops the program, which is exactly why each is easy to read past.

<Callout type="warning" title="Safety floor">
Whatever writes the code, you own it the moment you accept it, and "the agent wrote it" has never once fixed a broken system. Never merge a rule you have not traced at its boundary value and at its empty value. A wrong cap does not announce itself: the off-by-one that lets the thirty-first student in reads cleanly, passes every test written with twenty-nine, and shows up days later as a blank row on a roster.
</Callout>

## Where the idea comes from

The hard part of reading code you did not write has a name in the literature, and it is older than any of the current tooling. In a 1985 essay, *Programming as Theory Building*, the Danish computer scientist Peter Naur argued that a program is not its source code. The code is a record; the program is a shared mental model, which he calls a theory, and it lives in the heads of the people who built it. The text survives them. The theory does not. That is the whole difficulty of reading someone else's code in one paragraph: you have the record and not the theory, so you rebuild the theory from the outside.

Two threads lead out from there. Michael Feathers' *Working Effectively with Legacy Code* (2004) defines legacy code as code without tests, which is a statement about what you can safely change rather than about how old the code is. And a whole research field, program comprehension, studies how people actually read code and where their attention goes, rather than how they write it.

The live disagreement is whether any of that survives the agent. One position, from the Spec-Driven Development movement, is that the written specification becomes the source of truth and the code becomes a build artifact to be regenerated and thrown away, so human-readable code matters less every year. The other position is that a person must still read and check what runs, so legibility keeps its value. The disagreement is real and open. Watch which claim the tools you use are betting on.

Where to read next: Naur's essay, short and worth the hour; Feathers for the practice; and the official language references, `docs.python.org` and MDN, for the syntax that neither side of that argument can escape.

## Before you turn the page

Without looking back, read this function. It is the same seat rule, and it is wrong in two places.

```python
SEATS = 30

def add_signup(taken, name):
    if name == "":
        return taken, "A name is required."
    if taken > SEATS:
        return taken, "The club is full."
    return taken + 1, "You are in."
```

Answer three things from memory. First, which single value of `taken` lets one student too many through, and what the count becomes afterwards. Second, the name check reads as though it guards against an empty name, so name one input it still accepts. Third, from the section on failures, say in one sentence what you would read first in a traceback, and why the bottom is the right end to start from.

**Next:** the chapter on databases takes the roster this function trusts and asks where that count is really stored, and the chapter on Git and GitHub takes the diff you have learned to read and asks how you review, approve and undo one.
