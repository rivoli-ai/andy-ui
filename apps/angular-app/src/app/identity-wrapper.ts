/**
 * Re-export all identity-related exports from @omnifex/identity-angular adapter library
 * This file maintains backward compatibility with existing imports and provides
 * a single entry point for all identity functionality.
 */

// Services
export { AuthService } from '@omnifex/identity-angular';

// Interceptors
export { authInterceptor } from '@omnifex/identity-angular';

// Providers
export { provideAuth, provideAuthWithInterceptor } from '@omnifex/identity-angular';

// Directives
export { HasRoleDirective } from '@omnifex/identity-angular';

// Guards
export { authGuard, claimGuard } from '@omnifex/identity-angular';

// Types
export type { User, AuthConfig } from '@omnifex/identity-angular';



