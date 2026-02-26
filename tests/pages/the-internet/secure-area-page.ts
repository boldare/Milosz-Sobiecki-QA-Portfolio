import { expect, type Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class TheInternetSecureAreaPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectSecureAreaVisible(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Secure Area' })).toBeVisible();
  }

  async expectLoginSuccess(): Promise<void> {
    await expect(this.page.locator('#flash')).toContainText('You logged into a secure area');
  }

  async logout(): Promise<void> {
    await this.page.getByRole('link', { name: 'Logout' }).click();
  }

  async expectLogoutSuccess(): Promise<void> {
    await expect(this.page.locator('#flash')).toContainText('You logged out of the secure area');
  }
}
