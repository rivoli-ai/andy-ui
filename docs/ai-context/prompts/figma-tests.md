# Prompt: Figma component tests

**Phase:** Quality gates · **Output:** Unit specs + Playwright guidance  
**Standards:** [component-verification.md](../../standards/component-verification.md) · [ui-components-qa.md](../../standards/ui-components-qa.md)

**Prerequisite:** Component implemented; Storybook recommended but not required for unit tests.

---

## When to use

- Adding `*.spec.tsx` for a publishable component
- Extending e2e coverage for routes that render the component
- Preparing visual regression readiness (Phase 2 backlog)

---

## Copy into Cursor Auto

```text
You are a test engineer for Stencil web components in an Nx monorepo. Add tests for a Figma-aligned component.

## Mandatory reading
- docs/standards/component-verification.md
- docs/standards/ui-components-qa.md
- libs/ui-components/jest.config.cjs
- Example: libs/ui-components/src/lib/button/button.spec.tsx
- apps/angular-app-e2e/tests/ui-components.spec.ts
- apps/angular-app-e2e/tests/a11y.spec.ts (if present)

## Inputs
- Component: [name]
- Custom element tag: [e.g. andy-ui-button]
- Routes using component: [e.g. /callback, dashboard — or "discover from repo"]
- Publishable: [yes/no]

## Part A — Unit tests (Jest + @stencil/core/testing)
Create or extend: libs/ui-components/src/lib/[component]/[component].spec.tsx

### Required cases (minimum)
1. Renders default markup (shadow DOM button/root exists)
2. Reflects variant / appearance / size attributes on host
3. disabled sets disabled + aria-disabled on native control
4. Primary event emits when enabled (e.g. buttonClick)
5. Event does NOT emit when disabled
6. full-width class/attribute when applicable
7. Key Figma variant combo (e.g. basic/ghost appearance if applicable)

### Rules
- Use newSpecPage from @stencil/core/testing
- await page.waitForChanges() after slot/content assertions
- No snapshot-only tests without behavior assertions
- Do not mock entire design system—test component class list and attributes

Run:
corepack pnpm nx run @omnifex/ui-components:test

## Part B — Accessibility tests (Playwright + axe)
Do NOT duplicate full axe suite if already on route.

### Actions
1. Identify a stable app route that renders the component (grep apps/ and e2e).
2. If component is on /callback or dashboard, note existing @a11y specs.
3. If missing coverage, extend apps/angular-app-e2e/tests/a11y.spec.ts OR document gap:
   - Use @axe-core/playwright
   - Tag filter WCAG 2.2 AA
   - Fail on serious/critical only (match existing pattern)

Run when applicable:
corepack pnpm nx run angular-app-e2e:e2e:a11y

## Part C — Responsive tests (Playwright)
Align with UI-8 viewports: 360, 768, 1280 width.

### Actions
1. Read apps/angular-app-e2e/tests/ui-components.spec.ts pattern (@responsive tag).
2. If component host is queryable on a route, ensure tests include:
   - No horizontal scroll at each viewport
   - Tag tests @responsive

3. For Stencil shadow DOM: test via custom element host in light DOM (andy-ui-button, etc.).

Run when applicable:
corepack pnpm nx run angular-app-e2e:e2e:responsive

## Part D — Touch targets (Playwright, mobile)
Minimum 44×44 CSS px for interactive hosts on mobile viewport.

### Actions
- Follow e2e:touch pattern in ui-components.spec.ts
- Include custom element tag in locator list if primary action

Run when applicable:
corepack pnpm nx run angular-app-e2e:e2e:touch

## Part E — Visual regression readiness
Do NOT implement Chromatic unless asked.

### Document
- [ ] Storybook stories exist for visual baseline (future test-storybook:visual)
- [ ] Baseline viewports: 360, 768, 1280 × light/dark
- [ ] Snapshot path convention: libs/ui-components/__screenshots__/<component>/ (Phase 2)
- Current status: info/warning per BACKLOG UI-8

## Part F — Storybook validation
Static check only unless test-runner configured:
node tools/scripts/verify-ui-component.mjs --component=[component] --static

## Verification bundle (publishable)
corepack pnpm nx run @omnifex/ui-components:verify --configuration=[component]

## Output format
### Unit tests added
- list cases

### E2e impact
- routes covered | gaps

### Commands run
| Command | Exit |
|---------|------|

### Gaps / follow-ups

## Stop conditions
- e2e fails due to identity server — document environmental blocker, still deliver unit tests
- Do not change unrelated e2e specs unless required for host locator

Do not skip unit tests for publishable components.
```

---

## Publishable components

Add the component to `PUBLISHABLE_COMPONENTS` in `tools/scripts/ui-component-verify/constants.mjs` when unit + Storybook + verify pass.
