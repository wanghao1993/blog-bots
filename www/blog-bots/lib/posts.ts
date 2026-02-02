import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  tags: string[]
  coverImage?: string
  author?: string
  locale: string
}

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string, locale: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.${locale}.mdx`)
    if (!fs.existsSync(fullPath)) {
      return null
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || '',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      content,
      tags: data.tags || [],
      coverImage: data.coverImage,
      author: data.author,
      locale,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export function getAllPosts(locale: string): Post[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .filter((slug) => slug.endsWith(`.${locale}.mdx`))
    .map((fileName) => {
      const slug = fileName.replace(`.${locale}.mdx`, '')
      return getPostBySlug(slug, locale)
    })
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1))

  return posts
}

export function getAllTags(locale: string): { tag: string; count: number }[] {
  const posts = getAllPosts(locale)
  const tagMap = new Map<string, number>()

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
    })
  })

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

export function getPostsByTag(tag: string, locale: string): Post[] {
  const posts = getAllPosts(locale)
  return posts.filter((post) => post.tags.includes(tag))
}
