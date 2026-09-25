/**
 * Swizzled Navbar/Logo — the brand, with the Alpha phase badge.
 *
 * Docusaurus's stock Logo renders only the mark and the title. The book ships
 * while it is still being written, so the phase marker rides with the brand —
 * inside the brand link, where the book names itself (see AlphaBadge). The
 * badge's visible word and its hidden clause also complete the link's
 * accessible name, so the phase is announced on the way into the site.
 *
 * The rest is upstream's markup unchanged: the home link, the themed logo
 * image, and the truncating title.
 */

import Link from "@docusaurus/Link";
import { useThemeConfig } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import AlphaBadge from "@site/src/components/AlphaBadge";
import ThemedImage from "@theme/ThemedImage";
import React from "react";

type LogoConfig = {
  src: string;
  srcDark?: string;
  alt?: string;
  href?: string;
  target?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
};

type NavbarConfig = {
  title?: string;
  logo?: LogoConfig;
};

function LogoThemedImage({
  logo,
  alt,
  imageClassName,
}: {
  logo: LogoConfig;
  alt: string;
  imageClassName: string;
}): React.ReactElement {
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };
  // The wrapper div is upstream's, kept for parity with the stock component.
  return (
    <div className={imageClassName}>
      <ThemedImage
        className={logo.className}
        sources={sources}
        height={logo.height}
        width={logo.width}
        alt={alt}
        style={logo.style}
      />
    </div>
  );
}

export default function NavbarLogo(): React.ReactElement {
  const {
    siteConfig: { title },
  } = useDocusaurusContext();
  const { title: navbarTitle, logo } = (useThemeConfig().navbar ??
    {}) as NavbarConfig;
  const logoLink = useBaseUrl(logo?.href || "/");
  // If a visible title is shown, the logo is decorative to assistive tech.
  const fallbackAlt = navbarTitle ? "" : title || "";
  const alt = logo?.alt ?? fallbackAlt;

  return (
    <Link
      to={logoLink}
      className="navbar__brand"
      {...(logo?.target && { target: logo.target })}
    >
      {logo && (
        <LogoThemedImage logo={logo} alt={alt} imageClassName="navbar__logo" />
      )}
      {navbarTitle != null && (
        <b className="navbar__title text--truncate">{navbarTitle}</b>
      )}
      <AlphaBadge size="sm" />
    </Link>
  );
}
