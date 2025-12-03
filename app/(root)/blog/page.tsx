import BlogCard from "./components/blog-card"
import FitnessImg1 from "@/public/hp-fitness-2.jpg"
import FitnessImg2 from "@/public/hp-fitness-3.jpg"
import FitnessImg3 from "@/public/hp-fitness-4.jpg"

const demoPosts = [
  {
    title: "5 Essential Exercises for Building Strength",
    description:
      "A beginner-friendly breakdown of compound lifts to add to your workouts today.",
    date: "Jan 12, 2025",
    slug: "strength-essentials",
    image: FitnessImg1,
  },
  {
    title: "The Ultimate Guide to Nutrition for Fat Loss",
    description:
      "Understand calories, macros, and sustainable habits that actually work.",
    date: "Jan 5, 2025",
    slug: "fat-loss-nutrition",
    image: FitnessImg2,
  },
  {
    title: "How to Stay Motivated With Your Fitness Routine",
    description:
      "Consistency beats intensity — here’s how to create a routine you stick with.",
    date: "Dec 28, 2024",
    slug: "fitness-motivation",
    image: FitnessImg3,
  },
]

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
        {demoPosts.map((post) => (
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
