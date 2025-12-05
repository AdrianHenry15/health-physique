"use server"

import { createClient } from "@/lib/supabase/server"

/* -----------------------------------------
 * GET ALL POSTS
 * ----------------------------------------*/
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

/* -----------------------------------------
 * GET ONE POST BY SLUG
 * ----------------------------------------*/
export async function getPostById(slug: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) return null
  return data
}

// CREATE POST
export async function createPost(payload: {
  title: string
  slug: string
  body: string
  excerpt: string
  cover_image: string
  author_id: string
}) {
  const supabase = await createClient()

  const { error } = await supabase.from("blog_posts").insert(payload)

  if (error) return { error }

  return { error: null }
}

// UPDATE POST
export async function updatePost(
  id: string,
  payload: Partial<{
    title: string
    slug: string
    body: string
    excerpt: string
    cover_image: string
    author_id: string
  }>
) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("blog_posts")
    .update(payload)
    .eq("id", id)

  if (error) return { error }

  return { error: null }
}

/* -----------------------------------------
 * DELETE POST
 * ----------------------------------------*/
export async function deletePost(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("blog_posts").delete().eq("id", id)

  if (error) {
    console.error("Delete post error:", error)
    return { error: error.message }
  }

  return { success: true }
}
