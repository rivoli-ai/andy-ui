# stylelint-plugin-omnifex

Internal stylelint plugin enforcing the UI-8 regression-prevention rules for
`@omnifex/ui-components`. See `docs/BACKLOG.md` § UI-8 for rationale.

## Rules

| Rule | Default severity | What it catches |
| --- | --- | --- |
| `omnifex/no-hex-in-components` | `error` (fallbacks in `var(..., #hex)` warn when `allowFallback: true`) | Any `#rgb` / `#rrggbb` / `#rrggbbaa` literal in component CSS. |
| `omnifex/tokens-only` | `warning` | `color`, `background(-color)`, `border-*color`, `outline-color`, `fill`, `stroke`, `border-radius`, `z-index`, `font-size` declarations that do NOT resolve to `var(--...)` (or a neutral keyword). |
| `omnifex/mobile-first-media` | `error` | `@media (max-width: ...)` queries. Explicit ranges combining `min-width` AND `max-width` are allowed. |
| `omnifex/no-hover-only-affordance` | `error` | `:hover` rules (without `:focus`/`:focus-visible`/`:focus-within`) that toggle `display`, `visibility`, `opacity` (< 0.5), or `pointer-events`. |

## Usage

Root `.stylelintrc.json`:

```json
{
  "plugins": ["./tools/stylelint-plugin-omnifex"],
  "overrides": [
    {
      "files": ["libs/ui-components/**/*.css"],
      "rules": {
        "omnifex/no-hex-in-components": [true, { "allowFallback": true }],
        "omnifex/tokens-only": [true],
        "omnifex/mobile-first-media": [true],
        "omnifex/no-hover-only-affordance": [true]
      }
    }
  ]
}
```

Run:

```bash
pnpm nx run ui-components:stylelint
```
