# Example: Audit an existing component

**Skill:** [`../ui-component-skill.md`](../ui-component-skill.md)  
**Prompt file used:** `figma-component-audit.md`  
**Output:** Audit report with findings categorised by severity + fix list

---

## Copy into Cursor Auto

```text
Read docs/ai-context/skills/ui-component-skill.md
Follow docs/ai-context/prompts/figma-component-audit.md

Component: [e.g. button]
Files: libs/ui-components/src/lib/button/
Figma URL: [PASTE URL — optional, used to validate visual alignment]
```

---

## What the AI must audit

### Responsive behaviour
- [ ] Base styles target 360px width
- [ ] Only `@media (min-width:…)` used for enhancements — no `max-width`-only
- [ ] No fixed widths on layout containers (`px` widths without `max-width: 100%`)
- [ ] No fixed heights that would clip content at small viewports

### Token usage
- [ ] Zero `#hex` values in component CSS
- [ ] Zero raw `rgb()` or `hsl()` values
- [ ] Zero hardcoded `px` values (except where a corresponding `--*` token exists)
- [ ] All `color`, `background-color`, `border-color` use `var(--theme-*)` or component-level tokens
- [ ] `font-size`, `line-height`, `font-weight` all from `var(--font-*)` / `var(--text-*)` tokens

### Accessibility
- [ ] Interactive elements use semantic HTML (`<button>`, `<a>`, not `<div onClick>`)
- [ ] `:focus-visible` present; shares same visual affordance as `:hover`
- [ ] No hover-only affordances (critical interactive state visible only on hover)
- [ ] Icon-only controls have `aria-label` or derived label
- [ ] `aria-disabled` set alongside `disabled` prop

### Storybook coverage
- [ ] `*.stories.ts` exists with ≥ 2 exported stories
- [ ] Responsive story present (`layout: 'padded'` | `'fullscreen'` or matrix)
- [ ] `DarkTheme` story with `data-theme="dark"` decorator
- [ ] `addon-a11y` configured in `.storybook/main.ts`

### Touch targets
- [ ] Min 44×44 CSS px on mobile (`--space-touch-min` via padding or `min-height`/`min-width`)

### Anti-pattern detection
- [ ] No `color-mix()` without token wrapper
- [ ] No `!important` in component CSS
- [ ] No inline `style=` attributes in Stencil render method (except dynamic values)
- [ ] No `box-shadow` with raw `rgba()` values

---

## Verification commands to run after fixes

```bash
corepack pnpm nx run @omnifex/ui-components:stylelint
corepack pnpm nx run @omnifex/ui-components:test
corepack pnpm nx run @omnifex/ui-components:build
node tools/scripts/verify-ui-component.mjs --component=[name] --with-nx --fail-on-error
```

---

## Filled-in example (button)

```text
Read docs/ai-context/skills/ui-component-skill.md
Follow docs/ai-context/prompts/figma-component-audit.md

Component: button
Files: libs/ui-components/src/lib/button/
Figma URL: https://www.figma.com/design/TcEuJHlNPkME9br19X1Qhx/Andy-UI---Design-System?node-id=14-4&m=dev
```
