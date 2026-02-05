import { useEffect, useState, useCallback, ReactNode, createContext, useContext } from 'react';
import { getThemeService, OmnifexTheme } from '@omnifex/styles';

export type Theme = OmnifexTheme;

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * React hook to access theme state and controls
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, isDark, toggleTheme } = useTheme();
 *   
 *   return (
 *     <button onClick={toggleTheme}>
 *       Current theme: {theme} ({isDark ? 'dark' : 'light'})
 *     </button>
 *   );
 * }
 * ```
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * React wrapper for the framework-agnostic ThemeService from @omnifex/styles
 * This provides React hooks and context while using the shared theme service
 * 
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <MyComponent />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeService = getThemeService();
  const [theme, setThemeState] = useState<Theme>(() => themeService.getTheme());
  const [isDark, setIsDark] = useState<boolean>(() => themeService.getIsDark());

  // Subscribe to theme changes from the framework-agnostic service
  useEffect(() => {
    const unsubscribe = themeService.subscribe((newTheme: Theme, newIsDark: boolean) => {
      setThemeState(newTheme);
      setIsDark(newIsDark);
    });

    return () => {
      unsubscribe();
    };
  }, [themeService]);

  const setTheme = useCallback((newTheme: Theme) => {
    themeService.setTheme(newTheme);
    // State will be updated via subscription
  }, [themeService]);

  const toggleTheme = useCallback(() => {
    themeService.toggleTheme();
    // State will be updated via subscription
  }, [themeService]);

  const value: ThemeContextType = {
    theme,
    isDark,
    setTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
