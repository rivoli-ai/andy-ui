# Omnifex UI

A modern Nx monorepo for enterprise UI development with framework-agnostic core libraries and Angular/React applications.

## The Enterprise Challenge

Modern enterprises face a common dilemma: **multiple frontend frameworks coexisting within the same organization**. This multi-framework reality creates significant challenges:

### Common Pain Points

- **Code Duplication**: Authentication logic, theming systems, and business rules are reimplemented for each framework
- **Inconsistent User Experience**: Different design systems and component behaviors across applications
- **Knowledge Silos**: Teams become framework-specific, hindering collaboration and knowledge sharing
- **Maintenance Burden**: Security patches and feature updates must be applied multiple times across codebases
- **Migration Risk**: Framework upgrades or transitions become high-risk, all-or-nothing endeavors
- **Talent Constraints**: Organizations struggle to maintain expertise across multiple framework ecosystems

### The Traditional Approach (and Why It Fails)

Most organizations attempt one of these strategies:

1. **Standardize on One Framework**: Forces teams to abandon existing codebases and expertise
2. **Parallel Implementation**: Duplicate effort maintaining separate Angular/React/Vue implementations
3. **Micro-frontends Only**: Solves composition but not shared logic and design system challenges
4. **Copy-Paste Reuse**: Creates divergent implementations that drift over time

Each approach has significant costs in time, money, or technical debt.

## The Omnifex Solution

Omnifex demonstrates an architectural pattern that addresses these challenges through **framework-agnostic core libraries with framework-specific adapters**.

### Key Architectural Principles

```
┌─────────────────────────────────────────────────────┐
│                 Applications Layer                   │
│         (Angular 21, React 18, Vue, etc.)           │
└────────────────┬────────────────┬───────────────────┘
                 │                │
┌────────────────▼────────────────▼───────────────────┐
│              Framework Adapters                      │
│    (identity-angular, identity-react, etc.)         │
│    • Minimal glue code                              │
│    • Framework-specific patterns (hooks, signals)   │
└────────────────┬────────────────┬───────────────────┘
                 │                │
┌────────────────▼────────────────▼───────────────────┐
│          Framework-Agnostic Core                     │
│   (identity, styles, ui-components)                 │
│   • Pure TypeScript                                  │
│   • Zero framework dependencies                      │
│   • Single source of truth                          │
└──────────────────────────────────────────────────────┘
```

### Enterprise Benefits

**1. Write Once, Use Everywhere**
- Authentication logic written once in `@omnifex/identity`
- Used across Angular, React, and future frameworks
- Single point for security updates and compliance

**2. Consistent User Experience**
- Web Components (`@omnifex/ui-components`) work in any framework
- Unified design system through shared `@omnifex/styles`
- Theme changes propagate automatically across all applications

**3. Reduced Maintenance Burden**
- Bug fixes applied once in core libraries
- Breaking changes managed through adapter updates
- Clear upgrade paths for framework migrations

**4. Lower Total Cost of Ownership**
- Eliminate duplicate development effort
- Reduce testing surface area (test core once, adapters lightly)
- Faster time-to-market for new features

**5. Risk Mitigation**
- Incremental framework adoption/migration possible
- Core business logic protected from framework churn
- A/B testing different frameworks without reimplementation

**6. Team Flexibility**
- Developers can switch between framework teams more easily
- Shared understanding of core business logic
- Cross-team collaboration on core libraries

### Real-World Enterprise Scenarios

**Scenario 1: Gradual Migration**
Your company has legacy Angular apps but wants to adopt React. With Omnifex:
- New features built in React share auth, themes, and components
- Legacy Angular apps continue working with same shared libraries
- Migration happens gradually, feature-by-feature, without "big bang" rewrites

**Scenario 2: Acquisitions**
Your company acquires another using a different framework. With Omnifex:
- Immediately share authentication and design system
- Provide consistent user experience across merged product lines
- Avoid costly full rewrites or maintaining duplicate systems

**Scenario 3: Product Suite**
Your enterprise has multiple products built by different teams. With Omnifex:
- All products share authentication, reducing user friction
- Consistent branding and UX across entire product portfolio
- Centralized compliance and security controls

## Overview

Omnifex UI is an Nx-powered monorepo that demonstrates enterprise-grade patterns for building multi-framework applications with shared authentication, design systems, and reusable components. The architecture emphasizes framework-agnostic core libraries with framework-specific adapters, enabling code reuse across Angular and React applications.

## Key Features

- **Multi-Framework Support**: Angular 21 and React 18 applications sharing common libraries
- **Framework-Agnostic Architecture**: Core libraries with no framework dependencies
- **Modern Authentication**: OIDC/OAuth2 via oidc-client-ts with role-based access control
- **Unified Design System**: Tailwind CSS v4 with theme management and Stencil web components
- **Nx Task Orchestration**: Efficient builds with caching and affected command support
- **pnpm Workspaces**: Fast, disk-efficient dependency management
- **Type-Safe**: Full TypeScript coverage across all libraries and applications

## Monorepo Structure

```
omnifex-ui/
├── apps/
│   ├── angular-app/          # Angular 21 application
│   └── react-app/            # React 18 application (CRA + react-app-rewired)
├── libs/
│   ├── identity/             # Framework-agnostic OIDC authentication core
│   ├── identity-angular/     # Angular auth adapter (signals, guards, interceptors)
│   ├── identity-react/       # React auth adapter (Context, hooks)
│   ├── styles/               # Framework-agnostic theme management
│   ├── styles-angular/       # Angular styles adapter
│   ├── styles-react/         # React styles adapter
│   └── ui-components/        # Stencil web components (framework-agnostic)
├── docs/                     # Comprehensive documentation
├── nx.json                   # Nx configuration
├── tsconfig.base.json        # Shared TypeScript configuration
└── pnpm-workspace.yaml       # pnpm workspace configuration
```

## Prerequisites

- **Node.js**: 20+ (LTS recommended)
- **pnpm**: 10+ (managed via corepack)
- **Git**: For version control

## Quick Start

### 1. Install Dependencies

```bash
# Enable corepack (if not already enabled)
corepack enable

# Install dependencies
corepack pnpm install
```

### 2. Serve Applications

**Angular Application:**
```bash
corepack pnpm nx serve angular-app
```
The app runs at **http://localhost:4200**

**React Application:**
```bash
corepack pnpm nx serve react-app
```
The app runs at **http://localhost:3000**

### 3. Run Tests

```bash
# Test all projects
corepack pnpm nx run-many -t test --all

# Test specific project
corepack pnpm nx test angular-app
corepack pnpm nx test identity
```

### 4. Build Projects

```bash
# Build all projects
corepack pnpm nx run-many -t build --all

# Build specific app
corepack pnpm nx build angular-app

# Build only affected projects (CI optimization)
corepack pnpm nx affected -t build
```

## Applications

### angular-app

Modern Angular 21 application featuring:
- Standalone components with signals-based state management
- OIDC authentication with route guards
- Role-based access control
- Tailwind CSS styling with dark mode support
- Stencil web components integration

**Key Technologies**: Angular 21, TypeScript, Vite, Tailwind v4

### react-app

React 18 application featuring:
- Hooks-based architecture with Context API
- OIDC authentication with protected routes
- Theme provider with dark mode
- Stencil web components integration

**Key Technologies**: React 18, TypeScript, Webpack 5, Create React App

## Shared Libraries

### Core Libraries (Framework-Agnostic)

**@omnifex/identity**
- OIDC client wrapper using oidc-client-ts
- User authentication state management
- Token storage and refresh handling
- No framework dependencies

**@omnifex/styles**
- Theme detection (system, light, dark)
- CSS custom properties management
- localStorage persistence
- No framework dependencies

**@omnifex/ui-components**
- Stencil-based web components
- Framework-agnostic by design
- Components: header, button, card, badge, theme-toggle

### Framework Adapters

**Angular Adapters**
- `@omnifex/identity-angular`: Auth service with signals, guards, interceptors
- `@omnifex/styles-angular`: Theme service with Angular DI

**React Adapters**
- `@omnifex/identity-react`: AuthProvider with useAuth hook
- `@omnifex/styles-react`: ThemeProvider with useTheme hook

## Development Workflow

### Building Libraries

Libraries must be built before apps can use their production outputs:

```bash
# Build core libraries
corepack pnpm nx build identity
corepack pnpm nx build styles
corepack pnpm nx build ui-components

# Build adapters (depends on core libraries)
corepack pnpm nx build identity-angular
corepack pnpm nx build identity-react
corepack pnpm nx build styles-angular
corepack pnpm nx build styles-react
```

Nx automatically builds dependencies when you build an app:
```bash
corepack pnpm nx build angular-app  # Builds identity-angular, styles-angular, etc.
```

### Running Tests

```bash
# Run all tests
corepack pnpm nx run-many -t test --all

# Run tests for affected projects only
corepack pnpm nx affected -t test

# Run specific project tests
corepack pnpm nx test identity
corepack pnpm nx test angular-app
```

### Linting

```bash
# Lint all projects
corepack pnpm nx run-many -t lint --all

# Lint specific project
corepack pnpm nx lint angular-app
```

### Visualizing the Project Graph

```bash
# Open interactive project graph
corepack pnpm nx graph

# View affected projects
corepack pnpm nx affected:graph
```

## Key Commands

| Command | Description |
|---------|-------------|
| `nx serve <app>` | Start development server |
| `nx build <project>` | Build project for production |
| `nx test <project>` | Run unit tests |
| `nx lint <project>` | Run ESLint |
| `nx run-many -t <target> --all` | Run target for all projects |
| `nx affected -t <target>` | Run target for affected projects only |
| `nx graph` | Visualize project dependencies |
| `nx reset` | Clear Nx cache |

## CI/CD

The monorepo uses GitHub Actions with Nx affected commands to optimize CI pipeline:

- **Pull Requests**: Only tests and builds affected projects
- **Main Branch**: Full build and test suite
- **Caching**: Nx task cache + pnpm store cache for fast builds

See [docs/build-and-ci.md](docs/build-and-ci.md) for detailed CI/CD documentation.

## Documentation

Comprehensive documentation is available in the [`docs/`](docs/) directory:

- [Overview](docs/overview.md) - Monorepo purpose and philosophy
- [Architecture](docs/architecture.md) - Dependency graph and patterns
- [Applications](docs/apps.md) - Angular and React app details
- [Packages](docs/packages.md) - Library documentation
- [Identity & Authentication](docs/identity-and-auth.md) - OIDC integration guide
- [Styles & Design System](docs/styles-and-design-system.md) - Theming and components
- [Testing Strategy](docs/testing-strategy.md) - Unit and E2E testing
- [Build & CI](docs/build-and-ci.md) - Build process and GitHub Actions
- [Troubleshooting](docs/troubleshooting.md) - Common issues and solutions

## Contributing

This monorepo is designed for both internal development and potential open-source collaboration.

### Development Guidelines

1. **Follow Nx conventions**: Use Nx generators where possible
2. **Keep core libraries framework-agnostic**: No Angular/React imports in `identity` or `styles`
3. **Update tests**: All new features require unit tests
4. **Document changes**: Update relevant docs when changing architecture
5. **Use conventional commits**: Follow conventional commit format for clear history

### Code Quality

- **TypeScript**: Strict mode enabled
- **Linting**: ESLint with TypeScript rules
- **Testing**: Jest for unit tests, Testing Library for component tests
- **Formatting**: Prettier with monorepo-wide configuration

## Technology Stack

- **Monorepo**: Nx 22
- **Package Manager**: pnpm 10 (workspaces)
- **Languages**: TypeScript 5.9
- **Frameworks**: Angular 21, React 18
- **Web Components**: Stencil
- **Styling**: Tailwind CSS v4, SCSS
- **Authentication**: oidc-client-ts
- **Testing**: Jest, Testing Library, Playwright
- **Build Tools**: Vite (Angular), Webpack 5 (React), tsc, ng-packagr
- **CI/CD**: GitHub Actions

## License

MIT

---

**Need Help?** Check the [troubleshooting guide](docs/troubleshooting.md) or the comprehensive [documentation](docs/).
