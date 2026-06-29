import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AndyElement, define } from "../internal/base.js";

export interface AndyColumn {
  key: string;
  header: string;
  align?: "left" | "right";
  /** Render this column's cells in monospace. */
  mono?: boolean;
  /** Render this column's cells with emphasis. */
  strong?: boolean;
}

export type AndyRow = Record<string, unknown>;

/**
 * `<andy-table>` — canonical data table (`.ds-table`).
 *
 * Provide `columns` and `rows`. For rich cells (pills, action buttons) you can
 * also use the `.ds-table` CSS classes directly — see the docs.
 */
@customElement("andy-table")
export class AndyTable extends AndyElement {
  @property({ attribute: false }) columns: AndyColumn[] = [];
  @property({ attribute: false }) rows: AndyRow[] = [];

  private cellClass(c: AndyColumn): string {
    return [c.mono ? "cell-mono" : "", c.strong ? "cell-strong" : ""].filter(Boolean).join(" ");
  }

  override render() {
    return html`
      <div class="ds-table-panel">
        <table class="ds-table">
          <thead>
            <tr>
              ${this.columns.map((c) => html`<th style=${c.align === "right" ? "text-align:right" : ""}>${c.header}</th>`)}
            </tr>
          </thead>
          <tbody>
            ${this.rows.map(
              (row) => html`<tr>
                ${this.columns.map(
                  (c) => html`<td class=${this.cellClass(c)} style=${c.align === "right" ? "text-align:right" : ""}>${String(row[c.key] ?? "")}</td>`
                )}
              </tr>`
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}

define("andy-table", AndyTable);

declare global {
  interface HTMLElementTagNameMap {
    "andy-table": AndyTable;
  }
}
