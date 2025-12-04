"use client"

import { use, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import PostForm from "../../components/post-form/post-form"
import { BlogPost } from "@/lib/types" // optional if you have types

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error("Error fetching post:", error)
      } else {
        setPost(data)
      }
      setLoading(false)
    }

    fetchPost()
  }, [id])

  if (loading) {
    return (
      <div className="pt-32 text-center text-gray-500 dark:text-gray-300">
        Loading post...
      </div>
    )
  }

  if (!post) {
    return <div className="pt-32 text-center text-red-500">Post not found.</div>
  }

  return <PostForm initialData={post} />
}
