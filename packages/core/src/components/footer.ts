import { html, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";

/**
 * `<andy-footer>` — generic footer bar (`.au-footer`).
 *
 * A flexible slotted bar (content left, optional actions right). Works as a
 * page/section footer and as the sidebar footer region.
 * @slot         - Main footer content (left).
 * @slot actions - Right-aligned actions.
 */
@customElement("andy-footer")
export class AndyFooter extends AndyElement {
  override render() {
    return html`
      <footer class="au-footer">
        <div class="au-footer__main">${this.slotTarget()}</div>
        ${this.hasSlot("actions") ? html`<div class="au-footer__actions">${this.slotTarget("actions")}</div>` : nothing}
      </footer>
    `;
  }
}

define("andy-footer", AndyFooter);

declare global {
  interface HTMLElementTagNameMap {
    "andy-footer": AndyFooter;
  }
}
