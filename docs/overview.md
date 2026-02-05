# Overview

## Purpose

Omnifex UI is an enterprise-grade Nx monorepo designed to demonstrate modern patterns for building multi-framework applications with shared infrastructure. The project showcases how to:

- Build framework-agnostic core libraries that work across Angular, React, and potentially other frameworks
- Implement authentication and authorization using OIDC/OAuth2 in a reusable way
- Create a unified design system with theming and web components
- Manage multiple applications and libraries efficiently with Nx task orchestration
- Optimize CI/CD pipelines using Nx's affected command system

The monorepo serves as both a production-ready codebase and a reference architecture for teams building multi-framework platforms.

## Why Nx + pnpm?

### Nx: Intelligent Build System

**Nx** provides sophisticated task orchestration and caching capabilities that make managing a monorepo practical:

1. **Task Graph**: Nx understands dependencies between projects and runs tasks in the correct order
2. **Computation Caching**: Tasks are cached based on inputs, so unchanged code doesn't rebuild
3. **Affected Commands**: `nx affected` analyzes git history to only build/test what changed
4. **Distributed Caching**: Share cache across CI and developers (optional, not configured in this repo)
5. **Project Visualization**: `nx graph` provides visual dependency analysis

**Why not alternatives?**
- **Lerna**: Lacks intelligent caching and affected commands
- **Turborepo**: Good caching but less mature Angular/React ecosystem integration
- **Rush**: More complex setup, less integrated tooling

### pnpm: Efficient Package Management

**pnpm** offers significant advantages over npm and yarn for monorepos:

1. **Disk Efficiency**: Uses hard links to share packages across projects (saves GBs of space)
2. **Fast Installs**: Content-addressable storage makes repeated installs instant
3. **Strict Dependencies**: Doesn't hoist packages by default, preventing phantom dependencies
4. **Workspace Protocol**: `workspace:*` ensures correct local package linking
5. **Better Performance**: Typically 2-3x faster than npm

**Workspace Strategy**:
```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'libs/*'
```

All packages use `workspace:*` for local dependencies, ensuring type safety and correct resolution during development.

## Philosophy: Framework-Agnostic Core + Adapters

### The Problem

When building applications with multiple frameworks (Angular, React, Vue, etc.), teams often face:

1. **Duplicated Logic**: Authentication code rewritten for each framework
2. **Inconsistent Behavior**: Subtle differences in implementation lead to bugs
3. **Maintenance Burden**: Bug fixes must be applied to multiple codebases
4. **Testing Overhead**: Same logic tested multiple times in different frameworks

### The Solution: Adapter Pattern

Omnifex UI uses a three-layer architecture:

```
┌─────────────────────────────────────────────────────┐
│  Apps (angular-app, react-app)                      │
│  - Framework-specific UI and routing                │
└─────────────────────┬───────────────────────────────┘
                      │ consumes
┌─────────────────────▼───────────────────────────────┐
│  Adapters (identity-angular, identity-react, etc.)  │
│  - Framework-specific wrappers                      │
│  - Signals, DI (Angular) / Hooks, Context (React)   │
└─────────────────────┬───────────────────────────────┘
                      │ wraps
┌─────────────────────▼───────────────────────────────┐
│  Core (identity, styles)                            │
│  - Pure TypeScript, no framework dependencies       │
│  - Business logic, state management                 │
└─────────────────────────────────────────────────────┘
```

### Example: Authentication

**Core Library (`@omnifex/identity`)**:
```typescript
// Pure TypeScript, no framework dependencies
export function initAuth(config: AuthConfig): void {
  userManager = new UserManager(config);
}

export function getAuthService(): AuthService {
  return { 
    getUser, 
    login, 
    logout, 
    handleCallback 
  };
}
```

**Angular Adapter (`@omnifex/identity-angular`)**:
```typescript
// Wraps core with Angular patterns
@Injectable()
export class AuthService {
  private core = getAuthService();
  
  // Angular signal
  user = signal<User | null>(null);
  
  async login() {
    await this.core.login();
  }
}

// Angular guard using the adapter
export const authGuard = (): CanActivateFn => {
  return inject(AuthService).isAuthenticated();
};
```

**React Adapter (`@omnifex/identity-react`)**:
```typescript
// Wraps core with React patterns
export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const core = getAuthService();
  
  // React Context
  return (
    <AuthContext.Provider value={{ user, core }}>
      {children}
    </AuthContext.Provider>
  );
}

// React hook using the adapter
export function useAuth() {
  return useContext(AuthContext);
}
```

### Benefits

1. **Single Source of Truth**: Core logic in one place (identity, styles)
2. **Framework Idioms**: Each adapter uses native patterns (signals, hooks)
3. **Easy Testing**: Core libraries tested once with no framework mocking
4. **Future-Proof**: Adding Vue/Svelte support only requires new adapters
5. **Type Safety**: TypeScript ensures consistency across all layers

## Who This Repository Is For

### Internal Development Teams

- **Frontend Engineers**: Learn patterns for multi-framework development
- **DevOps Engineers**: Understand Nx-based CI/CD optimization
- **Architects**: Reference architecture for monorepo design

### Open Source Contributors

- **Monorepo Enthusiasts**: See real-world Nx patterns in action
- **Library Authors**: Learn framework-agnostic library design
- **Community**: Contribute improvements, report issues, suggest features

### Use Cases

1. **Reference Implementation**: Study patterns for your own monorepo
2. **Starter Template**: Fork and customize for your needs
3. **Learning Resource**: Understand Nx, pnpm, and adapter patterns
4. **Production Use**: Build upon this foundation for real applications

## Design Principles

### 1. Convention Over Configuration

Follow Nx conventions where possible:
- Apps in `apps/`, libraries in `libs/`
- Standard `project.json` structure
- Conventional `tsconfig` hierarchy

### 2. Explicit Dependencies

Use `implicitDependencies` and `dependsOn` to make relationships clear:
```json
{
  "implicitDependencies": ["@omnifex/identity"],
  "targets": {
    "build": {
      "dependsOn": ["@omnifex/identity:build"]
    }
  }
}
```

### 3. Type Safety First

- Strict TypeScript configuration
- No `any` types except where truly necessary
- Shared types exported from core libraries

### 4. Developer Experience

- Fast feedback loops (source-based development)
- Clear error messages
- Comprehensive documentation
- Helpful troubleshooting guides

### 5. CI/CD Optimization

- `nx affected` to minimize CI time
- Task caching for instant repeated builds
- Predictable build order via dependency graph

## Next Steps

- **Architecture**: Learn about dependency rules and build strategy in [architecture.md](./architecture.md)
- **Apps**: Understand how applications consume libraries in [apps.md](./apps.md)
- **Packages**: Explore library APIs in [packages.md](./packages.md)
- **Identity**: Deep dive into authentication in [identity-and-auth.md](./identity-and-auth.md)
- **Styles**: Learn about theming in [styles-and-design-system.md](./styles-and-design-system.md)

