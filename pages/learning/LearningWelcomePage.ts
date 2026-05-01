import { expect, type Locator, type Page } from '@playwright/test';

export class LearningWelcomePage {
  readonly page: Page;
  readonly heroLogo: Locator;
  readonly authButtons: Locator;
  readonly demoLink: Locator;
  readonly registerLink: Locator;
  readonly loginLink: Locator;
  readonly requirementsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heroLogo = page.locator('main img[alt="GAD Learning"]');
    this.authButtons = page.locator('#authButtons');
    this.demoLink = this.authButtons.locator('a[name="demo"][href="dashboard.html"]');
    this.registerLink = this.authButtons.locator('a[name="register"][href="register.html"]');
    this.loginLink = this.authButtons.locator('a[name="login"][href="login.html"]');
    this.requirementsLink = page.locator('#requirementsButtons a[href="business-requirements.html"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/learning/welcome.html');
  }

  async assertWelcomeLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/learning\/welcome\.html$/);
    await expect(this.heroLogo).toBeVisible();
    await expect(this.authButtons).toBeVisible();
  }

  async assertGuestCtasVisible(): Promise<void> {
    await expect(this.demoLink).toBeVisible();
    await expect(this.registerLink).toBeVisible();
    await expect(this.loginLink).toBeVisible();
    await expect(this.requirementsLink).toBeVisible();
  }

  async openCatalog(): Promise<void> {
    await this.demoLink.click();
  }
}
