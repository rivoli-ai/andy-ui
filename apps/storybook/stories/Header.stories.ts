import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import { iconNames } from "@andy-ui/core";

const meta: Meta = {
  title: "Layouts/Header",
  component: "andy-header",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Brand header (`<andy-header>`): a logo mark (`<andy-icon-chip>`) plus a name and tagline. Used in the `<andy-sidebar>` `brand` slot — the text hides when the sidebar is collapsed. Slot a custom `logo` to override the icon.",
      },
    },
  },
  argTypes: {
    name: { control: "text", table: { category: "Props" } },
    tagline: { control: "text", table: { category: "Props" } },
    icon: { control: "select", options: iconNames, description: "Mark icon (ignored if a logo is slotted).", table: { category: "Props" } },
  },
  args: { name: "Andy-UI", tagline: "Workspace", icon: "box" },
  render: (a) => html`<andy-header name=${a.name} tagline=${a.tagline} icon=${a.icon}></andy-header>`,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const CustomLogo: Story = {
  parameters: { docs: { description: { story: "A custom SVG slotted as the logo." } } },
  render: () => html`
    <andy-header name="Andy-UI" tagline="Workspace">
      <svg slot="logo" viewBox="0 0 24 24" fill="none"><path d="M12 3 3.5 7.2 12 11.4l8.5-4.2L12 3Z" fill="currentColor" opacity=".95" /></svg>
    </andy-header>
  `,
};
