import { expect, test } from '@playwright/test';
import { BookShopCatalogPage } from '../../pages/book-shop/BookShopCatalogPage';

test.describe('Book Shop search controls', () => {
  test('should render the public search controls for an anonymous user', async ({ page }) => {
    const bookShopCatalogPage = new BookShopCatalogPage(page);

    await bookShopCatalogPage.goto();

    await expect(page).toHaveURL(/\/book-shop\/books\.html$/);
    await expect(bookShopCatalogPage.searchInput).toBeVisible();
    await expect(bookShopCatalogPage.searchInput).toHaveAttribute('placeholder', 'Search...');
    await expect(bookShopCatalogPage.searchButton).toBeVisible();
  });
});
