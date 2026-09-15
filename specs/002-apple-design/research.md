# Research & Technical Decisions: Apple-Inspired Theme Transformation

**Feature Directory**: `002-apple-design`  
**Date**: 2026-08-17  
**Spec**: [./spec.md](./spec.md)

---

## Decisions Summary

| # | Decision | Chosen | Rationale | Alternatives Rejected |
|---|---|---|---|---|
| **R-001** | Stage Accents | Mute all to Apple-grade (teal, ochre, lilac, dusty rose) | Saturated cyan/amber/violet/pink break Apple calm; desaturated variants preserve stage identity without visual noise. (Q1) | (a) Keep saturated hexes — too harsh; (b) Single accent only — loses stage distinctiveness. |
| **R-002** | Primary Brand Accent | Apple-system blue (`#0071e3` light / `#0a84ff` dark) | One focused accent per surface (Principle VII). Blue is the canonical Apple action color for links, buttons, focus rings, and active states. (Q2) | (a) Keep bridge-cyan — clashes with muted stages; (b) All-neutral monochrome — lacks clear interactive affordance. |
| **R-003** | Motion Budget | Strip to static (remove Lenis, GSAP, R3F hero) | Reticent motion (Principle VII). WebGL 3D, smooth scroll, and scrubbed SVG spines add complexity, bundle weight, and potential layout jitter without proportional learning value. Framer Motion entrance reveals alone provide sufficient polish. (Q3) | (a) Keep all with reduced-motion gates — retains heavy runtime deps; (b) Keep Lenis + entrance reveals — smooth-scroll interferes with native scroll feel. |
| **R-004** | Type System | Keep stack, tune Apple-style (bolder display, tighter tracking, generous leading) | Inter (SF Pro stand-in), Instrument Serif (display accent), and Geist Mono (code) are already licensed and loaded. Increasing display weights to 700–800 and reserving serif for hero/quotes delivers the "ultra professional, bold, simple, attractive" voice without new font downloads. (Q4) | (a) Drop serif entirely — loses editorial identity; (b) New display serif — adds network request and bundle overhead. |
| **R-005** | Chart Palette | Single accent + neutrals (Apple-blue primary, grayscale secondary/tertiary) | Recharts dashboard uses Apple-system blue for the primary series and neutral gray steps for secondary elements. Stage identity is communicated via text labels, not four competing colors. (Q5) | (a) Muted categorical 4-color — visual noise; (b) Sequential blue scale — hard to distinguish adjacent shades. |
| **R-006** | Surface Layering & Blur | `backdrop-filter: blur(20px)` with solid token fallback | Floating translucent panels (`--tbb-surface-glass`) create depth without hard borders. `@supports not (backdrop-filter: blur())` ensures instant solid fallback for older browsers. | Hard 1px solid borders on every card — feels unrefined and un-Apple-like. |
| **R-007** | Focus & A11y | 2px solid Apple-blue focus ring with 2px offset (`:focus-visible`) | High-contrast, non-color-only keyboard navigation. Meets WCAG 2.1 AA requirement (SC-002). | Browser default focus ring — inconsistent across Chrome/Firefox/Safari. |

---

## Detailed Rationale

### R-001: Muted Apple-Grade Stage Accents

**Context**: Stage cards, chapter badges, and stage icons previously used saturated hex colors:
- Stage 1: Cyan `#06b6d4`
- Stage 2: Amber `#f59e0b`
- Stage 3: Violet `#a855f7`
- Stage 4: Pink `#ec4899`

**Selected Palette** (Radix Step 9/11 muted scales):
- Stage 1 (Foundations): Teal / Sage — `var(--teal-9, #12a594)` (light), `var(--teal-11, #00c7b7)` (dark)
- Stage 2 (CS50 Certs): Ochre / Warm Amber — `var(--amber-10, #d97706)` (light), `var(--amber-11, #f59e0b)` (dark)
- Stage 3 (AI Coding Agents): Lilac / Soft Indigo — `var(--indigo-9, #3e63dd)` (light), `var(--indigo-11, #849dff)` (dark)
- Stage 4 (Autonomous Agents): Dusty Rose / Plum — `var(--plum-9, #ab4aba)` (light), `var(--plum-11, #e796f3)` (dark)

**Application Rule**: These colors are applied *only* to categorical identity chips (the small number badge on StageCard, the StageIcon fill, and the ChapterState pill). Card surfaces, text, borders, and hover backgrounds remain strictly neutral.

---

### R-002: Apple-System Blue Primary Accent

**Context**: Principle VII mandates "one focused accent per surface."

**Selected Tokens**:
- `--tbb-accent`: `#0071e3` (light mode — Apple Store / macOS blue), `#0a84ff` (dark mode — Apple dark vibrant blue)
- `--tbb-accent-hover`: `#005bb5` (light), `#409cff` (dark)
- `--tbb-accent-subtle`: `rgba(0, 113, 227, 0.08)` (light), `rgba(10, 132, 255, 0.12)` (dark)
- `--tbb-focus-ring`: `0 0 0 3px rgba(0, 113, 227, 0.35)` (light), `0 0 0 3px rgba(10, 132, 255, 0.45)` (dark)

**Usage**: Links, primary buttons (`.tbb-hero__cta-primary`), active sidebar items, tab highlights, focus rings.

---

### R-003: Motion Strip-Down Architecture

**Context**: The site accumulated four overlapping motion layers:
1. `lenis` — smooth-scroll hijacking
2. `gsap` + `ScrollTrigger` — scroll-scrubbed spine overlay
3. `@react-three/fiber` + `@react-three/drei` + `@react-three/rapier` — 3D geometric bridge hero
4. `motion` (Framer Motion) — `RevealOnScroll` entrance animations

**Deprecation & Cleanup Plan**:
- **Remove from runtime**: Remove `Lenis` initialization from `src/theme/Root.tsx`. Remove `ScrollFX` wrapper and `gsap-register.ts`. Replace `Hero3D` with a static CSS hero panel.
- **Retain**: `RevealOnScroll` (Framer Motion), which already honors `prefers-reduced-motion` and adds subtle 0.4s fade-in-up without scroll-jacking.
- **CSS-native transitions**: Fast, subtle CSS transitions (`opacity 0.2s ease, transform 0.2s var(--op-ease-out)`) for hover states on cards and buttons.

---

### R-004: Typography Tuning

**Font Stack**:
```css
--ifm-font-family-base: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", system-ui, sans-serif;
--tbb-font-display: "Instrument Serif", Georgia, "Times New Roman", serif;
--ifm-font-family-monospace: "Geist Mono", SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

**Tuning Spec**:
- Hero headline: `font-size: clamp(2.5rem, 5.5vw, 4.25rem); font-weight: 700; letter-spacing: -0.035em; line-height: 1.08;`
- Section titles (`h2`): `font-size: clamp(1.75rem, 3.5vw, 2.5rem); font-weight: 700; letter-spacing: -0.025em; line-height: 1.15;`
- Card titles (`h3`): `font-size: 1.25rem; font-weight: 600; letter-spacing: -0.015em; line-height: 1.3;`
- Body prose: `font-size: 1.0625rem (17px); line-height: 1.68; letter-spacing: -0.011em;` (Apple HIG reading size)
- Eyebrow labels: `font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;`

---

### R-005: Single-Accent Recharts Dashboard

**Palette**:
- Primary series (chapters, hours): `var(--tbb-accent)` (`#0071e3` / `#0a84ff`)
- Grid lines: `var(--tbb-border-subtle)` (`rgba(0, 0, 0, 0.06)` light, `rgba(255, 255, 255, 0.08)` dark)
- Axis text: `var(--tbb-text-muted)`
- Tooltip background: `var(--tbb-surface-glass)` with `backdrop-filter: blur(16px)`
- Donut segments: monochromatic step through `var(--tbb-accent)` → `var(--gray-8)` → `var(--gray-7)` → `var(--gray-6)` with clear textual labels.
