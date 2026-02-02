import { test, expect } from '@playwright/test'

test.describe('Blog Page', () => {
  test('should display blog posts list', async ({ page }) => {
    await page.goto('/blog')
    
    // Check if heading is visible
    await expect(page.getByRole('heading', { name: /Blog Posts|博客文章/i })).toBeVisible()
    
    // Check if blog cards are present
    const blogCards = page.locator('.cute-card')
    const count = await blogCards.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('should navigate to a blog post', async ({ page }) => {
    await page.goto('/blog')
    
    // Find and click the first blog card
    const firstCard = page.locator('.cute-card').first()
    await firstCard.click()
    
    // Wait for navigation
    await page.waitForLoadState('networkidle')
    
    // Should be on a blog post page
    await expect(page).toHaveURL(/\/blog\/[^/]+/)
  })

  test('should display blog post content', async ({ page }) => {
    await page.goto('/blog')
    
    // Click on first post
    await page.locator('.cute-card').first().click()
    await page.waitForLoadState('networkidle')
    
    // Check if post content is visible
    const article = page.locator('article')
    await expect(article).toBeVisible()
    
    // Check for title
    const heading = page.locator('article h1').first()
    await expect(heading).toBeVisible()
  })

  test('should display tags on blog post', async ({ page }) => {
    await page.goto('/blog')
    
    // Click on first post
    await page.locator('.cute-card').first().click()
    await page.waitForLoadState('networkidle')
    
    // Check if tags are visible (at least one)
    const tags = page.locator('article').getByText(/Tags|标签/i)
    await expect(tags).toBeVisible()
  })

  test('should have share buttons on blog post', async ({ page }) => {
    await page.goto('/blog')
    
    // Click on first post
    await page.locator('.cute-card').first().click()
    await page.waitForLoadState('networkidle')
    
    // Check for share section
    const shareText = page.getByText(/Share|分享/i)
    await expect(shareText).toBeVisible()
  })

  test('should have back button on blog post', async ({ page }) => {
    await page.goto('/blog')
    
    // Click on first post
    await page.locator('.cute-card').first().click()
    await page.waitForLoadState('networkidle')
    
    // Check for back button
    const backButton = page.getByRole('link', { name: /Back to Home|返回首页/i })
    await expect(backButton).toBeVisible()
    
    // Click back button
    await backButton.click()
    await expect(page).toHaveURL(/\/blog/)
  })
})
