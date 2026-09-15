---
id: 0074
title: Ship the Welcome page ahead of Stage 0
stage: general
date: 2026-09-15
surface: agent
model: claude-sonnet-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["welcome-page", "chapter-production", "lesson-spine-authoring", "command-code-delegation", "sidebars", "ledgers"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/docs/welcome.md (created)
 - edu-site/sidebars.ts (edited)
 - edu-site/docs/changelog.md (edited)
 - curriculum-state/ledgers/prerequisite-graph.yaml (edited)
 - curriculum-state/ledgers/example-ledger.yaml (edited)
 - curriculum-state/ledgers/concept-ledger.yaml (edited)
 - curriculum-state/proposals/welcome-page-brief-2026-09-14.md (edited, marked executed)
 - history/prompts/general/0074-ship-welcome-page.general.prompt.md (this file)
tests:
 - node scripts/check-chapter.mjs --chapter docs/welcome.md && npm run build (run by the delegated session, verified from its actual tool trace)
 - npm run build, re-run independently by Claude after the changelog edit (0 errors, 1 expected warning: safety-floor-absent)
 - python -c "yaml.safe_load(...)" against all four ledger files, run independently by Claude, all valid
 - Browser verification via the edu-site dev server: desktop screenshot (sidebar placement, ChapterState badge, TOC) and mobile-viewport (375x812) get_page_text, both confirming rendered content matches source exactly
---

## Prompt

Ok, add the welcome into the book

(Mid-task follow-up, same thread: "what effort you set for deepseek in this task?" — answered inline: `--effort high`, confirmed genuinely accepted by the CLI on every turn via the trace's own `"effort":"high"` field, resolving the command-code-delegation reference doc's open question about whether the flag actually does anything against `deepseek/deepseek-v4.1-flash`.)

## Response snapshot

This instruction directly contradicted the sequencing the owner had set and approved the day before (`curriculum-state/proposals/welcome-page-brief-2026-09-14.md`'s own "What happens next" section: "No drafting starts now... actual prose waits for Stage 0's naming/hierarchy/breakdown to settle"). Asked one AskUserQuestion before touching anything — draft now, scaffold only, or hold off — since this was a real reversal of a written, approved decision, not a small clarification. Answer: draft it now, in full.

Read the actual authoring pipeline in full before executing — `chapter-production/SKILL.md` (which explicitly does not write the chapter itself) and confirmed `lesson-spine-authoring`, `check-frontmatter.mjs`, `sidebars.ts`, and `prerequisite-graph.yaml` as the real, binding contract, not just the brief's own sketch. Resolved the brief's two explicitly-left-open technical questions: Welcome is a real chapter (full `chapter_state`/gate/ledger treatment), not a `STAGE_FILES`-exempt reference page; and it sits as its own top-level sidebar entry, before the "Stage 0 — Orientation" category, never nested inside it — nesting would have undercut the point of the previous day's whole naming decision one level down.

Delegated execution via `command-code-delegation`, split into two checkpointed passes rather than one large job, after a first, fuller attempt (`b2rqm4mmc`) was interrupted mid-thought by a session restart with zero files touched — confirmed by reading the raw output trace directly (it ended mid `thinking_delta`, no `tool_use` events past a run of research reads) rather than trusting the "stopped" status. Pass 1 (`bnpcoh0oq`) drafted the prose only, writing `welcome.md` with `chapter_state: "placeholder"`. Independent read of the real file (not the delegate's own summary) found two real gaps `voice.md` requires and the delegate's own banned-phrase grep couldn't catch: the central courier/tracking-page analogy never stated where it breaks (voice.md: "Say where it breaks... spine material, not a footnote"), and one sentence had a double-"and" stumble. Sent a corrective follow-up to the same session (`--resume`, sessionId `2b71d0c6-...`) rather than restarting; both fixes verified from the actual `edit_file` trace and an independent re-read. Pass 2 (`bx9wmce07`, same resumed session) finalized frontmatter, ran the real gate/build (0 errors, 1 expected `safety-floor-absent` warning — correctly not applicable to a front-door page), wired `sidebars.ts` with a documented, component-verified reason for omitting `customProps.unnumbered` on a level-1 leaf, flipped `chapter_state` to `text-ready`, and wrote back all four ledgers — including a genuinely careful `concept-ledger.yaml` handling of "Spec-Driven Engineering" and "coding agent" (added `welcome.md` to each term's `used_in`, left `first_defined` pointing at the original chapters, recorded that Welcome glosses rather than redefines) that wasn't explicitly spelled out in the brief.

Verified independently end to end: read the real `welcome.md`, `sidebars.ts`, and the new `prerequisite-graph.yaml` row directly; ran `python -c "yaml.safe_load(...)"` against all four ledgers myself; re-ran `npm run build` myself after adding the changelog entry; loaded the actual page in the dev server and confirmed sidebar placement, the `ChapterState` badge, and full content parity at both desktop and mobile (375px) viewport widths via `get_page_text`. Added the 2026-09-15 changelog entry and marked the proposal file executed.

## Outcome

- ✅ Impact: The Welcome page is live, gate-clean, and correctly positioned as the reading journey's front door — the first real content the whole-book-redesign roadmap has produced. Stage 0 keeps "Orientation" unchanged, as separately and deliberately decided the day before; this task didn't touch it.
- 🧪 Tests: See `tests:` above — all independently re-run or re-verified by Claude, not taken on the delegate's word.
- 📁 Files: See `files:` above.
- 🔁 Next prompts: None scheduled automatically. Stage 0's real name and chapter/lesson breakdown remain open, separate decisions per the existing redesign roadmap; Welcome's own content should be revisited if either changes materially enough to make its "how the five stages fit together" section stale.
- 🧠 Reflection: The session-restart interruption on the first full-pipeline attempt was informative, not just an inconvenience — it's now clear a long, single, all-in-one delegated job is a real risk to lose entirely on this setup, and splitting drafting from mechanical wiring (with a genuine content review in between) held up better and gave a real checkpoint to catch the two voice.md gaps before they were baked into a gate-passed, ledger-linked "finished" state.

## Evaluation notes (flywheel)

- Failure modes observed: one delegated job (`b2rqm4mmc`) lost entirely to a session restart mid-run, zero files touched — recovered by re-scoping smaller rather than blindly retrying the same large job. Two real, specific voice.md violations shipped past the delegate's own automated self-check (a banned-word grep) and were only caught by an independent human-equivalent read of the actual file.
- Graders run and results (PASS/FAIL): `check-chapter.mjs` PASS (0 errors, 1 expected warning); `check-frontmatter.mjs` PASS; `check-references.mjs` PASS; full `docusaurus build` PASS; YAML validity on all four ledgers PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): for any future voice-critical page, keep the drafting-only / mechanical-wiring split used here as the default shape rather than one large job — it's what actually caught the analogy gap.
