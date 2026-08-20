/**
 * Adaptive Reader Controls — the two-axis reading preference card.
 *
 * Injected above every docs title through MDXComponents.tsx. The component
 * owns the reader preference, infers authored combinations from the article,
 * and hides/shows tagged blocks without navigation or network requests.
 */

import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  combinationKey,
  DIFFICULTIES,
  DIFFICULTY_LABELS,
  LENGTHS,
  LENGTH_LABELS,
  getCombinationDescription,
  type Combination,
  type Difficulty,
  type Length,
  type ReaderControlPreference,
} from "./types";
import { DEFAULT_PREFERENCE, loadPreference, savePreference } from "./persistence";
import { inferAuthoredCombinations, type AuthoredSet } from "./AuthoredCombinations";
import { selectPageDefault } from "./PageDefaultSelector";
import styles from "./ReaderControls.module.css";

function preferenceToCombination(pref: ReaderControlPreference): Combination {
  return { difficulty: pref.difficulty, length: pref.length };
}

function getArticleRoot(node: HTMLElement | null): HTMLElement | null {
  return node?.closest("article") ?? document.querySelector("article");
}

function applyVisibility(root: HTMLElement | null, effective: Combination): void {
  if (!root) return;
  root.querySelectorAll<HTMLElement>("[data-arc-block]").forEach((block) => {
    const difficultyRaw = block.dataset.arcDifficulty;
    const lengthRaw = block.dataset.arcLength;
    const difficulty = difficultyRaw ? difficultyRaw.split(/\s+/) : ["intermediate"];
    const length = lengthRaw ? lengthRaw.split(/\s+/) : ["balanced"];
    const visible = difficulty.includes(effective.difficulty) && length.includes(effective.length);
    block.toggleAttribute("hidden", !visible);
    block.dataset.arcVisible = String(visible);
    if (block.tagName === "DETAILS") {
      // Active version: open and shows its content directly (no dropdown).
      // Inactive versions: collapsed and hidden by the `hidden` attribute.
      // The active version's <summary> is suppressed via CSS (data-arc-visible).
      (block as HTMLDetailsElement).open = visible;
    }
  });
}

interface RadioPillProps {
  id: string;
  label: string;
  checked: boolean;
  unavailable: boolean;
  describedBy?: string;
  onSelect: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}

function RadioPill({
  id,
  label,
  checked,
  unavailable,
  describedBy,
  onSelect,
  onKeyDown,
}: RadioPillProps): React.ReactElement {
  return (
    <button
      id={id}
      type="button"
      className={`${styles.pill} ${checked ? styles.pillSelected : ""} ${unavailable ? styles.pillUnavailable : ""}`}
      role="radio"
      aria-checked={checked}
      aria-disabled={unavailable || undefined}
      aria-describedby={describedBy}
      tabIndex={0}
      onClick={() => {
        if (!unavailable) onSelect();
      }}
      onKeyDown={onKeyDown}
    >
      {label}
    </button>
  );
}

export default function ReaderControls(): React.ReactElement {
  const rootRef = useRef<HTMLElement | null>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [preference, setPreference] = useState<ReaderControlPreference>(DEFAULT_PREFERENCE);
  const [authored, setAuthored] = useState<AuthoredSet>({ combinations: new Set(), counts: new Map() });
  const [hydrated, setHydrated] = useState(false);
  const difficultyGroupId = useId();
  const lengthGroupId = useId();
  const tooltipId = useId();

  useEffect(() => {
    rootRef.current = getArticleRoot(anchorRef.current);
    if (rootRef.current) {
      // Prevents any collapsed <details> dropdowns from flashing before the
      // visibility rules apply: CSS hides version blocks only once this marker
      // is set (JS enabled). No-JS pages never set it, so native <details>
      // semantics stay intact.
      rootRef.current.dataset.arcHydrated = "true";
    }
    setAuthored(inferAuthoredCombinations(rootRef.current));
    setPreference(loadPreference());
    setHydrated(true);
  }, []);

  const requested = preferenceToCombination(preference);
  const requestedKey = combinationKey(requested.difficulty, requested.length);
  const available = authored.combinations.has(requestedKey);
  const pageDefault = useMemo(() => selectPageDefault(authored), [authored]);
  const effective = available ? requested : pageDefault;
  const effectiveKey = combinationKey(effective.difficulty, effective.length);

  useEffect(() => {
    applyVisibility(rootRef.current, effective);
  }, [effective.difficulty, effective.length, hydrated]);

  const chooseDifficulty = useCallback((difficulty: Difficulty) => {
    const next = { ...preference, difficulty };
    setPreference(next);
    savePreference(next);
  }, [preference]);

  const chooseLength = useCallback((length: Length) => {
    const next = { ...preference, length };
    setPreference(next);
    savePreference(next);
  }, [preference]);

  const reset = useCallback(() => {
    setPreference(DEFAULT_PREFERENCE);
    savePreference(DEFAULT_PREFERENCE);
  }, []);

  const combinationAvailable = (difficulty: Difficulty, length: Length): boolean =>
    authored.combinations.has(combinationKey(difficulty, length));

  // Description for the *current effective combination* — the cell the reader
  // is about to read. Surfaced as a tooltip-style note that updates live as
  // the reader rotates the controls (FR-011, SC-003) and reachable via
  // `aria-describedby` on the controls section (Q4 — popover with
  // `aria-describedby` equivalent).
  const descriptionId = useId();
  const effectiveDescription = getCombinationDescription(
    effective.difficulty,
    effective.length,
  );

  const handleGroupKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    axis: "difficulty" | "length",
    value: string,
  ) => {
    const values = axis === "difficulty" ? DIFFICULTIES : LENGTHS;
    const index = values.indexOf(value as never);
    let nextIndex = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % values.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + values.length) % values.length;
    if (nextIndex === index) {
      if (event.key === "Enter" || event.key === " ") event.preventDefault();
      return;
    }
    event.preventDefault();
    const nextValue = values[nextIndex];
    if (axis === "difficulty") chooseDifficulty(nextValue as Difficulty);
    else chooseLength(nextValue as Length);
    document.getElementById(`${axis}-${nextValue}`)?.focus();
  };

  const substitutionNote = available
    ? null
    : `Your selection (${DIFFICULTY_LABELS[requested.difficulty]} · ${LENGTH_LABELS[requested.length]}) isn't available on this page — showing ${DIFFICULTY_LABELS[effective.difficulty]} · ${LENGTH_LABELS[effective.length]}.`;

  return (
    <div ref={anchorRef} className={styles.anchor}>
      <section
        className={styles.card}
        aria-label="Adaptive reader controls"
        aria-describedby={descriptionId}
      >
        <div className={styles.headerRow}>
          <div>
            <p className={styles.eyebrow}>Adjust your reading</p>
            <p className={styles.modeLabel} aria-live="polite">
              {DIFFICULTY_LABELS[preference.difficulty]} · {LENGTH_LABELS[preference.length]}
            </p>
          </div>
          <button type="button" className={styles.reset} onClick={reset}>Reset</button>
        </div>

        <div className={styles.groups}>
          <div className={styles.group} role="radiogroup" aria-label="Difficulty" id={difficultyGroupId}>
            <span className={styles.groupLabel}>Difficulty</span>
            <div className={styles.pills}>
              {DIFFICULTIES.map((difficulty) => {
                const id = `difficulty-${difficulty}`;
                const unavailable = !combinationAvailable(difficulty, preference.length);
                return (
                  <React.Fragment key={difficulty}>
                    <RadioPill
                      id={id}
                      label={DIFFICULTY_LABELS[difficulty]}
                      checked={preference.difficulty === difficulty}
                      unavailable={unavailable}
                      describedBy={unavailable ? tooltipId : undefined}
                      onSelect={() => chooseDifficulty(difficulty)}
                      onKeyDown={(event) => handleGroupKeyDown(event, "difficulty", difficulty)}
                    />
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className={styles.group} role="radiogroup" aria-label="Length" id={lengthGroupId}>
            <span className={styles.groupLabel}>Length</span>
            <div className={styles.pills}>
              {LENGTHS.map((length) => {
                const id = `length-${length}`;
                const unavailable = !combinationAvailable(preference.difficulty, length);
                return (
                  <RadioPill
                    key={length}
                    id={id}
                    label={length === "summary" ? "Summary (Summary)" : LENGTH_LABELS[length]}
                    checked={preference.length === length}
                    unavailable={unavailable}
                    describedBy={unavailable ? tooltipId : undefined}
                    onSelect={() => chooseLength(length)}
                    onKeyDown={(event) => handleGroupKeyDown(event, "length", length)}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <p className={styles.cue}>Summary omits details — switch to Balanced or Detailed to see more.</p>
        {effectiveDescription ? (
          <p
            id={descriptionId}
            className={styles.combinationDescription}
            role="note"
            aria-live="polite"
            data-effective-combination={effectiveKey}
          >
            <span className={styles.descriptionLens}>
              {DIFFICULTY_LABELS[effective.difficulty]} · {LENGTH_LABELS[effective.length]}
              <span className={styles.descriptionDivider} aria-hidden="true"> · </span>
              {effectiveDescription.lens}
            </span>
            <span className={styles.descriptionUse}>{effectiveDescription.use}.</span>
            <span className={styles.descriptionChooseIf}>
              <strong>Choose this if:</strong> {effectiveDescription.chooseIf}
            </span>
          </p>
        ) : null}
        {substitutionNote ? <p className={styles.substitution} role="status">{substitutionNote}</p> : null}
        <span id={tooltipId} role="tooltip" className={styles.tooltip}>This mode is not available for this page</span>
        <span className={styles.effectiveState} data-effective-combination={effectiveKey} aria-hidden="true" />
      </section>
    </div>
  );
}
