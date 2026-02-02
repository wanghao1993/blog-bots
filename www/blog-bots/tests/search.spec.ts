import { test, expect } from '@playwright/test'

test.describe('Search Functionality', () => {
  test('should open search modal when clicking search button', async ({ page }) => {
    await page.goto('/')
    
    // Find and click the search button
    const searchButton = page.getByRole('button', { name: /Search/i })
    await expect(searchButton).toBeVisible()
    await searchButton.click()
    
    // Check if search modal is visible
    await page.waitForTimeout(500)
    const searchInput = page.getByPlaceholder(/Search posts|搜索文章/i)
    await expect(searchInput).toBeVisible()
  })

  test('should search and display results', async ({ page }) => {
    await page.goto('/')
    
    // Open search
    await page.getByRole('button', { name: /Search/i }).click()
    await page.waitForTimeout(500)
    
    // Type in search input
    const searchInput = page.getByPlaceholder(/Search posts|搜索文章/i)
    await searchInput.fill('Next')
    await page.waitForTimeout(500)
    
    // Check if results are displayed
    const results = page.locator('.rounded-2xl').filter({ hasText: /Next/i })
    const count = await results.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should close search modal', async ({ page }) => {
    await page.goto('/')
    
    // Open search
    await page.getByRole('button', { name: /Search/i }).click()
    await page.waitForTimeout(500)
    
    // Close search by clicking X button
    const closeButton = page.locator('button').filter({ hasText: /×/ }).or(page.getByRole('button').filter({ has: page.locator('svg') }).last())
    await closeButton.click()
    
    await page.waitForTimeout(500)
    
    // Search modal should not be visible
    const searchInput = page.getByPlaceholder(/Search posts|搜索文章/i)
    await expect(searchInput).not.toBeVisible()
  })
})
