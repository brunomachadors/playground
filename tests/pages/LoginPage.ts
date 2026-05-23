import { expect, test, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  // Fixed locators
  readonly title: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly successMessage: Locator;
  readonly blockedMessage: Locator;
  readonly notFoundMessage: Locator;
  readonly invalidPasswordMessage: Locator;
  readonly temporaryBlockedMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.getByRole('heading', { name: 'Login' });
    this.usernameInput = page.getByPlaceholder('Type your username');
    this.passwordInput = page.getByPlaceholder('Type your password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.successMessage = page.getByText(
      'User successfully logged in! Redirecting...'
    );
    this.blockedMessage = page.getByText('User blocked!');
    this.notFoundMessage = page.getByText('User not found!');
    this.invalidPasswordMessage = page.getByText(
      'Incorrect username or password!'
    );
    this.temporaryBlockedMessage = page.getByText(
      'User temporarily blocked!'
    );
  }

  // Dynamic locators
  statusMessageByText(message: string): Locator {
    return this.page.getByText(message);
  }

  // Actions
  async goto() {
    await test.step('Open the login page', async () => {
      await this.page.goto('/login');
    });
  }

  async fillUsername(username: string) {
    await test.step(`Fill username with "${username}"`, async () => {
      await this.usernameInput.fill(username);
    });
  }

  async fillPassword(password: string) {
    await test.step('Fill password', async () => {
      await this.passwordInput.fill(password);
    });
  }

  async submit() {
    await test.step('Submit the login form', async () => {
      await this.loginButton.click();
    });
  }

  async login(username: string, password: string) {
    await test.step(`Login with username "${username}"`, async () => {
      await this.fillUsername(username);
      await this.fillPassword(password);
      await this.submit();
    });
  }

  // Asserts
  async expectLoginPageVisible() {
    await test.step('Check that the login form is visible', async () => {
      await expect(this.title).toBeVisible();
      await expect(this.usernameInput).toBeVisible();
      await expect(this.passwordInput).toBeVisible();
      await expect(this.loginButton).toBeVisible();
    });
  }

  async expectSuccessfulLoginMessage() {
    await test.step('Check that the successful login message is visible', async () => {
      await expect(this.successMessage).toBeVisible();
    });
  }

  async expectBlockedUserMessage() {
    await test.step('Check that the blocked user message is visible', async () => {
      await expect(this.blockedMessage).toBeVisible();
    });
  }

  async expectUserNotFoundMessage() {
    await test.step('Check that the user not found message is visible', async () => {
      await expect(this.notFoundMessage).toBeVisible();
    });
  }

  async expectInvalidPasswordMessage() {
    await test.step('Check that the wrong password message is visible', async () => {
      await expect(this.invalidPasswordMessage).toBeVisible();
    });
  }

  async expectTemporaryBlockedMessage() {
    await test.step('Check that the temporary block message is visible', async () => {
      await expect(this.temporaryBlockedMessage).toBeVisible();
    });
  }

  async expectRedirectedToDashboard() {
    await test.step('Check that the user is redirected to the dashboard', async () => {
      await expect(this.page).toHaveURL(/\/dashboard$/);
    });
  }
}
