import { UserManager, User } from 'oidc-client-ts';
import { createUserManagerSettings, AuthConfig } from './auth.config.js';

// Role constants
export const Roles = {
  Admin: 'admin',
  User: 'user',
  Manager: 'manager',
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

type AuthStateChangeCallback = (state: {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  accessToken: string | null;
  profile: Record<string, unknown> | null;
  roles: string[];
}) => void;

/**
 * Framework-agnostic authentication service using OIDC
 */
export class AuthService {
  private readonly config: AuthConfig;
  private readonly userManager: UserManager;
  private readonly rolesClaimName: string;

  // State
  private currentUser: User | null = null;
  private isLoading: boolean = true;
  private error: string | null = null;
  private listeners: Set<AuthStateChangeCallback> = new Set();

  /** The configured authority URL */
  readonly authority: string;

  constructor(config: AuthConfig) {
    this.config = config;
    this.authority = config.authority;
    this.rolesClaimName = config.rolesClaimName ?? 'roles';
    
    const settings = createUserManagerSettings(config);
    this.userManager = new UserManager(settings);

    // Set up event handlers
    this.userManager.events.addUserLoaded((user: User) => {
      this.currentUser = user;
      this.error = null;
      this.notifyListeners();
    });

    this.userManager.events.addUserUnloaded(() => {
      this.currentUser = null;
      this.notifyListeners();
    });

    this.userManager.events.addSilentRenewError((error) => {
      console.error('Silent renew error:', error);
      this.error = 'Session renewal failed';
      this.notifyListeners();
    });

    this.userManager.events.addAccessTokenExpired(() => {
      console.warn('Access token expired');
      this.currentUser = null;
      this.notifyListeners();
    });

    // Initialize - check for existing session
    this.initialize();
  }

  /**
   * Gets the current user
   */
  getUser(): User | null {
    return this.currentUser;
  }

  /**
   * Gets whether the user is authenticated
   */
  getIsAuthenticated(): boolean {
    return !!this.currentUser && !this.currentUser.expired;
  }

  /**
   * Gets the loading state
   */
  getIsLoading(): boolean {
    return this.isLoading;
  }

  /**
   * Gets the current error
   */
  getError(): string | null {
    return this.error;
  }

  /**
   * Gets the current access token
   */
  getAccessToken(): string | null {
    return this.currentUser?.access_token ?? null;
  }

  /**
   * Gets the user profile
   */
  getProfile(): Record<string, unknown> | null {
    return this.currentUser?.profile ?? null;
  }

  /**
   * Gets the user roles
   */
  getRoles(): string[] {
    const profile = this.currentUser?.profile;
    if (!profile) return [];
    
    const roleValue = profile[this.rolesClaimName];
    if (!roleValue) return [];
    
    // Handle both single role (string) and multiple roles (array)
    if (Array.isArray(roleValue)) {
      return roleValue.filter((r): r is string => typeof r === 'string');
    }
    if (typeof roleValue === 'string') {
      return [roleValue];
    }
    return [];
  }

  /**
   * Checks if the user has a specific role
   */
  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  /**
   * Checks if the user has any of the specified roles
   */
  hasAnyRole(...roles: string[]): boolean {
    return roles.some(role => this.hasRole(role));
  }

  /**
   * Checks if the user has all of the specified roles
   */
  hasAllRoles(...roles: string[]): boolean {
    return roles.every(role => this.hasRole(role));
  }

  /**
   * Checks if the user has a specific claim
   */
  hasClaim(claimType: string, claimValue?: string): boolean {
    const profile = this.currentUser?.profile;
    if (!profile) return false;

    const claimValues = profile[claimType];
    if (claimValue === undefined) {
      return claimValues !== undefined;
    }

    if (Array.isArray(claimValues)) {
      return claimValues.includes(claimValue);
    }

    return claimValues === claimValue;
  }

  /**
   * Subscribe to authentication state changes
   * @param callback Function to call when state changes
   * @returns Unsubscribe function
   */
  subscribe(callback: AuthStateChangeCallback): () => void {
    this.listeners.add(callback);
    // Immediately call with current state
    callback(this.getState());
    
    return () => {
      this.listeners.delete(callback);
    };
  }

  /**
   * Initiates the login flow by redirecting to the identity provider.
   */
  async login(returnUrl?: string): Promise<void> {
    try {
      this.isLoading = true;
      this.error = null;
      this.notifyListeners();
      await this.userManager.signinRedirect({
        state: { returnUrl: returnUrl || (typeof window !== 'undefined' ? window.location.pathname : '/') },
      });
    } catch (error) {
      console.error('Login error:', error);
      this.error = 'Failed to initiate login';
      this.isLoading = false;
      this.notifyListeners();
    }
  }

  /**
   * Handles the callback from the identity provider after login.
   * Call this in your callback component.
   */
  async handleCallback(): Promise<string | undefined> {
    try {
      this.isLoading = true;
      this.error = null;
      this.notifyListeners();
      const user = await this.userManager.signinRedirectCallback();
      this.currentUser = user;
      this.isLoading = false;
      this.error = null;
      this.notifyListeners();
      return (user.state as { returnUrl?: string })?.returnUrl;
    } catch (error) {
      console.error('Callback error:', error);
      this.error = 'Failed to complete login';
      this.isLoading = false;
      this.notifyListeners();
      throw error;
    }
  }

  /**
   * Logs out the user and redirects to the identity provider's logout page.
   */
  async logout(): Promise<void> {
    try {
      this.isLoading = true;
      this.error = null;
      this.notifyListeners();
      await this.userManager.signoutRedirect();
    } catch (error) {
      console.error('Logout error:', error);
      this.error = 'Failed to logout';
      this.isLoading = false;
      this.notifyListeners();
    }
  }

  /**
   * Silently renews the access token.
   */
  async renewToken(): Promise<User | null> {
    try {
      const user = await this.userManager.signinSilent();
      this.currentUser = user;
      this.notifyListeners();
      return user;
    } catch (error) {
      console.error('Token renewal error:', error);
      this.error = 'Failed to renew token';
      this.notifyListeners();
      return null;
    }
  }

  /**
   * Cleanup method to remove event listeners
   */
  destroy(): void {
    this.listeners.clear();
    // Note: UserManager doesn't have a cleanup method, but we clear our listeners
  }

  private async initialize(): Promise<void> {
    try {
      this.isLoading = true;
      this.notifyListeners();
      const user = await this.userManager.getUser();
      if (user && !user.expired) {
        this.currentUser = user;
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      this.error = 'Failed to initialize authentication';
    } finally {
      this.isLoading = false;
      this.notifyListeners();
    }
  }

  private getState() {
    return {
      user: this.currentUser,
      isAuthenticated: this.getIsAuthenticated(),
      isLoading: this.isLoading,
      error: this.error,
      accessToken: this.getAccessToken(),
      profile: this.getProfile(),
      roles: this.getRoles(),
    };
  }

  private notifyListeners(): void {
    const state = this.getState();
    this.listeners.forEach(callback => {
      callback(state);
    });
  }
}

// Export a singleton instance factory for convenience
let authServiceInstance: AuthService | null = null;

/**
 * Get or create the singleton auth service instance
 * Note: You must call createAuthService first to initialize it
 */
export function getAuthService(): AuthService {
  if (!authServiceInstance) {
    throw new Error('AuthService not initialized. Call createAuthService(config) first.');
  }
  return authServiceInstance;
}

/**
 * Create and initialize the singleton auth service instance
 */
export function createAuthService(config: AuthConfig): AuthService {
  if (authServiceInstance) {
    console.warn('AuthService already initialized. Returning existing instance.');
    return authServiceInstance;
  }
  authServiceInstance = new AuthService(config);
  return authServiceInstance;
}

/**
 * Reset the singleton instance (for testing purposes only)
 * @internal
 */
export function resetAuthService(): void {
  if (authServiceInstance) {
    authServiceInstance.destroy();
    authServiceInstance = null;
  }
}
