# Form Page Test Reference

## Purpose

This document describes the `/form` page as a reference for implementing automated tests. The page belongs to the Automation Test Playground project, whose purpose is to help students practice web test automation.

The form page should be treated as a training target, not as a production registration system. Simplified validation (presence-only checks), client-side-only state, and intentionally imperfect rules are acceptable in this context and should not be interpreted as defects unless a test exercise explicitly asks for that.

## Page Overview

The `/form` page provides a registration-form exercise with:

- An instructions section.
- A required **Name** text field.
- A required **Email** field (`type="email"`).
- A required **Password** field (masked).
- A required **Country** dropdown.
- A required **Gender** radio group.
- An optional **Hobbies** checkbox group.
- A submit button labeled `Send`.
- Inline, field-level error messages for each required field.
- A success page at `/submittedform` shown after a valid submission.

The page is implemented as a client-side React page in Next.js. Validation is performed in the browser and only checks that the required fields are non-empty — there is no format/strength validation in the page logic.

## Primary User Story

As a test automation student, I want to fill in and submit a registration form so that I can practice validating required-field errors, dropdown/radio/checkbox interactions, and a post-submit redirect.

## Supporting User Stories

As a test automation student, I want clear inline errors per field so that I can write assertions for each required-field rule independently.

As a test automation student, I want a deterministic set of input profiles so that I can write data-driven tests without depending on external data.

As a test automation student, I want a success page after a valid submission so that I can practice waiting for navigation and asserting post-submit state.

## Route And Navigation

- Form route: `/form`
- Successful submission redirects to: `/submittedform`
- The redirect happens immediately on submit (client-side `router.push`), with no artificial delay.
- The `/submittedform` page displays a success confirmation message.

## Form Field Details

### Name Field

- Element id: `name`
- Type: `text`
- Placeholder: `Type your name`
- Required: yes (presence only)

Testing notes:

- A value containing only whitespace (e.g. `" "`) currently passes the presence check, because the validation uses a truthiness test and does not trim. This is a useful edge case (`F5`).

### Email Field

- Element id: `email`
- Type: `email`
- Placeholder: `Type your e-mail`
- Required: yes (presence only)

Testing notes:

- The page logic only checks that the field is non-empty; it does **not** validate the email format.
- Because the input is `type="email"`, a malformed value may be blocked by the browser's native HTML5 validation on submit, before the page's own validation runs. Confirm the actual behaviour for `N7`.

### Password Field

- Element id: `password`
- Type: `password`
- Placeholder: `Type your password`
- Required: yes (presence only)

Testing notes:

- Input is masked (`type="password"`).
- No length or strength rule is enforced.

### Country Field

- Element id: `country`
- Type: `select`
- Required: yes (the empty placeholder option counts as "not selected")
- Options (value → label):
  - `""` → `Select country` (placeholder)
  - `brazil` → `Brazil`
  - `canada` → `Canada`
  - `usa` → `United States of America`
  - `mexico` → `Mexico`
  - `portugal` → `Portugal`

### Gender Field

- Group container id: `genderGroup`
- Type: radio group, `name="gender"`
- Required: yes
- Values: `male`, `female`, `other`

Testing notes:

- The radios are mutually exclusive; selecting one deselects the others (`T3`).

### Hobbies Field

- Group container id: `hobbiesGroup`
- Type: checkbox group, `name="hobbies"`
- Required: **no** (optional — there is no hobbies error)
- Values (value → label): `books` → Read books, `travelling` → Travel, `gaming` → Video Games, `sports` → Sports, `movies` → Movies, `board-games` → Board Games

Testing notes:

- Multiple hobbies can be selected; clicking a checked box unchecks it (`T2`).

### Submit Button

- Element id: `submitBtn`
- Text: `Send`
- Type: `submit`

## Validation Rules

Validation runs on submit. Each missing required field shows its own inline error and submission is blocked; the user stays on `/form`. When all five required fields are present, the form redirects to `/submittedform`.

| Field | Error element id | Message |
| --- | --- | --- |
| Name | `nameError` | `The name field is required.` |
| Email | `emailError` | `The email field is required.` |
| Password | `passwordError` | `The password field is required.` |
| Country | `countryError` | `The country field is required.` |
| Gender | `genderError` | `The gender field is required.` |

Hobbies has no error message and never blocks submission.

## Test Profiles

These profiles live in `tests/data/form.ts`. The valid set is themed after the Teenage Mutant Ninja Turtles cast; together they cover all five countries, all three genders, and 0 / 2 / 6 hobbies. The invalid edge profile is the villain.

### Valid Profiles

| Profile | Name | Email | Country | Gender | Hobbies | Notable coverage |
| --- | --- | --- | --- | --- | --- | --- |
| `leonardo` | Leonardo Hamato | leo@tmnt.io | usa | male | books, board-games | Minimal complete happy path |
| `raphael` | Raphael Hamato | raph@tmnt.io | brazil | male | sports, gaming | Country `brazil` |
| `donatello` | Donatello Hamato | donnie@tmnt.io | portugal | male | gaming, books | Country `portugal` |
| `michelangelo` | Michelangelo Hamato | mikey@tmnt.io | mexico | other | movies, travelling | Gender `other` |
| `april` | April O'Neil | april@channel6.tv | canada | female | all 6 | Gender `female`, apostrophe in name, max hobbies |
| `splinter` | Hamato Yoshi | sensei@tmnt.io | usa | male | none | Valid submission with **0 hobbies** (optional field) |

### Edge / Invalid Profile

| Profile | Field values | Drives |
| --- | --- | --- |
| `shredder` | name `" "` (whitespace), email `shredder#foot` (malformed), empty password, no country, no gender | `F5`, `N7`, `N4`, `N5`, `N6` |
| `emptyForm` | all fields empty | `N1` (all five errors at once) |

For isolated negative tests, start from a valid profile (e.g. `leonardo`) and override a single field — that way only one error is expected.

## Suggested Acceptance Criteria

1. The form page is reachable at `/form`.
2. The page displays the instructions section and the form with all fields and the `Send` button.
3. The Country dropdown offers Brazil, Canada, USA, Mexico, and Portugal plus the placeholder.
4. Submitting a complete valid profile redirects to `/submittedform`.
5. The success page displays `Success!` and `The form has been submitted successfully.`.
6. Submitting an empty form displays all five required-field errors and stays on `/form`.
7. Each required field shows its specific error when left empty in isolation.
8. Hobbies are optional — a valid submission with zero hobbies succeeds.
9. The password field is masked.
10. Gender radios are mutually exclusive.
11. Hobby checkboxes toggle on and off.

## Suggested Test Scenarios

### Smoke

- `S1` — `/form` loads; header, all fields, and `Send` button are visible.
- `S2` — Country dropdown contains all five options plus the placeholder.
- `S3` — All six hobby checkboxes are visible and unchecked by default.

### Happy Path

- `H1` — Submit `leonardo` → redirect to `/submittedform`, success message shown.
- `H2` — Submit `april` (all 6 hobbies) → success.
- `H3` — Submit profiles covering each gender (`leonardo` male, `april` female, `michelangelo` other) → success.

### Negative

- `N1` — Submit `emptyForm` → all five required errors, stays on `/form`.
- `N2` — `leonardo` with empty name → only `nameError`.
- `N3` — `leonardo` with empty email → only `emailError`.
- `N4` — `leonardo` with empty password → only `passwordError`.
- `N5` — `leonardo` with no country → only `countryError`.
- `N6` — `leonardo` with no gender → only `genderError`.
- `N7` — `leonardo` with malformed email (`shredder#foot`) → submission blocked (see assumption).

### State / Temporal

- `T1` — After `N1`, fill a missing field and resubmit → that field's error disappears.
- `T2` — Check then uncheck a hobby → final state is unchecked.
- `T3` — Select one gender then another → only the last remains selected.

### Form Behaviour

- `F1` — Password input has `type="password"` (masked).
- `F2` — Email input has `type="email"`.
- `F4` — Submit `splinter` (zero hobbies) → success (hobbies optional).
- `F5` — Submit `leonardo` with name `" "` (whitespace only) → passes presence check (possible defect).

## Assumptions

- **A1 (`N7`):** The page does not validate email format in JS; the only barrier is the browser's native HTML5 `type="email"` constraint. Confirm whether the submit is blocked natively before finalising the assertion. If tests run with native validation disabled, malformed emails will pass.
- **A2:** Hobbies has no success/error feedback (confirmed in source — no `hobbiesError`).
- **A3:** The redirect uses client-side routing (`router.push`); URL assertions should wait for `/submittedform`.

## Recommended Selectors

Prefer ids where available (most stable on this page):

- Page container: id `formPage`
- Form: id `registrationForm`
- Header: text `Form` (id `formHeader`)
- Name field: id `name` (or label `Name`)
- Email field: id `email` (or label `Email`)
- Password field: id `password` (or label `Password`)
- Country select: id `country`
- Gender group: id `genderGroup`; radios via `name="gender"` and value
- Hobbies group: id `hobbiesGroup`; checkboxes via `name="hobbies"` and value
- Submit button: role `button`, name `Send`, or id `submitBtn`
- Field errors: ids `nameError`, `emailError`, `passwordError`, `countryError`, `genderError`
- Success page: text `Success!` and `The form has been submitted successfully.`

## Out Of Scope For These Tests

- Server-side persistence (the form only logs to the console and redirects).
- Email format validation beyond native HTML5 behaviour.
- Password strength / length rules.
- Trimming or sanitising of input values.
- Accessibility audit (covered by a separate exercise).
- Responsive / visual-layout testing.

## Source References

- Page: `src/app/form/page.tsx`
- Form component: `src/app/components/Form/Form.tsx`
- Form types: `src/app/types/form.ts`
- Success page: `src/app/submittedform/page.tsx`
- Test data: `tests/data/form.ts`
