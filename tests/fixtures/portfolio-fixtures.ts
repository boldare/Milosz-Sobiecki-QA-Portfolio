import { test as base } from '@playwright/test';

export type SiteUrls = {
  automationExercise: string;
  theInternet: string;
  restfulBooker: string;
};

export const test = base.extend<{ siteUrls: SiteUrls }>({
  siteUrls: async (_unused, use) => {
    await use({
      automationExercise: 'https://automationexercise.com',
      theInternet: 'https://the-internet.herokuapp.com',
      restfulBooker: 'https://restful-booker.herokuapp.com',
    });
  },
});

export { expect } from '@playwright/test';
