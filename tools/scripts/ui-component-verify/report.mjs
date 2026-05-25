import { SEVERITY } from './constants.mjs';

/**
 * @typedef {{ id: string, severity: string, category: string, message: string, hint?: string }} Finding
 */

export class VerificationReport {
  constructor() {
    /** @type {Finding[]} */
    this.findings = [];
  }

  /**
   * @param {Omit<Finding, 'id'> & { id?: string }} item
   */
  add(item) {
    this.findings.push({
      id: item.id ?? 'library',
      severity: item.severity,
      category: item.category,
      message: item.message,
      hint: item.hint,
    });
  }

  get counts() {
    return this.findings.reduce(
      (acc, f) => {
        acc[f.severity] = (acc[f.severity] ?? 0) + 1;
        return acc;
      },
      { error: 0, warning: 0, info: 0 },
    );
  }

  hasErrors() {
    return this.counts.error > 0;
  }

  printSummary({ failFast = false } = {}) {
    const byCategory = new Map();
    for (const f of this.findings) {
      const key = `${f.severity} · ${f.category}`;
      if (!byCategory.has(key)) byCategory.set(key, []);
      byCategory.get(key).push(f);
    }

    console.log('\n── UI component verification ──\n');

    for (const [key, items] of [...byCategory.entries()].sort()) {
      const icon =
        key.startsWith('error') ? '✖' : key.startsWith('warning') ? '⚠' : 'ℹ';
      console.log(`${icon} ${key} (${items.length})`);
      for (const item of items) {
        const scope = item.id === 'library' ? '' : `[${item.id}] `;
        console.log(`    ${scope}${item.message}`);
        if (item.hint) console.log(`      → ${item.hint}`);
        if (failFast && item.severity === SEVERITY.ERROR) {
          console.error('\nFail-fast: stopping on first error.\n');
          process.exit(1);
        }
      }
      console.log('');
    }

    const { error, warning, info } = this.counts;
    console.log(
      `Totals: ${error} error(s), ${warning} warning(s), ${info} info(s)\n`,
    );
  }
}
