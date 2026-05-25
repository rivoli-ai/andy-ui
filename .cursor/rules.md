# Documentation & Context Rules

## Mandatory Documentation Review

Before making any architectural, UI, testing, CI/CD, or implementation changes, ALWAYS read the relevant Markdown documentation files.

Priority order:

1. /docs/ai-context/**
   - Global AI operating context
   - Repository constraints
   - Architecture rules

2. /docs/architecture/**
   - Monorepo architecture
   - Package boundaries
   - Build/publish strategy
   - Dependency rules

3. /docs/standards/**
   - UI standards
   - Accessibility requirements
   - Responsive/mobile-first rules
   - Coding conventions
   - Testing standards

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

# AI Assistant Operational Workflow

Before implementation:
1. Read relevant docs
2. Validate constraints
3. Execute minimal scoped changes
4. Run verification commands
5. Update documentation if necessary
6. Summarize impacted documentation