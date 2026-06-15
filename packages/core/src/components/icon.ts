import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";
import { icons, type IconName } from "../internal/icons.js";

export type AndyIconSize = "sm" | "md" | "lg" | "xl";

/**
 * `<andy-icon>` — renders a built-in icon from the Andy-UI set (`.au-icon`).
 *
 * Decorative by default (`aria-hidden`). Provide `label` to expose it as an
 * image to assistive tech. The same icon names power `<andy-icon-chip icon>`.
 */
@customElement("andy-icon")
export class AndyIcon extends AndyElement {
  /** Icon name from the built-in set. */
  @property({ reflect: true }) name: IconName = "info";
  @property({ reflect: true }) size: AndyIconSize = "md";
  /** Accessible label. When empty the icon is decorative (hidden from AT). */
  @property() label = "";

  override render() {
    const glyph = (icons[this.name] ?? icons.info)();
    return html`<span
      class="au-icon au-icon--${this.size}"
      role=${this.label ? "img" : nothing}
      aria-label=${this.label || nothing}
      aria-hidden=${this.label ? nothing : "true"}
      >${glyph}</span
    >`;
  }
}

define("andy-icon", AndyIcon);

declare global {
  interface HTMLElementTagNameMap {
    "andy-icon": AndyIcon;
  }
}
