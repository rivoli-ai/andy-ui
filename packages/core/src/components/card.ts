import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";

export type AndyCardPad = "none" | "sm" | "md" | "lg";

/**
 * `<andy-card>` — surface card (`.dp-card`).
 * @slot - Card content.
 */
@customElement("andy-card")
export class AndyCard extends AndyElement {
  @property({ type: Boolean, reflect: true }) hoverable = false;
  @property({ reflect: true }) pad: AndyCardPad = "md";

  override render() {
    const padClass = this.pad === "none" ? "" : `p-${this.pad}`;
    return html`<div class="dp-card ${this.hoverable ? "hoverable" : ""} ${padClass}">${this.slotTarget()}</div>`;
  }
}

define("andy-card", AndyCard);

declare global {
  interface HTMLElementTagNameMap {
    "andy-card": AndyCard;
  }
}
