/**
 * Re-export all identity-related exports from @omnifex/identity-react adapter library
 * This file maintains backward compatibility with existing imports and provides
 * a single entry point for all identity functionality.
 */

// Providers and Hooks
export { AuthProvider, useAuth } from '@omnifex/identity-react';

// Configuration
export { defaultAuthConfig } from '@omnifex/identity-react';

// Types
export type { User, AuthConfig } from '@omnifex/identity-react';



