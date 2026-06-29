import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Layouts/Footer",
  component: "andy-footer",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "User card (`<andy-footer>`): an `<andy-avatar>` plus a name and email. Used in the `<andy-sidebar>` `footer` slot — the text hides when the sidebar is collapsed.",
      },
    },
  },
  argTypes: {
    name: { control: "text", table: { category: "Props" } },
    email: { control: "text", table: { category: "Props" } },
    avatar: { control: "text", description: "Avatar initials.", table: { category: "Props" } },
  },
  args: { name: "Andy", email: "andy@andy-ui.dev", avatar: "AY" },
  render: (a) => html`
    <div style="max-width:280px">
      <andy-footer name=${a.name} email=${a.email} avatar=${a.avatar}></andy-footer>
    </div>
  `,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};
