# andy-ui-button

Andy UI button (Figma node `14:4`). Stencil web component for Angular and React.

## Usage

```html
<andy-ui-button variant="primary" appearance="filled" size="large">Button</andy-ui-button>

<andy-ui-button variant="secondary" appearance="outlined" size="medium">
  <svg slot="icon" ...></svg>
  Save
</andy-ui-button>

<andy-ui-button appearance="basic" variant="tertiary" size="small" disabled>Disabled</andy-ui-button>

<andy-ui-button full-width variant="primary">Full width on mobile</andy-ui-button>
```

## Properties

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `primary` \| `secondary` \| `tertiary` \| `inverse` | `primary` | Color appearance (Figma Apperance) |
| `appearance` | `filled` \| `outlined` \| `basic` | `filled` | Visual style (Figma variant) |
| `size` | `large` \| `medium` \| `small` | `large` | Size scale (no `flex`; use `size="flex"` on `andy-ui-icon` in the icon slot) |
| `disabled` | `boolean` | `false` | Disables interaction |
| `full-width` | `boolean` | `false` | Block-level width for responsive layouts |
| `type` | `button` \| `submit` \| `reset` | `button` | Native button type |

## Events

| Event | Description |
|-------|-------------|
| `buttonClick` | Emitted on click when not disabled |

## Slots

| Slot | Description |
|------|-------------|
| (default) | Button label |
| `icon` | Optional leading icon (`aria-hidden` on wrapper) |

## CSS parts

| Part | Description |
|------|-------------|
| `button` | Native `<button>` element |

## Tokens

Uses `--button-*` from `libs/styles/src/lib/button.css` (imported via `theme.css`).

## Development commands

```bash
corepack pnpm nx run @omnifex/ui-components:build
corepack pnpm nx run @omnifex/ui-components:test
corepack pnpm nx run @omnifex/ui-components:stylelint
corepack pnpm nx run @omnifex/ui-components:storybook
corepack pnpm nx run @omnifex/ui-components:verify:button
```
