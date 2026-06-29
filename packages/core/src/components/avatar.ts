import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";

export type AndyAvatarSize = "sm" | "md" | "lg";

/**
 * `<andy-avatar>` — initials/icon avatar (`.ds-avatar`).
 * @slot - Initials or an icon.
 */
@customElement("andy-avatar")
export class AndyAvatar extends AndyElement {
  @property({ reflect: true }) size: AndyAvatarSize = "md";
  @property({ type: Boolean, reflect: true }) round = false;

  override render() {
    return html`<div class="ds-avatar ${this.size} ${this.round ? "round" : ""}">${this.slotTarget()}</div>`;
  }
}

define("andy-avatar", AndyAvatar);

declare global {
  interface HTMLElementTagNameMap {
    "andy-avatar": AndyAvatar;
  }
}
