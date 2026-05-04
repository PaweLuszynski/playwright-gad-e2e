import { type Locator, type Page } from '@playwright/test';

export class PracticeIndexPage {
  readonly page: Page;
  readonly pageHeader: Locator;
  readonly searchInput: Locator;
  readonly practicePageLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeader = page.locator('#pageHeader h1');
    this.searchInput = page.locator('#searchInput');
    this.practicePageLinks = page.locator('.practice-page-link');
  }

  async goto(): Promise<void> {
    await this.page.goto('/practice');
  }
}
