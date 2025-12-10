---
name: theme-refactor-plan
overview: Refine theming to use CSS variables with runtime switching while keeping dev fast and prod optimal.
todos:
  - id: audit-themes
    content: Audit current SCSS themes and shared tokens
    status: in_progress
  - id: css-vars-layer
    content: Create base + per-theme CSS variable files
    status: pending
  - id: dev-fast-hmr
    content: Adjust dev webpack to HMR CSS vars with minimal entries
    status: pending
  - id: prod-extract
    content: Extract hashed CSS per theme and map for lazy loading
    status: pending
  - id: verify
    content: Test dev HMR and prod lazy-loaded themes
    status: pending
---

# Theme Refactor Plan

- Limit dev build to fast, HMR-friendly theming by swapping SCSS entry themes for a single CSS-variable-based pipeline and in-memory CSS.
- In prod, extract hashed CSS with a core base plus small variable files and lazy-loadable runtime switching.

## Steps

1) Audit current theming surface

- Identify shared base styles and theme-specific tokens in SCSS (`/Users/indirection42/dev/personal/Forum/Themes/*`).
- Map which components rely on theme-specific imports to plan variable extraction.

2) Introduce CSS variable token layer

- Create base token map (e.g., `:root { --color-bg: ... }`) and per-theme overrides (one file per theme) using CSS variables compiled from existing SCSS variables.
- Ensure fallbacks for legacy browsers if needed.

3) Dev config for fast iteration

- Update [`/Users/indirection42/dev/personal/Forum/webpack/common.js`](/Users/indirection42/dev/personal/Forum/webpack/common.js) to keep `main` entry only for dev and wire SCSS to `style-loader` HMR path in [`/Users/indirection42/dev/personal/Forum/webpack/dev.js`](/Users/indirection42/dev/personal/Forum/webpack/dev.js).
- Add a simple theme switcher util that swaps the active CSS variable sheet at runtime.

4) Prod config for optimized delivery

- In [`/Users/indirection42/dev/personal/Forum/webpack/prod.js`](/Users/indirection42/dev/personal/Forum/webpack/prod.js), extract CSS with hashes (mini-css-extract-plugin or existing ExtractTextPlugin) and emit one small CSS per theme token file plus the base bundle.
- Make theme assets lazy-loadable and referenced via a manifest or map (theme name → CSS URL) used by the runtime switcher.

5) Verification

- Dev: verify HMR updates variables without full rebuild; test runtime switcher.
- Prod: build and confirm hashed CSS outputs, lazy loading works, and default theme renders without JS FOUC.