# The gate

Loaded at SKILL.md step 7, when you actually run it.

## What the gate is, and what it deliberately is not

Two commands, from `edu-site/`:

```bash
node scripts/check-chapter.mjs --chapter docs/<path>
npm run build
```

Both exit 0, or the chapter is not `text-ready`. Drop `--chapter` to check every shipped chapter at once.

**Nothing in this gate asks you to make or rebuild a picture.** Images are the project owner's, generated externally and referenced as ordinary markdown images. The gate checks that a referenced image exists and that its alt text is real prose — nothing more.

**The gate does not police length.** There is no word band and no target reading time — chapter length is judged per topic, as the material needs. What the gate does instead is make length *visible and attributed*: it prints the measured word count and reading time, and it fails only when `scope_reason` is missing or generic. The number is reported; the **reason** is enforced. That's the whole design, and softening it in either direction — adding a band, or dropping the reason — breaks it.

**The gate skips `placeholder` chapters, and says so by name.** It prints a "Not checked" list precisely so a clean run on an unflipped chapter cannot look like proof. Read that list. If your chapter is on it, you flipped nothing and checked nothing.

## Reading a failure

| Code | What it means | What to actually do |
|---|---|---|
| `fm-missing` | A required frontmatter key is absent or empty | Add it. `sidebar_label`, `sidebar_position`, `title`, `description`, `chapter_state` are all required |
| `state-invalid` | `chapter_state` isn't one of the three | `placeholder` \| `text-ready` \| `video-published` |
| `video-url-missing` | Claims `video-published` with no URL | Either add the URL or drop back to `text-ready` |
| `scope-multiplier-missing` | No declared scope | Assign one against `contracts/calibration.md`'s anchor at 1.0 |
| `scope-reason-missing` | Length was chosen but not justified | One clause about *this* topic. Not optional |
| `scope-reason-generic` | The reason records no judgment | "Reference scope", "standard chapter", "as needed" are not reasons. Say what about this topic sets its size |
| `unregistered-component` | A component in the body that isn't registered | Only `Callout` and `StageBanner` are available. Anything else fails the build — remove it or express it in prose |
| `unknown-frontmatter-key` | A frontmatter key outside the chapter contract | Delete it |
| `image-missing` | The chapter points at an image file that does not exist | **Remove the reference.** A chapter ships with the images it actually has — never a placeholder pointing at a picture nobody has made. If the chapter needs one, name the gap in your report and let the owner supply it |
| `alt-missing` / `alt-junk` / `alt-thin` | Alt text absent, meaningless, or too short to replace the picture | Write what the image actually shows, structurally. "diagram" is not alt text. This is prose, so it is yours even though the picture is not |
| `safety-floor-form` | A safety callout that isn't the fixed form | Exactly `<Callout type="warning" title="Safety floor">`. Fixed so the check can prove it survived |
| `safety-floor-thin` | The callout body says nothing | A safety floor that fits in five words wasn't a safety floor |
| `h1-missing` / `h1-multiple` | Wrong number of `#` headings | The chapter title is the only h1; sections start at `##` |
| `heading-skip` | A level jumped, e.g. h2 → h4 | Screen readers navigate by this. Fix the level, don't delete the heading |

Warnings never fail the build, and are not therefore optional-by-default:

| Warning | Read it as |
|---|---|
| `voice-tell` | A phrase `canon/voice.md` bans outright. Rewrite it. It's a warning only because a quotation may legitimately contain one |
| `stat-unattributed` | A percentage or multiplier with no source or study named in its paragraph or the one before. In a book staking its credibility on real numbers, this is usually a real finding |
| `safety-floor-absent` | Most chapters carry one. Confirm the absence is deliberate rather than forgotten |
| `keywords-missing` | They feed the search index |
| `h1-title-mismatch` | The visible heading disagrees with frontmatter `title`. Usually one of them is stale |
| `code-width` | Over 80 characters — wraps or scrolls on a phone |

## The rules that make the gate mean something

**Flip `chapter_state` to `text-ready` before running, not after.** The gate skips `placeholder`. Checking an unflipped chapter checks nothing. This briefly marks an unfinished chapter live in the frontmatter sense — that's the correct trade against the alternative, which is a check that inspects nothing and reports success.

**If you can't reach a clean pass in the same sitting, set it back to `placeholder`.** `text-ready` means *passes the gate*, not *someone flipped it*. A chapter left flipped on the strength of "it's basically done" is how an unchecked chapter ends up counted as shipped.

**Never soften a check to make it pass.** A `scope-reason-generic` failure gets a real reason, not a longer generic one. An `image-missing` failure gets the reference removed, not a hastily-made picture. If a check seems genuinely wrong for a chapter, that's an argument to change the check deliberately — in its own change, with a stated reason — not to route around it once.

**Paste the real output when presenting.** Not a summary, not "the gate passed." The output is the evidence, and summarising it is how an unread failure becomes a shipped one.
