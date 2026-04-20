import { defineConfig, devices } from '@playwright/test';

/** Must match `angular-app` Nx target `serve-e2e`. */
const baseURL = 'http://localhost:4321';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    /* Distinct Nx target from `serve` so this is not deduped with a dev `nx serve` on 4200. */
    command: 'corepack pnpm nx run angular-app:serve-e2e',
    url: baseURL,
    /* Do not attach to a random app on 4321; only this webServer may use `serve-e2e`. */
    reuseExistingServer: false,
    timeout: 180000,
  },
});



