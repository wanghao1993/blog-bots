import { getAllTags, getPostsByTag } from '@/lib/posts';
import Link from 'next/link';

interface TagsPageProps {
  params: {
    lang: string;
  };
}

export default function TagsPage({ params }: TagsPageProps) {
  const { lang } = params;
  const tags = getAllTags(lang);
  
  // 按文章数量排序
  const sortedTags = Object.entries(tags)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));

  // 计算最大最小值用于样式
  const counts = sortedTags.map(t => t.count);
  const maxCount = Math.max(...counts);
  const minCount = Math.min(...counts);

  const getTagSize = (count: number) => {
    if (maxCount === minCount) return 'text-base';
    const ratio = (count - minCount) / (maxCount - minCount);
    if (ratio > 0.8) return 'text-2xl';
    if (ratio > 0.6) return 'text-xl';
    if (ratio > 0.4) return 'text-lg';
    if (ratio > 0.2) return 'text-base';
    return 'text-sm';
  };

  const getTagColor = (count: number) => {
    const ratio = (count - minCount) / (maxCount - minCount);
    if (ratio > 0.8) return 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200';
    if (ratio > 0.6) return 'bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-800 border-orange-200';
    if (ratio > 0.4) return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200';
    if (ratio > 0.2) return 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200';
    return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">🏷️ 所有标签</h1>
        <p className="text-gray-600">
          探索博客中的所有标签。点击标签查看相关文章。
        </p>
        <div className="mt-4 flex items-center justify-center space-x-4">
          <span className="text-sm text-gray-500">
            共 {sortedTags.length} 个标签
          </span>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-500">
            {Object.values(tags).reduce((a, b) => a + b, 0)} 篇文章
          </span>
        </div>
      </header>

      {/* 标签云 */}
      <div className="mb-12 p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold mb-6">标签云</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {sortedTags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/${lang}/blog?tag=${encodeURIComponent(tag)}`}
              className={`inline-flex items-center px-5 py-3 rounded-full border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${getTagColor(count)} ${getTagSize(count)}`}
            >
              <span className="font-medium">#{tag}</span>
              <span className="ml-2 px-2 py-1 bg-white/50 rounded-full text-xs">
                {count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* 按标签分组文章 */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">按标签浏览文章</h2>
        
        {sortedTags.map(({ tag, count }) => {
          const posts = getPostsByTag(tag, lang).slice(0, 3); // 每个标签显示3篇文章
          
          return (
            <div key={tag} className="border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold">#{tag}</h3>
                  <p className="text-gray-600">
                    {count} 篇文章
                  </p>
                </div>
                <Link 
                  href={`/${lang}/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 font-medium"
                >
                  查看全部
                </Link>
              </div>
              
              {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/${lang}/blog/${post.slug}`}
                      className="p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <h4 className="font-medium mb-2 line-clamp-1">{post.title}</h4>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                        {post.description}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{post.date}</span>
                        {post.locked && (
                          <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                            🔒
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  暂无文章
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 底部统计 */}
      <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
        <h3 className="text-xl font-bold mb-6 text-center">📊 标签统计</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-white rounded-xl">
            <div className="text-3xl font-bold text-blue-600">
              {sortedTags.length}
            </div>
            <div className="text-gray-600">标签总数</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl">
            <div className="text-3xl font-bold text-green-600">
              {Math.max(...counts)}
            </div>
            <div className="text-gray-600">最多文章标签</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl">
            <div className="text-3xl font-bold text-purple-600">
              {Math.min(...counts)}
            </div>
            <div className="text-gray-600">最少文章标签</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl">
            <div className="text-3xl font-bold text-orange-600">
              {(counts.reduce((a, b) => a + b, 0) / sortedTags.length).toFixed(1)}
            </div>
            <div className="text-gray-600">平均文章数</div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link 
          href={`/${lang}/blog`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          ← 返回博客列表
        </Link>
      </div>
    </div>
  );
}