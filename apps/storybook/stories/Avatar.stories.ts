import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Elements/Avatar",
  component: "andy-avatar",
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "Initials / icon avatar (`.ds-avatar`)." } } },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"], table: { category: "Props", defaultValue: { summary: "md" } } },
    round: { control: "boolean", table: { category: "Props" } },
    label: { control: "text", table: { category: "Slot" } },
  },
  args: { size: "md", round: true, label: "AY" },
  render: (a) => html`<andy-avatar size=${a.size} ?round=${a.round}>${a.label}</andy-avatar>`,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Variations: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center">
      <andy-avatar size="sm" round>AY</andy-avatar>
      <andy-avatar size="md" round>AY</andy-avatar>
      <andy-avatar size="lg" round>AY</andy-avatar>
    </div>
  `,
};
