# Identity Library

An Angular authentication library supporting any OIDC-compliant identity provider.

## Features

- 🔐 OpenID Connect authentication with PKCE flow
- 🔄 Automatic token renewal
- 👤 Role-based access control (RBAC)
- 🎯 Structural directive for conditional rendering
- 🛡️ Route guards and HTTP interceptors
- ☁️ Works with any OIDC provider (Duende, Azure AD, Auth0, Keycloak, etc.)

## Installation

```bash
npm install identity oidc-client-ts
```

## Quick Start

### 1. Configure Authentication

**For Duende IdentityServer:**

```typescript
// app.config.ts
import { provideAuth, authInterceptor } from '@omnifex/identity';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAuth({
      authority: 'https://your-identity-server.com',
      clientId: 'your-client-id',
      redirectUri: 'http://localhost:4200/callback',
      postLogoutRedirectUri: 'http://localhost:4200',
      scope: 'openid profile email api',
    }),
  ],
};
```

**For Azure AD / Microsoft Entra ID:**

```typescript
// app.config.ts
import { provideAuth, authInterceptor, azureAuthority } from '@omnifex/identity';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAuth({
      authority: azureAuthority('your-tenant-id'), // or 'common', 'organizations'
      clientId: 'your-azure-app-client-id',
      redirectUri: 'http://localhost:4200/callback',
      postLogoutRedirectUri: 'http://localhost:4200',
      scope: 'openid profile email User.Read',
      extraQueryParams: { prompt: 'select_account' }, // optional
    }),
  ],
};
```

> ⚠️ **Important: Azure AD App Registration Setup**
> 
> In the Azure Portal, you must configure the redirect URI to include `/callback`:
> 
> 1. Go to **Azure Portal** → **App Registrations** → Your App
> 2. Click **Authentication**
> 3. Add redirect URI: `http://localhost:4200/callback`
> 4. Select platform: **Single-page application (SPA)**
> 5. Enable **ID tokens** and **Access tokens**
> 
> The redirect URI must exactly match what's configured in your Angular app.

### 2. Add Callback Route

```typescript
// app.routes.ts
import { CallbackComponent } from '@omnifex/identity';

export const routes: Routes = [
  { path: 'callback', component: CallbackComponent },
  // ... other routes
];
```

### 3. Use Identity Component

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { IdentityComponent } from '@omnifex/identity';

@Component({
  selector: 'app-root',
  imports: [IdentityComponent],
  template: `
    <header>
      <lib-identity />
    </header>
  `,
})
export class AppComponent {}
```

## Configuration Options

### AuthConfig Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `authority` | `string` | ✅ | OIDC provider URL |
| `clientId` | `string` | ✅ | Application/Client ID |
| `redirectUri` | `string` | ✅ | Redirect URI after login |
| `postLogoutRedirectUri` | `string` | ✅ | Redirect URI after logout |
| `scope` | `string` | ✅ | OAuth scopes |
| `silentRenewUrl` | `string` | ❌ | Silent refresh URL |
| `automaticSilentRenew` | `boolean` | ❌ | Enable auto refresh (default: true) |
| `rolesClaimName` | `string` | ❌ | Custom roles claim (default: 'roles') |
| `extraQueryParams` | `Record<string, string>` | ❌ | Extra query params for auth requests |

### Helper Functions

```typescript
// Build Azure AD authority URL
import { azureAuthority } from '@omnifex/identity';

azureAuthority('your-tenant-id');  // https://login.microsoftonline.com/your-tenant-id/v2.0
azureAuthority('common');          // https://login.microsoftonline.com/common/v2.0
azureAuthority('organizations');   // https://login.microsoftonline.com/organizations/v2.0
```

## Role-Based Access Control

### Using the HasRole Directive

```html
<!-- Show for admin users only -->
<div *hasRole="'admin'">Admin Panel</div>

<!-- Show for multiple roles (any) -->
<div *hasRole="['admin', 'manager']">Management Section</div>

<!-- Require all roles -->
<div *hasRole="['admin', 'manager']" hasRoleRequireAll>Super Admin Only</div>
```

### Using AuthService in Code

```typescript
import { AuthService, Roles } from '@omnifex/identity';

@Component({...})
export class MyComponent {
  private authService = inject(AuthService);

  // Check single role
  isAdmin = this.authService.isAdmin;

  // Check custom role
  canEdit = computed(() => this.authService.hasRole('editor'));

  // Check any of multiple roles
  canManage = computed(() => 
    this.authService.hasAnyRole('admin', 'manager')
  );
}
```

## Route Guards

```typescript
import { authGuard, claimGuard } from '@omnifex/identity';

export const routes: Routes = [
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [claimGuard('roles', 'admin')],
  },
];
```

## API Reference

### AuthService

| Property/Method | Type | Description |
|----------------|------|-------------|
| `isAuthenticated` | `Signal<boolean>` | Current auth state |
| `isLoading` | `Signal<boolean>` | Loading state |
| `user` | `Signal<User \| null>` | Current user object |
| `profile` | `Signal<Profile \| null>` | User profile claims |
| `accessToken` | `Signal<string \| null>` | Current access token |
| `roles` | `Signal<string[]>` | User's roles |
| `provider` | `AuthProvider` | Configured provider |
| `login()` | `Promise<void>` | Initiate login |
| `logout()` | `Promise<void>` | Initiate logout |
| `hasRole(role)` | `boolean` | Check for role |
| `hasAnyRole(...roles)` | `boolean` | Check for any role |
| `hasAllRoles(...roles)` | `boolean` | Check for all roles |

## Building

```bash
npm run build:identity
```

## License

MIT
