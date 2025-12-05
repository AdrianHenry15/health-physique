// app/api/admin/posts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

type RouteParams = {
  params: Promise<{ id: string }>
}

/* -------------------------
 * UPDATE POST (PATCH)
 * ------------------------*/
export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { id } = await params
  const supabase = await createClient()

  const formData = await req.formData()

  const title = formData.get("title") as string
  const slug = (formData.get("slug") as string) || ""
  const excerpt = (formData.get("excerpt") as string) || ""
  const body = formData.get("body") as string
  const author_id = formData.get("author_id") as string
  const existingImage = (formData.get("existing_image") as string) || ""
  const file = formData.get("cover_image") as File | null

  let newFileName: string | null = null
  let coverImageUrl = existingImage || null

  // 1) Upload new file if provided
  if (file && file.size > 0) {
    newFileName = `${Date.now()}-${file.name}`

    const { error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(newFileName, file)

    if (uploadError) {
      console.error("Image upload error:", uploadError)
      return NextResponse.json(
        { error: "Image upload failed." },
        { status: 500 }
      )
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("blog-images").getPublicUrl(newFileName)

    coverImageUrl = publicUrl
  }

  const payload = {
    title,
    slug,
    excerpt,
    body,
    author_id,
    cover_image: coverImageUrl,
  }

  // 2) Update DB
  const { error: dbError } = await supabase
    .from("blog_posts")
    .update(payload)
    .eq("id", id)

  if (dbError) {
    console.error("Update post DB error:", dbError)
    // rollback new image if uploaded
    if (newFileName) {
      await supabase.storage.from("blog-images").remove([newFileName])
    }
    return NextResponse.json({ error: dbError.message }, { status: 500 })
  }

  // 3) If new image and there was an old one, delete the old one
  if (newFileName && existingImage) {
    const oldFileName = existingImage.split("/").pop()
    if (oldFileName) {
      await supabase.storage.from("blog-images").remove([oldFileName])
    }
  }

  return NextResponse.json({ success: true }, { status: 200 })
}

/* -------------------------
 * DELETE POST
 * ------------------------*/
export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const { id } = await params
  const supabase = await createClient()

  // 1) Fetch post to get cover_image
  const { data: post, error: fetchError } = await supabase
    .from("blog_posts")
    .select("cover_image")
    .eq("id", id)
    .single()

  if (fetchError) {
    console.error("Fetch post before delete error:", fetchError)
    return NextResponse.json({ error: fetchError.message }, { status: 500 })
  }

  // 2) Delete post
  const { error } = await supabase.from("blog_posts").delete().eq("id", id)

  if (error) {
    console.error("Delete post error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // 3) Delete image
  if (post?.cover_image) {
    const fileName = post.cover_image.split("/").pop()
    if (fileName) {
      await supabase.storage.from("blog-images").remove([fileName])
    }
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
