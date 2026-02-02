# 🌸 可爱博客项目

这是一个现代化、可爱风格的个人博客，使用 Next.js 15 构建，具有流畅的动画和强大的功能。

## ✨ 功能特性

- 🌍 **多语言支持** - 中英文切换，使用 next-intl
- 🎨 **深色/浅色主题** - 漂亮的主题切换，使用 next-themes
- 🔍 **全局搜索** - 使用 Fuse.js 的快速模糊搜索
- 🏷️ **标签系统** - 用标签组织内容
- 🤖 **AI 集成** - 使用 OpenAI 进行翻译和摘要
- 💬 **评论系统** - 基于 Giscus 的评论功能
- 📱 **响应式设计** - 在所有设备上完美显示
- ⚡ **高性能** - 基于 Next.js 15 和 App Router
- 🎭 **流畅动画** - 使用 Framer Motion 的平滑动画
- 📝 **MDX 支持** - 使用 MDX 编写文章，支持语法高亮

## 🚀 快速开始

### 环境要求

- Node.js 18+
- pnpm（推荐）或 npm

### 安装步骤

1. 克隆仓库：

```bash
git clone <your-repo-url>
cd blog-bots
```

2. 安装依赖：

```bash
pnpm install
# 或
npm install
```

3. 复制环境变量：

```bash
cp .env.example .env
```

4. 在 `.env` 中配置你的环境变量：
   - `OPENAI_API_KEY` - 用于 AI 功能（可选）
   - `NEXT_PUBLIC_GISCUS_*` - 用于评论功能（可选）

5. 启动开发服务器：

```bash
pnpm dev
# 或
npm run dev
# 或使用启动脚本
./start.sh
```

6. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 📝 写文章

在 `content/posts/` 目录中创建 MDX 文件，格式如下：

```markdown
---
title: "文章标题"
date: "2024-01-15"
excerpt: "文章简介"
tags: ["标签1", "标签2"]
coverImage: "https://example.com/image.jpg" # 可选
author: "作者名" # 可选
---

使用 MDX 格式的文章内容...
```

为每种语言创建单独的文件：
- `my-post.en.mdx` 英文版本
- `my-post.zh.mdx` 中文版本

## 🎨 自定义

### 颜色

编辑 `tailwind.config.ts` 来自定义颜色方案。默认使用粉色和紫色渐变，营造可爱的美感。

### 主题

主题在 `app/globals.css` 中配置，使用 CSS 变量同时支持浅色和深色模式。

### 动画

在 `tailwind.config.ts` 的 `extend.animation` 部分自定义动画。

## 📦 技术栈

- **框架**: Next.js 15 with App Router
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **内容**: MDX with rehype plugins
- **搜索**: Fuse.js
- **国际化**: next-intl
- **主题**: next-themes
- **评论**: Giscus
- **AI**: OpenAI API

## 🌐 部署

### Vercel（推荐）

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 上导入你的仓库
3. 添加环境变量
4. 部署！

### 其他平台

这是一个标准的 Next.js 应用，可以部署到任何支持 Node.js 的平台：

```bash
pnpm build
pnpm start
```

## 📁 项目结构

```
blog-bots/
├── app/                    # Next.js App Router
│   ├── [locale]/          # 本地化路由
│   │   ├── blog/          # 博客文章页面
│   │   ├── tags/          # 标签页面
│   │   └── about/         # 关于页面
│   ├── api/               # API 路由
│   └── globals.css        # 全局样式
├── components/            # React 组件
├── content/              # 博客文章 (MDX)
├── i18n/                 # 国际化配置
├── lib/                  # 工具函数
├── messages/             # 翻译文件
└── public/               # 静态资源
```

## 🎯 功能说明

### 多语言支持
- 使用 next-intl 实现
- 支持中英文切换
- URL 路径自动本地化

### 主题切换
- 支持浅色/深色/系统主题
- 平滑过渡动画
- 主题状态持久化

### 全局搜索
- 实时模糊搜索
- 搜索标题、摘要、内容和标签
- 美观的搜索界面

### AI 功能
- 文章自动摘要
- 文章自动翻译
- 使用 OpenAI API

### 评论系统
- 基于 GitHub Discussions
- 支持多种主题
- 实时加载

### 分享功能
- 支持 Twitter、Facebook、LinkedIn
- 一键复制链接
- 美观的分享按钮

## 💡 提示

1. 确保在 `.env` 文件中配置 OpenAI API key 以使用 AI 功能
2. 在 [giscus.app](https://giscus.app) 配置评论系统
3. 使用高质量的封面图片提升视觉效果
4. 定期更新内容以保持博客活跃

## 📄 许可证

MIT License - 欢迎使用本项目创建你自己的博客！

## 🤝 贡献

欢迎贡献！随时提交 issues 或 pull requests。

## 💖 致谢

使用现代 Web 技术精心打造。

---

用 💖 和大量的 ☕ 制作
