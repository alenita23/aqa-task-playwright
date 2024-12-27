const { test, expect } = require('@playwright/test');

test('Simple tab test', async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto('https://demoqa.com/droppable');
  await page.locator('#draggable').dragTo(page.getByLabel('Simple').locator('#droppable'));
  await expect(page.getByLabel('Simple').locator('#droppable')).toHaveText('Dropped!')
});

test('Second way to check / manual', async ({ page }) => {
  await page.goto('https://demoqa.com/droppable');
  await page.locator('#draggable').hover();
  await page.mouse.down();
  await page.getByLabel('Simple').locator('#droppable').hover();
  await page.mouse.up();
  await expect(page.getByLabel('Simple').locator('#droppable')).toHaveText('Dropped!');
});

test('test with positioning', async ({ page}) => {
  await page.goto('https://demoqa.com/droppable');
  await page.locator('#draggable').dragTo(page.getByLabel('Simple').locator('#droppable'),{
    sourcePosition: {x:0,y:0},
    targetPosition: {x:0, y:0}
  })
  await expect(page.getByLabel('Simple').locator('#droppable')).toHaveText('Dropped!');
});

test('test with positioning when dragging did not work out', async ({ page}) => {
  await page.goto('https://demoqa.com/droppable');
  await page.locator('#draggable').dragTo(page.getByLabel('Simple').locator('#droppable'),{
    sourcePosition: {x:0,y:0},
    targetPosition: {x:101, y:50}
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

test('Accept tab, test of acceptable', async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto('https://demoqa.com/droppable');
  await page.getByRole('tab', { name: 'Accept' }).click();
  await page.locator('#acceptable').dragTo(page.getByLabel('Accept').locator('#droppable'));
  await expect(page.getByLabel('Accept').locator('#droppable')).toHaveText('Dropped!');
});

test('Accept tab, test of Not acceptable', async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto('https://demoqa.com/droppable');
  await page.getByRole('tab', { name: 'Accept' }).click();
  await page.locator('#notAcceptable').dragTo(page.getByLabel('Accept').locator('#droppable'));
  await expect(page.getByLabel('Accept').locator('#droppable')).toHaveText('Drop here');
});