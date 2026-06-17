---
name: playground-scaffold
description: >
  Scaffold all the files needed to test a new page in the Automation Test Playground project:
  data file, Page Object Model, and spec. Use this skill whenever the user says "create tests for",
  "add tests for", "scaffold", "new page tests", or describes a new page they want to cover
  in the playground repository. Always use this skill proactively when the user provides a
  reference doc (like a *-test-reference.md file) and asks to test it — even if they just say
  "can we add the form page" or "let's test the tasks page".
---

# Playground E2E Tests — Scaffold New Page

Generate the three test layers for a new page following the project conventions.

## What to gather before scaffolding

Extract from context if available; otherwise ask:

1. **Page name** — e.g. `form`, `tasks`, `dashboard` (used for file naming)
2. **Route** — e.g. `/form`, `/tasks`
3. **Reference doc** — a `*-test-reference.md` file if available (source of truth for selectors, test accounts, expected messages, and business rules)
4. **Scenarios to cover** — if no reference doc exists, ask what the key flows are

If a reference doc is provided, read it fully before writing any file. It contains element IDs, expected messages, test accounts, and business rules that must be reflected exactly in the test files.

## Files to create

For a page called `<page>` (e.g. `form`):

```
tests/data/<page>.ts
tests/pages/<Page>Page.ts     (PascalCase for the class name)
tests/specs/<page>.spec.ts
```

Create all three files. Do not skip any layer.

## 1. Data file (`tests/data/<page>.ts`)

Export named constants for each input variant or user fixture needed by the tests. Use the exact values from the reference doc or application source code.

```typescript
// tests/data/users.ts — example from the login page
export const validUser = { username: 'test', password: 'password123' };
export const blockedUser = { username: 'testblock', password: 'password123' };
export const unknownUser = { username: 'unknown', password: 'password123' };
export const userWithWrongPassword = { username: 'test', password: 'wrong-password' };
```

- One export per input variant — not a single object containing all of them
- Name exports to communicate intent (`validUser`, not `user1`)
- Use the exact values stated in the reference doc

## 2. Page Object (`tests/pages/<Page>Page.ts`)

Structure is always: **imports → locators → actions → assertions**.

```typescript
import { expect, test, type Locator, type Page } from '@playwright/test';

export class FormPage {
  readonly page: Page;

  // Locators
  readonly title: Locator;
  readonly nameInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.getByRole('heading', { name: 'Form' });
    this.nameInput = page.locator('#nameInput');
    this.submitButton = page.locator('#submitButton');
    this.successMessage = page.locator('#successMessage');
  }

  // Actions

  async goto() {
    await test.step('Navigate to /form', async () => {
      await this.page.goto('/form');
    });
  }

  async fillName(name: string) {
    await test.step(`Fill name with "${name}"`, async () => {
      await this.nameInput.fill(name);
    });
  }

  async submit() {
    await test.step('Click submit button', async () => {
      await this.submitButton.click();
    });
  }

  // Assertions

  async expectPageVisible() {
    await test.step('Page elements are visible', async () => {
      await expect(this.title).toBeVisible();
      await expect(this.nameInput).toBeVisible();
      await expect(this.submitButton).toBeVisible();
    });
  }

  async expectSuccessMessage() {
    await test.step('Success message is visible', async () => {
      await expect(this.successMessage).toBeVisible();
      await expect(this.successMessage).toHaveText('Form submitted successfully!');
    });
  }

  async expectOnPage() {
    await test.step('User remains on /form', async () => {
      await expect(this.page).toHaveURL(/\/form$/);
    });
  }
}
```

### Locator priority

1. `page.locator('#id')` — element IDs when available (most stable)
2. `page.getByRole(...)` — semantic roles
3. `page.getByLabel(...)` — form fields via associated label
4. `page.getByPlaceholder(...)` — inputs via placeholder
5. `page.getByText(...)` — static visible text
6. Never use CSS classes, visual position, or xpath

### test.step() rules

- Every action and assertion method wraps its body in `test.step()`
- Step names describe what is happening from the user's perspective
- Status message assertions check both `.toBeVisible()` and `.toHaveText()` with the exact message string from the reference doc

## 3. Spec file (`tests/specs/<page>.spec.ts`)

Specs are thin — orchestration only. No assertions, no locators, no data literals inside a spec.

### Test naming

Use category prefixes, numbered sequentially within each category:

| Prefix | Category         |
|--------|------------------|
| `S`    | Smoke            |
| `H`    | Happy Path       |
| `N`    | Negative         |
| `T`    | State / Temporal |
| `F`    | Form Behaviour   |

Format: `<Prefix><number> - <short imperative description>`

Examples: `S1 - Page loads and form elements are visible`, `H1 - Valid submission redirects to confirmation`

### Tags

Tags follow the order: **page → regression → category**

```typescript
test.describe('Form', { tag: ['@form-page', '@regression'] }, () => {
  test('S1 - ...', { tag: '@smoke' }, ...);
  test('H1 - ...', { tag: '@happy-path' }, ...);
  test('N1 - ...', { tag: '@negative' }, ...);
  test('F1 - ...', { tag: '@form' }, ...);
});
```

Available category tags: `@smoke`, `@happy-path`, `@negative`, `@form`, `@temporary-block`

### Spec structure

```typescript
import { test } from '../fixtures/test';
import { validFormData } from '../data/form';
import { FormPage } from '../pages/FormPage';

test.describe('Form', { tag: ['@form-page', '@regression'] }, () => {

  // ─── Smoke ──────────────────────────────────────────────────────────────
  test('S1 - Page loads and all fields are visible', { tag: '@smoke' }, async ({ page }) => {
    const formPage = new FormPage(page);
    await formPage.goto();
    await formPage.expectPageVisible();
  });

  // ─── Happy Path ──────────────────────────────────────────────────────────
  test('H1 - Valid submission shows success message', { tag: '@happy-path' }, async ({ page }) => {
    const formPage = new FormPage(page);
    await formPage.goto();
    await formPage.fillName(validFormData.name);
    await formPage.submit();
    await formPage.expectSuccessMessage();
  });

});
```

## Checklist before finishing

- [ ] All three files created: data, POM, spec
- [ ] Element IDs and expected messages match the reference doc exactly
- [ ] Every locator uses the ID or most stable selector available
- [ ] Every action and assertion is wrapped in `test.step()`
- [ ] Spec imports from `../fixtures/test`, not from `@playwright/test`
- [ ] Test names use the correct prefix and are numbered sequentially
- [ ] Tags follow the order: page → regression → category
- [ ] Status message assertions check both visibility and text content
