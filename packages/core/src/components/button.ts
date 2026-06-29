import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";

export type AndyButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "ghost";
export type AndyButtonSize = "sm" | "md" | "lg";

/**
 * `<andy-button>` — the design-system button.
 *
 * @slot - Button label / content.
 * @fires {CustomEvent<void>} andy-click - Fired on activation (suppressed while loading/disabled).
 */
@customElement("andy-button")
export class AndyButton extends AndyElement {
  @property({ reflect: true }) variant: AndyButtonVariant = "primary";
  @property({ reflect: true }) size: AndyButtonSize = "md";
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  /** Native button type, useful inside forms. */
  @property() type: "button" | "submit" | "reset" = "button";

  private onClick(e: Event) {
    if (this.disabled || this.loading) {
      e.stopImmediatePropagation();
      e.preventDefault();
      return;
    }
    this.dispatchEvent(new CustomEvent("andy-click", { bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <button
        class="btn btn-${this.size} btn-${this.variant}"
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        aria-busy=${this.loading ? "true" : nothing}
        @click=${this.onClick}
      >
        ${this.loading ? html`<span class="btn-spinner" aria-hidden="true"></span>` : nothing}
        ${this.slotTarget()}
      </button>
    `;
  }
}

define("andy-button", AndyButton);

declare global {
  interface HTMLElementTagNameMap {
    "andy-button": AndyButton;
  }
}
