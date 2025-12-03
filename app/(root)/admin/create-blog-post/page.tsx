/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import Image from "next/image"
import { v4 as uuid } from "uuid"
import { sanityClient } from "@/sanity/lib/client"

export default function AdminCreatePost() {
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  /** -------------------------------
   * 💠 Drag & Drop Image Handler
   -------------------------------- */
  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (!file) return

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  /** -------------------------------
   * 💠 Upload Image → Sanity Asset
   -------------------------------- */
  const uploadImageToSanity = async (file: File) => {
    const asset = await sanityClient.assets.upload("image", file, {
      filename: file.name,
    })

    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    }
  }

  /** -------------------------------
   * 💠 Create Blog Post in Sanity
   -------------------------------- */
  const handleCreatePost = async () => {
    if (!title.trim()) {
      setMessage("Title is required")
      return
    }

    try {
      setLoading(true)
      setMessage(null)

      let imageRef = null

      if (imageFile) {
        imageRef = await uploadImageToSanity(imageFile)
      }

      const postId = `blog-${uuid()}`

      await sanityClient.create({
        _id: postId,
        _type: "blog",
        title,
        slug: {
          _type: "slug",
          current: title.toLowerCase().replace(/\s+/g, "-"),
        },
        excerpt,
        content: [
          {
            _key: uuid(),
            _type: "block",
            style: "normal",
            children: [
              {
                _key: uuid(),
                _type: "span",
                text: content,
              },
            ],
          },
        ],
        image: imageRef,
        publishedAt: new Date().toISOString(),
      })

      setMessage("Post published successfully 🎉")
      setTitle("")
      setExcerpt("")
      setContent("")
      setImageFile(null)
      setImagePreview(null)
    } catch (err: any) {
      console.error(err)
      setMessage("Error creating post: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto pt-32 pb-20 px-6 space-y-8">
      <h1 className="text-4xl font-bold">Create Blog Post</h1>

      {message && (
        <div className="p-3 rounded border bg-blue-50 dark:bg-blue-900/40 border-blue-300 text-blue-700 dark:text-blue-300">
          {message}
        </div>
      )}

      {/* Title */}
      <input
        className="w-full p-3 rounded-xl border bg-white dark:bg-neutral-900"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Excerpt */}
      <textarea
        className="w-full p-3 rounded-xl border bg-white dark:bg-neutral-900"
        placeholder="Short excerpt"
        value={excerpt}
        rows={3}
        onChange={(e) => setExcerpt(e.target.value)}
      />

      {/* Main Content */}
      <textarea
        className="w-full p-3 rounded-xl border bg-white dark:bg-neutral-900"
        placeholder="Main content..."
        value={content}
        rows={8}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* Drag & Drop Image */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleImageDrop}
        className="border-2 border-dashed border-gray-400 dark:border-gray-600 p-8 rounded-xl text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 transition">
        {imagePreview ? (
          <div className="w-full flex justify-center">
            <Image
              src={imagePreview}
              alt="Preview"
              width={400}
              height={300}
              className="rounded-xl object-cover"
            />
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-300">
            Drag & drop an image here
          </p>
        )}
      </div>

      {/* Publish Button */}
      <button
        onClick={handleCreatePost}
        disabled={loading}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition">
        {loading ? "Publishing..." : "Publish Blog Post"}
      </button>
    </div>
  )
}
