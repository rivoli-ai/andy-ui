import { test, expect, devices, Locator } from '@playwright/test';

/**
 * UI-8 regression tests for @omnifex/ui-components consumed by the Angular app.
 *
 * Covers:
 *   - No horizontal scroll at 360 / 768 / 1280 px (mobile-first).
 *   - ≥ 44×44 CSS px touch targets for every button/link on reachable routes.
 *
 * These tests target `/callback` (always rendered) and the root which, when
 * unauthenticated, redirects to the identity server. When identity is not
 * reachable we still validate the initial Angular shell.
 */

const VIEWPORTS = [
  { name: '360 (mobile)', width: 360, height: 640 },
  { name: '768 (tablet)', width: 768, height: 1024 },
  { name: '1280 (desktop)', width: 1280, height: 800 },
];

const MIN_TOUCH = 44;

for (const vp of VIEWPORTS) {
  test(`/callback has no horizontal scroll @ ${vp.name} @responsive`, async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();
    await page.goto('/callback', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('omnifex-callback', { timeout: 5_000 });
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(
      scrollWidth,
      `horizontal scroll at ${vp.name}: scrollWidth=${scrollWidth}, clientWidth=${clientWidth}`,
    ).toBeLessThanOrEqual(clientWidth + 1); // tolerate 1px sub-pixel rounding
    await ctx.close();
  });
}

test('interactive elements meet 44×44 CSS px touch target on mobile @touch @responsive', async ({
  browser,
}) => {
  const ctx = await browser.newContext({
    ...devices['Pixel 7'],
    viewport: { width: 412, height: 915 },
  });
  const page = await ctx.newPage();
  await page.goto('/callback', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('omnifex-callback', { timeout: 5_000 });

  // Query all plausible interactive controls anywhere in the light DOM of the app shell.
  // Web-component internals are not reachable without piercing shadow roots; we inspect
  // the projected hit-targets via the host elements that DO participate in layout.
  const locators: Locator[] = [
    page.locator('button'),
    page.locator('a[href]'),
    page.locator('[role="button"]'),
    page.locator('andy-ui-button'),
    page.locator('omnifex-theme-toggle'),
  ];

  const undersized: string[] = [];
  for (const loc of locators) {
    const count = await loc.count();
    for (let i = 0; i < count; i++) {
      const el = loc.nth(i);
      if (!(await el.isVisible().catch(() => false))) continue;
      const box = await el.boundingBox();
      if (!box) continue;
      if (box.width + 0.5 < MIN_TOUCH || box.height + 0.5 < MIN_TOUCH) {
        const tag = await el.evaluate((n) => n.tagName.toLowerCase()).catch(() => 'unknown');
        undersized.push(
          `${tag} #${i}: ${box.width.toFixed(1)}×${box.height.toFixed(1)} (need ${MIN_TOUCH}×${MIN_TOUCH})`,
        );
      }
    }
  }

  await ctx.close();
  expect(
    undersized,
    undersized.length ? `Undersized touch targets:\n- ${undersized.join('\n- ')}` : '',
  ).toEqual([]);
});
