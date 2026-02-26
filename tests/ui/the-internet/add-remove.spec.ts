import { test } from '../../fixtures/portfolio-fixtures';
import { TheInternetAddRemovePage } from '../../pages/the-internet/add-remove-page';

test.describe('The Internet - Add/Remove Elements @ui @smoke', () => {
  test('adds and removes a dynamic element', async ({ page, siteUrls }) => {
    const addRemovePage = new TheInternetAddRemovePage(page, siteUrls.theInternet);

    await addRemovePage.goto();
    await addRemovePage.addElement();
    await addRemovePage.expectDeleteButtons(1);
    await addRemovePage.removeElement();
    await addRemovePage.expectDeleteButtons(0);
  });
});
