import { expect, test } from '@playwright/test';
import { ArticlesPage } from '../../pages/community/ArticlesPage';

test.describe('Articles list', () => {
  test('should load the public articles list', async ({ page }) => {
    const articlesPage = new ArticlesPage(page);

    await articlesPage.goto();

    await expect(page).toHaveURL(/\/articles\.html$/);
    await expect(articlesPage.searchInput).toBeVisible();
    await expect(articlesPage.paginationController).toBeVisible();
    await expect(articlesPage.articleCards.first()).toBeVisible();
  });
});
