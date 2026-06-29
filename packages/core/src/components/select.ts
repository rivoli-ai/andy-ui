import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";

export interface AndySelectOption {
  value: string;
  label: string;
}

let selectUid = 0;

/**
 * `<andy-select>` — styled native select (`.ds-select`).
 *
 * Pass options via the `options` property, or project `<option>` children.
 * @fires {CustomEvent<string>} andy-change - detail is the selected value.
 */
@customElement("andy-select")
export class AndySelect extends AndyElement {
  /** Stable id linking the <label> to the <select> for a11y. */
  private readonly _id = `andy-select-${++selectUid}`;

  @property() label = "";
  @property() value = "";
  @property({ attribute: false }) options: AndySelectOption[] = [];

  private onChange(e: Event) {
    this.value = (e.target as HTMLSelectElement).value;
    this.dispatchEvent(new CustomEvent("andy-change", { detail: this.value, bubbles: true, composed: true }));
  }

  override render() {
    const select = html`
      <select id=${this._id} class="ds-select" .value=${this.value} @change=${this.onChange}>
        ${this.options.map((o) => html`<option value=${o.value}>${o.label}</option>`)}
      </select>
    `;
    return this.label
      ? html`<div class="dp-field"><label class="label" for=${this._id}>${this.label}</label>${select}</div>`
      : select;
  }

  protected override updated(changed: import("lit").PropertyValues) {
    super.updated(changed);
    // Keep the native select in sync when bound via the `value` property.
    const el = this.querySelector("select");
    if (el && el.value !== this.value) el.value = this.value;
  }
}

define("andy-select", AndySelect);

declare global {
  interface HTMLElementTagNameMap {
    "andy-select": AndySelect;
  }
}
