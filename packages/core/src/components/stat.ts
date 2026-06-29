import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";

/**
 * `<andy-stat>` — single metric tile (`.ds-stat`).
 */
@customElement("andy-stat")
export class AndyStat extends AndyElement {
  @property() value = "";
  @property() label = "";

  override render() {
    return html`<div class="ds-stat"><span class="ds-stat__value">${this.value}</span><span class="ds-stat__label">${this.label}</span></div>`;
  }
}

define("andy-stat", AndyStat);

declare global {
  interface HTMLElementTagNameMap {
    "andy-stat": AndyStat;
  }
}
