import { getPostBySlug } from "@/lib/supabase/blog"
import type { BlogPost } from "@/lib/types"
import BlogPostClient from "./components/blog-post-client"

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post: BlogPost | null = await getPostBySlug(slug)

  return <BlogPostClient post={post} />
}
