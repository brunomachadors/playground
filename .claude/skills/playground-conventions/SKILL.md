---
name: playground-conventions
description: >
  Reference for the Automation Test Playground (playground-drab-six.vercel.app) E2E test project
  conventions. Load this skill at the start of any session creating or editing tests in the
  playground repository to ensure all code follows the established patterns for folder structure,
  file naming, Page Object Model, test naming, tags, selectors, and assertions.
  Use this whenever creating or editing any test file, even if the user doesn't explicitly ask
  for it — it ensures consistency across the team and workshop participants.
---

# Playground E2E Tests — Project Conventions

## Project structure

```
playwright.config.ts
tests/
├── data/        # test user fixtures and static input data
├── fixtures/    # re-exports of test and expect from @playwright/test
├── pages/       # Page Object Model classes — one per page
└── specs/       # test files — one per page
```

## File naming

| Layer   | Pattern                  | Example              |
|---------|--------------------------|----------------------|
| Data    | `<page>.ts`              | `users.ts`           |
| Fixture | `test.ts`                | `test.ts`            |
| Page    | `<Page>Page.ts`          | `LoginPage.ts`       |
| Spec    | `<page>.spec.ts`         | `login.spec.ts`      |

## Imports in specs

Always import `test` and `expect` from the project fixture, not directly from `@playwright/test`:

```typescript
import { test } from '../fixtures/test';
```

## Data files (`tests/data/`)

Export named constants — one per user or input variant. Use descriptive names that communicate intent:

```typescript
export const validUser = { username: 'test', password: 'password123' };
export const blockedUser = { username: 'testblock', password: 'password123' };
export const unknownUser = { username: 'unknown', password: 'password123' };
export const userWithWrongPassword = { username: 'test', password: 'wrong-password' };
export const userWithWrongPasswordCase = { username: 'test', password: 'Password123' };
```

## Page Object Model (`tests/pages/`)

Each POM class follows a fixed structure: **locators → actions → assertions**. Keep them clearly separated with comments.

```typescript
import { expect, test, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  // Locators — declared as readonly class fields
  readonly title: Locator;
  readonly usernameInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole('heading', { name: 'Login' });
    this.usernameInput = page.locator('#usernameInput');
  }

  // Actions — all wrapped in test.step()
  async goto() {
    await test.step('Navigate to /login', async () => {
      await this.page.goto('/login');
    });
  }

  // Assertions — all wrapped in test.step()
  async expectPageVisible() {
    await test.step('Login page elements are visible', async () => {
      await expect(this.title).toBeVisible();
      await expect(this.usernameInput).toBeVisible();
    });
  }
}
```

### Locator priority (most preferred first)

1. `page.locator('#id')` — use element IDs when available (most stable)
2. `page.getByRole('button', { name: '...' })` — semantic roles
3. `page.getByLabel('...')` — form fields via associated label
4. `page.getByPlaceholder('...')` — inputs via placeholder text
5. `page.getByText('...')` — static visible text
6. Avoid CSS classes, visual position, or xpath

### `test.step()` rules

- Every action method wraps its body in `test.step()`
- Every assertion method wraps its body in `test.step()`
- Step names are written from the user's perspective: what is happening, not how
- Good: `'Navigate to /login'`, `'Login page elements are visible'`
- Avoid: `'call goto()'`, `'check title exists'`

### Assertion style

When asserting status messages, check **both** visibility and text content:

```typescript
await expect(this.successMessage).toBeVisible();
await expect(this.successMessage).toHaveText('User successfully logged in! Redirecting...');
```

For URL assertions, use regex patterns:

```typescript
await expect(this.page).toHaveURL(/\/dashboard$/);
await expect(this.page).toHaveURL(/\/login$/);
```

For redirects with a delay, pass an explicit timeout:

```typescript
await expect(this.page).toHaveURL(/\/dashboard$/, { timeout: 5000 });
```

## Spec files (`tests/specs/`)

Specs are thin — they only orchestrate POM calls. No assertions, no locators, no data literals inside a spec.

### Test naming convention

Test names use a **category prefix** followed by a short imperative description:

| Prefix | Category           | Example |
|--------|--------------------|---------|
| `S`    | Smoke              | `S1 - Login page loads and form elements are visible` |
| `H`    | Happy Path         | `H1 - Valid credentials show success message` |
| `N`    | Negative           | `N1 - Wrong password shows invalid credentials message` |
| `T`    | State / Temporal   | `T3 - 3rd wrong password triggers temporary block` |
| `F`    | Form Behaviour     | `F1 - Username input lowercases typed characters` |

Number sequentially within each category.

### Tag system

Tags follow a fixed order: **page → regression → category**

```typescript
test.describe('Login', { tag: ['@login', '@regression'] }, () => {
  test('H1 - ...', { tag: '@happy-path' }, async ({ page }) => { ... });
  test('N1 - ...', { tag: '@negative' }, async ({ page }) => { ... });
});
```

Available category tags: `@smoke`, `@happy-path`, `@negative`, `@form`, `@temporary-block`

For tests that span multiple categories (e.g. state-based negative tests), use an array:

```typescript
{ tag: ['@negative', '@temporary-block'] }
```

### Spec structure example

```typescript
import { test } from '../fixtures/test';
import { validUser } from '../data/users';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', { tag: ['@login', '@regression'] }, () => {

  test('S1 - Login page loads and form elements are visible', { tag: '@smoke' }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.expectPageVisible();
  });

  test('H1 - Valid credentials show success message', { tag: '@happy-path' }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);
    await loginPage.expectSuccessMessage();
  });

});
```

## Playwright config

```typescript
export default defineConfig({
  testDir: './tests/specs',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL: 'https://playground-drab-six.vercel.app',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
  ],
});
```

## npm scripts

| Script              | Command                   |
|---------------------|---------------------------|
| `test:e2e`          | `playwright test`         |
| `test:e2e:ui`       | `playwright test --ui`    |

## Reference test suite

The login test suite (`tests/specs/login.spec.ts`) is the canonical example of all conventions above and should be used as a reference when implementing tests for other pages.
