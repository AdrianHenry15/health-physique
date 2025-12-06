import PostForm from "../components/post-form"
import { BlogPost } from "@/lib/types"
import { getPostBySlug } from "@/lib/supabase/blog"

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post: BlogPost | null = await getPostBySlug(slug)
  const loading = post === null

  if (loading)
    return (
      <div className="pt-32 text-center text-gray-500 dark:text-gray-300">
        Loading post...
      </div>
    )

  if (!post)
    return <div className="pt-32 text-center text-red-500">Post not found.</div>

  return <PostForm initialData={post} isEditing />
}
