import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";
import { icons, type IconName } from "../internal/icons.js";

export type AndyIconChipVariant = "tinted" | "solid" | "muted";
export type AndyIconChipSize = "md" | "lg";

/**
 * `<andy-icon-chip>` — gradient-tinted square holding an icon (`.au-icon-chip`).
 *
 * Set `icon` to a built-in icon name, or slot in your own SVG.
 * @slot - The icon SVG (used when `icon` is not set).
 */
@customElement("andy-icon-chip")
export class AndyIconChip extends AndyElement {
  @property({ reflect: true }) variant: AndyIconChipVariant = "tinted";
  @property({ reflect: true }) size: AndyIconChipSize = "md";
  /** Built-in icon name. When set, it's rendered instead of slotted content. */
  @property({ reflect: true }) icon: IconName | "" = "";

  override render() {
    const cls = [
      "au-icon-chip",
      this.size === "lg" ? "au-icon-chip--lg" : "",
      this.variant === "solid" ? "au-icon-chip--solid" : "",
      this.variant === "muted" ? "au-icon-chip--muted" : "",
    ]
      .filter(Boolean)
      .join(" ");
    // When `icon` is set it wins; still capture any slotted child into a hidden
    // span so it can't leak out as a stray, unsized node beside the chip.
    return this.icon && icons[this.icon as IconName]
      ? html`<div class=${cls}>
          ${icons[this.icon as IconName]()}<span hidden style="display:none">${this.slotTarget()}</span>
        </div>`
      : html`<div class=${cls}>${this.slotTarget()}</div>`;
  }
}

define("andy-icon-chip", AndyIconChip);

declare global {
  interface HTMLElementTagNameMap {
    "andy-icon-chip": AndyIconChip;
  }
}
