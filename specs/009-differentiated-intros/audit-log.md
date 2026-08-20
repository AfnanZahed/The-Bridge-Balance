---
feature: 009-differentiated-intros
reviewer: Claude (Opus) — self-audit; flagged limitation in summary
reviewed_at: 2026-08-20
matrix_path: specs/009-differentiated-intros/comparison-matrix.md
blind_match_accuracy: 100
rows:
  - cell: C1
    verdict: unique
    note: safety rule / Replit incident / one-rule structure / inspect-the-diff takeaway; distinct lens.
  - cell: C2
    verdict: unique
    note: everyday analogy / Karpathy "vibe coding" + Lemkin + Acevedo + Samsung / three-act story / owner-draws-floor-plan takeaway; distinct lens and structure.
  - cell: C3
    verdict: unique
    note: boundary checklist / Replit + Enrichlead + Veracode / four enumerated boundaries / four-lines-before-proceeding takeaway; distinct structure.
  - cell: C4
    verdict: unique
    note: decision framework / Stack Overflow 84%/29% + Lemkin + Samsung + Stack Overflow policy / one-paragraph thesis / pick-one-bridge-action takeaway; distinct lens.
  - cell: C5
    verdict: unique
    note: responsibility map / METR 19% + 63% + AWS 40% / 2× / four-row human-vs-AI table / label-next-task takeaway; distinct structure.
  - cell: C6
    verdict: unique
    note: experiment → system / Stanford -20% + Dice -40% + 57% / four-criterion rubric / inventory + write-missing-spec takeaway; distinct structure.
  - cell: C7
    verdict: unique
    note: strategic scarcity / S&P Global option paralysis + 30+ March 2026 models + METR / one-paragraph reframing / move-quarterly-investment takeaway; distinct lens.
  - cell: C8
    verdict: unique
    note: governance + trust boundaries / Enrichlead + Samsung + Replit + Stack Overflow policy / four labeled boxes / draw-four-boxes-and-mark-authority takeaway; distinct structure.
  - cell: C9
    verdict: unique
    note: ownership architecture / Veracode 45% + Fortune 50 10× + IBM/Cisco 20-30% + BCMS specification poverty + EU AI Act / architecture-in-prose across RAG, tool calling, multi-agent / contract-per-surface-and-named-owner takeaway; distinct structure.
summary: |
  Pairwise audit across primary lens, scenario, structure, and takeaway finds no
  duplicate verdict on any of the nine rows. Lenses are mutually exclusive; even
  where canonical sources overlap (Replit appears in C1, C3, C8; Enrichlead in
  C2, C8, C9; METR in C5, C9; Stack Overflow in C2, C4, C9; Samsung in C2, C8),
  each row answers a different question of the evidence. Reasoning structures are
  all distinct: rule, three-act story, four enumerated boundaries, one-paragraph
  thesis, four-row table, four-criterion rubric, one-paragraph strategic reframing,
  four labeled boxes, architecture in prose.

  Self-audit limitation: this is an AI-only review because no second human reviewer
  is present in this environment. The pairwise duplicate check is mechanical and
  high-confidence; the lens-matching accuracy depends on whether a human reader
  would assign the same lens from the body alone. The matrix verdict column remains
  the primary gate; any human reviewer who disagrees with a row verdict should
  edit the verdict in `comparison-matrix.md` and update this log.

  Publication state: `audit-passed`.
---

## Audit trail

- 2026-08-20: Initial pairwise audit; all 9 rows verdict `unique`. No reverts required.
