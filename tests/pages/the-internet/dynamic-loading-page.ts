import { expect, type Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class TheInternetDynamicLoadingPage extends BasePage {
  private readonly baseUrl: string;

  constructor(page: Page, baseUrl: string) {
    super(page);
    this.baseUrl = baseUrl;
  }

  async goto(): Promise<void> {
    await this.page.goto(`${this.baseUrl}/dynamic_loading/1`);
  }

  async start(): Promise<void> {
    await this.page.getByRole('button', { name: 'Start' }).click();
  }

  async expectHelloWorld(): Promise<void> {
    const loading = this.page.locator('#loading');
    await expect(loading).toBeVisible();
    await loading.waitFor({ state: 'hidden' });

    await expect(this.page.locator('#finish')).toContainText('Hello World!');
  }
}
