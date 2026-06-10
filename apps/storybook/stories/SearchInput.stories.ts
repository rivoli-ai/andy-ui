import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Collections/Form/Search input",
  component: "andy-search-input",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Search box with a leading magnifier icon. Fires `andy-input` with the current query in `event.detail`.",
      },
    },
  },
  argTypes: {
    value: { control: "text", table: { category: "Props" } },
    placeholder: { control: "text", table: { category: "Props", defaultValue: { summary: "Search…" } } },
  },
  args: { value: "", placeholder: "Search skills…" },
  render: (a) => html`
    <div style="max-width:360px">
      <andy-search-input .value=${a.value} placeholder=${a.placeholder}></andy-search-input>
    </div>
  `,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};
