# Composio & Postiz — can an agent post ready text + video to each platform? (research, 2026-09-23)

Composio catalog = 1,552 toolkits (docs.composio.dev/toolkits). "Video" = a toolkit tool that accepts/publishes video exists; supply is a file upload unless noted. Managed OAuth = Composio-hosted app.

| Platform (account) | Composio toolkit | Text | Video | Requirements and limits | Source |
|---|---|---|---|---|---|
| LinkedIn (personal profile) | `linkedin` | yes — LINKEDIN_CREATE_LINKED_IN_POST | yes — LINKEDIN_CREATE_VIDEO_POST + LINKEDIN_UPLOAD_VIDEO | OAuth2, Composio-managed; scope w_member_social; 3,000 chars | https://docs.composio.dev/toolkits/linkedin |
| LinkedIn (company page) | `linkedin` | yes — same tools, organisation URN | yes | `w_organization_social` needs LinkedIn Community Management API approval; page-admin role | https://docs.composio.dev/toolkits/linkedin · https://developer.linkedin.com/product-catalog/marketing/community-management-api |
| X / Twitter | `twitter` | yes — TWITTER_CREATION_OF_A_POST | yes — TWITTER_UPLOAD_MEDIA / TWITTER_UPLOAD_LARGE_MEDIA | no managed creds (own X developer app since Feb 2026); X API is pay-per-use (no free tier) | https://docs.composio.dev/toolkits/twitter · https://docs.composio.dev/kb/guide/toolkits-twitter · https://developer.x.com |
| Facebook (Page) | `facebook` | yes — FACEBOOK_CREATE_POST | yes — FACEBOOK_CREATE_VIDEO_POST | Pages only, not personal; OAuth2 managed; also photo/multi-photo and scheduled-post tools | https://docs.composio.dev/toolkits/facebook |
| Facebook (personal profile) | none | no | no | Toolkit supports Pages only; Meta offers no publishing API for personal profiles | https://docs.composio.dev/toolkits/facebook |
| Instagram | `instagram` | no (an attachment is required) | yes — INSTAGRAM_POST_IG_USER_MEDIA + INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH (container → publish) | Business or Creator only; media must be a **public URL**; ~50 posts/24 h; App Review + Business Verification for others' accounts | https://docs.composio.dev/toolkits/instagram · https://developers.facebook.com/documentation/instagram-platform/content-publishing/ |
| Threads | none (no toolkit) | no | no | Threads API exists but Composio has no Threads toolkit (/toolkits/threads 404, absent from catalog) | https://docs.composio.dev/toolkits · https://developers.facebook.com/documentation/threads/ |
| YouTube (video & Shorts) | `youtube` | no (no text post) | yes — YOUTUBE_UPLOAD_VIDEO / YOUTUBE_MULTIPART_UPLOAD_VIDEO | exactly one video; OAuth2 managed; default 10,000 units/day, videos.insert = 1,600 (~6 uploads/day); Shorts = vertical video | https://docs.composio.dev/toolkits/youtube · https://developers.google.com/youtube/v3/determine_quota_cost |
| TikTok | `tiktok` | no | yes — TIKTOK_PUBLISH_VIDEO / TIKTOK_UPLOAD_VIDEO (photos: TIKTOK_POST_PHOTO) | no managed creds (own TikTok app); until audited, posts are SELF_ONLY (private) and ≤5 users/24 h; "upload" leaves publishing manual | https://docs.composio.dev/toolkits/tiktok · https://developers.tiktok.com |
| Reddit | `reddit` | yes — REDDIT_CREATE_REDDIT_POST (text or link) | no (no media-upload tool) | OAuth2 managed; free API 100 queries/min, commercial use needs a paid contract; subreddit rules/flair | https://docs.composio.dev/toolkits/reddit · https://www.reddit.com/dev/api |
| Telegram (channel) | `telegram` | yes — TELEGRAM_SEND_MESSAGE | partial — only TELEGRAM_SEND_DOCUMENT (≤50 MB), no sendVideo | API key only (no OAuth, not managed); bot must be a channel admin; TELEGRAM_SEND_PHOTO also available | https://docs.composio.dev/toolkits/telegram · https://core.telegram.org/bots/api |
| Discord | `discordbot` | yes — DISCORDBOT_CREATE_MESSAGE | unconfirmed — docs list text/embeds/stickers/components, no file param | OAuth2 managed (the plain `discord` toolkit is user-account only, no posting tools); bot needs SEND_MESSAGES; channel is part of settings | https://docs.composio.dev/toolkits/discordbot |
| WhatsApp (1:1 / Business) | `whatsapp` | yes — WHATSAPP_SEND_MESSAGE (business-initiated needs an approved template) | yes — WHATSAPP_SEND_MEDIA / WHATSAPP_UPLOAD_MEDIA | WhatsApp Business account only, not personal; Cloud API; recipients must opt in; template approval | https://docs.composio.dev/toolkits/whatsapp |
| WhatsApp groups & Communities (owner's main channel) | `whatsapp` (read-only, e.g. WHATSAPP_LIST_GROUPS) | no send-to-group tool | no | Cloud API can't post into groups/Communities; the Groups API needs an Official Business Account; Communities have no API | https://docs.composio.dev/toolkits/whatsapp · https://developers.facebook.com/documentation/business-messaging/whatsapp/groups/ |

## How Claude and DeepSeek reach it

- **Claude Desktop / Claude Code:** add Composio's shared MCP connector at `https://connect.composio.dev/mcp` (Settings → Connectors → Add custom connector). It exposes 7 meta-tools: COMPOSIO_SEARCH_TOOLS, COMPOSIO_GET_TOOL_SCHEMAS, COMPOSIO_MULTI_EXECUTE_TOOL (≤50 calls), COMPOSIO_MANAGE_CONNECTIONS, COMPOSIO_WAIT_FOR_CONNECTIONS, COMPOSIO_REMOTE_WORKBENCH, COMPOSIO_REMOTE_BASH_TOOL — https://docs.composio.dev/docs/composio-connect
- Or build a narrower server with `composio.mcp.create(toolkits=[…], allowed_tools=[…])` and hand Claude that URL — https://docs.composio.dev/docs/single-toolkit-mcp
- **DeepSeek (through Command Code)** is model-agnostic and needs no MCP: it reaches the same tools via the Composio SDK (`pip`/`npm` "composio"), the Composio CLI, or the REST API at `backend.composio.dev` with an `X-API-KEY` header.
- The flow is always search → connect → execute: COMPOSIO_MANAGE_CONNECTIONS returns a branded OAuth link the owner approves once, the connection then persists, and COMPOSIO_MULTI_EXECUTE_TOOL runs the publish tools — https://docs.composio.dev/toolkits/meta-tools
- **Unattended/scheduled:** Composio has event/webhook triggers only (realtime, or polling ≈15 min) and no cron scheduler, so a timer must live outside it — Windows Task Scheduler, cron, n8n or GitHub Actions calling the SDK/CLI/API.

## Postiz

- **Postiz** (postiz.com; github.com/gitroomhq/postiz-app; AGPL-3.0) posts to **34 platforms** from one queue: X, LinkedIn + LinkedIn Page, Reddit, Instagram (Facebook Business and Standalone), Facebook Page, Threads, YouTube, TikTok, Pinterest, Discord, Slack, Telegram, Mastodon, Bluesky, Nostr, Lemmy, Tumblr and more — https://docs.postiz.com/general/platforms/overview
- It is the only one of the two that **has Threads**; it has **no WhatsApp**, no Facebook personal profile and no Instagram personal profile.
- **Video is supported**, with per-platform rules enforced before posting (YouTube exactly one video; Instagram needs ≥1 attachment; TikTok one video or pictures, never mixed; X up to 4 images or 1 video).
- Interfaces: a **Public API**, a **CLI** (`npm install -g postiz`; OAuth2 device flow or `POSTIZ_API_KEY`; `POSTIZ_API_URL` for self-hosted) and an agent/MCP skill (`npx skills add gitroomhq/postiz-agent`); every CLI command outputs JSON — https://docs.postiz.com/cli/introduction
- **Self-hosting is free** (AGPL-3.0, no feature gap) but you register your own platform API keys (Meta review, TikTok audit, X pricing); Postiz Cloud from $29/month bundles the API, agent, seats and support.

## Not confirmed

- Whether Composio has any Threads toolkit: `docs.composio.dev/toolkits/threads` and `composio.dev/toolkits/threads` both 404 and Threads is absent from the A–Z catalog — treated here as "no".
- The exact per-tool video argument (local file vs public URL) was not verified schema-by-schema; Instagram is documented to require a public media URL.
- Whether `DISCORDBOT_CREATE_MESSAGE` accepts a video/file attachment — not documented, and the tool's JSON schema needs an API key to fetch (401).
- Reddit video and Telegram video through Composio: no dedicated media/`sendVideo` tool is listed, so both look unsupported (Telegram only via SEND_DOCUMENT).
- Any Composio time-based schedule tool — none found, only event triggers; also unconfirmed are Composio premium/pro-tool pricing and Postiz video edge cases beyond its own rules page.
