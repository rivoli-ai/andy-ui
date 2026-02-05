import { Injectable, signal, OnDestroy } from '@angular/core';
import { getThemeService, OmnifexTheme } from '@omnifex/styles';

/**
 * Angular wrapper service for the framework-agnostic ThemeService
 * This provides Angular-specific features like signals and dependency injection
 * while delegating all theme logic to the framework-agnostic service.
 *
 * @example
 * ```typescript
 * // In a component
 * constructor(private themeService: ThemeService) {}
 *
 * toggleDarkMode() {
 *   this.themeService.toggleTheme();
 * }
 *
 * // In template
 * <div [class.dark]="themeService.isDark()">
 *   Current theme: {{ themeService.theme() }}
 * </div>
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeService implements OnDestroy {
  private readonly frameworkThemeService = getThemeService();
  private readonly themeSignal = signal<OmnifexTheme>(this.frameworkThemeService.getTheme());
  private readonly isDarkSignal = signal<boolean>(this.frameworkThemeService.getIsDark());
  private unsubscribe: (() => void) | null = null;

  readonly theme = this.themeSignal.asReadonly();
  readonly isDark = this.isDarkSignal.asReadonly();

  constructor() {
    // Subscribe to theme changes from the framework-agnostic service
    // The framework service handles all DOM updates (adding/removing 'dark' class)
    // We just sync the signals for Angular's reactive system
    this.unsubscribe = this.frameworkThemeService.subscribe((theme, isDark) => {
      this.themeSignal.set(theme);
      this.isDarkSignal.set(isDark);
    });
  }

  /**
   * Sets the theme
   * @param theme The theme to set ('light', 'dark', or 'system')
   */
  setTheme(theme: OmnifexTheme): void {
    if (!['light', 'dark', 'system'].includes(theme)) {
      console.warn(`Invalid theme: ${theme}. Using 'system' as fallback.`);
      theme = 'system';
    }
    this.frameworkThemeService.setTheme(theme);
  }

  /**
   * Toggles between light and dark themes
   * If current theme is 'system', toggles to the opposite of current system preference
   */
  toggleTheme(): void {
    this.frameworkThemeService.toggleTheme();
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
    // Note: We don't destroy the framework service as it's a singleton
    // that may be used by other parts of the application
  }
}
