---
feature: 009-differentiated-intros
mode: playwright
url: http://127.0.0.1:4173/intro/
combinations_exercised:
  - intermediate|summary
  - beginner|summary
  - beginner|detailed
  - advanced|detailed
checks:
  - name: description node visible
    expected: true
    observed: true
    pass: true
  - name: description text contains the lens label
    expected: true
    observed: true
    pass: true
    detail: per combination exercised, the note element text begins with "Difficulty · Length · Lens"
  - name: description text contains the 'choose this if' sentence
    expected: true
    observed: true
    pass: true
    detail: each observed note contains the bold "Choose this if:" prefix and a sentence
  - name: controls' aria-describedby references the description id
    expected: true
    observed: true
    pass: true
    detail: section[aria-label="Adaptive reader controls"] aria-describedby=":R438tlalda9H3:"; document.getElementById(":R438tlalda9H3:") resolves to the note element
  - name: on combination change, description text updates without a reload
    expected: true
    observed: true
    pass: true
    detail: clicking Beginner (C1), Beginner+Detailed (C3), and Advanced+Detailed (C9) each updated the note text without a navigation event; data-effective-combination attribute matched the active selection
summary: |
  Playwright drove the served intro page through four combinations (C4 default, then
  C1 via Beginner+Summary, C3 via Beginner+Detailed, C9 via Advanced+Detailed). Every
  required check passed. The description node is rendered with role="note" and
  aria-live="polite"; the controls' section carries aria-describedby pointing at the
  note id; switching pills updates the note text without a reload. The static-DOM
  fallback check was also performed on edu-site/build/intro/index.html and confirmed
  the same structural invariants: combinationDescription class, role="note",
  aria-live="polite", data-effective-combination attribute, "Choose this if" text,
  and all nine lens labels present somewhere in the rendered intro page.

routing:
  - label: "New to programming"
    href: /stage-01-spec-aware-vibe-engineering/
    resolved: true
    fallback: null
  - label: "Comfortable with code, new to AI agents"
    href: /stage-03-mastering-ai-coding-agents/
    resolved: true
    fallback: null
  - label: "Already shipping agents"
    href: /stage-04-engineering-autonomous-ai-agents/
    resolved: true
    fallback: null
---

## Notes

- 2026-08-20: Live Playwright run against `npx docusaurus serve build --port 4173` on the local Docusaurus build.
- 2026-08-20: Static-DOM inspection of `edu-site/build/intro/index.html` corroborates the live findings.
- The `Summary (Summary)` pill label preserves the bracket cue from FR-005 of the reader-controls contract.
- 4 distinct combinations exercised (requirement: ≥4); satisfied.
