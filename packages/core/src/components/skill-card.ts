import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";

/**
 * `<andy-skill-card>` — link-style card with icon, title, description and meta.
 * @slot icon - Optional custom icon (defaults to a file glyph).
 */
@customElement("andy-skill-card")
export class AndySkillCard extends AndyElement {
  @property() heading = "";
  @property() description = "";
  @property() slug = "";
  @property() version = "";
  @property() href = "";

  override render() {
    const inner = html`
      <div class="ds-skill-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
      <div>
        <h3 class="ds-skill-card__title">${this.heading}</h3>
        <p class="ds-skill-card__desc">${this.description}</p>
      </div>
      <div class="ds-skill-card__meta">
        ${this.slug ? html`<code class="ds-skill-card__slug">${this.slug}</code>` : nothing}
        ${this.version ? html`<span class="ds-ver-pill">${this.version}</span>` : nothing}
      </div>
    `;
    return this.href
      ? html`<a class="ds-skill-card" href=${this.href}>${inner}</a>`
      : html`<div class="ds-skill-card">${inner}</div>`;
  }
}

define("andy-skill-card", AndySkillCard);

declare global {
  interface HTMLElementTagNameMap {
    "andy-skill-card": AndySkillCard;
  }
}
