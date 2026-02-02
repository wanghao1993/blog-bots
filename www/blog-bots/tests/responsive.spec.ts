import { test, expect } from '@playwright/test'

test.describe('Responsive Design', () => {
  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Navigation should be visible
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
    
    // Main content should be visible
    const hero = page.getByRole('heading', { name: /Welcome to My Cute Blog|欢迎来到我的可爱博客/i })
    await expect(hero).toBeVisible()
  })

  test('should be responsive on tablet', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    
    // Check if content is properly displayed
    const heading = page.getByRole('heading', { name: /Welcome to My Cute Blog|欢迎来到我的可爱博客/i })
    await expect(heading).toBeVisible()
  })

  test('should be responsive on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')
    
    // All navigation items should be visible on desktop
    await expect(page.getByRole('link', { name: /Home|首页/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /Blog|博客/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /Tags|标签/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /About|关于/i }).first()).toBeVisible()
  })
})
