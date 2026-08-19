---
id: 0006
title: Pause implementation and pivot to Apple Pro theme
stage: misc
date: 2026-08-17
surface: agent
model: claude-opus-4-7
feature: 002-apple-design
branch: 002-apple-design
user: Dell
command: (mid-turn pivot — user said "copy the theme of the habit-tracker-app")
labels: [pivot, theme, apple-pro, silver-black, oklch, hairline, frosted-glass, constitution-amendment, spec-refresh]
links:
  spec: specs/002-apple-design/spec.md (will be refreshed)
  ticket: null
  adr: history/adr/0001-free-tier-llm-choice.md (cross-ref)
  pr: null
files:
  - edu-site/src/components/MagicUI/Timeline.tsx (refactored: scroll-tied spine drawing removed; spine now static; typecheck still green)
  - history/prompts/002-apple-design/0006-implement-pause-and-pivot.misc.prompt.md (created)
tests:
  - timeline spine static refactor — typecheck PASS (tsc exit 0)
  - pivot scope — pending user confirmation
---

## Prompt

> (mid-turn) copy the theme of the: C:\Users\Dell\Desktop\Habit tracker\habit-tracker-app

## Response snapshot

- Inspected `C:\Users\Dell\Desktop\Habit tracker\habit-tracker-app\src\index.css` — the habit-tracker-app uses "Apple Pro — Silver & Black, industrial premium. Inspired by iPhone Pro / Vision Pro / Final Cut Pro / Logic Pro".
- Identified the meaningful delta from the current 002-apple-design implementation:
  - **Primary color**: deeper Apple Pro Blue (`oklch(0.5 0.21 264)` light / `oklch(0.68 0.18 264)` dark) instead of `#0071e3` / `#0a84ff` (Apple-standard system blue).
  - **Backgrounds**: pure white (`oklch(0.99 0 0)`) / pure black (`oklch(0.07 0 0)`) instead of warm gray scales.
  - **Hairline borders**: ultra-fine 0.5px via `box-shadow: inset 0 0 0 0.5px var(--hairline)` — Apple Pro signature.
  - **Apple Pro mesh**: subtle radial gradients at 12% / 88% / 50% positions, monochrome.
  - **Apple Pro frosted glass**: `backdrop-filter: saturate(180%) blur(24px)` with `frosted-strong` variant at `blur(40px)`.
  - **Silver / graphite surfaces**: `linear-gradient(180deg, ...)` with inset top-highlight + bottom-shadow stack.
  - **Platinum text gradient**: silver→graphite→electric blue for editorial moments.
  - **Apple Pro glow**: electric-blue aura `box-shadow: 0 0 0 1px + 0 0 24px -4px`.
  - **Silver-shine shimmer**: animated silver gradient at `background-size: 200% 100%`.
  - **Pro font stack**: `-apple-system, "SF Pro Display", "SF Pro Text", "Inter", "Helvetica Neue"`.
- The current `002-apple-design` implementation (Phase 2–8 mostly shipped) is built on Apple-standard system blue + Radix warm gray + Apple-blue CTA. Pivoting requires:
  - Constitution PATCH (Principle VII to "Apple Pro Silver & Black")
  - spec.md refresh (new clarifications + new FR chain)
  - plan.md, contracts, data-model refresh
  - new tasks.md
  - re-implementation of all CSS tokens + surfaces
- This is non-trivial: ~80% of the CSS work I just shipped needs to be replaced. Constitution Principle IV (NON-NEGOTIABLE) requires spec-first.
- Asked the user focused clarifying questions before re-implementing.

## Outcome

- ⏸️ Implementation paused pending user confirmation.
- ✅ Timeline spine refactor (last edit before pivot) — typecheck PASS.
- 📁 Files NOT yet modified for the pivot (intentionally — spec-first).
- 🔁 Next prompts (owner decides): answer the clarifying questions; on confirmation, run `/sp.specify` with the new theme, then `/sp.constitution` PATCH, then `/sp.plan`, then `/sp.tasks`, then `/sp.implement`.
