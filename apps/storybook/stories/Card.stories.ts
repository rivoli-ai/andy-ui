import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Views/Card",
  component: "andy-card",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Surface card (`.dp-card`). Set `hoverable` for the lift + glow interaction; `pad` controls inner padding." } },
  },
  argTypes: {
    hoverable: { control: "boolean", table: { category: "Props" } },
    pad: {
      control: "inline-radio",
      options: ["none", "sm", "md", "lg"],
      table: { category: "Props", defaultValue: { summary: "md" } },
    },
  },
  args: { hoverable: true, pad: "md" },
  render: (a) => html`
    <div style="max-width:320px">
      <andy-card ?hoverable=${a.hoverable} pad=${a.pad}>
        <span class="t-eyebrow">Hoverable</span>
        <h3 class="t-h3" style="margin:6px 0">Lift + glow</h3>
        <p class="t-body-sm" style="margin:0">Hover me — border bumps and the card lifts.</p>
      </andy-card>
    </div>
  `,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};
