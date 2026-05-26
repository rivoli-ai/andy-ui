# Skill: Andy UI Component Development

**Type:** Reusable AI skill · **Scope:** `@omnifex/ui-components` and Figma-driven design-system work  
**Optimized for:** Cursor Auto · Deterministic execution · Scalable governance

**Governance — do not duplicate here:**
- [`/docs/standards/figma-integration.md`](../../standards/figma-integration.md) — Figma MCP, tokens, DoD, anti-patterns
- [`/docs/standards/component-verification.md`](../../standards/component-verification.md) — verify commands, publishable tier
- [`/docs/standards/ui-components-qa.md`](../../standards/ui-components-qa.md) — stylelint rules
- [`/.cursor/rules.md`](../../../.cursor/rules.md) — doc review order

---

## Overview

This skill teaches AI agents how to consistently implement, audit, test, and document UI components in the Andy UI Nx monorepo. It encodes the mandatory architecture, design-system, and workflow constraints so every AI session produces the same quality outcome.

**Use this skill when:**
- Implementing a new Stencil component from Figma
- Auditing an existing component for responsiveness, tokens, or accessibility
- Generating Storybook stories aligned with Figma
- Generating unit tests and Playwright e2e coverage
- Verifying token usage across `libs/ui-components`

---

## Skill Responsibilities

| Responsibility | Owner |
|----------------|-------|
| Read all relevant docs before touching code | AI agent |
| Analyze Figma via MCP before implementing | AI agent |
| Map Figma values → `libs/styles` tokens | AI agent |
| Implement mobile-first, accessible, token-driven components | AI agent |
| Run verification commands and report exit codes | AI agent |
| Update docs in the same session as code changes | AI agent |
| Stop and report on architectural conflicts | AI agent |
| Confirm DoD before declaring a task complete | AI agent |

---

## Repository Context

```
apps/
  angular-app/          # Angular 17+, consumes @omnifex/ui-components via CUSTOM_ELEMENTS_SCHEMA
  react-app/            # React 18+, consumes web components via JSX types
libs/
  ui-components/        # Stencil web components — SHARED cross-framework UI lives here
  styles/               # Token primitives (theme.css, typography.css, spacing.css, radius.css, stroke.css)
  identity/             # Auth core (no framework deps)
  identity-angular/     # Angular adapter
  identity-react/       # React adapter
tools/
  scripts/              # verify-ui-component.mjs, audit-ui-components.mjs, publish-ui-components.mjs
  stylelint-plugin-omnifex/  # custom CSS rules
```

**Figma file:** Andy UI — Design System  
**File key:** `TcEuJHlNPkME9br19X1Qhx`  
**MCP server:** `user-Figma` (enabled in Cursor)

---

## Documentation Priority Order

Read in this order before implementing:

1. `/docs/ai-context/**` — repository constraints, AI rules, prompt templates
2. `/docs/architecture/**` — package boundaries, dependency rules, build strategy
3. `/docs/standards/**` — Figma integration, UI standards, a11y, testing
4. `/docs/roadmap/**` — planned features and constraints
5. `/README.md` — setup, onboarding

**If documentation conflicts with code:** stop → report the inconsistency → propose smallest safe resolution → do not guess.

---

## Architecture Constraints

### Layer rules (hard — never violate)

| Layer | Packages | Forbidden imports |
|-------|----------|-------------------|
| Core | `ui-components`, `styles`, `identity` | Angular, React, framework adapters |
| Adapters | `identity-angular`, `identity-react`, `styles-angular`, `styles-react` | Sibling adapters |
| Apps | `angular-app`, `react-app` | Cross-app imports |

### Component placement

| Decision | Placement |
|----------|-----------|
| Used by both Angular and React | `libs/ui-components` (Stencil) |
| Angular-only UI | `apps/angular-app` component |
| React-only UI | `apps/react-app` component |
| Token primitive (hex value) | `libs/styles/src/lib/*.css` only |
| Semantic token (component color role) | `libs/styles/src/lib/<component>.css` |

### Stencil conventions

- Tag name: `andy-ui-<component>` (kebab-case)
- Shadow DOM: `shadow: true` on all published components
- Props: `@Prop({ reflect: true })` for variant, appearance, size, disabled, fullWidth
- `part="button"` (or similar) for host-level CSS customisation
- Events: `bubbles: true, composed: true`
- CSS entry: `styleUrl: '<component>.css'`

---

## UI & Design-System Rules

### Token hierarchy

```
libs/styles/src/lib/
  theme.css          ← primitives (--color-primary-*) + semantic (--theme-*); ONLY file with hex
  typography.css     ← --font-h*-size, --font-b*-size, --font-weight-*
  spacing.css        ← --space-0…--space-10, --space-gap-*, --space-padding-*, --space-touch-min
  radius.css         ← --radius-1…--radius-full, --radius-button, --radius-card, etc.
  stroke.css         ← --stroke-border, --stroke-focus, --stroke-emphasis
  button.css         ← --button-* semantic tokens (example component token file)
  icon-button.css    ← --icon-button-* semantic tokens
```

### CSS rules (enforced by `omnifex` stylelint plugin)

| Rule | Plugin | Result if violated |
|------|--------|--------------------|
| No `#hex` in `libs/ui-components/**/*.css` | `omnifex/no-hex-in-components` | stylelint error |
| No raw `rgb()` / `hsl()` | `omnifex/no-hex-in-components` | stylelint error |
| No `@media (max-width:…)` without `min-width:` | `omnifex/mobile-first-media` | stylelint error |
| No hover-only affordances | `omnifex/no-hover-only-affordance` | stylelint error |
| Raw `px` / `font-size` without token | `omnifex/tokens-only` | warning / error |

### Token mapping rules

- Figma px → rem: `rem = px / 16` (root is 16px)
- **Snap rule:** within 2px of a scale step → use that token; further → add token to `libs/styles`
- Typography: always set `font-size`, `line-height`, and `font-weight` from the same token set
- Component CSS must not contain `#`, `rgb()`, or `hsl()` — all color via `var(--theme-*)` or `var(--button-*)` etc.
- Shadows: `var(--shadow-*)` only; no raw `box-shadow` values in components

---

## Responsive & Accessibility Rules

### Mobile-first (mandatory)

- Base styles target 360px width minimum
- Enhancements use `@media (min-width: …)` only — `max-width`-only queries are **forbidden**
- Never add fixed widths to layouts; use `max-width: 100%`, `min-height`, `clamp()`
- Minimum touch target: **44×44 CSS px** via `--space-touch-min` / padding tokens

### Breakpoints

| Name | min-width | Use |
|------|-----------|-----|
| base | 0 | Mobile default |
| sm | 640px | Compact adjustments |
| md | 768px | Tablet, two-column |
| lg | 1024px | Desktop, three-column |
| xl | 1280px | Max content width |

### Accessibility (non-negotiable)

- Semantic HTML: `<button>` for actions, `<a>` for navigation — no `<div onClick>`
- `:focus-visible` must share same affordance as `:hover` (not hover-only)
- Icon-only controls: `aria-label` required (or derived from `name` prop for `andy-ui-icon`)
- WCAG 2.2 AA: axe serious/critical = 0 in Playwright `e2e:a11y`
- Light/dark: use `[data-theme='dark']` selector; do not duplicate palettes per component

---

## Figma MCP Workflow

### Call order (mandatory)

```
1. get_metadata(nodeId, fileKey)
   → confirm node type; if decorative child with no variables, call on PARENT frame

2. get_variable_defs(nodeId, fileKey)
   → extract token values from the scale frame, not gradient/swatch children

3. get_design_context(nodeId, fileKey)
   → visual reference + reference code for a REPRESENTATIVE symbol
   → for large component sets (>20 variants): call on sub-symbols, not the full matrix
```

**Always set:** `clientLanguages: "typescript,css"` · `clientFrameworks: "angular,react"`

### Figma → code rules

- MCP output = **design intent reference** — never paste Figma-generated CSS/Tailwind into the repo
- Map all px values to existing `libs/styles` tokens; if no match → add to `libs/styles`, never hardcode
- Figma fixed-width artboard ≠ component width — implement fluid, token-driven layouts
- Colors in Figma → semantic `--theme-*` or component `--button-*` tokens; never copy hex

### Key Figma node IDs (Andy UI Design System)

| Scale | Node ID |
|-------|---------|
| Colors | `1:7336` |
| Typography | `1:8246` |
| Spacing | `1:8356` |
| Radius | `1:8750` |
| Stroke | `1:8917` |
| Button component set | `14:4` |
| Icon button set | `15:386` / component set `19:1458` |

---

## Testing & Verification Workflow

### Verification sequence (always run in order)

```bash
# 1. CSS token and mobile-first rules
corepack pnpm nx run @omnifex/ui-components:stylelint

# 2. Unit tests (Jest + @stencil/core/testing)
corepack pnpm nx run @omnifex/ui-components:test

# 3. Stencil build + publish layout
corepack pnpm nx run @omnifex/ui-components:build

# 4. All-in-one (runs 1–3 + static checks for all components)
corepack pnpm nx run @omnifex/ui-components:verify

# 5. Single publishable component
corepack pnpm nx run @omnifex/ui-components:verify:button
corepack pnpm nx run @omnifex/ui-components:verify:icon

# 6. E2e gates (optional; needs Playwright + app shell running)
corepack pnpm nx run angular-app-e2e:e2e:a11y
corepack pnpm nx run angular-app-e2e:e2e:responsive
corepack pnpm nx run angular-app-e2e:e2e:touch
```

### What each gate checks

| Gate | Checks |
|------|--------|
| `stylelint` | No hex, no max-width-only, no hover-only, tokens-only |
| `test` | Props, render, disabled, events per unit spec |
| `build` | Stencil compilation, dist layout (ESM + CJS + loader) |
| `verify` | All above + static: token scan, Storybook, a11y source, publishability |
| `e2e:a11y` | axe WCAG 2.2 AA (serious/critical = 0) at 360/768/1280 |
| `e2e:responsive` | No horizontal scroll at 3 viewports |
| `e2e:touch` | ≥ 44×44 CSS px for all interactive targets on mobile |

### Unit spec requirements

A `*.spec.tsx` for a publishable component must cover:
- Default render (correct tag, default classes)
- Prop reflection (`reflect: true` props appear as HTML attributes)
- Disabled state (`disabled` + `aria-disabled`)
- Event emission (`buttonClick` / `iconClick` when enabled)
- No event when disabled
- Appearance / variant / size combinations

### Storybook requirements

A `*.stories.ts` for a publishable component must have:
- ≥ 2 exported stories
- At least one with `parameters: { layout: 'padded' | 'fullscreen' }` (responsive coverage)
- A `MatrixLight` or equivalent story showing all variants × appearances
- A `DarkTheme` story with `data-theme="dark"` decorator
- `tags: ['autodocs']` on the meta

---

## Documentation Update Rules

Update docs **in the same session** as code changes for any of these triggers:

| Trigger | Document(s) to update |
|---------|----------------------|
| New component | `libs/ui-components/src/lib/<name>/readme.md` |
| New token category | `libs/styles/src/lib/<scale>.css` comments (Figma node ID) + `figma-integration.md` §3 |
| New icon in registry | `icons.ts`, `icon/readme.md` table, `figma-integration.md` §3 icon section |
| New Figma node ID | `figma-integration.md` node ID table |
| New governance rule | `figma-integration.md` or `component-verification.md` (not component readme) |
| Verify behavior change | `component-verification.md` + `ui-components-qa.md` |
| New Nx target | `project.json` + `component-verification.md` commands section |

**Do not:**
- Create duplicate governance docs
- Put architectural rules in component readmes
- Update governance docs for every component addition (only when rules change)

---

## AI Operational Workflow

```
┌─────────────────────────────────────────────────────────────┐
│  BEFORE any code change                                     │
│  1. Read .cursor/rules.md (priority order)                  │
│  2. Read docs/standards/figma-integration.md                │
│  3. Read docs/standards/component-verification.md           │
│  4. Validate task scope against architecture constraints     │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│  ANALYSIS PHASE (no code)                                   │
│  1. get_metadata → confirm Figma node                       │
│  2. get_variable_defs → extract token values                │
│  3. get_design_context → representative symbols only        │
│  4. Produce token mapping table (Figma → CSS var)           │
│  5. Identify responsive intent                              │
│  6. Confirm placement (ui-components vs app)                │
│  STOP if token gaps require design decision                 │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│  IMPLEMENTATION PHASE (minimal diff)                        │
│  1. Add/update tokens in libs/styles if missing             │
│  2. Implement Stencil component (tsx + css)                 │
│  3. CSS: var(--*) only; no hex; mobile-first                │
│  4. Slots + aria props + focus-visible                      │
│  5. Unit spec (*.spec.tsx)                                  │
│  6. Stories (*.stories.ts) with matrix + dark               │
│  STOP if docs conflict with existing code — report only     │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│  VERIFICATION PHASE (run, paste exit codes)                 │
│  1. stylelint                                               │
│  2. test                                                    │
│  3. build                                                   │
│  4. verify (or verify:<component>)                          │
│  FIX failures before moving on                              │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│  DOCUMENTATION PHASE                                        │
│  1. Update component readme.md (props, events, slots, tokens│
│  2. Update libs/styles token file if new tokens added       │
│  3. Update figma-integration.md if governance changed       │
│  4. Summarise files changed + verification exit codes       │
└─────────────────────────────────────────────────────────────┘
```

---

## Anti-Patterns

| Anti-pattern | Why forbidden | Correct approach |
|--------------|---------------|------------------|
| Paste Figma MCP CSS/Tailwind into repo | Violates figma-integration.md §2 | Map values to `var(--*)` tokens |
| Hex in `libs/ui-components/**/*.css` | stylelint error | Add primitive to `libs/styles/theme.css`, reference via semantic token |
| `@media (max-width:…)` only | stylelint error | `@media (min-width:…)` for enhancements |
| Hover-only CSS affordance | stylelint error + a11y | Pair with `:focus-visible` |
| `<div onClick>` in Stencil | Static a11y error | Use `<button>` or `<a>` |
| Icon-only control without `aria-label` | Accessibility failure | Set `label` prop or derive from `name` |
| Hardcoding `px` values in component CSS | verify warning/error | Add to `libs/styles`, reference via token |
| `get_design_context` on full variant matrix | Slow / too large | Call on representative sub-symbols only |
| Skipping analysis before implementation | Token drift, rework | Always run analysis phase first |
| Adding component-specific rules to governance docs | Duplicate governance | Put in component `readme.md` |
| Implementing shared UI inside app folder | Architecture violation | Use `libs/ui-components` (Stencil) |
| Skipping verify after CSS changes | Regressions | Run `verify` (or `verify:static` minimum) |
| Importing React/Angular in `libs/ui-components` | Layer violation | Stencil only in ui-components |

---

## Definition of Done

A component is **publishable-ready** when all boxes are checked:

- [ ] `nx run @omnifex/ui-components:stylelint` — exit 0
- [ ] `nx run @omnifex/ui-components:test` — all specs pass
- [ ] `nx run @omnifex/ui-components:build` — exit 0, dist layout correct
- [ ] `nx run @omnifex/ui-components:verify:<component>` — 0 errors
- [ ] No hex / `rgb()` / `hsl()` in component CSS
- [ ] No `@media (max-width:…)` only
- [ ] No hover-only CSS affordances
- [ ] `:focus-visible` on all interactive elements
- [ ] Touch target ≥ 44×44 CSS px
- [ ] Unit spec covers: render, props, disabled, events
- [ ] Storybook: variants, matrix, dark theme, responsive story
- [ ] `aria-label` on icon-only controls
- [ ] Semantic HTML for all interactive elements
- [ ] Component `readme.md` up to date (props, events, slots, tokens)
- [ ] Token mapping documented with Figma node ID
- [ ] Added to `PUBLISHABLE_COMPONENTS` in `tools/scripts/ui-component-verify/constants.mjs`
- [ ] Consumed in Angular and React apps (or demo wired)
- [ ] Docs updated in same session as code

---

## Example Prompts (invocation patterns)

### 1. New component from Figma (full workflow)

```text
Follow docs/ai-context/prompts/figma-analysis.md
Figma URL: https://www.figma.com/design/TcEuJHlNPkME9br19X1Qhx/Andy-UI---Design-System?node-id=<node-id>&m=dev
Component: <name>
```
→ Review analysis output → then:
```text
Follow docs/ai-context/prompts/figma-component-implementation.md
Prior analysis: [paste output or "see previous message"]
```

### 2. Storybook for an existing component

```text
Follow docs/ai-context/prompts/figma-storybook.md
Component: <name>
Figma URL: <url>
```

### 3. Tests for an existing component

```text
Follow docs/ai-context/prompts/figma-tests.md
Component: <name>
```

### 4. Pre-PR audit

```text
Follow docs/ai-context/prompts/figma-component-audit.md
Component: <name>
Figma URL: <url>
```

### 5. Token verification only

```text
Read docs/standards/figma-integration.md.
Audit libs/ui-components/src/lib/<name>/<name>.css for:
- hex values (#...)
- raw rgb() / hsl()
- max-width-only media queries
- hover-only affordances
- raw px values not mapped to tokens
Report violations per line. Do not fix yet.
```

---

## Example Verification Commands

```bash
# ── CSS quality ─────────────────────────────────────────────
corepack pnpm nx run @omnifex/ui-components:stylelint

# ── Unit tests ──────────────────────────────────────────────
corepack pnpm nx run @omnifex/ui-components:test

# ── Stencil build ───────────────────────────────────────────
corepack pnpm nx run @omnifex/ui-components:build

# ── All-in-one verification (static + nx gates) ─────────────
corepack pnpm nx run @omnifex/ui-components:verify

# ── Static only (fast CI, no install-heavy steps) ───────────
corepack pnpm nx run @omnifex/ui-components:verify:static

# ── Single publishable component ────────────────────────────
corepack pnpm nx run @omnifex/ui-components:verify:button
corepack pnpm nx run @omnifex/ui-components:verify:icon

# ── Full gate (includes Playwright — slow) ───────────────────
corepack pnpm nx run @omnifex/ui-components:verify:full

# ── App accessibility (axe WCAG 2.2 AA) ─────────────────────
corepack pnpm nx run angular-app-e2e:e2e:a11y
corepack pnpm nx run react-app-e2e:e2e:a11y

# ── App responsiveness (360 / 768 / 1280 no overflow) ────────
corepack pnpm nx run angular-app-e2e:e2e:responsive

# ── Touch targets (≥ 44×44 CSS px on mobile) ────────────────
corepack pnpm nx run angular-app-e2e:e2e:touch

# ── Dependency-free token audit (produces UI_AUDIT_REPORT.md) ─
corepack pnpm nx run @omnifex/ui-components:audit

# ── Storybook (requires build first) ────────────────────────
corepack pnpm nx run @omnifex/ui-components:storybook
```

---

*This skill synthesises [`figma-integration.md`](../../standards/figma-integration.md), [`component-verification.md`](../../standards/component-verification.md), [`ui-components-qa.md`](../../standards/ui-components-qa.md), [`architecture.md`](../../architecture/architecture.md), and [`.cursor/rules.md`](../../../.cursor/rules.md). Update those source docs when rules change — this skill will reference them.*
