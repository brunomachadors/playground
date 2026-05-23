import { test } from '../fixtures/test';
import {
  requiredFieldMessages,
  validRegistrationForms,
} from '../data/formData';
import { FormPage } from '../pages/FormPage';

test.describe('Form', { tag: ['@form', '@regression'] }, () => {
  test('Form required fields', { tag: ['@negative', '@validation'] }, async ({
    page,
  }) => {
    const formPage = new FormPage(page);

    await formPage.goto();
    await formPage.submit();

    await formPage.expectRequiredFieldMessages(requiredFieldMessages);
  });

  for (const registrationForm of validRegistrationForms) {
    test(
      `Form registration - ${registrationForm.scenario}`,
      { tag: ['@happy-path', '@data-driven'] },
      async ({ page }) => {
        const formPage = new FormPage(page);

        await formPage.goto();
        await formPage.fillRegistrationForm(registrationForm);
        await formPage.submit();

        await formPage.expectSuccessPageVisible();
      },
    );
  }
});
