import { test } from '../fixtures/test';
import {
  loginRoute,
  formRoute,
  tableRoute,
  tasksRoute,
  storeRoute,
  accessibilityRoute,
  aboutRoute,
  nonExistentRoute,
} from '../data/home';
import { HomePage } from '../pages/HomePage';

test.describe('Home', { tag: ['@home', '@regression'] }, () => {

  // ─── Smoke ────────────────────────────────────────────────────────────────

  test('S1 - Home page loads and all key elements are visible', { tag: '@smoke' }, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();

    await homePage.expectPageVisible();
  });

  // ─── Happy Path — Desktop Navigation ─────────────────────────────────────

  test('H1 - Clicking LOGIN in nav navigates to /login', { tag: '@happy-path' }, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.clickNavLink('LOGIN');

    await homePage.expectNavigatedTo(loginRoute);
  });

  test('H2 - Clicking FORM in nav navigates to /form', { tag: '@happy-path' }, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.clickNavLink('FORM');

    await homePage.expectNavigatedTo(formRoute);
  });

  test('H3 - Clicking TABLE in nav navigates to /table', { tag: '@happy-path' }, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.clickNavLink('TABLE');

    await homePage.expectNavigatedTo(tableRoute);
  });

  test('H4 - Clicking TASKS in nav navigates to /tasks', { tag: '@happy-path' }, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.clickNavLink('TASKS');

    await homePage.expectNavigatedTo(tasksRoute);
  });

  test('H5 - Clicking STORE in nav navigates to /store', { tag: '@happy-path' }, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.clickNavLink('STORE');

    await homePage.expectNavigatedTo(storeRoute);
  });

  test('H6 - Clicking A11Y in nav navigates to /accessibility', { tag: '@happy-path' }, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.clickNavLink('A11Y');

    await homePage.expectNavigatedTo(accessibilityRoute);
  });

  test('H7 - Clicking ABOUT in nav navigates to /about', { tag: '@happy-path' }, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.clickNavLink('ABOUT');

    await homePage.expectNavigatedTo(aboutRoute);
  });

  test('H8 - Clicking HOME in nav stays on /', { tag: '@happy-path' }, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.clickNavLink('HOME');

    await homePage.expectOnHomePage();
  });

  // ─── Negative ─────────────────────────────────────────────────────────────

  test('N1 - Navigating to a non-existent route shows the 404 page', { tag: '@negative' }, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoNonExistentRoute();

    await homePage.expectNotFoundPage();
  });

});

test.describe('Home — Mobile', { tag: ['@home', '@regression'] }, () => {
  test.use({ viewport: { width: 375, height: 812 } });

  // ─── Happy Path — Mobile Navigation ──────────────────────────────────────

  test('H9 - On mobile, hamburger button is visible and desktop nav links are hidden', { tag: '@happy-path' }, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();

    await homePage.expectHamburgerVisible();
    await homePage.expectDesktopNavLinksHidden();
  });

  test('H10 - Clicking hamburger opens mobile menu with all nav links', { tag: '@happy-path' }, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.openMobileMenu();

    await homePage.expectMobileMenuOpen();
  });

  test('H11 - Clicking a nav link in mobile menu navigates to correct page', { tag: '@happy-path' }, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.openMobileMenu();
    await homePage.clickMobileNavLink('LOGIN');

    await homePage.expectNavigatedTo(loginRoute);
  });

  test('H12 - Clicking hamburger again closes the mobile menu', { tag: '@happy-path' }, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.openMobileMenu();
    await homePage.closeMobileMenu();

    await homePage.expectMobileMenuClosed();
  });

});
