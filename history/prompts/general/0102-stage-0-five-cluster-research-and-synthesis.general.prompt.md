---
id: 0102
title: Stage 0 five-cluster DeepSeek research and synthesis
stage: general
date: 2026-09-16
surface: agent
model: claude-sonnet-5
feature: none
branch: main
user: afnanzahed@gmail.com
command: none
labels: ["stage-0", "deepseek-research", "command-code-delegation", "curriculum-architecture"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - curriculum-state/research/stage-0/cluster-1-foundations.md (new — full DeepSeek research dossier)
 - curriculum-state/research/stage-0/cluster-2-concurrent-cluster.md (new — full DeepSeek research dossier)
 - curriculum-state/research/stage-0/cluster-3-networked-world.md (new — full DeepSeek research dossier)
 - curriculum-state/research/stage-0/cluster-4-terminals-and-editors.md (new — full DeepSeek research dossier)
 - curriculum-state/research/stage-0/cluster-5-ai-and-destination.md (new — full DeepSeek research dossier)
 - curriculum-state/proposals/whole-book-redesign-record-2026-09-14.md (§15's open planning-ownership item resolved; new §16 appended: full synthesis, reformed illustrative structure, resolved cross-cluster decisions, open drafting-time items)
 - .claude/skills/command-code-delegation/references/command-code-cli.md (two corrections from real runs: this model's actual `--effort` scale is low/high/max, not low/medium/high; documented a real "server error on the final answer after a long tool-heavy session" failure mode and its working recovery)
 - history/prompts/general/0102-stage-0-five-cluster-research-and-synthesis.general.prompt.md (this file)
tests:
 - Verified every write_file attempt across all 5 clusters (6 total) was actually blocked by the tool_hook_blocked event before trusting that no unreviewed file landed in the real repo — confirmed via git status and directory listing, not assumed from the documented pattern
 - Extracted every finalText from the raw NDJSON tool trace (not finalText summaries alone, and not the CLI's own success/failure claim) before treating any cluster's research as usable, using memory-safe extraction (grep the single result line to a small file, then parse) after a naive whole-file read failed on two multi-hundred-MB/1GB+ output files
 - Cross-checked cluster 2's and cluster 3's independently-reached "networking belongs partly inside the 1958-74 concurrent window" conclusion against each other before adopting it, since neither was told the other's finding
---

## Prompt

The user's answer to the AskUserQuestion posed in PHR 0101 ("Who should plan the research-and-reformation approach before delegating to DeepSeek?"): **"I plan it (recommended)"** — i.e., Claude breaks Stage 0 into per-era research questions, runs each through DeepSeek/Command Code at max effort, then synthesizes one reformed proposal before any prose is drafted.

## Response snapshot

Verified Command Code was authenticated (`command-code status`), then designed 5 parallel, self-contained research briefs (Foundations; the 1958-74 concurrent cluster; the networked world; terminals & editors; AI-before-LLMs + this book's own SDE/Reading-Literacy destination), each explicitly inviting DeepSeek to challenge or reshape the candidate topic/chapter hypothesis rather than just fill it in, each demanding real checkable sources and explicit uncertainty-flagging rather than confident invention. Launched all 5 as backgrounded `command-code -p ... --model deepseek/deepseek-v4.1-flash --trust --effort high --output-format json` calls.

**A real failure surfaced, was diagnosed, and got fixed rather than papered over.** Clusters 1 and 2 (and, after a much longer run, cluster 4) each completed extensive real research — hundreds of real `web_search`/`web_fetch` calls — but then failed on the final synthesis turn with `"error":"Error: The API server encountered an error. Please try again later."`, empty `finalText`, despite a live `sessionId` and large real `usage` token counts. Diagnosed this as a likely timeout on long tool-heavy sessions' final large-output turn (consistent ~410s on the two smaller failures) rather than a random one-off, since it recurred identically. Recovery: resumed the same session via `--session <id>` with a follow-up explicitly forbidding further research and asking for a concise, bulleted answer instead of a long prose one — this worked on the first retry for all three affected clusters, at zero re-research cost. A second, unrelated CLI issue surfaced during the first recovery attempt (`--effort medium` is not valid for this model; the real scale is low/high/max) and was corrected immediately. Both findings were written back into `command-code-cli.md` so a future session doesn't rediscover them.

**Safety verification, not assumed.** Two clusters (3 and 5) each attempted `write_file` calls into the real repo (once even choosing a plausible real path, `history/reports/stage-0-cluster-3-...md`) despite no `--yolo` flag being passed. Rather than trusting the documented "write_file is blocked without --yolo" pattern to still hold on a newer CLI version (it auto-updated mid-session, 1.54.0 → 1.54.2), traced every one of the 6 total `write_file` attempts to its actual `tool_hook_blocked` event and independently confirmed via `git status`/directory listing that nothing had landed in the repo. All 6 were correctly blocked; DeepSeek fell back to delivering the report inline both times rather than routing around the block via an ungated tool (unlike a previously-recorded eval where it did route around one) — a good outcome, verified rather than presumed.

**Extraction had to be done carefully at scale.** Two output files exceeded 1GB (cluster 4's original attempt ran ~11 minutes and ~2.3M tokens before failing; cluster 5 succeeded but ran ~30 minutes and ~3M tokens after deciding on its own to decompose into 9 parallel sub-agent research threads — verified this was real, sensible task decomposition and not a runaway loop by inspecting the actual sub-agent task descriptions). A naive `fs.readFileSync` hit Node's ~536MB string-length ceiling on the first attempt; switched to grep-ing just the single final `"type":"result"` line to a small file before parsing, which scales regardless of how large the full trace is.

**Synthesis.** Read all 5 dossiers in full, cross-checked their structural recommendations against each other (two clusters independently concluded networking's origin belongs inside the 1958-74 concurrent window, without either being told the other's finding — treated as real corroboration, not coincidence), resolved the boundary conflicts each one flagged (the Terminals/Surge chapter landing-point collision; the Parnas-1972-used-three-times-with-two-different-papers ledger risk; where the personal computer's arrival gets narrated once, not twice), and wrote the full synthesis into the redesign record as a new §16 — a reformed 9-chapter illustrative structure (down from the prior 10, since Architecture & REST folds into a Web chapter rather than standing alone, while Foundations and the concurrent cluster both gained Lessons), explicitly still non-binding per D5, with a named "open items" list for what the drafting pass must still decide rather than force-resolving everything now. All 5 raw dossiers were saved into `curriculum-state/research/stage-0/` (not left in the session-scoped scratchpad) so the research survives this session.

## Outcome

- ✅ Impact: Stage 0 now has a real, source-backed research foundation for every era, not just the four previously-flagged gaps, and a synthesized reformed structure ready for the owner's convergence. Two genuine operational failure modes (the server-timeout-on-long-sessions pattern, the wrong `--effort` scale) are now documented for every future delegated research task in this project, not just this one.
- 🧪 Tests: See `tests:` above.
- 📁 Files: See `files:` above — 5 new research dossiers, 1 redesign-record update, 1 skill-reference correction, this PHR.
- 🔁 Next prompts: The owner reviews §16's reformed structure and reacts (the Panaversity placement and visual-strategy taxonomy are already settled per §15). Once it converges, the drafting pass can begin — chapter by chapter, through `chapter-production`'s normal pipeline — starting with whichever chapter the owner wants first, resolving the explicitly-flagged open items (Chapter 1's internal ordering, the Parnas ledger entries, the Terminals/Surge boundary) as each relevant chapter is actually drafted rather than pre-deciding them now.
- 🧠 Reflection: The single most valuable thing this pass did wasn't finding new facts — it was catching two of this project's own prior research errors (the Parnas "Program Families" date, the "networking is cleanly sequential after the concurrent cluster" assumption) by asking DeepSeek to independently verify rather than just extend what was already believed. That's the actual payoff of Constitution Principle VIII's two-pass discipline: research that's allowed to disagree with the brief it was given is worth far more than research that just fills in the blanks it was handed.

## Evaluation notes (flywheel)

- Failure modes observed: the DeepSeek final-answer server-timeout pattern (documented, recovered, written up for reuse); the `--effort medium` rejection (documented, corrected); a 1GB+ output file breaking naive Node string parsing (worked around, worth remembering for any future large delegated trace).
- Graders run and results (PASS/FAIL): write_file-block verification across all 6 attempts — PASS (all blocked, confirmed via git status, no repo contamination). Cross-cluster corroboration check (networking/concurrency finding) — PASS (independently reached twice). Recovery success rate after the effort-flag fix — PASS (3 for 3).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): for the next large multi-cluster delegated research batch, pre-emptively ask for a concise bulleted final answer in the *original* prompt (not just on recovery) for any session likely to run long, to reduce the odds of hitting the final-answer timeout at all rather than recovering from it after the fact.
