import { expect, test } from '@playwright/test';
import { BookShopCatalogPage } from '../../pages/book-shop/BookShopCatalogPage';

test.describe('Book Shop catalog', () => {
  test('should load the public catalog for an anonymous user', async ({ page }) => {
    const bookShopCatalogPage = new BookShopCatalogPage(page);

    await bookShopCatalogPage.goto();

    await expect(page).toHaveURL(/\/book-shop\/books\.html$/);
    await expect(bookShopCatalogPage.pageHeading).toBeVisible();
    await expect(bookShopCatalogPage.booksContainer).toBeVisible();
    await expect(bookShopCatalogPage.bookCards.first()).toBeVisible();
  });
});
