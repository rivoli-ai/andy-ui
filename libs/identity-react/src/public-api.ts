/*
 * Public API Surface of @omnifex/identity-react
 * 
 * This library provides React-specific wrappers for the framework-agnostic @omnifex/identity package.
 * 
 * Usage:
 * ```typescript
 * import { AuthProvider, useAuth } from '@omnifex/identity-react';
 * 
 * // In App.tsx
 * function App() {
 *   return (
 *     <AuthProvider>
 *       <YourApp />
 *     </AuthProvider>
 *   );
 * }
 * 
 * // In a component
 * function MyComponent() {
 *   const { user, isAuthenticated, login, logout } = useAuth();
 *   
 *   return (
 *     <div>
 *       {isAuthenticated ? (
 *         <button onClick={logout}>Logout</button>
 *       ) : (
 *         <button onClick={() => login()}>Login</button>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */

export { AuthProvider, useAuth } from './useAuth.js';
export { defaultAuthConfig } from './authConfig.js';
export type { AuthConfig } from './authConfig.js';
export type { User } from '@omnifex/identity';



