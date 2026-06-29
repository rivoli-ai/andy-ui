import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";

/**
 * `<andy-chat>` — conversation container (`.ds-chat`).
 * @slot - `<andy-message>` children.
 */
@customElement("andy-chat")
export class AndyChat extends AndyElement {
  override render() {
    return html`<div class="ds-chat">${this.slotTarget()}</div>`;
  }
}
define("andy-chat", AndyChat);

/**
 * `<andy-message>` — chat bubble (`.ds-msg`).
 * @slot - Message body.
 */
@customElement("andy-message")
export class AndyMessage extends AndyElement {
  @property({ reflect: true }) kind: "user" | "agent" = "user";
  @property() author = "";
  @property() avatar = "";
  @property() time = "";

  override render() {
    return html`
      <div class="ds-msg ${this.kind}">
        <div class="ds-avatar sm round">${this.avatar}</div>
        <div class="ds-msg__bubble">
          ${this.author ? html`<p class="ds-msg__name">${this.author}</p>` : nothing}
          <div class="ds-msg__text">${this.slotTarget()}</div>
          ${this.time ? html`<div class="ds-msg__time">${this.time}</div>` : nothing}
        </div>
      </div>
    `;
  }
}
define("andy-message", AndyMessage);

/**
 * `<andy-typing>` — animated “agent is typing” indicator (`.ds-typing`).
 */
@customElement("andy-typing")
export class AndyTyping extends AndyElement {
  override render() {
    return html`<span class="ds-typing"><span></span><span></span><span></span></span>`;
  }
}
define("andy-typing", AndyTyping);

/**
 * `<andy-session>` — session list row (`.ds-session`).
 */
@customElement("andy-session")
export class AndySession extends AndyElement {
  @property() name = "";
  @property() description = "";
  @property() meta = "";
  @property({ type: Boolean, reflect: true }) active = false;

  override render() {
    return html`
      <div class="ds-session ${this.active ? "active" : ""}">
        <span class="live"></span>
        <div>
          <div class="ds-session__name">${this.name}</div>
          ${this.description ? html`<div class="ds-session__desc">${this.description}</div>` : nothing}
          ${this.meta ? html`<div class="ds-session__meta">${this.meta}</div>` : nothing}
        </div>
      </div>
    `;
  }
}
define("andy-session", AndySession);

declare global {
  interface HTMLElementTagNameMap {
    "andy-chat": AndyChat;
    "andy-message": AndyMessage;
    "andy-typing": AndyTyping;
    "andy-session": AndySession;
  }
}
