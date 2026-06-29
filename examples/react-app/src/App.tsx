import { useState } from "react";
import {
  AppShell,
  Sidebar,
  NavSection,
  NavItem,
  Navbar,
  Header,
  Footer,
  Button,
  Card,
  SkillCard,
  Badge,
  Status,
  Table,
  KeyBox,
  Callout,
  EmptyState,
  IconChip,
  SearchInput,
  toast,
} from "@andy-ui/react";
import { AgentsIcon, SkillsIcon, AdaptersIcon, KeysIcon, PlusIcon } from "./icons";

type Screen = "agents" | "skills" | "adapters" | "keys";
type IconCmp = (p: { className?: string }) => JSX.Element;

const NAV: { key: Screen; label: string; Icon: IconCmp; section: string }[] = [
  { key: "agents", label: "Agents", Icon: AgentsIcon, section: "Build" },
  { key: "skills", label: "Skills", Icon: SkillsIcon, section: "Build" },
  { key: "adapters", label: "MCP Adapters", Icon: AdaptersIcon, section: "Connect" },
  { key: "keys", label: "API Keys", Icon: KeysIcon, section: "Connect" },
];

/**
 * NOTE on light-DOM projection: the Andy-UI container components reproject their
 * children, so we keep every screen mounted and toggle visibility (mirroring the
 * original showcase) rather than unmounting — unmounting a reprojected child
 * would fight React's DOM ownership.
 */
export function App() {
  const [screen, setScreen] = useState<Screen>("agents");
  const sections = ["Build", "Connect"];

  return (
    <AppShell>
      <Sidebar slot="sidebar">
        <Header slot="brand" name="Andy-UI" tagline="React" icon="box" />

        {sections.map((section) => (
          <NavSection key={section} heading={section}>
            {NAV.filter((n) => n.section === section).map(({ key, label, Icon }) => (
              <NavItem key={key} active={screen === key} onAndySelect={() => setScreen(key)}>
                <span slot="icon">
                  <Icon className="nav-icon" />
                </span>
                <span>{label}</span>
              </NavItem>
            ))}
          </NavSection>
        ))}

        <Footer slot="footer" name="Andy" email="andy@andy-ui.dev" avatar="AY" />
      </Sidebar>

      <Navbar
        slot="header"
        items={[{ label: "workspace", href: "#" }, { label: screen === "keys" ? "api-keys" : screen }]}
        searchPlaceholder="Search…"
      />

      <ScreenShell screen="agents" active={screen} title="AI Agents" copy="Manage intelligent agents and automate your tasks." Icon={AgentsIcon} cta="New agent">
        <AgentsScreen />
      </ScreenShell>
      <ScreenShell screen="skills" active={screen} title="Skills" copy="Publish reusable skill packages to namespaces." Icon={SkillsIcon} cta="New skill">
        <SkillsScreen />
      </ScreenShell>
      <ScreenShell screen="adapters" active={screen} title="MCP Adapters" copy="Manage and monitor your MCP adapters." Icon={AdaptersIcon} cta="New adapter">
        <AdaptersScreen />
      </ScreenShell>
      <ScreenShell screen="keys" active={screen} title="API keys" copy="Authenticate MCP clients that can't speak OAuth2." Icon={KeysIcon} cta="Generate key">
        <KeysScreen />
      </ScreenShell>
    </AppShell>
  );
}

function ScreenShell(props: {
  screen: Screen;
  active: Screen;
  title: string;
  copy: string;
  Icon: IconCmp;
  cta: string;
  children: React.ReactNode;
}) {
  const { Icon } = props;
  return (
    <section hidden={props.active !== props.screen}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 20 }}>
        <div className="au-page-heading">
          <IconChip>
            <Icon />
          </IconChip>
          <div className="au-page-heading__text">
            <h1>{props.title}</h1>
            <p>{props.copy}</p>
          </div>
        </div>
        <Button variant="primary" onAndyClick={() => toast.success(`${props.cta} clicked`)}>
          <PlusIcon className="nav-icon" />
          {props.cta}
        </Button>
      </div>
      {props.children}
    </section>
  );
}

function AgentsScreen() {
  const agents = [
    { name: "Release Orchestrator", desc: "Coordinates multi-repo releases and opens the deploy PR.", type: "Workflow", state: "healthy", label: "Active" },
    { name: "Support Triage", desc: "Classifies inbound tickets and drafts a first reply.", type: "Assistant", state: "disabled", label: "Inactive" },
    { name: "Docs Writer", desc: "Turns merged PRs into changelog and doc updates.", type: "Workflow", state: "healthy", label: "Active" },
  ] as const;
  return (
    <>
      <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "center" }}>
        <SearchInput placeholder="Search agents…" style={{ flex: 1, maxWidth: 320 }} />
        <span className="ds-muted">{agents.length} agents</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
        {agents.map((a) => (
          <Card key={a.name} hoverable>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <IconChip>
                <AgentsIcon />
              </IconChip>
              <h3 className="t-h3" style={{ margin: 0 }}>{a.name}</h3>
            </div>
            <p className="t-body-sm" style={{ marginTop: 0 }}>{a.desc}</p>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 12 }}>
              <Badge variant={a.type === "Workflow" ? "primary" : "secondary"}>{a.type}</Badge>
              <Status status={a.state}>{a.label}</Status>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function SkillsScreen() {
  const skills = [
    { heading: "PDF Extractor", description: "Pull text, tables and metadata from PDFs.", slug: "pdf-extract", version: "v2.1.0" },
    { heading: "Web Fetch", description: "Fetch and clean a URL into markdown.", slug: "web-fetch", version: "v1.4.2" },
    { heading: "SQL Runner", description: "Run read-only parameterised queries.", slug: "sql-runner", version: "v0.9.0" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 }}>
      {skills.map((s) => (
        <SkillCard key={s.slug} href="#" heading={s.heading} description={s.description} slug={s.slug} version={s.version} />
      ))}
    </div>
  );
}

function AdaptersScreen() {
  const adapters = [
    { name: "github-mcp", proto: "StreamableHttp", state: "healthy", label: "Enabled" },
    { name: "jira-mcp", proto: "Sse", state: "error", label: "Enabled" },
    { name: "slack-mcp", proto: "StreamableHttp", state: "disabled", label: "Disabled" },
  ] as const;
  return (
    <>
      <Callout variant="info" style={{ marginBottom: 16 }}>
        Adapters expose external tools to your agents over MCP. <code>jira-mcp</code> failed its last health check.
      </Callout>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
        {adapters.map((a) => (
          <Card key={a.name} hoverable>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
              <h3 className="t-h3" style={{ margin: 0 }}>{a.name}</h3>
              <Status status={a.state}>{a.label}</Status>
            </div>
            <p className="t-body-sm" style={{ marginBottom: 12 }}>Protocol: {a.proto}</p>
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="secondary" size="sm">View</Button>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function KeysScreen() {
  const keys = [
    { name: "zapier-prod", value: "mcp_7k2d9f4a3f9a", created: "Jan 8, 2025", used: "2h ago", status: "Active" },
    { name: "ci-runner", value: "mcp_9p1x4v7ma17b", created: "Dec 2, 2024", used: "5d ago", status: "Active" },
  ];
  return (
    <>
      <Table
        columns={[
          { key: "name", header: "Name", strong: true },
          { key: "created", header: "Created" },
          { key: "used", header: "Last used" },
          { key: "status", header: "Status" },
        ]}
        rows={keys}
      />
      <div style={{ marginTop: 20, maxWidth: 520 }}>
        <p className="t-label" style={{ marginBottom: 8 }}>Reveal &amp; copy a key</p>
        {keys.map((k) => (
          <div key={k.name} style={{ marginBottom: 8 }}>
            <KeyBox value={k.value} onAndyCopy={() => toast.info(`Copied ${k.name}`)} />
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24 }}>
        <EmptyState heading="That's every key" copy="Generate another to connect a new MCP client.">
          <Button variant="primary">Generate key</Button>
        </EmptyState>
      </div>
    </>
  );
}
