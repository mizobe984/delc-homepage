import { getCollection, type CollectionEntry } from 'astro:content'

/** posts コレクションを公開日の降順(新しい順)で取得する */
export async function getSortedPosts(
  limit?: number,
): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts')
  const sorted = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  )
  return limit ? sorted.slice(0, limit) : sorted
}
