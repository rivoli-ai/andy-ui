import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";

/**
 * `<andy-app-shell>` — sidebar + main-column application layout.
 *
 * Regions (light-DOM slots):
 * @slot sidebar - The `<andy-sidebar>`.
 * @slot header  - The `<andy-header>` / `<andy-navbar>` (top of the main column).
 * @slot         - The scrolling page content.
 *
 * Listens for `andy-collapse-toggle` from a descendant sidebar and mirrors the
 * collapsed state onto itself so the grid animates between the full and
 * collapsed sidebar widths.
 */
@customElement("andy-app-shell")
export class AndyAppShell extends AndyElement {
  @property({ type: Boolean, reflect: true }) collapsed = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("andy-collapse-toggle", this._onToggle as EventListener);
  }
  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("andy-collapse-toggle", this._onToggle as EventListener);
  }
  private _onToggle = (e: CustomEvent<boolean>) => {
    this.collapsed = e.detail;
  };

  override render() {
    return html`
      ${this.slotTarget("sidebar")}
      <div class="app-col">
        ${this.slotTarget("header")}
        <div class="app-scroll">${this.slotTarget()}</div>
      </div>
    `;
  }
}
define("andy-app-shell", AndyAppShell);

/**
 * `<andy-nav-section>` — titled group of nav items (`.nav-section`).
 * @slot - `<andy-nav-item>` rows (wrapped in a `.nav-list`).
 */
@customElement("andy-nav-section")
export class AndyNavSection extends AndyElement {
  @property() heading = "";

  override render() {
    return html`
      <div class="nav-section">
        ${this.heading ? html`<p class="nav-section-title collapsed-hide">${this.heading}</p>` : nothing}
        <div class="nav-list" role="list">${this.slotTarget()}</div>
      </div>
    `;
  }
}
define("andy-nav-section", AndyNavSection);

declare global {
  interface HTMLElementTagNameMap {
    "andy-app-shell": AndyAppShell;
    "andy-nav-section": AndyNavSection;
  }
}
