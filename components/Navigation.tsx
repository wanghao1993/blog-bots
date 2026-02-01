'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/client';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  lang: string;
}

export default function Navigation({ lang }: NavigationProps) {
  const { t } = useTranslation('common');
  const pathname = usePathname();

  const navItems = [
    { href: `/${lang}`, label: t('home') },
    { href: `/${lang}/blog`, label: t('blog') },
    { href: `/${lang}/about`, label: t('about') },
    { href: `/${lang}/tags`, label: 'Tags' },
  ];

  return (
    <nav className="flex space-x-1 border-b pb-4">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}