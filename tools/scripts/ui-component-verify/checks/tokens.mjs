import { readFile } from 'node:fs/promises';
import { relative } from 'node:path';
import { ROOT, PUBLISHABLE_COMPONENTS, SEVERITY } from '../constants.mjs';
import { scanCss } from '../css-scan.mjs';

/**
 * @param {import('../report.mjs').VerificationReport} report
 * @param {Awaited<ReturnType<import('../discover.mjs').discoverComponents>>} components
 */
export async function checkDesignTokens(report, components) {
  for (const comp of components) {
    if (!comp.css) {
      report.add({
        id: comp.id,
        severity: PUBLISHABLE_COMPONENTS.has(comp.id) ? SEVERITY.WARNING : SEVERITY.INFO,
        category: 'tokens',
        message: 'No component CSS file (token scan skipped).',
      });
      continue;
    }

    const css = await readFile(comp.css, 'utf8');
    const findings = scanCss(css);
    const rel = relative(ROOT, comp.css);
    const strict = PUBLISHABLE_COMPONENTS.has(comp.id);

    for (const h of findings.hex.filter((x) => !x.inFallback)) {
      report.add({
        id: comp.id,
        severity: SEVERITY.ERROR,
        category: 'tokens',
        message: `${rel}:${h.line} hex literal ${h.value}`,
        hint: 'Use var(--theme-*) or var(--button-*) tokens from libs/styles.',
      });
    }

    for (const m of findings.maxWidth) {
      report.add({
        id: comp.id,
        severity: SEVERITY.ERROR,
        category: 'mobile-first',
        message: `${rel}:${m.line} desktop-first media query: ${m.query}`,
        hint: 'Use @media (min-width: …) or @container.',
      });
    }

    for (const h of findings.hoverOnly) {
      report.add({
        id: comp.id,
        severity: SEVERITY.ERROR,
        category: 'accessibility',
        message: `${rel}:${h.line} hover-only affordance on ${h.prop}`,
        hint: 'Mirror styles on :focus-visible.',
      });
    }

    for (const p of findings.rawPx) {
      report.add({
        id: comp.id,
        severity: strict ? SEVERITY.ERROR : SEVERITY.WARNING,
        category: 'tokens',
        message: `${rel}:${p.line} hardcoded px value ${p.value}`,
        hint: 'Use rem via --space-* / --font-* / --stroke-* tokens (16px root).',
      });
    }

    for (const c of findings.rawRgb) {
      report.add({
        id: comp.id,
        severity: strict ? SEVERITY.ERROR : SEVERITY.WARNING,
        category: 'tokens',
        message: `${rel}:${c.line} raw color function in component CSS`,
        hint: 'Use var(--theme-*) or add --shadow-* tokens in libs/styles (no raw rgba/hsl).',
      });
    }

    for (const n of findings.nonToken) {
      report.add({
        id: comp.id,
        severity: strict ? SEVERITY.WARNING : SEVERITY.INFO,
        category: 'tokens',
        message: `${rel}:${n.line} non-token ${n.prop}: ${n.value}`,
        hint: 'Add a token in libs/styles and reference var(--*).',
      });
    }
  }
}
