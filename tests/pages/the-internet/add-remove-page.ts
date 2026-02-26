import { expect, type Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class TheInternetAddRemovePage extends BasePage {
  private readonly baseUrl: string;

  constructor(page: Page, baseUrl: string) {
    super(page);
    this.baseUrl = baseUrl;
  }

  async goto(): Promise<void> {
    await this.page.goto(`${this.baseUrl}/add_remove_elements/`);
  }

  async addElement(): Promise<void> {
    await this.page.getByRole('button', { name: 'Add Element' }).click();
  }

  async removeElement(): Promise<void> {
    await this.page.getByRole('button', { name: 'Delete' }).first().click();
  }

  async expectDeleteButtons(count: number): Promise<void> {
    await expect(this.page.getByRole('button', { name: 'Delete' })).toHaveCount(count);
  }
}
