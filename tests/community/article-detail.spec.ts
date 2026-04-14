import { expect, test } from '@playwright/test';
import { ArticleDetailPage } from '../../pages/community/ArticleDetailPage';
import { ArticlesPage } from '../../pages/community/ArticlesPage';

test.describe('Article detail', () => {
  test('should open one article detail page from the public articles list', async ({ page }) => {
    const articlesPage = new ArticlesPage(page);
    const articleDetailPage = new ArticleDetailPage(page);

    await articlesPage.goto();
    await articlesPage.openFirstArticle();

    await expect(page).toHaveURL(/\/article\.html\?id=\d+/);
    await expect(articleDetailPage.articleTitle).toBeVisible();
    await expect(articleDetailPage.articleBody).toBeVisible();
  });
});
