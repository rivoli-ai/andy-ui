import { AndyElement } from "../internal/base.js";
/**
 * `<andy-header>` — sticky app header / topbar (`.header`).
 * @slot         - Title / breadcrumb area (left).
 * @slot actions - Right-aligned actions.
 */
export declare class AndyHeader extends AndyElement {
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "andy-header": AndyHeader;
    }
}
//# sourceMappingURL=header.d.ts.map