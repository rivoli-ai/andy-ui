import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";
import { icons } from "../internal/icons.js";

/**
 * `<andy-search-input>` — search box with a leading magnifier icon.
 * @fires {CustomEvent<string>} andy-input - detail is the current query.
 */
@customElement("andy-search-input")
export class AndySearchInput extends AndyElement {
  @property() value = "";
  @property() placeholder = "Search…";

  private onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new CustomEvent("andy-input", { detail: this.value, bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <div class="search-input-wrapper">
        <span class="search-icon">${icons.search()}</span>
        <input
          class="search-input"
          type="search"
          .value=${this.value}
          placeholder=${this.placeholder}
          @input=${this.onInput}
        />
      </div>
    `;
  }
}

define("andy-search-input", AndySearchInput);

declare global {
  interface HTMLElementTagNameMap {
    "andy-search-input": AndySearchInput;
  }
}
