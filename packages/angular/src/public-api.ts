/**
 * @andy-ui/angular — Angular bindings for the Andy-UI web components.
 *
 * Importing from this package registers every `<andy-*>` custom element as a
 * side effect. You also need the stylesheet once at your app root:
 *   import "@andy-ui/tokens/andy-ui.css";   // or add it to angular.json styles
 */

// Register all custom elements.
import "@andy-ui/core";

export * from "./lib/value-accessors";
export * from "./lib/andy-ui.module";
export * from "./lib/toast.service";

// Re-export the imperative + theme helpers and shared types from core.
export {
  toast,
  showToast,
  getTheme,
  setTheme,
  toggleTheme,
  initTheme,
  type AndyToastOptions,
  type AndyToastType,
  type AndyTheme,
  type AndyCrumb,
  type AndyTab,
  type AndyColumn,
  type AndyRow,
  type AndySelectOption,
} from "@andy-ui/core";
