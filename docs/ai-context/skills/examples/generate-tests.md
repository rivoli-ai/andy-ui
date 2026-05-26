# Example: Generate tests

**Skill:** [`../ui-component-skill.md`](../ui-component-skill.md)  
**Prompt file used:** `figma-tests.md`  
**Output:** `*.spec.tsx` unit tests + Playwright e2e guidance

---

## Copy into Cursor Auto

```text
Read docs/ai-context/skills/ui-component-skill.md
Follow docs/ai-context/prompts/figma-tests.md

Component: [e.g. icon]
```

---

## Unit spec requirements (`*.spec.tsx`)

Use `@stencil/core/testing` (`newSpecPage`) — **not** `stencil test --spec`:

```ts
import { newSpecPage } from '@stencil/core/testing';
import { AndyUi<Name> } from './<name>';

describe('andy-ui-<name>', () => {
  it('renders with default classes and props', async () => { ... });
  it('reflects props as HTML attributes', async () => { ... });
  it('applies disabled state + aria-disabled', async () => { ... });
  it('emits <event>Click when enabled', async () => { ... });
  it('does not emit when disabled', async () => { ... });
  it('supports all appearance / variant combinations', async () => { ... });
});
```

### Mandatory test cases

| Case | Assertion |
|------|-----------|
| Default render | `querySelector('button')` truthy; default classes present |
| Prop reflection | `host.getAttribute('variant')` equals prop value |
| Disabled | `button.hasAttribute('disabled')` + `aria-disabled="true"` |
| Event (enabled) | `spy` called once on `button.click()` |
| No event (disabled) | `spy` not called |
| Appearance variant | Correct CSS class applied |

---

## E2e guidelines (Playwright)

Tests live in `apps/angular-app-e2e/tests/` or `apps/react-app-e2e/tests/`.

Tag conventions:
- `@a11y` — axe-core WCAG 2.2 AA
- `@responsive` — no horizontal scroll at 360 / 768 / 1280
- `@touch` — ≥ 44×44 CSS px for interactive elements on mobile

**Include the component locator** in the existing `ui-components.spec.ts` touch-target check:

```ts
// In the locators array:
page.locator('andy-ui-<name>'),
```

Playwright e2e targets `/callback` (always rendered) and dashboard routes (authenticated).  
Shadow DOM internals are not accessible via locators — test host element bounding boxes only.

---

## Verification after writing tests

```bash
corepack pnpm nx run @omnifex/ui-components:test
corepack pnpm nx run @omnifex/ui-components:verify  # confirms spec file exists and passes
```

Optional e2e (requires running app):
```bash
corepack pnpm nx run angular-app-e2e:e2e:a11y
corepack pnpm nx run angular-app-e2e:e2e:responsive
corepack pnpm nx run angular-app-e2e:e2e:touch
```

---

## Filled-in example (icon)

```text
Read docs/ai-context/skills/ui-component-skill.md
Follow docs/ai-context/prompts/figma-tests.md

Component: icon
```
