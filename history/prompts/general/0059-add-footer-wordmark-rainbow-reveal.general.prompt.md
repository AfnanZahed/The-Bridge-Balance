---
id: 0059
title: Add Aceternity footer wordmark with a rainbow hover reveal
stage: general
date: 2026-09-11
surface: agent
model: unknown (this harness did not report a model id; recorded rather than guessed)
feature: none
branch: none (no version control in this project)
user: afnanzahed@gmail.com
command: none (freeform chat — "add this at the very end of the site" + pasted component)
labels: ["platform", "footer", "aceternity", "design-system-exception", "svg-geometry", "verified-in-browser"]
links:
  spec: null
  ticket: null
  adr: null (recommended, not created — see Next prompts)
  pr: null
files:
  - edu-site/src/components/Aceternity/TextHoverEffect.tsx (new — adapted Aceternity TextHoverEffect + FooterBackgroundGradient)
  - edu-site/src/theme/Footer/Layout/index.tsx (new — ejected from @docusaurus/theme-classic 3.7.x; adds the showcase band inside <footer>)
  - edu-site/src/css/custom.css (new "Footer wordmark showcase" + "TextHoverEffect" sections, inserted before the Doc pagination block)
tests:
  - npm run typecheck -> clean
  - npx biome check on both new files -> clean (2 import-order fixes applied; the repo's 65 pre-existing lint errors in scripts/ and other components are untouched and not mine)
  - npm run build -> all five gates + Docusaurus build green (run three times, once after each source change)
  - Headless Chromium render check -> text run 820.57 units inside a 920-unit viewBox (99 units headroom); reveal mask tracked 30% -> 75% with the pointer; 5 gradient stops mounted on hover; outline opacity 0.7 on hover; showcase present on a docs route; zero console errors
  - Dash-pattern control -> a 60-unit dasharray visibly fragments the outline, proving the property is live; the shipped 1000-unit value renders solid, so the 4s draw completes without gaps
  - Pixel diff (dashed vs undashed) -> 120 of 523,600 pixels differ, scattered rather than in runs
  - axe-core WCAG 2.1 A/AA (homepage + intro-1) -> zero violations attributable to this component; one pre-existing serious `aria-prohibited-attr` on .tbb-hero__eyebrow (homepage hero, untouched here)
  - Visual review -> light, dark, hover, 390px mobile, and prefers-reduced-motion renders
---

## Prompt

"add this at the very end of the site: "use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#80eeb4" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-[#3ca2fa] font-[helvetica] text-7xl font-bold 
        dark:stroke-[#3ca2fa99]"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  );
};


export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #0F0F1166 50%, #3ca2fa33 100%)",
      }}
    />
  );
};"

## Response snapshot

**The paste is Next.js-shaped and this site is Docusaurus.** It carried `"use client"`, `cn` from `@/lib/utils`, and fifteen Tailwind utilities. None of those exist here — shadcn's `cn` has no alias in `edu-site/tsconfig.json`, and Tailwind is on `stack.md`'s do-not-add list ("Docusaurus uses Infima; fighting the framework loses"). The repo already has a house pattern for exactly this: three Aceternity components under `src/components/Aceternity/`, each re-homed to `tbb-`-prefixed CSS classes and design tokens. This was adapted the same way, against `clsx` (already a dependency) and `motion/react` (already a dependency at ^11.18.2).

**One design conflict was surfaced rather than decided.** The hover reveal is a five-hue rainbow (#eab308 → #ef4444 → #80eeb4 → #06b6d4 → #8b5cf6) plus a #3ca2fa stroke. Constitution Principle VII and ADR-0003 permit exactly one hue (`--tbb-accent`, a steel blue) on a narrow, enumerated list of surfaces, and the footer text effect is not on that list. I framed the choice with its trade-off and the owner chose the literal rainbow — knowingly, as the one place on the site that carries more than one hue. Recorded in the component header and at the top of the CSS block so a later reader finds the intent rather than a puzzle.

**Three real geometry defects, each found by measuring rather than reasoning.** A scratch harness rendered the paste's own SVG in headless Chromium and read `getBBox()` back:

1. **`viewBox="0 0 300 100"` cannot hold a wordmark.** The paste's own demo text, "ACETERNITY", measures 460.7 user units — 54% wider than the box it is drawn in, so SVG clips it. "THE BRIDGE BALANCE" measures 820.6 units. A 300-unit viewBox would have rendered a wordmark cut off at both ends. Shipped at 920 units, which leaves 99 units of headroom.
2. **Widening the viewBox thins the stroke in direct proportion.** Stroke weight is in user units, so the paste's `strokeWidth="0.3"` rendered as a 0.36px hairline at 920 units — and the gradient layer, which exists only as a stroke, all but vanished. The first verification pass caught this: the wordmark drew, the rainbow did not. Now derived as `(0.3 * viewBoxWidth) / 300`, so ink weight holds if the box changes again.
3. **The reveal torch silently inflated.** `r="20%"` on a `userSpaceOnUse` gradient resolves against the viewport diagonal. Against the paste's 300x100 box that is a ~45-unit spotlight — 0.87x the cap height, a local reveal. Against our 920-unit box the identical percentage becomes a ~131-unit wash tinting four letters at once. Pinned to upstream's absolute size and re-expressed as a percentage: 6.83%, measuring 45 units against upstream's 44.7.

**Two colour-mode branches in the paste are wrong for this site.** The footer is configured `style: "dark"`, so its ground is near-black in *both* colour modes (verified: `rgb(1,1,1)` under both). That inverts the intent of both `dark:` variants — `dark:stroke-neutral-800` would have painted a near-black outline on a near-black ground, and `dark:stroke-[#3ca2fa99]` would have dimmed the draw stroke to 60% alpha, which is not legible at a 0.3-unit weight. The resting outline reads `--tbb-silver-2` instead, and the draw stroke full-strength `#3ca2fa`.

**Structural changes, all deliberate.** `"use client"` dropped (a Next.js directive, inert in Docusaurus). `automatic?: boolean` dropped — declared in the paste's prop type, never read. SVG ids namespaced through `useId().replace(/:/g, "")`, matching `BrandMark`, because the paste's ids are global and would collide on a second instance. The paste's two-pass cursor tracking (a `useEffect` keyed on `cursor` state, so two renders per pointer move) collapsed into one state write inside the handler, which also removes the stale-effect path. And `prefers-reduced-motion` is handled explicitly: `MotionConfig reducedMotion="user"` in `Root.tsx` collapses transform and layout animation only, *not* `strokeDashoffset`, so the 4s draw would have run regardless under the site's own reduced-motion promise.

**The dash animation was checked rather than assumed.** `strokeDasharray: 1000` is sized for a 300-unit box and our glyph run is 820 units wide, so the pattern could plausibly have left gaps in the finished outline. A control render at a 60-unit dasharray fragments the outline, proving the property is live; at 1000 it renders solid, and a pixel diff against an undashed render differs by 120 of 523,600 pixels, scattered rather than in runs. Left as pasted.

**Placement required ejecting, not wrapping.** Upstream's `FooterLayout` has no `children` slot, and the band had to render *inside* `<footer>` to share its ground and layer the gradient behind the type — a swizzle-wrap would have appended it after `</footer>`. `src/theme/Footer/Layout/index.tsx` is a copy of the 3.7.x source with the one addition; everything above the band is upstream unchanged. Follows the convention of the existing ejections (`DocSidebar*`, `Navbar*`), including the `import type { Props } from "@theme/Footer/Layout"` self-reference.

**Scope note.** Implemented directly rather than through `/sp.specify → plan → tasks`. This was a single decorative component, specified down to the code by the owner. The one part that is genuinely spec-shaped is the design-system exception, which is what the ADR suggestion is for.

## Second pass — "is more beautiful than the one you have built"

The owner rejected the first result against the original, and was right. Comparing the two renders side by side gave a diagnosis that the source could not: I had built the *inverse* of the effect.

| | glyph cap height | rendered stroke | stroke ÷ cap |
|---|---|---|---|
| Upstream demo | 165px | 0.96px | 0.0058 |
| My first version | 62px | 1.1px | 0.0178 |

Small letters wearing fat strokes, where upstream is enormous letters wearing hairlines. Two causes, both mine:

1. **The viewBox fix traded away the scale.** Sizing a 880-unit box to the wordmark so nothing clips also meant the whole mark shrank — the letters ended up barely half the height the effect is built around. Upstream is at 165px because its 300-unit viewBox crops the overspill: it renders into a box *narrower* than its text and lets the edges fall off. A full wordmark can't crop, so the only lever left is the band width — the mark is now full-bleed, which took 62px → 81px at 1440 and 147px at 2560.
2. **The stroke was derived from the wrong quantity.** I had scaled it by `viewBoxWidth / 300`, which preserves stroke-to-*box* and therefore thickens the line as the box (but not the type) grows. It should track the type size. Upstream's own ratio is 0.0042 of the font; held exactly it renders ~0.4px here and the gradient layer washes out, so it sits at 0.007 — still a hairline, still legible. The two fixes compound: bigger letters make the thinner line viable.

**Geometry moved out of the stylesheet.** The viewBox, type size and stroke weight are one coupled system; the type size was living in `custom.css` while the other two sat in the component, which is precisely how the stroke came to be scaled against the wrong thing. `fontSize` is now a prop, applied as an attribute, and the CSS carries presentation only (family, weight, casing, colour). The reasoning is recorded at both sites.

**A mobile floor was added after measuring.** At 390px the mark is only ~330px wide, which scaled the hairline to 0.19px — drawn, but invisible on glass. `stroke-width` is a presentation attribute, so a `max-width: 768px` rule overrides it back up to 1.6 user units, landing the rendered line between 0.6px and 1.3px across the breakpoint. Desktop is untouched.

**One defect I chased and did not find.** Zoomed renders showed what looked like a doubled outline on the T and E. It is not a bug: all three text layers report an identical `getBBox()`, and the "extra" line is just the silhouette contour of an outlined bold glyph — the stem's two edges plus the bar's. Worth recording so the next person does not re-open it.

**Re-verified after the revision:** text fits at every width (821 units of an 880-unit box); 81px glyphs / 0.8px stroke at 1440; 147px / 1.45px at 2560; 19px / 0.6px at 390; reduced-motion still lands on the finished frame within 150ms; axe still reports nothing from this component.

## Outcome

- ✅ Impact: every page now ends with a full-bleed wordmark — 81px caps at 1440, 147px at 2560 — drawing itself in once on mount and revealing the approved rainbow under the cursor. Sits inside the footer band on the homepage and on docs routes alike.
- 🧪 Tests: typecheck clean; both new files biome-clean; `npm run build` green four times; browser-verified geometry, cursor tracking, gradient mounting, reduced-motion and mobile at 390/1440/2560; axe reports nothing attributable to the component.
- 📁 Files: 2 created, 1 section added to `custom.css`. No config, no dependency, no chapter touched — `motion` and `clsx` were already present, so the free-tier and do-not-add lists are both untouched.
- 🔁 Next prompts: (1) **an ADR is warranted** — this is a deliberate, owner-approved exception to Principle VII's single-accent rule and ADR-0003's enumerated scope, and it should not live only in a code comment; (2) the pre-existing `aria-prohibited-attr` on `.tbb-hero__eyebrow` is still failing the homepage axe gate; (3) the repo's 65 pre-existing biome errors are untouched and `npm run lint` still exits 1; (4) if the wordmark is ever swapped for a longer string, `viewBoxWidth` must grow with it.
- 🧠 Reflection: the first version was accepted by every check I had written and rejected by the only one that mattered — the owner looking at it beside the original. Measuring had made me confident about the wrong axis: I had proven the mark *fit*, and never asked whether it was *sized*. Both defects were the same mistake in different clothes — treating the viewBox as the thing to preserve rather than the type, so the box grew while the letters and their hairlines did not. The lesson is not "measure more", it is "check the result against the reference, not just against the requirements". The rainbow decision was the one thing I did not decide, because a ratified principle contradicted a direct instruction, and the owner is the only person who can resolve that.

## Evaluation notes (flywheel)

- Failure modes observed: (1) an upstream snippet's magic numbers are calibrated to its own demo geometry and silently change meaning when the geometry does — the viewBox, the stroke weight and the torch radius were all coupled and all three broke together; (2) a first verification pass can pass the wrong thing: the outline rendered fine while the rainbow was invisible, and only reading back the stroke width explained why; (3) a `dark:` branch is meaningless on a surface that is dark in both modes, and reads as correct until measured; (4) a canvas diff between two `file://` images is origin-tainted unless Chromium is launched with `--allow-file-access-from-files`; (5) writing the verification report through the repo's own `axe.mjs` would have overwritten a pre-existing `axe-report.json`, so a scratch runner was used to keep the diff to the three intended files; (6) **verified-ness is not the same as correctness** — every metric I checked on the first pass was green while the composition was wrong, because I had chosen metrics that could not see it; (7) a fix applied to make something *work* (fit the word) can quietly destroy why it looked *good* (the scale), so a fidelity fix to a visual component needs re-checking against the original, not only against the spec.
- Graders run and results (PASS/FAIL): typecheck PASS; biome (new files) PASS; full build PASS; axe (component-attributable) PASS; axe (reported gate) FAIL — pre-existing, homepage hero only; `npm run lint` FAIL — pre-existing, 65 errors, not introduced here.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): write the ADR for the multi-hue exception, so the next person to run a design-system audit finds a decision instead of a violation.
