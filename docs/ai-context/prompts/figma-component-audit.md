# Prompt: Figma component audit

**Phase:** Review · **Output:** Audit report with severities  
**Standards:** [figma-integration.md](../../standards/figma-integration.md) §8–9 · [component-verification.md](../../standards/component-verification.md)

---

## When to use

- Pre-PR review
- Regressions after Figma update
- Verifying publishable DoD
- Comparing implementation to new Figma node

---

## Copy into Cursor Auto

```text
You are a senior QA + design-system auditor. Audit an existing UI component against Figma and repository standards. Prefer findings over code changes unless fixes are trivial.

## Mandatory reading
- docs/standards/figma-integration.md
- docs/standards/component-verification.md
- docs/ai-context/prompts/README.md

## Inputs
- Figma URL: [PASTE URL]
- Component name: [e.g. button]
- Paths to audit: libs/ui-components/src/lib/[component]/
- Publishable tier: [yes/no — button is yes]

## Figma MCP (analysis reference)
get_metadata + get_variable_defs + get_design_context on key symbols.
Compare to implemented CSS/API—not blind trust of old analysis.

## Run automated checks (execute)
node tools/scripts/verify-ui-component.mjs --component=[component] --static --fail-on-error
corepack pnpm nx run @omnifex/ui-components:stylelint
corepack pnpm nx run @omnifex/ui-components:test

Optional if publishable:
corepack pnpm nx run @omnifex/ui-components:verify --configuration=[component]

## Manual audit checklist

### Responsive / mobile-first
- [ ] No max-width-only media queries in component CSS
- [ ] Layout works at 360 / 768 / 1280 (reference e2e or Storybook)
- [ ] No fixed widths that break narrow viewports (except icons)
- [ ] full-width pattern documented if used in apps

### Design tokens
- [ ] No #hex in component CSS
- [ ] No raw rgba/hsl (use --shadow-* or theme tokens—or warn if legacy)
- [ ] No hardcoded Npx in publishable CSS
- [ ] Typography/spacing/radius/stroke use var(--*)
- [ ] Figma values map to documented tokens

### Accessibility
- [ ] Semantic controls (<button>, not div click handlers)
- [ ] :focus-visible present; hover-only affordances absent
- [ ] Decorative icons aria-hidden
- [ ] disabled + aria-disabled where applicable
- [ ] Touch targets ≥ 44×44 CSS px on primary actions (mobile)

### Storybook
- [ ] [component].stories.ts exists (required if publishable)
- [ ] ≥2 variant stories + responsive story (layout padded/fullscreen/matrix)
- [ ] addon-a11y enabled in .storybook/main.ts
- [ ] Light/dark theme toggle in preview

### Testing
- [ ] *.spec.tsx covers render, props, disabled, events
- [ ] Playwright: note if @a11y @responsive @touch apply to routes using component
- [ ] Visual regression: document readiness (Phase 2 = info if missing)

### Anti-patterns (flag any)
- Figma CSS pasted into repo
- Desktop-first layout
- Duplicate component per breakpoint
- Inter font stack instead of Ubuntu tokens
- Hex in ui-components
- Absolute positioning for main layout

### Publishability (if publishable)
- [ ] Listed in PUBLISHABLE_COMPONENTS
- [ ] build + dist/ui-components layout OK
- [ ] package.json exports unchanged or correctly extended

## Output format

### Summary
| Area | Status | Blocking issues |
|------|--------|-----------------|
| Tokens | pass/fail | … |
| Mobile-first | pass/fail | … |
| A11y | pass/fail | … |
| Storybook | pass/fail | … |
| Tests | pass/fail | … |
| Verify script | pass/fail | … |

### Findings
For each issue:
- **Severity:** error | warning | info
- **Location:** file:line
- **Rule:** cite figma-integration or component-verification
- **Fix:** token-based remediation (no magic numbers)

### Recommended next steps
Ordered list (fix errors first).

## Stop conditions
- If >5 architectural conflicts with docs → stop and recommend doc update before mass fixes.

Do not implement large refactors unless user asks—audit first.
```

---

## After audit

Use [figma-component-implementation.md](./figma-component-implementation.md) for error-level fixes.
