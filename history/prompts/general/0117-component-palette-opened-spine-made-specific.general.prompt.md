---
id: 0117
title: Component palette opened, spine skill made book-specific
stage: general
date: 2026-09-20
surface: agent
model: claude-opus-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["platform", "components", "mdx", "adr-0004", "lesson-shapes", "corrections", "rule-provenance"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - curriculum-state/canon/corrections.md
 - curriculum-state/canon/thesis.md
 - curriculum-state/proposals/chapter-component-palette-2026-09-20.md
 - .claude/skills/lesson-spine-authoring/SKILL.md
 - CLAUDE.md
tests:
 - "npm run build - 9 chapters, 0 errors, 7 warnings, site compiled"
---

## Prompt

The owner answered the four explanations from PHR 0116 and asked where one of
the rules had come from, since they had never set it.

> Me: Yes, add them, maximum things and ideas i want, because I run my life on
> maximization policy, full stop means end of life. you add more and more and
> more things. also, how this rule came from: I'm only allowed two special
> things: a coloured box (Callout) and a stage banner. Everything else must be
> plain text, headings, bullets, tables, bold, links, images.?? because I didn't
> said this rule. allow the things you named like : tabs, collapsible sections,
> step cards, "try it" panels, key-takeaway boxes, comparison cards, timelines
> and be open for tooo many new ideas and innovation, innovation is the key to
> success, remember. we will, later, discuss these things and add them one by
> one (hopefully sing deepseek, because deepseek v4.1 flash is an intelligent
> tool, and these work are not highly complex, so it can hopefully manage).
>
> Me: Yes yes, Because I didn't planned to sell this skill, this skill is for my
> personal use, so make it the Bridge balance only. in this way, the
> documentation and rule managing and other file related things will also get
> easier. but this step MUST be highly carefull, becuase the skill is already
> big and you must avoid any conflicts or chaos in files or folders, ultra
> organization is required for this task.
>
> Me take: Complete lesson shape is going to be updated, I am not satisfied with
> the current 5 shapes. I will discuss this with you, and we will together plan
> and critically and creatively think about it.
>
> Me: this is actually #2 step. we will do this with the #2.

## Response snapshot

**The provenance question was answered with evidence, and the owner was right:
they never set that rule.** Traced through four layers:

1. A **build mechanic** - in Docusaurus an unregistered component fails the
   build. Framework behaviour, not policy.
2. **Only two components were ever built** (`Callout`, `StageBanner`), so "the
   registered set" meant those two by accident.
3. **2026-09-06**: the owner deleted the compiled-figure pipeline, rejecting
   Claude-generated imagery. **That decision was about images.**
4. It was then generalised into a cap on how a page may be built - written into
   `MDXComponents.tsx`'s own comment (*"the intended guard"*), then `CLAUDE.md`,
   then **Constitution Principle III**.

Recorded as `corrections.md` §21, and named there as the **third** instance of
one pattern: §3 (a design complaint written up as a content rule), §18 (a why
invented where the owner's was needed), and now a build constraint plus one
narrow image decision generalised into a permanent limit.

**Four decisions recorded.**

- **§21 - the palette is open and being widened.** What stays closed is Claude
  *drawing*; a component that lays out content is not one that generates
  imagery. Both research passes still apply per component. Candidate list
  written: `proposals/chapter-component-palette-2026-09-20.md`, 34 candidates in
  seven groups, with the accessibility constraint that collapsed content must
  stay searchable, and four open questions for the discussion.
- **§22 - `lesson-spine-authoring` becomes Bridge Balance-only**, reversing
  **ADR 0004**. The architectural point: ADR 0004 made the skill that writes
  every sentence deliberately generic, so this book's decisions were *forbidden*
  from living inside it - a standing reason owner rules kept losing to framework
  defaults, and a direct conflict with §17 item 3. The owner's caution about
  file organisation is written into the rule.
- **§23 - the five lesson shapes are provisional.** A warning block was placed
  directly above the shape table in the skill, so a drafter meets it before
  classifying anything.
- **The Source chip is folded into the palette work**, not a separate task;
  `thesis.md`'s implementation note now says so.

`CLAUDE.md` reworded in both tracks: the registry is described as open and
growing rather than as a two-component cap, with the no-drawing rule preserved
intact.

**Not started:** no component was built and no file was moved in the skill. The
owner said both happen in a later discussion, and §19 requires asking who builds
each batch first.

## Outcome

- Impact: a rule with no owner decision under it was found, traced, and
  reversed; three further decisions are now in canon rather than in chat.
- Tests: full build green, gate 0 errors.
- Files: 4 changed, 1 created.
- Next prompts: an ADR reversing 0004 before any file moves; the first component
  batch; the lesson-shape redesign session; the owner's per-topic why for names.
- Reflection: the owner asked "where did this rule come from" and the answer was
  four layers of write-up over one narrow decision. That question is worth
  asking of any rule that feels arbitrary - it found the second-largest
  constraint on the book's design in about five minutes.

## Evaluation notes (flywheel)

- Failure modes observed: three recorded instances now of a narrow owner
  decision being generalised into a broad standing rule, each time by writing it
  one layer further up than it was made. The generalisation is never flagged as
  an inference at the time.
- Graders run: the build. Green.
- Next experiment: when writing an owner decision into a rule file, record the
  scope they actually gave it in the same sentence, so a later reader can see
  where the inference starts.
