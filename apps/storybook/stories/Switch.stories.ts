import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Collections/Form/Switch",
  component: "andy-switch",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Toggle switch (`.ds-switch`) with an optional trailing label. Fires `andy-change` with the new boolean checked state.",
      },
    },
  },
  argTypes: {
    checked: { control: "boolean", table: { category: "Props" } },
    disabled: { control: "boolean", table: { category: "Props" } },
    label: { control: "text", table: { category: "Slot" } },
  },
  args: { checked: true, disabled: false, label: "Group by namespace" },
  render: (a) => html`<andy-switch ?checked=${a.checked} ?disabled=${a.disabled}>${a.label}</andy-switch>`,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const States: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px">
      <andy-switch .checked=${true}>Group by namespace</andy-switch>
      <andy-switch>Show archived</andy-switch>
      <andy-switch .checked=${true} .disabled=${true}>Disabled (on)</andy-switch>
    </div>
  `,
};
