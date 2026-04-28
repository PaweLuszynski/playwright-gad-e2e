import { type Locator, type Page } from '@playwright/test';

export class BookShopCatalogPage {
  readonly page: Page;
  readonly pageHeading: Locator;
  readonly sortingSelect: Locator;
  readonly sortingOptions: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly booksContainer: Locator;
  readonly bookCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeading = page.getByRole('heading', { level: 2, name: 'Books' });
    this.sortingSelect = page.getByTestId('sorting-select');
    this.sortingOptions = this.sortingSelect.locator('option');
    this.searchInput = page.getByTestId('search-input');
    this.searchButton = page.getByTestId('search-button');
    this.booksContainer = page.locator('#books-container');
    this.bookCards = page.locator('#books-container .book-card');
  }

  async goto(): Promise<void> {
    await this.page.goto('/book-shop/books.html');
  }
}
