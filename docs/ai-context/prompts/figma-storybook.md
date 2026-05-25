# Prompt: Figma-aligned Storybook stories

**Phase:** Documentation · **Output:** `*.stories.ts` for Stencil web components  
**Standards:** [figma-integration.md](../../standards/figma-integration.md) · [component-verification.md](../../standards/component-verification.md)

**Prerequisite:** Component exists under `libs/ui-components/src/lib/<name>/` and `build` succeeds.

---

## When to use

- New publishable component needs Storybook
- New Figma variants/sizes need story coverage
- Adding light/dark or responsive matrix stories

---

## Copy into Cursor Auto

```text
You are a Storybook + design-system engineer. Create or update Storybook stories for a Stencil web component aligned with Figma.

## Mandatory reading
- docs/standards/figma-integration.md
- docs/standards/component-verification.md
- libs/ui-components/.storybook/main.ts and preview.ts
- Existing example: libs/ui-components/src/lib/button/button.stories.ts

## Inputs
- Figma URL: [PASTE URL]
- Component: [name]
- Custom element tag: [e.g. andy-ui-button]

## Constraints
- Stories file: libs/ui-components/src/lib/[component]/[component].stories.ts
- Use @storybook/web-components; render HTML strings with custom element tag.
- NO hex or raw px in story CSS—components already use tokens.
- Import enums from ../shared/ for controls (variant, appearance, size).
- Match Figma variant matrix: appearances × variants × sizes × disabled where applicable.

## Figma MCP (optional refresh)
get_design_context on 2–3 representative symbols for labels/states only.

## Required stories (minimum)
1. **Default** — primary Figma default state
2. **Variant coverage** — one story per major appearance OR one Matrix story
3. **Disabled** — disabled state
4. **Responsive** — story with parameters.layout: 'padded' or 'fullscreen', or FullWidth using full-width attribute
5. **Dark theme** — document that preview.ts theme toolbar applies; add story note in parameters if needed

## Storybook / a11y
- tags: ['autodocs'] on meta
- Rely on @storybook/addon-a11y in main.ts (do not remove)
- Ensure decorative icons use slot="icon" and are aria-hidden in markup

## Build & run (execute after writing)
corepack pnpm nx run @omnifex/ui-components:build
corepack pnpm nx run @omnifex/ui-components:storybook

Confirm stories load without console errors.

## Verification
node tools/scripts/verify-ui-component.mjs --component=[component] --static

## Do NOT
- Add Tailwind to the library for stories
- Duplicate governance docs
- Change unrelated components' stories

## Output
- List stories exported
- ArgTypes mapped to component props
- Commands run + results

Stop if build-storybook fails until fixed.
```

---

## Reference

Storybook depends on build (`project.json` `dependsOn: build`). Port **6006**.
