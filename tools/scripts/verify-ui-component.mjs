#!/usr/bin/env node
/**
 * Reusable UI component verification for @omnifex/ui-components.
 *
 * Usage:
 *   node tools/scripts/verify-ui-component.mjs [options]
 *
 * Options:
 *   --component=<id>   Verify one component folder (e.g. button)
 *   --static           Static checks only (no nx / e2e)
 *   --with-nx          Run stylelint, audit, test, build (default unless --static)
 *   --with-e2e         Also run Playwright @a11y @responsive @touch (slow)
 *   --skip-build       Skip build + publish artifact checks
 *   --fail-on-error    Exit 1 when any error-severity finding exists
 *   --fail-fast        Exit on first error while printing
 *
 * @see docs/standards/component-verification.md
 */

import { discoverComponents } from './ui-component-verify/discover.mjs';
import { VerificationReport } from './ui-component-verify/report.mjs';
import { SEVERITY } from './ui-component-verify/constants.mjs';
import { checkDesignTokens } from './ui-component-verify/checks/tokens.mjs';
import { checkStorybook } from './ui-component-verify/checks/storybook.mjs';
import { checkUnitTests } from './ui-component-verify/checks/tests.mjs';
import { checkAccessibilityStatic } from './ui-component-verify/checks/accessibility-static.mjs';
import { checkPublishability } from './ui-component-verify/checks/publish.mjs';
import { runNxGates } from './ui-component-verify/checks/nx-runner.mjs';

function parseArgs(argv) {
  const opts = {
    component: null,
    static: false,
    withNx: true,
    withE2e: false,
    skipBuild: false,
    failOnError: false,
    failFast: false,
  };

  for (const arg of argv) {
    if (arg === '--static') {
      opts.static = true;
      opts.withNx = false;
    } else if (arg === '--with-nx') {
      opts.withNx = true;
    } else if (arg === '--with-e2e') {
      opts.withE2e = true;
      opts.withNx = true;
    } else if (arg === '--skip-build') {
      opts.skipBuild = true;
    } else if (arg === '--fail-on-error') {
      opts.failOnError = true;
    } else if (arg === '--fail-fast') {
      opts.failFast = true;
      opts.failOnError = true;
    } else if (arg.startsWith('--component=')) {
      opts.component = arg.slice('--component='.length);
    } else if (arg === '--help' || arg === '-h') {
      console.log(`UI component verification

Options:
  --component=<id>   Limit to one component (e.g. button)
  --static           Static analysis only
  --with-nx          Run nx stylelint, audit, test, build (default)
  --with-e2e         Include Playwright a11y/responsive/touch gates
  --skip-build       Skip build and dist publish checks
  --fail-on-error    Non-zero exit on errors
  --fail-fast        Stop at first error

Nx:
  nx run @omnifex/ui-components:verify
  nx run @omnifex/ui-components:verify -- --component=button --with-e2e
`);
      process.exit(0);
    }
  }

  return opts;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const report = new VerificationReport();

  console.log('Discovering components…');
  const components = await discoverComponents(opts.component);
  if (components.length === 0) {
    console.error(
      opts.component
        ? `No component "${opts.component}" found under libs/ui-components/src/lib`
        : 'No components discovered',
    );
    process.exit(2);
  }

  console.log(`Found ${components.length}: ${components.map((c) => c.id).join(', ')}\n`);

  console.log('▶ Static: design tokens & mobile-first');
  await checkDesignTokens(report, components);

  console.log('▶ Static: Storybook');
  await checkStorybook(report, components);

  console.log('▶ Static: unit tests');
  await checkUnitTests(report, components);

  console.log('▶ Static: accessibility (source)');
  await checkAccessibilityStatic(report, components);

  console.log('▶ Static: publishability');
  await checkPublishability(report, { skipBuild: opts.skipBuild || opts.static });

  if (opts.withNx) {
    console.log('▶ Nx gates (stylelint, audit, test, build…)');
    await runNxGates(report, {
      withE2e: opts.withE2e,
      skipBuild: opts.skipBuild,
    });
  }

  report.printSummary({ failFast: opts.failFast });

  if (opts.failOnError && report.hasErrors()) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
