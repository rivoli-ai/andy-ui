import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthConfig, DEFAULT_AUTH_CONFIG } from '@omnifex/identity';
import { AuthService } from './auth.service.js';
import { authInterceptor } from './auth.interceptor.js';

/**
 * Provides authentication services for the application.
 * 
 * @example
 * ```typescript
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
 * ```
 */
export function provideAuth(config?: Partial<AuthConfig>): EnvironmentProviders {
  const mergedConfig: AuthConfig = {
    ...DEFAULT_AUTH_CONFIG,
    ...config,
  };

  return makeEnvironmentProviders([
    {
      provide: AuthService,
      useFactory: () => {
        const authService = new AuthService();
        authService.initialize(mergedConfig);
        return authService;
      },
    },
  ]);
}

/**
 * Provides authentication services with the HTTP interceptor pre-configured.
 * This automatically adds the access token to API requests.
 * 
 * @example
 * ```typescript
 * // In app.config.ts
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideAuthWithInterceptor({
 *       authority: 'https://localhost:5001',
 *       clientId: 'omnifex-ui',
 *       redirectUri: 'http://localhost:4200/callback',
 *       postLogoutRedirectUri: 'http://localhost:4200',
 *       scope: 'openid profile email api',
 *     }),
 *   ],
 * };
 * ```
 */
export function provideAuthWithInterceptor(config?: Partial<AuthConfig>): EnvironmentProviders {
  const mergedConfig: AuthConfig = {
    ...DEFAULT_AUTH_CONFIG,
    ...config,
  };

  return makeEnvironmentProviders([
    {
      provide: AuthService,
      useFactory: () => {
        const authService = new AuthService();
        authService.initialize(mergedConfig);
        return authService;
      },
    },
    provideHttpClient(withInterceptors([authInterceptor])),
  ]);
}



