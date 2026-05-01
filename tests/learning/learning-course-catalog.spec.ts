import { test } from '@playwright/test';
import { LearningDashboardPage } from '../../pages/learning/LearningDashboardPage';
import { LearningWelcomePage } from '../../pages/learning/LearningWelcomePage';

test.describe('Learning course catalog', () => {
  test('should load the public course catalog for a guest user', async ({ page }) => {
    const learningWelcomePage = new LearningWelcomePage(page);
    const learningDashboardPage = new LearningDashboardPage(page);

    await learningWelcomePage.goto();
    await learningWelcomePage.openCatalog();

    await learningDashboardPage.assertDashboardLoaded();
    await learningDashboardPage.assertCatalogVisible();
  });
});
