import { AndyElement } from "../internal/base.js";
import "./avatar.js";
/**
 * `<andy-footer>` — user card: an `<andy-avatar>` plus a name and email.
 * Designed for the `<andy-sidebar>` `footer` slot; the text hides when the
 * sidebar is collapsed.
 */
export declare class AndyFooter extends AndyElement {
    name: string;
    email: string;
    /** Avatar initials (or slot an image into `<andy-avatar>` via `avatar` slot). */
    avatar: string;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "andy-footer": AndyFooter;
    }
}
//# sourceMappingURL=footer.d.ts.map