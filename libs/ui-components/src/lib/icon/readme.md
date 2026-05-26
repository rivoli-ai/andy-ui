# andy-ui-icon

Icon-only action button aligned with Figma **Icons** / **Icon** component set (node `15:386`).

Two usage modes — mutually exclusive; `name` takes precedence:

## Named icon (built-in registry)

```html
<andy-ui-icon name="settings"></andy-ui-icon>
<andy-ui-icon name="home" variant="secondary" appearance="outlined"></andy-ui-icon>
```

`aria-label` defaults to the icon name. Override with `label`:

```html
<andy-ui-icon name="user" label="View your profile"></andy-ui-icon>
```

## Custom SVG (slot)

Backward-compatible. Provide your own SVG via the default slot:

```html
<andy-ui-icon label="My icon">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <!-- paths -->
  </svg>
</andy-ui-icon>
```

Use `stroke="currentColor"` / `fill="currentColor"` so the glyph follows color tokens.

## Available icon names

| Name | Name | Name |
|------|------|------|
| `add` | `arrow-left` | `arrow-right` |
| `check` | `chevron-down` | `chevron-left` |
| `chevron-right` | `chevron-up` | `close` |
| `delete` | `edit` | `error` |
| `home` | `info` | `logout` |
| `menu` | `more-horizontal` | `more-vertical` |
| `search` | `settings` | `user` |
| `warning` | | |

**Adding icons:** see [Icon registry — adding a new named icon](../../../docs/standards/figma-integration.md#icon-registry--adding-a-new-named-icon) in `docs/standards/figma-integration.md`, or edit `icons.ts` directly.

## Properties

| Property | Attribute | Type | Default | Description |
|----------|-----------|------|---------|-------------|
| `name` | `name` | `IconName` (string) | — | Built-in icon name; renders SVG from registry |
| `label` | `label` | `string` | icon name | `aria-label`; defaults to `name` when `name` is set |
| `variant` | `variant` | `'primary' \| 'secondary' \| 'tertiary'` | `'primary'` | Color role (Figma Appearance) |
| `appearance` | `appearance` | `'filled' \| 'outlined' \| 'basic'` | `'filled'` | Visual style (Figma Variant) |
| `size` | `size` | `'large' \| 'medium' \| 'small'` | `'large'` | 42 / 32 / 22 px visual; min 44 px touch target |
| `disabled` | `disabled` | `boolean` | `false` | Disables interaction |
| `type` | `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Native button type |

## Events

| Event | Description |
|-------|-------------|
| `iconClick` | Emitted on click when not disabled |

## Slots

| Slot | Description |
|------|-------------|
| (default) | Custom SVG icon. Used when `name` is not provided or unknown. |

## CSS parts

| Part | Description |
|------|-------------|
| `button` | Native `<button>` element |

## Tokens

- Sizes / radius: `libs/styles/src/lib/icon-button.css`
- Colors: `var(--button-*)` from `button.css`
