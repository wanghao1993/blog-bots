import { getTranslations } from 'next-intl/server'
import { getAllPosts } from '@/lib/posts'
import { BlogListItem } from '@/components/BlogListItem'

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  const posts = getAllPosts(locale)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          📚 {t('title')}
        </h1>
        <p className="text-muted-foreground text-lg">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} in total
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg mb-4">
            No posts found. Start creating content!
          </p>
          <div className="tech-card max-w-2xl mx-auto p-8">
            <h3 className="text-xl font-bold mb-4">How to add a post:</h3>
            <ol className="text-left space-y-2 text-muted-foreground">
              <li>1. Create a file in <code className="bg-muted px-2 py-1 rounded">content/posts/</code></li>
              <li>2. Name it like <code className="bg-muted px-2 py-1 rounded">my-post.en.mdx</code></li>
              <li>3. Add frontmatter with title, date, excerpt, and tags</li>
              <li>4. Write your content in MDX format</li>
            </ol>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {posts.map((post) => (
              <BlogListItem key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
