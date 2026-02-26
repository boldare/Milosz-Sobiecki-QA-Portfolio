import fs from 'fs';
import path from 'path';
import { chromium } from '@playwright/test';

const authFile = path.resolve(__dirname, '.auth', 'the-internet.json');

export default async (): Promise<void> => {
  const shouldRun = process.env.RUN_AUTH_SETUP === 'true' || !fs.existsSync(authFile);
  if (!shouldRun) return;

  fs.mkdirSync(path.dirname(authFile), { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://the-internet.herokuapp.com/login');
  await page.getByLabel('Username').fill('tomsmith');
  await page.getByLabel('Password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.locator('#flash').waitFor({ state: 'visible' });
  await page.context().storageState({ path: authFile });

  await browser.close();
};
