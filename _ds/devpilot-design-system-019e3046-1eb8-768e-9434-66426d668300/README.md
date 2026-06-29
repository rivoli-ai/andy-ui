# DevPilot Design System

A professional **slate‑and‑indigo SaaS** design system. DevPilot pairs Tailwind‑slate neutrals with a signature 135° **indigo → violet → purple** gradient reserved for moments that matter: the logo mark, primary actions, active navigation, and avatars. The system ships Light + Dark themes as first‑class, both wired through CSS variables on `[data-theme]`.

This project is a packaged, reviewable version of that system — tokens copied verbatim from the source app, plus a `colors_and_type.css` runtime file, preview cards, a UI kit recreating the workspace shell, and a `SKILL.md` so it can be loaded as an Agent Skill in Claude Code.

---

## Index

```
.
├── README.md                  ← you are here
├── SKILL.md                   ← Agent-Skill manifest (cross-compatible with Claude Code)
├── colors_and_type.css        ← runtime tokens (CSS vars) + semantic type roles
├── tokens/                    ← W3C DTCG JSON tokens (verbatim from source)
│   ├── core.json              ·  primitives (brand, slate, semantic, type, spacing, radius, motion)
│   ├── semantic.light.json    ·  light theme: surface / text / border / shadow
│   ├── semantic.dark.json     ·  dark  theme: same shape, dark values
│   ├── component.json         ·  button, card, input, badge, modal, toast, data-grid, sidebar, header, breadcrumb, code
│   ├── $metadata.json         ·  set load order
│   └── $themes.json           ·  Light + Dark theme definitions
├── assets/                    ← copied + generated brand artwork
│   ├── brand-mark.svg         ·  40px square, canonical two-stacked-layers glyph
│   ├── wordmark.svg           ·  mark + "DevPilot" + "WORKSPACE" tagline
│   └── favicon.svg            ·  verbatim from src/favicon.svg
├── reference/                 ← source docs copied verbatim
│   ├── SOURCE_README.md
│   ├── COMPONENTS.md          ·  component catalog: variants, sizes, states, props
│   └── FIGMA_IMPORT.md        ·  Tokens Studio + Figma Variables import flow
├── preview/                   ← Design System tab cards (one HTML per concept)
├── ui_kits/
│   └── devpilot-workspace/    ← interactive recreation of the workspace shell
│       ├── README.md
│       ├── index.html         ·  fully composed app view (sidebar + header + page)
│       └── *.jsx              ·  modular components
└── slides/                    ← (none — no slide template was provided)
```

### Sources

This system was packaged from two inputs supplied by the user:

- **`design-system/`** — the W3C DTCG token bundle plus `README.md`, `COMPONENTS.md`, and `FIGMA_IMPORT.md`. Copied verbatim into `tokens/` and `reference/` here.
- **`src/`** — the real Angular codebase (`src/app/layout/`, `src/app/shared/components/`, `src/app/features/`, `src/styles.css`). The UI kit in `ui_kits/devpilot-workspace/` was rebuilt against this source: class names, SVG glyphs, dimensions, hover behaviours, and screen structure were lifted directly from the components rather than inferred from docs.

---

## Design language at a glance

| Aspect              | Choice |
|---------------------|--------|
| Brand hue           | Indigo `#6366f1` → Violet `#8b5cf6` → Purple `#a855f7` |
| Neutrals            | Tailwind `slate` scale (50–950) |
| Semantic colors     | Emerald (success), Amber (warning), Red (error), Blue (info) — each `50`/`500`/`600` triplet |
| Themes              | Light + Dark, both first-class. Toggled via `data-theme="light\|dark"` on `<html>` |
| Type — UI           | System sans stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, …`) |
| Type — mono / code  | `JetBrains Mono, Fira Code, Consolas` |
| Type scale          | 12 / 13 / 15 / 17 / 20 / 24 / 32 / 40 px |
| Spacing             | 4-pt base; named `1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20` |
| Radius              | `sm 6, md 8, lg 12, xl 16, 2xl 20, full 9999` — buttons/inputs use `lg`, cards use `xl` |
| Shadows             | Six elevations + `glow` (brand-tinted) + `card` (composite resting shadow) |
| Motion              | `150 / 200 / 300 / 400ms`; default `cubic-bezier(0.33, 1, 0.68, 1)` |
| Focus               | 2px brand-primary outline, 2px offset |
| Layout              | Fixed sidebar (`280px` / `56px` collapsed), fixed header (`64px`), content max `1400px` |

---

## CONTENT FUNDAMENTALS

DevPilot copy reads like a calm, capable engineering tool — never marketing, never cute.

**Tone.** Direct, factual, and trust-building. Sentences are short. Verbs do the work; adjectives are rare. Where there's complexity (data grids, workspaces, theming), copy explains exactly what happens rather than waving at outcomes. The reference docs themselves model this: phrases like "the running Angular app — these files mirror what is actually shipped" or "the developer intentionally; preserve it in Figma button variants" — qualified, specific, source-of-truth language.

**Casing.** Sentence case for UI labels, headings, buttons, menu items. The wordmark **DevPilot** is the only intra-word capital. Title Case only on proper nouns (product names like *Sandbox menu*, *Tokens Studio*, *Figma*).

**Person.** Documentation and developer-facing copy is **2nd person ("you")**; system messages and confirmations are **impersonal ("This will…", "Cannot be undone")**. First-person plural ("we") is avoided — the product never sounds like a marketing site talking about itself.

**Emoji.** Not used. Status is communicated through color, badges, and icons, never through emoji glyphs. The one exception that could be argued is in markdown documentation comments (the source README uses none), but **product surfaces are emoji-free**.

**Unicode.** A handful of typographic glyphs are used as connective tissue, never as decoration: `/` for breadcrumbs, `·` for inline meta separators, `*` (rendered red) for required-field markers, `…` for truncation. Box-drawing chars are used in code-snippet trees.

**Microcopy patterns.**

- **Buttons:** verb + noun, sentence case — *Save changes*, *Generate backlog*, *Add item*, *Discard*. Never "Submit" or "OK" alone.
- **Empty states:** state-of-the-world followed by next action — *No items in this backlog. Add your first item to get started.*
- **Confirmations / dangerous actions:** explicit consequence, no euphemism — *Delete this repository? This cannot be undone.*
- **Errors:** specific, near the field, never modal — *Email is required*, *Must be a valid URL*. Required marker is a red `*` appended after the label.
- **Toasts:** one short sentence, no full stop on success/info — *Settings saved*, *Backlog imported*, *Connection failed — check your token and retry.*
- **Breadcrumbs:** read as a filesystem path in mono font — `repos / devpilot-api / src / index.ts`. Never tabs, never pills.

**The "Sandbox" exception.** The Sandbox menu in the header uses square corners and slightly more utilitarian language ("Open sandbox", "Reset state") — a deliberate signal that this is dev tooling, not user surface. Match the register when writing copy that lands inside Sandbox.

---

## VISUAL FOUNDATIONS

**Color.** Slate + indigo do the heavy lifting; semantic colors (emerald, amber, red, blue) appear only where they encode state — never decoratively. Backgrounds resolve through a 3-tier surface stack (`ground → card → elevated`) plus a `hover` tint, all driven by `[data-theme]`. Brand color is reserved: the 3-stop gradient appears on the logo mark, sidebar avatar, primary buttons, and active states; the 2-stop `gradientDuo` is used **only** on modal primary buttons and the data-grid page-button-active. Don't blur the line between them.

**Type.** System sans for UI (so the app inherits OS rendering — no webfont network cost), `JetBrains Mono` for code, breadcrumbs, and key/value pairs. The scale is 8 steps from 12px to 40px; weights cluster at 400 / 500 / 600 / 700 with a single 650 anomaly used for modal titles. Letter-spacing is tightened (`-0.025em`) on display sizes and (`-0.02em`) on the mono breadcrumb. Eyebrow labels use 10px / 0.12em tracking, semibold, uppercase.

**Spacing.** Strict 4-pt base: `4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80`. Stick to named values; don't introduce off-scale spacing. Cards use `padding sm 16 / md 24 / lg 32`. Buttons step `sm 36 / md 44 / lg 52` minimum-height with internal padding scaling in lockstep.

**Backgrounds.** No imagery, no full-bleed photography, no repeating patterns, no hand-drawn illustrations. Surfaces are flat tints with subtle composite shadows. The only "gradients" are: (1) the brand gradient in its two variants; (2) brand-tinted washes on the data-grid toolbar and group-header rows (`6% / 3%` alpha); (3) the sidebar active-item background (`10% / 10%` indigo→violet at light, `20% / 20%` at dark); (4) the breadcrumb trunk (a 2px vertical indigo→slate fade). Cards have a subtle inner-top `::before` white gloss to add depth.

**Animation.** Functional, never decorative. Duration scale is `150 / 200 / 300 / 400ms`; default ease is `cubic-bezier(0.33, 1, 0.68, 1)` (a soft ease-out). The spring (`0.34, 1.56, 0.64, 1`) is reserved for the modal panel pop-in. Buttons hover-lift `translateY(-1px)` and active-compress `scale(0.98)`. Cards lift `-2px` on hover and gain the `glow` shadow. The sidebar collapses with a `0.2s ease` width transition. No bounces, no parallax, no scroll-driven anims.

**Hover states.** Derived, not separate tokens. The system uses `color-mix(in srgb, …)` extensively to mix a base color with a small tint of brand or surface-hover. Examples in source: sidebar nav-icon hover, logout-button hover, mermaid expand-button border. In Figma/static mocks, layer a tinted overlay rather than picking a new value. Ghost buttons go `transparent → surface-hover`; secondary buttons swap border to `border.hover`.

**Press / active states.** Buttons `scale(0.98)`, no color change. Active nav items in the sidebar combine three signals: a 3px left gradient accent bar (with brand glow), a `1px brand@22%` inset ring, and a soft `brand@14% → brand@8%` linear background.

**Borders.** A 3-tier system: `light` (default card stroke), `default` (button outline, input rest), `hover` (input/button outline on hover). In dark theme these are RGBA-on-white at `6% / 10% / 15%`; in light they're slate `200 / 300 / 400`. The header and sidebar use lighter rules — `rgba(0,0,0,0.06)` and slate-200 respectively in light.

**Shadows / elevation.** Six base elevations (`xs` through `2xl`), plus two specials: `glow` (a brand-tinted ambient halo used on card hover and active page buttons) and `card` (a composite resting shadow combining a tight `0 1px 3px / 5%` and a soft `0 10px 40px -10px / 8%`). Dark theme deepens every shadow's alpha (e.g. `0.05 → 0.20`). Modals layer a `0 24px 48px / 45%` ambient plus a 1px hairline `rgba(255,255,255,0.04)` ring.

**Protection / contrast.** When brand surfaces sit over content (e.g. modal panel over backdrop), the system uses a **dimmer + blur** combo: `rgba(0,0,0,0.55)` + `4px` backdrop blur. The header uses **glassy translucency**: light `rgba(255,255,255,0.85)` / dark `rgba(18,18,26,0.95)` with 12px backdrop blur. Sidebar mobile drawer also uses a backdrop dimmer at `z-index: 10000`.

**Capsules vs. gradients.** Badges are pure capsules (`radius-full`), tinted (12% bg, 20% border) — they never use gradients. Primary buttons are pure gradient (no border). Modal primary uses the **2-stop** duo gradient, not the 3-stop — preserve this distinction.

**Layout rules.** Fixed sidebar (left) + fixed header (top); the header is anchored to `--sidebar-width` on the left so it visually tracks the sidebar's collapse. Content has a `1400px` max-width and is left-aligned within. Workspace routes (`/code`, `/backlog`) lock document scroll via a body class so inner regions handle their own overflow. Mobile (`<768px`) collapses the sidebar into an off-canvas drawer.

**Transparency / blur.** Used in three places only: (1) header glass, (2) modal backdrop, (3) brand-tinted hover/active fills in nav and data-grid. Don't introduce arbitrary blurs or translucent panels elsewhere — they erode the system's crisp feel.

**Imagery / photography.** None in this system. The brand is type + gradient + token surfaces. If imagery were to enter, expect: cool-tinted, slightly desaturated, no warm orange/yellow palettes. (At present, the spec is silent on this — *flag a question to the user before adding any.*)

**Corner radii.** Use the scale. Most surfaces land at `lg 12` (buttons, inputs, sidebar items) or `xl 16` (cards). The **Sandbox** trigger in the header is intentionally `0` (zero) radius — the one place the system breaks rounded language to signal a dev/utility surface. Toasts and modals are `lg`. Avatars and brand marks use `12px` (not full circles).

**Cards.** `surface.card` background + `border.light` 1px hairline + `shadow.card` composite + `radius.xl 16` + an optional inner `::before` top-down white gloss for depth. Hoverable cards: border bumps to `border.default`, shadow stacks `lg + glow`, and the card lifts `translateY(-2px)`.

---

## ICONOGRAPHY

**Approach.** Functional line icons at a small set of fixed sizes — `16px` for inline meta, `20px` inside menu items, `24px` for page-title icons and primary affordances, `32px` icon-wrapper in the active sidebar slot. Stroke icons render in `currentColor` so they inherit text color (which means brand tinting happens *via the active state*, not via icon-fill swaps).

**Source / library.** The app uses **inline SVGs**, not an icon font or sprite. Every icon in the codebase is declared inline next to the markup it decorates — see `src/app/layout/sidebar/sidebar.component.html` (repository / cog), `src/app/layout/header/header.component.html` (hamburger, sandbox, sun/moon, chevron, close), and `src/app/features/repositories/repositories.component.html` (provider logos, branch, share, trash, lock/unlock). The UI kit copies these SVGs verbatim.

For preview cards and supporting illustrations where the source doesn't already provide a glyph, the kit pulls from **[Lucide](https://lucide.dev)** via CDN — its 1.5–2px stroke, rounded line-cap geometry matches the source's inline icons so the visual register is consistent.

```html
<!-- Loaded once, then referenced anywhere as <i data-lucide="..."></i> -->
<script src="https://unpkg.com/lucide@latest"></script>
<script>lucide.createIcons();</script>
```

**Usage rules.**

- One icon per actionable element (button, menu item, nav item) — never two side-by-side.
- Decorative-only icons are avoided. Every glyph encodes meaning (a `Save` icon next to a `Save` button is redundant — drop the icon).
- Page titles get one 24px icon in `brand-primary`, left-anchored, with a 1px `border.default` divider after the title.
- Sidebar nav items wrap their icon in a 32px rounded square (`radius.md` = 8px). On the active item, the wrapper tints to `brand-primary` and the icon goes white.
- The icon-button pattern (header theme toggle, sidebar collapse, modal close) is a 40px or 42px square with `radius.lg`, a 1px subtle border, and a transparent fill that becomes `surface.hover` on hover. Use this pattern for *all* standalone icon buttons — do not invent new sizes.

**Emoji / unicode.** No emoji. Connective unicode is allowed (`/`, `·`, `*`, `…`) per Content Fundamentals. The required-field `*` is the only colored glyph (red).

**Logos.**

- `assets/brand-mark.svg` — 40px square, 12px radius, 3-stop gradient fill, with the canonical two-stacked-layers glyph (lifted from `src/app/layout/sidebar/sidebar.component.html`).
- `assets/wordmark.svg` — mark + "DevPilot" + "WORKSPACE" tagline. The mark + tagline pairing comes from the live sidebar; the wordmark layout is new (the source doesn't ship a standalone wordmark SVG).
- `assets/favicon.svg` — verbatim from `src/favicon.svg`.

> **Flag:** Confirm the wordmark composition is the one you'd like to use externally — the source app never renders the brand outside the sidebar.

---

## Caveats & flags for the user

1. **Logo glyph.** `assets/brand-mark.svg` and `assets/wordmark.svg` use the canonical two-stacked-layers glyph from `src/app/layout/sidebar/sidebar.component.html` and `src/favicon.svg`. The wordmark composition (mark + "DevPilot" + "WORKSPACE" tagline) is new — there's no standalone wordmark SVG in the source. **Confirm the layout is correct, or supply a marketing-approved wordmark.**
2. **Icons.** The kit uses the **inline SVGs from the source components** (sidebar nav, header chrome, repository cards, modals). Where a preview card needed something the source doesn't provide (e.g. a stopwatch for the "Continue" eyebrow, generic toolbar icons), **Lucide** is used as a CDN fallback. Flag: if you want every icon to come from one library, point me at the production icon source.
3. **Fonts.** All UI uses the system sans stack from `--font-sans` — no webfont download. `JetBrains Mono` cascades to Fira Code → Consolas → monospace; load JetBrains Mono from Google Fonts in production for consistency across machines.
4. **No slide template provided** — `slides/` is intentionally absent. Ask if you'd like one.
5. **Settings tabs other than "Source control" are stubs.** The real app has full panels for AI providers, MCP servers, Artifact feeds, Agent rules, and Users — only the Source control tab is fully rendered in the UI kit, with the others showing a placeholder. Building all six would be straightforward — just ask.
6. **Sandbox menu / VNC viewer / mermaid modal not implemented.** The header's sandbox widget is included structurally (and appears once a sandbox is created via the Backlog/Code drill-down), but the inner dropdown menu, VNC viewer, and mermaid expand modal in the source aren't replicated. They're noted in `reference/COMPONENTS.md`.

---

## Quickstart

```html
<!doctype html>
<html data-theme="light"> <!-- or "dark" -->
<head>
  <link rel="stylesheet" href="colors_and_type.css">
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
  <h1 class="t-h1">Welcome to DevPilot</h1>
  <p class="t-body">Direct, capable, slate-and-indigo.</p>
  <script>lucide.createIcons();</script>
</body>
</html>
```

Toggle themes by setting `document.documentElement.dataset.theme = 'dark'`. Every token resolves through CSS variables, so the swap is instant — no reflow, no asset reload.
