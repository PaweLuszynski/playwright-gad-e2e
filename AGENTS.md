# Repository Guidelines

## Project Structure & Module Organization
This repository is a small Playwright end-to-end test project written in TypeScript. Keep browser specs in `tests/`, Page Object Model helpers in `pages/`, and reusable fixtures or sample payloads in `test-data/`. Core runner configuration lives in `playwright.config.ts`, and TypeScript compiler settings live in `tsconfig.json`.

Example layout:
`tests/login.spec.ts`
`pages/LoginPage.ts`
`test-data/users.json`

The application under test is located in a separate local repository:
Playwright/gad-gui-api-demo

When creating or updating tests:
- always inspect the app source code first
- verify data-testid, href, form field names, and DOM structure in the app repo
- do not guess selectors

## Build, Test, and Development Commands
Install dependencies with `npm install`.

Run the Chromium suite with `npx playwright test`. The config currently targets `chromium`, runs tests from `tests/`, and expects the app under test at `http://localhost:3000`.

Before running any Playwright tests, start the app under test from the separate `gad-gui-api-demo` repository and verify it is reachable on `http://localhost:3000`.

When asked to run tests, execute all currently available Playwright tests in this repo unless the user explicitly asks for a narrower scope.

Open the last HTML report with `npx playwright show-report`.

Type-check support files with `npx tsc --noEmit`.

Note: `npm test` is still a placeholder in `package.json`; prefer the Playwright commands above until scripts are added.

## Coding Style & Naming Conventions
Use TypeScript with `strict` mode in mind and keep code simple and explicit. Match the surrounding file’s formatting; in TypeScript files, prefer single quotes and trailing commas where the formatter introduces them.

Name test files `*.spec.ts`. Name page objects with PascalCase class and file names, for example `CheckoutPage.ts`. Keep selectors and page interactions inside page objects rather than scattering them across specs.

## Testing Guidelines
Use `@playwright/test` for all automated coverage. Each spec should focus on one user flow or behavior and use descriptive test names such as `should submit a valid order`.

Before opening a PR, run `npx playwright test` and attach the relevant failure details or report output if a test is flaky or intentionally skipped. Keep screenshots, videos, and reports out of git; generated output is already ignored.

## Commit & Pull Request Guidelines
Current history starts with `Initial commit`, so keep commit subjects short, imperative, and specific, for example `Add checkout smoke test`.

PRs should include a brief summary, the app state or environment assumed by the tests, and the commands you ran to verify the change. Link related issues when applicable, and include report screenshots only when they clarify failures or behavior changes.

## Configuration & Security Tips
Do not commit `.env` files, credentials, or local report artifacts. If the app URL changes, update `baseURL` in `playwright.config.ts` rather than hardcoding hosts inside tests.

## Documentation
This project is driven by:

- `docs/test-roadmap.md`
- `docs/mvp-scope.md` (source of truth)
- `docs/pom-plan.md`

Agents MUST read these documents before implementing anything. Treat `docs/mvp-scope.md` as the scope boundary and primary implementation reference when there is any ambiguity.

## Agent Rules (IMPORTANT)
- Always follow the MVP scope.
- Do not implement anything outside the current MVP scope unless explicitly asked.
- Respect the Page Object Model structure defined in `docs/pom-plan.md`.
- Do not create unnecessary Page Objects.
- Do not modify existing Page Objects without a clear reason tied to the current scenario or maintainability improvement.

## Selector rules
- Agents MUST verify selectors against the GAD app repo before writing or changing tests.
- Do not guess selectors.
- Prefer selectors based on `data-testid`, `name`, `id`, and stable `href` values.
- Prefer role-based selectors only when they are stable and language-independent.
- Avoid text-based selectors when a more stable attribute exists.
- Avoid fragile CSS selectors tied to layout, position, or styling.

## Test design rules
- One test = one behavior.
- Keep tests independent and runnable in isolation.
- Avoid chaining long flows across multiple modules in a single test.
- Prefer readability over clever reuse.
- Keep setup clear and minimal for each scenario.
- Assertions should verify visible user outcomes, not implementation details.
- Avoid over-asserting.

## Page Object rules
- Use explicit methods that describe user intent. Do not hide unrelated navigation behind generic methods such as `openModule`.
- Do not over-abstract simple interactions.
- Keep assertions out of Page Objects unless the assertion is clearly reusable and page-specific.
- Keep Page Objects focused on page behavior, navigation, and stable interactions.

## Anti-patterns to avoid
- Do not generate full suites at once.
- Do not introduce a `BasePage` unless there is a clear, repeated need.
- Do not mix API logic into Page Objects.
- Do not hardcode test data inside Page Objects.
- Do not use `waitForTimeout` unless there is no practical stable alternative.

## Environment assumptions
- The app under test runs at `http://localhost:3000`.
- The app lives in a separate repo: `Playwright/gad-gui-api-demo`.
- Tests rely on seeded data being available and stable.

## Execution model
Work should be performed incrementally:
- Implement one scenario at a time.
- Create only the Page Objects required for that scenario.
- Run and verify tests before moving to the next scenario.
- Do not implement multiple scenarios in a single step.

## Handling uncertainty
- If a selector, flow, or behavior cannot be verified from the app source code, do not guess.
- Add a TODO comment and proceed only with the parts that can be verified.
- Clearly report any assumptions or blockers.

## Playwright MCP (optional)
If Playwright MCP tools are available in the environment, they may be used to assist with:

- inspecting the DOM structure
- exploring page elements
- validating selectors

However:

- MCP MUST NOT replace reading the application source code.
- MCP MUST NOT be used to guess selectors without verification.
- Selectors generated via MCP MUST be validated against the GAD app repository.

Use MCP as a helper, not as the source of truth.

## Git workflow rules
All changes must follow a controlled Git workflow.

- Always create a new branch for any change:
  - `feature/<short-description>`
  - `fix/<short-description>`
  - `test/<short-description>`

- Never commit directly to `main`.

- Keep commits small and focused:
  - one scenario per branch
  - one logical change per commit

- Commit messages must be:
  - short
  - imperative
  - descriptive

Examples:
- `Add AppShellPage and home page smoke test`
- `Fix login selector using data-testid`
- `Refactor ArticlesPage locators`

- Before pushing:
  - run `npx playwright test`
  - run `npx tsc --noEmit`
  - ensure no unintended failures

- After pushing:
  - create a Pull Request to `main`

## Pull Request rules
Each Pull Request must:

- target the `main` branch
- include a clear description:
  - what scenario was implemented
  - what files were added or changed
  - how it was verified

- stay small and focused:
  - one scenario per PR is preferred

- include test results:
  - mention if tests passed locally
  - include report details only if needed

- avoid mixing:
  - multiple features
  - refactor + new tests in one PR
  - unrelated formatting changes

Agents MUST NOT:
- open large multi-scenario PRs
- include unrelated changes
- merge PRs without user approval

## Agent review checklist (MANDATORY)

Before finishing any task, the agent MUST verify:

### Scope
- Is the implementation within MVP scope?
- Is only one scenario implemented?

### Selectors
- Were selectors verified in the GAD repo?
- Are selectors stable and not fragile?
- Are text-based selectors avoided where possible?

### POM structure
- Are selectors inside Page Objects?
- Are methods explicit and readable?
- Is there no unnecessary abstraction?

### Test quality
- Does the test cover exactly one behavior?
- Is the test readable?
- Are assertions meaningful and user-facing?

### Stability
- No `waitForTimeout` used?
- Proper Playwright waiting is used through locators and expectations?
- No flaky timing or animation-dependent patterns?

### Git discipline
- Only relevant files changed?
- No generated artifacts included?
- Commit message is correct?

If any of the above fails:
- fix before completing the task.

## Output expectations for agents

When implementing a scenario, the agent MUST clearly list:

- created files
- modified files
- commands run
- test results

The agent MUST briefly explain:

- what was implemented
- why this approach was chosen
- what selectors were used and how they were verified

The agent MUST highlight:

- any assumptions made
- any TODOs added due to missing information
- any known risks or follow-up work

Do not return only code without context.