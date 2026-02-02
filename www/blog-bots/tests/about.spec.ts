import { test, expect } from '@playwright/test'

test.describe('About Page', () => {
  test('should display about page content', async ({ page }) => {
    await page.goto('/about')
    
    // Check if heading is visible
    await expect(page.getByRole('heading', { name: /About Me|关于我/i })).toBeVisible()
  })

  test('should display features list', async ({ page }) => {
    await page.goto('/about')
    
    // Check if features heading exists
    await expect(page.getByRole('heading', { name: /Features|功能/i })).toBeVisible()
  })

  test('should display tech stack', async ({ page }) => {
    await page.goto('/about')
    
    // Check if tech stack heading exists
    await expect(page.getByRole('heading', { name: /Tech Stack|技术栈/i })).toBeVisible()
    
    // Check for some technologies
    await expect(page.getByText(/Next.js/i)).toBeVisible()
    await expect(page.getByText(/TypeScript/i)).toBeVisible()
  })

  test('should have cute card styling', async ({ page }) => {
    await page.goto('/about')
    
    // Check if cute-card class is present
    const card = page.locator('.cute-card')
    await expect(card).toBeVisible()
  })
})
