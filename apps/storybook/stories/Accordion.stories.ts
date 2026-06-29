import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Modules/Accordion",
  component: "andy-accordion",
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "Collapsible disclosure (the `.ds-think` / collapse pattern). Fires `andy-toggle` with the new open state." } } },
  argTypes: {
    heading: { control: "text", table: { category: "Props" } },
    open: { control: "boolean", table: { category: "Props" } },
  },
  args: { heading: "Reasoning", open: false },
  render: (a) => html`
    <div style="max-width:480px">
      <andy-accordion heading=${a.heading} ?open=${a.open}>
        <p class="t-body-sm">Scanned 3 test files, grouped by suite, then diffed the failing assertions.</p>
      </andy-accordion>
    </div>
  `,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const States: Story = {
  parameters: { docs: { description: { story: "Collapsed (default) and expanded." } } },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px;max-width:480px">
      <andy-accordion heading="Collapsed (default)">
        <p class="t-body-sm">Hidden until the header is activated.</p>
      </andy-accordion>
      <andy-accordion heading="Expanded" open>
        <p class="t-body-sm">Scanned 3 test files, grouped by suite, then diffed the failing assertions.</p>
      </andy-accordion>
    </div>
  `,
};
