import { test, expect, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * WCAG 2.2 AA accessibility gate (UI-8 acceptance criterion A).
 *
 * Fails if axe-core reports any `serious` or `critical` violation on routes we
 * can reach without a running identity server (unauthenticated callback-less
 * pages). Moderate/minor violations are logged but do not fail the run — they
 * are surfaced in the trace and attached to the test report for review.
 *
 * Tag: @a11y (run with `playwright test --grep=@a11y`).
 */

const ROUTES = ['/', '/callback'];
const BLOCKING_IMPACTS = new Set(['serious', 'critical']);

/** Analyze only the Angular bootstrap host — excludes OIDC silent-renew iframes and other body-level siblings (extensions, overlays) that axe would otherwise crawl. */
const ROOT_SELECTOR = 'app-root';

async function scan(page: Page, url: string) {
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForSelector(ROOT_SELECTOR, { state: 'attached', timeout: 15_000 });
  // `/callback` uses AppCallbackComponent outside Layout (no header); `/` goes through Layout.
  // Web components may not satisfy Playwright's visibility heuristic until hydrated — use `attached`.
  if (url.includes('callback')) {
    await page.waitForSelector(`${ROOT_SELECTOR} omnifex-callback`, {
      state: 'attached',
      timeout: 15_000,
    });
  } else {
    await page.waitForSelector(`${ROOT_SELECTOR} omnifex-header`, {
      state: 'attached',
      timeout: 15_000,
    });
  }
  return new AxeBuilder({ page })
    .include(ROOT_SELECTOR)
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
}

for (const route of ROUTES) {
  test(`${route} passes axe-core (no serious/critical) @a11y`, async ({ page }, testInfo) => {
    const results = await scan(page, route);
    const blocking = results.violations.filter((v) =>
      BLOCKING_IMPACTS.has(v.impact ?? ''),
    );
    await testInfo.attach(`axe-${route.replace(/\//g, '_') || 'root'}.json`, {
      body: JSON.stringify(results, null, 2),
      contentType: 'application/json',
    });
    expect(
      blocking,
      blocking.length
        ? `axe reported ${blocking.length} serious/critical violation(s):\n` +
            blocking
              .map((v) => `- [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} nodes)`)
              .join('\n')
        : 'no serious/critical violations expected',
    ).toHaveLength(0);
  });
}
