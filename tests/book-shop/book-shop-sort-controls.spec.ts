import { expect, test } from '@playwright/test';
import { BookShopCatalogPage } from '../../pages/book-shop/BookShopCatalogPage';

test.describe('Book Shop sort controls', () => {
  test('should render the public sort controls for an anonymous user', async ({ page }) => {
    const bookShopCatalogPage = new BookShopCatalogPage(page);

    await bookShopCatalogPage.goto();

    await expect(page).toHaveURL(/\/book-shop\/books\.html$/);
    await expect(bookShopCatalogPage.sortingSelect).toBeVisible();
    await expect(bookShopCatalogPage.sortingSelect).toBeEnabled();
    await expect(bookShopCatalogPage.sortingSelect).toHaveValue('published_at DESC');
    await expect(bookShopCatalogPage.sortingOptions).toHaveCount(6);
    await expect(bookShopCatalogPage.sortingOptions).toContainText([
      'date',
      'date',
      'title',
      'title',
      'pages',
      'pages',
    ]);
  });
});
