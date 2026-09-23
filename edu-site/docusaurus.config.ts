import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "The Bridge Balance",
  tagline: "Spec-Driven AI Agent Engineering for Students",
  favicon: "img/favicon.svg",

  // The live deploy target, as of 2026-09-16: the free Vercel subdomain that
  // the placeholder described below this comment's previous draft. It is no
  // longer a placeholder, because this value drives canonical URLs, the
  // sitemap and og:url — all of which must name a domain that actually serves
  // the site. Deployed and verified the same day
  // (history/prompts/general/0095-vercel-deploy.general.prompt.md).
  //
  // Still NOT locked (owner, 2026-09-14 and again 2026-09-16): the real domain
  // may yet become thebridgebalance.com/.ai/.app, or thebridgebalance.vercel.app
  // — note the live subdomain is hyphenated, and the previous draft of this
  // comment guessed the un-hyphenated form. Swapping this one line is the whole
  // migration; nothing else in the repo hardcodes a domain. Same spirit as D5's
  // no-fixed-count rule, applied to the domain instead of the chapter count.
  url: "https://the-bridge-balance.vercel.app",
  baseUrl: "/",

  organizationName: "the-bridge-balance",
  projectName: "the-bridge-balance",

  onBrokenLinks: "throw",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  stylesheets: [
    // Inter (body/UI and every heading level) + Instrument Serif (in-prose
    // italic emphasis + display accents) + Geist Mono (code, ordinals). One
    // request on the critical path; nothing is self-hosted.
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&family=Geist+Mono:wght@400;500;600&display=swap",
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/",
        },
        blog: false,
        theme: {
          customCss: [
            "./src/css/radix.css",
            "./src/css/openprops.css",
            "./src/css/custom.css",
            "./src/css/a11y.css",
          ],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // No default social-share image. The previous og-image.svg was stale
    // (named "Four stages" — the curriculum has three, Stage 0 included) and
    // was deleted rather than patched: per CLAUDE.md, Claude Code writes
    // text, not images — a real replacement is the owner's, made in ChatGPT
    // or MiniMax. Until one exists, pages simply carry no social-card image
    // rather than a wrong one.
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        // Let a reader collapse the panel for full-width reading.
        hideable: true,
        // Accordion behaviour is off on purpose: stages are meant to be
        // comparable side by side.
        autoCollapseCategories: false,
      },
    },
    navbar: {
      title: "The Bridge Balance",
      logo: {
        alt: "The Bridge Balance",
        src: "img/logo.svg",
        srcDark: "img/logo.svg",
        width: 32,
        height: 32,
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "mainSidebar",
          position: "left",
          label: "Curriculum",
        },
        {
          type: "search",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Curriculum",
          items: [
            { label: "Stage 0 — Introduction to SDE", to: "/intro-1-binary-to-programming" },
            { label: "Stage 1 — SDE Mastery (AI-Driven)", to: "/stage-01-sde-mastery-ai-driven/" },
            { label: "Stage 2 — SDE Mastery (AI-Native)", to: "/stage-02-sde-mastery-ai-native/" },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} The Bridge Balance. 100% free, forever.`,
    },
    prism: {
      // Light mode — the muted counterpart to the dark palette below, and a
      // replacement for prism's stock `github` theme. Two reasons it could not
      // stay as it was:
      //
      //   1. Ground. Stock github paints code on #f6f8fa — a *blue-tinted*
      //      gray, in a design system whose whole point is a neutral silver
      //      ramp (see custom.css's header). Code blocks are the single most
      //      common non-prose element in the book (38 fences across the docs),
      //      so that tint was the most-seen colour in the reading column. The
      //      ground here is silver-2, the same step `--tbb-code-bg` resolves
      //      to, so inline code and block code finally sit on one surface.
      //
      //   2. Contrast. 23 of the 29 stock github tokens failed WCAG AA 4.5:1
      //      *on github's own background* — teal #36acaa at 2.58, blue
      //      #00a4db at 2.69, comments #999988 at 2.71. Every token below was
      //      measured against #dfe1e4 and clears 4.5:1; the tightest is the
      //      italic comment at 4.64.
      //
      // The hues mirror the dark palette's intent rather than inventing a
      // second scheme: blue for keywords, muted green for values, rose for the
      // deleted/inserted pair. Deliberately desaturated — this is a reading
      // surface for beginners, not a colour-coded IDE.
      theme: {
        plain: {
          color: "#191b1e",
          backgroundColor: "#dfe1e4",
        },
        styles: [
          { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "#5b636e", fontStyle: "italic" } },
          { types: ["punctuation", "namespace"], style: { color: "#454b54" } },
          { types: ["tag", "operator", "keyword", "atrule", "selector"], style: { color: "#2a5c96" } },
          { types: ["string", "attr-value", "entity", "url"], style: { color: "#3d4753" } },
          { types: ["function", "class-name", "function-variable"], style: { color: "#1f4a75" } },
          { types: ["number", "boolean", "constant", "symbol"], style: { color: "#1f5f42" } },
          { types: ["attr-name", "regex", "important", "variable"], style: { color: "#7a3b43" } },
          { types: ["property"], style: { color: "#33506d" } },
          { types: ["deleted"], style: { color: "#a03240" } },
          { types: ["inserted"], style: { color: "#1f5f42" } },
        ],
      },
      // Apple Pro dark mode — monochrome token palette over a graphite
      // surface, replacing dracula's saturated purple/red/cyan. All values
      // are AA-legible on the dark code-block background.
      darkTheme: {
        plain: {
          color: "#e6ebf2",
          backgroundColor: "#161618",
        },
        styles: [
          { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "#7a8599", fontStyle: "italic" } },
          { types: ["punctuation"], style: { color: "#9aa5b5" } },
          { types: ["tag", "operator", "keyword"], style: { color: "#6aa8ff" } },
          { types: ["string", "attr-value"], style: { color: "#c2c8d4" } },
          { types: ["function", "class-name", "function-variable"], style: { color: "#8ec5ff" } },
          { types: ["number", "boolean", "constant", "symbol"], style: { color: "#7ed4a8" } },
          { types: ["attr-name", "regex", "important", "variable"], style: { color: "#d4a8a8" } },
          { types: ["property", "tag"], style: { color: "#a8c5e8" } },
          { types: ["deleted"], style: { color: "#cf6679" } },
          { types: ["inserted"], style: { color: "#7ed4a8" } },
        ],
      },
      additionalLanguages: ["python", "typescript", "bash", "json", "sql"],
    },
    algolia: undefined,
  } satisfies Preset.ThemeConfig,
};

export default config;
