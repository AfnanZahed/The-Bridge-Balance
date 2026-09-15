---
sidebar_label: "5. Databases"
sidebar_position: 6
title: "The Last Seat: Databases, Constraints, and Data That Outlives the Page"
description: "One row, one cap, and the thirty-first sign-up that must not get in — how a constraint the database enforces, wrapped in a transaction, ends the last-seat race, and how to choose between relational, document, key-value and graph stores."
keywords: [database, SQL, PostgreSQL, primary key, foreign key, constraint, transaction, ACID, isolation level, index, migration, MongoDB, Redis, Neo4j, graph database]
chapter_state: "text-ready"
video_url: ""
scope_multiplier: 1.5
scope_reason: "one database layer where the last-seat race, the constraint that ends it, the query and index cost underneath it, and the four store families it competes with all interlock around a single cap that must hold under concurrent writers."
---

# The Last Seat: Databases, Constraints, and Data That Outlives the Page

You have met the race for the last seat before. The architecture map in the intro put two taps against one seat, and the Spec-Driven Engineering chapter left the race open on purpose. It said: decide what happens when the thirtieth seat is claimed. This chapter is where that decision is enforced in the one place a race can actually be stopped — the database.

The fix is not a better check in the backend code. Two taps can arrive so close together that neither request sees the other's work, and a check that runs before a write can always be outrun. The fix is to hand the rule to the database as a **constraint** — a rule the storage engine itself will not let you break — and to wrap the check and the write in a **transaction**, so they happen as one step. That is the whole chapter. Everything else is the machinery that makes it real.

## The word that does the work

Take the word apart before the mechanism arrives. *Constraint* comes from Latin *constringere*: *con-*, meaning together, plus *stringere*, meaning to draw tight. To constrain is to bind tight. The word has meant that since it entered English in the late 1300s, first as a name for distress and compulsion, then for anything that holds you inside a limit.

So here is the guess the word invites. A constraint sounds like a restriction — a rule that gets in your way, slows you down, and exists mostly to make the work harder. Most people, asked what a database constraint is for, describe a nuisance: something that rejects their data and makes them fix it.

Hold that guess. It is the guess this chapter tests, and it is wrong in a useful direction.

## The sheet with thirty lines

Picture the low-technology version of this page. The club room has a sign-up sheet pinned to the wall. Thirty numbered lines, and a pen on a string. A student walks in, finds the last empty line, and writes their name. Two students arrive together, reach for line thirty, and collide. One of them sees the ink already there and stops. If both write at once, two names sit on one line where everyone can see them, and a person sorts it out before it matters.

That is the nearest thing you already hold: one sheet, one pen, one line, and everyone looking at the same piece of paper. The database is the same sheet, with one difference that changes the design. There is no shared paper. Each writer works on a private copy of the page, sees only the ink they put there, and no copy shows the others until later. Two students can both find line thirty empty, because neither copy ever showed the other's signature.

## The shared store, and the files it replaced

The store this chapter uses for its examples is **PostgreSQL** — an open-source relational database, one that keeps data in tables. It began as the POSTGRES project at the University of California, Berkeley, led by Michael Stonebraker, with work starting in 1986. It is still maintained by the PostgreSQL Global Development Group and released on an annual schedule; the current stable version is PostgreSQL 18, with version 19 in beta as of September 2026. The canonical account is the project's own documentation, and it is the source for every SQL statement below.

Databases are not a recent idea, and it is worth knowing the problem they were built to end. Before a shared store existed, every program kept its own data in its own file. That works for one program. It fails the moment two programs need the same fact.

The club makes the failure concrete. The sign-up page keeps a list of who joined. The reminder job keeps its own list. The treasurer's spreadsheet keeps a third. A student changes their email address on the page, and now three files disagree about who that student is. Nothing crashes, and nothing warns you. The wrong file answers with full confidence, and you find out weeks later when reminders go to an address that no longer exists.

The deeper problem was that each program had to know how its file was arranged on disk. Change the arrangement, and every program that read it broke. In 1970, Edgar Codd, a researcher at IBM, published a paper arguing against that whole approach. Programs should describe data by its natural structure, he wrote, and be protected from having to know how it is stored. His answer was the **relational model** — data held as tables of rows and columns, described by its own logic rather than by a file layout.

IBM built an early relational system called System R. Two of its engineers, Donald Chamberlin and Raymond Boyce, wrote a language to ask it questions in 1974. They called it SEQUEL, for Structured English Query Language; a trademark clash shortened it to **SQL** — the language you ask a relational database questions in. Codd's model and that language are why a club sign-up sheet today is one shared table rather than three files that quietly disagree. But a shared store solves only half the problem. It gives everyone one copy of the truth. It does not, by itself, keep that copy true.

## What a table is, and what a rule is

A **table** is a named grid. Its **columns** are the named, typed slots; its **rows** are the entries. A row is one record — one student, one signup. Every column has a **data type**, the kind of value it may hold, so a `joined_at` column accepts a timestamp and rejects the word *Tuesday*. The written list of a table's columns and their types is its **schema**, the same word the CSV export used in the intro, now applied to the store.

Two columns carry outsized weight. A **primary key** is the column, or set of columns, that uniquely names each row; no two rows may share one, and it may never be empty. A **foreign key** is a column whose values must match a primary key in another table. That is the mechanism behind a **relationship** — how one table points at another instead of repeating the same data on every row. A `signups` row holds a `club_id`; that number must match a real row in the `clubs` table, and the database checks it.

Now the word from the start. A **constraint** is a rule the storage engine checks at the moment of writing, inside the database itself. A foreign key is one. `NOT NULL`, which refuses an empty value, is another. A **unique constraint**, which refuses a duplicate, is a third. A **check constraint** is a rule you write yourself, like *the number of seats taken may never pass the cap*.

That last one is the answer to the race, and it is worth being exact about why.

A check in your backend code runs *before* the write. It reads a value, decides, and then sends a write. Between the reading and the writing, another request can slip through the same gap, and your check never sees it. A constraint has no gap. The database evaluates it at the instant the row is written, against every row already there, under every concurrent writer. You cannot skip it, race it, or forget to run it. It is the rule, and it is not yours to run. It is the store's.

### The guess, scored

So the guess was half right. A constraint does restrict you. It does refuse data. What it is *for* is the part the guess missed.

A constraint is not there to slow the careful developer down. It is there for the case where the careful developer is not the only writer. It holds when your code has a bug, or when a second copy of the backend is running. It holds when a script from last year still writes to the same table, or when a colleague runs a fix at midnight. In all of those cases the code check is absent or wrong. The constraint is present anyway, because it lives with the data, not with the writer.

That is the inversion. A code check is a guard you build and hope holds. A constraint is a boundary the store enforces for you. The first is yours to remember. The second you cannot forget.

## The smallest table that works

Start with the shape the club page needs. Two tables, one holding clubs and one holding signups.

```sql
CREATE TABLE clubs (
  id          integer PRIMARY KEY,
  name        text NOT NULL,
  seat_cap    integer NOT NULL,
  seats_taken integer NOT NULL DEFAULT 0
);

CREATE TABLE signups (
  id         bigint GENERATED ALWAYS AS IDENTITY
             PRIMARY KEY,
  club_id    integer NOT NULL REFERENCES clubs(id),
  student_id integer NOT NULL,
  joined_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (club_id, student_id)
);
```

Read it once, plainly. `clubs` has an `id` that names each row, a `name`, a `seat_cap`, and a running `seats_taken`. `signups` has its own `id`, a `club_id` that must point at a real club, a `student_id`, and a timestamp. The `UNIQUE (club_id, student_id)` line is a constraint too: it stops one student holding two signups in the same club, however many times the button is tapped.

Four small statements cover almost everything the page does. `INSERT` adds a row. `SELECT` reads rows. `UPDATE` changes a row. `DELETE` removes one.

```sql
INSERT INTO signups (club_id, student_id)
VALUES (1, 42);

SELECT student_id FROM signups
 WHERE club_id = 1;

UPDATE signups SET student_id = 43
 WHERE id = 9;

DELETE FROM signups WHERE id = 9;
```

Reading the list with names means joining two tables, because the name lives in `clubs` and the signup lives in `signups`. A **JOIN** matches rows from two tables on a shared column. Read it as a sentence: for each signup, find the club whose `id` matches that signup's `club_id`, and print both.

```sql
SELECT c.name, s.student_id, s.joined_at
  FROM signups AS s
  JOIN clubs   AS c ON c.id = s.club_id
 ORDER BY s.joined_at;
```

A JOIN is not a separate language. It is the match a foreign key already guarantees is possible, written out for the query planner. Where the keys line up, the join lines up.

## The same page, broken

Now break it, honestly, the way it is usually built first. The obvious backend logic reads the count, compares it to the cap, and only then inserts.

```sql
-- the version that ships the bug
SELECT seats_taken FROM clubs WHERE id = 1;
-- the code then decides: under 30? go ahead
UPDATE clubs SET seats_taken = seats_taken + 1
 WHERE id = 1;
INSERT INTO signups (club_id, student_id)
VALUES (1, 42);
```

Two taps arrive together. Both requests run the first line and both read `29`. Both decide there is room. Both bump the counter, first to `30`, then to `31`. Both insert a row. The club is over capacity, and nothing raised an error. The page shows a full club and a thirty-first student. The check and the write were two separate moments, and the gap between them is exactly where the second request lived.

This is the race the earlier chapters named and refused to solve. There is no correct moment to read. The count is true only until the next write, so reading it more carefully cannot help.

## One step, not two

The fix has two parts, and they do different jobs.

First, move the rule into the data as a constraint. The cap becomes something the club's own row cannot violate.

```sql
ALTER TABLE clubs
  ADD CONSTRAINT seats_within_cap
  CHECK (seats_taken <= seat_cap);
```

Second, stop checking and writing as two separate acts. Make the check and the write the *same* statement, inside a transaction.

```sql
BEGIN;

UPDATE clubs
   SET seats_taken = seats_taken + 1
 WHERE id = 1
   AND seats_taken < seat_cap;

-- zero rows changed: the club is full, so stop.
INSERT INTO signups (club_id, student_id)
VALUES (1, 42);

COMMIT;
```

Read what changed. There is no separate `SELECT`. The `WHERE` clause — *only if the club still has room* — is evaluated in the same statement that does the writing. The database locks that one row for the moment it takes to update it, so a second request for the last seat waits its turn. When it finally runs, the row already reads `30`, the `WHERE` no longer matches, and zero rows change. The second student is refused, cleanly, with the counter never passing the cap.

The `CHECK` constraint is the backstop under all of it. If a future code path forgets the `WHERE` clause, or a script writes to this table directly, the database refuses the bad row outright. The rule holds whether or not any particular piece of code remembers it.

Then the transaction makes the two writes one unit. `BEGIN` opens it; `COMMIT` closes it. Everything between them succeeds together or fails together. The counter bump and the signup row are never allowed to split. You cannot have signup 42 counted but not stored, or stored but not counted.

That all-or-nothing property has a name: **atomicity**, the A of **ACID**. The four letters describe what a transaction promises. **Atomicity**: all the statements happen, or none do. **Consistency**: the database moves only between states that obey its constraints. **Isolation**: concurrent transactions do not see each other's half-finished work. **Durability**: once committed, the change survives a crash. Andreas Reuter and Theo Härder coined the acronym in a 1983 paper, *Principles of Transaction-Oriented Database Recovery*. Those four promises are why the last seat can be made safe at all.

### Where the two requests actually wait

The row lock is the part worth slowing down on, because it is both why the fix works and why it can cost you.

Suppose the second request arrives a millisecond after the first. It runs the same `UPDATE`. The database sees that the first transaction holds a lock on that club's row, so the second statement pauses. It does not read stale data and proceed; it waits. When the first transaction commits, the second wakes, re-reads the row to see the committed value, and checks its own `WHERE` clause against it. The seat is gone, so the condition fails and zero rows update. PostgreSQL's default isolation level — **Read Committed**, which re-reads a row that changed since the statement began — is exactly what makes that re-check safe.

The cost is real, and it is the honest trade. Two signups for the same row are no longer concurrent; they are serial. For a club page, that wait is invisible — it lasts as long as one short update. For a counter that thousands of requests hit at once, that same lock becomes a queue, and the queue is where throughput goes to die. The fix is correct. Whether it is *fast* depends on how many writers contend for the same row.

## Where it sits, and what breaks with it

The database is the bottom layer of the club page. Above it, the backend receives the tap and runs the code. The database answers only the backend, over a **connection** — a private line a program opens to send it SQL. It does not call the backend, it does not know the club page exists, and it does not care who asked.

That position is the whole reason the cap belongs here. The intro's rule was that the frontend can never be trusted to enforce anything, because the student controls it. The same logic reaches one rung down, and this is the **Stage 1** chapter where that rung is built. The backend can be trusted more than the frontend, because you run it. But you may run two copies of it at once. A deploy may run an old and a new version side by side for a minute, and a bug can slip past any code check. The constraint sits below all of that, on the one machine whose whole job is the data.

The blast radius is the widest in the stack, and the least forgiving. Lose the backend and sign-ups pause. Lose the database and every signup taken so far is gone, along with the constraint that held the cap. A restored club page over an empty table is a club with no members. Two quieter failures matter as much. A constraint set too tight rejects honest signups: a cap of 30 on a club that should hold 32 turns real students away, and nothing on the page explains why. A constraint that is missing admits the thirty-first student silently, which is the failure this chapter exists to prevent.

## What an index costs

The club grows, the queries slow down, and the first fix anyone reaches for is an **index**. An index is a separate, sorted structure the database keeps beside a table, so it can find rows without reading every one.

Take a table of one million signups and ask for one student's row. With no usable index, the database reads all one million rows to find the match — a **sequential scan**. With a **B-tree** index on the column, it walks a balanced tree instead. The B-tree is PostgreSQL's default index type, and it is kept in sorted order. It reaches any row in about twenty steps, because a million is roughly two to the twentieth power. Twenty reads against a million is the entire reason indexes exist.

It is not free, and the price is paid on the other side. The index is a second copy of the column, kept sorted, so it takes disk space the table already needed. And every `INSERT`, `UPDATE` and `DELETE` must also update the index, so writes get slower in exchange for faster reads. A read-heavy page is a good place for an index. A table taking thousands of writes a second is where an index quietly becomes a tax.

The alternative to an index is not "no cost". It is a scan that grows with the table. This is the shape of the slow query worth recognising: it was fast at a hundred rows and slow at a hundred thousand, nothing in the code changed, and the cause is a `SELECT` the database can only answer by reading everything.

### What a slow query looks like

PostgreSQL will tell you what it plans to do before it runs. Prefix a query with `EXPLAIN ANALYZE` and it prints the plan: whether it will scan the table or use an index, how many rows it expects, and where the time went. A plan that says `Seq Scan` on a large table is the signature of a missing index, and the plan is the first place to look when a page that used to be fast is not.

```sql
EXPLAIN ANALYZE SELECT student_id
  FROM signups WHERE club_id = 1;
```

## The schema does not stand still

The club adds a field, so the table has to change. The database will not let you edit stored rows into a new shape by hand; the shape itself is defined once, in the schema, and changing it is its own operation.

```sql
ALTER TABLE signups ADD COLUMN note text;
```

That statement is a **migration**: a recorded, ordered change to the schema, kept as a file alongside the code. Its purpose is repeatability. Your laptop, your teammate's machine, and the live server must all end up with the same columns in the same order. A migration file is how that happens without anyone retyping `ALTER TABLE` from memory and getting it subtly different.

A migration is not the same thing as the version-control workflow that carries it. The part this chapter owns is narrower. It is the change itself, why the schema moves at all, and why every move must be written down and applied in order. A change performed ad hoc on whatever database you happen to be looking at is not a migration. Skip the record and two environments drift apart, and the drift stays invisible until a query that works on your machine fails on the server.

## Choosing a store

Relational tables are not the only shape, and the choice is a real design decision rather than four brands of one thing. Each family below earns its place by the specific problem it removes.

**MongoDB** is a **document store**. It holds flexible bundles called **documents**, closer to JSON than to a row. Reach for it when the shape genuinely varies from entry to entry — one signup carries a home address and another does not — and when the whole bundle is read and written as a unit. It was built by the company 10gen from 2007, and its name is short for *humongous*. The current stable release is the 8.3 series as of September 2026. The trade is that the store enforces less: a shape free to vary is a shape nothing can guarantee.

```javascript
db.signups.insertOne({
  club: "AI Club",
  student: "Alex",
  joined: new Date()
})
```

**Redis** is a **key-value store** held entirely in memory, so it answers in microseconds and forgets everything on restart unless it is told to persist. Reach for it as a fast copy in front of the real store — a cache — or for short-lived things like a one-time login code. It exists because of a gap measured in orders of magnitude. A read from memory takes about 100 nanoseconds; a random read from a solid-state drive about 100 microseconds; a seek on a spinning disk about 10 milliseconds. That is roughly a thousand times slower from memory to flash, and a hundred thousand times from memory to a spinning disk. Redis lives in the fastest of those tiers. Its makers' own benchmark in 2019 put a single Redis Enterprise cluster at 200 million operations per second, with latency under one millisecond. That speed is exactly why the seat cap must *not* be enforced from Redis: a cache is a copy, and a copy can be stale.

```text
SET club:1:seats_taken 30 EX 60
GET club:1:seats_taken
```

**Neo4j** is a **graph database**. It stores data as nodes and the named edges between them. Reach for it when the question is about the shape of the connections — the shortest route through a network, or a friend of a friend three hops away — and a relational query would need a join for every hop. Its query language, Cypher, was written largely by Andrés Taylor in 2011 and is now moving toward an international standard.

```cypher
MATCH (a:Student {name: 'Alex'})-[:FRIEND]->(b:Student)
WHERE b.club = 'AI Club'
RETURN b.name;
```

### When to reach for which

The decision rule is the data's own shape, not the store's reputation.

Reach for a **relational** store when the data has a stable shape and its relationships matter — signups under clubs, orders under customers — and when you want the database to enforce those relationships for you. It is the default for a reason. Most everyday data has a shape, and the shape is a feature: it is what lets the store refuse the wrong row.

Reach for a **document** store when one entry's shape genuinely differs from the next, and the whole bundle is always read whole. Reach for a **key-value** store when you need a fast copy, not a source of truth. Reach for a **graph** store when the interesting question is about the connections between things rather than the things themselves.

The obvious choice is wrong in one place, and it is the newest-looking option. Reaching for a flexible, schema-free store because it feels faster to start is usually a mistake. The flexibility you gain is the enforcement you lose, and the seat cap is exactly the kind of rule you wanted enforced. The opposite mistake is trusting a cache with a rule. Redis can hold the count for the *display*. The database must hold the count that *decides*.

The failure has early symptoms, and they are quiet. A query that slows as the table grows is a missing index. A number on a page that disagrees with the number in the table is a stale cache. A constraint that starts rejecting good data means the rule is wrong, not the data. And a migration that runs for minutes on a large table is a sign the change is rewriting more than it needs to.

## The part the agent cannot decide for you

Every line above, an agent can draft in a minute: the two tables, the four statements, the join, even the migration file. That is real leverage, and refusing it is the first way to get this chapter wrong. Hand-write every key and index yourself, and you spend a weekend rebuilding what the tool already wrote — and still ship the race, because the race lives in the concurrency you never tried.

The second way to get it wrong is the opposite. Accept the whole thing unread, and you ship the obvious version, the one that reads the count and then inserts. It passes every test on the happy path, because one student tapping one button never touches the gap. The bug stays invisible until the club is full and two students tap together, which is the case nobody scripted.

AI has made the implementation cheap. It has not made the decisions cheap. Which rule must be a constraint, and what to run to prove it holds, are still yours. The move between the two failures is the one Spec-Driven Engineering named, and it is short. Specify the rule: the cap is 30, and no thirty-first signup may be stored. Bound it in the data: the rule becomes a `CHECK` constraint, not a hopeful check in the backend. Verify it under real conditions: open two connections and try to claim the last seat twice, then read the row count. Own the result: when it holds, it is yours, and "the agent generated the SQL" is not an acceptable answer when it fails.

## Where this line of thinking comes from

The relational thread runs from Codd's 1970 paper, through Chamberlin and Boyce's SQL in 1974, to the ACID promises Reuter and Härder named in 1983. The reaction against all of it has its own birthday. The term **NoSQL** surfaced at a San Francisco meetup on 11 June 2009, organised by Johan Oskarsson, to discuss stores that were not relational. It was later softened from *no SQL* to *not only SQL*, since most of those stores grew SQL-like interfaces anyway.

Two disagreements are still live. One is the isolation level. A serializable transaction removes races by construction, and the standard names it the highest level, but PostgreSQL's default is the weaker Read Committed, because serializable transactions abort and retry under contention. Whether to pay that cost is a real argument, and the people who test databases against it — the Jepsen project, run by Kyle Kingsbury — have found more real-world isolation bugs than any single vendor would like to admit. The other is the NoSQL pendulum itself: the store that was going to replace the table now often sits beside it.

To go deeper, the PostgreSQL documentation is the canonical account, and its transaction-isolation chapter writes out the last-seat race in full. Markus Winand's *Use The Index, Luke* is the clearest writing anywhere on why a query is slow.

<Callout type="info" title="Where this sits">
The architecture map ended on one rule: the frontend can never be trusted to enforce anything, because the student controls it. The database is where that rule bites hardest. It is the one layer that holds when your code is wrong, when a second backend is running, and when a script writes to the table directly. The rules the club truly depends on belong here, in the data, and nowhere above it.
</Callout>

<Callout type="warning" title="Safety floor">
A limit is only real where it cannot be removed. Put the thirty-seat cap, and every other limit the club depends on, inside the database as a constraint. Make the check and the write one transaction. Verify it by running two signups against a full club at the same moment, not by reading the code and believing it. A limit enforced only in the backend breaks the day you run two copies of it. A limit enforced in a cache breaks the first time the cache is stale. Check on the machine that owns the data, before this reaches a real student.
</Callout>

## Before you turn the page

Without looking back, write the three statements of the broken version in order, and say in one sentence where the second student slips through. Then write the fixed version and name the single thing that stops the second student — the `CHECK` constraint, the transaction, or the `WHERE` clause — and say what happens if you keep only two of the three. Finally, answer the guess from the start. A colleague calls a database constraint "friction we work around". Give the case where the constraint is the only thing standing between the club and its thirty-first member.

**Next:** the same instinct leaves one machine behind, where several copies of a store must agree on a single truth, and the last seat has to hold across all of them.
