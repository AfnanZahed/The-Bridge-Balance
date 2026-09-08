# Pacing Contract — `006-storytelling-intro`

**Purpose**: operationalize the user's "ultra attractive, dopamine hitting way" requirement. Without these rules, the rewrite drifts back to the same stats-first structure that the user is asking us to leave behind. The rules are mechanical and reviewable.

---

## 1. The problem this contract solves

The current `edu-site/docs/intro.md` opens with Karpathy, then pivots into a sequence of five statistics-and-figures sections, then a paragraph of thesis, then a syllabus table, then a CTA. The structure is: **stat → stat → stat → table → stat → CTA**. It reads as a dossier. It is the opposite of dopamine.

The rewritten version MUST read as **scene → tension → payoff → scene → tension → payoff** at the paragraph level, and as **cold open → extremes → shared trap → bridge → CTA** at the section level.

---

## 2. Section-level rules (mandatory)

For each of the six beats in the content contract:

### 2.1 Cold open

- MUST open with a scene, a person, or a question. **NOT** a statistic.
- MUST contain a real, dated, named (or handle-attributed) actor within the first 500 words.
- MUST open a curiosity gap in the first ~120 words — a question, an unfinished situation, a contradiction — that the doc resolves later.
- MUST close with a line that pulls the reader into the next section. Forbidden closings: recaps, summary statements, "this is the problem" lectures.

### 2.2 Extreme A (blind vibe coding)

- MUST open with a scene (not a statistic). The first Story Card dramatized in Extreme A is the cold-open's continuation; the second Story Card MUST arrive within the first ~600 words.
- MUST weave the mandatory retained facts (METR 19%, Veracode 45%, etc.) as **payoffs inside the stories**, not as standalone paragraphs. Forbidden: a paragraph that begins "The METR study found…"; required: a paragraph that embeds the METR finding inside a sentence about someone else's experience.
- MUST close with a curiosity-transfer line into Extreme B.

### 2.3 Extreme B (AI resistance)

- MUST open with empathy before cost. The first Story Card dramatized (B2 DHH, B4 senior-dev coalition, or B7 university bans) MUST validate the resistance's reasons before showing the cost.
- MUST honor the **empathy/no-shaming clause** (spec FR-010): the writer MUST NOT use the words "delusional", "Luddite", "fearful", "backwards", or similar to describe resisters.
- MUST weave the mandatory retained facts (SO 84%/29%, AWS 40% less, entry-level labor data, etc.) as payoffs.
- MUST close with a curiosity-transfer line into the shared trap.

### 2.4 Shared trap

- MUST be short (~600 words). This beat is a hinge, not a destination.
- MUST land the "Specification Poverty" term and the bridge concept's first mention.

### 2.5 Bridge (Spec-Driven Engineering)

- MUST name the four stages.
- MUST land the "engineer who directs AI systems" promise.

### 2.6 CTA

- MUST preserve the "Who this is for" guidance as a scanable block.
- MUST link to Stage 1.
- MUST include the consolidated Sources section.

---

## 3. Paragraph-level rules (mandatory)

### 3.1 No three-stat-paragraph rule

**No run of three consecutive paragraphs may contain only statistical claims.** Concretely, in any three adjacent paragraphs:

- At most ONE paragraph may be primarily a statistical/figure paragraph.
- The other TWO paragraphs MUST contain at least one of: a story beat, a question, a teacher's aside, a contrast, a scene.

This rule is mechanical and reviewable. The implementation builds a paragraph-by-paragraph classification.

### 3.2 Hook on every opener

Every section (H2 heading) MUST open with one of:
- A scene
- A question
- A contradiction
- A direct address to the reader

Forbidden openers:
- A bare statistic ("In 2025, 84% of developers…")
- A definition ("Specification Poverty is…")
- A historical chronology opener ("In February 2025…")

### 3.3 Closing transfer

Every section MUST close with a line that transfers tension into the next section. Acceptable forms:

- A question that the next section answers
- A callback to a character introduced in the next section
- A statement that names what the next section reveals
- A short, sharp line that reframes the previous section's payoff

Forbidden closings:
- A recap of what was just said
- A summary statement ("This is why the bridge matters…")
- A bullet list of takeaways

### 3.4 Sentence rhythm

The writer MUST vary sentence length. In every ~250-word block:
- At least one short sentence (≤ 10 words) that lands a punch.
- At least one longer sentence (≥ 25 words) that develops a thought.
- The pattern must NOT be "long, long, long, short" repeated mechanically.

### 3.5 Curiosity gap with a payoff

Every curiosity gap opened MUST be paid off within the section that opened it, OR be explicitly handed off to the next section with a closing line that names the hand-off. Unpaid curiosity gaps are forbidden.

---

## 4. Paragraph types (for the implementation classification pass)

The implementation classifies every paragraph in the rewritten `intro.md` into ONE of:

| Type | Definition |
|------|------------|
| **scene** | A specific person, place, moment. Includes date + actor + action. |
| **stat** | Contains a primary statistical claim (number + survey/publisher). |
| **teacher-aside** | Direct address to the reader, a reframing, a question, a definition with stake. |
| **transition** | A bridge between two paragraphs / sections. Often short. |
| **quote** | Contains a verbatim or clearly-marked-paraphrase quote. |

The review pass builds a per-paragraph classification table. The rule of §3.1 is checked mechanically: in any three consecutive paragraphs, at most one is `stat`.

---

## 5. Forbidden mechanics

- **No opening a section with a statistic.** Spec FR-003 enforces this for the cold open; this contract extends it to every section.
- **No "wall of statistics" run.** Three stat paragraphs in a row violates §3.1.
- **No recap paragraphs.** Every paragraph must add something new — a new fact, a new angle, a new voice, a new question.
- **No bullet walls inside narrative beats.** The four stages appear once, in the bridge; the who-this-is-for block appears once, in the CTA. Bullets elsewhere are forbidden.
- **No quote-stacking.** Two verbatim quotes in the same paragraph is forbidden; one quote per ~400 words is the ceiling.
- **No exclamation points** in body prose. (Constitution III tone.)
- **No marketing flourishes** ("revolutionary", "game-changing", "the future is here", "don't get left behind"). Calm teacherly voice.

---

## 6. Allowed mechanics

- **Open loops.** Open a question early; pay it off later. (Used in §2.1.)
- **Callbacks.** Refer back to a character from a previous section. (DHH reads differently after the cold open; the Indonesian student from A6 reads differently after the SO ban story.)
- **Verbatim quotes**, sparingly. The writer uses 3–5 verbatim quotes across the whole intro (per spec range); not 15.
- **Parenthetical asides** — short clarifying clauses inside a sentence ("— and this matters because…"). Restrained; one per paragraph.
- **The teacher's hand** — sentences where the writer's voice breaks through to address the reader directly ("If you are reading this in 2026, you are reading it at a hinge year"). Used sparingly, never as filler.

---

## 7. Verification (during implementation)

The pacing-review pass produces:

- A per-paragraph classification (stat / scene / teacher-aside / transition / quote).
- A confirmation that no three-stat run exists.
- A confirmation that every section opens with a hook and closes with a transfer.
- A confirmation that the 6,800–7,600 word budget is met.
- A confirmation that the mandatory retained facts each have at least the per-fact minimum word budget (cross-referenced with the Sourcing Contract's Per-Fact Mapping Table).

A draft that fails any of these gates returns to the writer for a revision before the reader-panel pass.

---

## 8. Reader-engagement signal (SC-011)

The reader panel (n ≥ 5) is the final pacing gate. If 4 of 5 readers do not describe the experience as "like a story" rather than "a list of facts", the prose has failed the spirit of this contract even if it passes the mechanical gates. The writer treats the panel's qualitative feedback as authoritative.

---

## 9. Cross-references

- **Content Contract** (`content-contract.md`) defines the six beats and their word budgets. The Pacing Contract governs *how* prose fills those beats.
- **Sourcing Contract** (`sourcing-contract.md`) governs *what* prose can claim. Together, Content + Sourcing + Pacing define the editorial surface.
- **Quickstart** (`quickstart.md`) sequences the drafting, fact-check, and pacing-review passes.