import { html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";
import { icons } from "../internal/icons.js";

/**
 * `<andy-key-box>` — secret/API-key row with reveal + copy (`.ds-key-box`).
 * @fires {CustomEvent<void>} andy-copy - when the value is copied.
 */
@customElement("andy-key-box")
export class AndyKeyBox extends AndyElement {
  /** The full secret value. */
  @property() value = "";
  /** Masked display; defaults to a derived mask of `value`. */
  @property() masked = "";

  @state() private revealed = false;
  @state() private copied = false;

  private get maskedText(): string {
    if (this.masked) return this.masked;
    const tail = this.value.slice(-4);
    return `${this.value.slice(0, 9)}${"•".repeat(20)}${tail}`;
  }

  private toggle() {
    this.revealed = !this.revealed;
  }

  private async copy() {
    try {
      await navigator.clipboard?.writeText(this.value);
    } catch {
      /* clipboard unavailable */
    }
    this.copied = true;
    this.dispatchEvent(new CustomEvent("andy-copy", { bubbles: true, composed: true }));
    setTimeout(() => (this.copied = false), 1400);
  }

  override render() {
    return html`
      <div class="ds-key-box">
        <code>${this.revealed ? this.value : this.maskedText}</code>
        <button class="ds-icon-btn" title="Reveal / hide" @click=${this.toggle}>${icons.eye()}</button>
        <button class="ds-key-copy ${this.copied ? "is-copied" : ""}" @click=${this.copy}>
          ${icons.copy()}<span>${this.copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
    `;
  }
}

define("andy-key-box", AndyKeyBox);

declare global {
  interface HTMLElementTagNameMap {
    "andy-key-box": AndyKeyBox;
  }
}
