/**
 * Persistence layer for Adaptive Reader Controls.
 * Key: tbb.readerControls.v1 (versioned for future migrations).
 * v1 = validation-only fallback; no migration table until v2 exists.
 */

import type { ReaderControlPreference, Difficulty, Length } from "./types";

export const STORAGE_KEY = "tbb.readerControls.v1";

export const DEFAULT_PREFERENCE: ReaderControlPreference = {
  version: 1,
  difficulty: "intermediate",
  length: "balanced",
};

const VALID_DIFFICULTIES: Difficulty[] = ["beginner", "intermediate", "advanced"];
const VALID_LENGTHS: Length[] = ["summary", "balanced", "detailed"];

function isValidDifficulty(value: unknown): value is Difficulty {
  return VALID_DIFFICULTIES.includes(value as Difficulty);
}

function isValidLength(value: unknown): value is Length {
  return VALID_LENGTHS.includes(value as Length);
}

function isValidPreference(obj: unknown): obj is ReaderControlPreference {
  if (!obj || typeof obj !== "object") return false;
  const pref = obj as Record<string, unknown>;
  return (
    pref.version === 1 &&
    isValidDifficulty(pref.difficulty) &&
    isValidLength(pref.length)
  );
}

/**
 * Loads the stored reader preference from localStorage.
 * Returns the default preference if storage is unavailable, empty, malformed,
 * wrong version, or contains invalid enum values.
 * Does not throw; silent fallback is intentional for a free-tier, no-block experience.
 */
export function loadPreference(): ReaderControlPreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_PREFERENCE;

    const parsed = JSON.parse(stored);
    if (isValidPreference(parsed)) {
      return parsed;
    }

    // Invalid shape/version/enums -> fallback and overwrite with valid default
    savePreference(DEFAULT_PREFERENCE);
    return DEFAULT_PREFERENCE;
  } catch {
    // localStorage unavailable (private mode, quota, blocked) -> in-memory default
    return DEFAULT_PREFERENCE;
  }
}

/**
 * Saves the reader preference to localStorage.
 * Never throws; if storage is blocked or quota exceeded, it fails silently.
 * The in-memory state in the card component remains the source of truth for the current session.
 */
export function savePreference(pref: ReaderControlPreference): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pref));
  } catch {
    // Storage blocked/quota -> no-op; caller keeps in-memory state
  }
}

/**
 * Validates and migrates a stored preference.
 * v1 has no previous version to migrate from; this exists as the migration seam
 * for a future v2. Currently returns the validated input or default.
 */
export function validateAndMigrate(stored: unknown): ReaderControlPreference {
  if (isValidPreference(stored)) {
    return stored;
  }
  // Unrecognised/malformed/missing -> default
  return DEFAULT_PREFERENCE;
}