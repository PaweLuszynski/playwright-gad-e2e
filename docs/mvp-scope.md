# GAD Playwright MVP Scope

## 1. Purpose

This document defines the first practical automation batch for a Playwright + TypeScript + Page Object Model portfolio project built around the GAD app. It narrows the broader roadmap to a maintainable MVP that is realistic to implement, stable enough to demo, and broad enough to show sound automation design across the main product areas.

The goal of this MVP is not deep coverage. The goal is to ship a clean first suite that demonstrates:

- sensible test selection
- stable end-to-end flows
- reusable Page Objects
- controlled test data dependencies
- good breadth across the app

## 2. Scope included

The MVP should include only the first automation batch that gives strong portfolio value with low setup and maintenance cost.

- App shell and navigation smoke coverage
- Core authentication flows: registration, login, logout
- Community coverage limited to one browse flow and one lightweight create flow
- Book Shop coverage limited to catalog browsing plus one stable authenticated customer flow
- Learning coverage limited to catalog visibility and one seeded student access flow
- Practice Pages coverage limited to the index plus a small representative set of stable page types
- Games coverage limited to the index plus one simple deterministic game flow
- One simple operational page that is stable and useful for basic environment verification
- A very small amount of validation coverage, only where it adds obvious value

## 3. Scope excluded for now

The following areas should stay out of the MVP to avoid unnecessary test fragility and dependency sprawl.

- Feature-flagged modules and optional GUI paths
- Advanced role matrices in Book Shop, Learning, Backoffice, and admin management pages
- Deep CRUD chains that require multiple preconditions, cross-module setup, or destructive cleanup
- Multiplayer, timing-sensitive, animation-heavy, or highly stateful game scenarios
- Alternate restore datasets, environment-specific diagnostics, and dedicated API utility coverage
- WebSocket-heavy Practice Pages and scenarios built around live state updates
- Large validation matrices, negative-path sweeps, and detailed edge-case coverage
- Complex file handling, upload variants, or download-content assertions that add infrastructure noise
- Instructor/admin Learning management flows
- Advanced inventory, payments, coupon, role, and order workflow coverage in Book Shop

## 4. MVP scenarios table

| Feature | Scenario | Priority | Automation Risk | Depends on | Status |
| --- | --- | --- | --- | --- | --- |
| App Shell | Home page loads and the default module cards are visible and navigable. | P0 | Low | Stable base URL, default seed data | Planned |
| Auth | Register a new main-app user through the public registration page. | P0 | Medium | Unique test data, clean DB state | Planned |
| Auth | Log in with a seeded main-app user and confirm authenticated navigation is shown. | P0 | Low | Seeded user credentials | Planned |
| Auth | Log out and confirm the session returns to a guest state. | P0 | Low | Working authenticated session | Planned |
| Auth Validation | Login rejects incorrect credentials with a clear error state. | P1 | Low | Login page stability | Todo |
| Community / Articles | Articles list loads and one article detail page opens successfully. | P0 | Low | Public article seed data | Planned |
| Community / Flashposts | Authenticated user creates a simple flashpost and sees the new entry rendered. | P1 | Medium | Seeded user, isolated cleanup strategy | Todo |
| Book Shop | Anonymous user opens the catalog and basic search or sort controls render correctly. | P0 | Low | Public catalog seed data | Planned |
| Book Shop | Seeded customer opens Account and Orders pages without access or rendering issues. | P1 | Medium | Seeded Book Shop customer account | Planned |
| Learning | Learning welcome page and public course catalog load for a guest user. | P0 | Low | Public course seed data | Planned |
| Learning | Seeded student logs in and reaches an enrolled course viewer. | P1 | Medium | Seeded student with enrollment | Planned |
| Practice Pages | Practice index loads and category-based navigation/filtering works. | P0 | Low | Stable index content | Planned |
| Practice Pages / Drag and Drop | Representative drag-and-drop page completes its core happy path. | P1 | Medium | Resilient locators, stable DOM events | Todo |
| Practice Pages / IFrame | Representative iframe page can be accessed and interacted with successfully. | P1 | Medium | Reliable frame waits | Todo |
| Practice Pages / Modal or Popup | Representative popup/modal flow completes a simple success path. | P1 | Medium | Deterministic popup/modal behavior | Todo |
| Practice Pages Validation | One representative form page shows required-field or format validation. | P2 | Medium | Stable validation copy and selectors | Deferred |
| Games | Games index loads and core game navigation works. | P1 | Low | Stable games landing page | Planned |
| Games / Quiz | Quiz game completes one clean happy-path run. | P1 | Medium | Deterministic questions or tolerant assertions | Todo |
| Operational | Version page loads and exposes expected version/build information. | P2 | Low | Stable version page or endpoint | Planned |
| Book Shop / Orders | Customer creates and submits an order end to end. | P2 | High | Account bootstrap, payment state, inventory state | Deferred |

## 5. Recommended implementation order

1. Build the public smoke layer first: home page, articles browse, Book Shop catalog, Learning welcome/catalog, Practice index, Games index, Version page.
2. Add core auth flows next: registration, login, logout, and one simple invalid-login validation.
3. Add seeded authenticated smoke coverage: Book Shop customer access and Learning student access.
4. Add one lightweight Community create flow: flashpost creation.
5. Add representative Practice Page coverage: drag-and-drop, iframe, and modal/popup.
6. Finish with one simple game flow: Quiz happy path.
7. Leave deferred scenarios out of the first batch unless the implemented suite is already stable and cheap to maintain.

## 6. Notes for automation

- Favor seeded users over UI-created role setup whenever role or account bootstrap is not the behavior under test.
- Keep destructive or state-changing scenarios isolated and reset data before those groups if the environment supports it.
- Use Page Objects at page or feature boundaries, not per widget. The MVP should prove structure, not build a large abstraction layer.
- Prefer assertions on visible user outcomes over deep internal state checks.
- Keep Practice Pages intentionally representative. The value is locator strategy variety, not catalog completeness.
- Avoid chaining complex cross-module flows in a single test. Portfolio value is higher when each scenario is readable and independently explainable.
- Treat deferred scenarios as deliberate non-goals for the MVP, not as missing work.
- If `docs/test-roadmap.md` is later added or renamed, this file should still remain the narrower implementation scope rather than a duplicate roadmap.

## 7. MVP test coverage tracker (split into smaller steps)

Use this as the single checklist for what should be covered by tests in the MVP batch.

### 7.1 Implemented now

- [x] App Shell: home page loads and default module cards are visible.
- [x] App Shell: default module cards are navigable to their target modules.
- [x] Community / Articles: articles list loads.
- [x] Community / Articles: one article detail page opens successfully.

### 7.2 Next public smoke tests (no auth required)

- [x] Book Shop: catalog page loads for anonymous user.
- [x] Book Shop: basic search controls render correctly.
- [x] Book Shop: basic sort controls render correctly.
- [x] Learning: welcome page loads for guest user.
- [x] Learning: public course catalog loads for guest user.
- [ ] Practice Pages: index loads.
- [ ] Practice Pages: category navigation/filtering works.
- [ ] Games: games index loads.
- [ ] Games: core game navigation works.
- [ ] Operational: version page loads.
- [ ] Operational: version/build information is visible.

### 7.3 Core authentication tests

- [ ] Auth: register a new main-app user via public registration.
- [ ] Auth: login with seeded main-app user.
- [ ] Auth: authenticated navigation is shown after login.
- [ ] Auth: logout from authenticated session.
- [ ] Auth: session returns to guest state after logout.
- [ ] Auth Validation: incorrect credentials show a clear error state.

### 7.4 Seeded authenticated module smoke

- [ ] Book Shop: seeded customer opens Account page.
- [ ] Book Shop: seeded customer opens Orders page.
- [ ] Learning: seeded student logs in.
- [ ] Learning: seeded student reaches an enrolled course viewer.

### 7.5 Lightweight create and representative interaction tests

- [ ] Community / Flashposts: authenticated user creates a simple flashpost.
- [ ] Community / Flashposts: newly created flashpost entry is rendered.
- [ ] Practice Pages / Drag and Drop: representative page completes core happy path.
- [ ] Practice Pages / IFrame: representative iframe page is accessible.
- [ ] Practice Pages / IFrame: representative iframe interactions succeed.
- [ ] Practice Pages / Modal or Popup: representative popup/modal success path completes.
- [ ] Games / Quiz: one clean quiz happy-path run completes.

### 7.6 Deferred (not part of first MVP batch unless promoted later)

- [ ] Practice Pages Validation: representative form required-field or format validation.
- [ ] Book Shop / Orders: customer creates and submits an order end to end.
