export { AuthProvider, useAuth } from './useAuth';
export { defaultAuthConfig } from './authConfig';

// type-only exports (these will disappear from JS output, and stay in d.ts)
export type { AuthConfig } from './authConfig';
export type { User } from '@omnifex/identity';
