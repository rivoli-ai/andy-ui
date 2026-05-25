# UI Components — QA & Regression Workflow (Phase 1)

This document is the contributor-facing summary of UI-8 Phase 1 (foundations).
The full plan lives in [`BACKLOG.md` § UI-8](../roadmap/BACKLOG.md).

**Unified verification:** run `nx run @omnifex/ui-components:verify` or see [component-verification.md](./component-verification.md).

## What ships in Phase 1

- A custom **stylelint plugin** at `tools/stylelint-plugin-omnifex/` with four
  rules enforcing the UI-8 regression-prevention contract:
  - `omnifex/no-hex-in-components`
  - `omnifex/tokens-only`
  - `omnifex/mobile-first-media`
  - `omnifex/no-hover-only-affordance`
- A root `.stylelintrc.json` scoped to `libs/ui-components/**/*.css`.
- A dependency-free **audit script** at
  `tools/scripts/audit-ui-components.mjs` that emits `docs/UI_AUDIT_REPORT.md`
  without requiring `pnpm install` first.
- **Playwright + `@axe-core/playwright`** specs for both apps
  (`apps/angular-app-e2e`, `apps/react-app-e2e`):
  - `tests/a11y.spec.ts` — axe-core with WCAG 2.2 AA tag filter; blocks on
    serious/critical only.
  - `tests/ui-components.spec.ts` — no-horizontal-scroll at 360/768/1280 px
    and 44×44 CSS px touch-target assertions on mobile viewport.
- New Nx targets on `@omnifex/ui-components`:
  - `stylelint` — runs stylelint over component CSS
  - `audit`     — runs the dependency-free audit
- New Nx targets on both e2e projects:
  - `e2e:a11y`       — `playwright test --grep=@a11y`
  - `e2e:responsive` — `playwright test --grep=@responsive`
  - `e2e:touch`      — `playwright test --grep=@touch`

## Commands

### `@omnifex/ui-components` targets

```bash
corepack pnpm nx run @omnifex/ui-components:build
corepack pnpm nx run @omnifex/ui-components:test
corepack pnpm nx run @omnifex/ui-components:stylelint
corepack pnpm nx run @omnifex/ui-components:storybook
```

- **build** — Stencil compile + publish layout under `dist/ui-components`
- **test** — Jest unit specs (e.g. `button.spec.tsx`)
- **stylelint** — design-token and mobile-first CSS rules
- **storybook** — local catalog on port 6006 (`dependsOn: build`)

### Verification & audit

```bash
# All-in-one verification (static + stylelint + audit + test + build)
corepack pnpm nx run @omnifex/ui-components:verify

# Static-only (fast CI)
corepack pnpm nx run @omnifex/ui-components:verify:static

# Dependency-free audit (produces docs/UI_AUDIT_REPORT.md)
corepack pnpm nx run @omnifex/ui-components:audit

# Stylelint plugin self-tests (run against real stylelint)
node tools/stylelint-plugin-omnifex/__tests__/rules.spec.js

# Accessibility gate (Playwright starts `angular-app:serve-e2e` on http://localhost:4321 automatically)
corepack pnpm nx run angular-app-e2e:e2e:a11y
corepack pnpm nx run react-app-e2e:e2e:a11y

# Responsive + touch target gates
corepack pnpm nx run angular-app-e2e:e2e:responsive
corepack pnpm nx run angular-app-e2e:e2e:touch
```

## Current baseline (from `nx run @omnifex/ui-components:stylelint`)

- **0 errors, 0 warnings** — all `libs/ui-components/**/*.css` files pass the
  four omnifex stylelint rules.
- **Token source:** `libs/styles/src/lib/theme.css` (imported by
  `libs/ui-components/src/global/theme.css`) now includes the structural scale
  (`--font-size-*`, `--radius-*`, `--z-sticky`) and inverse-surface text tokens
  (`--theme-text-on-inverse-primary` / `--theme-text-on-inverse-secondary`).

See `docs/UI_AUDIT_REPORT.md` for the per-file dependency-free audit (should
show 0 hard errors and 0 non-token warnings).

## How to fix the common violations

1. **Hex fallback warnings.** Either remove the fallback entirely (so missing
   tokens fail loudly during development) or replace it with a neutral value
   (`currentColor`, `transparent`, `0`).
   ```css
   /* before */
   background-color: var(--theme-accent-primary, #4f46e5);
   /* after */
   background-color: var(--theme-accent-primary);
   ```
2. **Raw `font-size`, `border-radius`, `z-index`.** Add the value to
   `libs/styles/src/lib/theme.css` as a token and reference it:
   ```css
   /* before */
   font-size: 1.25rem;
   /* after */
   font-size: var(--font-size-lg);
   ```
3. **`max-width:` media query.** Invert to `min-width:` (mobile-first) or use
   a `@container` query for parent-driven layout.
4. **Hover-only affordance.** Duplicate the declarations on
   `:focus-visible` so keyboard users reach the same state:
   ```css
   .card-action:hover,
   .card-action:focus-visible { opacity: 1; }
   ```

## What Phase 2 will add

- Storybook 8 with `@storybook/addon-a11y`, `@storybook/test-runner`, and
  Playwright-backed visual baselines at the same breakpoint × theme matrix.
- `@storybook/web-components-vite` config for Stencil.
- Token coverage dashboard and `api-extractor` review files.

See [`BACKLOG.md` § UI-8](../roadmap/BACKLOG.md) for the complete plan.
