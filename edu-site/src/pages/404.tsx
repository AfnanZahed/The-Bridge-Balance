/**
 * Custom 404 page.
 *
 * Accessibility hardening (2026-08-17):
 *  - <main> wraps the unique content and is the skip-link target.
 *  - Polite aria-live region announces the 404 status to screen readers
 *    without interrupting the document title announcement.
 *  - The "Go back" button uses history.back() when possible and is keyboard
 *    accessible (native <button>).
 *  - All decorative icons carry aria-hidden="true"; the heading and
 *    paragraph text provide all the meaning for AT users.
 *  - Actions <Link> elements carry descriptive aria-labels so screen-reader
 *    rotor listings explain the destination, not just the visible text.
 */

import Link from "@docusaurus/Link";
import { ArrowRight, BookOpen } from "@site/src/components/icons";
import Layout from "@theme/Layout";
import React, { useCallback } from "react";

export default function NotFound(): React.ReactElement {
  const handleGoBack = useCallback(() => {
    // history.back() returns to the previous page in the session; the
    // browser handles focus restoration as part of the navigation.
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
      return;
    }
    // Fallback — send the user home if there's no history to return to.
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }, []);

  return (
    <Layout
      title="Page not found"
      description="The page you were looking for doesn't exist."
    >
      {/* Polite live region — on mount screen readers will announce the
       * 404 status. Wrapped in a single visually-hidden block to keep the
       * DOM clean and avoid spurious screen-reader chatter on later
       * re-renders. */}
      <div
        className="tbb-notfound__live"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        Page not found. The requested URL does not match any page in this
        textbook.
      </div>

      <main
        id="main-content"
        aria-labelledby="tbb-notfound-heading"
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: "32rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "0.375rem 0.875rem",
              borderRadius: "var(--tbb-radius-pill)",
              background:
                "color-mix(in srgb, var(--ifm-color-primary) 12%, transparent)",
              color: "var(--ifm-color-primary)",
              fontWeight: 600,
              fontSize: "0.8125rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
            aria-hidden="true"
          >
            404 · Page not found
          </div>

          <h1
            id="tbb-notfound-heading"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              fontWeight: 800,
              margin: "0 0 1rem",
              color: "var(--tbb-text)",
            }}
          >
            Lost on the bridge.
          </h1>

          <p
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "var(--tbb-text-muted)",
              margin: "0 auto 2.5rem",
              maxWidth: "28rem",
            }}
          >
            The page you were looking for doesn't exist (or hasn't been written
            yet). Jump back to the homepage or open a stage from the sidebar.
          </p>

          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Link
              to="/"
              className="tbb-hero__cta-primary"
              aria-label="Return to the homepage (link)"
            >
              <BookOpen size={18} aria-hidden="true" />
              Back to home
            </Link>
            <Link
              to="/stage-01-sde-mastery-ai-driven/"
              className="tbb-hero__cta-secondary"
              aria-label="Start Stage 1: Foundations (link)"
            >
              Start Stage 1
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="tbb-hero__arrow"
              />
            </Link>
          </div>

          <button
            type="button"
            className="tbb-notfound__go-back"
            onClick={handleGoBack}
            aria-label="Go back to the previous page in your browser history"
          >
            <ArrowRight
              size={14}
              aria-hidden="true"
              className="tbb-notfound__go-back-icon"
            />
            Go back
          </button>
        </div>
      </main>
    </Layout>
  );
}
