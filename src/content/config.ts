// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }).optional(),
      pageTitleRuby: z.string().optional(), // rubyフィールドを追加
      destinationURLs: z.array(z.object({  // breadcrumbフィールドを追加
        url: z.string(),
        ruby: z.string(),
      })).optional(),
    }),
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
};