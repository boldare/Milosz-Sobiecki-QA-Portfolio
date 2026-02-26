import { test } from '../../fixtures/portfolio-fixtures';
import { AutomationExerciseHomePage } from '../../pages/automation-exercise/home-page';

test.describe('Automation Exercise - Home @ui @smoke', () => {
  test('shows main navigation and featured section', async ({ page, siteUrls }) => {
    const homePage = new AutomationExerciseHomePage(page, siteUrls.automationExercise);

    await homePage.goto();
    await homePage.dismissOverlays();

    await homePage.expectMainNavigationVisible();
    await homePage.expectFeaturedSectionVisible();
  });
});
