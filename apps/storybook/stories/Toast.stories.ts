import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import { toast } from "@andy-ui/core";

const meta: Meta = {
  title: "Behaviors/Toast",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Toasts are **imperative**, not an element: call `toast.success(msg)` / `toast.info` / `toast.warning` / `toast.error`, or `showToast({ type, title, message, duration })`. A host is created on `<body>` automatically. The same API is re-exported from `@andy-ui/react` and wrapped by Angular's `ToastService`.",
      },
    },
  },
  render: () => html`
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <andy-button variant="secondary" @andy-click=${() => toast.success("Settings saved")}>Success</andy-button>
      <andy-button variant="secondary" @andy-click=${() => toast.info("Backlog imported")}>Info</andy-button>
      <andy-button variant="secondary" @andy-click=${() => toast.warning("Your API key expires in 3 days")}>Warning</andy-button>
      <andy-button variant="secondary" @andy-click=${() => toast.error("Connection failed — check your token")}>Error</andy-button>
    </div>
  `,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};
