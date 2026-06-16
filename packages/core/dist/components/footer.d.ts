import { AndyElement } from "../internal/base.js";
/**
 * `<andy-footer>` — generic footer bar (`.au-footer`).
 *
 * A flexible slotted bar (content left, optional actions right). Works as a
 * page/section footer and as the sidebar footer region.
 * @slot         - Main footer content (left).
 * @slot actions - Right-aligned actions.
 */
export declare class AndyFooter extends AndyElement {
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "andy-footer": AndyFooter;
    }
}
//# sourceMappingURL=footer.d.ts.map