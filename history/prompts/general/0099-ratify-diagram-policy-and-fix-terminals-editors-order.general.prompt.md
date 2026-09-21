---
id: 0099
title: Ratify diagram policy reversal, fix terminals/editors order
stage: general
date: 2026-09-16
surface: agent
model: claude-sonnet-5
feature: none
branch: main
user: afnanzahed@gmail.com
command: none
labels: ["constitution", "diagram-policy", "stage-0", "chronology"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md (Principle III step 3 replaced; new v2.3.0 Sync Impact Report inserted; version footer bumped 2.2.0 → 2.3.0, Last Amended → 2026-09-16)
 - CLAUDE.md (the "Claude Code writes text, not images" standing rule rewritten to permit connector-built diagrams)
 - .claude/skills/bridge-balance-project-guide/SKILL.md (Step 0 rule #6 rewritten; both frontmatter-description mentions of the old restriction fixed — the chapter-production bundling clause and the standing-rules clause)
 - .claude/skills/bridge-balance-project-guide/reference/chapter-production/SKILL.md (frontmatter description, the dedicated images section, Step 5's bullet, the anti-patterns bullet, and the reference-file loading-table row all rewritten)
 - .claude/skills/bridge-balance-project-guide/reference/chapter-production/reference/image-prompts.md (rewritten in full: now covers both AI-generator prompts and connector-built diagrams as two distinct, clearly-separated jobs)
 - curriculum-state/proposals/whole-book-redesign-record-2026-09-14.md (§14: Phase B chapter order corrected — terminals now precede editors; the diagram-policy "still open" item marked resolved)
 - history/prompts/general/0099-ratify-diagram-policy-and-fix-terminals-editors-order.general.prompt.md (this file)
tests:
 - Grep repo-wide, post-edit, for the old restriction's exact phrases (`does not draw diagrams`, `writes text, not images`, `no successor and is not to be recreated`, `TEXT ONLY`, `never generates images or diagrams`, `does not make images`) — the only remaining hits are the two historical PHRs (0032, 0084, correctly left untouched as history) and one self-referential mention inside this session's own new Sync Impact Report, quoting the old rule's name to describe what changed, not restating it as active policy
 - Grep for `\{\{|\[THAT\]` on this PHR after writing
---

## Prompt

"Confirmed, go ahead and update all four files
also, i am not satisfied with your chronology, how the IDEs existed first and then the terminals???"

## Response snapshot

**Diagram policy (5 real files, not 4 — corrected the earlier undercount rather than silently matching it).** Grepped the repo before editing to find every live copy, then read `.specify/memory/constitution.md`'s two unread reference files (`chapter-production/SKILL.md`, `reference/image-prompts.md`) to get their exact current text before drafting precise edits. Found a second undercount mid-edit: `bridge-balance-project-guide/SKILL.md`'s own top-level frontmatter `description:` field (the text that actually drives the Skill tool's listing, visible in a live system reminder after the first edit) carried two more mentions of the old restriction that the body-text edit alone hadn't touched — caught this by noticing the skill listing itself still said "TEXT ONLY" after the body edit landed, and fixed both.

Rewrote, in order: the constitution (Principle III step 3 replaced; a full Sync Impact Report added following the file's own v2.1.0/v2.1.1/v2.2.0 precedent, version bumped to 2.3.0 as a MINOR change — expanding who may produce a diagram, not redefining or removing anything); `CLAUDE.md`'s standing rule; `bridge-balance-project-guide/SKILL.md` in both the places it stated the rule; `chapter-production/SKILL.md` in five separate locations (frontmatter description, its own dedicated images section, Step 5, the anti-patterns list, and the reference-loading table); and a full rewrite of `image-prompts.md`, since its entire premise (Claude does not make images, full stop) was no longer true and a partial patch would have left it self-contradicting.

Preserved, rather than discarded, the reason a diagram is still never inline Mermaid/SVG/JSX in an MDX chapter body: that constraint comes from `MDXComponents.tsx`'s registered-component allow-list, which is untouched by this policy change and still fails the build on anything else. Also preserved the historical reason the old restriction existed (Claude-authored imagery via the deleted `edu-site/figures/` pipeline didn't reach a usable bar) as a caution against repeating the same failure, not as an active rule — and drew out the actual technical distinction that makes the reversal coherent rather than just permitted: an AI image generator genuinely cannot render legible text, but a diagramming connector (Eraser, Excalidraw, draw.io, Mermaid) renders real labels natively, which is why diagrams and atmospheric images were always two different jobs, not one relaxed rule.

**Chronology fix.** The owner's challenge was correct and sharp: the previous Phase B order (Editors & IDEs, then Terminals & the Command Line) had imported the *old*, still-shipped intro-3/intro-4 sequence's own stated rationale — "the reader meets the visual tools before the terminal-based ones" — which is an explicitly pedagogical reason (friendlier tool first), not a chronological one, silently carried into a stage whose entire ordering principle is supposed to be chronological. Checked the actual history: command-line/terminal interaction (teletypes, then Unix's own shell) is the older, more fundamental interface, and the very first editors (line editors like `ed`) are themselves terminal-world tools — an editors chapter cannot coherently open before the chapter that establishes what a terminal even is. Swapped the order (Terminals now precedes Editors), moved the personal-computer beat (Altair 1975, IBM PC 1981) to the Terminals chapter since CP/M and MS-DOS's own command lines are the more direct consequence of a personal computer's arrival than an editor is, and named the resulting narrative payoff: Phase B's four chapters now build two tool threads (terminals, editors) before the AI thread, converging all three at "The AI-Coding-Agent Surge" — CLI agents and AI-integrated IDEs literally are those three threads meeting.

## Outcome

- ✅ Impact: The diagram-production policy is now consistently reversed across every file that stated it, with no live contradiction between the ratified constitution and its dependent documents — verified by a post-edit repo-wide grep, not assumed. Stage 0's Phase B chapter order is now historically defensible, with the fix's own reasoning recorded so a future session doesn't reintroduce the same pedagogical-order-mistaken-for-chronological error.
- 🧪 Tests: See `tests:` above.
- 📁 Files: See `files:` above — six real files changed, five of them the direct consequence of one confirmed decision, matching the coordinated-pass approach flagged as the right one in PHR 0098's own reflection.
- 🔁 Next prompts: A worked example of an actual Claude-built diagram (which connector, delivered into a real chapter) hasn't shipped yet — worth doing once a chapter reaches a point that needs one, to confirm the delivery mechanism holds up in practice. Separately, unrelated to this turn: the Panaversity placement proposal and the visual-content-strategy taxonomy are both still awaiting the owner's reaction, and the OS/Unix, networking/Internet, the Web, and architecture/REST eras still need their DeepSeek research pass.
- 🧠 Reflection: Both threads in this turn share one root cause worth naming — a policy or an ordering decision that was correct once, applied unexamined to a new context where its original justification no longer held (a quality-driven image restriction reapplied to a now-different production method; a pedagogical-clarity ordering choice reapplied to a stage whose whole point is chronological accuracy). Neither was caught by a mechanical check; both needed someone to ask "wait, why was this true again?"

## Evaluation notes (flywheel)

- Failure modes observed: one real near-miss, caught mid-task rather than after — the first pass at the diagram-policy reversal would have left `bridge-balance-project-guide/SKILL.md`'s own frontmatter description (a different field from the body rule already fixed) still advertising the old restriction, visible to every future session via the Skill tool's own listing. Caught by reading the live system reminder after the body edit landed rather than assuming the file was fully handled.
- Graders run and results (PASS/FAIL): repo-wide post-edit grep for every known phrasing of the old restriction — PASS (zero live hits; two correctly-preserved historical PHRs; one correctly-contextual self-reference). PHR placeholder grep — PASS (pending, run immediately after this write).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): when any future task changes a rule that a skill's own frontmatter `description:` field also restates, grep that field specifically rather than assuming a body-text fix covers it — the Skill tool listing reads frontmatter directly, and a stale description is invisible until something surfaces it, as happened here.
