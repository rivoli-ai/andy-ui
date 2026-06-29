import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";
import { icons, type IconName } from "../internal/icons.js";

export type AndyIconSize = "sm" | "md" | "lg" | "xl";
/** Semantic colour, mapped to design tokens. `inherit` uses the surrounding `currentColor`. */
export type AndyIconTone = "inherit" | "brand" | "success" | "warning" | "error" | "info" | "muted";

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
  /** Semantic colour (design tokens). Defaults to `inherit` (currentColor). */
  @property({ reflect: true }) tone: AndyIconTone = "inherit";
  /** Accessible label. When empty the icon is decorative (hidden from AT). */
  @property() label = "";

  override render() {
    const glyph = (icons[this.name] ?? icons.info)();
    const cls = ["au-icon", `au-icon--${this.size}`, this.tone !== "inherit" ? `au-icon--tone-${this.tone}` : ""]
      .filter(Boolean)
      .join(" ");
    return html`<span
      class=${cls}
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
