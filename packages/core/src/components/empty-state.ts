import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";

/**
 * `<andy-empty-state>` — empty/zero-data placeholder (`.ds-empty`).
 * @slot icon   - Optional icon glyph.
 * @slot        - Optional action(s) below the copy.
 */
@customElement("andy-empty-state")
export class AndyEmptyState extends AndyElement {
  @property() heading = "";
  @property() copy = "";

  override render() {
    return html`
      <div class="ds-empty">
        <div class="ds-empty__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
          </svg>
        </div>
        ${this.heading ? html`<p class="ds-empty__title">${this.heading}</p>` : nothing}
        ${this.copy ? html`<p class="ds-empty__copy">${this.copy}</p>` : nothing}
        ${this.slotTarget()}
      </div>
    `;
  }
}

define("andy-empty-state", AndyEmptyState);

declare global {
  interface HTMLElementTagNameMap {
    "andy-empty-state": AndyEmptyState;
  }
}
