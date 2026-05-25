import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';
import { expect, test } from '../fixtures/test';

async function checkAccessibility(page: Page) {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags([
      // Level A: minimum accessibility requirements. These are the most basic
      // barriers that should be avoided.
      'wcag2a',
      'wcag21a',

      // Level AA: common product baseline. This is the level most teams target
      // for public websites, apps, and CI accessibility checks.
      'wcag2aa',
      'wcag21aa',

      // Level AAA also exists, but it is stricter and not always practical for
      // every page or component. It can be explored separately when needed.
      // Examples: 'wcag2aaa', 'wcag21aaa'

      // Axe also exposes best-practice checks. This keeps the heading-order
      // example visible in class even though it is not tagged as a WCAG rule.
      'best-practice',
    ])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
}

const accessibilityBugTabs = [
  { tabName: '1', title: 'Product action button' },
  { tabName: '2', title: 'Promotional image' },
  { tabName: '3', title: 'Email input' },
  {
    tabName: '4',
    title: 'Icon button',
  },
  {
    tabName: '5',
    title: 'Icon link',
  },
  { tabName: '6', title: 'Content subsection' },
  { tabName: '7', title: 'Checklist item' },
  {
    tabName: '8',
    title: 'Hidden action area',
  },
];

test.describe('Accessibility', { tag: ['@accessibility', '@regression'] }, () => {
  for (const { tabName, title } of accessibilityBugTabs) {
    test(`Accessibility Bug Lab - Bug ${tabName} ${title}`, async ({ page }) => {
      test.fail(true, 'Intentional accessibility bug for classroom demonstration.');

      await page.goto(`/accessibility?bug=${tabName}`);
      await expect(
        page.getByRole('heading', { name: 'Accessibility Bug Lab' }),
      ).toBeVisible();
      await page.waitForLoadState('networkidle');
      await expect(page.getByRole('heading', { name: title })).toBeVisible();

      await checkAccessibility(page);
    });
  }
});
