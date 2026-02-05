import { Injectable, signal, computed, OnDestroy } from '@angular/core';
import { createAuthService, getAuthService, AuthService as FrameworkAuthService, AuthConfig, User } from '@omnifex/identity';

/**
 * Angular wrapper service for the framework-agnostic AuthService
 * This provides Angular-specific features like signals and dependency injection
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private frameworkAuthService: FrameworkAuthService | null = null;
  private unsubscribe: (() => void) | null = null;

  // Angular signals
  private readonly userSignal = signal<User | null>(null);
  private readonly loadingSignal = signal<boolean>(true);
  private readonly errorSignal = signal<string | null>(null);

  readonly user = this.userSignal.asReadonly();
  readonly isLoading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.userSignal() && !this.userSignal()?.expired);
  readonly accessToken = computed(() => this.userSignal()?.access_token ?? null);
  readonly profile = computed(() => this.userSignal()?.profile ?? null);
  readonly roles = computed<string[]>(() => {
    const profile = this.userSignal()?.profile;
    if (!profile) return [];
    const rolesClaimName = 'roles'; // This should come from config, but for now use default
    const roleValue = profile[rolesClaimName];
    if (!roleValue) return [];
    return Array.isArray(roleValue) ? roleValue : [roleValue];
  });

  readonly isAdmin = computed(() => this.hasRole('admin'));
  readonly isManager = computed(() => this.hasRole('manager'));
  readonly isUser = computed(() => this.hasRole('user'));

  private _authority: string = '';
  get authority(): string {
    return this._authority;
  }

  /**
   * Initialize the auth service with configuration
   * This should be called during app initialization
   */
  initialize(config: AuthConfig): void {
    if (this.frameworkAuthService) {
      console.warn('AuthService already initialized');
      return;
    }

    this.frameworkAuthService = createAuthService(config);
    this._authority = config.authority;

    // Subscribe to auth state changes
    this.unsubscribe = this.frameworkAuthService.subscribe((state) => {
      this.userSignal.set(state.user);
      this.loadingSignal.set(state.isLoading);
      this.errorSignal.set(state.error);
    });
  }

  /**
   * Gets the current user
   */
  getUser(): User | null {
    return this.frameworkAuthService?.getUser() ?? null;
  }

  /**
   * Initiates the login flow
   */
  async login(returnUrl?: string): Promise<void> {
    if (!this.frameworkAuthService) {
      throw new Error('AuthService not initialized. Call initialize(config) first.');
    }
    await this.frameworkAuthService.login(returnUrl);
  }

  /**
   * Handles the callback from the identity provider
   */
  async handleCallback(): Promise<string | undefined> {
    if (!this.frameworkAuthService) {
      throw new Error('AuthService not initialized');
    }
    return await this.frameworkAuthService.handleCallback();
  }

  /**
   * Logs out the user
   */
  async logout(): Promise<void> {
    if (!this.frameworkAuthService) {
      throw new Error('AuthService not initialized');
    }
    await this.frameworkAuthService.logout();
  }

  /**
   * Renews the access token silently
   */
  async renewToken(): Promise<User | null> {
    if (!this.frameworkAuthService) {
      throw new Error('AuthService not initialized');
    }
    return await this.frameworkAuthService.renewToken();
  }

  /**
   * Gets the current access token
   */
  getAccessToken(): string | null {
    return this.frameworkAuthService?.getAccessToken() ?? null;
  }

  /**
   * Checks if the user has a specific role
   */
  hasRole(role: string): boolean {
    return this.frameworkAuthService?.hasRole(role) ?? false;
  }

  /**
   * Checks if the user has any of the specified roles
   */
  hasAnyRole(...roles: string[]): boolean {
    return this.frameworkAuthService?.hasAnyRole(...roles) ?? false;
  }

  /**
   * Checks if the user has all of the specified roles
   */
  hasAllRoles(...roles: string[]): boolean {
    return this.frameworkAuthService?.hasAllRoles(...roles) ?? false;
  }

  /**
   * Checks if the user has a specific claim
   */
  hasClaim(claimType: string, claimValue?: string): boolean {
    return this.frameworkAuthService?.hasClaim(claimType, claimValue) ?? false;
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    if (this.frameworkAuthService) {
      this.frameworkAuthService.destroy();
    }
  }
}



