import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Modules/Modal",
  component: "andy-modal",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Dialog with overlay (`.modal-overlay` / `.modal-content`). Open it by setting the `open` property. Closes on backdrop click, the ✕, or Escape (unless `persistent`); fires `andy-close`. Slot in the body and footer actions.",
      },
    },
  },
  argTypes: {
    open: { control: "boolean", table: { category: "Props" } },
    heading: { control: "text", table: { category: "Props" } },
    persistent: { control: "boolean", table: { category: "Props" } },
  },
  args: { open: false, heading: "Delete this repository?", persistent: false },
  render: (a) => {
    const open = (e: Event) => {
      const modal = (e.target as HTMLElement).parentElement!.querySelector("andy-modal") as HTMLElement & { open: boolean };
      modal.open = true;
    };
    const close = (e: Event) => ((e.target as HTMLElement).closest("andy-modal") as HTMLElement & { close(): void }).close();
    return html`
      <div>
        <andy-button @andy-click=${open}>Open dialog</andy-button>
        <andy-modal ?open=${a.open} heading=${a.heading} ?persistent=${a.persistent}>
          <p class="modal-description">This removes <strong>devpilot-api</strong> and its backlog. This cannot be undone.</p>
          <div class="modal-footer" style="margin-top:16px">
            <andy-button variant="secondary" @andy-click=${close}>Cancel</andy-button>
            <andy-button variant="error" @andy-click=${close}>Delete</andy-button>
          </div>
        </andy-modal>
      </div>
    `;
  },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};
