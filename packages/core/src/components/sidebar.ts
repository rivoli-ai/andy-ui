import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";
import type { IconName } from "../internal/icons.js";
import "./icon.js";
import "./icon-chip.js";
import "./avatar.js";
import "./header.js";
import "./footer.js";

/**
 * `<andy-sidebar>` — collapsible workspace sidebar (`.sidebar`).
 *
 * Composes an `<andy-header>` (brand + collapse toggle) and an `<andy-footer>`
 * around the nav.
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
        <andy-header class="sidebar-header">
          <div class="sidebar-brand">${this.slotTarget("brand")}</div>
          ${this.collapsible
            ? html`<button slot="actions" class="sidebar-collapse-toggle" title="Collapse" aria-label="Collapse sidebar" @click=${this.toggle}>
                <andy-icon name="chevronsLeft" size="sm"></andy-icon>
              </button>`
            : nothing}
        </andy-header>
        <nav class="sidebar-nav">${this.slotTarget()}</nav>
        ${this.hasSlot("footer") ? html`<andy-footer class="sidebar-footer">${this.slotTarget("footer")}</andy-footer>` : nothing}
      </aside>
    `;
  }
}
define("andy-sidebar", AndySidebar);

/**
 * `<andy-sidebar-brand>` — logo mark + wordmark for the sidebar `brand` slot.
 *
 * Composed from Andy-UI parts: an `<andy-icon-chip>` for the mark plus the
 * name/tagline (hidden when the sidebar is collapsed).
 * @slot logo - Optional custom logo, used instead of `icon`.
 */
@customElement("andy-sidebar-brand")
export class AndySidebarBrand extends AndyElement {
  @property() name = "";
  @property() tagline = "";
  /** Built-in icon name for the mark. Ignored when a `logo` is slotted. */
  @property({ reflect: true }) icon: IconName | "" = "box";

  override render() {
    return html`
      <andy-icon-chip variant="solid" icon=${this.icon || nothing}>${this.slotTarget("logo")}</andy-icon-chip>
      <span class="sidebar-brand__text collapsed-hide">
        ${this.name ? html`<span class="sidebar-brand__name">${this.name}</span>` : nothing}
        ${this.tagline ? html`<span class="sidebar-brand__tagline">${this.tagline}</span>` : nothing}
      </span>
    `;
  }
}
define("andy-sidebar-brand", AndySidebarBrand);

/**
 * `<andy-sidebar-user>` — user card for the sidebar `footer` slot.
 *
 * Composed from an `<andy-avatar>` plus name/email (hidden when collapsed).
 */
@customElement("andy-sidebar-user")
export class AndySidebarUser extends AndyElement {
  @property() name = "";
  @property() email = "";
  /** Avatar initials (or slot an image into `<andy-avatar>` via the default slot). */
  @property() avatar = "";

  override render() {
    return html`
      <div class="sidebar-user">
        <andy-avatar>${this.avatar}</andy-avatar>
        <span class="sidebar-user__meta collapsed-hide">
          ${this.name ? html`<span class="sidebar-user__name">${this.name}</span>` : nothing}
          ${this.email ? html`<span class="sidebar-user__email">${this.email}</span>` : nothing}
        </span>
      </div>
    `;
  }
}
define("andy-sidebar-user", AndySidebarUser);

declare global {
  interface HTMLElementTagNameMap {
    "andy-sidebar": AndySidebar;
    "andy-sidebar-brand": AndySidebarBrand;
    "andy-sidebar-user": AndySidebarUser;
  }
}
