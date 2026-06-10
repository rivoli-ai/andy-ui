import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const OPTIONS = [
  { value: "all", label: "All namespaces" },
  { value: "core", label: "platform-core" },
  { value: "data", label: "data-pipeline" },
];

const meta: Meta = {
  title: "Collections/Form/Select",
  component: "andy-select",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Styled native `<select>` (`.ds-select`). Provide choices via the `options` property (`{ value, label }[]`). Fires `andy-change` with the selected value in `event.detail`.",
      },
    },
  },
  argTypes: {
    label: { control: "text", table: { category: "Props" } },
    value: { control: "text", table: { category: "Props" } },
    options: { control: "object", table: { category: "Props" } },
  },
  args: { label: "Namespace", value: "all", options: OPTIONS },
  render: (a) => html`
    <div style="max-width:360px">
      <andy-select label=${a.label} .value=${a.value} .options=${a.options}></andy-select>
    </div>
  `,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};
