import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";
import "./icon.js";

/**
 * `<andy-sidebar>` — collapsible workspace sidebar (`.sidebar`).
 *
 * Compose it from Andy-UI components: `<andy-header slot="brand">` for the brand
 * header, `<andy-nav-section>` / `<andy-nav-item>` for navigation, and
 * `<andy-footer slot="footer">` for the user card.
 *
 * @slot brand  - Brand header (`<andy-header>`).
 * @slot        - Nav sections.
 * @slot footer - Footer card (`<andy-footer>`).
 * @fires {CustomEvent<boolean>} andy-collapse-toggle - new collapsed state.
 */
@customElement("andy-sidebar")
export class AndySidebar extends AndyElement {
  @property({ type: Boolean, reflect: true }) collapsed = false;
  /** Show the collapse toggle button in the header. */
  @property({ type: Boolean }) collapsible = true;

  private toggle() {
    this.collapsed = !this.collapsed;
    this.dispatchEvent(
      new CustomEvent("andy-collapse-toggle", { detail: this.collapsed, bubbles: true, composed: true })
    );
  }

  override render() {
    return html`
      <aside class="sidebar ${this.collapsed ? "collapsed" : ""}">
        <div class="sidebar-header">
          <div class="sidebar-header__top">
            ${this.slotTarget("brand")}
            ${this.collapsible
              ? html`<button class="sidebar-collapse-toggle" title="Collapse" aria-label="Collapse sidebar" @click=${this.toggle}>
                  <andy-icon name="chevronsLeft" size="sm"></andy-icon>
                </button>`
              : nothing}
          </div>
        </div>
        <nav class="sidebar-nav">${this.slotTarget()}</nav>
        ${this.hasSlot("footer") ? html`<div class="sidebar-footer">${this.slotTarget("footer")}</div>` : nothing}
      </aside>
    `;
  }
}

define("andy-sidebar", AndySidebar);

declare global {
  interface HTMLElementTagNameMap {
    "andy-sidebar": AndySidebar;
  }
}
