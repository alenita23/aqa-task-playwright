import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.setViewportSize({
        width: 1280,
        height: 800,
    });
    await page.goto('https://demoqa.com/dragabble');
    await page.getByRole('tab', { name: 'Axis restricted' }).click()

});

test('Axis restricted tab test, Only X', async ({ page }) => {
    const boxX = await page.locator('#restrictedX').boundingBox();
    
    await page.locator('#restrictedX').hover();
    await page.mouse.down();
    await page.mouse.move(boxX.x + boxX.width * 3, boxX.y + boxX.height * 2);
    await page.mouse.up();
    await expect(page.locator('#restrictedX')).toHaveCSS('left', '250px');
    await expect(page.locator('#restrictedX')).toHaveCSS('top', '0px');
});

test('Axis restricted tab test, Only Y', async ({ page }) => {
    const boxY = await page.locator('#restrictedY').boundingBox();
    
    await page.locator('#restrictedY').hover();
    await page.mouse.down();
    await page.mouse.move(boxY.x + boxY.width * 3, boxY.y + boxY.height * 2);
    await page.mouse.up();
    await expect(page.locator('#restrictedY')).toHaveCSS('left', '0px');
    await expect(page.locator('#restrictedY')).toHaveCSS('top', '60px');
});
  