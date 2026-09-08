import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "The Bridge Balance",
  tagline: "Spec-Driven AI Agent Engineering for Students",
  favicon: "img/favicon.svg",

  url: "https://thebridgebalance.example.com",
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
    // Inter (body) + Instrument Serif (display, italic) + Geist Mono (code)
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&family=Geist+Mono:wght@400;500;600&display=swap",
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl:
            "https://github.com/the-bridge-balance/the-bridge-balance/edit/main/edu-site/",
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
    image: "img/og-image.svg",
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
        {
          href: "https://github.com/the-bridge-balance/the-bridge-balance",
          label: "GitHub",
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
            { label: "Stage 1 — Foundations", to: "/stage-01-spec-aware-vibe-engineering/" },
            { label: "Stage 2 — CS50 Certs", to: "/stage-02-cs50-certification/" },
            { label: "Stage 3 — AI Coding Agents", to: "/stage-03-mastering-ai-coding-agents/" },
            { label: "Stage 4 — Autonomous Agents", to: "/stage-04-engineering-autonomous-ai-agents/" },
          ],
        },
        {
          title: "Reference",
          items: [
            { label: "GitHub", href: "https://github.com/the-bridge-balance/the-bridge-balance" },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} The Bridge Balance. 100% free, forever.`,
    },
    prism: {
      theme: prismThemes.github,
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
