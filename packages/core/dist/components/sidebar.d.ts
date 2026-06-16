import { AndyElement } from "../internal/base.js";
import type { IconName } from "../internal/icons.js";
import "./icon.js";
import "./icon-chip.js";
import "./avatar.js";
import "./header.js";
import "./footer.js";
/**
 * `<andy-sidebar>` — collapsible workspace sidebar (`.sidebar`).
 *
 * Composes an `<andy-header>` (brand + collapse toggle) and an `<andy-footer>`
 * around the nav.
 *
 * @slot brand  - Brand mark / wordmark (shown in the sidebar header).
 * @slot        - Nav sections (`<andy-nav-section>` / `<andy-nav-list>`).
 * @slot footer - Footer content (user card, sign-out, …).
 * @fires {CustomEvent<boolean>} andy-collapse-toggle - new collapsed state.
 */
export declare class AndySidebar extends AndyElement {
    collapsed: boolean;
    /** Show the collapse toggle button in the header. */
    collapsible: boolean;
    private toggle;
    render(): import("lit").TemplateResult<1>;
}
/**
 * `<andy-sidebar-brand>` — logo mark + wordmark for the sidebar `brand` slot.
 *
 * Composed from Andy-UI parts: an `<andy-icon-chip>` for the mark plus the
 * name/tagline (hidden when the sidebar is collapsed).
 * @slot logo - Optional custom logo, used instead of `icon`.
 */
export declare class AndySidebarBrand extends AndyElement {
    name: string;
    tagline: string;
    /** Built-in icon name for the mark. Ignored when a `logo` is slotted. */
    icon: IconName | "";
    render(): import("lit").TemplateResult<1>;
}
/**
 * `<andy-sidebar-user>` — user card for the sidebar `footer` slot.
 *
 * Composed from an `<andy-avatar>` plus name/email (hidden when collapsed).
 */
export declare class AndySidebarUser extends AndyElement {
    name: string;
    email: string;
    /** Avatar initials (or slot an image into `<andy-avatar>` via the default slot). */
    avatar: string;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "andy-sidebar": AndySidebar;
        "andy-sidebar-brand": AndySidebarBrand;
        "andy-sidebar-user": AndySidebarUser;
    }
}
//# sourceMappingURL=sidebar.d.ts.map