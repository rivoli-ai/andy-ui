import { html, svg } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import { iconNames } from "@andy-ui/core";

const glyph = svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 17h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" /></svg>`;

const meta: Meta = {
  title: "Elements/Icon chip",
  component: "andy-icon-chip",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Gradient-tinted square holding an icon (`.au-icon-chip`). Set `icon` to a built-in name (shared with `<andy-icon>`), or slot in your own SVG.",
      },
    },
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["tinted", "solid", "muted"], description: "Visual style.", table: { category: "Props", defaultValue: { summary: "tinted" } } },
    size: { control: "inline-radio", options: ["md", "lg"], table: { category: "Props", defaultValue: { summary: "md" } } },
    icon: {
      control: "select",
      options: ["", ...iconNames],
      description: "Built-in icon name. Empty = use the slotted SVG.",
      table: { category: "Props" },
    },
  },
  args: { variant: "tinted", size: "md", icon: "search" },
  render: (a) =>
    a.icon
      ? html`<andy-icon-chip variant=${a.variant} size=${a.size} icon=${a.icon}></andy-icon-chip>`
      : html`<andy-icon-chip variant=${a.variant} size=${a.size}>${glyph}</andy-icon-chip>`,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Types: Story = {
  parameters: { docs: { description: { story: "The three chip styles, each with a built-in icon." } } },
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center">
      <andy-icon-chip variant="tinted" icon="settings"></andy-icon-chip>
      <andy-icon-chip variant="solid" icon="check"></andy-icon-chip>
      <andy-icon-chip variant="muted" icon="copy"></andy-icon-chip>
      <andy-icon-chip variant="tinted" size="lg" icon="search"></andy-icon-chip>
    </div>
  `,
};
