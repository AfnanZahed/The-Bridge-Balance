---
cluster: 2 of 5
window: ~1958-1974 (the concurrent cluster)
researched: 2026-09-16
model: deepseek/deepseek-v4.1-flash via Command Code, --effort high
status: research and structure recommendation only — non-binding, no lesson prose, no chapter files, no prerequisite-graph.yaml rows
---

# Cluster 2 — The Concurrent 1958-1974 Cluster: Hardware, Method, and Operating Systems

## 1. Key verified facts, names, dates, sources

- **Kilby's integrated circuit:** Jack Kilby (Texas Instruments) demonstrated the first working IC on **12 Sep 1958** — a phase-shift oscillator on a germanium bar joined by hand-soldered gold "flying wires". TI filed **6 Feb 1959**; US Patent 3,138,743 granted 23 Jun 1964.
- **Noyce's silicon IC:** Robert Noyce (Fairchild) conceived the monolithic IC on **23 Jan 1959**, built on **Jean Hoerni's planar process** (1959); patent filed **30 Jul 1959**, US 2,981,877 granted **25 Apr 1961**. Kilby received the 2000 Nobel (Noyce had died).
- **Moore's Law, precisely:** Gordon Moore, *"Cramming more components onto integrated circuits,"* **Electronics, 19 Apr 1965** — predicted doubling ~**every year**; he revised it to ~**every two years** in 1975. The common "18 months" is **David House's** later Intel claim, not Moore's.
- **Intel 4004:** released **15 Nov 1971** (ad in *Electronic News*); **2,300 transistors**, 4-bit, **740 kHz**, 16-pin DIP, ~**$60**. Origin: a **1969 Busicom** calculator contract; Hoff/Mazor architecture, **Federico Faggin** silicon (his silicon-gate tech made it possible), Masatoshi Shima. Intel bought back marketing rights in **May 1971** for **$60,000**.
- **"First microprocessor" is contested:** Four-Phase Systems **AL1** (1969) and Garrett **MP944** (F-14, 1970, classified until 1998) predate it. Honest claim: the 4004 was the first *commercially available single-chip* microprocessor.
- **Next chips (this is the bridge to the PC):** Intel **8008** (Apr 1972, first 8-bit), **8080** (Apr 1974, 6,000 transistors, 2 MHz).
- **NATO Software Engineering Conference:** Garmisch, **7-11 Oct 1968**; chaired by **F.L. Bauer**; >50 attendees from 11 countries; report edited by **Naur & Randell**. The editors state the phrase was **"deliberately chosen as being provocative."** Randell credits the *idea of that title* to **Fritz Bauer**.
- **"Coined at Garmisch" is an oversimplification:** earlier uses exist — **Margaret Hamilton** (MIT Instrumentation Lab, ~1963-64), an **Oettinger** CACM letter (1965 or 1966 depending on source), even a June **1965** classified ad in *Computers and Automation*. Say "popularised at Garmisch", not "invented there".
- **The "software crisis" was disputed, not declared.** Attendee **Kolence**, in the 1968 report (p.71): *"There are many areas where there is no such thing as a crisis — sort routines, payroll applications… It is large systems that are encountering great difficulties."* The term's wide currency comes from **Dijkstra's 1972 Turing lecture**. The prior pass's correction on this is **confirmed**.
- **Rome follow-up:** *"Software Engineering Techniques,"* **27-31 Oct 1969**, Rome (eds. Buxton & Randell) — the conference was a deliberate sequel, not a one-off.
- **Dijkstra, "Go To Statement Considered Harmful,"** CACM 11(3), **Mar 1968**, pp.147-148.
- **Hoare, "An Axiomatic Basis for Computer Programming,"** CACM 12(10), **Oct 1969**, pp.576-580 (Floyd 1967 has priority for the assertion method — an honest hedge the earlier pass already recorded).
- **Parnas, "On the Criteria To Be Used in Decomposing Systems into Modules,"** CACM 15(12), **Dec 1972**, pp.1053-1058 — the **source of the phrase "information hiding"**; modules chosen by what they *hide*, not by processing steps. Preceded by **"Information Distribution Aspects of Design Methodology," IFIP Congress 1971**. This is exactly the module-*boundary* content the later "Reading Literacy" chapter needs, and nothing more. (See cluster 5's research for a correction to this paper's actual stated motivation, and a note that there are two distinct 1972 Parnas papers.)
- **Royce's "waterfall" paper:** *"Managing the Development of Large Software Systems,"* WESCON, **Aug 1970** — widely misread; the paper actually **warns against** single-pass sequential development.
- **IBM unbundling: 23 Jun 1969** — software and services priced separately from hardware, which created the commercial software-products industry (and is the economic backdrop to the "crisis").
- **CTSS** (MIT, **1961**, Fernando Corbató; John McCarthy's 1959 memo) — the first general-purpose time-sharing system. **Multics** (MIT/Bell Labs/GE, designed from 1965) — **Bell Labs withdrew in March 1969**.
- **Unix:** Ken Thompson built it on a spare **PDP-7 in 1969** (origins: the game *Space Travel*), with Dennis Ritchie and Rudd Canaday; a month alone (his wife's Aug 1969 trip) was when it got written. Originally **Unics** (a pun on **Multics**; Kernighan claims the naming). First **Unix Programmer's Manual: 3 Nov 1971**. PDP-11/20 was funded by the **Patent Department's** word-processing need (roff/troff).
- **Pipes:** McIlroy's **1964** memo; **not** in the June 1972 2nd Edition; present by **15 Jan 1973**; Thompson added them to **V3 Unix (1973)** — often said to have been done in one night.
- **Portability:** Unix rewritten in **C for Version 4, 1973** — the reason it could spread across hardware. First public paper at **1973 SOSP**; published as Ritchie & Thompson, *"The UNIX Time-Sharing System,"* **CACM 17(7), Jul 1974**, pp.365-375.
- **Why Unix spread so far, so free:** the **1956 AT&T consent decree** barred the Bell System from any business other than common-carrier communications, so Unix **could not be sold** — it was shipped for the cost of media and postage, then licensed cheaply to universities (V5, 1973; V6 to companies from 1975 at ~$20,000). First users' meeting NY **1974** → USENIX.
- **Networking overlaps this window (cross-cluster flag):** ARPANET's first host-to-host message **29 Oct 1969** (UCLA→SRI, "LO"); four nodes by Dec 1969. **Cerf & Kahn, "A Protocol for Packet Network Intercommunication," IEEE Trans. Comm., May 1974** (the TCP paper).
- **Personal computer — placed *after* this cluster:** Altair 8800 (MITS) on the cover of **Popular Electronics, Jan 1975** ($395 kit / $498 assembled, Smithsonian); **IBM PC (5150), announced 12 Aug 1981**, Intel 8088, MS-DOS.

## 2. How strong teaching sources actually sequence and explain this

- **Crash Course Computer Science** (Carrie Anne Philbin, 40 eps) is a **concept ladder with history as illustration**, not chronological: #17 "Integrated Circuits & Moore's Law" → #18 "Operating Systems". It teaches the mechanism, then names the era. Useful for *what a beginner must hold before the next idea*, not for order.
- **Nand2Tetris** (12 projects) is **strictly bottom-up and deliberately dateless**: NAND gate → ALU → CPU → OS → compiler → Tetris. It proves you can teach the whole stack with *no* history at all — the exact opposite of Stage 0, and a useful check that Stage 0's value is *story*, not mechanism.
- **Petzold's *Code*** is the same move in book form: chapters titled by construction ("Relays and Gates", "Feedback and Flip-Flops", "An Assemblage of Memory"), essentially date-free. Again: mechanism-first, no chronology.
- **Isaacson's *The Innovators* is the closest model here.** Chapters run roughly chronologically by technology — Ada → The Computer → Programming → **The Transistor → The Microchip** → Video Games → The Internet → The Personal Computer → Software → Online → The Web → Ada Forever. Crucially, he uses **people and collaboration as the through-line**, so simultaneous threads read as a chain of *interactions*, never as parallel trivia.
- **The shared trick for "these happened at once":** a **dated spine on one timeline**, a **named human face per thread**, and explicit **"meanwhile…" seams** — finish one thread to fluency, then hand off ("while that was happening, elsewhere…").
- **CS50/AP-CSP style** (and this book's own canon) reinforce the beginner requirement: **assume nothing, define every term on first use, one concrete example before any abstraction** — which is why the concurrency must be taught by story, not by a matrix of dates.

## 3. Story / analogy hooks a beginner could follow

- **The one unifying idea:** the late 1950s-60s is when computing **outgrew one head and one machine**. Hardware: too many parts → put them on one chip. Software: too many lines → modularise and engineer it. Systems: too many users per machine → time-share. Machines: too many, all isolated → connect them. Four threads, one pressure.
- **Kilby's first chip:** a thumbnail of germanium and hand-soldered gold wires — integration is *removing the joins*, not inventing new parts. Same circuit, no soldering.
- **Unix as the rebound from an abandoned project:** Bell Labs walked away from the too-big Multics, and one engineer built a small version to run a game on an idle machine. The team that quit the cathedral and built a bicycle — and the bicycle won.
- **The consent decree:** a phone company was legally forbidden to sell software, so the operating system that runs most of the world was **given away at the price of the tape and postage**. A great answer to "why did this one spread?"
- **The name:** "Unix" is a joke at Multics' expense — *uni* against *multi* — and a pun that stuck for fifty years.

## 4. Structural recommendation

- **Concurrency confirmed, and it's four threads, not three.** 1958-74 genuinely contains hardware (IC→microprocessor), methodology (Garmisch→Parnas), **and** OS/Unix **and** networking (ARPANET 1969, TCP/IP 1974). Networking is *inside* the window, not after it — this needs a cross-cluster decision, since the prior pass filed it later. (Cluster 3's own research independently reached the same conclusion from the networking side — see its §4.3 point 1.)
- **Make the concurrency structural:** one era-chapter ("computing outgrows one head"), with **3-4 Lessons = the threads**, on a **shared dated spine** and explicit "meanwhile" seams. Do not run them as sequential chapters with an apologetic footnote — that is the failure mode this project already corrected.
- **Window: start 1958 (Kilby), end 1974.** 1974 is clean on every thread (8080 → enables Altair 1975; Unix capped by the July 1974 CACM paper; TCP 1974). But the *context* lesson needs ~1964-66 setup (System/360's OS/360 as the "crisis" backdrop; CTSS 1961, Multics 1965) — flag those as earlier than the window's own anchor.
- **Do NOT extend this cluster to the PC.** Altair (1975) and IBM PC (1981) are later in real time. Close the cluster on "the chip is now cheap enough that a personal computer can exist — that comes next," which also feeds the Terminals/Editors chapters (CP/M 1975, MS-DOS 1981).
- **Split the OS/Unix material into its own Lesson** (time-sharing → Multics → Unix → pipes → C rewrite), rather than folding it into hardware — the seam is real and the prior pass's "callback" compromise is weaker than a genuine Lesson break.
- **Two boundary flags to resolve with the neighbours:** (a) the software-engineering thread's roots overlap cluster 1 (high-level languages, structured programming); (b) **Parnas 1972 is shared with a much later chapter** — use it *here* only for module boundaries/information hiding; leave the Hoare-1969 "spec is checkable" framing to that later chapter, so neither use distorts the other.

## 5. Sources

- IC milestones: https://www.computerhistory.org/siliconengine/all-semiconductor-solid-circuit-is-demonstrated/ ; https://ethw.org/Milestones:First_Semiconductor_Integrated_Circuit_(IC),_1958
- Noyce planar IC: https://www.computerhistory.org/siliconengine/practical-monolithic-integrated-circuit-concept-patented/ ; https://patents.google.com/patent/US2981877A/en
- Moore 1965/1975: https://www.cs.utexas.edu/~fussell/courses/cs352h/papers/moore.pdf ; https://www.eng.auburn.edu/~agrawvd/COURSE/E7770_Spr07/READ/Gordon_Moore_1975_Speech.pdf
- Intel 4004: https://en.wikipedia.org/wiki/Intel_4004 ; https://www.computerhistory.org/siliconengine/microprocessor-integrates-cpu-function-onto-a-single-chip/ ; https://en.wikipedia.org/wiki/Intel_8080
- NATO 1968 report: http://homepages.cs.ncl.ac.uk/brian.randell/NATO/nato1968.PDF ; http://homepages.cs.ncl.ac.uk/brian.randell/NATO/NATOReports/index.html ; https://isthisit.nz/posts/2022/1968-nato-software-engineering-conference/ ; https://archives.nato.int/report-on-the-conference-on-software-engineering-techniques-27th-to-31st-october-1969-rome
- Term-origin evidence: https://ieeecs-media.computer.org/media/marketing/cedge_newsletter/ce9boo.pdf
- Dijkstra 1968: https://dl.acm.org/doi/10.1145/362929.362947 ; Hoare 1969: https://dl.acm.org/doi/10.1145/363235.363259 ; Parnas 1972: https://dl.acm.org/doi/10.1145/361598.361623 ; Parnas 1971: https://bibbase.org/network/publication/parnas-informationdistributionaspectsofdesignmethodology-1971 ; Royce 1970: https://www.praxisframework.org/files/royce1970.pdf
- IBM unbundling: https://www.computerhistory.org/collections/catalog/102712825/ ; https://www.nytimes.com/1969/06/24/archives/i-b-m-readjusts-pricing-formula-to-make-separate-charges-for.html
- History of Unix: https://en.wikipedia.org/wiki/History_of_Unix ; CTSS: https://en.wikipedia.org/wiki/Compatible_Time-Sharing_System ; Multics: https://web.mit.edu/multics-history/ ; Unix 1st Ed manual: https://www.nokia.com/bell-labs/about/dennis-m-ritchie/1stEdman.html ; pipes dating: https://www.tuhs.org/testwiki/features/pipes/
- Cerf & Kahn 1974: https://www.cs.princeton.edu/courses/archive/fall06/cos561/papers/cerf74.pdf ; ARPANET first message: https://www.universityofcalifornia.edu/news/lo-and-behold-internet
- Altair 8800: https://americanhistory.si.edu/collections/object/nmah_334396 ; IBM PC: https://en.wikipedia.org/wiki/IBM_Personal_Computer
- Teaching models: https://thecrashcourse.com/topic/computerscience/ ; https://www.nand2tetris.org/course ; https://codehiddenlanguage.com/ ; https://www.gbv.de/dms/tib-ub-hannover/788704249.pdf
