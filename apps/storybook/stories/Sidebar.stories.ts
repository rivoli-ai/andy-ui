import { html, svg } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const navIcon = (path: string) =>
  svg`<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d=${path} /></svg>`;

const meta: Meta = {
  title: "Layouts/Sidebar",
  component: "andy-sidebar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Collapsible workspace sidebar (`<andy-sidebar>`). Slot a brand mark, `<andy-nav-section>` groups holding `<andy-nav-item>` rows, and an optional footer. The collapse button fires `andy-collapse-toggle`; inside `<andy-app-shell>` the shell mirrors that to animate the grid.",
      },
    },
  },
  argTypes: {
    collapsed: { control: "boolean", description: "Rail (icon-only) mode.", table: { category: "Props" } },
    collapsible: { control: "boolean", description: "Show the collapse toggle.", table: { category: "Props", defaultValue: { summary: "true" } } },
  },
  args: { collapsed: false, collapsible: true },
  // `transform` makes the sidebar's `position: fixed` resolve to this box, so it
  // stays inside the story canvas instead of pinning to the viewport.
  render: (a) => html`
    <div style="transform: translateZ(0); position: relative; width: 280px; height: 560px">
      <andy-sidebar ?collapsed=${a.collapsed} ?collapsible=${a.collapsible}>
        <span slot="brand" class="sidebar-brand__mark">
          <svg class="logo-icon" viewBox="0 0 24 24" fill="none"><path d="M12 3 3.5 7.2 12 11.4l8.5-4.2L12 3Z" fill="currentColor" opacity=".95" /></svg>
        </span>
        <span slot="brand" class="sidebar-brand__text collapsed-hide">
          <span class="sidebar-brand__name">Andy-UI</span>
          <span class="sidebar-brand__tagline">Workspace</span>
        </span>

        <andy-nav-section heading="Build">
          <andy-nav-item key="agents" active
            ><span slot="icon">${navIcon("M5 17h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z")}</span><span>Agents</span></andy-nav-item
          >
          <andy-nav-item key="skills"
            ><span slot="icon">${navIcon("M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z")}</span><span>Skills</span></andy-nav-item
          >
        </andy-nav-section>
        <andy-nav-section heading="Connect">
          <andy-nav-item key="adapters"
            ><span slot="icon">${navIcon("M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z")}</span><span>Adapters</span></andy-nav-item
          >
          <andy-nav-item key="keys"
            ><span slot="icon">${navIcon("M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78z")}</span><span>API Keys</span></andy-nav-item
          >
        </andy-nav-section>

        <div slot="footer" class="sidebar-user">
          <span class="sidebar-user__avatar">AY</span>
          <span class="sidebar-user__meta collapsed-hide">
            <span class="sidebar-user__name">Andy</span>
            <span class="sidebar-user__email">andy@andy-ui.dev</span>
          </span>
        </div>
      </andy-sidebar>
    </div>
  `,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Collapsed: Story = {
  parameters: { docs: { description: { story: "Collapsed rail (icon-only) mode." } } },
  args: { collapsed: true },
};
