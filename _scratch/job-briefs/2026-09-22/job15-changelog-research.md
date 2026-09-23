# Changelog standards research - 22 September 2026

Purpose: reasoning notes for the redesign of the public changelog page at `edu-site/docs/changelog.md`. The notes record what each source actually does, what it does well, and what it leaves out, then turn that into rules this project can check off. Wording is taken as reasoning only; no text or layout is copied. Quoted words are at most six and appear only where the wording rule itself is the point.

## Sources actually read

| Source | Exact URL fetched | Date of fetch | What kind of page it is |
| --- | --- | --- | --- |
| Keep a Changelog 1.1.0 | https://keepachangelog.com/en/1.1.0/ | 22 September 2026 | A convention or spec document, not a product changelog. Defines why and how to keep one, plus anti-patterns and a FAQ |
| Linear changelog | https://linear.app/changelog | 22 September 2026 | Product changelog index, one long reverse-chronological page with many items per day (first page only, older entries behind /changelog/page/2) |
| Vercel changelog | https://vercel.com/changelog | 22 September 2026 | Product changelog index, short cards grouped under day headings, paginated with "Show more" |
| Vercel single entry | https://vercel.com/changelog/drives-for-vercel-sandbox-are-now-in-public-beta | 22 September 2026 | One full changelog entry with heading anchors, copy-link controls, code samples, pricing and a read time |
| GitHub changelog | https://github.blog/changelog/ | 22 September 2026 | Product changelog index with a type filter (Release, Improvement, Retired), a product tag rail, and month groups |
| GitHub single entry | https://github.blog/changelog/2026-09-21-refreshed-repository-pull-requests-page-generally-available | 22 September 2026 | One full changelog entry with a type label, read time, lead image, Highlights and Recent improvements sections, and related posts |
| Stripe changelog (own pages) | https://docs.stripe.com/changelog | 22 September 2026 | FAILED. Fetch returned a 504 upstream timeout on five attempts |
| Stripe changelog, alternates tried | https://stripe.com/blog/changelog ; https://stripe.com/docs/changelog ; https://stripe.com/changelog ; https://stripe.com/shipped ; https://docs.stripe.com/upgrades ; https://docs.stripe.com/changelog?locale=en-GB | 22 September 2026 | ALL FAILED, each with the same 504 upstream timeout. No Stripe-owned page was read |
| Stripe API changelog, third-party index | https://releases.sh/stripe/stripe-api-changelog | 22 September 2026 | A third-party tracking site that states its source is docs.stripe.com/changelog. It is not Stripe, so anything below about Stripe is indirect evidence, labelled as such |
| Docusaurus release notes | https://docusaurus.io/blog/releases/3.10 | 22 September 2026 | A narrative release announcement blog post, version 3.10, with date, read time, author, themed sections, code diffs and callouts |
| Docusaurus changelog index | https://docusaurus.io/changelog | 22 September 2026 | A list of version numbers with release dates and contributor avatars, linking to one exhaustive page per version |
| Docusaurus blog index | https://docusaurus.io/blog/releases | 22 September 2026 | FAILED with a 404. The site's current release banner points at /blog/releases/3.10, which loaded, so the read source above is the replacement |

Notes on the table: no page failed silently. Stripe is the only organisation whose own site could not be read at all, and section 5 is written on that basis. The per-version Docusaurus page `/changelog/3.10.0` was not read, so nothing is claimed about its internal grouping.

## 1. Keep a Changelog 1.1.0

**Structure.** A rulebook, not an example. It answers what a changelog is, why keep one, who needs one, how to make a good one, how to reduce the work, how they go bad, and a FAQ. The workable output is a short list of principles and a fixed set of group words. It recommends one file named `CHANGELOG.md` and says versions and sections should be linkable. It also suggests keeping an `Unreleased` section at the top so upcoming work has a home before release day.

**Dating.** The most concrete rule on the page. It recommends a date shaped like `2017-07-17`, because it runs from largest unit to smallest, does not collide with regional formats that swap month and day, and matches an ISO standard. It argues the case openly, including that no date format feels natural to everyone, which is why the unambiguous one is chosen.

**Grouping.** Six fixed words, each with a one-line meaning: `Added` for new features, `Changed` for changes to existing functionality, `Deprecated` for features about to be removed, `Removed` for features now gone, `Fixed` for bug fixes, `Security` for vulnerabilities. Same types of change are grouped together. It also insists that deprecations, removals and breaking changes be listed even if nothing else is, because a reader upgrading needs to see what will break.

**Headline style.** Almost nothing here. The page governs version headings and group words, not the sentence a reader actually reads. There is no advice on writing one clear line about a change, no rule on length, tense, or who the reader is. That is the largest hole in the spec and the reason the product changelogs below are worth studying.

**What it does well.** It puts the reader first as a stated principle. It fixes a small, stable vocabulary so a reader learns the page once. Newest first, a date on every version, and one entry per version are all stated. It names three real failure modes and does not soften them: using commit log diffs, hiding deprecations, and updating the log inconsistently. It treats a yanked release as something that must be shown loudly rather than deleted. It admits the document is opinion rather than truth, which is honest and useful.

**What it misses.** It assumes versioned software and semantic versioning, which a course site does not have. It gives no help with the reader-facing sentence, the page introduction, entry length, tense, or links. It assumes a developer audience that already knows the words feature, deprecation, and breaking change. It says nothing about the phone, about plain English, or about a reader who has never programmed. It has no notion of who a change is for.

**Rules it states plainly.** A short list worth carrying forward: changelogs are for humans rather than machines; there should be an entry for every single version; the same types of change are grouped; versions and sections should be linkable; the latest version comes first; each version shows its release date; state whether you follow semantic versioning; keep an `Unreleased` section at the top; never use commit log diffs as the changelog; list deprecations and breaking changes even if nothing else is listed; use one consistent date format; and update consistently, because a partial changelog can be as misleading as none.

**FAQ points that matter here.** Renaming the file is not neutral, and one name (`CHANGELOG.md`) is recommended because findability is a feature. GitHub Releases are criticised as non-portable, since they display only inside GitHub and are not as discoverable as a file. Automatic parsing is described as hard because formats differ so widely. A yanked release must be shown next to its version with a loud tag rather than hidden. Rewriting a changelog is allowed and treated as normal, including going back to add a missed breaking change.

## 2. Linear

**Structure.** One very long page, newest first, paginated at the end (`/changelog/page/2`). Each block opens with a date line, then usually one lead item with a headline, a screenshot, and several paragraphs, and then a set of bulleted lists. Several items share one date. There is no separate entry page; each lead item has its own anchor. The site also separates other writing into tabs (Changelog, Product launches, From the team, From the community, Press).

**Dating.** Full month name and day, then year: "September 14, 2026". No version numbers anywhere. The date is a block heading, not a link, and it is the only ordering signal on the page. Some posts carry a fixed date in the URL slug (`/changelog/2026-09-14-loops-for-product-management`) that differs in format from the visible date.

**Grouping.** Two levels and both are consistent. Level one is the kind of change: `Fixes` and `Improvements`, plus topical groups that appear as their own headings such as `Keyboard shortcuts`, `API`, `MCP server` and `Coding sessions`. Level two is a product area label prefixed to each bullet: Diffs, Settings, Slack, Editor, Projects, Triage, Mobile, Desktop. Bullets are one sentence each. Under Fixes the verb is past tense and negative-to-positive ("Fixed", "Reduced", "Prevented", "Preserved"); under Improvements it is "Added", "Improved", "Changed", "Renamed", "Grouped", "Showed".

**Headline style.** Lead headlines are short noun phrases, not sentences: "Priority inbox", "Team initiatives", "Introducing Loops", "Initiative properties", "Callout components". They name the thing, then the body says why it matters. Bullet text is a single clause with no bold and no full stop.

**What it does well.** The lead item carries the reason before the list: it says the problem first, then what now happens, then how to start. Fixes are kept apart from improvements, so a reader can tell a repair from a new capability without reading any bullet. Product area labels make a long list scannable and searchable by eye. Every release has a name a person could say out loud. New things that need explaining link to the docs rather than explaining themselves at length.

**What it misses.** It is written entirely in product vocabulary. A reader who does not already use the product cannot decode Diffs, Loops, Pulse, Asks, or MCP, and most bullets are only meaningful to an existing user. There is no page introduction saying what the page is or how often it updates. There is no per-day or per-month summary, so volume wins over meaning: the first page alone carries hundreds of bullets. It is very heavy for a phone, with large screenshots inside the list. There is no statement of who a change is for, and nothing written for a beginner.

**Recurring patterns observed.** A lead item ends with a plain instruction and a docs link ("To get started, open the inbox display options", "Learn more in the docs"). Where something costs money or is limited to a plan, the entry says so in the body in words (Business and Enterprise plans, uses AI credits, promotional credits expire on a stated date). The verb set is tight and repeated: Fixed, Reduced, Prevented, Preserved, Stopped, Removed for repairs; Added, Improved, Changed, Renamed, Grouped, Showed, Made for improvements. No entry names the person who made the change. No entry says whether the reader must do anything.

## 3. Vercel

**Structure.** Two layers. The index shows short cards grouped under day headings ("22 Sep", "21 Sep"), each card a headline plus one or two sentences plus author names. Each card links to its own full entry page. That entry page has heading anchors with copy-link controls, a date, a read time ("2 min read"), code samples, limits and pricing, and a docs link. The index paginates ("Show more" to `/changelog/page/2`).

**Dating.** Day level only. The index shows a compressed form with the month abbreviated and the year absent ("22 Sep"). The entry page shows "22 Sep 2026". No versions. Several unrelated entries can share one day and they sit as sibling cards under that day, with no further grouping.

**Grouping.** Grouping is by day and nothing else. There is no fix or feature category, no product area heading. Each change is one card. A change that is really a feature launch (Drives for Sandbox) and a change that is a pricing statement sit side by side with equal weight.

**Headline style.** Full statements, product first, state of change last: "Drives for Vercel Sandbox are now in public beta", "Deployments now show billable duration and CPU minutes", "Vercel Connect now supports Microsoft Teams". The summary sentence under the headline answers what it does and who it is for in one line: "persistent storage you mount into a sandbox".

**What it does well.** The card is scannable in about two seconds: headline, one line, done. The one-line summary is the single most useful feature in any of the sources read, because it tells a reader whether to open the entry. Maturity words are used consistently across the whole page ("now available", "public beta", "generally available", "40% off"), which acts as a scale of readiness without a legend. Author names give a human owner. The full entry is deep where it should be deep and the index stays shallow.

**What it misses.** There is no thematic grouping, so a reader cannot call up all fixes or all new features. There is no page introduction. The summaries assume the reader already knows the products, so a beginner meets Sandbox, Gateway, and Connect with no plain meaning attached. Many entries in a row are near-identical in shape (a model is now available), which makes them hard to tell apart. The index dates drop the year, and no rule says which format wins when the two pages disagree. Removals and deprecations have no named home here.

**Entry page anatomy, in order.** A full-statement title, then the author list, then a Blog and Changelog breadcrumb pair, then the date and a read time, then a Copy control. A one or two sentence opener naming the state and the plans it is on ("now available in public beta on Hobby, Pro, and Enterprise"). A plain definition of the new thing ("persistent storage that you mount as a directory"), then worked examples, each under its own heading anchor. Code in fenced blocks, each followed by a one-line caption saying what the sample does. A limits and pricing section with real per-region numbers. A closing link to the docs. Nothing is left at the level of "it is better now".

## 4. GitHub

**Structure.** Three layers of navigation on one index: a type filter across the top, a product tag rail down the side, and month groups running down the page. Each entry is a row with a day and type label ("Sep.22 Release"), a headline, and one or more tag chips. Entry pages carry the type label, the date, a read time, a lead image, `Highlights` and `Recent improvements` headings, bullets, a docs link, and related posts. Older months are collapsed on the index.

**Dating.** Full date on the entry page ("September 21, 2026"). Day and month abbreviated in the index list ("Sep.21") under a month heading. No versions on the reader-facing page; version numbers appear inside entries for products that have them.

**Grouping.** By type and by product tag, not by feature or fix. The type vocabulary is `Release`, `Improvement`, `Retired`, and Retired is where deprecations and sunsets live. Product tags are things like Actions, Copilot, Application Security, Supply chain security, Account management. A reader can filter by either, and the filter state is shown in words ("Filters (0 selected)") with an Any or All match switch.

**Headline style.** Full sentences in the present or immediate past, product first: "Refreshed repository pull requests page generally available", "Claude Opus 5.5 is now available in GitHub Copilot", "SHA-1 in HTTPS on GitHub sunset", "Stage-only npm tokens for safer automation". Maturity words appear often: generally available, public preview, deprecated, sunset.

**What it does well.** A large changelog stays navigable because the reader can choose an axis: by kind of change or by product. Deprecations are findable by name instead of buried, which is rare and valuable. Every entry states its own maturity, so a reader can tell shipped from preview from doomed. Entry pages add the headings a reader needs (highlights, recent improvements) and a link out to the docs. The taxonomy is applied the same way every month.

**What it misses.** The type words are not what a reader feels. "Release" does not tell you whether the thing is new, faster, cheaper, or fixed. The tag rail is internal product vocabulary, and a beginner cannot map their own problem onto Copilot or Supply chain security. There is no page introduction. Index rows carry a headline but no summary, so a reader must open each one to learn anything, which is the opposite of Vercel's choice. Nothing states who a change is for.

**Vocabulary and patterns observed.** Maturity words appear inside headlines and bodies: generally available, public preview, deprecated, sunset, expires, upcoming. Types seen are Release, Improvement and Retired, and Retired is applied loosely, since it labels both a deprecation notice and an entry whose headline is a security improvement, so the type word cannot be trusted as a category. Product tags seen on the first page: account management, actions, application security, client apps, collaboration tools, community engagement, Copilot, ecosystem and accessibility, enterprise management tools, platform governance, projects and issues, supply chain security. Dates are abbreviated in the list ("Sep.22") and written in full on the entry ("September 21, 2026").

## 5. Stripe

**Direct read: not possible.** Every Stripe-owned URL tried returned a 504 upstream timeout, six times in total, across `docs.stripe.com/changelog`, `stripe.com/blog/changelog`, `stripe.com/docs/changelog`, `stripe.com/changelog`, `stripe.com/shipped` and `docs.stripe.com/upgrades`. Nothing in this section should be treated as a reading of Stripe's own page. What follows is what a third-party index showed, and the inference drawn from it is labelled.

**Structure (indirect).** The index at releases.sh states its source as docs.stripe.com/changelog and links each release to an anchor of the form `docs.stripe.com/changelog#2026-07-29-preview`. Releases appear as dated items with a version identifier and a short summary; each has a "Read more" link. Product-area headings appear inside some releases (`Payments`, `Billing enhancements`, `Connect enhancements`). The index reports an average of about two releases per month and tracking since August 2017.

**Dating (indirect).** The date is the version identifier. Entries read `v2026-07-29.preview`, `v2026-07-29.dahlia`, `v2026-06-24.dahlia`, `v2026-02-25.clover`. Two branches share a date: a dated named version (Dahlia, Clover) and a dated preview. The anchor for each release is the date plus the name, so the date is doing double duty as the URL key.

**Grouping (indirect).** By release, then by product area inside the release, and within an area by bullet. The vocabulary is the API vocabulary of the product (Accounts v2, Global Payouts, Financial Addresses, Payment Links). The word "breaking" is used in plain words inside the summary rather than as a category.

**Headline style (indirect).** Headlines name the affected surface and the change, for example a renaming, a new endpoint, or a property becoming nullable. They are written for someone integrating the API, and many headlines are only comprehensible with the release's version beside them.

**What it does well (inferred).** Version identifiers give a precise, citable handle for every change, which is exactly what an integrator needs. Two tracks (a dated named version and a dated preview) make the upgrade path explicit instead of hiding preview work inside a stable release. Breaking changes are named in words, and stable date-based anchors mean old links keep working. The page is calm and regular, roughly monthly.

**What it misses (inferred, and partly a limit of the source read).** The identifier scheme is unusable to a reader who does not already live in the API. "Preview" only means something if you know the upgrade model. There is no plain statement of what changed for a person, no page introduction, and no notion of a beginner reader. Because the summary text seen was served by a third-party index, I cannot confirm which words are Stripe's and which are the index's paraphrase, so no wording rule is taken from this source.

## 6. Docusaurus

**Structure.** Two separate artifacts doing two jobs. The release post (`/blog/releases/3.10`) is a narrative announcement: title with version, date and read time ("April 7, 2026", "13 min read"), author with photo and links, an opening announcement, then themed sections, code diffs shown as before and after, callouts for limits and experimental status, and a closing pointer to the exhaustive list. The changelog index (`/changelog`) is a bare list: version number, release date, contributor avatars, one page per version.

**Dating.** Month name, day and year on both the post and the index ("July 10, 2026"), and versions carry the version number instead of a date in the heading. Cadence is irregular: 3.10.2 in July 2026, 3.10.0 in April 2026, 3.9.x in late 2025, so the page can be quiet for months.

**Grouping.** By version at the top level, then by theme inside the release post. The themes are feature-shaped rather than type-shaped: Security, Site Storage, Strict MDX, VCS API, Translations, Other changes. Status words are appended to theme headings ("Docusaurus Faster - Stable", "VCS API - Experimental"), so readiness is part of the heading. Inside the post, sub-headings break a theme into the specific thing being changed.

**Headline style.** Teaching headings that name a capability and its state, not a task completed. The prose says what it is, why the change was made, what it costs you, and what will need to change on your side. A closing line points at the exhaustive changelog for the full list.

**What it does well.** Separating the story from the full record is the strongest structural idea in any of the sources: a reader chooses the narrative or the list, and neither has to carry both jobs. Every claim links to a pull request, so the reader can verify. Breaking changes come with a migration path and an opt-in flag rather than a warning alone. The post states limits openly, including that a security workflow does not protect your site. Translator credit is given by language, including Urdu. The post says where it sits in the sequence ("the last release in the v3.x line"), which orients a reader instantly.

**What it misses.** It is written for developers who already run the software. A config diff and a before-and-after tree cannot be read by a beginner, and the post is long on purpose (a 13 minute read). The changelog index is unusable for anyone deciding whether a release matters, because it holds a version, a date and faces, and no summary at all. Nothing explains the difference between the blog and the changelog, so a new reader does not know where to start. The schedule is irregular, so a reader checking weekly often finds nothing.

**Patterns observed in the release post.** Callouts sit beside the claim they qualify: one states that a security workflow does not protect your site, another marks a feature experimental, another explains a future change to how files are read. Code is shown as one block with minus and plus lines, so the exact edit is visible. Sections named for the coming version tell the reader about work that has not shipped and how to opt in early, which is the cleanest separation of shipped from coming seen in any source. Every bullet in the trailing "Other changes" list carries a pull request number, and the post closes by deferring to the exhaustive changelog entry. The post never apologises, it states the limitation and continues. Translator credit is given by language with the pull request number, and the list includes Urdu.

## What they share

1. Newest first, everywhere. Not one source breaks reverse chronological order.
2. A date on every change, or a version that stands in for one. Nothing is undated.
3. Real grouping, done the same way each time. Keep a Changelog fixes six words, Linear separates Fixes from Improvements, GitHub names three types, Docusaurus themes by feature, Stripe groups by product area.
4. One change per item. No paragraph mixes three unrelated changes, except in the linear narrative posts where the theme itself is the item.
5. Concrete verbs and a stated state: "Fixed", "Added", "Reduced", "now available", "generally available", "public beta", "sunset".
6. A way out for the reader who wants detail: a docs link, a pull request number, or a full entry page.
7. A distinction between shipped and not shipped, expressed in words rather than left to the reader.
8. No commit messages and no raw engineering noise in the reader-facing text. Keep a Changelog names this failure mode directly.
9. Credit is optional and inconsistent: Vercel and GitHub name authors, Docusaurus lists contributors, Linear and Keep a Changelog do not.

## What they differ on, and which choice is better and why

**Comparison at a glance.** Read the table first, then the reasoning under it.

| Dimension | Keep a Changelog | Linear | Vercel | GitHub | Stripe | Docusaurus |
| --- | --- | --- | --- | --- | --- | --- |
| Ordering | newest first | newest first | newest first | newest first | newest first (unverified) | newest first |
| Spine | version | date | date | date plus type | API version | version |
| Grouping | six type words | Fixes, Improvements, product area | day only | type and product tag | product area (indirect) | theme |
| Summary line under a headline | not covered | lead item only | yes, every card | no | yes (indirect) | prose, not a card |
| Removals named | yes, a group word | no | no | yes, `Retired` | yes, in words (indirect) | only inside a theme |
| Page introduction | spec text, not on-page | no | no | no | not verified | no |
| Author credit | no | no | yes | yes | not verified | yes, contributors |
| Separate full entry | not covered | anchor only | yes | yes | anchor only | yes, per version |
| Visible date format | `YYYY-MM-DD` | Month D, YYYY | D Mon on index, D Mon YYYY on entry | Mon D, YYYY on entry, Mon D in list | version string | Month D, YYYY |
| Written for | developers | existing users | existing users | existing users | API integrators | developers |

**Spine: version numbers or dates.** Keep a Changelog, Stripe and Docusaurus are organised by version. Linear, Vercel and GitHub are organised by day. A course site has no versioned releases, so dates must be the spine. The reader's question is "what changed since I last looked", and only a date answers it.

**Grouping: by type or by product.** Keep a Changelog and GitHub group by kind of change; Linear and Stripe also group by product area; Vercel groups by day only. For a beginner audience the small fixed type set wins, because it is learnable once. A product tag rail or a filter panel is the wrong weight for a course with one product and a few dozen entries.

**A summary line or a headline alone.** Vercel prints one summarising sentence under each headline. GitHub prints rows with a headline and no summary. The summary is better: it lets a reader decide whether to open anything, and it is the only part that works when the reader is on a phone and in a hurry. This is the single biggest improvement available to the project's page.

**Deprecations and removals: hidden, named, or grouped.** Docusaurus warns inside thematic sections; GitHub gives removals a named type (`Retired`) with a filter; Stripe says "breaking" in words; Vercel and Linear barely handle it; Keep a Changelog makes it a group word and says to list them even if nothing else is listed. Naming them is better than any alternative, because a removed thing is the one change a reader cannot discover by noticing.

**One page or a narrative plus a list.** Docusaurus splits them and each stays clean. Linear mixes them, and the list buries the story. This project cannot afford two pages, so it should keep one list page and let a headline plus one line carry the story part.

**Tone.** Vercel is neutral and product-led, Stripe is contractual, Linear is in-group, GitHub is institutional. None of them are warm and none of them explain themselves to an outsider. Warmth is a choice this project has to make deliberately rather than borrow, because no source read demonstrates it.

**Headline shape.** Noun phrases (Linear) read fast but say nothing on their own. Full sentences (GitHub, Vercel) cost a few more words and can carry subject, verb and state. Full sentences are the right choice for a beginner.

**Where this project's current page already stands.** The page in the repository at `edu-site/docs/changelog.md` already uses `### YYYY-MM-DD` date headings, newest first, an introduction that says what the page is and what it leaves out, bold lead sentences on each entry, and a link to the page or FAQ a change touches. It is already closer to the rules below than four of the six sources. The two clear gaps against the research are grouping (it has none, so New, Changed, Fixed and Removed are invisible) and entry length (some entries run well past 60 words, which the research says should link out instead). Both are fixable without deleting any true history.

## What all of them miss for a free course read by beginners

1. **None is written for someone who has never programmed.** Every page assumes a vocabulary: sandbox, gateway, MCP, diff, deploy, API version, preview. For a beginner in Pakistan reading on a phone, that vocabulary is a wall, and none of the six pages offers a plain gloss at first use.
2. **None of them say who a change is for.** A learner needs to know whether a change touches their stage, their chapter, or nothing they use yet. The sources replace this with product names, which only existing users can decode.
3. **None of them say what the reader should do now.** A reader is left to work out whether anything is required of them. A course page can answer that in a few words.
4. **None of them handle withdrawn content honestly in plain words.** A course that pulls a chapter back needs to say that clearly, and to say what to read instead. GitHub's `Retired` and Keep a Changelog's `Deprecated` and `Removed` cover the fact, not the reader's next step.
5. **None of them carry a page introduction.** Vercel, Linear, GitHub and Docusaurus begin straight into entries. Only Keep a Changelog explains a changelog at all, and it treats that as a spec, not as an introduction on the page itself. Nothing tells a first-time reader what the page is, who writes it, how often it changes, or what is deliberately kept out.
6. **None address a slow phone.** Linear's page carries hundreds of bullets and large screenshots; Vercel's has "Show more" but no weight budget; Docusaurus posts run to a 13 minute read. None of them is built for a reader paying for data.
7. **None use a date format that a beginner cannot misread without being told.** Only Keep a Changelog gives the rule and the reason; the product pages use month names, abbreviations, and year-less forms that change from index to entry page.
8. **None tell a reader the cost in their own time or money.** Stripe and Vercel state API and pricing facts for their own customers, but no page says "this will take you an hour" or "nothing changes for you".
9. **None clearly separate shipped from planned under one look.** Preview, beta and shipped sit at similar weight, and Keep a Changelog's `Unreleased` convention is the only structure offered and is rarely used by the product pages.
10. **None write a correction as a correction.** Keep a Changelog permits rewriting an entry quietly. For a page whose promise is honesty, a correction should be visible rather than invisible.

## Concrete rules this project should adopt

1. Newest first, always. The newest dated section sits directly beneath the page introduction, and no entry ever breaks the order.
2. One date format everywhere: `YYYY-MM-DD`. No month names on the page, no abbreviations, no year-less dates.
3. The date heading is the section heading and nothing else, for example `### 2026-09-22`. No version numbers appear anywhere on the page.
4. Every entry sits under one of four fixed group words, in this order when more than one applies: `New`, `Changed`, `Fixed`, `Removed`. The same four words are used forever and no fifth word is invented.
5. A group heading appears on a day only if that day has at least one entry under it.
6. Every entry opens with a bold headline of 12 words or fewer that states what changed for the reader, not what changed in the code.
7. An entry headline is a full statement with a subject and a verb. Never a noun phrase on its own.
8. After the headline, the body is one to three sentences. If it needs a fourth, the entry is linking out rather than explaining.
9. Nothing technical appears without its plain meaning in the same sentence. No unexplained abbreviation, no jargon, no word a beginner would have to look up.
10. Never use an internal word on the page: canon, ADR, ledger, placeholder, lint, refactor, build, deploy, commit, pull request, hook, token. State the reader-facing effect instead.
11. Name where the change lands: the page, stage, chapter, or menu item, with a link on first mention.
12. State the reader it concerns when it is not everyone, in plain words, for example a change that only affects readers of Stage 0.
13. State what the reader should do, when anything is needed, in one short sentence. If nothing is needed, say nothing about it.
14. Tense: past tense for what shipped ("replaced", "added"), present tense only for the state now ("the page now says"). Never future tense for work already done.
15. No word "sorry". A withdrawal is stated plainly: what was there, that it is gone, and what to read instead.
16. Removals and withdrawals appear under `Removed`, in plain words, naming what a reader loses and what replaces it.
17. Nothing is described as working today unless it is live today. Planned work appears only as a "not yet" sentence inside the entry about the thing it belongs to.
18. The page introduction is two to four sentences at the top and answers: what this page is, who writes it, that it lists only changes a reader would notice, how often it updates, and what is deliberately left out. It is written in the second person.
19. One date heading per day. Several changes on the same day go under that one heading; the date is never repeated.
20. Length: an entry (headline plus body) fits in three or four lines on a phone, and stays under about 60 words unless it links out.
21. Links: at most three per entry, each pointing at the thing the entry is about (a page, a chapter, an FAQ answer). Never link a file, a commit, or a line of code.
22. Punctuation: no em-dash and no en-dash anywhere on the page. Use a full stop, a comma, or a colon.
23. Every entry reads on its own and never depends on the entry above it.
24. No tags, labels, categories or filters beyond the four group words. The page stays a plain list under a plain introduction.
25. Each date heading is linkable, and every anchor that exists today keeps working.
26. A true past entry is never deleted and never quietly rewritten. A correction is a new entry under `Changed` that says what was wrong before.
27. Final check before publishing: read one entry aloud and remove any word that a person who has never programmed could not explain back in their own words.
