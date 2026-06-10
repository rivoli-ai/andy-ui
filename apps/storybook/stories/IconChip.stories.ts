import { html, svg } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const glyph = svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 17h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" /></svg>`;

const meta: Meta = {
  title: "Elements/Icon chip",
  component: "andy-icon-chip",
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "Gradient-tinted square holding an icon (`.au-icon-chip`). Slot in any SVG." } } },
  argTypes: {
    variant: { control: "inline-radio", options: ["tinted", "solid", "muted"], table: { category: "Props", defaultValue: { summary: "tinted" } } },
    size: { control: "inline-radio", options: ["md", "lg"], table: { category: "Props", defaultValue: { summary: "md" } } },
  },
  args: { variant: "tinted", size: "md" },
  render: (a) => html`<andy-icon-chip variant=${a.variant} size=${a.size}>${glyph}</andy-icon-chip>`,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Types: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center">
      <andy-icon-chip variant="tinted">${glyph}</andy-icon-chip>
      <andy-icon-chip variant="solid">${glyph}</andy-icon-chip>
      <andy-icon-chip variant="muted">${glyph}</andy-icon-chip>
      <andy-icon-chip variant="tinted" size="lg">${glyph}</andy-icon-chip>
    </div>
  `,
};
