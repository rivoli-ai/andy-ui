import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Layouts/App shell",
  component: "andy-app-shell",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Application layout: `<andy-app-shell>` lays out a `<andy-sidebar slot=\"sidebar\">`, an `<andy-header slot=\"header\">`, and the scrolling page content. The sidebar is composed entirely from Andy-UI components (`<andy-sidebar-brand>`, `<andy-nav-section>` / `<andy-nav-item>` with `<andy-icon>`, `<andy-sidebar-user>`). The collapse button emits `andy-collapse-toggle`; the shell animates the grid.",
      },
    },
  },
  render: () => html`
    <div style="height:680px">
      <andy-app-shell>
        <andy-sidebar slot="sidebar">
          <andy-sidebar-brand slot="brand" name="Andy-UI" tagline="Workspace" icon="box"></andy-sidebar-brand>

          <andy-nav-section heading="Build">
            <andy-nav-item key="agents" active><andy-icon slot="icon" name="grid"></andy-icon>Agents</andy-nav-item>
            <andy-nav-item key="skills"><andy-icon slot="icon" name="box"></andy-icon>Skills</andy-nav-item>
          </andy-nav-section>
          <andy-nav-section heading="Connect">
            <andy-nav-item key="adapters"><andy-icon slot="icon" name="link"></andy-icon>Adapters</andy-nav-item>
            <andy-nav-item key="keys"><andy-icon slot="icon" name="key"></andy-icon>API Keys</andy-nav-item>
          </andy-nav-section>

          <andy-sidebar-user slot="footer" name="Andy" email="andy@andy-ui.dev" avatar="AY"></andy-sidebar-user>
        </andy-sidebar>

        <andy-header slot="header">
          <andy-breadcrumb .items=${[{ label: "workspace", href: "#" }, { label: "agents" }]}></andy-breadcrumb>
          <andy-theme-toggle slot="actions"></andy-theme-toggle>
        </andy-header>

        <div class="au-page-heading" style="margin-bottom:20px">
          <andy-icon-chip icon="grid"></andy-icon-chip>
          <div class="au-page-heading__text"><h1>AI Agents</h1><p>Manage intelligent agents and automate your tasks.</p></div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px">
          <andy-card hoverable><h3 class="t-h3" style="margin:0 0 6px">Release Orchestrator</h3><p class="t-body-sm" style="margin:0">Coordinates multi-repo releases.</p></andy-card>
          <andy-card hoverable><h3 class="t-h3" style="margin:0 0 6px">Support Triage</h3><p class="t-body-sm" style="margin:0">Classifies inbound tickets.</p></andy-card>
        </div>
      </andy-app-shell>
    </div>
  `,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};
