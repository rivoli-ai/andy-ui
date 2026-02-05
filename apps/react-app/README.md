# React Sample App - @omnifex Libraries

This is a sample React application demonstrating how to use the `@omnifex` libraries in a React application.

## Libraries Used

- **@omnifex/ui-components**: StencilJS web components (omnifex-button, omnifex-identity, omnifex-callback, omnifex-card, omnifex-theme-toggle)
- **@omnifex/styles**: Theme CSS variables and styling utilities
- **@omnifex/identity**: Authentication service (wrapped in React hooks)

## Features

- ✅ Authentication with OIDC (Duende IdentityServer or Azure AD)
- ✅ Theme switching (light/dark/system)
- ✅ Role-based content display
- ✅ StencilJS web components integration
- ✅ React Router for navigation

## Setup

1. Install dependencies:
```bash
cd react-sample-app
npm install
```

2. Configure authentication in `src/utils/authConfig.ts`:
```typescript
export const defaultAuthConfig: AuthConfig = {
  authority: 'https://localhost:5001', // Your OIDC provider
  clientId: 'omnifex-ui-client',
  redirectUri: 'http://localhost:3000/callback',
  postLogoutRedirectUri: 'http://localhost:3000',
  scope: 'openid profile email roles',
  rolesClaimName: 'roles',
  provider: 'duende', // or 'azure'
};
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`.

## Project Structure

```
react-sample-app/
├── src/
│   ├── components/        # React components
│   │   ├── Layout.tsx
│   │   ├── Dashboard.tsx
│   │   └── Callback.tsx
│   ├── hooks/            # React hooks
│   │   ├── useAuth.tsx   # Authentication hook
│   │   └── useTheme.tsx  # Theme management hook
│   ├── utils/            # Utility functions
│   │   └── authConfig.ts # Auth configuration
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
├── public/
│   └── index.html
├── package.json
├── tsconfig.json
└── README.md
```

## Key Implementation Details

### StencilJS Web Components

The StencilJS web components from `@omnifex/ui-components` are registered in `src/index.tsx`:

```typescript
import { defineCustomElements } from '@omnifex/ui-components/dist/esm/loader';
defineCustomElements(window);
```

TypeScript declarations for the web components are added inline in component files using `declare global`.

### Authentication

The `useAuth` hook wraps `oidc-client-ts` functionality and provides:
- User state management
- Login/logout functions
- Role extraction
- Callback handling

### Theme Management

The `useTheme` hook manages theme state and applies CSS variables from `@omnifex/styles`:
- Light/dark/system themes
- LocalStorage persistence
- System preference detection

## Customization

### Update Auth Configuration

Edit `src/utils/authConfig.ts` to match your OIDC provider settings.

### Customize Theme

The theme uses CSS variables from `@omnifex/styles`. Override them in `src/index.css` or create a custom theme file.

### Add More Components

You can use any StencilJS component from `@omnifex/ui-components`:
- `<omnifex-button>`
- `<omnifex-identity>`
- `<omnifex-callback>`
- `<omnifex-card>`
- `<omnifex-theme-toggle>`

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.
