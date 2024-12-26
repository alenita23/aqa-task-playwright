const { test, expect } = require('@playwright/test');

test('Simple tab test', async ({ page }) => {
  await page.goto('https://demoqa.com/droppable');

  await page.locator('#draggable').dragTo(page.getByLabel('Simple').locator('#droppable'));
});