"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { BlogPost } from "@/lib/types"
import { useAuthStore } from "@/stores/auth-store"
import { ArrowLeft, Pencil, Trash } from "lucide-react"
import { useDeletePost } from "@/hooks/use-delete-post"

export default function BlogPostClient({ post }: { post: BlogPost | null }) {
  const router = useRouter()
  const { isAdmin } = useAuthStore()
  const { deletePost } = useDeletePost()

  if (!post) {
    return (
      <div className="pt-32 text-center text-red-500 text-lg">
        Post not found.
      </div>
    )
  }

  const handleDelete = () => {
    deletePost(post.id, { redirectTo: "/blog" })
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-24 space-y-10 animate-fadeIn">
      {/* Top Controls */}
      <div className="flex items-center justify-between">
        {/* Back Button */}
        <button
          onClick={() => router.push("/blog")}
          className="flex items-center gap-2 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition">
          <ArrowLeft size={18} />
          Back to Blog
        </button>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="flex items-center gap-3">
            {/* Edit */}
            <button
              onClick={() => router.push(`/admin/posts/${post.slug}`)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              <Pencil size={16} />
              Edit
            </button>

            {/* Delete */}
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
              <Trash size={16} />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Cover Image */}
      {post.cover_image && (
        <div className="rounded-xl overflow-hidden shadow-lg">
          <Image
            src={post.cover_image}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full object-cover"
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
        {post.title}
      </h1>

      {/* Date */}
      {post.created_at && (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {new Date(post.created_at).toLocaleDateString()}
        </p>
      )}

      {/* Body */}
      <div
        className="prose dark:prose-invert max-w-none text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </article>
  )
}
