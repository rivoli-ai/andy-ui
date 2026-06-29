import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Elements/Status",
  component: "andy-status",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Status pill with a leading dot (`.ds-status`), for health/state indicators. The sibling `<andy-version-pill>` renders a monospace version tag.",
      },
    },
  },
  argTypes: {
    status: {
      control: "inline-radio",
      options: ["healthy", "error", "disabled", "unknown"],
      description: "State the dot + colours reflect.",
      table: { category: "Props", defaultValue: { summary: "unknown" } },
    },
    label: { control: "text", table: { category: "Slot" } },
  },
  args: { status: "healthy", label: "Healthy" },
  render: (a) => html`<andy-status status=${a.status}>${a.label}</andy-status>`,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const States: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <andy-status status="healthy">Healthy</andy-status>
      <andy-status status="error">Unhealthy</andy-status>
      <andy-status status="disabled">Disabled</andy-status>
      <andy-status status="unknown">Unknown</andy-status>
      <andy-version-pill>v2.4.1</andy-version-pill>
    </div>
  `,
};

export const VersionPill: Story = {
  parameters: { docs: { description: { story: "`<andy-version-pill>` — monospace version tag." } } },
  render: () => html`<andy-version-pill>1.3.0</andy-version-pill>`,
};
