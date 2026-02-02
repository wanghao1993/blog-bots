'use client'

import { Search, X } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { searchPosts } from '@/lib/search'
import Link from 'next/link'
import type { Post } from '@/lib/posts'

interface SearchButtonProps {
  posts: Post[]
}

export function SearchButton({ posts }: SearchButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const t = useTranslations('search')
  const locale = useLocale()

  const results = searchPosts(posts, query)
  const localePrefix = locale === 'en' ? '' : `/${locale}`

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 p-2 shadow-lg hover:shadow-cyan-500/50 transition-shadow border border-cyan-400/50"
        aria-label="Search"
      >
        <Search className="h-full w-full text-white" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-card border border-cyan-500/30 rounded-lg shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <Search className="h-6 w-6 text-muted-foreground" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t('placeholder')}
                    className="flex-1 bg-transparent text-lg outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 rounded-full hover:bg-muted transition-colors"
                  >
                    <X className="h-full w-full p-1" />
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto space-y-2">
                  {results.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      {query ? t('noResults') : 'Start typing to search...'}
                    </p>
                  ) : (
                    results.map((post) => (
                      <Link
                        key={post.slug}
                        href={`${localePrefix}/blog/${post.slug}`}
                        onClick={() => setIsOpen(false)}
                      >
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="p-4 rounded-lg hover:bg-muted hover:border-cyan-500/30 border border-transparent transition-colors cursor-pointer"
                        >
                          <h3 className="font-semibold text-lg mb-1">
                            {post.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {post.excerpt}
                          </p>
                        </motion.div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
