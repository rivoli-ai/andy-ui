/* @ds-bundle: {"format":3,"namespace":"DevPilotDesignSystem_019e30","components":[],"sourceHashes":{"export/src/App.jsx":"387b4529d7f5","export/src/Header.jsx":"425b1b9e3511","export/src/Screens.jsx":"23a8100de637","export/src/Sidebar.jsx":"7c5819a41311","figma/Board.jsx":"8ff5b7bf577d","figma/Header.jsx":"425b1b9e3511","figma/Screens.jsx":"23a8100de637","figma/Sidebar.jsx":"7c5819a41311","ui_kits/devpilot-workspace/App.jsx":"387b4529d7f5","ui_kits/devpilot-workspace/Header.jsx":"425b1b9e3511","ui_kits/devpilot-workspace/Screens.jsx":"23a8100de637","ui_kits/devpilot-workspace/Sidebar.jsx":"7c5819a41311"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DevPilotDesignSystem_019e30 = window.DevPilotDesignSystem_019e30 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// export/src/App.jsx
try { (() => {
/* global React, ReactDOM, Sidebar, Header, Repositories, Backlog, Code, Settings, ConfirmDelete, AddRepoModal, Icon */
// App.jsx — Workspace root.
// Routes mirror src/app/app.routes.ts:
//   /repositories  (default)        — top-level
//   /settings                       — top-level
//   /backlog/:repositoryId          — drill-down from repo card
//   /code/:repositoryId             — drill-down from repo card

function App() {
  const [route, setRoute] = React.useState({
    name: 'repositories'
  });
  const [theme, setTheme] = React.useState('light');
  const [collapsed, setCollapsed] = React.useState(false);
  const [toasts, setToasts] = React.useState([]);
  const [pendingDelete, setPendingDelete] = React.useState(null);
  const [addOpen, setAddOpen] = React.useState(false);
  const [sandboxCount, setSandboxCount] = React.useState(0);
  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  const onToast = React.useCallback((tone, title, msg) => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t, {
      id,
      tone,
      title,
      msg
    }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4200);
  }, []);

  // Active item in the sidebar — both /backlog/:id and /code/:id should keep
  // "Repositories" highlighted because they were entered from there.
  const activeNav = route.name === 'settings' ? 'settings' : 'repositories';
  const breadcrumb = (() => {
    switch (route.name) {
      case 'repositories':
        return ['repositories'];
      case 'settings':
        return ['settings'];
      case 'backlog':
        return ['repositories', route.repo.name, 'backlog'];
      case 'code':
        return ['repositories', route.repo.name, 'code'];
      default:
        return ['repositories'];
    }
  })();
  return /*#__PURE__*/React.createElement("div", {
    className: 'app-container' + (collapsed ? ' app-sidebar-collapsed' : '')
  }, /*#__PURE__*/React.createElement(Sidebar, {
    active: activeNav,
    onNavigate: id => setRoute({
      name: id
    }),
    collapsed: collapsed,
    onToggleCollapse: () => setCollapsed(c => !c)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: collapsed ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width)',
      transition: 'margin-left 0.2s ease',
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement(Header, {
    breadcrumb: breadcrumb,
    theme: theme,
    sandboxCount: sandboxCount,
    onToggleTheme: () => setTheme(t => t === 'light' ? 'dark' : 'light'),
    onToggleSidebarMobile: () => setCollapsed(c => !c)
  }), /*#__PURE__*/React.createElement("main", null, route.name === 'repositories' && /*#__PURE__*/React.createElement(Repositories, {
    onOpenBacklog: repo => {
      setRoute({
        name: 'backlog',
        repo
      });
      setSandboxCount(c => c + 1);
    },
    onOpenCode: repo => {
      setRoute({
        name: 'code',
        repo
      });
      setSandboxCount(c => c + 1);
    },
    onAskDelete: setPendingDelete,
    onShare: r => onToast('info', 'Share dialog', `Share invite list for ${r.name} would open here.`),
    onOpenAddRepo: () => setAddOpen(true),
    onToast: onToast
  }), route.name === 'backlog' && /*#__PURE__*/React.createElement(Backlog, {
    repo: route.repo,
    onBack: () => {
      setRoute({
        name: 'repositories'
      });
      setSandboxCount(c => Math.max(0, c - 1));
    },
    onToast: onToast
  }), route.name === 'code' && /*#__PURE__*/React.createElement(Code, {
    repo: route.repo,
    onBack: () => {
      setRoute({
        name: 'repositories'
      });
      setSandboxCount(c => Math.max(0, c - 1));
    }
  }), route.name === 'settings' && /*#__PURE__*/React.createElement(Settings, {
    onToast: onToast
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      right: 'var(--space-5)',
      bottom: 'var(--space-5)',
      display: 'flex',
      flexDirection: 'column-reverse',
      gap: 'var(--space-3)',
      zIndex: 500,
      pointerEvents: 'none'
    }
  }, toasts.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    className: 'dp-toast ' + t.tone,
    style: {
      pointerEvents: 'auto',
      animation: 'dp-toast-in 0.3s var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon-box"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": t.tone === 'success' ? 'check' : t.tone === 'info' ? 'info' : t.tone === 'warning' ? 'alert-triangle' : 'x-circle',
    width: "16",
    height: "16"
  })), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, t.title), /*#__PURE__*/React.createElement("div", {
    className: "msg"
  }, t.msg)), /*#__PURE__*/React.createElement("button", {
    className: "close",
    onClick: () => setToasts(ts => ts.filter(x => x.id !== t.id))
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "x",
    width: "14",
    height: "14"
  }))))), /*#__PURE__*/React.createElement(ConfirmDelete, {
    target: pendingDelete,
    onCancel: () => setPendingDelete(null),
    onConfirm: () => {
      const name = pendingDelete?.name;
      setPendingDelete(null);
      onToast('success', 'Repository removed', `${name} is no longer in this workspace.`);
    }
  }), /*#__PURE__*/React.createElement(AddRepoModal, {
    open: addOpen,
    onClose: () => setAddOpen(false),
    onSubmit: url => {
      setAddOpen(false);
      onToast('success', 'Repository added', url);
    }
  }));
}

// re-render Lucide icons when toasts mount/unmount
const observer = new MutationObserver(() => {
  if (window.lucide) window.lucide.createIcons();
});
observer.observe(document.body, {
  childList: true,
  subtree: true
});
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "export/src/App.jsx", error: String((e && e.message) || e) }); }

// export/src/Header.jsx
try { (() => {
/* global React, Icon */
// Header.jsx — DevPilot top bar, faithful to src/app/layout/header/

function Header({
  breadcrumb,
  theme,
  onToggleTheme,
  onToggleSidebarMobile,
  sandboxCount = 0
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header-content"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onToggleSidebarMobile,
    className: "menu-toggle",
    "aria-label": "Toggle menu"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "menu-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "12",
    x2: "21",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "6",
    x2: "21",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "18",
    x2: "21",
    y2: "18"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "header-title"
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    segments: breadcrumb
  })), /*#__PURE__*/React.createElement("div", {
    className: "header-actions"
  }, sandboxCount > 0 && /*#__PURE__*/React.createElement("div", {
    className: "header-sandbox",
    title: `${sandboxCount} running sandbox${sandboxCount === 1 ? '' : 'es'}`
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "header-sandbox-trigger",
    "aria-label": `${sandboxCount} sandboxes`
  }, /*#__PURE__*/React.createElement("span", {
    className: "header-sandbox-icon",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "3",
    width: "20",
    height: "14",
    rx: "0",
    ry: "0"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "21",
    x2: "16",
    y2: "21"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "17",
    x2: "12",
    y2: "21"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "header-sandbox-label"
  }, sandboxCount, " running"), /*#__PURE__*/React.createElement("span", {
    className: "header-sandbox-chev",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.25",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  }))))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onToggleTheme,
    className: "theme-toggle",
    "aria-label": "Toggle theme"
  }, theme === 'light' ? /*#__PURE__*/React.createElement("svg", {
    className: "theme-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
  })) : /*#__PURE__*/React.createElement("svg", {
    className: "theme-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "1",
    x2: "12",
    y2: "3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "21",
    x2: "12",
    y2: "23"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4.22",
    y1: "4.22",
    x2: "5.64",
    y2: "5.64"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18.36",
    y1: "18.36",
    x2: "19.78",
    y2: "19.78"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "1",
    y1: "12",
    x2: "3",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "12",
    x2: "23",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4.22",
    y1: "19.78",
    x2: "5.64",
    y2: "18.36"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18.36",
    y1: "5.64",
    x2: "19.78",
    y2: "4.22"
  }))))));
}

// Inline breadcrumb (the real app uses <app-breadcrumb /> — we render directly for simplicity)
function Breadcrumb({
  segments
}) {
  return /*#__PURE__*/React.createElement("nav", {
    className: "dp-breadcrumb",
    "aria-label": "Breadcrumb"
  }, segments.map((seg, i) => {
    const isLast = i === segments.length - 1;
    const isLink = i === 0;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, i > 0 && /*#__PURE__*/React.createElement("span", {
      className: "sep"
    }, "/"), isLast ? /*#__PURE__*/React.createElement("span", {
      className: "leaf"
    }, seg) : isLink ? /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => e.preventDefault()
    }, seg) : /*#__PURE__*/React.createElement("span", {
      className: "mid"
    }, seg));
  }));
}
Object.assign(window, {
  Header,
  Breadcrumb
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "export/src/Header.jsx", error: String((e && e.message) || e) }); }

// export/src/Screens.jsx
try { (() => {
/* global React, Icon */
// Screens.jsx — Source-faithful screen panels for ui_kits/devpilot-workspace

// ============================================================================
// Static demo data
// ============================================================================
const REPOS = [
// recent
{
  id: 'r1',
  name: 'devpilot-api',
  project: 'devpilot',
  provider: 'GitHub',
  branch: 'main',
  isPrivate: true,
  description: 'Backend services for the DevPilot workspace.',
  sharedWithCount: 4,
  recent: true
}, {
  id: 'r2',
  name: 'devpilot-web',
  project: 'devpilot',
  provider: 'GitHub',
  branch: 'main',
  isPrivate: true,
  description: 'Angular frontend (this repo).',
  sharedWithCount: 4,
  recent: true
}, {
  id: 'r3',
  name: 'design-system',
  project: 'devpilot',
  provider: 'GitHub',
  branch: 'main',
  isPrivate: false,
  description: 'Tokens, components, and the package you are looking at.',
  sharedWithCount: 7,
  recent: true
},
// others
{
  id: 'r4',
  name: 'devpilot-cli',
  project: 'devpilot',
  provider: 'GitHub',
  branch: 'dev',
  isPrivate: true,
  description: 'Local CLI for managing sandboxes from a terminal.'
}, {
  id: 'r5',
  name: 'devpilot-docs',
  project: 'devpilot',
  provider: 'GitHub',
  branch: 'main',
  isPrivate: false,
  description: 'Public documentation site.'
}, {
  id: 'r6',
  name: 'platform-infra',
  project: 'Platform',
  provider: 'AzureDevOps',
  branch: 'main',
  isPrivate: true,
  description: 'Terraform + ARM modules for shared infra.'
}, {
  id: 'r7',
  name: 'identity-svc',
  project: 'Platform',
  provider: 'AzureDevOps',
  branch: 'main',
  isPrivate: true,
  description: 'OIDC provider and SCIM bridge.'
}, {
  id: 'r8',
  name: 'spike-rust-grid',
  project: 'Sandbox',
  provider: 'Unpublished',
  branch: null,
  isPrivate: true,
  description: 'Local-only experiment with virtual scrolling.'
}];
const PROJECT_NAMES = {
  devpilot: 'devpilot',
  Platform: 'Platform',
  Sandbox: 'Sandbox'
};

// ============================================================================
// Reusable inline SVG icon helpers (source-faithful — match Angular templates)
// ============================================================================
const Svg = {
  github: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
  })),
  azure: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 6v12l-6 4V6l-8 2v12l-6-4V6l10-4 10 4z"
  })),
  local: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "3",
    width: "20",
    height: "14",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "21",
    x2: "16",
    y2: "21"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "17",
    x2: "12",
    y2: "21"
  })),
  branch: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "3",
    x2: "6",
    y2: "15"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "6",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "18",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 9a9 9 0 01-9 9"
  })),
  lock: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "11",
    width: "18",
    height: "11",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 11V7a5 5 0 0110 0v4"
  })),
  lockOpen: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "11",
    width: "18",
    height: "11",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 11V7a5 5 0 019.9-1"
  })),
  share: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "5",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "19",
    r: "3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8.59",
    y1: "13.51",
    x2: "15.42",
    y2: "17.49"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "15.41",
    y1: "6.51",
    x2: "8.59",
    y2: "10.49"
  })),
  trash: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "3 6 5 6 21 6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "10",
    y1: "11",
    x2: "10",
    y2: "17"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "14",
    y1: "11",
    x2: "14",
    y2: "17"
  })),
  backlog: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "6",
    x2: "21",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "12",
    x2: "21",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "18",
    x2: "21",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "6",
    x2: "3.01",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "12",
    x2: "3.01",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "18",
    x2: "3.01",
    y2: "18"
  })),
  code: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "16 18 22 12 16 6"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "8 6 2 12 8 18"
  })),
  search: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  })),
  sync: /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9m-9 9a9 9 0 0 1 9-9"
  })),
  continueIcon: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 8v4l3 3"
  })),
  grid: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "7",
    height: "7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "3",
    width: "7",
    height: "7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "14",
    width: "7",
    height: "7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "14",
    width: "7",
    height: "7"
  })),
  close: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })),
  empty: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })),
  arrowLeft: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "19",
    y1: "12",
    x2: "5",
    y2: "12"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 19 5 12 12 5"
  })),
  cog: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 1v6m0 10v6M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24M1 12h6m10 0h6M4.22 19.78l4.24-4.24m7.08-7.08l4.24-4.24"
  })),
  flask: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 2v6l-5 9a3 3 0 003 4h10a3 3 0 003-4l-5-9V2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 2h6"
  })),
  brain: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 4a3 3 0 00-3 3v2a3 3 0 00-3 3v2a3 3 0 003 3v0a3 3 0 003 3 3 3 0 003-3v0a3 3 0 003-3v-2a3 3 0 00-3-3V7a3 3 0 00-3-3z"
  })),
  feed: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 11a9 9 0 019 9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 4a16 16 0 0116 16"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "19",
    r: "1"
  }))
};
const Provider = {
  GitHub: {
    icon: Svg.github,
    label: 'GitHub',
    cls: 'github'
  },
  AzureDevOps: {
    icon: Svg.azure,
    label: 'Azure',
    cls: 'azure'
  },
  Unpublished: {
    icon: Svg.local,
    label: 'Local',
    cls: 'local'
  }
};

// ============================================================================
// REPOSITORIES
// ============================================================================
function RepositoryCard({
  repo,
  onOpenBacklog,
  onOpenCode,
  onAskDelete,
  onShare
}) {
  const prov = Provider[repo.provider] || {
    icon: null,
    label: repo.provider,
    cls: ''
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "repo-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "repo-card__top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "repo-card__chips"
  }, /*#__PURE__*/React.createElement("span", {
    className: 'repo-chip repo-chip--provider ' + prov.cls
  }, prov.icon, /*#__PURE__*/React.createElement("span", null, prov.label)), repo.branch && /*#__PURE__*/React.createElement("span", {
    className: "repo-chip repo-chip--branch",
    title: 'Default branch: ' + repo.branch
  }, Svg.branch, /*#__PURE__*/React.createElement("span", {
    className: "repo-chip-branch-text"
  }, repo.branch))), /*#__PURE__*/React.createElement("div", {
    className: "repo-card__top-actions"
  }, /*#__PURE__*/React.createElement("span", {
    className: "repo-vis-icon",
    title: repo.isPrivate ? 'Private repository' : 'Public repository'
  }, repo.isPrivate ? Svg.lock : Svg.lockOpen), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "repo-icon-btn",
    onClick: e => {
      e.stopPropagation();
      onShare(repo);
    },
    title: (repo.sharedWithCount ?? 0) > 0 ? `Shared with ${repo.sharedWithCount}` : 'Share repository'
  }, Svg.share), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "repo-icon-btn repo-icon-btn--danger",
    onClick: e => {
      e.stopPropagation();
      onAskDelete(repo);
    },
    title: "Remove repository"
  }, Svg.trash))), /*#__PURE__*/React.createElement("div", {
    className: "repo-card__body"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "repo-name"
  }, repo.name), repo.description && /*#__PURE__*/React.createElement("p", {
    className: "repo-description"
  }, repo.description)), /*#__PURE__*/React.createElement("div", {
    className: "repo-card-actions"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onOpenBacklog(repo);
    },
    className: "action-btn primary"
  }, Svg.backlog, /*#__PURE__*/React.createElement("span", null, "Backlog")), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onOpenCode(repo);
    },
    className: "action-btn secondary"
  }, Svg.code, /*#__PURE__*/React.createElement("span", null, "Code"))));
}
function Repositories({
  onOpenBacklog,
  onOpenCode,
  onAskDelete,
  onShare,
  onOpenAddRepo,
  onToast
}) {
  const [search, setSearch] = React.useState('');
  const [tab, setTab] = React.useState('all');
  const filtered = REPOS.filter(r => {
    if (tab !== 'all' && r.provider !== tab) return false;
    if (search && !(r.name + ' ' + (r.description || '')).toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const recents = filtered.filter(r => r.recent);
  const grouped = React.useMemo(() => {
    const map = new Map();
    for (const r of filtered) {
      if (!map.has(r.project)) map.set(r.project, []);
      map.get(r.project).push(r);
    }
    return [...map.entries()].map(([project, items]) => ({
      project,
      items
    }));
  }, [filtered]);
  const counts = {
    all: REPOS.length,
    GitHub: REPOS.filter(r => r.provider === 'GitHub').length,
    AzureDevOps: REPOS.filter(r => r.provider === 'AzureDevOps').length,
    Unpublished: REPOS.filter(r => r.provider === 'Unpublished').length
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "repositories-container",
    style: {
      padding: 'var(--space-5) var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dp-card p-sm sync-section",
    style: {
      padding: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sync-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sync-dropdown"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-md",
    onClick: () => onToast('info', 'Syncing repositories', 'Pulling from GitHub…')
  }, Svg.sync, /*#__PURE__*/React.createElement("span", null, "Sync Repositories"), /*#__PURE__*/React.createElement("svg", {
    className: "dropdown-arrow",
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "sync-info"
  }, /*#__PURE__*/React.createElement("p", {
    className: "sync-title"
  }, "Pull your latest repositories"), /*#__PURE__*/React.createElement("p", {
    className: "sync-help"
  }, "Sync repositories from your connected providers")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-md",
    onClick: onOpenAddRepo
  }, "Add manually"))), /*#__PURE__*/React.createElement("div", {
    className: "search-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-input-wrapper"
  }, /*#__PURE__*/React.createElement("span", {
    className: "search-icon"
  }, Svg.search), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "search-input",
    placeholder: "Search by project or repository name...",
    value: search,
    onChange: e => setSearch(e.target.value)
  })), /*#__PURE__*/React.createElement("span", {
    className: "search-meta"
  }, filtered.length, " ", filtered.length === 1 ? 'repository' : 'repositories')), /*#__PURE__*/React.createElement("div", {
    className: "provider-tabs"
  }, /*#__PURE__*/React.createElement("button", {
    className: 'provider-tab' + (tab === 'all' ? ' active' : ''),
    onClick: () => setTab('all')
  }, Svg.grid, /*#__PURE__*/React.createElement("span", null, "All"), /*#__PURE__*/React.createElement("span", {
    className: "tab-count"
  }, counts.all)), /*#__PURE__*/React.createElement("button", {
    className: 'provider-tab local' + (tab === 'Unpublished' ? ' active' : ''),
    onClick: () => setTab('Unpublished'),
    disabled: counts.Unpublished === 0
  }, Svg.local, /*#__PURE__*/React.createElement("span", null, "Local"), /*#__PURE__*/React.createElement("span", {
    className: "tab-count"
  }, counts.Unpublished)), /*#__PURE__*/React.createElement("button", {
    className: 'provider-tab github' + (tab === 'GitHub' ? ' active' : ''),
    onClick: () => setTab('GitHub'),
    disabled: counts.GitHub === 0
  }, Svg.github, /*#__PURE__*/React.createElement("span", null, "GitHub"), /*#__PURE__*/React.createElement("span", {
    className: "tab-count"
  }, counts.GitHub)), /*#__PURE__*/React.createElement("button", {
    className: 'provider-tab azure' + (tab === 'AzureDevOps' ? ' active' : ''),
    onClick: () => setTab('AzureDevOps'),
    disabled: counts.AzureDevOps === 0
  }, Svg.azure, /*#__PURE__*/React.createElement("span", null, "Azure"), /*#__PURE__*/React.createElement("span", {
    className: "tab-count"
  }, counts.AzureDevOps))), filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: 'var(--space-12)',
      color: 'var(--text-tertiary)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      margin: '0 auto var(--space-3)',
      color: 'var(--text-muted)'
    }
  }, Svg.empty), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--fs-lg)',
      fontWeight: 600,
      color: 'var(--text-secondary)',
      margin: 0
    }
  }, "No repositories match your filters"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-sm)',
      marginTop: 4
    }
  }, "Try adjusting your search or provider filter.")), recents.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "project-section",
    role: "region",
    "aria-label": "Recently opened repositories"
  }, /*#__PURE__*/React.createElement("div", {
    className: "project-section-header"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "project-section-title project-section-title--continue"
  }, /*#__PURE__*/React.createElement("span", {
    className: "continue-heading-icon"
  }, Svg.continueIcon), "Continue"), /*#__PURE__*/React.createElement("span", {
    className: "project-section-count"
  }, "Most recent \xB7 up to 5")), /*#__PURE__*/React.createElement("div", {
    className: "repositories-grid"
  }, recents.map(r => /*#__PURE__*/React.createElement(RepositoryCard, {
    key: r.id,
    repo: r,
    onOpenBacklog: onOpenBacklog,
    onOpenCode: onOpenCode,
    onAskDelete: onAskDelete,
    onShare: onShare
  })))), grouped.map(group => {
    const items = group.items.filter(r => !r.recent);
    if (items.length === 0) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: group.project,
      className: "project-section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "project-section-header"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "project-section-title"
    }, PROJECT_NAMES[group.project] || group.project), /*#__PURE__*/React.createElement("span", {
      className: "project-section-count"
    }, items.length, " repo", items.length !== 1 ? 's' : '')), /*#__PURE__*/React.createElement("div", {
      className: "repositories-grid"
    }, items.map(r => /*#__PURE__*/React.createElement(RepositoryCard, {
      key: r.id,
      repo: r,
      onOpenBacklog: onOpenBacklog,
      onOpenCode: onOpenCode,
      onAskDelete: onAskDelete,
      onShare: onShare
    }))));
  }));
}

// ============================================================================
// BACKLOG (drill-down per repo)
// ============================================================================
const BACKLOG_ITEMS = [{
  id: 'DP-241',
  title: 'OAuth token refresh fails on expired session',
  type: 'Bug',
  typeTone: 'error',
  assignee: 'A. Patel',
  priority: 'High',
  pTone: 'warning'
}, {
  id: 'DP-240',
  title: 'Backlog drag-reorder loses position on refresh',
  type: 'Bug',
  typeTone: 'error',
  assignee: 'A. Patel',
  priority: 'High',
  pTone: 'warning'
}, {
  id: 'DP-238',
  title: 'Add dark mode preview to settings',
  type: 'Feature',
  typeTone: 'primary',
  assignee: 'R. Wu',
  priority: 'Med',
  pTone: 'info'
}, {
  id: 'DP-237',
  title: 'Sandbox: persist last-opened route',
  type: 'Feature',
  typeTone: 'primary',
  assignee: 'R. Wu',
  priority: 'Med',
  pTone: 'info'
}, {
  id: 'DP-235',
  title: 'Refactor data-grid pagination',
  type: 'Tech',
  typeTone: 'secondary',
  assignee: 'S. Kim',
  priority: 'Med',
  pTone: 'info'
}, {
  id: 'DP-231',
  title: 'Indigo focus ring drops by 1px on Firefox',
  type: 'Bug',
  typeTone: 'error',
  assignee: '—',
  priority: 'Low',
  pTone: 'success'
}, {
  id: 'DP-229',
  title: 'Document Tokens Studio import flow',
  type: 'Docs',
  typeTone: 'info',
  assignee: '—',
  priority: 'Low',
  pTone: 'success'
}];
function Backlog({
  repo,
  onBack,
  onToast
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5) var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      marginBottom: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: onBack
  }, Svg.arrowLeft, " ", /*#__PURE__*/React.createElement("span", null, "Back")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-tertiary)'
    }
  }, "Backlog"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--fs-2xl)',
      fontWeight: 700,
      color: 'var(--text-primary)',
      letterSpacing: '-0.025em',
      margin: 0
    }
  }, repo.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm"
  }, "Export"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: () => onToast('info', 'Generating items', 'AI is drafting items from your recent activity.')
  }, "Generate backlog")), /*#__PURE__*/React.createElement("div", {
    className: "dp-card p-sm",
    style: {
      padding: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-3) var(--space-4)',
      background: 'linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(139,92,246,0.03) 100%)',
      borderBottom: '1px solid var(--border-light)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      alignItems: 'center',
      fontSize: 13,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", null, "Backlog \xB7 ", BACKLOG_ITEMS.length, " items")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm"
  }, "Filter"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm"
  }, "Group"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm"
  }, "Add item"))), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ['ID', 'Title', 'Type', 'Assignee', 'Priority'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
      color: 'var(--text-secondary)',
      padding: '14px 16px',
      textAlign: 'left',
      borderBottom: '1px solid var(--border-light)',
      background: 'var(--surface-card)'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, BACKLOG_ITEMS.map((i, idx) => /*#__PURE__*/React.createElement("tr", {
    key: i.id,
    style: {
      background: idx % 2 ? 'var(--surface-elevated)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: cell('var(--font-mono)', 12)
  }, i.id), /*#__PURE__*/React.createElement("td", {
    style: cell()
  }, i.title), /*#__PURE__*/React.createElement("td", {
    style: cell()
  }, /*#__PURE__*/React.createElement("span", {
    className: 'dp-badge ' + i.typeTone
  }, i.type)), /*#__PURE__*/React.createElement("td", {
    style: {
      ...cell(),
      color: 'var(--text-secondary)'
    }
  }, i.assignee), /*#__PURE__*/React.createElement("td", {
    style: cell()
  }, /*#__PURE__*/React.createElement("span", {
    className: 'dp-badge ' + i.pTone
  }, i.priority))))))));
}
function cell(font, size) {
  return {
    padding: '10px 16px',
    fontSize: size || 13,
    fontFamily: font || 'var(--font-sans)',
    color: 'var(--text-primary)',
    borderBottom: '1px solid var(--border-light)'
  };
}

// ============================================================================
// CODE (drill-down per repo)
// ============================================================================
function Code({
  repo,
  onBack
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5) var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      marginBottom: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: onBack
  }, Svg.arrowLeft, /*#__PURE__*/React.createElement("span", null, "Back")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-tertiary)'
    }
  }, "Code"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--fs-2xl)',
      fontWeight: 700,
      color: 'var(--text-primary)',
      letterSpacing: '-0.025em',
      margin: 0
    }
  }, repo.name))), /*#__PURE__*/React.createElement("nav", {
    className: "dp-breadcrumb",
    style: {
      marginBottom: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault()
  }, repo.name), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    className: "mid"
  }, "src"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    className: "mid"
  }, "tokens"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    className: "leaf"
  }, "resolve.ts")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#0d1117',
      color: '#c9d1d9',
      padding: 'var(--space-5)',
      borderRadius: 10,
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      lineHeight: 1.6,
      border: '1px solid #21262d',
      overflow: 'auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#8b949e'
    }
  }, '// Resolve a design token by dotted path.'), '\n', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ff7b72'
    }
  }, "import"), ' ', /*#__PURE__*/React.createElement("span", null, '{ tokens }'), ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ff7b72'
    }
  }, "from"), ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#a5d6ff'
    }
  }, "'./tokens'"), ";", '\n\n', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ff7b72'
    }
  }, "export function"), ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#d2a8ff'
    }
  }, "resolve"), "(", '\n', '  ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ffa657'
    }
  }, "path"), ": ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#79c0ff'
    }
  }, "string"), '\n', ")", ': ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#79c0ff'
    }
  }, "unknown"), ' {', '\n', '  ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ff7b72'
    }
  }, "return"), ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ffa657'
    }
  }, "path"), ".", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#d2a8ff'
    }
  }, "split"), "(", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#a5d6ff'
    }
  }, "'.'"), ") .", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#d2a8ff'
    }
  }, "reduce"), "((", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ffa657'
    }
  }, "o"), ", ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ffa657'
    }
  }, "k"), ") ", '=>', " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ffa657'
    }
  }, "o"), '?.[', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ffa657'
    }
  }, "k"), '], ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ffa657'
    }
  }, "tokens"), ");", '\n', '}'));
}

// ============================================================================
// SETTINGS
// ============================================================================
function Settings({
  onToast
}) {
  const [tab, setTab] = React.useState('sourceControl');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5) var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "settings-page__top"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "settings-page__title"
  }, "Settings"), /*#__PURE__*/React.createElement("p", {
    className: "settings-page__lead"
  }, "Configure integrations by section. Pick a tab below; lists and forms scroll inside each card.")), /*#__PURE__*/React.createElement("nav", {
    className: "settings-tabs",
    role: "tablist"
  }, [{
    id: 'sourceControl',
    label: 'Source control',
    icon: Svg.share
  }, {
    id: 'ai',
    label: 'AI providers',
    icon: Svg.brain
  }, {
    id: 'mcp',
    label: 'MCP servers',
    icon: Svg.flask
  }, {
    id: 'artifacts',
    label: 'Artifact feeds',
    icon: Svg.feed
  }, {
    id: 'agentRules',
    label: 'Agent rules',
    icon: Svg.cog
  }, {
    id: 'users',
    label: 'Users',
    icon: Svg.share
  }].map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    type: "button",
    role: "tab",
    className: 'settings-tabs__tab' + (tab === t.id ? ' settings-tabs__tab--active' : ''),
    "aria-selected": tab === t.id,
    onClick: () => setTab(t.id)
  }, React.cloneElement(t.icon, {
    className: 'settings-tabs__icon'
  }), t.label))), /*#__PURE__*/React.createElement("section", {
    className: "card--panel"
  }, /*#__PURE__*/React.createElement("header", {
    className: "card__header"
  }, /*#__PURE__*/React.createElement("h2", null, tab === 'sourceControl' ? 'Source control' : tab === 'ai' ? 'AI providers' : tab === 'mcp' ? 'MCP servers' : tab === 'artifacts' ? 'Artifact feeds' : tab === 'agentRules' ? 'Agent rules' : 'Users'), /*#__PURE__*/React.createElement("p", null, tab === 'sourceControl' ? 'Connect Git hosting and Azure DevOps to sync repositories.' : tab === 'ai' ? 'Choose a model provider and set credentials.' : tab === 'mcp' ? 'Connect MCP servers to expose tools to the agent.' : tab === 'artifacts' ? 'Subscribe to NuGet, npm, or Maven feeds the agent can read.' : tab === 'agentRules' ? 'Org-wide rules the AI must follow during code generation.' : 'Invite teammates and manage workspace access.')), /*#__PURE__*/React.createElement("div", {
    className: "card__scroll"
  }, tab === 'sourceControl' && /*#__PURE__*/React.createElement(SourceControlPanel, {
    onToast: onToast
  }), tab !== 'sourceControl' && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-8)',
      textAlign: 'center',
      color: 'var(--text-tertiary)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-sm)'
    }
  }, "This tab is preserved structurally \u2014 see Source control for the rendered example.")))));
}
function SourceControlPanel({
  onToast
}) {
  return /*#__PURE__*/React.createElement("ul", {
    className: "provider-list"
  }, /*#__PURE__*/React.createElement("li", {
    className: "provider-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "prov-icon github"
  }, Svg.github), /*#__PURE__*/React.createElement("div", {
    className: "prov-meta"
  }, /*#__PURE__*/React.createElement("strong", null, "GitHub"), /*#__PURE__*/React.createElement("span", {
    className: "status status--ok"
  }, "Connected (OAuth) as rileywu")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: () => onToast('info', 'GitHub disconnected', 'You can reconnect from the same panel anytime.')
  }, "Disconnect")), /*#__PURE__*/React.createElement("li", {
    className: "provider-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "prov-icon azure"
  }, Svg.azure), /*#__PURE__*/React.createElement("div", {
    className: "prov-meta"
  }, /*#__PURE__*/React.createElement("strong", null, "Azure DevOps"), /*#__PURE__*/React.createElement("span", {
    className: "status status--ok"
  }, "Connected as riley.wu@devpilot.io")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm"
  }, "Disconnect")), /*#__PURE__*/React.createElement("li", {
    className: "provider-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "prov-icon",
    style: {
      background: 'var(--surface-card)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 12h20M2 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12z",
    stroke: "currentColor",
    strokeWidth: "2",
    fill: "none"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "prov-meta"
  }, /*#__PURE__*/React.createElement("strong", null, "GitLab"), /*#__PURE__*/React.createElement("span", {
    className: "status"
  }, "Not connected")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm"
  }, "Connect")));
}

// ============================================================================
// Confirm-delete modal
// ============================================================================
function ConfirmDelete({
  target,
  onCancel,
  onConfirm
}) {
  if (!target) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: onCancel
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("h3", null, "Remove repository?"), /*#__PURE__*/React.createElement("button", {
    className: "modal-close",
    onClick: onCancel
  }, Svg.close)), /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "modal-description"
  }, "Removing ", /*#__PURE__*/React.createElement("strong", null, target.name), " takes it out of this workspace. The remote repository on ", Provider[target.provider]?.label || target.provider, " is not deleted.")), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-secondary",
    onClick: onCancel
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: onConfirm
  }, "Remove"))));
}

// ============================================================================
// Add-repo modal (used for the "Add manually" CTA)
// ============================================================================
function AddRepoModal({
  open,
  onClose,
  onSubmit
}) {
  const [url, setUrl] = React.useState('');
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("h3", null, "Add GitHub repository"), /*#__PURE__*/React.createElement("button", {
    className: "modal-close",
    onClick: onClose
  }, Svg.close)), /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "modal-description"
  }, "Enter a GitHub repository URL or owner/repo to add it manually."), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "addRepoUrl"
  }, "Repository URL or owner/repo"), /*#__PURE__*/React.createElement("input", {
    id: "addRepoUrl",
    type: "text",
    placeholder: "e.g. https://github.com/owner/repo or owner/repo",
    value: url,
    onChange: e => setUrl(e.target.value)
  })), /*#__PURE__*/React.createElement("p", {
    className: "field-hint"
  }, "Public repos can be added without connecting GitHub. Connect GitHub to add private repos.")), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-secondary",
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    disabled: !url.trim(),
    onClick: () => {
      onSubmit(url);
      setUrl('');
    }
  }, "Add repository"))));
}
Object.assign(window, {
  Repositories,
  Backlog,
  Code,
  Settings,
  ConfirmDelete,
  AddRepoModal
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "export/src/Screens.jsx", error: String((e && e.message) || e) }); }

// export/src/Sidebar.jsx
try { (() => {
/* global React, lucide */
// Sidebar.jsx — DevPilot left rail, faithful to src/app/layout/sidebar/

// Only two navs in the real app — Backlog & Code are drill-downs from Repositories.
const NAV = [{
  id: 'repositories',
  label: 'Repositories',
  svg: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
  }))
}, {
  id: 'settings',
  label: 'Settings',
  svg: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
  }))
}];

// Lucide-rendered icon (used for header/buttons; the sidebar uses inline SVGs above)
function Icon({
  name,
  size = 18
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = '';
      const i = document.createElement('i');
      i.setAttribute('data-lucide', name);
      i.setAttribute('width', size);
      i.setAttribute('height', size);
      ref.current.appendChild(i);
      window.lucide.createIcons({
        nodes: [i]
      });
    }
  }, [name, size]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex'
    }
  });
}
function Sidebar({
  active,
  onNavigate,
  collapsed,
  onToggleCollapse
}) {
  return /*#__PURE__*/React.createElement("aside", {
    className: 'sidebar' + (collapsed ? ' collapsed' : '')
  }, /*#__PURE__*/React.createElement("header", {
    className: "sidebar-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-header__top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-brand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-brand__mark",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "logo-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2L2 7L12 12L22 7L12 2Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 17L12 22L22 17V12L12 17L2 12V17Z",
    fill: "currentColor",
    opacity: "0.85"
  }))), !collapsed && /*#__PURE__*/React.createElement("div", {
    className: "sidebar-brand__text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sidebar-brand__name"
  }, "DevPilot"), /*#__PURE__*/React.createElement("span", {
    className: "sidebar-brand__tagline"
  }, "Workspace"))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "sidebar-collapse-toggle",
    onClick: onToggleCollapse,
    title: collapsed ? 'Expand sidebar' : 'Collapse sidebar',
    "aria-label": collapsed ? 'Expand sidebar' : 'Collapse sidebar'
  }, /*#__PURE__*/React.createElement("svg", {
    className: "toggle-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, collapsed ? /*#__PURE__*/React.createElement("polyline", {
    points: "11 6 16 12 11 18"
  }) : /*#__PURE__*/React.createElement("polyline", {
    points: "13 6 8 12 13 18"
  }))))), /*#__PURE__*/React.createElement("nav", {
    className: "sidebar-nav",
    "aria-label": "Main navigation"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-section"
  }, !collapsed && /*#__PURE__*/React.createElement("p", {
    className: "nav-section-title"
  }, "Navigate"), /*#__PURE__*/React.createElement("ul", {
    className: "nav-list"
  }, NAV.map(item => /*#__PURE__*/React.createElement("li", {
    key: item.id
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: 'nav-item' + (active === item.id ? ' active' : ''),
    onClick: e => {
      e.preventDefault();
      onNavigate(item.id);
    },
    title: item.label,
    "aria-label": item.label
  }, /*#__PURE__*/React.createElement("span", {
    className: "nav-item__icon",
    "aria-hidden": "true"
  }, React.cloneElement(item.svg, {
    className: 'nav-icon'
  })), !collapsed && /*#__PURE__*/React.createElement("span", {
    className: "nav-label"
  }, item.label))))))), /*#__PURE__*/React.createElement("footer", {
    className: "sidebar-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: 'sidebar-user' + (collapsed ? ' sidebar-user--collapsed' : ''),
    title: "Riley Wu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-user__avatar"
  }, "R"), !collapsed && /*#__PURE__*/React.createElement("div", {
    className: "sidebar-user__meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sidebar-user__name"
  }, "rileywu"), /*#__PURE__*/React.createElement("span", {
    className: "sidebar-user__email"
  }, "riley@devpilot.io"))), !collapsed ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "logout-button"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "logout-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
  })), /*#__PURE__*/React.createElement("span", null, "Sign out")) : /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "logout-button logout-button--icon",
    title: "Sign out",
    "aria-label": "Sign out"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "logout-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
  })))));
}
Object.assign(window, {
  Sidebar,
  Icon
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "export/src/Sidebar.jsx", error: String((e && e.message) || e) }); }

// figma/Board.jsx
try { (() => {
/* global React, ReactDOM, Sidebar, Header, Repositories, Backlog, Code, Settings */
// Board.jsx — static, multi-frame layout for Figma import via html.to.design.
// Each <section class="fig-frame"> is a self-contained 1440-wide product frame
// (sidebar + header + screen). No routing — every screen is rendered at once so
// the import tool turns each into its own Figma frame.

const noop = () => {};
const sampleRepo = {
  id: 'r1',
  name: 'devpilot-api',
  project: 'devpilot',
  provider: 'GitHub',
  branch: 'main',
  isPrivate: true,
  description: 'Backend services for the DevPilot workspace.'
};
function Frame({
  label,
  breadcrumb,
  active,
  sandboxCount = 0,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "fig-frame-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fig-frame-label"
  }, label), /*#__PURE__*/React.createElement("section", {
    className: "fig-frame",
    "data-screen-label": label
  }, /*#__PURE__*/React.createElement(Sidebar, {
    active: active,
    onNavigate: noop,
    collapsed: false,
    onToggleCollapse: noop
  }), /*#__PURE__*/React.createElement("div", {
    className: "frame-main"
  }, /*#__PURE__*/React.createElement(Header, {
    breadcrumb: breadcrumb,
    theme: "light",
    sandboxCount: sandboxCount,
    onToggleTheme: noop,
    onToggleSidebarMobile: noop
  }), /*#__PURE__*/React.createElement("main", null, children))));
}
function Board() {
  React.useEffect(() => {
    document.documentElement.dataset.theme = 'light';
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "fig-board"
  }, /*#__PURE__*/React.createElement(Frame, {
    label: "01 \xB7 Repositories",
    active: "repositories",
    breadcrumb: ['repositories']
  }, /*#__PURE__*/React.createElement(Repositories, {
    onOpenBacklog: noop,
    onOpenCode: noop,
    onAskDelete: noop,
    onShare: noop,
    onOpenAddRepo: noop,
    onToast: noop
  })), /*#__PURE__*/React.createElement(Frame, {
    label: "02 \xB7 Backlog (drill-down)",
    active: "repositories",
    sandboxCount: 1,
    breadcrumb: ['repositories', sampleRepo.name, 'backlog']
  }, /*#__PURE__*/React.createElement(Backlog, {
    repo: sampleRepo,
    onBack: noop,
    onToast: noop
  })), /*#__PURE__*/React.createElement(Frame, {
    label: "03 \xB7 Code (drill-down)",
    active: "repositories",
    sandboxCount: 1,
    breadcrumb: ['repositories', sampleRepo.name, 'code']
  }, /*#__PURE__*/React.createElement(Code, {
    repo: sampleRepo,
    onBack: noop
  })), /*#__PURE__*/React.createElement(Frame, {
    label: "04 \xB7 Settings",
    active: "settings",
    breadcrumb: ['settings']
  }, /*#__PURE__*/React.createElement(Settings, {
    onToast: noop
  })));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(Board, null));

// Re-run Lucide after mount for any icon placeholders
const obs = new MutationObserver(() => {
  if (window.lucide) window.lucide.createIcons();
});
obs.observe(document.body, {
  childList: true,
  subtree: true
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/Board.jsx", error: String((e && e.message) || e) }); }

// figma/Header.jsx
try { (() => {
/* global React, Icon */
// Header.jsx — DevPilot top bar, faithful to src/app/layout/header/

function Header({
  breadcrumb,
  theme,
  onToggleTheme,
  onToggleSidebarMobile,
  sandboxCount = 0
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header-content"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onToggleSidebarMobile,
    className: "menu-toggle",
    "aria-label": "Toggle menu"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "menu-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "12",
    x2: "21",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "6",
    x2: "21",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "18",
    x2: "21",
    y2: "18"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "header-title"
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    segments: breadcrumb
  })), /*#__PURE__*/React.createElement("div", {
    className: "header-actions"
  }, sandboxCount > 0 && /*#__PURE__*/React.createElement("div", {
    className: "header-sandbox",
    title: `${sandboxCount} running sandbox${sandboxCount === 1 ? '' : 'es'}`
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "header-sandbox-trigger",
    "aria-label": `${sandboxCount} sandboxes`
  }, /*#__PURE__*/React.createElement("span", {
    className: "header-sandbox-icon",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "3",
    width: "20",
    height: "14",
    rx: "0",
    ry: "0"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "21",
    x2: "16",
    y2: "21"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "17",
    x2: "12",
    y2: "21"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "header-sandbox-label"
  }, sandboxCount, " running"), /*#__PURE__*/React.createElement("span", {
    className: "header-sandbox-chev",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.25",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  }))))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onToggleTheme,
    className: "theme-toggle",
    "aria-label": "Toggle theme"
  }, theme === 'light' ? /*#__PURE__*/React.createElement("svg", {
    className: "theme-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
  })) : /*#__PURE__*/React.createElement("svg", {
    className: "theme-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "1",
    x2: "12",
    y2: "3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "21",
    x2: "12",
    y2: "23"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4.22",
    y1: "4.22",
    x2: "5.64",
    y2: "5.64"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18.36",
    y1: "18.36",
    x2: "19.78",
    y2: "19.78"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "1",
    y1: "12",
    x2: "3",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "12",
    x2: "23",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4.22",
    y1: "19.78",
    x2: "5.64",
    y2: "18.36"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18.36",
    y1: "5.64",
    x2: "19.78",
    y2: "4.22"
  }))))));
}

// Inline breadcrumb (the real app uses <app-breadcrumb /> — we render directly for simplicity)
function Breadcrumb({
  segments
}) {
  return /*#__PURE__*/React.createElement("nav", {
    className: "dp-breadcrumb",
    "aria-label": "Breadcrumb"
  }, segments.map((seg, i) => {
    const isLast = i === segments.length - 1;
    const isLink = i === 0;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, i > 0 && /*#__PURE__*/React.createElement("span", {
      className: "sep"
    }, "/"), isLast ? /*#__PURE__*/React.createElement("span", {
      className: "leaf"
    }, seg) : isLink ? /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => e.preventDefault()
    }, seg) : /*#__PURE__*/React.createElement("span", {
      className: "mid"
    }, seg));
  }));
}
Object.assign(window, {
  Header,
  Breadcrumb
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/Header.jsx", error: String((e && e.message) || e) }); }

// figma/Screens.jsx
try { (() => {
/* global React, Icon */
// Screens.jsx — Source-faithful screen panels for ui_kits/devpilot-workspace

// ============================================================================
// Static demo data
// ============================================================================
const REPOS = [
// recent
{
  id: 'r1',
  name: 'devpilot-api',
  project: 'devpilot',
  provider: 'GitHub',
  branch: 'main',
  isPrivate: true,
  description: 'Backend services for the DevPilot workspace.',
  sharedWithCount: 4,
  recent: true
}, {
  id: 'r2',
  name: 'devpilot-web',
  project: 'devpilot',
  provider: 'GitHub',
  branch: 'main',
  isPrivate: true,
  description: 'Angular frontend (this repo).',
  sharedWithCount: 4,
  recent: true
}, {
  id: 'r3',
  name: 'design-system',
  project: 'devpilot',
  provider: 'GitHub',
  branch: 'main',
  isPrivate: false,
  description: 'Tokens, components, and the package you are looking at.',
  sharedWithCount: 7,
  recent: true
},
// others
{
  id: 'r4',
  name: 'devpilot-cli',
  project: 'devpilot',
  provider: 'GitHub',
  branch: 'dev',
  isPrivate: true,
  description: 'Local CLI for managing sandboxes from a terminal.'
}, {
  id: 'r5',
  name: 'devpilot-docs',
  project: 'devpilot',
  provider: 'GitHub',
  branch: 'main',
  isPrivate: false,
  description: 'Public documentation site.'
}, {
  id: 'r6',
  name: 'platform-infra',
  project: 'Platform',
  provider: 'AzureDevOps',
  branch: 'main',
  isPrivate: true,
  description: 'Terraform + ARM modules for shared infra.'
}, {
  id: 'r7',
  name: 'identity-svc',
  project: 'Platform',
  provider: 'AzureDevOps',
  branch: 'main',
  isPrivate: true,
  description: 'OIDC provider and SCIM bridge.'
}, {
  id: 'r8',
  name: 'spike-rust-grid',
  project: 'Sandbox',
  provider: 'Unpublished',
  branch: null,
  isPrivate: true,
  description: 'Local-only experiment with virtual scrolling.'
}];
const PROJECT_NAMES = {
  devpilot: 'devpilot',
  Platform: 'Platform',
  Sandbox: 'Sandbox'
};

// ============================================================================
// Reusable inline SVG icon helpers (source-faithful — match Angular templates)
// ============================================================================
const Svg = {
  github: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
  })),
  azure: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 6v12l-6 4V6l-8 2v12l-6-4V6l10-4 10 4z"
  })),
  local: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "3",
    width: "20",
    height: "14",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "21",
    x2: "16",
    y2: "21"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "17",
    x2: "12",
    y2: "21"
  })),
  branch: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "3",
    x2: "6",
    y2: "15"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "6",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "18",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 9a9 9 0 01-9 9"
  })),
  lock: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "11",
    width: "18",
    height: "11",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 11V7a5 5 0 0110 0v4"
  })),
  lockOpen: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "11",
    width: "18",
    height: "11",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 11V7a5 5 0 019.9-1"
  })),
  share: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "5",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "19",
    r: "3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8.59",
    y1: "13.51",
    x2: "15.42",
    y2: "17.49"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "15.41",
    y1: "6.51",
    x2: "8.59",
    y2: "10.49"
  })),
  trash: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "3 6 5 6 21 6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "10",
    y1: "11",
    x2: "10",
    y2: "17"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "14",
    y1: "11",
    x2: "14",
    y2: "17"
  })),
  backlog: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "6",
    x2: "21",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "12",
    x2: "21",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "18",
    x2: "21",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "6",
    x2: "3.01",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "12",
    x2: "3.01",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "18",
    x2: "3.01",
    y2: "18"
  })),
  code: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "16 18 22 12 16 6"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "8 6 2 12 8 18"
  })),
  search: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  })),
  sync: /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9m-9 9a9 9 0 0 1 9-9"
  })),
  continueIcon: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 8v4l3 3"
  })),
  grid: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "7",
    height: "7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "3",
    width: "7",
    height: "7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "14",
    width: "7",
    height: "7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "14",
    width: "7",
    height: "7"
  })),
  close: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })),
  empty: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })),
  arrowLeft: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "19",
    y1: "12",
    x2: "5",
    y2: "12"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 19 5 12 12 5"
  })),
  cog: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 1v6m0 10v6M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24M1 12h6m10 0h6M4.22 19.78l4.24-4.24m7.08-7.08l4.24-4.24"
  })),
  flask: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 2v6l-5 9a3 3 0 003 4h10a3 3 0 003-4l-5-9V2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 2h6"
  })),
  brain: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 4a3 3 0 00-3 3v2a3 3 0 00-3 3v2a3 3 0 003 3v0a3 3 0 003 3 3 3 0 003-3v0a3 3 0 003-3v-2a3 3 0 00-3-3V7a3 3 0 00-3-3z"
  })),
  feed: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 11a9 9 0 019 9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 4a16 16 0 0116 16"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "19",
    r: "1"
  }))
};
const Provider = {
  GitHub: {
    icon: Svg.github,
    label: 'GitHub',
    cls: 'github'
  },
  AzureDevOps: {
    icon: Svg.azure,
    label: 'Azure',
    cls: 'azure'
  },
  Unpublished: {
    icon: Svg.local,
    label: 'Local',
    cls: 'local'
  }
};

// ============================================================================
// REPOSITORIES
// ============================================================================
function RepositoryCard({
  repo,
  onOpenBacklog,
  onOpenCode,
  onAskDelete,
  onShare
}) {
  const prov = Provider[repo.provider] || {
    icon: null,
    label: repo.provider,
    cls: ''
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "repo-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "repo-card__top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "repo-card__chips"
  }, /*#__PURE__*/React.createElement("span", {
    className: 'repo-chip repo-chip--provider ' + prov.cls
  }, prov.icon, /*#__PURE__*/React.createElement("span", null, prov.label)), repo.branch && /*#__PURE__*/React.createElement("span", {
    className: "repo-chip repo-chip--branch",
    title: 'Default branch: ' + repo.branch
  }, Svg.branch, /*#__PURE__*/React.createElement("span", {
    className: "repo-chip-branch-text"
  }, repo.branch))), /*#__PURE__*/React.createElement("div", {
    className: "repo-card__top-actions"
  }, /*#__PURE__*/React.createElement("span", {
    className: "repo-vis-icon",
    title: repo.isPrivate ? 'Private repository' : 'Public repository'
  }, repo.isPrivate ? Svg.lock : Svg.lockOpen), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "repo-icon-btn",
    onClick: e => {
      e.stopPropagation();
      onShare(repo);
    },
    title: (repo.sharedWithCount ?? 0) > 0 ? `Shared with ${repo.sharedWithCount}` : 'Share repository'
  }, Svg.share), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "repo-icon-btn repo-icon-btn--danger",
    onClick: e => {
      e.stopPropagation();
      onAskDelete(repo);
    },
    title: "Remove repository"
  }, Svg.trash))), /*#__PURE__*/React.createElement("div", {
    className: "repo-card__body"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "repo-name"
  }, repo.name), repo.description && /*#__PURE__*/React.createElement("p", {
    className: "repo-description"
  }, repo.description)), /*#__PURE__*/React.createElement("div", {
    className: "repo-card-actions"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onOpenBacklog(repo);
    },
    className: "action-btn primary"
  }, Svg.backlog, /*#__PURE__*/React.createElement("span", null, "Backlog")), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onOpenCode(repo);
    },
    className: "action-btn secondary"
  }, Svg.code, /*#__PURE__*/React.createElement("span", null, "Code"))));
}
function Repositories({
  onOpenBacklog,
  onOpenCode,
  onAskDelete,
  onShare,
  onOpenAddRepo,
  onToast
}) {
  const [search, setSearch] = React.useState('');
  const [tab, setTab] = React.useState('all');
  const filtered = REPOS.filter(r => {
    if (tab !== 'all' && r.provider !== tab) return false;
    if (search && !(r.name + ' ' + (r.description || '')).toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const recents = filtered.filter(r => r.recent);
  const grouped = React.useMemo(() => {
    const map = new Map();
    for (const r of filtered) {
      if (!map.has(r.project)) map.set(r.project, []);
      map.get(r.project).push(r);
    }
    return [...map.entries()].map(([project, items]) => ({
      project,
      items
    }));
  }, [filtered]);
  const counts = {
    all: REPOS.length,
    GitHub: REPOS.filter(r => r.provider === 'GitHub').length,
    AzureDevOps: REPOS.filter(r => r.provider === 'AzureDevOps').length,
    Unpublished: REPOS.filter(r => r.provider === 'Unpublished').length
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "repositories-container",
    style: {
      padding: 'var(--space-5) var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dp-card p-sm sync-section",
    style: {
      padding: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sync-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sync-dropdown"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-md",
    onClick: () => onToast('info', 'Syncing repositories', 'Pulling from GitHub…')
  }, Svg.sync, /*#__PURE__*/React.createElement("span", null, "Sync Repositories"), /*#__PURE__*/React.createElement("svg", {
    className: "dropdown-arrow",
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "sync-info"
  }, /*#__PURE__*/React.createElement("p", {
    className: "sync-title"
  }, "Pull your latest repositories"), /*#__PURE__*/React.createElement("p", {
    className: "sync-help"
  }, "Sync repositories from your connected providers")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-md",
    onClick: onOpenAddRepo
  }, "Add manually"))), /*#__PURE__*/React.createElement("div", {
    className: "search-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-input-wrapper"
  }, /*#__PURE__*/React.createElement("span", {
    className: "search-icon"
  }, Svg.search), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "search-input",
    placeholder: "Search by project or repository name...",
    value: search,
    onChange: e => setSearch(e.target.value)
  })), /*#__PURE__*/React.createElement("span", {
    className: "search-meta"
  }, filtered.length, " ", filtered.length === 1 ? 'repository' : 'repositories')), /*#__PURE__*/React.createElement("div", {
    className: "provider-tabs"
  }, /*#__PURE__*/React.createElement("button", {
    className: 'provider-tab' + (tab === 'all' ? ' active' : ''),
    onClick: () => setTab('all')
  }, Svg.grid, /*#__PURE__*/React.createElement("span", null, "All"), /*#__PURE__*/React.createElement("span", {
    className: "tab-count"
  }, counts.all)), /*#__PURE__*/React.createElement("button", {
    className: 'provider-tab local' + (tab === 'Unpublished' ? ' active' : ''),
    onClick: () => setTab('Unpublished'),
    disabled: counts.Unpublished === 0
  }, Svg.local, /*#__PURE__*/React.createElement("span", null, "Local"), /*#__PURE__*/React.createElement("span", {
    className: "tab-count"
  }, counts.Unpublished)), /*#__PURE__*/React.createElement("button", {
    className: 'provider-tab github' + (tab === 'GitHub' ? ' active' : ''),
    onClick: () => setTab('GitHub'),
    disabled: counts.GitHub === 0
  }, Svg.github, /*#__PURE__*/React.createElement("span", null, "GitHub"), /*#__PURE__*/React.createElement("span", {
    className: "tab-count"
  }, counts.GitHub)), /*#__PURE__*/React.createElement("button", {
    className: 'provider-tab azure' + (tab === 'AzureDevOps' ? ' active' : ''),
    onClick: () => setTab('AzureDevOps'),
    disabled: counts.AzureDevOps === 0
  }, Svg.azure, /*#__PURE__*/React.createElement("span", null, "Azure"), /*#__PURE__*/React.createElement("span", {
    className: "tab-count"
  }, counts.AzureDevOps))), filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: 'var(--space-12)',
      color: 'var(--text-tertiary)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      margin: '0 auto var(--space-3)',
      color: 'var(--text-muted)'
    }
  }, Svg.empty), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--fs-lg)',
      fontWeight: 600,
      color: 'var(--text-secondary)',
      margin: 0
    }
  }, "No repositories match your filters"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-sm)',
      marginTop: 4
    }
  }, "Try adjusting your search or provider filter.")), recents.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "project-section",
    role: "region",
    "aria-label": "Recently opened repositories"
  }, /*#__PURE__*/React.createElement("div", {
    className: "project-section-header"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "project-section-title project-section-title--continue"
  }, /*#__PURE__*/React.createElement("span", {
    className: "continue-heading-icon"
  }, Svg.continueIcon), "Continue"), /*#__PURE__*/React.createElement("span", {
    className: "project-section-count"
  }, "Most recent \xB7 up to 5")), /*#__PURE__*/React.createElement("div", {
    className: "repositories-grid"
  }, recents.map(r => /*#__PURE__*/React.createElement(RepositoryCard, {
    key: r.id,
    repo: r,
    onOpenBacklog: onOpenBacklog,
    onOpenCode: onOpenCode,
    onAskDelete: onAskDelete,
    onShare: onShare
  })))), grouped.map(group => {
    const items = group.items.filter(r => !r.recent);
    if (items.length === 0) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: group.project,
      className: "project-section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "project-section-header"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "project-section-title"
    }, PROJECT_NAMES[group.project] || group.project), /*#__PURE__*/React.createElement("span", {
      className: "project-section-count"
    }, items.length, " repo", items.length !== 1 ? 's' : '')), /*#__PURE__*/React.createElement("div", {
      className: "repositories-grid"
    }, items.map(r => /*#__PURE__*/React.createElement(RepositoryCard, {
      key: r.id,
      repo: r,
      onOpenBacklog: onOpenBacklog,
      onOpenCode: onOpenCode,
      onAskDelete: onAskDelete,
      onShare: onShare
    }))));
  }));
}

// ============================================================================
// BACKLOG (drill-down per repo)
// ============================================================================
const BACKLOG_ITEMS = [{
  id: 'DP-241',
  title: 'OAuth token refresh fails on expired session',
  type: 'Bug',
  typeTone: 'error',
  assignee: 'A. Patel',
  priority: 'High',
  pTone: 'warning'
}, {
  id: 'DP-240',
  title: 'Backlog drag-reorder loses position on refresh',
  type: 'Bug',
  typeTone: 'error',
  assignee: 'A. Patel',
  priority: 'High',
  pTone: 'warning'
}, {
  id: 'DP-238',
  title: 'Add dark mode preview to settings',
  type: 'Feature',
  typeTone: 'primary',
  assignee: 'R. Wu',
  priority: 'Med',
  pTone: 'info'
}, {
  id: 'DP-237',
  title: 'Sandbox: persist last-opened route',
  type: 'Feature',
  typeTone: 'primary',
  assignee: 'R. Wu',
  priority: 'Med',
  pTone: 'info'
}, {
  id: 'DP-235',
  title: 'Refactor data-grid pagination',
  type: 'Tech',
  typeTone: 'secondary',
  assignee: 'S. Kim',
  priority: 'Med',
  pTone: 'info'
}, {
  id: 'DP-231',
  title: 'Indigo focus ring drops by 1px on Firefox',
  type: 'Bug',
  typeTone: 'error',
  assignee: '—',
  priority: 'Low',
  pTone: 'success'
}, {
  id: 'DP-229',
  title: 'Document Tokens Studio import flow',
  type: 'Docs',
  typeTone: 'info',
  assignee: '—',
  priority: 'Low',
  pTone: 'success'
}];
function Backlog({
  repo,
  onBack,
  onToast
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5) var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      marginBottom: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: onBack
  }, Svg.arrowLeft, " ", /*#__PURE__*/React.createElement("span", null, "Back")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-tertiary)'
    }
  }, "Backlog"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--fs-2xl)',
      fontWeight: 700,
      color: 'var(--text-primary)',
      letterSpacing: '-0.025em',
      margin: 0
    }
  }, repo.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm"
  }, "Export"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: () => onToast('info', 'Generating items', 'AI is drafting items from your recent activity.')
  }, "Generate backlog")), /*#__PURE__*/React.createElement("div", {
    className: "dp-card p-sm",
    style: {
      padding: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-3) var(--space-4)',
      background: 'linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(139,92,246,0.03) 100%)',
      borderBottom: '1px solid var(--border-light)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      alignItems: 'center',
      fontSize: 13,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", null, "Backlog \xB7 ", BACKLOG_ITEMS.length, " items")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm"
  }, "Filter"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm"
  }, "Group"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm"
  }, "Add item"))), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ['ID', 'Title', 'Type', 'Assignee', 'Priority'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
      color: 'var(--text-secondary)',
      padding: '14px 16px',
      textAlign: 'left',
      borderBottom: '1px solid var(--border-light)',
      background: 'var(--surface-card)'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, BACKLOG_ITEMS.map((i, idx) => /*#__PURE__*/React.createElement("tr", {
    key: i.id,
    style: {
      background: idx % 2 ? 'var(--surface-elevated)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: cell('var(--font-mono)', 12)
  }, i.id), /*#__PURE__*/React.createElement("td", {
    style: cell()
  }, i.title), /*#__PURE__*/React.createElement("td", {
    style: cell()
  }, /*#__PURE__*/React.createElement("span", {
    className: 'dp-badge ' + i.typeTone
  }, i.type)), /*#__PURE__*/React.createElement("td", {
    style: {
      ...cell(),
      color: 'var(--text-secondary)'
    }
  }, i.assignee), /*#__PURE__*/React.createElement("td", {
    style: cell()
  }, /*#__PURE__*/React.createElement("span", {
    className: 'dp-badge ' + i.pTone
  }, i.priority))))))));
}
function cell(font, size) {
  return {
    padding: '10px 16px',
    fontSize: size || 13,
    fontFamily: font || 'var(--font-sans)',
    color: 'var(--text-primary)',
    borderBottom: '1px solid var(--border-light)'
  };
}

// ============================================================================
// CODE (drill-down per repo)
// ============================================================================
function Code({
  repo,
  onBack
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5) var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      marginBottom: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: onBack
  }, Svg.arrowLeft, /*#__PURE__*/React.createElement("span", null, "Back")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-tertiary)'
    }
  }, "Code"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--fs-2xl)',
      fontWeight: 700,
      color: 'var(--text-primary)',
      letterSpacing: '-0.025em',
      margin: 0
    }
  }, repo.name))), /*#__PURE__*/React.createElement("nav", {
    className: "dp-breadcrumb",
    style: {
      marginBottom: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault()
  }, repo.name), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    className: "mid"
  }, "src"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    className: "mid"
  }, "tokens"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    className: "leaf"
  }, "resolve.ts")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#0d1117',
      color: '#c9d1d9',
      padding: 'var(--space-5)',
      borderRadius: 10,
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      lineHeight: 1.6,
      border: '1px solid #21262d',
      overflow: 'auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#8b949e'
    }
  }, '// Resolve a design token by dotted path.'), '\n', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ff7b72'
    }
  }, "import"), ' ', /*#__PURE__*/React.createElement("span", null, '{ tokens }'), ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ff7b72'
    }
  }, "from"), ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#a5d6ff'
    }
  }, "'./tokens'"), ";", '\n\n', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ff7b72'
    }
  }, "export function"), ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#d2a8ff'
    }
  }, "resolve"), "(", '\n', '  ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ffa657'
    }
  }, "path"), ": ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#79c0ff'
    }
  }, "string"), '\n', ")", ': ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#79c0ff'
    }
  }, "unknown"), ' {', '\n', '  ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ff7b72'
    }
  }, "return"), ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ffa657'
    }
  }, "path"), ".", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#d2a8ff'
    }
  }, "split"), "(", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#a5d6ff'
    }
  }, "'.'"), ") .", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#d2a8ff'
    }
  }, "reduce"), "((", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ffa657'
    }
  }, "o"), ", ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ffa657'
    }
  }, "k"), ") ", '=>', " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ffa657'
    }
  }, "o"), '?.[', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ffa657'
    }
  }, "k"), '], ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ffa657'
    }
  }, "tokens"), ");", '\n', '}'));
}

// ============================================================================
// SETTINGS
// ============================================================================
function Settings({
  onToast
}) {
  const [tab, setTab] = React.useState('sourceControl');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5) var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "settings-page__top"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "settings-page__title"
  }, "Settings"), /*#__PURE__*/React.createElement("p", {
    className: "settings-page__lead"
  }, "Configure integrations by section. Pick a tab below; lists and forms scroll inside each card.")), /*#__PURE__*/React.createElement("nav", {
    className: "settings-tabs",
    role: "tablist"
  }, [{
    id: 'sourceControl',
    label: 'Source control',
    icon: Svg.share
  }, {
    id: 'ai',
    label: 'AI providers',
    icon: Svg.brain
  }, {
    id: 'mcp',
    label: 'MCP servers',
    icon: Svg.flask
  }, {
    id: 'artifacts',
    label: 'Artifact feeds',
    icon: Svg.feed
  }, {
    id: 'agentRules',
    label: 'Agent rules',
    icon: Svg.cog
  }, {
    id: 'users',
    label: 'Users',
    icon: Svg.share
  }].map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    type: "button",
    role: "tab",
    className: 'settings-tabs__tab' + (tab === t.id ? ' settings-tabs__tab--active' : ''),
    "aria-selected": tab === t.id,
    onClick: () => setTab(t.id)
  }, React.cloneElement(t.icon, {
    className: 'settings-tabs__icon'
  }), t.label))), /*#__PURE__*/React.createElement("section", {
    className: "card--panel"
  }, /*#__PURE__*/React.createElement("header", {
    className: "card__header"
  }, /*#__PURE__*/React.createElement("h2", null, tab === 'sourceControl' ? 'Source control' : tab === 'ai' ? 'AI providers' : tab === 'mcp' ? 'MCP servers' : tab === 'artifacts' ? 'Artifact feeds' : tab === 'agentRules' ? 'Agent rules' : 'Users'), /*#__PURE__*/React.createElement("p", null, tab === 'sourceControl' ? 'Connect Git hosting and Azure DevOps to sync repositories.' : tab === 'ai' ? 'Choose a model provider and set credentials.' : tab === 'mcp' ? 'Connect MCP servers to expose tools to the agent.' : tab === 'artifacts' ? 'Subscribe to NuGet, npm, or Maven feeds the agent can read.' : tab === 'agentRules' ? 'Org-wide rules the AI must follow during code generation.' : 'Invite teammates and manage workspace access.')), /*#__PURE__*/React.createElement("div", {
    className: "card__scroll"
  }, tab === 'sourceControl' && /*#__PURE__*/React.createElement(SourceControlPanel, {
    onToast: onToast
  }), tab !== 'sourceControl' && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-8)',
      textAlign: 'center',
      color: 'var(--text-tertiary)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-sm)'
    }
  }, "This tab is preserved structurally \u2014 see Source control for the rendered example.")))));
}
function SourceControlPanel({
  onToast
}) {
  return /*#__PURE__*/React.createElement("ul", {
    className: "provider-list"
  }, /*#__PURE__*/React.createElement("li", {
    className: "provider-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "prov-icon github"
  }, Svg.github), /*#__PURE__*/React.createElement("div", {
    className: "prov-meta"
  }, /*#__PURE__*/React.createElement("strong", null, "GitHub"), /*#__PURE__*/React.createElement("span", {
    className: "status status--ok"
  }, "Connected (OAuth) as rileywu")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: () => onToast('info', 'GitHub disconnected', 'You can reconnect from the same panel anytime.')
  }, "Disconnect")), /*#__PURE__*/React.createElement("li", {
    className: "provider-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "prov-icon azure"
  }, Svg.azure), /*#__PURE__*/React.createElement("div", {
    className: "prov-meta"
  }, /*#__PURE__*/React.createElement("strong", null, "Azure DevOps"), /*#__PURE__*/React.createElement("span", {
    className: "status status--ok"
  }, "Connected as riley.wu@devpilot.io")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm"
  }, "Disconnect")), /*#__PURE__*/React.createElement("li", {
    className: "provider-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "prov-icon",
    style: {
      background: 'var(--surface-card)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 12h20M2 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12z",
    stroke: "currentColor",
    strokeWidth: "2",
    fill: "none"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "prov-meta"
  }, /*#__PURE__*/React.createElement("strong", null, "GitLab"), /*#__PURE__*/React.createElement("span", {
    className: "status"
  }, "Not connected")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm"
  }, "Connect")));
}

// ============================================================================
// Confirm-delete modal
// ============================================================================
function ConfirmDelete({
  target,
  onCancel,
  onConfirm
}) {
  if (!target) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: onCancel
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("h3", null, "Remove repository?"), /*#__PURE__*/React.createElement("button", {
    className: "modal-close",
    onClick: onCancel
  }, Svg.close)), /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "modal-description"
  }, "Removing ", /*#__PURE__*/React.createElement("strong", null, target.name), " takes it out of this workspace. The remote repository on ", Provider[target.provider]?.label || target.provider, " is not deleted.")), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-secondary",
    onClick: onCancel
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: onConfirm
  }, "Remove"))));
}

// ============================================================================
// Add-repo modal (used for the "Add manually" CTA)
// ============================================================================
function AddRepoModal({
  open,
  onClose,
  onSubmit
}) {
  const [url, setUrl] = React.useState('');
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("h3", null, "Add GitHub repository"), /*#__PURE__*/React.createElement("button", {
    className: "modal-close",
    onClick: onClose
  }, Svg.close)), /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "modal-description"
  }, "Enter a GitHub repository URL or owner/repo to add it manually."), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "addRepoUrl"
  }, "Repository URL or owner/repo"), /*#__PURE__*/React.createElement("input", {
    id: "addRepoUrl",
    type: "text",
    placeholder: "e.g. https://github.com/owner/repo or owner/repo",
    value: url,
    onChange: e => setUrl(e.target.value)
  })), /*#__PURE__*/React.createElement("p", {
    className: "field-hint"
  }, "Public repos can be added without connecting GitHub. Connect GitHub to add private repos.")), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-secondary",
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    disabled: !url.trim(),
    onClick: () => {
      onSubmit(url);
      setUrl('');
    }
  }, "Add repository"))));
}
Object.assign(window, {
  Repositories,
  Backlog,
  Code,
  Settings,
  ConfirmDelete,
  AddRepoModal
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/Screens.jsx", error: String((e && e.message) || e) }); }

// figma/Sidebar.jsx
try { (() => {
/* global React, lucide */
// Sidebar.jsx — DevPilot left rail, faithful to src/app/layout/sidebar/

// Only two navs in the real app — Backlog & Code are drill-downs from Repositories.
const NAV = [{
  id: 'repositories',
  label: 'Repositories',
  svg: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
  }))
}, {
  id: 'settings',
  label: 'Settings',
  svg: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
  }))
}];

// Lucide-rendered icon (used for header/buttons; the sidebar uses inline SVGs above)
function Icon({
  name,
  size = 18
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = '';
      const i = document.createElement('i');
      i.setAttribute('data-lucide', name);
      i.setAttribute('width', size);
      i.setAttribute('height', size);
      ref.current.appendChild(i);
      window.lucide.createIcons({
        nodes: [i]
      });
    }
  }, [name, size]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex'
    }
  });
}
function Sidebar({
  active,
  onNavigate,
  collapsed,
  onToggleCollapse
}) {
  return /*#__PURE__*/React.createElement("aside", {
    className: 'sidebar' + (collapsed ? ' collapsed' : '')
  }, /*#__PURE__*/React.createElement("header", {
    className: "sidebar-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-header__top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-brand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-brand__mark",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "logo-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2L2 7L12 12L22 7L12 2Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 17L12 22L22 17V12L12 17L2 12V17Z",
    fill: "currentColor",
    opacity: "0.85"
  }))), !collapsed && /*#__PURE__*/React.createElement("div", {
    className: "sidebar-brand__text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sidebar-brand__name"
  }, "DevPilot"), /*#__PURE__*/React.createElement("span", {
    className: "sidebar-brand__tagline"
  }, "Workspace"))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "sidebar-collapse-toggle",
    onClick: onToggleCollapse,
    title: collapsed ? 'Expand sidebar' : 'Collapse sidebar',
    "aria-label": collapsed ? 'Expand sidebar' : 'Collapse sidebar'
  }, /*#__PURE__*/React.createElement("svg", {
    className: "toggle-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, collapsed ? /*#__PURE__*/React.createElement("polyline", {
    points: "11 6 16 12 11 18"
  }) : /*#__PURE__*/React.createElement("polyline", {
    points: "13 6 8 12 13 18"
  }))))), /*#__PURE__*/React.createElement("nav", {
    className: "sidebar-nav",
    "aria-label": "Main navigation"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-section"
  }, !collapsed && /*#__PURE__*/React.createElement("p", {
    className: "nav-section-title"
  }, "Navigate"), /*#__PURE__*/React.createElement("ul", {
    className: "nav-list"
  }, NAV.map(item => /*#__PURE__*/React.createElement("li", {
    key: item.id
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: 'nav-item' + (active === item.id ? ' active' : ''),
    onClick: e => {
      e.preventDefault();
      onNavigate(item.id);
    },
    title: item.label,
    "aria-label": item.label
  }, /*#__PURE__*/React.createElement("span", {
    className: "nav-item__icon",
    "aria-hidden": "true"
  }, React.cloneElement(item.svg, {
    className: 'nav-icon'
  })), !collapsed && /*#__PURE__*/React.createElement("span", {
    className: "nav-label"
  }, item.label))))))), /*#__PURE__*/React.createElement("footer", {
    className: "sidebar-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: 'sidebar-user' + (collapsed ? ' sidebar-user--collapsed' : ''),
    title: "Riley Wu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-user__avatar"
  }, "R"), !collapsed && /*#__PURE__*/React.createElement("div", {
    className: "sidebar-user__meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sidebar-user__name"
  }, "rileywu"), /*#__PURE__*/React.createElement("span", {
    className: "sidebar-user__email"
  }, "riley@devpilot.io"))), !collapsed ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "logout-button"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "logout-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
  })), /*#__PURE__*/React.createElement("span", null, "Sign out")) : /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "logout-button logout-button--icon",
    title: "Sign out",
    "aria-label": "Sign out"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "logout-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
  })))));
}
Object.assign(window, {
  Sidebar,
  Icon
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "figma/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/devpilot-workspace/App.jsx
try { (() => {
/* global React, ReactDOM, Sidebar, Header, Repositories, Backlog, Code, Settings, ConfirmDelete, AddRepoModal, Icon */
// App.jsx — Workspace root.
// Routes mirror src/app/app.routes.ts:
//   /repositories  (default)        — top-level
//   /settings                       — top-level
//   /backlog/:repositoryId          — drill-down from repo card
//   /code/:repositoryId             — drill-down from repo card

function App() {
  const [route, setRoute] = React.useState({
    name: 'repositories'
  });
  const [theme, setTheme] = React.useState('light');
  const [collapsed, setCollapsed] = React.useState(false);
  const [toasts, setToasts] = React.useState([]);
  const [pendingDelete, setPendingDelete] = React.useState(null);
  const [addOpen, setAddOpen] = React.useState(false);
  const [sandboxCount, setSandboxCount] = React.useState(0);
  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  const onToast = React.useCallback((tone, title, msg) => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t, {
      id,
      tone,
      title,
      msg
    }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4200);
  }, []);

  // Active item in the sidebar — both /backlog/:id and /code/:id should keep
  // "Repositories" highlighted because they were entered from there.
  const activeNav = route.name === 'settings' ? 'settings' : 'repositories';
  const breadcrumb = (() => {
    switch (route.name) {
      case 'repositories':
        return ['repositories'];
      case 'settings':
        return ['settings'];
      case 'backlog':
        return ['repositories', route.repo.name, 'backlog'];
      case 'code':
        return ['repositories', route.repo.name, 'code'];
      default:
        return ['repositories'];
    }
  })();
  return /*#__PURE__*/React.createElement("div", {
    className: 'app-container' + (collapsed ? ' app-sidebar-collapsed' : '')
  }, /*#__PURE__*/React.createElement(Sidebar, {
    active: activeNav,
    onNavigate: id => setRoute({
      name: id
    }),
    collapsed: collapsed,
    onToggleCollapse: () => setCollapsed(c => !c)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: collapsed ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width)',
      transition: 'margin-left 0.2s ease',
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement(Header, {
    breadcrumb: breadcrumb,
    theme: theme,
    sandboxCount: sandboxCount,
    onToggleTheme: () => setTheme(t => t === 'light' ? 'dark' : 'light'),
    onToggleSidebarMobile: () => setCollapsed(c => !c)
  }), /*#__PURE__*/React.createElement("main", null, route.name === 'repositories' && /*#__PURE__*/React.createElement(Repositories, {
    onOpenBacklog: repo => {
      setRoute({
        name: 'backlog',
        repo
      });
      setSandboxCount(c => c + 1);
    },
    onOpenCode: repo => {
      setRoute({
        name: 'code',
        repo
      });
      setSandboxCount(c => c + 1);
    },
    onAskDelete: setPendingDelete,
    onShare: r => onToast('info', 'Share dialog', `Share invite list for ${r.name} would open here.`),
    onOpenAddRepo: () => setAddOpen(true),
    onToast: onToast
  }), route.name === 'backlog' && /*#__PURE__*/React.createElement(Backlog, {
    repo: route.repo,
    onBack: () => {
      setRoute({
        name: 'repositories'
      });
      setSandboxCount(c => Math.max(0, c - 1));
    },
    onToast: onToast
  }), route.name === 'code' && /*#__PURE__*/React.createElement(Code, {
    repo: route.repo,
    onBack: () => {
      setRoute({
        name: 'repositories'
      });
      setSandboxCount(c => Math.max(0, c - 1));
    }
  }), route.name === 'settings' && /*#__PURE__*/React.createElement(Settings, {
    onToast: onToast
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      right: 'var(--space-5)',
      bottom: 'var(--space-5)',
      display: 'flex',
      flexDirection: 'column-reverse',
      gap: 'var(--space-3)',
      zIndex: 500,
      pointerEvents: 'none'
    }
  }, toasts.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    className: 'dp-toast ' + t.tone,
    style: {
      pointerEvents: 'auto',
      animation: 'dp-toast-in 0.3s var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon-box"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": t.tone === 'success' ? 'check' : t.tone === 'info' ? 'info' : t.tone === 'warning' ? 'alert-triangle' : 'x-circle',
    width: "16",
    height: "16"
  })), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, t.title), /*#__PURE__*/React.createElement("div", {
    className: "msg"
  }, t.msg)), /*#__PURE__*/React.createElement("button", {
    className: "close",
    onClick: () => setToasts(ts => ts.filter(x => x.id !== t.id))
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "x",
    width: "14",
    height: "14"
  }))))), /*#__PURE__*/React.createElement(ConfirmDelete, {
    target: pendingDelete,
    onCancel: () => setPendingDelete(null),
    onConfirm: () => {
      const name = pendingDelete?.name;
      setPendingDelete(null);
      onToast('success', 'Repository removed', `${name} is no longer in this workspace.`);
    }
  }), /*#__PURE__*/React.createElement(AddRepoModal, {
    open: addOpen,
    onClose: () => setAddOpen(false),
    onSubmit: url => {
      setAddOpen(false);
      onToast('success', 'Repository added', url);
    }
  }));
}

// re-render Lucide icons when toasts mount/unmount
const observer = new MutationObserver(() => {
  if (window.lucide) window.lucide.createIcons();
});
observer.observe(document.body, {
  childList: true,
  subtree: true
});
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/devpilot-workspace/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/devpilot-workspace/Header.jsx
try { (() => {
/* global React, Icon */
// Header.jsx — DevPilot top bar, faithful to src/app/layout/header/

function Header({
  breadcrumb,
  theme,
  onToggleTheme,
  onToggleSidebarMobile,
  sandboxCount = 0
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header-content"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onToggleSidebarMobile,
    className: "menu-toggle",
    "aria-label": "Toggle menu"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "menu-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "12",
    x2: "21",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "6",
    x2: "21",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "18",
    x2: "21",
    y2: "18"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "header-title"
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    segments: breadcrumb
  })), /*#__PURE__*/React.createElement("div", {
    className: "header-actions"
  }, sandboxCount > 0 && /*#__PURE__*/React.createElement("div", {
    className: "header-sandbox",
    title: `${sandboxCount} running sandbox${sandboxCount === 1 ? '' : 'es'}`
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "header-sandbox-trigger",
    "aria-label": `${sandboxCount} sandboxes`
  }, /*#__PURE__*/React.createElement("span", {
    className: "header-sandbox-icon",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "3",
    width: "20",
    height: "14",
    rx: "0",
    ry: "0"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "21",
    x2: "16",
    y2: "21"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "17",
    x2: "12",
    y2: "21"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "header-sandbox-label"
  }, sandboxCount, " running"), /*#__PURE__*/React.createElement("span", {
    className: "header-sandbox-chev",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.25",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  }))))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onToggleTheme,
    className: "theme-toggle",
    "aria-label": "Toggle theme"
  }, theme === 'light' ? /*#__PURE__*/React.createElement("svg", {
    className: "theme-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
  })) : /*#__PURE__*/React.createElement("svg", {
    className: "theme-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "1",
    x2: "12",
    y2: "3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "21",
    x2: "12",
    y2: "23"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4.22",
    y1: "4.22",
    x2: "5.64",
    y2: "5.64"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18.36",
    y1: "18.36",
    x2: "19.78",
    y2: "19.78"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "1",
    y1: "12",
    x2: "3",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "12",
    x2: "23",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4.22",
    y1: "19.78",
    x2: "5.64",
    y2: "18.36"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18.36",
    y1: "5.64",
    x2: "19.78",
    y2: "4.22"
  }))))));
}

// Inline breadcrumb (the real app uses <app-breadcrumb /> — we render directly for simplicity)
function Breadcrumb({
  segments
}) {
  return /*#__PURE__*/React.createElement("nav", {
    className: "dp-breadcrumb",
    "aria-label": "Breadcrumb"
  }, segments.map((seg, i) => {
    const isLast = i === segments.length - 1;
    const isLink = i === 0;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, i > 0 && /*#__PURE__*/React.createElement("span", {
      className: "sep"
    }, "/"), isLast ? /*#__PURE__*/React.createElement("span", {
      className: "leaf"
    }, seg) : isLink ? /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => e.preventDefault()
    }, seg) : /*#__PURE__*/React.createElement("span", {
      className: "mid"
    }, seg));
  }));
}
Object.assign(window, {
  Header,
  Breadcrumb
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/devpilot-workspace/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/devpilot-workspace/Screens.jsx
try { (() => {
/* global React, Icon */
// Screens.jsx — Source-faithful screen panels for ui_kits/devpilot-workspace

// ============================================================================
// Static demo data
// ============================================================================
const REPOS = [
// recent
{
  id: 'r1',
  name: 'devpilot-api',
  project: 'devpilot',
  provider: 'GitHub',
  branch: 'main',
  isPrivate: true,
  description: 'Backend services for the DevPilot workspace.',
  sharedWithCount: 4,
  recent: true
}, {
  id: 'r2',
  name: 'devpilot-web',
  project: 'devpilot',
  provider: 'GitHub',
  branch: 'main',
  isPrivate: true,
  description: 'Angular frontend (this repo).',
  sharedWithCount: 4,
  recent: true
}, {
  id: 'r3',
  name: 'design-system',
  project: 'devpilot',
  provider: 'GitHub',
  branch: 'main',
  isPrivate: false,
  description: 'Tokens, components, and the package you are looking at.',
  sharedWithCount: 7,
  recent: true
},
// others
{
  id: 'r4',
  name: 'devpilot-cli',
  project: 'devpilot',
  provider: 'GitHub',
  branch: 'dev',
  isPrivate: true,
  description: 'Local CLI for managing sandboxes from a terminal.'
}, {
  id: 'r5',
  name: 'devpilot-docs',
  project: 'devpilot',
  provider: 'GitHub',
  branch: 'main',
  isPrivate: false,
  description: 'Public documentation site.'
}, {
  id: 'r6',
  name: 'platform-infra',
  project: 'Platform',
  provider: 'AzureDevOps',
  branch: 'main',
  isPrivate: true,
  description: 'Terraform + ARM modules for shared infra.'
}, {
  id: 'r7',
  name: 'identity-svc',
  project: 'Platform',
  provider: 'AzureDevOps',
  branch: 'main',
  isPrivate: true,
  description: 'OIDC provider and SCIM bridge.'
}, {
  id: 'r8',
  name: 'spike-rust-grid',
  project: 'Sandbox',
  provider: 'Unpublished',
  branch: null,
  isPrivate: true,
  description: 'Local-only experiment with virtual scrolling.'
}];
const PROJECT_NAMES = {
  devpilot: 'devpilot',
  Platform: 'Platform',
  Sandbox: 'Sandbox'
};

// ============================================================================
// Reusable inline SVG icon helpers (source-faithful — match Angular templates)
// ============================================================================
const Svg = {
  github: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
  })),
  azure: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 6v12l-6 4V6l-8 2v12l-6-4V6l10-4 10 4z"
  })),
  local: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "3",
    width: "20",
    height: "14",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "21",
    x2: "16",
    y2: "21"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "17",
    x2: "12",
    y2: "21"
  })),
  branch: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "3",
    x2: "6",
    y2: "15"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "6",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "18",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 9a9 9 0 01-9 9"
  })),
  lock: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "11",
    width: "18",
    height: "11",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 11V7a5 5 0 0110 0v4"
  })),
  lockOpen: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "11",
    width: "18",
    height: "11",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 11V7a5 5 0 019.9-1"
  })),
  share: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "5",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "19",
    r: "3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8.59",
    y1: "13.51",
    x2: "15.42",
    y2: "17.49"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "15.41",
    y1: "6.51",
    x2: "8.59",
    y2: "10.49"
  })),
  trash: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "3 6 5 6 21 6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "10",
    y1: "11",
    x2: "10",
    y2: "17"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "14",
    y1: "11",
    x2: "14",
    y2: "17"
  })),
  backlog: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "6",
    x2: "21",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "12",
    x2: "21",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "18",
    x2: "21",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "6",
    x2: "3.01",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "12",
    x2: "3.01",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "18",
    x2: "3.01",
    y2: "18"
  })),
  code: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "16 18 22 12 16 6"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "8 6 2 12 8 18"
  })),
  search: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  })),
  sync: /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9m-9 9a9 9 0 0 1 9-9"
  })),
  continueIcon: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 8v4l3 3"
  })),
  grid: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "7",
    height: "7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "3",
    width: "7",
    height: "7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "14",
    width: "7",
    height: "7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "14",
    width: "7",
    height: "7"
  })),
  close: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })),
  empty: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })),
  arrowLeft: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "19",
    y1: "12",
    x2: "5",
    y2: "12"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 19 5 12 12 5"
  })),
  cog: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 1v6m0 10v6M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24M1 12h6m10 0h6M4.22 19.78l4.24-4.24m7.08-7.08l4.24-4.24"
  })),
  flask: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 2v6l-5 9a3 3 0 003 4h10a3 3 0 003-4l-5-9V2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 2h6"
  })),
  brain: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 4a3 3 0 00-3 3v2a3 3 0 00-3 3v2a3 3 0 003 3v0a3 3 0 003 3 3 3 0 003-3v0a3 3 0 003-3v-2a3 3 0 00-3-3V7a3 3 0 00-3-3z"
  })),
  feed: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 11a9 9 0 019 9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 4a16 16 0 0116 16"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "19",
    r: "1"
  }))
};
const Provider = {
  GitHub: {
    icon: Svg.github,
    label: 'GitHub',
    cls: 'github'
  },
  AzureDevOps: {
    icon: Svg.azure,
    label: 'Azure',
    cls: 'azure'
  },
  Unpublished: {
    icon: Svg.local,
    label: 'Local',
    cls: 'local'
  }
};

// ============================================================================
// REPOSITORIES
// ============================================================================
function RepositoryCard({
  repo,
  onOpenBacklog,
  onOpenCode,
  onAskDelete,
  onShare
}) {
  const prov = Provider[repo.provider] || {
    icon: null,
    label: repo.provider,
    cls: ''
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "repo-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "repo-card__top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "repo-card__chips"
  }, /*#__PURE__*/React.createElement("span", {
    className: 'repo-chip repo-chip--provider ' + prov.cls
  }, prov.icon, /*#__PURE__*/React.createElement("span", null, prov.label)), repo.branch && /*#__PURE__*/React.createElement("span", {
    className: "repo-chip repo-chip--branch",
    title: 'Default branch: ' + repo.branch
  }, Svg.branch, /*#__PURE__*/React.createElement("span", {
    className: "repo-chip-branch-text"
  }, repo.branch))), /*#__PURE__*/React.createElement("div", {
    className: "repo-card__top-actions"
  }, /*#__PURE__*/React.createElement("span", {
    className: "repo-vis-icon",
    title: repo.isPrivate ? 'Private repository' : 'Public repository'
  }, repo.isPrivate ? Svg.lock : Svg.lockOpen), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "repo-icon-btn",
    onClick: e => {
      e.stopPropagation();
      onShare(repo);
    },
    title: (repo.sharedWithCount ?? 0) > 0 ? `Shared with ${repo.sharedWithCount}` : 'Share repository'
  }, Svg.share), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "repo-icon-btn repo-icon-btn--danger",
    onClick: e => {
      e.stopPropagation();
      onAskDelete(repo);
    },
    title: "Remove repository"
  }, Svg.trash))), /*#__PURE__*/React.createElement("div", {
    className: "repo-card__body"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "repo-name"
  }, repo.name), repo.description && /*#__PURE__*/React.createElement("p", {
    className: "repo-description"
  }, repo.description)), /*#__PURE__*/React.createElement("div", {
    className: "repo-card-actions"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onOpenBacklog(repo);
    },
    className: "action-btn primary"
  }, Svg.backlog, /*#__PURE__*/React.createElement("span", null, "Backlog")), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onOpenCode(repo);
    },
    className: "action-btn secondary"
  }, Svg.code, /*#__PURE__*/React.createElement("span", null, "Code"))));
}
function Repositories({
  onOpenBacklog,
  onOpenCode,
  onAskDelete,
  onShare,
  onOpenAddRepo,
  onToast
}) {
  const [search, setSearch] = React.useState('');
  const [tab, setTab] = React.useState('all');
  const filtered = REPOS.filter(r => {
    if (tab !== 'all' && r.provider !== tab) return false;
    if (search && !(r.name + ' ' + (r.description || '')).toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const recents = filtered.filter(r => r.recent);
  const grouped = React.useMemo(() => {
    const map = new Map();
    for (const r of filtered) {
      if (!map.has(r.project)) map.set(r.project, []);
      map.get(r.project).push(r);
    }
    return [...map.entries()].map(([project, items]) => ({
      project,
      items
    }));
  }, [filtered]);
  const counts = {
    all: REPOS.length,
    GitHub: REPOS.filter(r => r.provider === 'GitHub').length,
    AzureDevOps: REPOS.filter(r => r.provider === 'AzureDevOps').length,
    Unpublished: REPOS.filter(r => r.provider === 'Unpublished').length
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "repositories-container",
    style: {
      padding: 'var(--space-5) var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dp-card p-sm sync-section",
    style: {
      padding: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sync-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sync-dropdown"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-md",
    onClick: () => onToast('info', 'Syncing repositories', 'Pulling from GitHub…')
  }, Svg.sync, /*#__PURE__*/React.createElement("span", null, "Sync Repositories"), /*#__PURE__*/React.createElement("svg", {
    className: "dropdown-arrow",
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "sync-info"
  }, /*#__PURE__*/React.createElement("p", {
    className: "sync-title"
  }, "Pull your latest repositories"), /*#__PURE__*/React.createElement("p", {
    className: "sync-help"
  }, "Sync repositories from your connected providers")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-md",
    onClick: onOpenAddRepo
  }, "Add manually"))), /*#__PURE__*/React.createElement("div", {
    className: "search-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-input-wrapper"
  }, /*#__PURE__*/React.createElement("span", {
    className: "search-icon"
  }, Svg.search), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "search-input",
    placeholder: "Search by project or repository name...",
    value: search,
    onChange: e => setSearch(e.target.value)
  })), /*#__PURE__*/React.createElement("span", {
    className: "search-meta"
  }, filtered.length, " ", filtered.length === 1 ? 'repository' : 'repositories')), /*#__PURE__*/React.createElement("div", {
    className: "provider-tabs"
  }, /*#__PURE__*/React.createElement("button", {
    className: 'provider-tab' + (tab === 'all' ? ' active' : ''),
    onClick: () => setTab('all')
  }, Svg.grid, /*#__PURE__*/React.createElement("span", null, "All"), /*#__PURE__*/React.createElement("span", {
    className: "tab-count"
  }, counts.all)), /*#__PURE__*/React.createElement("button", {
    className: 'provider-tab local' + (tab === 'Unpublished' ? ' active' : ''),
    onClick: () => setTab('Unpublished'),
    disabled: counts.Unpublished === 0
  }, Svg.local, /*#__PURE__*/React.createElement("span", null, "Local"), /*#__PURE__*/React.createElement("span", {
    className: "tab-count"
  }, counts.Unpublished)), /*#__PURE__*/React.createElement("button", {
    className: 'provider-tab github' + (tab === 'GitHub' ? ' active' : ''),
    onClick: () => setTab('GitHub'),
    disabled: counts.GitHub === 0
  }, Svg.github, /*#__PURE__*/React.createElement("span", null, "GitHub"), /*#__PURE__*/React.createElement("span", {
    className: "tab-count"
  }, counts.GitHub)), /*#__PURE__*/React.createElement("button", {
    className: 'provider-tab azure' + (tab === 'AzureDevOps' ? ' active' : ''),
    onClick: () => setTab('AzureDevOps'),
    disabled: counts.AzureDevOps === 0
  }, Svg.azure, /*#__PURE__*/React.createElement("span", null, "Azure"), /*#__PURE__*/React.createElement("span", {
    className: "tab-count"
  }, counts.AzureDevOps))), filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: 'var(--space-12)',
      color: 'var(--text-tertiary)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      margin: '0 auto var(--space-3)',
      color: 'var(--text-muted)'
    }
  }, Svg.empty), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--fs-lg)',
      fontWeight: 600,
      color: 'var(--text-secondary)',
      margin: 0
    }
  }, "No repositories match your filters"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-sm)',
      marginTop: 4
    }
  }, "Try adjusting your search or provider filter.")), recents.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "project-section",
    role: "region",
    "aria-label": "Recently opened repositories"
  }, /*#__PURE__*/React.createElement("div", {
    className: "project-section-header"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "project-section-title project-section-title--continue"
  }, /*#__PURE__*/React.createElement("span", {
    className: "continue-heading-icon"
  }, Svg.continueIcon), "Continue"), /*#__PURE__*/React.createElement("span", {
    className: "project-section-count"
  }, "Most recent \xB7 up to 5")), /*#__PURE__*/React.createElement("div", {
    className: "repositories-grid"
  }, recents.map(r => /*#__PURE__*/React.createElement(RepositoryCard, {
    key: r.id,
    repo: r,
    onOpenBacklog: onOpenBacklog,
    onOpenCode: onOpenCode,
    onAskDelete: onAskDelete,
    onShare: onShare
  })))), grouped.map(group => {
    const items = group.items.filter(r => !r.recent);
    if (items.length === 0) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: group.project,
      className: "project-section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "project-section-header"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "project-section-title"
    }, PROJECT_NAMES[group.project] || group.project), /*#__PURE__*/React.createElement("span", {
      className: "project-section-count"
    }, items.length, " repo", items.length !== 1 ? 's' : '')), /*#__PURE__*/React.createElement("div", {
      className: "repositories-grid"
    }, items.map(r => /*#__PURE__*/React.createElement(RepositoryCard, {
      key: r.id,
      repo: r,
      onOpenBacklog: onOpenBacklog,
      onOpenCode: onOpenCode,
      onAskDelete: onAskDelete,
      onShare: onShare
    }))));
  }));
}

// ============================================================================
// BACKLOG (drill-down per repo)
// ============================================================================
const BACKLOG_ITEMS = [{
  id: 'DP-241',
  title: 'OAuth token refresh fails on expired session',
  type: 'Bug',
  typeTone: 'error',
  assignee: 'A. Patel',
  priority: 'High',
  pTone: 'warning'
}, {
  id: 'DP-240',
  title: 'Backlog drag-reorder loses position on refresh',
  type: 'Bug',
  typeTone: 'error',
  assignee: 'A. Patel',
  priority: 'High',
  pTone: 'warning'
}, {
  id: 'DP-238',
  title: 'Add dark mode preview to settings',
  type: 'Feature',
  typeTone: 'primary',
  assignee: 'R. Wu',
  priority: 'Med',
  pTone: 'info'
}, {
  id: 'DP-237',
  title: 'Sandbox: persist last-opened route',
  type: 'Feature',
  typeTone: 'primary',
  assignee: 'R. Wu',
  priority: 'Med',
  pTone: 'info'
}, {
  id: 'DP-235',
  title: 'Refactor data-grid pagination',
  type: 'Tech',
  typeTone: 'secondary',
  assignee: 'S. Kim',
  priority: 'Med',
  pTone: 'info'
}, {
  id: 'DP-231',
  title: 'Indigo focus ring drops by 1px on Firefox',
  type: 'Bug',
  typeTone: 'error',
  assignee: '—',
  priority: 'Low',
  pTone: 'success'
}, {
  id: 'DP-229',
  title: 'Document Tokens Studio import flow',
  type: 'Docs',
  typeTone: 'info',
  assignee: '—',
  priority: 'Low',
  pTone: 'success'
}];
function Backlog({
  repo,
  onBack,
  onToast
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5) var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      marginBottom: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: onBack
  }, Svg.arrowLeft, " ", /*#__PURE__*/React.createElement("span", null, "Back")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-tertiary)'
    }
  }, "Backlog"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--fs-2xl)',
      fontWeight: 700,
      color: 'var(--text-primary)',
      letterSpacing: '-0.025em',
      margin: 0
    }
  }, repo.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm"
  }, "Export"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: () => onToast('info', 'Generating items', 'AI is drafting items from your recent activity.')
  }, "Generate backlog")), /*#__PURE__*/React.createElement("div", {
    className: "dp-card p-sm",
    style: {
      padding: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-3) var(--space-4)',
      background: 'linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(139,92,246,0.03) 100%)',
      borderBottom: '1px solid var(--border-light)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      alignItems: 'center',
      fontSize: 13,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", null, "Backlog \xB7 ", BACKLOG_ITEMS.length, " items")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm"
  }, "Filter"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm"
  }, "Group"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm"
  }, "Add item"))), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ['ID', 'Title', 'Type', 'Assignee', 'Priority'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
      color: 'var(--text-secondary)',
      padding: '14px 16px',
      textAlign: 'left',
      borderBottom: '1px solid var(--border-light)',
      background: 'var(--surface-card)'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, BACKLOG_ITEMS.map((i, idx) => /*#__PURE__*/React.createElement("tr", {
    key: i.id,
    style: {
      background: idx % 2 ? 'var(--surface-elevated)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: cell('var(--font-mono)', 12)
  }, i.id), /*#__PURE__*/React.createElement("td", {
    style: cell()
  }, i.title), /*#__PURE__*/React.createElement("td", {
    style: cell()
  }, /*#__PURE__*/React.createElement("span", {
    className: 'dp-badge ' + i.typeTone
  }, i.type)), /*#__PURE__*/React.createElement("td", {
    style: {
      ...cell(),
      color: 'var(--text-secondary)'
    }
  }, i.assignee), /*#__PURE__*/React.createElement("td", {
    style: cell()
  }, /*#__PURE__*/React.createElement("span", {
    className: 'dp-badge ' + i.pTone
  }, i.priority))))))));
}
function cell(font, size) {
  return {
    padding: '10px 16px',
    fontSize: size || 13,
    fontFamily: font || 'var(--font-sans)',
    color: 'var(--text-primary)',
    borderBottom: '1px solid var(--border-light)'
  };
}

// ============================================================================
// CODE (drill-down per repo)
// ============================================================================
function Code({
  repo,
  onBack
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5) var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      marginBottom: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: onBack
  }, Svg.arrowLeft, /*#__PURE__*/React.createElement("span", null, "Back")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-tertiary)'
    }
  }, "Code"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--fs-2xl)',
      fontWeight: 700,
      color: 'var(--text-primary)',
      letterSpacing: '-0.025em',
      margin: 0
    }
  }, repo.name))), /*#__PURE__*/React.createElement("nav", {
    className: "dp-breadcrumb",
    style: {
      marginBottom: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault()
  }, repo.name), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    className: "mid"
  }, "src"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    className: "mid"
  }, "tokens"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    className: "leaf"
  }, "resolve.ts")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#0d1117',
      color: '#c9d1d9',
      padding: 'var(--space-5)',
      borderRadius: 10,
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      lineHeight: 1.6,
      border: '1px solid #21262d',
      overflow: 'auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#8b949e'
    }
  }, '// Resolve a design token by dotted path.'), '\n', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ff7b72'
    }
  }, "import"), ' ', /*#__PURE__*/React.createElement("span", null, '{ tokens }'), ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ff7b72'
    }
  }, "from"), ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#a5d6ff'
    }
  }, "'./tokens'"), ";", '\n\n', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ff7b72'
    }
  }, "export function"), ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#d2a8ff'
    }
  }, "resolve"), "(", '\n', '  ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ffa657'
    }
  }, "path"), ": ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#79c0ff'
    }
  }, "string"), '\n', ")", ': ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#79c0ff'
    }
  }, "unknown"), ' {', '\n', '  ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ff7b72'
    }
  }, "return"), ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ffa657'
    }
  }, "path"), ".", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#d2a8ff'
    }
  }, "split"), "(", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#a5d6ff'
    }
  }, "'.'"), ") .", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#d2a8ff'
    }
  }, "reduce"), "((", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ffa657'
    }
  }, "o"), ", ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ffa657'
    }
  }, "k"), ") ", '=>', " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ffa657'
    }
  }, "o"), '?.[', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ffa657'
    }
  }, "k"), '], ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ffa657'
    }
  }, "tokens"), ");", '\n', '}'));
}

// ============================================================================
// SETTINGS
// ============================================================================
function Settings({
  onToast
}) {
  const [tab, setTab] = React.useState('sourceControl');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5) var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "settings-page__top"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "settings-page__title"
  }, "Settings"), /*#__PURE__*/React.createElement("p", {
    className: "settings-page__lead"
  }, "Configure integrations by section. Pick a tab below; lists and forms scroll inside each card.")), /*#__PURE__*/React.createElement("nav", {
    className: "settings-tabs",
    role: "tablist"
  }, [{
    id: 'sourceControl',
    label: 'Source control',
    icon: Svg.share
  }, {
    id: 'ai',
    label: 'AI providers',
    icon: Svg.brain
  }, {
    id: 'mcp',
    label: 'MCP servers',
    icon: Svg.flask
  }, {
    id: 'artifacts',
    label: 'Artifact feeds',
    icon: Svg.feed
  }, {
    id: 'agentRules',
    label: 'Agent rules',
    icon: Svg.cog
  }, {
    id: 'users',
    label: 'Users',
    icon: Svg.share
  }].map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    type: "button",
    role: "tab",
    className: 'settings-tabs__tab' + (tab === t.id ? ' settings-tabs__tab--active' : ''),
    "aria-selected": tab === t.id,
    onClick: () => setTab(t.id)
  }, React.cloneElement(t.icon, {
    className: 'settings-tabs__icon'
  }), t.label))), /*#__PURE__*/React.createElement("section", {
    className: "card--panel"
  }, /*#__PURE__*/React.createElement("header", {
    className: "card__header"
  }, /*#__PURE__*/React.createElement("h2", null, tab === 'sourceControl' ? 'Source control' : tab === 'ai' ? 'AI providers' : tab === 'mcp' ? 'MCP servers' : tab === 'artifacts' ? 'Artifact feeds' : tab === 'agentRules' ? 'Agent rules' : 'Users'), /*#__PURE__*/React.createElement("p", null, tab === 'sourceControl' ? 'Connect Git hosting and Azure DevOps to sync repositories.' : tab === 'ai' ? 'Choose a model provider and set credentials.' : tab === 'mcp' ? 'Connect MCP servers to expose tools to the agent.' : tab === 'artifacts' ? 'Subscribe to NuGet, npm, or Maven feeds the agent can read.' : tab === 'agentRules' ? 'Org-wide rules the AI must follow during code generation.' : 'Invite teammates and manage workspace access.')), /*#__PURE__*/React.createElement("div", {
    className: "card__scroll"
  }, tab === 'sourceControl' && /*#__PURE__*/React.createElement(SourceControlPanel, {
    onToast: onToast
  }), tab !== 'sourceControl' && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-8)',
      textAlign: 'center',
      color: 'var(--text-tertiary)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-sm)'
    }
  }, "This tab is preserved structurally \u2014 see Source control for the rendered example.")))));
}
function SourceControlPanel({
  onToast
}) {
  return /*#__PURE__*/React.createElement("ul", {
    className: "provider-list"
  }, /*#__PURE__*/React.createElement("li", {
    className: "provider-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "prov-icon github"
  }, Svg.github), /*#__PURE__*/React.createElement("div", {
    className: "prov-meta"
  }, /*#__PURE__*/React.createElement("strong", null, "GitHub"), /*#__PURE__*/React.createElement("span", {
    className: "status status--ok"
  }, "Connected (OAuth) as rileywu")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: () => onToast('info', 'GitHub disconnected', 'You can reconnect from the same panel anytime.')
  }, "Disconnect")), /*#__PURE__*/React.createElement("li", {
    className: "provider-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "prov-icon azure"
  }, Svg.azure), /*#__PURE__*/React.createElement("div", {
    className: "prov-meta"
  }, /*#__PURE__*/React.createElement("strong", null, "Azure DevOps"), /*#__PURE__*/React.createElement("span", {
    className: "status status--ok"
  }, "Connected as riley.wu@devpilot.io")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm"
  }, "Disconnect")), /*#__PURE__*/React.createElement("li", {
    className: "provider-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "prov-icon",
    style: {
      background: 'var(--surface-card)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 12h20M2 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12z",
    stroke: "currentColor",
    strokeWidth: "2",
    fill: "none"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "prov-meta"
  }, /*#__PURE__*/React.createElement("strong", null, "GitLab"), /*#__PURE__*/React.createElement("span", {
    className: "status"
  }, "Not connected")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm"
  }, "Connect")));
}

// ============================================================================
// Confirm-delete modal
// ============================================================================
function ConfirmDelete({
  target,
  onCancel,
  onConfirm
}) {
  if (!target) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: onCancel
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("h3", null, "Remove repository?"), /*#__PURE__*/React.createElement("button", {
    className: "modal-close",
    onClick: onCancel
  }, Svg.close)), /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "modal-description"
  }, "Removing ", /*#__PURE__*/React.createElement("strong", null, target.name), " takes it out of this workspace. The remote repository on ", Provider[target.provider]?.label || target.provider, " is not deleted.")), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-secondary",
    onClick: onCancel
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: onConfirm
  }, "Remove"))));
}

// ============================================================================
// Add-repo modal (used for the "Add manually" CTA)
// ============================================================================
function AddRepoModal({
  open,
  onClose,
  onSubmit
}) {
  const [url, setUrl] = React.useState('');
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("h3", null, "Add GitHub repository"), /*#__PURE__*/React.createElement("button", {
    className: "modal-close",
    onClick: onClose
  }, Svg.close)), /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "modal-description"
  }, "Enter a GitHub repository URL or owner/repo to add it manually."), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "addRepoUrl"
  }, "Repository URL or owner/repo"), /*#__PURE__*/React.createElement("input", {
    id: "addRepoUrl",
    type: "text",
    placeholder: "e.g. https://github.com/owner/repo or owner/repo",
    value: url,
    onChange: e => setUrl(e.target.value)
  })), /*#__PURE__*/React.createElement("p", {
    className: "field-hint"
  }, "Public repos can be added without connecting GitHub. Connect GitHub to add private repos.")), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-secondary",
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    disabled: !url.trim(),
    onClick: () => {
      onSubmit(url);
      setUrl('');
    }
  }, "Add repository"))));
}
Object.assign(window, {
  Repositories,
  Backlog,
  Code,
  Settings,
  ConfirmDelete,
  AddRepoModal
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/devpilot-workspace/Screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/devpilot-workspace/Sidebar.jsx
try { (() => {
/* global React, lucide */
// Sidebar.jsx — DevPilot left rail, faithful to src/app/layout/sidebar/

// Only two navs in the real app — Backlog & Code are drill-downs from Repositories.
const NAV = [{
  id: 'repositories',
  label: 'Repositories',
  svg: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
  }))
}, {
  id: 'settings',
  label: 'Settings',
  svg: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
  }))
}];

// Lucide-rendered icon (used for header/buttons; the sidebar uses inline SVGs above)
function Icon({
  name,
  size = 18
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = '';
      const i = document.createElement('i');
      i.setAttribute('data-lucide', name);
      i.setAttribute('width', size);
      i.setAttribute('height', size);
      ref.current.appendChild(i);
      window.lucide.createIcons({
        nodes: [i]
      });
    }
  }, [name, size]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex'
    }
  });
}
function Sidebar({
  active,
  onNavigate,
  collapsed,
  onToggleCollapse
}) {
  return /*#__PURE__*/React.createElement("aside", {
    className: 'sidebar' + (collapsed ? ' collapsed' : '')
  }, /*#__PURE__*/React.createElement("header", {
    className: "sidebar-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-header__top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-brand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-brand__mark",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "logo-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2L2 7L12 12L22 7L12 2Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 17L12 22L22 17V12L12 17L2 12V17Z",
    fill: "currentColor",
    opacity: "0.85"
  }))), !collapsed && /*#__PURE__*/React.createElement("div", {
    className: "sidebar-brand__text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sidebar-brand__name"
  }, "DevPilot"), /*#__PURE__*/React.createElement("span", {
    className: "sidebar-brand__tagline"
  }, "Workspace"))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "sidebar-collapse-toggle",
    onClick: onToggleCollapse,
    title: collapsed ? 'Expand sidebar' : 'Collapse sidebar',
    "aria-label": collapsed ? 'Expand sidebar' : 'Collapse sidebar'
  }, /*#__PURE__*/React.createElement("svg", {
    className: "toggle-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, collapsed ? /*#__PURE__*/React.createElement("polyline", {
    points: "11 6 16 12 11 18"
  }) : /*#__PURE__*/React.createElement("polyline", {
    points: "13 6 8 12 13 18"
  }))))), /*#__PURE__*/React.createElement("nav", {
    className: "sidebar-nav",
    "aria-label": "Main navigation"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-section"
  }, !collapsed && /*#__PURE__*/React.createElement("p", {
    className: "nav-section-title"
  }, "Navigate"), /*#__PURE__*/React.createElement("ul", {
    className: "nav-list"
  }, NAV.map(item => /*#__PURE__*/React.createElement("li", {
    key: item.id
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: 'nav-item' + (active === item.id ? ' active' : ''),
    onClick: e => {
      e.preventDefault();
      onNavigate(item.id);
    },
    title: item.label,
    "aria-label": item.label
  }, /*#__PURE__*/React.createElement("span", {
    className: "nav-item__icon",
    "aria-hidden": "true"
  }, React.cloneElement(item.svg, {
    className: 'nav-icon'
  })), !collapsed && /*#__PURE__*/React.createElement("span", {
    className: "nav-label"
  }, item.label))))))), /*#__PURE__*/React.createElement("footer", {
    className: "sidebar-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: 'sidebar-user' + (collapsed ? ' sidebar-user--collapsed' : ''),
    title: "Riley Wu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-user__avatar"
  }, "R"), !collapsed && /*#__PURE__*/React.createElement("div", {
    className: "sidebar-user__meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sidebar-user__name"
  }, "rileywu"), /*#__PURE__*/React.createElement("span", {
    className: "sidebar-user__email"
  }, "riley@devpilot.io"))), !collapsed ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "logout-button"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "logout-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
  })), /*#__PURE__*/React.createElement("span", null, "Sign out")) : /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "logout-button logout-button--icon",
    title: "Sign out",
    "aria-label": "Sign out"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "logout-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
  })))));
}
Object.assign(window, {
  Sidebar,
  Icon
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/devpilot-workspace/Sidebar.jsx", error: String((e && e.message) || e) }); }

})();
