# GAD MVP Page Object Model Plan

## Purpose

This document defines a practical Page Object Model structure for implementing the MVP scenarios described in [mvp-scope.md](/Users/pawelluszynski/projects/playwright/playwright-gad-e2e/docs/mvp-scope.md). The goal is to keep the POM small, readable, and maintainable while still covering the main product areas needed for a portfolio-quality Playwright project.

This is intentionally not a full application model. It covers only the pages and feature surfaces needed for the MVP batch.

## Design principles

- Group page objects by feature or module.
- Prefer one page object per page or feature area, not per widget.
- Keep shared abstractions shallow.
- Put only navigation and user-facing interactions in page objects.
- Keep test data setup, API restore, and seeded-user handling outside page objects.
- Avoid generic base classes unless they remove obvious duplication.

## Proposed structure

```text
pages/
  core/
    AppShellPage.ts
  auth/
    LoginPage.ts
    RegisterPage.ts
  community/
    ArticlesPage.ts
    ArticleDetailPage.ts
    FlashpostsPage.ts
  book-shop/
    BookShopCatalogPage.ts
    BookShopCustomerAreaPage.ts
  learning/
    LearningWelcomePage.ts
    LearningDashboardPage.ts
    LearningCourseViewerPage.ts
  practice/
    PracticeIndexPage.ts
    PracticeDragDropPage.ts
    PracticeIFramePage.ts
    PracticeModalPage.ts
  games/
    GamesIndexPage.ts
    QuizGamePage.ts
  operations/
    VersionPage.ts
```

## Page objects by module

### Core

| Page Object name | Responsibility | Likely methods | Notes on dependencies |
| --- | --- | --- | --- |
| `AppShellPage` | Model the home page, top-level navigation, and shared guest/authenticated UI checks used across smoke scenarios. | `gotoHome()`, `assertHomeLoaded()`, `assertModuleCardsVisible()`, `openModule(name)`, `assertGuestNav()`, `assertAuthenticatedNav()`, `logout()` | Should stay thin. Do not turn the header into a separate object unless it becomes clearly reusable across many tests. Can be reused by auth, smoke, and module entry flows. |

### Auth

| Page Object name | Responsibility | Likely methods | Notes on dependencies |
| --- | --- | --- | --- |
| `LoginPage` | Handle main-app login and invalid-login coverage. | `goto()`, `login(email, password)`, `submitInvalidLogin(email, password)`, `assertLoginError()`, `assertLoginFormVisible()` | Depends on shared auth route only. Post-login assertions should usually be delegated to `AppShellPage` or the landing page reached after login. |
| `RegisterPage` | Handle public registration for the main app. | `goto()`, `registerUser(userData)`, `assertRegistrationFormVisible()`, `assertRegistrationSuccess()` | Should accept plain data objects from fixtures/helpers. Do not embed random-user generation inside the page object. |

### Community

| Page Object name | Responsibility | Likely methods | Notes on dependencies |
| --- | --- | --- | --- |
| `ArticlesPage` | Model article list browsing for smoke coverage. | `goto()`, `assertListLoaded()`, `search(term)`, `sortBy(option)`, `openArticle(titleOrIndex)` | Keep search/sort methods only if they are used by MVP tests. Avoid adding pagination helpers until needed. |
| `ArticleDetailPage` | Model article detail verification after opening from the list. | `assertDetailLoaded()`, `assertMetadataVisible()`, `assertCommentsSectionVisible()` | Simple read-oriented object. Depends on navigation from `ArticlesPage` or direct URL patterns if later needed. |
| `FlashpostsPage` | Handle the single MVP create flow for authenticated flashposts. | `goto()`, `assertPageLoaded()`, `createFlashpost(content)`, `assertFlashpostVisible(content)` | Requires authenticated state. Cleanup logic should stay in test hooks or environment reset utilities, not inside the page object. |

### Book Shop

| Page Object name | Responsibility | Likely methods | Notes on dependencies |
| --- | --- | --- | --- |
| `BookShopCatalogPage` | Model anonymous catalog access and lightweight browse checks. | `goto()`, `assertCatalogLoaded()`, `search(term)`, `sortBy(option)`, `assertBooksVisible()` | Keep this public-facing. Do not mix customer account behavior into the catalog object. |
| `BookShopCustomerAreaPage` | Cover the MVP authenticated customer access checks for Account and Orders. | `gotoAccount()`, `gotoOrders()`, `assertAccountVisible()`, `assertOrdersVisible()`, `assertCustomerNavVisible()` | Requires a seeded customer session. This is intentionally feature-level rather than splitting Account and Orders into separate objects for shallow smoke coverage. |

### Learning

| Page Object name | Responsibility | Likely methods | Notes on dependencies |
| --- | --- | --- | --- |
| `LearningWelcomePage` | Model guest-facing Learning entry and high-level navigation. | `goto()`, `assertWelcomeLoaded()`, `openCatalog()`, `assertGuestCtasVisible()` | Can hand off to `LearningDashboardPage` after opening the catalog. Keep it focused on public landing behavior. |
| `LearningDashboardPage` | Model public catalog access and authenticated student dashboard navigation. | `assertDashboardLoaded()`, `assertCatalogVisible()`, `searchCourse(term)`, `openEnrolledCourse(name)` | Used by both guest and authenticated student scenarios. Avoid modeling enrollment or instructor/admin behavior in this MVP object. |
| `LearningCourseViewerPage` | Verify the enrolled course viewer is reachable and rendered for the seeded student. | `assertViewerLoaded()`, `assertLessonContentVisible()`, `assertCourseTitleVisible()` | Read-only for MVP. Do not add lesson progression or quiz behavior until those scenarios are in scope. |

### Practice Pages

| Page Object name | Responsibility | Likely methods | Notes on dependencies |
| --- | --- | --- | --- |
| `PracticeIndexPage` | Model the Practice landing page and category navigation. | `goto()`, `assertIndexLoaded()`, `filterByCategory(name)`, `openPracticePage(name)` | Acts as the entry point to all representative Practice flows. |
| `PracticeDragDropPage` | Model one representative drag-and-drop challenge. | `assertPageLoaded()`, `completeDragAndDrop()`, `assertSuccessState()` | Dedicated object is justified because drag-and-drop interactions are unlike the other Practice pages. |
| `PracticeIFramePage` | Model one representative iframe challenge. | `assertPageLoaded()`, `switchToTargetFrame()`, `completeCoreInteraction()`, `assertSuccessState()` | Keep frame handling inside this object so tests do not manage raw frame logic directly. |
| `PracticeModalPage` | Model one representative popup or modal challenge. | `assertPageLoaded()`, `openModalOrPopup()`, `completeModalFlow()`, `assertSuccessState()` | Name can be adjusted once the exact MVP page is chosen. One object is enough for the selected popup/modal scenario. |

### Games

| Page Object name | Responsibility | Likely methods | Notes on dependencies |
| --- | --- | --- | --- |
| `GamesIndexPage` | Model the Games landing page and navigation to the chosen MVP game. | `goto()`, `assertIndexLoaded()`, `openGame(name)` | Keep this as a thin navigation object. |
| `QuizGamePage` | Model the single MVP game flow. | `assertPageLoaded()`, `startQuiz()`, `answerQuestion(answer)`, `finishQuiz()`, `assertResultVisible()` | Good candidate for light internal helper methods if question flow repeats, but avoid building a generic game framework. |

### Operations

| Page Object name | Responsibility | Likely methods | Notes on dependencies |
| --- | --- | --- | --- |
| `VersionPage` | Model the simple operational page used for environment verification. | `goto()`, `assertPageLoaded()`, `assertVersionInfoVisible()` | Should remain standalone and read-only. Do not fold operational utilities into a larger admin object for this MVP. |

## Supporting pieces that should not become page objects

- `auth` or `storageState` fixtures for seeded users
- test data builders for registration payloads and flashpost content
- DB reset or restore helpers
- route constants or lightweight URL helpers
- assertion helpers only when the same assertion becomes noisy across multiple specs

These support the suite, but they should stay outside `pages/` to avoid mixing environment setup with UI behavior.

## Dependency guidance

- `AppShellPage` is the main shared dependency and should be the only broadly reused cross-module object.
- Module page objects should depend on Playwright `Page` and, where useful, hand off navigation between each other through clear method boundaries.
- Avoid inheritance-heavy designs. Composition through small helpers is enough if duplication appears.
- Keep Practice and Games isolated from the rest of the app model. They are representative modules, not a shared abstraction source.
- If a page object is only used by one scenario and has fewer than a few meaningful interactions, keep it minimal rather than forcing additional layers.
- Revisit splits only when a page grows beyond MVP needs. The portfolio value here comes from clarity, not from building a large framework early.

## Recommended build order

1. `AppShellPage`
2. `LoginPage` and `RegisterPage`
3. `ArticlesPage` and `ArticleDetailPage`
4. `BookShopCatalogPage`
5. `LearningWelcomePage` and `LearningDashboardPage`
6. `PracticeIndexPage`
7. `GamesIndexPage`
8. `VersionPage`
9. `FlashpostsPage`, `BookShopCustomerAreaPage`, and `LearningCourseViewerPage`
10. `PracticeDragDropPage`, `PracticeIFramePage`, `PracticeModalPage`, and `QuizGamePage`

This order matches the MVP rollout: public smoke first, then auth, then seeded authenticated coverage, then representative deeper interactions.
