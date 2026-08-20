# Feature Specification: Nine Distinct Intro Reading Paths

**Feature Branch**: `009-differentiated-intros`  
**Created**: 2026-08-20  
**Status**: Draft  
**Input**: User description: "There is no as much difference in the 9 versions of intro as much it should be, plan a proper difference in a way each one must give it's unique real world value and understanding to the viewer"

## Clarifications

### Session 2026-08-20

- Q: Where should the editorial comparison matrix live? → A: Public summary embedded in the intro page (Option C).
- Q: Which format should the public summary use? → A: Compact table with nine rows (Option A), but each row should be presented as a short card with a title, lens, real-world use, and "choose this if…" statement (Option B content).
- Q: Which scenario-source rule applies to the nine versions? → A: Reuse only the canonical source list; map multiple lenses onto the same incident by answering different questions (Option A).
- Q: Where should the reader-control description string surface? → A: Tooltip/popover on hover or focus, with equivalent accessible text via `aria-describedby` (Option B).
- Q: What should happen when a version fails the uniqueness review? → A: Block the entire intro release until all nine versions pass (Option A).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Choose the right mental model (Priority: P1)

As a visitor with a particular level of experience and available reading time, I want each of the nine intro versions to teach the same central thesis through a deliberately different mental model, so I can understand the bridge between AI coding and engineering in a way that is useful to me rather than reading nine paraphrases.

**Why this priority**: Meaningful differentiation is the core user need and determines whether the nine-version reader actually provides value.

**Independent Test**: Review all nine versions with a comparison matrix and verify that each has a distinct audience promise, teaching lens, real-world application, and takeaway; a reader should be able to select one based on the promise alone.

**Acceptance Scenarios**:

1. **Given** a visitor opens the intro, **when** they inspect the nine available reading options, **then** every option identifies a distinct audience, learning goal, and practical use rather than only a different length label.
2. **Given** a visitor reads any one version, **when** they finish it, **then** they can state the version's unique lesson and one situation where that lesson changes what they would do.
3. **Given** a visitor reads two versions at the same difficulty and length, **when** they compare them, **then** their examples, reasoning structure, and action takeaway are materially different.

---

### User Story 2 - Apply the lesson to a real situation (Priority: P1)

As a learner, I want every version to connect its teaching lens to a concrete real-world situation, so I can transfer the idea to a project, workplace, classroom, or personal decision.

**Why this priority**: The user's requested outcome is not cosmetic variation; each version must produce unique understanding that affects behavior.

**Independent Test**: For each version, answer: Which scenario does it illuminate? Which decision does it improve? What action should the reader take next? A version passes only when all three answers are explicit and unique.

**Acceptance Scenarios**:

1. **Given** the beginner-summary version, **when** a new learner reads it, **then** they receive an actionable safety rule for deciding whether an AI-generated change is ready to trust.
2. **Given** the beginner-balanced version, **when** a learner reads it, **then** they use a familiar analogy to distinguish a useful assistant from an accountable engineer.
3. **Given** the beginner-detailed version, **when** a learner reads it, **then** they can identify boundaries, assumptions, and verification steps before asking an agent to change a project.
4. **Given** the intermediate-summary version, **when** a working developer reads it, **then** they understand the two failure poles and the specification-driven loop as a decision framework.
5. **Given** the intermediate-balanced version, **when** a developer reads it, **then** they can map human responsibility and AI contribution across specify, design, implement, and verify.
6. **Given** the intermediate-detailed version, **when** a developer reads it, **then** they can recognize when a disposable experiment has become a system requiring specifications, review, and ownership.
7. **Given** the advanced-summary version, **when** a technical leader reads it, **then** they understand why intent, architecture, verification, and stewardship become scarce capabilities when code production becomes cheap.
8. **Given** the advanced-balanced version, **when** a technical leader reads it, **then** they can reason about environment boundaries, trust boundaries, data governance, and apprenticeship as distinct risks.
9. **Given** the advanced-detailed version, **when** a professional engineer reads it, **then** they can extend human-ownership principles to retrieval, tool calling, and multi-agent systems.

---

### User Story 3 - Navigate the versions without confusion (Priority: P2)

As a visitor, I want the nine options to explain what I will gain from each one, so I can choose efficiently and understand why two versions are not interchangeable.

**Why this priority**: Clear positioning prevents the reader from experiencing the versions as duplicate content with arbitrary labels.

**Independent Test**: A first-time visitor can choose a version matching a stated goal in under 30 seconds and explain why they selected it.

**Acceptance Scenarios**:

1. **Given** the reader controls are visible, **when** the visitor views each option, **then** the option exposes its difficulty, length, unique lens, and expected practical outcome.
2. **Given** a visitor selects a version, **when** the content loads, **then** the heading or opening establishes the promised lens within the first paragraph.
3. **Given** a visitor changes between versions, **when** they compare the content, **then** the selected label and content remain synchronized and no version claims a promise delivered by another version.

---

### User Story 4 - Preserve one coherent curriculum thesis (Priority: P2)

As a returning learner, I want the nine versions to remain consistent about the curriculum's central claim and stages, while using different explanations and examples, so choosing a different reading path never produces contradictory guidance.

**Why this priority**: Differentiation must increase understanding without fragmenting the educational message.

**Independent Test**: Compare each version against a shared thesis checklist: human accountability, specification before implementation, verification before ownership, and the four curriculum stages. Each version must cover the required thesis at its appropriate depth without copying another version's structure.

**Acceptance Scenarios**:

1. **Given** any version is selected, **when** the reader extracts its central claim, **then** it agrees with the shared curriculum thesis.
2. **Given** versions differ in depth, **when** a reader moves from summary to detailed, **then** the added detail expands the promised lens rather than merely repeating the shorter version.

---

### Edge Cases

- If two versions use the same real-world incident, each must answer a different question about it; duplicated evidence must not create duplicated teaching.
- If a version is shortened for summary length, it must retain its unique lens and action takeaway rather than becoming a generic abstract.
- If a visitor selects a difficulty/length combination whose label is unavailable or malformed, the reader must still show a clear fallback description and never silently display the wrong version.
- If a version cannot support a distinct practical outcome, it must be flagged for revision rather than being published as a near-duplicate.
- If claims or external examples change, all nine versions must preserve the same source attribution and avoid introducing unsupported facts.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The intro MUST define nine distinct reading contracts, one for each difficulty/length combination, before prose is authored or revised.
- **FR-002**: Each reading contract MUST specify a unique audience, mental model or teaching lens, real-world scenario, decision the reader should improve, and action takeaway.
- **FR-003**: The nine contracts MUST cover these lenses exactly once: safety rule, everyday analogy, boundary checklist, decision framework, responsibility map, experiment-to-system transition, strategic scarcity of intent and verification, governance and trust-boundary analysis, and scalable human-ownership architecture.
- **FR-004**: Each version MUST introduce its promised lens in the opening paragraph and fulfill it with evidence or reasoning appropriate to its difficulty and length.
- **FR-005**: Each version MUST include at least one concrete real-world situation and explicitly connect that situation to the version's unique lesson.
- **FR-006**: Each version MUST end with or clearly state one actionable takeaway that a reader can apply to a project, workplace, classroom, or personal AI-tool decision.
- **FR-007**: Versions at the same difficulty MUST differ in narrative structure and reasoning method, not only paragraph count or vocabulary.
- **FR-008**: Versions at the same length MUST differ in the kind of understanding they prioritize, not only in technical depth.
- **FR-009**: The intro MUST preserve the shared thesis that AI may accelerate implementation, while people specify intent, bound authority, verify behavior, and own consequences.
- **FR-010**: The intro MUST preserve consistent curriculum orientation toward the four stages while allowing each version to use a different explanation of their relevance.
- **FR-011**: Reader controls or labels MUST expose each version's difficulty, length, unique lens, and practical value before selection or within the immediately visible selection state.
- **FR-012**: The content MUST provide a comparison artifact or editorial matrix that allows reviewers to verify uniqueness across all nine versions.
- **FR-013**: Editorial review MUST reject any pair of versions whose primary lens, real-world scenario, reasoning structure, and action takeaway are substantially the same.
- **FR-014**: All factual examples and sources MUST remain attributable, consistent, and appropriate to the claims made in each version.
- **FR-015**: The feature MUST not require readers to consume all nine versions to obtain the core thesis; every individual version must deliver a complete, useful understanding.

### Key Entities

- **Reading Contract**: The editorial promise for one version, including audience, difficulty, length, unique lens, scenario, decision value, and takeaway.
- **Intro Version**: One published rendering of a reading contract, identified by its difficulty and length dimensions.
- **Shared Thesis**: The invariant educational claim connecting human judgment, specifications, implementation assistance, verification, and ownership.
- **Comparison Matrix**: The review artifact mapping all nine versions against their unique lenses, evidence, structure, and outcomes.

## Assumptions

- The existing nine combinations remain the product surface: beginner/intermediate/advanced crossed with summary/balanced/detailed.
- The feature changes editorial differentiation and reader-facing positioning; it does not add a tenth version or remove an existing combination.
- The current source list remains the canonical attribution set unless a later editorial review identifies a factual correction.
- A practical value means a reader can apply the version's takeaway to a concrete decision, not merely recall a definition.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 9 of 9 versions have a documented reading contract with a unique lens, scenario, decision value, and action takeaway before publication.
- **SC-002**: In a blind comparison, at least 90% of reviewers can match each version to its intended lens using only its opening and main body, without relying on the version label.
- **SC-003**: At least 90% of first-time readers can choose the version most relevant to a stated goal within 30 seconds after viewing the version descriptions.
- **SC-004**: At least 90% of test readers can state one behavior or decision they would change after reading their selected version.
- **SC-005**: No pair of versions receives a duplicate verdict for primary lens, scenario, reasoning structure, and takeaway in the editorial comparison matrix.
- **SC-006**: Every version communicates the shared thesis and four curriculum stages accurately, with zero contradictory claims in editorial review.
- **SC-007**: Each version can be read independently and receives a passing usefulness rating from at least 80% of readers who select it based on its stated promise.
