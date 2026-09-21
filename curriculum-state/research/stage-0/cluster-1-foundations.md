---
cluster: 1 of 5
window: earliest ideas -> ~1957
researched: 2026-09-16
model: deepseek/deepseek-v4.1-flash via Command Code, --effort high
status: research and structure recommendation only — non-binding, no lesson prose, no chapter files, no prerequisite-graph.yaml rows
---

# Cluster 1 — Foundations: Binary, Transistors, and the Language Ladder

## 1. Key verified facts, names, dates, sources

- **Binary predates Leibniz.** Binary was independently worked out at least three times in the 17th century: Thomas Harriot (~1600), Juan Caramuel y Lobkowitz (*Mathesis biceps*, 1670 — probably the first *published* European treatment), and Leibniz (c. 1677–79). A 2017 *Science and Engineering Ethics* paper alleges Leibniz plagiarized Caramuel. **Flag:** "Leibniz invented binary" is an oversimplification; he systematized and popularized it.
- **Leibniz, *De Progressione Dyadica*** (manuscript dated 15 March 1679 by Leibniz himself); published as *Explication de l'Arithmétique Binaire* in the Paris Académie's **1703** Mémoires, pp. 85–89 (some bibliographies give 1705 for the volume's actual printing). Links binary to the *I Ching* via Bouvet's 1701 letter.
- **Boole:** *The Mathematical Analysis of Logic* (1847) and *An Investigation of the Laws of Thought* (1854). Britannica notes the **1847** work had the deeper impact on contemporaries — not the 1854 one usually cited.
- **Tukey coined "bit"** in a Bell Labs memo dated **9 January 1947**; Shannon put it in print in 1948 *crediting Tukey by name*. **Flag:** Vannevar Bush used "bits of information" in **1936** in a different sense (punched-card holes) — not the same coinage.
- **Shannon's thesis:** "A Symbolic Analysis of Relay and Switching Circuits," submitted to MIT **10 August 1937** (he was 21; b. 30 April 1916), published 1938 in *Trans. AIEE* 57. Won the **1939 Alfred Noble Prize**. **Flag:** MIT's record lists the M.S. degree year as **1940** — thesis written 1937, degree awarded 1940. "Most important master's thesis of the 20th century" is popular attribution, not an award.
- **Transistor dates are two, both real:** **16 Dec 1947** = first successful amplifier (Brattain's notebook records voltage gain ~15); **23 Dec 1947** = demonstration to Bell Labs management. The commonly cited "invention" date is Dec 23; the existing chapter uses Dec 16, which is correct for first working device.
- **"Transistor" naming:** coined by **John R. Pierce**. In his own PBS interview he describes the device having *transresistance* (the dual of the vacuum tube's transconductance), fitting alongside existing device names like **varistor** and **thermistor**. **Flag:** the widely repeated "transfer + resistor" gloss is a simplification, not what Pierce said.
- **Transistor patent:** US 2,524,035, filed **17 June 1948**, granted **3 Oct 1950**, inventors Bardeen & Brattain. Shockley led the group and later invented the **junction transistor** (announced 1951) — the manufacturable one.
- **1956 Nobel Prize in Physics** to Shockley, Bardeen, Brattain: "for their researches on semiconductors and their discovery of the transistor effect" (nobelprize.org). Bardeen is the only person with two Physics Nobels (1956, 1972).
- **Buchholz coined "byte"** in an IBM memo in **1956** during IBM 7030 Stretch design — a deliberate respelling of *bite* so a typo couldn't turn it into *bit*. **Flag:** sources split between **June** and **July** 1956.
- **Tukey also coined "software"** — *The Teaching of Concrete Mathematics*, *American Mathematical Monthly*, vol. 65, **1958**. Same person named the smallest unit of information and everything that isn't hardware.
- **2003 Belgian election (18 May 2003, Schaerbeek):** candidate **Maria Vindevoghel** recorded exactly **4,096** (2^12) extra votes; caught only because her preferential votes exceeded her party's list total. Investigation concluded a **single-event upset**; the cosmic-ray mechanism was presented by Bhuva at AAAS 2017. **Flag:** the "spontaneous creation of a bit" phrase and the SEU conclusion are documented, but the cause remains a *finding*, not a proof — the existing chapter's hedge is correct.
- **ENIAC (1945):** programmed by **plugboards and switches**, not stored program; ~17,468 vacuum tubes; tube failure ~**one every two days** (Eckert, 1989 interview). **Flag:** the popular "a tube failed every few minutes" legend is false — the real problem was heat, power, and scale.
- **Six ENIAC programmers:** Kay McNulty, Betty Jennings (Bartik), Betty Snyder (Holberton), Marlyn Wescoff, Fran Bilas, Ruth Lichterman.
- **von Neumann's *First Draft of a Report on the EDVAC*** — written by von Neumann, distributed **30 June 1945** by Herman Goldstine; bore **von Neumann's name alone**; its open circulation helped void Eckert & Mauchly's patent. Real, documented credit erasure.
- **Manchester Baby (SSEM)** ran its first program **21 June 1948** — 17 instructions by **Tom Kilburn**, finding the highest factor of a number (Williams, Kilburn, Tootill). First electronic stored-program computer.
- **EDSAC "Initial Orders"** written by **David Wheeler, May 1949** — the first assembler-like system, letting EDSAC be programmed symbolically (Royal Society *Proc.* 202(1071):573).
- **Kathleen Booth, *Coding for A.R.C.* (1947)**, Birkbeck — first assembly language. **Nat Rochester** wrote symbolic assembly for the IBM 701 (**1953–54**).
- **Ladder's rungs overlap by a decade, not a sequence:** Short Code (Mauchly proposed **July 1949**, implemented by Schmitt, run 1950) → A-0 (Hopper, 1951–52; a **loader/linker** more than a modern compiler; "The Education of a Computer," ACM, May 1952) → Speedcoding (Backus, 1953) → **FORTRAN delivered April 1957** (Backus proposed Dec 1953 for the IBM 704; Turing Award 1977). **Plankalkül** (Zuse, designed 1942–45) was never run on his machines; first implemented **1998/2000** at the Free University of Berlin.
- **Boundary items (belong to cluster 2, not this one):** COBOL (CODASYL committee first met **8 April 1959**; specifications Dec 1959; published **April 1960**), LISP (McCarthy 1958; paper CACM April 1960), ASCII (ASA X3.4-1963, subcommittee meeting since Oct 1960), the **8-bit byte** standardized by IBM System/360 (1964), Kilby's IC (1958).
- **Other credit disputes worth flagging:** first computer (Z3 1941 vs ABC 1939–42 vs ENIAC vs Colossus); first high-level language (depends on definition); the "bug" — a real moth in Harvard Mark II relay #70, **9 Sept 1947**, logbook note "first actual case of bug being found" (Smithsonian) — but the word *bug* predates it (Edison, 1878), so Hopper did not coin it.

## 2. ⭐ THE MOST IMPORTANT SECTION IN THIS FILE — read before §1

*(Added 2026-09-20.)* When `ch01` was drafted from this dossier, §1's 22 bullets
of precise dates became the drafting plan's Anchors column, and the teaching
methodology below was dropped. That is the single traceable point where this
stage went wrong. **The findings in this section outrank the facts in §1**: the
facts keep the chapter correct, this section decides whether anyone reads it.

## 2. How strong teaching sources sequence this

- **Petzold, *Code* (1999):** opens with **Braille and Morse** — codes the reader already knows — then telegraph → relays → gates → adders → CPU. Establishes "a code is an arbitrary agreement" *before* introducing binary, and builds every abstraction from one concrete object (the relay).
- **The shared move across all of them:** each new layer is introduced because the previous one **failed at something specific**. Problem first, solution second — never date first.
- **CS50 (Malan):** teaches representation *before* syntax, with a live physical demo (light bulbs/switches), then shows the *same* bit pattern read as a number, then a letter, then a pixel. The demonstration is the argument.
- **Nand2Tetris (Nisan & Schocken):** the abstraction ladder made literal — hardware → assembler → VM → compiler → OS. Each layer is a black box the next stands on. This is the best external precedent for the "language ladder" and supplies the right mental model: **a ladder of trust**, which maps onto the book's own verify-before-trust thesis.
- **Crash Course CS (2017):** separates the *history* episode from the *mechanism* episodes — history as on-ramp, mechanism as payload.

> **Flag, rewritten 2026-09-20.** This bullet used to say "this book's Stage 0
> deliberately inverts that (history *is* the spine), so only borrow the
> episode-level clarity, not the sequencing" — and that sentence was read as
> permission to build chapters out of dated events.
>
> **The two things are at different levels, and both are true.** Stage 0's
> *chapters* run in date order: that is the stage's structure and it stays.
> But *inside* a chapter the teaching is still **problem first, mechanism
> second, history as the thread that connects them** — exactly what this
> section's own research found ("Problem first, solution second — never date
> first"). Nothing about a chronological stage requires a chronological
> paragraph.
>
> So: borrow the sequencing too. `canon/corrections.md` §4 and §15.
- **Isaacson, *The Innovators* (2014):** history as people with problems; opens on Ada Lovelace (1843). Supports the story-first register. **Flag:** his "collaboration over lone genius" framing is itself a thesis, and popular computing histories are frequently imprecise on specifics.

## 3. Story and analogy hooks

- **Morse key + Braille:** two states on the wire, and a lookup table agreed in advance turns patterns into letters. Binary plus code, pre-computer — and the literal lineage of Shannon's relay thesis (telephone exchange relays).
- **The Jacquard loom (1801):** a punched card decides which thread lifts — the *program is a physical object*. Direct ancestor of Babbage's card-controlled Analytical Engine and Hollerith's 1890 census tabulator.
- **Lovelace's 1843 Bernoulli-numbers program** for a machine never built: the first instance of "software without hardware" — which is the book's own subject (spec before implementation).
- **ENIAC reprogrammed by physically re-plugging cables**, then the six women who did it erased from captions for decades — makes "storing the program" land *and* pays off the provenance theme. Pair with von Neumann's name alone on a team's report.
- **A light switch, not a dimmer** (mechanism) + **Morse/Braille** (meaning by agreement): the pair that avoids the two failure modes — treating 0/1 as magic digits, or thinking the meaning is a property of the bulb. The existing chapter's "two states survive noise, three don't" framing is genuinely strong and should be kept.
- **The pocket radio:** Regency TR-1, announced 18 Oct 1954, ~150,000 sold — the ordinary-person consequence that makes the transistor's significance land as against a room-sized ENIAC.

## 4. Structural recommendation

- **Four beats, not three.** The candidate breakdown omits the prehistory (Jacquard 1801 → Babbage 1837 → Lovelace 1843 → Hollerith 1890) and omits Turing 1936 / the stored-program concept. Since this is the *first* cluster and ordering is strictly chronological, both must live here: **(1) encoding instructions into a medium, (2) "two states are enough" — Boole, the relay, Shannon, (3) the physical switch's three generations — relay → vacuum tube → transistor, (4) the language ladder — machine code → stored program → assembly → high-level.**
- **Answer to "is the transistor the right single hardware beat": no, not alone.** Relays (Henry 1835; Zuse Z3, 1941, ~2,300–2,600 relays — sources differ; Harvard Mark I 1944) and vacuum tubes (de Forest's Audion, diode 1906 / triode 1908; ENIAC 1945) are required as the two limited predecessors. The transistor's real claim isn't speed — it's that it's solid-state (doesn't burn out), small, and mass-producible. Petzold's relay-first approach independently validates teaching the *switch* abstractly before the *device*.
- **The "ladder" is conceptual, not temporal — flag this explicitly.** Booth's assembly (1947), Short Code (1949), A-0 (1952), and FORTRAN (1957) overlap for a full decade. Assembly and high-level languages were **concurrent rungs**, not sequential ones. Say so structurally rather than forcing a false relay.
- **A second real concurrency block: 1945–48.** von Neumann's EDVAC draft (June 1945), the "bit" memo (Jan 1947), the transistor (Dec 1947), and Shannon's information theory (1948) all land within ~3 years. This is the same kind of multi-thread moment the book already acknowledges for 1958–74 and deserves the same treatment.
- **Concrete motivation for each rung (answers the brief's question):** *machine code* → the pain is absolute numeric addresses; change one line and every address shifts (EDSAC's Initial Orders solved exactly this). *Assembly* → still one line per machine operation and still tied to one specific machine. *High-level* → the argument was **economic, not aesthetic**: by the mid-1950s programmer cost exceeded computer cost (IBM's own FORTRAN framing); Backus called hand-coding "hand-to-hand combat with the machine." Hopper's separate argument was **reuse** (subroutines on tape, called by number) and machine-independence.
- **Clean boundary — end at ~1957 and hand off with a human sentence.** Terminal beat: FORTRAN, April 1957. Pivot sentence: Tukey needed a word for "everything that isn't hardware" in 1958, and the same year Kilby faced the "tyranny of numbers" — the hand-soldering problem that thousands of discrete transistors created. **Hand to cluster 2:** the IC (1958), COBOL (1959–60), ALGOL 58/60, LISP, ASCII (1963), the 8-bit byte on System/360 (1964). Do not consume any of it here.

## 5. Sources

- Leibniz/Caramuel/Harriot dispute: Casal & Lara, *Science and Engineering Ethics* (2017) — https://link.springer.com/article/10.1007/s11948-017-9890-6 ; CACM blog — https://cacm.acm.org/blogcacm/the-binary-system-was-created-long-before-leibniz/
- Leibniz *De Progressione Dyadica* (1679): https://eman-archives.org/philiumm/dyadica/de-progressione-dyadica
- Boole: https://www.britannica.com/topic/history-of-logic/Boole-and-De-Morgan
- Shannon thesis (1937/1938, Alfred Noble Prize 1939): https://en.wikipedia.org/wiki/A_Symbolic_Analysis_of_Relay_and_Switching_Circuits ; https://historyofinformation.com/detail.php?id=622
- "Bit" (Tukey memo, 9 Jan 1947): https://en.wikipedia.org/wiki/Bit
- "Byte" (Buchholz, 1956): https://www.computer.org/profiles/werner-buchholz ; https://en.wikipedia.org/wiki/Byte
- "Software" (Tukey, 1958): https://www.historyofinformation.com/detail.php?entryid=936
- Transistor dates & point-contact: https://www.computerhistory.org/siliconengine/invention-of-the-point-contact-transistor/ ; https://www.computerhistory.org/tdih/december/23/
- Transistor naming (Pierce, primary interview): https://www-tc.pbs.org/transistor/album1/pierce/naming.html
- Transistor patent US 2,524,035: https://patents.google.com/patent/US2524035A/en
- 1956 Nobel Prize: https://www.nobelprize.org/prizes/physics/1956/summary/
- Belgian 2003 bit-flip: https://en.wikipedia.org/wiki/Single-event_upset ; https://en.wikipedia.org/wiki/Electronic_voting_in_Belgium ; https://radiolab.org/podcast/bit-flip
- ENIAC (plugboards, tube rate, programmers): https://en.wikipedia.org/wiki/ENIAC ; https://www.columbia.edu/cu/computinghistory/eniac.html ; https://eniacprogrammers.org/
- von Neumann *First Draft* (30 June 1945, credit dispute): https://en.wikipedia.org/wiki/First_Draft_of_a_Report_on_the_EDVAC
- Manchester Baby (21 June 1948): https://en.wikipedia.org/wiki/Manchester_Baby ; https://www.scienceandindustrymuseum.org.uk/objects-and-stories/baby-and-modern-computing
- EDSAC Initial Orders (Wheeler, May 1949): https://www.cl.cam.ac.uk/~mr10/edsacposter.pdf ; https://royalsocietypublishing.org/rspa/article/202/1071/573/8294/Programme-organization-and-initial-orders-for-the
- Kathleen Booth, *Coding for A.R.C.* (1947): https://albert.ias.edu/entities/publication/27e8d743-e430-4d4d-821c-b7a7944607a7
- Rochester assembler & IBM 701: https://history.computer.org/rochester.html
- Short Code (Mauchly, 1949): https://ieeexplore.ieee.org/document/4640530
- A-0 / FLOW-MATIC: https://en.wikipedia.org/wiki/A-0_System ; https://en.wikipedia.org/wiki/FLOW-MATIC
- FORTRAN (April 1957): https://www.ibm.com/history/fortran ; https://en.wikipedia.org/wiki/Fortran
- Plankalkül: https://en.wikipedia.org/wiki/Plankalk%C3%BCl ; https://ed-thelen.org/comp-hist/Zuse_Plan_Kalkul.pdf
- Turing 1936: https://en.wikipedia.org/wiki/Turing%27s_proof ; https://academic.oup.com/plms/article-abstract/s2-42/1/230/1491926
- Atanasoff / Honeywell v. Sperry Rand (1973): https://en.wikipedia.org/wiki/Honeywell,_Inc._v._Sperry_Rand_Corp.
- Moth / "bug" (9 Sept 1947): https://americanhistory.si.edu/collections/object/nmah_334663
- Joseph Henry relay (1835): https://en.wikipedia.org/wiki/Joseph_Henry ; https://siarchives.si.edu/collections/siris_sic_12484
- de Forest Audion: https://en.wikipedia.org/wiki/Audion
- Zuse Z3: https://en.wikipedia.org/wiki/Z3_(computer) ; https://www.computerhistory.org/timeline/1941/
- Jacquard / Babbage / Hollerith: https://www.computerhistory.org/storageengine/punched-cards-control-jacquard-loom/ ; https://en.wikipedia.org/wiki/Jacquard_machine
- Teaching sources: Petzold, *Code* (1999) — https://en.wikipedia.org/wiki/Code:_The_Hidden_Language_of_Computer_Hardware_and_Software ; CS50 lecture 0 notes — https://cs50.harvard.edu/x/2020/notes/0/ ; Nand2Tetris — https://mitpress.mit.edu/9780262539807/the-elements-of-computing-systems/ ; Crash Course CS #3 — https://thecrashcourse.com/courses/boolean-logic-logic-gates-crash-course-computer-science-3/ ; Isaacson, *The Innovators* — https://www.simonandschuster.com/books/The-Innovators/Walter-Isaacson/9781476708706
- Tyranny of numbers / handoff: https://en.wikipedia.org/wiki/Tyranny_of_numbers ; https://archive.computerhistory.org/resources/access/text/2017/03/102770834-05-01-acc.pdf
- Regency TR-1 (1954): https://spectrum.ieee.org/transistor-radio-invented ; https://en.wikipedia.org/wiki/Regency_TR-1
