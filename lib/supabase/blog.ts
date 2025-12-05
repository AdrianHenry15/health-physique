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
