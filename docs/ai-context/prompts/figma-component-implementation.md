# Prompt: Figma component implementation

**Phase:** Build · **Output:** Working Stencil component + verification  
**Standards:** [figma-integration.md](../../standards/figma-integration.md) · [component-verification.md](../../standards/component-verification.md)

**Prerequisite:** Completed [figma-analysis.md](./figma-analysis.md) output (attach or summarize in chat).

---

## When to use

- Analysis approved
- Implementing or refactoring a shared web component
- Aligning `andy-ui-*` / `omnifex-*` tags with Figma

---

## Copy into Cursor Auto

```text
You are a senior Nx monorepo + design-system engineer. Implement a Figma-aligned UI component in this repository.

## Mandatory reading (read first)
- docs/standards/figma-integration.md
- docs/standards/component-verification.md
- docs/ai-context/overview.md
- .cursor/rules.md

## Inputs (fill in)
- Figma URL: [PASTE URL]
- Component name: [e.g. button]
- Stencil tag: [e.g. andy-ui-button]
- Prior analysis: [paste summary OR "see previous message"]

## Non-negotiable constraints
- NO hardcoded hex, rgb/hsl, or px in libs/ui-components/**/*.css — use var(--*) tokens only.
- NO pasting Figma MCP CSS/Tailwind into the repo.
- Mobile-first CSS: no @media (max-width) only; use min-width or layout tokens.
- Semantic HTML; native <button> for buttons; :focus-visible mirrors :hover.
- Framework-agnostic: Stencil in libs/ui-components; theme via libs/styles (imported in global/theme.css).
- Min touch target 44×44 CSS px via --space-touch-min / padding tokens.
- Ubuntu via var(--font-family-sans); typography from typography.css scale.
- If docs conflict with code, STOP and report—smallest safe resolution only.

---

## PHASE 1 — Analysis confirmation (brief)
Re-run Figma MCP only if analysis is missing:
- get_metadata → get_variable_defs → get_design_context on key symbols.
Confirm token mapping table in ≤15 lines. If new analysis differs from prior, explain delta.

Do NOT start Phase 2 until token paths are explicit.

---

## PHASE 2 — Implementation (minimal diff)
Implement ONLY the target component and required tokens.

### Allowed paths
- libs/ui-components/src/lib/[component]/ (tsx, css, readme.md, spec, stories if in scope)
- libs/styles/src/lib/*.css (primitives/semantic tokens ONLY—no hex in ui-components)
- tools/scripts/ui-component-verify/constants.mjs (add to PUBLISHABLE_COMPONENTS when DoD-ready)
- apps/* only if wiring demo usage (minimal)

### Component requirements
- @Prop({ reflect: true }) for variant, appearance, size, disabled, fullWidth as needed
- Shadow DOM + part="…" for styleable surfaces
- Slots documented in readme.md
- Events: composed + bubbling where appropriate

### CSS requirements
- var(--button-*), var(--theme-*), var(--space-*), var(--font-*), var(--radius-*), var(--stroke-*)
- Hover + :focus-visible share affordances (stylelint no-hover-only-affordance)

### Do NOT
- Refactor unrelated components
- Add dependencies without justification
- Change angular/react apps beyond demo usage unless required

---

## PHASE 3 — Verification (run commands, report results)
Execute and paste exit status summary:

corepack pnpm nx run @omnifex/ui-components:stylelint
corepack pnpm nx run @omnifex/ui-components:test
corepack pnpm nx run @omnifex/ui-components:build
node tools/scripts/verify-ui-component.mjs --component=[component] --with-nx --fail-on-error

If publishable and UI is on app routes:
- Note: corepack pnpm nx run @omnifex/ui-components:verify:full for e2e (optional, slow)

Fix failures before Phase 4.

---

## PHASE 4 — Documentation
Update ONLY if changed:
- libs/ui-components/src/lib/[component]/readme.md (props, events, slots, tokens)
- libs/styles/README.md or token file comments if new tokens (with Figma node id)
- docs/standards/* ONLY if governance changed (rare)

Do not duplicate governance in component readme.

---

## Deliverables checklist
- [ ] Component implemented with tokens
- [ ] Unit spec passes
- [ ] stylelint clean
- [ ] build succeeds
- [ ] verify script passes for component
- [ ] readme updated

## Stop conditions
- verify or stylelint fails → fix and re-run
- Need new token category → add in libs/styles, document Figma node id
- Architectural conflict → stop and ask

END: Summarize files changed and verification exit codes.
```

---

## Follow-up prompts

After implementation, run separately:

- [figma-storybook.md](./figma-storybook.md)
- [figma-tests.md](./figma-tests.md)
- [figma-component-audit.md](./figma-component-audit.md)
