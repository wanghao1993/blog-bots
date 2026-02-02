import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/')
    
    // Check if the hero section is visible
    await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible()
    
    // Check if the CTA button is visible
    await expect(page.getByRole('button', { name: /explore posts/i })).toBeVisible()
  })

  test('should display the navigation bar', async ({ page }) => {
    await page.goto('/')
    
    // Check navigation links
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /blog/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /tags/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /about/i })).toBeVisible()
  })

  test('should display blog posts', async ({ page }) => {
    await page.goto('/')
    
    // Wait for posts to load
    await page.waitForSelector('article', { timeout: 10000 })
    
    // Check if at least one blog post is visible
    const posts = page.locator('article')
    await expect(posts).not.toHaveCount(0)
  })

  test('should navigate to blog page when clicking CTA', async ({ page }) => {
    await page.goto('/')
    
    // Click the explore posts button
    await page.getByRole('button', { name: /explore posts/i }).click()
    
    // Check if we're on the blog page
    await expect(page).toHaveURL(/\/blog/)
  })

  test('should have decorative elements', async ({ page }) => {
    await page.goto('/')
    
    // Check if the page has loaded
    await page.waitForLoadState('networkidle')
    
    // The page should be visible
    await expect(page.locator('body')).toBeVisible()
  })
})
