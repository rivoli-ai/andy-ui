import { AndyElement } from "../internal/base.js";
import type { IconName } from "../internal/icons.js";
import "./icon-chip.js";
/**
 * `<andy-header>` — brand header: a logo mark (`<andy-icon-chip>`) plus a name
 * and tagline. Designed for the `<andy-sidebar>` `brand` slot; the text hides
 * when the sidebar is collapsed.
 *
 * @slot logo - Optional custom logo, used instead of `icon`.
 */
export declare class AndyHeader extends AndyElement {
    name: string;
    tagline: string;
    /** Built-in icon name for the mark. Ignored when a `logo` is slotted. */
    icon: IconName | "";
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "andy-header": AndyHeader;
    }
}
//# sourceMappingURL=header.d.ts.map