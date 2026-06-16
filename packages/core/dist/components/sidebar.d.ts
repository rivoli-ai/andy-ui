import { AndyElement } from "../internal/base.js";
import "./icon.js";
/**
 * `<andy-sidebar>` — collapsible workspace sidebar (`.sidebar`).
 *
 * Compose it from Andy-UI components: `<andy-header slot="brand">` for the brand
 * header, `<andy-nav-section>` / `<andy-nav-item>` for navigation, and
 * `<andy-footer slot="footer">` for the user card.
 *
 * @slot brand  - Brand header (`<andy-header>`).
 * @slot        - Nav sections.
 * @slot footer - Footer card (`<andy-footer>`).
 * @fires {CustomEvent<boolean>} andy-collapse-toggle - new collapsed state.
 */
export declare class AndySidebar extends AndyElement {
    collapsed: boolean;
    /** Show the collapse toggle button in the header. */
    collapsible: boolean;
    private toggle;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "andy-sidebar": AndySidebar;
    }
}
//# sourceMappingURL=sidebar.d.ts.map