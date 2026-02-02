import { test, expect } from '@playwright/test'

test.describe('Language Switching', () => {
  test('should switch between English and Chinese', async ({ page }) => {
    await page.goto('/')
    
    // Check current language
    const languageButton = page.getByRole('button').filter({ hasText: /EN|ZH/i })
    await expect(languageButton).toBeVisible()
    
    // Click to open language menu
    await languageButton.click()
    
    // Wait for dropdown to appear
    await page.waitForTimeout(300)
    
    // Find language options
    const chineseOption = page.getByRole('button', { name: /中文/i })
    const englishOption = page.getByRole('button', { name: /English/i })
    
    // Check if at least one is visible
    const isChineseVisible = await chineseOption.isVisible().catch(() => false)
    const isEnglishVisible = await englishOption.isVisible().catch(() => false)
    
    expect(isChineseVisible || isEnglishVisible).toBeTruthy()
    
    // Click on the visible option
    if (isChineseVisible) {
      await chineseOption.click()
      await page.waitForTimeout(500)
      // Check if Chinese content is displayed
      await expect(page.getByText(/欢迎|博客|标签|关于/)).toBeVisible()
    } else if (isEnglishVisible) {
      await englishOption.click()
      await page.waitForTimeout(500)
      // Check if English content is displayed
      await expect(page.getByText(/Welcome|Blog|Tags|About/)).toBeVisible()
    }
  })

  test('should maintain language when navigating', async ({ page }) => {
    await page.goto('/')
    
    // Switch to Chinese
    const languageButton = page.getByRole('button').filter({ hasText: /EN|ZH/i })
    await languageButton.click()
    await page.waitForTimeout(300)
    
    const chineseOption = page.getByRole('button', { name: /中文/i })
    if (await chineseOption.isVisible().catch(() => false)) {
      await chineseOption.click()
      await page.waitForTimeout(500)
      
      // Navigate to blog page
      await page.getByRole('link', { name: /博客/i }).first().click()
      
      // Check if still in Chinese
      await expect(page.getByText(/博客文章/)).toBeVisible()
    }
  })
})
