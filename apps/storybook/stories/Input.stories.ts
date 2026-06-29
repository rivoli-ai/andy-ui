import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Collections/Form/Input",
  component: "andy-input",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Labelled text field (`.dp-field` + `.dp-input`). Fires `andy-input` on every keystroke and `andy-change` on commit, with the value in `event.detail`. Set `error` to put it in the invalid state.",
      },
    },
  },
  argTypes: {
    label: { control: "text", table: { category: "Props" } },
    value: { control: "text", table: { category: "Props" } },
    placeholder: { control: "text", table: { category: "Props" } },
    type: { control: "text", description: "Native input type.", table: { category: "Props", defaultValue: { summary: "text" } } },
    required: { control: "boolean", table: { category: "Props" } },
    disabled: { control: "boolean", table: { category: "Props" } },
    error: { control: "text", description: "Validation message; presence flips to the error state.", table: { category: "Props" } },
  },
  args: { label: "Repository name", value: "", placeholder: "devpilot-api", type: "text", required: true, disabled: false, error: "" },
  render: (a) => html`
    <div style="max-width:360px">
      <andy-input
        label=${a.label}
        .value=${a.value}
        placeholder=${a.placeholder}
        type=${a.type}
        ?required=${a.required}
        ?disabled=${a.disabled}
        error=${a.error}
      ></andy-input>
    </div>
  `,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const States: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;max-width:360px">
      <andy-input label="Repository name" .required=${true} placeholder="devpilot-api"></andy-input>
      <andy-input label="With error" value="not-a-url" error="Must be a valid URL"></andy-input>
      <andy-input label="Disabled" value="locked" .disabled=${true}></andy-input>
    </div>
  `,
};
