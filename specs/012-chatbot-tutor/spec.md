# Feature Specification: Bridge Balance Tutor 1.0 (feature 012)

**Feature Directory**: `specs/012-chatbot-tutor`
**Created**: 2026-09-23
**Status**: Draft
**Input**: User description: "build the Bridge Balance Tutor 1.0 — the tutor behind the chat box that already sits on every page of the book: answers streamed word by word with sources, six modes and two levels, questions saved anonymously, and a $1-a-day spending cap"

**Current state (2026-09-23, steps 0.0–0.6 complete).** The chat box exists on every page and, with no chat service configured, still reveals its "This isn't switched on yet." state; the chat API answers with a not-implemented placeholder. The feature folder, the rule-file updates for one `main` git line, the git baseline, the environment baselines, the saved local provider key, the provider probe and the optional dependency group are done and recorded in `progress.md` and `research.md`. This spec covers what is still to be built.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A learner asks a question about the book and gets a streamed answer with sources (Priority: P1)

A beginner reading a chapter opens the chat box, asks a question in their own words, and watches the answer arrive word by word. The tutor's first move is to search the book; when the book covers the question, the answer comes from the book and every claim carries a small numbered link to the exact page and section it came from. When the book does not cover it, the tutor says so in one short line and answers from general knowledge, still in the same warm, easy English.

**Why this priority**: this is the whole product. Without a book-grounded answer with visible sources, none of the other five stories has anything to stand on.

**Independent Test**: With the tutor enabled and nothing else built, open the chat box on a chapter page, ask a question the indexed book answers, and confirm: text arrives progressively rather than all at once; a "Searching the book…" status appears first; the finished answer carries at least one source item whose link lands on the cited page and section; the same question asked with no mode selected behaves the same way (book first). Ask a question the book does not cover and confirm the one short line saying the book does not cover it, followed by a general-knowledge answer.

**Acceptance Scenarios**:

1. **Given** the tutor is enabled and the book index is built, **When** a learner asks a question about a topic the book teaches, **Then** a status line announces that the book is being searched, the answer streams in progressively, and the finished answer lists the cited book sources in the order they were first used.
2. **Given** a learner has selected no mode at all, **When** they ask a question, **Then** the tutor behaves exactly as it does in Book-Aware mode's spirit: it searches the book first, and if the book covers the question it answers from the book and cites it.
3. **Given** a question the book does not answer, **When** the tutor finishes, **Then** it says so plainly in one short line and then answers from general knowledge, and the answer carries no book citation it did not really have.
4. **Given** a learner is reading a specific chapter page, **When** they ask a question that page answers, **Then** candidates from the page they are on are included in the search, and that page appears among the cited sources when it is the best source for the answer.
5. **Given** a finished answer, **When** the learner reads the sources area, **Then** each item shows a title and section, its link opens the right book page in the app, and the answer's inline markers link to the matching item.

---

### User Story 2 - The owner tests the tutor alone behind an access code (Priority: P1)

While only the owner is allowed to use the tutor (the provider key is the owner's own test key), the chat box asks for an access code before it will send anything. A visitor who is not the owner sees the private-test panel and cannot reach the tutor; the owner enters the code once on their own device and is not asked again there. Every other limit — the daily spending cap, the concurrency limit — stays in force behind the lock.

**Why this priority**: the tutor cannot be put online at all without this. The key that powers it is licensed for the owner's own testing only, so an open door would breach those terms on day one.

**Independent Test**: With an access code configured, request an answer with no code and with a wrong code and confirm both are refused before any model work happens; repeat with the correct code and confirm the answer streams. Confirm the code is remembered on that device only, and that the tutor still refuses once the daily cap is reached and once the switch is off.

**Acceptance Scenarios**:

1. **Given** an access code is configured, **When** someone asks a question without sending a code, **Then** the request is refused with the "that code didn't work" panel state and no model call is made.
2. **Given** an access code is configured, **When** someone sends a wrong code, **Then** it is refused the same way, and the refusal gives no hint about the correct value.
3. **Given** the owner entered the correct code once on their device, **When** they ask again in the same browser, **Then** they are not asked again, and the code is not visible anywhere on the page.
4. **Given** the access code is configured, **When** the daily spend cap is already reached or the tutor is switched off, **Then** even the correct code gets the "resting for today" or "switched off" state, and the book stays fully readable.
5. **Given** a learner who has never been told the code, **When** they open the chat box, **Then** they see the private-test panel and cannot type a question into a live tutor.

---

### User Story 3 - Deep Research answers with web sources (Priority: P2)

A learner asks a big question that the book alone cannot answer. In Deep Research mode the tutor breaks the question into a few smaller ones, searches the book for what the book says and the open web for the rest, prefers primary sources, and writes an organised report: a two-line summary, short sections, and a "What to read next" close. Every factual claim carries an id, and the sources area lists book and web items together.

**Why this priority**: it is a locked 1.0 promise and it needs a paid-tier binding decision later, but it is the smallest part of the value the tutor delivers, so it follows the book-grounded flow.

**Independent Test**: With a web-search service configured, ask a question in Deep Research mode and confirm: a "Searching the web…" status appears; the finished report has a summary, sections and a next-steps close; web source items show title, site and a working link; the number of web searches stays inside the per-answer cap. Then unset the web-search provider and confirm the report opens by saying web search is unavailable and labels what came from the book and what came from general knowledge.

**Acceptance Scenarios**:

1. **Given** Deep Research mode with a web-search service configured, **When** a learner asks a research question, **Then** the tutor shows both the book-search and web-search statuses, and the finished report cites book and web sources by their ids.
2. **Given** the same mode, **When** the answer finishes, **Then** the sources area lists web items with their site name and a link that opens the referenced page, and book items with their section.
3. **Given** the same mode, **When** the per-answer or per-day web-search cap is reached, or no web provider is configured, **Then** the report opens by saying web search is unavailable, answers from the book and general knowledge, and labels which parts are which.
4. **Given** any other mode, **When** a learner asks a question, **Then** no web search is performed and no web sources appear.

---

### User Story 4 - A learner switches between Student and Professional (Priority: P2)

Every learner starts at Student level: the tutor teaches, gives a first hint rather than the finished thing, keeps code pieces small, and points the learner to Professional when they want more depth. Professional is denser and code-heavy, explains syntax, and stays inside what the book teaches — it never builds a real project or production code.

**Why this priority**: the whole book is beginner-first, so the default has to be right, but the second level is what keeps advanced learners from leaving.

**Independent Test**: Ask the same question at both levels and compare: at Student the answer teaches and withholds a complete solution; at Professional it is denser and contains complete illustrative code examples. Confirm the level chosen is remembered on the device, that a brand-new learner is at Student without choosing anything, and that a newer answer never mixes the two behaviours.

**Acceptance Scenarios**:

1. **Given** a first-time learner, **When** they open the chat box, **Then** the control shows Student selected and the hint "Teaches you step by step. Best for learning."
2. **Given** Student level, **When** the learner asks the tutor to solve an exercise or write their code, **Then** the answer gives one hint and one short question first, and never a complete ready-to-run program for their task.
3. **Given** Professional level, **When** the learner asks the same question, **Then** the answer is denser, includes complete explanatory code examples and explains the syntax, and still stays inside the book's scope rather than building a real project.
4. **Given** the learner switched to Professional, **When** they come back later in that browser, **Then** Professional is still selected, and each new answer is produced at the level they picked.
5. **Given** any level, **When** the answer is about the book's own topics, **Then** nothing outside the book's scope is taught as if it were part of the book.

---

### User Story 5 - A learner rates an answer (Priority: P2)

Under every finished answer there are two buttons: helpful and not helpful. Choosing "not helpful" offers four short reason chips. The rating is saved against that single answer, with no trace of who gave it, and the learner gets one short thank-you line.

**Why this priority**: ratings are the only signal the owner has about which answers are bad, and they are cheap to add — but they are useless until the answers themselves work.

**Independent Test**: Submit a rating for a finished answer and confirm the request is accepted with no response body; submit a rating for an answer id that does not exist and confirm it is refused as not found; with logging switched off, confirm a rating is still accepted and quietly does nothing. Confirm the thank-you line appears once and is remembered for that answer.

**Acceptance Scenarios**:

1. **Given** a finished answer, **When** the learner presses "not helpful", **Then** four reason chips appear (wrong, hard to understand, unsafe, something else) and the chosen rating and reason are saved against that answer's id only.
2. **Given** a finished answer, **When** the learner presses "helpful", **Then** it is saved with no reason asked for, and the thank-you line appears once.
3. **Given** an answer id the tutor has never issued, **When** a rating arrives for it, **Then** the request is refused as not found.
4. **Given** logging switched off, **When** a rating arrives, **Then** it is accepted and has no effect, and the learner sees no error.
5. **Given** any rating, **When** it is stored, **Then** it records no name, device, address or anything else that points at a person.

---

### User Story 6 - Note Taker and Document Writer turn the conversation into study material (Priority: P3)

A learner who has just worked through something asks for notes: the tutor turns the conversation so far, or a pasted piece of text, into study notes with a title, key ideas as bullets, new words with one-line meanings, and three short questions to test memory — sticking to what was actually discussed. In Document Writer mode it drafts the document they ask for, with clear structure, asking one short question first if something essential is missing.

**Why this priority**: genuinely useful, but it reuses everything the first five stories build, and it is the least used part of the tutor for a beginner audience.

**Independent Test**: In Note Taker mode after a short conversation, ask for notes and confirm the four required parts and that no new topic is introduced; in Document Writer mode ask for a study plan and confirm the headings, the code-inside-the-document rule matching the chosen level, and that an under-specified request draws one short question rather than a guess.

**Acceptance Scenarios**:

1. **Given** a conversation of a few turns, **When** the learner asks for notes in Note Taker mode, **Then** the answer has a title, key ideas as bullets, new words with one-line meanings, and three short questions at the end.
2. **Given** Note Taker mode, **When** the learner pastes a piece of text and asks for notes from it, **Then** the notes stay inside that text and add no new topic.
3. **Given** Document Writer mode, **When** the learner asks for a document, **Then** it is drafted with clear headings and structure, and any code inside it obeys the current level's rules.
4. **Given** Document Writer mode, **When** an essential detail is missing and no sensible default is obvious, **Then** the tutor asks one short question first instead of inventing the answer.
5. **Given** either mode, **When** the learner needs a pointer to the book for revision, **Then** the answer links the right book page rather than expanding into a new lesson.

---

### Edge Cases

- **Empty or whitespace-only question**: refused before any model work, with the "something about that message didn't work" message, and the tutor keeps working afterwards.
- **Question over the character cap** (4000 by default): refused with the "that's a lot for one question" message, naming the cap.
- **Request body over the size cap** (64 KB): refused before streaming starts.
- **History longer than the bounds** (12 messages / 16 000 characters by default): the oldest entries are dropped first, and the answer is still produced.
- **A history entry attributed to the assistant whose signature does not verify**: dropped before the run, the drop is counted in the logs, and the learner is not told.
- **Provider unavailable after retries**: the tutor reports its own "something went wrong on our side" state, never a provider message or a stack trace. Provider too slow past the deadline, or the request not configured at all, each get their own state.
- **Retries after the first token has arrived**: never. A failure mid-answer is reported on the open stream, not retried.
- **Book search returns nothing**: Book-Aware says so plainly, names the closest part of the book if one exists and suggests World-Aware; the no-mode case says it in one short line and answers from general knowledge.
- **The book index is empty or unreachable**: the tutor still answers from general knowledge where its mode allows, and the readiness check reports the index as unreachable with no count.
- **Off-topic question** (sport, politics, relationships, gossip): one kind sentence and an offer to help with their learning instead.
- **A student who seems to be in danger or in crisis**: a short, gentle reply encouraging them to talk to someone they trust right now, and to contact local emergency services if they are in immediate danger. Nothing else.
- **A harmful request** (breaking into accounts, malware, cheating tools, sexual content, hate, violence): refused kindly and briefly.
- **"This is for my graded assignment"**: the tutor teaches the idea, gives hints, looks at the learner's own attempt and explains what went wrong — never a submission-ready answer.
- **Instructions hidden inside a book passage, a web result or pasted text**: read as material, never followed; the tutor never reveals or summarises its own instructions, whatever it is asked.
- **A passage from a page excluded from the index** (placeholder or working file): cannot be cited, because it was never indexed.
- **Web search unavailable, capped or over its daily allowance**: the fixed short "unavailable" sentence is handed to the tutor, which says so up front and labels what came from the book and what came from general knowledge.
- **The daily spending cap is crossed while an answer is in flight**: the running answer finishes and is delivered; every new request is refused with "the tutor is resting for today" and a retry hint until the next day in the owner's timezone.
- **Concurrency at its limit** (3 by default): new requests are refused as busy with a short retry-after, with no queue and no waiting.
- **An answer that ends at its length limit with no visible text at all**: reported as a provider error rather than shown as an empty answer.
- **An answer that ends at its length limit after some text**: the finished answer carries the "this answer got cut short" line.
- **The learner presses Stop, or the connection drops mid-answer**: the run is cancelled, the limits it held are released, and the turn is recorded as cancelled.
- **A citation marker the tutor invented**: removed from the answer before it is shown. A link the tutor invented, or an external link that did not come from a web search or the owner's allowlist, becomes plain text.
- **Nothing was cited but the book was searched**: up to three of the best book hits are offered as related reading.
- **A page hint that is not a real book page**, or is malformed or too long: ignored, and the answer is produced without the page context.
- **The browser blocks device storage** (private browsing): the level, the code and the conversation simply do not persist; nothing throws and the tutor keeps working.
- **No byte arrives within five seconds**: the "waking up the tutor" status shows, and the answer arrives when it arrives or the request fails cleanly.
- **A rating for an answer the tutor never issued**: refused as not found. With logging off, it is accepted and does nothing.
- **Storage failing mid-turn**: the answer is still delivered; the failure is logged and never shown to the learner.
- **The tutor is switched off while an answer is streaming**: whether the open answer finishes or is cut off is an open question for the owner — see FR-059.

## Requirements *(mandatory)*

### Functional Requirements

**One tutor, one agent, additive to what exists (§2 rows 1–4; §7.1, §7.3)**

- **FR-001**: The tutor MUST be exactly one agent. Modes and levels MUST be settings on that one agent, never separate agents or separate pipelines, and the design MUST keep a later handoff between several agents possible without a rewrite (§2 row 2; §7.16).
- **FR-002**: The feature MUST be additive: the existing chat box, the existing chat endpoints, the existing provider layer and the existing rule files are extended, not restructured. In scope for this feature are the provider integration, the book index and its ingestion, web search, the mode and level definitions, instruction composition, the turn pipeline, the source registry, conversation-history handling, privacy scrubbing, the limits, streaming, telemetry, anonymous storage, the operator scripts, the eval suite, the deployable package, the automatic re-index workflow and the public privacy page. None of these MAY be moved to a later feature (§7.1).
- **FR-003**: This feature is the tutor. A sign-in gate and payments are separate features with their own specs and MUST NOT be built here (§2 row 1).
- **FR-004**: The tutor MUST run on the agent runtime the owner locked — the OpenAI Agents SDK (Python) (§2 row 3) — chosen because it supports tool calls, streamed output and per-run token accounting, and that choice MUST be recorded as a decision record (§2 row 18).
- **FR-005**: All model access MUST go through the project's own provider interface, so that the provider, the model, the base address, the timeout, the retry count and the credential are configuration only — swapping any of them MUST require no code change. With no provider configured, the application MUST still start and its liveness check MUST still pass (Constitution Principle II; §7.3).
- **FR-006**: The tutor MUST run on the model the owner locked, `deepseek/deepseek-v4.1-flash`, reached through the provider's API, and that model name MUST be configuration whose documented default is that value. While only the owner tests the tutor, the credential in use MUST be the owner's own test credential, which is licensed for the owner's testing only. Before anyone other than the owner uses the tutor, a credential that permits use in a public application MUST be substituted, and that substitution MUST be configuration only (§2 row 4).
- **FR-007**: No request and no run MUST depend on the model vendor's own hosted tracing, prompt logging or a second vendor credential. Tracing MUST be off for every run (§7.3).
- **FR-008**: A missing or unusable provider credential MUST be reported as its own "provider not configured" refusal, not as an internal error (§7.3; §7.9).
- **FR-009**: Every runtime value this feature needs — limits, caps, prices, model, addresses, timeouts, budgets, retention, allowances — MUST be configuration with a documented default, published with a comment in the environment example file, and no such value may be hardcoded. If the tutor is switched on but its provider or signing secret is missing, an error MUST be logged, the chat surface MUST refuse cleanly, and the application MUST still start (§7.2; Constitution Operational Standards).

**Modes and levels (§2 rows 7, 8; §7.4)**

- **FR-010**: There MUST be exactly six modes, with these ids fixed by the chat box: `deep-research`, `deep-think`, `document-writer`, `note-taker`, `book-aware`, `world-aware` (§2 row 7).
- **FR-011**: When a learner picks no mode, the tutor MUST behave as book-first: search the book, answer from it and cite it when it covers the question, and otherwise say so in one short line and answer from general knowledge (§2 row 7).
- **FR-012**: Each mode's behaviour — which tools it may use, how many steps it may take, its answer-size budget, whether it may use extended reasoning, its temperature, its cost class, its future tier, and whether it is enabled — MUST be configuration. Adding, disabling or retuning a mode MUST NOT require changing the answering pipeline or the chat box (§7.4).
- **FR-013**: Every mode's answer-size budget MUST leave headroom above the visible answer for the model's internal reasoning, because the provider bills reasoning against that same budget. Measured evidence from the provider probe: a request capped at 32 tokens returned no visible characters at all (§7.4; `research.md` §1).
- **FR-014**: The "search the book first" requirement for the book-first and Book-Aware modes MUST be carried by those modes' instructions. It MUST NOT be expressed as a forced tool choice, because the provider rejects a forced tool choice with HTTP 400 and the message "Thinking mode does not support this tool_choice" (measured; `research.md` §1; §7.4).
- **FR-015**: There MUST be exactly two levels, `student` and `professional`. Student MUST be the default, and a request that names no level MUST be answered at Student. A level MUST change only the teaching instruction block, nothing else about the turn (§2 row 8; §7.4).
- **FR-016**: At Student level the tutor MUST teach: give one hint and one short question before any solution, use small code pieces that each show one idea, never produce a complete ready-to-run program for the learner's task, check understanding after explaining something new, and tell the learner they can switch to Professional for fuller answers. At Professional level the tutor MUST be direct and dense, give complete explanatory code examples and explain the syntax that matters, and stay inside the book's scope — never building a real application, a company system or client work (§2 row 8; §10.1).
- **FR-017**: The configuration the chat box reads MUST report, per mode, whether that mode is available, and an unavailable mode MUST be refused with its own distinct code and its own reader-facing message (§7.9; §7.12).
- **FR-018**: Web searching MUST be available in Deep Research only. No other mode MAY use it (§2 row 6; §7.4).
- **FR-019**: Each mode's future free-or-paid tier MUST be recorded as data and MUST NOT be enforced, and it MUST NOT be shown to the learner without owner-supplied wording [NEEDS CLARIFICATION: whether a paid tier is visible on the Deep Research and Deep Think pills in 1.0, and if so with what wording — §2 row 20 stores the tier without enforcing it and §10.2 supplies no string for it] (§2 row 20; §7.4).

**One turn, and the stream (§7.5, §7.9)**

- **FR-020**: One question MUST be handled as one turn: validate the request, apply the limits, check the history, build the turn's context (turn id, conversation id, mode, level, page route and title, the search and source machinery, counters), run the tutor, and finish by validating citations, signing the answer, reporting usage and storing the turn. Every turn MUST get its own id, and a conversation MUST keep one id across its turns, created by the server when the client does not send one (§7.5; §7.9).
- **FR-021**: The answer MUST stream to the learner as it is produced, with status signals for searching the book, searching the web, thinking and writing, and with a keep-alive signal at least every 15 seconds so that no intermediary buffers or times out the stream (§7.5; §7.9).
- **FR-022**: The final event of a successful turn MUST carry the complete final answer text, the cited sources, any related reading, a signature over the answer, the reason the answer ended, and the turn's token usage (§7.9).
- **FR-023**: The model's reasoning text MUST never be sent to the learner, written to a log, or stored (§7.5; §7.11). No part of the design MAY depend on the provider returning reasoning under any particular field name, because the provider does not return the field §7.3 assumed (measured; `research.md` §1).
- **FR-024**: Before streaming has started, a refusal MUST be an HTTP status with a machine-readable code in a JSON body. After streaming has started, a failure MUST arrive as an error event on the same open stream. Stack traces and raw provider messages MUST never reach the learner (§7.9).
- **FR-025**: These refusals MUST each exist as its own code with the exact identifier and HTTP status §7.9 gives it, with its own reader-facing message where the supplied wording provides one, and a retry hint where waiting helps: `invalid_request` (400), `access_denied` (403), `mode_unavailable` (409), `too_long` (413), `rate_limited` (429), `busy` (429), `chat_disabled` (503), `budget_exhausted` (503), `provider_not_configured` (503), `upstream_error` (502), `upstream_timeout` (504), `internal_error` (500) (§7.9).
- **FR-026**: The length of a question and the size of a request body MUST both be capped (4000 characters and 64 KB by default), the excess MUST be refused as "too long" before any model work starts, and the character cap MUST be published to the chat box so its message can name it (§7.2; §7.9).
- **FR-027**: Conversation history MAY be sent back with a question and MUST be bounded (12 messages and 16 000 characters by default), with the oldest entries dropped first. Any assistant entry whose signature does not verify MUST be dropped before the run, and the drop MUST be counted in the logs (§7.9).
- **FR-028**: A page route sent by the chat box MUST be validated (it must start with "/" and be at most 200 characters) and MUST be used only when it matches a real book page; the page's title MUST come from the index the book is built from, not from the client's text (§7.5; §7.9).
- **FR-029**: A non-streaming request MUST run the same pipeline and return the same answer as structured data, for the test suite and for hand checks (§7.9; §8).
- **FR-030**: If an answer ends at its length limit after producing some text, the finished answer MUST carry the "this answer got cut short" line. If it ends that way with no text at all, the turn MUST be reported as a provider error (§7.5).
- **FR-031**: When the learner stops an answer or the connection drops, the run MUST be cancelled, the limits it held MUST be released, and the turn MUST be recorded as cancelled (§7.5).
- **FR-032**: Retries MUST happen only before the first token of an answer. Nothing MAY be retried once the learner has seen text (§7.2).
- **FR-033**: A finished answer MUST be signed, so that the chat box can send it back later and the tutor can verify it belongs to this conversation. An answer that cannot be verified MUST NOT be allowed back into the conversation (§7.9).

**Book search (RAG) (§2 row 5; §7.6)**

- **FR-034**: The whole book index MUST be built by one command, with no manual steps, on a developer's machine with no account and in the deployed environment (§7.6).
- **FR-035**: Only real chapter and reference pages MUST be indexed, chosen by the same folder and skip rules the site's own search index uses, with placeholder pages excluded (§7.6). The manifest of indexed pages MUST use the same heading anchors the site itself generates, so that a citation's link lands on the exact section (§7.6).
- **FR-036**: Page content MUST be cleaned before indexing: front matter, import and export lines and HTML comments dropped; the inner text of embedded components kept with the component's tag dropped and its title turned into a lead-in; admonition blocks turned into a readable "Type — Title:" form; code blocks kept whole with their language; tables kept; images turned into their alt text; links reduced to their text (§7.6).
- **FR-037**: The cleaner MUST split at second- and third-level headings first, then into size-bounded pieces with overlap (450 tokens with 60 overlap by default). It MUST never split inside a code block: an oversized block is split at blank lines or kept whole up to 1200 tokens. Each piece's embedded text MUST be prefixed with its page path and heading trail (§7.6).
- **FR-038**: Every indexed piece MUST record its route, its anchor, its full link, its title, its heading trail, its document type, its stage, its source file, a content hash, its position on the page, and the version of the corpus it came from (§7.6).
- **FR-039**: Retrieval MUST combine a dense and a sparse query and fuse the two, returning the configured number of candidates (12 by default) cut down to the configured number of results (5 by default). If the learner is on a book page, up to two further candidates from that page MUST be included. Reranking MUST exist only as a hook and MUST be off (§7.6).
- **FR-040**: The number of book searches a single answer may make MUST be capped (3 by default) and enforced by the search tool itself (§7.2; §7.6).
- **FR-041**: Ingestion MUST be incremental: an unchanged page is skipped, a changed page has its old pieces replaced, a removed page has its pieces deleted, and piece identity MUST be deterministic so that re-running changes nothing. A full rebuild MUST build a new versioned store, verify its count, switch the stable name over, and only then delete the old one. A dry run MUST print counts only; a normal run MUST report files, pieces, skipped, deleted, and seconds (§7.6).
- **FR-042**: Re-indexing MUST run automatically — on a manual trigger, and on any push to `main` that touches the book's pages. It MUST skip cleanly, with no failure, when the vector store's credentials are not configured (§7.6; §7.1).
- **FR-043**: Development without an account MUST work against a local embedded store, and automated tests MUST use their own temporary store, never a network service and never shared state between tests (§7.6; §8).
- **FR-044**: Book search MUST sit behind the project's own retriever interface, so the engine underneath can be replaced without touching the tutor. Embeddings MUST be produced locally: no key, no cost, and no book text leaving the machine. The engine is the locked stack — LlamaIndex for ingestion and retrieval over Qdrant as the vector store, on Qdrant Cloud's free tier in production and a local embedded store in development (§2 row 5; Constitution Principle II; §7.6).
- **FR-045**: Nothing MAY be tuned to today's chapters, their names, their routes or their size. The book will be rewritten and will grow by orders of magnitude, and the index MUST survive a full replacement of the corpus (build prompt §1; §2 row 5; §7.6).

**Web search, Deep Research only (§2 row 6; §7.7)**

- **FR-046**: Deep Research MUST use a free-tier web-search service chosen by the project's standards research (RESEARCH-1) and approved by the owner before that mode carries traffic. Its credential MUST be configuration and MUST be stored as a secret (§7.7).
- **FR-047**: A web result MUST carry a title, a link, a snippet and a bounded extract of the page; safe search MUST be on and each request MUST have a timeout (§7.7).
- **FR-048**: Web searches MUST be capped per answer (4 by default) and per day (30 by default). When a cap is reached, or when no provider is configured, the search tool MUST return the supplied short text "Web search is unavailable right now." to the tutor, and Deep Research's instructions MUST handle that case by saying so at the start and labelling what came from the book and what came from general knowledge (§7.7).
- **FR-049**: Only short search phrases MAY leave the system. The learner's whole message MUST never be forwarded to the web-search service (§10.3).

**Sources (§2 row 13; §7.8)**

- **FR-050**: Sources MUST always be shown under any answer that used the book or the web, and they MUST also be present in the stored turn and in the non-streaming response [NEEDS CLARIFICATION: what the chat box shows where sources go when an answer used neither the book nor the web, and whether that needs its own reader-facing wording — §7.8 defines only the cited and related cases, and §10.2 supplies no string for an empty sources area] (§2 row 13; §7.8).
- **FR-051**: Within a turn, book results MUST be numbered `B1`, `B2`, … and web results `W1`, `W2`, …; the tools MUST hand the tutor source blocks carrying the id, title, link and text; and a per-turn register MUST map each id to its kind, title, heading trail or site, link, and an extract of at most 240 characters (§7.8).
- **FR-052**: After the answer is produced, only citation markers that exist in the register MAY survive; every other marker MUST be removed. The sources shown MUST be the cited ones in order of first use. If the book was searched but nothing was cited, up to three of the best book hits MUST be offered as related reading (§7.8).
- **FR-053**: An internal link in an answer MUST be a real book route. An external link MUST have come from a web search or be on the owner-approved allowlist. Any other link MUST be shown as plain text (§7.8).
- **FR-054**: A book source item MUST carry its title, its section heading, its link and its extract; a web source item MUST carry its id, title, link and site. The existing citation shape MUST be extended additively rather than replaced (§7.8).

**The client-visible contract (§7.9)**

- **FR-055**: A configuration endpoint MUST tell the chat box whether the tutor is enabled, whether an access code is required, which modes exist and which are available, which levels exist, the question-length cap, and whether web search is available (§7.9).
- **FR-056**: The access code MUST travel in its own request header. The per-person identifier MUST travel in a separate header, be a random value created by the browser, and be used in memory only — never stored, never logged (§7.9; §7.10).
- **FR-057**: Only origins on the configured allowlist MAY call these endpoints; only the needed methods and the three named headers are permitted; credentials MUST NOT be accepted (§7.9).
- **FR-058**: A rating MUST be submitted for a finished turn as helpful or not helpful, with an optional reason from the fixed set (wrong, unclear, unsafe, other). It MUST be accepted with no response body; an unknown turn MUST be refused as not found; with logging off it MUST be accepted as a no-op (§7.9).

**Limits (§2 row 14; §7.10)**

- **FR-059**: The limits MUST be checked in this order: the switch, the access code, the budget pre-check, concurrency, then the per-person allowance. The kill switch MUST let the owner turn the tutor off, and while it is off every request MUST be refused with the "switched off" code and message while the book stays fully readable. What happens to an answer already streaming at the moment the tutor is switched off is [NEEDS CLARIFICATION: whether switching off aborts answers already streaming or lets them finish — §7.10 defines the switch only as a per-request check] (§7.10).
- **FR-060**: When an access code is configured, every request MUST require it, compared in a way that does not leak the value through timing; a missing or wrong code MUST be refused as access denied (§7.10; §7.9).
- **FR-061**: Before any model work starts, the remaining daily budget MUST be checked against the minimum cost of the requested mode (0.01 for normal modes, 0.03 for deep modes by default); if it is not available the request MUST be refused as budget exhausted with a retry hint (§7.10; §7.2).
- **FR-062**: At most three answers MAY be in flight at once, with no queue; further requests MUST be refused as busy with a short retry hint (§7.10; §7.2).
- **FR-063**: A per-person allowance MUST be built but MUST be switched off by default. When switched on it MUST be keyed both by the browser's identifier and by a salted hash of the caller's address, and the lower of the two counts MUST be used. It MUST refill over time (10 units per person, one back every 180 seconds by default), and a refusal MUST tell the learner how long to wait (§2 row 14; §7.10; §7.2).
- **FR-064**: The tutor MUST stop spending at $1.00 per day, measured in the owner's timezone (`Asia/Karachi`). The cost of every model call MUST be accumulated during the run from real usage — input tokens, cached input tokens and output tokens, including reasoning tokens, at the configured prices. When the day's total crosses the cap, the running answer MUST finish and every new request MUST be refused as budget exhausted until the next day. The daily total MUST be persisted per day when storage is on, and kept in memory otherwise (§2 row 14; §7.10; §7.2).
- **FR-065**: Addresses and browser identifiers MUST never be stored. Only their hashes MAY exist, in memory, for the length of a request (§7.10).

**Storage and privacy (§2 row 12; §7.11)**

- **FR-066**: Each stored turn MUST record the turn id, the time, the conversation id, the mode, the level, the script of the question, the question, the answer, the sources (their ids and links), how many book and web searches were made, input and output token counts, the estimated cost, the total latency, the time to first token, why the turn ended, any error code, the tutor-instruction version, the model, and the version of the book corpus. Each rating MUST record its turn, the time, the rating and the reason. Daily usage MUST record the day, the spend, the number of requests and the number of web searches (§7.11).
- **FR-067**: These MUST never be stored anywhere: names, email addresses, phone numbers, addresses of devices, browser identity strings, per-person identifiers, access codes, cookies, and the model's reasoning text (§2 row 12; §7.11).
- **FR-068**: Before anything is stored, personal details MUST be scrubbed out of the question and the answer: email addresses, phone numbers (Pakistani and international forms), identity-card-shaped numbers, card-like runs of digits, and secret-looking tokens MUST each be replaced with a plain placeholder. The tutor MUST still receive the learner's original message. Every scrubbing pattern MUST be unit-tested (§7.11).
- **FR-069**: Retention MUST be configurable, and its default MUST be "keep until the owner deletes it". When a positive retention period is configured, expired rows MUST be purged at start-up and every 24 hours (§2 row 12; §7.11).
- **FR-070**: Storage MUST be switchable off and MUST be absent-safe: with no database configured, or logging switched off, the tutor MUST answer exactly as it otherwise would. Storing a turn MUST happen off the response path, and a storage failure MUST be logged and never shown to the learner nor allowed to break an answer (§7.11).
- **FR-071**: There is no opt-out switch for saved questions, and none MAY be implied. Transparency MUST instead come from two things: a plain-language notice shown before the first question — what is saved, what never is, and why — remembered on the device once acknowledged, and a public privacy page carrying the same promises in full, linked from the notice and always reachable from the chat box's footer line (§2 row 12; §7.12; §10.3).
- **FR-072**: The owner MUST have three operator tools and no admin panel: export the logs to a spreadsheet format, a summary of counts by day, mode, level and rating plus spend and error rates, and a purge of rows older than a stated number of days that asks for confirmation first (§7.11).
- **FR-073**: The script of each question (Latin, Arabic or mixed) MUST be recorded so the owner can see how much of the traffic is Roman Urdu or Urdu (§7.11).

**The chat box (§2 rows 9, 10, 11, 13, 17; §7.12)**

- **FR-074**: The existing chat box MUST be extended, keeping its design, its design tokens, its dialog behaviour, its focus handling, its mode pills and its motion. It MUST work in light and dark mode, MUST collapse decorative motion when reduced motion is requested, MUST be complete with the keyboard, and MUST keep every touch target at least 44 pixels (Constitution Principle VII; §7.12).
- **FR-075**: Before a chat service is configured, the chat box MUST keep the existing switched-off reveal unchanged, and that reveal is true in that state. The "no api connected · nothing transmitted" line and any claim that nothing left the page MAY appear only in that state, and MUST be impossible to show once the tutor is reachable (build prompt §4 "Honesty"; §7.12).
- **FR-076**: Once a chat service is configured, the chat box MUST read the configuration the first time it opens: a disabled tutor shows the switched-off message; a tutor needing an access code shows the private-test panel, and the accepted code MUST be remembered on that device only (§7.12).
- **FR-077**: The conversation UI MUST provide: a message list that announces each finished answer once and never every token, streaming text, a status line, Stop, Try again, New chat, Copy answer, an up/down rating with reason chips, sources under each answer, and the cut-short note (§7.12).
- **FR-078**: The current conversation MUST be kept in the browser tab so a refresh does not lose it, and starting a new chat MUST clear it. Nothing of the conversation MAY be kept beyond the device the learner is using (§7.12; §10.3).
- **FR-079**: The level control MUST be a two-option segment, Student and Professional, defaulting to Student, remembered on the device, and labelled for screen readers (§7.12).
- **FR-080**: The mode pills MUST keep their existing ids, an unavailable mode MUST be disabled, and it MUST show the supplied "not available right now" tooltip (§7.12).
- **FR-081**: The privacy notice MUST appear before the first question, be remembered once acknowledged, and link to the privacy page. The footer line "The tutor can make mistakes. Check important things against the book." MUST always be visible (§7.12).
- **FR-082**: Answers MUST be rendered as markdown with raw HTML switched off. Code MUST use the site's own code block presentation, internal links MUST navigate inside the book, and external links MUST open in a new tab with `noopener`, `noreferrer` and `nofollow`. A citation marker MUST become a small numbered link to its source item (§7.12).
- **FR-083**: The answer renderer MUST be loaded lazily the first time the chat box opens, so the page's weight does not grow, and the site MUST show no performance-audit regression (§7.12; §7.15).
- **FR-084**: The streaming client MUST read the stream incrementally rather than waiting for the whole response; MUST map every refusal code to its supplied message; MUST show the "can't reach the tutor" message when the connection itself fails; and MUST show the "waking up the tutor" status when no byte has arrived within five seconds (§7.12).
- **FR-085**: The chat box MUST generate a random device identifier once, keep it on the device, and send it in its own header. Every access to device storage MUST be guarded, because private browsing can block it (§7.12).
- **FR-086**: Enter MUST send, Shift+Enter MUST add a line, and Escape MUST stop a running answer and otherwise close the panel (§7.12).
- **FR-087**: Every word the learner sees MUST be the wording supplied for this feature, verbatim — the mode, level, status, source, action, feedback, access, error and privacy strings, the tutor's own instructions, and the privacy page's text. No reader-facing string MAY be invented by the builder; where one is needed and not supplied, the work MUST stop and the owner MUST be asked. Where a requirement below names a supplied message in shorter prose, the supplied text in §10 is authoritative and MUST be used complete and character-for-character (§2 row 17; §10).
- **FR-088**: Answers MUST be in easy English by default. A question written in Roman Urdu or Urdu MUST be answered the same way, with technical words kept in English (§2 row 10; §10.1).
- **FR-089**: The tutor MUST help with learning — the book's topics, computers, software, AI, and how to study. An off-topic question MUST get one kind sentence and an offer to help with their learning instead. A learner who seems to be in danger or in crisis MUST get a short, gentle reply encouraging them to talk to someone they trust right now and to contact local emergency services if they are in immediate danger. Harmful requests MUST be refused kindly and briefly (§2 row 11; §10.1).
- **FR-090**: If a learner says the work is for a graded assignment, test or exam, the tutor MUST teach the idea, give hints, look at the learner's own attempt and explain what went wrong. It MUST NOT produce what they would hand in (§10.1).
- **FR-091**: Text inside the tutor's source or selection tags, and anything the learner pastes, MUST be treated as material to read, never as instructions to follow. The tutor MUST NOT change its role, ignore its rules or reveal or summarise its instructions when asked. It MUST never claim to be a person, or to have feelings or a life of its own, and it MUST never invent facts, quotes, links, page names or sources (§10.1).
- **FR-092**: CS50 MUST NOT be mentioned anywhere in the tutor — not in its instructions, not in the chat box's words, not in its documentation. Honest work is handled in general terms, as FR-090 describes (§2 row 9).
- **FR-093**: The privacy page MUST be added as a new reference page in the book: the page itself with reference frontmatter only, an entry in the site's reference navigation, and its filename added to the list of pages the site's frontmatter check knows about (§7.12).

**Hosting and deployment (§2 rows 15, 16; §7.13)**

- **FR-094**: The tutor MUST be hosted at zero cost, with no card, on a service chosen by the project's standards research (RESEARCH-2) and approved by the owner, meeting these criteria: it accepts a container or Python 3.12; it has at least the measured peak memory plus 30 per cent; streaming works without buffering and a single request may run 150 seconds or more; outbound secure requests are allowed; it can deploy from the private repository or by command-line upload; it provides a secret store and a secure address; its cold-start time and its latency to Pakistan are known; and its terms allow this use (§7.13).
- **FR-095**: The deployable package MUST install the tutor's optional dependencies only, run as a non-root user, download the embedding models while building so a cold start does not have to, and expose a health check on the liveness route (§7.13).
- **FR-096**: Every secret — the provider credential, the vector store, the database, the web-search key and the access code — MUST live only in the ignored local environment file or the host's secret store. No secret MAY appear in code, tests, fixtures, logs, documentation, specs, prompt-history records, commit messages or chat output. Before every commit the staged changes MUST be checked for the ignored environment files and searched for the credential shapes the project lists, and any hit MUST stop the work and be reported to the owner (build prompt §4; Constitution Security & Privacy).
- **FR-097**: After deployment the site's allowed origins MUST include the live site address plus the local development address, and the site's API address MUST be set in the site host's settings rather than in code (§7.13).
- **FR-098**: The repository MUST stay private, and the deployment MUST be able to come from it (§2 rows 15, 16).

**Observability and health (§7.14)**

- **FR-099**: The tutor MUST write one structured log line per turn carrying the time, the event, the turn id, mode, level, HTTP status, total latency, time to first token, book and web search counts, input and output tokens, estimated cost, the instruction version, the corpus version and any error code. Message text, secrets, addresses and device identifiers MUST never be logged, and no free-form print calls MAY remain on this path (build prompt §4; §7.14; Constitution Operational Standards). Each line MUST be a single JSON object written to standard output (§7.14).
- **FR-100**: The liveness check MUST stay as cheap as it is today. The readiness check MUST report whether the provider is configured, whether chat is enabled, whether the book index is reachable and how many pieces it holds, whether web search is configured, and whether storage is reachable or deliberately off. Its tests MUST be updated (§7.14).

**Tests, evals and quality gates (§8; §2 row 19)**

- **FR-101**: The backend test suite MUST run offline and deterministically, with no network and no real credentials. The provider MUST be faked below the code's own provider interface so the real request path is exercised, and the test documents MUST be invented fixtures — front matter, a placeholder page, an embedded component, an admonition, a code block, a table and nested headings — never today's chapters (§8).
- **FR-102**: The suite MUST cover at least: configuration and the not-configured refusal; the kill switch, the access code, the budget pre-check, budget exhaustion and the daily reset, the concurrency limit and the per-person allowance when enabled; streaming framing and the keep-alive signal, a full stream ending with a valid signature, the tool path's status and sources events, the removal of unknown citation markers, and the link allowlist; history signatures and truncation, every scrubbing pattern, the absence of identity fields in a stored row, and the rating responses; the allowed and blocked origins, the oversized body, and the guarantee that no secret reaches the logs; and ingestion — cleaning, never splitting a code block, deterministic identity, incremental changes for a changed and a deleted page, and the use of the index's anchors (§8).
- **FR-103**: The placeholder chat test MUST be replaced. The two tests covering the still-unavailable personalization and translation endpoints MUST stay. The readiness and provider-list tests MUST be updated. The continuous integration MUST gain a backend job that installs the tutor's dependencies and runs the linter, the type checker and the test suite (§8).
- **FR-104**: The frontend MUST pass its type check, its linter and its build. The accessibility and performance audit summary MUST be kept from step 0 and compared against a fresh one after the chat box work, and any score that dropped MUST be reported to the owner (§8; §9).
- **FR-105**: A golden evaluation set of about 60 cases MUST exist and MUST cover every mode, including no mode, at both levels; about a quarter in Roman Urdu plus a few in Urdu script; safety (harm and crisis); honest work ("this is for my graded assignment"); off-topic questions; prompt injection both in the message and inside an invented web page; and "not in the book". Its checks MUST be deterministic: the required tool call, the required citation, a maximum code-block length (12 lines at Student level), the reply's script, and text that must not appear. Book cases MUST be generated from whatever is currently indexed, so the set never depends on today's chapters (§8).
- **FR-106**: A retrieval evaluation MUST build synthetic question-to-passage pairs from the current index and report ranking quality (hit@5 and MRR), targeting hit@5 of at least 0.85 (§8).
- **FR-107**: Each evaluation run MUST produce a report, kept out of version control, containing the pass rate per check and per mode, cost and latency, the solution-leakage rate — the share of Student answers containing a code block longer than 12 lines — and ten sample answers in full for the owner to read (§8).
- **FR-108**: All six quality gates MUST be green before this phase ships: the backend linter, the backend type check, the backend test suite, the frontend type check, the frontend linter and the site build (build prompt §1; Constitution Development Workflow).

**Workflow and definition of done (§2 rows 16, 18, 19; build prompt §1, §9)**

- **FR-109**: Version control MUST be one `main` line pushed to the private repository: no branches, no worktrees, no rebase, no force-push, no pull requests. Each verified step MUST be committed with a message naming the feature or task, and pushing MUST happen only after the owner's approval (Constitution v3.2.0 Development Workflow; §2 row 16).
- **FR-110**: Every big step MUST end at a checkpoint: show what is done and how it was verified, the files changed and the live-model spend so far, say what is needed from the owner, give the standing reminder that the owner's own comparison of other chatbots is still pending, and then wait for approval before continuing (§0; §2 row 19; §9).
- **FR-111**: Progress MUST live in the repository, not in the chat: task checkboxes ticked as work completes, one dated line per step, and a prompt-history record after every owner message using the project's template, with the owner's words verbatim and every secret replaced (§0).
- **FR-112**: The governance artifacts MUST be updated as part of this feature: the rule files, one decision record per architecturally significant choice (the runtime, the book-search approach, the model access and key policy, the web-search service, the hosting, the anonymous logging and retention, and adopting version control), a stack entry for every new service or library recording its free limit and the point at which it would start costing money, this spec's plan, tasks and quickstart, the project map, and a runbook covering how to switch the tutor off, change the key, provider or model, rotate the secrets, re-index the book, export or purge the logs, and raise the daily cap (§2 row 18; build prompt §1, §9).
- **FR-113**: All live model calls made while building this feature — the probe, manual tests, latency runs and evaluations — MUST share one ceiling of $1.00 a day, the same money the tutor's own cap protects, and each evaluation run MUST stop at its own per-run cap (0.50 by default). More than that MUST be asked for first, and spend MUST be reported at every checkpoint (build prompt §4; §7.2).
- **FR-114**: Before this phase ships, the design-fidelity audit MUST pass: blur has a non-blur fallback, light and dark both render every surface from defined tokens, reduced motion collapses decorative motion, focus is visible on every interactive element, and no hard border stands in for missing elevation (Constitution Operational Standards; §7.12).
- **FR-115**: Every new service or library MUST sit on a free tier, be recorded in the stack with its ceiling, and MUST NOT come from the stack's do-not-add list. Leaving a free tier requires evidence and a decision record (Constitution Principles I, Stack Constraints).
- **FR-116**: The design MUST leave room for what comes later without a rewrite, and MUST NOT build any of it: a sign-in gate, a free-question allowance of 10 to 20 questions, enforcement of the free-versus-paid mode tiers, saved chat history for paying users, payments, handoffs between several agents, a reranker, an Urdu corpus, and the personalization and translation features (§2 row 20; §7.16).

### Non-Functional Requirements

- **NFR-001**: On a warm server, a normal-mode answer MUST show its first token within 4 seconds at the 95th percentile and be complete within 20 seconds at the 95th percentile, measured over 20 runs (§7.15).
- **NFR-002**: A deep-mode answer MUST be complete within 120 seconds (§7.15).
- **NFR-003**: Book retrieval on the host MUST complete within 800 milliseconds at the 95th percentile (§7.15).
- **NFR-004**: The server's memory use MUST stay at most the host's memory minus 30 per cent, and the host MUST be chosen from the measured peak plus 30 per cent headroom (§7.13; §7.15).
- **NFR-005**: The book site MUST show no performance-audit regression, with the chat code loaded lazily (§7.15).
- **NFR-006**: Tutor spend MUST NOT exceed $1.00 per day in the owner's timezone, and an evaluation run MUST NOT exceed $0.50 by default (§7.2; §7.10).
- **NFR-007**: Nothing that identifies a person MUST be stored: no names, email addresses, phone numbers, device addresses, browser identity strings, per-person identifiers, access codes, cookies or reasoning text. Personal details MUST be scrubbed before storage, and no personal data MAY appear in logs (§2 row 12; §7.11; Constitution Security & Privacy).
- **NFR-008**: The tutor MUST degrade honestly and keep the book usable: with the provider down, storage down, web search unavailable, the budget spent, or the tutor switched off, the learner gets a clear state and the book remains fully readable (§7.9; §7.11).
- **NFR-009**: Every surface the student touches MUST work in light and dark mode, with reduced motion, with the keyboard, and at 44-pixel touch targets, using the existing design tokens and adding no new visual language (Constitution Principles VII, Operational Standards).
- **NFR-010**: No secret MAY be present in any tracked file, test, fixture, log, document, spec or commit message, and the tutor MUST NOT start serving anyone beyond the owner until a credential that permits public use is in place (§2 row 4; Constitution Security & Privacy).

### Key Entities *(include if feature involves data)*

- **Turn**: one question and its answer, with its own id, the conversation it belongs to, the mode and level used, the question, the answer, the sources it cited, the searches and tokens it used, what it cost, how long it took, why it ended, and the versions of the instructions and the book index it ran against.
- **Conversation**: one id shared by several turns, created by the server when the browser does not supply one; it carries no identity and links to nothing outside itself.
- **Mode**: an id from the fixed six, with its tool list, step budget, answer-size budget, reasoning setting, temperature, cost class, future tier and whether it is available.
- **Level**: `student` or `professional`; the default is `student`.
- **Book passage**: one indexed piece of a page, with its route, anchor, link, title, heading trail, document type, stage, source file, a content hash, its position and the corpus version it came from.
- **Book source item**: a cited piece of the book, with its title, section heading, link and a short extract.
- **Web source item**: a cited web page, with its id, title, link and site.
- **Source register**: the per-turn map from a citation marker to the item it points at, holding the kind, title, heading trail or site, link and extract.
- **Rating**: a helpful or not-helpful judgement on one turn, with an optional reason from a fixed set, and no attribution.
- **Daily usage**: the day, the money spent, the number of requests and the number of web searches, held in the owner's timezone.
- **Access code**: the owner's private pass value, never shown to a learner and never stored in a tracked file.
- **Device identifier**: a random value the browser creates and keeps, used in memory for the per-person allowance only.
- **Book index manifest**: the list of real pages with their routes, titles, document types, stages and heading anchors, shared with the site so both agree on addresses.
- **Instruction set**: the composed tutor instructions plus a short version fingerprint, stored with each turn so an answer can be traced to the instructions that produced it.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Over 20 runs on a warm server, a normal-mode answer shows its first token within 4 seconds and completes within 20 seconds at the 95th percentile (NFR-001).
- **SC-002**: A deep-mode answer completes within 120 seconds, measured over the same runs (NFR-002).
- **SC-003**: Book retrieval on the host answers within 800 milliseconds at the 95th percentile (NFR-003).
- **SC-004**: The server's measured memory stays within the chosen host's memory minus 30 per cent (NFR-004).
- **SC-005**: The retrieval evaluation reports hit@5 of at least 0.85 on question-to-passage pairs built from the current index (FR-106).
- **SC-006**: Every case in the golden evaluation set that requires a citation shows at least one cited source, so sources appear on 100 per cent of answers that used the book or the web (FR-050; FR-105).
- **SC-007**: No Student-level golden case contains a code block longer than 12 lines — the solution-leakage rate at Student level is 0 per cent on the evaluation set (FR-105; FR-107).
- **SC-008**: A full evaluation run costs no more than the per-run cap, and no day of tutor use exceeds $1.00 (NFR-006).
- **SC-009**: All six quality gates pass: backend linter, backend type check, backend test suite, frontend type check, frontend linter and the site build (FR-108).
- **SC-010**: The whole book index is built by one command, and re-running it on an unchanged corpus changes nothing, while a changed page and a deleted page are both reflected (FR-034; FR-041).
- **SC-011**: A rating submitted for a finished answer is accepted and appears exactly once against that answer; a rating for an unknown answer is refused as not found; with logging off, both are accepted and change nothing (FR-058).
- **SC-012**: Across the test suite and an evaluation run, no stored row contains a name, email address, phone number, device address, browser identity string, per-person identifier, access code or reasoning text (NFR-007).
- **SC-013**: With no provider configured and the tutor's optional dependencies absent, the application starts and its liveness check passes (FR-005).
- **SC-014**: The site's performance audit shows no regression against the baseline taken before the chat work, with the chat code loaded lazily (NFR-005).
- **SC-015**: The owner opens the online tutor on a phone, enters the access code, asks a question in at least two modes, and gets a streamed, sourced answer (build prompt §1; §9).
- **SC-016**: In a fresh browser session the privacy notice appears before the first question, and the footer line is visible in every panel state (FR-071; FR-081).

## Out of Scope

Each item below is **not built in 1.0**. It is listed because the design must *allow* it without a rewrite — the seams named are the ones that make it cheap later, and building any of them now is a scope breach (§2 row 20; §7.16).

- **A sign-in gate.** The design must allow a login check to be added in front of the tutor later (a separate authentication feature, with its own spec). The access code stays the only gate in 1.0.
- **A free-question allowance (10 to 20 questions).** The per-person allowance must exist and stay switched off, so a quota can be configured without touching the answering pipeline.
- **Paid mode tiers.** Each mode must carry its free-or-paid tier as data, unenforced, and the design must allow the cheap modes to stay free while Deep Research and Deep Think become paid.
- **Saved chat history for paying users.** Conversations must already be identified, and stored turns already carry their conversation id, so history can be assembled later. In 1.0 a conversation lives only in the learner's browser tab.
- **Payments.** Nothing payment-related is built, and no learner-facing wording for tiers or prices may be invented without the owner's text.
- **Handoffs between several agents.** One agent, with the modes as settings on it. The design must return a single agent object that a future orchestrator could compose.
- **A reranker for book search.** The hook must exist and stay off, so a reranker can be turned on without changing retrieval's interface.
- **An Urdu corpus.** Urdu questions are mirrored back in Urdu today; indexing an Urdu book is not in 1.0.
- **The existing personalization and translation endpoints.** They stay unavailable, and this feature does not touch them.

## Pending Owner Inputs

These four items do not block building or testing the tutor, but each one blocks real public use. They are recorded here so they are not discovered late.

1. **The owner's own comparison of other chatbots (research Pass 2).** The project's discipline requires the owner's personal comparative study before a platform feature ships; it is still outstanding, and the owner is reminded at every checkpoint.
2. **The per-person question limit.** The allowance is built and left off; the owner has not yet decided the number, so no learner is limited today.
3. **The real student test questions.** The evaluation set is written from the indexed book for now; the owner supplies real student questions later, and the set is extended with them.
4. **An application-permitted credential before anyone but the owner uses the tutor.** Until the owner swaps in a key whose terms permit use in a public application, the access code and the owner's own testing are the only users the tutor may serve. The swap is configuration only.
