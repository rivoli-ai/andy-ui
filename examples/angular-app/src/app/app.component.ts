import { Component, CUSTOM_ELEMENTS_SCHEMA, computed, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AndyUiModule, ToastService, type AndyCrumb } from "@andy-ui/angular";
import { IconComponent } from "./icon.component";

type Screen = "agents" | "skills" | "adapters" | "keys";

/**
 * Every `<andy-*>` tag is a custom element, so the component declares
 * CUSTOM_ELEMENTS_SCHEMA. Screens stay mounted and toggle with [hidden]
 * (the Andy-UI containers reproject their light-DOM children, so we avoid
 * structural add/remove of slotted content — mirroring the showcase).
 */
@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, FormsModule, AndyUiModule, IconComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <andy-app-shell>
      <andy-sidebar slot="sidebar">
        <andy-header slot="brand" name="Andy-UI" tagline="Angular" icon="box"></andy-header>

        @for (group of sections; track group) {
          <andy-nav-section [heading]="group">
            @for (item of navFor(group); track item.key) {
              <andy-nav-item [active]="screen() === item.key" (andy-select)="screen.set(item.key)">
                <app-icon slot="icon" [name]="item.key"></app-icon>
                <span>{{ item.label }}</span>
              </andy-nav-item>
            }
          </andy-nav-section>
        }

        <andy-footer slot="footer" name="Andy" email="andy&#64;andy-ui.dev" avatar="AY"></andy-footer>
      </andy-sidebar>

      <!-- crumbs() is a computed signal: a stable array reference per screen, so
           binding it does NOT reschedule Lit updates every change-detection pass. -->
      <andy-navbar slot="header" [items]="crumbs()" searchPlaceholder="Search…"></andy-navbar>

      <!-- AGENTS -->
      <section [hidden]="screen() !== 'agents'">
        <div class="screen-head">
          <div class="au-page-heading">
            <span class="au-icon-chip"><app-icon name="agents"></app-icon></span>
            <div class="au-page-heading__text"><h1>AI Agents</h1><p>Manage intelligent agents and automate your tasks.</p></div>
          </div>
          <andy-button variant="primary" (andy-click)="toast.success('New agent clicked')">New agent</andy-button>
        </div>
        <div style="display:flex;gap:12px;margin-bottom:20px;align-items:center">
          <andy-search-input placeholder="Search agents…" [(ngModel)]="search" style="flex:1;max-width:320px"></andy-search-input>
          <span class="ds-muted">{{ filteredAgents().length }} agents</span>
        </div>
        <div class="card-grid">
          @for (a of filteredAgents(); track a.name) {
            <andy-card hoverable>
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
                <span class="au-icon-chip"><app-icon name="agents"></app-icon></span>
                <h3 class="t-h3" style="margin:0">{{ a.name }}</h3>
              </div>
              <p class="t-body-sm" style="margin-top:0">{{ a.desc }}</p>
              <div style="display:flex;gap:8px;align-items:center;margin-top:12px">
                <andy-badge [variant]="a.type === 'Workflow' ? 'primary' : 'secondary'">{{ a.type }}</andy-badge>
                <andy-status [status]="a.state">{{ a.label }}</andy-status>
              </div>
            </andy-card>
          }
        </div>
      </section>

      <!-- SKILLS -->
      <section [hidden]="screen() !== 'skills'">
        <div class="screen-head">
          <div class="au-page-heading">
            <span class="au-icon-chip"><app-icon name="skills"></app-icon></span>
            <div class="au-page-heading__text"><h1>Skills</h1><p>Publish reusable skill packages to namespaces.</p></div>
          </div>
          <andy-button variant="primary" (andy-click)="toast.success('New skill clicked')">New skill</andy-button>
        </div>
        <div class="card-grid">
          @for (s of skills; track s.slug) {
            <andy-skill-card href="#" [heading]="s.heading" [description]="s.description" [slug]="s.slug" [version]="s.version"></andy-skill-card>
          }
        </div>
      </section>

      <!-- ADAPTERS -->
      <section [hidden]="screen() !== 'adapters'">
        <div class="screen-head">
          <div class="au-page-heading">
            <span class="au-icon-chip"><app-icon name="adapters"></app-icon></span>
            <div class="au-page-heading__text"><h1>MCP Adapters</h1><p>Manage and monitor your MCP adapters.</p></div>
          </div>
          <andy-button variant="primary" (andy-click)="toast.success('New adapter clicked')">New adapter</andy-button>
        </div>
        <andy-callout variant="info" style="margin-bottom:16px">
          Adapters expose external tools to your agents over MCP. <code>jira-mcp</code> failed its last health check.
        </andy-callout>
        <div class="card-grid">
          @for (a of adapters; track a.name) {
            <andy-card hoverable>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
                <h3 class="t-h3" style="margin:0">{{ a.name }}</h3>
                <andy-status [status]="a.state">{{ a.label }}</andy-status>
              </div>
              <p class="t-body-sm" style="margin-bottom:12px">Protocol: {{ a.proto }}</p>
              <div style="display:flex;gap:8px">
                <andy-button variant="secondary" size="sm">View</andy-button>
                <andy-button variant="ghost" size="sm">Edit</andy-button>
              </div>
            </andy-card>
          }
        </div>
      </section>

      <!-- KEYS -->
      <section [hidden]="screen() !== 'keys'">
        <div class="screen-head">
          <div class="au-page-heading">
            <span class="au-icon-chip"><app-icon name="keys"></app-icon></span>
            <div class="au-page-heading__text"><h1>API keys</h1><p>Authenticate MCP clients that can't speak OAuth2.</p></div>
          </div>
          <andy-button variant="primary" (andy-click)="toast.success('API key generated')">Generate key</andy-button>
        </div>
        <andy-table [columns]="keyColumns" [rows]="keys"></andy-table>
        <div style="margin-top:20px;max-width:520px">
          <p class="t-label" style="margin-bottom:8px">Reveal &amp; copy a key</p>
          @for (k of keys; track k.name) {
            <div style="margin-bottom:8px">
              <andy-key-box [value]="k.value" (andy-copy)="toast.info('Copied ' + k.name)"></andy-key-box>
            </div>
          }
        </div>
        <div style="margin-top:24px">
          <andy-empty-state heading="That's every key" copy="Generate another to connect a new MCP client.">
            <andy-button variant="primary">Generate key</andy-button>
          </andy-empty-state>
        </div>
      </section>
    </andy-app-shell>
  `,
  styles: [
    `:host { display: block; }
     .screen-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 20px; flex-wrap: wrap; }
     .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
     .nav-icon, .logo-icon { width: 20px; height: 20px; }`,
  ],
})
export class AppComponent {
  protected readonly toast = inject(ToastService);
  readonly screen = signal<Screen>("agents");
  search = "";

  readonly sections = ["Build", "Connect"] as const;

  private readonly nav: { key: Screen; label: string; section: string }[] = [
    { key: "agents", label: "Agents", section: "Build" },
    { key: "skills", label: "Skills", section: "Build" },
    { key: "adapters", label: "MCP Adapters", section: "Connect" },
    { key: "keys", label: "API Keys", section: "Connect" },
  ];

  navFor(section: string) {
    return this.nav.filter((n) => n.section === section);
  }

  readonly crumbs = computed<AndyCrumb[]>(() => [
    { label: "workspace", href: "#" },
    { label: this.screen() === "keys" ? "api-keys" : this.screen() },
  ]);

  readonly agents = [
    { name: "Release Orchestrator", desc: "Coordinates multi-repo releases and opens the deploy PR.", type: "Workflow", state: "healthy" as const, label: "Active" },
    { name: "Support Triage", desc: "Classifies inbound tickets and drafts a first reply.", type: "Assistant", state: "disabled" as const, label: "Inactive" },
    { name: "Docs Writer", desc: "Turns merged PRs into changelog and doc updates.", type: "Workflow", state: "healthy" as const, label: "Active" },
  ];
  filteredAgents() {
    const q = this.search.trim().toLowerCase();
    return q ? this.agents.filter((a) => a.name.toLowerCase().includes(q)) : this.agents;
  }

  readonly skills = [
    { heading: "PDF Extractor", description: "Pull text, tables and metadata from PDFs.", slug: "pdf-extract", version: "v2.1.0" },
    { heading: "Web Fetch", description: "Fetch and clean a URL into markdown.", slug: "web-fetch", version: "v1.4.2" },
    { heading: "SQL Runner", description: "Run read-only parameterised queries.", slug: "sql-runner", version: "v0.9.0" },
  ];

  readonly adapters = [
    { name: "github-mcp", proto: "StreamableHttp", state: "healthy" as const, label: "Enabled" },
    { name: "jira-mcp", proto: "Sse", state: "error" as const, label: "Enabled" },
    { name: "slack-mcp", proto: "StreamableHttp", state: "disabled" as const, label: "Disabled" },
  ];

  readonly keyColumns = [
    { key: "name", header: "Name", strong: true },
    { key: "created", header: "Created" },
    { key: "used", header: "Last used" },
    { key: "status", header: "Status" },
  ];
  readonly keys = [
    { name: "zapier-prod", value: "mcp_7k2d9f4a3f9a", created: "Jan 8, 2025", used: "2h ago", status: "Active" },
    { name: "ci-runner", value: "mcp_9p1x4v7ma17b", created: "Dec 2, 2024", used: "5d ago", status: "Active" },
  ];
}
