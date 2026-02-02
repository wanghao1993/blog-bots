'use client'

import { motion } from 'framer-motion'
import { Share2, Twitter, Facebook, Linkedin, Link as LinkIcon } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface ShareButtonsProps {
  title: string
  url: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const t = useTranslations('common')

  const shareUrl = typeof window !== 'undefined' ? window.location.href : url

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-blue-500',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-blue-600',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-blue-700',
    },
  ]

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Share2 className="h-4 w-4" />
        {t('share')}:
      </span>

      {shareLinks.map((link) => {
        const Icon = link.icon
        return (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className={`h-10 w-10 rounded-full bg-muted flex items-center justify-center transition-colors ${link.color} hover:text-white`}
            aria-label={`Share on ${link.name}`}
          >
            <Icon className="h-5 w-5" />
          </motion.a>
        )
      })}

      <motion.button
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={copyToClipboard}
        className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
          copied
            ? 'bg-green-500 text-white'
            : 'bg-muted hover:bg-purple-500 hover:text-white'
        }`}
        aria-label="Copy link"
      >
        <LinkIcon className="h-5 w-5" />
      </motion.button>

      {copied && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-sm text-green-500 font-medium"
        >
          ✓ Copied!
        </motion.span>
      )}
    </div>
  )
}
