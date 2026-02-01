import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import BlogPostCard from '@/components/BlogPostCard';

interface HomePageProps {
  params: {
    lang: string;
  };
}

export default function HomePage({ params }: HomePageProps) {
  const { lang } = params;
  const posts = getAllPosts(lang).slice(0, 3); // 显示最新3篇文章

  return (
    <div className="space-y-16">
      {/* 英雄区域 */}
      <section className="text-center py-12">
        <div className="inline-block mb-6 p-3 bg-gradient-to-r from-yellow-100 to-green-100 rounded-full">
          <div className="text-5xl">🍋</div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          柠檬技术博客
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          探索前端开发与人工智能的交叉点。多语言技术博客，包含AI解锁内容、实时翻译和智能交互。
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href={`/${lang}/blog`}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
          >
            浏览博客
          </Link>
          <Link 
            href={`/${lang}/about`}
            className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 font-medium"
          >
            了解更多
          </Link>
          <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:opacity-90 font-medium">
            🚀 体验AI功能
          </button>
        </div>
      </section>

      {/* 功能亮点 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-4">🌐</div>
          <h3 className="text-xl font-bold mb-3">多语言支持</h3>
          <p className="text-gray-600">
            支持英语、中文、日语、韩语、西班牙语。AI实时翻译技术文章。
          </p>
        </div>
        <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-4">🤖</div>
          <h3 className="text-xl font-bold mb-3">AI增强</h3>
          <p className="text-gray-600">
            内容解锁挑战、智能标签推荐、代码解释和交互式学习。
          </p>
        </div>
        <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-4">🔓</div>
          <h3 className="text-xl font-bold mb-3">解锁系统</h3>
          <p className="text-gray-600">
            通过完成AI挑战解锁高级内容，增强学习参与度和成就感。
          </p>
        </div>
      </section>

      {/* 最新文章 */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">📝 最新文章</h2>
          <Link 
            href={`/${lang}/blog`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            查看全部 →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.slug} className="border rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-2 mb-3">
                  {post.locked && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      🔒 锁定
                    </span>
                  )}
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  <Link 
                    href={`/${lang}/blog/${post.slug}`}
                    className="hover:text-blue-600"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <Link 
                  href={`/${lang}/blog/${post.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  阅读全文 →
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-xl font-medium mb-2">暂无文章</h3>
              <p className="text-gray-500">稍后再来查看最新内容</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA区域 */}
      <section className="text-center py-12 px-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
        <h2 className="text-3xl font-bold mb-4">准备好开始了吗？</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          加入我们的社区，探索前端与AI的无限可能。免费开源，持续更新。
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="https://github.com/your-username/lemon-blog"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 font-medium"
          >
            ⭐ GitHub 星标
          </a>
          <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:opacity-90 font-medium">
            🎯 尝试AI挑战
          </button>
        </div>
      </section>
    </div>
  );
}