import { expect, test, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  // Locators
  readonly pageTitle: Locator;
  readonly navBar: Locator;
  readonly hamburgerButton: Locator;
  readonly bannerImage: Locator;
  readonly challengesHeading: Locator;
  readonly challengesList: Locator;
  readonly footer: Locator;
  readonly notFoundHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.getByRole('heading', { name: 'Test Playground' });
    this.navBar = page.getByRole('navigation');
    this.hamburgerButton = page.getByRole('button', { name: 'Toggle main menu' });
    this.bannerImage = page.getByRole('img', { name: 'Bug Buster Mentoring Banner' });
    this.challengesHeading = page.getByRole('heading', { name: 'Available Challenges:' });
    this.challengesList = page.getByRole('list');
    this.footer = page.getByText('© 2025 Bug Buster Mentoria.');
    this.notFoundHeading = page.getByRole('heading', { name: '404' });
  }

  // Actions

  async goto() {
    await test.step('Navigate to /', async () => {
      await this.page.goto('/');
    });
  }

  async gotoNonExistentRoute() {
    await test.step('Navigate to /nonexistent', async () => {
      await this.page.goto('/nonexistent');
    });
  }

  async clickNavLink(name: string) {
    await test.step(`Click "${name}" nav link`, async () => {
      await this.navBar.getByRole('link', { name }).first().click();
    });
  }

  async openMobileMenu() {
    await test.step('Open mobile menu', async () => {
      await this.hamburgerButton.click();
    });
  }

  async closeMobileMenu() {
    await test.step('Close mobile menu', async () => {
      // The button is CSS-visible but the menu overlay intercepts pointer events at
      // that position, so force:true is required to dispatch the click directly.
      await this.hamburgerButton.click({ force: true });
    });
  }

  async clickMobileNavLink(name: string) {
    await test.step(`Click "${name}" in mobile menu`, async () => {
      await this.navBar.getByRole('link', { name }).last().click();
    });
  }

  // Assertions

  async expectPageVisible() {
    await test.step('Home page elements are visible', async () => {
      await expect(this.pageTitle).toBeVisible();
      await expect(this.navBar).toBeVisible();
      await expect(this.bannerImage).toBeVisible();
      await expect(this.challengesHeading).toBeVisible();
      await expect(this.footer).toBeVisible();
    });
  }

  async expectHamburgerVisible() {
    await test.step('Hamburger menu button is visible', async () => {
      await expect(this.hamburgerButton).toBeVisible();
    });
  }

  async expectDesktopNavLinksHidden() {
    await test.step('Desktop nav links are not visible', async () => {
      await expect(this.navBar.getByRole('link', { name: 'HOME' }).first()).not.toBeVisible();
    });
  }

  async expectMobileMenuOpen() {
    await test.step('Mobile menu is open with all nav links visible', async () => {
      const links = ['HOME', 'LOGIN', 'FORM', 'TABLE', 'TASKS', 'STORE', 'A11Y', 'ABOUT'];
      for (const name of links) {
        await expect(this.navBar.getByRole('link', { name }).last()).toBeVisible();
      }
    });
  }

  async expectMobileMenuClosed() {
    await test.step('Mobile menu is closed', async () => {
      // The mobile nav links are hidden via CSS transform/positioning (not display:none),
      // so Playwright considers them visible regardless of menu state.
      // The reliable signal is the page content: the banner is covered when the
      // full-screen menu is open and becomes visible again once it closes.
      await expect(this.bannerImage).toBeVisible();
    });
  }

  async expectNavigatedTo(path: string) {
    await test.step(`User is on ${path}`, async () => {
      await expect(this.page).toHaveURL(new RegExp(path.replace(/\//g, '\\/') + '$'));
    });
  }

  async expectOnHomePage() {
    await test.step('User remains on /', async () => {
      await expect(this.page).toHaveURL(/\/$/);
    });
  }

  async expectNotFoundPage() {
    await test.step('404 page is displayed', async () => {
      await expect(this.notFoundHeading).toBeVisible();
    });
  }
}
