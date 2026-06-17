# Andy-UI

[![Release](https://github.com/rivoli-ai/andy-ui/actions/workflows/release.yml/badge.svg)](https://github.com/rivoli-ai/andy-ui/actions/workflows/release.yml)
[![Deploy Pages](https://github.com/rivoli-ai/andy-ui/actions/workflows/pages.yml/badge.svg)](https://github.com/rivoli-ai/andy-ui/actions/workflows/pages.yml)

A framework-agnostic design system. Components are authored once as
[Lit](https://lit.dev) web components and styled by a single global stylesheet,
then consumed from **React**, **Angular**, or plain HTML.

## Live

- 📚 **Storybook** — https://rivoli-ai.github.io/andy-ui/
- ⚛️ **React example** — https://rivoli-ai.github.io/andy-ui/react/
- 🅰️ **Angular example** — https://rivoli-ai.github.io/andy-ui/angular/

## Packages

| Package | Version | Description |
|---|---|---|
| [`@andy-ui/tokens`](packages/tokens) | [![npm](https://img.shields.io/npm/v/@andy-ui/tokens)](https://www.npmjs.com/package/@andy-ui/tokens) | Design tokens + all component CSS (one stylesheet). |
| [`@andy-ui/core`](packages/core) | [![npm](https://img.shields.io/npm/v/@andy-ui/core)](https://www.npmjs.com/package/@andy-ui/core) | The `<andy-*>` web components + `toast`/theme helpers. |
| [`@andy-ui/react`](packages/react) | [![npm](https://img.shields.io/npm/v/@andy-ui/react)](https://www.npmjs.com/package/@andy-ui/react) | React bindings. |
| [`@andy-ui/angular`](packages/angular) | [![npm](https://img.shields.io/npm/v/@andy-ui/angular)](https://www.npmjs.com/package/@andy-ui/angular) | Angular form-control directives + `ToastService`. |

## Quick start

```bash
# React
npm install @andy-ui/react @andy-ui/tokens
# Angular
npm install @andy-ui/angular @andy-ui/tokens
# Web components only
npm install @andy-ui/core @andy-ui/tokens
```

Import the stylesheet once at your app root:

```ts
import "@andy-ui/tokens/andy-ui.css";
```

See [`.claude/skills/andy-ui/SKILL.md`](.claude/skills/andy-ui/SKILL.md) for full
React/Angular usage and the component reference.

## Architecture

The components render in the **light DOM** and rely entirely on the global
`@andy-ui/tokens` stylesheet (global classes + CSS custom properties driven by
`<html data-theme>`). This keeps one source of truth for styling and lets the
same components theme and cascade naturally in any framework — React and Angular
packages are thin bindings, not re-implementations.

## Examples

Two full apps build the same showcase-style workspace (sidebar + glass header +
four screens) using **only** Andy-UI components:

| App | Live demo | Run locally |
|---|---|---|
| [`examples/react-app`](examples/react-app) | [Open ↗](https://rivoli-ai.github.io/andy-ui/react/) | `pnpm --filter @andy-ui/example-react dev` |
| [`examples/angular-app`](examples/angular-app) | [Open ↗](https://rivoli-ai.github.io/andy-ui/angular/) | `pnpm --filter @andy-ui/example-angular start` |

## Development

```bash
pnpm install
pnpm build          # build every package + examples (Turborepo)
pnpm storybook      # interactive component docs at :6006
pnpm build-storybook
```

Monorepo: pnpm workspaces + Turborepo. Versioning via Changesets
(`pnpm changeset`).
