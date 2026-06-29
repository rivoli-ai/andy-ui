import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Elements/Theme toggle",
  component: "andy-theme-toggle",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Light/dark switch that drives `<html data-theme>` and persists the choice. Fires `andy-theme-change`. (The Storybook toolbar's Theme control does the same thing globally.)",
      },
    },
  },
  render: () => html`
    <div style="display:flex;align-items:center;gap:16px">
      <andy-theme-toggle></andy-theme-toggle>
      <span class="t-body">Toggle light / dark.</span>
    </div>
  `,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};
