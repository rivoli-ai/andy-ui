import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Modules/Tabs",
  component: "andy-tabs",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Segmented control / provider tabs. Provide `tabs` (`{ id, label, count? }[]`) and the `active` id; fires `andy-change` with the selected id. `variant` switches between the `segment` and `provider` styles.",
      },
    },
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["segment", "provider"], table: { category: "Props", defaultValue: { summary: "segment" } } },
    active: { control: "text", table: { category: "Props" } },
    tabs: { control: "object", table: { category: "Props" } },
  },
  args: {
    variant: "provider",
    active: "github",
    tabs: [
      { id: "github", label: "GitHub", count: 12 },
      { id: "azure", label: "Azure", count: 5 },
      { id: "local", label: "Local", count: 3 },
    ],
  },
  render: (a) => html`<andy-tabs variant=${a.variant} active=${a.active} .tabs=${a.tabs}></andy-tabs>`,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Segment: Story = {
  render: () => html`
    <andy-tabs
      variant="segment"
      active="list"
      .tabs=${[
        { id: "list", label: "List" },
        { id: "grid", label: "Grid" },
      ]}
    ></andy-tabs>
  `,
};
