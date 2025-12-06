/**
 * TABLE TYPE HELPERS
 * These give you strong, clear types for each table.
 */

import { Database } from "./supabase/database.types"

export type Tables = Database["public"]["Tables"]

export type BlogPost = Tables["blog_posts"]["Row"]
export type BlogPostInsert = Tables["blog_posts"]["Insert"]
export type BlogPostUpdate = Tables["blog_posts"]["Update"]

// 👇 Motivational quotes
export type MotivationalQuote = Tables["motivational_quotes"]["Row"]
export type MotivationalQuoteInsert = Tables["motivational_quotes"]["Insert"]
export type MotivationalQuoteUpdate = Tables["motivational_quotes"]["Update"]

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
}

/**
 * Utility: Convert DB row → UI card
 */
export function toPostCard(post: BlogPost): BlogPostCard {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? null,
    cover_image: post.cover_image ?? null,
    created_at: post.created_at ?? null,
  }
}
