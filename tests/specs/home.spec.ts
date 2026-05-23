import { test } from '../fixtures/test';
import { HomePage } from '../pages/HomePage';

test.describe('Home', { tag: ['@home', '@regression'] }, () => {
  test('Home content visible', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();

    await homePage.expectHomePageVisible();
    await homePage.expectMainChallengesVisible();
  });

  test('Home navigate to login', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.clickLoginLink();

    await homePage.expectRedirectedToLogin();
  });
});
