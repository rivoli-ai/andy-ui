import { UserManagerSettings } from 'oidc-client-ts';

/**
 * Authentication configuration interface
 * Works with any OIDC-compliant provider (Duende, Azure AD, Auth0, Keycloak, etc.)
 */
export interface AuthConfig {
  /** 
   * Authority URL - the OIDC provider's base URL
   * Examples:
   * - Duende: 'https://localhost:5001'
   * - Azure AD: 'https://login.microsoftonline.com/{tenantId}/v2.0'
   * - Auth0: 'https://{domain}.auth0.com'
   */
  authority: string;
  /** Client ID / Application ID */
  clientId: string;
  /** Redirect URI after login */
  redirectUri: string;
  /** Redirect URI after logout */
  postLogoutRedirectUri: string;
  /** OAuth scopes to request */
  scope: string;
  /** Silent renew URL */
  silentRenewUrl?: string;
  /** Enable automatic silent token renewal (default: true) */
  automaticSilentRenew?: boolean;
  /** Custom claim name for roles (default: 'roles') */
  rolesClaimName?: string;
  /** Extra query parameters to include in authorization requests */
  extraQueryParams?: Record<string, string>;
}

/**
 * Creates UserManagerSettings from AuthConfig
 */
export function createUserManagerSettings(config: AuthConfig): UserManagerSettings {
  return {
    authority: config.authority,
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    post_logout_redirect_uri: config.postLogoutRedirectUri,
    scope: config.scope,
    response_type: 'code',
    automaticSilentRenew: config.automaticSilentRenew ?? true,
    silent_redirect_uri: config.silentRenewUrl,
    extraQueryParams: config.extraQueryParams,
  };
}

/**
 * Helper to build Azure AD authority URL
 */
export function azureAuthority(tenantId: string = 'common'): string {
  return `https://login.microsoftonline.com/${tenantId}/v2.0`;
}

/**
 * Default configuration template
 */
export const DEFAULT_AUTH_CONFIG: AuthConfig = {
  authority: 'https://localhost:5001',
  clientId: '',
  redirectUri: 'http://localhost:4200/callback',
  postLogoutRedirectUri: 'http://localhost:4200',
  scope: 'openid profile email',
  silentRenewUrl: 'http://localhost:4200/silent-refresh.html',
  automaticSilentRenew: true,
  rolesClaimName: 'roles',
};
