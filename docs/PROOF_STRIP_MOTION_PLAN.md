# Proof Block Motion and Spacing Refinement

## Summary

Replace the current color-first hover effect with a nested CSS surface that has clear spatial movement:

- Hover/focus in: lift upward with a smooth arrival.
- While hovered: subtle idle bob animation.
- Hover/focus out: descend with a shorter, sharper easing.
- Add balanced vertical padding so the text has more space above and below.
- Keep the pale hover surface and shadow as static supporting cues, without animating the page background.

## Implementation Changes

- Update `HomeView.vue`:
  - Wrap each proof item’s text in `.proof-strip__surface`.
  - Add an inner `.proof-strip__content` wrapper so reveal animation, surface movement, and idle motion remain independent.

- Update `HomeView.css`:
  - Move the existing three-row text grid onto `.proof-strip__content`.
  - Add balanced `padding-block: var(--space-4)` and existing horizontal padding to `.proof-strip__surface`.
  - Keep dividers on the outer `.proof-strip__item`, so they remain stable while the surface lifts.
  - Animate the surface with distinct transition settings:
    - Hover/focus in: approximately 6px lift over 300ms with emphasized easing.
    - Hover/focus out: return over 180ms with sharper easing.
  - Add a delayed, subtle 2px idle bob to `.proof-strip__content` while hovered/focused.
  - Keep the hover surface and shadow static rather than transitioning their colors.
  - Preserve the current responsive divider rules for four-, two-, and one-column layouts.
  - Disable lift and idle movement under `prefers-reduced-motion: reduce`.

## Tests and Acceptance Criteria

- Add/adjust `HomeView.spec.ts` to verify every proof item contains the new surface/content structure.
- Confirm `npm run type-check` passes.
- Confirm `npm run build-only` passes.
- Visually verify:
  - Text has clear top breathing room.
  - The whole block visibly lifts instead of only changing color.
  - Idle motion starts after the lift and remains subtle.
  - Leaving the block visibly settles it back down.
  - Dividers remain stationary and correctly positioned.
  - Four-column, two-column, mobile, light-theme, dark-theme, keyboard-focus, and reduced-motion states remain usable.

## Assumptions

- The implementation remains CSS-only; no JavaScript hover state is needed.
- Hover and keyboard focus use the same motion behavior.
- The pale surface and shadow remain as static elevation cues.
- The existing section reveal animation remains on the outer list item and is not replaced.
