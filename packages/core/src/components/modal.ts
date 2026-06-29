import { html, nothing, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";
import { icons } from "../internal/icons.js";

let modalUid = 0;

/** Elements that can receive focus inside the dialog (for the focus trap). */
const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * `<andy-modal>` — dialog with overlay (`.modal-overlay` / `.modal-content`).
 *
 * @slot        - Modal body.
 * @slot footer - Footer actions.
 * @fires {CustomEvent<void>} andy-close - when dismissed (backdrop, ✕, or Escape).
 */
@customElement("andy-modal")
export class AndyModal extends AndyElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property() heading = "";
  /** Disable closing on backdrop click / Escape. */
  @property({ type: Boolean }) persistent = false;

  private readonly _titleId = `andy-modal-${++modalUid}-title`;
  /** Element focused before the dialog opened, restored on close. */
  private _returnFocus: HTMLElement | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    this._onKey = this._onKey.bind(this);
    document.addEventListener("keydown", this._onKey);
  }
  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("keydown", this._onKey);
    // Don't leave the page scroll-locked if we're torn down while open.
    if (this.open) document.body.style.overflow = "";
  }

  private _onKey(e: KeyboardEvent) {
    if (!this.open) return;
    if (e.key === "Escape" && !this.persistent) {
      this.close();
      return;
    }
    if (e.key === "Tab") this._trapTab(e);
  }

  /** Keep Tab focus cycling inside the dialog. */
  private _trapTab(e: KeyboardEvent) {
    const dialog = this.querySelector<HTMLElement>(".modal-content");
    if (!dialog) return;
    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (el) => el.offsetParent !== null || el === document.activeElement
    );
    const first = focusable[0] ?? dialog;
    const last = focusable[focusable.length - 1] ?? dialog;
    const active = document.activeElement;
    if (!dialog.contains(active)) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    if (!changed.has("open")) return;
    if (this.open) {
      this._returnFocus = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      this.updateComplete.then(() => {
        const dialog = this.querySelector<HTMLElement>(".modal-content");
        const target = dialog?.querySelector<HTMLElement>(FOCUSABLE) ?? dialog;
        target?.focus();
      });
    } else if (changed.get("open")) {
      // Transitioned from open -> closed.
      document.body.style.overflow = "";
      this._returnFocus?.focus?.();
      this._returnFocus = null;
    }
  }

  close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent("andy-close", { bubbles: true, composed: true }));
  }

  private onBackdrop(e: Event) {
    if (e.target === e.currentTarget && !this.persistent) this.close();
  }

  override render() {
    if (!this.open) return nothing;
    // Footer content is whatever the author slotted; rendered as-is below body.
    return html`
      <div class="modal-overlay" style="position:fixed" @click=${this.onBackdrop}>
        <div
          class="modal-content"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
          aria-labelledby=${this.heading ? this._titleId : nothing}
          aria-label=${this.heading ? nothing : "Dialog"}
        >
          <div class="modal-header">
            <h3 id=${this.heading ? this._titleId : nothing}>${this.heading}</h3>
            <button class="modal-close" aria-label="Close" @click=${this.close}>${icons.close()}</button>
          </div>
          <div class="modal-body">${this.slotTarget()}</div>
        </div>
      </div>
    `;
  }
}

define("andy-modal", AndyModal);

declare global {
  interface HTMLElementTagNameMap {
    "andy-modal": AndyModal;
  }
}
