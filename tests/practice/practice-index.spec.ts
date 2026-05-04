import { expect, test } from '@playwright/test';
import { PracticeIndexPage } from '../../pages/practice/PracticeIndexPage';

test.describe('Practice Pages index', () => {
  test('should load the practice pages index for an anonymous user', async ({ page }) => {
    const practiceIndexPage = new PracticeIndexPage(page);

    await practiceIndexPage.goto();

    await expect(page).toHaveURL(/\/practice(\/|\/index\.html)?$/);
    await expect(practiceIndexPage.pageHeader).toBeVisible();
    await expect(practiceIndexPage.searchInput).toBeVisible();
    await expect(practiceIndexPage.practicePageLinks.first()).toBeVisible();
  });
});
