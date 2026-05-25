import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { UI_LIB, PUBLISHABLE_COMPONENTS, SEVERITY } from '../constants.mjs';

/**
 * @param {import('../report.mjs').VerificationReport} report
 * @param {Awaited<ReturnType<import('../discover.mjs').discoverComponents>>} components
 */
export async function checkUnitTests(report, components) {
  for (const comp of components) {
    const specTsx = join(comp.dir, `${comp.id}.spec.tsx`);
    const specTs = join(comp.dir, `${comp.id}.spec.ts`);
    const strict = PUBLISHABLE_COMPONENTS.has(comp.id);

    let found = false;
    for (const p of [specTsx, specTs]) {
      try {
        await stat(p);
        found = true;
        break;
      } catch {
        /* continue */
      }
    }

    if (!found) {
      report.add({
        id: comp.id,
        severity: strict ? SEVERITY.ERROR : SEVERITY.WARNING,
        category: 'testing',
        message: 'Missing unit spec (*.spec.tsx or *.spec.ts).',
        hint: 'Add Stencil/Jest tests with newSpecPage.',
      });
    }
  }

  report.add({
    id: 'library',
    severity: SEVERITY.INFO,
    category: 'testing',
    message:
      'Responsive, touch-target, and axe checks run via Playwright e2e (use --with-e2e).',
    hint: 'nx run angular-app-e2e:e2e:responsive && nx run angular-app-e2e:e2e:a11y',
  });

  const visualTarget = join(UI_LIB, 'project.json');
  try {
    const raw = await readFile(visualTarget, 'utf8');
    if (!raw.includes('test-storybook') && !raw.includes('visual')) {
      report.add({
        id: 'library',
        severity: SEVERITY.INFO,
        category: 'testing',
        message: 'Visual regression (test-storybook:visual) not configured yet.',
        hint: 'See docs/roadmap/BACKLOG.md UI-8 Phase 2.',
      });
    }
  } catch {
    /* ignore */
  }
}
