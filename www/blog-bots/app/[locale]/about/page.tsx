import { getTranslations } from 'next-intl/server'

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          👋 {t('title')}
        </h1>
        <p className="text-muted-foreground text-lg">{t('description')}</p>
      </div>

      <div className="tech-card p-8 md:p-12 space-y-6">
        <section>
          <h2 className="text-3xl font-bold mb-4 text-primary">Welcome! ⚡</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            This is a modern, tech-focused blog built with cutting-edge web technologies.
            It features a sleek design, smooth animations, dark mode support, and
            multi-language capabilities.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4 text-primary">Features ✨</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-2xl">🌍</span>
              <span>Multi-language support (English & Chinese)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🎨</span>
              <span>Beautiful dark/light theme with smooth transitions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🔍</span>
              <span>Powerful global search functionality</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🏷️</span>
              <span>Tag-based content organization</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🤖</span>
              <span>AI-powered translation and summarization</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">💬</span>
              <span>Comment system powered by Giscus</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">📱</span>
              <span>Fully responsive design</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🚀</span>
              <span>Built with Next.js 15 for optimal performance</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4 text-primary">Tech Stack 💻</h2>
          <div className="flex flex-wrap gap-3">
            {[
              'Next.js 15',
              'React 19',
              'TypeScript',
              'Tailwind CSS',
              'Framer Motion',
              'MDX',
              'OpenAI',
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20 font-medium border border-cyan-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="text-center pt-8">
          <p className="text-lg text-muted-foreground">
            Built with ⚡ and cutting-edge tech
          </p>
        </section>
      </div>
    </div>
  )
}
