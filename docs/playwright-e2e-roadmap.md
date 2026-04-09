# GAD Playwright E2E Roadmap

## Scope

This roadmap is based on the current default GAD UI surface:

- Main modules visible from the home page: Articles, Practice Pages, Games, Book Shop, Learning
- Core GUI pages: registration, login, users, articles, comments, flashposts, stats, tools, backoffice
- Book Shop business flows: catalog, account, orders, payments, inventory, roles
- Learning business flows: auth, catalog, enrollment, course viewer, progress, certificates, instructor/admin views
- Practice Pages index and its category-based challenge catalog
- Games index and the most automation-friendly game flows

Out of scope for the base roadmap:

- Bug Hatch and Gad Talk modules, because they are disabled by default via feature flags
- Feature-flagged GUI paths such as likes, bookmarks, labels, captcha, files, and similar optional flows until the base suite is stable

## Recommended Playwright Strategy

- Keep the base suite aligned with default app configuration first.
- Reset test data frequently by calling `/api/restoreDB` before destructive feature groups.
- Prefer UI setup for true end-to-end confidence, but allow API setup for role-heavy or expensive preconditions.
- Create reusable auth states for:
  - anonymous visitor
  - main GAD user
  - Book Shop customer
  - Book Shop coordinator
  - Book Shop admin
  - Learning student
  - Learning instructor
  - Learning admin
- Tag scenarios consistently:
  - `@smoke`
  - `@crud`
  - `@validation`
  - `@edge`
  - `@destructive`
  - `@feature-flag`
- Keep Practice Pages and Games mostly representative, not exhaustive, in the first implementation wave.

## Suggested Playwright Repo Layout

```text
tests/
  smoke/
  app-shell/
  community/
  book-shop/
  learning/
  practice/
  games/
  tools/
```

## Phase 1 Smoke Suite

Build these first:

1. Home page loads and shows the five default modules.
2. Main GAD registration and login work end to end.
3. Articles list opens, search/sort controls render, and one article detail opens.
4. Flashposts page opens for an authenticated user.
5. Book Shop dashboard opens and anonymous browsing of books works.
6. Book Shop authenticated customer can open account and orders.
7. Learning welcome page opens, guest CTAs render, and dashboard course catalog loads.
8. Learning login succeeds for a seeded student and enrolled content is reachable.
9. Practice index opens and category filtering/navigation works.
10. Representative Practice Page flows work:
    - drag and drop
    - iframe
    - modal/login popup
    - file upload
11. Games index opens and one simple game flow works:
    - quiz or hangman
12. Backoffice, Tools, Swagger, and Version pages open without critical UI failures.

## Feature Roadmap

### 1. App Shell and Core Authentication

#### Smoke

- Home page loads, branding is visible, and module links navigate correctly.
- Header menu renders correctly for anonymous and authenticated states.
- Main login flow sets session cookies and reveals authenticated navigation.
- Logout clears session and returns the user to a guest state.

#### Positive CRUD

- Register a new main-app user through `/register.html`.
- Log in with the new user.
- Open My Account and confirm the created identity is reflected in the UI.

#### Validations

- Registration rejects invalid email.
- Registration rejects invalid surname/password formats.
- Login rejects incorrect credentials.

#### Edge Cases

- Visiting `/welcome` without a valid session redirects to `/login`.
- Authenticated-only navigation remains hidden for anonymous users.

### 2. Community Module: Articles, Comments, Users, Flashposts

#### Smoke

- Articles list loads with pagination, search, sort, and per-page controls.
- Article detail page loads and renders article metadata plus comments section.
- Users page loads for an authenticated user.
- Comments list page loads and search/sort controls work.
- Flashposts page loads for an authenticated user.

#### Positive CRUD

- Create a new article from the Articles page and land on the new article detail page.
- Add a comment from the article detail page.
- Register a new user and verify the user appears in the Users flow.
- Create a flashpost, then update it, then delete it.

#### Validations

- User registration blocks bad input combinations.
- Article creation handles empty or invalid required fields gracefully.
- Comment creation validates empty comment body.
- Flashpost creation enforces character limit and required content.

#### Edge Cases

- Invalid article ID shows the no-data state instead of a broken page.
- Search with no results shows an empty-state message.
- Pagination and sort remain stable after data creation.
- Flashpost edit/delete permission window and ownership rules behave correctly.

### 3. Book Shop

#### Smoke

- Dashboard opens and role-based sections are visible or hidden appropriately.
- Books page loads for anonymous users with search and sort available.
- Authenticated customer can open Account, Orders, and Payment History.
- Coordinator or admin can access Manage Items and Manage Orders.
- Admin can access Manage Roles and Statistics.

#### Positive CRUD

- Customer account bootstrap or first authorized Book Shop entry succeeds.
- Customer updates address data in Account.
- Customer adds or updates a payment card and tops up funds.
- Customer creates an order, adds books/items, applies a coupon, and sends the order.
- Customer cancels an active order.
- Coordinator creates, updates, and deletes inventory items.
- Coordinator/admin updates order statuses through the management view.
- Admin adds a new book to the catalog, including cover upload if stable enough for the suite.
- Admin changes a user role in Manage Roles.

#### Validations

- Payment card validation rejects malformed card number or CVV.
- Order submission fails cleanly when prerequisites are missing.
- Protected pages reject users without a Book Shop account or proper role.
- Coupon validation handles invalid or expired codes.
- Inventory forms validate required fields and numeric constraints.

#### Edge Cases

- One-active-order rule is enforced.
- Status transitions follow workflow rules and reject invalid jumps.
- Book catalog search/sort state remains stable across navigation.
- Payment history filters handle empty results and reset correctly.
- Role-based side panel content updates correctly after role changes.

### 4. Learning

#### Smoke

- Welcome page loads with guest CTAs.
- Guest can open Dashboard and browse the course catalog.
- Learning login succeeds for a seeded student.
- Authenticated student can open Enrolled Courses, Progress, and Account.
- Public certificate page renders for a valid certificate ID.

#### Positive CRUD

- Register a new Learning user and log in.
- Browse/search/filter/sort courses from the dashboard.
- Enroll in a free course and reach the course viewer.
- Complete lesson progression in the course viewer.
- Submit a quiz and verify progress update.
- Complete a course and verify certificate generation plus public certificate access.
- Update profile/account details.
- Instructor creates or edits course content and lessons.
- Admin manages roles or admin-only health/management screens.

#### Validations

- Registration validates first name, last name, username, email, and password rules.
- Login rejects bad credentials.
- Non-enrolled user is blocked from course viewer access.
- Quiz submission validates incomplete or invalid answers.
- Role-restricted instructor/admin pages reject unauthorized users.

#### Edge Cases

- Progress persists after logout/login.
- Free-course enrollment path works without payment.
- Certificate download/public verification remains valid after completion.
- Search and tag/level filters produce correct empty states.
- Instructor analytics and dashboard gracefully handle empty datasets.

### 5. Practice Pages

Use a representative coverage strategy first. The Practice area is very broad and is better automated by category than by trying to cover every page in one pass.

#### Smoke

- Practice index loads and category/tag filtering works.
- One representative page loads successfully for each high-value category:
  - Simple Elements
  - Elements with changing state
  - Tables
  - Drag and drop
  - Popup and alerts
  - IFrames
  - Shadow DOM
  - Forms
  - WebSockets
  - File download

#### Positive CRUD

- Fancy registration form completes successfully.
- Todo or budget mini-app completes a create/update/delete flow.
- Restaurant Order flow completes a happy-path order.
- Reservation flow completes a happy-path booking.
- 2FA flow completes with a correct token/code.
- Testagram or Chirper completes a basic social-app flow if chosen for deeper coverage.

#### Validations

- Form pages show expected required-field and format validation.
- Reservation flows reject invalid dates or incomplete guest data.
- 2FA rejects incorrect code.
- Loan-processing or order-style practice apps reject invalid payloads.

#### Edge Cases

- Dynamic IDs and no-ID pages remain automatable with resilient locator strategy.
- Delayed elements and slowly loaded data use robust waiting patterns.
- WebSocket pages handle reconnect/state updates.
- Download pages verify file name/content expectations.
- Console-error challenge pages are isolated so intentional errors do not destabilize the suite.

### 6. Games

Prioritize deterministic games first. Leave highly animated or multiplayer-heavy cases for later waves unless they are business-critical for your repo.

#### Smoke

- Games index loads and core game cards navigate correctly.
- Quiz page opens and starts a session.
- Hangman page opens and accepts input.
- Minesweeper page opens and board renders.
- Tic Tac Toe collection opens and links to sub-modes.

#### Positive CRUD

- Quiz happy path: start, answer questions, finish.
- Hangman happy path: start, guess letters, finish round.
- Minesweeper happy path: reveal cells and complete a round if deterministic enough.
- Tic Tac Toe hot-seat or bot mode: play through a complete game.

#### Validations

- Logged-out scoring or protected actions are rejected where authentication is required.
- Tic Tac Toe rejects invalid move attempts.
- Hangman handles repeated or invalid guesses correctly.

#### Edge Cases

- Multiplayer Tic Tac Toe session behavior is covered separately because it is stateful and timing-sensitive.
- Highly animated games are candidates for visual or stability-focused tests, not first-wave smoke.

### 7. Tools, Backoffice, and Operational Pages

#### Smoke

- Backoffice page opens and key links render.
- Tools page opens and lists GUI/API utilities.
- Swagger and Version pages load.
- DB restore links are present.

#### Positive CRUD

- Restore default DB from the UI or direct endpoint and verify success message/state reset.
- Toggle feature flags only in dedicated flagged suites.
- Open SQL playground and verify it initializes.

#### Validations

- Destructive restore flows should require explicit test intent and clear post-action verification.
- Feature-flag suites should verify both enabled and disabled states when applicable.

#### Edge Cases

- Alternate restore datasets such as tiny, empty, or big DB should live in dedicated data-profile suites.
- Diagnostic pages and endpoints should be isolated from main smoke because they can be environment-sensitive.

## Feature-Flag and Optional Phase

Create a separate later phase for:

- Article likes
- Bookmarks
- Labels
- Captcha
- File upload variants that depend on disabled flags
- Bug Hatch module
- Gad Talk module

These should use dedicated Playwright projects or tags so the default suite stays predictable.

## Recommended Implementation Order

1. Phase 1 smoke suite across app shell, community, Book Shop, Learning, Practice index, Games, and Tools.
2. Positive CRUD flows for Community, Book Shop customer journeys, and Learning enrollment/progress.
3. Validation coverage for registration, auth, payment, quiz, and representative form-heavy Practice Pages.
4. Edge cases, role matrices, alternate datasets, feature flags, and optional modules.

