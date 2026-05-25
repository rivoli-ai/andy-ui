import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { UI_LIB, STORYBOOK_DIR, PUBLISHABLE_COMPONENTS, SEVERITY } from '../constants.mjs';

/**
 * @param {import('../report.mjs').VerificationReport} report
 * @param {Awaited<ReturnType<import('../discover.mjs').discoverComponents>>} components
 */
export async function checkStorybook(report, components) {
  const mainTs = join(STORYBOOK_DIR, 'main.ts');
  const previewTs = join(STORYBOOK_DIR, 'preview.ts');

  try {
    const main = await readFile(mainTs, 'utf8');
    if (!main.includes('addon-a11y')) {
      report.add({
        id: 'library',
        severity: SEVERITY.ERROR,
        category: 'storybook',
        message: 'Storybook main.ts missing @storybook/addon-a11y.',
      });
    }
    if (!main.includes('web-components')) {
      report.add({
        id: 'library',
        severity: SEVERITY.WARNING,
        category: 'storybook',
        message: 'Storybook framework may not be web-components-vite.',
      });
    }
  } catch {
    report.add({
      id: 'library',
      severity: SEVERITY.ERROR,
      category: 'storybook',
      message: 'Missing libs/ui-components/.storybook/main.ts',
    });
    return;
  }

  try {
    const preview = await readFile(previewTs, 'utf8');
    if (!preview.includes('theme.css') && !preview.includes('theme')) {
      report.add({
        id: 'library',
        severity: SEVERITY.WARNING,
        category: 'storybook',
        message: 'Storybook preview may not load design tokens (theme.css).',
      });
    }
    if (!preview.includes('data-theme') && !preview.includes('.dark')) {
      report.add({
        id: 'library',
        severity: SEVERITY.WARNING,
        category: 'storybook',
        message: 'Storybook preview has no light/dark theme decorator.',
      });
    }
  } catch {
    report.add({
      id: 'library',
      severity: SEVERITY.WARNING,
      category: 'storybook',
      message: 'Missing Storybook preview.ts',
    });
  }

  for (const comp of components) {
    const storiesPath = join(comp.dir, `${comp.id}.stories.ts`);
    const strict = PUBLISHABLE_COMPONENTS.has(comp.id);

    try {
      await stat(storiesPath);
    } catch {
      report.add({
        id: comp.id,
        severity: strict ? SEVERITY.ERROR : SEVERITY.WARNING,
        category: 'storybook',
        message: `Missing ${comp.id}.stories.ts`,
        hint: 'Add Storybook stories with variants, responsive layout, and a11y parameters.',
      });
      continue;
    }

    const src = await readFile(storiesPath, 'utf8');
    const storyExports = [...src.matchAll(/export const (\w+)/g)].map((m) => m[1]);

    if (storyExports.length < 2) {
      report.add({
        id: comp.id,
        severity: strict ? SEVERITY.ERROR : SEVERITY.WARNING,
        category: 'storybook',
        message: 'Fewer than two exported stories (variants required).',
      });
    }

    const hasResponsive =
      /layout:\s*['"]padded['"]/i.test(src) ||
      /layout:\s*['"]fullscreen['"]/i.test(src) ||
      /fullWidth|full-width|Matrix|Mobile|Responsive/i.test(src);

    if (!hasResponsive) {
      report.add({
        id: comp.id,
        severity: strict ? SEVERITY.ERROR : SEVERITY.WARNING,
        category: 'storybook',
        message: 'No responsive Storybook story (layout padded/fullscreen or matrix).',
        hint: 'Add FullWidth or Matrix story per figma-integration.md.',
      });
    }

    const hasA11y =
      /tags:\s*\[[^\]]*autodocs/i.test(src) ||
      /parameters:\s*\{[^}]*a11y/i.test(src) ||
      /addon-a11y/i.test(src);

    if (!hasA11y) {
      report.add({
        id: comp.id,
        severity: strict ? SEVERITY.WARNING : SEVERITY.INFO,
        category: 'storybook',
        message: 'Story file lacks explicit a11y/autodocs tags (addon still runs in CI).',
      });
    }
  }
}
