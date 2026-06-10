import { html, svg } from "lit";
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
          "Application layout: `<andy-app-shell>` lays out a `<andy-sidebar slot=\"sidebar\">`, an `<andy-header slot=\"header\">`, and the scrolling page content. The sidebar's collapse button emits `andy-collapse-toggle`; the shell listens and animates the grid. Compose nav with `<andy-nav-section>` + `<andy-nav-item>`.",
      },
    },
  },
  render: () => html`
    <div style="height:680px">
      <andy-app-shell>
        <andy-sidebar slot="sidebar">
          <span slot="brand" class="sidebar-brand__mark">
            <svg class="logo-icon" viewBox="0 0 24 24" fill="none"><path d="M12 3 3.5 7.2 12 11.4l8.5-4.2L12 3Z" fill="currentColor" opacity=".95" /></svg>
          </span>
          <span slot="brand" class="sidebar-brand__text collapsed-hide">
            <span class="sidebar-brand__name">Andy-UI</span>
            <span class="sidebar-brand__tagline">Workspace</span>
          </span>

          <andy-nav-section heading="Build">
            <andy-nav-item key="agents" active><span slot="icon">${icon("M5 17h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z")}</span><span>Agents</span></andy-nav-item>
            <andy-nav-item key="skills"><span slot="icon">${icon("M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z")}</span><span>Skills</span></andy-nav-item>
          </andy-nav-section>
          <andy-nav-section heading="Connect">
            <andy-nav-item key="adapters"><span slot="icon">${icon("M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z")}</span><span>Adapters</span></andy-nav-item>
            <andy-nav-item key="keys"><span slot="icon">${icon("M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78z")}</span><span>API Keys</span></andy-nav-item>
          </andy-nav-section>

          <div slot="footer" class="sidebar-user">
            <span class="sidebar-user__avatar">AY</span>
            <span class="sidebar-user__meta collapsed-hide">
              <span class="sidebar-user__name">Andy</span>
              <span class="sidebar-user__email">andy@andy-ui.dev</span>
            </span>
          </div>
        </andy-sidebar>

        <andy-header slot="header">
          <andy-breadcrumb .items=${[{ label: "workspace", href: "#" }, { label: "agents" }]}></andy-breadcrumb>
          <andy-theme-toggle slot="actions"></andy-theme-toggle>
        </andy-header>

        <div class="au-page-heading" style="margin-bottom:20px">
          <span class="au-icon-chip">${icon("M5 17h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z")}</span>
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

function icon(path: string) {
  return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${svg`<path d=${path} />`}</svg>`;
}

export const Overview: Story = {};
