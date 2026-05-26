# Example: Implement a new Stencil component from Figma

**Skill:** [`../ui-component-skill.md`](../ui-component-skill.md)  
**Prompt files used:** `figma-analysis.md` → `figma-component-implementation.md`  
**Output:** Working Stencil component + tokens + unit spec + Storybook + component readme

---

## Copy into Cursor Auto (Session 1 — Analysis)

```text
Read docs/ai-context/skills/ui-component-skill.md
Follow docs/ai-context/prompts/figma-analysis.md

Figma URL: [PASTE URL with node-id]
Component: [e.g. badge]
```

Review the analysis output (token mapping table, responsive intent, placement decision).
Do not proceed to Session 2 until token paths are confirmed.

---

## Copy into Cursor Auto (Session 2 — Implementation)

```text
Read docs/ai-context/skills/ui-component-skill.md
Follow docs/ai-context/prompts/figma-component-implementation.md

Figma URL: [PASTE URL]
Component name: [e.g. badge]
Stencil tag: [e.g. andy-ui-badge]
Prior analysis: [paste token mapping table from Session 1]
```

---

## What the AI must do

### Phase 1 — Confirm analysis
- Re-run Figma MCP only if analysis is absent from context
- Confirm token mapping in ≤15 lines
- Stop if new analysis produces different tokens than Session 1

### Phase 2 — Implement (minimal diff)
| File | What to create |
|------|----------------|
| `libs/ui-components/src/lib/<name>/<name>.tsx` | Stencil component |
| `libs/ui-components/src/lib/<name>/<name>.css` | Token-only CSS |
| `libs/ui-components/src/lib/<name>/<name>.spec.tsx` | Unit spec |
| `libs/ui-components/src/lib/<name>/<name>.stories.ts` | Storybook stories |
| `libs/ui-components/src/lib/<name>/readme.md` | Props, events, slots, tokens |
| `libs/styles/src/lib/<name>.css` | Semantic tokens (if new) |
| `libs/styles/src/lib/theme.css` | `@import` for new token file |

### Phase 3 — Verify (paste exit codes)
```bash
corepack pnpm nx run @omnifex/ui-components:stylelint
corepack pnpm nx run @omnifex/ui-components:test
corepack pnpm nx run @omnifex/ui-components:build
corepack pnpm nx run @omnifex/ui-components:verify
```

### Phase 4 — Document
- Component readme: props table, events, slots, token list with Figma node IDs
- `figma-integration.md` node ID table if a new scale frame was used
- `tools/scripts/ui-component-verify/constants.mjs` if promoting to publishable tier

---

## Stop conditions

- stylelint or verify fails → fix before documentation
- New token category needed → add to `libs/styles`, document node ID, then continue
- Architectural conflict found → stop and report only; do not guess

---

## Filled-in example (badge)

```text
Read docs/ai-context/skills/ui-component-skill.md
Follow docs/ai-context/prompts/figma-component-implementation.md

Figma URL: https://www.figma.com/design/TcEuJHlNPkME9br19X1Qhx/Andy-UI---Design-System?node-id=14-200&m=dev
Component name: badge
Stencil tag: andy-ui-badge
Prior analysis: see previous message
```
