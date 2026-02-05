/*
 * Public API Surface of ui-components
 * 
 * This library contains StencilJS web components that are framework-agnostic and can be used
 * in any framework (Angular, React, Vue, vanilla JavaScript, etc.).
 * 
 * To use these components:
 * 1. Import the loader: import '@omnifex/ui-components/loader'
 * 2. Use the components as web components: <omnifex-button>Click me</omnifex-button>
 * 
 * Framework-specific setup:
 * - Angular: Import CUSTOM_ELEMENTS_SCHEMA in your module or component
 * - React: Use the components directly in JSX (they work as custom elements)
 * - Vue: Register components or use them directly
 * - Vanilla JS: Use them directly in HTML
 */

// Note: StencilJS components (OmnifexButton, OmnifexIdentity, OmnifexCallback, OmnifexCard, etc.) are built separately
// and loaded via the StencilJS loader. They are not exported here as TypeScript classes.
// Use them as web components: <omnifex-button>, <omnifex-identity>, <omnifex-callback>, <omnifex-card>, etc.

// Export shared types and enums
export * from './lib/shared/index.js';
