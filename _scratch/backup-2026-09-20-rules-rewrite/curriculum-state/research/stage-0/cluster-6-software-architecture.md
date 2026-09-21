---
cluster: 6 of 7
window: 1964 -> 2023 (thread-evolution, not invention-order)
researched: 2026-09-16
model: deepseek/deepseek-v4.1-flash via Command Code, --effort max (recovered via --session resume after the initial run's final-answer server timeout — see command-code-cli.md; the research itself completed in the failed run, only the answer needed re-requesting)
status: research and structure recommendation only — non-binding, no lesson prose, no chapter files, no prerequisite-graph.yaml rows. Placement recommendation below (open Phase B, after the Web chapter) was superseded by the owner's own direct placement decision — see whole-book-redesign-record-2026-09-14.md §17.2 (Chapter 9, immediately before Spec-Driven Engineering). Content and lesson-breakdown findings below stand regardless.
---

# Cluster 6 — The Software-Architecture Thread (1964-today)

Confidence markers: `[P]` primary source read directly · `[S]` strong secondary · `[!]` disputed between sources.

## 1. Key verified facts, names, dates, sources — by area

**1.1 Monolith era and the client-server split (1964-1990)**
- "Architecture" enters computing as a *hardware* word: Amdahl, Blaauw & Brooks, "Architecture of the IBM System/360," *IBM Journal of R&D* 8:87-101, **1964**. Software waits ~25 years for the same word. `[S]`
- Early client-server form: remote job entry on OS/360 (announced 1964). `[S]`
- First vocabulary: ARPANET **RFC 4 (Mar 1969) / RFC 5 (Jun 1969)** use "user-host"/"server-host." `[S]`
- First written "client" for a machine: **Sturgis, Mitchell & Israel, "Separating Data from Function in a Distributed File System," Xerox PARC, 1978.** `[S]`
- Practice goes mainstream with PCs+LANs: Ethernet memo **22 May 1973** (Metcalfe); IEEE 802.3 draft 1983 / standard 1985; **Novell NetWare released 1983** → dominant PC networking late 1980s. `[S]`
- Conceptual hinge: **Birrell & Nelson, "Implementing Remote Procedure Calls," ACM TOCS, Feb 1984** (Cedar project, Xerox PARC). `[P]`
- Flagships: **NFS** (Sun; standard date 1984; NFS@40 archive says project began 1983, rollout 1985-86; Sandberg USENIX 1985; RFC 1094, Mar 1989) `[!]` on 1983 vs 1984; **X Window System** (1984, MIT Project Athena, from Stanford's W; X11 1987). `[S]`
- **"The Network is the Computer"** — John Gage for Sun, **1984**; *not* McNealy (common misattribution). `[S]`
- The name settles last: "server" enters general parlance only ~1992 — practice (early 80s) preceded vocabulary (late 80s/early 90s). `[S]`

**1.2 Database model evolution (1966-2012)**
- **IMS**: development began 1966 (IBM's ICS, with North American Rockwell) for Apollo/Saturn V parts; first "READY" **14 Aug 1968** at Rockwell; renamed IMS/360, 1969. `[P]`
- **CODASYL DBTG**: founded 1965 (chaired by William Olle); report 1 **Oct 1969**, report 2 **Apr 1971** — the network model. `[S]`
- **Bachman, "The Programmer as Navigator," 1973 Turing Award lecture** (28 Aug 1973) — named the navigational model; IDS = first commercial DBMS. `[P/S]`
- **Codd, "A Relational Model of Data for Large Shared Data Banks," CACM 13(6), June 1970, pp. 377-387** `[P]`: opening line — users "must be protected from having to know how the data is organized in the machine"; names three dependencies to kill (ordering, indexing, access path); introduces keys, normal form, join, the "connection trap"; targets IMS/360 and IDS by name.
- Race to SQL: System R begins 1974 (IBM San Jose); **SEQUEL (Chamberlin & Boyce) 1974**; Ingres (Stonebraker & Wong) 1973-74; **Oracle V2, 1979** (first commercial SQL RDBMS). `[S]`
- Standard: **ANSI X3.135-1986**; ISO 9075:1987 (technically identical). `[S]`
- Web-scale turn: GFS 2003 / MapReduce 2004; **Bigtable OSDI'06 (Nov 2006)**; **Dynamo SOSP 2007**; Cassandra 2008. `[S]`
- **"NoSQL"**: Carlo Strozzi 1998 (first use); reintroduced at the **11 June 2009** SF meetup (Johan Oskarsson; Eric Evans suggested the hashtag). `[P: Fowler bliki]`
- **MongoDB**: 10gen began 2007; launched 2009 ("humongous database"). `[S]`
- CAP told honestly: Brewer 2000 → Gilbert & Lynch 2002 → Brewer's own 2012 correction. `[S]`
- The correction: **"One Size Fits All," Stonebraker & Cetintemel, ICDE 2005**; **Spanner, OSDI 2012**; "NewSQL" label ~2011. `[S]` `[!]` on NewSQL's exact origin.

**1.3 Three-tier and application servers (1990-2002)**
- Two-tier's flaw: business logic on every client → every rule change means a mass redeploy (the "fat client" problem).
- **SAP R/3 shipped 6 July 1992** — the "3" *is* the three-tier design. `[S]`
- Name in print: Eckerson, *Open Information Systems*, **Jan 1995** (secondhand citation, original not reverified). `[!]`
- Vendor claim worth teaching as a claim, not a fact: Kagermann (SAP), 1999/2000 — "We invented the three-tier client server architecture." `[S]`
- App-server category: **Kiva, Jan 1996** (claims first); NetDynamics 1995; by **1998** all acquired (HP/Sun/Netscape/BEA); **J2EE Dec 1999**; .NET 2002. `[S]`
- Why it stuck: the browser arrived as a free, universal presentation tier.

**1.4 SOA, CORBA/DCOM/SOAP — and the collapse (1991-2009)**
- **CORBA 1.0 Oct 1991; 1.1 Feb 1992; 2.0 Aug 1996** (OMG's own history). `[P]`
- **COM 1993** (OLE 2) `[!]`; **DCOM 1996** (NT 4.0; spec May 1996). `[S]`
- **SOAP 1.1 W3C Note 8 May 2000; WSDL 1.1 Note 15 Mar 2001; UDDI 2000**; lineage back to XML-RPC 1998. `[P]`
- **SOA the term = Gartner 1996** (Schulte & Natis; April vs October disputed `[!]`) — the name arrived before the tooling.
- Why it lost favour: heavy WS-*/WSDL contracts; ESB re-centralisation (Webber's "Erroneous Spaghetti Box," 2006/08); procurement overhead; **Manes, "SOA is Dead; Long Live Services," 5 Jan 2009** ("survived by its offspring"); REST already the lighter default (owned by the Web chapter, not repeated here).

**1.5 Microservices, cloud, containers — and the walk-back (2006-2023)**
- **AWS: S3 14 Mar 2006; EC2 beta Aug 2006** — infrastructure becomes an API. "Cloud computing" the term is older (1996 Compaq internal doc `[!]`), ordinary usage follows Schmidt's 2006 use. `[S]`
- **Netflix**: 2008 database-corruption outage → cloud migration → complete Feb 2016 `[!]` on exact date; Cockcroft called the result **"fine-grained SOA"** — practice before name. `[P]`
- Team rules: two-pizza teams (early 2000s; Amazon itself doesn't date it `[!]`); "you build it, you run it" — Vogels, ACM Queue, May 2006. `[S]`
- **The naming arc `[P]` (Fowler & Lewis, 25 Mar 2014, footnote 1)**: term discussed at a Venice-area workshop **May 2011**; name fixed **May 2012**; Lewis presented it at 33rd Degree Krakow **Mar 2012**; article published **25 Mar 2014**. Their own words: "we do not claim… novelty" — named *after* the practice already existed, same pattern as REST.
- Containers lineage: chroot 1979 → jails 2000 → Linux VServer 2001 → Solaris Zones 2004 → cgroups 2007 → LXC 2008 → **Docker demo 15 Mar 2013** (PyCon) `[!]` (one secondary source says 20 Mar).
- **Kubernetes**: first commit 6 Jun 2014; announced June 2014 `[!]` on the exact day; 1.0 release plus **CNCF founding 21 Jul 2015**. `[S]`
- **Walk-backs** (Amazon Prime Video's 2023 monolith reversal deliberately excluded here — it's already a canonical citation elsewhere in this project, used for a different point; do not re-cite it for this):
  - **Fowler, "MonolithFirst," 3 Jun 2015**: "almost all the successful microservice stories have started with a monolith… almost all… from scratch… ended up in serious trouble." `[P]`
  - **Tilkov, "Don't start with a monolith," 8 Jun 2015** — a documented, respectful counter-case to Fowler. `[P]`
  - **Segment, "Goodbye Microservices," 10 Jul 2018** (Alexandra Noonan): 140+ services collapsed to 1; causes named as version drift, scaling-tuning overhead, on-call burden, test fragility; costs conceded openly. The best-documented reversal for a beginner audience. `[P]`
  - **Istio, "Introducing istiod," 2020**: its own control plane "was built from the start as a set of microservices," later consolidated into one binary. `[P]`

**1.6 Authentication (1973-2015)**
- Unix stored plaintext passwords first. The origin story of hashing is inside the primary source itself `[P]`: the early-1960s **CTSS incident** — two administrators' temporary editor files were swapped by a design error, so "the password file was printed on every terminal when it was logged in" (Morris & Thompson, 1979).
- Attackers' own arithmetic `[P]` (same paper): about **1.25 ms per trial** on a PDP-11/70; of **3,289 real passwords, 2,831 (86%)** were guessable; a dictionary run took about 5 minutes.
- **The 1979 redesign** `[P]`: DES with an 8-character key, **25 iterations**; a **12-bit salt** (×4,096 multiplier against precomputed tables); a modified E-table blocks off-the-shelf DES chips; equal timing for invalid usernames so the check can't be timed. Morris & Thompson, CACM 22(11), Nov 1979 (received Aug 1978).
- **crypt(1)** (Unix V3, Feb 1973; a file-encryption tool) is a *different* program from **crypt(3)** (the password-hash function) — a real, easy conflation. Which Unix version first shipped salting (V6 vs V7) is disputed `[!]`.
- **bcrypt**: Provos & Mazieres, USENIX **Jun 1999**, OpenBSD — introduced the cost **dial**, a parameter meant to be turned up as hardware gets faster. `[P]`
- **OAuth** `[P]` (per oauth.net's own history): informal start ~**Nov 2006** (Blaine Cook at Twitter, with Chris Messina); Google group opened Apr 2007; first draft Jul 2007; **Core 1.0 final draft 3 Oct 2007**; **RFC 5849 Apr 2010**; **RFC 6749 (OAuth 2.0) Oct 2012**. Eran Hammer-Lahav's July 2012 resignation as lead author/editor, and his "Road to Hell" post, is the standards-politics beat worth telling. `[S]`
- **Argon2**: the Password Hashing Competition was announced 2013; Argon2 won **20 Jul 2015** (Biryukov, Dinu, Khovratovich); standardized as RFC 9106 in 2021. This chapter stops at the origin story — OWASP's current Argon2id recommendation is already Stage 1's citation, not re-derived here.
- Lesson thesis: every boundary this saga draws creates a new trust question — one machine, then a campus, then a third-party app. Saltzer & Schroeder's 1975 "never trust the client" is already cited elsewhere in this project — not re-derived here, only not contradicted.

## 2. How strong sources sequence this material

- **Booch** (*IEEE Software*, 2018, read directly `[P]`): sequences by era-plus-force (a pressure, then the response to it), person-anchored throughout; its own lineage line lands on Shaw & Garlan and calls COM/CORBA/DCOM "the predecessors of today's microservice architecture." Contains its own misdate — it places UML as an OMG standard "in 1987" when the real date is 1997 `[!]` — worth keeping as a "even strong sources misfire" beat rather than silently correcting and moving on.
- **The discipline's own self-history**: a late-1960s comparison to civil architecture (echoed in the 1968 NATO Software Engineering report) → the term stays uncommon until the **1990s** (per Kruchten, Obbink & Stafford, 2006) → codification follows (Perry & Wolf, 1992; the first dedicated workshop, Seattle, Apr 1995; Shaw & Garlan's 1996 textbook; IEEE 1471 standardized in 2000). The taught sequence is consistently **practice, then a name, then a standard** — which is this chapter's own spine, repeating the pattern REST and microservices both already demonstrate individually.
- **Institutional/textbook tradition** (the SEI, founded 1984; Bass/Clements/Kazman's textbook) teaches concept-first and quality-attribute-first. The **modern trade-off-first** school (Richards & Ford, 2020: "everything in software architecture is a trade-off") teaches it differently. Fowler's own bliki teaches retrospectively and deliberately links to counter-arguments from other authors (e.g., linking Tilkov's rebuttal from his own MonolithFirst post). None of these sources teaches this history chronologically to a total beginner — the same gap cluster 5 found for Hoare and Parnas — which is this chapter's actual reason to exist.

## 3. Story/analogy hooks

1. **The password file that printed itself on every terminal.** Told in Morris and Thompson's own 1979 paper: the origin of password hashing traces back to an early-1960s CTSS accident where a design error caused the plaintext password file to print on every logged-in terminal at once.
2. **"The Programmer as Navigator" versus a promise to make navigation unnecessary.** Bachman's own 1973 Turing lecture title, set against Codd's opening line that users "must be protected from having to know how the data is organized in the machine" — the relational shift told as one person naming the very problem another had just solved by hand.
3. **A name decided in Venice.** Microservices were discussed at a workshop in May 2011, the name was fixed a year later, and the defining article wasn't published until March 2014 — after years of real practice. Within months, the people who named it publicly questioned it (Fowler's "MonolithFirst," June 2015). Named after it already existed, then walked back almost immediately — the same beat this project's Web chapter already uses for REST.

## 4. Structural recommendation (placement superseded — see frontmatter and record §17.2)

**Six lessons, told as one saga per question asked across the whole 1964-2023 span** (this part of the recommendation stands):

1. **One machine does it all** — the monolith era and the first split (1964-1990: the System/360 word, remote job entry, PCs and LANs, RPC in 1984, NFS and X in 1984, Sun's slogan, the fat-client bill that eventually comes due).
2. **Where the data lives** — navigation, then relations, then web scale (1966-2012+: IMS and the Moon-program origin, CODASYL, Bachman, Codd's three dependencies, the race to SQL, the 1986/87 standard, then Bigtable/Dynamo/the NoSQL meetup/CAP, closing on "One Size Fits All" being declared dead from both directions and Spanner's answer).
3. **The middle** — tiers and application servers (1990-2002: the redeploy pain that motivated it, SAP R/3 in 1992, the app-server land rush, the browser arriving as a free universal client, Kagermann's invention claim told as a claim rather than a fact).
4. **Everything a service** — CORBA/SOAP/SOA and its collapse (1991-2009: the middleware wars, the W3C Notes, Gartner naming SOA in 1996, the ESB backlash, "SOA is Dead" in January 2009).
5. **Shipping alone** — cloud, containers, microservices, and the walk-back (2006-2023: AWS, Netflix's migration, the Venice-to-2014 naming arc, Docker/Kubernetes/the CNCF, "make deployment boring," MonolithFirst versus Tilkov, Segment's reversal, istiod).
6. **Who gets in** — passwords, hashes, and delegation (1973-2015: the CTSS accident, the 1979 redesign, bcrypt's dial, OAuth, Argon2 — closing on the idea that every wall this saga built needed its own door).

A leaner 3-lesson alternative exists (merge 1+2+3, merge 4+5, keep 6) but costs either the database saga or the SOA story — six is the recommendation.

**Boundary rules to hold regardless of final placement:** don't re-tell REST/Fielding (the Web chapter's own capstone); don't re-derive Saltzer & Schroeder; don't cite Amazon Prime Video's 2023 reversal (already ledger-owned elsewhere, for a different question); don't teach OWASP/Argon2id settings or SQL-vs-NoSQL practical tradeoffs (that's Stage 1's job); don't re-teach Parnas's paper itself (the concurrent-cluster chapter owns it). If Codd 1970 is reused here, it must ask a genuinely different question than Stage 1's existing use ("what forced the relational model into existence?") — this chapter's version is closer to "why did navigation come first, and why did NoSQL come after SQL rather than before?"

**Note on placement, for whoever drafts this next:** this research's own recommendation was to open Phase B with this chapter (right after the Web chapter), reasoning that the thread otherwise ends (~2018-2023) before the AI-history pair and "how the way of working evolved" wants the structural thread told first. The project owner instead placed this chapter at position 9, immediately before Spec-Driven Engineering, because the owner's own requirement was that this material forms the reader's complete conceptual map immediately before Stage 1 begins — a constraint this research pass didn't have visibility into. Both are legitimate reasons; the owner's placement stands as decided (record §17.2), but the tension is recorded here rather than silently dropped, since Phase B's own chapters already establish that a later thread-evolution chapter can end past an earlier one's timeline (Terminals and Editors already both run to the present before the AI chapters do the same).

## 5. Sources

**Primary, read directly:** [Morris & Thompson 1979](https://rist.tech.cornell.edu/6431papers/MorrisThompson1979.pdf) · [Codd 1970](https://web.eecs.umich.edu/~michjc/eecs584/Papers/codd_1970.pdf) · [Fowler & Lewis, Microservices](https://martinfowler.com/articles/microservices.html) · [Fowler, MonolithFirst](https://martinfowler.com/bliki/MonolithFirst.html) · [Tilkov, Don't start with a monolith](https://martinfowler.com/articles/dont-start-monolith.html) · [Segment/Twilio, Goodbye Microservices](https://www.twilio.com/en-us/blog/developers/best-practices/goodbye-microservices) · [Istio, Introducing istiod](https://istio.io/latest/blog/2020/istiod/) · [OMG, History of CORBA](https://www.omg.org/gettingstarted/history_of_corba.htm) · [OAuth.net introduction](https://oauth.net/about/introduction/) · [NFS@40](https://nfs40.online/) · [Booch 2018](https://ieeecs-media.computer.org/media/marketing/cedge_newsletter/ce9boo.pdf) · Wikipedia: [Client-server](https://en.wikipedia.org/wiki/Client%E2%80%93server_model), [Software architecture](https://en.wikipedia.org/wiki/Software_architecture), [Crypt (Unix)](https://en.wikipedia.org/wiki/Crypt_(Unix)).

**Primary, linked but not fully read:** [SOAP 1.1 Note](https://www.w3.org/TR/2000/NOTE-SOAP-20000508/) · [WSDL 1.1 Note](https://www.xml.coverpages.org/ni2001-03-15-c.html) · [S3 press release](https://press.aboutamazon.com/2006/3/amazon-web-services-launches) · [EC2 Beta blog](https://aws.amazon.com/blogs/aws/amazon_ec2_beta/) · [CNCF launch](https://www.cncf.io/announcements/2015/06/21/new-cloud-native-computing-foundation-to-drive-alignment-among-container-technologies/) · [bcrypt USENIX paper](https://www.usenix.org/conference/1999-usenix-annual-technical-conference/future-adaptable-password-scheme) · [Password Hashing Competition](https://www.password-hashing.net/) · [RFC 9106](https://www.rfc-editor.org/rfc/rfc9106.html) · [Bigtable paper](https://www.usenix.org/conference/osdi-06/bigtable-distributed-storage-system-structured-data) · [Dynamo paper](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf) · [Spanner paper](https://www.usenix.org/system/files/conference/osdi12/osdi12-final-16.pdf) · [One Size Fits All](https://dl.acm.org/doi/abs/10.1109/ICDE.2005.1) · [IBM IMS history](https://www.ibm.com/docs/en/zos-basic-skills?topic=now-history-ims-beginnings-nasa) · [SIGMOD CODASYL reports](https://sigmod.org/publications/anthology/vol6/codasyl.htm) · [Bachman lecture text](https://people.csail.mit.edu/tdanford/6830papers/bachman-programmer-as-navigator.pdf) · [Birrell & Nelson](http://birrell.org/andrew/papers/ImplementingRPC.pdf) · [Open Group SQL history](https://archive.opengroup.org/public/tech/datam/sql.htm) · [Linux Foundation, container roots](https://www.linuxfoundation.org/blog/blog/a-brief-look-at-the-roots-of-linux-containers) · [Docker "Nine Years Young"](https://www.docker.com/blog/docker-nine-years-young/) · [MongoDB "Our Story"](https://www.mongodb.com/company/our-story) · [SEI history](https://www.sei.cmu.edu/history-of-innovation/) · [Garlan & Shaw, SEI introduction](https://www.sei.cmu.edu/library/an-introduction-to-software-architecture/).

**Strong secondary/teaching:** [InfoWorld on SOA's "obituary"](https://www.infoworld.com/article/2314984/burton-group-soa-is-dead-long-live-services.html) · [Eran Hammer-Lahav, "Road to Hell" (archived copy)](https://gist.github.com/nckroy/dd2d4dfc86f7d13045ad715377b6a48f) · [Cloudflare on John Gage's slogan](https://blog.cloudflare.com/john-gage/) · [The Register, 50 years of SQL](https://www.theregister.com/software/2024/05/31/codd-almighty-has-it-been-50-years-of-sql-already/) · plus Richards & Ford (2020), Bass/Clements/Kazman, Newman's microservices books, Crash Course Computer Science, and Nand2Tetris (already surfaced by earlier clusters in this project).

## 6. Genuinely disputed between sources

- **NFS's start date**: 1983 (Sun's own NFS@40 archive) vs. 1984 (the more commonly cited standard date) — safest phrasing is "designed 1983-84, shipped 1984-85."
- **Docker's demo day**: Docker's own blog post says 15 March 2013; one secondary source says 20 March (PyCon 2013 ran 13-21 March, so both fall inside the same conference).
- **Kubernetes's announcement day**: June 2014 is certain; the exact day is only secondary-sourced.
- **MongoDB's 1.0 release**: August 2009 per MongoDB itself vs. 11 February 2009 per one aggregator — safe to print just "2009."
- **COM's start date**: 1993 per most standard accounts vs. Microsoft's own looser "early 1990s."
- **SOA term's exact month**: April vs. October 1996 — the year 1996 itself is not in dispute.
- **The claim that IBM delayed the relational model to protect IMS revenue**: widely repeated online, denied by IBM — use a performance-and-implementation framing instead of a motive claim.
- **crypt(3)'s salting's first shipped release**: Unix V7 (1979) per one source vs. earlier two-character salting per others — worth a direct TUHS (Unix source archive) check before this date is printed in prose.
- **Amazon's "two-pizza teams" and its 2002 API mandate**: Amazon itself has never officially dated the rule; the mandate account rests on a leaked 2011 post by Steve Yegge, not an Amazon source — hedge both claims.
- **"Cloud computing" as a term**: a 1996 internal Compaq document vs. a 1997 Chellappa paper vs. Eric Schmidt's 2006 usage as the point it became mainstream — these are different claims (coinage vs. popularization) and should not be conflated.
- **Booch's 2018 essay misdates UML as becoming an OMG standard "in 1987"** — the real date is 1997. Don't inherit this error even though Booch is otherwise a strong source.
- **Flagged but not independently verified**: the "NewSQL" label's exact origin (often attributed to 451 Research, 2011); Eckerson's original 1995 text (only found secondhand); Kiva's "first application server" claim; Netflix's own "February 2016" cloud-migration-complete date.
