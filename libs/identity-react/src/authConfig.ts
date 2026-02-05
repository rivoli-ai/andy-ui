// Re-export AuthConfig from identity package for convenience
import type { AuthConfig } from '@omnifex/identity';
export type { AuthConfig } from '@omnifex/identity';

// Default configuration - update these values for your setup
export const defaultAuthConfig: AuthConfig = {
  authority: 'https://localhost:5001',
  clientId: 'omnifex-ui', // Must match the ClientId in Duende IdentityServer Config.cs
  redirectUri: 'http://localhost:3000/callback',
  postLogoutRedirectUri: 'http://localhost:3000',
  scope: 'openid profile email roles',
  rolesClaimName: 'roles',
};



