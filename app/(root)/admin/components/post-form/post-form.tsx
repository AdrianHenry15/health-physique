"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Author, BlogPost } from "@/lib/types"
import AuthorSelect from "./author-select"
import BlogBodyEditor from "./blog-body-editor"
import ImageUploader from "./image-uploader"
import toast from "react-hot-toast"

export default function PostForm({ initialData }: { initialData?: BlogPost }) {
  const router = useRouter()

  const [title, setTitle] = useState(initialData?.title || "")
  const [body, setBody] = useState(initialData?.body || "")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [authors, setAuthors] = useState<Partial<Author>[]>([])
  const [authorId, setAuthorId] = useState(initialData?.author_id || "")

  // existing image (only for editing)
  const existingImage = initialData?.cover_image || ""

  const slug =
    title
      ?.toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") || ""

  const excerpt = body?.replace(/\s+/g, " ").trim().slice(0, 160) || ""

  // 🔵 Load authors on mount
  useEffect(() => {
    async function loadAuthors() {
      const { data } = await supabase.from("authors").select("id, name")
      if (data) setAuthors(data)
    }
    loadAuthors()
  }, [])

  const handleSubmit = async () => {
    if (!authorId) {
      toast.error("Please select an author.")
      return
    }
    setSaving(true)
    const loadingToast = toast.loading("Saving post...")

    if (!authorId) {
      toast.error("Please select an author.", { id: loadingToast })
      setSaving(false)
      return
    }

    let coverImageUrl = existingImage

    // ----------------------------------------------------------
    // 1️⃣ UPLOAD IMAGE FIRST — REQUIRED FOR cover_image NOT NULL
    // ----------------------------------------------------------
    if (!existingImage && !selectedFile) {
      toast.error("A cover image is required.", { id: loadingToast })
      setSaving(false)
      return
    }

    if (selectedFile) {
      const fileName = `${Date.now()}-${selectedFile.name}`

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(fileName, selectedFile)

      if (uploadError) {
        console.error("Upload failed:", uploadError)
        toast.error("Image upload failed.", { id: loadingToast })
        setSaving(false)
        return
      }

      const { data } = supabase.storage
        .from("blog-images")
        .getPublicUrl(fileName)

      coverImageUrl = data.publicUrl
    }

    // ----------------------------------------------------------
    // 2️⃣ ONLY AFTER IMAGE IS READY → CREATE OR UPDATE POST
    // ----------------------------------------------------------
    const payload = {
      title,
      slug,
      excerpt,
      body,
      cover_image: coverImageUrl,
      author_id: authorId,
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let error: any

    if (initialData) {
      // UPDATE
      const { error: updateError } = await supabase
        .from("blog_posts")
        .update(payload)
        .eq("id", initialData.id)
      error = updateError
    } else {
      // INSERT
      const { error: insertError } = await supabase
        .from("blog_posts")
        .insert(payload)
      error = insertError
    }

    if (error) {
      console.error("DB error:", error)
      toast.error("Failed to save post.", { id: loadingToast })
      setSaving(false)
      return
    }

    toast.success("Post saved successfully.", { id: loadingToast })
    router.push("/admin/posts")
  }

  return (
    <div className="max-w-4xl mx-auto py-24 px-4 sm:px-6 space-y-10">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
        {initialData ? "Edit Blog Post" : "Create Blog Post"}
      </h1>

      {/* Title */}
      <div className="space-y-2">
        <label className="font-semibold text-base sm:text-lg">Title</label>
        <input
          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border bg-white dark:bg-neutral-900"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Author Select */}
      <AuthorSelect
        authorId={authorId}
        setAuthorId={setAuthorId}
        authors={authors}
      />

      {/* Body */}
      <BlogBodyEditor value={body} onChange={setBody} />

      {/* Cover Image */}
      <div className="space-y-2">
        <label className="font-semibold text-base sm:text-lg">
          Cover Image
        </label>
        <ImageUploader value={existingImage} onFileSelect={setSelectedFile} />
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={saving}
        className="w-full cursor-pointer sm:w-auto px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50">
        {saving ? "Saving..." : "Save Post"}
      </button>
    </div>
  )
}
