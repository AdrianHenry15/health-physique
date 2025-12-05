/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Author, BlogPost } from "@/lib/types"
import AuthorSelect from "./author-select"
import BlogBodyEditor from "./blog-body-editor"
import ImageUploader from "./image-uploader"
import toast from "react-hot-toast"
import { useAuthStore } from "@/stores/auth-store"
import { useModalStore } from "@/stores/modal-store"

export default function PostForm({
  initialData,
  isEditing = false,
}: {
  initialData?: BlogPost
  isEditing?: boolean
}) {
  const router = useRouter()
  const { user, loading: authLoading } = useAuthStore()
  const { openModal, closeModal } = useModalStore()

  const [title, setTitle] = useState(initialData?.title || "")
  const [body, setBody] = useState(initialData?.body || "")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [authors, setAuthors] = useState<Partial<Author>[]>([])
  const [authorId, setAuthorId] = useState(initialData?.author_id || "")

  const existingImage = initialData?.cover_image || ""

  const slug =
    title
      ?.toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") || ""

  const excerpt = body?.replace(/\s+/g, " ").trim().slice(0, 160) || ""

  // Load authors
  useEffect(() => {
    async function loadAuthors() {
      const { data } = await supabase.from("authors").select("id, name")
      if (data) setAuthors(data)
    }
    loadAuthors()
  }, [])

  const handleSubmit = async () => {
    if (authLoading) {
      toast.error("Checking authentication, please wait.")
      return
    }

    if (!user) {
      toast.error("You must be signed in to save a post.")
      return
    }

    if (!authorId) {
      toast.error("Please select an author.")
      return
    }

    if (!existingImage && !selectedFile) {
      toast.error("A cover image is required.")
      return
    }

    setSaving(true)
    const loadingToast = toast.loading(
      isEditing ? "Updating post..." : "Saving post..."
    )

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("slug", slug)
      formData.append("excerpt", excerpt)
      formData.append("body", body)
      formData.append("author_id", authorId)
      formData.append("user_id", user.id)

      if (selectedFile) {
        formData.append("cover_image", selectedFile)
      }

      if (isEditing && initialData) {
        formData.append("existing_image", existingImage)

        const res = await fetch(`/api/admin/posts/${initialData.id}`, {
          method: "PATCH",
          body: formData,
        })

        if (!res.ok) {
          const data = await res.json().catch(() => null)
          throw new Error(data?.error || "Failed to update post.")
        }
      } else {
        const res = await fetch("/api/admin/posts", {
          method: "POST",
          body: formData,
        })

        if (!res.ok) {
          const data = await res.json().catch(() => null)
          throw new Error(data?.error || "Failed to create post.")
        }
      }

      toast.success(isEditing ? "Post updated!" : "Post created!", {
        id: loadingToast,
      })
      router.push("/admin/posts")
    } catch (err: any) {
      console.error("❌ Save error:", err)
      toast.error(err.message || "Failed to save post.", { id: loadingToast })
    } finally {
      setSaving(false)
    }
  }

  // 🔴 Delete flow
  const handleDeleteClick = () => {
    if (!initialData?.id) return

    openModal("confirm", {
      title: "Delete this post?",
      message:
        "This action cannot be undone. This will permanently delete the post and its cover image.",
      confirmLabel: "Delete",
      cancelLabel: "Cancel",
      isDanger: true,
      // We'll let the modal call this when user confirms
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/admin/posts/${initialData.id}`, {
            method: "DELETE",
          })

          const data = await res.json().catch(() => null)

          if (!res.ok) {
            throw new Error(data?.error || "Failed to delete post.")
          }

          toast.success("Post deleted.")
          closeModal()
          router.push("/admin/posts")
        } catch (err: any) {
          console.error("❌ Delete error:", err)
          toast.error(err.message || "Failed to delete post.")
        }
      },
    })
  }

  if (!authLoading && !user) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          {isEditing ? "Edit Blog Post" : "Create Blog Post"}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300">
          You must be signed in to manage blog posts.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-24 px-4 sm:px-6 space-y-10">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
        {isEditing ? "Edit Blog Post" : "Create Blog Post"}
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

      {/* Author */}
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
        disabled={saving || authLoading}
        className="w-full cursor-pointer sm:w-auto px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 transition">
        {saving
          ? isEditing
            ? "Updating..."
            : "Saving..."
          : isEditing
          ? "Update Post"
          : "Create Post"}
      </button>
      {isEditing && initialData && (
        <button
          type="button"
          onClick={handleDeleteClick}
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-red-500 text-red-600 font-semibold hover:bg-red-50 dark:hover:bg-red-950/30 transition cursor-pointer">
          Delete Post
        </button>
      )}
    </div>
  )
}
