import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";

export interface AndyCrumb {
  label: string;
  href?: string;
}

/**
 * `<andy-breadcrumb>` — path breadcrumb (`.dp-breadcrumb`).
 *
 * Provide `items`; the last item renders as the current leaf.
 * @fires {CustomEvent<AndyCrumb>} andy-navigate - when a crumb is clicked.
 */
@customElement("andy-breadcrumb")
export class AndyBreadcrumb extends AndyElement {
  @property({ attribute: false }) items: AndyCrumb[] = [];

  private go(item: AndyCrumb, e: Event) {
    if (!item.href) e.preventDefault();
    this.dispatchEvent(new CustomEvent("andy-navigate", { detail: item, bubbles: true, composed: true }));
  }

  override render() {
    const last = this.items.length - 1;
    return html`
      <nav class="dp-breadcrumb">
        ${this.items.map((item, i) =>
          i === last
            ? html`<span class="leaf">${item.label}</span>`
            : html`<a href=${item.href ?? "#"} @click=${(e: Event) => this.go(item, e)}>${item.label}</a><span class="sep">/</span>`
        )}
      </nav>
    `;
  }
}

define("andy-breadcrumb", AndyBreadcrumb);

declare global {
  interface HTMLElementTagNameMap {
    "andy-breadcrumb": AndyBreadcrumb;
  }
}
