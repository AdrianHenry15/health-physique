"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Author } from "@/lib/types"
import { User } from "@supabase/supabase-js"
import ImageUploader from "../../components/post-form/image-uploader"

export default function NewAuthorPage({
  initialData,
}: {
  initialData?: Author & User
}) {
  const router = useRouter()

  const [name, setName] = useState(initialData?.name || "")
  const [bio, setBio] = useState(initialData?.bio || "")
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)

  const existingAvatar = initialData?.avatar_url || ""

  const handleSubmit = async () => {
    setSaving(true)

    // 1️⃣ Get logged-in user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert("You must be logged in to create an author.")
      setSaving(false)
      return
    }

    // 2️⃣ Upload avatar if selected
    let avatarUrl = existingAvatar

    if (avatarFile) {
      const fileName = `${Date.now()}-${avatarFile.name}`

      const { error: uploadErr } = await supabase.storage
        .from("user-avatars")
        .upload(fileName, avatarFile)

      if (!uploadErr) {
        const { data } = supabase.storage
          .from("user-avatars")
          .getPublicUrl(fileName)

        avatarUrl = data.publicUrl
      }
    }

    // 3️⃣ Build payload with author → user relationship
    const payload = {
      name,
      bio,
      avatar_url: avatarUrl,
      user_id: user.id, // <-- IMPORTANT!
    }

    let error

    if (initialData) {
      // UPDATE — keep existing user_id
      const { error: updateError } = await supabase
        .from("authors")
        .update({
          name,
          bio,
          avatar_url: avatarUrl,
        })
        .eq("id", initialData.id)

      error = updateError
    } else {
      // CREATE
      const { error: insertError } = await supabase
        .from("authors")
        .insert(payload)

      error = insertError
    }

    if (error) {
      console.error("Author DB error:", error)
      alert("Failed to save author.")
      setSaving(false)
      return
    }

    router.push("/admin/authors")
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 pt-24 space-y-10">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          {initialData ? "Edit Author" : "Create Author"}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          Manage author details used across the blog.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="font-semibold text-sm sm:text-base">Name</label>
          <input
            className="w-full px-3 py-2 sm:py-3 rounded-lg border bg-white dark:bg-neutral-900 text-sm sm:text-base"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Author name"
          />
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <label className="font-semibold text-sm sm:text-base">Bio</label>
          <textarea
            className="w-full px-3 py-2 sm:py-3 rounded-lg border bg-white dark:bg-neutral-900 h-28 sm:h-32 text-sm sm:text-base"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Short biography..."
          />
        </div>

        {/* Avatar */}
        <div className="space-y-2">
          <label className="font-semibold text-sm sm:text-base">Avatar</label>
          <ImageUploader value={existingAvatar} onFileSelect={setAvatarFile} />
        </div>
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button
          disabled={saving}
          onClick={handleSubmit}
          className="w-full cursor-pointer sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition text-center">
          {saving ? "Saving..." : "Save Author"}
        </button>
      </div>
    </div>
  )
}
