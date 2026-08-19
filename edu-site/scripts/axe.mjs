#!/usr/bin/env node

/**
 * axe-core + Playwright runner.
 *
 * Spins up headless Chromium, opens the served build (defaults to
 * http://localhost:4173), injects axe-core, runs the full WCAG 2.1 A/AA rule
 * set, and prints violations grouped by impact.
 *
 * Used by:
 *   - `npm run test:a11y` (local)
 *   - the GitHub Actions `audit` job (CI)
 *
 * Exit codes:
 *   0  No serious or critical violations.
 *   1  One or more serious / critical violations, OR axe-core / Playwright
 *      failed to run.
 *
 * Why serious + critical?
 *   - serious   → blocks use of the page for some users; must fix.
 *   - critical  → completely blocks access; must fix.
 *   - moderate  → fix soon but doesn't block the build.
 *   - minor     → informational; surfaced but not a gate.
 *
 * Browser: Chromium only (the textbook targets evergreen Chromium-class
 * browsers; we don't need Firefox/WebKit matrix for an a11y smoke gate).
 */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright-core";

const DEFAULT_URL = "http://localhost:4173";
const REPORT_PATH = path.resolve(process.cwd(), "axe-report.json");
const GATE_IMPACTS = new Set(["serious", "critical"]);

function log(level, msg) {
  const tag = { info: "INFO", warn: "WARN", error: "ERROR" }[level] ?? "INFO";
  process.stdout.write(`[axe] [${tag}] ${msg}\n`);
}

/** @param {import('axe-core').AxeResults} results */
function summarize(results) {
  const byImpact = { minor: 0, moderate: 0, serious: 0, critical: 0 };
  /** @type {Record<string, any[]>} */
  const grouped = { minor: [], moderate: [], serious: [], critical: [] };

  for (const v of results.violations) {
    const impact = v.impact || "minor";
    byImpact[impact] = (byImpact[impact] ?? 0) + 1;
    grouped[impact] = grouped[impact] || [];
    grouped[impact].push({
      id: v.id,
      help: v.help,
      helpUrl: v.helpUrl,
      nodes: v.nodes.length,
      sample: v.nodes.slice(0, 2).map((n) => ({
        target: n.target,
        failureSummary: n.failureSummary,
      })),
    });
  }

  return { byImpact, grouped };
}

function printSummary({ byImpact, grouped }) {
  const total = Object.values(byImpact).reduce((a, b) => a + b, 0);
  if (total === 0) {
    process.stdout.write("\naxe: 0 violations across all impact levels\n\n");
    return;
  }

  const rows = [
    ["Impact", "Count", "Gate"],
    ["critical", String(byImpact.critical ?? 0), "FAIL"],
    ["serious", String(byImpact.serious ?? 0), "FAIL"],
    ["moderate", String(byImpact.moderate ?? 0), "warn"],
    ["minor", String(byImpact.minor ?? 0), "info"],
  ];

  const widths = rows[0].map((_, i) =>
    Math.max(...rows.map((r) => String(r[i] ?? "").length)),
  );
  const fmt = (row) =>
    row.map((c, i) => String(c ?? "").padEnd(widths[i])).join("  ");
  process.stdout.write(
    `\n${[fmt(rows[0]), ...rows.slice(1).map(fmt)].join("\n")}\n\n`,
  );

  for (const impact of ["critical", "serious", "moderate", "minor"]) {
    const items = grouped[impact] ?? [];
    if (!items.length) continue;
    process.stdout.write(`-- ${impact} (${items.length}) --\n`);
    for (const item of items) {
      process.stdout.write(
        `  [${item.id}] ${item.help} (${item.nodes} node(s))\n`,
      );
      for (const s of item.sample) {
        const tgt = Array.isArray(s.target)
          ? s.target.join(" ")
          : String(s.target);
        process.stdout.write(`    ${tgt}\n`);
        if (s.failureSummary) {
          for (const line of String(s.failureSummary).split("\n").slice(0, 3)) {
            process.stdout.write(`      ${line.trim()}\n`);
          }
        }
      }
    }
    process.stdout.write("\n");
  }
}

async function main() {
  const url = process.argv[2] || DEFAULT_URL;
  log("info", `target: ${url}`);
  log("info", `gate: ${[...GATE_IMPACTS].join(" + ")} violations must be zero`);

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });

  let exitCode = 0;
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });

    // Inject axe-core from disk (it's already a devDep).
    const axeSource = await readFile(
      path.resolve(process.cwd(), "node_modules/axe-core/axe.min.js"),
      "utf8",
    );
    await page.addScriptTag({ content: axeSource });

    /** @type {import('axe-core').AxeResults} */
    // @ts-expect-error - axe is injected into the page, not bundled here.
    const results = await page.evaluate(async () => {
      // @ts-expect-error
      const r = await window.axe.run(document, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
        },
        resultTypes: ["violations"],
      });
      return r;
    });

    await writeFile(REPORT_PATH, JSON.stringify(results, null, 2));
    log("info", `full report written to ${REPORT_PATH}`);

    const summary = summarize(results);
    printSummary(summary);

    const blocking = GATE_IMPACTS.reduce(
      (n, k) => n + (summary.byImpact[k] ?? 0),
      0,
    );
    if (blocking > 0) {
      log(
        "error",
        `${blocking} blocking violation(s) at impact(s): ${[...GATE_IMPACTS]
          .filter((k) => (summary.byImpact[k] ?? 0) > 0)
          .join(", ")}`,
      );
      exitCode = 1;
    } else {
      log("info", "no blocking axe violations");
    }

    await context.close();
  } catch (err) {
    log("error", err.stack || err.message);
    exitCode = 1;
  } finally {
    await browser.close();
  }

  process.exit(exitCode);
}

main();
