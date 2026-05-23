import { test } from '../fixtures/test';
import {
  blockedUser,
  invalidUser,
  userWithInvalidPassword,
  validUser,
} from '../data/users';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', { tag: ['@login', '@regression'] }, () => {
  test('Login form visible', { tag: '@smoke' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.expectLoginPageVisible();
  });

  test('Login successful', { tag: '@happy-path' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);

    await loginPage.expectSuccessfulLoginMessage();
    await loginPage.expectRedirectedToDashboard();
  });

  test(
    'Login wrong password',
    { tag: ['@negative', '@wrong-password'] },
    async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.login(
        userWithInvalidPassword.username,
        userWithInvalidPassword.password,
      );

      await loginPage.expectInvalidPasswordMessage();
    },
  );

  test(
    'Login blocked user',
    { tag: ['@negative', '@blocked-user'] },
    async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.login(blockedUser.username, blockedUser.password);

      await loginPage.expectBlockedUserMessage();
    },
  );

  test(
    'Login user not found',
    { tag: ['@negative', '@user-not-found'] },
    async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.login(invalidUser.username, invalidUser.password);

      await loginPage.expectUserNotFoundMessage();
    },
  );

  test(
    'Login temporary block after 3 wrong passwords',
    { tag: ['@negative', '@temporary-block'] },
    async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.login(
        userWithInvalidPassword.username,
        userWithInvalidPassword.password,
      );
      await loginPage.login(
        userWithInvalidPassword.username,
        userWithInvalidPassword.password,
      );
      await loginPage.login(
        userWithInvalidPassword.username,
        userWithInvalidPassword.password,
      );

      await loginPage.expectTemporaryBlockedMessage();
    },
  );
});
