import { expect, type Locator, type Page } from '@playwright/test';

export class AppShellPage {
  private readonly page: Page;
  private readonly homeHeader: Locator;
  private readonly frontBanner: Locator;
  private readonly moduleLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeHeader = page.locator('#pageHeader h1');
    this.frontBanner = page.locator('#frontbanner');
    this.moduleLinks = page.locator('.modules-container .module-link');
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
}
