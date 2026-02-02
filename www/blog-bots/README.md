# 🌸 Cute Blog

A modern, beautiful personal blog built with Next.js 15, featuring cute design, smooth animations, and powerful features.

## ✨ Features

- 🌍 **Multi-language Support** - English & Chinese with next-intl
- 🎨 **Dark/Light Theme** - Beautiful theme switching with next-themes
- 🔍 **Global Search** - Fast fuzzy search powered by Fuse.js
- 🏷️ **Tag System** - Organize content with tags
- 🤖 **AI Integration** - Translation and summarization powered by DeepSeek
- 💬 **Comments** - Giscus-powered comment system
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Performance** - Built on Next.js 15 with App Router
- 🎭 **Animations** - Smooth animations with Framer Motion
- 📝 **MDX Support** - Write posts in MDX with syntax highlighting

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd blog-bots
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Copy the environment variables:

```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
   - `DEEPSEEK_API_KEY` - For AI features (get from [DeepSeek Platform](https://platform.deepseek.com))
   - `NEXT_PUBLIC_GISCUS_*` - For comments (optional)

5. Run the development server:

```bash
pnpm dev
# or
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Writing Posts

Create MDX files in `content/posts/` with the following structure:

```markdown
---
title: "Your Post Title"
date: "2024-01-15"
excerpt: "A brief description of your post"
tags: ["tag1", "tag2"]
coverImage: "https://example.com/image.jpg" # optional
author: "Your Name" # optional
---

Your content here in MDX format...
```

Create separate files for each language:
- `my-post.en.mdx` for English
- `my-post.zh.mdx` for Chinese

## 🧪 Testing

This project includes comprehensive UI automation tests using Playwright.

### Running Tests

```bash
# Install Playwright browsers (first time only)
./setup-tests.sh

# Run tests in UI mode (recommended)
pnpm test:ui

# Run all tests
pnpm test

# Run tests with browser visible
pnpm test:headed

# Debug tests
pnpm test:debug

# View test report
pnpm test:report
```

### Test Coverage

- ✅ 50+ test cases
- ✅ All major features covered
- ✅ Cross-browser testing (Chromium, Firefox, WebKit)
- ✅ Mobile and desktop responsive tests
- ✅ Accessibility tests

See [TESTING.md](./TESTING.md) and [TEST_SUMMARY.md](./TEST_SUMMARY.md) for detailed documentation.

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme. The default uses pink and purple gradients for a cute aesthetic.

### Theme

The theme is configured in `app/globals.css` with CSS variables for both light and dark modes.

### Animations

Customize animations in `tailwind.config.ts` under the `extend.animation` section.

## 📦 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Content**: MDX with rehype plugins
- **Search**: Fuse.js
- **Internationalization**: next-intl
- **Theme**: next-themes
- **Comments**: Giscus
- **AI**: DeepSeek API

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Other Platforms

This is a standard Next.js app and can be deployed to any platform that supports Node.js:

```bash
pnpm build
pnpm start
```

### Pre-deployment Checklist

- ✅ Run tests: `pnpm test`
- ✅ Check build: `pnpm build`
- ✅ Configure environment variables
- ✅ Set up Giscus for comments (optional)
- ✅ Add DeepSeek API key for AI features (optional)

## 📄 License

MIT License - feel free to use this for your own blog!

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 💖 Credits

Built with love using modern web technologies.

---

Made with 💖 and lots of ☕
