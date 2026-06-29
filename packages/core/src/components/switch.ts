import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";

/**
 * `<andy-switch>` — toggle switch (`.ds-switch`) with an optional trailing label.
 * @slot - Optional label text shown beside the switch.
 * @fires {CustomEvent<boolean>} andy-change - detail is the new checked state.
 */
@customElement("andy-switch")
export class AndySwitch extends AndyElement {
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  private onChange(e: Event) {
    this.checked = (e.target as HTMLInputElement).checked;
    this.dispatchEvent(new CustomEvent("andy-change", { detail: this.checked, bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <label class="ds-row ds-row--tight" style="cursor:${this.disabled ? "not-allowed" : "pointer"}">
        <span class="ds-switch">
          <input
            type="checkbox"
            role="switch"
            aria-checked=${this.checked ? "true" : "false"}
            .checked=${this.checked}
            ?disabled=${this.disabled}
            @change=${this.onChange}
          />
          <span class="track"></span>
        </span>
        ${this.hasSlot() ? html`<span class="t-label">${this.slotTarget()}</span>` : nothing}
      </label>
    `;
  }
}

define("andy-switch", AndySwitch);

declare global {
  interface HTMLElementTagNameMap {
    "andy-switch": AndySwitch;
  }
}
