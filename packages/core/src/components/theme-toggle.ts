import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";
import { icons } from "../internal/icons.js";
import { getTheme, toggleTheme, type AndyTheme } from "../internal/theme.js";

/**
 * `<andy-theme-toggle>` — light/dark switch that drives `<html data-theme>`.
 * @fires {CustomEvent<AndyTheme>} andy-theme-change
 */
@customElement("andy-theme-toggle")
export class AndyThemeToggle extends AndyElement {
  @state() private theme: AndyTheme = getTheme();

  private flip() {
    this.theme = toggleTheme();
    this.dispatchEvent(new CustomEvent("andy-theme-change", { detail: this.theme, bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <button
        class="ds-theme-toggle"
        aria-label="Toggle theme"
        aria-pressed=${this.theme === "dark" ? "true" : "false"}
        @click=${this.flip}
      >
        <span class="sun">${icons.sun()}</span>
        <span class="moon">${icons.moon()}</span>
      </button>
    `;
  }
}

define("andy-theme-toggle", AndyThemeToggle);

declare global {
  interface HTMLElementTagNameMap {
    "andy-theme-toggle": AndyThemeToggle;
  }
}
