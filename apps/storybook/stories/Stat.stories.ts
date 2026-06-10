import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Elements/Stat",
  component: "andy-stat",
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "A single metric tile (`.ds-stat`) — a large value over a label." } } },
  argTypes: {
    value: { control: "text", table: { category: "Props" } },
    label: { control: "text", table: { category: "Props" } },
  },
  args: { value: "1,284", label: "Tool calls today" },
  render: (a) => html`<andy-stat value=${a.value} label=${a.label}></andy-stat>`,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Group: Story = {
  render: () => html`
    <div style="display:flex;gap:12px">
      <andy-stat value="1,284" label="Tool calls today"></andy-stat>
      <andy-stat value="98.2%" label="Success rate"></andy-stat>
    </div>
  `,
};
