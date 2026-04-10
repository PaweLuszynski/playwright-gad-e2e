import { expect, type Locator, type Page } from '@playwright/test';

export class AppShellPage {
  private readonly page: Page;
  private readonly homeHeader: Locator;
  private readonly frontBanner: Locator;
  private readonly moduleLinks: Locator;
  private readonly articlesModuleLink: Locator;
  private readonly articlesSearchInput: Locator;
  private readonly practiceModuleLink: Locator;
  private readonly practiceSearchInput: Locator;
  private readonly gamesModuleLink: Locator;
  private readonly gamesHeader: Locator;
  private readonly bookShopModuleLink: Locator;
  private readonly bookShopDashboardHeader: Locator;
  private readonly learningModuleLink: Locator;
  private readonly learningWelcomeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeHeader = page.locator('#pageHeader h1');
    this.frontBanner = page.locator('#frontbanner');
    this.moduleLinks = page.locator('.modules-container .module-link');
    this.articlesModuleLink = page.locator('.modules-container .module-link[href="./articles.html"]');
    this.articlesSearchInput = page.getByTestId('search-input');
    this.practiceModuleLink = page.locator('.modules-container .module-link[href="./practice"]');
    this.practiceSearchInput = page.locator('#searchInput');
    this.gamesModuleLink = page.locator('.modules-container .module-link[href="./games"]');
    this.gamesHeader = page.locator('.container.container-mobile h1');
    this.bookShopModuleLink = page.locator('.modules-container .module-link[href="./book-shop/dashboard.html"]');
    this.bookShopDashboardHeader = page.locator('h2');
    this.learningModuleLink = page.locator('.modules-container .module-link[href="./learning/welcome.html"]');
    this.learningWelcomeHeader = page.locator('.welcome-hero h1');
  }

  async gotoHome(): Promise<void> {
    await this.page.goto('/');
  }

  async assertHomeLoaded(): Promise<void> {
    await expect(this.homeHeader).toBeVisible();
    await expect(this.homeHeader).toContainText('Welcome on');
    await expect(this.frontBanner).toBeVisible();
  }

  async assertModuleCardsVisible(): Promise<void> {
    await expect(this.moduleLinks).toHaveCount(5);
  }

  async assertDefaultModuleLinks(): Promise<void> {
    const expectedHrefs = [
      './articles.html',
      './practice',
      './games',
      './book-shop/dashboard.html',
      './learning/welcome.html',
    ];

    for (const expectedHref of expectedHrefs) {
      await expect(this.page.locator(`.modules-container .module-link[href="${expectedHref}"]`)).toHaveCount(1);
    }
  }

  async openArticlesModuleFromHome(): Promise<void> {
    await this.articlesModuleLink.click();
  }

  async assertArticlesPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/articles\.html$/);
    await expect(this.articlesSearchInput).toBeVisible();
  }

  async openPracticeModuleFromHome(): Promise<void> {
    await this.practiceModuleLink.click();
  }

  async assertPracticeIndexLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/practice(\/|\/index\.html)?$/);
    await expect(this.practiceSearchInput).toBeVisible();
  }

  async openGamesModuleFromHome(): Promise<void> {
    await this.gamesModuleLink.click();
  }

  async assertGamesIndexLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/games\/games\.html$/);
    await expect(this.gamesHeader).toContainText('Games:');
  }

  async openBookShopModuleFromHome(): Promise<void> {
    await this.bookShopModuleLink.click();
  }

  async assertBookShopDashboardLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/book-shop\/dashboard\.html$/);
    await expect(this.bookShopDashboardHeader).toContainText('BookShop Dashboard');
  }

  async openLearningModuleFromHome(): Promise<void> {
    await this.learningModuleLink.click();
  }

  async assertLearningWelcomePageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/learning\/welcome\.html$/);
    await expect(this.learningWelcomeHeader).toContainText('Start Learning Today');
  }
}
