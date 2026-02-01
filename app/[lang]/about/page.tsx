import Link from 'next/link';

interface AboutPageProps {
  params: {
    lang: string;
  };
}

export default function AboutPage({ params }: AboutPageProps) {
  const { lang } = params;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-block p-4 bg-gradient-to-r from-yellow-100 to-green-100 rounded-full mb-6">
          <div className="text-6xl">🍋</div>
        </div>
        <h1 className="text-4xl font-bold mb-4">关于柠檬技术博客</h1>
        <p className="text-xl text-gray-600">
          一个融合前端开发与人工智能的多语言技术平台
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">🌟 项目愿景</h2>
            <p className="text-gray-700 mb-4">
              我们相信技术知识应该无障碍地传播。柠檬技术博客旨在通过多语言支持和AI增强功能，让全球开发者都能轻松获取前沿技术内容。
            </p>
            <p className="text-gray-700">
              无论是初学者还是资深工程师，都能在这里找到有价值的内容，并通过互动学习提升技能。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">🚀 核心功能</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="mr-3 mt-1">🌐</span>
                <div>
                  <h3 className="font-medium">多语言内容</h3>
                  <p className="text-gray-600">
                    支持5种语言，AI实时翻译，打破语言壁垒
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">🤖</span>
                <div>
                  <h3 className="font-medium">AI互动学习</h3>
                  <p className="text-gray-600">
                    通过挑战解锁内容，智能问答，个性化推荐
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">🔓</span>
                <div>
                  <h3 className="font-medium">渐进式解锁</h3>
                  <p className="text-gray-600">
                    基础内容免费，高级内容通过AI挑战解锁
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">🏷️</span>
                <div>
                  <h3 className="font-medium">智能标签系统</h3>
                  <p className="text-gray-600">
                    自动分类，精准搜索，关联推荐
                  </p>
                </div>
              </li>
            </ul>
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="p-6 bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-4">📊 技术栈</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span>Next.js 14 (App Router)</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>TypeScript</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <span>Tailwind CSS</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                <span>LangChain.js</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                <span>NextAuth.js</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                <span>Prisma + SQLite</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-b from-green-50 to-white rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-4">📈 项目状态</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>开发进度</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>多语言覆盖</span>
                  <span>5种语言</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mb-12 p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">👥 加入社区</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a 
            href="https://github.com/your-username/lemon-blog"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white rounded-xl text-center hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-3">💻</div>
            <h3 className="font-bold mb-2">GitHub</h3>
            <p className="text-gray-600 text-sm">贡献代码，提交问题</p>
          </a>
          <a 
            href="#"
            className="p-6 bg-white rounded-xl text-center hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-3">💬</div>
            <h3 className="font-bold mb-2">Discord</h3>
            <p className="text-gray-600 text-sm">技术讨论，实时交流</p>
          </a>
          <a 
            href="#"
            className="p-6 bg-white rounded-xl text-center hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-3">🐦</div>
            <h3 className="font-bold mb-2">Twitter</h3>
            <p className="text-gray-600 text-sm">最新动态，技术分享</p>
          </a>
        </div>
      </section>

      <div className="text-center border-t pt-8">
        <p className="text-gray-600 mb-4">
          柠檬技术博客是一个开源项目，欢迎任何形式的贡献。
        </p>
        <Link 
          href={`/${lang}/blog`}
          className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
        >
          开始探索博客内容
          <span className="ml-2">→</span>
        </Link>
      </div>
    </div>
  );
}