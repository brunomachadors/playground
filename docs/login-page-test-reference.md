# Login Page Test Reference

## Purpose

This document describes the `/login` page as a reference for implementing automated tests. The page belongs to the Automation Test Playground project, whose purpose is to help students practice web test automation.

The login page should be treated as a training target, not as a production authentication system. Simplified behavior, visible test credentials, client-side-only state, and intentionally imperfect security patterns are acceptable in this context and should not be interpreted as defects unless a test exercise explicitly asks for that.

## Page Overview

The `/login` page provides a small authentication exercise with:

- A login instructions section.
- A username field.
- A password field.
- A submit button labeled `Login`.
- Status messages for successful login, invalid credentials, missing users, blocked users, and temporary blocking.
- Visible test account cards for students to use during automation.

The page is implemented as a client-side React page in Next.js. Login validation is performed in the browser using static user data.

## Primary User Story

As a test automation student, I want to interact with a login form using known test accounts so that I can practice validating successful and unsuccessful authentication flows.

## Supporting User Stories

As a test automation student, I want to see clear instructions on the page so that I understand which login behaviors should be tested.

As a test automation student, I want visible test credentials so that I can write deterministic automated tests without depending on external data.

As a test automation student, I want different login outcomes so that I can practice assertions for success, validation errors, blocked users, and temporary account lockout.

As a test automation student, I want successful login to redirect to a dashboard so that I can practice waiting for navigation and validating post-login state.

## Route And Navigation

- Login route: `/login`
- Successful login redirects to: `/dashboard`
- The redirect happens after approximately 2 seconds.
- The dashboard displays an authenticated user message for the regular account.

## Test Accounts

| Account Type | Username | Password | Expected Result |
| --- | --- | --- | --- |
| Regular account | `test` | `password123` | Successful login, then redirect to `/dashboard` |
| Blocked account | `testblock` | `password123` | Blocked user status message |

## Page Content Requirements

The page should display a `Login Instructions` section with the following training guidance:

- Valid username and password should return a logged-in user.
- Incorrect username or password should return an error message.
- Three incorrect passwords should temporarily lock the account.

The page should display the login form with:

- A title: `Login`
- A username input.
- A password input.
- A submit button labeled `Login`.

The page should display test account information for:

- Regular Account
- Blocked Account

## Form Field Details

### Username Field

- Element id: `usernameInput`
- Type: `text`
- Placeholder: `Type your username`
- Required: yes
- Input behavior: the value is converted to lowercase while typing.

Testing notes:

- `TEST`, `Test`, and `test` should all become `test` in the field state.
- The visual input accepts text, but login comparison uses the lowercase value.

### Password Field

- Element id: `passwordInput`
- Type: `password`
- Placeholder: `Type your password`
- Required: yes
- Input behavior: the value is preserved exactly as typed.

Testing notes:

- Password matching is case-sensitive.
- The valid regular and blocked account password is `password123`.

### Submit Button

- Element id: `submitButton`
- Text: `Login`
- Type: `submit`

Testing notes:

- Clicking the button submits the form.
- Pressing Enter from inside the form should also submit, as this is a standard HTML form.

## Status Messages

Only one status message is expected after each submit attempt.

| Status | Element id | Message | Trigger |
| --- | --- | --- | --- |
| Successful login | `statusLoggedIn` | `User successfully logged in! Redirecting...` | Username `test` with password `password123` |
| Blocked user | `statusBlocked` | `User blocked!` | Username `testblock` with password `password123` |
| User not found | `statusNotFound` | `User not found!` | Any username that does not match the regular or blocked account with its expected successful condition |
| Invalid password | `statusInvalidPass` | `Incorrect username or password!` | Username `test` with an incorrect password on the first or second failed attempt |
| Temporary block | `statusTemporaryBlock` | `User temporarily blocked!` | Username `test` after three incorrect password attempts |

## Authentication Rules

### Successful Regular Login

Given the user is on `/login`
When the user enters username `test`
And the user enters password `password123`
And the user submits the form
Then the page displays `User successfully logged in! Redirecting...`
And after approximately 2 seconds the user is redirected to `/dashboard`
And the dashboard displays `User test authenticated`.

### Blocked Account Login

Given the user is on `/login`
When the user enters username `testblock`
And the user enters password `password123`
And the user submits the form
Then the page displays `User blocked!`
And the user remains on `/login`.

### Incorrect Password For Regular Account

Given the user is on `/login`
When the user enters username `test`
And the user enters a password other than `password123`
And the user submits the form
Then the page displays `Incorrect username or password!`
And the user remains on `/login`.

### Temporary Block After Three Failed Attempts

Given the user is on `/login`
When the user enters username `test`
And the user submits an incorrect password three times in the same page session
Then the page displays `User temporarily blocked!`
And the user remains on `/login`.

Important training detail:

- The temporary block is represented by page state only.
- The submit button and fields remain usable.
- The implementation does not persist the lockout across page reloads.
- A later successful regular login resets the failed attempt counter.

### Unknown User

Given the user is on `/login`
When the user enters a username that is not `test` or a fully matching blocked-account login
And the user submits the form
Then the page displays `User not found!`
And the user remains on `/login`.

## Suggested Acceptance Criteria

1. The login page is reachable at `/login`.
2. The page displays login instructions.
3. The page displays the login form title, username field, password field, and submit button.
4. The page displays both test account cards.
5. Submitting the regular account with valid credentials displays the success message.
6. A successful regular login redirects to `/dashboard` after the success message.
7. The dashboard confirms the regular user is authenticated.
8. Submitting the blocked account credentials displays the blocked-user message.
9. Submitting the regular username with an incorrect password displays the invalid-password message.
10. Submitting three incorrect passwords for the regular username displays the temporary-block message.
11. Submitting an unknown username displays the user-not-found message.
12. The username field lowercases typed input.
13. Required field behavior prevents empty form submission through native HTML validation.

## Suggested Test Scenarios

### Smoke Tests

- Verify `/login` loads successfully.
- Verify the main login UI is visible.
- Verify instructions and account cards are visible.

### Positive Flow

- Login with `test` / `password123`.
- Assert the success message.
- Wait for redirect to `/dashboard`.
- Assert `User test authenticated`.

### Negative Flows

- Login with `test` / `wrong-password`.
- Assert `Incorrect username or password!`.
- Login with `unknown-user` / `password123`.
- Assert `User not found!`.
- Login with `testblock` / `password123`.
- Assert `User blocked!`.

### State-Based Flow

- Submit username `test` with three incorrect passwords.
- Assert invalid-password status on attempts 1 and 2.
- Assert temporary-block status on attempt 3.

### Form Behavior

- Verify username input lowercases uppercase characters.
- Verify password input has type `password`.
- Verify required fields block empty submission using browser-native validation.
- Verify Enter key submission works from the password field.

## Recommended Selectors

Prefer accessible locators where practical, because they match how a user interacts with the page:

- Page title: text `Login`
- Username field: label `Username` or id `usernameInput`
- Password field: label `Password` or id `passwordInput`
- Submit button: role `button`, name `Login`, or id `submitButton`
- Success status: id `statusLoggedIn`
- Blocked status: id `statusBlocked`
- User-not-found status: id `statusNotFound`
- Invalid-password status: id `statusInvalidPass`
- Temporary-block status: id `statusTemporaryBlock`

Implementation note:

- The labels currently use `htmlFor="username"` and `htmlFor="password"`, while the inputs use ids `usernameInput` and `passwordInput`. If a test framework cannot resolve the fields by label, use the input ids directly.

## Out Of Scope For These Tests

The following topics should not be treated as production requirements for this page:

- Real authentication security.
- Server-side credential validation.
- Password hashing.
- Session persistence.
- CSRF protection.
- Rate limiting across reloads or browsers.
- Hiding test credentials from the page.
- Preventing further form submissions after temporary block.

These omissions are acceptable because the page is designed as a training playground for automation practice.

## Source References

- Page: `src/app/login/page.tsx`
- Login form: `src/app/components/LoginForm/LoginForm.tsx`
- Status messages: `src/app/components/Status/Status.tsx`
- Test users: `src/app/data/users.ts`
- Account cards: `src/app/components/Accounts/Accounts.tsx`
- Dashboard confirmation: `src/app/dashboard/page.tsx`
