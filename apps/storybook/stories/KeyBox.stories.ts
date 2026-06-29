import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Elements/Key box",
  component: "andy-key-box",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Secret / API-key row with reveal + copy (`.ds-key-box`). Pass the full `value`; the masked display is derived (or override with `masked`). Fires `andy-copy` when copied.",
      },
    },
  },
  argTypes: {
    value: { control: "text", table: { category: "Props" } },
    masked: { control: "text", description: "Optional explicit masked text.", table: { category: "Props" } },
  },
  args: { value: "mcp_live_8d2c41a7be9043f5af2c0e7b3f9a", masked: "" },
  render: (a) => html`<div style="max-width:520px"><andy-key-box value=${a.value} masked=${a.masked}></andy-key-box></div>`,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};
