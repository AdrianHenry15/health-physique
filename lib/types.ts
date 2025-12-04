/**
 * TABLE TYPE HELPERS
 * These give you strong, clear types for each table.
 */

import { Database } from "./supabase/database.types"

export type Tables = Database["public"]["Tables"]

export type BlogPost = Tables["blog_posts"]["Row"]
export type BlogPostInsert = Tables["blog_posts"]["Insert"]
export type BlogPostUpdate = Tables["blog_posts"]["Update"]

export type Author = Tables["authors"]["Row"]
export type AuthorInsert = Tables["authors"]["Insert"]
export type AuthorUpdate = Tables["authors"]["Update"]

/**
 * RELATIONSHIP MODELS
 * These represent joined objects, like posts with authors & categories.
 */

export type BlogPostWithAuthor = BlogPost & {
  author: Author | null
}

export type BlogPostFull = BlogPost & {
  author: Author | null
}

/**
 * IMAGE TYPE
 * So that posts always have proper image structure.
 */

export type BlogImage = {
  url: string
  alt?: string | null
}

/**
 * CLIENT-SAFE POST (Sanitized for UI)
 * Useful for UI rendering without exposing everything from the DB.
 */

export type BlogPostCard = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  cover_image: string | null
  created_at: string | null
  author_name: string | null
}

/**
 * Utility: Convert DB row → UI card
 */
export function toPostCard(
  post: BlogPost & { author?: Author | null }
): BlogPostCard {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? null,
    cover_image: post.cover_image ?? null,
    created_at: post.created_at ?? null,
    author_name: post.author?.name ?? null,
  }
}
