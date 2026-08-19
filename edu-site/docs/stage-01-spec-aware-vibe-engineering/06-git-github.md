---
sidebar_label: "6. Git & GitHub"
sidebar_position: 7
title: "06 — Git & GitHub"
description: "Commits, branches, pull requests, repos, collaboration."
keywords: [git, github, branches, pull requests, collaboration]
chapter_state: "placeholder"
video_url: ""
---

# 06 — Git & GitHub

> **Core idea:** git is a journal. Branches are drafts. Pull requests are conversations.

## Lecture outline

<!-- Placeholder shell. Paste the lecture outline here. -->

- [ ] Commits: atomic, named, reviewable
- [ ] Branches: one feature, one branch
- [ ] Pull requests: the conversation, not the merge
- [ ] Repos: public vs private, monorepo vs polyrepo
- [ ] Collaboration: review, request changes, approve
- [ ] Recovery: reflog, revert, rebase (carefully)

## Lecture content

> _Awaiting video lecture._

```text
[Lecture transcript goes here.]
```

## Worked example

```bash
# A clean feature-branch flow
git checkout -b feat/lecture-01-foundations
# ... edit, then:
git add docs/stage-01-spec-aware-vibe-engineering/01-foundations.md
git commit -m "lecture(01-foundations): paste transcript and outline"
git push -u origin feat/lecture-01-foundations
# Open a PR. Wait for review. Merge.
```

## Check your understanding

1. Why is "one feature, one branch" better than committing straight to `main`?
2. What's the difference between `git revert` and `git reset`?
3. Open the PR list of any repo. Read one PR's review comments. What made it a good review?

## Further reading

- _To be added._
