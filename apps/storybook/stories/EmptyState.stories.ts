import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Views/Empty state",
  component: "andy-empty-state",
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "Zero-data placeholder (`.ds-empty`) with an icon, heading, copy, and a slot for an action." } } },
  argTypes: {
    heading: { control: "text", table: { category: "Props" } },
    copy: { control: "text", table: { category: "Props" } },
  },
  args: { heading: "No API keys yet", copy: "Generate a key to let an MCP client connect without OAuth2." },
  render: (a) => html`
    <andy-empty-state heading=${a.heading} copy=${a.copy}>
      <andy-button variant="primary">Generate first key</andy-button>
    </andy-empty-state>
  `,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};
