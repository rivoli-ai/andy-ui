import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuthWithInterceptor } from './identity-wrapper';

import { routes } from './app.routes';

/** OIDC redirect URIs must match the browser origin (nx serve --port, Playwright e2e on a dedicated port, etc.). */
function spaAuthUrls(): { redirectUri: string; postLogoutRedirectUri: string } {
  const fallback = 'http://localhost:4200';
  try {
    if (typeof globalThis !== 'undefined' && 'location' in globalThis) {
      const origin = (globalThis as unknown as { location?: { origin?: string } }).location?.origin;
      if (origin && /^https?:\/\/(localhost|127\.0\.0\.1)(?::\d+)?$/i.test(origin)) {
        return {
          redirectUri: `${origin}/callback`,
          postLogoutRedirectUri: origin,
        };
      }
    }
  } catch {
    /* non-browser */
  }
  return {
    redirectUri: `${fallback}/callback`,
    postLogoutRedirectUri: fallback,
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAuthWithInterceptor({
      authority: 'https://localhost:5002',
      clientId: 'omnifex-ui',
      ...spaAuthUrls(),
      /** Until `apps/angular-app/public/silent-refresh.html` ships, avoid silent-renew iframe 404 noise. */
      automaticSilentRenew: false,
      scope: 'openid profile email roles api offline_access',
    }),
  ]
};
