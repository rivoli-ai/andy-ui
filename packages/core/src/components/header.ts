import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";

/**
 * `<andy-header>` — sticky app header / topbar (`.header`).
 * @slot         - Title / breadcrumb area (left).
 * @slot actions - Right-aligned actions.
 */
@customElement("andy-header")
export class AndyHeader extends AndyElement {
  override render() {
    return html`
      <header class="header">
        <div class="header-content">
          <div class="header-title">${this.slotTarget()}</div>
          <div class="header-actions">${this.slotTarget("actions")}</div>
        </div>
      </header>
    `;
  }
}

define("andy-header", AndyHeader);

declare global {
  interface HTMLElementTagNameMap {
    "andy-header": AndyHeader;
  }
}
