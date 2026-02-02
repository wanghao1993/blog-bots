import { test, expect } from '@playwright/test'

test.describe('Tags Page', () => {
  test('should display tags page', async ({ page }) => {
    await page.goto('/tags')
    
    // Check if heading is visible
    await expect(page.getByRole('heading', { name: /All Tags|所有标签/i })).toBeVisible()
  })

  test('should display tag cards with post counts', async ({ page }) => {
    await page.goto('/tags')
    
    // Check if tag cards are present
    const tagCards = page.locator('.cute-card')
    const count = await tagCards.count()
    
    // Should have at least some tags from example posts
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('should filter posts by tag when clicked', async ({ page }) => {
    await page.goto('/tags')
    
    // Click on first tag
    const firstTag = page.locator('.cute-card').first()
    await firstTag.click()
    
    // Should see filtered posts
    await page.waitForLoadState('networkidle')
    
    // Check if posts are displayed
    const heading = page.getByRole('heading', { name: /Posts tagged with|标签为/i })
    await expect(heading).toBeVisible()
  })

  test('should have back to tags button when viewing filtered posts', async ({ page }) => {
    await page.goto('/tags')
    
    // Click on first tag
    await page.locator('.cute-card').first().click()
    await page.waitForLoadState('networkidle')
    
    // Check for back button
    const backButton = page.getByRole('button', { name: /Back to all tags|返回/i })
    await expect(backButton).toBeVisible()
    
    // Click back
    await backButton.click()
    
    // Should be back on tags page
    await expect(page.getByRole('heading', { name: /All Tags|所有标签/i })).toBeVisible()
  })
})
