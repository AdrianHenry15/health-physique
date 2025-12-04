"use server"

import { createClient } from "@/lib/supabase/server"
import { BlogPost } from "../types"

export async function getAllPosts() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching posts:", error)
    return []
  }

  return data
}

export async function getPostBySlug(slug: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) return null
  return data
}

export async function createPost({
  title,
  slug,
  body,
  excerpt,
  cover_image,
  author_id,
}: BlogPost) {
  const supabase = await createClient()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error } = await supabase.from("blog_posts").insert([
    {
      title,
      slug,
      body,
      excerpt,
      cover_image,
      author_id,
    },
  ])

  if (error) {
    console.error("Create post error:", error)
    return { error: error.message }
  }

  return { success: true }
}
