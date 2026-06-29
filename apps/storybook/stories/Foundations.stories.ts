import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Globals/Overview",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Design tokens from `@andy-ui/tokens`: colours, type scale, spacing, radius, motion and z-index — all CSS custom properties that re-resolve per `[data-theme]`. Import `@andy-ui/tokens/andy-ui.css` once at your app root.",
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const swatch = (name: string) => html`
  <div style="display:flex;flex-direction:column;gap:6px">
    <div style="height:56px;border-radius:12px;background:var(${name});border:1px solid var(--border-light)"></div>
    <code style="font-size:12px">${name}</code>
  </div>
`;

export const Colors: Story = {
  render: () => html`
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;max-width:720px">
      ${["--brand-primary", "--brand-secondary", "--brand-accent", "--success-500", "--warning-500", "--error-500", "--info-500", "--surface-card"].map(
        swatch
      )}
    </div>
  `,
};

export const Typography: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:8px">
      <p class="t-display">Display</p>
      <h1 class="t-h1">Heading 1</h1>
      <h2 class="t-h2">Heading 2</h2>
      <h3 class="t-h3">Heading 3</h3>
      <p class="t-body">Body — the quick brown fox jumps over the lazy dog.</p>
      <p class="t-body-sm">Body small — the quick brown fox jumps over the lazy dog.</p>
      <p class="t-label">Label</p>
      <p class="t-eyebrow">Eyebrow</p>
      <p class="t-gradient t-h2">Gradient heading</p>
    </div>
  `,
};
