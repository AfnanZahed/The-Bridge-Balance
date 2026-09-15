---
sidebar_label: "Accessibility"
sidebar_position: 100
title: "Accessibility Statement"
description: "What The Bridge Balance does to keep its pages usable for readers who use a screen reader, a keyboard, or high-contrast and reduced-motion settings — and what is honestly not covered yet."
---

# Accessibility Statement

Some readers move through a page with a mouse and read it on a bright screen. Others use a **screen reader** — software that reads a page aloud, or sends it to a braille display, for people who cannot see the screen. Others rely on **keyboard navigation**, moving around a page with Tab, Shift+Tab, Enter, and Space instead of a mouse. Others turn on operating-system settings that cut down motion or raise contrast. This page says, in plain words, what this site actually does to work for those readers, and what it does not do yet. Every claim below is tied to a real file in this project, named next to it.

## The standard this site targets: WCAG 2.2, Level AA

**WCAG** stands for the Web Content Accessibility Guidelines — a widely used international standard for making websites usable by people with disabilities. **2.2** is the version of the guidelines. WCAG defines three levels of conformance, from A at the minimum upward, and **AA** is the middle level: the one most organisations and public-sector sites are held to.

This site's accessibility stylesheet records its baseline as **WCAG 2.2 Level AA**. Read that as a target the project works against, not a badge: an outside body has not verified it. (Source: `edu-site/src/css/a11y.css`, whose header states the baseline and the date it was last revised.)

## The two automated checks that run against this site

The site has two automated checks wired in as project scripts in `edu-site/package.json`. "Automated" means a program does the checking, rather than a person reading the page.

- **axe** (`npm run test:a11y`). axe is an automated accessibility testing engine: it inspects pages and reports the accessibility problems it can detect by rule — for example, a control with no accessible name, or text and a background color that do not contrast enough behind it.
- **Lighthouse** (`npm run test:perf`). Lighthouse is an audit tool built into Chrome. It scores a page against several categories, including performance and accessibility, and reports what it found.

Automated tools matter, but they have a hard limit worth stating plainly: a program can check that alt text *exists*, but it cannot judge whether the words are actually right. That gap is why the next section exists.

## What the site does, in specific terms

### Keyboard: you can always see where you are

Every interactive element on the site — links, buttons, menu items, form fields — shows a visible **focus indicator** when it is reached by keyboard. A focus indicator is the ring that marks which element the keyboard is currently on. The stylesheet draws it as a **2px solid outline with a 2px offset** around the element, and it appears on keyboard, switch, and voice navigation but not on a mouse click, so it never clutters the page for mouse users. (Source: `edu-site/src/css/a11y.css`, section 2.)

The keyboard's first stop on any page is a **skip link**: a control that is invisible until you press Tab, then appears and jumps straight to the main content, so you do not have to tab through the whole navigation menu on every page. (Source: the same file, section 4.)

### Images must carry real alt text — and the build enforces it

**Alt text** is a short written description attached to an image that takes the picture's place for a reader who cannot see it. Here it is not a suggestion. Before a chapter can ship, an automated gate fails the build unless every image carries real alt text. It rejects three cases, by name:

- **`alt-missing`** — the image has no alt text at all.
- **`alt-junk`** — the alt text is a placeholder that says nothing, such as "image", "diagram", "figure", or "photo".
- **`alt-thin`** — the alt text is fewer than five words long, which is too little to stand in for a picture.

(Source: `edu-site/scripts/check-chapter.mjs`, the alt-text section. The gate runs as part of `npm run build`.)

### Color is never the only way to read a state

Where the site labels a chapter with a status badge, color is not the only signal. Each state also carries its own **shape glyph** — a small icon drawn beside the label, different for each state — and its own **border style**: dashed, solid, double, or dotted. A reader who cannot tell the colors apart can still tell the states apart. (Source: `edu-site/src/css/a11y.css`, section 7, which records this as meeting WCAG's use-of-color requirement, numbered 1.4.1.)

### Motion, contrast, and Windows high contrast

The site reads three operating-system settings and adapts to each:

- **`prefers-reduced-motion`** — a setting people turn on to cut down movement. When it is on, the site's animations and transitions collapse to almost nothing, hover movements stop, pulsing dots stop, and smooth scrolling is turned off — while the focus ring above keeps working, because keyboard users depend on it. (Source: section 8.)
- **`prefers-contrast: more`** — a request for higher contrast. When it is on, the site strengthens its borders, underlines links in the article text, and thickens the focus ring. (Source: section 9.)
- **`forced-colors`** — Windows High Contrast mode, which replaces a page's colors with a small system palette. The site yields to those system colors instead of fighting them, so it stays readable. (Source: section 10.)

### Touch targets are big enough to hit

A **touch target** is the area that actually responds to a tap or click, which can be larger than the visible control. Every interactive element here is sized to a minimum of **44 × 44 CSS pixels**, where a CSS pixel is the unit web pages are laid out in. The stylesheet notes that WCAG 2.2's own requirement, numbered 2.5.8, asks for 24 × 24, and that this site deliberately goes beyond it because the larger target is noticeably easier for readers with motor difficulties. (Source: `edu-site/src/css/a11y.css`, section 6.)

## What this page does not claim

- **No outside verification, and no certificate.** The site targets WCAG 2.2 Level AA, and the checks above are automated and run by the project itself. An independent party has not verified any of it.
- **Nothing beyond the stated level.** The target is Level AA, and this page does not claim more than that.
- **Video is not covered here.** The measures above are for the text pages and the platform around them — the part this project builds and controls. The video lectures are the project owner's own recording process, and this page makes no claim about captions or any other video accessibility, because none has been confirmed.

## Reporting an accessibility problem

There is no live accessibility-feedback channel yet. The site today is a set of pages with no comments, no forum, and no signed-in accounts, so there is no monitored inbox for an accessibility report — naming one here would send you to a place nobody is watching.

That will change if a live surface is added, and this page will be updated when it does. Until then, this page records what the project actually does, and nothing more.
