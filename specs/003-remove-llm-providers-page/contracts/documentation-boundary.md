# Contract: Public/Internal Documentation Boundary

## Purpose

This feature changes no API, backend route, or external contract. The only
contract this feature must satisfy is the **public documentation boundary**:
which content is rendered for learners and which content stays repository-
internal.

## No API change

- No endpoint is added, modified, or removed.
- No request/response contract is altered.
- No schema or persistence contract is altered.
- The backend provider interfaces, provider registry, and configuration
  remain untouched.

## Public documentation boundary

| Public (must render) | Internal (must NOT render) |
|---|---|
| Curriculum chapters (Stages 1-4) | `history/adr/*` decisions |
| Introduction / Welcome | Future chatbot provider selection details |
| Learner-facing navigation | Backend provider implementation guides |
| | The LLM provider comparison page |

## Verification contract

1. `edu-site/docs/` contains no document that surfaces the LLM-provider
   decision as textbook content.
2. `docusaurus.config.ts` exposes no navbar or footer link targeting
   `/llm-providers`.
3. A fresh static build emits no route from the former document.
4. `edu-site/api/app/llm/**` and `history/adr/0001-free-tier-llm-choice.md`
   are byte-identical before and after this feature.
5. The former URL (`/llm-providers`) returns the site's standard not-found
   behavior on a served build.

## Error handling

- If a dangling public reference is found during verification, treat it as a
  failed gate and fix it before completion.
- If the build emits the former route anyway, do not rely on server redirects;
  remove the source of that route and rebuild.
