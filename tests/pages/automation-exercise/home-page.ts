import { expect, type Page } from '@playwright/test';
import { dismissAds, dismissCookieConsent } from '../../utils/automation-exercise';
import { BasePage } from '../base-page';

export class AutomationExerciseHomePage extends BasePage {
  private readonly baseUrl: string;

  constructor(page: Page, baseUrl: string) {
    super(page);
    this.baseUrl = baseUrl;
  }

  async goto(): Promise<void> {
    await this.page.goto(this.baseUrl);
  }

  async dismissOverlays(): Promise<void> {
    await dismissCookieConsent(this.page);
    await dismissAds(this.page);
  }

  async expectMainNavigationVisible(): Promise<void> {
    await expect(this.page.getByRole('link', { name: 'Products' })).toBeVisible();
  }

  async expectFeaturedSectionVisible(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: /features items/i })).toBeVisible();
  }

  async expectFeaturedItemVisible(name: string): Promise<void> {
    await expect(
      this.page.locator('.features_items').getByText(name, { exact: true }),
    ).toBeVisible();
  }
}
