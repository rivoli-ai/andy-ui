/*
 * Public API Surface of @omnifex/identity-angular
 * 
 * This library provides Angular-specific wrappers for the framework-agnostic @omnifex/identity package.
 * 
 * Usage:
 * ```typescript
 * import { AuthService, provideAuth } from '@omnifex/identity-angular';
 * 
 * // In app.config.ts
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideAuth({
 *       authority: 'https://localhost:5001',
 *       clientId: 'omnifex-ui',
 *       redirectUri: 'http://localhost:4200/callback',
 *       postLogoutRedirectUri: 'http://localhost:4200',
 *       scope: 'openid profile email api',
 *     }),
 *   ],
 * };
 * 
 * // In a component
 * constructor(private authService: AuthService) {}
 * 
 * login() {
 *   this.authService.login();
 * }
 * 
 * // Use signals reactively
 * isAuthenticated = this.authService.isAuthenticated;
 * user = this.authService.user;
 * ```
 */

export { AuthService } from './auth.service.js';
export { authInterceptor } from './auth.interceptor.js';
export { provideAuth, provideAuthWithInterceptor } from './providers.js';
export { HasRoleDirective } from './has-role.directive.js';
export { authGuard, claimGuard } from './auth.guards.js';

// Re-export types from @omnifex/identity
export type { User, AuthConfig } from '@omnifex/identity';



