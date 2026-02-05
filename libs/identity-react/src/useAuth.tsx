import { createContext, useContext, useEffect, useState, useCallback, ReactNode, FC, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { User, createAuthService, AuthConfig } from '@omnifex/identity';
import { defaultAuthConfig } from './authConfig.js';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  roles: string[];
  login: (returnUrl?: string) => Promise<void>;
  logout: () => Promise<void>;
  handleCallback: () => Promise<string | undefined>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
  config?: AuthConfig;
}

export const AuthProvider: FC<AuthProviderProps> = ({ 
  children, 
  config = defaultAuthConfig 
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  // Create auth service instance
  const authService = useMemo(() => {
    return createAuthService(config);
  }, [config]);

  // Get roles from auth service state
  const [roles, setRoles] = useState<string[]>([]);

  // Subscribe to auth state changes
  useEffect(() => {
    const unsubscribe = authService.subscribe((state: {
      user: User | null;
      isAuthenticated: boolean;
      isLoading: boolean;
      error: string | null;
      accessToken: string | null;
      profile: Record<string, unknown> | null;
      roles: string[];
    }) => {
      setUser(state.user);
      setIsLoading(state.isLoading);
      setError(state.error);
      setRoles(state.roles);
    });

    return () => {
      unsubscribe();
    };
  }, [authService]);

  const login = useCallback(async (returnUrl?: string) => {
    await authService.login(returnUrl || location.pathname);
  }, [authService, location.pathname]);

  const logout = useCallback(async () => {
    await authService.logout();
  }, [authService]);

  const handleCallback = useCallback(async (): Promise<string | undefined> => {
    return await authService.handleCallback();
  }, [authService]);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user && !user.expired,
    isLoading,
    error,
    roles,
    login,
    logout,
    handleCallback,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};



