import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Elements/Button",
  component: "andy-button",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The design-system button. Renders a native `<button>` (so it's keyboard- and form-friendly) styled with the `.btn` classes. Fires `andy-click` on activation; clicks are suppressed while `disabled` or `loading`.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "error", "ghost"],
      description: "Visual style / intent.",
      table: { category: "Props", defaultValue: { summary: "primary" } },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      description: "Control height (36 / 44 / 52px).",
      table: { category: "Props", defaultValue: { summary: "md" } },
    },
    disabled: { control: "boolean", description: "Disable interaction.", table: { category: "Props" } },
    loading: { control: "boolean", description: "Show a spinner and block clicks.", table: { category: "Props" } },
    type: {
      control: "inline-radio",
      options: ["button", "submit", "reset"],
      description: "Native button type, useful inside a form.",
      table: { category: "Props", defaultValue: { summary: "button" } },
    },
    label: { control: "text", description: "Slotted label (demo only).", table: { category: "Slot" } },
  },
  args: { variant: "primary", size: "md", disabled: false, loading: false, type: "button", label: "Save changes" },
  render: (a) => html`
    <andy-button
      variant=${a.variant}
      size=${a.size}
      type=${a.type}
      ?disabled=${a.disabled}
      ?loading=${a.loading}
    >
      ${a.label}
    </andy-button>
  `,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Types: Story = {
  parameters: { docs: { description: { story: "Every intent variant." } } },
  render: () => html`
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <andy-button variant="primary">Primary</andy-button>
      <andy-button variant="secondary">Secondary</andy-button>
      <andy-button variant="success">Success</andy-button>
      <andy-button variant="warning">Warning</andy-button>
      <andy-button variant="error">Delete</andy-button>
      <andy-button variant="ghost">Dismiss</andy-button>
    </div>
  `,
};

export const States: Story = {
  parameters: { docs: { description: { story: "The disabled and loading states." } } },
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
      <andy-button disabled>Disabled</andy-button>
      <andy-button loading>Loading</andy-button>
    </div>
  `,
};

export const Variations: Story = {
  parameters: { docs: { description: { story: "The three control sizes." } } },
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
      <andy-button size="sm">Small</andy-button>
      <andy-button size="md">Medium</andy-button>
      <andy-button size="lg">Large</andy-button>
    </div>
  `,
};
