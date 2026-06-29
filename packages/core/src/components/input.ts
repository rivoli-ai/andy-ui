import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";

let inputUid = 0;

/**
 * `<andy-input>` — labelled text field (`.dp-field` + `.dp-input`).
 *
 * @fires {CustomEvent<string>} andy-input  - On every keystroke; detail is the value.
 * @fires {CustomEvent<string>} andy-change - On commit (blur/Enter); detail is the value.
 */
@customElement("andy-input")
export class AndyInput extends AndyElement {
  /** Stable id linking the <label>, <input>, and error message for a11y. */
  private readonly _id = `andy-input-${++inputUid}`;

  @property() label = "";
  @property() value = "";
  @property() placeholder = "";
  @property() type = "text";
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  /** Validation message; presence puts the field into the error state. */
  @property() error = "";

  private onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new CustomEvent("andy-input", { detail: this.value, bubbles: true, composed: true }));
  }
  private onChange() {
    this.dispatchEvent(new CustomEvent("andy-change", { detail: this.value, bubbles: true, composed: true }));
  }

  override render() {
    const errorId = `${this._id}-error`;
    return html`
      <div class="dp-field">
        ${this.label
          ? html`<label class="label" for=${this._id}
              >${this.label}${this.required ? html` <span class="req" aria-hidden="true">*</span>` : nothing}</label
            >`
          : nothing}
        <input
          id=${this._id}
          class="dp-input ${this.error ? "is-error" : ""}"
          type=${this.type}
          .value=${this.value}
          placeholder=${this.placeholder}
          ?required=${this.required}
          ?disabled=${this.disabled}
          aria-invalid=${this.error ? "true" : nothing}
          aria-describedby=${this.error ? errorId : nothing}
          @input=${this.onInput}
          @change=${this.onChange}
        />
        ${this.error ? html`<span class="error-msg" id=${errorId} role="alert">${this.error}</span>` : nothing}
      </div>
    `;
  }
}

define("andy-input", AndyInput);

declare global {
  interface HTMLElementTagNameMap {
    "andy-input": AndyInput;
  }
}
