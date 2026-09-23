# Job 2 - site code for the four-stage structure

Repo: `C:\Users\Dell\Desktop\Book`, site root `edu-site`. Apply exactly the edits below and nothing else. Do NOT run any build, test or site command. Do NOT touch any file under `edu-site/docs/`. Do NOT touch `edu-site/src/data/chapterManifest.ts` or `edu-site/static/search-index.json` (both are generated).

## The rename map

| Old route | New route |
|---|---|
| `/stage-01-spec-aware-vibe-engineering/` | `/stage-01-sde-mastery-ai-driven/` |
| `/stage-02-cs50-certification/` | `/stage-02-credentials/` |
| `/stage-03-mastering-ai-coding-agents/` | `/stage-01-sde-mastery-ai-driven/` (old Stage 3 merged into Stage 1) |
| `/stage-04-engineering-autonomous-ai-agents/` | `/stage-03-sde-mastery-ai-native/` |

Full stage names: `Stage 0 — Introduction to SDE`, `Stage 1 — SDE Mastery (AI-Driven)`, `Stage 2 — Credentials`, `Stage 3 — SDE Mastery (AI-Native; Agentic AI)`. The em dash is U+2014, as already used in these files. There are now four stages; anything that says five is wrong.

## 1. `edu-site/sidebars.ts`

Replace the four stage categories (and the Stage 0 category label) so the `mainSidebar` array reads exactly this, in this order. For the `items` arrays, use the real basenames of the `.md` files that exist in each folder on disk (list the folders first), ordered as: `01-foundations`, `02-core-programming`, `03-frontend`, `04-backend`, `05-databases`, `06-git-github` (or those without numeric prefixes), then `prompt-engineering`, `context-engineering`, `claude-code`, `skills-and-mcp`. Do not invent an id for a file that does not exist.

```ts
    {
      type: "category",
      label: "Stage 0 — Introduction to SDE",
      collapsed: false,
      customProps: { icon: "start" },
      link: { type: "doc", id: "ch00-introduction" },
      items: [
        "ch00-introduction",
        "intro-1-binary-to-programming",
        "intro-2-architecture-map",
        "intro-3-editors-and-ides",
        "intro-4-terminals-and-cli-agents",
        "intro-5-spec-driven-engineering",
        "ch01-foundations",
        "ch02-programming-is-born",
      ],
    },
    {
      type: "category",
      label: "Stage 1 — SDE Mastery (AI-Driven)",
      collapsed: true,
      customProps: { stage: 1 },
      link: { type: "doc", id: "stage-01-sde-mastery-ai-driven/index" },
      items: [
        "stage-01-sde-mastery-ai-driven/<each file in that folder, in the order given above>",
      ],
    },
    {
      type: "category",
      label: "Stage 2 — Credentials",
      collapsed: true,
      customProps: { stage: 2 },
      link: { type: "doc", id: "stage-02-credentials/index" },
      items: [
        "stage-02-credentials/cs50p",
        "stage-02-credentials/cs50w",
      ],
    },
    {
      type: "category",
      label: "Stage 3 — SDE Mastery (AI-Native; Agentic AI)",
      collapsed: true,
      customProps: { stage: 3 },
      link: { type: "doc", id: "stage-03-sde-mastery-ai-native/index" },
      items: [
        "stage-03-sde-mastery-ai-native/<each file in that folder, in the order given above>",
      ],
    },
```

Leave the `welcome` entry and the `Reference` category exactly as they are.

## 2. `edu-site/src/lib/stages.ts`

Replace the type, the array and the regex so the file holds exactly this (keep the file's existing doc comment at the top, but change "The five curriculum stages" to "The four curriculum stages"):

```ts
export type StageNumber = 0 | 1 | 2 | 3;

export type StageLink = {
  number: StageNumber;
  label: string;
  to: string;
};

export const STAGE_LINKS: StageLink[] = [
  {
    number: 0,
    label: "Stage 0 — Introduction to SDE",
    to: "/intro-1-binary-to-programming",
  },
  {
    number: 1,
    label: "Stage 1 — SDE Mastery (AI-Driven)",
    to: "/stage-01-sde-mastery-ai-driven/",
  },
  {
    number: 2,
    label: "Stage 2 — Credentials",
    to: "/stage-02-credentials/",
  },
  {
    number: 3,
    label: "Stage 3 — SDE Mastery (AI-Native)",
    to: "/stage-03-sde-mastery-ai-native/",
  },
];
```

and the route matcher becomes `route.match(/^\/stage-0([0-3])(?:\/|$)/)`.

## 3. `edu-site/docusaurus.config.ts`

In `themeConfig.footer`, replace the five Curriculum items with exactly these four, in this order:

```ts
            { label: "Stage 0 — Introduction to SDE", to: "/intro-1-binary-to-programming" },
            { label: "Stage 1 — SDE Mastery (AI-Driven)", to: "/stage-01-sde-mastery-ai-driven/" },
            { label: "Stage 2 — Credentials", to: "/stage-02-credentials/" },
            { label: "Stage 3 — SDE Mastery (AI-Native; Agentic AI)", to: "/stage-03-sde-mastery-ai-native/" },
```

Change nothing else in that file.

## 4. `edu-site/src/pages/index.tsx`

(a) Replace the whole `const STAGES = [ ... ];` array with exactly:

```ts
const STAGES = [
  {
    number: "00",
    title: "Introduction to SDE",
    description:
      "The history of computing and software, read in the order it happened — binary through today's AI-coding-agent era — plus the Spec-Driven Engineering and Reading & Understanding Literacy philosophy the rest of the book depends on.",
    href: "/intro-1-binary-to-programming",
    accentColor: "var(--tbb-text)",
    accentLabel: "Ink",
  },
  {
    number: "01",
    title: "SDE Mastery (AI-Driven)",
    description:
      "Architecture, programming, frontend, backend, databases and Git, learned side by side with prompt, context and loop engineering, Claude Code, skills and MCP — the engineering and the agent growing together.",
    href: "/stage-01-sde-mastery-ai-driven/",
    accentColor: "var(--tbb-stage-1)",
    accentLabel: "Teal",
  },
  {
    number: "02",
    title: "Credentials",
    description:
      "Two Harvard certificates — CS50P (Python) and CS50W (web) — as internationally recognized proof of skill, paired with your GitHub portfolio.",
    href: "/stage-02-credentials/",
    accentColor: "var(--tbb-stage-2)",
    accentLabel: "Ochre",
  },
  {
    number: "03",
    title: "SDE Mastery (AI-Native; Agentic AI)",
    description:
      "RAG, tool calling, multi-agent systems, evaluations. Ship complete agentic systems with the OpenAI Agents SDK, Claude Agents SDK and LangGraph.",
    href: "/stage-03-sde-mastery-ai-native/",
    accentColor: "var(--tbb-stage-3)",
    accentLabel: "Lilac",
  },
];
```

(b) In the `FEATURE_PILLARS` comment above that array, change the phrase `the five stages` to `the four stages`. Change nothing else in the comment.

(c) Apply the rename map to every other stage route in the file (including any inline link further down). If a visible label names an old stage, replace the label with the new stage name that owns that route.

## 5. `edu-site/src/pages/404.tsx`

Apply the rename map to the stage route in this file.

## 6. `edu-site/src/components/HomepageHero/index.tsx`

Apply the rename map to the stage routes in this file. If a visible label or eyebrow names an old stage, replace it with the new stage name that now owns that route.

## 7. `edu-site/src/components/SiteMenu/SiteDrawer.tsx`

The comment mentioning `/stage-01-spec-aware-vibe-engineering/intro` becomes `/stage-01-sde-mastery-ai-driven/intro`.

## 8. Anything else in `edu-site/src`

Search the folder once for the four old routes and for the old stage names (`Spec-Aware Vibe`, `Credible Validation`, `Mastering AI Coding Agents`, `Engineering Autonomous AI Agents`, `five stages`). Fix any factual stage reference consistently with the rename map, and report every occurrence you found, changed or deliberately left.

## Final answer

For each file: the exact old lines and their replacements. Then: the file listings you used for the two `items` arrays, everything you found in section 8, and a statement that no other file was touched. Run no commands other than reading files and listing folders.
