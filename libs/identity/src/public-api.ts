/*
 * Public API Surface of identity
 * 
 * This library provides framework-agnostic authentication utilities using OIDC.
 * 
 * Usage:
 * ```typescript
 * import { createAuthService, AuthConfig } from '@omnifex/identity';
 * 
 * const config: AuthConfig = {
 *   authority: 'https://localhost:5001',
 *   clientId: 'my-app',
 *   redirectUri: 'http://localhost:4200/callback',
 *   postLogoutRedirectUri: 'http://localhost:4200',
 *   scope: 'openid profile email',
 * };
 * 
 * const authService = createAuthService(config);
 * 
 * authService.subscribe((state) => {
 *   console.log('Auth state:', state);
 * });
 * 
 * await authService.login();
 * ```
 */

// Auth Service (framework-agnostic)
export { AuthService, createAuthService, getAuthService, Roles } from './lib/auth.service.js';
export type { Role } from './lib/auth.service.js';

// Re-export User type from oidc-client-ts for convenience
export type { User } from 'oidc-client-ts';

// Configuration
export {
  DEFAULT_AUTH_CONFIG,
  azureAuthority,
  createUserManagerSettings,
} from './lib/auth.config.js';
export type { AuthConfig } from './lib/auth.config.js';
