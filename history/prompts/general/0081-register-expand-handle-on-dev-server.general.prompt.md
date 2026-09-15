---
id: 0081
title: Register the expand handle on the dev server
stage: general
date: 2026-09-15
surface: agent
model: command-code-agent
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["sidebar", "expand-button", "swizzle", "dev-server", "diagnosis", "verification"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/0081-register-expand-handle-on-dev-server.general.prompt.md (this file)
tests:
 - Diagnosed the running :3000 dev server by PID (Get-NetTCPConnection + Win32_Process) — `docusaurus start --port 3000`, started 05:09:42, i.e. before the new swizzle file existed
 - Probed the collapsed state's DOM on :3000 before the restart — `button[aria-label="Expand sidebar"]` absent, confirming the upstream `div[role=button]` was still mounted
 - `kill_shell({pid:16792})`, confirmed the port freed, restarted `npm start -- --port 3000 --no-open`
 - Re-ran the measured render audit against http://localhost:3000/intro-2-architecture-map, light + dark — both states now correct (see Response snapshot)
---

## Prompt

for the collapsing, it is great, more beautiful than I expected, but for expending, the same old stupid and ugly design. fix that too

## Response snapshot

The complaint was accurate and the cause was not the design. The expand control in the working tree *was* rebuilt in PHR 0080 — a native `<button>` over the rail with a 36×36 knob at its head — and that was already confirmed against a freshly served production build. What the owner was looking at was a `docusaurus start --port 3000` process that had been running since **05:09:42 that morning**, hours before `src/theme/DocRoot/Layout/Sidebar/ExpandButton/` existed.

Docusaurus resolves `@theme/*` swizzle aliases **at startup**, by scanning `src/theme` once. The collapse handle appeared correctly on that same server because it lives in files that already existed and were edited (CSS module + component), which hot-reloads; a *newly swizzled* path never enters the alias map of an already-running server, so `@theme/DocRoot/Layout/Sidebar/ExpandButton` kept resolving to theme-classic's upstream `div[role="button"]`. Everything else on that page — including the 44px rail itself, from `custom.css` — was live, which is exactly why only the expand state looked untouched.

Confirmed before touching anything: probing the collapsed DOM on :3000 returned no `button[aria-label="Expand sidebar"]` while the collapse handle matched the built geometry to the pixel (114×44 at x=99). Then stopped that process by PID, confirmed port 3000 freed, started a fresh `npm start -- --port 3000 --no-open`, and re-ran the audit against the URL the owner actually uses.

Verified on `localhost:3000`, light + dark:

| | light | dark |
|---|---|---|
| expand hit area | 43 × 900 (the whole rail) | same |
| knob | 36×36 at (4, 68) | same |
| knob / rail tone step | 1.11:1 | 1.63:1 |
| glyph | silver-5 → **5.29:1** | silver-2 → **7.02:1** |
| radius / shadow | 13px / `--tbb-shadow-md` | same |
| keyboard reach (collapsed) | **1 tab** | **1 tab** |

## Outcome

- ✅ Impact: the complete change — both states — is now live at `localhost:3000`. No source file was changed in this turn; the deliverable was already correct in the working tree and in the production build, and this turn removed the stale-server illusion.
- 🧪 Tests: See `tests:` above. The owner's own preview URL is now the verified one, rather than a temporary served build on :4173.
- 📁 Files: none modified. PHR only.
- 🔁 Next prompts: the owner's read on the expand knob's visual weight in light mode, where the knob separates from the rail by tone at only 1.11:1 and is defined by its shadow — the same dial flagged in PHR 0080.
- 🧠 Reflection: this is the second time in this session that `localhost:3000` was the ground truth and the checks were pointed somewhere else. PHR 0077 hit the same port already occupied and moved to an auto-assigned one; here the temporary :4173 serve verified the artifact but not the surface the owner reads, so a change that was fully working shipped as "unfixed" for a whole turn. Verify on the URL the owner uses, or say plainly that it was verified somewhere else.

## Evaluation notes (flywheel)

- Failure modes observed: (a) **My own false positive, corrected.** In the previous turn I reported :3000 as "NOT serving the new glyph". That test was invalid: `curl`ing a Docusaurus dev route returns a ~1.9KB client-rendered shell containing **no sidebar markup at all** — old, new, or otherwise — so a substring search over it can neither confirm nor deny anything. The claim happened to point at a real problem, for the wrong reason, and I nearly acted on it by restarting a process for the wrong cause. The valid test is measuring the live DOM, which is what settled it. (b) The distinguishing question was never "is the new markup in the HTML" but "which component is mounted" — answered by `button[...]` being absent where a `div[role=button]` was expected. (c) A newly swizzled path requires a dev-server restart; an edited existing swizzle does not. Worth remembering as a standing rule for this repo, since it reads as "my change didn't apply".
- Graders run and results (PASS/FAIL): live-DOM audit on :3000 PASS on every measured pair, both themes, both states. No source change, so no build/typecheck/axe re-run was warranted.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): when a UI change spans a newly swizzled component, restart the dev server as part of the change rather than after the owner reports it.
