import { expect, test, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  // Locators
  readonly title: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly instructionsHeader: Locator;
  readonly instructionsList: Locator;
  readonly regularAccountCard: Locator;
  readonly blockedAccountCard: Locator;
  readonly statusLoggedIn: Locator;
  readonly statusBlocked: Locator;
  readonly statusNotFound: Locator;
  readonly statusInvalidPass: Locator;
  readonly statusTemporaryBlock: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.getByRole('heading', { name: 'Login' });
    this.usernameInput = page.locator('#usernameInput');
    this.passwordInput = page.locator('#passwordInput');
    this.submitButton = page.locator('#submitButton');
    this.instructionsHeader = page.locator('#instructionsLoginHeader');
    this.instructionsList = page.locator('#instructionsLoginList');
    this.regularAccountCard = page.getByText('Regular Account:');
    this.blockedAccountCard = page.getByText('Blocked Account:');
    this.statusLoggedIn = page.locator('#statusLoggedIn');
    this.statusBlocked = page.locator('#statusBlocked');
    this.statusNotFound = page.locator('#statusNotFound');
    this.statusInvalidPass = page.locator('#statusInvalidPass');
    this.statusTemporaryBlock = page.locator('#statusTemporaryBlock');
  }

  // Actions

  async goto() {
    await test.step('Navigate to /login', async () => {
      await this.page.goto('/login');
    });
  }

  async reload() {
    await test.step('Reload the login page', async () => {
      await this.page.reload();
    });
  }

  async fillUsername(username: string) {
    await test.step(`Type "${username}" into the username field`, async () => {
      await this.usernameInput.fill(username);
    });
  }

  async fillPassword(password: string) {
    await test.step('Type the password', async () => {
      await this.passwordInput.fill(password);
    });
  }

  async login(username: string, password: string) {
    await test.step(`Log in as "${username}"`, async () => {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.submitButton.click();
    });
  }

  async loginWithEnter(username: string, password: string) {
    await test.step(`Log in as "${username}" by pressing Enter`, async () => {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.passwordInput.press('Enter');
    });
  }

  async submitEmptyForm() {
    await test.step('Submit the form with empty fields', async () => {
      await this.submitButton.click();
    });
  }

  // Assertions

  async expectPageLoaded() {
    await test.step('Login page loads and the title is visible', async () => {
      await expect(this.page).toHaveURL(/\/login$/);
      await expect(this.title).toBeVisible();
    });
  }

  async expectFormVisible() {
    await test.step('Login form fields and button are visible', async () => {
      await expect(this.usernameInput).toBeVisible();
      await expect(this.passwordInput).toBeVisible();
      await expect(this.submitButton).toBeVisible();
    });
  }

  async expectInstructionsVisible() {
    await test.step('Login instructions are visible', async () => {
      await expect(this.instructionsHeader).toBeVisible();
      await expect(this.instructionsHeader).toHaveText('Login Instructions');
      await expect(this.instructionsList.getByRole('listitem')).toHaveCount(3);
    });
  }

  async expectAccountCardsVisible() {
    await test.step('Both test account cards are visible', async () => {
      await expect(this.regularAccountCard).toBeVisible();
      await expect(this.blockedAccountCard).toBeVisible();
    });
  }

  async expectSuccessMessage(message: string) {
    await test.step('Success status message is shown', async () => {
      await expect(this.statusLoggedIn).toBeVisible();
      await expect(this.statusLoggedIn).toHaveText(message);
    });
  }

  async expectBlockedMessage(message: string) {
    await test.step('Blocked-user status message is shown', async () => {
      await expect(this.statusBlocked).toBeVisible();
      await expect(this.statusBlocked).toHaveText(message);
    });
  }

  async expectNotFoundMessage(message: string) {
    await test.step('User-not-found status message is shown', async () => {
      await expect(this.statusNotFound).toBeVisible();
      await expect(this.statusNotFound).toHaveText(message);
    });
  }

  async expectInvalidPasswordMessage(message: string) {
    await test.step('Invalid-password status message is shown', async () => {
      await expect(this.statusInvalidPass).toBeVisible();
      await expect(this.statusInvalidPass).toHaveText(message);
    });
  }

  async expectTemporaryBlockMessage(message: string) {
    await test.step('Temporary-block status message is shown', async () => {
      await expect(this.statusTemporaryBlock).toBeVisible();
      await expect(this.statusTemporaryBlock).toHaveText(message);
    });
  }

  async expectUsernameValue(value: string) {
    await test.step(`Username field value is "${value}"`, async () => {
      await expect(this.usernameInput).toHaveValue(value);
    });
  }

  async expectPasswordMasked() {
    await test.step('Password field masks input (type="password")', async () => {
      await expect(this.passwordInput).toHaveAttribute('type', 'password');
    });
  }

  async expectEmptySubmissionBlocked() {
    await test.step('Native required validation blocks empty submission', async () => {
      const usernameMissing = await this.usernameInput.evaluate(
        (el: HTMLInputElement) => el.validity.valueMissing,
      );
      expect(usernameMissing).toBe(true);
      await expect(this.statusLoggedIn).toBeHidden();
      await expect(this.statusBlocked).toBeHidden();
      await expect(this.statusNotFound).toBeHidden();
      await expect(this.statusInvalidPass).toBeHidden();
      await expect(this.statusTemporaryBlock).toBeHidden();
      await expect(this.page).toHaveURL(/\/login$/);
    });
  }

  async expectStillOnLoginPage() {
    await test.step('User remains on /login', async () => {
      await expect(this.page).toHaveURL(/\/login$/);
    });
  }
}
