# 🧪 UI 自动化测试文档

## 测试框架

本项目使用 **Playwright** 进行 UI 自动化测试，这是目前最强大和可靠的端到端测试框架。

### 为什么选择 Playwright？

- ✅ **跨浏览器支持** - Chromium、Firefox、WebKit
- ✅ **自动等待** - 无需手动等待，测试更稳定
- ✅ **并行执行** - 测试运行速度快
- ✅ **强大的调试工具** - UI 模式、追踪查看器
- ✅ **移动端测试** - 支持移动设备模拟
- ✅ **自动重试** - CI 环境中自动重试失败的测试
- ✅ **截图和视频** - 失败时自动捕获

## 测试覆盖

### ✅ 已实现的测试套件

1. **首页测试** (`tests/home.spec.ts`)
   - 页面加载
   - 导航元素显示
   - 博客卡片展示
   - CTA 按钮功能

2. **导航测试** (`tests/navigation.spec.ts`)
   - 页面间导航
   - 响应式导航
   - 粘性导航栏

3. **主题切换测试** (`tests/theme.spec.ts`)
   - 深色/浅色主题切换
   - 主题持久化

4. **语言切换测试** (`tests/language.spec.ts`)
   - 中英文切换
   - 语言状态保持

5. **搜索功能测试** (`tests/search.spec.ts`)
   - 搜索模态框
   - 搜索结果显示
   - 模态框关闭

6. **博客页面测试** (`tests/blog.spec.ts`)
   - 文章列表显示
   - 文章详情页导航
   - 文章内容显示
   - 标签和分享功能

7. **标签页面测试** (`tests/tags.spec.ts`)
   - 标签云显示
   - 按标签筛选
   - 标签计数

8. **关于页面测试** (`tests/about.spec.ts`)
   - 页面内容显示
   - 功能列表
   - 技术栈展示

9. **响应式设计测试** (`tests/responsive.spec.ts`)
   - 移动端适配
   - 平板适配
   - 桌面端适配

10. **动画和交互测试** (`tests/animations.spec.ts`)
    - 悬停效果
    - 页面过渡
    - 装饰元素动画

11. **无障碍测试** (`tests/accessibility.spec.ts`)
    - 标题层级
    - 键盘导航
    - ARIA 标签
    - 颜色对比度

## 安装 Playwright

```bash
# 安装依赖
pnpm install

# 安装 Playwright 浏览器
pnpm exec playwright install
```

## 运行测试

### 基本命令

```bash
# 运行所有测试（无头模式）
pnpm test

# 运行测试并显示浏览器（有头模式）
pnpm test:headed

# 使用 UI 模式运行（推荐，交互式界面）
pnpm test:ui

# 调试模式运行
pnpm test:debug

# 查看测试报告
pnpm test:report
```

### 高级命令

```bash
# 只运行特定测试文件
pnpm test tests/home.spec.ts

# 只运行特定浏览器
pnpm test --project=chromium
pnpm test --project=firefox
pnpm test --project=webkit

# 只运行移动端测试
pnpm test --project="Mobile Chrome"
pnpm test --project="Mobile Safari"

# 运行匹配特定名称的测试
pnpm test --grep "theme"

# 更新快照
pnpm test --update-snapshots
```

## 测试配置

测试配置在 `playwright.config.ts` 中：

- **baseURL**: `http://localhost:3002`
- **重试次数**: CI 环境 2 次，本地 0 次
- **超时**: 30 秒
- **并行执行**: 启用
- **追踪**: 首次重试时记录
- **截图**: 失败时自动截图
- **视频**: 失败时保留视频

## 测试结构

每个测试文件包含：

```typescript
import { test, expect } from '@playwright/test'

test.describe('测试套件名称', () => {
  test('测试用例描述', async ({ page }) => {
    // 1. 导航到页面
    await page.goto('/')
    
    // 2. 执行操作
    await page.getByRole('button').click()
    
    // 3. 断言结果
    await expect(page.getByText('预期文本')).toBeVisible()
  })
})
```

## CI/CD 集成

在 CI 环境中自动运行测试：

### GitHub Actions 示例

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: pnpm install
      - name: Install Playwright Browsers
        run: pnpm exec playwright install --with-deps
      - name: Run Playwright tests
        run: pnpm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

## 测试最佳实践

### 1. 使用语义化选择器

```typescript
// ✅ 好的做法
await page.getByRole('button', { name: 'Submit' })
await page.getByLabel('Email')
await page.getByPlaceholder('Search...')

// ❌ 避免
await page.locator('#submit-btn')
await page.locator('.email-input')
```

### 2. 等待策略

```typescript
// Playwright 自动等待，无需显式等待
await page.click('button') // 自动等待按钮可点击
await expect(page.getByText('Success')).toBeVisible() // 自动等待元素可见

// 只在必要时使用显式等待
await page.waitForLoadState('networkidle')
await page.waitForTimeout(500) // 尽量避免
```

### 3. 使用 test.describe 分组

```typescript
test.describe('用户登录', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
  })
  
  test('成功登录', async ({ page }) => {
    // 测试代码
  })
  
  test('登录失败', async ({ page }) => {
    // 测试代码
  })
})
```

### 4. 断言最佳实践

```typescript
// ✅ 等待元素出现
await expect(page.getByText('Success')).toBeVisible()

// ✅ 检查 URL
await expect(page).toHaveURL(/dashboard/)

// ✅ 检查文本内容
await expect(page.getByRole('heading')).toHaveText('Welcome')

// ✅ 检查元素数量
await expect(page.getByRole('listitem')).toHaveCount(5)
```

## 调试技巧

### 1. UI 模式（推荐）

```bash
pnpm test:ui
```

提供交互式界面，可以：
- 观察测试执行
- 暂停和继续
- 检查元素
- 查看时间线

### 2. 调试模式

```bash
pnpm test:debug
```

以调试模式运行，可以：
- 单步执行
- 设置断点
- 检查页面状态

### 3. 追踪查看器

```bash
# 记录追踪
pnpm test --trace on

# 查看追踪
pnpm exec playwright show-trace trace.zip
```

### 4. 浏览器开发工具

```typescript
test('调试测试', async ({ page }) => {
  await page.goto('/')
  await page.pause() // 暂停并打开 Playwright Inspector
})
```

## 测试报告

测试完成后，查看详细报告：

```bash
pnpm test:report
```

报告包含：
- 测试结果概览
- 失败的测试截图
- 失败的测试视频
- 测试执行时间
- 错误堆栈跟踪

## 性能测试

添加性能断言：

```typescript
test('页面加载性能', async ({ page }) => {
  const start = Date.now()
  await page.goto('/')
  const loadTime = Date.now() - start
  
  // 断言加载时间小于 3 秒
  expect(loadTime).toBeLessThan(3000)
})
```

## 视觉回归测试

```typescript
test('视觉回归测试', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveScreenshot()
})
```

## 持续改进

### 定期执行

1. **开发时**：每次修改后运行相关测试
2. **提交前**：运行所有测试
3. **CI/CD**：自动运行所有测试
4. **定期**：运行完整的跨浏览器测试

### 维护测试

1. 保持测试简单明了
2. 及时更新失效的测试
3. 添加新功能时编写测试
4. 删除重复的测试
5. 优化慢速测试

## 故障排除

### 常见问题

1. **测试超时**
   - 增加超时时间：`test.setTimeout(60000)`
   - 检查网络请求
   - 优化页面加载

2. **元素未找到**
   - 使用 `await page.waitForSelector()`
   - 检查元素选择器
   - 使用 Playwright Inspector 调试

3. **测试不稳定**
   - 避免使用 `waitForTimeout`
   - 使用自动等待机制
   - 增加重试次数

4. **CI 环境失败**
   - 检查环境变量
   - 安装完整的浏览器依赖
   - 使用 Docker 容器

## 测试指标

目标：
- ✅ **代码覆盖率**: > 80%
- ✅ **测试通过率**: > 95%
- ✅ **平均执行时间**: < 5 分钟
- ✅ **测试稳定性**: 连续通过 10 次

## 总结

本项目已配置完整的 UI 自动化测试：
- ✅ 11 个测试套件
- ✅ 50+ 个测试用例
- ✅ 覆盖所有主要功能
- ✅ 跨浏览器测试
- ✅ 移动端测试
- ✅ 无障碍测试
- ✅ 响应式测试

**每次运行测试都能确保 UI 功能正常！** 🎉
