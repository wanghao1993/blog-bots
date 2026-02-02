import { getTranslations } from 'next-intl/server'
import { getAllPosts } from '@/lib/posts'
import { BlogCard } from '@/components/BlogCard'
import Link from 'next/link'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })
  const posts = getAllPosts(locale).slice(0, 6)
  const localePrefix = locale === 'en' ? '' : `/${locale}`

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center py-20 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden cyber-grid">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="scan-line" />
        </div>

        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-600 bg-clip-text text-transparent glow-text">
          {t('hero.title')}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>
        <Link href={`${localePrefix}/blog`}>
          <button className="tech-button text-lg flex items-center gap-2 mx-auto">
            <span>{t('hero.cta')}</span>
            <span className="text-cyan-300">▶</span>
          </button>
        </Link>
      </section>

      {/* Latest Posts */}
      <section className="py-12">
        <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          {t('latestPosts')}
        </h2>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No posts yet. Create your first post in the content/posts directory!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <div
                key={post.slug}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        )}

        {posts.length > 0 && (
          <div className="text-center mt-12">
            <Link href={`${localePrefix}/blog`}>
              <button className="tech-button">
                {t('allPosts')} →
              </button>
            </Link>
          </div>
        )}
      </section>

      {/* Decorative Elements */}
      <div className="fixed bottom-10 right-10 text-6xl pointer-events-none opacity-30">
        <div className="relative">
          <span className="absolute animate-ping">⚡</span>
          <span>⚡</span>
        </div>
      </div>
      <div className="fixed top-1/3 left-10 text-4xl animate-float pointer-events-none opacity-30">
        💻
      </div>
    </div>
  )
}
