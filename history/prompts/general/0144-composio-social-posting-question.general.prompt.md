---
id: 0144
title: Composio social posting question
stage: general
date: 2026-09-23
surface: agent
model: claude-sonnet-5
feature: none
branch: main
user: owner
command: none
labels: ["composio","automation","social-media"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - _scratch/job-briefs/2026-09-23/job18-posting-research.md
  - history/prompts/general/0144-composio-social-posting-question.general.prompt.md
tests:
  - none
---

## Prompt

i am asking for this sessions, i know I have not connected my most accounts with the composio, i am asking technically, whether with the composio tools, this is possible or not (in future, after setting up the things)

## Response snapshot

Explained how Composio posting works in principle and had DeepSeek verify, per platform, which posts and videos its tools can publish.

## Outcome

- ✅ Impact: A confirmed, per-platform answer to whether an agent can publish a ready text and a video through Composio once accounts are linked — LinkedIn, X, Facebook Page, Instagram, YouTube, TikTok, Reddit, Telegram, Discord and WhatsApp — with the gaps named (no Composio toolkit for Threads; no way to post into the WhatsApp groups and Communities the owner actually uses; Reddit and Telegram video unsupported) and Postiz recorded as the alternative that covers Threads.
- 🧪 Tests: none — research only, no repository file besides the two written here; every row is backed by an official Composio, Meta, Google, Microsoft, Telegram, TikTok or Postiz page.
- 📁 Files: the research note in the job-briefs folder, plus this record.
- 🔁 Next prompts: decide whether to connect accounts through Composio (Claude desktop app via the MCP connector, DeepSeek via SDK/CLI/REST) or stand up Postiz self-hosted for the multi-platform queue, and choose the external scheduler for unattended posting.
- 🧠 Reflection: the honest answer is "mostly yes, with three sharp exceptions" — Threads has no Composio toolkit at all, the owner's main WhatsApp groups/Communities are out of reach of the Cloud API, and every video path depends on a platform approval or quota (TikTok audit, YouTube 1,600 units per upload, X pay-per-use). Composio itself has no scheduler, so "unattended" always means an external timer.

## Evaluation notes (flywheel)

- Failure modes observed: the Composio docs catalogue and toolkit pages are the only reliable source — per-tool JSON schemas are not public (the REST endpoint returns 401), so a few video-supply details rest on tool names and descriptions rather than schemas and are flagged as unconfirmed.
- Graders run and results (PASS/FAIL): not run.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): once one account is connected, execute a single COMPOSIO_SEARCH_TOOLS prompt for that platform and record the real video argument, replacing the two rows still marked unconfirmed.
