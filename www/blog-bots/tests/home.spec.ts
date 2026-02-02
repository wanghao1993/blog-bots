import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should load the home page successfully', async ({ page }) => {
    await page.goto('/')
    
    // Check if the hero title is visible
    await expect(page.getByRole('heading', { name: /Welcome to My Cute Blog|欢迎来到我的可爱博客/i })).toBeVisible()
    
    // Check if navigation is present
    await expect(page.getByText(/Home|首页/i)).toBeVisible()
    await expect(page.getByText(/Blog|博客/i)).toBeVisible()
    await expect(page.getByText(/Tags|标签/i)).toBeVisible()
    await expect(page.getByText(/About|关于/i)).toBeVisible()
  })

  test('should display the cute blog branding', async ({ page }) => {
    await page.goto('/')
    
    // Check for the blog logo/title
    await expect(page.getByText('🌸 Cute Blog')).toBeVisible()
  })

  test('should show latest posts section', async ({ page }) => {
    await page.goto('/')
    
    // Check if latest posts heading exists
    const latestPostsHeading = page.getByRole('heading', { name: /Latest Posts|最新文章/i })
    await expect(latestPostsHeading).toBeVisible()
  })

  test('should have working CTA button', async ({ page }) => {
    await page.goto('/')
    
    // Find and click the CTA button
    const ctaButton = page.getByRole('button', { name: /Explore Posts|探索文章/i })
    await expect(ctaButton).toBeVisible()
    await ctaButton.click()
    
    // Should navigate to blog page
    await expect(page).toHaveURL(/\/blog/)
  })

  test('should display blog post cards if posts exist', async ({ page }) => {
    await page.goto('/')
    
    // Check for blog cards (they should have the cute-card class)
    const blogCards = page.locator('.cute-card')
    const count = await blogCards.count()
    
    // We expect at least 1 post from our example content
    expect(count).toBeGreaterThanOrEqual(1)
  })
})
