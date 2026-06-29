import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";

export type AndyStatusKind = "healthy" | "error" | "disabled" | "unknown";

/**
 * `<andy-status>` — status pill with a leading dot.
 * @slot - Status label.
 */
@customElement("andy-status")
export class AndyStatus extends AndyElement {
  @property({ reflect: true }) status: AndyStatusKind = "unknown";

  override render() {
    return html`<span class="ds-status ${this.status}"><span class="dot"></span>${this.slotTarget()}</span>`;
  }
}
define("andy-status", AndyStatus);

/**
 * `<andy-version-pill>` — monospace version tag.
 * @slot - Version string, e.g. `1.3.0`.
 */
@customElement("andy-version-pill")
export class AndyVersionPill extends AndyElement {
  override render() {
    return html`<span class="ds-ver-pill">${this.slotTarget()}</span>`;
  }
}
define("andy-version-pill", AndyVersionPill);

declare global {
  interface HTMLElementTagNameMap {
    "andy-status": AndyStatus;
    "andy-version-pill": AndyVersionPill;
  }
}
