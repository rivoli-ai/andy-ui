/*
 * Public API Surface of @omnifex/styles-angular
 * 
 * This library provides Angular-specific wrappers for the framework-agnostic @omnifex/styles package.
 * 
 * Usage:
 * ```typescript
 * import { ThemeService } from '@omnifex/styles-angular';
 * 
 * constructor(private themeService: ThemeService) {}
 * 
 * // Use signals reactively
 * isDark = this.themeService.isDark;
 * theme = this.themeService.theme;
 * ```
 */

export { ThemeService } from './theme.service.js';
export type { OmnifexTheme } from '@omnifex/styles';



