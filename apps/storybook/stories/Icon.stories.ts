import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import { iconNames } from "@andy-ui/core";

const meta: Meta = {
  title: "Elements/Icon",
  component: "andy-icon",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Built-in line icon (`.au-icon`). Pick a `name` from the set — colour follows `currentColor`, size via `size`. The same names power `<andy-icon-chip icon>`. Decorative by default; pass `label` to expose it to assistive tech.",
      },
    },
  },
  argTypes: {
    name: { control: "select", options: iconNames, description: "Icon from the built-in set.", table: { category: "Props" } },
    size: { control: "inline-radio", options: ["sm", "md", "lg", "xl"], table: { category: "Props", defaultValue: { summary: "md" } } },
    label: { control: "text", description: "Accessible label; empty = decorative (aria-hidden).", table: { category: "Props" } },
  },
  args: { name: "search", size: "lg", label: "" },
  render: (a) => html`<andy-icon name=${a.name} size=${a.size} label=${a.label}></andy-icon>`,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const AllIcons: Story = {
  parameters: { docs: { description: { story: "Every icon in the built-in set." } } },
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:20px;align-items:flex-start">
      ${iconNames.map(
        (n) => html`<div style="display:flex;flex-direction:column;align-items:center;gap:8px;width:72px;color:var(--text-secondary)">
          <andy-icon name=${n} size="lg"></andy-icon>
          <span class="t-meta">${n}</span>
        </div>`
      )}
    </div>
  `,
};

export const Sizes: Story = {
  parameters: { docs: { description: { story: "The four sizes (sm / md / lg / xl)." } } },
  render: () => html`
    <div style="display:flex;gap:16px;align-items:center;color:var(--brand-primary)">
      <andy-icon name="settings" size="sm"></andy-icon>
      <andy-icon name="settings" size="md"></andy-icon>
      <andy-icon name="settings" size="lg"></andy-icon>
      <andy-icon name="settings" size="xl"></andy-icon>
    </div>
  `,
};
