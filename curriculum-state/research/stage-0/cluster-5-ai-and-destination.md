---
cluster: 5 of 5
window: 1956-present (AI thread) + this book's own destination chapters (SDE, Reading & Understanding Literacy)
researched: 2026-09-16
model: deepseek/deepseek-v4.1-flash via Command Code, --effort high
status: research and structure recommendation only — non-binding, no lesson prose, no chapter files, no prerequisite-graph.yaml rows
note: this pass decomposed itself into 9 parallel sub-agent research threads (AI history 1956-2017, Transformer paper, AI coding agent surge, AI editor turn dates, agent definitions/adoption, Hoare 1969, Parnas 1972, beginner teaching standards) — real work, not a malfunction; ~30 minutes, ~3M input tokens, completed successfully
---

# Cluster 5 — The AI thread and the destination

## PART ONE — findings

### Dartmouth, 1956
McCarthy, Minsky, Rochester, Shannon. Proposal **headed 31 Aug 1955**; a two-month, ten-person study at Dartmouth in summer 1956. Its founding wager, in its own words: that **every aspect of learning or any other feature of intelligence can in principle be described precisely enough that a machine can be made to simulate it.** "Artificial intelligence" as a field name traces to this document; McCarthy is credited with coining it. It actually ran ~six weeks (Solomonoff's notes suggest ~18 Jun-17 Aug 1956); attendance is unsettled (planned 10, ~20 named as present, daily sessions 3-8). **No report was ever produced** — McCarthy's own appended note says so. The document is a bet, not a demonstration: it predicted only that "a significant advance" might be made.
Proposal: http://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html · Solomonoff, IEEE Spectrum 2023: https://spectrum.ieee.org/dartmouth-ai-workshop

### The beats that make "quiet side-thread" earned rather than asserted
- **1957-60, the first overreach.** Rosenblatt's perceptron; Mark I assembled Dec 1959, shown 23 Jun 1960. In **July 1958** the NYT reported the Navy unveiling an "embryo" computer expected to walk, talk, see and reproduce itself.
- **1966, ELIZA — the single best hook in this cluster.** Weizenbaum's keyword-matching DOCTOR script had **no understanding whatsoever**; users (including his own secretary) attributed real comprehension to it and asked to be left alone with it. He wrote that very short exposure to a simple program could induce powerful delusional thinking in ordinary people. The **"ELIZA effect"** was named by Hofstadter (1995). *This is the 1966 ancestor of "the agent finished, so it's done."* CACM 9(1), Jan 1966: https://dl.acm.org/doi/10.1145/365153.365168
- **1966/1973, the money pulls back.** ALPAC (Pierce, 1966) found no machine translation of general scientific text and none in prospect. Lighthill (1973) found AI had not delivered and named combinatorial explosion as the barrier. **But** Haigh, *"There Was No 'First AI Winter'"*, **CACM 66(12), Dec 2023, pp. 35-39, DOI 10.1145/3625833**, shows SIGART membership *grew* across 1973-78 and "artificial intelligence" usage *rose* through the 1970s — the pain was concentrated in elite DARPA-funded labs. Haigh dates the real winter to the 1980s expert-systems bubble. **Don't teach "AI died twice."**
- **1969, the misremembered book.** *Perceptrons* proved a *single-layer* limit (parity), not a multi-layer one; Minsky and Papert knew multilayer nets worked, and Rosenblatt had already shown a hidden layer solves any classification problem.
- **1980s, sold then collapsed.** XCON/R1 (McDermott, CMU, 1978) configured DEC VAX systems, ~80,000 orders at 95-98% accuracy by 1986, ~$25-40m/year saved — real, and narrow. Japan's Fifth Generation (~¥57bn, 1982-~1992-94) failed commercially. Symbolics (founded 9 Apr 1980) dominated LISP machines until general-purpose workstations wiped the market ~1987.
- **1986, the method arrives and waits.** Rumelhart, Hinton & Williams, *Nature* **323**, 533-536, 9 Oct 1986. Antecedents verified: Linnainmaa 1970, Werbos 1974.
- **1997 / 2011 — famous publicly, irrelevant professionally.** Deep Blue beat Kasparov 3½-2½, 3-11 May 1997, on ~200m positions/second — brute-force search, no learning. Watson (aired 14-16 Feb 2011) used **no deep neural networks**. Neither put anything in a working developer's hands. That sentence is far stronger than "nothing happened."
- **2012, the hinge.** AlexNet (30 Sep 2012) hit **15.3% top-5 error**, beating the runner-up by >10.8 points, trained on **two Nvidia GTX 580 gaming GPUs**.

**The mechanism that ties the whole book together:** the AI thread was dormant because two of its three ingredients didn't exist. The method arrived in **1986** and sat unused; the data arrived with the **Web**; the arithmetic arrived from **chips built for video games** — which trace straight back to the transistor Stage 0 opens with. AI isn't a parallel story that eventually joins the main one; it's a thread **waiting on the hardware thread**, and 2012-17 is where the wait ends.

### The 2017 Transformer
Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, Polosukhin; **arXiv 12 Jun 2017**, **NIPS 2017**. It removed recurrence **and** convolution, connecting all positions with a **constant number of sequential operations** (O(1) vs O(n) path length). Numbers: **8 P100 GPUs**, base ~65m params / 100k steps / **~12 hours**; big ~213m / 300k steps / 3.5 days; WMT14 EN→DE **27.3 / 28.4 BLEU**, >2.0 better than the prior best *including ensembles*; EN→FR 38.1 / 41.0 at <¼ the training cost. Positional encoding exists because order had to be bolted back on by hand once recurrence was gone — the clearest way to show a beginner what was removed.

**Four honest caveats most secondary sources drop:** the title oversells its own contents (feed-forward layers, residuals, layer norm are all still there — the claim is only about recurrence and convolution); it did **not** invent attention; it did **not** solve long sequences (O(n²)), sequential generation, or interpretability; and any multimodal claim was future work. Also: **EN→FR is 41.0 in the NIPS proceedings and 41.8 in arXiv v7**, and the NeurIPS *metadata* abstract matches neither — cite one version.

NeurIPS PDF: https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf

### The surge — three threads meeting, with the honest stagger
- **Editor thread meets AI: June 2021.** Copilot preview **29 Jun 2021**, GA **21 Jun 2022**; agent mode preview **24 Feb 2025**, all VS Code users April 2025.
- **Terminal thread meets AI: 2025.** Claude Code research preview **24 Feb 2025**, GA 22 May 2025; Codex CLI 16 Apr 2025; Gemini CLI 25 Jun 2025 → folded into closed Antigravity CLI (announced 19 May 2026, individuals cut off 18 Jun 2026).
- **AI-first editors:** Windsurf Editor **Nov 2024** ("the first agentic IDE"), Google Antigravity **20 Nov 2025**.
- **The date to build a paragraph on: 24 Feb 2025** — GitHub shipped agent mode in the editor and Anthropic shipped Claude Code preview in the terminal *on the same day*.

**What separates an agent from autocomplete, in the industry's own words:** all three of Anthropic, OpenAI and GitHub/Microsoft converge on **tools** (read/edit files, run commands) + a **loop** (act, read the result, iterate) + **delegated autonomy over steps**. That triple, not "AI," is the definition — and it is exactly the boundary the destination's safety floor rests on.

**Adoption, with the counter-evidence kept.** DORA 2024: −1.5% throughput, −7.2% stability; DORA 2025: adoption flips positive, **stability stays negative**. Stack Overflow 2025: 84% use/plan; trust is **internally inconsistent in their own materials** (33% on the survey page vs 29% in their summary). METR's 19% slowdown (Jul 2025) has **not** been retracted; the 24 Feb 2026 follow-up is, in METR's own words, "only very weak evidence," not a reversal. Sceptics worth one line each: "AI Agents That Matter" (2407.01502), "The SWE-Bench Illusion" (2506.12286), GitClear 2025.

## PART TWO — the destination

### Hoare 1969
**CACM 12(10), Oct 1969, pp. 576-580, DOI 10.1145/363235.363259**, written at Queen's Belfast. Establishes the triple — a written **precondition**, a command, a **postcondition** — with rules for assignment, composition and `while` (via loop invariant). What it proves is **partial correctness**: *if* the program terminates, the results satisfy the stated condition; Hoare explicitly gives no basis for proving termination.

**Floyd credit is mandatory.** Floyd, *"Assigning meanings to programs"*, Proc. Symposia in Applied Mathematics vol. 19 (1967), pp. 19-32, has priority for the method, and **Hoare said so himself** — he found a preprint of Floyd's paper while unpacking in Belfast in Oct 1968 and saw "at last" a way to achieve his hopes. Floyd is ref. [8] in the 1969 paper.

**Hoare's own caveats, and the one that carries this chapter:** in "How did software get so reliable without proof?" (FME '96) he writes that formal methods and proof play a small direct role in large-scale programming; in his 2009 CACM retrospective he says his basic mistake was setting proof up in opposition to testing, and that **verification cannot protect against errors in the specification itself.** That sentence — from the man who made specifications checkable — is the historical warrant for canon's "a spec you cannot verify against is over-trust wearing a different name." (The popular "no reliable way to find the last bug" quote: **not found in any Hoare source — do not use it.**)

### Parnas 1972
**CACM 15(12), Dec 1972, pp. 1053-1058, DOI 10.1145/361598.361623**; received Aug 1971.

**A correction to the original brief's framing.** The paper's stated motivation is **not** the pain of repairing large systems. It's narrower and more interesting: existing writing describes modularisation's *benefits* but says **nothing about the criteria for where the boundaries go**, and the paper sets out to discuss exactly that. Its listed benefits are shortened development time, flexibility, and comprehensibility. The KWIC index is deliberately trivial ("a week or two") and is treated *as if* large — which is why it works as a teaching example. It compares the conventional flowchart decomposition against one where modules hide design decisions, on three criteria: independent development, comprehensibility, and **efficiency — where the hidden-information version can be *less* efficient**, so it does not claim the approach is free.

**What it does not claim:** not that this is the only valid criterion; and **not that a module is a file or compilation unit** — it says a module is "a responsibility assignment rather than a sub-program."

**Two Parnas 1972 papers, not one.** The December *criteria* paper is the one above; the May 1972 *"A Technique for Software Module Specification with Examples"* (CACM 15(5), pp. 330-336) is the one about specifying a module from outside. "Parnas 1972 established X" has to say which. Also: **"On the Design and Development of Program Families" is 1976** (*IEEE TSE* SE-2(1):1-9), not 1972 or 1985 — this corrects an error in this project's own earlier brief. Companions: IFIP 1971 (information distribution) and *IEEE TSE* SE-5(2), 1979, pp. 128-138 (extension and contraction, the "uses" relation).

### Teaching the two roots to someone who cannot yet program
**A real gap in the literature.** MIT 6.031, CMU 17-313 and Berkeley CS169A all teach exactly this — and **all assume a working programmer.** No well-regarded course was found teaching preconditions/postconditions or information hiding to genuine non-programmers. That gap is Stage 0's opening.

**Borrow 6.031's reasoning, not its content:** its specifications reading starts with a find-in-array function and, *before any spec exists*, asks whether a faster version is "behaviourally equivalent" — the exercise exists to make the student **want** a written spec. Its framing is that a spec is a **contract and a firewall** (a client uses a module without reading it; a break at an interface is attributable). **Start from a case where the reader cannot tell whether two things are the same, and let the need for writing it down arise from that.**

- **Hoare, without the words.** Two written states. A balance of 40, a refund of 20, and the rule that afterwards it holds exactly 60. Both numbers are written, so the check is mechanical and the argument ends. Hoare's move was to make that pair a formal object with rules to chain it through a program. **The finish line is not the formalism — it's the realisation that "correct" has no definition until the target was written down first.** Then Hoare's own caveat lands: it is possible to write down the wrong pair.
- **Parnas, without the words.** Two things that do the same job from the outside but are built completely differently, where you cannot tell which you're using. Whoever built it decided what you were allowed to know, and *that* decision — not the order of the work — is what makes one version replaceable and the other not. **The finish line is not "hide your data" — it's "choose your walls by what you want to keep being able to change."**
- **Why the two are paired, for AI specifically:** with a colleague you can ask what they meant. With an agent there is nothing to ask — the artifact is all there is. Then the **boundary is the only surface actually reviewable**, because the insides are the part nobody can hold in their head. **Parnas says where to look; Hoare says what "right" means once you're looking.** Neither is sufficient, which is why canon says two roots.

## Teaching-standards synthesis (what the strong sources do that an encyclopedia doesn't)

Studied: Petzold's *Code*, Crash Course CS + Crash Course AI, Nand2Tetris, Isaacson's *The Innovators*, CS50/CS50.ai, two university history-of-computing courses.

1. **The common first move for a total beginner is a human problem, then the on/off idea — never a date.** Petzold opens on two children in opposite houses needing to talk after lights-out; the flashlight becomes the channel. Every later substitution (relay, tube, transistor) is a change of *medium* for an idea already held.
2. **Teaching sources sequence by dependency; encyclopedias sequence by date.** Wikipedia/CHM optimise for coverage and verifiability, which forces inclusion (abacus, Antikythera, priority disputes). Teaching sources optimise for comprehension, which forces **exclusion** — Petzold omits networking entirely, Nand2Tetris omits all history. Stage 0 wants chronology *and* beginner comprehension, so the spine must be a **small chosen set of dated turning points**, pruned hard.
3. **Make the reader need the concept before naming it.** 6.031, Petzold, Nand2Tetris all do this.
4. **Where they break chronology, they say so or make the break structural** (Crash Course: mechanics before history; Isaacson: thematic chapters with a recurring question).
5. **No verified source runs computing history and AI history as co-equal interleaved tracks.** Isaacson uses AI as a bookend, largely absent from the middle; Waldrop anchors both to one protagonist; *The Machine That Changed the World* gives AI a dedicated episode; Crash Course puts AI at episodes 34-37 as "now." **Stage 0's named side-thread has no model to copy — that's a strength.**
6. **Every beginner AI history teaches concepts, not dependencies.** None teaches that AI was dormant because the compute hadn't arrived. That's the gap.
7. **Transformer explainers teach by picture and one running example** — Alammar (written 27 Jun 2018) opens on the model as a black box and uses one sentence where a pronoun has two referents. Teach the *problem attention solves* before the mechanism. That pronoun sentence is Alammar's — Stage 0 needs its own instance of the shape.

## Story and analogy hooks

1. Two children and a flashlight (Petzold's *reasoning*, not his scene).
2. **ELIZA, 1966** — the ancestor of over-trust.
3. **24 Feb 2025** — editor and terminal met agentic AI the same day.
4. The rulebook nobody used for twenty years (backprop, 1986).
5. **Games built the thing that made AI work** (two gaming GPUs → eight datacentre chips).
6. The unwritten order to a builder *(original to this pass)*.
7. **Opening balance and closing balance** — two written numbers make "correct" checkable, and Hoare's caveat is that you can write the wrong pair *(original to this pass)*.
8. **The plug and the socket** — you never inspect the wiring before plugging in a lamp; that safety is a *chosen* boundary *(original to this pass)*.
9. The menu and the kitchen — if the kitchen can't change a recipe without reprinting the menu, the wall was drawn wrong *(original to this pass)*.
10. A spec as a contract (6.031's analogy, verified).
11. Replit, July 2025 — the agent that deleted a live database during a freeze.

## Structural recommendation

**Two chapters; the destination carries three Lessons.**

**Chapter A — "AI Before LLMs" (1956 → 2017).** Opens by *naming* the out-of-order placement. Six beats: (1) Dartmouth 1956 — a ten-week bet, no report; (2) 1957-66 — the perceptron headlines and ELIZA; (3) 1966-74 — ALPAC and Lighthill told honestly, with Haigh's correction named as the popular story being wrong; (4) the 1980s — sold, narrow, collapsed; (5) **1997-2012 — famous but irrelevant, then AlexNet as the hinge** (the whole chapter rests here); (6) 2016-17 — AlphaGo then the Transformer, with all four caveats. **Decide against** a winters history, cybernetics, and per-year chronology.

**Chapter B — "The AI-Coding-Agent Surge."** Two hinges, not one: **Nov 2022** (the general-purpose moment) and **2025** (the moment it acts). Include the 24 Feb 2025 coincidence. Say plainly that **the editor thread got there first (2021)** — it explains why "AI in your editor" feels older, and makes the preceding terminals→editors order pay off. Carry an "as of writing" marker with a date; the Gemini CLI → Antigravity reversal is the worked example of why that's not decoration.

**The destination chapter — three Lessons.** Canon already settled no separate chapter for the literacy, and that stands. But the brief's own test ("how much real teaching content each side needs") is answered by the content: **Hoare and Parnas are two papers making two different halves of one capability**, and fusing both into one Lesson is exactly the "too long or mixed" trigger. So: (1) **SDE** — loop, two extremes, Development vs Engineering, SDD vs SDE, specification poverty, the three review questions; (2) **the first root** — a spec code can be checked against; (3) **the second root** — boundaries that make another party's code readable. A fourth "where the two meet" Lesson is tempting and should be resisted: it duplicates Lesson 1's verify stage. Let it earn its place at drafting time.

**Panaversity:** verified — AI Assisted → AI Driven → AI Native is real, live at `ai-native.panaversity.org`, implemented as a three-card spectrum. **One caution:** the same homepage carries a **separate five-level organisational maturity model**. Don't conflate them; the three-tier spectrum is about an individual's way of working.

## Concurrency and boundary flags

1. **The AI thread starts *inside* another chapter's window.** Dartmouth 1956 lands concurrently with the language ladder (1947 transistor → 1950s high-level languages), and precedes the IC, Unix, the Internet, the Web, REST, and all of Phase B. **"The AI thread predates almost everything" is true; "everything" is false.** The chapter needs a dated anchor opening or the reader will think the book lost the plot.
2. **Hoare and Parnas are double-used across two clusters.** The methodology chapter also owns 1968-72, and Parnas is *already* used by Stage 1's s1-01. That's three Parnas uses and one new Hoare use. State the four questions explicitly: methodology asks *how should software be built?*; the destination's Hoare use asks *what makes "correct" checkable at all?*; its Parnas use asks *what makes another party's code comprehensible?*; s1-01 asks *where did information hiding originate?* Genuinely different — but they must be **written into the ledger**, and **Hoare 1969 needs a new entry** (it isn't there yet). Also record *which* Parnas 1972 each use means (see the two-papers note above).
3. **The terminals chapter and the surge chapter currently collide** — the existing sketch has terminals landing on "today's CLI coding agents," which is also the surge's landing beat. Recommend: terminals ends on the *fact* that agents run there; the surge owns the *explanation* and the convergence. Owner decision, not a drafting-time guess.
4. **The convergence is genuinely staggered** (2021 editors, 2025 terminals). Say so; staggered is more accurate and more interesting.
5. **Callbacks the payoff needs:** the transistor/IC (AI waited on hardware); the methodology era (Hoare and Parnas are its output, and this chapter is where the reader uses them); terminals (where the agent runs, and scope); editors (the diff, accept-or-reject); the opening chapter's literalism (a machine cannot ask what you meant).
6. **Don't contradict existing canonical definitions** — the concept ledger already ships canonical wording for *Spec-Driven Engineering*, *specification poverty*, *specify-design-implement-verify*, *agent*, *diff*, *blast radius* and more. Reuse or deliberately supersede; don't invent rivals.

## Uncertainties not papered over

Dartmouth's exact proposal date and any attendance figure · the Hoare "last bug" quote (unfound — don't use) · Hoare page range 576-580 vs 576-583 and Floyd 19-31 vs 19-32 · Parnas 1971 IFIP pages rest on an aggregator · **Stack Overflow's trust figure is inconsistent in its own materials** (33% vs 29%, prior year 40% vs 43%) · Fifth Generation cost/end date · **Cursor's founding, first release and VS Code-fork status are secondary-only** (its verifiable figure is the Jun 2025 $500m+ ARR) · Replit/Bolt/Lovable exact days · DORA's figures are correlational, not causal (DORA says so) · METR's follow-up is weak evidence, not a reversal.

**What every studied source missed** (worth a dedicated comparison-transformation pass later): no parallel dated AI track; no "AI was dormant because the compute hadn't arrived"; no AI-as-dependency-on-hardware; no ELIZA as the explanation of present-day over-trust; and no teaching of preconditions or information hiding to non-programmers.
