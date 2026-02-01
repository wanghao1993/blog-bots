'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/client';

interface LanguageSwitcherProps {
  currentLang: string;
}

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const { i18n } = useTranslation('common');
  const router = useRouter();

  const languages = [
    { code: 'en', name: 'English', emoji: '🇺🇸' },
    { code: 'zh', name: '中文', emoji: '🇨🇳' },
    { code: 'ja', name: '日本語', emoji: '🇯🇵' },
    { code: 'ko', name: '한국어', emoji: '🇰🇷' },
    { code: 'es', name: 'Español', emoji: '🇪🇸' },
  ];

  const changeLanguage = (langCode: string) => {
    // 更新 i18n 实例
    i18n.changeLanguage(langCode);
    
    // 获取当前路径并替换语言部分
    const path = window.location.pathname;
    const newPath = path.replace(/^\/(en|zh|ja|ko|es)/, `/${langCode}`);
    router.push(newPath);
  };

  return (
    <div className="relative group">
      <button className="flex items-center px-3 py-2 border rounded-lg hover:bg-gray-50">
        <span className="mr-2">
          {languages.find(l => l.code === currentLang)?.emoji || '🌐'}
        </span>
        <span className="font-medium">
          {languages.find(l => l.code === currentLang)?.name || 'Language'}
        </span>
        <span className="ml-2">▼</span>
      </button>
      
      <div className="absolute right-0 mt-1 py-2 w-40 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`flex items-center w-full px-4 py-2 hover:bg-gray-100 ${
              currentLang === language.code ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <span className="mr-3">{language.emoji}</span>
            <span>{language.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}