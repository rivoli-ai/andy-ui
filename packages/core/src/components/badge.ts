import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";

export type AndyBadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

/**
 * `<andy-badge>` — small labelled status/category chip.
 * @slot - Badge text.
 */
@customElement("andy-badge")
export class AndyBadge extends AndyElement {
  @property({ reflect: true }) variant: AndyBadgeVariant = "primary";

  override render() {
    return html`<span class="dp-badge ${this.variant}">${this.slotTarget()}</span>`;
  }
}

define("andy-badge", AndyBadge);

declare global {
  interface HTMLElementTagNameMap {
    "andy-badge": AndyBadge;
  }
}
