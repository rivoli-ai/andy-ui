# Prompt: Figma component analysis (no code)

**Phase:** Discovery · **Output:** Structured analysis only  
**Standards:** [figma-integration.md](../../standards/figma-integration.md) · [component-verification.md](../../standards/component-verification.md)

---

## When to use

- New shared component from Figma
- Major variant/size/theme expansion
- Before any implementation PR
- When MCP returned empty variables (wrong node — re-analyze parent frame)

---

## Copy into Cursor Auto

```text
You are a senior design-system architect. ANALYSIS ONLY — do not write or modify code.

## Mandatory reading (read first)
- docs/standards/figma-integration.md
- docs/standards/component-verification.md
- docs/ai-context/overview.md
- .cursor/rules.md

## Inputs (fill in)
- Figma URL: [PASTE URL with node-id]
- Component name: [e.g. button]
- fileKey: TcEuJHlNPkME9br19X1Qhx (unless branch URL says otherwise)

## Figma MCP workflow (execute in order)
1. get_metadata on nodeId from URL (convert 14-4 → 14:4). If node is a gradient/swatch child with no variables, get_metadata on parent and identify the real component-set frame.
2. get_variable_defs on the correct scale/component frame.
3. get_design_context on representative symbols only (e.g. default + disabled + one size)—not the entire doc matrix if >50 variants (split calls).

clientLanguages: typescript,css
clientFrameworks: angular,react

## Rules
- Treat Figma as design intent, NOT implementation. Do NOT paste or recommend Figma-generated CSS/Tailwind.
- Map all px to rem (16px root) and existing libs/styles tokens; list gaps needing new primitives in libs/styles only.
- Mobile-first: base layout for 360px width; enhancements via min-width only.
- Shared UI → libs/ui-components (Stencil). App-only chrome → apps/angular-app or apps/react-app.
- If documentation contradicts the repo, STOP and report the inconsistency—do not guess.

## Required output sections

### 1. Component breakdown
- Atomic structure (slots, states, variants, sizes)
- Figma property names vs proposed API (props/events/slots)
- Light/dark behavior

### 2. Token mapping table
| Figma value / variable | px | CSS token (existing or NEW in libs/styles) |
|------------------------|-----|---------------------------------------------|
| … | … | var(--…) |

Cover: color, spacing, typography, radius, stroke. No hex in component CSS.

### 3. Responsive behavior
- Default: inline vs block, full-width patterns
- Breakpoints (360 / 640 / 768 / 1024) and what changes
- Touch targets: confirm min 44×44 CSS px strategy

### 4. Accessibility
- Semantic element(s), keyboard, focus, ARIA
- Contrast notes (light + dark)
- Icon/label requirements

### 5. Implementation placement
| Artifact | Path |
|----------|------|
| Stencil component | libs/ui-components/src/lib/[name]/ |
| New tokens (if any) | libs/styles/src/lib/*.css |
| App usage | … |

### 6. Verification plan
List commands to run after implementation:
- corepack pnpm nx run @omnifex/ui-components:verify --configuration=[name] (when publishable)
- stylelint, test, build, storybook, e2e tags

### 7. Risks & open questions
- Missing tokens, ambiguous Figma states, e2e route coverage

## Stop conditions
- Missing node-id → ask for URL fix
- MCP auth failure → report mcp_auth needed
- Cannot map >3 values without new tokens → list proposed token names only

END: Do not implement. End with "Ready for figma-component-implementation.md when approved."
```

---

## Expected outcome

A reviewable document the team can approve before Auto implements code. Store or paste output in the PR description or ticket.
