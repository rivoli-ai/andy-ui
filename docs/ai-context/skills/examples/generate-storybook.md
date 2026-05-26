# Example: Generate Storybook stories

**Skill:** [`../ui-component-skill.md`](../ui-component-skill.md)  
**Prompt file used:** `figma-storybook.md`  
**Output:** `*.stories.ts` aligned to Figma variants, accessible, responsive

---

## Copy into Cursor Auto

```text
Read docs/ai-context/skills/ui-component-skill.md
Follow docs/ai-context/prompts/figma-storybook.md

Component: [e.g. badge]
Figma URL: [PASTE URL — used to align story variants with Figma props]
```

---

## Required stories per publishable component

| Story name | Purpose | Required |
|------------|---------|---------|
| `Default` (or primary variant) | Baseline render | Yes |
| Per variant × appearance | Cover all enum values | Yes |
| `MatrixLight` | All variants + appearances at once; `layout: 'fullscreen'` | Yes |
| `DarkTheme` | `data-theme="dark"` decorator on dark background | Yes |
| `Disabled` | Disabled state | Yes (if component has `disabled`) |
| `Sizes` or per-size stories | All size values | Yes (if component has `size`) |
| `FullWidth` | `layout: 'padded'`; fullWidth prop | Yes (if component has `fullWidth`) |

---

## Story file requirements

```ts
// Minimum structure
const meta: Meta<StoryArgs> = {
  title: 'Andy UI/<ComponentName>',
  tags: ['autodocs'],   // required for auto-generated docs
  render: (args) => `<andy-ui-<name> ...>${args.label}</andy-ui-<name>>`,
  argTypes: { /* all props with correct controls */ },
  args: { /* sensible defaults */ },
};

export default meta;

// Must have ≥ 2 named exports
export const Default: Story = {};
export const MatrixLight: Story = { parameters: { layout: 'fullscreen' }, render: () => `...` };
export const DarkTheme: Story = { decorators: [(s) => `<div data-theme="dark">${s()}</div>`] };
```

---

## CSS in stories

- Import tokens from the theme (applied by `.storybook/preview.ts`) — do not import `theme.css` inside stories
- Inline `style=` in story render strings: use CSS custom property values (`var(--space-4)`) not raw px
- Do not add framework-specific imports; stories must be framework-agnostic HTML strings

---

## Verification after story creation

```bash
corepack pnpm nx run @omnifex/ui-components:build   # required before storybook
corepack pnpm nx run @omnifex/ui-components:storybook
node tools/scripts/verify-ui-component.mjs --component=[name] --fail-on-error
```

The verify script checks for a responsive story (`layout: padded/fullscreen` or `fullWidth`/`Matrix` pattern) and ≥ 2 exported stories.

---

## Filled-in example (badge)

```text
Read docs/ai-context/skills/ui-component-skill.md
Follow docs/ai-context/prompts/figma-storybook.md

Component: badge
Figma URL: https://www.figma.com/design/TcEuJHlNPkME9br19X1Qhx/Andy-UI---Design-System?node-id=14-200&m=dev
```
