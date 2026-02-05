import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service.js';

/**
 * Route guard that checks if the user is authenticated.
 * Redirects to login if not authenticated.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Store the attempted URL for redirecting after login
  authService.login(state.url);
  return false;
};

/**
 * Route guard that checks if the user has a specific claim.
 * Use with route data: { claim: { type: 'role', value: 'admin' } }
 */
export const claimGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    authService.login(state.url);
    return false;
  }

  const claimConfig = route.data?.['claim'] as { type: string; value?: string } | undefined;
  
  if (!claimConfig) {
    console.warn('claimGuard used without claim configuration in route data');
    return true;
  }

  if (authService.hasClaim(claimConfig.type, claimConfig.value)) {
    return true;
  }

  // User doesn't have the required claim - redirect to unauthorized or home
  router.navigate(['/unauthorized']);
  return false;
};



