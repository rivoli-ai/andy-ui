# Example: Verify token usage

**Skill:** [`../ui-component-skill.md`](../ui-component-skill.md)  
**Output:** Audit report of token violations (read-only; no code changes)

---

## Copy into Cursor Auto

```text
Read docs/ai-context/skills/ui-component-skill.md
Read docs/standards/figma-integration.md §3 (token rules)

Audit the CSS files for component [name] at:
  libs/ui-components/src/lib/[name]/[name].css

Check for:
1. Hex values (#…)
2. Raw rgb() or hsl() values
3. @media (max-width:…) without a matching min-width block
4. Hover-only affordances (color/opacity/background changed only in :hover, not :focus-visible)
5. Raw px values not backed by a CSS custom property
6. box-shadow with raw rgba() values

For each violation, report:
  - Line number
  - Violation type
  - Current value
  - Recommended fix (token from libs/styles or lint rule)

Do not edit any files. Report only.
```

---

## To audit all components at once (no AI needed)

Run the dependency-free audit script directly:

```bash
node tools/scripts/audit-ui-components.mjs
# Output written to docs/UI_AUDIT_REPORT.md
```

Or via Nx:

```bash
corepack pnpm nx run @omnifex/ui-components:audit
```

Check the report:

```bash
# look for: Hard errors (hex / max-width / hover-only) and warnings (non-token raw values)
cat docs/UI_AUDIT_REPORT.md
```

---

## Stylelint (enforced rules)

```bash
corepack pnpm nx run @omnifex/ui-components:stylelint
```

| Rule | Checks |
|------|--------|
| `omnifex/no-hex-in-components` | No `#` or `rgb()` in component CSS |
| `omnifex/mobile-first-media` | No `max-width`-only media queries |
| `omnifex/no-hover-only-affordance` | Interactive state not keyboard-accessible |
| `omnifex/tokens-only` | Raw `font-size`, `border-radius`, `z-index` without token |

---

## How to fix common violations

| Violation | Fix |
|-----------|-----|
| `#1731ab` | Add to `libs/styles/src/lib/theme.css` as `--color-primary-600`; reference via `var(--button-primary-bg)` |
| `rgb(255,255,255)` | `var(--theme-bg-surface)` or appropriate semantic token |
| `@media (max-width: 640px)` | Rewrite as mobile-first: remove the block and use `@media (min-width: 641px)` for enhancements |
| `:hover { opacity: 1 }` without `:focus-visible` | Add `:hover, :focus-visible { opacity: 1 }` |
| `font-size: 1rem` | `font-size: var(--font-b2-size)` |
| `border-radius: 6px` | `border-radius: var(--radius-2)` |
| `box-shadow: 0 2px 4px rgba(0,0,0,.1)` | Add `--shadow-elevation-1` to `theme.css`; use `box-shadow: var(--shadow-elevation-1)` |
