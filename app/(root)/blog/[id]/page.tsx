"use client"

import { use, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { BlogPost, Author } from "@/lib/types"
import Image from "next/image"
import { getPostById } from "@/lib/supabase/blog"

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  const [post, setPost] = useState<BlogPost | null>(null)
  const [author, setAuthor] = useState<Author | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      // Load blog post
      const postData = await getPostById(id)

      if (!postData) {
        console.error("Post not found")
        setLoading(false)
        return
      }

      setPost(postData)

      // Load author
      const { data: authorData } = await supabase
        .from("authors")
        .select("*")
        .eq("id", postData.author_id!)
        .single()

      setAuthor(authorData || null)
      setLoading(false)
    }

    load()
  }, [id])

  if (loading) {
    return (
      <div className="pt-32 text-center text-gray-500 text-lg">
        Loading post...
      </div>
    )
  }

  if (!post) {
    return (
      <div className="pt-32 text-center text-red-500 text-lg">
        Post not found.
      </div>
    )
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-24 space-y-10">
      {/* Cover Image */}
      {post.cover_image && (
        <Image
          src={post.cover_image}
          alt={post.title}
          className="w-full rounded-xl shadow-md"
          width={800}
          height={400}
        />
      )}

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-bold">{post.title}</h1>

      {/* Author + Date */}
      <div className="text-gray-500 text-sm sm:text-base">
        {author && (
          <p>
            By{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {author.name}
            </span>
          </p>
        )}
        {post.created_at && (
          <p>{new Date(post.created_at).toLocaleDateString()}</p>
        )}
      </div>

      {/* Body */}
      <div
        className="prose dark:prose-invert max-w-none text-lg"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </article>
  )
}
