/**
 * @andy-ui/core — framework-agnostic web components.
 *
 * Importing this module registers every `<andy-*>` custom element as a side
 * effect. You still need the stylesheet once at your app root:
 *   import "@andy-ui/tokens/andy-ui.css";
 */

// Register elements (side-effectful imports).
import "./components/button.js";
import "./components/badge.js";
import "./components/status.js";
import "./components/input.js";
import "./components/select.js";
import "./components/search-input.js";
import "./components/switch.js";
import "./components/card.js";
import "./components/skill-card.js";
import "./components/stat.js";
import "./components/callout.js";
import "./components/avatar.js";
import "./components/progress.js";
import "./components/icon.js";
import "./components/icon-chip.js";
import "./components/empty-state.js";
import "./components/breadcrumb.js";
import "./components/nav.js";
import "./components/navbar.js";
import "./components/layout.js";
import "./components/modal.js";
import "./components/tabs.js";
import "./components/accordion.js";
import "./components/theme-toggle.js";
import "./components/key-box.js";
import "./components/table.js";
import "./components/chat.js";

// Re-export classes + types.
export * from "./components/button.js";
export * from "./components/badge.js";
export * from "./components/status.js";
export * from "./components/input.js";
export * from "./components/select.js";
export * from "./components/search-input.js";
export * from "./components/switch.js";
export * from "./components/card.js";
export * from "./components/skill-card.js";
export * from "./components/stat.js";
export * from "./components/callout.js";
export * from "./components/avatar.js";
export * from "./components/progress.js";
export * from "./components/icon.js";
export * from "./components/icon-chip.js";
export * from "./components/empty-state.js";
export * from "./components/breadcrumb.js";
export * from "./components/nav.js";
export * from "./components/navbar.js";
export * from "./components/layout.js";
export * from "./components/modal.js";
export * from "./components/tabs.js";
export * from "./components/accordion.js";
export * from "./components/theme-toggle.js";
export * from "./components/key-box.js";
export * from "./components/table.js";
export * from "./components/chat.js";

// Utilities (toast API is not an element; theme helpers configure <html>).
export * from "./components/toast.js";
export { getTheme, setTheme, toggleTheme, initTheme, type AndyTheme } from "./internal/theme.js";
// Icon set: the glyph map, the list of names, and the name type.
export { icons, iconNames, type IconName } from "./internal/icons.js";
