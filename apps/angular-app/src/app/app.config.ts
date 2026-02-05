import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuthWithInterceptor } from './identity-wrapper';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAuthWithInterceptor({
      authority: 'https://localhost:5001',
      clientId: 'omnifex-ui',
      redirectUri: 'http://localhost:4200/callback',
      postLogoutRedirectUri: 'http://localhost:4200',
      scope: 'openid profile email roles api offline_access',
    }),
  ]
};
