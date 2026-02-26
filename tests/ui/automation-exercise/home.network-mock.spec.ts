import { test } from '../../fixtures/portfolio-fixtures';
import { AutomationExerciseHomePage } from '../../pages/automation-exercise/home-page';

test.describe('Automation Exercise - Home Network Mock @ui @mock', () => {
  test('renders mocked Featured Items section (mock demo)', async ({ page, siteUrls }) => {
    test.info().annotations.push({
      type: 'network-mock',
      description:
        'Mock demo: stubs features_items and injects response into UI to illustrate stubbing',
    });

    await page.route('**/features_items', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          responseCode: 200,
          products: [
            {
              id: 1,
              name: 'Mocked Top',
              price: 'Rs. 999',
              brand: 'MockBrand',
              category: { category: 'Tops', usertype: { usertype: 'Women' } },
            },
          ],
        }),
      });
    });

    const homePage = new AutomationExerciseHomePage(page, siteUrls.automationExercise);

    await homePage.goto();
    await homePage.dismissOverlays();

    await homePage.expectMainNavigationVisible();
    await homePage.expectFeaturedSectionVisible();

    await page.evaluate(async () => {
      const response = await fetch('/api/features_items');
      const data = await response.json();
      const container = document.querySelector('.features_items');
      if (!container) return;
      container.innerHTML = data.products
        .map((product: { name: string }) => `<h2>${product.name}</h2>`)
        .join('');
    });

    await homePage.expectFeaturedItemVisible('Mocked Top');
  });
});
