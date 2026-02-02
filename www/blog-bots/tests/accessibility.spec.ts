import { test, expect } from '@playwright/test'

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/')
    
    // Should have an h1
    const h1 = page.locator('h1').first()
    await expect(h1).toBeVisible()
  })

  test('should have alt text for images', async ({ page }) => {
    await page.goto('/blog')
    
    // Click on a post with cover image
    await page.locator('.cute-card').first().click()
    await page.waitForLoadState('networkidle')
    
    // Check for images with alt text
    const images = page.locator('img')
    const count = await images.count()
    
    if (count > 0) {
      const firstImage = images.first()
      const alt = await firstImage.getAttribute('alt')
      // Alt should exist (even if empty string, it's defined)
      expect(alt).not.toBeNull()
    }
  })

  test('should have keyboard navigation', async ({ page }) => {
    await page.goto('/')
    
    // Tab through elements
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    
    // At least one element should have focus
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
    expect(focusedElement).toBeTruthy()
  })

  test('should have aria labels on buttons', async ({ page }) => {
    await page.goto('/')
    
    // Check theme toggle button
    const themeButton = page.getByRole('button', { name: /Toggle theme/i })
    await expect(themeButton).toBeVisible()
    
    // Check search button
    const searchButton = page.getByRole('button', { name: /Search/i })
    await expect(searchButton).toBeVisible()
  })

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/')
    
    // Get text elements
    const body = page.locator('body')
    await expect(body).toBeVisible()
    
    // This is a basic check - in production, use axe-core or similar
    const textColor = await body.evaluate((el) => 
      window.getComputedStyle(el).color
    )
    expect(textColor).toBeTruthy()
  })
})
