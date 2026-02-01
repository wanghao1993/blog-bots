import { getPost } from '@/lib/posts';
import { notFound } from 'next/navigation';
import ContentLock from '@/components/ContentLock';
import AITranslator from '@/components/AITranslator';
import GiscusComments from '@/components/GiscusComments';
import TagCloud from '@/components/TagCloud';
import { getAllTags } from '@/lib/posts';
import Link from 'next/link';

interface BlogPostPageProps {
  params: {
    lang: string;
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = params;
  const post = getPost(slug, lang);
  
  if (!post) {
    notFound();
  }
  
  // 分离锁定内容
  const contentParts = post.content.split('<!--more-->');
  const unlockedContent = contentParts[0];
  const lockedContent = contentParts[1] || '';
  
  // 获取所有标签
  const tags = getAllTags(lang);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <article className="lg:col-span-3">
        <header className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Link 
              href={`/${lang}/blog`}
              className="text-blue-600 hover:underline"
            >
              ← 返回博客列表
            </Link>
            <span className="text-gray-400">|</span>
            <span className="text-gray-500">
              发布于 {post.date}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/${lang}/blog?tag=${encodeURIComponent(tag)}`}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
              >
                #{tag}
              </Link>
            ))}
          </div>
          
          {post.translations && post.translations.length > 1 && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="font-medium mb-2">🌐 可用语言版本：</p>
              <div className="flex space-x-2">
                {post.translations.map((transLang) => (
                  <Link
                    key={transLang}
                    href={`/${transLang}/blog/${slug}`}
                    className={`px-3 py-1 rounded ${
                      lang === transLang
                        ? 'bg-blue-500 text-white'
                        : 'bg-white border hover:bg-gray-100'
                    }`}
                  >
                    {transLang.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </header>
        
        <div className="prose prose-lg max-w-none mb-8">
          <div dangerouslySetInnerHTML={{ __html: unlockedContent }} />
        </div>
        
        {/* AI翻译器 */}
        <AITranslator content={unlockedContent} />
        
        {/* 锁定内容区域 */}
        {post.locked && lockedContent && (
          <div className="my-12">
            <h3 className="text-2xl font-bold mb-4">🎯 高级内容</h3>
            <p className="text-gray-600 mb-6">
              这部分内容包含高级教程和深度分析。完成简单的AI挑战即可解锁。
            </p>
            <ContentLock lockedContent={lockedContent} />
          </div>
        )}
        
        {/* 评论区域 */}
        <div className="mt-16">
          <GiscusComments />
        </div>
      </article>
      
      <div className="lg:col-span-1">
        <div className="sticky top-8 space-y-8">
          <TagCloud tags={tags} maxTags={20} />
          
          <div className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-4">📚 文章信息</h3>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-600">字数</span>
                <span className="font-medium">
                  {post.content.length} 字符
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">标签数</span>
                <span className="font-medium">{post.tags.length}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">状态</span>
                <span className={`font-medium ${
                  post.locked ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {post.locked ? '部分锁定' : '完全开放'}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">翻译版本</span>
                <span className="font-medium">
                  {post.translations?.length || 1} 种语言
                </span>
              </li>
            </ul>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-4">🤖 AI助手</h3>
            <p className="text-gray-600 mb-4">
              需要帮助理解这篇文章？让AI助手为你解释。
            </p>
            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              询问AI关于此文章
            </button>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-4">🔗 分享</h3>
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900">
                Twitter
              </button>
              <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}