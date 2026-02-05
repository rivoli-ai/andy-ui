export type OmnifexTheme = 'light' | 'dark' | 'system';

type ThemeChangeCallback = (theme: OmnifexTheme, isDark: boolean) => void;

/**
 * Framework-agnostic theme service for managing light/dark/system themes
 */
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  private currentTheme: OmnifexTheme;
  private isDarkMode: boolean = false;
  private listeners: Set<ThemeChangeCallback> = new Set();
  private mediaQuery: MediaQueryList | null = null;
  private mediaQueryListener: ((e: MediaQueryListEvent) => void) | null = null;

  constructor() {
    this.currentTheme = this.getInitialTheme();
    this.initializeMediaQuery();
    this.applyTheme(this.currentTheme);
  }

  /**
   * Gets the current theme
   */
  getTheme(): OmnifexTheme {
    return this.currentTheme;
  }

  /**
   * Gets whether dark mode is currently active
   */
  getIsDark(): boolean {
    return this.isDarkMode;
  }

  /**
   * Sets the theme
   */
  setTheme(theme: OmnifexTheme): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.THEME_KEY, theme);
    }
    this.currentTheme = theme;
    this.applyTheme(theme);
    this.notifyListeners();
  }

  /**
   * Toggles between light and dark themes
   */
  toggleTheme(): void {
    const current = this.currentTheme;
    if (current === 'light') {
      this.setTheme('dark');
    } else if (current === 'dark') {
      this.setTheme('light');
    } else {
      // If system, toggle to opposite of current system preference
      const prefersDark = this.mediaQuery?.matches ?? false;
      this.setTheme(prefersDark ? 'light' : 'dark');
    }
  }

  /**
   * Subscribe to theme changes
   * @param callback Function to call when theme changes
   * @returns Unsubscribe function
   */
  subscribe(callback: ThemeChangeCallback): () => void {
    this.listeners.add(callback);
    // Immediately call with current state
    callback(this.currentTheme, this.isDarkMode);
    
    return () => {
      this.listeners.delete(callback);
    };
  }

  /**
   * Cleanup method to remove event listeners
   */
  destroy(): void {
    if (this.mediaQuery && this.mediaQueryListener) {
      if (this.mediaQuery.removeEventListener) {
        this.mediaQuery.removeEventListener('change', this.mediaQueryListener);
      } else if (this.mediaQuery.removeListener) {
        // Fallback for older browsers
        this.mediaQuery.removeListener(this.mediaQueryListener);
      }
    }
    this.listeners.clear();
  }

  private getInitialTheme(): OmnifexTheme {
    if (typeof localStorage === 'undefined') {
      return 'system';
    }
    const stored = localStorage.getItem(this.THEME_KEY) as OmnifexTheme;
    return stored && ['light', 'dark', 'system'].includes(stored) ? stored : 'system';
  }

  private initializeMediaQuery(): void {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.mediaQueryListener = () => {
      if (this.currentTheme === 'system') {
        this.updateDarkMode();
      }
    };

    if (this.mediaQuery.addEventListener) {
      this.mediaQuery.addEventListener('change', this.mediaQueryListener);
    } else if (this.mediaQuery.addListener) {
      // Fallback for older browsers
      this.mediaQuery.addListener(this.mediaQueryListener);
    }
  }

  private applyTheme(theme: OmnifexTheme): void {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return;
    }

    const html = document.documentElement;
    let shouldBeDark = false;

    if (theme === 'system') {
      const prefersDark = this.mediaQuery?.matches ?? false;
      shouldBeDark = prefersDark;
    } else {
      shouldBeDark = theme === 'dark';
    }

    // Tailwind dark mode: only 'dark' class is needed
    // When 'dark' class is absent, it's light mode
    if (shouldBeDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    // Update the state
    this.isDarkMode = shouldBeDark;
  }

  private updateDarkMode(): void {
    if (this.currentTheme === 'system') {
      const prefersDark = this.mediaQuery?.matches ?? false;
      this.isDarkMode = prefersDark;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      this.notifyListeners();
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach(callback => {
      callback(this.currentTheme, this.isDarkMode);
    });
  }
}

// Export a singleton instance for convenience
let themeServiceInstance: ThemeService | null = null;

/**
 * Get or create the singleton theme service instance
 */
export function getThemeService(): ThemeService {
  if (!themeServiceInstance) {
    themeServiceInstance = new ThemeService();
  }
  return themeServiceInstance;
}
