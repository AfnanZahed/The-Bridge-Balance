# ADR-0002: Text-First, Video-Second Workflow (Principle III Amendment)

- **Status:** Accepted
- **Date:** 2026-08-17
- **Feature:** book-foundation (clarification impact)
- **Context:** Constitution v1.0.0 Principle III ("Lecture-First, Text-Second Delivery") assumed the textbook's primary medium is the video lecture, with MDX chapters as the secondary documentation. The clarification session for `001-book-foundation` (PHR `0002-clarify-book-foundation.clarify.prompt.md`, Q3 2026-08-17) revealed the actual workflow is the inverse: the project owner and Claude Code co-research each topic; Claude Code writes the detailed text lectures into MDX; the project owner records the video lecture afterward; the project owner also produces diagrams / AI-generated explanatory images that Claude Code integrates. The text precedes the video for each chapter.

<!-- Significance checklist
     1) Impact: redefines the project's primary authoring loop and Claude Code's role. — yes.
     2) Alternatives: lecture-first retained vs. two-track separation considered — yes.
     3) Scope: cross-cuts content workflow, contributor model, and downstream features (RAG, personalization, translation). — yes.
     All three true → ADR justified. -->

## Decision

1. **Invert Principle III.** The textbook's primary authored artifact is the **text lecture** (MDX chapter); the video lecture is the recorded companion that arrives afterward.
2. **Adopt the co-authoring model.**
   - **Step 1 — Co-research.** The project owner (Dell) and Claude Code jointly research each topic and sub-topic. Inputs include the platform spec, prior chapters, and any external references Dell provides.
   - **Step 2 — Text writing.** Claude Code writes the detailed text lecture into the chapter's MDX file. Output: a `text-ready` chapter with full outline, transcript-equivalent prose, code snippets, and "check your understanding" questions.
   - **Step 3 — Image integration.** Dell produces diagrams and explanatory visuals using AI tools (image generators), saves them under `edu-site/static/img/<chapter-slug>/`, and hands them to Claude Code. Claude Code integrates them into the MDX with alt text and captions.
   - **Step 4 — Video recording.** Dell records the video lecture against the now-complete text, then adds the video URL (YouTube or self-hosted) to the chapter. Output: `video-published`.
3. **Three explicit chapter states.** A reader sees one of three states per chapter:
   - `placeholder` — no text yet (the spec's prior "awaiting lecture" state, renamed).
   - `text-ready` — text + images present, no video yet. **Explicitly says "video lecture coming soon."**
   - `video-published` — text + images + video link present.
4. **Images are a first-class entity** in the spec (added in Q3): a diagram / explanatory visual stored under `edu-site/static/img/<chapter-slug>/`, referenced from MDX, with alt text for accessibility.
5. **Claude Code is a content author**, not just a documentation formatter. The constitution should reflect this in its language; downstream artifacts (plan, tasks, README) follow.

## Consequences

### Positive

- **Faster publishing cycle.** Text can ship while Dell is still editing the video. The textbook is never blocked on video production.
- **Better separation of concerns.** Claude Code is responsible for *what* is taught (text, accuracy, structure); Dell is responsible for *how* it's presented (video, tone, pacing).
- **Higher content density.** Writing text in MDX forces precision that benefits both readers and the eventual RAG chatbot (Phase B) — well-structured MDX is good retrieval data.
- **Reusable text.** The same MDX becomes input for translation (Phase B), personalization (Phase B), and the RAG corpus — without re-deriving it from a transcript.

### Negative

- **Tight coupling between author and integrator.** If Claude Code's prose isn't idiomatic for a video lecture, Dell has to re-record against different text. Mitigated by reviewing the text before recording.
- **Image pipeline depends on Dell.** If Dell is slow to produce images, chapters stall in `text-ready` state. Mitigated by accepting chapters without images as an interim `text-ready` state.
- **No automatic link from video to text.** Until Phase B wires the chatbot, a viewer of the video has to navigate to the chapter manually. Mitigated by always including the chapter URL in the video's description.
- **Single-author bottleneck.** The entire workflow depends on Dell for video + images. Mitigated by the constitution's single-author assumption (Principle II implicitly via the Lecturer-is-owner model) and the CI-only review gate.

## Alternatives Considered

**Alternative A — Keep lecture-first (rejected).**
- Status quo of v1.0.0 Principle III. Rejected because it contradicts the user's actual workflow; would force Dell to record every video before any text can be written, which inverts the value Claude Code provides.

**Alternative B — Two-track separation (rejected).**
- Treat text and video as independent features with separate review and deploy gates. Rejected because the video is meant to be a companion to the text — decoupling them would let them drift, and the textbook would lose its "lecture-first, video-second" continuity.

**Alternative C — AI-generated video (rejected for now).**
- Use a video-gen model to produce the video from the text. Rejected because (a) the platform's brand promise involves a human lecturer; (b) AI video quality and cost don't satisfy the free-tier constraint; (c) Dell has explicitly chosen to record videos himself.

**Alternative D — Co-authoring model with text-first sequencing (chosen).**
- Captures the user's described workflow verbatim. Aligns with the constitution's "Smallest Viable Change" principle (no new tooling required; just re-sequence the existing flow).

## References

- Constitution v1.0.0 (superseded for Principle III; remainder unchanged).
- Constitution v2.0.0 (this amendment; Principle III rewritten).
- Spec: `specs/001-book-foundation/spec.md` (US-4, FR-004, FR-014, Assumptions).
- Clarification PHR: `history/prompts/001-book-foundation/0002-clarify-book-foundation.clarify.prompt.md` (Q3 2026-08-17).
- Platform spec: `The Bridge Balance - Platform Spec.docx`.
