import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should navigate to all main pages', async ({ page }) => {
    await page.goto('/')
    
    // Navigate to Blog
    await page.getByRole('link', { name: /Blog|博客/i }).first().click()
    await expect(page).toHaveURL(/\/blog/)
    await expect(page.getByRole('heading', { name: /Blog Posts|博客文章/i })).toBeVisible()
    
    // Navigate to Tags
    await page.getByRole('link', { name: /Tags|标签/i }).first().click()
    await expect(page).toHaveURL(/\/tags/)
    await expect(page.getByRole('heading', { name: /All Tags|所有标签/i })).toBeVisible()
    
    // Navigate to About
    await page.getByRole('link', { name: /About|关于/i }).first().click()
    await expect(page).toHaveURL(/\/about/)
    await expect(page.getByRole('heading', { name: /About Me|关于我/i })).toBeVisible()
    
    // Navigate back to Home
    await page.getByRole('link', { name: '🌸 Cute Blog' }).click()
    await expect(page).toHaveURL(/\/$/)
  })

  test('should have responsive navigation', async ({ page }) => {
    await page.goto('/')
    
    // Navigation should be sticky
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500))
    
    // Navigation should still be visible (sticky)
    await expect(nav).toBeVisible()
  })
})
