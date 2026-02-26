import type { Page } from '@playwright/test';

export async function dismissCookieConsent(page: Page): Promise<void> {
  const consentRoot = page.locator('.fc-consent-root');
  if ((await consentRoot.count()) === 0) return;

  if (await consentRoot.isVisible()) {
    const acceptButton = consentRoot.getByRole('button', { name: /accept|agree|consent/i }).first();
    if (await acceptButton.isVisible()) {
      await acceptButton.click();
    } else {
      const anyButton = consentRoot.locator('button').first();
      if (await anyButton.isVisible()) {
        await anyButton.click();
      }
    }
  }

  await page.evaluate(() => {
    document.querySelector('.fc-consent-root')?.remove();
    document.querySelectorAll('.fc-dialog-overlay').forEach((el) => el.remove());
  });
}

export async function dismissAds(page: Page): Promise<void> {
  await page.addStyleTag({
    content: `
      iframe[id^="aswift"],
      iframe[name^="aswift"],
      iframe[title="Advertisement"],
      ins.adsbygoogle,
      .adsbygoogle {
        pointer-events: none !important;
      }
    `,
  });

  await page.evaluate(() => {
    const selectors = [
      'iframe[id^="aswift"]',
      'iframe[name^="aswift"]',
      'iframe[title="Advertisement"]',
      'ins.adsbygoogle',
      '.adsbygoogle',
    ];

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => el.remove());
    });
  });
}
