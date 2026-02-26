import { test } from '../../fixtures/portfolio-fixtures';
import { TheInternetDynamicLoadingPage } from '../../pages/the-internet/dynamic-loading-page';

test.describe('The Internet - Dynamic Loading @ui @smoke', () => {
  test('waits for async content to appear', async ({ page, siteUrls }) => {
    const dynamicLoadingPage = new TheInternetDynamicLoadingPage(page, siteUrls.theInternet);

    await dynamicLoadingPage.goto();
    await dynamicLoadingPage.start();
    await dynamicLoadingPage.expectHelloWorld();
  });
});
