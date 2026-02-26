import { test } from '../fixtures/portfolio-fixtures';
import { TheInternetSecureAreaPage } from '../pages/the-internet/secure-area-page';

test.describe('The Internet - Auth State @auth', () => {
  test('opens the secure area without re-login', async ({ page, siteUrls }) => {
    const secureAreaPage = new TheInternetSecureAreaPage(page);

    await page.goto(`${siteUrls.theInternet}/secure`);
    await secureAreaPage.expectSecureAreaVisible();
  });
});
