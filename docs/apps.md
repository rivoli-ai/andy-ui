# Applications

## angular-app

### Overview

**Location**: `apps/angular-app/`

The Angular application demonstrates modern Angular 21 patterns including standalone components, signals-based state management, and functional guards. It showcases OIDC authentication with role-based access control and integrates the shared design system.

### Key Technologies

- **Angular**: 21.0.6 (standalone components, signals)
- **Build Tool**: Vite (via `@nx/angular:application`)
- **Styling**: Tailwind CSS v4, SCSS
- **Testing**: Jest with `@testing-library/angular`
- **TypeScript**: 5.9 (strict mode)

### Dependencies

```json
{
  "dependencies": {
    "@omnifex/identity-angular": "workspace:*",
    "@omnifex/styles-angular": "workspace:*",
    "@omnifex/ui-components": "workspace:*",
    "@angular/core": "^21.0.6",
    "@angular/router": "^21.0.6"
  }
}
```

### Project Structure

```
apps/angular-app/
├── src/
│   ├── app/
│   │   ├── app.ts                 # Root component (standalone)
│   │   ├── app.routes.ts          # Route configuration
│   │   ├── app.config.ts          # Application providers
│   │   ├── callback/              # OAuth callback page
│   │   ├── home/                  # Home page
│   │   ├── layout/                # Layout component
│   │   └── identity-wrapper.ts    # Auth state wrapper
│   ├── main.ts                    # Bootstrap
│   ├── styles.scss                # Global styles
│   └── public/                    # Static assets
├── project.json                   # Nx configuration
├── tsconfig.app.json              # TypeScript config
├── vite.config.ts                 # Vite configuration
└── tailwind.config.ts             # Tailwind configuration
```

### Key Features

#### 1. Standalone Components

All components use the standalone API:

```typescript
// apps/angular-app/src/app/home/home.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>Welcome to Omnifex UI</h1>
    <a routerLink="/dashboard">Go to Dashboard</a>
  `
})
export class HomeComponent {}
```

#### 2. Signals-Based State

Uses Angular signals for reactive state management:

```typescript
// apps/angular-app/src/app/layout/layout.ts
import { Component, inject, computed } from '@angular/core';
import { AuthService } from '@omnifex/identity-angular';
import { ThemeService } from '@omnifex/styles-angular';

@Component({
  selector: 'app-layout',
  standalone: true,
  template: `
    <omnifex-header
      [isAuthenticated]="isAuthenticated()"
      [userName]="userName()"
      [isDark]="isDark()"
    />
  `
})
export class LayoutComponent {
  private authService = inject(AuthService);
  private themeService = inject(ThemeService);
  
  // Computed signals
  isAuthenticated = computed(() => this.authService.user() !== null);
  userName = computed(() => this.authService.user()?.name ?? '');
  isDark = computed(() => this.themeService.isDark());
}
```

#### 3. Route Guards

Uses functional guards (Angular 15+):

```typescript
// apps/angular-app/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from '@omnifex/identity-angular';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'callback', component: CallbackComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard()]  // Functional guard
  }
];
```

#### 4. Dependency Injection

Uses the modern `inject()` function:

```typescript
import { Component, inject } from '@angular/core';
import { AuthService } from '@omnifex/identity-angular';

@Component({
  selector: 'app-dashboard',
  template: `<p>User: {{ user()?.name }}</p>`
})
export class DashboardComponent {
  // Inject services without constructor
  private authService = inject(AuthService);
  user = this.authService.user;  // Signal from service
}
```

### Application Configuration

#### Bootstrap

```typescript
// apps/angular-app/src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(App, appConfig);
```

#### Providers

```typescript
// apps/angular-app/src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth } from '@omnifex/identity-angular';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAuth({
      authority: 'https://localhost:5001',
      clientId: 'omnifex-ui',
      redirectUri: 'http://localhost:4200/callback',
      scope: 'openid profile email roles'
    })
  ]
};
```

### Build and Serve

#### Development

```bash
# Serve with hot reload
corepack pnpm nx serve angular-app

# Runs at http://localhost:4200
```

Vite resolves `@omnifex/*` imports to library source files via aliases in `vite.config.ts`:

```typescript
export default defineConfig({
  resolve: {
    alias: {
      '@omnifex/identity': resolve(__dirname, '../../libs/identity/src'),
      '@omnifex/identity-angular': resolve(__dirname, '../../libs/identity-angular/src'),
    },
  },
});
```

#### Production

```bash
# Build for production
corepack pnpm nx build angular-app

# Output: dist/apps/angular-app/
```

Nx automatically builds dependencies first:
1. `@omnifex/identity`
2. `@omnifex/styles`
3. `@omnifex/identity-angular`
4. `@omnifex/styles-angular`
5. `angular-app`

### Testing

```bash
# Run tests
corepack pnpm nx test angular-app

# Run with coverage
corepack pnpm nx test angular-app --coverage
```

Tests use `@testing-library/angular`:

```typescript
// apps/angular-app/src/app/home/home.spec.ts
import { render, screen } from '@testing-library/angular';
import { HomeComponent } from './home';

describe('HomeComponent', () => {
  it('should render welcome message', async () => {
    await render(HomeComponent);
    expect(screen.getByText(/welcome to omnifex ui/i)).toBeInTheDocument();
  });
});
```

---

## react-app

### Overview

**Location**: `apps/react-app/`

The React application demonstrates modern React 18 patterns with hooks, Context API, and functional components. It uses Create React App as the foundation with `react-app-rewired` for webpack customization.

### Key Technologies

- **React**: 18.2.0 (hooks, Context)
- **Build Tool**: Webpack 5 (via Create React App)
- **Styling**: Tailwind CSS v4, CSS Modules
- **Testing**: Jest with `@testing-library/react`
- **TypeScript**: 4.9 (CRA default)

### Dependencies

```json
{
  "dependencies": {
    "@omnifex/identity-react": "workspace:*",
    "@omnifex/styles-react": "workspace:*",
    "@omnifex/ui-components": "workspace:*",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-router-dom": "^6.20.0"
  }
}
```

### Project Structure

```
apps/react-app/
├── src/
│   ├── App.tsx                    # Root component
│   ├── App.test.tsx               # App tests
│   ├── index.tsx                  # Entry point
│   ├── index.css                  # Global styles
│   ├── components/                # Shared components
│   ├── pages/                     # Route pages
│   │   ├── Home.tsx
│   │   ├── Dashboard.tsx
│   │   └── Callback.tsx
│   ├── types/                     # TypeScript types
│   └── setupTests.ts              # Test configuration
├── public/                        # Static assets
├── config-overrides.js            # Webpack customization
├── tsconfig.json                  # TypeScript config
└── project.json                   # Nx configuration
```

### Key Features

#### 1. Context Providers

Uses React Context for global state:

```typescript
// src/App.tsx
import { AuthProvider } from '@omnifex/identity-react';
import { ThemeProvider } from '@omnifex/styles-react';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
```

#### 2. Custom Hooks

Uses hooks from adapter libraries:

```typescript
// src/pages/Dashboard.tsx
import { useAuth } from '@omnifex/identity-react';
import { useTheme } from '@omnifex/styles-react';

export function Dashboard() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <button onClick={logout}>Logout</button>
      <button onClick={toggleTheme}>
        Switch to {theme === 'dark' ? 'light' : 'dark'} mode
      </button>
    </div>
  );
}
```

#### 3. Protected Routes

Uses a custom ProtectedRoute component:

```typescript
// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '@omnifex/identity-react';

export function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return <>{children}</>;
}

// Usage in routes
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

#### 4. Web Components Integration

Stencil components are loaded and registered:

```typescript
// src/index.tsx
import { defineCustomElements } from '@omnifex/ui-components/dist/esm/loader';

// Register custom elements before rendering
defineCustomElements(window).then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
});
```

### Webpack Configuration

The app uses `react-app-rewired` to customize webpack without ejecting:

```javascript
// config-overrides.js
const path = require('path');

module.exports = function override(config, env) {
  // Remove ModuleScopePlugin to allow imports from libs/
  config.resolve.plugins = config.resolve.plugins.filter(
    plugin => plugin.constructor.name !== 'ModuleScopePlugin'
  );
  
  // Add aliases for @omnifex packages
  config.resolve.alias = {
    '@omnifex/identity-react': path.resolve(__dirname, '../../libs/identity-react/src/public-api.ts'),
    '@omnifex/identity': path.resolve(__dirname, '../../libs/identity/src/public-api.ts'),
    '@omnifex/styles-react': path.resolve(__dirname, '../../libs/styles-react/src/public-api.ts'),
    '@omnifex/styles': path.resolve(__dirname, '../../libs/styles/src/public-api.ts'),
    '@omnifex/ui-components': path.resolve(__dirname, '../../libs/ui-components/src/public-api.ts'),
  };
  
  // Map .js imports to .ts files (TypeScript ESM)
  config.resolve.extensionAlias = {
    '.js': ['.ts', '.tsx', '.js'],
  };
  
  return config;
};
```

### Build and Serve

#### Development

```bash
# Serve with hot reload
corepack pnpm nx serve react-app

# Runs at http://localhost:3000
```

#### Production

```bash
# Build for production
corepack pnpm nx build react-app

# Output: apps/react-app/build/
```

Nx automatically builds dependencies first:
1. `@omnifex/identity`
2. `@omnifex/styles`
3. `@omnifex/ui-components`
4. `@omnifex/identity-react`
5. `@omnifex/styles-react`
6. `react-app`

### Testing

```bash
# Run tests in watch mode
corepack pnpm nx test react-app

# Run with coverage
corepack pnpm nx test react-app --coverage
```

Tests use `@testing-library/react`:

```typescript
// src/pages/Home.test.tsx
import { render, screen } from '@testing-library/react';
import { Home } from './Home';

describe('Home', () => {
  it('should render welcome message', () => {
    render(<Home />);
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });
});
```

---

## How Apps Consume Libraries

### Development Workflow

1. **Source-Based Resolution**:
   - TypeScript path mappings in `tsconfig.json` point to source files
   - Webpack/Vite aliases resolve `@omnifex/*` to `libs/*/src/`
   - No build step required for libraries during development

2. **Hot Module Replacement**:
   - Changes to library source trigger app rebuild
   - Fast feedback loop (seconds, not minutes)

3. **Type Checking**:
   - TypeScript validates types across app and libraries
   - Errors caught at development time

### Production Workflow

1. **Build Libraries First**:
   ```bash
   corepack pnpm nx build identity
   corepack pnpm nx build identity-angular
   ```

2. **Build App**:
   ```bash
   corepack pnpm nx build angular-app
   ```
   
   Nx uses the `dependsOn` configuration to automatically build dependencies.

3. **Optimized Output**:
   - Dead code elimination (tree-shaking)
   - Minification and bundling
   - Production-ready artifacts

### Stencil Components

Both apps load Stencil components from the built output:

```typescript
// Import the loader (always from dist)
import { defineCustomElements } from '@omnifex/ui-components/dist/esm/loader';

// Register components
defineCustomElements(window);

// Use in templates
<omnifex-header isAuthenticated={true} userName="Alice" />
```

Webpack/Vite configurations include special handling for this path:

```typescript
// Angular vite.config.ts
'@omnifex/ui-components/loader': resolve(__dirname, '../../libs/ui-components/dist/esm/loader.js')

// React config-overrides.js
'@omnifex/ui-components/dist/esm/loader': path.resolve(__dirname, '../../libs/ui-components/dist/esm/loader.js')
```

## Next Steps

- **Packages**: Explore library APIs in [packages.md](./packages.md)
- **Identity**: Deep dive into authentication in [identity-and-auth.md](./identity-and-auth.md)
- **Styles**: Learn about theming in [styles-and-design-system.md](./styles-and-design-system.md)
- **Testing**: Understand test strategies in [testing-strategy.md](./testing-strategy.md)

