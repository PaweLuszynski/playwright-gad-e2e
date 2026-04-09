import { test } from '@playwright/test';
import { AppShellPage } from '../pages/core/AppShellPage';

test.describe('App Shell home', () => {
  test('should load home page and expose default module cards', async ({ page }) => {
    const appShellPage = new AppShellPage(page);

    await appShellPage.gotoHome();
    await appShellPage.assertHomeLoaded();
    await appShellPage.assertModuleCardsVisible();
    await appShellPage.assertDefaultModuleLinks();
  });
});
