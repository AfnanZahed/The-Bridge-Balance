/**
 * Authored-combination inference — reads canonical data-attributes from
 * the article DOM and applies the per-block atomic rule (R-002, ADR-0003).
 *
 * Per-block atomic rule:
 *   A combination (d, l) is authored iff a SINGLE block carries both
 *   `data-arc-difficulty` AND `data-arc-length` simultaneously, with the
 *   missing-axis defaulting to "intermediate" / "balanced".
 *
 * Cross-product tags from different blocks are NOT combined.
 *
 * Unmarked prose contributes one combination: Intermediate · Balanced.
 */

import type { Combination, Difficulty, Length } from "./types";
import { combinationKey } from "./types";

/**
 * Reads all `data-arc-block` elements within the article subtree and
 * returns the set of authored combinations along with a per-combination
 * count (used by the page-default selector).
 */
export interface AuthoredSet {
  combinations: Set<string>;
  counts: Map<string, number>;
}

const DEFAULT_DIFFICULTY: Difficulty = "intermediate";
const DEFAULT_LENGTH: Length = "balanced";

/**
 * Tokenize a data-attribute string into a typed subset of enums.
 * Returns an empty array if the attribute is absent; does not include
 * the default value — that's the caller's job.
 */
function parseDifficultyAttr(value: string | null): Difficulty[] {
  if (!value) return [];
  const tokens = value
    .split(/\s+/)
    .filter((t) => ["beginner", "intermediate", "advanced"].includes(t));
  return tokens as Difficulty[];
}

function parseLengthAttr(value: string | null): Length[] {
  if (!value) return [];
  const tokens = value
    .split(/\s+/)
    .filter((t) => ["summary", "balanced", "detailed"].includes(t));
  return tokens as Length[];
}

/**
 * Default-expand a set of axis values: an empty array means the default
 * for that axis. This implements the per-block atomic rule with single-axis
 * defaults to Intermediate / Balanced (R-002 alternative reading).
 */
function expandAxis<T extends string>(
  values: T[],
  defaultValue: T,
): T[] {
  return values.length === 0 ? [defaultValue] : values;
}

export function inferAuthoredCombinations(rootEl: HTMLElement | null): AuthoredSet {
  const combinations = new Set<string>();
  const counts = new Map<string, number>();

  // Unmarked prose contributes Intermediate · Balanced
  combinations.add(combinationKey(DEFAULT_DIFFICULTY, DEFAULT_LENGTH));
  counts.set(combinationKey(DEFAULT_DIFFICULTY, DEFAULT_LENGTH), 1);

  if (!rootEl) return { combinations, counts };

  const blocks = rootEl.querySelectorAll<HTMLElement>("[data-arc-block]");

  blocks.forEach((block) => {
    const rawDifficulty = block.getAttribute("data-arc-difficulty");
    const rawLength = block.getAttribute("data-arc-length");

    const difficultyTokens = expandAxis(
      parseDifficultyAttr(rawDifficulty),
      DEFAULT_DIFFICULTY,
    );
    const lengthTokens = expandAxis(
      parseLengthAttr(rawLength),
      DEFAULT_LENGTH,
    );

    // Per-block atomic: each (d, l) on this block is one authored combination.
    // Never combine tokens from different blocks.
    difficultyTokens.forEach((d) => {
      lengthTokens.forEach((l) => {
        const key = combinationKey(d, l);
        combinations.add(key);
        counts.set(key, (counts.get(key) ?? 0) + 1);
      });
    });
  });

  return { combinations, counts };
}

/**
 * Returns true if the given combination is authored on the page.
 */
export function isCombinationAuthored(
  set: AuthoredSet,
  combination: Combination,
): boolean {
  return set.combinations.has(combinationKey(combination.difficulty, combination.length));
}