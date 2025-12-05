"use client"

import { use, useEffect, useState } from "react"
import PostForm from "../../components/post-form/post-form"
import { BlogPost } from "@/lib/types"
import { getPostById } from "@/lib/supabase/blog"

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPost() {
      const postData = await getPostById(id)
      setPost(postData)
      setLoading(false)
    }

    loadPost()
  }, [id])

  if (loading)
    return (
      <div className="pt-32 text-center text-gray-500 dark:text-gray-300">
        Loading post...
      </div>
    )

  if (!post)
    return <div className="pt-32 text-center text-red-500">Post not found.</div>

  return <PostForm initialData={post} isEditing />
}
