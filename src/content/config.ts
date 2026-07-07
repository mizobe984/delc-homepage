// Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content'

// Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.date(),
      // url は astro:assets の image() ヘルパーで解決する(src/assets/ 内の相対パス)
      image: z
        .object({
          url: image(),
          alt: z.string(),
        })
        .optional(),
      pageTitleRuby: z.string().optional(), // rubyフィールドを追加
      destinationURLs: z
        .array(
          z.object({
            // breadcrumbフィールドを追加
            url: z.string(),
            ruby: z.string(),
          }),
        )
        .optional(),
    }),
})

// Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
}
