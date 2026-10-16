# Verification — 2026-10-16

## Production build and tests

- `npm run build`: passed with Next.js 16.4.1, including TypeScript validation and static generation.
- `npm test`: all four cart tests passed.
- Static production preview served successfully at `http://127.0.0.1:3310`.

## Browser checks

Performed in the Codex in-app browser against the production export.

| Viewport width | Document scroll width | Horizontal overflow |
| -------------- | --------------------- | ------------------- |
| 320            | 320                   | None                |
| 375            | 375                   | None                |
| 390            | 390                   | None                |
| 430            | 430                   | None                |
| 768            | 768                   | None                |
| 1440           | 1440                  | None                |

Mobile scene checks used 390 × 844. At scroll 749 px the detail chapter opacity was 1, the bag rotation was approximately 15.17 degrees with scale 1.096, and the stage changed to RGB(73, 49, 40). At scroll 1498 px the movement chapter opacity was 1, the shoe was entering, and the progress indicator read 77%. This verifies actual scroll-linked state changes, not only a static responsive layout. The dark header remained legible across the stage.

Desktop navigation to Men reached the second pinned panel: its left edge was approximately 0.67 px and the horizontal track transform was approximately -49.98%. Native vertical scrolling drives that horizontal journey.

## Interaction checks

- Mobile menu opens and collection navigation works.
- Men filter exposes the men's collection.
- Product quick view opens; image detail control responds.
- Shoe add button remains disabled until a size is chosen.
- EU 42 Derby adds to the cart at $310.
- Incrementing quantity to two updates subtotal to $620.
- Escape closes the drawer.
- Cart and quantity persist after a page reload.
- Removing the line restores the empty-cart state; test cart was cleared afterward.
- No browser warning/error entries were returned during the final checks.
- No broken loaded image assets were found.

## Limits

Responsive checks used browser viewport overrides, not physical iPhone/Android hardware. Reduced-motion behavior is implemented with CSS and media queries but was not toggled at OS level during this session. No Lighthouse score, device FPS, production ecommerce integration or public hosting deployment is claimed. The production export is ready for a Vercel/static-host deployment; the preview URL is local.
