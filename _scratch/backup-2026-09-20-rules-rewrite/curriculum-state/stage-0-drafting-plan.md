# Stage 0 — Approved Drafting Plan

**What this file is.** The finished, owner-approved chapter and lesson plan for Stage 0. Hand this file to a drafting session and say "draft Chapter N" — everything needed to start is here or linked from here.

**Status: approved 2026-09-16. Nothing is drafted yet.** No Stage 0 MDX has been written against this plan and no `prerequisite-graph.yaml` rows have been added. The currently-shipped Stage 0 files (`edu-site/docs/intro-1-*` through `intro-5-*`) are the *old* Stage 0 and are being replaced from scratch — harvest-only for verified citations, never for prose or structure.

**How this plan was built.** Seven DeepSeek-v4.1-Flash research passes (via Command Code, max effort, real web search) at `curriculum-state/research/stage-0/cluster-{1..7}-*.md`. Those dossiers hold the verified dates, sources, disputed items and story hooks. This file holds the teaching order. Full decision history, including four rejected structures and why each failed, is in `curriculum-state/proposals/whole-book-redesign-record-2026-09-14.md` (§18 is current).

---

## The ordering rule — do not break this

> **Nothing is taught before the thing it is built on. Within that constraint, everything runs in date order.**

Dependency is the hard constraint. Date order is the tiebreak.

This rule exists because three earlier structures violated it and were rejected: software architecture placed before programming languages, then AI-writes-code placed before code, then editors and IDEs placed before programming. Stage 0 has **no phases and no threads** — it is one continuous ladder from `0/1` to Spec-Driven Engineering, each chapter resting on the ones before it.

Where a chapter's subject has roots older than its position (terminals descend from 1870s teleprinters), **the chapter says so in its own opening** rather than being relocated.

**One deliberate exception, in the whole stage:** Chapter 18 rewinds to 1956. AI research ran as a parallel track that did not touch working programmers until roughly 2021, and splitting it across five earlier chapters would destroy a narrative that only works whole. It opens by naming its own rewind with a dated anchor. Every other chapter moves forward.

## How to read a chapter block below

- **Assumes** — what the reader already has. Do not re-teach it.
- **Opens on** — the chapter's first move.
- **Closes on** — the last beat, and the handoff to the next chapter.
- **Stops at** — the hard edge of each lesson. Crossing it steals the next chapter's material. This column is the anti-drift device; treat it as binding.
- **Anchors** — the named things a lesson may use. Not a checklist to exhaust, and not a licence to add more from memory. Anything not here gets verified in the dossier first.

**On density:** anchors are the researched backing, not the reader's diet. Keep dates, proper nouns and invented-thing counts low in the prose itself. Rigour stays backstage.

---

## Rules that bind every chapter drafted from this plan

| Rule | Where it lives |
|---|---|
| Name-First spine, two-reader architecture, language register | `.claude/skills/lesson-spine-authoring/` |
| Chapter pipeline: topic → research → scope → MDX → gate → ledgers | `chapter-production` inside `bridge-balance-project-guide` |
| Absolute-beginner floor — Stage 0 assumes a reader who has never programmed | `curriculum-state/canon/audience.md` |
| Light historical register — story and analogy, not citation density | redesign record §15 |
| Nothing reproduced from any studied source; transformation is the requirement | `curriculum-state/canon/research-and-comparison.md` |
| Owner's own comparative study blocks drafting if not supplied | same file — **stop and ask if missing** |
| One continuous read; only `Callout`, `StageBanner`, `ChapterState` in the body | `src/theme/MDXComponents.tsx` |

```bash
cd edu-site && node scripts/check-chapter.mjs --chapter docs/<path>
```

When a chapter reaches `text-ready`, append a dated entry to `edu-site/docs/changelog.md` before calling the task done.

---

# The ladder — 20 chapters

## 1 — Foundations · 1679–1948 · `cluster-1`

**Assumes:** nothing. First chapter of the book.
**Opens on:** a question a reader can answer knowing nothing — how do you say *yes* and *no* down a wire?
**Closes on:** a machine that can hold a number and flip a switch, which nobody has yet told what to do. That gap is Chapter 2.

| Lesson | The one idea it must land | Anchors it may use | Stops at |
|---|---|---|---|
| 1. Two states are enough | Anything can be carried by something with exactly two states — and two-state things can do logic | Leibniz's binary, 1679 · Boole turning logic into algebra, 1854 · Shannon showing circuits can perform that logic, 1937 | The circuit can *decide*. It cannot remember or be instructed |
| 2. Instructions you can hold in your hand | A machine can be told what to do by a physical object instead of a person | Jacquard's loom, 1801 · Babbage's engines, 1837 · Lovelace seeing it could handle more than numbers, 1843 · Hollerith's census machines, 1890 | Instructions are physical and fixed. Nothing is stored inside the machine |
| 3. The switch's three generations | One logical idea, three physical bodies — each smaller, faster, more reliable | Relays · vacuum tubes · the transistor, 1947 · the 1945–48 cluster: the stored-program draft, the word "bit," information theory | Hardware exists and stored programs are possible. **Do not teach programming here** |

## 2 — Programming Is Born · 1945–1957 · `cluster-1`

**Assumes:** Chapter 1's switch and the stored-program idea.
**Opens on:** what a programmer physically did in 1945 — no keyboard, no screen, no language.
**Closes on:** a language a scientist can read. The moment it works, everyone else wants one for *their* job — Chapter 3.

> **This is where programming enters the book. Nothing downstream may assume it earlier.**

| Lesson | The one idea it must land | Anchors it may use | Stops at |
|---|---|---|---|
| 1. What "programming" meant before languages | The first programs were wiring and switch positions, not text | Plugboards and patch cables · toggle switches · punched cards · the human "computers" whose job title the machine took | No symbols yet |
| 2. Raw numbers | Instructions became numbers the machine reads and humans cannot hold | Instructions as numeric codes · the cost of a single transposed digit | Readable to the machine, unreadable to a person |
| 3. The first shorthand | Replace the numbers with short words, and let a program do the translating | Assembly language · the assembler as the first tool that writes code for you | Still one instruction per line, still tied to one machine |
| 4. The first compiler, and the first language that read like English | One line of human-shaped text can become many machine instructions | Grace Hopper's compiler work and A-0 · FORTRAN, 1957 · the widespread doubt that generated code could ever be fast enough | FORTRAN exists and works. **Do not list other languages** — that is Chapter 3 |

## 3 — One Language Was Never Enough · 1958–1964 · `cluster-7`

**Assumes:** Chapter 2 — a high-level language is possible.
**Opens on:** it worked, so why are there thousands of languages today rather than one?
**Closes on:** three or four languages, each shaped by a job. Handoff: none of this matters while the machine stays room-sized and serves one person — Chapter 4.
**Do not** reach past 1964. Modern languages are Chapter 13.

| Lesson | The one idea it must land | Anchors it may use | Stops at |
|---|---|---|---|
| 1. Why one language didn't fit every job | A language carries assumptions about the work, and the first one carried a scientist's | Formula translation as the clue in the name · what a payroll clerk needed that a physicist did not | Naming the mismatch |
| 2. Business gets its own | A language can be shaped by who must *read* it, not who writes it | COBOL · the ambition that a manager could read the code · its survival in production today — **one forward sentence only** | Don't tell the sixty-year survival story here |
| 3. Symbols and lists get theirs | Some work isn't arithmetic at all — it's symbols and lists | LISP · McCarthy · its link to early AI research | Hands the AI thread explicitly to Chapter 18 |
| 4. Designed by committee, and one made for learners | A language can be deliberately designed rather than grown — and one can be built for people who aren't programmers | ALGOL, and how its ideas outlived its use · the notation invented to describe languages (see the dossier's misattribution flag) · BASIC, 1964 | 1964 |

## 4 — The Machine Shrinks, Then Gets Shared · 1958–1971 · `cluster-2`

**Assumes:** Chapter 1's hardware, Chapters 2–3's languages.
**Opens on:** everything so far runs on a machine that fills a room and serves one person at a time.
**Closes on:** a processor on a single chip, and many people on one machine — which raises how those people actually reach it. Chapter 5.

| Lesson | The one idea it must land | Anchors it may use | Stops at |
|---|---|---|---|
| 1. A whole circuit on a sliver of silicon | Hand-wiring was the ceiling, and the chip removed it | Kilby, 1958 · Noyce · why wiring by hand could not scale | The chip exists |
| 2. The doubling everyone planned around | An observation became a schedule the whole industry planned against | Moore, 1965 | A prediction, not a law |
| 3. One chip that is the whole processor | The processor stops being a cabinet and becomes a component | Intel 4004, 1971 | A processor you could buy |
| 4. Many people, one machine | Time-sharing turns booking the machine into sharing it | CTSS · Multics · the shift from a booking sheet to simultaneous users | Sharing is possible. **Do not narrate Unix** — Chapter 8 |

## 5 — Talking to the Machine · 1870s roots, 1950s–1971 · `cluster-4`

**Assumes:** Chapter 4's time-sharing (many users need many ways in) and Chapters 2–3 (there is code to type).
**Opens on:** an explicit signpost that this thread starts earlier than everything so far — with a printing telegraph.
**Closes on:** a person can type a line and change a file, with no screen anywhere. Handoff: the system they were typing into is Chapter 8.

| Lesson | The one idea it must land | Anchors it may use | Stops at |
|---|---|---|---|
| 1. The machine at the end of the wire | The terminal was a typewriter on a wire; the computer was somewhere else entirely | Teleprinters · Baudot's code, 1870s · Teletype Model 33, 1963 — ten characters a second, upper case only · `tty` as the surviving abbreviation | Typing and printing. No screen |
| 2. The first keyboards and screens | Input stopped being cards and became live typing | The first keyboard attached to a computer, Whirlwind, July 1956 | Input exists; full-screen editing does not |
| 3. Why your terminal is still pretending | Today's terminal imitates hardware that no longer exists — its oddities are fossils, not decisions | Terminal emulation · the ATM-at-the-end-of-a-wire analogy, and where it breaks: today there is usually nothing at the far end | The concept only. **The six modern tools are Chapter 17** |
| 4. Editing one line at a time | Without a screen you cannot point at a word, so you name a line and dictate a correction | QED, 1965–66 · TECO, 1962 · `ed`, circa 1969–71 (**keep the year soft**) · CP/M's ED · EDLIN, 1980 · the arithmetic: a screenful is 1,920 characters, which at ten a second takes over three minutes to repaint — so `ed` was *correct for its printer*, not primitive | No screen editors. **Do not mention vi or Emacs** — Chapter 10 |

## 6 — Where the Data Lives · 1966–1979 · `cluster-6`

**Assumes:** Chapters 2–3 (programs exist) and Chapter 4 (machines are shared).
**Opens on:** programs now outlive the people who wrote them — and so does their data. Where does it go when the program stops?
**Closes on:** asking questions of data without knowing how it is stored. Handoff: Chapter 7 — the programs doing the asking are outgrowing their authors.

| Lesson | The one idea it must land | Anchors it may use | Stops at |
|---|---|---|---|
| 1. Data as a filing cabinet | Early data had to be walked through by hand, one path at a time | IMS, begun 1966, first run 1968, built for Apollo parts lists · the CODASYL network model, 1969 and 1971 · Bachman's "the programmer as navigator," 1973 | Naming what that cost |
| 2. The idea that changed everything | Store data as tables of facts and let the machine find the path | Codd, 1970 — the opening argument that users "must be protected from having to know how the data is organized in the machine" · keys, joins, the trap of hand-built paths | The idea, not the products |
| 3. A language just for asking questions | You describe *what* you want, not *how* to fetch it | SEQUEL becoming SQL, 1974 · System R | SQL as a question language, not a general-purpose one — a distinction Chapter 13 reuses |
| 4. The first companies to sell it | An idea from a research paper becomes an industry | Ingres · Oracle's first commercial SQL product, 1979 · the standard, 1986 | 1986. **Do not teach NoSQL** — Chapter 15 |

## 7 — Too Big for One Head · 1968–1972 · `cluster-2`

**Assumes:** Chapters 2–3 and 6.
**Opens on:** projects that worked when one person wrote them, failing when thirty did.
**Closes on:** modules and hidden detail as the first real answer. Handoff: Chapter 8 is a system built by people who believed this.

| Lesson | The one idea it must land | Anchors it may use | Stops at |
|---|---|---|---|
| 1. The crisis nobody planned for | An industry publicly admitted its projects were failing, and named the problem on purpose | The 1968 conference at Garmisch · "software engineering" chosen as an aspiration, not a description | Naming, not solving |
| 2. Why big projects collapsed | When everything can touch everything, a change in one place breaks something distant | Interdependence as the root cause · why more people made it worse, not better | The diagnosis |
| 3. Splitting a program into parts, and hiding what others don't need to know | The value of a boundary is what it *hides*, and where you cut is a decision with criteria | Parnas, December 1972 — criteria for where to cut, **not** repair-pain. Do not conflate with the May 1972 paper or the 1976 one | The criterion. **Chapter 20 revisits this same paper asking a different question — do not pre-empt it** |

## 8 — Unix, C, and the Shell · 1969–1979 · `cluster-2` + `cluster-4` + `cluster-6`

**Assumes:** Chapter 4's time-sharing, Chapter 5's terminals and line editors, Chapter 7's modules.
**Opens on:** a small team building the system they wanted, on a machine nobody else wanted.
**Closes on:** a system, a language, a way to join tools, and a door with a lock. Handoff: Chapter 9 — these machines now want to reach each other.

| Lesson | The one idea it must land | Anchors it may use | Stops at |
|---|---|---|---|
| 1. A small system with big ideas | A system built for its authors' own convenience became the one everything inherited | Unix, 1969 · **this chapter owns the fact that Unix's first three programs were an assembler, an editor and a shell** · treating everything as a file | The design ideas |
| 2. A language written to write a system in | A language built to be portable let the system move to machines it wasn't written for | C, 1972–73 · what portability actually bought | C's purpose. **Do not survey languages** — Chapter 13 |
| 3. The shell and the pipe | Small tools that each do one job, joined end to end, beat one big tool | The first Unix shell, 1971 · the "garden hose" memo, 1964, with pipes shipping by early 1973 · the Bourne shell, 1979 · Bash, 1989 — **a forward marker only** | The idea. **Today's six shells are Chapter 17** |
| 4. Who's allowed in | Storing a password as plain text was a design error the field had to be taught by an accident | The early-1960s incident where the password file was printed on every terminal · the 1979 study: 2,831 of 3,289 real passwords guessable, a dictionary run in about five minutes · the redesign — hashing, repetition, and a salt · the `crypt(1)` vs `crypt(3)` conflation trap | One machine, one user list. **Delegated login is Chapter 15** |

## 9 — Machines Start Talking · 1961–1985 · `cluster-3`

**Assumes:** Chapters 4 and 8.
**Opens on:** every machine in the book so far is an island.
**Closes on:** one network of networks, with names instead of numbers. Handoff: Chapter 10 — meanwhile, the machine itself had been growing a screen.

| Lesson | The one idea it must land | Anchors it may use | Stops at |
|---|---|---|---|
| 1. Breaking a message into packets | Cut the message into pieces that find their own way — invented three times, independently, by people who didn't know of each other | The 1961–67 triple invention · why a telephone call's model does not fit computers | The idea |
| 2. The first network, and its fragility | A working network is not the same as a network that survives being joined to another | ARPANET, 1969 · the deliberately humble wording of the early proposal documents · first network email, **1971** · the first protocol's fragility as the cliffhanger | The cliffhanger — unresolved on purpose |
| 3. Making different networks agree | Agreement on rules, not on hardware, is what makes unlike networks one network | The 1974 design · the four rules · the 1983 switch-over date everyone had to meet | One protocol wins |
| 4. Names instead of numbers, and the rival that nearly won | Humans needed names, and the winning design was not the only serious contender | DNS · NSFNET · OSI as a genuine decade-long alternative, **not a footnote** | Mid-1980s |

## 10 — Screens, and the First Real Editors · 1973–1990 · `cluster-4`

**Assumes:** Chapter 5's line editors, Chapter 4's shrinking hardware.
**Opens on:** the screen arrives, and the first thing people do with it is edit.
**Closes on:** a machine on a desk and one box holding editor, compiler and debugger. Handoff: Chapter 11 — one desk stops being enough.
**Do not** present line → screen → graphical → IDE as a clean sequence. It is not one, and the dossier documents why.

| Lesson | The one idea it must land | Anchors it may use | Stops at |
|---|---|---|---|
| 1. Editing a whole page at once | A screen that can move its cursor anywhere makes a different kind of editor possible — and two answers arrived the same year | Cursor-addressing terminals, 1976 and 1978 · the arrow keys printed on a keyboard that one editor still inherits · vi and Emacs, both 1976, genuinely simultaneous | Text mode |
| 2. The point-and-click track, running in parallel | This track is **concurrent** with the one above, not a later stage of it | The Alto, March 1973 · Bravo, September 1974, the first what-you-see-is-what-you-get editor · the contested "first IDE" claim — **teach it as a claim, not a fact** | Not yet on sale to the public |
| 3. The computer on your desk | The machine stops being shared and becomes personal | Apple II · IBM PC · Macintosh and MacWrite, 1984 | The machine, not the network |
| 4. The first all-in-one programming tools | Editor, compiler and debugger in one box, cheap enough for one person | Turbo Pascal, November 1983, $49.95 — about a tenth of its rivals' price | 1990. **Modern IDEs are Chapter 17** |

## 11 — One Machine Becomes Two · 1980–1995 · `cluster-6`

**Assumes:** Chapter 9's networks, Chapter 10's desktop machines, Chapter 6's databases.
**Opens on:** everyone has a machine now, and they all need the same data.
**Closes on:** the word that still names two job titles. Handoff: Chapter 12 — one more client was about to arrive, and it ran inside a browser.

| Lesson | The one idea it must land | Anchors it may use | Stops at |
|---|---|---|---|
| 1. Why the work moved off your desk | Shared data needs one copy, and one copy needs somewhere to live | Many machines, one truth · what goes wrong with a copy each | The need |
| 2. The wire that made it possible | Office networking is what turned the idea into ordinary practice | The 1973 Ethernet memo and the mid-1980s standard · PC networking software from 1983 onward | The plumbing |
| 3. Asking another machine to do the work | A program can call for work to happen somewhere else and wait for the answer | Remote procedure calls, 1984 · network file systems · a windowing system built to work across a network, 1984 · "the network is the computer" — **John Gage, 1984, not McNealy** | The mechanism |
| 4. The split that still names today's jobs | Front and back are one split, named here, once, plainly | "Client" in print for a machine, 1978 · "server" only in general use around 1992 — **practice preceded the vocabulary by a decade** | Two tiers. **Three is Chapter 14** |

## 12 — The Web · 1989–2000 · `cluster-3`

**Assumes:** Chapter 9's internet, Chapter 11's client and server.
**Opens on:** the internet exists and almost nobody can use it.
**Closes on:** the shape finally getting a name. Handoff: Chapter 13 — a client that runs programs needs a language of its own.

| Lesson | The one idea it must land | Anchors it may use | Stops at |
|---|---|---|---|
| 1. The linking ideas that came first | This was a crowded field, not a lone inventor | Nelson · Engelbart · HyperCard · Gopher | The field |
| 2. Why this one spread | A licensing decision decided it, not the technology | Gopher's 1993 fee against the same year's public-domain release | Adoption |
| 3. The browser, and what it made possible | One universal client means anyone can read, and soon anyone can publish | The browser as the client everyone already has | Reading and publishing |
| 4. Giving the shape a name | The rules were already there; the document named what the Web was doing anyway | The 2000 dissertation as *derived constraints* · the author's own later "that screams RPC" complaint as the payoff | 2000. **This chapter owns this material for the whole book** |

## 13 — The Second Language Explosion · 1991–2014 · `cluster-7`

**Assumes:** Chapter 3 (languages specialise), Chapter 11 (client and server), Chapter 12 (the browser).
**Opens on:** the same pressure as Chapter 3, on a far larger world.
**Closes on:** the map — the most reused page in the stage. Handoff: Chapter 14 — these languages were building something with more than two tiers.
**Do not** rank languages, and do not let a popularity figure imply quality. The dossier carries the measurement caveat.

| Lesson | The one idea it must land | Anchors it may use | Stops at |
|---|---|---|---|
| 1. A language for the browser | One language got a monopoly by being the only one the browser could run | JavaScript, 1995 · **"ten days" describes the prototype, not the language** | The browser |
| 2. Languages for the server | Several general-purpose languages, each built for a different frustration | Python, 1991 · Java, 1995 · PHP and Ruby, 1995 · C#, 2000 · Go, 2009 — one sentence each on the problem it was built for | Server side |
| 3. Languages close to the metal | Some work needs control that costs safety — and one language tried to give both | C++ · Rust, 2010, with the published memory-safety proportions from large codebases | Systems work |
| 4. Languages for phones | Two platforms, two languages, bound by the platform rather than the problem | Swift, 2014 · Kotlin | Mobile |
| 5. The map — which language for which job | A reader should be able to name the job before naming the language | A table by role: browser · server · systems · data (SQL as a **category**, its history owned by Chapter 6) · mobile | Naming jobs. **This is the page Stage 1 leans on** |

## 14 — Systems Grow Layers · 1990–2009 · `cluster-6`

**Assumes:** Chapter 11's two tiers, Chapter 6's databases, Chapter 13's languages.
**Opens on:** two tiers break the moment a business rule changes.
**Closes on:** an industry declaring its own idea dead. Handoff: Chapter 15 — while this collapsed, the machines themselves moved out of sight.

| Lesson | The one idea it must land | Anchors it may use | Stops at |
|---|---|---|---|
| 1. Splitting the server itself | Rules living on every machine mean every rule change is a mass redeploy | The fat-client problem · the 1992 business system whose "3" *is* the three-tier design · the vendor's later "we invented it" claim — **teach as a claim** | Three tiers |
| 2. The machine in the middle | A whole product category appeared to hold the logic layer — then got bought | Application servers, 1995–96, all acquired by 1998 · the enterprise Java platform, 1999 · its Microsoft counterpart, 2002 · the browser arriving as a free universal front | The category |
| 3. Everything becomes a service | Make every piece talk to every other through a strict published contract | The 1991–96 object standards · the 2000–01 message formats · the name arriving from an analyst firm in 1996, **before the tooling existed** | The ambition |
| 4. Why it collapsed under its own paperwork | The contracts cost more than the coupling they removed | Heavy specifications · the re-centralised bus and its "spaghetti box" nickname · the January 2009 "SOA is dead" post, which conceded the offspring survived | 2009. The lighter alternative is **referenced, not re-taught** — Chapter 12 owns it |

## 15 — The Machine You Never See · 1995–2012 · `cluster-4` + `cluster-6`

**Assumes:** Chapter 8's shell and passwords, Chapter 9's networks, Chapter 6's databases, Chapter 11's servers.
**Opens on:** the server stops being a machine in your building.
**Closes on:** three things you can now rent — computing, storage, identity. Handoff: Chapter 16 — renting by the hour changes what is worth building.

| Lesson | The one idea it must land | Anchors it may use | Stops at |
|---|---|---|---|
| 1. Typing into a machine you'll never touch | Chapter 5's terminal comes back, and this time the far end really is elsewhere | Secure remote shells, 1995 and 1999 · headless servers with no screen or keyboard | Access |
| 2. Renting a computer by the hour | Infrastructure stops being property and becomes something you call | Storage and compute services launched in 2006 · paying for an hour instead of a building | The model |
| 3. Data at web scale | A different trade, not a replacement — give up some guarantees to serve the whole world | The 2006–07 papers behind the shift · the name revived at a 2009 meetup · the three-way trade told honestly, **including its author's own 2012 correction** · the 2005 "one size fits all" argument and the 2012 system that answered it | The trade-off |
| 4. Logging in without a new password | Proving who you are stopped being one machine's business | The 1999 hashing design with a cost dial meant to be turned up · the delegated-login standard, 2006 to 2012, and its lead author's resignation as the standards-politics beat · the 2015 competition winner | The origin story. **Current guidance is Stage 1's, not this chapter's** |

## 16 — Many Small Pieces · 2013–2023 · `cluster-6`

**Assumes:** Chapter 14's services, Chapter 15's rented machines.
**Opens on:** if a machine is rented by the hour, why ship one big program at all?
**Closes on:** an honest ledger, in both directions. Handoff: Chapter 17 — what all of this left on your own machine.

| Lesson | The one idea it must land | Anchors it may use | Stops at |
|---|---|---|---|
| 1. Shipping a program in a box | Package the program with everything it needs, and it runs the same anywhere | The long lineage from 1979 through 2008 · the 2013 demo that made it ordinary · the scheduler that followed in 2014–15 | The mechanism |
| 2. Breaking one system into many | The practice existed for years before it had a name — same pattern as the Web's | A 2008 outage that triggered one company's move · "you build it, you run it," 2006 · the naming arc: discussed 2011, named 2012, written up 2014, **with the authors' own "we do not claim novelty"** | The practice |
| 3. The walk-back | Grown-up engineering includes publishing what you undid | The 2015 "monolith first" argument and its respectful 2015 counter-case · the 2018 report of 140-plus services collapsed back to one, costs conceded · the 2020 project that consolidated its own microservices into a single binary · **do not cite the 2023 streaming-service reversal — owned elsewhere for a different point** | Judgement, not a verdict |

## 17 — The Toolbox You'll Actually Open · 2006–2022 · `cluster-4`

**Assumes:** Chapters 5, 8, 10 and 16.
**Opens on:** every thread so far ends on the machine in front of the reader.
**Closes on:** a reader who can name what is on their own screen. Handoff: Chapter 18 — and then something started typing back.

| Lesson | The one idea it must land | Anchors it may use | Stops at |
|---|---|---|---|
| 1. The modern editor grows up | Chapter 10's box became a workshop that everything else plugs into | The major editors and IDEs through 2015 · the Windows console feature from 2018 that a modern editor needed to work properly | **Before AI features** — those are Chapter 19 |
| 2. Six command lines, six different things | These are six different things that look alike, and knowing which is which prevents a year of confusion | The 1993 Windows command prompt, built for MS-DOS compatibility · PowerShell — 2002 manifesto, 2006 release, cross-platform from 2018 — **pipes objects, not text** · Git Bash from 2007, an emulation layer · the Linux subsystem, 2016, and its real-kernel successor, 2019 · Windows Terminal, 2019–20, default from Windows 11 — **a window, not a shell** · the phrasebook-versus-moving-country analogy | The table |
| 3. What's actually on your machine right now | The command existing is not the same as the tool existing | The verified first-hand check in the dossier: an older PowerShell present with no newer one · a subsystem command present that reports nothing installed · an emulation layer with `ls` and `vim` but no package manager and no `ed` | Orientation |

## 18 — AI, the Long Road · 1956–2017 · `cluster-5`

**Assumes:** everything before it.
**Opens on:** an explicit dated anchor — this story started while Chapter 2's programmers were still feeding cards. **The one rewind in the stage; name it in the first paragraph.**
**Closes on:** 2017. Handoff: Chapter 19.
**Do not** tell the tidy single "AI winter" story. The correction is the point.

| Lesson | The one idea it must land | Anchors it may use | Stops at |
|---|---|---|---|
| 1. The bet | It began as a proposal and a promise, not a demonstration | The 1956 summer project and its claim about what a summer could achieve | The claim |
| 2. The first over-trust | People confided in a program they knew was a program — **the historical root of the over-trust this whole book is about** | The perceptron · the 1966 conversation program and the reaction to it | The pattern |
| 3. Promises outrun delivery | Funding follows claims, and withdraws from them | The two critical reports · what was actually withdrawn, and where work continued — **there was no single clean winter** | The correction |
| 4. Sold and shelved | Hand-written rules built a real industry that could not scale | 1980s expert systems: narrow, commercial, collapsed | Why rules did not scale |
| 5. The turn | Two decades of being famous but professionally irrelevant, then one result changed the direction | 1997 through 2012 · the 2012 image-recognition result as the hinge | The hinge |
| 6. The idea behind today's AI | The 2017 idea, told with its real limits intact | The architecture that made current systems possible · **it did not invent attention and did not solve long sequences** | 2017. **No product names** |

## 19 — AI Starts Writing Code · 2021–2025 · `cluster-4` + `cluster-5`

**Assumes:** Chapter 17's tools, Chapter 18's history, Chapter 13's languages, Chapters 11/14/16's architecture.
**Opens on:** Chapter 17's two surfaces, three years apart.
**Closes on:** the question the whole book exists to answer — how do you check work you did not do? Handoff: Chapter 20.
Carries an explicit **"as of writing"** date marker; this is the fastest-moving material in the stage.

| Lesson | The one idea it must land | Anchors it may use | Stops at |
|---|---|---|---|
| 1. AI in the editor | It arrived first where the work was already text, and the thing you check is a readable difference | The 2021 editor extension · the 2023 editor fork built around it | The editor |
| 2. AI in the terminal | It arrived second where the work is action, and the thing you check is a command and its consequences | CLI agents, 2025 · the same-day coincidence of 24 February 2025 · the late-2025 product shipping chat, editor, command line and toolkit as one | The surface |
| 3. What changed about who checks the work | The two surfaces demand genuinely different reading — a diff you can read, against an action you must judge before it runs | The contrast itself, stated plainly | The question. **The answer is Chapter 20** |

## 20 — Spec-Driven Engineering · destination · `cluster-5`

**Assumes:** all nineteen chapters.
**Opens on:** a reader now holding the whole map.
**Closes on:** Stage 1.

| Lesson | The one idea it must land | Anchors it may use | Stops at |
|---|---|---|---|
| 1. The loop | Write down what you want clearly enough that a person *and* a machine can check it | The two extremes · Development against Engineering · specification poverty | The practice |
| 2. A spec you can check code against | A specification stops being a wish when it becomes something checkable | Hoare, October 1969 · **his own caveat that verification cannot protect you from a wrong specification** | The first root |
| 3. Boundaries that make someone else's code readable | The same 1972 paper as Chapter 7, asked a different question: not where to cut, but why the cut makes another party's code comprehensible | Parnas, December 1972 — **the December paper only** | The second root |
| 4. Reading and understanding literacy | Judging code you did not write is the actual skill this stage was building toward | **This lesson owns "the editor as a reading instrument"** | Hands to Stage 1's `core-programming` |

---

## Boundaries — do not teach these twice

| Subject | Owner | Everyone else |
|---|---|---|
| REST | Chapter 12 | May reference, never re-derive |
| "The editor as a reading instrument" | Chapter 20 | Chapter 17 may gesture at it only |
| Unix's first three programs | Chapter 8 | Hands the shell and the line editor to Chapters 5 and 8 |
| The first computer keyboard | Chapter 5 | Chapter 4 references, does not narrate |
| The personal computer as a *machine* | Chapter 10 | Chapter 5 owns the *interface* story |
| Client/server as *architecture* | Chapter 11 | Chapter 9 owns the *network* underneath it |
| SQL's *history* | Chapter 6 | Chapter 13 uses SQL only as a language *category* |
| Parnas December 1972 | Chapters 7 and 20 | Two different questions of one paper — neither may pre-empt the other |

**Already cited elsewhere in this book — do not re-derive, only avoid contradicting:** Saltzer & Schroeder 1975, Fielding 2000, OWASP's current password guidance, Chrome UX Report, Upstash, and the 2023 streaming-service monolith reversal. The last is deliberately excluded from Chapter 16's walk-back lesson, which uses better-documented reversals instead.

## Settled facts that drafting must not re-litigate

- **First network email: 1971.** The 1972 date reflects wider adoption of the `user@host` convention, not the first send.
- **ARPA became DARPA in 1972**, not 1971.
- **`ed`'s year stays soft — "circa 1969–1971."** Sources genuinely disagree; forcing one year is false precision.
- **"The network is the computer" is John Gage, 1984** — not McNealy.
- **"Ten days" describes the JavaScript prototype**, not the finished language.
- **Three different Parnas papers exist and must never be conflated.** Only "On the Criteria To Be Used in Decomposing Systems into Modules," *CACM* 15(12), **December 1972**, may be cited as "Parnas 1972." The May 1972 module-specification paper and the 1976 program-families paper are unused here.
- **Hoare, "An Axiomatic Basis for Computer Programming,"** *CACM* 12(10), October 1969 — gets a new `evidence-ledger.yaml` entry when Chapter 20 drafts.
- **Backus–Naur Form is a misattribution trap**; cluster 7 flags the correct account.
- Each dossier carries a **disputed items** section — cluster 6 lists ten or more, cluster 7 lists twenty-three. Check it before asserting any date in prose.

## Ledger work, per chapter

Entries are added when a chapter actually drafts and cites a source — never speculatively ahead of it. On finishing a chapter: append to `evidence-ledger.yaml`, update the other three ledgers, flip `chapter_state` only after the gate passes, then add the changelog entry.
