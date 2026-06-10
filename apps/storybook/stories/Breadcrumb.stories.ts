import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Collections/Breadcrumb",
  component: "andy-breadcrumb",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Path breadcrumb (`.dp-breadcrumb`). Provide `items` (`{ label, href? }[]`); the last is the current leaf. Fires `andy-navigate` when a crumb is clicked.",
      },
    },
  },
  argTypes: {
    items: { control: "object", table: { category: "Props" } },
  },
  args: {
    items: [
      { label: "repos", href: "#" },
      { label: "devpilot-api", href: "#" },
      { label: "src", href: "#" },
      { label: "index.ts" },
    ],
  },
  render: (a) => html`<andy-breadcrumb .items=${a.items}></andy-breadcrumb>`,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};
