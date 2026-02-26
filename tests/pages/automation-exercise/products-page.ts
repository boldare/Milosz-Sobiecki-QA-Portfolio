import { expect, type Page } from '@playwright/test';
import { dismissAds, dismissCookieConsent } from '../../utils/automation-exercise';
import { BasePage } from '../base-page';

export class AutomationExerciseProductsPage extends BasePage {
  private readonly baseUrl: string;

  constructor(page: Page, baseUrl: string) {
    super(page);
    this.baseUrl = baseUrl;
  }

  async goto(): Promise<void> {
    await this.page.goto(`${this.baseUrl}/products`);
  }

  async dismissOverlays(): Promise<void> {
    await dismissCookieConsent(this.page);
    await dismissAds(this.page);
  }

  async searchFor(term: string): Promise<void> {
    const searchInput = this.page.locator('#search_product');
    const searchButton = this.page.locator('#submit_search');

    await expect(searchInput).toBeVisible();
    await searchInput.fill(term);
    await searchButton.click();
  }

  async expectSearchedProductsVisible(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: /searched products/i })).toBeVisible();
  }

  async addFirstProductToCart(): Promise<void> {
    const firstProduct = this.page.locator('.productinfo').first();
    await firstProduct.hover();
    await firstProduct.getByText('Add to cart').click();
  }

  async openViewCart(): Promise<void> {
    await dismissAds(this.page);
    await this.page.getByRole('link', { name: /view cart/i }).click();
  }
}
