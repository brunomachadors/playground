# Code Review — Login Test Suite

Files reviewed:
- `tests/fixtures/test.ts`
- `tests/data/users.ts`
- `tests/pages/LoginPage.ts`
- `tests/specs/login.spec.ts`

---

## `tests/fixtures/test.ts`

**No issues.** Correctly re-exports `test` and `expect` from `@playwright/test`. The file is minimal by design — custom fixtures can be added here when needed.

---

## `tests/data/users.ts`

**No issues.** All five fixtures are present, clearly named by intent, and cover the full range of scenarios.

---

## `tests/pages/LoginPage.ts`

### 🔴 `expectDashboardAuthMessage()` hardcodes the username

```typescript
// current
await expect(this.page.getByText('User test authenticated')).toBeVisible();
```

This couples the assertion to the `validUser.username` value (`test`). If a different user logs in — or the username changes in `users.ts` — the assertion will fail silently with a confusing error. The method should accept the username as a parameter, or use the element ID directly and check for a partial match:

```typescript
// option A — parameterised
async expectDashboardAuthMessage(username: string) {
  await test.step('Dashboard shows authenticated user', async () => {
    await expect(this.page.locator('#loggedInMessage'))
      .toHaveText(`User ${username} authenticated`);
  });
}
```

### 🟡 `instructionsSection` uses `getByText` when an ID exists

```typescript
// current
this.instructionsSection = page.getByText('Login Instructions');
```

The element has `id="instructionsLoginHeader"`. Per the locator priority convention, IDs are preferred over text matches:

```typescript
// recommended
this.instructionsSection = page.locator('#instructionsLoginHeader');
```

### 🟡 Missing dashboard locators

The POM has no locators for the dashboard — `#loggedInMessage` and `#logoutButton` are only accessed via one-off `getByText` and implicit selectors in the assertions. Declaring them as class fields would make them consistent with the rest of the POM and reusable in future tests.

---

## `tests/specs/login.spec.ts`

### 🔴 T1 is a duplicate of N1

`T1 - 1st wrong password shows invalid credentials message` is **identical** in setup and assertion to `N1 - Wrong password shows invalid credentials message`. They test the same path with the same fixture and the same POM call. One should be removed.

The T-series is meant to test *progression* — T1 only makes sense if the spec is re-structured to run T1 → T2 → T3 sequentially with shared state (e.g. using `test.step` chaining or a beforeEach setup). As independent tests, T1 adds no value beyond N1.

### 🟡 T2 is tagged `@negative` but not `@temporary-block`

```typescript
// current
test('T2 - ...', { tag: '@negative' }, ...)
```

T3 uses `{ tag: ['@negative', '@temporary-block'] }`, and T2 is part of the same state progression. For consistent filtering, T2 should carry the same tags:

```typescript
test('T2 - ...', { tag: ['@negative', '@temporary-block'] }, ...)
```

### 🟡 `test.expect` used inside specs instead of the imported `expect`

In F4 and F5:

```typescript
await test.expect(loginPage.successMessage).not.toBeVisible();
```

The convention (and the fixture import) is to use `expect` directly. `test.expect` is equivalent at runtime but is inconsistent with the rest of the suite and with the conventions doc. Replace with:

```typescript
await expect(loginPage.successMessage).not.toBeVisible();
```

Note: `expect` is already exported from `../fixtures/test` and is available in scope — it just isn't imported in the spec file. Add it to the import:

```typescript
import { test, expect } from '../fixtures/test';  // add expect here
```

### 🟡 H3 `expectDashboardAuthMessage()` is called without a username argument

Once the POM issue above is fixed, the call site in H3 needs updating:

```typescript
await loginPage.expectDashboardAuthMessage(validUser.username);
```

### ℹ️ T4 could benefit from inline comments

`T4 - Successful login after failed attempts resets the counter` is the most complex test in the suite, with two login phases separated by a redirect and a `goto()`. The existing implicit structure is correct, but brief inline comments between phases would help future readers understand the intent without having to reverse-engineer the counter-reset logic from the POM calls.

---

## Summary

| Severity | Count | Issues |
|---|---|---|
| 🔴 Must fix | 2 | T1 duplicates N1; `expectDashboardAuthMessage` hardcodes username |
| 🟡 Should fix | 4 | T2 tags; `test.expect` vs `expect`; `instructionsSection` locator; missing dashboard locators |
| ℹ️ Nice to have | 1 | Inline comments in T4 |
