/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  // i18n 配置
  i18n: {
    locales: ['en', 'zh', 'ja', 'ko', 'es'],
    defaultLocale: 'en',
    localeDetection: true,
  },
  // 允许构建时输出更多信息
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;