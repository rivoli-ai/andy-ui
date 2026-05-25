import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { UI_LIB, UI_DIST, SEVERITY } from '../constants.mjs';

/**
 * @param {import('../report.mjs').VerificationReport} report
 * @param {{ skipBuild?: boolean }} options
 */
export async function checkPublishability(report, { skipBuild = false } = {}) {
  const pkgPath = join(UI_LIB, 'package.json');
  let pkg;

  try {
    pkg = JSON.parse(await readFile(pkgPath, 'utf8'));
  } catch {
    report.add({
      id: 'library',
      severity: SEVERITY.ERROR,
      category: 'publish',
      message: 'Cannot read libs/ui-components/package.json',
    });
    return;
  }

  if (!pkg.exports?.['.']?.import || !pkg.exports?.['.']?.require) {
    report.add({
      id: 'library',
      severity: SEVERITY.ERROR,
      category: 'publish',
      message: 'package.json missing dual ESM/CJS exports for "."',
    });
  }

  if (!pkg.exports?.['./loader']) {
    report.add({
      id: 'library',
      severity: SEVERITY.WARNING,
      category: 'publish',
      message: 'package.json missing ./loader export for framework registration.',
    });
  }

  if (!Array.isArray(pkg.files) || !pkg.files.includes('dist/')) {
    report.add({
      id: 'library',
      severity: SEVERITY.WARNING,
      category: 'publish',
      message: 'package.json files[] should include dist/ and loader/.',
    });
  }

  if (skipBuild) {
    report.add({
      id: 'library',
      severity: SEVERITY.INFO,
      category: 'publish',
      message: 'Build output check skipped (--skip-build).',
    });
    return;
  }

  const requiredPaths = [
    join(UI_DIST, 'dist'),
    join(UI_DIST, 'loader', 'index.js'),
    join(UI_DIST, 'package.json'),
  ];

  for (const p of requiredPaths) {
    try {
      await stat(p);
    } catch {
      report.add({
        id: 'library',
        severity: SEVERITY.ERROR,
        category: 'publish',
        message: `Missing publish artifact: ${p}`,
        hint: 'Run nx run @omnifex/ui-components:build',
      });
    }
  }

  try {
    const builtPkg = JSON.parse(await readFile(join(UI_DIST, 'package.json'), 'utf8'));
    if (!builtPkg.module && !builtPkg.exports) {
      report.add({
        id: 'library',
        severity: SEVERITY.WARNING,
        category: 'publish',
        message: 'Published package.json may lack module/export metadata.',
      });
    }
  } catch {
    /* already reported */
  }
}
