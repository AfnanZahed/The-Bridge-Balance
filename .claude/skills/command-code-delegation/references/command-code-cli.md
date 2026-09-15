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

## Reasoning effort — `--effort`, confirmed against DeepSeek on 2026-09-14

`command-code --help` only advertises `--effort <level>` ("Set reasoning effort for the session, e.g. low, medium, high — depends on the model"), but the real accepted range goes higher than the help text's own examples suggest. **Confirmed by a real run against `deepseek/deepseek-v4.1-flash`: `--effort max` is accepted.** The CLI printed `Reasoning effort set to max for DeepSeek V4.1 Flash.` before the JSON stream started, and the stream's own `model_request_end` event carried `"effort":"max"` — not silently downgraded to `high` or rejected. Do not trust `--help`'s example list as the ceiling; it undersells what a given model actually accepts.

**Default going forward: pass `--effort max`, not `--effort high`,** on delegated calls for `deepseek/deepseek-v4.1-flash` — this is a strictly cheaper-than-Claude reasoning budget, so the skill's own "pay for more of DeepSeek's reasoning tokens by default" guidance points at whatever the real ceiling is, not at the highest value `--help` happens to print. If a future run shows `max` being rejected or silently downgraded for this or another model (check `usage.outputTokens` and the `effort` field on `model_request_end` to confirm it actually took), correct this section rather than assuming the flag works as named — same standing instruction as before, just updated with what actually held up on inspection this time.

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
