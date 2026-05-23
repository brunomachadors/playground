import { expect, test, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  // Fixed locators
  readonly bannerImage: Locator;
  readonly introText: Locator;
  readonly challengesTitle: Locator;
  readonly loginChallenge: Locator;
  readonly formsChallenge: Locator;
  readonly dynamicTableChallenge: Locator;
  readonly moreChallenges: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.bannerImage = page.getByRole('img', {
      name: 'Bug Buster Mentoring Banner',
    });
    this.introText = page.getByText(
      'This page was developed by the Bug Buster Mentorship team for educational purposes.'
    );
    this.challengesTitle = page.getByRole('heading', {
      name: 'Available Challenges:',
    });
    this.loginChallenge = page.getByText('Login', { exact: true });
    this.formsChallenge = page.getByText('Forms', { exact: true });
    this.dynamicTableChallenge = page.getByText('Dynamic Table', {
      exact: true,
    });
    this.moreChallenges = page.getByText('And much more!', { exact: true });
    this.loginLink = page.getByRole('link', { name: 'LOGIN' }).first();
  }

  // Dynamic locators
  challengeByName(name: string): Locator {
    return this.page.getByText(name, { exact: true });
  }

  // Actions
  async goto() {
    await test.step('Open the home page', async () => {
      await this.page.goto('/');
    });
  }

  async clickLoginLink() {
    await test.step('Click the login link in the main menu', async () => {
      await this.loginLink.click();
    });
  }

  // Asserts
  async expectHomePageVisible() {
    await test.step('Check that the home page main content is visible', async () => {
      await expect(this.bannerImage).toBeVisible();
      await expect(this.introText).toBeVisible();
      await expect(this.challengesTitle).toBeVisible();
    });
  }

  async expectMainChallengesVisible() {
    await test.step('Check that the main challenges are visible', async () => {
      await expect(this.loginChallenge).toBeVisible();
      await expect(this.formsChallenge).toBeVisible();
      await expect(this.dynamicTableChallenge).toBeVisible();
      await expect(this.moreChallenges).toBeVisible();
    });
  }

  async expectRedirectedToLogin() {
    await test.step('Check that the user is redirected to the login page', async () => {
      await expect(this.page).toHaveURL(/\/login$/);
    });
  }
}
