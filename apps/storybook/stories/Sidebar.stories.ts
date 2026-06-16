import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Layouts/Sidebar",
  component: "andy-sidebar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Collapsible workspace sidebar (`<andy-sidebar>`), composed entirely from Andy-UI components: `<andy-sidebar-brand>` for the logo, `<andy-nav-section>` / `<andy-nav-item>` (with `<andy-icon>` icons) for navigation, and `<andy-sidebar-user>` for the footer — no raw markup needed. The collapse button fires `andy-collapse-toggle`.",
      },
    },
  },
  argTypes: {
    collapsed: { control: "boolean", description: "Rail (icon-only) mode.", table: { category: "Props" } },
    collapsible: { control: "boolean", description: "Show the collapse toggle.", table: { category: "Props", defaultValue: { summary: "true" } } },
  },
  args: { collapsed: false, collapsible: true },
  // `transform` makes the sidebar's `position: fixed` resolve to this box.
  render: (a) => html`
    <div style="transform: translateZ(0); position: relative; width: 280px; height: 560px">
      <andy-sidebar ?collapsed=${a.collapsed} ?collapsible=${a.collapsible}>
        <andy-header slot="brand" name="Andy-UI" tagline="Workspace" icon="box"></andy-header>

        <andy-nav-section heading="Build">
          <andy-nav-item key="agents" active><andy-icon slot="icon" name="grid"></andy-icon>Agents</andy-nav-item>
          <andy-nav-item key="skills"><andy-icon slot="icon" name="box"></andy-icon>Skills</andy-nav-item>
        </andy-nav-section>
        <andy-nav-section heading="Connect">
          <andy-nav-item key="adapters"><andy-icon slot="icon" name="link"></andy-icon>Adapters</andy-nav-item>
          <andy-nav-item key="keys"><andy-icon slot="icon" name="key"></andy-icon>API Keys</andy-nav-item>
        </andy-nav-section>

        <andy-footer slot="footer" name="Andy" email="andy@andy-ui.dev" avatar="AY"></andy-footer>
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
