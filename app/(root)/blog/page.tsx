"use client"

import { useEffect, useState } from "react"
import BlogCard from "./components/blog-card"
import { fetchAllPosts } from "@/lib/sanity/actions"
import { Post } from "@/sanity.types"
import { imageUrl } from "@/sanity/lib/image-url"
import { getExcerpt } from "@/lib/sanity/utils"

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const load = async () => {
      const data = await fetchAllPosts()
      setPosts(data)
    }
    load()
  }, [])

  const noPosts = posts && posts.length === 0
  const isLoading = posts === null

  return (
    <div className="pt-32 max-w-6xl mx-auto px-6 pb-24">
      {/* Header / Hero */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl md:text-6xl font-extrabold">
          Health Physique Blog
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Science-backed training, nutrition insights, and wellness strategies
          to help you become the strongest version of yourself.
        </p>
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

      {/* Blog Grid */}
      {!isLoading && noPosts && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <BlogCard
              title={post.title!}
              key={post.slug?.source}
              description={getExcerpt(post.body) + "..."}
              date={post.publishedAt!}
              slug={post.slug!.source!}
              image={imageUrl(post.mainImage!).width(400).height(250).url()!}
            />
          ))}
        </div>
      )}
    </div>
  )
}
