import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.setViewportSize({
        width: 1860,
        height: 980,
    });
    await page.goto('https://demoqa.com/dragabble');
});

test('Simple tab test', async ({ page }) => {
    await page.locator('#dragBox').hover();
    await page.mouse.down();
    const box = await page.locator('#dragBox').boundingBox();
    await page.mouse.move(box.x + box.width * 3, box.y + box.height * 1,5);
    await page.mouse.up();
    await expect(page.locator('#dragBox')).toHaveCSS('left', '250px');
    await expect(page.locator('#dragBox')).toHaveCSS('top', '20px');
  });