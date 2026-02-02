'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock, Tag } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import type { Post } from '@/lib/posts'

interface BlogListItemProps {
  post: Post
}

export function BlogListItem({ post }: BlogListItemProps) {
  const locale = useLocale()
  const t = useTranslations('common')
  const localePrefix = locale === 'en' ? '' : `/${locale}`

  return (
    <Link href={`${localePrefix}/blog/${post.slug}`}>
      <motion.article
        whileHover={{ x: 5 }}
        className="group border-l-4 border-transparent hover:border-blue-500 py-6 px-4 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent dark:hover:from-blue-950/20 dark:hover:to-transparent transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* 左侧：元信息和标题 */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <time className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(post.date, locale)}
              </time>
              
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-xs font-medium"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {post.title}
            </h2>

            <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="mr-4">
                  {t('readMore')} →
                </span>
              </div>
              
              {post.author && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  By {post.author}
                </div>
              )}
            </div>
          </div>

          {/* 右侧：封面图片（如果有） */}
          {post.coverImage && (
            <div className="md:w-48 md:flex-shrink-0">
              <div className="relative h-32 md:h-40 rounded-lg overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          )}
        </div>
      </motion.article>
    </Link>
  )
}