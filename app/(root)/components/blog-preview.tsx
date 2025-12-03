"use client"

import { getExcerpt } from "@/lib/sanity/utils"
import { Post } from "@/sanity.types"
import { imageUrl } from "@/sanity/lib/image-url"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"

export default function BlogPreview({ posts }: { posts: Post[] }) {
  const noPosts = !posts || posts.length === 0
  if (noPosts) {
    return (
      <div className="flex flex-col items-center justify-center py-28 text-center">
        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
          No articles yet
        </p>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          Our team is working hard on publishing high-quality fitness and
          nutrition content.
          <br />
          <span className="font-medium text-blue-600 dark:text-blue-400">
            New posts will be available soon!
          </span>
        </p>
      </div>
    )
  }
  return (
    <section className="py-20 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Latest Articles
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Insightful fitness, nutrition, and wellness content.
            </p>
          </div>

          <Link
            href="/blog"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            View all →
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <Link
              key={post.slug?.source}
              href={`/blog/${post.slug?.source}`}
              className="group rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
              {/* Gradient Hover Layer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 transition-opacity pointer-events-none" />

              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={
                    imageUrl(post.mainImage!).width(600).height(400).url() as
                      | string
                      | StaticImageData
                  }
                  alt={post.title!}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {getExcerpt(post.body)}...
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {post.publishedAt!}
                </p>

                <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:underline">
                  Read More →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
