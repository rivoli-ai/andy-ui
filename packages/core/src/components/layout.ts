import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";

/**
 * `<andy-app-shell>` — sidebar + main-column application layout.
 *
 * Regions (light-DOM slots):
 * @slot sidebar - The `<andy-sidebar>`.
 * @slot header  - The `<andy-header>` (sticky, top of the main column).
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
 * `<andy-sidebar>` — collapsible workspace sidebar (`.sidebar`).
 *
 * @slot brand  - Brand mark / wordmark (shown in the sidebar header).
 * @slot        - Nav sections (`<andy-nav-section>` / `<andy-nav-list>`).
 * @slot footer - Footer content (user card, sign-out, …).
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
            <div class="sidebar-brand">${this.slotTarget("brand")}</div>
            ${this.collapsible
              ? html`<button class="sidebar-collapse-toggle" title="Collapse" aria-label="Collapse sidebar" @click=${this.toggle}>
                  <svg class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 19l-7-7 7-7M19 19l-7-7 7-7" /></svg>
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
    "andy-app-shell": AndyAppShell;
    "andy-sidebar": AndySidebar;
    "andy-nav-section": AndyNavSection;
    "andy-header": AndyHeader;
  }
}
