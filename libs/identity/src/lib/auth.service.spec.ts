import { AuthService, createAuthService, getAuthService, resetAuthService } from './auth.service.js';
import { AuthConfig } from './auth.config.js';
import { UserManager, User } from 'oidc-client-ts';

// Mock oidc-client-ts
jest.mock('oidc-client-ts');

describe('AuthService', () => {
  let mockUserManager: jest.Mocked<UserManager>;
  let authService: AuthService;
  const mockConfig: AuthConfig = {
    authority: 'https://test-authority.com',
    clientId: 'test-client',
    redirectUri: 'http://localhost:3000/callback',
    postLogoutRedirectUri: 'http://localhost:3000',
    scope: 'openid profile email',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Create mock UserManager
    mockUserManager = {
      getUser: jest.fn(),
      signinRedirect: jest.fn(),
      signinRedirectCallback: jest.fn(),
      signoutRedirect: jest.fn(),
      signinSilent: jest.fn(),
      events: {
        addUserLoaded: jest.fn(),
        addUserUnloaded: jest.fn(),
        addSilentRenewError: jest.fn(),
        addAccessTokenExpired: jest.fn(),
      },
    } as unknown as jest.Mocked<UserManager>;

    (UserManager as jest.MockedClass<typeof UserManager>).mockImplementation(() => mockUserManager);
    
    authService = new AuthService(mockConfig);
  });

  afterEach(() => {
    authService.destroy();
  });

  describe('Initialization', () => {
    it('should create AuthService with correct configuration', () => {
      expect(authService.authority).toBe(mockConfig.authority);
      expect(UserManager).toHaveBeenCalledWith(
        expect.objectContaining({
          authority: mockConfig.authority,
          client_id: mockConfig.clientId,
        })
      );
    });

    it('should initialize and check for existing user', async () => {
      const mockUser: Partial<User> = {
        id_token: 'test-token',
        access_token: 'access-token',
        expired: false,
        profile: { sub: 'user123' },
      };
      
      (mockUserManager.getUser as jest.Mock).mockResolvedValue(mockUser as User);
      
      // Wait for initialization
      await new Promise(resolve => setTimeout(resolve, 100));
      
      expect(mockUserManager.getUser).toHaveBeenCalled();
    });

    it('should set up event handlers', () => {
      expect(mockUserManager.events.addUserLoaded).toHaveBeenCalled();
      expect(mockUserManager.events.addUserUnloaded).toHaveBeenCalled();
      expect(mockUserManager.events.addSilentRenewError).toHaveBeenCalled();
      expect(mockUserManager.events.addAccessTokenExpired).toHaveBeenCalled();
    });
  });

  describe('User State', () => {
    it('should return null user when not authenticated', () => {
      expect(authService.getUser()).toBeNull();
      expect(authService.getIsAuthenticated()).toBe(false);
    });

    it('should return user when authenticated', () => {
      const mockUser: Partial<User> = {
        id_token: 'test-token',
        access_token: 'access-token',
        expired: false,
        profile: { sub: 'user123' },
      };
      
      // Simulate user loaded event
      const userLoadedCallback = (mockUserManager.events.addUserLoaded as jest.Mock).mock.calls[0][0];
      userLoadedCallback(mockUser as User);
      
      expect(authService.getUser()).toEqual(mockUser);
      expect(authService.getIsAuthenticated()).toBe(true);
    });

    it('should return false for expired user', () => {
      const mockUser: Partial<User> = {
        id_token: 'test-token',
        access_token: 'access-token',
        expired: true,
        profile: { sub: 'user123' },
      };
      
      const userLoadedCallback = (mockUserManager.events.addUserLoaded as jest.Mock).mock.calls[0][0];
      userLoadedCallback(mockUser as User);
      
      expect(authService.getIsAuthenticated()).toBe(false);
    });
  });

  describe('Roles', () => {
    it('should return empty array when no user', () => {
      expect(authService.getRoles()).toEqual([]);
    });

    it('should extract roles from profile (array)', () => {
      const mockUser: Partial<User> = {
        profile: { roles: ['admin', 'user'] },
      };
      
      const userLoadedCallback = (mockUserManager.events.addUserLoaded as jest.Mock).mock.calls[0][0];
      userLoadedCallback(mockUser as User);
      
      expect(authService.getRoles()).toEqual(['admin', 'user']);
    });

    it('should extract single role from profile (string)', () => {
      const mockUser: Partial<User> = {
        profile: { roles: 'admin' },
      };
      
      const userLoadedCallback = (mockUserManager.events.addUserLoaded as jest.Mock).mock.calls[0][0];
      userLoadedCallback(mockUser as User);
      
      expect(authService.getRoles()).toEqual(['admin']);
    });

    it('should check if user has specific role', () => {
      const mockUser: Partial<User> = {
        profile: { roles: ['admin', 'user'] },
      };
      
      const userLoadedCallback = (mockUserManager.events.addUserLoaded as jest.Mock).mock.calls[0][0];
      userLoadedCallback(mockUser as User);
      
      expect(authService.hasRole('admin')).toBe(true);
      expect(authService.hasRole('manager')).toBe(false);
    });

    it('should check if user has any of the specified roles', () => {
      const mockUser: Partial<User> = {
        profile: { roles: ['admin', 'user'] },
      };
      
      const userLoadedCallback = (mockUserManager.events.addUserLoaded as jest.Mock).mock.calls[0][0];
      userLoadedCallback(mockUser as User);
      
      expect(authService.hasAnyRole('admin', 'manager')).toBe(true);
      expect(authService.hasAnyRole('manager', 'guest')).toBe(false);
    });

    it('should check if user has all of the specified roles', () => {
      const mockUser: Partial<User> = {
        profile: { roles: ['admin', 'user'] },
      };
      
      const userLoadedCallback = (mockUserManager.events.addUserLoaded as jest.Mock).mock.calls[0][0];
      userLoadedCallback(mockUser as User);
      
      expect(authService.hasAllRoles('admin', 'user')).toBe(true);
      expect(authService.hasAllRoles('admin', 'manager')).toBe(false);
    });
  });

  describe('Claims', () => {
    it('should check if user has a claim', () => {
      const mockUser: Partial<User> = {
        profile: { email: 'test@example.com', department: 'IT' },
      };
      
      const userLoadedCallback = (mockUserManager.events.addUserLoaded as jest.Mock).mock.calls[0][0];
      userLoadedCallback(mockUser as User);
      
      expect(authService.hasClaim('email')).toBe(true);
      expect(authService.hasClaim('nonexistent')).toBe(false);
    });

    it('should check if user has a claim with specific value', () => {
      const mockUser: Partial<User> = {
        profile: { email: 'test@example.com', department: 'IT' },
      };
      
      const userLoadedCallback = (mockUserManager.events.addUserLoaded as jest.Mock).mock.calls[0][0];
      userLoadedCallback(mockUser as User);
      
      expect(authService.hasClaim('email', 'test@example.com')).toBe(true);
      expect(authService.hasClaim('email', 'other@example.com')).toBe(false);
    });

    it('should handle array claim values', () => {
      const mockUser: Partial<User> = {
        profile: { permissions: ['read', 'write'] },
      };
      
      const userLoadedCallback = (mockUserManager.events.addUserLoaded as jest.Mock).mock.calls[0][0];
      userLoadedCallback(mockUser as User);
      
      expect(authService.hasClaim('permissions', 'read')).toBe(true);
      expect(authService.hasClaim('permissions', 'delete')).toBe(false);
    });
  });

  describe('Subscription', () => {
    it('should subscribe to state changes', () => {
      const callback = jest.fn();
      const unsubscribe = authService.subscribe(callback);
      
      expect(callback).toHaveBeenCalled();
      expect(typeof unsubscribe).toBe('function');
    });

    it('should notify listeners on state change', () => {
      const callback = jest.fn();
      authService.subscribe(callback);
      
      const mockUser: Partial<User> = {
        profile: { sub: 'user123' },
      };
      
      const userLoadedCallback = (mockUserManager.events.addUserLoaded as jest.Mock).mock.calls[0][0];
      userLoadedCallback(mockUser as User);
      
      expect(callback).toHaveBeenCalledTimes(2); // Initial call + state change
    });

    it('should allow unsubscribing', () => {
      const callback = jest.fn();
      const unsubscribe = authService.subscribe(callback);
      
      unsubscribe();
      
      const mockUser: Partial<User> = {
        profile: { sub: 'user123' },
      };
      
      const userLoadedCallback = (mockUserManager.events.addUserLoaded as jest.Mock).mock.calls[0][0];
      userLoadedCallback(mockUser as User);
      
      expect(callback).toHaveBeenCalledTimes(1); // Only initial call
    });
  });

  describe('Login', () => {
    it('should initiate login flow', async () => {
      (mockUserManager.signinRedirect as jest.Mock).mockResolvedValue(undefined);
      
      await authService.login('/dashboard');
      
      expect(mockUserManager.signinRedirect).toHaveBeenCalledWith(
        expect.objectContaining({
          state: expect.objectContaining({
            returnUrl: '/dashboard',
          }),
        })
      );
    });

    it('should handle login errors', async () => {
      const error = new Error('Login failed');
      (mockUserManager.signinRedirect as jest.Mock).mockRejectedValue(error);
      
      await authService.login();
      
      expect(authService.getError()).toBe('Failed to initiate login');
    });
  });

  describe('Callback', () => {
    it('should handle callback successfully', async () => {
      const mockUser: Partial<User> = {
        id_token: 'test-token',
        access_token: 'access-token',
        profile: { sub: 'user123' },
        state: { returnUrl: '/dashboard' },
      };
      
      (mockUserManager.signinRedirectCallback as jest.Mock).mockResolvedValue(mockUser as User);
      
      const returnUrl = await authService.handleCallback();
      
      expect(returnUrl).toBe('/dashboard');
      expect(authService.getUser()).toEqual(mockUser);
    });

    it('should handle callback errors', async () => {
      const error = new Error('Callback failed');
      (mockUserManager.signinRedirectCallback as jest.Mock).mockRejectedValue(error);
      
      await expect(authService.handleCallback()).rejects.toThrow(error);
      expect(authService.getError()).toBe('Failed to complete login');
    });
  });

  describe('Logout', () => {
    it('should initiate logout flow', async () => {
      (mockUserManager.signoutRedirect as jest.Mock).mockResolvedValue(undefined);
      
      await authService.logout();
      
      expect(mockUserManager.signoutRedirect).toHaveBeenCalled();
    });

    it('should handle logout errors', async () => {
      const error = new Error('Logout failed');
      (mockUserManager.signoutRedirect as jest.Mock).mockRejectedValue(error);
      
      await authService.logout();
      
      expect(authService.getError()).toBe('Failed to logout');
    });
  });

  describe('Token Renewal', () => {
    it('should renew token successfully', async () => {
      const mockUser: Partial<User> = {
        id_token: 'new-token',
        access_token: 'new-access-token',
        profile: { sub: 'user123' },
      };
      
      (mockUserManager.signinSilent as jest.Mock).mockResolvedValue(mockUser as User);
      
      const result = await authService.renewToken();
      
      expect(result).toEqual(mockUser);
      expect(authService.getUser()).toEqual(mockUser);
    });

    it('should handle token renewal errors', async () => {
      const error = new Error('Renewal failed');
      (mockUserManager.signinSilent as jest.Mock).mockRejectedValue(error);
      
      const result = await authService.renewToken();
      
      expect(result).toBeNull();
      expect(authService.getError()).toBe('Failed to renew token');
    });
  });
});

describe('createAuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset singleton before each test
    resetAuthService();
  });

  afterEach(() => {
    // Clean up after each test
    resetAuthService();
  });

  it('should create and return AuthService instance', () => {
    const config: AuthConfig = {
      authority: 'https://test.com',
      clientId: 'test',
      redirectUri: 'http://localhost:3000/callback',
      postLogoutRedirectUri: 'http://localhost:3000',
      scope: 'openid',
    };
    
    const service = createAuthService(config);
    
    expect(service).toBeInstanceOf(AuthService);
    expect(service.authority).toBe(config.authority);
  });

  it('should return existing instance if already created', () => {
    const config: AuthConfig = {
      authority: 'https://test.com',
      clientId: 'test',
      redirectUri: 'http://localhost:3000/callback',
      postLogoutRedirectUri: 'http://localhost:3000',
      scope: 'openid',
    };
    
    const service1 = createAuthService(config);
    const service2 = createAuthService(config);
    
    expect(service1).toBe(service2);
  });
});

describe('getAuthService', () => {
  beforeEach(() => {
    // Reset singleton before each test
    resetAuthService();
  });

  afterEach(() => {
    // Clean up after each test
    resetAuthService();
  });

  it('should throw error if service not initialized', () => {
    // Ensure singleton is reset
    resetAuthService();
    expect(() => getAuthService()).toThrow('AuthService not initialized. Call createAuthService(config) first.');
  });

  it('should return service after initialization', () => {
    const config: AuthConfig = {
      authority: 'https://test.com',
      clientId: 'test',
      redirectUri: 'http://localhost:3000/callback',
      postLogoutRedirectUri: 'http://localhost:3000',
      scope: 'openid',
    };
    
    createAuthService(config);
    const service = getAuthService();
    
    expect(service).toBeInstanceOf(AuthService);
  });
});



