/**
 * The four curriculum stages — one list of labels and routes.
 *
 * The SiteMenu drawer renders from this list, and the home Spotlight's
 * shortcut circles do too. Two consumers, one source, so a renamed stage or a
 * moved route cannot drift between them.
 */

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

/** Route → stage number, for choosing a stage glyph on a search result. */
export function stageNumberFromRoute(route: string): StageNumber | null {
  const match = route.match(/^\/stage-0([0-3])(?:\/|$)/);
  return match ? (Number(match[1]) as StageNumber) : null;
}
