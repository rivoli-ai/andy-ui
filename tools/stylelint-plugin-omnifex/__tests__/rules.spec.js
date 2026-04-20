'use strict';

/**
 * Minimal test harness for the Omnifex stylelint rules.
 *
 * Runs without a test framework: `node __tests__/rules.spec.js`.
 * Exits non-zero on failure so CI can gate on it.
 *
 * Requires stylelint to be installed (peer dep). The test is skipped with a
 * clear message when stylelint is absent, so the harness does not fail
 * checkouts that have not yet run `pnpm install`.
 */

let stylelint;
try {
  stylelint = require('stylelint');
} catch {
  console.log('SKIP stylelint-plugin-omnifex tests: stylelint is not installed.');
  process.exit(0);
}

const path = require('path');
const pluginPath = path.resolve(__dirname, '..');

const cases = [
  {
    name: 'no-hex-in-components flags hex literals',
    code: '.foo { color: #ff0000; }',
    expectRule: 'omnifex/no-hex-in-components',
    expectCount: 1,
    expectSeverity: 'error',
  },
  {
    name: 'no-hex-in-components warns hex inside var() fallback when allowFallback',
    code: '.foo { color: var(--x, #ff0000); }',
    expectRule: 'omnifex/no-hex-in-components',
    expectCount: 1,
    expectSeverity: 'warning',
  },
  {
    name: 'tokens-only warns raw color',
    code: '.foo { color: red; }',
    expectRule: 'omnifex/tokens-only',
    expectCount: 1,
    expectSeverity: 'warning',
  },
  {
    name: 'tokens-only passes var(--...)',
    code: '.foo { color: var(--theme-text-primary); }',
    expectRule: 'omnifex/tokens-only',
    expectCount: 0,
  },
  {
    name: 'mobile-first-media flags max-width only',
    code: '@media (max-width: 599px) { .foo { color: var(--a); } }',
    expectRule: 'omnifex/mobile-first-media',
    expectCount: 1,
    expectSeverity: 'error',
  },
  {
    name: 'mobile-first-media allows min-width only',
    code: '@media (min-width: 600px) { .foo { color: var(--a); } }',
    expectRule: 'omnifex/mobile-first-media',
    expectCount: 0,
  },
  {
    name: 'mobile-first-media allows explicit range',
    code: '@media (min-width: 600px) and (max-width: 1199px) { .foo { color: var(--a); } }',
    expectRule: 'omnifex/mobile-first-media',
    expectCount: 0,
  },
  {
    name: 'no-hover-only-affordance flags display toggle on :hover',
    code: '.foo:hover { display: none; }',
    expectRule: 'omnifex/no-hover-only-affordance',
    expectCount: 1,
    expectSeverity: 'error',
  },
  {
    name: 'no-hover-only-affordance allows when combined with :focus',
    code: '.foo:hover, .foo:focus-visible { opacity: 0; }',
    expectRule: 'omnifex/no-hover-only-affordance',
    expectCount: 0,
  },
  {
    name: 'no-hover-only-affordance ignores subtle opacity on :hover',
    code: '.foo:hover { opacity: 0.9; }',
    expectRule: 'omnifex/no-hover-only-affordance',
    expectCount: 0,
  },
];

const config = {
  plugins: [pluginPath],
  rules: {
    'omnifex/no-hex-in-components': [true, { allowFallback: true }],
    'omnifex/tokens-only': [true],
    'omnifex/mobile-first-media': [true],
    'omnifex/no-hover-only-affordance': [true],
  },
};

async function main() {
  let failed = 0;
  for (const c of cases) {
    const result = await stylelint.lint({ code: c.code, config });
    const warnings = (result.results[0]?.warnings ?? []).filter(
      (w) => w.rule === c.expectRule,
    );
    const pass =
      warnings.length === c.expectCount &&
      (c.expectCount === 0 ||
        warnings.every((w) => w.severity === c.expectSeverity));
    if (pass) {
      console.log(`  PASS  ${c.name}`);
    } else {
      failed++;
      console.log(`  FAIL  ${c.name}`);
      console.log(`        expected ${c.expectCount} ${c.expectSeverity || ''} of ${c.expectRule}`);
      console.log(`        got      ${warnings.length}: ${JSON.stringify(warnings)}`);
    }
  }
  if (failed) {
    console.log(`\n${failed} test(s) failed.`);
    process.exit(1);
  }
  console.log(`\nAll ${cases.length} test(s) passed.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
