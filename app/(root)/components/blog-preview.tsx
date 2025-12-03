"use client"

import Image, { StaticImageData } from "next/image"
import Link from "next/link"

type BlogItem = {
  title: string
  description: string
  image: StaticImageData | string
  slug: string
  date: string
}

export default function BlogPreview({ posts }: { posts: BlogItem[] }) {
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
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
              {/* Gradient Hover Layer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 transition-opacity pointer-events-none" />

              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
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
                  {post.description}
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {post.date}
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
