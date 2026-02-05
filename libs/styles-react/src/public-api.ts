/*
 * Public API Surface of @omnifex/styles-react
 * 
 * This library provides React-specific wrappers for the framework-agnostic @omnifex/styles package.
 * 
 * Usage:
 * ```tsx
 * import { ThemeProvider, useTheme } from '@omnifex/styles-react';
 * 
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <MyComponent />
 *     </ThemeProvider>
 *   );
 * }
 * 
 * function MyComponent() {
 *   const { theme, isDark, toggleTheme } = useTheme();
 *   return <button onClick={toggleTheme}>Toggle theme</button>;
 * }
 * ```
 */

export { ThemeProvider, useTheme } from './useTheme.js';
export type { Theme } from './useTheme.js';
export type { OmnifexTheme } from '@omnifex/styles';



