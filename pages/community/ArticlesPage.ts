import { type Locator, type Page } from '@playwright/test';

export class ArticlesPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly paginationController: Locator;
  readonly articleCards: Locator;
  readonly articleLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByTestId('search-input');
    this.paginationController = page.locator('#paginationController');
    this.articleCards = page.locator('#container .item-card[data-testid^="article-"]');
    this.articleLinks = page.locator('#container .item-card[data-testid^="article-"] a[data-testid$="-link"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/articles.html');
  }

  async openFirstArticle(): Promise<void> {
    await this.articleLinks.first().click();
  }
}
