'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-lg bg-muted animate-pulse" />
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 p-2 shadow-lg hover:shadow-cyan-500/50 transition-shadow border border-cyan-400/50"
      aria-label="Toggle theme"
    >
      <div className="relative h-full w-full">
        {theme === 'dark' ? (
          <Moon className="h-full w-full text-white" />
        ) : (
          <Sun className="h-full w-full text-white" />
        )}
      </div>
    </motion.button>
  )
}
