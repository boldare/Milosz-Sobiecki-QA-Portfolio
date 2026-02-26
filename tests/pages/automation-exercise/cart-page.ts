import { expect, type Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class AutomationExerciseCartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectCartTableVisible(): Promise<void> {
    await expect(this.page.locator('#cart_info_table')).toBeVisible();
  }
}
