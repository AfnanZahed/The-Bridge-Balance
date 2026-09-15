# Quickstart — `006-storytelling-intro`

This runbook implements and verifies the story-driven rewrite without losing any existing facts. It is intentionally editorial-first: draft, fact-check, pacing review, then build and reader validation.

## Prerequisites

- Worktree is on branch `006-storytelling-intro`.
- Read `spec.md`, `research.md`, `data-model.md`, and all four contracts under `contracts/`.
- The only source page to edit is `edu-site/docs/intro.md`.
- Node dependencies are already installed under `edu-site/`.
- No new dependencies, images, routes, or components are needed.

## Pass 0 — Baseline inventory (before writing)

1. Copy the current `edu-site/docs/intro.md` to a temporary review location outside the tracked source tree, or record its Git blob so the before/after comparison is reproducible.
2. Extract the current page's 24 factual claims into the checklist in `research.md` §A.6. Confirm the inventory is exhaustive.
3. Record current frontmatter and structural anchors:
   - `sidebar_label: Introduction`
   - `sidebar_position: 0`
   - `/intro` route
   - four stages
   - who-this-is-for guidance
   - Stage-1 CTA
   - Promise sentence
4. Confirm no other page is being rewritten: `edu-site/docs/introduction.md` stays unchanged.

**Exit criterion**: a baseline inventory exists and every A.6 row has an ID ready for mapping.

## Pass 1 — Draft the narrative

Write the replacement body in `edu-site/docs/intro.md`, preserving valid frontmatter and the route. Follow the six-beat order:

1. Cold open — 400+ words; a real story, not a number.
2. Extreme A — 2,500+ words; blind vibe coding, at least two A story cards.
3. Extreme B — 2,500+ words; resistance, at least two B story cards, empathy before cost.
4. Shared trap — 600+ words; Specification Poverty and the root cause.
5. Bridge — 600+ words; Spec-Driven Engineering and four stages.
6. CTA — 400+ words; who-this-is-for, Stage-1 CTA, Sources.

During drafting:

- Weave all 24 previous facts from A.6 into story payoffs; do not paste a statistics wall.
- Add a visible line such as `30 min read · ~7,200 words · updated 2026-08-19`.
- Explain at least ten foundational terms in context.
- Use 3–5 direct quotes total; attribute each exactly.
- Add inline citations on first mention and build the consolidated Sources section.
- Keep both poles empathetic; no mocking or marketing hype.

**Exit criteria**:

- Body is between 6,800 and 7,600 words.
- All six beats are present and ordered.
- At least two verified story cards appear for each pole.
- The four stages, who-this-is-for block, Promise, and Stage-1 link remain.

## Pass 2 — Fact-check and retained-fact mapping (blocking gate)

Create `specs/006-storytelling-intro/verification/fact-mapping.md` with one row for each A.6 fact:

```markdown
| ID | Claim | New prose location | Source/publisher attached | Minimum budget met | Verified by | Date |
|----|-------|--------------------|---------------------------|--------------------|-------------|------|
| F-A6-01 | ... | `intro.md` §... | Yes — METR 2025 | Yes | ... | 2026-08-19 |
```

Then audit the complete page:

- Every person, organization, quote, number, incident, and date traces to `research.md` or a source in the page's Sources section.
- First-person stories are attributed as first-person accounts.
- Handle-only actors retain their handles; no names are invented.
- Survey sample sizes and caveats are not overstated.
- All 24 A.6 facts appear and meet their minimum word budgets.
- Every source URL navigates successfully; replace dead or incorrect URLs before continuing.

**Blocking exit criterion**: zero unverified claims and zero missing A.6 mapping rows. If any claim fails, return to Pass 1; do not proceed to pacing review.

## Pass 3 — Pacing and narrative review

Create `specs/006-storytelling-intro/verification/pacing-review.md` with one row per paragraph:

```markdown
| # | Beat | Paragraph opening | Type (scene/stat/aside/transition/quote) | Hook/transfer check | Notes |
|---|------|-------------------|------------------------------------------|---------------------|-------|
```

Check:

- No three consecutive `stat` paragraphs.
- Every H2 section opens with a scene, question, contradiction, or direct address.
- Every section closes with a curiosity transfer.
- Each ~250-word block includes at least one sentence ≤10 words and one ≥25 words.
- No body exclamation points, marketing clichés, quote stacking, or bullet walls.
- The story reads empathetically at both poles.
- The first 120 words open a question that later receives a payoff.

**Exit criterion**: all pacing-contract checks pass and the reader-panel draft is ready.

## Pass 4 — Site/build verification

From repository root:

```powershell
Set-Location edu-site
npm run build
```

Confirm:

- Exit code 0.
- Frontmatter validation passes.
- No broken Markdown, missing image, or broken internal-link warnings.
- `static/search-index.json` is regenerated and includes the rewritten Introduction.
- The generated route remains `/intro`.

If build fails, fix only `intro.md` content/frontmatter unless the error proves a pre-existing issue. Do not modify the build pipeline for this feature.

## Pass 5 — Reader panel and final acceptance

Ask at least five readers who did not write the draft to read it in one sitting or with a timer. Collect:

1. Total reading time.
2. Can they name the two extremes?
3. Can they state the bridge thesis in their own words?
4. Did the page feel like a story or a list of facts?
5. Which story or transition they remember.

Pass when:

- At least 4/5 can name both extremes and the bridge.
- At least 4/5 describe the page as a story/narrative rather than a list.
- At least 4/5 finish in ≤32 minutes without being instructed to skip.

Record results in `specs/006-storytelling-intro/verification/reader-panel.md`. If the panel fails, revise pacing and repeat Pass 3–5.

## Definition of Done

- [ ] `edu-site/docs/intro.md` is the only source page changed.
- [ ] 6,800–7,600 body words.
- [ ] Six beats in required order.
- [ ] ≥2 verified stories per pole.
- [ ] All 24 retained facts mapped and verified.
- [ ] Sources section complete; URLs checked.
- [ ] Ten or more foundational terms explained in context.
- [ ] `npm run build` exits 0.
- [ ] Fact mapping, pacing review, and reader panel artifacts exist under `verification/`.
- [ ] Reader panel meets SC-005 and SC-011.
- [ ] PHR records the implementation and final validation.
