import { expect, test, type Locator, type Page } from '@playwright/test';
import type { FormUser } from '../data/form';

export class FormPage {
  readonly page: Page;

  // Locators
  readonly title: Locator;
  readonly form: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly countrySelect: Locator;
  readonly genderGroup: Locator;
  readonly hobbiesGroup: Locator;
  readonly submitButton: Locator;
  readonly nameError: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly countryError: Locator;
  readonly genderError: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.getByRole('heading', { name: 'Form' });
    this.form = page.locator('#registrationForm');
    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.countrySelect = page.locator('#country');
    this.genderGroup = page.locator('#genderGroup');
    this.hobbiesGroup = page.locator('#hobbiesGroup');
    this.submitButton = page.locator('#submitBtn');
    this.nameError = page.locator('#nameError');
    this.emailError = page.locator('#emailError');
    this.passwordError = page.locator('#passwordError');
    this.countryError = page.locator('#countryError');
    this.genderError = page.locator('#genderError');
  }

  // Locator helpers for grouped inputs (by name + value)
  genderRadio(value: string): Locator {
    return this.page.locator(`input[name="gender"][value="${value}"]`);
  }

  hobbyCheckbox(value: string): Locator {
    return this.page.locator(`input[name="hobbies"][value="${value}"]`);
  }

  // Actions

  async goto() {
    await test.step('Navigate to /form', async () => {
      await this.page.goto('/form');
    });
  }

  async fillName(name: string) {
    await test.step(`Type "${name}" into the name field`, async () => {
      await this.nameInput.fill(name);
    });
  }

  async fillEmail(email: string) {
    await test.step(`Type "${email}" into the email field`, async () => {
      await this.emailInput.fill(email);
    });
  }

  async fillPassword(password: string) {
    await test.step('Type the password', async () => {
      await this.passwordInput.fill(password);
    });
  }

  async selectCountry(country: string) {
    await test.step(`Select country "${country}"`, async () => {
      await this.countrySelect.selectOption(country);
    });
  }

  async selectGender(gender: string) {
    await test.step(`Select gender "${gender}"`, async () => {
      await this.genderRadio(gender).check();
    });
  }

  async checkHobby(hobby: string) {
    await test.step(`Check hobby "${hobby}"`, async () => {
      await this.hobbyCheckbox(hobby).check();
    });
  }

  async uncheckHobby(hobby: string) {
    await test.step(`Uncheck hobby "${hobby}"`, async () => {
      await this.hobbyCheckbox(hobby).uncheck();
    });
  }

  /**
   * Fill the whole form from a profile. Text fields are always filled (an empty
   * string clears them); country and gender are only set when provided, so
   * profiles with blank required fields stay blank.
   */
  async fillForm(user: FormUser) {
    await test.step(`Fill the form as "${user.name || '(empty)'}"`, async () => {
      await this.nameInput.fill(user.name);
      await this.emailInput.fill(user.email);
      await this.passwordInput.fill(user.password);
      if (user.country) {
        await this.countrySelect.selectOption(user.country);
      }
      if (user.gender) {
        await this.genderRadio(user.gender).check();
      }
      for (const hobby of user.hobbies) {
        await this.hobbyCheckbox(hobby).check();
      }
    });
  }

  async submit() {
    await test.step('Click the Send button', async () => {
      await this.submitButton.click();
    });
  }

  async fillAndSubmit(user: FormUser) {
    await this.fillForm(user);
    await this.submit();
  }

  // Assertions

  async expectPageVisible() {
    await test.step('Form page elements are visible', async () => {
      await expect(this.page).toHaveURL(/\/form$/);
      await expect(this.title).toBeVisible();
      await expect(this.nameInput).toBeVisible();
      await expect(this.emailInput).toBeVisible();
      await expect(this.passwordInput).toBeVisible();
      await expect(this.countrySelect).toBeVisible();
      await expect(this.genderGroup).toBeVisible();
      await expect(this.hobbiesGroup).toBeVisible();
      await expect(this.submitButton).toBeVisible();
    });
  }

  async expectCountryOptions(values: readonly string[]) {
    await test.step('Country dropdown offers all expected options', async () => {
      // The select also has the empty placeholder option.
      await expect(this.countrySelect.locator('option')).toHaveCount(values.length + 1);
      for (const value of values) {
        await expect(this.countrySelect.locator(`option[value="${value}"]`)).toHaveCount(1);
      }
    });
  }

  async expectHobbiesUnchecked(values: readonly string[]) {
    await test.step('All hobby checkboxes are visible and unchecked', async () => {
      for (const value of values) {
        await expect(this.hobbyCheckbox(value)).toBeVisible();
        await expect(this.hobbyCheckbox(value)).not.toBeChecked();
      }
    });
  }

  async expectSubmitted(success: { heading: string; body: string }) {
    await test.step('Form is submitted and the success page is shown', async () => {
      await expect(this.page).toHaveURL(/\/submittedform$/);
      await expect(this.page.getByText(success.heading)).toBeVisible();
      await expect(this.page.getByText(success.body)).toBeVisible();
    });
  }

  async expectStillOnForm() {
    await test.step('User remains on /form', async () => {
      await expect(this.page).toHaveURL(/\/form$/);
    });
  }

  async expectAllRequiredErrors(messages: {
    name: string;
    email: string;
    password: string;
    country: string;
    gender: string;
  }) {
    await test.step('All five required-field errors are shown', async () => {
      await expect(this.nameError).toHaveText(messages.name);
      await expect(this.emailError).toHaveText(messages.email);
      await expect(this.passwordError).toHaveText(messages.password);
      await expect(this.countryError).toHaveText(messages.country);
      await expect(this.genderError).toHaveText(messages.gender);
    });
  }

  async expectNameError(message: string) {
    await test.step('Only the name error is shown', async () => {
      await expect(this.nameError).toBeVisible();
      await expect(this.nameError).toHaveText(message);
      await expect(this.emailError).toBeHidden();
      await expect(this.passwordError).toBeHidden();
      await expect(this.countryError).toBeHidden();
      await expect(this.genderError).toBeHidden();
    });
  }

  async expectEmailError(message: string) {
    await test.step('Only the email error is shown', async () => {
      await expect(this.emailError).toBeVisible();
      await expect(this.emailError).toHaveText(message);
      await expect(this.nameError).toBeHidden();
      await expect(this.passwordError).toBeHidden();
      await expect(this.countryError).toBeHidden();
      await expect(this.genderError).toBeHidden();
    });
  }

  async expectPasswordError(message: string) {
    await test.step('Only the password error is shown', async () => {
      await expect(this.passwordError).toBeVisible();
      await expect(this.passwordError).toHaveText(message);
      await expect(this.nameError).toBeHidden();
      await expect(this.emailError).toBeHidden();
      await expect(this.countryError).toBeHidden();
      await expect(this.genderError).toBeHidden();
    });
  }

  async expectCountryError(message: string) {
    await test.step('Only the country error is shown', async () => {
      await expect(this.countryError).toBeVisible();
      await expect(this.countryError).toHaveText(message);
      await expect(this.nameError).toBeHidden();
      await expect(this.emailError).toBeHidden();
      await expect(this.passwordError).toBeHidden();
      await expect(this.genderError).toBeHidden();
    });
  }

  async expectGenderError(message: string) {
    await test.step('Only the gender error is shown', async () => {
      await expect(this.genderError).toBeVisible();
      await expect(this.genderError).toHaveText(message);
      await expect(this.nameError).toBeHidden();
      await expect(this.emailError).toBeHidden();
      await expect(this.passwordError).toBeHidden();
      await expect(this.countryError).toBeHidden();
    });
  }

  async expectNameErrorHidden() {
    await test.step('The name error is no longer shown', async () => {
      await expect(this.nameError).toBeHidden();
    });
  }

  async expectPasswordMasked() {
    await test.step('Password field masks input (type="password")', async () => {
      await expect(this.passwordInput).toHaveAttribute('type', 'password');
    });
  }

  async expectEmailInputType() {
    await test.step('Email field uses type="email"', async () => {
      await expect(this.emailInput).toHaveAttribute('type', 'email');
    });
  }

  async expectEmailValidationBlocked() {
    await test.step('Native email validation blocks the submission', async () => {
      const typeMismatch = await this.emailInput.evaluate(
        (el: HTMLInputElement) => el.validity.typeMismatch,
      );
      expect(typeMismatch).toBe(true);
      await expect(this.page).toHaveURL(/\/form$/);
    });
  }

  async expectGenderSelected(value: string) {
    await test.step(`Only gender "${value}" is selected`, async () => {
      await expect(this.genderRadio(value)).toBeChecked();
    });
  }

  async expectGenderNotSelected(value: string) {
    await test.step(`Gender "${value}" is not selected`, async () => {
      await expect(this.genderRadio(value)).not.toBeChecked();
    });
  }

  async expectHobbyChecked(value: string) {
    await test.step(`Hobby "${value}" is checked`, async () => {
      await expect(this.hobbyCheckbox(value)).toBeChecked();
    });
  }

  async expectHobbyUnchecked(value: string) {
    await test.step(`Hobby "${value}" is unchecked`, async () => {
      await expect(this.hobbyCheckbox(value)).not.toBeChecked();
    });
  }
}
