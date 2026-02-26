import { test } from '../../fixtures/portfolio-fixtures';
import { AutomationExerciseCartPage } from '../../pages/automation-exercise/cart-page';
import { AutomationExerciseProductsPage } from '../../pages/automation-exercise/products-page';

test.describe('Automation Exercise - Search and Cart @ui @smoke', () => {
  test('searches for a product and adds it to the cart', async ({ page, siteUrls }) => {
    const productsPage = new AutomationExerciseProductsPage(page, siteUrls.automationExercise);
    const cartPage = new AutomationExerciseCartPage(page);

    await productsPage.goto();
    await productsPage.dismissOverlays();
    await productsPage.searchFor('Top');
    await productsPage.expectSearchedProductsVisible();
    await productsPage.addFirstProductToCart();
    await productsPage.openViewCart();
    await cartPage.expectCartTableVisible();
  });
});
