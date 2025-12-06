import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getAllPosts } from "@/lib/supabase/blog"

export async function GET() {
  const posts = await getAllPosts()
  return NextResponse.json({ posts }, { status: 200 })
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()

  const formData = await req.formData()

  const title = formData.get("title") as string
  const slug = (formData.get("slug") as string) || ""
  const excerpt = (formData.get("excerpt") as string) || ""
  const body = formData.get("body") as string
  const file = formData.get("cover_image") as File | null

  if (!title || !body) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    )
  }

  if (!file || file.size === 0) {
    return NextResponse.json(
      { error: "Cover image is required." },
      { status: 400 }
    )
  }

  // 1) upload image
  const fileName = `${Date.now()}-${file.name}`
  const { error: uploadError } = await supabase.storage
    .from("blog-images")
    .upload(fileName, file)

  if (uploadError) {
    console.error("Image upload error:", uploadError)
    return NextResponse.json({ error: "Image upload failed." }, { status: 500 })
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("blog-images").getPublicUrl(fileName)

  const payload = {
    title,
    slug,
    excerpt,
    body,
    cover_image: publicUrl,
  }

  // 2) insert post
  const { error: dbError } = await supabase.from("blog_posts").insert(payload)

  if (dbError) {
    console.error("Create post DB error:", dbError)
    await supabase.storage.from("blog-images").remove([fileName])
    return NextResponse.json({ error: dbError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
