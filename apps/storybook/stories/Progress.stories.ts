import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Modules/Progress",
  component: "andy-progress",
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "Slim progress bar (`.ds-progress`). `value` is 0–100; exposes `role=progressbar` with aria-value attributes." } } },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 }, table: { category: "Props", defaultValue: { summary: "0" } } },
  },
  args: { value: 65 },
  render: (a) => html`<div style="max-width:320px"><andy-progress .value=${a.value}></andy-progress></div>`,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Variations: Story = {
  parameters: { docs: { description: { story: "A range of completion values." } } },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;max-width:320px">
      ${[0, 35, 65, 100].map(
        (v) => html`<div style="display:flex;flex-direction:column;gap:6px">
          <span class="t-meta">${v}%</span>
          <andy-progress .value=${v}></andy-progress>
        </div>`
      )}
    </div>
  `,
};
