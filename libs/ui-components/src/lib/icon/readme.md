# andy-ui-icon

Presentational icon glyph (no button). Use inside `andy-ui-button`, cards, or layouts.

## Usage

```html
<!-- Default: size="flex" fills the parent wrapper -->
<div style="width: 2rem; height: 2rem; display: inline-flex;">
  <andy-ui-icon name="settings"></andy-ui-icon>
</div>

<!-- Fixed Figma sizes (42 / 32 / 22 px) -->
<andy-ui-icon name="home" size="large"></andy-ui-icon>
<andy-ui-icon name="search" size="medium"></andy-ui-icon>
<andy-ui-icon name="close" size="small"></andy-ui-icon>

<!-- Inside a text button: icon uses flex to fill the button icon slot -->
<andy-ui-button variant="primary" size="large">
  <andy-ui-icon slot="icon" name="home" size="flex"></andy-ui-icon>
  Home
</andy-ui-button>
```

Accessibility: set `aria-label` when the icon conveys meaning on its own; otherwise it is decorative (`aria-hidden`).

```html
<andy-ui-icon name="user" aria-label="View your profile"></andy-ui-icon>
```

Custom SVG (slot) when `name` is omitted or unknown:

```html
<andy-ui-icon aria-label="Custom">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">...</svg>
</andy-ui-icon>
```

## Properties

| Property | Attribute | Type | Default | Description |
|----------|-----------|------|---------|-------------|
| `name` | `name` | `IconName` | — | Built-in icon from registry |
| `size` | `size` | `'flex' \| 'large' \| 'medium' \| 'small'` | `'flex'` | `flex` fills parent; fixed sizes match Figma |
| `ariaLabel` | `aria-label` | `string` | — | Accessible name; omit when decorative |

## Sizes

| `size` | Host dimensions | Use |
|--------|-----------------|-----|
| `flex` | 100% of parent | Set `width`/`height` on wrapper (default) |
| `large` | 42×42 px | Figma large |
| `medium` | 32×32 px | Figma medium |
| `small` | 22×22 px | Figma small |

## Adding icons

See [Icon registry](../../../docs/standards/figma-integration.md#icon-registry--adding-a-new-named-icon) in `docs/standards/figma-integration.md`.
