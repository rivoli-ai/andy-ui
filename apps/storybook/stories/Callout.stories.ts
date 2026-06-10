import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Modules/Callout",
  component: "andy-callout",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Inline note / banner (`.ds-callout`) with a variant icon. Slot in rich body content." } },
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["info", "warning", "success", "error"],
      table: { category: "Props", defaultValue: { summary: "info" } },
    },
    body: { control: "text", table: { category: "Slot" } },
  },
  args: { variant: "warning", body: "Copy this key now. You can re-display it later." },
  render: (a) => html`<div style="max-width:560px"><andy-callout variant=${a.variant}>${a.body}</andy-callout></div>`,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Types: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px;max-width:560px">
      <andy-callout variant="info">This adapter speaks MCP over both <code>/mcp</code> and <code>/sse</code>.</andy-callout>
      <andy-callout variant="success">Backlog generated successfully.</andy-callout>
      <andy-callout variant="warning"><strong>Copy this key now.</strong> You can re-display it later.</andy-callout>
      <andy-callout variant="error">Connection failed — check your token and retry.</andy-callout>
    </div>
  `,
};
