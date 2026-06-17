# Home Page Test Reference

## Purpose

This document is the single source of truth for automated testing of the Automation Test Playground landing page (`/`). It covers all testable elements, navigation behaviour, content requirements, and suggested test scenarios.

---

## Page Overview

The landing page is a static informational page that presents the Test Playground application to new users. It contains a hero banner image, a brief introductory text, a list of available challenges, and a persistent navigation bar linking to all sections of the application.

---

## Primary User Story

> As a QA automation student, I want to see an overview of the available challenges on the landing page so that I can navigate to the section I want to practice.

---

## Supporting User Stories

- As a user on a desktop browser, I want to see the full navigation bar so that I can jump directly to any section.
- As a user on a mobile browser, I want to use the hamburger menu so that I can navigate to any section without a full-width nav bar.

---

## Route And Navigation

| Property      | Value                                       |
|---------------|---------------------------------------------|
| Route         | `/`                                         |
| Full URL      | `https://playground-drab-six.vercel.app/`   |
| Page title    | `Playground page`                           |
| Auth required | No                                          |

---

## Test Accounts

Not applicable — this page requires no authentication.

---

## Page Content Requirements

The page must render the following content:

- Application heading: **Test Playground** (in the `<header>` / banner area)
- Hero banner image with `alt="Bug Buster Mentoring Banner"`
- Introductory paragraph: *"This page was developed by the Bug Buster Mentorship team for educational purposes."*
- Challenges section heading: **Available Challenges:**
- Challenge list with exactly four items: **Login**, **Forms**, **Dynamic Table**, **And much more!**
- Footer copyright text: **© 2025 Bug Buster Mentoria.**
- Navigation bar with links to: HOME, LOGIN, FORM, TABLE, TASKS, STORE, A11Y, ABOUT

---

## Interactive Elements

### Navigation Bar (Desktop)

| Element         | Selector / Role                      | Href                 |
|-----------------|--------------------------------------|----------------------|
| HOME link       | `link[href="/"]` / text "HOME"       | `/`                  |
| LOGIN link      | `link[href="/login"]` / text "LOGIN" | `/login`             |
| FORM link       | `link[href="/form"]` / text "FORM"   | `/form`              |
| TABLE link      | `link[href="/table"]` / text "TABLE" | `/table`             |
| TASKS link      | `link[href="/tasks"]` / text "TASKS" | `/tasks`             |
| STORE link      | `link[href="/store"]` / text "STORE" | `/store`             |
| A11Y link       | `link[href="/accessibility"]` / text "A11Y" | `/accessibility` |
| ABOUT link      | `link[href="/about"]` / text "ABOUT" | `/about`             |

> **Note:** Nav links have no `id` attributes in the source. Use role + text or `href` as selectors.

### Mobile Menu Toggle Button

| Property         | Value                                              |
|------------------|----------------------------------------------------|
| Element          | `button[aria-controls="mobile-menu"]`              |
| `aria-controls`  | `mobile-menu`                                      |
| `aria-expanded`  | `false` (closed) / `true` (open)                   |
| Screen-reader label | `sr-only` span with text **"Toggle main menu"** |
| Icon             | Hamburger (bars) when closed; X (times) when open  |
| Visibility       | Visible only on mobile (`md:hidden`)               |

### Mobile Menu Overlay

| Property  | Value                                |
|-----------|--------------------------------------|
| Element id | `mobile-menu`                       |
| Default state | Hidden (`hidden` CSS class)      |
| Open state | Visible (`block` CSS class)         |
| Contains  | Full-screen links: HOME, LOGIN, FORM, TABLE, TASKS, STORE, A11Y, ABOUT |

---

## Page Element IDs

| Element id          | Tag       | Content / Purpose                                           |
|---------------------|-----------|-------------------------------------------------------------|
| `homePage`          | `<div>`   | Root wrapper of the entire landing page                     |
| `mainContent`       | `<main>`  | Main content area containing intro and challenges           |
| `introSection`      | `<section>` | Section wrapping the introductory paragraph               |
| `introText`         | `<p>`     | Introductory paragraph text                                 |
| `challengesSection` | `<section>` | Section containing the challenges list                    |
| `challengesTitle`   | `<h3>`    | "Available Challenges:" heading                             |
| `challengeList`     | `<ul>`    | Unordered list of challenge items                           |
| `loginChallenge`    | `<li>`    | List item: "Login"                                          |
| `formChallenge`     | `<li>`    | List item: "Forms"                                          |
| `tableChallenge`    | `<li>`    | List item: "Dynamic Table"                                  |
| `moreChallenges`    | `<li>`    | List item: "And much more!"                                 |
| `mobile-menu`       | `<div>`   | Mobile navigation overlay (hidden by default)              |

---

## Status Messages

This page has no dynamic status messages. All content is static and rendered on load.

---

## Business Rules

**Navigation — desktop**

- Given the viewport is ≥ 768px wide
- When the page loads
- Then the full navigation bar is visible with all 8 links

**Navigation — mobile toggle**

- Given the viewport is < 768px wide
- When the page loads
- Then the hamburger button is visible and `aria-expanded` is `false`
- And the mobile menu overlay (`#mobile-menu`) is hidden

- Given the viewport is < 768px wide
- When the user clicks the hamburger button
- Then `aria-expanded` becomes `true`
- And the mobile menu overlay becomes visible with all 8 navigation links

- Given the mobile menu is open
- When the user clicks any navigation link
- Then the menu closes and the browser navigates to the target route

- Given the mobile menu is open
- When the user clicks the X (close) button
- Then the menu closes and `aria-expanded` returns to `false`

**Navigation — link targets**

- Given the user is on any page
- When the user clicks the HOME nav link
- Then the browser navigates to `/`

- Given the user clicks any nav link (LOGIN, FORM, TABLE, TASKS, STORE, A11Y, ABOUT)
- Then the browser navigates to the corresponding route as listed in the navigation table above

**Static content**

- Given the page loads successfully
- When the DOM is ready
- Then the banner image is present with alt text "Bug Buster Mentoring Banner"
- And the intro text exactly matches: "This page was developed by the Bug Buster Mentorship team for educational purposes."
- And the challenges list contains exactly 4 items: Login, Forms, Dynamic Table, And much more!
- And the footer contains "© 2025 Bug Buster Mentoria."

---

## Suggested Acceptance Criteria

1. The page title is "Playground page".
2. The heading "Test Playground" is visible in the header area.
3. The banner image renders with the correct alt text.
4. The introductory text is present and matches exactly.
5. The "Available Challenges:" section is visible with all four list items.
6. All eight navigation links are present and point to the correct routes.
7. On mobile viewports, the hamburger button is visible and the desktop nav is hidden.
8. Clicking the hamburger button opens the mobile menu overlay.
9. Clicking a link inside the mobile menu closes the menu and navigates correctly.
10. The footer copyright text is visible.

---

## Suggested Test Scenarios

### Smoke Tests

- **[SMOKE] Home page loads successfully** — Navigate to `/`, assert page title is "Playground page" and element `#homePage` is visible.
- **[SMOKE] Navigation bar is present** — Assert all 8 nav links are visible on desktop viewport.
- **[SMOKE] Challenges section is present** — Assert `#challengesSection` is visible and `#challengeList` contains 4 items.

### Positive Flow

- **[POSITIVE] Banner image renders** — Assert the banner image with alt "Bug Buster Mentoring Banner" is visible and not broken.
- **[POSITIVE] Intro text is correct** — Assert `#introText` contains the exact expected text.
- **[POSITIVE] Challenge list items match** — Assert `#loginChallenge`, `#formChallenge`, `#tableChallenge`, and `#moreChallenges` have the correct text.
- **[POSITIVE] Footer copyright is visible** — Assert footer contains "© 2025 Bug Buster Mentoria."
- **[POSITIVE] Navigate to Login via nav** — Click the LOGIN nav link, assert browser is at `/login`.
- **[POSITIVE] Navigate to Form via nav** — Click the FORM nav link, assert browser is at `/form`.
- **[POSITIVE] Navigate to Table via nav** — Click the TABLE nav link, assert browser is at `/table`.
- **[POSITIVE] Navigate to Tasks via nav** — Click the TASKS nav link, assert browser is at `/tasks`.
- **[POSITIVE] Navigate to Store via nav** — Click the STORE nav link, assert browser is at `/store`.
- **[POSITIVE] Navigate to A11Y via nav** — Click the A11Y nav link, assert browser is at `/accessibility`.
- **[POSITIVE] Navigate to About via nav** — Click the ABOUT nav link, assert browser is at `/about`.
- **[POSITIVE] HOME link stays on home page** — Click HOME nav link, assert browser remains at `/`.

### Mobile Navigation Flow

- **[MOBILE] Hamburger button is visible on mobile** — Set viewport to 375px wide, assert hamburger button (`button[aria-controls="mobile-menu"]`) is visible and desktop nav is hidden.
- **[MOBILE] Mobile menu opens on hamburger click** — Click the hamburger button, assert `#mobile-menu` becomes visible and `aria-expanded` is `true`.
- **[MOBILE] Mobile menu closes on X click** — With the menu open, click the X button, assert `#mobile-menu` is hidden and `aria-expanded` is `false`.
- **[MOBILE] Mobile menu closes on link click** — With the menu open, click the LOGIN link, assert browser navigates to `/login` and menu is no longer visible.
- **[MOBILE] All 8 links are present in mobile menu** — Open the mobile menu, assert all 8 links (HOME, LOGIN, FORM, TABLE, TASKS, STORE, A11Y, ABOUT) are visible.

### Negative Flows

- **[NEGATIVE] Invalid route returns 404** — Navigate to `/nonexistent`, assert appropriate not-found behaviour (assumption: Next.js default 404 page is shown).

---

## Recommended Selectors

- `#homePage` — root page wrapper
- `#mainContent` — main content area
- `#introSection` — intro section wrapper
- `#introText` — introductory paragraph
- `#challengesSection` — challenges section wrapper
- `#challengesTitle` — "Available Challenges:" heading
- `#challengeList` — challenge list `<ul>`
- `#loginChallenge` — "Login" list item
- `#formChallenge` — "Forms" list item
- `#tableChallenge` — "Dynamic Table" list item
- `#moreChallenges` — "And much more!" list item
- `#mobile-menu` — mobile navigation overlay
- `button[aria-controls="mobile-menu"]` — hamburger/close toggle button
- `img[alt="Bug Buster Mentoring Banner"]` — hero banner image
- `a[href="/login"]` — LOGIN nav link (use text filter to disambiguate desktop/mobile duplicates)
- `a[href="/form"]` — FORM nav link
- `a[href="/table"]` — TABLE nav link
- `a[href="/tasks"]` — TASKS nav link
- `a[href="/store"]` — STORE nav link
- `a[href="/accessibility"]` — A11Y nav link
- `a[href="/about"]` — ABOUT nav link

> **Note:** Desktop and mobile nav render duplicate `<a>` elements with the same `href`. When asserting the desktop nav, scope to the visible desktop container. When testing mobile, scope to `#mobile-menu`.

---

## Out Of Scope For These Tests

- Content or behaviour of pages reached via navigation links (LOGIN, FORM, TABLE, TASKS, STORE, A11Y, ABOUT) — each has its own reference doc.
- Visual regression / pixel-perfect screenshot comparison.
- Performance and load time benchmarks.
- SEO meta tags and Open Graph tags (present in HTML head but not user-visible).
- The banner image CDN availability (external dependency on Cloudinary).

---

## Source References

- `src/app/page.tsx` — page root component
- `src/app/components/Banner/HomeBanner.tsx` — hero banner image component
- `src/app/components/Lists/ChallengeList.tsx` — main content: intro text and challenges list
- `src/app/components/Navbar/Navbar.tsx` — navigation bar shell
- `src/app/components/Navbar/NavbarWeb.tsx` — desktop navigation links
- `src/app/components/Navbar/NavbarMobile.tsx` — mobile hamburger toggle and overlay menu
