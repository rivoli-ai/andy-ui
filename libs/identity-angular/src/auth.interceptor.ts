import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service.js';

/**
 * HTTP interceptor that adds the access token to outgoing requests.
 * Only adds the token to requests that match the configured API URLs.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();

  // Skip if no token or if the request is to the identity server
  if (!token || req.url.includes('/connect/')) {
    return next(req);
  }

  // Clone the request and add the authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};



