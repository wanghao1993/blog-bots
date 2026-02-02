'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Languages, RotateCcw } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface AIActionsProps {
  content: string
  locale: string
  onTranslationComplete?: (translatedContent: string) => void
  onResetContent?: () => void
  isTranslated?: boolean
}

export function AIActions({ 
  content, 
  locale, 
  onTranslationComplete,
  onResetContent,
  isTranslated = false 
}: AIActionsProps) {
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState<'summary' | 'translate' | null>(null)
  const t = useTranslations('common')

  const getSummary = async () => {
    setLoading('summary')
    try {
      const response = await fetch('/api/ai/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, locale }),
      })
      const data = await response.json()
      setSummary(data.summary)
    } catch (error) {
      console.error('Error getting summary:', error)
    } finally {
      setLoading(null)
    }
  }

  const translateContent = async () => {
    setLoading('translate')
    const targetLocale = locale === 'en' ? 'zh' : 'en'
    try {
      const response = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, targetLocale }),
      })
      const data = await response.json()
      if (data.translation && onTranslationComplete) {
        onTranslationComplete(data.translation)
      }
    } catch (error) {
      console.error('Error translating:', error)
    } finally {
      setLoading(null)
    }
  }

  const resetContent = () => {
    if (onResetContent) {
      onResetContent()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={getSummary}
          disabled={loading === 'summary' || loading === 'translate'}
          className="tech-button flex items-center gap-2"
        >
          <Sparkles className="h-5 w-5" />
          {loading === 'summary' ? t('loading') : `AI ${t('summary')}`}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={translateContent}
          disabled={loading === 'translate' || loading === 'summary' || isTranslated}
          className="tech-button flex items-center gap-2"
        >
          <Languages className="h-5 w-5" />
          {loading === 'translate' ? t('loading') : `AI ${t('translate')}`}
        </motion.button>

        {isTranslated && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetContent}
            className="tech-button flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600"
          >
            <RotateCcw className="h-5 w-5" />
            {t('reset')}
          </motion.button>
        )}
      </div>

      {isTranslated && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="tech-card p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30"
        >
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Languages className="h-4 w-4" />
            {locale === 'zh' 
              ? '内容已由 AI 翻译。点击「恢复原文」查看原文。' 
              : 'Content has been translated by AI. Click "Reset to Original" to view original.'}
          </p>
        </motion.div>
      )}

      {summary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="tech-card p-6 space-y-3 border-cyan-500/30"
        >
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI {t('summary')}
          </h3>
          <p className="text-muted-foreground leading-relaxed">{summary}</p>
        </motion.div>
      )}
    </div>
  )
}
