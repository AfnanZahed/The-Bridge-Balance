# Authoring rebuild — what got installed, and what it does now

## What is actually installed

```
Book/
├── curriculum-state/        the book's shared memory
│   ├── canon/               thesis · audience · voice · integrity-floor
│   ├── contracts/           calibration
│   └── ledgers/             concept · evidence · example · prerequisite-graph
└── edu-site/scripts/
    ├── check-frontmatter.mjs    required frontmatter keys, every doc
    ├── check-references.mjs     every path these documents name must exist
    └── check-chapter.mjs        the chapter gate
```

## `curriculum-state/` — the book's memory

Every authoring skill reads it before drafting and writes to it before
finishing. Without it, a book with no fixed chapter count — chapters and their
scope are decided per topic, at authoring time, and change as understanding
changes — has no way to stay one coherent book instead of a stack of unrelated
essays: a later chapter redefines "spec" from scratch, opens on the Replit
incident for the eighth time, or spends an example an earlier chapter already
used.

## The gate

```bash
cd edu-site

# check one chapter
node scripts/check-chapter.mjs --chapter docs/intro-1-binary-to-programming.md

# check every text-ready chapter
node scripts/check-chapter.mjs

# it also runs inside the build, as check:chapter
npm run build
```

Exit 0 means no errors. Exit 1 means at least one. Warnings never fail the run.

Chapters whose `chapter_state` is not `text-ready` are skipped — but **the run
lists them by name**, so a green result can never be mistaken for proof about a
chapter it never opened.

## What it checks

| Check | Level |
|---|---|
| Frontmatter completeness, valid `chapter_state`, `video_url` when published | error |
| `scope_multiplier` present, and `scope_reason` present and not generic | error |
| Unregistered MDX components, or unknown frontmatter keys | error |
| An image reference pointing at a file that does not exist | error |
| Alt text missing, junk, or too thin to replace the picture | error |
| Safety-floor callout not in the exact fixed form, or empty | error |
| Heading hierarchy — one `h1`, no skipped levels | error |
| Voice tells from `canon/voice.md` | warning |
| A percentage or multiplier with no source named nearby | warning |
| Safety floor absent where one was expected | warning |
| `keywords` missing | warning |
| Code lines too wide for a phone | warning |

**It does not police length.** There is no word band and no target reading time.
It prints the measured word count and reading time, and enforces only that
`scope_reason` records why this topic is this size. That is deliberate — see
`curriculum-state/contracts/calibration.md`.

## Current state

No chapter is `text-ready` today. The intro sequence at the docs root is
entirely `placeholder` — `intro-1-binary-to-programming` through
`intro-5-spec-driven-engineering`, the last of which is still a raw merge of two
retired chapters awaiting its real authoring pass. The stage index pages are
`text-ready` but are not chapters. The `scope_multiplier` anchor is therefore
unset — see `curriculum-state/contracts/calibration.md`.

Everything else is a `placeholder` and is listed as such on every gate run.

Nothing blocks a new chapter from going `text-ready`. It passes the two commands
above, or it does not.
