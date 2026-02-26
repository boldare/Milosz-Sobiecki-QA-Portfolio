import { test } from '../fixtures/portfolio-fixtures';
import { TheInternetAddRemovePage } from '../pages/the-internet/add-remove-page';
import { TheInternetLoginPage } from '../pages/the-internet/login-page';
import { runA11yAudit } from '../utils/a11y';

test.describe('Accessibility - The Internet @a11y', () => {
  test('login page has no critical a11y violations', async ({ page, siteUrls }) => {
    const loginPage = new TheInternetLoginPage(page, siteUrls.theInternet);

    await loginPage.goto();
    await loginPage.expectOnLoginPage();

    await runA11yAudit(page, { impacts: ['critical'] });
  });

  test('add/remove page has no critical a11y violations', async ({ page, siteUrls }) => {
    const addRemovePage = new TheInternetAddRemovePage(page, siteUrls.theInternet);

    await addRemovePage.goto();

    await runA11yAudit(page, { impacts: ['critical'] });
  });
});
