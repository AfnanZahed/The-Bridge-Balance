/**
 * Search engine for the curriculum.
 *
 * The corpus is a static index generated at build time by
 * `scripts/generate-search-index.mjs` and served from `/search-index.json`.
 * This module owns three things so the home Spotlight and the chapter
 * SearchBar cannot drift apart:
 *
 *   1. the record and hit shapes,
 *   2. the ranking (`score`) — moved here verbatim from the single-surface
 *      SearchBar it replaces, so search quality does not change,
 *   3. one lazy, module-cached loader — both surfaces share one fetch, and a
 *      failed fetch is retried on the next request.
 *
 * No external service, no new dependency.
 */

import { useCallback, useEffect, useRef, useState } from "react";

export type SearchRecord = {
  title: string;
  route: string;
  headings: string[];
  content: string;
  excerpt: string;
};

export type SearchHit = {
  record: SearchRecord;
  score: number;
  matchedHeading?: string;
  matchedSnippet?: string;
};

export const MIN_QUERY = 1;
export const DEBOUNCE_MS = 150;
export const RESULT_LIMIT = 8;

const INDEX_URL = "/search-index.json";

let indexPromise: Promise<SearchRecord[]> | null = null;

function loadIndex(): Promise<SearchRecord[]> {
  if (!indexPromise) {
    indexPromise = fetch(INDEX_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<SearchRecord[]>;
      })
      .catch((err) => {
        // Drop the cached rejection so a later call can retry.
        indexPromise = null;
        throw err;
      });
  }
  return indexPromise;
}

export type SearchIndexState = {
  records: SearchRecord[];
  loading: boolean;
  failed: boolean;
  /** Kick off the (shared) lazy load — call when a search surface opens. */
  ensureLoaded: () => void;
};

export function useSearchIndex(): SearchIndexState {
  const [records, setRecords] = useState<SearchRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const requested = useRef(false);

  const ensureLoaded = useCallback(() => {
    if (requested.current) return;
    requested.current = true;
    setLoading(true);
    loadIndex()
      .then((data) => setRecords(data))
      .catch((err) => {
        console.warn("Search: failed to load /search-index.json", err);
        setFailed(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return { records, loading, failed, ensureLoaded };
}

export function score(record: SearchRecord, query: string): SearchHit | null {
  const q = query.toLowerCase();
  if (!q) return null;

  let score = 0;
  let matchedHeading: string | undefined;
  let matchedSnippet: string | undefined;

  const titleLower = record.title.toLowerCase();
  if (titleLower === q) score += 1000;
  else if (titleLower.startsWith(q)) score += 500;
  else if (titleLower.includes(q)) score += 250;

  for (const heading of record.headings) {
    const headingLower = heading.toLowerCase();
    if (headingLower === q) {
      score += 200;
      matchedHeading = heading;
      break;
    }
    if (headingLower.includes(q)) {
      score += 80;
      matchedHeading ??= heading;
    }
  }

  const contentLower = record.content.toLowerCase();
  const contentIdx = contentLower.indexOf(q);
  if (contentIdx >= 0) {
    score += 20;
    const start = Math.max(0, contentIdx - 40);
    const end = Math.min(record.content.length, contentIdx + q.length + 80);
    matchedSnippet = record.content.slice(start, end).trim();
    if (start > 0) matchedSnippet = `…${matchedSnippet}`;
    if (end < record.content.length) matchedSnippet += "…";
  }

  return score > 0 ? { record, score, matchedHeading, matchedSnippet } : null;
}

/** Ranked, limited hits for one query. */
export function rank(
  records: SearchRecord[],
  query: string,
  limit = RESULT_LIMIT,
): SearchHit[] {
  const q = query.trim();
  if (q.length < MIN_QUERY) return [];

  const hits: SearchHit[] = [];
  for (const record of records) {
    const hit = score(record, q);
    if (hit) hits.push(hit);
  }
  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, limit);
}

/** Debounced ranking — the shared query pipeline for both surfaces. */
export function useRankedResults(
  query: string,
  records: SearchRecord[],
): SearchHit[] {
  const [hits, setHits] = useState<SearchHit[]>([]);

  useEffect(() => {
    const q = query.trim();
    if (q.length < MIN_QUERY) {
      setHits([]);
      return;
    }
    const id = setTimeout(() => setHits(rank(records, q)), DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [query, records]);

  return hits;
}

/** One-line description for a result row: matched heading, else the excerpt. */
export function describeHit(hit: SearchHit): string {
  if (hit.matchedHeading) return hit.matchedHeading;
  const text = hit.record.excerpt;
  return text.length > 96 ? `${text.slice(0, 93).trimEnd()}…` : text;
}
