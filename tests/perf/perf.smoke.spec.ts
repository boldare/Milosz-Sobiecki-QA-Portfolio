import { test, expect } from '../fixtures/portfolio-fixtures';
import { AutomationExerciseHomePage } from '../pages/automation-exercise/home-page';
import { TheInternetLoginPage } from '../pages/the-internet/login-page';
import { restfulBookerBaseURL } from '../utils/restful-booker';

test.describe('Performance - Smoke @perf', () => {
  test('key pages load within a reasonable threshold', async ({ page, siteUrls }) => {
    const homePage = new AutomationExerciseHomePage(page, siteUrls.automationExercise);
    const loginPage = new TheInternetLoginPage(page, siteUrls.theInternet);

    const homeStart = Date.now();
    await homePage.goto();
    const homeDuration = Date.now() - homeStart;

    await test.info().attach('automation-exercise-home-load-ms', {
      body: String(homeDuration),
      contentType: 'text/plain',
    });

    const loginStart = Date.now();
    await loginPage.goto();
    const loginDuration = Date.now() - loginStart;

    await test.info().attach('the-internet-login-load-ms', {
      body: String(loginDuration),
      contentType: 'text/plain',
    });

    expect.soft(homeDuration).toBeLessThan(8000);
    expect.soft(loginDuration).toBeLessThan(8000);
  });

  test('booking api responds within a reasonable threshold', async ({ request }) => {
    const apiStart = Date.now();
    const response = await request.get(`${restfulBookerBaseURL}/ping`);
    const apiDuration = Date.now() - apiStart;

    await test.info().attach('restful-booker-ping-ms', {
      body: String(apiDuration),
      contentType: 'text/plain',
    });

    expect.soft(response.ok()).toBeTruthy();
    expect.soft(apiDuration).toBeLessThan(2500);
  });
});
