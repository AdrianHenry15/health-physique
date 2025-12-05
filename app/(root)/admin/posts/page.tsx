"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { BlogPost } from "@/lib/types"

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null)
  const noPosts = posts && posts.length === 0
  const isLoading = posts === null

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false })
      setPosts(data || [])
    }
    load()
  }, [])

  return (
    <div className="pt-28 max-w-5xl mx-auto px-6">
      <div className="flex justify-between mb-10">
        <h1 className="text-4xl font-bold">Manage Posts</h1>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          + New Post
        </Link>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Loading articles...
          </p>
        </div>
      )}

      {/* No Posts Fallback */}
      {noPosts && (
        <div className="flex flex-col items-center justify-center py-28 text-center">
          <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
            No articles yet
          </p>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            Our team is preparing high-quality fitness, nutrition, and wellness
            posts.
            <br />
            <span className="font-medium text-blue-600 dark:text-blue-400">
              New articles will be published soon!
            </span>
          </p>
        </div>
      )}

      {!isLoading && !noPosts && (
        <div className="space-y-4">
          {posts!.map((post: BlogPost) => (
            <div
              key={post.id}
              className="p-4 border rounded-lg flex justify-between items-center bg-white dark:bg-neutral-900">
              <div>
                <p className="font-semibold">{post.title}</p>
                <p className="text-sm text-gray-500">
                  {new Date(post.created_at!).toLocaleDateString()}
                </p>
              </div>

              <Link
                href={`/admin/posts/${post.slug}`}
                className="text-blue-600 hover:underline">
                Edit →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
