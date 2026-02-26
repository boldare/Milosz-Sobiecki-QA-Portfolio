import { expect, type Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class TheInternetLoginPage extends BasePage {
  private readonly baseUrl: string;

  constructor(page: Page, baseUrl: string) {
    super(page);
    this.baseUrl = baseUrl;
  }

  async goto(): Promise<void> {
    await this.page.goto(`${this.baseUrl}/login`);
  }

  async expectOnLoginPage(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Login Page' })).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}
