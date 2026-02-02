# 🚀 Quick Start Guide

## First Time Setup

1. **Install Dependencies**
```bash
pnpm install
```

2. **Configure Environment Variables**
```bash
cp .env.example .env
```

Edit the `.env` file and add your API keys (optional):
- OpenAI API Key (for AI translation and summary features)
- Giscus Configuration (for comment system)

3. **Start Development Server**
```bash
pnpm dev
```

4. **Open Browser**

Visit http://localhost:3000

## Create Your First Post

1. Create a file in `content/posts/`: `my-first-post.en.mdx`

```markdown
---
title: "My First Post"
date: "2024-02-01"
excerpt: "This is my first blog post"
tags: ["hello", "first-post"]
---

# Heading

This is the content...
```

2. Refresh the page, and your post will appear!

## Features Demo

- ✅ Multi-language support (English/Chinese)
- ✅ Dark/Light theme
- ✅ Global search
- ✅ Tag classification
- ✅ AI translation and summary (requires OpenAI API)
- ✅ Comment system (requires Giscus setup)
- ✅ Share functionality
- ✅ Cute animations

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project on Vercel
3. Add environment variables
4. Click Deploy!

## FAQ

**Q: How to add cover images?**
A: Add `coverImage: "image-url"` in the post's frontmatter

**Q: How to change theme colors?**
A: Edit color configurations in `tailwind.config.ts`

**Q: Do AI features require payment?**
A: Yes, you need an OpenAI API key, charged by usage

**Q: How to configure the comment system?**
A: Visit https://giscus.app to get configuration info

## Support

Having issues? Check README.md or README.zh.md for more information.

---

Happy blogging! 🌸
