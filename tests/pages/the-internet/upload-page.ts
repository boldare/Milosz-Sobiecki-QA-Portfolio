import { expect, type Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class TheInternetUploadPage extends BasePage {
  private readonly baseUrl: string;

  constructor(page: Page, baseUrl: string) {
    super(page);
    this.baseUrl = baseUrl;
  }

  async goto(): Promise<void> {
    await this.page.goto(`${this.baseUrl}/upload`);
  }

  async uploadFile(filePath: string): Promise<void> {
    await this.page.setInputFiles('input[type="file"]', filePath);
    await this.page.getByRole('button', { name: 'Upload' }).click();
  }

  async expectUploadedFileName(fileName: string): Promise<void> {
    await expect(this.page.locator('#uploaded-files')).toHaveText(fileName);
  }
}
