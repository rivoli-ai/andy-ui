import { AndyElement } from "../internal/base.js";
/**
 * `<andy-app-shell>` — sidebar + main-column application layout.
 *
 * Regions (light-DOM slots):
 * @slot sidebar - The `<andy-sidebar>`.
 * @slot header  - The `<andy-header>` / `<andy-navbar>` (top of the main column).
 * @slot         - The scrolling page content.
 *
 * Listens for `andy-collapse-toggle` from a descendant sidebar and mirrors the
 * collapsed state onto itself so the grid animates between the full and
 * collapsed sidebar widths.
 */
export declare class AndyAppShell extends AndyElement {
    collapsed: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _onToggle;
    render(): import("lit").TemplateResult<1>;
}
/**
 * `<andy-nav-section>` — titled group of nav items (`.nav-section`).
 * @slot - `<andy-nav-item>` rows (wrapped in a `.nav-list`).
 */
export declare class AndyNavSection extends AndyElement {
    heading: string;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "andy-app-shell": AndyAppShell;
        "andy-nav-section": AndyNavSection;
    }
}
//# sourceMappingURL=layout.d.ts.map