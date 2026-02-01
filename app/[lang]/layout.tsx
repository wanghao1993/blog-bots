import '../globals.css';
import { i18n } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Navigation from '@/components/Navigation';

export async function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang}>
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <header className="py-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <div className="text-3xl">🍋</div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  柠檬技术博客
                </h1>
              </div>
              <LanguageSwitcher currentLang={params.lang} />
            </div>
            <Navigation lang={params.lang} />
          </header>
          
          <main className="py-8">
            {children}
          </main>
          
          <footer className="py-12 border-t mt-12 text-center text-gray-500">
            <p className="mb-2">
              Built with Next.js, AI, and 🍋 by 柠檬
            </p>
            <p className="text-sm">
              © {new Date().getFullYear()} Lemon Tech Blog. All rights reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}