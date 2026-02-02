import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { formatDate } from '@/lib/utils'
import { Calendar, Tag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ShareButtons } from '@/components/ShareButtons'
import { Comments } from '@/components/Comments'
import { BlogContent } from '@/components/BlogContent'
import { getTranslations } from 'next-intl/server'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'

export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const post = getPostBySlug(slug, locale)
  const t = await getTranslations({ locale, namespace: 'blog' })
  const tCommon = await getTranslations({ locale, namespace: 'common' })

  if (!post) {
    notFound()
  }

  const localePrefix = locale === 'en' ? '' : `/${locale}`

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link
        href={`${localePrefix}/blog`}
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {tCommon('backToHome')}
      </Link>

      <article>
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time>{formatDate(post.date, locale)}</time>
            </div>
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {post.tags.map((tag) => (
                <Link key={tag} href={`${localePrefix}/tags?tag=${tag}`}>
                  <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-pink-900/20 dark:to-purple-900/20 hover:scale-105 transition-transform cursor-pointer">
                    <Tag className="h-4 w-4" />
                    {tag}
                  </span>
                </Link>
              ))}
            </div>
          )}

          {post.coverImage && (
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl mb-8">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </header>

        {/* AI Actions and Content */}
        <BlogContent content={post.content} locale={locale} />

        {/* Share Buttons */}
        <div className="border-t border-border pt-8 mb-12">
          <ShareButtons title={post.title} url={`/blog/${post.slug}`} />
        </div>

        {/* Comments */}
        <Comments />
      </article>
    </div>
  )
}
