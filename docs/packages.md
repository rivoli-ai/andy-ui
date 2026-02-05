# Packages

This document provides a comprehensive reference for all libraries in the Omnifex UI monorepo.

## Package Architecture

```
Core Libraries (Framework-Agnostic)
├── @omnifex/identity          # Authentication core
├── @omnifex/styles            # Theme management core
└── @omnifex/ui-components     # Web components (Stencil)

Angular Adapters
├── @omnifex/identity-angular  # Angular auth wrapper
└── @omnifex/styles-angular    # Angular styles wrapper

React Adapters
├── @omnifex/identity-react    # React auth wrapper
└── @omnifex/styles-react      # React styles wrapper
```

---

## Core Libraries

### @omnifex/identity

**Purpose**: Framework-agnostic OIDC authentication using `oidc-client-ts`.

**Location**: `libs/identity/`

**Dependencies**:
- `oidc-client-ts` (^3.4.1)

**Build**: TypeScript compiler (`@nx/js:tsc`)

#### Public API

**Initialization**:
```typescript
import { initAuth, type AuthConfig } from '@omnifex/identity';

initAuth({
  authority: 'https://your-identity-server.com',
  clientId: 'your-client-id',
  redirectUri: 'http://localhost:4200/callback',
  postLogoutRedirectUri: 'http://localhost:4200',
  scope: 'openid profile email'
});
```

**AuthConfig Interface**:
```typescript
interface AuthConfig {
  authority: string;              // Identity provider URL
  clientId: string;               // OAuth2 client ID
  redirectUri: string;            // Redirect after login
  postLogoutRedirectUri?: string; // Redirect after logout
  scope: string;                  // OAuth2 scopes
  responseType?: string;          // Default: 'code'
  automaticSilentRenew?: boolean; // Default: true
}
```

**Service Access**:
```typescript
import { getAuthService } from '@omnifex/identity';

const authService = getAuthService();

// Methods
await authService.login();
await authService.logout();
await authService.handleCallback();
const user = await authService.getUser();
const isAuthenticated = await authService.isAuthenticated();
```

**User Type**:
```typescript
import type { User } from '@omnifex/identity';

interface User {
  id_token: string;
  access_token: string;
  profile: {
    sub: string;
    name?: string;
    email?: string;
    roles?: string[];
  };
}
```

**Helper Functions**:
```typescript
import { azureAuthority } from '@omnifex/identity';

// Generate Azure AD authority URL
const authority = azureAuthority('your-tenant-id');
// Returns: https://login.microsoftonline.com/your-tenant-id/v2.0
```

#### Usage Example

```typescript
// Initialize once at app startup
initAuth({
  authority: 'https://localhost:5001',
  clientId: 'my-app',
  redirectUri: 'http://localhost:4200/callback',
  scope: 'openid profile email roles'
});

// Use in your code
const auth = getAuthService();
const user = await auth.getUser();
console.log(user?.profile.name);
```

#### Testing

```bash
corepack pnpm nx test identity
```

Tests are written with Jest and don't require framework mocking:

```typescript
import { initAuth, getAuthService, resetAuthService } from '@omnifex/identity';

describe('AuthService', () => {
  beforeEach(() => {
    resetAuthService();
  });
  
  it('should throw if not initialized', () => {
    expect(() => getAuthService()).toThrow('AuthService not initialized');
  });
});
```

---

### @omnifex/styles

**Purpose**: Framework-agnostic theme management with system, light, and dark modes.

**Location**: `libs/styles/`

**Dependencies**: None (pure TypeScript + CSS)

**Build**: TypeScript compiler (`@nx/js:tsc`)

#### Public API

**Service Access**:
```typescript
import { getThemeService } from '@omnifex/styles';

const themeService = getThemeService();

// Get current theme
const currentTheme = themeService.getTheme(); // 'light' | 'dark' | 'system'

// Check if dark mode is active
const isDark = themeService.isDark(); // boolean

// Set theme
themeService.setTheme('dark');
themeService.setTheme('system'); // Use OS preference

// Toggle between light and dark
themeService.toggleTheme();
```

**Types**:
```typescript
import type { OmnifexTheme } from '@omnifex/styles';

type OmnifexTheme = 'light' | 'dark' | 'system';
```

**CSS Variables**:
```css
/* libs/styles/src/lib/theme.css */
:root {
  --omnifex-bg-primary: #ffffff;
  --omnifex-text-primary: #1f2937;
  --omnifex-accent: #3b82f6;
}

[data-theme='dark'] {
  --omnifex-bg-primary: #1f2937;
  --omnifex-text-primary: #f9fafb;
  --omnifex-accent: #60a5fa;
}
```

#### Usage Example

```typescript
import { getThemeService } from '@omnifex/styles';

const theme = getThemeService();

// Initialize to system preference
theme.setTheme('system');

// Toggle on button click
button.addEventListener('click', () => {
  theme.toggleTheme();
});

// Check current state
if (theme.isDark()) {
  console.log('Dark mode is active');
}
```

#### Implementation Details

- **Storage**: Persists theme preference to `localStorage`
- **System Detection**: Uses `window.matchMedia('(prefers-color-scheme: dark)')`
- **DOM Updates**: Sets `data-theme` attribute on `document.documentElement`
- **Events**: Listens to system theme changes and updates automatically

#### Testing

```bash
corepack pnpm nx test styles
```

---

### @omnifex/ui-components

**Purpose**: Framework-agnostic web components built with Stencil.

**Location**: `libs/ui-components/`

**Dependencies**:
- `@stencil/core` (^4.0.0)

**Build**: Stencil compiler (`stencil build`)

#### Available Components

1. **`<omnifex-header>`** - Application header with auth controls
2. **`<omnifex-button>`** - Styled button with variants
3. **`<omnifex-card>`** - Content card with icon and description
4. **`<omnifex-badge>`** - Status badge with color variants
5. **`<omnifex-identity>`** - User identity display
6. **`<omnifex-theme-toggle>`** - Theme switcher toggle
7. **`<omnifex-footer>`** - Application footer
8. **`<omnifex-callback>`** - OAuth callback handler display

#### Usage

**Loading Components**:
```typescript
import { defineCustomElements } from '@omnifex/ui-components/dist/esm/loader';

// Register components globally
defineCustomElements(window);
```

**Component Examples**:

```html
<!-- Header -->
<omnifex-header
  logo-text="Omnifex UI"
  is-authenticated="true"
  user-name="Alice"
  is-dark="false"
></omnifex-header>

<!-- Button -->
<omnifex-button variant="primary" appearance="solid">
  Click Me
</omnifex-button>

<!-- Card -->
<omnifex-card
  card-title="Feature"
  icon="✨"
  description="Amazing feature description"
></omnifex-card>

<!-- Badge -->
<omnifex-badge variant="success">Active</omnifex-badge>

<!-- Theme Toggle -->
<omnifex-theme-toggle is-dark="false"></omnifex-theme-toggle>
```

#### Component APIs

**omnifex-header**:
- Props: `logoIcon`, `logoText`, `isLoading`, `isAuthenticated`, `userName`, `isDark`, `roles`
- Events: `login`, `logout`, `themeToggle`

**omnifex-button**:
- Props: `variant` (`primary` | `secondary` | `danger`), `appearance` (`solid` | `outline` | `ghost`), `disabled`
- Slots: Default slot for content

**omnifex-card**:
- Props: `cardTitle`, `icon`, `description`, `items`, `appearance`, `variant`

**omnifex-badge**:
- Props: `variant` (`default` | `success` | `warning` | `error`)

#### Testing

```bash
corepack pnpm nx test ui-components
```

Stencil components use Stencil's built-in test runner.

---

## Angular Adapters

### @omnifex/identity-angular

**Purpose**: Angular-specific wrapper for `@omnifex/identity` with signals, guards, and interceptors.

**Location**: `libs/identity-angular/`

**Dependencies**:
- `@omnifex/identity` (workspace:*)
- `@angular/core` (^21.0.6)
- `@angular/router` (^21.0.6)

**Build**: ng-packagr (`@nx/angular:ng-packagr-lite`)

#### Public API

**Provider Function**:
```typescript
import { provideAuth } from '@omnifex/identity-angular';

// In app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideAuth({
      authority: 'https://localhost:5001',
      clientId: 'angular-app',
      redirectUri: 'http://localhost:4200/callback',
      scope: 'openid profile email'
    })
  ]
};
```

**Injectable Service**:
```typescript
import { Component, inject, computed } from '@angular/core';
import { AuthService } from '@omnifex/identity-angular';

@Component({
  selector: 'app-dashboard',
  template: `
    <p>{{ userName() }}</p>
    <button (click)="logout()">Logout</button>
  `
})
export class DashboardComponent {
  private authService = inject(AuthService);
  
  // Signals
  user = this.authService.user;
  isAuthenticated = this.authService.isAuthenticated;
  isLoading = this.authService.isLoading;
  
  // Computed
  userName = computed(() => this.user()?.profile.name ?? 'Guest');
  
  // Methods
  login = () => this.authService.login();
  logout = () => this.authService.logout();
}
```

**Route Guard**:
```typescript
import { Routes } from '@angular/router';
import { authGuard } from '@omnifex/identity-angular';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard()]
  }
];
```

**HTTP Interceptor**:
```typescript
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@omnifex/identity-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor()])
    )
  ]
};
```

#### API Reference

**AuthService**:
- `user: Signal<User | null>` - Current user (reactive)
- `isAuthenticated: Signal<boolean>` - Auth status (reactive)
- `isLoading: Signal<boolean>` - Loading state (reactive)
- `login(): Promise<void>` - Initiate login
- `logout(): Promise<void>` - Initiate logout
- `handleCallback(): Promise<void>` - Handle OAuth callback

**authGuard()**:
- Returns: `CanActivateFn`
- Behavior: Redirects to login if not authenticated

**authInterceptor()**:
- Returns: `HttpInterceptorFn`
- Behavior: Adds `Authorization: Bearer <token>` header to requests

#### Testing

```bash
corepack pnpm nx test identity-angular
```

---

### @omnifex/styles-angular

**Purpose**: Angular-specific wrapper for `@omnifex/styles` with signals and dependency injection.

**Location**: `libs/styles-angular/`

**Dependencies**:
- `@omnifex/styles` (workspace:*)
- `@angular/core` (^21.0.6)

**Build**: ng-packagr (`@nx/angular:ng-packagr-lite`)

#### Public API

**Injectable Service**:
```typescript
import { Component, inject } from '@angular/core';
import { ThemeService } from '@omnifex/styles-angular';

@Component({
  selector: 'app-layout',
  template: `
    <button (click)="toggleTheme()">
      {{ isDark() ? '☀️' : '🌙' }}
    </button>
  `
})
export class LayoutComponent {
  private themeService = inject(ThemeService);
  
  // Signals
  theme = this.themeService.theme;
  isDark = this.themeService.isDark;
  
  // Methods
  toggleTheme = () => this.themeService.toggleTheme();
  setTheme = (theme: OmnifexTheme) => this.themeService.setTheme(theme);
}
```

**CSS Import**:
```scss
// apps/angular-app/src/styles.scss
@import '@omnifex/styles-angular/theme.css';
```

#### API Reference

**ThemeService**:
- `theme: Signal<OmnifexTheme>` - Current theme ('light' | 'dark' | 'system')
- `isDark: Signal<boolean>` - Whether dark mode is active
- `setTheme(theme: OmnifexTheme): void` - Set theme
- `toggleTheme(): void` - Toggle between light and dark

#### Testing

```bash
corepack pnpm nx test styles-angular
```

---

## React Adapters

### @omnifex/identity-react

**Purpose**: React-specific wrapper for `@omnifex/identity` with Context and hooks.

**Location**: `libs/identity-react/`

**Dependencies**:
- `@omnifex/identity` (workspace:*)
- `react` (^18.2.0)

**Build**: TypeScript compiler (`@nx/js:tsc`)

#### Public API

**Context Provider**:
```typescript
import { AuthProvider } from '@omnifex/identity-react';

function App() {
  return (
    <AuthProvider
      config={{
        authority: 'https://localhost:5001',
        clientId: 'react-app',
        redirectUri: 'http://localhost:3000/callback',
        scope: 'openid profile email'
      }}
    >
      <YourApp />
    </AuthProvider>
  );
}
```

**Hook**:
```typescript
import { useAuth } from '@omnifex/identity-react';

function Dashboard() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <button onClick={login}>Login</button>;
  
  return (
    <div>
      <h1>Welcome, {user?.profile.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

**Default Config**:
```typescript
import { defaultAuthConfig } from '@omnifex/identity-react';

// Use default config as base
<AuthProvider config={{ ...defaultAuthConfig, clientId: 'my-app' }}>
```

#### API Reference

**useAuth() Hook Returns**:
- `user: User | null` - Current user
- `isAuthenticated: boolean` - Auth status
- `isLoading: boolean` - Loading state
- `login: () => Promise<void>` - Initiate login
- `logout: () => Promise<void>` - Initiate logout
- `handleCallback: () => Promise<void>` - Handle OAuth callback

#### Testing

```bash
corepack pnpm nx test identity-react
```

---

### @omnifex/styles-react

**Purpose**: React-specific wrapper for `@omnifex/styles` with Context and hooks.

**Location**: `libs/styles-react/`

**Dependencies**:
- `@omnifex/styles` (workspace:*)
- `react` (^18.2.0)

**Build**: TypeScript compiler (`@nx/js:tsc`)

#### Public API

**Context Provider**:
```typescript
import { ThemeProvider } from '@omnifex/styles-react';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

**Hook**:
```typescript
import { useTheme } from '@omnifex/styles-react';

function Layout() {
  const { theme, isDark, setTheme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}
```

**CSS Import**:
```css
/* apps/react-app/src/index.css */
@import '@omnifex/styles-react/theme.css';
```

#### API Reference

**useTheme() Hook Returns**:
- `theme: OmnifexTheme` - Current theme ('light' | 'dark' | 'system')
- `isDark: boolean` - Whether dark mode is active
- `setTheme: (theme: OmnifexTheme) => void` - Set theme
- `toggleTheme: () => void` - Toggle between light and dark

#### Testing

```bash
corepack pnpm nx test styles-react
```

---

## Dependency Matrix

| Package | Depends On | Used By |
|---------|------------|---------|
| `identity` | `oidc-client-ts` | `identity-angular`, `identity-react` |
| `styles` | - | `styles-angular`, `styles-react` |
| `ui-components` | `@stencil/core` | `angular-app`, `react-app` |
| `identity-angular` | `identity`, `@angular/core` | `angular-app` |
| `identity-react` | `identity`, `react` | `react-app` |
| `styles-angular` | `styles`, `@angular/core` | `angular-app` |
| `styles-react` | `styles`, `react` | `react-app` |

## Next Steps

- **Identity Deep Dive**: Learn about OIDC integration in [identity-and-auth.md](./identity-and-auth.md)
- **Styles Deep Dive**: Learn about theming in [styles-and-design-system.md](./styles-and-design-system.md)
- **Testing**: Understand testing strategies in [testing-strategy.md](./testing-strategy.md)

