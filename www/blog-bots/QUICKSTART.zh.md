# 🚀 快速启动指南

## 第一次运行

1. **安装依赖**
```bash
pnpm install
```

2. **配置环境变量**
```bash
cp .env.example .env
```

编辑 `.env` 文件并添加你的 API keys（可选）：
- OpenAI API Key（用于 AI 翻译和摘要功能）
- Giscus 配置（用于评论系统）

3. **启动开发服务器**
```bash
pnpm dev
```

4. **打开浏览器**

访问 http://localhost:3000

## 创建第一篇文章

1. 在 `content/posts/` 创建文件：`my-first-post.en.mdx`

```markdown
---
title: "我的第一篇文章"
date: "2024-02-01"
excerpt: "这是我博客的第一篇文章"
tags: ["hello", "first-post"]
---

# 标题

这是文章内容...
```

2. 刷新页面，你的文章就会出现！

## 功能演示

- ✅ 多语言支持（中英文切换）
- ✅ 深色/浅色主题
- ✅ 全局搜索
- ✅ 标签分类
- ✅ AI 翻译和摘要（需要配置 OpenAI API）
- ✅ 评论系统（需要配置 Giscus）
- ✅ 分享功能
- ✅ 可爱的动画效果

## 部署

### Vercel（推荐）

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 添加环境变量
4. 点击部署！

## 常见问题

**Q: 如何添加封面图片？**
A: 在文章的 frontmatter 中添加 `coverImage: "图片URL"`

**Q: 如何修改主题颜色？**
A: 编辑 `tailwind.config.ts` 中的颜色配置

**Q: AI 功能需要付费吗？**
A: 是的，需要 OpenAI API key，按使用量计费

**Q: 评论系统如何配置？**
A: 访问 https://giscus.app 获取配置信息

## 技术支持

遇到问题？查看 README.md 或 README.zh.md 获取更多信息。

---

祝你使用愉快！🌸
