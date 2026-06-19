import { test } from '../fixtures/test';
import {
  validUser,
  blockedUser,
  unknownUser,
  userWithWrongPassword,
  userWithWrongPasswordCase,
  uppercaseValidUser,
  blockedUserWrongPassword,
  mixedCaseUsername,
  messages,
} from '../data/users';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Login', { tag: ['@login', '@regression'] }, () => {

  // ─── Smoke ──────────────────────────────────────────────────────────────

  test('S1 - Login page loads', { tag: '@smoke' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.expectPageLoaded();
  });

  test('S2 - Login form fields and button are visible', { tag: '@smoke' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.expectFormVisible();
  });

  test('S3 - Login instructions are visible', { tag: '@smoke' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.expectInstructionsVisible();
  });

  test('S4 - Test account cards are visible', { tag: '@smoke' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.expectAccountCardsVisible();
  });

  // ─── Happy Path ───────────────────────────────────────────────────────────

  test('H1 - Valid regular login shows success message', { tag: '@happy-path' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);

    await loginPage.expectSuccessMessage(messages.loggedIn);
  });

  test('H2 - Successful login redirects to /dashboard', { tag: '@happy-path' }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);

    await dashboardPage.expectOnDashboard();
  });

  test('H3 - Dashboard confirms the regular user is authenticated', { tag: '@happy-path' }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);
    await dashboardPage.expectOnDashboard();

    await dashboardPage.expectAuthenticated(messages.dashboardAuthenticated);
  });

  // ─── Negative ─────────────────────────────────────────────────────────────

  test('N1 - Wrong password shows invalid credentials message', { tag: '@negative' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(userWithWrongPassword.username, userWithWrongPassword.password);

    await loginPage.expectInvalidPasswordMessage(messages.invalidPass);
    await loginPage.expectStillOnLoginPage();
  });

  test('N2 - Unknown username shows user-not-found message', { tag: '@negative' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(unknownUser.username, unknownUser.password);

    await loginPage.expectNotFoundMessage(messages.notFound);
    await loginPage.expectStillOnLoginPage();
  });

  test('N3 - Blocked account shows blocked-user message', { tag: '@negative' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(blockedUser.username, blockedUser.password);

    await loginPage.expectBlockedMessage(messages.blocked);
    await loginPage.expectStillOnLoginPage();
  });

  test('N4 - Empty submission is blocked by native required validation', { tag: '@negative' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.submitEmptyForm();

    await loginPage.expectEmptySubmissionBlocked();
  });

  test('N5 - Blocked username with wrong password shows user-not-found message', { tag: '@negative' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(blockedUserWrongPassword.username, blockedUserWrongPassword.password);

    await loginPage.expectNotFoundMessage(messages.notFound);
    await loginPage.expectStillOnLoginPage();
  });

  // ─── State / Temporal ───────────────────────────────────────────────────

  test('T1 - Three wrong passwords trigger a temporary block', { tag: ['@negative', '@temporary-block'] }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(userWithWrongPassword.username, userWithWrongPassword.password);
    await loginPage.expectInvalidPasswordMessage(messages.invalidPass);

    await loginPage.login(userWithWrongPassword.username, userWithWrongPassword.password);
    await loginPage.expectInvalidPasswordMessage(messages.invalidPass);

    await loginPage.login(userWithWrongPassword.username, userWithWrongPassword.password);
    await loginPage.expectTemporaryBlockMessage(messages.temporaryBlock);
    await loginPage.expectStillOnLoginPage();
  });

  test('T2 - Temporary block does not persist across a page reload', { tag: ['@negative', '@temporary-block'] }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(userWithWrongPassword.username, userWithWrongPassword.password);
    await loginPage.login(userWithWrongPassword.username, userWithWrongPassword.password);
    await loginPage.login(userWithWrongPassword.username, userWithWrongPassword.password);
    await loginPage.expectTemporaryBlockMessage(messages.temporaryBlock);

    await loginPage.reload();
    await loginPage.login(userWithWrongPassword.username, userWithWrongPassword.password);

    await loginPage.expectInvalidPasswordMessage(messages.invalidPass);
  });

  test('T3 - Successful login after failed attempts succeeds and resets the counter', { tag: ['@happy-path', '@temporary-block'] }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(userWithWrongPassword.username, userWithWrongPassword.password);
    await loginPage.expectInvalidPasswordMessage(messages.invalidPass);
    await loginPage.login(userWithWrongPassword.username, userWithWrongPassword.password);
    await loginPage.expectInvalidPasswordMessage(messages.invalidPass);

    await loginPage.login(validUser.username, validUser.password);

    await loginPage.expectSuccessMessage(messages.loggedIn);
  });

  // ─── Form Behaviour ───────────────────────────────────────────────────────

  test('F1 - Username input lowercases typed characters', { tag: '@form' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsername(mixedCaseUsername.typed);

    await loginPage.expectUsernameValue(mixedCaseUsername.expected);
  });

  test('F2 - Uppercase username still authenticates', { tag: '@form' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(uppercaseValidUser.username, uppercaseValidUser.password);

    await loginPage.expectSuccessMessage(messages.loggedIn);
  });

  test('F3 - Password field masks input', { tag: '@form' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.expectPasswordMasked();
  });

  test('F4 - Password matching is case-sensitive', { tag: '@form' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(userWithWrongPasswordCase.username, userWithWrongPasswordCase.password);

    await loginPage.expectInvalidPasswordMessage(messages.invalidPass);
  });

  test('F5 - Enter key submits the form from the password field', { tag: '@form' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginWithEnter(validUser.username, validUser.password);

    await loginPage.expectSuccessMessage(messages.loggedIn);
  });

});
