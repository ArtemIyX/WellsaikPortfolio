# Portfolio improvement dashboard

This dashboard records the implementation state of the 50-item audit. Evidence is
kept close to the feature so each item can be reviewed with the relevant source,
test, route, or validation document.

| # | Priority | Status | Evidence |
| ---: | --- | --- | --- |
| 1–10 | P0 | Done | `src/content/home.ts`, `index.html`, header, proof strip |
| 11–20 | P1/P2 | Done | project cards, case studies, pet-project dossiers and filters |
| 21–30 | P1/P2 | Done | `useReveal`, header progress/active state, motion tokens, button rules |
| 31–34 | P1/P2 | Done | `/projects/:projectId`, case-study SVG flow, selected evidence cards |
| 35–36 | P1/P2 | Done | repository filters and evidence-led profile copy |
| 37–38 | P2 | Done | print rules and copy-email contact action |
| 39 | P2 | Correctly omitted | No permissioned testimonials are available; no invented quotes are shown |
| 40–45 | P1/P2 | Done | contact panel, content copy, engagement labels, portfolio language |
| 46 | P1 | Done | Sharp prebuild generates 480/768/1200 WebP derivatives with `srcset` and `sizes` |
| 47–49 | P1 | Done | `PERFORMANCE_AND_ACCESSIBILITY_BUDGETS.md`, theme tokens, tests |
| 50 | P2 | Done | this dashboard |

## Release sequence

Credibility/content → conversion/structure → case-study proof → motion → polish.
Every change is committed in a small focused commit and validated with
`npm run type-check` and `npm run test:unit -- --run`.
