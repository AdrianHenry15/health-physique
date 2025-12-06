import Link from "next/link"
import BlogCard from "../blog/components/blog-card"
import { BlogPost } from "@/lib/types"

export default function BlogPreview({ posts }: { posts: BlogPost[] }) {
  const noPosts = !posts || posts.length === 0
  const isLoading = posts === null
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

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Loading articles...
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
            <BlogCard
              id={post.id!}
              title={post.title!}
              key={post.slug}
              description={post.excerpt!}
              created_at={post.created_at!}
              slug={post.slug!}
              image={post.cover_image!}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
