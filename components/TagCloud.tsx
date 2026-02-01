'use client';

import { useTranslation } from '@/lib/i18n/client';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface TagCloudProps {
  tags: { [key: string]: number };
  maxTags?: number;
}

export default function TagCloud({ tags, maxTags = 50 }: TagCloudProps) {
  const { t } = useTranslation('common');
  const params = useParams();
  const currentLang = params.lang as string;

  // 将标签对象转换为数组并按数量排序
  const tagArray = Object.entries(tags)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxTags);

  // 计算标签的字体大小（基于数量）
  const maxCount = Math.max(...tagArray.map(([, count]) => count));
  const minCount = Math.min(...tagArray.map(([, count]) => count));
  const sizeRange = { min: 0.8, max: 1.8 }; // rem 单位

  const getFontSize = (count: number) => {
    if (maxCount === minCount) return '1rem';
    const ratio = (count - minCount) / (maxCount - minCount);
    const size = sizeRange.min + ratio * (sizeRange.max - sizeRange.min);
    return `${size}rem`;
  };

  return (
    <div className="my-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl shadow-sm">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">🏷️</span>
        {t('tags')}
      </h3>
      
      <div className="flex flex-wrap gap-3">
        {tagArray.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/${currentLang}/blog?tag=${encodeURIComponent(tag)}`}
            className="inline-flex items-center px-4 py-2 rounded-full border hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            style={{
              fontSize: getFontSize(count),
              backgroundColor: `rgba(59, 130, 246, ${0.1 + (count / maxCount) * 0.15})`,
              borderColor: `rgba(59, 130, 246, ${0.3 + (count / maxCount) * 0.3})`,
            }}
          >
            <span className="font-medium">{tag}</span>
            <span className="ml-2 text-sm opacity-70">({count})</span>
          </Link>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <Link 
          href={`/${currentLang}/tags`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <span>{t('all_tags')}</span>
          <span className="ml-1">→</span>
        </Link>
      </div>
    </div>
  );
}