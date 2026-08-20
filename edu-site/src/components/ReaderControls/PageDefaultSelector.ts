/**
 * Page-default selector (FR-023, ADR-0003).
 *
 * When the reader's preferred combination is not authored on the current
 * page, the body renders the page-default combination: the combination
 * with the largest authored-block count, ties broken by:
 *   1. Difficulty: intermediate > beginner > advanced
 *   2. Length: balanced > summary > detailed
 *
 * If the page has no tagged blocks, the default is Intermediate · Balanced
 * (the unmarked-prose contribution).
 */

import type { Combination, Difficulty, Length } from "./types";
import { combinationKey } from "./types";
import type { AuthoredSet } from "./AuthoredCombinations";

const DIFFICULTY_PRIORITY: Difficulty[] = ["intermediate", "beginner", "advanced"];
const LENGTH_PRIORITY: Length[] = ["balanced", "summary", "detailed"];

export const DEFAULT_COMBINATION: Combination = {
  difficulty: "intermediate",
  length: "balanced",
};

export function selectPageDefault(authored: AuthoredSet): Combination {
  if (authored.combinations.size === 0) {
    return DEFAULT_COMBINATION;
  }

  // Find the combination(s) with the largest count.
  const sorted = Array.from(authored.counts.entries()).sort((a, b) => {
    // Primary: count descending
    if (b[1] !== a[1]) return b[1] - a[1];
    return 0;
  });

  const topCount = sorted[0][1];
  const topKeys = sorted.filter(([, count]) => count === topCount).map(([k]) => k);

  if (topKeys.length === 1) {
    return decodeCombinationKey(topKeys[0]);
  }

  // Tie-break: difficulty priority, then length priority
  for (const d of DIFFICULTY_PRIORITY) {
    for (const l of LENGTH_PRIORITY) {
      const key = combinationKey(d, l);
      if (topKeys.includes(key)) {
        return { difficulty: d, length: l };
      }
    }
  }

  return DEFAULT_COMBINATION;
}

function decodeCombinationKey(key: string): Combination {
  const [difficulty, length] = key.split("|") as [Difficulty, Length];
  return { difficulty, length };
}