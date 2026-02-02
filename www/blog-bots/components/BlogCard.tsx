'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock, Tag } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import type { Post } from '@/lib/posts'

interface BlogCardProps {
  post: Post
}

export function BlogCard({ post }: BlogCardProps) {
  const locale = useLocale()
  const t = useTranslations('common')
  const localePrefix = locale === 'en' ? '' : `/${locale}`

  return (
    <Link href={`${localePrefix}/blog/${post.slug}`}>
      <motion.article
        whileHover={{ y: -5 }}
        className="tech-card p-6 h-full"
      >
        {post.coverImage && (
          <div className="relative h-48 mb-4 rounded-2xl overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="space-y-3">
          <h2 className="text-2xl font-bold line-clamp-2 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            {post.title}
          </h2>

          <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-pink-900/20 dark:to-purple-900/20 text-sm"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time>{formatDate(post.date, locale)}</time>
            </div>
          </div>

          <motion.div
            whileHover={{ x: 5 }}
            className="inline-flex items-center text-primary font-medium mt-2"
          >
            {t('readMore')} →
          </motion.div>
        </div>
      </motion.article>
    </Link>
  )
}
