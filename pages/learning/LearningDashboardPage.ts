import { expect, type Locator, type Page } from '@playwright/test';

export class LearningDashboardPage {
  readonly page: Page;
  readonly catalogGrid: Locator;
  readonly courseHeading: Locator;
  readonly searchInput: Locator;
  readonly sortSelect: Locator;
  readonly courseList: Locator;
  readonly courseCards: Locator;
  readonly previewLinks: Locator;
  readonly signInLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.catalogGrid = page.locator('[aria-label="Available Courses"]');
    this.courseHeading = this.catalogGrid.getByRole('heading', { level: 2, name: 'Available Courses' });
    this.searchInput = page.locator('#courseSearch');
    this.sortSelect = page.locator('#courseSort');
    this.courseList = page.locator('#courseList');
    this.courseCards = this.courseList.locator('.course-card');
    this.previewLinks = this.courseList.locator('a.preview-button[href^="preview.html?id="]');
    this.signInLinks = this.courseList.locator('a.login-button[href="login.html"]');
  }

  async assertDashboardLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/learning\/dashboard\.html$/);
    await expect(this.catalogGrid).toBeVisible();
    await expect(this.courseHeading).toBeVisible();
  }

  async assertCatalogVisible(): Promise<void> {
    await expect(this.searchInput).toBeVisible();
    await expect(this.sortSelect).toBeVisible();
    await expect(this.courseCards.first()).toBeVisible();
    await expect(this.previewLinks.first()).toBeVisible();
    await expect(this.signInLinks.first()).toBeVisible();
  }
}
