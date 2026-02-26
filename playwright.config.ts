import os from 'os';
import { defineConfig, devices } from '@playwright/test';

const hostPlatformOverride = (() => {
  if (process.platform !== 'darwin' || process.arch !== 'arm64') return null;
  if (process.env.PLAYWRIGHT_HOST_PLATFORM) return null;

  const darwinMajor = Number(os.release().split('.')[0]);
  const map: Record<number, string> = {
    24: 'mac15',
    23: 'mac14',
    22: 'mac13',
    21: 'mac12',
    20: 'mac11',
  };

  const mac = map[darwinMajor];
  return mac ? `${mac}-arm64` : null;
})();

if (hostPlatformOverride) {
  process.env.PLAYWRIGHT_HOST_PLATFORM = hostPlatformOverride;
}

export default defineConfig({
  testDir: './tests',
  globalSetup: './tests/global-setup.ts',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    actionTimeout: 0,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: ['**/visual/**', '**/auth/**'],
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: ['**/visual/**', '**/a11y/**', '**/perf/**', '**/auth/**'],
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testIgnore: ['**/visual/**', '**/a11y/**', '**/perf/**', '**/auth/**'],
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
      testIgnore: ['**/visual/**', '**/a11y/**', '**/perf/**', '**/auth/**'],
    },
    {
      name: 'authenticated',
      testMatch: ['**/auth/**/*.spec.ts'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'tests/.auth/the-internet.json',
      },
    },
    {
      name: 'visual',
      testMatch: ['**/visual/**/*.spec.ts'],
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
});
