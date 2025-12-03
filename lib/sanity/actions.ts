"use server"

import { getAllPosts } from "@/sanity/lib/blog/posts/getAllPosts"

export async function fetchAllPosts() {
  try {
    const posts = await getAllPosts()
    return posts
  } catch (e) {
    console.error("Sanity fetch error:", e)
    return []
  }
}
