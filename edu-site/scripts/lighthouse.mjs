#!/usr/bin/env node
/**
 * Lighthouse CI wrapper.
 *
 * Runs Lighthouse against a served Docusaurus build (defaults to
 * http://localhost:4173) and prints a summary table of the four target
 * categories. Used by:
 *   - `npm run test:perf` (local)
 *   - the GitHub Actions `audit` job (CI)
 *
 * Exit codes:
 *   0  All four category scores meet the threshold targets.
 *   1  Lighthouse failed to run OR at least one score is below target.
 *
 * The thresholds are intentionally identical to the constants declared in
 * `scripts/serve-and-test.mjs`. Keeping them in sync is the user's job; we
 * surface a clear log line at startup so the CI logs are self-describing.
 *
 * Flags worth knowing:
 *   --headless / --no-sandbox / --disable-gpu  → required inside containers
 *   --only-categories                          → trims the run to ~5s
 *   --output=json                              → machine-parseable score cards
 *
 * Reference: https://github.com/GoogleChrome/lighthouse#using-the-cli
 */

import { spawn } from "node:child_process";
import { readFile, unlink } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DEFAULT_URL = "http://localhost:4173";
const REPORT_PATH = path.resolve(process.cwd(), "lighthouse-report.json");

// Threshold targets — must match scripts/serve-and-test.mjs.
// Documented in docs/perf-targets.md.
const TARGETS = {
  performance: 90,
  accessibility: 95,
  "best-practices": 95,
  seo: 95,
};

const CATEGORY_KEYS = ["performance", "accessibility", "best-practices", "seo"];

function log(level, msg) {
  const tag = { info: "INFO", warn: "WARN", error: "ERROR" }[level] ?? "INFO";
  process.stdout.write(`[lighthouse] [${tag}] ${msg}\n`);
}

function formatTable(rows) {
  const widths = rows[0].map((_, i) =>
    Math.max(...rows.map((r) => String(r[i] ?? "").length)),
  );
  const fmt = (row) =>
    row.map((c, i) => String(c ?? "").padEnd(widths[i])).join("  ");
  const sep = widths.map((w) => "-".repeat(w)).join("  ");
  return [fmt(rows[0]), sep, ...rows.slice(1).map(fmt)].join("\n");
}

/**
 * Run Lighthouse and return the parsed JSON report.
 * @param {string} url
 * @param {{ extraFlags?: string[] }} [opts]
 */
function runLighthouse(url, opts = {}) {
  return new Promise((resolve, reject) => {
    const args = [
      url,
      "--output=json",
      `--output-path=${REPORT_PATH}`,
      "--only-categories=performance,accessibility,best-practices,seo",
      "--chrome-flags=--headless --no-sandbox --disable-gpu --disable-dev-shm-usage",
      "--quiet",
      ...(opts.extraFlags ?? []),
    ];

    log("info", `running: npx lighthouse ${args.join(" ")}`);
    const child = spawn("npx", ["lighthouse", ...args], {
      stdio: ["ignore", "pipe", "pipe"],
      env: process.env,
    });

    let stderr = "";
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.stdout.on("data", () => {
      // Lighthouse writes the report to --output-path; stdout is noisy progress.
    });

    child.on("error", (err) => reject(err));
    child.on("close", (code) => {
      if (code !== 0) {
        reject(
          new Error(
            `lighthouse exited with code ${code}\nstderr:\n${stderr.slice(
              -2000,
            )}`,
          ),
        );
        return;
      }
      resolve();
    });
  });
}

async function readReport() {
  try {
    const raw = await readFile(REPORT_PATH, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    throw new Error(
      `could not read lighthouse-report.json at ${REPORT_PATH}: ${err.message}`,
    );
  }
}

async function main() {
  const url = process.argv[2] || DEFAULT_URL;
  log("info", `target: ${url}`);
  log(
    "info",
    `targets: ${Object.entries(TARGETS)
      .map(([k, v]) => `${k}>=${v}`)
      .join(", ")}`,
  );

  // Clean stale report so we never read a previous run.
  await unlink(REPORT_PATH).catch(() => {});

  await runLighthouse(url);

  const report = await readReport();
  const cats = report.categories ?? {};
  const scores = {};
  for (const key of CATEGORY_KEYS) {
    scores[key] = cats[key] ? Math.round((cats[key].score ?? 0) * 100) : 0;
  }

  const rows = [
    ["Category", "Score", "Target", "Status"],
    ...CATEGORY_KEYS.map((key) => {
      const score = scores[key];
      const target = TARGETS[key];
      const pass = score >= target;
      return [key, String(score), `>= ${target}`, pass ? "PASS" : "FAIL"];
    }),
  ];

  process.stdout.write("\n");
  process.stdout.write(`${formatTable(rows)}\n\n`);

  const failing = CATEGORY_KEYS.filter((k) => scores[k] < TARGETS[k]);
  if (failing.length) {
    log("error", `below target: ${failing.join(", ")}`);
    process.exit(1);
  }

  log("info", `all categories meet targets; report at ${REPORT_PATH}`);
}

main().catch((err) => {
  log("error", err.stack || err.message);
  process.exit(1);
});
