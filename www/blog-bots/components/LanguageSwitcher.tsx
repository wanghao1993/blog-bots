'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Languages } from 'lucide-react'
import { useState } from 'react'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const switchLanguage = (newLocale: string) => {
    // Remove the current locale prefix if it exists
    let path = pathname
    if (pathname.startsWith(`/${locale}`)) {
      path = pathname.slice(locale.length + 1) || '/'
    }
    
    // Add new locale prefix (except for default 'en' with as-needed mode)
    const newPath = newLocale === 'en' ? path : `/${newLocale}${path}`
    router.push(newPath)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-10 px-4 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-cyan-500/50 transition-shadow border border-cyan-400/50"
      >
        <Languages className="h-5 w-5" />
        <span className="font-medium uppercase">{locale}</span>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-12 right-0 bg-card border border-cyan-500/30 rounded-lg shadow-xl overflow-hidden z-50"
        >
          <button
            onClick={() => switchLanguage('en')}
            className="block w-full px-6 py-3 text-left hover:bg-muted transition-colors"
          >
            🇺🇸 English
          </button>
          <button
            onClick={() => switchLanguage('zh')}
            className="block w-full px-6 py-3 text-left hover:bg-muted transition-colors"
          >
            🇨🇳 中文
          </button>
        </motion.div>
      )}
    </div>
  )
}
