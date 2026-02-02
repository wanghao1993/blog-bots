import Fuse from 'fuse.js'
import { Post } from './posts'

const fuseOptions = {
  keys: ['title', 'excerpt', 'content', 'tags'],
  threshold: 0.3,
  includeScore: true,
}

export function searchPosts(posts: Post[], query: string) {
  if (!query.trim()) {
    return posts
  }

  const fuse = new Fuse(posts, fuseOptions)
  const results = fuse.search(query)
  return results.map((result) => result.item)
}
