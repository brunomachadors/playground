import { expect, test, type Locator, type Page } from '@playwright/test';
import type { Gender, Hobby, RegistrationFormData } from '../data/formData';

export class FormPage {
  readonly page: Page;

  // Fixed locators
  readonly title: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly countrySelect: Locator;
  readonly submitButton: Locator;
  readonly successTitle: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.getByRole('heading', { name: 'Form' });
    this.nameInput = page.getByPlaceholder('Type your name');
    this.emailInput = page.getByPlaceholder('Type your e-mail');
    this.passwordInput = page.getByPlaceholder('Type your password');
    this.countrySelect = page.getByLabel('Country');
    this.submitButton = page.getByRole('button', { name: 'Send' });
    this.successTitle = page.getByText('Success!');
    this.successMessage = page.getByText(
      'The form has been submitted successfully.'
    );
  }

  // Dynamic locators
  genderOption(gender: Gender): Locator {
    const genderLabel = {
      male: 'Male',
      female: 'Female',
      other: 'Other',
    };

    return this.page.getByRole('radio', {
      name: genderLabel[gender],
      exact: true,
    });
  }

  hobbyOption(hobby: Hobby): Locator {
    return this.page.getByRole('checkbox', { name: hobby, exact: true });
  }

  validationMessage(message: string): Locator {
    return this.page.getByText(message);
  }

  // Actions
  async goto() {
    await test.step('Open the form page', async () => {
      await this.page.goto('/form');
    });
  }

  async fillName(name: string) {
    await test.step(`Fill name with "${name}"`, async () => {
      await this.nameInput.fill(name);
    });
  }

  async fillEmail(email: string) {
    await test.step(`Fill email with "${email}"`, async () => {
      await this.emailInput.fill(email);
    });
  }

  async fillPassword(password: string) {
    await test.step('Fill password', async () => {
      await this.passwordInput.fill(password);
    });
  }

  async selectCountry(country: string) {
    await test.step(`Select country "${country}"`, async () => {
      await this.countrySelect.selectOption({ label: country });
    });
  }

  async selectGender(gender: Gender) {
    await test.step(`Select gender "${gender}"`, async () => {
      await this.genderOption(gender).check();
    });
  }

  async selectHobbies(hobbies: Hobby[]) {
    await test.step(`Select hobbies: ${hobbies.join(', ')}`, async () => {
      for (const hobby of hobbies) {
        await this.hobbyOption(hobby).check();
      }
    });
  }

  async submit() {
    await test.step('Submit the registration form', async () => {
      await this.submitButton.click();
    });
  }

  async fillRegistrationForm(formData: RegistrationFormData) {
    await test.step(`Fill registration form: ${formData.scenario}`, async () => {
      await this.fillName(formData.name);
      await this.fillEmail(formData.email);
      await this.fillPassword(formData.password);
      await this.selectCountry(formData.country);
      await this.selectGender(formData.gender);
      await this.selectHobbies(formData.hobbies);
    });
  }

  // Asserts
  async expectFormPageVisible() {
    await test.step('Check that the form page is visible', async () => {
      await expect(this.title).toBeVisible();
      await expect(this.nameInput).toBeVisible();
      await expect(this.emailInput).toBeVisible();
      await expect(this.passwordInput).toBeVisible();
      await expect(this.countrySelect).toBeVisible();
      await expect(this.submitButton).toBeVisible();
    });
  }

  async expectSuccessPageVisible() {
    await test.step('Check that the success page is visible', async () => {
      await expect(this.page).toHaveURL(/\/submittedform$/);
      await expect(this.successTitle).toBeVisible();
      await expect(this.successMessage).toBeVisible();
    });
  }

  async expectRequiredFieldMessages(messages: string[]) {
    await test.step('Check that required field messages are visible', async () => {
      for (const message of messages) {
        await expect(this.validationMessage(message)).toBeVisible();
      }
    });
  }
}
