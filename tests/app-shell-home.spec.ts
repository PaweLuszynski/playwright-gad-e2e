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

  test('should navigate to Articles from the default module card', async ({ page }) => {
    const appShellPage = new AppShellPage(page);

    await appShellPage.gotoHome();
    await appShellPage.openArticlesModuleFromHome();
    await appShellPage.assertArticlesPageLoaded();
  });

  test('should navigate to Practice Pages from the default module card', async ({ page }) => {
    const appShellPage = new AppShellPage(page);

    await appShellPage.gotoHome();
    await appShellPage.openPracticeModuleFromHome();
    await appShellPage.assertPracticeIndexLoaded();
  });

  test('should navigate to Games from the default module card', async ({ page }) => {
    const appShellPage = new AppShellPage(page);

    await appShellPage.gotoHome();
    await appShellPage.openGamesModuleFromHome();
    await appShellPage.assertGamesIndexLoaded();
  });

  test('should navigate to Book Shop from the default module card', async ({ page }) => {
    const appShellPage = new AppShellPage(page);

    await appShellPage.gotoHome();
    await appShellPage.openBookShopModuleFromHome();
    await appShellPage.assertBookShopDashboardLoaded();
  });

  test('should navigate to Learning from the default module card', async ({ page }) => {
    const appShellPage = new AppShellPage(page);

    await appShellPage.gotoHome();
    await appShellPage.openLearningModuleFromHome();
    await appShellPage.assertLearningWelcomePageLoaded();
  });
});
