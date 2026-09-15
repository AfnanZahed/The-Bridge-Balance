# SDE Intro live lecture series, Parts 2–4

**Filename note:** this file predates a correction — there is no official
"Stage 0" in the curriculum (it fixes Stages 1–4 only). The site now
carries this content as real files: [`docs/intro-2-binary-to-language.md`](../../edu-site/docs/intro-2-binary-to-language.md),
[`docs/intro-3-architecture-map.md`](../../edu-site/docs/intro-3-architecture-map.md),
[`docs/intro-4-two-extremes-and-sde.md`](../../edu-site/docs/intro-4-two-extremes-and-sde.md) —
sitting flat in the sidebar right after "intro", not under any stage
banner. `prerequisite-graph.yaml` tracks them as `intro-2`/`intro-3`/
`intro-4`, `status: placeholder`, pending the user's own review on
localhost. This file's own name is left as-is to avoid breaking the link
already shared; its content below (the reasoning, the beat structure) is
still the working record of *why* the shipped chapters read the way they
do.

**Revised 2026-09-03 (third pass):** All three parts are now complete to
the same standard. Second pass rewrote Part 3 after feedback that the
first draft was confused, wrongly ordered, and too compressed — it stated
architectural roles as abstract labels before any concrete grounding,
backwards from this book's own `canon/voice.md` rule (concrete before
abstract, always in that order). This pass brings Parts 2 and 4 up to
that same bar (continuous narrative, **What/Why/How/When/Where** per
headline term) and adds all three as `planned` rows in
`prerequisite-graph.yaml`, per the user's explicit request. None are
time-boxed to 30–45 minutes any longer — each runs as long as it needs to.

**This is a proposal in substance, formalized in one respect.** Written by
`curriculum-architect` at the user's request, from a live-teaching need
rather than a book-authoring one. The lecture content itself — titles,
beats, wording — remains fully non-binding and can change at will. What
*is* now real: three `planned` rows in `prerequisite-graph.yaml` (`s0-02`,
`s0-03`, `s0-04`), added because the user confirmed these candidates and
asked for them to be tracked, per `curriculum-architect`'s own Mode 1
step 5 / Mode 2 step 4 protocol for exactly this moment. `planned` is
deliberately the least committal status the graph has — no file exists,
and title/path/scope/requires can all change the moment anyone actually
authors this as a book chapter, if that ever happens at all.

## Context

The user teaches "SDE Intro" as a live, spoken series to students, ahead of
Stage 1 proper. Part 1 (delivered already) covered the syllabus. Part 1 also
promised students that the *next* lecture would cover "the context, complete
story and meaning of SDE" — i.e. the book's own thesis and the two extremes
(`canon/thesis.md`). That plan changed: the two extremes don't land without
software architecture as a reference point first, and architecture doesn't
land without the binary-to-high-level-language journey underneath it. Parts
2–4 below are the resulting three-lecture bridge back to that original
promise.

Constraints the user set when this was first sketched, and how they stand
now:
- ~~**~30–45 minutes per part.**~~ **Superseded.** Completeness and
  correctness now outrank a time box for all three parts — each runs as
  long as it needs to. (First applied only to Parts 2/4; lifted for Part 3
  after round two, then explicitly lifted for all three in this pass.)
- **Brief mention only** for architecture domains the 4-stage curriculum
  never actually returns to (blockchain, IoT, cybersecurity-as-a-domain,
  AI/ML-as-a-domain) — **still in effect.** Resolved in Part 3 as a
  same-map callback (beat 11): reusing vocabulary just taught rather than
  introducing a parallel set of new terms. See Flagged risks below.

## The spine

One sentence tying all three parts together, for the user's own use: *every
layer of computing is the same move repeated — someone hides yesterday's
pain so the next generation can build faster (binary→assembly→high-level
language, hardware→OS→app, manual ops→cloud). An AI coding agent is the
newest rung on that same ladder. The two extremes in Part 4 are just what
happens when someone relates to that newest rung wrongly — refusing to climb
it, or climbing with their eyes shut. SDE is climbing on with your eyes
open.*

## Candidate structure

### Part 2 — "From Electricity to English" (binary → assembly → high-level languages)

**Format note:** same continuous-narrative approach as Part 3 — no code,
no practical, just the room watching one idea prove itself four times in a
row. Same **What / Why / How / When / Where** pattern for each headline
term.

**Opening line:** "Point at anything electronic in this room — your
phone, that laptop, the projector. Every single one of them, underneath
everything else, only ever understands exactly one thing: is the
electricity on, or off."

1. **The only thing a machine actually understands** (*bit, binary*)
   - **What:** a bit is a single 0 or 1 — the smallest unit of
     information a computer can hold, one of exactly two electrical
     states.
   - **Why:** transistors — the switches computers are built from — are
     only reliable at telling two states apart. A third reliable state,
     at billions of transistors per chip, isn't something that can be
     built to work every time.
   - **How:** bits get grouped (8 of them make a *byte*) and combined in
     agreed patterns to stand for numbers, letters, colours, sound —
     everything.
   - **When:** not a "sometimes" — genuinely everything a computer does,
     at the very bottom, all the time, no exceptions.
   - **Where:** the hardware itself — transistors, memory, storage. The
     literal physical layer.

2. **The pain of talking directly to the machine** (*machine code*)
   Hook, asked to the room: "If I wanted you to add two numbers using
   only 0s and 1s, could you write that instruction yourself, right now?"
   Let the silence land.
   - **What:** the raw sequences of binary instructions a CPU executes
     directly.
   - **Why:** it's the only "language" the processor speaks natively —
     nothing simpler exists underneath it.
   - **How:** each exact pattern of bits maps to one specific tiny
     operation (add these two numbers, move this value here).
   - **When:** every program, at the final moment before it actually
     runs, is reduced to exactly this — no program skips this step.
   - **Where:** right at the CPU, read one instruction at a time.

   Wall: nobody can realistically write or track thousands of lines of
   raw binary and remember what any of it means. Early programmers
   actually did this by hand, with switches and punch cards. That real,
   historical pain is what forces the next layer to exist.

3. **Giving the numbers names** (*assembly language*)
   Hook: "What if, instead of memorising that `10110000` means 'load this
   value,' we just… wrote `LOAD`?"
   - **What:** human-readable short commands (`MOV`, `ADD`, `JMP`) that
     map almost one-to-one onto machine code instructions.
   - **Why:** raw binary is unreadable and unwriteable at any real scale
     — assembly swaps numbers for words without changing what's actually
     happening underneath.
   - **How:** a program called an *assembler* translates each word
     directly into its exact matching binary instruction — literal,
     mechanical, no cleverness involved.
   - **When:** still used today wherever every last drop of speed or
     control matters — operating systems, drivers, security research —
     almost nowhere else, because of what's coming next.
   - **Where:** still tied to one specific family of hardware — assembly
     written for one chip won't run on a different one.

   Wall: even with words instead of raw numbers, you're still narrating
   every microscopic step by hand, and redoing it completely for every
   different kind of chip. Building anything real this way took forever.

4. **A language built for humans, not machines** (*high-level languages*)
   Hook: "What if the language didn't care which chip it eventually ran
   on at all?"
   - **What:** languages — Python, JavaScript, C, Java, and everything
     Stage 1 uses — written to be read and written by humans: full
     words, real structure, ideas instead of raw steps.
   - **Why:** assembly's two problems — unreadable at scale, locked to
     one chip — both had to disappear before software could become more
     than a handful of specialists could build.
   - **How:** a *compiler* or *interpreter* does the translation job an
     assembler used to do, automatically, across many kinds of hardware —
     the same Python code runs on a Mac, a Windows PC, or a server,
     because the last-mile translation adapts to whichever machine it
     lands on.
   - **When:** this is where nearly the entire software industry lives
     today — this course included.
   - **Where:** the code itself travels — write once, and whatever
     machine it reaches handles turning it into that machine's own
     binary.

5. **Naming the idea that just happened four times** (*abstraction*)
   Hook: "Notice something. Binary → assembly → high-level language.
   Every step did the exact same thing: someone got tired of the mess
   underneath, and built a layer on top that hides it."
   - **What:** hiding the complexity of one layer so the layer above it
     can be reasoned about more simply.
   - **Why:** no one can hold "which transistor is on" in their head
     while also designing a shopping cart — abstraction makes both
     possible by never requiring both at once.
   - **How:** each layer keeps a strict promise to the layer above it
     ("give me an ADD instruction, I'll turn it into voltage") so nothing
     above ever has to think about what's underneath.
   - **When:** constantly — and not just in the ladder just walked. This
     one idea explains nearly everything still to come, including next
     lecture's entire subject.
   - **Where:** everywhere, stacked: hardware → assembly → language →
     (next lecture) frontend/backend/database → frameworks → AI coding
     agents. Same move, over and over.

**Bridge to Part 3:** "So — code is layered abstraction, on top of
abstraction, on top of electricity. Now: what do people actually *build*
with all these layers? That's next — the entire shape of modern software,
built from the exact same move you just watched happen four times in a
row."

### Part 3 — "Let's Build One Thing Together" (the complete architecture story)

**Format note:** one continuous narrative, told live — no code, no
hands-on practical. Students watch the shape assemble in their heads, beat
by beat. Every term is introduced because the story just hit a wall that
requires it, never as a standalone definition dropped in cold. The running
example is a pure teaching device (per `canon/audience.md`'s own
"university registration system" example) — not a project students build.

**Opening line:** "Let's build something — not on a laptop, right now, in
your head. By the end of this, you'll have watched the entire shape of
Stage 1 assemble itself in front of you, one wall at a time."

**The running example:** a page where students sign up for a club — say,
the AI club, capped at 30 seats.

Each beat below is taught through the same repeatable pattern — the
narrative hook (why we're even here), then **What / Why / How / When /
Where** for the headline term, so the structure is consistent enough for
live delivery without notes once it's run once. Minor companion terms stay
woven into the How rather than getting their own full five-part treatment,
or the beat would stop being teachable in one pass.

1. **Where does this thing even live?** (*platform*) — say explicitly:
   everything in this lecture is the same map if it were a phone app
   instead — only the tools change, never the shape. (Comes back at beat 11.)
   - **What:** the environment a piece of software actually runs inside —
     a browser, a phone's OS, a desktop OS.
   - **Why:** the same idea needs completely different tools depending on
     where it has to run.
   - **How:** pick a target before writing anything — web (any device,
     through a browser), native mobile (iOS/Android), or desktop install.
   - **When:** the very first decision, before a single line of frontend
     or backend exists.
   - **Where:** this term *is* the "where" — everything else in the story
     answers "where does it run" by pointing back at whatever's chosen here.
     For this course: the web, because that's what Stage 1 builds.

2. **What does the student actually see and touch?** (*frontend*)
   - **What:** the part of the software the user directly sees, touches,
     and types into — the form, the button, the list of who's already
     signed up.
   - **Why:** a human needs an actual interface to act through — nobody
     signs up by editing a database by hand.
   - **How:** built from *components* (one reusable piece of interface —
     the form, the button), laid out on a page; *responsiveness* is that
     same form reshaping correctly on a phone versus a laptop. (Stage 1
     builds this with a tool called Next.js — plant the name, don't unpack
     it yet.)
   - **When:** the very first thing the student encounters, before any
     request has been sent anywhere.
   - **Where:** runs entirely on the student's own device, inside their
     browser. → feeds **s1-03**.

3. **The trap** — where do we check "fewer than 30 signups" before letting
   someone in? Obvious-seeming answer: right there in the frontend code.
   Reveal: frontend code runs on the *student's own device* — any student
   can open developer tools and rewrite it, delete the check, submit the
   form 500 times. Land it as a rule, out loud: **the frontend can never be
   trusted to enforce anything, because you don't control the device it
   runs on.** This one sentence is why almost everything else in the
   lecture exists.

4. **Something the student can't see or touch** (*backend*)
   - **What:** the part of the software that makes the decisions and
     enforces the rules, hidden from the user.
   - **Why:** beat 3's trap — a rule enforced on the user's own device
     isn't a rule at all.
   - **How:** a second program, in an ordinary language (Python,
     JavaScript), that receives a request, checks the rule, sends back an
     answer.
   - **When:** any time a rule has to hold even if the user tries to cheat
     — capacity limits, payments, anything real.
   - **Where:** runs on a machine *you* control — a server, never the
     student's device. → feeds **s1-04**.

5. **How do the two even talk?** (*API, HTTP, REST — plus validation,
   middleware, logging*)
   - **What:** an API is the fixed, agreed contract for what the backend
     will answer (a restaurant menu, not a kitchen you walk into); HTTP is
     the language the requests actually travel in; REST is one common
     house style for organizing that menu sensibly.
   - **Why:** frontend and backend live on two different machines —
     without a shared, predictable format, neither side can trust what
     it's receiving.
   - **How:** the frontend sends a structured request ("POST a signup,
     here's the name"); the backend checks it (*validation*), maybe runs
     it through a checklist of steps first (*middleware*), sends back a
     structured response, and keeps a written trail of what happened
     (*logging*) in case something breaks later.
   - **When:** every single time information needs to cross from one side
     to the other — constantly, in a real app.
   - **Where:** travels over the network, between the student's device and
     the server. → feeds **s1-04**.

6. **The goldfish problem** (*database*)
   - **What:** a dedicated system whose whole job is storing data
     reliably, past a restart.
   - **Why:** a backend that only remembers signups in its own running
     memory forgets every one of them the moment it restarts.
   - **How:** *SQL* databases (Postgres) store strict tables — rows,
     columns, and *relationships* connecting them (this signup row points
     at that student); *NoSQL* databases (MongoDB) store looser bundles
     called documents; *Redis* stores things built purely for speed, as a
     shortcut.
   - **When:** any time data needs to outlive one running moment of the
     program — nearly always.
   - **Where:** its own dedicated system, usually running alongside the
     backend, not inside it. → feeds **s1-05**.

7. **Who's allowed to do what?** (*authentication, authorization*)
   - **What:** authentication is proving who you are (logging in);
     authorization is what you're allowed to do once you're known.
   - **Why:** without it, any request can act as anyone — cancel someone
     else's signup, see the whole list.
   - **How:** the student proves identity once; the backend then checks,
     on *every* later request, whether that specific identity is allowed
     to do the specific thing being asked.
   - **When:** the moment more than one kind of user exists with different
     rights — a student versus a club admin.
   - **Where:** enforced entirely on the backend — never trust a
     frontend's claim about who's asking. Same trap as beat 3, one layer
     up. (Real Stage 1 topic per `curriculum_1.md`; no placeholder chapter
     of its own yet in `prerequisite-graph.yaml`.)

8. **More than one builder** (*Git, commit, GitHub, branch, pull request*)
   - **What:** Git is a complete history of every change to a project,
     saved as *commits*; GitHub is where that history lives online so it
     can be shared.
   - **Why:** more than one person — or an AI agent — is going to touch
     this same code, and someone needs to be able to undo a bad change or
     see who changed what.
   - **How:** work happens on a separate copy (a *branch*), then gets
     proposed back into the main project through a *pull request*,
     reviewed before it merges.
   - **When:** from the very first line of real code, not bolted on at the
     end.
   - **Where:** a local copy on each person's machine, synced to a shared
     copy on GitHub. → feeds **s1-06**.

9. **From your laptop to the real world** (*deployment, domain*)
   - **What:** taking the frontend and backend off your laptop and
     putting them on machines that are always on, reachable at a real
     address (a *domain*).
   - **Why:** a laptop that's asleep or off Wi-Fi means the app doesn't
     exist for anyone else.
   - **How:** tools like Vercel take the code and run it on infrastructure
     built to stay up.
   - **When:** once there's something worth showing the outside world —
     even a rough version.
   - **Where:** on someone else's always-on machines. "The cloud" is just
     a name for computers you don't have to personally keep plugged in.

10. **Tie back to Part 2** — every box just built is itself
    high-level-language code, going through the exact same journey as last
    lecture: compiled or interpreted down through assembly to binary,
    running on top of an operating system that is itself one more
    abstraction layer over raw hardware. Nothing new was invented tonight —
    more rooms, same ladder.

11. **Zoom out — same map, different terrain** — this shape (frontend,
    backend, API, database, auth, collaboration, deployment) is not a
    website-only idea; it's the shape of nearly all modern software.
    Mobile: same boxes, Swift or Kotlin instead of the web's JavaScript.
    Desktop: same boxes, different packaging. Blockchain: replaces exactly
    one box — the backend becomes a *smart contract*, run identically on
    thousands of machines instead of one, so no one can quietly rewrite the
    rule; everything else (frontend, auth, API) is the same map. IoT: same
    shape, tiny — a sensor plays frontend, a small chip or cloud service
    plays backend. Cybersecurity isn't a separate box at all — it's the
    question "what happens if someone lies to *this* box," asked at every
    beat above (beat 3's trap and beat 7's auth split *were*
    cybersecurity, even unnamed). AI development mostly means the backend
    box now holds a model instead of hand-written rules — it still needs an
    API, a database, and auth, arguably more urgently.

12. **Close, pointed straight at Stage 1** — "Every box you met today —
    frontend, backend, API and HTTP, database, auth, Git and GitHub,
    deployment — isn't trivia. In this exact order, it's the next several
    lessons of Stage 1. You already have the map. Stage 1 just hands you
    the tools for each room on it."

**Deliberately excluded from this part**, to keep it one coherent story
rather than an encyclopedia of everything Stage 1 eventually covers: OOP,
packages/project management, UI/UX and branding, async/realtime systems,
personal branding. These are real Stage 1 topics, but they aren't
*architecture* — they belong to whichever later lecture or chapter actually
teaches them.

### Part 4 — "Two Ways to Fail, and the Bridge Between Them" (closes Part 1's promise)

**Format note:** same continuous-narrative approach, same **What / Why /
How / When / Where** pattern for the two extremes and for Spec-Driven
Engineering itself. This is the lecture Part 1 promised, delivered only
once Parts 2 and 3 are load-bearing under it.

**Opening line:** "Two lectures ago, I promised you the story of SDE.
Here's why it took this long to earn honestly: I needed you to see the
whole map first, because the mistake I'm about to name only makes sense
once you've seen how much of that map an AI agent can now touch in a
single sentence."

1. **Naming the moment** — every box from last lecture's map — frontend,
   backend, API, database, auth, deployment — a coding AI agent like
   Claude Code or Cursor can now generate in minutes, without the person
   typing the prompt understanding a single one of those boxes.

2. **Extreme 1 — over-trust** (*vibe coding*)
   - **What:** building software entirely through iterative AI prompts,
     without understanding the underlying code. (Coined by Andrej
     Karpathy, February 2025; Collins Dictionary's 2025 Word of the Year
     — always attribute it, never present it as this course's own term.)
   - **Why:** it *feels* fast — every wall from last lecture's story (the
     trust trap, the goldfish problem, who's-allowed-to-do-what) seems to
     just vanish, because the agent quietly handles it without being
     asked to.
   - **How:** prompt, accept whatever comes back, ship it, repeat — no
     spec written down first, nobody reviewing what actually got built.
   - **When:** most tempting exactly when a deadline is close and last
     lecture's map feels like a lot of boxes to personally hold in your
     head at once.
   - **Where:** shows up everywhere the map from Part 3 lives — an
     unreviewed auth check, a database query nobody verified, a
     deployment nobody tested.

   Evidence, specific and dated: Veracode found AI-generated code
   introduces vulnerabilities in **45%** of cases (2025). METR found
   experienced developers **19% slower** on complex tasks — while it felt
   faster as they worked — and **63%** reported spending more time
   debugging AI-generated code than writing it from scratch would have
   taken. A real incident: an AI coding agent deleted a company's
   production database mid-task (Replit/SaaStr, July 2025) — nobody had
   told it that database was off-limits, because nobody wrote down what
   it couldn't touch.

3. **Extreme 2 — over-caution**
   - **What:** refusing agentic AI outright — insisting on hand-building
     every box from Part 3's map alone, the traditional way, before ever
     directing an agent.
   - **Why:** it *feels* safe — nothing an unreviewed agent does can hurt
     you if you never let it touch anything.
   - **How:** no agent use at all, or so tightly restricted it captures
     none of the actual leverage.
   - **When:** most tempting right after hearing beat 2's numbers — the
     instinct to swing all the way to the opposite wall.
   - **Where:** shows up as a developer, or a whole team, quietly falling
     behind competitors who learned to direct agents well — while
     feeling responsible for having played it safe.

4. **Why both fail the identical way** — neither extreme actually *uses*
   the map from Part 3. Vibe coding skips it entirely. Over-caution
   refuses to let anything but your own two hands touch it. Both are a
   relationship failure with the same map, in opposite directions.

5. **The bridge** (*Spec-Driven Engineering*)
   - **What:** the discipline where the engineer specifies intent and
     boundaries, the AI implements within them, and a human verifies
     before taking ownership.
   - **Why:** you don't need to hand-build every box from Part 3 (that's
     over-caution), and you don't need to trust an agent blindly across
     all of them either (that's vibe coding) — you need enough fluency in
     the map to direct precisely, and check precisely.
   - **How:** the four-stage loop. **Specify** — define intent,
     constraints, risks, acceptance checks: yours. **Design** — choose
     boundaries and failure behaviour: yours, with the agent offering
     options. **Implement** — the agent generates; you inspect the diff.
     **Verify** — you judge the evidence and decide it's actually done;
     the agent can assist, the judgment stays yours.
   - **When:** every time, not just for changes that feel important — the
     loop doesn't get to be optional because a task feels small.
   - **Where:** lives in you, not in the tool — the same four-stage
     discipline holds regardless of which agent or model you're using
     this month.

   Worked example, walked concretely: a team needs a CSV export endpoint.
   *Specify* — must exclude internal-only fields, handle 100,000 rows, be
   rate-limited. *Design* — the agent offers three approaches to the
   large-row problem (stream it, build it in memory, run it as a
   background job); you choose, based on your own infrastructure.
   *Implement* — the agent writes it; you check two specific things: does
   the field filter match the *current* schema, and is the rate limit
   per-user rather than global. *Verify* — you run an export against a
   test account holding known internal-only fields and confirm none leak
   out — the one check that catches the worst realistic failure.

   Worth saying to the room, verbatim, as the closing line of this beat:
   *"Whatever the agent writes, it isn't done until you've checked it —
   'the AI did it' is never a good enough reason for something going
   wrong."*

6. **Close, against Part 1's exact promise** — "Lecture one, I told you
   the next lecture would be the full story of SDE. It took two extra
   lectures to earn that honestly — you cannot see a bridge clearly until
   you've stood on both riverbanks. One bank was binary becoming
   language. The other was the size of the whole software world. You've
   now stood on both. This is Spec-Driven Engineering, and it's what the
   rest of this course teaches you to actually do."

## Relationship to the existing graph

**Now formalized, not just cross-referenced:** `prerequisite-graph.yaml`
carries three new `status: planned` rows as of this pass — `s0-02` (Part
2), `s0-03` (Part 3), `s0-04` (Part 4) — stage 0, positions 1–3, right
after `intro` (position 0). `s0-02` requires nothing; `s0-03` requires
`s0-02`; `s0-04` requires `s0-03` — a straight chain, matching how these
are actually delivered live. Their full content is not duplicated into the
graph; each row's `notes` field points back here. `path` for all three
sits under a new `docs/stage-00-sde-intro/` folder that doesn't exist yet
— invented for this pass, following the existing `docs/stage-0N-<stage-
slug>/<NN>-<lesson-slug>.md` convention (matching stage-01 through
stage-04's own folder pattern) rather than intro.md's one-off no-folder
placement, since three files plus intro genuinely warrants one. That
folder choice is itself non-binding — easy to change before anything is
actually authored there.

Cross-references to Stage 1's own placeholders, unchanged by the
formalization above:
- Part 2 sits closest to **`s1-01`** ("Foundations: Architecture Before
  Code," currently `placeholder`, `teaches: [architecture, components,
  boundaries, interfaces]`) — a thematic relationship, not a `requires`
  edge; `s0-02` doesn't actually depend on `s1-01`'s content.
- Part 3's beats map one-to-one onto Stage 1's real placeholders: beat 2 →
  **`s1-03`** (Frontend), beats 4–5 → **`s1-04`** (Backend — APIs, HTTP,
  REST, validation, middleware, logging all named explicitly), beat 6 →
  **`s1-05`** (Databases), beat 8 → **`s1-06`** (Git and GitHub). Beat 7
  (auth/authorization) is a real `curriculum_1.md` Stage 1 topic with no
  placeholder row yet — worth a `curriculum-architect` Mode 2 brief of its
  own if the user wants it formalized later. None of this is a commitment
  that Part 3 becomes these chapters verbatim — only that the order was
  chosen to match them.
- Part 4 leans entirely on **`docs/intro.md`** (`stage: 0`), which already
  carries the two-extremes thesis and its sourced evidence in depth —
  a citation relationship, not a `requires` edge either.

## Flagged risks

- **Evidence reuse, not collision.** Part 4 retells intro.md's own evidence
  (`metr-productivity`, `veracode-genai`, `karpathy-vibe-coding`,
  `collins-woty-2025` in `evidence-ledger.yaml`) rather than introducing new
  sources. For a live lecture this is a backward callback, not a new use —
  no ledger row is warranted (per that file's own rule: a passage that only
  points back to where a citation already lives isn't a new use). It would
  only become a real collision if this content were later authored as its
  own distinct chapter *and* asked the same sources the same questions
  intro.md already asks of them — worth a fresh angle if that happens, not
  before.
- **Breadth vs. depth in Part 3 — resolved 2026-09-03.** The user's
  original brief-dump asked for genuinely encyclopedic coverage (blockchain,
  IoT, cybersecurity, AI dev, every platform, every language). First draft
  compressed these to bare one-liners; confirmed too thin. Resolved as a
  **same-map callback** (beat 11): each tangential domain is taught by
  explicitly reusing the vocabulary beats 1–9 just built ("a smart contract
  IS a backend, just distributed") rather than introducing a parallel set of
  new terms. Deeper standalone treatment of any one of these remains
  available later if the user wants it — this proposal doesn't foreclose
  that, it just isn't where Part 3 spends its time.

---

*Proposal only. Nothing here is a commitment to a chapter, a title, or a
scope — the user's own review and the actual lecture delivery are what make
any of it real.*
