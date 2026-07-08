import { test } from '../fixtures/test';
import {
  leonardo,
  raphael,
  donatello,
  michelangelo,
  april,
  splinter,
  emptyForm,
  missingName,
  missingEmail,
  missingPassword,
  missingCountry,
  missingGender,
  userWithMalformedEmail,
  userWithWhitespaceName,
  countries,
  hobbies,
  errorMessages,
  successMessages,
} from '../data/form';
import { FormPage } from '../pages/FormPage';

test.describe('Form', { tag: ['@form-page', '@regression'] }, () => {

  // ─── Smoke ──────────────────────────────────────────────────────────────

  test('S1 - Form page loads and all fields are visible', { tag: '@smoke' }, async ({ page }) => {
    const formPage = new FormPage(page);

    await formPage.goto();

    await formPage.expectPageVisible();
  });

  test('S2 - Country dropdown offers all options', { tag: '@smoke' }, async ({ page }) => {
    const formPage = new FormPage(page);

    await formPage.goto();

    await formPage.expectCountryOptions(countries);
  });

  test('S3 - Hobby checkboxes are visible and unchecked by default', { tag: '@smoke' }, async ({ page }) => {
    const formPage = new FormPage(page);

    await formPage.goto();

    await formPage.expectHobbiesUnchecked(hobbies);
  });

  // ─── Happy Path ───────────────────────────────────────────────────────────

  test('H1 - Valid submission redirects to the success page', { tag: ['@happy-path', '@leonardo'] }, async ({ page }) => {
    const formPage = new FormPage(page);

    await formPage.goto();
    await formPage.fillAndSubmit(leonardo);

    await formPage.expectSubmitted(successMessages);
  });

  test('H2 - Submission with all hobbies selected succeeds', { tag: ['@happy-path', '@april'] }, async ({ page }) => {
    const formPage = new FormPage(page);

    await formPage.goto();
    await formPage.fillAndSubmit(april);

    await formPage.expectSubmitted(successMessages);
  });

  test('H3 - Gender "male" submission succeeds', { tag: ['@happy-path', '@raphael'] }, async ({ page }) => {
    const formPage = new FormPage(page);

    await formPage.goto();
    await formPage.fillAndSubmit(raphael);

    await formPage.expectSubmitted(successMessages);
  });

  test('H4 - Gender "female" submission succeeds', { tag: ['@happy-path', '@april'] }, async ({ page }) => {
    const formPage = new FormPage(page);

    await formPage.goto();
    await formPage.fillAndSubmit(april);

    await formPage.expectSubmitted(successMessages);
  });

  test('H5 - Gender "other" submission succeeds', { tag: ['@happy-path', '@michelangelo'] }, async ({ page }) => {
    const formPage = new FormPage(page);

    await formPage.goto();
    await formPage.fillAndSubmit(michelangelo);

    await formPage.expectSubmitted(successMessages);
  });

  test('H6 - Submission from Donatello succeeds', { tag: ['@happy-path', '@donatello'] }, async ({ page }) => {
    const formPage = new FormPage(page);

    await formPage.goto();
    await formPage.fillAndSubmit(donatello);

    await formPage.expectSubmitted(successMessages);
  });

  // ─── Negative ─────────────────────────────────────────────────────────────

  test('N1 - Empty submission shows all five required errors', { tag: '@negative' }, async ({ page }) => {
    const formPage = new FormPage(page);

    await formPage.goto();
    await formPage.fillAndSubmit(emptyForm);

    await formPage.expectAllRequiredErrors(errorMessages);
    await formPage.expectStillOnForm();
  });

  test('N2 - Missing name shows only the name error', { tag: ['@negative', '@leonardo'] }, async ({ page }) => {
    const formPage = new FormPage(page);

    await formPage.goto();
    await formPage.fillAndSubmit(missingName);

    await formPage.expectNameError(errorMessages.name);
    await formPage.expectStillOnForm();
  });

  test('N3 - Missing email shows only the email error', { tag: ['@negative', '@leonardo'] }, async ({ page }) => {
    const formPage = new FormPage(page);

    await formPage.goto();
    await formPage.fillAndSubmit(missingEmail);

    await formPage.expectEmailError(errorMessages.email);
    await formPage.expectStillOnForm();
  });

  test('N4 - Missing password shows only the password error', { tag: ['@negative', '@leonardo'] }, async ({ page }) => {
    const formPage = new FormPage(page);

    await formPage.goto();
    await formPage.fillAndSubmit(missingPassword);

    await formPage.expectPasswordError(errorMessages.password);
    await formPage.expectStillOnForm();
  });

  test('N5 - Missing country shows only the country error', { tag: ['@negative', '@leonardo'] }, async ({ page }) => {
    const formPage = new FormPage(page);

    await formPage.goto();
    await formPage.fillAndSubmit(missingCountry);

    await formPage.expectCountryError(errorMessages.country);
    await formPage.expectStillOnForm();
  });

  test('N6 - Missing gender shows only the gender error', { tag: ['@negative', '@leonardo'] }, async ({ page }) => {
    const formPage = new FormPage(page);

    await formPage.goto();
    await formPage.fillAndSubmit(missingGender);

    await formPage.expectGenderError(errorMessages.gender);
    await formPage.expectStillOnForm();
  });

  test('N7 - Malformed email is blocked by native validation', { tag: ['@negative', '@shredder'] }, async ({ page }) => {
    const formPage = new FormPage(page);

    await formPage.goto();
    await formPage.fillAndSubmit(userWithMalformedEmail);

    await formPage.expectEmailValidationBlocked();
  });

  // ─── State / Temporal ───────────────────────────────────────────────────

  test('T1 - Fixing a field clears its error on resubmit', { tag: ['@negative', '@leonardo'] }, async ({ page }) => {
    const formPage = new FormPage(page);

    await formPage.goto();
    await formPage.submit();
    await formPage.expectAllRequiredErrors(errorMessages);

    await formPage.fillName(leonardo.name);
    await formPage.submit();

    await formPage.expectNameErrorHidden();
  });

  test('T2 - A hobby checkbox toggles on and off', { tag: '@form' }, async ({ page }) => {
    const formPage = new FormPage(page);

    await formPage.goto();

    await formPage.checkHobby('books');
    await formPage.expectHobbyChecked('books');

    await formPage.uncheckHobby('books');
    await formPage.expectHobbyUnchecked('books');
  });

  test('T3 - Gender radios are mutually exclusive', { tag: '@form' }, async ({ page }) => {
    const formPage = new FormPage(page);

    await formPage.goto();

    await formPage.selectGender('male');
    await formPage.expectGenderSelected('male');

    await formPage.selectGender('female');
    await formPage.expectGenderSelected('female');
    await formPage.expectGenderNotSelected('male');
  });

  // ─── Form Behaviour ───────────────────────────────────────────────────────

  test('F1 - Password field masks input', { tag: '@form' }, async ({ page }) => {
    const formPage = new FormPage(page);

    await formPage.goto();

    await formPage.expectPasswordMasked();
  });

  test('F2 - Email field uses type="email"', { tag: '@form' }, async ({ page }) => {
    const formPage = new FormPage(page);

    await formPage.goto();

    await formPage.expectEmailInputType();
  });

  test('F4 - Submission with no hobbies succeeds (hobbies are optional)', { tag: ['@form', '@splinter'] }, async ({ page }) => {
    const formPage = new FormPage(page);

    await formPage.goto();
    await formPage.fillAndSubmit(splinter);

    await formPage.expectSubmitted(successMessages);
  });

  test('F5 - Whitespace-only name passes the presence check', { tag: ['@form', '@shredder'] }, async ({ page }) => {
    const formPage = new FormPage(page);

    await formPage.goto();
    await formPage.fillAndSubmit(userWithWhitespaceName);

    // Documents current behaviour: the validation does not trim, so a
    // whitespace-only name is accepted and the form submits.
    await formPage.expectSubmitted(successMessages);
  });

});
