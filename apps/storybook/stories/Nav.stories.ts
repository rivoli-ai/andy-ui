import { html, svg } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const repoIcon = svg`<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-7l-2-2H5a2 2 0 00-2 2z" /></svg>`;

const meta: Meta = {
  title: "Collections/Nav list",
  component: "andy-nav-item",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Sidebar navigation: `<andy-nav-list>` wraps `<andy-nav-item>` rows. Each item takes `active`, `href`, and a `key`; clicking fires `andy-select` with the `key` in `event.detail`. Slot an icon via `slot=\"icon\"`.",
      },
    },
  },
  render: () => html`
    <div style="max-width:280px">
      <andy-nav-list>
        <andy-nav-item key="repos" active><span slot="icon">${repoIcon}</span><span>Repositories</span></andy-nav-item>
        <andy-nav-item key="chat"><span slot="icon">${repoIcon}</span><span>Chat</span></andy-nav-item>
        <andy-nav-item key="settings"><span slot="icon">${repoIcon}</span><span>Settings</span></andy-nav-item>
      </andy-nav-list>
    </div>
  `,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};
