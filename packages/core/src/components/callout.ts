import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";
import { icons, type IconName } from "../internal/icons.js";

export type AndyCalloutVariant = "info" | "warning" | "success" | "error";

const VARIANT_ICON: Record<AndyCalloutVariant, IconName> = {
  info: "info",
  warning: "warning",
  success: "check",
  error: "error",
};

/**
 * `<andy-callout>` — inline note / banner (`.ds-callout`).
 * @slot - Callout body (supports rich markup).
 */
@customElement("andy-callout")
export class AndyCallout extends AndyElement {
  @property({ reflect: true }) variant: AndyCalloutVariant = "info";

  override render() {
    return html`<div class="ds-callout ${this.variant}">${icons[VARIANT_ICON[this.variant]]()}<div>${this.slotTarget()}</div></div>`;
  }
}

define("andy-callout", AndyCallout);

declare global {
  interface HTMLElementTagNameMap {
    "andy-callout": AndyCallout;
  }
}
