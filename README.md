# ZENITH LEATHER

A cinematic, interactive concept store for premium leather bags and shoes. Built with Next.js App Router, React, TypeScript, GSAP ScrollTrigger, and Lucide. Uses custom CSS rather than a utility framework to keep the visual system explicit.

## Run locally

Use **Node.js 24 LTS** (minimum 22.13).

```bash
npm ci
npm run dev
```

Open http://localhost:3000. To view on a phone, connect the phone and computer to the same Wi-Fi, keep the dev server running, and open `http://<computer-LAN-IP>:3000`. Allow the server through the local firewall if your OS asks. The default server binds to `0.0.0.0`; no public deployment is performed by this command.

## Verify and build

```bash
npm test
npm run typecheck
npm run build
```

The production build is a static export in `out/`. Serve that folder with any static HTTP server. `next start` is not used for static exports.

## Deploy to GitHub Pages

The repository includes `.github/workflows/pages.yml`. It detects the Pages base path, runs the tests, builds the static export, and deploys `out/` whenever `main` is pushed.

1. Push this project to a GitHub repository with `main` as its default branch.
2. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the source.
3. Open the **Actions** tab and wait for **Deploy to GitHub Pages** to finish.
4. Share the resulting `https://USERNAME.github.io/REPOSITORY/` URL.

Public files use the configured Pages base path, so images and Next.js assets work when the site is hosted below a repository subpath. See `GITHUB-PAGES.md` for the Persian step-by-step guide.

## Deploy to Vercel

1. Push this directory to a new Git repository, excluding `node_modules/`, `.next/`, and `out/`.
2. Import that repository in Vercel, selecting this directory as the root if it is part of a larger repo.
3. Use the Next.js framework preset, Node.js 24, install command `npm ci`, and build command `npm run build`.
4. Keep the framework's output setting, or use `out` if deploying as a static site.
5. Deploy. No environment variables, API keys, database, or payment account are required.

Alternatively run `npx vercel` from this directory and complete Vercel's login/project flow. A successful local build is deployment readiness, not evidence of an actual Vercel deployment.

## Architecture

- `src/components/Experience.tsx`: page composition, navigation, cart state and persistence.
- `src/components/Cinema.tsx`: shared three-chapter sticky stage with independent floating product layers.
- `src/components/ParticleSculpture.tsx`: lightweight deterministic point sculpture, projected in Canvas 2D, morphing between bag, leather weave and loafer.
- `src/components/Editorial.tsx`: manifesto, collection campaigns and craft section.
- `src/components/Motion.tsx`: GSAP entrance and scroll timelines, media queries, cleanup.
- `src/components/Products.tsx`: filterable collection, quick view, size selection and detail zoom.
- `src/components/Modal.tsx`: native dialogs, Escape dismissal, modal focus containment, scroll lock and focus restoration.
- `src/data/products.ts`: typed mock catalog. Replace the data source with a backend adapter when integrating real inventory.
- `src/lib/cart.ts`: pure cart operations and validation of saved browser data.
- `tests/cart.test.ts`: quantity, size identity, persistence corruption and duplicate handling.
- `src/app/globals.css`: responsive design tokens and layouts.

## Motion and accessibility

Scrolling stays native. A shared sticky stage links product position, rotation, scale, opacity, particle form, chapter typography, background color and progress to one scroll journey. A lightweight projected particle sculpture morphs from handbag to leather weave to loafer, with no WebGL post-processing. Photographic product layers float independently. Desktop collection campaigns use a pinned horizontal journey; mobile campaigns remain vertical with scrubbed masks and perspective reveals. Desktop pointer movement tilts the product layers. A scroll-reactive type ribbon and animated menu continue the motion language. Product reveal animations rerun for changed filters. `gsap.matchMedia()` reverts animations across breakpoint changes and unmounts. Reduced-motion mode removes cinematic motion, smooth scrolling, and the extended sticky stage duration. The canvas skips drawing when offscreen, hidden, or reduced-motion is enabled; its resolution and frame rate are capped on phones.

Menu, cart and quick view use native `<dialog>` elements. All features are operable without hover, with focus styles, labeled controls, touch-sized buttons, and keyboard navigation. Product controls stay visible on touch screens.

## Images and fonts

All imagery is generated specifically for this concept demo. The images depict illustrative products and editorial scenes; they do not document real stock, manufacturing, models, or a brand's actual products. Generated concept images are not a substitute for approved commercial product photography. See `ASSETS.md` for provenance.

Images are local WebP assets with dimensions reserved in layout; below-the-fold images lazy-load. The hero is prioritized. Cormorant Garamond and Manrope are served locally, so no runtime font or image services are required. Their SIL Open Font License files are included in `public/fonts/`.

## Demo boundaries

Six sample products, illustrative USD prices, two collection filters, product quick view, image detail zoom, shoe sizes, add/remove/quantity controls, and local-storage cart persistence. Each size is a separate cart line; quantity is limited to ten per line for the demo. Storage-disabled browsers retain the cart for the current page session.

There is no checkout, payment, order submission, account, inventory service, admin panel, analytics, or email capture. Cart data stays in the browser. `robots` metadata disables indexing for the concept. Remove that directive only when preparing an approved public store.

## Visual reference

The supplied reference, https://rashiin.github.io/vitalis-medical/, was inspected for its oversized typography, contrast, animated focal object, and scroll-driven pacing. This implementation uses original layouts and generated leather imagery, with native scrolling and no medical motifs or copied reference code.
