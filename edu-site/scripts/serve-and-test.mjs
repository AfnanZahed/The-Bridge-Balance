#!/usr/bin/env node
/**
 * serve-and-test.mjs
 *
 * Orchestrator that runs the full perf + a11y audit locally.
 *
 *   1. Boots `docusaurus serve` against ./build on port 4173.
 *   2. Polls the homepage until it returns HTTP 200.
 *   3. Runs Lighthouse (4 category scores) → lighthouse-report.json.
 *   4. Runs axe-core via Playwright → axe-report.json.
 *   5. Prints a single combined table + verdict.
 *   6. Tears down the server on exit (success or failure).
 *
 * Used by:
 *   - `npm run test:audit` (local one-shot)
 *   - the GitHub Actions `audit` job
 *
 * Threshold targets (must match lighthouse.mjs):
 *   performance      >= 90
 *   accessibility    >= 95
 *   best-practices   >= 95
 *   seo              >= 95
 *
 * axe gate: zero violations at impact = "serious" | "critical".
 *
 * Why `docusaurus serve` (not `npx http-server`)?
 *   - The site is already wired for it (no extra devDep).
 *   - It serves /build with the same mime defaults and baseUrl that prod uses.
 *   - `--no-open` is auto-set in CI, so it never tries to spawn a browser.
 *   - On Windows it works without `python` or `serve` being on PATH.
 */

import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = 4173;
const HOST = "127.0.0.1";
const URL = `http://${HOST}:${PORT}`;
const STARTUP_TIMEOUT_MS = 45_000;
const POLL_INTERVAL_MS = 500;

const TARGETS = {
  performance: 90,
  accessibility: 95,
  "best-practices": 95,
  seo: 95,
};

const log = (msg) => process.stdout.write(`[audit] ${msg}\n`);
const warn = (msg) => process.stdout.write(`[audit] [WARN] ${msg}\n`);
const err = (msg) => process.stderr.write(`[audit] [ERROR] ${msg}\n`);

/**
 * @param {string} url
 * @param {number} timeoutMs
 */
async function waitForServer(url, timeoutMs) {
  const start = Date.now();
  let lastErr;
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { redirect: "manual" });
      // 2xx and 3xx both mean the server is up; Docusaurus may serve a
      // 200 directly or a 301 to the configured baseUrl.
      if (res.status >= 200 && res.status < 400) return;
      lastErr = new Error(`status ${res.status}`);
    } catch (e) {
      lastErr = e;
    }
    await sleep(POLL_INTERVAL_MS);
  }
  throw new Error(
    `server did not become ready at ${url} within ${timeoutMs}ms: ${
      lastErr?.message ?? "unknown"
    }`,
  );
}

/**
 * @param {string} cwd
 */
function startServer(cwd) {
  const child = spawn(
    "npx",
    [
      "docusaurus",
      "serve",
      "--dir",
      "build",
      "-p",
      String(PORT),
      "-h",
      HOST,
      "--no-open",
      "--config",
      "docusaurus.config.ts",
    ],
    { cwd, stdio: ["ignore", "pipe", "pipe"], env: process.env },
  );

  child.stdout.on("data", (d) =>
    process.stdout.write(`[serve] ${d.toString()}`),
  );
  child.stderr.on("data", (d) =>
    process.stderr.write(`[serve] ${d.toString()}`),
  );

  return child;
}

/** @param {import('child_process').ChildProcess} child */
function killServer(child) {
  if (!child || child.killed) return;
  try {
    if (process.platform === "win32") {
      // Best-effort: SIGTERM is enough on Windows for npx tree in CI.
      child.kill("SIGTERM");
    } else {
      child.kill("SIGTERM");
    }
  } catch {
    // ignore — process may already be dead
  }
}

/**
 * @param {string} scriptPath  relative to cwd
 * @returns {Promise<{ code: number, stdout: string, stderr: string }>}
 */
function runChild(cwd, cmd, args) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, {
      cwd,
      stdio: ["ignore", "pipe", "pipe"],
      env: process.env,
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (d) => {
      const s = d.toString();
      stdout += s;
      process.stdout.write(`[child] ${s}`);
    });
    child.stderr.on("data", (d) => {
      const s = d.toString();
      stderr += s;
      process.stderr.write(`[child] ${s}`);
    });
    child.on("error", (e) => {
      stderr += `\nspawn error: ${e.message}`;
      resolve({ code: 1, stdout, stderr });
    });
    child.on("close", (code) => resolve({ code: code ?? 1, stdout, stderr }));
  });
}

/**
 * @param {Record<string, number>} scores
 */
function scoreVerdict(scores) {
  const rows = [
    ["Category", "Score", "Target", "Verdict"],
    ...Object.entries(TARGETS).map(([k, target]) => {
      const score = scores[k] ?? 0;
      return [
        k,
        String(score),
        `>= ${target}`,
        score >= target ? "PASS" : "FAIL",
      ];
    }),
  ];
  const widths = rows[0].map((_, i) =>
    Math.max(...rows.map((r) => String(r[i] ?? "").length)),
  );
  return rows
    .map((r, i) =>
      i === 1
        ? r.map((c, j) => String(c).padEnd(widths[j])).join("  ") +
          "\n" +
          widths.map((w) => "-".repeat(w)).join("  ")
        : r.map((c, j) => String(c).padEnd(widths[j])).join("  "),
    )
    .join("\n");
}

/**
 * Try to read the lighthouse-report.json that lighthouse.mjs writes.
 * Falls back to running a one-shot lighthouse CLI if absent (defensive —
 * in normal flow lighthouse.mjs writes it).
 */
async function readLighthouseScores() {
  const { readFile } = await import("node:fs/promises");
  try {
    const raw = await readFile(
      path.resolve(process.cwd(), "lighthouse-report.json"),
      "utf8",
    );
    const json = JSON.parse(raw);
    const cats = json.categories ?? {};
    const scores = {};
    for (const key of Object.keys(TARGETS)) {
      scores[key] = cats[key] ? Math.round((cats[key].score ?? 0) * 100) : 0;
    }
    return scores;
  } catch (e) {
    warn(`could not read lighthouse-report.json (${e.message})`);
    return null;
  }
}

/**
 * @param {string} url
 */
async function runLighthouse(url) {
  return runChild(process.cwd(), "node", ["scripts/lighthouse.mjs", url]);
}

/**
 * @param {string} url
 */
async function runAxe(url) {
  return runChild(process.cwd(), "node", ["scripts/axe.mjs", url]);
}

async function main() {
  const cwd = process.cwd();
  log(`cwd: ${cwd}`);
  log(`port: ${PORT}`);
  log(
    `targets: ${Object.entries(TARGETS)
      .map(([k, v]) => `${k}>=${v}`)
      .join(", ")}`,
  );

  // Sanity: build/ must exist.
  try {
    const { stat } = await import("node:fs/promises");
    await stat(path.resolve(cwd, "build", "index.html"));
  } catch {
    err(`build/index.html not found in ${cwd} — run \`npm run build\` first`);
    process.exit(2);
  }

  const server = startServer(cwd);

  // Always clean up the server, even on early throw.
  const cleanup = () => killServer(server);
  process.on("exit", cleanup);
  process.on("SIGINT", () => {
    cleanup();
    process.exit(130);
  });
  process.on("SIGTERM", () => {
    cleanup();
    process.exit(143);
  });

  try {
    log("waiting for server to be ready…");
    await waitForServer(URL, STARTUP_TIMEOUT_MS);
    log(`server up at ${URL}`);

    log("step 1/2: lighthouse");
    const lh = await runLighthouse(URL);
    if (lh.code !== 0) {
      err(`lighthouse exited with code ${lh.code}`);
      process.exitCode = 1;
    }

    log("step 2/2: axe");
    const axe = await runAxe(URL);
    if (axe.code !== 0) {
      err(`axe exited with code ${axe.code}`);
      process.exitCode = 1;
    }

    const scores = await readLighthouseScores();
    log("\n--- Lighthouse verdict ---");
    if (scores) {
      log(scoreVerdict(scores));
      const failing = Object.entries(TARGETS)
        .filter(([k, t]) => (scores[k] ?? 0) < t)
        .map(([k]) => k);
      if (failing.length) {
        err(`scores below target: ${failing.join(", ")}`);
        process.exitCode = 1;
      }
    } else {
      warn("lighthouse scores unavailable");
      process.exitCode = 1;
    }

    // Persist a small verdict record for the GH Actions artifact.
    await writeFile(
      path.resolve(cwd, "audit-summary.json"),
      JSON.stringify(
        {
          url: URL,
          timestamp: new Date().toISOString(),
          targets: TARGETS,
          scores: scores ?? {},
          axeGate: axe.code === 0 ? "PASS" : "FAIL",
          lighthouseGate: lh.code === 0 ? "PASS" : "FAIL",
        },
        null,
        2,
      ),
    );
  } catch (e) {
    err(`audit failed: ${e.stack || e.message}`);
    process.exitCode = 1;
  } finally {
    cleanup();
  }

  // Give the OS a moment to release the port before exiting.
  await sleep(150);
}

main();
