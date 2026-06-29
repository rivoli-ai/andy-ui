import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";
import type { AndyCrumb } from "./breadcrumb.js";
import "./breadcrumb.js";
import "./search-input.js";
import "./theme-toggle.js";

/**
 * `<andy-navbar>` — top navigation bar (`.au-navbar`).
 *
 * A ready-made composition: a breadcrumb on the left, then a search box and a
 * theme toggle on the right. Child events bubble (`andy-navigate`,
 * `andy-input`, `andy-theme-change`), so listen for them on the navbar.
 *
 * @slot actions - Extra content placed before the theme toggle (buttons, avatar…).
 */
@customElement("andy-navbar")
export class AndyNavbar extends AndyElement {
  /** Breadcrumb trail (last item is the current leaf). */
  @property({ attribute: false }) items: AndyCrumb[] = [];
  @property() searchPlaceholder = "Search…";
  @property() searchValue = "";
  /** Hide the built-in search box. */
  @property({ type: Boolean }) noSearch = false;
  /** Hide the built-in theme toggle. */
  @property({ type: Boolean }) noThemeToggle = false;

  override render() {
    return html`
      <div class="au-navbar">
        <div class="au-navbar__left">
          <andy-breadcrumb .items=${this.items}></andy-breadcrumb>
        </div>
        <div class="au-navbar__right">
          ${this.noSearch
            ? nothing
            : html`<span class="au-navbar__search">
                <andy-search-input placeholder=${this.searchPlaceholder} .value=${this.searchValue}></andy-search-input>
              </span>`}
          ${this.slotTarget("actions")}
          ${this.noThemeToggle ? nothing : html`<andy-theme-toggle></andy-theme-toggle>`}
        </div>
      </div>
    `;
  }
}

define("andy-navbar", AndyNavbar);

declare global {
  interface HTMLElementTagNameMap {
    "andy-navbar": AndyNavbar;
  }
}
