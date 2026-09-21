---
cluster: 3 of 5
window: 1961-2000 (brief specified 1969-2000; research recommends starting at 1961 — see below)
researched: 2026-09-16
model: deepseek/deepseek-v4.1-flash via Command Code, --effort high
status: research and structure recommendation only — non-binding, no lesson prose, no chapter files, no prerequisite-graph.yaml rows
---

# Stage 0 research cluster 3 of 5 — The Networked World, 1961-2000

**Confidence markers:** `[P]` primary source read directly · `[S]` well-established secondary · `[!]` disputed/conflicting — resolve before publishing.

Note: the brief says 1969-2000. **Recommendation: move the start to 1961** — reasons in §4.1.

## §0. The five brief questions, answered

**1. "A network" vs "the Internet."** Not size — **what you're allowed to assume about the other side**. ARPANET was one organisation's machines under one protocol (NCP) that *assumed the network never loses a packet*. Free when you own the only network; fatal the moment a second one exists. The Internet is an agreement letting independently owned networks hand traffic over **without either changing its internals**. Kahn's four rules (ISOC brief) are almost entirely *negative* constraints: no changes required of member networks; best-effort only; dumb middle that remembers nothing; no global operational control. `[S]`

**2. Why 1983, nine years after the 1974 paper.** NCP and TCP share no words, so migration couldn't be gradual — it had to be simultaneous. RFC 801 (Postel, Nov 1981) set the goal of a complete switch by 1 Jan 1983. People wore buttons: *"I survived the TCP/IP transition."* `[P]`(RFC 801 exists)/`[S]`(ISOC)

**3. Why the Web on top of a working Internet.** The Internet solved *moving* information; nobody had solved *finding and connecting* it. Berners-Lee's own words: staff turnover ~2 years, and **"Often, the information has been recorded, it just cannot be found."** Plus two named structural failures — "the problem with trees" and "the problem with keywords" ("two people never chose the same keywords"). `[P]`

**4. Is networking+Web as one two-lesson chapter defensible?** **No.** The research found four movements, not three, and the 1974→1989 gap contains DNS, NSFNET, commercial carriers and ARPANET's retirement. See §4.2.

**5. Does the Web era turn "cleanly sequential"?** **No — that claim needs retiring.** The concurrency doesn't vanish, it changes *kind*:
- **1961-74: independent invention.** Kleinrock (1961), Baran (1964), Davies (1965-67) each worked out packet switching *unaware of each other*. `[S]`
- **1989-95: competing shipping systems, won by licensing.** Gopher led until ~1994. In **Feb 1993** Minnesota announced licence fees for its Gopher server; in **Apr 1993** CERN put the Web in the public domain — "relinquishes all intellectual property rights to this code, both source and binary." Two decisions, one year, opposite directions. `[S]`

That second kind is arguably the more valuable lesson: it's the over-trust thesis as historical fact — the better-engineered thing didn't win.

## §1. Findings

### 1.1 The packet idea — three people in parallel (1961-67)
Kleinrock (MIT) first paper July 1961, first book 1964. Baran (RAND) 11-volume *On Distributed Communications*, 1964 — explicitly about "withstanding heavy enemy attacks." Davies/Scantlebury (NPL, 1964-67) — **the word "packet" came from NPL**. ISOC states the three "had all proceeded in parallel without any of the researchers knowing about the other work." Roberts + Merrill, 1965: linked MIT's TX-2 to California's Q-32 over dial-up — "the first (however small) wide-area computer network ever built." `[S]`

**Nuclear myth — the citable form** (ISOC fn. 5): the rumour came from the RAND study, which "was never true of the ARPANET, only the unrelated RAND study on secure voice considered nuclear war. However, the later work on Internetting did emphasize robustness and survivability." Note the honest shape: the nuclear motive was real, but belonged elsewhere; survivability genuinely returned later.

**Licklider conflation to avoid:** two different documents get merged — the **"Galactic Network" memos** (MIT, Aug 1962) and the **"Intergalactic Computer Network" memorandum** (ARPA, **23 Apr 1963**, where the phrase is the *addressee line*, not a term). `[P]`

### 1.2 ARPANET — one network (1968-72)
Aug 1968 RFQ for Interface Message Processors; **Dec 1968** won by Frank Heart's group at BBN. Four contracted sites, four *incompatible* machines: UCLA (Sigma 7/SEX), SRI (SDS 940/Genie), UCSB (IBM 360/75), Utah (PDP-10/Tenex). `[P]` Sept 1969 IMP #1 at UCLA. Crocker's firsthand detail: it arrived on the loading dock **Saturday 30 Aug 1969**, and when plugged in it resumed from where it left off in Cambridge. `[P]` Oct 1972 ICCC public demo (Kahn). Dec 1970 NCP completed. `[S]`

`[!]` **29 Oct 1969 "LO"** — date and detail extremely well attested, but sources found were blog-grade. Needs a UCLA/CHM citation. **Also: Kline and Duvall completed a successful LOGIN after ~1hr of phone troubleshooting** — presenting "it crashed, that was the message" as the whole story would be exactly the myth the integrity floor forbids.

### 1.3 The part that speaks to *this* book's thesis: the RFC series
From Crocker's own account in RFC 1000 `[P]`:
> "I remember having great fear that we would offend whomever the official protocol designers were, and I spent a sleepless night composing humble words for our notes. The basic ground rules were that anyone could say anything and that nothing was official. **And to emphasize the point, I labeled the notes 'Request for Comments.'**"

They were graduate students who "expected that a professional crew would show up eventually to take over." RFC 1, "Host Software," **7 April 1969**. Fifty years later those documents are the "documents of record." `[S]` — A spec series named to *disclaim* authority became the authority. That's the invention story behind `canon/thesis.md`'s own claim.

### 1.4 One network → the Internet (1972-74) — the intellectual centre
The trigger was an accident of ownership: ARPA had **three** incompatible packet networks (ARPANET, PRNET, SATNET). And NCP "relied on ARPANET to provide end-to-end reliability. If any packets were lost, the protocol… would come to a grinding halt." `[S]`

**Kahn's four ground rules** `[S]` — the crispest definition of "Internet" available:
1. no internal changes may be required of any member network
2. best effort — lost packets retransmitted from the source
3. dumb "black boxes" between networks, retaining **no information about individual flows**
4. no global control at the operations level

Spring 1973 Kahn asks Cerf; first written version INWG#39 (Sussex, Sept 1973); **Cerf & Kahn, *IEEE Trans. Comm.*, May 1974**. `[S]` **RFC 675, Dec 1974** — first detailed TCP spec; the word **"internet" enters as shorthand for "internetworking."** `[P]`/`[!]` Later TCP was split into IP + TCP (packet-voice made clear some traffic shouldn't have losses corrected), and UDP was added. `[S]`

### 1.5 Deployment and scale (1974-1995)
TCP/IP a defence standard **1980**; RFC 791/793 Sept 1981; **1 Jan 1983 flag day**, planned for years. **Berkeley's BSD Unix integration** — ISOC: "one of the key elements in the successful widespread adoption." **DNS**: RFC 882/883, Nov 1983, Mockapetris — before that a single host table at SRI under Elizabeth Feinler. `symbolics.com`, **15 Mar 1985**. NSFNET: Jennings' 1985 TCP/IP-mandatory decision; AUP barring "not in support of Research and Education" traffic, which deliberately *stimulated* private carriers (PSI, UUNET); backbone defunded **April 1995** (six nodes at 56 kbps → 21 at 45 Mbps). ARPANET decommissioned 1990. **FNC's formal 24 Oct 1995 definition of "Internet"** is quotable. `[S]`

Also: USENET (on Unix UUCP), BITNET (1981), CSNET, JANET (1984) — and they were **"largely" incompatible**. `[S]`

### 1.6 The near-alternatives — the outcome was not inevitable
OSI: **ISO/IEC 7498, 1984**, incompatible with TCP/IP, backed by ISO, governments and telecoms. `[S]` **RFC 942 (Feb 1985)** is a National Research Council report comparing DoD IP/TCP against ISO-IP and TP-4 — a primary artefact proving the contest was live and formal. `[P]` Also **RFC 1169, "Explaining the role of GOSIP," Cerf & Mills, Aug 1990** `[P]` — the OSI-favouring US federal profile was significant enough that Cerf co-wrote an RFC explaining it. `[!]` don't state GOSIP dates without verification. SNMP beat CMIP ("from the OSI community") — decided by adoption, not authorship. `[S]`

**Gopher** (Lindner/McCahill, Minnesota, 1991) — leading until 1994, then Feb 1993 licence fees. "Gopher expansion stagnated, to the advantage of the World Wide Web, to which CERN disclaimed ownership." `[S]`

### 1.7 The Web (1989-91)
Berners-Lee's proposal, **March 1989**. `[P]` Concretely usable:
- "a multiply connected 'web' whose interconnections evolve with time" (CERN as it actually works)
- his **six questions**: *Where is this module used? Who wrote this code? Where does he work? What documents exist about that concept? Which laboratories are included in that project? Which systems depend on this device?*
- **"the problem with trees"** — the VMS/HELP example: reach a leaf, it says "see this other page," you must leave the system and re-enter
- **"Non-Centralisation"** as a hard requirement — "without requiring any central control or coordination"
- the client/server decision stated as the architecture: "separate the information storage software from the information display software, with a well defined interface between them"
- **he called it "Mesh";** he chose "World Wide Web" only when writing the code in 1990

The proposal's own reference list is proof of concurrency: Nelson, HyperCard, his own 1980 Enquire, VAX/NOTES, `uucp News`, CERNDOC, Hypertext '87/'88, the NIST workshop, `alt.hypertext`, CALS/CDA. `[P]`

Build: **Dec 1990** browser/editor + server on a NeXT (the machine labelled "DO NOT POWER IT DOWN"); **6 Aug 1991** `alt.hypertext` announcement; **30 Apr 1993** public domain; 500 servers and 1% of traffic by late 1993; **Oct 1994** W3C at MIT with DARPA/EC support; Mike Sendall's **"Vague, but exciting."** `[S]`/`[P]`

Mosaic: Andreessen + Bina; **first published browser to display images inline with text** — explicitly *not* the first browser. NCSA's own reason it mattered: earlier ones "were troublesome to get up and running." `[S]`

### 1.8 Architecture & REST (1994-2000)
Fielding's dissertation, UC Irvine, **2000**, ch. 5 read in full. `[P]`

**The load-bearing fact: REST is *derived*, not invented.** Ch. 5.1 starts from the "Null style" and adds one constraint at a time — client-server → stateless → cache → uniform interface → layered system → code-on-demand (explicitly *optional*) — naming **both the property each buys and the cost it imposes**. And: "The early Web architecture… was defined by the client-cache-stateless-server set of constraints. That is, the design rationale presented for the Web architecture **prior to 1994**…" So the shape existed already; 2000 is the document that *named* it, to guide HTTP's extension for proxies and shared caches. `[P]`

The problem it solved wasn't "how to build APIs" — it was *why some architectures survive at Internet scale and others collapse*. The enemy is coupling. The uniform interface and statelessness are the **same Kahn-shaped move**: push knowledge to the ends, keep the middle ignorant.

Fielding's working context, 1994-1999: HTTP/1.0 (RFC 1945, 1996), URI (RFC 2396, 1998), **HTTP/1.1 (RFC 2616, June 1999, with Gettys/Mogul/Frystyk/Masinter/Leach/Berners-Lee)**, plus co-founding Apache. `[P]`/`[S]`

**The coda — a gift to this book's thesis.** In 2008:
> "I am getting frustrated by the number of people calling any HTTP-based interface a REST API. Today's example is the SocialSite REST API. That is RPC. It screams RPC." `[P]`

And, openly, on his own dissertation: *"people get REST wrong because I failed to include enough detail on media type design within my dissertation. That's because I ran out of time."* And: *"REST is software design on the scale of decades… **Many of the constraints are directly opposed to short-term efficiency.**"* `[P]`

### 1.9 Corrections and open conflicts
1. ARPANET ≠ nuclear-survival project (see §1.1).
2. "LO was the first Internet message because it crashed" — incomplete; the LOGIN completed. `[!]`
3. **1969 = a *network* link. The *Internet* = 1973 design / 1974 paper / 1983 deployment.** This three-step gap *is* the teaching payload.
4. ARPA→DARPA: ISOC says 1971, Crocker says 1972. `[!]`
5. First email: ISOC's participant account says March 1972; many say 1971. `[!]`
6. **Berners-Lee's own proposal misdates Ted Nelson's "hypertext" to the 1950s** — it's 1965. `[!]` Worth keeping: even a primary source misdates the thing it cites.
7. Mosaic was not the first browser. `[S]`
8. `symbolics.com` is the first `.com`; `nordu.net` (Jan 1985) may be the first domain of any kind. `[S]`

## §2. Teaching-standards synthesis

**Petzold, *Code* (1999) — never introduce an abstraction before the reader has hit the wall it removes.** Opens on Morse and Braille, not registers. Every layer is motivated by the previous layer's specific failure. **Crucially: *Code* is a build-up, not a chronology.** Naming this matters — it proves Stage 0's chronological ordering is a *chosen* answer to "how did we get here," not a pedagogical necessity. `[S]`

**Crash Course CS #28-30 — networks → the Internet → the Web, three episodes.** `[S]` Direct independent support for §4: an experienced teaching production decided these are three ideas needing three treatments. The candidate breakdown merges two.

**Nand2Tetris — the counterexample that justifies the register rule.** Builds a computer from a NAND gate upward with **zero history, names or dates**. `[S]` It proves the stack *can* be taught with no chronology. So if Stage 0 gives up pure build-up, the story has to carry what build-up would have carried — which is exactly why the "story, analogy, example first" rule is load-bearing rather than decorative.

**CS50 — and the precise gap this book fills.** Week 8 is titled "HTML, CSS, JavaScript," and its subtopics begin: *"Internet: Routers; TCP/IP; DNS. HTTP: URLs, GET, POST. HTML: Tags; Attributes."* `[P]` **The Internet is a sub-bullet inside the web-development week.** No ARPANET, no Cerf, no Kahn, no flag day, no 1989 proposal, no public-domain release. CS50 *assumes* the network and starts at HTTP. Stage 0's whole claim is that the shape is the point.

**Isaacson, *The Innovators* (2014)** — person-centred scenes, through-argument that innovation is collaborative not lone-genius. Borrow the *scenes*, not the *thesis*. `[S]`

**Hafner & Lyon, *Where Wizards Stay Up Late* (1996)** — the dedicated ARPANET narrative; its own one-line framing is itself a myth correction: "the most peaceful intentions—to link computers at scientific laboratories across the country so that researchers might share computer resources." `[S]`

**Abbate, *Inventing the Internet* (MIT, 1999) — the best structural idea available.** Its third chapter is **"'The most neglected element': users transform the ARPANET"** — the network was reshaped by what users did with it, email above all, beyond anything designers intended. `[S]` That's the same shape as this book's own thesis, and it gives the ARPANET lesson a real *turn* instead of an "and then it grew" ending.

*(Proposed, not verified this pass: Tom Standage, *The Victorian Internet*, 1998.)* `[!]`

## §3. Story and analogy hooks

- **The etymology does enormous work.** "Internet" = shortening of "internetworking" (RFC 675, 1974). *The thing that joins networks together.* `[P]`
- **Two office buildings.** Each has internal mail that works. Now they must reach each other. Option (a): one adopts the other's internal procedures — and again for every new building. Option (b): agree on thin rules for *handing over at the door*, change nothing inside. (b) is the Internet, and three of Kahn's four rules are things the agreement *forbids*. `[S]`
- **Postcards.** Post a book as numbered postcards; they may arrive out of order or not at all. Numbering lets the recipient reorder; a missing number means asking for a copy. The postal service only promises to *try* — and **the ends are responsible for putting it right, not the middle.** The middle stays cheap and fast because it's allowed to forget. `[S]`
- **The convergence to state explicitly:** "best effort" (1974) = "gateways retain no per-flow information" (1974) = "statelessness" (2000). **Three dates, one principle.** The strongest through-line in the cluster.
- **Private extensions.** NCP was a company's four-digit extension system. Fine in one building; meaningless the moment you dial another company.
- **The flag day.** No gradual migration exists between two mutually unintelligible languages. The technical work was done by 1974; the hard part was coordinating hundreds of organisations acting simultaneously with no way to test the whole thing first.
- **DNS = the single printed phone book.** Everybody copies one master list from one keeper. Works until there are thousands of independently managed networks. Every reader has watched a shared list stop working.
- **The Web, told through his six questions**, then the line: *"Often, the information has been recorded, it just cannot be found."* `[P]`
- **Trees vs webs** — the VMS/HELP "see also, in another book" example. `[P]`
- **Two doors, one year (1993).** Gopher was ahead; Minnesota moved to charge, CERN gave it away. *Gopher was better organised and lost. Why?* `[S]` The book's thesis as historical fact.
- **"Vague, but exciting."** A manager's tolerance for an unproven idea was load-bearing. `[P]`
- **REST = a naturalist naming a species that already existed** — plus his own admission that the write-up was incomplete. `[P]`
- **REST's constraint derivation is the bridge to SDE, in the primary source.** A specification *is* a set of chosen constraints, each with a named cost and a named property. Fielding's "many of the constraints are directly opposed to short-term efficiency" is the over-trust/over-caution tension verbatim. `[P]`
- **The RFC naming story.** A sleepless graduate student's "humble words," labelled to disclaim authority, became the documents of record.

## §4. Structural recommendation

**4.1 Start the window at 1961, not 1969.** Otherwise ARPANET looks like an origin when it's an *application*, and the three-way parallel invention gets demoted to a parenthetical.

**4.2 Four movements, not three** — so two chapters, seven lessons:

**Chapter 1 — "One Network, Then Many" (1961-1995)**
1. **Packets** (1961-67) — a reliable service built from unreliable pieces; three parallel inventors; ends on Roberts's 1965 dial-up proof that the telephone model wouldn't do.
2. **The Network That Was Only One Network** (1968-72) — procurement, four incompatible machines, IMP #1 on the loading dock, the RFC accident, "LO", **and the turn: email changes what the thing is for.**
3. **Making Different Networks Agree** (1972-83) — why three ARPA networks broke NCP; Kahn's four rules; the 1974 paper; the flag day. **The emotional centre.**
4. **When It Had to Scale** (1983-95) — DNS, NSFNET, the AUP, private carriers; **the near-alternatives included, so the outcome is visibly not inevitable.**

**Chapter 2 — "The Web" (1989-2000)**
5. **Information That Gets Lost** (1980-91) — the crowded field *first* (Nelson, Engelbart, HyperCard, Gopher, WAIS), then the proposal, then the NeXT build.
6. **Why This One Spread** (1993-95) — the two doors in 1993; Mosaic's ease-of-installation; W3C.
7. **Giving the Shape a Name** (1994-2000) — the constraint derivation; the 2008 aftermath.

**If Chapter 1 runs long**, split at the **1972 seam** (A-B / C-D), not the 1969 one. The 1.5 MB weight rule means at most two images in Chapter 1.

**4.3 Concurrency that must be structural**
*Cross-cluster (the brief's explicit ask):*
1. **1969 is a four-thread year**: RFC 1 (7 Apr), first ARPANET link (Sept), Unix begun (summer), Hoare's paper (Oct). Presenting ARPANET as the rung *after* Unix would be a false sequence.
2. The IC/microprocessor line (1958→1971) runs *underneath* movements A and B.
3. **The best cross-link in all of Stage 0: Kahn's "no member network may be required to change its internals" is Parnas's information-hiding argument at internetwork scale.** Both say the boundary is the contract. Needs an explicit callback — and means porting `parnas-1972` into this cluster, asking it a *different* question than cluster 2 did.
4. **Unix and networking merge in the early 1980s** (DARPA→Berkeley→BSD). Without this point the reader never learns why TCP/IP won.
5. UUCP/USENET/BITNET are simultaneously Unix artefacts and network artefacts.

*Within-cluster:* the three-way packet invention; ARPA's accidental ownership of three networks; OSI as a serious decade-long rival (RFC 942, RFC 1169); Gopher ahead until 1994; and **1993-95 as a dense node** (Mosaic, public domain, W3C, Netscape, NSFNET defunded, JavaScript) — presented as a cluster, not a sequence.

**4.4 Browser/JavaScript boundary — bright line, stated in the chapter**
- **IN:** browsers exist and are *reading tools*; Mosaic's ease-of-installation and inline images are why non-specialists could use it; the client/server split was Berners-Lee's own stated architectural decision; and HTTP/HTML/URL named as **three parts of one decision, with no syntax taught.**
- **OUT, deferred to Stage 1 frontend:** HTML tags/attributes, CSS, JavaScript, the DOM, browser-war technical detail, `XMLHttpRequest`.
- One explicit sentence acknowledging the hand-off. Note this is exactly where Stage 0 differs from CS50, which puts TCP/IP *inside* the HTML week.

**4.5 Is 2000 the right beat?** Yes — **but framed as "the year it got a name," covering 1994-2000 as a working period.** The dissertation itself dates the pre-1994 Web to the same constraints, and the 2008 aftermath isn't garnish — it's the thesis illustration, told by the spec's own author. **One alternative worth putting to the owner:** let the ch. 5 structure *be* the lesson (null style, then one constraint at a time, each with a cost and a property). That converts the cluster's closing beat into Stage 0's first concrete demonstration of what a specification is — which is the stage's stated job. Also note REST-as-practised (JSON over HTTP) is largely **post-2000**; don't hand a beginner a concept from the future.

**4.6 Out of scope here:** Ethernet/ALOHAnet (LAN cluster); the Morris worm (flag as available for a safety-floor beat, don't claim it); the browser wars and everything post-1995 in the browser line; the OSI seven-layer diagram (its *existence as a rival* is in scope, its layers are not).

## §5. Sources

**Primary, read directly** — RFC 1000 incl. Crocker's "Origins of RFCs" (https://www.rfc-editor.org/rfc/rfc1000.txt) · RFC 1 (https://www.rfc-editor.org/rfc/rfc0001.txt) · Berners-Lee, *Information Management: A Proposal*, 1989 (https://www.w3.org/History/1989/proposal.html ; CERN's copy: https://info.cern.ch/Proposal.html) · Fielding, dissertation ch. 5 (https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm) · Fielding, "REST APIs must be hypertext-driven," 2008 (https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven) · RFC 882 (https://www.rfc-editor.org/rfc/rfc882.txt) · RFC 2616 (https://www.rfc-editor.org/info/rfc2616/) · RFC 675 (https://www.rfc-editor.org/info/rfc675/) · Baran, RAND RM-3420, 1964 (https://www.rand.org/pubs/research_memoranda/RM3420.html) · CS50x Week 8 (https://cs50.harvard.edu/x/weeks/8/) · W3C history (https://www.w3.org/about/history/)

**Primary, cited but not fetched in full** — Cerf & Kahn 1974 PDF (https://www.cs.princeton.edu/courses/archive/fall06/cos561/papers/cerf74.pdf) · RFC 791/793/801/939/942/985/1169/1436 via rfc-editor.org · CERN, "Licensing the Web" (https://home.cern/science/computing/the-birth-of-the-web/licensing-web/) · CERN timeline (https://timeline.web.cern.ch/)

**Secondary** — ISOC, *A Brief History of the Internet* (https://www.internetsociety.org/internet/history-internet/brief-history-internet/) (the most valuable source in this pass: participant-authored, and footnote 5 is the citable nuclear-myth correction) · Abbate, *Inventing the Internet* (https://archive.org/details/inventinginterne00jane) · Hafner & Lyon, *Where Wizards Stay Up Late* (https://archive.org/details/wherewizardsstay00haf_vgj) · Isaacson, *The Innovators* (https://en.wikipedia.org/wiki/The_Innovators_(book)) · Petzold, *Code* (https://en.wikipedia.org/wiki/Code:_The_Hidden_Language_of_Computer_Hardware_and_Software) · Nand2Tetris (https://www.coursera.org/learn/build-a-computer) · Crash Course CS #28 (https://www.youtube.com/watch?v=3QhU9jd03a0) · NCSA Mosaic (https://www.ncsa.illinois.edu/research/project-highlights/ncsa-mosaic/) · Minnesota Computing History, Gopher (https://mncomputinghistory.com/gopher-protocol/) · FBI, Morris Worm (https://www.fbi.gov/history/cases-and-criminals/morris-worm) · EDN, first .com (https://www.edn.com/1st-com-domain-name-is-registered-march-15-1985/)

Per `canon/thesis.md`, every source above is a **proposal** for the editor. Argue hardest for ISOC's *Brief History* (only source found carrying both Kahn's four rules and the myth correction), RFC 1000 (first-person RFC origin in a primary document), the 1989 proposal (the problem in the author's own jargon-free words), and Fielding's ch. 5 + 2008 post.

## §6. Open items before drafting

1. UCLA/CHM-grade source for the 29 Oct 1969 message; and a decision not to drop the completed LOGIN.
2. First email: 1971 or 1972 — two credible sources disagree.
3. ARPA→DARPA rename: 1971 vs 1972.
4. Nelson's "hypertext" = 1965 — verify against the ACM paper; note Berners-Lee's own misdating.
5. Read RFC 801 directly rather than through the secondary quotation of its goal line.
6. GOSIP mandate dates / FIPS number — deliberately unstated here.
7. Cailliau's precise role and the date of his co-proposal.
8. Whether to port `parnas-1972` in for the §4.3(3) callback (the evidence-ledger rule says reuse must ask a *different* question — which this does).
9. Standage, *The Victorian Internet* — proposed, unverified.
10. Whether this cluster claims the Morris worm as a safety-floor beat.
