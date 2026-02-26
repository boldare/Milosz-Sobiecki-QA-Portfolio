import { test, expect } from '../fixtures/portfolio-fixtures';
import { TheInternetAddRemovePage } from '../pages/the-internet/add-remove-page';
import { TheInternetLoginPage } from '../pages/the-internet/login-page';

test.describe('Visual - The Internet @visual', () => {
  test('login page matches snapshot', async ({ page, siteUrls }) => {
    const loginPage = new TheInternetLoginPage(page, siteUrls.theInternet);

    await loginPage.goto();
    await loginPage.expectOnLoginPage();

    await expect(page).toHaveScreenshot('the-internet-login.png', { maxDiffPixelRatio: 0.02 });
  });

  test('add/remove page matches snapshot', async ({ page, siteUrls }) => {
    const addRemovePage = new TheInternetAddRemovePage(page, siteUrls.theInternet);

    await addRemovePage.goto();

    await expect(page).toHaveScreenshot('the-internet-add-remove.png', { maxDiffPixelRatio: 0.02 });
  });
});
