import { expect, type Page, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export type A11yOptions = {
  include?: string | string[];
  exclude?: string | string[];
  impacts?: Array<'minor' | 'moderate' | 'serious' | 'critical'>;
};

export async function runA11yAudit(page: Page, options: A11yOptions = {}): Promise<void> {
  const builder = new AxeBuilder({ page });

  if (options.include) {
    const includes = Array.isArray(options.include) ? options.include : [options.include];
    includes.forEach((selector) => builder.include(selector));
  }

  if (options.exclude) {
    const excludes = Array.isArray(options.exclude) ? options.exclude : [options.exclude];
    excludes.forEach((selector) => builder.exclude(selector));
  }

  const results = await builder.analyze();
  const filteredViolations = options.impacts
    ? results.violations.filter(
        (violation) => violation.impact && options.impacts?.includes(violation.impact),
      )
    : results.violations;

  await test.info().attach('a11y-violations.json', {
    body: JSON.stringify(results.violations, null, 2),
    contentType: 'application/json',
  });

  expect(filteredViolations).toEqual([]);
}
