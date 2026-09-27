# Portfolio performance and accessibility gates

These are the repeatable gates for the production portfolio. They are intentionally
small enough to run on every release and strict enough to catch regressions in the
long single-page layout.

## Performance budget

| Measure | Budget |
| --- | ---: |
| Initial JavaScript | 180 kB gzip |
| Initial CSS | 45 kB gzip |
| Hero image transfer | 180 kB |
| Homepage transfer | 1.2 MB |
| Largest Contentful Paint | ≤ 2.5 s |
| Cumulative Layout Shift | ≤ 0.1 |
| Interaction to Next Paint | ≤ 200 ms |

Run `npm run build` and inspect the generated asset sizes before release. Run a
mobile Lighthouse profile without Vue DevTools; a budget failure requires either a
measured explanation or a smaller asset/interaction path.

## Accessibility scenarios

- Tab from the skip link through the header, drawer, filters, cards, and contact panel.
- At 200% zoom, confirm no primary action or heading is clipped.
- Open the mobile drawer, cycle `Tab` and `Shift+Tab`, close with `Escape`, and confirm focus returns to the trigger.
- Switch both themes and verify normal text at 4.5:1, meaningful graphics at 3:1, and visible focus rings.
- Enable `prefers-reduced-motion` and confirm reveal, image, ambient, and button transforms do not animate.
- Activate each repository filter and confirm the polite result count changes without navigation.
