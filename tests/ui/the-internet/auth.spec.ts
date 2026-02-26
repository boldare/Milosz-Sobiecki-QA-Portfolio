import { test } from '../../fixtures/portfolio-fixtures';
import { TheInternetLoginPage } from '../../pages/the-internet/login-page';
import { TheInternetSecureAreaPage } from '../../pages/the-internet/secure-area-page';

test.describe('The Internet - Form Authentication @ui @smoke', () => {
  test('logs in and logs out', async ({ page, siteUrls }) => {
    const loginPage = new TheInternetLoginPage(page, siteUrls.theInternet);
    const secureAreaPage = new TheInternetSecureAreaPage(page);

    await test.step('Open login page', async () => {
      await loginPage.goto();
      await loginPage.expectOnLoginPage();
    });

    await test.step('Sign in', async () => {
      await loginPage.login('tomsmith', 'SuperSecretPassword!');
      await secureAreaPage.expectLoginSuccess();
    });

    await test.step('Sign out', async () => {
      await secureAreaPage.logout();
      await secureAreaPage.expectLogoutSuccess();
    });
  });
});
