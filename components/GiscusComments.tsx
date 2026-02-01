'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';
import { useTranslation } from '@/lib/i18n/client';

export default function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const { t } = useTranslation('common');

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', process.env.NEXT_PUBLIC_GISCUS_REPO || '');
    script.setAttribute('data-repo-id', process.env.NEXT_PUBLIC_GISCUS_REPO_ID || '');
    script.setAttribute('data-category', process.env.NEXT_PUBLIC_GISCUS_CATEGORY || '');
    script.setAttribute('data-category-id', process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || '');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', resolvedTheme === 'dark' ? 'dark' : 'light');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;

    ref.current.appendChild(script);
  }, [resolvedTheme]);

  return (
    <div className="mt-12 pt-8 border-t">
      <h3 className="text-xl font-bold mb-4">{t('comments') || 'Comments'}</h3>
      <div ref={ref} />
      <p className="text-sm text-gray-500 mt-4">
        {t('comments_note') || 'Comments powered by Giscus. GitHub account required.'}
      </p>
    </div>
  );
}