# Documentation & Context Rules

## Mandatory Documentation Review

Before making any architectural, UI, testing, CI/CD, or implementation changes, ALWAYS read the relevant Markdown documentation files.

Priority order:

1. /docs/ai-context/**
   - Global AI operating context
   - Repository constraints
   - Architecture rules
   - **Figma MCP prompts** → `/docs/ai-context/prompts/` (analysis → implement → storybook → tests → audit)
   - **AI skills** → `/docs/ai-context/skills/` (operational skill for UI component development)

2. /docs/architecture/**
   - Monorepo architecture
   - Package boundaries
   - Build/publish strategy
   - Dependency rules

3. /docs/standards/**
   - **Figma MCP integration** → `/docs/standards/figma-integration.md` (required for any Figma-driven or design-token UI work)
   - UI standards → `styles-and-design-system.md`
   - Accessibility requirements
   - Responsive/mobile-first rules
   - Coding conventions
   - Testing standards → `ui-components-qa.md`
   - Component verification → `component-verification.md`

4. /docs/roadmap/**
   - Planned features
   - User stories
   - Technical initiatives
   - Migration plans

5. /README.md
   - Repository overview
   - Setup instructions
   - Developer onboarding

---

# Documentation as Source of Truth

Documentation MUST be treated as the primary source of truth.

Rules:
- Do not contradict documented architecture
- Do not introduce undocumented patterns
- Do not ignore documented constraints
- Prefer consistency with existing documentation over assumptions

If documentation conflicts with implementation:
1. Stop
2. Report the inconsistency
3. Propose the smallest safe resolution
4. Update documentation if implementation becomes the new standard

---

# Documentation Synchronization Rules

Documentation MUST be updated whenever changes affect:

- architecture
- developer workflows
- public APIs
- package structure
- UI component behavior
- responsive behavior
- accessibility requirements
- testing strategy
- CI/CD flows
- generators/schematics
- environment setup
- publish/build behavior

Examples:
- New component → update component docs
- New Nx generator → update developer docs
- New token rules → update design-system docs
- Figma scale / MCP workflow change → update `docs/standards/figma-integration.md`
- New CI validation → update contribution/CI docs

---

# AI Documentation Responsibilities

When implementing changes, ALWAYS evaluate whether documentation updates are required.

If required:
- Update existing Markdown files when possible
- Avoid creating duplicate documentation
- Keep documentation concise and synchronized with implementation

Preferred behavior:
- modify existing docs first
- create new docs only when necessary

---

# Documentation Quality Rules

Documentation must:
- be implementation-oriented
- avoid vague descriptions
- contain examples when useful
- stay synchronized with code
- remain easy for AI tools to consume

Prefer:
- bullet points
- clear headings
- deterministic instructions

Avoid:
- large unstructured paragraphs
- outdated examples
- duplicated information

---

# Figma & Design-System Work

When the user references Figma URLs, design tokens, Andy UI Design System, or asks to match designs:

1. **Read** `/docs/standards/figma-integration.md` first (mandatory). Use `/docs/ai-context/prompts/` templates for structured Auto workflows.
2. **Use Figma MCP** analysis-first: `get_metadata` → `get_variable_defs` / `get_design_context` on the correct parent frame.
3. **Map** all values to `libs/styles` tokens (`theme.css`, `typography.css`, `spacing.css`, `radius.css`, `stroke.css`).
4. **Never** paste raw Figma-generated CSS into apps or `ui-components`.
5. **Implement** mobile-first, token-driven, framework-agnostic shared UI where possible.
6. **Verify** with `nx run @omnifex/ui-components:verify` and gates in `component-verification.md` / `figma-integration.md` §9.

Figma file key: `TcEuJHlNPkME9br19X1Qhx` (Andy UI — Design System).

---

# AI Assistant Operational Workflow

Before implementation:
1. Read relevant docs (include `figma-integration.md` for any UI/Figma task)
2. Validate constraints
3. Execute minimal scoped changes
4. Run verification commands
5. Update documentation if necessary
6. Summarize impacted documentation