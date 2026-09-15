/**
 * GatewayFlowCanvas — "gateway flow" trajectory accent for the hero.
 *
 * Clean-room Canvas2D port of the "Gateway Flow" visual: bezier paths sweep
 * in from both edges and converge on the hero's own center (not the
 * viewport's — this canvas is sized to the hero box). Ported from the
 * algorithm rather than embedded as a third-party iframe: the original
 * "canonical source" bundles an unrelated demo UI (mock login fields, three
 * externally-hosted avatar images) behind Tailwind's CDN script, which this
 * project's do-not-add list excludes and which the Lighthouse performance
 * gate (perf-targets.md) would penalize on every homepage load.
 *
 * Renders in both themes with a different palette each (near-black stage
 * reads white/silver; the near-white stage reads dark ink at much lower
 * opacity so it stays a texture, not noise) — see PALETTE below. Collapses
 * to one static frame under `prefers-reduced-motion`, and pauses the
 * animation loop when the tab is hidden or the hero scrolls out of view.
 */

import { useReducedMotion } from "motion/react";
import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";

interface Point {
  x: number;
  y: number;
}

interface FlowPath {
  isLeft: boolean;
  startY: number;
  t: number;
  speed: number;
}

function bezierPoint(
  t: number,
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
): Point {
  const u = 1 - t;
  return {
    x:
      u ** 3 * p0.x +
      3 * u ** 2 * t * p1.x +
      3 * u * t ** 2 * p2.x +
      t ** 3 * p3.x,
    y:
      u ** 3 * p0.y +
      3 * u ** 2 * t * p1.y +
      3 * u * t ** 2 * p2.y +
      t ** 3 * p3.y,
  };
}

// Matched opacities so neither stage reads weaker than the other — silver
// on the near-black stage, dark ink on the near-white one.
const PALETTE = {
  dark: { line: "rgba(255, 255, 255, 0.28)", dot: "rgba(255, 255, 255, 0.65)" },
  light: { line: "rgba(15, 23, 42, 0.32)", dot: "rgba(15, 23, 42, 0.7)" },
} as const;

// The source authored 80 paths against a full viewport. This canvas is
// sized to the hero box instead, which is smaller, so 80 reads as clutter
// below desktop widths — scale down at the same breakpoints custom.css uses.
function pathCountFor(width: number): number {
  if (width < 640) return 24;
  if (width < 996) return 40;
  return 64;
}

export default function GatewayFlowCanvas(): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let frameId = 0;
    let paths: FlowPath[] = [];
    let isDark = document.documentElement.getAttribute("data-theme") === "dark";

    function seedPaths() {
      const count = pathCountFor(width);
      paths = Array.from({ length: count }, (_, i) => ({
        isLeft: i % 2 === 0,
        startY: (i / count) * height * 1.4 - height * 0.2,
        t: Math.random(),
        speed: 0.0015 + Math.random() * 0.002,
      }));
    }

    function resize() {
      const parent = canvas.parentElement;
      const rect = parent
        ? parent.getBoundingClientRect()
        : canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedPaths();
    }

    function drawFrame(advance: boolean) {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const palette = isDark ? PALETTE.dark : PALETTE.light;

      for (const path of paths) {
        const p0: Point = { x: path.isLeft ? 0 : width, y: path.startY };
        const p1: Point = {
          x: path.isLeft ? centerX * 0.5 : width - centerX * 0.5,
          y: path.startY,
        };
        const p2: Point = {
          x: path.isLeft ? centerX * 0.8 : width - centerX * 0.8,
          y: centerY,
        };
        const p3: Point = { x: centerX, y: centerY };

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        ctx.strokeStyle = palette.line;
        ctx.lineWidth = 1;
        ctx.setLineDash([1, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        if (advance) {
          path.t += path.speed;
          if (path.t > 1) {
            path.t = 0;
            path.startY += (Math.random() - 0.5) * 10;
          }
        }
        const pos = bezierPoint(path.t, p0, p1, p2, p3);
        ctx.fillStyle = palette.dot;
        ctx.fillRect(pos.x - 1.5, pos.y - 1.5, 3, 3);
      }
    }

    function loop() {
      drawFrame(true);
      frameId = requestAnimationFrame(loop);
    }

    function stopLoop() {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = 0;
    }

    function startLoop() {
      stopLoop();
      if (shouldReduceMotion || document.visibilityState === "hidden") {
        drawFrame(false);
      } else {
        frameId = requestAnimationFrame(loop);
      }
    }

    resize();
    startLoop();
    canvas.dataset.active = "true";

    const onResize = () => {
      resize();
      drawFrame(false);
    };
    const onVisibility = () => startLoop();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    const themeObserver = new MutationObserver(() => {
      isDark = document.documentElement.getAttribute("data-theme") === "dark";
      drawFrame(false);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    let sectionObserver: IntersectionObserver | undefined;
    const section = canvas.closest("section");
    if (section && "IntersectionObserver" in window) {
      sectionObserver = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? startLoop() : stopLoop()),
        { threshold: 0 },
      );
      sectionObserver.observe(section);
    }

    return () => {
      stopLoop();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      themeObserver.disconnect();
      sectionObserver?.disconnect();
    };
  }, [shouldReduceMotion]);

  return (
    <canvas ref={canvasRef} className={styles.flowCanvas} aria-hidden="true" />
  );
}
