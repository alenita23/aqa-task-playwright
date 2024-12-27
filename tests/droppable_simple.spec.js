import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.setViewportSize({
        width: 1920,
        height: 1080,
    });
    await page.goto('https://demoqa.com/droppable');
});

test('Simple tab test', async ({ page }) => {
    await page.locator('#draggable').dragTo(page.getByLabel('Simple').locator('#droppable'));
    await expect(page.getByLabel('Simple').locator('#droppable')).toHaveText('Dropped!')
  });
  
  test('Second way to check / manual', async ({ page }) => {
    await page.locator('#draggable').hover();
    await page.mouse.down();
    await page.getByLabel('Simple').locator('#droppable').hover();
    await page.mouse.up();
    await expect(page.getByLabel('Simple').locator('#droppable')).toHaveText('Dropped!');
  });
  
  test('test with positioning', async ({ page}) => {
    await page.locator('#draggable').dragTo(page.getByLabel('Simple').locator('#droppable'),{
      sourcePosition: {x:0,y:0},
      targetPosition: {x:0, y:0}
    })
    await expect(page.getByLabel('Simple').locator('#droppable')).toHaveText('Dropped!');
  });
  
  test('test with positioning when dragging did not work out', async ({ page}) => {
    await page.locator('#draggable').dragTo(page.getByLabel('Simple').locator('#droppable'),{
      sourcePosition: {x:0,y:0},
      targetPosition: {x:100, y:50}
    })
    await expect(page.getByLabel('Simple').locator('#droppable')).toHaveText('Drop here');
  });
  
  test('test with positioning when dragging worked out', async ({ page}) => {
    await page.goto('https://demoqa.com/droppable');
    await page.locator('#draggable').dragTo(page.getByLabel('Simple').locator('#droppable'),{
      sourcePosition: {x:0,y:0},
      targetPosition: {x:99, y:50}
    })
    await expect(page.getByLabel('Simple').locator('#droppable')).toHaveText('Dropped!');
  });