'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { AIActions } from './AIActions'

interface BlogContentProps {
  content: string
  locale: string
}

export function BlogContent({ content, locale }: BlogContentProps) {
  const [displayContent, setDisplayContent] = useState(content)
  const [isTranslated, setIsTranslated] = useState(false)

  const handleTranslationComplete = (translatedContent: string) => {
    setDisplayContent(translatedContent)
    setIsTranslated(true)
  }

  const resetToOriginal = () => {
    setDisplayContent(content)
    setIsTranslated(false)
  }

  return (
    <div>
      {/* AI Actions */}
      <div className="mb-12">
        <AIActions
          content={content}
          locale={locale}
          onTranslationComplete={handleTranslationComplete}
          onResetContent={resetToOriginal}
          isTranslated={isTranslated}
        />
      </div>

      {/* Content */}
      <div className="prose-custom mb-12">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {displayContent}
        </ReactMarkdown>
      </div>
    </div>
  )
}
