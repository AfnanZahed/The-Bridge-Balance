/**
 * Type definitions for the Adaptive Reader Controls feature.
 */

export type Difficulty = "beginner" | "intermediate" | "advanced";
export type Length = "summary" | "balanced" | "detailed";

export interface ReaderControlPreference {
  version: 1;
  difficulty: Difficulty;
  length: Length;
}

export interface Combination {
  difficulty: Difficulty;
  length: Length;
}

export interface CombinationDescription {
  /** Unique teaching lens this combination delivers (from the lens registry). */
  lens: string;
  /** Concrete real-world use the reader can apply. */
  use: string;
  /** Plain-language prompt that helps a reader choose this combination. */
  chooseIf: string;
}

/**
 * Encoding key for a combination in a Set.
 * Uses `${difficulty}|${length}` for safe lookup and iteration.
 */
export function combinationKey(difficulty: Difficulty, length: Length): string {
  return `${difficulty}|${length}`;
}

export function isCombination(value: unknown): value is Combination {
  if (!value || typeof value !== "object") return false;
  const c = value as Record<string, unknown>;
  return (
    typeof c.difficulty === "string" &&
    typeof c.length === "string" &&
    ["beginner", "intermediate", "advanced"].includes(c.difficulty) &&
    ["summary", "balanced", "detailed"].includes(c.length)
  );
}

/**
 * Human-readable labels for the toggle pills.
 * Summary carries the user's requested bracketed cue (FR-005).
 */
export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export const LENGTH_LABELS: Record<Length, string> = {
  summary: "Summary",
  balanced: "Balanced",
  detailed: "Detailed",
};

export const DIFFICULTIES: Difficulty[] = ["beginner", "intermediate", "advanced"];
export const LENGTHS: Length[] = ["summary", "balanced", "detailed"];

/**
 * Per-combination descriptions surfaced to the reader. Authored from
 * specs/009-differentiated-intros/lens-registry.md so the controls
 * expose each version's lens, real-world use, and choosing guidance
 * (FR-011, SC-003). Values are intentionally short to honor the
 * Apple-Design restraint in Principle VII.
 */
export const COMBINATION_DESCRIPTIONS: Record<string, CombinationDescription> = {
  [combinationKey("beginner", "summary")]: {
    lens: "Safety rule",
    use: "Decide whether an AI change is safe to trust",
    chooseIf: "You want one rule you can apply before merging.",
  },
  [combinationKey("beginner", "balanced")]: {
    lens: "Everyday analogy",
    use: "Separate an assistant's work from an owner's responsibility",
    chooseIf: "A familiar story helps you learn best.",
  },
  [combinationKey("beginner", "detailed")]: {
    lens: "Boundary checklist",
    use: "Prepare a project before an agent can act",
    chooseIf: "You want a procedure for data, failure, and verification.",
  },
  [combinationKey("intermediate", "summary")]: {
    lens: "Decision framework",
    use: "Recognize the two bad extremes and choose a middle path",
    chooseIf: "You need the thesis in one working read.",
  },
  [combinationKey("intermediate", "balanced")]: {
    lens: "Responsibility map",
    use: "Assign human and AI work across the engineering loop",
    chooseIf: "You use AI daily and need to know what remains yours.",
  },
  [combinationKey("intermediate", "detailed")]: {
    lens: "Experiment → system",
    use: "Know when a prototype has acquired real consequences",
    chooseIf: "Your demo has users, money, secrets, or durable data.",
  },
  [combinationKey("advanced", "summary")]: {
    lens: "Strategic scarcity",
    use: "Invest in intent and verification when code is abundant",
    chooseIf: "You make team or product-level decisions.",
  },
  [combinationKey("advanced", "balanced")]: {
    lens: "Governance + trust boundaries",
    use: "Assess environment, authorization, data, and apprenticeship risks",
    chooseIf: "You lead security or architecture decisions.",
  },
  [combinationKey("advanced", "detailed")]: {
    lens: "Ownership architecture",
    use: "Govern RAG, tool calling, and multi-agent systems",
    chooseIf: "You design systems where many agents act but one owner remains accountable.",
  },
};

/**
 * Returns the description for a combination, or undefined if none is
 * registered (callers should treat that as a configuration gap).
 */
export function getCombinationDescription(
  difficulty: Difficulty,
  length: Length,
): CombinationDescription | undefined {
  return COMBINATION_DESCRIPTIONS[combinationKey(difficulty, length)];
}