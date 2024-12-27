import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.setViewportSize({
        width: 1920,
        height: 1080,
    });
    await page.goto('https://demoqa.com/droppable');
    await page.getByRole('tab', { name: 'Prevent propogation' }).click();
});

test('Prevent propogation tab, test inner not greedy box', async ({ page }) => {
    await page.locator('#dragBox').dragTo(page.locator('#notGreedyDropBox'));
    await expect(page.locator('#notGreedyDropBox')).toHaveText('Dropped!Dropped!');
    await expect(page.locator('#notGreedyDropBox')).toHaveCSS('background-color', 'rgb(70, 130, 180)');
  });

  test('Prevent propogation tab, test outer not greedy box', async ({ page }) => {
    await page.locator('#dragBox').dragTo(page.locator('#notGreedyDropBox'), {
        sourcePosition: {x:0,y:0},
        targetPosition: {x:0, y:0}
      });
    await expect(page.locator('#notGreedyDropBox')).toHaveText('Dropped!Inner droppable (not greedy)');
    await expect(page.locator('#notGreedyDropBox')).toHaveCSS('background-color', 'rgb(70, 130, 180)');
  });

  test('Prevent propogation tab, test inner greedy box', async ({ page }) => {
    await page.locator('#dragBox').dragTo(page.locator('#greedyDropBox'));
    await expect(page.locator('#greedyDropBox')).toHaveText('Outer droppableDropped!');
    await expect(page.locator('#greedyDropBox')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(page.locator('#greedyDropBoxInner')).toHaveCSS('background-color', 'rgb(70, 130, 180)');
  });

  test('Prevent propogation tab, test outer greedy box', async ({ page }) => {
    await page.locator('#dragBox').dragTo(page.locator('#greedyDropBox'), {
        sourcePosition: {x:0,y:0},
        targetPosition: {x:0, y:0}
      });
    await expect(page.locator('#greedyDropBox')).toHaveText('Dropped!Inner droppable (greedy)');
    await expect(page.locator('#greedyDropBox')).toHaveCSS('background-color', 'rgb(70, 130, 180)');
  });