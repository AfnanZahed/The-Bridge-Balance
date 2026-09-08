# Quickstart: Remove Internal LLM Provider Decision from Public Site

This runbook verifies the feature end-to-end after implementation. Run from the
repo root (`C:\Users\Dell\Desktop\Book`).

## Prerequisites

- `node` ≥ 18 and Docusaurus dependencies installed in `edu-site/`
  (`cd edu-site && npm install`).

## 1. Source absence scan

```powershell
# No public source document for the former page:
Get-ChildItem edu-site/docs -Recurse -Filter '*.md*' |
  Select-String -Pattern 'llm-providers|LLM providers' -List
# Expect: no matches.

# No public navigation or config reference:
Select-String -Path edu-site/docusaurus.config.ts -Pattern '/llm-providers'
# Expect: no matches.
```

## 2. Fresh static build

```powershell
cd edu-site
npm run build
# Expect: exit 0, no /llm-providers route generated.
```

Inspect the generated output for any trace of the former route:

```powershell
Get-ChildItem build -Recurse -ErrorAction SilentlyContinue |
  Select-String -Pattern 'llm-providers' -List
# Expect: no matches.
```

## 3. Served behavior (optional but recommended)

Serve the built site and request the former route:

```powershell
npx serve build
# In a browser: http://localhost:3000/llm-providers
# Expect: the site's standard not-found page, not the former content.
```

## 4. Preservation check

```powershell
# ADR retained:
Test-Path history/adr/0001-free-tier-llm-choice.md          # True

# Backend provider interfaces and implementations retained:
Get-ChildItem edu-site/api/app/llm -Recurse -File | Measure-Object | Select-Object Count
# Expect: non-zero count (7 provider modules + base + registry + router + init).
```

## 5. Backend README reference updated

```powershell
Select-String -Path edu-site/api/README.md -Pattern 'docs/llm-providers.md'
# Expect: no match — the reference no longer points at the removed public page.
```

## Acceptance

All of the above checks pass before the feature is considered complete:
no public source, no public link, no generated route, ADR and backend provider
code preserved, and the README reference corrected.
