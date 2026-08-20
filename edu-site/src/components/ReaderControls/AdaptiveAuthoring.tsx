/**
 * AdaptiveAuthoring — MDX authoring components for progressive disclosure.
 *
 * Authors wrap optional content with a tag to make it adaptive:
 *
 *     <Beginner>A simpler explanation.</Beginner>
 *     <Advanced>Deeper technical detail.</Advanced>
 *     <Summary>One-paragraph recap.</Summary>
 *     <Detailed>Expanded version with edge cases.</Detailed>
 *
 * Visibility model (per-block atomic, ADR-0003 / R-002):
 *   - A tag with ONLY a difficulty sets length default → Balanced.
 *   - A tag with ONLY a length sets difficulty default → Intermediate.
 *   - To tag ONE block on BOTH axes, use the canonical data-attribute form:
 *         <div data-arc-block
 *              data-arc-difficulty="beginner"
 *              data-arc-length="summary">…</div>
 *   - Nested tags are two independent blocks (each defaults the missing axis).
 *
 * Every block renders with canonical data-attributes (R-012) and, per the
 * no-JS contract (FR-016), a native <details><summary>Difficulty · Length —
 * expand</summary></details> so the content is reachable without JavaScript
 * and by crawlers. When JavaScript loads, ReaderControls drives visibility
 * by toggling `hidden` and `open`.
 */

import React from "react";

export type DifficultyValue = "beginner" | "intermediate" | "advanced";
export type LengthValue = "summary" | "balanced" | "detailed";

const DIFFICULTY_LABELS: Record<DifficultyValue, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};
const LENGTH_LABELS: Record<LengthValue, string> = {
  summary: "Summary",
  balanced: "Balanced",
  detailed: "Detailed",
};

const DEFAULT_DIFFICULTY: DifficultyValue = "intermediate";
const DEFAULT_LENGTH: LengthValue = "balanced";
const DIFFICULTIES: readonly DifficultyValue[] = ["beginner", "intermediate", "advanced"];
const LENGTHS: readonly LengthValue[] = ["summary", "balanced", "detailed"];

interface AdaptiveBlockProps {
  children?: React.ReactNode;
  id?: string;
}

export interface VersionProps extends AdaptiveBlockProps {
  difficulty: DifficultyValue;
  length: LengthValue;
}

export interface SharedProps extends AdaptiveBlockProps {
  label: string;
}

const ALL_DIFFICULTIES = "beginner intermediate advanced";
const ALL_LENGTHS = "summary balanced detailed";

function assertAxisValue<T extends string>(
  value: string,
  values: readonly T[],
  axis: string,
): asserts value is T {
  if (!values.includes(value as T)) {
    throw new Error(`Invalid ${axis} value: ${value}`);
  }
}

/** A difficulty-only OR length-only sized block emitting its own details. */
function Block({
  children,
  id,
  difficulty,
  length,
}: AdaptiveBlockProps & {
  difficulty?: DifficultyValue;
  length?: LengthValue;
}): React.ReactElement {
  // Per-block atomic: each block carries exactly one explicit axis; the other
  // defaults to Intermediate / Balanced. The <summary> reflects the full
  // combination so no-JS readers see the complete "Difficulty · Length — expand".
  const diff = difficulty ?? DEFAULT_DIFFICULTY;
  const len = length ?? DEFAULT_LENGTH;
  const summary = `${DIFFICULTY_LABELS[diff]} · ${LENGTH_LABELS[len]} — expand`;

  return (
    <details
      id={id}
      className="arc-block"
      data-arc-block
      data-arc-difficulty={difficulty ?? ""}
      data-arc-length={length ?? ""}
    >
      <summary>{summary}</summary>
      <div className="arc-block__content">{children}</div>
    </details>
  );
}

export function Beginner({ children, id }: AdaptiveBlockProps): React.ReactElement {
  return (
    <Block difficulty="beginner" id={id}>
      {children}
    </Block>
  );
}
export function Intermediate({ children, id }: AdaptiveBlockProps): React.ReactElement {
  return (
    <Block difficulty="intermediate" id={id}>
      {children}
    </Block>
  );
}
export function Advanced({ children, id }: AdaptiveBlockProps): React.ReactElement {
  return (
    <Block difficulty="advanced" id={id}>
      {children}
    </Block>
  );
}
export function Summary({ children, id }: AdaptiveBlockProps): React.ReactElement {
  return (
    <Block length="summary" id={id}>
      {children}
    </Block>
  );
}
export function Balanced({ children, id }: AdaptiveBlockProps): React.ReactElement {
  return (
    <Block length="balanced" id={id}>
      {children}
    </Block>
  );
}
export function Detailed({ children, id }: AdaptiveBlockProps): React.ReactElement {
  return (
    <Block length="detailed" id={id}>
      {children}
    </Block>
  );
}

/**
 * Version — author one COMPLETE reading version on both axes.
 *
 *     <Version difficulty="beginner" length="summary">…</Version>
 *
 * Use exactly once per (difficulty, length) pair in a fully migrated chapter.
 * Emits the canonical data-attributes and a both-axis <summary> so the no-JS
 * contract is preserved. Throws on an invalid axis value to catch author typos.
 */
export function Version({ children, id, difficulty, length }: VersionProps): React.ReactElement {
  assertAxisValue(difficulty, DIFFICULTIES, "difficulty");
  assertAxisValue(length, LENGTHS, "length");
  const summary = `${DIFFICULTY_LABELS[difficulty]} · ${LENGTH_LABELS[length]} — expand`;

  return (
    <details
      id={id}
      className="arc-block arc-version"
      data-arc-block
      data-arc-complete-version="true"
      data-arc-difficulty={difficulty}
      data-arc-length={length}
    >
      <summary>{summary}</summary>
      <div className="arc-block__content">{children}</div>
    </details>
  );
}

/**
 * Shared — a single clearly labelled section rendered once and visible across
 * ALL nine combinations. Used for fixed content that cannot responsibly vary
 * (code listings, formulas, canonical citations, required references).
 *
 * The all-axis data-attributes match every selected combination, so the
 * runtime never hides it. data-arc-shared="true" makes intent explicit for
 * tooling and inventory reports.
 */
export function Shared({ children, id, label }: SharedProps): React.ReactElement {
  return (
    <section
      id={id}
      className="arc-block arc-shared"
      data-arc-block
      data-arc-shared="true"
      data-arc-difficulty={ALL_DIFFICULTIES}
      data-arc-length={ALL_LENGTHS}
      aria-label={`${label} — shared reference`}
    >
      <header className="arc-shared__label">{label}</header>
      <div className="arc-block__content">{children}</div>
    </section>
  );
}