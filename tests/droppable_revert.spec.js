import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.setViewportSize({
        width: 1920,
        height: 1080,
    });
    await page.goto('https://demoqa.com/droppable');
    await page.getByRole('tab', { name: 'Revert' }).click();
});

test('Revert tab, test of Will Revert', async ({ page }) => {
    await page.locator('#revertable').dragTo(page.getByLabel('Revert').locator('#droppable'));
    await expect(page.getByLabel('Revert').locator('#droppable')).toHaveText('Dropped!');
    await expect(page.getByLabel('Revert').locator('#droppable')).toHaveCSS('background-color', 'rgb(70, 130, 180)');
    await expect(page.locator('#revertable')).toHaveCSS('left', '0px');
  });

  test('Revert tab, test of Not Revert', async ({ page }) => {
    await page.locator('#notRevertable').dragTo(page.getByLabel('Revert').locator('#droppable'));
    await expect(page.getByLabel('Revert').locator('#droppable')).toHaveText('Dropped!');
    await expect(page.getByLabel('Revert').locator('#droppable')).toHaveCSS('background-color', 'rgb(70, 130, 180)');
  });