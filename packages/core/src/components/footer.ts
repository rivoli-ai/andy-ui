import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";
import "./avatar.js";

/**
 * `<andy-footer>` — user card: an `<andy-avatar>` plus a name and email.
 * Designed for the `<andy-sidebar>` `footer` slot; the text hides when the
 * sidebar is collapsed.
 */
@customElement("andy-footer")
export class AndyFooter extends AndyElement {
  @property() name = "";
  @property() email = "";
  /** Avatar initials (or slot an image into `<andy-avatar>` via `avatar` slot). */
  @property() avatar = "";

  override render() {
    return html`
      <div class="sidebar-user">
        <andy-avatar>${this.avatar}${this.slotTarget("avatar")}</andy-avatar>
        <span class="sidebar-user__meta collapsed-hide">
          ${this.name ? html`<span class="sidebar-user__name">${this.name}</span>` : nothing}
          ${this.email ? html`<span class="sidebar-user__email">${this.email}</span>` : nothing}
        </span>
      </div>
    `;
  }
}

define("andy-footer", AndyFooter);

declare global {
  interface HTMLElementTagNameMap {
    "andy-footer": AndyFooter;
  }
}
