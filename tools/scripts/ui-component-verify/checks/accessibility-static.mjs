import { readFile } from 'node:fs/promises';
import { PUBLISHABLE_COMPONENTS, SEVERITY } from '../constants.mjs';

async function readOptional(path) {
  try {
    return await readFile(path, 'utf8');
  } catch {
    return '';
  }
}

/**
 * Static accessibility heuristics on component source (not a replacement for axe).
 * @param {import('../report.mjs').VerificationReport} report
 * @param {Awaited<ReturnType<import('../discover.mjs').discoverComponents>>} components
 */
export async function checkAccessibilityStatic(report, components) {
  for (const comp of components) {
    const src = await readFile(comp.tsx, 'utf8');
    const css = comp.css ? await readOptional(comp.css) : '';
    const strict = PUBLISHABLE_COMPONENTS.has(comp.id);

    if (/<div[^>]*onClick/i.test(src) || /<span[^>]*onClick/i.test(src)) {
      report.add({
        id: comp.id,
        severity: SEVERITY.ERROR,
        category: 'accessibility',
        message: 'Non-semantic element with click handler detected.',
        hint: 'Use <button> or <a> with keyboard support.',
      });
    }

    if (comp.id === 'button') {
      if (!src.includes('<button')) {
        report.add({
          id: comp.id,
          severity: SEVERITY.ERROR,
          category: 'accessibility',
          message: 'Button component should render a native <button>.',
        });
      }
      if (
        !src.includes('focus-visible') &&
        !css.includes('focus-visible') &&
        !css.includes(':disabled')
      ) {
        report.add({
          id: comp.id,
          severity: SEVERITY.WARNING,
          category: 'accessibility',
          message: 'Button source should handle disabled/focus states in CSS or markup.',
        });
      }
    }

    if (src.includes('slot name="icon"') && !src.includes('aria-hidden')) {
      report.add({
        id: comp.id,
        severity: strict ? SEVERITY.WARNING : SEVERITY.INFO,
        category: 'accessibility',
        message: 'Icon slot should be aria-hidden when decorative.',
      });
    }

    if (src.includes('@Prop') && src.includes('disabled') && !src.includes('aria-disabled')) {
      report.add({
        id: comp.id,
        severity: SEVERITY.INFO,
        category: 'accessibility',
        message: 'Consider aria-disabled on custom disabled controls.',
      });
    }
  }

  report.add({
    id: 'library',
    severity: SEVERITY.INFO,
    category: 'accessibility',
    message: 'axe-core WCAG 2.2 AA gate: nx run angular-app-e2e:e2e:a11y',
  });
}
