# AI Skills — Andy UI

**Purpose:** Reusable skill files that teach AI agents (Cursor Auto) how to execute repository workflows deterministically, respecting architecture, design-system, and governance constraints.

---

## Skill catalog

| File | Use when |
|------|----------|
| [`ui-component-skill.md`](./ui-component-skill.md) | Implementing, auditing, testing, or documenting any `@omnifex/ui-components` Stencil component — with or without Figma MCP |

---

## What is a skill?

A skill is a **structured context document** that an AI agent reads at the start of a session to understand:

- what repositories rules apply
- what architecture constraints to respect
- what the correct workflow is (analysis → implement → verify → document)
- what anti-patterns to avoid
- what commands to run and in what order
- what Definition of Done means for this repo

Skills **do not duplicate governance** — they reference canonical docs (`figma-integration.md`, `component-verification.md`, etc.) and synthesise them into a single, scannable operational guide.

---

## How to use a skill in Cursor Auto

### Option 1 — Reference the file

In a Cursor chat, attach the skill file and give your task:

```text
Read docs/ai-context/skills/ui-component-skill.md then complete this task:

Implement the andy-ui-badge component from Figma node 14:x.
```

### Option 2 — Use an example prompt

The `examples/` folder contains ready-to-paste prompts for the most common workflows:

| Example | Task |
|---------|------|
| [`implement-component.md`](./examples/implement-component.md) | New Stencil component end-to-end from Figma |
| [`audit-component.md`](./examples/audit-component.md) | Audit responsiveness, tokens, a11y of an existing component |
| [`generate-storybook.md`](./examples/generate-storybook.md) | Add or update Storybook stories |
| [`generate-tests.md`](./examples/generate-tests.md) | Add unit specs and Playwright e2e coverage |
| [`verify-tokens.md`](./examples/verify-tokens.md) | Audit token usage without touching other code |

### Option 3 — One-liner with skill + prompt file

For the Figma MCP workflow, chain the skill with the dedicated prompt:

```text
Read docs/ai-context/skills/ui-component-skill.md
Follow docs/ai-context/prompts/figma-analysis.md

Figma URL: https://www.figma.com/design/TcEuJHlNPkME9br19X1Qhx/Andy-UI---Design-System?node-id=14-4&m=dev
Component: button
```

---

## Recommended Cursor Auto workflow

```
Read skill → Analysis (no code) → Review → Implementation → Verify → Docs
```

1. **Attach** `ui-component-skill.md` at session start.
2. **Analysis phase** — let the AI run Figma MCP and produce a token mapping table. Review it before any code is written.
3. **Implementation phase** — minimal diff; tokens only in CSS; no Figma MCP CSS paste.
4. **Verification phase** — AI runs `stylelint → test → build → verify`; paste exit codes in chat.
5. **Documentation phase** — AI updates component `readme.md` and any changed governance docs.

---

## Best practices

- **One component per session** — reduces token drift and cross-file mistakes.
- **Do not skip analysis** for new publishable components.
- **Stop on conflicts** — if docs contradict code, the AI must report and pause.
- **Run verification yourself** after the AI session to confirm exit codes.
- **Promote publishable tier** by adding the component id to `PUBLISHABLE_COMPONENTS` in `tools/scripts/ui-component-verify/constants.mjs`.

---

## When to add a new skill

Create a new skill file when a distinct task category has its own set of docs, constraints, and workflow steps — for example:
- Authentication / OIDC integration (`identity-skill.md`)
- CI/CD pipeline changes (`cicd-skill.md`)
- Figma token scale management (`design-tokens-skill.md`)

Follow the `ui-component-skill.md` structure: overview → responsibilities → context → constraints → workflow → anti-patterns → DoD → examples.

---

## Related docs

- [Figma MCP Integration Standard](../../standards/figma-integration.md)
- [Component Verification](../../standards/component-verification.md)
- [UI QA Workflow](../../standards/ui-components-qa.md)
- [Architecture](../../architecture/architecture.md)
- [Prompt Templates](../prompts/README.md)
- [Cursor Rules](../../../.cursor/rules.md)
