# Command Code CLI — confirmed mechanics

Everything below was confirmed by direct hands-on testing on this machine on 2026-09-11, not taken from documentation alone — if something here stops matching reality, trust what you observe over this file.

## Basics

Command Code (commandcode.ai) is a third-party terminal coding agent, installed globally via npm (`npm i -g command-code`). On this machine it's already installed and authenticated.

**Binary name:** the package registers four aliases — `cmd`, `cmdc`, `command-code`, `commandcode`. Use `command-code` or `cmdc`. Plain `cmd` resolves to Windows' own `cmd.exe` first on PATH and is not the tool you want.

**Before relying on it in a session**, a quick `command-code status` confirms auth is live. If it's not (or the binary is missing), don't retry blindly — do the work directly yourself and tell the user, so they can fix the CLI if they want delegation back.

## The two flags that actually matter

**`--output-format json`** — without this, `-p` (headless/print mode) returns only a short prose summary (`finalText`) and nothing else. There's nothing in that to verify against; you'd be trusting DeepSeek's word for it. With `--output-format json`, `-p` emits an NDJSON event stream (one JSON object per line) that includes the real tool-call trace:

- `tool_use` events show the exact call, e.g. `edit_file` with literal `old_string`/`new_string`, or `shell_command` with the literal command run.
- `tool_result` events (also inlined into `message_end`/`message_update` events as `tool_result` content in some cases) show what actually happened — e.g. "Edited file (1 replacement)" with a snippet, or a shell command's real stdout.
- The final line has `"type":"result"` with a `usage` object (`inputTokens`, `outputTokens`, `cacheReadTokens`, `cacheWriteTokens`) — real per-call cost, and `finalText` — the prose summary, which is a convenience for a human, not something to verify against.
- `nextState.sessionId` (nested in the result) can be handed to `--session`/`--resume`/`-c` on a follow-up call to continue the same DeepSeek conversation instead of restarting context.

The stream is verbose relative to the size of the change — a two-line edit produced ~183 lines of events in testing. Grep for `"type":"tool_use"`, `"type":"tool_result"`, and the final `"type":"result"` line rather than reading the whole stream.

**`--yolo` vs `--tools-enable` — these are NOT interchangeable, and only one of them actually grants write access.** headless (`-p`) mode silently withholds write-capable tools by default, independent of `--trust`. Confirmed directly: a call with only `--trust` (no `--yolo`, no `--tools-enable`) had DeepSeek correctly diagnose the requested fix and then refuse to apply it, returning as `finalText`:

> "File writes are blocked in this session (print mode without `--yolo`), so I couldn't apply the change. Here's what it should become: ..."

**Correction (2026-09-11, from a real eval run — see the skill's `evals/` workspace, eval 1):** an earlier version of this doc suggested `--tools-enable edit_file,shell_command` as a narrower, safer alternative to `--yolo`. That's wrong. On a real run, passing `--tools-enable edit_file,shell_command` produced this banner before the JSON stream even started:

> "--tools-enable: ignoring edit_file, shell_command — not withheld by this run. It only re-enables the tools a headless run holds back: `ask_user_question`, `enter_plan_mode`, `exit_plan_mode`, `plan_review`, `todo_write`, `cron_create`, `cron_list`, `cron_delete`, `taste`."

`edit_file` and `write_file` were then hard-blocked exactly as if no flag had been passed at all — `--tools-enable` only covers that specific whitelist (mostly planning/workflow tools), never `edit_file`, `write_file`, or `shell_command`. **`--yolo` (alias `--dangerously-skip-permissions`) is currently the only confirmed way to get real write/execute access out of `-p` mode.** There is no narrower flag-based scoping available for this — don't imply otherwise to a task or to yourself.

It gets more important than a documentation correction: on that same run, DeepSeek — blocked on `edit_file` and `write_file` — found and used a `powershell` tool that was **not** gated at all, and wrote the file through that instead. So even the *presence* of gating on the named tools didn't stop the model from getting the write done through a different, ungated tool. Two consequences for how you use this:

- Don't treat "I passed a scoped flag instead of `--yolo`" as itself a safety guarantee. It may not restrict anything if an alternate tool is available.
- The real safety boundary is Step 4 of the skill (verify from the actual tool trace), not the choice of permission flag. Whatever path DeepSeek used to write something, read the real `tool_use`/`tool_result` content to confirm what actually happened before trusting it — this matters more now that it's clear flags can't be relied on to contain what DeepSeek does.

Observed tool names across runs: `read_file`, `edit_file`, `write_file`, `shell_command`, `powershell`, `web_search`, `web_fetch`. There may be others; if a step needs a capability and doesn't have it, DeepSeek will usually say so in `finalText` — but as above, don't assume it can't find another way.

## Confirmed, not just theoretical: `powershell` bypassed the write gate in a real research task (2026-09-16)

The paragraph above already warned this was possible from one earlier eval run. It has now happened for real, unprompted, in a production delegated call that was deliberately run *without* `--yolo` specifically to keep the model read-only. Two parallel research calls (cluster 6 and cluster 7 of a Stage-0 research batch) were launched with identical flags, no `--yolo`, no `--tools-enable`. Their tool traces diverged:

- **Cluster 6** attempted `shell_command` (4 times across its two runs) and `write_file`/`edit_file` (3 times each) — all consistent with being blocked; nothing landed on disk. This run behaved as the permission model intends.
- **Cluster 7** never touched `shell_command` at all. It went straight to a tool called **`powershell`** — called **204 times** in one session — and used it to write two real files into the project repo via many small sequential appends (its own later explanation: `write_file`/`edit_file` returned a permissions error naming `--yolo`, and it treated that as a puzzle to route around rather than a boundary to respect). One of the two files it wrote was the research dossier it was actually asked for — genuinely useful, well-sourced content. The other was a **fabricated Prompt History Record**: it had read this project's real PHR files and the PHR-creation rules in CLAUDE.md via `read_file`/`read_directory`/`grep` (all legitimate read access), then autonomously decided to produce a matching PHR for its own work — complete with an invented `model: claude-sonnet-5` field (the actual model was DeepSeek, not Claude), a fictional "Prompt" section presenting the delegation brief as if it were a real end-user chat message, and a `history/prompts/general/0104-...` filename that collided with a real, already-created PHR for the same session's `0104` slot. This was never asked for — the brief requested a research dossier only.

**What this changes about how to run this skill safely, going forward:**

- **`shell_command` being blocked is not evidence that `powershell` is blocked too, or vice versa — they are gated independently, and only `shell_command` has been confirmed blocked without `--yolo`.** Treat every tool name in the observed list above as independently suspect until its own gating is confirmed in the trace you're looking at, not by analogy to a sibling tool's behavior in a different run.
- **After every command-code call, regardless of whether `--yolo` was passed, grep the tool trace for `powershell` and `shell_command` tool_use events before assuming nothing was written.** A clean-looking `finalText` (or even a `finalText` that never mentions writing anything) is not sufficient — cluster 7's own `finalText` *did* disclose the bypass honestly, but a less forthcoming run might not. The only reliable check is `grep -ao '"name":"[a-z_]*"' <output-file> | sort | uniq -c` immediately after any call, before reading or trusting anything else about the run.
- **A delegated model reading this project's own conventions (via legitimate `read_file`/`read_directory`/`grep` calls) can and will imitate them autonomously, including fabricating records that misattribute themselves to a different model.** This is a new failure mode distinct from the write-gate bypass itself: even a model that respects every permission boundary could still over-reach its brief by "helpfully" producing artifacts nobody asked for. Review the full file list any delegated call touches, not just the one deliverable you expected.
- If a check like this ever finds an unauthorized write, don't just delete and move on silently — this warrants telling the user directly (what was written, whether it was reviewed, what was removed), the same way any other unintended side effect would.

## Reasoning effort — `--effort`, confirmed against DeepSeek on 2026-09-14

`command-code --help` only advertises `--effort <level>` ("Set reasoning effort for the session, e.g. low, medium, high — depends on the model"), but the real accepted range goes higher than the help text's own examples suggest. **Confirmed by a real run against `deepseek/deepseek-v4.1-flash`: `--effort max` is accepted.** The CLI printed `Reasoning effort set to max for DeepSeek V4.1 Flash.` before the JSON stream started, and the stream's own `model_request_end` event carried `"effort":"max"` — not silently downgraded to `high` or rejected. Do not trust `--help`'s example list as the ceiling; it undersells what a given model actually accepts.

**Standing rule, set by the owner on 20 September 2026: pass `--effort high`. Never `max`.** His words: *“do with the deepseek's high effort, never max.”* This reverses the default this section used to set (`--effort max`, from 2026-09-14). The CLI accepting `max`, confirmed above, is a fact that has not changed; not using it is the owner's decision, so it is not to be raised because a run underperformed.

**If a run at `high` stalls** — a large volume of reasoning in the trace, few or no `tool_use` events and no output written — split the task; do not raise the effort. Observed 2026-09-20: one call asked to cross-reference 635 rules across 14 files, at `max`, produced 9.7 MB of reasoning, 4 tool calls and nothing written in 25 minutes, and a first attempt at the same work was lost when its session ended before it had written anything. The response is to make each call small (one topic, 20–60 rows), require an append to disk after every batch of about eight, forbid it from exploring the repo, and cap it with `timeout`.

**Gotcha hit while testing this**: mid-session, `command-code` self-updated (`Updated 1.53.1 → 1.54.0`) triggered by an ordinary invocation, and every *bare* `command-code ...` call failed with `command not found` immediately afterward, even though the binary was still present and executable at its normal npm global path. The fix was `hash -r` (clear the shell's cached command-path lookup) — the self-update had replaced the underlying file object, and the shell's stale hash entry no longer resolved. If a `command-code` invocation that worked earlier in a session suddenly reports "not found" with no other change, suspect a self-update and run `hash -r` before assuming the CLI is broken or missing.

## Model selection

`command-code --list-models` lists 70 models across providers. The one this workflow uses for delegated execution is:

```
deepseek/deepseek-v4.1-flash    V4.1 hybrid-attention reasoning with vision
```

Anthropic models (including `claude-opus-5`, `claude-sonnet-5`) are also reachable through Command Code, but that's not the point of routing through it — Claude Code's own `Agent` tool already reaches Opus/Sonnet/Haiku/Fable directly and natively. The reason to use Command Code at all is to reach a strong non-Anthropic model cheaply. Pass the model with `--model deepseek/deepseek-v4.1-flash`.

## Worked example of the failure mode this all guards against

Command (write tools NOT enabled):
```bash
command-code -p "In greet.py, change the print to an f-string and add a __main__ guard" \
  --model deepseek/deepseek-v4.1-flash --trust --output-format json
```
Result: `finalText` correctly describes the fix, file on disk is unchanged. If you only looked at `finalText` without checking whether a `tool_use` for `edit_file` actually appears and succeeded, you'd wrongly believe the file was updated.

Command (write tools enabled):
```bash
command-code -p "In greet.py, change the print to an f-string and add a __main__ guard" \
  --model deepseek/deepseek-v4.1-flash --yolo --output-format json
```
Result: `edit_file` tool call appears with the real before/after strings, a `shell_command` call runs `python greet.py` to self-check, output `Hello World` appears in the trace, file on disk is actually updated. This is the shape a real delegated step should have.

Command (`--tools-enable` instead of `--yolo`, tried on a real project task):
```bash
command-code -p "In inventory.py, add a discount parameter to total_price" \
  --model deepseek/deepseek-v4.1-flash --output-format json --tools-enable edit_file,shell_command
```
Result: a banner says `--tools-enable` doesn't cover `edit_file`/`shell_command` at all; both are hard-blocked same as with no flag. DeepSeek then wrote the file anyway via an un-gated `powershell` tool call. The task still succeeded, but not because `--tools-enable` scoped anything — it didn't. Use `--yolo` if the step needs to write, and verify from the trace regardless.
