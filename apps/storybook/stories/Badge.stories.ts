import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Elements/Badge",
  component: "andy-badge",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "A small labelled chip for statuses or categories (`.dp-badge`)." } },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "error", "info"],
      description: "Colour / intent.",
      table: { category: "Props", defaultValue: { summary: "primary" } },
    },
    label: { control: "text", table: { category: "Slot" } },
  },
  args: { variant: "primary", label: "Primary" },
  render: (a) => html`<andy-badge variant=${a.variant}>${a.label}</andy-badge>`,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Types: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <andy-badge variant="primary">Primary</andy-badge>
      <andy-badge variant="secondary">Secondary</andy-badge>
      <andy-badge variant="success">Success</andy-badge>
      <andy-badge variant="warning">Warning</andy-badge>
      <andy-badge variant="error">Error</andy-badge>
      <andy-badge variant="info">Info</andy-badge>
    </div>
  `,
};
