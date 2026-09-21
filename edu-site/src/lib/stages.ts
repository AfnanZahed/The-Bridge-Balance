/**
 * The five curriculum stages — one list of labels and routes.
 *
 * The SiteMenu drawer renders from this list, and the home Spotlight's
 * shortcut circles do too. Two consumers, one source, so a renamed stage or a
 * moved route cannot drift between them.
 */

export type StageNumber = 0 | 1 | 2 | 3 | 4;

export type StageLink = {
  number: StageNumber;
  label: string;
  to: string;
};

export const STAGE_LINKS: StageLink[] = [
  {
    number: 0,
    label: "Stage 0 — Introduction to Computing",
    to: "/intro-1-binary-to-programming",
  },
  {
    number: 1,
    label: "Stage 1 — Foundations",
    to: "/stage-01-spec-aware-vibe-engineering/",
  },
  {
    number: 2,
    label: "Stage 2 — CS50 Certs",
    to: "/stage-02-cs50-certification/",
  },
  {
    number: 3,
    label: "Stage 3 — AI Coding Agents",
    to: "/stage-03-mastering-ai-coding-agents/",
  },
  {
    number: 4,
    label: "Stage 4 — Autonomous Agents",
    to: "/stage-04-engineering-autonomous-ai-agents/",
  },
];

/** Route → stage number, for choosing a stage glyph on a search result. */
export function stageNumberFromRoute(route: string): StageNumber | null {
  const match = route.match(/^\/stage-0([0-4])(?:\/|$)/);
  return match ? (Number(match[1]) as StageNumber) : null;
}
