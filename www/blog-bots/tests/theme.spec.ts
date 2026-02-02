import { test, expect } from '@playwright/test'

test.describe('Theme Switching', () => {
  test('should toggle between light and dark themes', async ({ page }) => {
    await page.goto('/')
    
    // Wait for page to load
    await page.waitForLoadState('networkidle')
    
    // Get the initial theme
    const html = page.locator('html')
    const initialClass = await html.getAttribute('class')
    
    // Find and click the theme toggle button
    const themeButton = page.getByRole('button', { name: /Toggle theme/i })
    await expect(themeButton).toBeVisible()
    await themeButton.click()
    
    // Wait a bit for the theme to change
    await page.waitForTimeout(500)
    
    // Check that the class changed
    const newClass = await html.getAttribute('class')
    expect(newClass).not.toBe(initialClass)
  })

  test('should persist theme preference', async ({ page, context }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Toggle to dark mode
    const themeButton = page.getByRole('button', { name: /Toggle theme/i })
    await themeButton.click()
    await page.waitForTimeout(500)
    
    const html = page.locator('html')
    const themeAfterToggle = await html.getAttribute('class')
    
    // Open a new page in the same context
    const newPage = await context.newPage()
    await newPage.goto('/')
    await newPage.waitForLoadState('networkidle')
    
    // Theme should be persisted
    const newHtml = newPage.locator('html')
    const persistedTheme = await newHtml.getAttribute('class')
    
    expect(persistedTheme).toBe(themeAfterToggle)
    
    await newPage.close()
  })
})
