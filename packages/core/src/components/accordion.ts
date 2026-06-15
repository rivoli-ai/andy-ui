import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";
import { icons } from "../internal/icons.js";

let accordionUid = 0;

/**
 * `<andy-accordion>` — collapsible disclosure (`.ds-accordion`).
 *
 * The panel animates its height open/closed and the chevron rotates. Collapsed
 * content is `inert` so it stays out of the tab order and the a11y tree.
 *
 * @slot - The collapsible body content.
 * @fires {CustomEvent<boolean>} andy-toggle - detail is the new open state.
 */
@customElement("andy-accordion")
export class AndyAccordion extends AndyElement {
  @property() heading = "";
  @property({ type: Boolean, reflect: true }) open = false;

  private readonly _bodyId = `andy-accordion-${++accordionUid}-body`;

  private toggle() {
    this.open = !this.open;
    this.dispatchEvent(new CustomEvent("andy-toggle", { detail: this.open, bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <div class="ds-accordion ${this.open ? "is-open" : ""}">
        <button
          class="ds-accordion__head"
          @click=${this.toggle}
          aria-expanded=${this.open ? "true" : "false"}
          aria-controls=${this._bodyId}
        >
          <span class="ds-accordion__label">${this.heading}</span>
          <span class="ds-accordion__chevron">${icons.chevron()}</span>
        </button>
        <div id=${this._bodyId} class="ds-accordion__panel" role="region">
          <div class="ds-accordion__clip">
            <div class="ds-accordion__content" ?inert=${!this.open}>${this.slotTarget()}</div>
          </div>
        </div>
      </div>
    `;
  }
}

define("andy-accordion", AndyAccordion);

declare global {
  interface HTMLElementTagNameMap {
    "andy-accordion": AndyAccordion;
  }
}
