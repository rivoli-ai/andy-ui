import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";

export interface AndyTab {
  id: string;
  label: string;
  /** Optional count badge. */
  count?: number;
}

export type AndyTabsVariant = "segment" | "provider";

/**
 * `<andy-tabs>` — segmented control / provider tabs.
 *
 * @fires {CustomEvent<string>} andy-change - detail is the selected tab id.
 */
@customElement("andy-tabs")
export class AndyTabs extends AndyElement {
  @property({ attribute: false }) tabs: AndyTab[] = [];
  @property() active = "";
  @property({ reflect: true }) variant: AndyTabsVariant = "segment";

  private select(id: string) {
    if (id === this.active) return;
    this.active = id;
    this.dispatchEvent(new CustomEvent("andy-change", { detail: id, bubbles: true, composed: true }));
  }

  /** Roving keyboard navigation across the tablist (WAI-ARIA Tabs pattern). */
  private onKeydown(e: KeyboardEvent) {
    const ids = this.tabs.map((t) => t.id);
    if (!ids.length) return;
    const current = this.active || ids[0];
    const idx = ids.indexOf(current);
    if (idx < 0) return;
    let next = idx;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = (idx + 1) % ids.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = (idx - 1 + ids.length) % ids.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = ids.length - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    this.select(ids[next]);
    this.updateComplete.then(() => {
      this.querySelector<HTMLElement>(`[data-tab-id="${ids[next]}"]`)?.focus();
    });
  }

  override render() {
    const active = this.active || this.tabs[0]?.id;
    const isProvider = this.variant === "provider";
    const listClass = isProvider ? "provider-tabs" : "ds-segment";
    const btnClass = isProvider ? "provider-tab" : "ds-segment-btn";
    return html`
      <div class=${listClass} role="tablist" @keydown=${this.onKeydown}>
        ${this.tabs.map((t) => {
          const selected = t.id === active;
          return html`<button
            class="${btnClass} ${selected ? "active" : ""}"
            role="tab"
            data-tab-id=${t.id}
            aria-selected=${selected ? "true" : "false"}
            tabindex=${selected ? 0 : -1}
            @click=${() => this.select(t.id)}
          >
            ${t.label}${isProvider && t.count != null ? html` <span class="tab-count">${t.count}</span>` : nothing}
          </button>`;
        })}
      </div>
    `;
  }
}

define("andy-tabs", AndyTabs);

declare global {
  interface HTMLElementTagNameMap {
    "andy-tabs": AndyTabs;
  }
}
