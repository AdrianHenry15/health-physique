import BlogCard from "./components/blog-card"
import DemoBlogPosts from "@/lib/demo-blog-data.json"

export default function BlogPage() {
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

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {DemoBlogPosts.map((post) => (
          <BlogCard
            title={post.title}
            key={post.slug}
            description={post.description}
            date={post.date}
            slug={post.slug}
            image={post.image}
          />
        ))}
      </div>
    </div>
  )
}
