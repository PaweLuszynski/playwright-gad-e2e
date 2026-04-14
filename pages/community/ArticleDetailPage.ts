import { type Locator, type Page } from '@playwright/test';

export class ArticleDetailPage {
  readonly page: Page;
  readonly articleTitle: Locator;
  readonly articleBody: Locator;

  constructor(page: Page) {
    this.page = page;
    this.articleTitle = page.getByTestId('article-title');
    this.articleBody = page.getByTestId('article-body');
  }
}
