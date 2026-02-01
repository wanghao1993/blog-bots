import { getAllPosts, getAllTags } from '@/lib/posts';
import TagCloud from '@/components/TagCloud';
import BlogPostCard from '@/components/BlogPostCard';
import { useTranslation } from '@/lib/i18n/client';

interface BlogPageProps {
  params: {
    lang: string;
  };
  searchParams?: {
    tag?: string;
  };
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { lang } = params;
  const tagFilter = searchParams?.tag;
  
  // 获取所有文章
  let posts = getAllPosts(lang);
  
  // 如果有关标签筛选，过滤文章
  if (tagFilter) {
    posts = posts.filter(post => post.tags.includes(tagFilter));
  }
  
  // 获取所有标签
  const tags = getAllTags(lang);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">技术博客</h1>
          <p className="text-gray-600">
            探索前端开发、AI技术和现代Web开发的最新内容
          </p>
        </div>
        
        {tagFilter && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <span className="mr-2">🏷️</span>
              <span>正在筛选标签：</span>
              <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                {tagFilter}
              </span>
              <a 
                href={`/${lang}/blog`}
                className="ml-4 text-blue-600 hover:underline"
              >
                清除筛选
              </a>
            </div>
          </div>
        )}
        
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} lang={lang} />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-medium mb-2">暂无文章</h3>
              <p className="text-gray-500">稍后再来查看，或尝试其他标签</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="lg:col-span-1">
        <div className="sticky top-8">
          <TagCloud tags={tags} />
          
          <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-4">🎯 AI功能</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="mr-2">🤖</span>
                <span>智能内容翻译</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">🔓</span>
                <span>AI挑战解锁</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">🏷️</span>
                <span>自动标签推荐</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-4">📈 博客统计</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-2xl font-bold">{posts.length}</div>
                <div className="text-sm text-gray-500">文章数</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-2xl font-bold">{Object.keys(tags).length}</div>
                <div className="text-sm text-gray-500">标签数</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}