---
name: incremental-stack-upgrade
overview: Incrementally modernize tooling for faster dev/prod builds with minimal risk.
todos:
  - id: todo-1765335180086-syf16dhr1
    content: ""
    status: pending
---

# Incremental Stack Upgrade

- Upgrade Node to 18/20 LTS, refresh lockfile, rerun existing dev/build scripts and note any OpenSSL/webpack-dev-server issues.
- Modernize TypeScript/tooling while still on Webpack 4: bump TypeScript/@types, ts-loader, and adjust config only if needed.
- Migrate bundling to Webpack 5 with minimal config changes: replace deprecated plugins, update loader options, enable filesystem cache, keep current entry/output structure.
- Add quick-win build perf tuning: parallel/type-check offloading, bundle analysis, vendor splitting review.
- (Optional) Evaluate Vite/esbuild prototype after Webpack 5 baseline to judge further gains.

Todos:

- node-upgrade: Move to Node 18/20, verify scripts without legacy OpenSSL flag
- ts-refresh: Update TypeScript + loaders/types on Webpack 4, fix any type fallout
- webpack5-migrate: Port configs to Webpack 5 with minimal behavior changes
- perf-tuning: Add caching/parallelization and run bundle analysis for hotspots
- vite-spike: Prototype Vite/esbuild build to compare dev/prod speeds