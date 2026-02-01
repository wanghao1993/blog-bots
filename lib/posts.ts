import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  lang: string;
  content: string;
  locked?: boolean;
  translations?: string[]; // 可用的翻译语言代码
}

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPosts(lang: string = 'en'): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts: Post[] = [];

  for (const fileName of fileNames) {
    // 文件格式：slug.lang.md 或 slug.lang.mdx
    const match = fileName.match(/^(.+)\.([a-z]{2})\.(md|mdx)$/);
    if (!match) continue;
    
    const [, slug, fileLang, ext] = match;
    if (fileLang !== lang) continue;

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // 检查是否有翻译版本
    const translations = fileNames
      .filter(f => f.startsWith(`${slug}.`) && f.endsWith(`.${ext}`))
      .map(f => f.match(/\.([a-z]{2})\./)?.[1])
      .filter(Boolean) as string[];

    posts.push({
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || new Date().toISOString().split('T')[0],
      tags: Array.isArray(data.tags) ? data.tags : [],
      lang,
      content,
      locked: data.locked || false,
      translations,
    });
  }

  // 按日期倒序排序
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPost(slug: string, lang: string = 'en'): Post | null {
  const possibleExtensions = ['.md', '.mdx'];
  
  for (const ext of possibleExtensions) {
    const fileName = `${slug}.${lang}${ext}`;
    const fullPath = path.join(postsDirectory, fileName);
    
    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      // 获取可用的翻译
      const fileNames = fs.readdirSync(postsDirectory);
      const translations = fileNames
        .filter(f => f.startsWith(`${slug}.`) && f.endsWith(ext))
        .map(f => f.match(/\.([a-z]{2})\./)?.[1])
        .filter(Boolean) as string[];

      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date || new Date().toISOString().split('T')[0],
        tags: Array.isArray(data.tags) ? data.tags : [],
        lang,
        content,
        locked: data.locked || false,
        translations,
      };
    }
  }
  
  return null;
}

export function getAllTags(lang: string = 'en'): { [key: string]: number } {
  const posts = getAllPosts(lang);
  const tags: { [key: string]: number } = {};

  posts.forEach(post => {
    post.tags.forEach(tag => {
      tags[tag] = (tags[tag] || 0) + 1;
    });
  });

  return tags;
}

export function getPostsByTag(tag: string, lang: string = 'en'): Post[] {
  const posts = getAllPosts(lang);
  return posts.filter(post => post.tags.includes(tag));
}

export function getAllSlugs(): { slug: string; lang: string }[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const slugs: { slug: string; lang: string }[] = [];

  for (const fileName of fileNames) {
    const match = fileName.match(/^(.+)\.([a-z]{2})\.(md|mdx)$/);
    if (!match) continue;
    
    const [, slug, lang] = match;
    slugs.push({ slug, lang });
  }

  return slugs;
}