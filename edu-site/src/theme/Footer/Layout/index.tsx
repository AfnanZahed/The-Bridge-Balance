/**
 * Footer/Layout — ejected from @docusaurus/theme-classic (3.7.x).
 *
 * Why ejected rather than wrapped: Docusaurus's swizzle-wrap form hands the
 * original component `children`, but upstream's FooterLayout has no children
 * slot — it destructures only {style, links, logo, copyright}. The wordmark
 * band also has to render INSIDE the <footer> element, so it shares the
 * footer's dark ground and can sit above its own gradient layer. Wrapping
 * would have appended it after </footer>, outside the themed surface.
 *
 * The one addition is the .tbb-footer-showcase band at the end. Everything
 * above it is upstream's markup, unchanged.
 */

import { ThemeClassNames } from "@docusaurus/theme-common";
import {
  FooterBackgroundGradient,
  TextHoverEffect,
} from "@site/src/components/Aceternity/TextHoverEffect";
import type { Props } from "@theme/Footer/Layout";
import clsx from "clsx";
import React from "react";

const WORDMARK = "The Bridge Balance";

export default function FooterLayout({
  style,
  links,
  logo,
  copyright,
}: Props): React.ReactElement {
  return (
    <footer
      className={clsx(ThemeClassNames.layout.footer.container, "footer", {
        "footer--dark": style === "dark",
      })}
    >
      <div className="container container-fluid">
        {links}
        {(logo || copyright) && (
          <div className="footer__bottom text--center">
            {logo && <div className="margin-bottom--sm">{logo}</div>}
            {copyright}
          </div>
        )}
      </div>

      <div className="tbb-footer-showcase">
        <FooterBackgroundGradient />
        <div className="tbb-footer-showcase__mark">
          <TextHoverEffect text={WORDMARK} duration={0.25} />
        </div>
      </div>
    </footer>
  );
}
