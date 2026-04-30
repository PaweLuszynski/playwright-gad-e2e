import { test } from '@playwright/test';
import { LearningWelcomePage } from '../../pages/learning/LearningWelcomePage';

test.describe('Learning welcome', () => {
  test('should load the welcome page for a guest user', async ({ page }) => {
    const learningWelcomePage = new LearningWelcomePage(page);

    await learningWelcomePage.goto();

    await learningWelcomePage.assertWelcomeLoaded();
    await learningWelcomePage.assertGuestCtasVisible();
  });
});
