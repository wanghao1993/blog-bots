import { getTranslations } from 'next-intl/server'
import { getAllTags, getPostsByTag } from '@/lib/posts'
import { BlogCard } from '@/components/BlogCard'
import { Tag } from 'lucide-react'
import Link from 'next/link'

export default async function TagsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ tag?: string }>
}) {
  const { locale } = await params
  const { tag: selectedTag } = await searchParams
  const t = await getTranslations({ locale, namespace: 'tags' })
  const tags = getAllTags(locale)
  const posts = selectedTag ? getPostsByTag(selectedTag, locale) : []
  const localePrefix = locale === 'en' ? '' : `/${locale}`

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          🏷️ {t('title')}
        </h1>
      </div>

      {!selectedTag ? (
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {tags.map((tag) => (
              <Link key={tag.tag} href={`?tag=${tag.tag}`}>
                <div className="tech-card px-6 py-4 cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <Tag className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-lg font-semibold">{tag.tag}</span>
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-pink-900/20 dark:to-purple-900/20 text-sm">
                      {tag.count}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {tags.length === 0 && (
            <p className="text-center text-muted-foreground text-lg">
              No tags yet. Add tags to your posts!
            </p>
          )}
        </div>
      ) : (
        <div>
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">
              {t('postsWithTag')} &ldquo;{selectedTag}&rdquo;
            </h2>
            <Link href={`${localePrefix}/tags`}>
              <button className="tech-button">← Back to all tags</button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
