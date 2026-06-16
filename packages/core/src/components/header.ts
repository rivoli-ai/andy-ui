import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";
import type { IconName } from "../internal/icons.js";
import "./icon-chip.js";

/**
 * `<andy-header>` — brand header: a logo mark (`<andy-icon-chip>`) plus a name
 * and tagline. Designed for the `<andy-sidebar>` `brand` slot; the text hides
 * when the sidebar is collapsed.
 *
 * @slot logo - Optional custom logo, used instead of `icon`.
 */
@customElement("andy-header")
export class AndyHeader extends AndyElement {
  @property() name = "";
  @property() tagline = "";
  /** Built-in icon name for the mark. Ignored when a `logo` is slotted. */
  @property({ reflect: true }) icon: IconName | "" = "box";

  override render() {
    return html`
      <div class="sidebar-brand">
        <andy-icon-chip variant="solid" icon=${this.icon || nothing}>${this.slotTarget("logo")}</andy-icon-chip>
        <span class="sidebar-brand__text collapsed-hide">
          ${this.name ? html`<span class="sidebar-brand__name">${this.name}</span>` : nothing}
          ${this.tagline ? html`<span class="sidebar-brand__tagline">${this.tagline}</span>` : nothing}
        </span>
      </div>
    `;
  }
}

define("andy-header", AndyHeader);

declare global {
  interface HTMLElementTagNameMap {
    "andy-header": AndyHeader;
  }
}
