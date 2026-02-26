import { test } from '../fixtures/portfolio-fixtures';
import { AutomationExerciseHomePage } from '../pages/automation-exercise/home-page';
import { AutomationExerciseProductsPage } from '../pages/automation-exercise/products-page';
import { runA11yAudit } from '../utils/a11y';

test.describe('Accessibility - Automation Exercise @a11y', () => {
  test('home page has no critical a11y violations', async ({ page, siteUrls }) => {
    const homePage = new AutomationExerciseHomePage(page, siteUrls.automationExercise);

    await homePage.goto();
    await homePage.dismissOverlays();

    await runA11yAudit(page, {
      impacts: ['critical'],
      exclude: ['#subscribe', '#submit_search'],
    });
  });

  test('products page has no critical a11y violations', async ({ page, siteUrls }) => {
    const productsPage = new AutomationExerciseProductsPage(page, siteUrls.automationExercise);

    await productsPage.goto();
    await productsPage.dismissOverlays();

    await runA11yAudit(page, {
      impacts: ['critical'],
      exclude: ['#subscribe', '#submit_search'],
    });
  });
});
