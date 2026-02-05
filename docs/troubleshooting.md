# Troubleshooting

This guide covers common issues encountered in the Omnifex UI monorepo and their solutions.

## Table of Contents

- [Nx Issues](#nx-issues)
- [pnpm Workspace Issues](#pnpm-workspace-issues)
- [TypeScript Issues](#typescript-issues)
- [React Build Issues](#react-build-issues)
- [Angular Build Issues](#angular-build-issues)
- [Testing Issues](#testing-issues)
- [Authentication Issues](#authentication-issues)
- [Dependency Resolution](#dependency-resolution)
- [Performance Issues](#performance-issues)

---

## Nx Issues

### NX Failed to start plugin worker

**Symptoms**: Error when running `nx` commands:
```
NX   Failed to start plugin worker.
```

**Solutions**:

1. **Disable Nx Daemon**:
   ```bash
   NX_DAEMON=false corepack pnpm nx build angular-app
   ```

2. **Reset Nx Cache**:
   ```bash
   corepack pnpm nx reset
   ```

3. **Clear Node Modules and Reinstall**:
   ```bash
   rm -rf node_modules .nx
   corepack pnpm install
   ```

### Stale Nx Cache

**Symptoms**: Build outputs don't reflect recent changes

**Solution**:
```bash
# Clear Nx cache
corepack pnpm nx reset

# Or delete cache manually
rm -rf .nx/cache
```

### nx affected shows all projects

**Symptoms**: `nx affected` builds all projects instead of only changed ones

**Solutions**:

1. **Check Base Branch**:
   ```bash
   # Ensure you're comparing against the right branch
   corepack pnpm nx affected:graph --base=main
   ```

2. **Verify Git History**:
   ```bash
   # In CI, ensure full history is fetched
   # .github/workflows/ci.yml
   - uses: actions/checkout@v4
     with:
       fetch-depth: 0  # Important!
   ```

3. **Check nx.json**:
   ```json
   {
     "defaultBase": "main"
   }
   ```

### Cannot find Nx configuration

**Symptoms**:
```
Cannot find configuration for task 'build'
```

**Solution**: Verify `project.json` exists and has the target:
```json
{
  "targets": {
    "build": {
      "executor": "...",
      "options": {}
    }
  }
}
```

---

## pnpm Workspace Issues

### Module not found with workspace:*

**Symptoms**:
```
Error: Cannot find module '@omnifex/identity'
```

**Solutions**:

1. **Reinstall Dependencies**:
   ```bash
   rm -rf node_modules
   corepack pnpm install
   ```

2. **Verify pnpm-workspace.yaml**:
   ```yaml
   packages:
     - 'apps/*'
     - 'libs/*'
   ```

3. **Check Package Name**:
   ```json
   // libs/identity/package.json
   {
     "name": "@omnifex/identity"  // Must match import
   }
   ```

### Permission errors during pnpm install

**Symptoms**:
```
EPERM: operation not permitted
```

**Solutions**:

1. **Check Filesystem Permissions**:
   ```bash
   # On macOS, ensure disk is not read-only
   mount
   ```

2. **Clear pnpm Store**:
   ```bash
   corepack pnpm store prune
   ```

3. **Run with Elevated Permissions** (last resort):
   ```bash
   sudo corepack pnpm install
   ```

### Mismatched lock file

**Symptoms**:
```
ERR_PNPM_OUTDATED_LOCKFILE
```

**Solution**:
```bash
# Update lock file
corepack pnpm install --no-frozen-lockfile
```

---

## TypeScript Issues

### Cannot find module '@omnifex/...'

**Symptoms**:
```
TS2307: Cannot find module '@omnifex/identity' or its corresponding type declarations.
```

**Solutions**:

1. **Check tsconfig.json paths**:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@omnifex/identity": ["./libs/identity/src/public-api.ts"]
       }
     }
   }
   ```

2. **Verify baseUrl**:
   ```json
   {
     "compilerOptions": {
       "baseUrl": "."  // Should be "." not "src"
     }
   }
   ```

3. **Extend tsconfig.base.json**:
   ```json
   {
     "extends": "../../tsconfig.base.json"
   }
   ```

### Module resolution issues

**Symptoms**:
```
Cannot resolve './file.js' in TypeScript files
```

**Solution**: Add `extensionAlias` to webpack config:
```javascript
// config-overrides.js
config.resolve.extensionAlias = {
  '.js': ['.ts', '.tsx', '.js'],
};
```

### Type errors in node_modules

**Symptoms**:
```
node_modules/@angular/core/index.d.ts: error TS...
```

**Solution**: Enable `skipLibCheck`:
```json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

---

## React Build Issues

### Can't resolve '@omnifex/...' in React app

**Symptoms**:
```
Module not found: Error: Can't resolve '@omnifex/identity-react'
```

**Solutions**:

1. **Check config-overrides.js aliases**:
   ```javascript
   config.resolve.alias = {
     '@omnifex/identity-react': path.resolve(__dirname, '../../libs/identity-react/src/public-api.ts'),
   };
   ```

2. **Verify tsconfig.json paths**:
   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@omnifex/identity-react": ["../../libs/identity-react/src/public-api.ts"]
       }
     }
   }
   ```

3. **Check $ suffix for exact matching**:
   ```javascript
   '@omnifex/identity-react$': path.resolve(...)
   ```

### export { type X } parse error

**Symptoms**:
```
Module parse failed: Unexpected token (38:14)
export { type AuthConfig }
```

**Solution**: Use `export type { X }` syntax instead:
```typescript
// ✅ Correct
export type { AuthConfig } from './authConfig';

// ❌ Wrong
export { type AuthConfig } from './authConfig';
```

### source-map-loader processing TypeScript

**Symptoms**:
```
Module parse failed: Unexpected token
File was processed with these loaders:
 * source-map-loader
```

**Solution**: Remove source-map-loader or exclude libs:
```javascript
// config-overrides.js
config.module.rules = config.module.rules.map(rule => {
  if (rule.oneOf) {
    return {
      ...rule,
      oneOf: rule.oneOf.filter(r => 
        !r.loader?.includes('source-map-loader')
      )
    };
  }
  return rule;
});
```

### Multiple React versions

**Symptoms**:
```
Warning: Invalid hook call. Hooks can only be called inside the body of a function component.
```

**Solution**: Use `pnpm.overrides`:
```json
{
  "pnpm": {
    "overrides": {
      "react": "18.2.0",
      "react-dom": "18.2.0"
    }
  }
}
```

### ModuleScopePlugin blocking imports

**Symptoms**:
```
Attempted import error: '@omnifex/identity-react' is not exported from 'src/'.
```

**Solution**: Disable ModuleScopePlugin:
```javascript
// config-overrides.js
config.resolve.plugins = config.resolve.plugins.filter(
  plugin => plugin.constructor.name !== 'ModuleScopePlugin'
);
```

---

## Angular Build Issues

### File is not under 'rootDir'

**Symptoms**:
```
error TS6059: File '/path/to/libs/identity/src/public-api.ts' is not under 'rootDir'
```

**Solution**: Use separate tsconfig for ng-packagr builds:
```json
// tsconfig.ng-packagr.json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "paths": {
      "@omnifex/identity": ["./dist/identity/src/public-api"]
    }
  }
}
```

Update `project.json`:
```json
{
  "targets": {
    "build": {
      "options": {
        "tsConfig": "libs/identity-angular/tsconfig.lib.prod.json"
      }
    }
  }
}
```

### Vite can't resolve modules

**Symptoms**:
```
Error: Cannot find module '@omnifex/identity'
```

**Solution**: Add aliases to vite.config.ts:
```typescript
export default defineConfig({
  resolve: {
    alias: {
      '@omnifex/identity': resolve(__dirname, '../../libs/identity/src'),
    },
  },
});
```

### Cannot find module 'ng-packagr'

**Symptoms**:
```
NX   Cannot find module 'ng-packagr'
```

**Solution**: Add to root devDependencies:
```bash
corepack pnpm add -D ng-packagr
```

### Tailwind CSS not applying

**Symptoms**: Styles don't appear in Angular app

**Solutions**:

1. **Check import order in styles.scss**:
   ```scss
   // Theme CSS BEFORE Tailwind
   @import '../../../libs/styles/src/lib/theme.css';
   
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

2. **Verify Tailwind config content**:
   ```typescript
   export default {
     content: ['./src/**/*.{html,ts}'],
   };
   ```

---

## Testing Issues

### module is not defined in ES module scope

**Symptoms**:
```
ReferenceError: module is not defined in ES module scope
```

**Solution**: Rename `jest.config.ts` to `jest.config.cjs`:
```bash
mv jest.config.ts jest.config.cjs
```

Update `project.json`:
```json
{
  "options": {
    "jestConfig": "libs/identity/jest.config.cjs"
  }
}
```

### Transform not applied to node_modules

**Symptoms**:
```
SyntaxError: Unexpected token 'export'
```

**Solution**: Update `transformIgnorePatterns`:
```javascript
module.exports = {
  transformIgnorePatterns: [
    'node_modules/(?!@omnifex|@angular|oidc-client-ts)'
  ],
};
```

### Cannot find Google Chrome executable

**Symptoms**: Stencil tests fail with Chrome error

**Solution**: Use unit tests only:
```json
{
  "scripts": {
    "test": "stencil test --spec --passWithNoTests"
  }
}
```

### fetch is not defined in tests

**Symptoms**:
```
ReferenceError: fetch is not defined
```

**Solution**: Add polyfill to setupTests:
```typescript
// setupTests.ts
import 'whatwg-fetch';
```

### Angular signal mocking

**Symptoms**: Tests fail with signal not updating

**Solution**: Mock signals properly:
```typescript
const mockAuthService = {
  user: signal<User | null>(null),
  isAuthenticated: computed(() => mockAuthService.user() !== null),
};
```

---

## Authentication Issues

### Identity Server connection refused

**Symptoms**:
```
Failed to fetch
net::ERR_CONNECTION_REFUSED
```

**Solutions**:

1. **Verify Identity Server is Running**:
   ```bash
   cd omnifex-duende-identity-server
   dotnet run
   ```

2. **Check Authority URL**:
   ```typescript
   provideAuth({
     authority: 'https://localhost:5001',  // Correct
     // authority: 'http://localhost:5001',  // Wrong!
   });
   ```

3. **Trust Dev Certificate**:
   ```bash
   dotnet dev-certs https --trust
   ```

### CORS errors

**Symptoms**:
```
Access to fetch at 'https://localhost:5001' has been blocked by CORS policy
```

**Solution**: Update Identity Server CORS config:
```csharp
// Config.cs
AllowedCorsOrigins = { 
  "http://localhost:4200",  // Angular
  "http://localhost:3000"   // React
}
```

### Infinite redirect loop

**Symptoms**: App keeps redirecting between login and callback

**Solutions**:

1. **Check Redirect URIs Match**:
   ```typescript
   // Must match exactly
   redirectUri: 'http://localhost:4200/callback'
   
   // Identity server config
   RedirectUris = { "http://localhost:4200/callback" }
   ```

2. **Verify Callback Handler**:
   ```typescript
   // Callback route must call handleCallback()
   await authService.handleCallback();
   ```

### Roles not appearing in user profile

**Symptoms**: `user.profile.roles` is undefined

**Solutions**:

1. **Add roles to scope**:
   ```typescript
   provideAuth({
     scope: 'openid profile email roles'  // Include 'roles'
   });
   ```

2. **Configure Identity Server**:
   ```csharp
   AllowedScopes = { "openid", "profile", "email", "roles" }
   ```

---

## Dependency Resolution

### Dependency build order issues

**Symptoms**: Build fails because dependency not built

**Solution**: Add `dependsOn` to project.json:
```json
{
  "targets": {
    "build": {
      "dependsOn": ["@omnifex/identity:build"]
    }
  }
}
```

### Circular dependency detected

**Symptoms**:
```
NX   Circular dependency detected
```

**Solution**: Refactor to remove circular imports:
```
✅ Good: App → Adapter → Core
❌ Bad: Core → Adapter → Core
```

### Version conflicts

**Symptoms**: Multiple versions of same package installed

**Solution**: Use `pnpm.overrides`:
```json
{
  "pnpm": {
    "overrides": {
      "package-name": "1.2.3"
    }
  }
}
```

---

## Performance Issues

### Slow Nx build times

**Solutions**:

1. **Use Affected Commands**:
   ```bash
   nx affected -t build  # Instead of run-many
   ```

2. **Enable Parallel Execution**:
   ```bash
   nx affected -t build --parallel=3
   ```

3. **Check Nx Cache**:
   ```bash
   # Verify cache is working
   nx build identity
   nx build identity  # Should be instant
   ```

### Slow pnpm install

**Solutions**:

1. **Use Frozen Lock File**:
   ```bash
   corepack pnpm install --frozen-lockfile
   ```

2. **Clear pnpm Cache**:
   ```bash
   corepack pnpm store prune
   ```

3. **Use CI Mode**:
   ```bash
   corepack pnpm install --prefer-offline
   ```

### Memory issues during build

**Symptoms**:
```
FATAL ERROR: Ineffective mark-compacts near heap limit
```

**Solution**: Increase Node memory:
```bash
NODE_OPTIONS=--max-old-space-size=4096 nx build angular-app
```

---

## Debug Commands

### Visualize Project Graph

```bash
# Interactive graph
corepack pnpm nx graph

# Focus on specific project
corepack pnpm nx graph --focus=angular-app

# Show affected projects
corepack pnpm nx affected:graph
```

### Inspect Nx Configuration

```bash
# Show resolved configuration
corepack pnpm nx show project angular-app

# List all projects
corepack pnpm nx show projects
```

### Verbose Logging

```bash
# Verbose output
corepack pnpm nx build identity --verbose

# Debug output
NX_VERBOSE_LOGGING=true corepack pnpm nx build identity
```

### Profile Build Performance

```bash
# Generate performance profile
NX_PROFILE=profile.json corepack pnpm nx build angular-app

# View profile
npx @nrwl/nx-console profile.json
```

---

## Getting Help

### Check Documentation

1. [Overview](./overview.md) - Monorepo philosophy
2. [Architecture](./architecture.md) - Project structure
3. [Apps](./apps.md) - Application details
4. [Packages](./packages.md) - Library APIs
5. [Identity & Auth](./identity-and-auth.md) - Authentication guide
6. [Styles](./styles-and-design-system.md) - Theming guide
7. [Testing](./testing-strategy.md) - Testing guide
8. [Build & CI](./build-and-ci.md) - Build optimization

### Community Resources

- **Nx Docs**: https://nx.dev
- **pnpm Docs**: https://pnpm.io
- **Angular Docs**: https://angular.dev
- **React Docs**: https://react.dev
- **Stencil Docs**: https://stenciljs.com

### Still Stuck?

1. **Check GitHub Issues**: Search for similar problems
2. **Enable Verbose Logging**: Use `--verbose` flag
3. **Isolate the Problem**: Create minimal reproduction
4. **Ask for Help**: Open an issue with details:
   - Error message
   - Steps to reproduce
   - Environment (OS, Node version, etc.)
   - Relevant configuration files

