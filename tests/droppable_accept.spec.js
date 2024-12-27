import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({
      width: 1920,
      height: 1080,
  });
  await page.goto('https://demoqa.com/droppable');
  await page.getByRole('tab', { name: 'Accept' }).click();
});

test('Accept tab, test of acceptable', async ({ page }) => {
  await page.locator('#acceptable').dragTo(page.getByLabel('Accept').locator('#droppable'));
  await expect(page.getByLabel('Accept').locator('#droppable')).toHaveText('Dropped!');
});

test('Accept tab, test of Not acceptable', async ({ page }) => {
  await page.locator('#notAcceptable').dragTo(page.getByLabel('Accept').locator('#droppable'));
  await expect(page.getByLabel('Accept').locator('#droppable')).toHaveText('Drop here');
});