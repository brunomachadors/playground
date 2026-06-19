import { expect, test, type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  // Locators
  readonly loggedInMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loggedInMessage = page.locator('#loggedInMessage');
  }

  // Assertions

  async expectOnDashboard() {
    await test.step('User is redirected to /dashboard', async () => {
      await expect(this.page).toHaveURL(/\/dashboard$/, { timeout: 5000 });
    });
  }

  async expectAuthenticated(message: string) {
    await test.step('Dashboard confirms the user is authenticated', async () => {
      await expect(this.loggedInMessage).toBeVisible({ timeout: 5000 });
      await expect(this.loggedInMessage).toHaveText(message);
    });
  }
}
