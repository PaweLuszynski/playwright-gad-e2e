# Repository Guidelines

## Project Structure & Module Organization
This repository is a small Playwright end-to-end test project written in TypeScript. Keep browser specs in `tests/`, Page Object Model helpers in `pages/`, and reusable fixtures or sample payloads in `test-data/`. Core runner configuration lives in `playwright.config.ts`, and TypeScript compiler settings live in `tsconfig.json`.

Example layout:
`tests/login.spec.ts`
`pages/LoginPage.ts`
`test-data/users.json`

## Build, Test, and Development Commands
Install dependencies with `npm install`.

Run the Chromium suite with `npx playwright test`. The config currently targets `chromium`, runs tests from `tests/`, and expects the app under test at `http://localhost:3000`.

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
