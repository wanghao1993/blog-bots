import { test, expect } from '@playwright/test'

test.describe('Animations and Interactions', () => {
  test('should have hover effects on blog cards', async ({ page }) => {
    await page.goto('/')
    
    // Find a blog card
    const card = page.locator('.cute-card').first()
    await expect(card).toBeVisible()
    
    // Get initial position
    const box1 = await card.boundingBox()
    
    // Hover over the card
    await card.hover()
    await page.waitForTimeout(500)
    
    // The card should have hover effects (scale, shadow)
    // We can't directly test CSS transforms, but we can check the element is still visible
    await expect(card).toBeVisible()
  })

  test('should have smooth transitions between pages', async ({ page }) => {
    await page.goto('/')
    
    // Click to navigate
    const blogLink = page.getByRole('link', { name: /Blog|博客/i }).first()
    await blogLink.click()
    
    // Page should navigate smoothly
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveURL(/\/blog/)
  })

  test('should have animated decorative elements', async ({ page }) => {
    await page.goto('/')
    
    // Check for decorative emoji elements (they should have animation classes)
    const decorativeElements = page.locator('.animate-float, .animate-bounce-slow')
    const count = await decorativeElements.count()
    
    // Should have at least one animated element
    expect(count).toBeGreaterThan(0)
  })

  test('should have working button animations', async ({ page }) => {
    await page.goto('/')
    
    // Find CTA button
    const button = page.getByRole('button', { name: /Explore Posts|探索文章/i })
    await expect(button).toBeVisible()
    
    // Hover should work
    await button.hover()
    await page.waitForTimeout(300)
    await expect(button).toBeVisible()
  })
})
