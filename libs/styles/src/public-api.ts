/*
 * Public API Surface of styles
 * 
 * This library provides framework-agnostic theme management utilities.
 * 
 * Usage:
 * ```typescript
 * import { ThemeService, getThemeService } from '@omnifex/styles';
 * 
 * const themeService = getThemeService();
 * themeService.setTheme('dark');
 * themeService.subscribe((theme, isDark) => {
 *   console.log('Theme changed:', theme, isDark);
 * });
 * ```
 * 
 * To use the CSS theme variables, import the theme.css file:
 * ```css
 * @import '@omnifex/styles/src/lib/theme.css';
 * ```
 * Or in your main stylesheet:
 * ```scss
 * @import '@omnifex/styles/src/lib/theme.css';
 * ```
 */

// Theme Service (framework-agnostic)
export { ThemeService, getThemeService } from './lib/theme.service.js';
export type { OmnifexTheme } from './lib/theme.service.js';
