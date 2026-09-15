---
sidebar_label: "4. Backend"
sidebar_position: 5
title: "The Rule Nobody Can Walk Around: Backend, Endpoints, and Trust"
description: "Two students tap submit at the same instant for the last seat of thirty, both get in, and nobody edited anything. The request the browser sends, the answer it gets back, and every check a correct endpoint makes before it says yes."
keywords: [backend, endpoint, HTTP methods, HTTP status codes, REST resource modelling, request validation, server-side validation, middleware, idempotency key, rate limiting, authentication vs authorization, structured logging, request id, race condition]
chapter_state: "text-ready"
video_url: ""
scope_multiplier: 1.5
scope_reason: "one endpoint has to hold HTTP's method and status-code vocabulary, boundary validation, middleware, idempotency, rate limiting, the authentication boundary and logging all at the same moment, and the last-seat collision ties them into a single arc that deliberately stops short of the database mechanism that closes it."
---

# The Rule Nobody Can Walk Around: Backend, Endpoints, and Trust

The page is the one from the architecture map in the intro: a school AI club, capped at thirty seats, with a form that sends a name and an email. Twenty-nine seats are taken when Ayesha taps. Bilal taps within the same hundred milliseconds. Both screens say confirmed. The next morning the admin list shows two people holding seat number thirty, and a club with thirty-one members.

Nothing was edited to make this happen. The seat check was on the server, exactly where the architecture map put it, after showing how a curious student can delete the same check from the copy running on their own laptop. The rule sat on a machine the students could not reach, and the club still grew past its cap.

That failure is not the trap from the architecture map. That one was about *which machine* runs the rule, and it is settled. This one is about *when* the rule runs relative to the writing, and that question stays open even after the file is on the right machine. The next few thousand words close it as far as an endpoint can, and hand the last step to the chapter on databases.

## The point at the end of a line

**Endpoint** splits into *end* and *point*: one end of a connection, the place where a stream of data stops. That is where networking took the word from, and it still describes the shape. In an API, an endpoint is a method and a path that a server promises to answer — `POST /signups` is one endpoint, `GET /signups/30` is another.

Make the guess the name invites, before reading on. *Endpoint* sounds like an address, and an address is plumbing. A request arrives at it, and the code behind the door decides. If that is what an endpoint is, then moving the seat check to the server has already solved the problem, because the code behind the door runs where a student cannot open it.

Hold that guess. It is close, and it misses by exactly enough to let a club reach thirty-one members. The section on what a correct endpoint checks returns to it and marks it.

## The check you have already moved once

The nearest thing you already hold is that deleted seat check from the architecture map. A student opens developer tools, finds the rule in the page's code, deletes it and submits five hundred times. That chapter ended on one sentence: the frontend can never be trusted to enforce anything.

The seat rule survived that move. What it did not survive is a difference the map never had to face. A browser belongs to one student, and it runs one copy of a check, for one person at a time. A server runs many copies of the same code at the same moment, for everyone on the network at once. The rule is on the right machine now. It is the wrong *shape* for the load it is under, and shape is a different question from location.

## Who decides what an endpoint may mean

HTTP is defined by **RFC 9110**, *HTTP Semantics*, published in June 2022 by the IETF (Internet Engineering Task Force, the body that publishes internet standards), and it fixes what each method and each status code is allowed to mean. Its HTTP Working Group is chaired by Mark Nottingham, who has held that role since 2007. The API style called **REST** came earlier, from Roy Fielding's 2000 doctoral dissertation, which the architecture map names.

Two newer documents matter to this chapter. RFC 9457, published in July 2023, defines one standard shape for machine-readable error bodies. And the header that makes a repeated `POST` harmless is still a draft: `draft-ietf-httpapi-idempotency-key-header`, by Jayadeba Jena and Sanjay Dalal, reached revision 07 on 15 October 2025 and expired on 18 April 2026 without becoming an internet standard.

## A wire cannot tell a retry from a second tap

HTTP requests keep no memory of each other. Each one arrives alone, with nothing attached saying whether it is the first attempt or the fourth. That property is **statelessness** — a backend keeping no memory between requests — which the architecture map introduced as the thing that lets many copies of a server run at once. Its cost at the endpoint is sharper than it sounds: the server cannot look at a request and know whether it has seen this one before.

So the same request can arrive twice, and both arrivals can be honest. A connection dies before the reply crosses back, and the client sends again. A student on a weak signal taps Submit, sees nothing move, and taps again. A script or a coding agent retries on a timer, because retrying is what careful clients do. On the wire all of those second attempts are identical to the first: same method, same path, same body, and no field that separates *I am trying again* from *I mean it*.

That is also why HTTP carries a published vocabulary of methods and status codes in the first place. A cache, a load balancer or a retry library sits in the middle of the path and has to decide about a request it does not understand, for an application it has never seen. The specification gives it one thing to reason about: the method. Methods are defined as **safe** (reading, changing nothing) and **idempotent** (repeatable with no added effect) so that software in the middle can decide whether it may send your request again without asking you.

## The request the browser sends, and the answer it gets

Here is the whole exchange, in the shape it travels in.

```http
POST /signups HTTP/1.1
Host: aiclub.school.pk
Content-Type: application/json
Authorization: Bearer eyJhbGci

{"name": "Ayesha Khan", "email": "ayesha@school.pk"}
```

And when there is a thirtieth seat and Ayesha is first to it:

```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: /signups/30

{"seat": 30, "status": "confirmed"}
```

And when there is not:

```http
HTTP/1.1 409 Conflict
Content-Type: application/problem+json

{"type": "https://aiclub.school.pk/problems/full",
 "title": "The club is full",
 "detail": "No seats remain."}
```

Every request has the same three parts. The first line carries the **method** (`POST`), the **path** (`/signups`) and the protocol version. Headers follow, one per line: `Host` names the site, `Content-Type` says what the body is, `Authorization` carries a credential when there is one, and `Location` or `Retry-After` appear on answers that need them. A blank line ends the headers, and the body comes after it.

An answer has the same three parts in a different order of importance. The status line carries the number, and clients act on that number before reading anything else. Headers carry metadata. The body carries the detail a person reads, in a shape a program can parse — which is what `application/problem+json` in the third example is claiming, under RFC 9457.

## The method is a promise about repetition

Six methods cover almost every API you will meet, and two properties explain all of them.

| Method | What it asks for | Safe | Idempotent |
|---|---|---|---|
| `GET` | Read a resource | Yes | Yes |
| `HEAD` | Read the headers only | Yes | Yes |
| `POST` | Create, or run an action | No | No |
| `PUT` | Replace a thing at a known address | No | Yes |
| `PATCH` | Change part of a thing | No | Not guaranteed |
| `DELETE` | Remove a thing | No | Yes |

**Idempotent** — sending it twice leaves the server as one send would. Read that definition carefully, because it is narrower than most people assume. Idempotency is a statement about the state of the server, not about the reply. A `DELETE` for a record that is already gone may answer `404 Not Found` the second time and is still idempotent, because a second delete removed nothing. A `PUT` with the same body twice leaves one record with one set of values. `GET` and `HEAD` are also **safe**, changing nothing at all, which is why a browser may re-request them on its own without asking.

The sign-up is a `POST`. It is the one method the specification refuses to call idempotent, and it is the method every form on the web uses. Two taps, two sign-ups, and neither the browser nor the wire will tell your server that the same person sent both. Guarding against that is not the protocol's job. It is yours, and the section below on the smallest endpoint that works shows what it costs to forget.

## Status codes: what an answer is allowed to mean

A status code is the one part of a response that a cache, a retry library, an uptime monitor and a browser all understand without a line of your documentation. These are the ones a backend of this size actually uses.

| Code | Means | The right answer when |
|---|---|---|
| `200 OK` | It worked | The body carries the result |
| `201 Created` | A new thing exists | `POST` created it; name it in `Location` |
| `204 No Content` | It worked, nothing to say | A `DELETE` that needs no body back |
| `400 Bad Request` | The request is malformed | Broken JSON, a bad `Content-Length` |
| `401 Unauthorized` | No valid credential | The caller has not proved who they are |
| `403 Forbidden` | Credential fine, action refused | Signed in, and not allowed to do this |
| `404 Not Found` | No such thing | Or: a thing they may not know about |
| `405 Method Not Allowed` | Path exists, method refused | A `GET` sent to a create-only path |
| `409 Conflict` | Clashes with the state right now | The club is full, the email already signed up |
| `413 Content Too Large` | Body beyond this server's limit | A payload over the accepted size |
| `415 Unsupported Media Type` | Wrong `Content-Type` | Form-encoded data sent to a JSON endpoint |
| `422 Unprocessable Content` | Syntax fine, values not | An email field with no `@` in it |
| `429 Too Many Requests` | Sending too often | The rate limit tripped; add `Retry-After` |
| `500 Internal Server Error` | The fault is ours | An exception nobody handled |
| `503 Service Unavailable` | Up but unable right now | Maintenance, or a dependency gone |

Four of these choices are where real teams lose time, and each one has a reason attached.

**`401` against `403`.** RFC 9110 defines `401` as the answer when a request lacks valid authentication credentials, and `403` as the answer when the server understood the request and refuses to authorise it. The two are one number apart and their consequences are opposite. A well-written client sends the user back to sign in after a `401`; it must not do that after a `403`, because a student who is already signed in and not allowed will be bounced to a login form that changes nothing.

**`400` against `422`.** `400` is for a request that does not work as a request. `422` is for a request that parses cleanly and asks for something the endpoint will not accept. The name shifted as well: RFC 9110 renamed `422` from *Unprocessable Entity* to *Unprocessable Content* in 2022, and both names are still in the wild. FastAPI, a common Python framework, answers a request body that fails validation with `422` by default (FastAPI documentation, 2026), which is one reason the code shows up so often in logs.

**`403` against `409` for a full club.** The architecture map drew a full club as `403 Forbidden` with *sorry, we are full*. That line deserves correcting, and this is my reading of the codes rather than a rule anyone enforces. A full club is not a permission problem. The student is exactly who they say they are and is fully allowed to sign up. What stops them is the state of the club, and RFC 9110 defines `409` as the answer when a request "could not be completed due to a conflict with the current state of the target resource". Thirty occupied seats are that state. Send `409`, and say which rule refused.

**`200` with an error inside the body.** Never. A retry library, a cache and a monitoring graph read the status line and stop. `200 OK` with an error string in the body tells every one of them that a sign-up succeeded, and the graph that shows a healthy endpoint will be the one that hides the club filling with duplicates.

## Thirty seats, modelled as a resource

REST is a way of arranging an API so that the same operation has the same shape everywhere, and it starts by naming the things rather than the actions. The club is a **resource** — one thing with an address. The sign-ups form a **collection** at `/signups`. One sign-up is an **item** inside it, at `/signups/14`. The method carries the verb, so the path never has to.

| What you want | The request |
|---|---|
| Create a sign-up | `POST /signups` |
| Read the whole list | `GET /signups` |
| Read one sign-up | `GET /signups/14` |
| Replace one sign-up | `PUT /signups/14` |
| Change part of one | `PATCH /signups/14` |
| Remove one | `DELETE /signups/14` |

Three rules fall out of that table, and each one prevents a specific mess. Paths are nouns, because a path with a verb in it collects a second verb. The collection is plural, because `/signup` and `/signups` meaning different things is a bug waiting for a tired evening. And the server assigns the identifier, never the caller, so no student can choose which seat record their request overwrites.

The style gets awkward at an action that is not a thing. *Cancel seat 14* changes a field rather than deleting something, and there is no clean place for it. Teams choose between `PATCH /signups/14` with a body that flips a status, and a smaller resource of its own, `POST /signups/14/cancellation`. Both ship. What matters more than the choice is that the endpoint exists because a rule needed a name, and the rule attached to this one is *only this student, or the club admin, may cancel this seat*.

## What a correct endpoint checks before it says yes

The endpoint that accepts a sign-up has one job: it decides. Before it writes anything, it answers eight questions, and each one is a place a student, a script or an agent gets past a rule that was written somewhere weaker.

1. **Who is this?** The identity comes from a credential the caller had to prove, never from a field they typed.
2. **Are they allowed?** Authentication proves who; authorisation decides what they may do here.
3. **How often have they asked?** A rate limit, counted per identity rather than per network address.
4. **Is the body the right size and type?** Answer `413` or `415` before parsing a megabyte you did not want.
5. **Is the body well formed?** A `400` for a request that does not hold together as a request.
6. **Are the values valid?** A `422` for an email with no `@`, or a name longer than the column behind it.
7. **Is the rule still true at the instant of the write?** The seat cap lives here, and this is the question this chapter cannot finish alone.
8. **Have we already answered this exact request?** Idempotency, so a retry cannot become a second sign-up.

Then it answers with the specific code that says which one failed, in a body a program can parse, because eight checks that all report the same message are eight checks nobody can debug.

<Callout type="warning" title="Safety floor">
Nothing is enforced until it is enforced on the server, and nothing on the server is enforced until the check and the write are one step. Never let a field the caller can write decide who they are, and never accept a body because your own form is the thing that produced it. Before this endpoint goes live, send the sign-up twice with one idempotency key, twice at once with one seat left, and once carrying somebody else's identity.
</Callout>

### The guess, scored

The guess the name invited was that an endpoint is an address, and the rule lives behind the door. That is half right, and the half it loses is the chapter.

The first correction is size. An endpoint is not a door. It is a contract, and the contract includes every refusal. `POST /signups` is not the place where sign-ups are sent; it is the promise that a sign-up will be answered in one of a small number of named ways — created, malformed, invalid, unauthenticated, unauthorised, or in conflict with the club as it stands.

The second correction is time. *On the server* names a place, not a moment. Those eight checks are not one event. The server runs them in order, and between any two of them other requests are running too, on the same machine or a copy of it. A rule can be true when the endpoint reads it and false when the endpoint writes, and the gap between those two instants is where thirty-one students come from.

## The smallest endpoint that works, and the two taps it loses

Here is a sign-up endpoint written the way most people write the first version of one.

```python
@app.post("/signups", status_code=201)
def sign_up(entry: Signup,
            user: User = Depends(current_user)):
    taken = count_signups()      # read the count
    if taken >= 30:              # check it
        raise HTTPException(409, "Club is full")
    seat = insert_signup(entry, user)   # write
    return {"seat": seat}
```

This passes every test written for one person at a time, and it is wrong. It reads the count, decides, and writes, as three separate steps, and the server is free to run a second copy of that sequence in the gap.

| When | Ayesha's request | Bilal's request |
|---|---|---|
| 0 ms | reads the count: 29 | |
| 1 ms | | reads the count: 29 |
| 2 ms | 29 is under 30, so it continues | |
| 3 ms | | 29 is under 30, so it continues |
| 4 ms | writes seat 30 | |
| 6 ms | | writes seat 31 |
| 7 ms | answers `201 Created` | answers `201 Created` |

Both requests were correct about the count at the moment they read it, and both were wrong by the time they wrote. The failure has a name: a **check-then-act race** — deciding on a value, then acting on a value that may have moved. The window itself is called **time-of-check to time-of-use (TOCTOU)** — the gap between deciding and doing.

Notice what does not fix it. A bigger check does not. A longer condition does not. A slower server makes it worse, because a slow read widens the gap. The requirement is different in kind: the check and the write have to become one step, and no other request may be able to enter that step.

That step is not something one handler can arrange by itself, because the two handlers run as separate processes and the thing they both write to is the data store. Making a check and a write indivisible is a job for whatever holds the data, and the chapter on databases owns that mechanism. The part this chapter owes you is the requirement, stated precisely enough for the fix to land: **no two sign-ups may ever both see the thirtieth seat free.**

The second failure in that code has nothing to do with two people. One student, one phone, one weak signal, and the request sent twice.

```text
POST /signups   {"name": "Ayesha Khan", ...}
-> 201 Created, seat 30

POST /signups   {"name": "Ayesha Khan", ...}
-> 201 Created, seat 31
```

The two requests differ in nothing at all. There is no field on the wire that says *this is the same attempt*, and that is not an oversight in HTTP. The protocol has no way to know, because the client never told it. So the client has to tell it, and the usual way is a header the client generates once, before the first attempt, and reuses on every retry.

```http
POST /signups HTTP/1.1
Idempotency-Key: 9f2c1a7e-4b1d
Content-Type: application/json
```

```text
POST /signups   Idempotency-Key: 9f2c1a7e
-> 201 Created, seat 30
   the server stores the key and the answer it gave

POST /signups   Idempotency-Key: 9f2c1a7e
-> key found; the stored 201 is replayed; nothing is written
```

Four details in that sketch are places real systems get it wrong. The key must be generated before the first attempt and reused on retries, not regenerated per attempt; a fresh key each time deduplicates nothing. It must be scoped to one endpoint and one account, so two students cannot collide by accident. The server has to store the answer along with the key, because a retry after a slow first attempt must return what the first attempt returned. And the key must not be personal data — a student's email address is a poor choice of key, since keys end up in logs.

Stripe, the payment platform, documents the behaviour precisely: it saves the status code and body of the first request made for a key, *regardless of whether it succeeds or fails*, and returns the same result for later requests with that key, including `500` errors. Keys are removed once they are at least 24 hours old (Stripe API reference, 2026). The header itself is not standard, as the source section above said. It is in production anyway, in every system that cannot afford a second charge.

Now the distinction that keeps this chapter honest. **An idempotency key makes one person's two taps harmless. It does nothing for two different people.** Ayesha's second tap carries Ayesha's key. Bilal's first tap carries a different one, and the server is right to treat it as a new sign-up. The race in the table above survives every idempotency key ever generated. Two failures, two causes, two mechanisms, and only one of them is fully solved by the end of this chapter.

## The form validates, and the endpoint validates anyway

The sign-up form checks the name is filled in and the email has an `@` in it. That check is a courtesy, and it is worth writing. It gives honest students an answer in the same millisecond, before the request leaves the device, and it catches a typo that would otherwise cost a round trip.

It is not a rule, and treating it as one is the same mistake the architecture map named. The form runs on a machine the student owns, in a browser with developer tools. The endpoint is reachable without the form at all: a single `curl` command, a five-line script, or a coding agent pointed at your API sends whatever it likes. The first time a student discovers this, they will be curious rather than hostile, and the endpoint has to be the thing that is unmoved.

The reason to validate at the boundary, rather than deep in the call stack, is that deeper code trusts its inputs. A check three functions down runs only if the value survived that far, and the functions above it have already been written on the assumption that something checked. Validation at the boundary is the only check that cannot be skipped by a caller who enters from a different door.

Two failures follow from getting this wrong, and both are common enough to name. The first is **drift**: the form and the endpoint each carry their own copy of the rules, and they stop agreeing. The form insists on an `@`, the endpoint accepts anything, and for a term nobody notices. Or the reverse: the endpoint refuses what the form allowed, and honest students get an error they cannot act on. One rule, two renderings, and the endpoint's copy decides — which is the specify-and-bound half of the loop this whole book is about.

The second is accepting more than you meant to. Everything in a parsed body is input the caller wrote. The Express body-parser documentation states it plainly: the parsed body's shape is based on user-controlled input, and its properties "should be validated before trusting" (body-parser 2.3.0, 2026). An endpoint that copies the whole body into storage will happily store a field named `is_admin` that your form never sends.

## Middleware: the work that runs before the handler

The eight checks do not all belong inside the handler, and most of them should not be written there. A **middleware** is code that sits in a request's path and runs before the handler — the architecture map named it, and this is the mechanism. It receives the request, may read it, may attach to it, may answer it and stop, or may pass it along.

```python
@app.middleware("http")
async def limit_and_tag(request, call_next):
    if over_limit(request):               # rate limit
        return Response(status_code=429,
                        headers={"Retry-After": "30"})
    request.state.request_id = new_id()   # trace id
    return await call_next(request)
```

Rate limits, authentication, request identifiers and logging live here, and the order they run in is a design decision rather than an accident. A rate limiter that runs after authentication counts named students; one that runs before it counts the school's single shared network address, and refuses everybody because one student is impatient. A logger that runs after authentication can put a student's id on the line; one that runs before it cannot.

The failure mode of middleware is specific. Anything middleware attaches to a request is only as trustworthy as the middleware, and later code can be careless about which is which. The rule worth holding: a value that a *client* supplied is untrusted input, and a value your own middleware derived by verifying a credential is not. Keep those two in different places with different names, and the confusion stops being possible.

## Rate limiting is not a seat counter

**Rate limiting** caps how often one identity may call you in a window of time, and its purpose is availability rather than correctness. Two shapes dominate. A **fixed window** counts requests per calendar minute and starts again at the boundary. A **token bucket** refills at a steady rate and allows a short burst on top, which suits a room of students opening the page at the same minute. When the limit trips, the answer is `429 Too Many Requests` with a `Retry-After` header in seconds.

Real limits, for scale. GitHub's REST API allows 60 requests per hour from an unauthenticated caller and 5,000 per hour from an authenticated one, and separately refuses more than 100 concurrent requests (GitHub documentation, 2026). Stripe's published limit is 100 requests per second per account in live mode and 25 in test mode (Stripe documentation, 2026). Both count per identity, because counting per network address punishes everyone behind one connection — a school, a hostel, a carrier's shared gateway.

Now the trap. A rate limiter looks like protection for a scarce resource, and thirty seats is a scarce resource, so the tempting configuration is *thirty sign-ups per day*. It does not work, and the reason is a unit mismatch. A rate limiter counts requests, not seats. One student retrying thirty times can occupy the whole allowance with no second student involved. One script sending a request a second takes a seat a second until the cap is reached, and the limiter never notices, because the script is well under it. A cap counts a state — how many seats are taken. A rate limiter counts an event — how many requests arrived. Different questions, different units, and no setting of one answers the other.

## The identity comes from the credential, never the body

**Authentication** proves who is asking. **Authorisation** decides what that person may do. The architecture map separated the two and used them for the cancellation rule. What belongs here is where the identity comes from.

The form knows which student is filling it in, so adding a `student_id` field to the request body is the first thing most people try. It is also the bug, and it is the same sentence as the architecture map arriving somewhere new: the body was written by the client, and the client is a machine the student controls. An endpoint that reads the identity from the body lets any student sign up as any other student, and cancel any other student's seat, by editing one number in a request they were always free to write by hand.

The identity must come from something the caller had to prove: a token the server signed and can verify. That token travels in the `Authorization` header, and the endpoint derives the student from it. The body carries what the student wants. The header establishes who is asking. Two jobs, two sources, and keeping them apart is what stops one number from being worth a power it never had.

The codes follow from the same reasoning. No valid token, `401`. A valid token and a rule that refuses, `403`. And one deliberate choice worth knowing: when the caller is not allowed to *know* whether a thing exists, `404` is often the better answer than `403`, because it says nothing at all.

## Logging the decision, not only the outcome

**Logging** is the written trail of what your server decided. **Observability** is the wider ability to answer questions about a system you did not predict — why forty students were refused in the same minute, why one request took four seconds. Logging is the one part of a backend you cannot add after the incident you need it for, which is why it belongs on this list rather than in a later chapter.

A line that records `200 OK` is close to useless. The line that earns its keep records the decision and the reason: which endpoint, which student, which rule fired, what the values were, and what came back. In practice that means **structured logging** — each event written as named fields rather than a sentence, so a query can count refusals by reason instead of reading prose.

The join between an answer and its log lines is a **request id**: a value created when the request arrives, echoed in a response header, and written on every line the request produces. A student who reports a problem can send you the id, and you can find the exact lines. W3C's Trace Context standard defines the `traceparent` header for the same job across many services at once, and OpenTelemetry is the common tooling around it.

Two rules survive every version of this. Never log a password, a token or a full request body: logs are read by more people than the database, copied to other systems, and kept for months, which makes them a poor place for other people's personal data. And log the refusals, not only the successes. A club that filled at 09:04 and a script that took twenty seats at 09:03 look identical in a log that records wins.

## Where the endpoint sits, and what it takes down with it

The endpoint occupies the narrowest point in the system. In front of it: the browser, and every other caller that has learned your API's shape. Behind it: the data store, which believes whatever the endpoint tells it. Around it: the middleware, in the order you chose. Its blast radius — how far the damage reaches when it fails — is larger than the file suggests.

- **Validation fails open.** Every row already in the store is suspect, and the repair is a data-cleaning exercise with no safe automatic version.
- **The authorisation check is missing, or reads the body.** One student cancels another student's seat. Nothing crashes, and the admin list looks correct.
- **Logging is absent.** The report you get is *the button does nothing*, and you have no path back to the request that caused it.
- **Rate limiting is absent.** One script holds every seat in a second, and the club's problem becomes a social one.
- **The contract changes without warning.** Everything built against the old shape breaks at once, including the agent you pointed at the API last week.

Nothing downstream of the endpoint repairs a mistake made at it. That is why the checks live there, and why the one gap this chapter refuses to close for you is the gap between the check and the write.

## What this costs

- **An accepted body size is a default somebody else chose.** Express's body-parser middleware, the common way a Node.js server reads a JSON body, defaults to 100 KB (102,400 bytes) per request and refuses anything larger with `413`; the same default applies to every parser in the library (body-parser documentation, version 2.3.0, 2026).
- **Rate limits are counted per identity, at these orders of magnitude.** 60 requests per hour unauthenticated against 5,000 authenticated on GitHub's REST API, and 100 requests per second per account on Stripe in live mode (GitHub and Stripe documentation, 2026).
- **An idempotency key costs storage for at least 24 hours** and buys the guarantee that a retry cannot create a second thing (Stripe API reference, 2026).
- **Logs are billed by volume.** AWS's published price for CloudWatch Logs ingestion is $0.50 per gigabyte in US East, with the first 5 GB each month free (AWS CloudWatch pricing, 2026). Ten log lines per request at a few hundred bytes each reaches a gigabyte in a busy month, and the invoice is the part nobody predicts.
- **A client with no timeout hands you the retry.** Python's `requests` library does not time out unless one is set (Requests documentation, 2026). A student whose request hangs will tap again, and that second tap is the double submit the endpoint has to survive.

## When to enforce at the endpoint, and the choice that looks safer

The decision rule for this whole layer fits in a sentence: **any rule that protects a scarce resource — seats, money, access — is enforced at the endpoint, in the same step as the write.** Everything above is machinery for that sentence.

The careful-looking move is the counter-indication, and it is worth naming because it feels responsible. Read the count, then insert, is the sequence that reads as caution: check before you act. It is also the bug. No amount of care inside one handler closes the gap between two of them, so a rule that has to hold while requests overlap cannot be enforced by the endpoint alone, and the mechanism that can belongs with the data.

A second counter-indication is the rate limiter wearing a cap's clothes. Thirty sign-ups per day looks like a thirty-seat limit and is not one. A limit that shapes traffic and a limit that protects a state are different tools with different units, and swapping them produces an endpoint that refuses an honest student while a script holds twenty seats.

The two ways to hold this layer wrong are worth making concrete. **Over-trust** is asking an agent for a sign-up endpoint, liking what comes back, and shipping it: the handler reads the identity from the body, checks the count in its own statement, answers `200` with an error string inside the body, and the seat cap becomes a decoration that lasts until two people tap at once. **Over-caution** is refusing to let an agent near the endpoint at all, hand-writing every validator and log line from scratch, and taking the club's sign-ups on paper for a term while the page sits finished but unshipped. The same broken relationship with the work, pointed the other way. The move between them is the one this book keeps returning to: write the endpoint's contract before you generate it, bound what it accepts, verify by replaying the request, and own the answer. That is the discipline **Stage 1** builds, and none of it is typing.

Verify by replaying, specifically. Four requests, every one of which a working endpoint survives: send the sign-up twice with one idempotency key; send it twice at once with two keys and one seat left; send it carrying another student's identity; send it forty times in a second.

The failure conditions have early symptoms, all of them cheap to notice now and expensive later. Thirty-one rows for thirty seats. Two rows sharing a seat number. Two rows for one student with one idempotency key. A `200` whose body says `error`. A log where one student has a `409` and then a `201` a millisecond apart. An admin count that disagrees with the seat numbers printed under it.

## Where these conventions come from

HTTP's vocabulary is old and unusually settled. Fielding described REST in his 2000 dissertation. RFC 9110 restated the protocol's semantics in June 2022. RFC 9457 standardised error bodies in July 2023. The newest piece is the least settled: the `Idempotency-Key` header was drafted in the IETF's HTTPAPI working group, reached revision 07 on 15 October 2025, and expired on 18 April 2026 without becoming an RFC. Systems that move money ship it anyway, which is a fair picture of how practice and standards usually relate.

The live disagreement is about what REST means. Fielding's own position, in a 2008 post titled *REST APIs must be hypertext-driven*, is that an API returning fixed documented paths and JSON is RPC over HTTP rather than REST, because a real REST API tells the client what it may do next from the response it received. Almost every API in production, including every example in this chapter, sits on the other side of that line and works well. Fielding is not wrong about his own dissertation, and the industry is not wrong about what ships. Both readings are alive, and knowing which one you are using prevents an argument with a stranger.

To follow the thread: the IETF HTTP Working Group's documents and mailing list, where the protocol's decisions are actually made; Mark Nottingham, chair of that group since 2007 and a co-author of RFC 9457; and the Stripe API documentation, which is unusually exact about what a retry costs and why.

<Callout type="info" title="Where this sits">
This chapter is the Backend chapter of **Stage 1**, and it deepens one box from the architecture map. The chapter on the frontend takes the box facing the student, the chapter on databases takes the store behind this one, and the collision this chapter framed is closed there.
</Callout>

## Before you turn the page

Without looking back, do three things. Write the two requests a double-tapped Submit sends, and say exactly what must differ between them for the second one to be harmless. Then list the eight checks the sign-up endpoint makes before it says yes, and name which of them the two taps pass and which one they need. Finally, put Ayesha and Bilal back at twenty-nine seats and write, in two sentences, what the endpoint cannot do about their collision and where the answer has to come from instead.

**Next:** the seats, the rows and the counts are held by the database, and the mechanism that makes a check and a write one indivisible step is a database mechanism. The chapter on databases takes the collision this chapter has framed, and closes the gap.
