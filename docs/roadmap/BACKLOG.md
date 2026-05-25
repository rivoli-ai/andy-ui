# Omnifex UI — Product Backlog

> Opinionated, roadmap-ready backlog for scaling the Omnifex UI platform (Nx monorepo, Angular + React + shared libs).
> Generated for product/tech leadership review. See `tools/scripts/backlog-issues.json` for the machine-readable version used to create GitHub issues.

## Design Constraint (non-negotiable)

Every UI component MUST be:

- **Mobile-first** (base styles target ≤375px, progressively enhanced up)
- **Responsive by default** (fluid layouts, logical breakpoints, not per-page ad-hoc media queries)
- **Touch-first interactions** (44×44 CSS-pixel hit targets, no hover-only affordances, safe-area insets)
- **Accessible** (WCAG 2.2 AA; keyboard, screen reader, prefers-reduced-motion, prefers-contrast)
- **Cross-framework** (Angular + React adapters exposed)
- **Themed via design tokens** (no hex values in components — only `var(--...)`)

Breakpoint ladder (proposed, see STORY UI-0):
`xs <360 · sm 360 · md 600 · lg 900 · xl 1200 · 2xl 1536`.

---

## Legend

- **Impact** · **Effort** · **Priority** = `Impact / Effort` (qualitative, not a literal ratio)
- Priority bands: **P0** = do next · **P1** = plan · **P2** = opportunistic

---

## 1. Scaffolding & Generators

### GEN-1 · Nx generator: `@omnifex/workspace:app`

- **User Story**: As a **team lead onboarding a new product**, I want **a single Nx generator that scaffolds a new Angular or React app pre-wired with identity, styles, ui-components, routing, and CI**, so that **teams start from a compliant baseline instead of copy-pasting `apps/angular-app`**.
- **Acceptance Criteria**
  - **Given** an empty workspace, **when** I run `nx g @omnifex/workspace:app my-app --framework=angular|react`, **then** a new app exists under `apps/my-app` with:
    - `@omnifex/identity-<fw>`, `@omnifex/styles-<fw>`, `@omnifex/ui-components` wired
    - OIDC callback route + auth guard/route already configured
    - Theme provider + global styles imported
    - e2e project (Playwright) scaffolded under `apps/my-app-e2e`
    - `project.json` targets: `serve`, `build`, `test`, `lint`, `e2e`
    - CI entry generated in `.github/workflows/nx-ci.yml` (or honoured by existing `affected`)
  - **Given** the generator ran, **when** I run `nx serve my-app`, **then** it boots and shows the shared header/footer/theme-toggle without manual edits.
- **Impact**: High · **Effort**: Medium · **Priority**: **P0**
- **Technical Notes**: Implement under `tools/generators/app/`. Use `@nx/devkit` `generateFiles` with EJS templates. Prompt for `framework`, `auth` (yes/no), `style` (tailwind v4 default). Add unit tests under `tools/generators/app/__tests__` using `createTreeWithEmptyWorkspace`. Register in `package.json` under `"generators"` or `"schematics"`.

---

### GEN-2 · Nx generator: `@omnifex/ui-components:component`

- **User Story**: As a **UI contributor**, I want **a generator that creates a new Stencil component with css, spec, stories, and a11y test**, so that **new components are always consistent with design tokens and a11y baselines**.
- **Acceptance Criteria**
  - **Given** I run `nx g @omnifex/ui-components:component data-table`, **then** it creates:
    - `libs/ui-components/src/lib/data-table/data-table.tsx` (component skeleton using `@Prop`, `@Event`, `@Part`)
    - `data-table.css` importing only `var(--theme-*)` tokens
    - `data-table.spec.ts` (unit)
    - `data-table.e2e.ts` (Stencil e2e)
    - `data-table.stories.mdx` (Storybook story with controls)
    - `data-table.a11y.spec.ts` (axe-core check)
    - Adds export to `libs/ui-components/src/lib/components.ts`
  - **Given** the component exists, **when** I open it in Storybook on mobile viewport (360×640), **then** it renders without horizontal scroll.
- **Impact**: High · **Effort**: Low · **Priority**: **P0**
- **Technical Notes**: Validate `tag` starts with `omnifex-`. Enforce no hex colors via ESLint custom rule `no-hex-in-components`.

---

### GEN-3 · Nx generator: `@omnifex/workspace:feature-lib`

- **User Story**: As a **feature team**, I want **a generator that creates a feature library with correct tags and boundaries** (`type:feature`, `scope:<domain>`), so that **Nx can enforce architectural rules via `@nx/enforce-module-boundaries`**.
- **Acceptance Criteria**
  - **Given** I run `nx g @omnifex/workspace:feature-lib orders --scope=sales`, **then**:
    - Library created under `libs/sales/orders`
    - `project.json` has tags `type:feature`, `scope:sales`
    - `.eslintrc.json` updated with enforced boundaries: `type:feature → type:ui|type:util|type:data-access` only
- **Impact**: High · **Effort**: Low · **Priority**: **P0**
- **Technical Notes**: Prereq: GOV-1 (tag taxonomy). Ship with unit tests for lint rules.

---

### GEN-4 · Generator: add internal framework to an **existing** app

- **User Story**: As a **maintainer of a legacy app**, I want **a generator that injects `@omnifex/*` into an existing Angular/React app**, so that **gradual adoption is possible without a rewrite**.
- **Acceptance Criteria**
  - **Given** an existing `apps/legacy-app`, **when** I run `nx g @omnifex/workspace:adopt legacy-app`, **then** it:
    - Adds workspace deps to `package.json`
    - Injects `ThemeProvider`/`provideAuth` (framework-aware AST transform)
    - Adds `/callback` route only if missing
    - Writes a `MIGRATION.md` next to the app summarising changes & manual follow-ups
- **Impact**: Medium · **Effort**: Medium · **Priority**: **P1**
- **Technical Notes**: Use `ts-morph` or `@angular-devkit/schematics` AST utilities. Idempotent.

---

## 2. UI Components & Design System

### UI-0 · Formalise **design tokens** contract

- **User Story**: As a **design-system owner**, I want **design tokens defined in a framework-neutral JSON source with generated CSS/JS/Swift outputs**, so that **web, native, and Figma stay in sync**.
- **Acceptance Criteria**
  - **Given** `libs/styles/tokens.json` (reference: W3C Design Tokens draft), **when** I run `nx build styles`, **then** generated outputs include `tokens.css`, `tokens.ts` (typed), and `tokens.figma.json`.
  - **Given** a component uses a hex literal, **when** CI lints, **then** build fails with rule `no-hex-in-components`.
- **Mobile-first behaviour**: Tokens include `space`, `font-size`, `radius`, and `touch-target` scale with `clamp()` for fluid sizing across mobile → desktop.
- **Responsive behaviour**: Breakpoint tokens (`--bp-sm .. --bp-2xl`) exposed as CSS custom media.
- **A11y**: Color tokens ship with contrast-verified pairs (`--fg-on-primary`, `--fg-on-surface`). Motion tokens respect `prefers-reduced-motion`.
- **Cross-framework**: Exported as both CSS vars and typed TS objects consumed by Angular signals and React hooks.
- **Theming**: Replace current ad-hoc vars in `libs/styles/src/lib/theme.css` progressively.
- **Impact**: High · **Effort**: Medium · **Priority**: **P0**
- **Technical Notes**: Use `style-dictionary` or `@token-am/token-studio`. Publish outputs under `@omnifex/styles/tokens`.

---

### UI-1 · New component: `omnifex-input` (form field)

- **User Story**: As a **product developer**, I want **a themed, accessible text input with label, helper, error, and prefix/suffix slots**, so that **forms look and behave consistently**.
- **Acceptance Criteria**
  - **Given** the input is rendered at 360px, **then** the label, control, and error message stack vertically with 44×44px touch target on the control.
  - **Given** `aria-invalid="true"`, **then** the error message has `role="alert"` and is programmatically associated via `aria-describedby`.
- **Mobile-first**: `inputmode`, `autocomplete`, `autocapitalize` exposed as props; 16px font on iOS to prevent zoom; `:focus-visible` ring sized for touch.
- **Responsive**: At ≥md, label can switch to `labelPosition="start"` inline; at <md forced to `top`.
- **A11y**: Label ALWAYS present (visible or `sr-only`); supports `aria-required`, `aria-invalid`; error announced via `aria-live="polite"`.
- **Cross-framework**: Stencil web component + Angular `ControlValueAccessor` wrapper + React `forwardRef` wrapper with RHF adapter.
- **Theming**: Uses `--color-border`, `--color-border-hover`, `--color-border-focus`, `--color-danger`, `--radius-input`.
- **Impact**: High · **Effort**: Medium · **Priority**: **P0**

---

### UI-2 · New component: `omnifex-dialog` / `omnifex-sheet`

- **User Story**: As a **product developer**, I want **a modal that automatically becomes a bottom-sheet on small viewports**, so that **mobile UX feels native without a separate component**.
- **Acceptance Criteria**
  - **Given** viewport `<md`, **then** the dialog animates from the bottom, respects safe-area insets (`env(safe-area-inset-bottom)`), and drag-to-dismiss works.
  - **Given** viewport `≥md`, **then** it renders centered with backdrop.
  - **Given** the dialog opens, **then** focus moves to the first focusable element; Tab is trapped; `Escape` closes; prior focus is restored on close.
- **Mobile-first**: Implemented as bottom-sheet by default; centered variant is an opt-in at ≥md.
- **Responsive**: `@container` query preferred over viewport media for parent-driven layouts.
- **A11y**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`; inert siblings while open (`inert` attribute polyfilled).
- **Cross-framework**: Same public API; Angular wrapper exposes `open()`/`close()` service; React exposes `useDialog()` hook + `<Dialog>` component.
- **Theming**: `--dialog-radius`, `--dialog-surface`, `--scrim-color`.
- **Impact**: High · **Effort**: High · **Priority**: **P1**

---

### UI-3 · New component: `omnifex-toast` (notifications)

- **User Story**: As a **product developer**, I want **a non-blocking toast system with queueing and a11y announcements**, so that **feedback is consistent across apps**.
- **Acceptance Criteria**
  - **Given** I call `toast.success("Saved")`, **then** a toast appears within 100 ms, auto-dismisses in 5 s, and is announced via a visually hidden `aria-live="polite"` region.
  - **Given** `prefers-reduced-motion`, **then** animations are replaced by opacity fade only.
- **Mobile-first**: Positioned at bottom by default on `<md`, top-right on `≥md`; stacks vertically; swipe-to-dismiss on touch.
- **Responsive**: Max width 360px on mobile (full-width minus 16px gutters); 440px at ≥md.
- **A11y**: Non-focus-stealing; dismiss button labelled; keyboard `Esc` dismisses hovered/focused toast.
- **Cross-framework**: Stencil core + Angular `ToastService` + React `useToast` hook.
- **Theming**: Variant tokens `--toast-success-bg`, etc., derived from status palette.
- **Impact**: High · **Effort**: Medium · **Priority**: **P0**

---

### UI-4 · New component: `omnifex-nav-drawer` + `omnifex-app-shell`

- **User Story**: As a **product developer**, I want **an app-shell with a responsive navigation pattern** (bottom tab bar on mobile, side rail on tablet, full sidebar on desktop), so that **layout is solved once for every app**.
- **Acceptance Criteria**
  - **Given** viewport `<sm`, **then** a bottom tab bar shows up to 5 items with icons + labels, respecting safe-area-inset-bottom.
  - **Given** viewport `≥md && <xl`, **then** a collapsed side rail shows icons with tooltips.
  - **Given** viewport `≥xl`, **then** a full sidebar with labels is shown; user-togglable.
- **Mobile-first**: Tab bar is base; wider layouts override.
- **Responsive**: Powered by `@container` queries on the shell element.
- **A11y**: `nav[aria-label]`, current page `aria-current="page"`, skip-link to main content.
- **Cross-framework**: Angular `<omnifex-app-shell>` with named slots + React `<AppShell slots={...}>`.
- **Theming**: `--shell-surface`, `--shell-divider`, `--nav-active`.
- **Impact**: High · **Effort**: High · **Priority**: **P1**

---

### UI-5 · New component: `omnifex-data-table`

- **User Story**: As a **product developer**, I want **a data table that degrades to stacked cards on mobile**, so that **the same data component works on any viewport**.
- **Acceptance Criteria**
  - **Given** viewport `<md`, **then** each row renders as a card with key/value pairs; column priorities drive which fields are shown.
  - **Given** viewport `≥md`, **then** a traditional table renders with sortable headers and sticky first column.
  - **Given** 10k rows, **then** virtual scrolling keeps main thread <50 ms per frame (benchmark via Lighthouse trace).
- **Mobile-first**: Card view is the base; table view is progressive enhancement.
- **Responsive**: Column `priority` prop drives hide-order.
- **A11y**: Table uses `<caption>`; sortable headers expose `aria-sort`; cards expose semantic lists; keyboard navigation matches grid pattern when in table view.
- **Cross-framework**: Slot-driven cells; typed helpers in Angular (`ColumnDef<T>`) and React (`createColumnHelper<T>()`).
- **Theming**: `--row-hover`, `--row-selected`, `--header-surface`.
- **Impact**: High · **Effort**: High · **Priority**: **P1**

---

### UI-6 · New component: `omnifex-skeleton` + loading primitives

- **User Story**: As a **product developer**, I want **skeleton loaders that preserve layout and respect reduced-motion**, so that **perceived performance improves and CLS stays low**.
- **Acceptance Criteria**
  - **Given** a skeleton block replaces content of known size, **then** CLS contribution is 0 once real content arrives.
  - **Given** `prefers-reduced-motion: reduce`, **then** the shimmer animation is disabled.
- **Mobile-first**: Default sizes tuned for 360px content width.
- **Responsive**: Accepts `aspect-ratio` prop so it scales with container.
- **A11y**: `aria-busy="true"` on parent; announces “Loading …” once via `aria-live="polite"`.
- **Cross-framework**: Provided as `omnifex-skeleton` with variants (`text`, `circle`, `rect`).
- **Theming**: `--skeleton-base`, `--skeleton-highlight`.
- **Impact**: Medium · **Effort**: Low · **Priority**: **P0**

---

### UI-7 · New component: `omnifex-form` + schema-driven forms

- **User Story**: As a **product developer**, I want **a schema-driven form component using Zod**, so that **the same schema validates in Angular and React, with server parity**.
- **Acceptance Criteria**
  - **Given** a Zod schema, **when** I render `<omnifex-form schema={...}>`, **then** fields, validators, and error messages are generated; server-side parsing uses the same schema.
  - **Given** viewport `<md`, **then** fields stack with full-width controls; submit button pinned above keyboard on iOS (use `visualViewport` API).
- **Mobile-first**: Submit CTA always reachable; large touch targets.
- **Responsive**: `columns` prop (1 mobile → 2/3 desktop).
- **A11y**: Error summary region at form top on submit, focused programmatically.
- **Cross-framework**: Adapters for Angular Reactive Forms and React Hook Form.
- **Theming**: Inherits from UI-1 tokens.
- **Impact**: High · **Effort**: High · **Priority**: **P2**

---

### UI-8 · Audit & harden existing components + full regression strategy (button/card/header/footer/badge/theme-toggle)

- **User Story**: As a **design-system maintainer**, I want **existing `@omnifex/ui-components` re-audited for mobile-first, a11y, token usage, and locked against regressions by a layered test suite**, so that **they pass the same bar as new ones and never silently drift after merges**.

#### Acceptance Criteria

**A. Baseline compliance (audit)**
- **Given** each component (`button`, `badge`, `card`, `header`, `footer`, `theme-toggle`), **when** `nx run ui-components:test:a11y` runs, **then** axe-core reports **0 serious/critical** violations.
- **Given** each component's CSS, **when** the custom stylelint rule `omnifex/no-hex-in-components` runs, **then** it reports **0 hex literals** (`#rrggbb`, `#rgb`, `#rgba`); only `var(--theme-*)` / `var(--color-*)` tokens are allowed.
- **Given** `button`, `badge`, `card`, **when** rendered at `devicePixelRatio: 2` and viewport `360×640`, **then** each interactive element's bounding box is **≥ 44×44 CSS px** (verified via Playwright's `boundingBox()`).

**B. Visual regression (no pixel drift)**
- **Given** every component has at least one Storybook story per documented variant and state, **when** `nx run ui-components:test-storybook:visual` runs, **then** Playwright screenshots are compared at **360**, **768**, **1280** px widths in **light AND dark themes**, and diffs above `maxDiffPixelRatio: 0.002` fail the job.
- **Given** snapshots exist under `libs/ui-components/__screenshots__/<component>/<story>/<viewport>.<theme>.png`, **when** a PR intentionally changes visuals, **then** the developer runs `nx run ui-components:test-storybook:visual --update-snapshots` and commits the updated baselines.

**C. Responsive (mobile-first)**
- **Given** each component's stories, **when** rendered at `360` / `768` / `1280` px viewports, **then** there is **no horizontal scroll** on the story canvas (`scrollWidth <= clientWidth`) and no content is clipped (`scrollHeight` fits parent or scrolls intentionally via an explicit prop).
- **Given** each component, **when** its CSS is scanned, **then** there are **no `max-width:` media queries** (mobile-first rule); only `min-width:` or `@container` queries are permitted — enforced by stylelint rule `omnifex/mobile-first-media`.
- **Given** each component uses parent-driven layout, **when** placed inside a 320 px container, **then** it renders in its narrow layout (validated via `@container` query test story).

**D. Tokens only (no hardcoded values)**
- **Given** each component CSS file, **when** the lint suite runs, **then**:
  - No hex colors (`omnifex/no-hex-in-components`).
  - No raw `rgb(...)` / `hsl(...)` literals unless the value is itself `var(--...)`.
  - No magic pixel values for `font-size`, `spacing`, `radius`, `z-index` — must resolve to `var(--space-*)`, `var(--font-size-*)`, `var(--radius-*)`, `var(--z-*)` (custom rule `omnifex/tokens-only`).
  - No inline `style="..."` attributes referencing colors or sizes in component templates.
- **Given** Storybook is running, **when** the "Token coverage" addon reports computed styles, **then** ≥ 95 % of color/spacing/radius computed values trace back to a CSS custom property (fails under threshold).

**E. Cross-framework parity (Angular + React consumers)**
- **Given** each component is consumed by `apps/angular-app` and `apps/react-app` fixture pages, **when** Playwright runs `apps/*-e2e/tests/ui-components.spec.ts`, **then** identical visual snapshots and a11y results are produced in both apps (within the same tolerance as DS snapshots).
- **Given** a component's public API changes, **when** API Extractor runs (see GOV-2), **then** both Angular (`ControlValueAccessor`/input-signal) and React (`forwardRef`) adapters expose the same prop/event surface; diverging surfaces fail CI.

**F. Interaction testing (hover / focus / touch / keyboard)**
- **Given** each interactive component, **when** Storybook interaction tests run, **then**:
  - `:focus-visible` outline is visible and ≥ 2 px with ≥ 3:1 contrast.
  - `:hover` styles do **not** hide or reveal content (anti-pattern guard).
  - Keyboard: `Tab` reaches it, `Enter`/`Space` triggers the action, `Esc` dismisses where applicable.
  - Touch: `pointerType: 'touch'` events trigger the same behaviour as mouse clicks, with no reliance on `hover`.
- **Given** `prefers-reduced-motion: reduce`, **when** the component animates, **then** transitions collapse to opacity fade only (asserted via computed `animation-duration`).

**G. Governance
- **Given** any changed file under `libs/ui-components/**`, **when** CI runs, **then** all of the above checks are required; merge is blocked if any fails.

---

#### Test Strategy

> Layered pyramid: fast unit → component → visual → a11y → responsive → e2e. Every UI component ships all seven layers.

##### 1. Unit Tests

- **What**: Pure logic — prop validation, event emission, state machines (e.g. toggle state, open/close), token-to-computed-style mapping helpers, a11y prop derivation (`aria-*` props computed from inputs).
- **Tools**: **Jest** (via `@nx/jest`) for Stencil (using `@stencil/core/testing`'s `newSpecPage`); **Vitest** (via `@nx/vite`) for pure TS helpers if any.
- **Location**: `libs/ui-components/src/lib/<component>/<component>.spec.ts` (co-located, no separate `__tests__` folder).
- **Command**:
  ```bash
  nx test ui-components                          # all
  nx test ui-components --test-file=button.spec  # single
  nx affected -t test                            # only changed
  ```
- **Coverage budget**: `--coverage`, fail under `lines: 85, branches: 80` on changed files (enforced via `--coverage-reporters=json-summary` + `jest-coverage-badges` check in CI).

##### 2. Component Tests (Stencil e2e / Storybook play)

- **What**: Component rendered in a real browser; slot composition, CSS custom property inheritance, ARIA tree, event propagation. No network, no router.
- **Tools**: **Stencil e2e** (`*.e2e.ts`, Puppeteer under the hood) for raw Stencil contracts; **Storybook 8 `@storybook/test`** (`play` functions backed by Vitest + Testing Library) for documented user scenarios.
- **Location**:
  - Stencil e2e: `libs/ui-components/src/lib/<component>/<component>.e2e.ts`
  - Stories + play: `libs/ui-components/src/lib/<component>/<component>.stories.ts(x)`
- **Command**:
  ```bash
  nx run ui-components:test:e2e                  # Stencil e2e
  nx run ui-components:storybook                 # interactive
  nx run ui-components:test-storybook            # headless Storybook test runner
  ```

##### 3. Visual Regression Tests

- **What**: Pixel-diff every story at `360`/`768`/`1280` px in `light` + `dark` theme; catch unintended CSS drift.
- **Tools**: **Playwright** (`@playwright/test`) + **`@storybook/test-runner`** with the `--screenshot` hook; baselines checked into the repo. Optional layer: **Chromatic** for review UI (recommended once billing approved).
- **Location**:
  - Storybook config: `libs/ui-components/.storybook/` with `preview.ts` exposing `globalTypes: { theme }` and `parameters: { viewport: { viewports: { mobile: ..., tablet: ..., desktop: ... } } }`.
  - Baselines: `libs/ui-components/__screenshots__/<component>/<story>/<viewport>.<theme>.png` (checked in, **LFS-tracked** if > 100 KB each).
  - Runner config: `libs/ui-components/test-runner.ts` implements `postVisit` capturing a screenshot per viewport × theme.
- **Command**:
  ```bash
  nx run ui-components:test-storybook:visual                      # diff against baselines
  nx run ui-components:test-storybook:visual --update-snapshots   # re-baseline intentional changes
  ```
- **Diff threshold**: `expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.002, animations: 'disabled', caret: 'hide' })`.

##### 4. Accessibility Tests (axe-core)

- **What**: WCAG 2.2 AA violations on every story + every app route that consumes the component.
- **Tools**: **`@storybook/addon-a11y`** (interactive), **`@storybook/test-runner` a11y hook** (CI), **`@axe-core/playwright`** (app routes).
- **Location**:
  - Story-level: addon runs on every story automatically.
  - App-level: `apps/angular-app-e2e/tests/a11y.spec.ts`, `apps/react-app-e2e/tests/a11y.spec.ts`.
- **Command**:
  ```bash
  nx run ui-components:test-storybook:a11y
  nx run angular-app-e2e:e2e --grep=@a11y
  nx run react-app-e2e:e2e --grep=@a11y
  ```
- **Blocking rule**: fail on any violation with `impact === 'serious' || 'critical'`. "Moderate" and "minor" post a PR comment but do not block.

##### 5. Responsive Tests (breakpoints)

- **What**: Mobile-first layout sanity (no horizontal scroll, touch target sizes, narrow-container rendering, font sizing respects tokens at each breakpoint).
- **Tools**: **Playwright** via Storybook test runner, running each story at the viewport ladder. Custom assertion helpers in `libs/ui-components/testing/responsive.ts`:
  - `assertNoHorizontalScroll(page)`
  - `assertTouchTargetSize(locator, { min: 44 })`
  - `assertNarrowContainerRenders(component, { width: 320 })`
- **Location**: `libs/ui-components/src/lib/<component>/<component>.responsive.spec.ts`.
- **Command**:
  ```bash
  nx run ui-components:test-storybook:responsive
  ```

##### 6. E2E Tests (real apps consuming the components)

- **What**: Smoke flows that prove components still work inside both framework adapters (clicks land, forms submit, theme switch propagates, auth callback renders).
- **Tools**: **Playwright** (already configured in `apps/*-e2e`), split into projects: `chromium-desktop`, `webkit-mobile` (iPhone 13), `chromium-mobile` (Pixel 7).
- **Location**: `apps/angular-app-e2e/tests/ui-components.spec.ts`, `apps/react-app-e2e/tests/ui-components.spec.ts`.
- **Command**:
  ```bash
  nx run angular-app-e2e:e2e --project=chromium-mobile
  nx run react-app-e2e:e2e   --project=webkit-mobile
  nx affected -t e2e
  ```

##### 7. Lint / static checks (token + mobile-first rules)

- **What**: Prevent regressions at author time, before any test runs.
- **Tools**: **Stylelint** with custom plugin `tools/stylelint-plugin-omnifex/`:
  - `omnifex/no-hex-in-components`
  - `omnifex/tokens-only`
  - `omnifex/mobile-first-media` (rejects `max-width:` media queries)
  - `omnifex/no-hover-only-affordance` (rejects rules that toggle `display` inside `:hover`)
- **Location**: rule sources under `tools/stylelint-plugin-omnifex/`; wired in `.stylelintrc.json` at monorepo root; scoped to `libs/ui-components/**/*.css`.
- **Command**:
  ```bash
  nx lint ui-components
  nx affected -t lint
  ```

---

#### CI Requirements

**Required jobs on PRs touching `libs/ui-components/**` or `libs/styles/**` or `apps/**`** (orchestrated via `nx affected`):

| Job | Command | Blocking? |
|---|---|---|
| `lint` | `nx affected -t lint` | yes |
| `unit` | `nx affected -t test --configuration=ci` | yes |
| `component` | `nx run ui-components:test:e2e` | yes |
| `a11y` | `nx run ui-components:test-storybook:a11y` | yes (serious/critical) |
| `visual` | `nx run ui-components:test-storybook:visual` | yes (diff > threshold) |
| `responsive` | `nx run ui-components:test-storybook:responsive` | yes |
| `e2e-mobile` | `nx affected -t e2e --project=chromium-mobile` | yes |
| `e2e-desktop` | `nx affected -t e2e --project=chromium-desktop` | yes |
| `api-review` | `nx run ui-components:api-extractor` (see GOV-2) | yes |

**Blocking conditions** (any one fails the PR):
1. Any lint violation on changed files.
2. Unit coverage regresses below `lines: 85` or `branches: 80` on changed files.
3. Any axe-core `serious`/`critical` violation.
4. Any Playwright visual diff with `maxDiffPixelRatio > 0.002`.
5. Any horizontal scroll detected at `360/768/1280` px.
6. Any touch target < 44×44 CSS px on `button`/`badge`/`card`.
7. Missing API Extractor review file for exported-symbol changes.

**Cross-platform compatibility**
- CI matrix: `ubuntu-latest`, `macos-latest`, `windows-latest` (at least for `lint` + `unit`; visual/e2e run on `ubuntu-latest` only to stabilise fonts — snapshots are Linux-normalised).
- Font consistency: Playwright uses `--ignore-default-args=--font-render-hinting=none` and a pinned Docker image (`mcr.microsoft.com/playwright:v1.47.0-jammy`) to avoid Windows/macOS subpixel drift.
- Line endings: `.gitattributes` enforces `* text=auto eol=lf` for CSS/TS; PNG snapshots are `binary`.
- Path separators: all scripts use Node `path.join` / Nx targets, never hard-coded `/`.
- Shell scripts under `tools/scripts/` must run via `bash` in CI; Windows contributors use Git Bash or WSL — documented in `CONTRIBUTING.md`.

---

#### Regression Prevention Rules

Developers updating **any** component in `libs/ui-components/**` MUST follow these rules. They are enforced either by lint, tests, or PR checklist (and automated where possible).

1. **Mobile-first only.** Base styles target `<360 px`; larger layouts use `min-width` or `@container`. `max-width:` media queries are forbidden.
2. **Tokens only.** No hex, no raw `rgb()`/`hsl()`, no magic pixel values for spacing/radius/z-index. Only `var(--*)` from `@omnifex/styles`.
3. **One story per variant and per state.** Default, hover, focus, active, disabled, loading, error. Visual regression cannot protect what has no story.
4. **Touch target ≥ 44×44 CSS px** for any `role="button"`, `a`, `input`, `select`, or custom interactive element.
5. **Semantic HTML first.** Build on top of `<button>`, `<dialog>`, `<nav>`, etc. Only fall back to ARIA when no native element fits. Never use `div` for actions.
6. **No hover-only affordances.** If an action is revealed on `:hover`, it MUST also be reachable via `:focus-visible` and on touch (long-press or explicit button).
7. **Keyboard parity.** Every mouse/touch interaction must have a keyboard equivalent. Focus must never be trapped except in explicit modal contexts.
8. **Respect `prefers-reduced-motion` and `prefers-contrast`.** Transitions > 150 ms or colour-critical visuals must have a reduced variant.
9. **Cross-framework parity.** A change to props/events/slots requires updating both Angular and React adapters in the same PR; API Extractor must pass.
10. **Intentional visual changes are re-baselined in the same PR.** Commit updated `__screenshots__/` with a PR description paragraph explaining the visual intent.
11. **No new public prop without a story and a unit test.** Enforced by PR template checklist.
12. **No CSS `!important`** inside `libs/ui-components/**` (use specificity or token hierarchy). Existing `!important` must be removed in the audit.
13. **No direct DOM styling in TS** (`el.style.background = ...`). Use class toggles + tokens.
14. **Inline `style="..."` attributes are forbidden** in component templates, except for dynamic layout math that cannot be expressed as a token.

---

#### Definition of Done (DoD)

A component is **DONE** when **all** of the following are true and captured in a single PR:

- [ ] Component has **stories for every variant and state** (default/hover/focus/active/disabled/loading/error).
- [ ] **Unit tests** at ≥ 85 % line / 80 % branch coverage for changed files.
- [ ] **Stencil e2e tests** cover public contract (props, events, slots).
- [ ] **Storybook interaction tests** (`play` functions) cover primary user flows.
- [ ] **Visual baselines** exist at `360/768/1280` px in `light` + `dark` themes; diff under threshold.
- [ ] **axe-core** shows 0 serious/critical violations on every story.
- [ ] **Responsive assertions** pass: no horizontal scroll, 44×44 touch targets, narrow-container layout.
- [ ] **Tokens only**: lint passes `omnifex/no-hex-in-components`, `omnifex/tokens-only`, `omnifex/mobile-first-media`, `omnifex/no-hover-only-affordance`.
- [ ] **Angular + React adapters** updated; API Extractor review file regenerated with no unexpected changes.
- [ ] **Cross-framework e2e** green in both `apps/angular-app-e2e` and `apps/react-app-e2e` on `chromium-desktop` and `webkit-mobile`.
- [ ] **Keyboard, touch, and screen-reader** flows manually verified once (checked in PR description) and covered by at least one automated test.
- [ ] **Reduced motion & high contrast** variants verified.
- [ ] **Docs**: Storybook MDX autodocs render; `<ComponentName>.md` (or Storybook Notes) lists props, events, slots, a11y contract, tokens used.
- [ ] **Changeset** added (`pnpm changeset`) with correct semver bump and a user-facing changelog line.
- [ ] **No new `!important`**, no new hex, no new `max-width:` media query.
- [ ] **PR passes all CI blocking jobs** listed above on Ubuntu, macOS, Windows (lint/unit) and Ubuntu (visual/e2e).

- **Impact**: High (raises the floor for every consumer app and every future component) · **Effort**: Medium–High (one-off harness + per-component audit) · **Priority**: **P0**
- **Technical Notes**:
  - Depends on **UI-0** (token pipeline), **QA-1** (axe in CI), **QA-2** (visual regression), **QA-3** (perf budgets), **GOV-2** (API Extractor).
  - New packages to add: `@storybook/test-runner`, `@storybook/addon-a11y`, `@axe-core/playwright`, `stylelint`, `stylelint-config-standard`, `playwright`, plus the custom `tools/stylelint-plugin-omnifex/` workspace package.
  - New Nx targets to register in `libs/ui-components/project.json`: `storybook`, `test-storybook`, `test-storybook:a11y`, `test-storybook:visual`, `test-storybook:responsive`, `test:e2e`, `api-extractor`.
  - Ship the audit as a **tracking issue** with a sub-task per existing component (`button`, `badge`, `card`, `header`, `footer`, `theme-toggle`); close when every sub-task hits DoD.

---

## 3. Documentation & Discoverability

### DOC-1 · Storybook (mono for all components)

- **User Story**: As a **product developer**, I want **a single Storybook that documents every `@omnifex/ui-components` component with live props, themes, and viewports**, so that **I can discover and try components without reading source**.
- **Acceptance Criteria**
  - **Given** `nx run ui-components:storybook`, **then** Storybook 8 boots with:
    - A viewport addon preset for our breakpoint ladder (UI-0)
    - A theme toggle addon (light/dark/system) wired to `@omnifex/styles`
    - Autodocs on
    - `@storybook/addon-a11y` enabled (fails CI on serious/critical)
  - **Given** a component has stories, **when** CI runs, **then** Chromatic or Playwright visual diffs are executed.
- **Impact**: High · **Effort**: Medium · **Priority**: **P0**
- **Technical Notes**: Use `@storybook/web-components-vite` for Stencil; publish static build to GitHub Pages on `main`.

---

### DOC-2 · Living documentation site (`docs.omnifex`)

- **User Story**: As a **new hire**, I want **a single documentation site combining architecture, ADRs, guides, and API references**, so that **I stop hunting across repos and Markdown folders**.
- **Acceptance Criteria**
  - **Given** `nx build docs`, **then** a static site (Astro Starlight or Docusaurus) is produced containing:
    - Existing `/docs/*.md`
    - Auto-generated API references from TypeDoc for `@omnifex/*`
    - Storybook embedded as an iframe section
    - Versioned docs per release
  - **Given** a PR changes a public API, **when** CI runs, **then** docs rebuild and PR preview URL is posted as a comment.
- **Impact**: High · **Effort**: Medium · **Priority**: **P1**
- **Technical Notes**: Good candidate: `starlight` + `@astrojs/starlight-typedoc`.

---

### DOC-3 · ADR process (`/docs/adr/NNNN-*.md`)

- **User Story**: As an **architect**, I want **Architecture Decision Records captured in the repo**, so that **the rationale behind framework choices is preserved**.
- **Acceptance Criteria**
  - **Given** a significant architecture change, **then** an ADR is required in the PR (enforced via PR template checkbox and `dangerjs` rule).
- **Impact**: Medium · **Effort**: Low · **Priority**: **P1**
- **Technical Notes**: Start with MADR template. Seed with ADRs for: framework-agnostic core, Stencil choice, Tailwind v4, pnpm workspaces.

---

## 4. AI & Developer Assistance

### AI-1 · MCP server for Storybook (component querying)

- **User Story**: As a **developer using an AI assistant**, I want **an MCP server exposing our Storybook catalog**, so that **the assistant can answer “which omnifex component fits X?” with concrete props, code snippets, and a11y notes**.
- **Acceptance Criteria**
  - **Given** the MCP server runs, **when** an assistant calls `tools/list`, **then** tools are exposed:
    - `search_components(query, framework)` → list of matches
    - `get_component(tag)` → props, slots, events, a11y notes
    - `get_example(tag, framework)` → idiomatic usage snippet
  - **Given** the server is configured in Cursor/Claude Desktop, **then** I can ask “give me an Angular login form using @omnifex/ui-components” and get a compiling snippet.
- **Impact**: High · **Effort**: Medium · **Priority**: **P1**
- **Technical Notes**: Generate the index from Storybook’s `stories.json` + Stencil `docs.json` (`outputTargets: 'docs-json'`). Implement with `@modelcontextprotocol/sdk`. Host under `tools/mcp/storybook`.

---

### AI-2 · MCP server for documentation (API + guides)

- **User Story**: As a **developer**, I want **an MCP server that indexes `/docs` and TypeDoc output**, so that **AI assistants answer API questions with citations to our own docs, not outdated web results**.
- **Acceptance Criteria**
  - **Given** the server is running, **then** tools `search_docs(query)` and `get_doc(path)` return Markdown with source paths.
  - **Given** a question like “how do I add auth to an Angular app”, **then** the answer cites `docs/identity-and-auth.md` with the snippet used.
- **Impact**: High · **Effort**: Low · **Priority**: **P0**
- **Technical Notes**: Simple embedding index (e.g. `@lancedb/lancedb` or even ripgrep-based) + MCP wrapper. Ship config for Cursor in `.cursor/mcp.json`.

---

### AI-3 · AI adoption toolkit (`.cursor/rules`, Copilot instructions, prompt library)

- **User Story**: As a **developer**, I want **curated AI rules and prompt snippets checked into the repo**, so that **AI assistants follow our architectural constraints (framework-agnostic core, token usage, mobile-first) out of the box**.
- **Acceptance Criteria**
  - **Given** the repo is cloned, **then** `.cursor/rules/` contains: `no-framework-in-core.mdc`, `mobile-first.mdc`, `design-tokens-only.mdc`, and others — each with examples.
  - **Given** Copilot is used, **then** `.github/copilot-instructions.md` contains the same rules.
- **Impact**: Medium · **Effort**: Low · **Priority**: **P0**

---

## 5. DevOps & Environment

### OPS-1 · Dockerize apps (Angular + React) + generated apps

- **User Story**: As a **platform engineer**, I want **production Dockerfiles for Angular and React apps, including future generated apps**, so that **we can deploy consistently to Kubernetes/Cloud Run**.
- **Acceptance Criteria**
  - **Given** `nx container angular-app` runs, **then** a multi-stage image is built using `pnpm` deploy + NGINX, image size <70 MB.
  - **Given** a new app is scaffolded via GEN-1, **then** a Dockerfile is generated by default.
  - **Given** the image starts, **then** it exposes port 8080, serves SPA with proper `try_files` fallback, and respects `PORT` env var.
- **Impact**: High · **Effort**: Medium · **Priority**: **P0**
- **Technical Notes**: Use `@nx-tools/nx-container` or bespoke target. Base images: `node:20-alpine` (build), `nginxinc/nginx-unprivileged:alpine-slim` (runtime). Add Trivy scan in CI.

---

### OPS-2 · Dockerize Duende identity server + local Compose

- **User Story**: As a **developer**, I want **`docker compose up` to start identity server + optional apps**, so that **onboarding takes minutes, not hours**.
- **Acceptance Criteria**
  - **Given** a fresh clone, **when** I run `docker compose up`, **then** identity server is reachable on `https://localhost:5002` with a trusted dev cert (using `mkcert` step in README) and SQLite seeded.
  - **Given** I pass `--profile apps`, **then** `angular-app` and `react-app` containers also start.
- **Impact**: High · **Effort**: Medium · **Priority**: **P0**

---

### OPS-3 · Preview environments per PR

- **User Story**: As a **reviewer**, I want **per-PR preview URLs for the Angular app, React app, and Storybook**, so that **I can review UX changes without checking out the branch**.
- **Acceptance Criteria**
  - **Given** a PR is opened, **then** a bot comments with 3 URLs that stay alive until the PR closes.
  - **Given** the PR is closed/merged, **then** the environments are torn down.
- **Impact**: High · **Effort**: Medium · **Priority**: **P1**
- **Technical Notes**: Candidates: Vercel (easy), Cloudflare Pages, or self-hosted (k3s + argo).

---

### OPS-4 · Release automation (changesets → npm + changelog)

- **User Story**: As a **library owner**, I want **semver-driven releases of `@omnifex/*` triggered by changesets on merge to main**, so that **consumers get reliable, documented versions**.
- **Acceptance Criteria**
  - **Given** a PR adds a changeset file, **when** it’s merged, **then** a “Version Packages” PR is opened; merging it publishes to npm/GitHub Packages and tags the repo.
- **Impact**: Medium · **Effort**: Low · **Priority**: **P1**
- **Technical Notes**: `.changeset/` already exists; integrate `changesets/action` in `.github/workflows/publish.yml`. Configure `fixed: ['@omnifex/*']` so adapters and core move in lockstep (or not — decide via ADR).

---

## 6. Testing & Quality

### QA-1 · Automated accessibility testing in CI

- **User Story**: As a **design-system owner**, I want **axe-core running against every Storybook story and every app route in CI**, so that **a11y regressions never ship**.
- **Acceptance Criteria**
  - **Given** a Storybook story, **when** CI runs `@storybook/test-runner` with the a11y hook, **then** serious/critical violations fail the job.
  - **Given** each app, **then** `@axe-core/playwright` runs against top 10 routes.
- **Impact**: High · **Effort**: Low · **Priority**: **P0**

---

### QA-2 · Visual regression testing (mobile + desktop viewports)

- **User Story**: As a **UI contributor**, I want **pixel-diff tests for each component in both 360px and 1280px viewports**, so that **unintended visual changes are caught**.
- **Acceptance Criteria**
  - **Given** a PR changes UI, **then** Chromatic (or Playwright snapshots) show visual diffs on both viewports, blocking if over the configured threshold.
- **Impact**: High · **Effort**: Medium · **Priority**: **P1**

---

### QA-3 · Performance budgets (LCP / CLS / TBT)

- **User Story**: As a **performance steward**, I want **Lighthouse CI budgets enforced per app**, so that **bundle and perf regressions fail the pipeline**.
- **Acceptance Criteria**
  - **Given** a PR, **then** `@lhci/cli` runs against app preview URLs and fails if:
    - LCP (mobile, 4× CPU throttle) > 2.5 s
    - CLS > 0.05
    - TBT > 200 ms
    - Total JS > 300 KB gz per app
- **Impact**: High · **Effort**: Medium · **Priority**: **P1**

---

## 7. Architecture & Governance

### GOV-1 · Module-boundary tag taxonomy

- **User Story**: As an **architect**, I want **Nx tags for `type:*` and `scope:*` with enforced boundaries via ESLint**, so that **teams cannot create circular or cross-scope dependencies**.
- **Acceptance Criteria**
  - **Given** `@nx/enforce-module-boundaries` is configured, **then** violations fail `nx lint`.
  - **Given** a feature lib tagged `scope:sales`, **then** it cannot import from `scope:hr`.
- **Impact**: High · **Effort**: Low · **Priority**: **P0**
- **Technical Notes**: Tag taxonomy (seed): `type:core | type:adapter | type:feature | type:ui | type:util | type:data-access | type:e2e`, `scope:public | scope:<domain>`.

---

### GOV-2 · Public-API contracts + API Extractor

- **User Story**: As a **library consumer**, I want **stable, documented public APIs for `@omnifex/*`**, so that **breaking changes are detected at PR time**.
- **Acceptance Criteria**
  - **Given** a change to an exported symbol, **when** CI runs `api-extractor run`, **then** a review file is updated in the PR; missing review file fails the build.
- **Impact**: Medium · **Effort**: Medium · **Priority**: **P1**

---

### GOV-3 · Contribution guidelines & code owners

- **User Story**: As a **new contributor**, I want **`CONTRIBUTING.md`, `CODEOWNERS`, PR template, issue templates, and a tier-1 support rota**, so that **I know how to contribute and who to ping**.
- **Acceptance Criteria**
  - **Given** I open a PR, **then** reviewers are auto-requested based on `CODEOWNERS`.
  - **Given** I open an issue, **then** a templated form appears (`bug_report.yml`, `feature_request.yml`, `ui-component.yml`).
- **Impact**: Medium · **Effort**: Low · **Priority**: **P1**

---

## 🚀 Missing Opportunities & Strategic Improvements

> Items **not** in the brief but critical for scaling.

- **Internationalisation (i18n) baseline.** Ship `@omnifex/i18n` with ICU message format + runtime loader + generator for adding a locale. Without this, every app invents its own → fragmentation.
- **Telemetry baseline (`@omnifex/telemetry`).** Wrap OpenTelemetry web; expose `track(event, props)` and automatic route/web-vitals beacons. Ensures consistent product analytics without vendor lock-in.
- **Feature flags (`@omnifex/flags`).** Provider-agnostic interface (OpenFeature). Prevents branch-based toggling hacks.
- **Headless / “bring your own styles” mode for UI primitives.** Provide behaviour-only primitives (à la Radix/Ark UI) so teams can theme beyond tokens while keeping a11y semantics.
- **Native mobile strategy.** Since Stencil is already framework-agnostic, add a Capacitor wrapper as `apps/mobile-shell` to prove “mobile-first” is more than marketing. Stories and tests validate touch gestures.
- **BFF / API client codegen.** If identity already assumes a backend, offer `@omnifex/api` with OpenAPI-driven client generation + shared auth fetcher (Angular `HttpClient` + React `fetch`/`tanstack-query`).
- **Error boundaries & unified error reporting.** React has it; Angular needs the parallel pattern with `ErrorHandler`; both feeding `@omnifex/telemetry`.
- **Secrets & config policy.** `@omnifex/config` contract (runtime env loader) instead of hard-coding `authority`/`clientId` in `app.config.ts` or `authConfig.ts`.
- **Bundle-size dashboard.** Track per-package size over time (`size-limit` or `bundlewatch`), publish to docs.
- **Governed upgrade cadence.** `renovate.json` with grouping rules (Angular together, React together, Stencil alone) + scheduled CI to test upgrades.
- **SSR strategy decision.** Today both apps are CSR. Even an ADR capturing “we chose CSR because X” is valuable; otherwise SSR will be attempted ad-hoc per team.
- **Security baseline.** CSP header policy published, CSRF guidance for token flows, Dependabot + CodeQL workflows, secret scanning enabled.
- **Print & email stylesheets.** Often ignored; tokens should have a `print` channel so audit/invoice pages degrade well.

---

## ⚠️ Risks & Anti-Patterns to Avoid

- **Desktop-first styling** (writing `@media (max-width: ...)` everywhere). Enforce `min-width` only via lint rule `stylelint-plugin-mobile-first` or a custom stylelint rule.
- **Viewport-only media queries.** Prefer **container queries** so a component dropped inside a narrow column still renders its narrow layout.
- **Hover-only affordances.** Any action reachable only via `:hover` fails on touch; lint for `:hover { display: ... }` patterns that hide/show UI.
- **Non-responsive components shipped to `@omnifex/ui-components`.** Block via Storybook viewport tests + visual regression at both 360 & 1280.
- **Tight coupling to Angular/React inside `@omnifex/identity` or `@omnifex/styles`.** `no-framework-in-core` ESLint rule should forbid `@angular/*` and `react*` imports there.
- **Duplicated theme definitions across apps.** Currently `apps/react-app/src/index.css` and `apps/angular-app/src/theme-overrides.scss` both restate theme vars. Consolidate to a single token source (UI-0).
- **Hex literals in component CSS.** Already happening; make it a CI error.
- **“Works on my branch” reviews** due to no preview URLs. OPS-3 fixes this.
- **No release train.** Manual publishing quickly diverges versions. OPS-4 fixes this.
- **Dependency drift** between `apps/react-app/package.json` (e.g. `react ^18.2.0`) and root `pnpm.overrides` (`18.2.0`) — pin via single source of truth.
- **Poor DX for adoption**: treating the monorepo as a closed shop. Mitigate with GEN-1/4, DOC-1/2, AI-1/2/3.

---

## Execution order (recommended)

1. **P0 foundations**: UI-0 (tokens), GOV-1 (boundaries), QA-1 (a11y), DOC-1 (Storybook), GEN-1/2/3 (generators), OPS-1/2 (Docker), AI-2/3 (docs MCP + AI rules).
2. **P1 step-up**: UI-2/4/5, DOC-2/3, AI-1, OPS-3/4, QA-2/3, GOV-2/3.
3. **P2 opportunistic**: UI-7, native shell, telemetry, feature flags.
