import Link from 'next/link';
import { Post } from '@/lib/posts';
import { useTranslation } from '@/lib/i18n/client';

interface BlogPostCardProps {
  post: Post;
  lang: string;
}

export default function BlogPostCard({ post, lang }: BlogPostCardProps) {
  const { t } = useTranslation('common');
  
  // 提取摘要（<!--more-->之前的内容）
  const summaryMatch = post.content.split('<!--more-->')[0];
  const summary = summaryMatch || post.content.substring(0, 200) + '...';

  return (
    <article className="border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            {post.locked && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                🔒 需要解锁
              </span>
            )}
            <span className="text-sm text-gray-500">
              {t('posted_on')} {post.date}
            </span>
          </div>
          
          <h2 className="text-2xl font-bold mb-2">
            <Link 
              href={`/${lang}/blog/${post.slug}`}
              className="hover:text-blue-600"
            >
              {post.title}
            </Link>
          </h2>
          
          <p className="text-gray-600 mb-4">
            {post.description}
          </p>
        </div>
        
        {post.translations && post.translations.length > 1 && (
          <div className="flex space-x-1">
            {post.translations.map((transLang) => (
              <Link
                key={transLang}
                href={`/${transLang}/blog/${post.slug}`}
                className={`px-2 py-1 text-xs border rounded ${
                  lang === transLang 
                    ? 'bg-blue-100 text-blue-700 border-blue-300' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {transLang.toUpperCase()}
              </Link>
            ))}
          </div>
        )}
      </div>
      
      <div 
        className="prose prose-blue max-w-none mb-4"
        dangerouslySetInnerHTML={{ __html: summary }}
      />
      
      <div className="flex justify-between items-center mt-6">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/${lang}/blog?tag=${encodeURIComponent(tag)}`}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
            >
              #{tag}
            </Link>
          ))}
        </div>
        
        <Link
          href={`/${lang}/blog/${post.slug}`}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          {t('read_more')}
          <span className="ml-1">→</span>
        </Link>
      </div>
    </article>
  );
}