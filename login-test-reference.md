# Login Page — Test Reference

**URL:** `/login`  
**Page title heading:** `Login` (`h2#loginTitle`)

---

## Page Elements

### Form

| Element | Locator | Type | Placeholder |
|---|---|---|---|
| Username input | `#usernameInput` | `text` | `Type your username` |
| Password input | `#passwordInput` | `password` | `Type your password` |
| Submit button | `#submitButton` | `submit` | — |

> **Note:** The `<label>` elements have `for="username"` and `for="password"`, which do **not** match the input IDs (`usernameInput` / `passwordInput`). `getByLabel()` will not resolve these inputs. Always use the ID locators above.

### Static sections

| Element | Locator | Text |
|---|---|---|
| Instructions header | `#instructionsLoginHeader` | `Login Instructions` |
| Regular account card | `getByText('Regular Account')` | — |
| Blocked account card | `getByText('Blocked Account')` | — |

### Status messages (login page)

| ID | Visible when | Exact text |
|---|---|---|
| `#statusLoggedIn` | Valid login (briefly, before redirect) | `User successfully logged in! Redirecting...` |
| `#statusInvalidPass` | Known user, wrong password | `Incorrect username or password!` |
| `#statusNotFound` | Unknown username | `User not found!` |
| `#statusBlocked` | Blocked account credentials | `User blocked!` |
| `#statusTemporaryBlock` | 3rd wrong password in a row | `User temporarily blocked!` |

Only one status element is rendered at a time.

### Dashboard elements (after redirect)

| Element | Locator | Text |
|---|---|---|
| Auth message | `#loggedInMessage` | `User {username} authenticated` |
| Logout button | `#logoutButton` | `Logout` |

---

## Test Credentials

| Fixture name | Username | Password | Purpose |
|---|---|---|---|
| `validUser` | `test` | `password123` | Happy path |
| `blockedUser` | `testblock` | `password123` | Pre-blocked account |
| `unknownUser` | `unknown` | `password123` | Non-existent username |
| `userWithWrongPassword` | `test` | `wrong-password` | Wrong password scenarios |
| `userWithWrongPasswordCase` | `test` | `Password123` | Case-sensitivity check |

---

## Behaviours

### Happy path
- Valid credentials → `#statusLoggedIn` appears briefly → redirect to `/dashboard`
- `/dashboard` shows `#loggedInMessage` with `User {username} authenticated`
- Successful login **resets** the failed-attempt counter

### Negative flows
- Wrong password for a known user → `#statusInvalidPass`, stays on `/login`
- Unknown username → `#statusNotFound`, stays on `/login`
- Blocked account → `#statusBlocked`, stays on `/login`
- Inputs retain their values after a failed submission

### Temporary block (state-based)
- 1st wrong password → `#statusInvalidPass`
- 2nd wrong password → `#statusInvalidPass`
- 3rd wrong password → `#statusTemporaryBlock` (counter resets on successful login)

### Form behaviour
- Username input **lowercases** characters as typed (`TEST` → `test`)
- Password matching is **case-sensitive** (`Password123` ≠ `password123`)
- Password field type is `password` (input is masked)
- Empty username or password → native HTML `required` validation fires, form is not submitted, no status message appears
- Pressing **Enter** from the password field submits the form

---

## Test Suite Map

### Smoke (`@smoke`)

| ID | Description |
|---|---|
| S1 | Login page loads and form elements are visible |
| S2 | Login instructions section is visible |
| S3 | Both test account cards are visible |

### Happy Path (`@happy-path`)

| ID | Description |
|---|---|
| H1 | Valid credentials show success message |
| H2 | Successful login redirects to `/dashboard` |
| H3 | Dashboard shows authenticated user after login |

### Negative (`@negative`)

| ID | Description |
|---|---|
| N1 | Wrong password shows invalid credentials message |
| N2 | Unknown username shows user not found message |
| N3 | Blocked user credentials show blocked message |
| N4 | User stays on `/login` after wrong password |
| N5 | User stays on `/login` after unknown username |
| N6 | User stays on `/login` after blocked user attempt |

### State / Temporary Block (`@negative` + `@temporary-block`)

| ID | Description |
|---|---|
| T1 | 1st wrong password shows invalid credentials message |
| T2 | 2nd wrong password still shows invalid credentials message |
| T3 | 3rd wrong password triggers temporary block |
| T4 | Successful login after failed attempts resets the counter |

### Form Behaviour (`@form`)

| ID | Description |
|---|---|
| F1 | Username input lowercases typed characters |
| F2 | Password field masks input (`type=password`) |
| F3 | Password matching is case-sensitive |
| F4 | Empty username prevents form submission |
| F5 | Empty password prevents form submission |
| F6 | Pressing Enter from password field submits the form |

---

## POM Conventions

```
tests/
├── data/users.ts          # exported credential fixtures
├── pages/LoginPage.ts     # Page Object Model
└── specs/login.spec.ts    # spec file
```

All locators use element IDs where available (most stable). Actions and assertions are wrapped in `test.step()` with user-perspective descriptions.
