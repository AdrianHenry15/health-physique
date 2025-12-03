"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { IBlogPosts } from "@/lib/types"

export default function AdminPage() {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [posts, setPosts] = useState<IBlogPosts[]>([])

  // Auto-generate slug from title
  const generateSlug = (value: string) => {
    const newSlug = value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    setSlug(newSlug)
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !slug || !description || !imageFile) {
      return alert("Please fill out all fields, including an image.")
    }

    const newPost = {
      title,
      slug,
      description,
      date: date || new Date().toDateString(),
      image: URL.createObjectURL(imageFile), // temporary preview path
    }

    setPosts([...posts, newPost])

    // Reset form
    setTitle("")
    setSlug("")
    setDescription("")
    setDate("")
    setImageFile(null)
    setImagePreview(null)
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl flex flex-col font-bold mb-10 text-gray-900 dark:text-white">
        <span className="mb-2">Admin Panel</span>
        <span>Create Blog Post</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-xl">
        {/* TITLE */}
        <div className="space-y-2">
          <label className="font-semibold text-gray-900 dark:text-gray-200">
            Title
          </label>
          <input
            type="text"
            value={title}
            placeholder="Post title..."
            onChange={(e) => {
              setTitle(e.target.value)
              generateSlug(e.target.value)
            }}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          />
        </div>

        {/* SLUG */}
        <div className="space-y-2">
          <label className="font-semibold text-gray-900 dark:text-gray-200">
            Slug
          </label>
          <input
            type="text"
            value={slug}
            placeholder="auto-generated-from-title"
            onChange={(e) => setSlug(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <label className="font-semibold text-gray-900 dark:text-gray-200">
            Description
          </label>
          <textarea
            value={description}
            placeholder="Short summary of the post..."
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          />
        </div>

        {/* DATE */}
        <div className="space-y-2">
          <label className="font-semibold text-gray-900 dark:text-gray-200">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div className="space-y-2">
          <label className="font-semibold text-gray-900 dark:text-gray-200">
            Featured Image
          </label>

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 cursor-pointer text-center transition ${
              isDragActive
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-400 dark:border-gray-700 bg-gray-100 dark:bg-gray-800"
            }`}>
            <input {...getInputProps()} />

            {imagePreview ? (
              <div className="flex flex-col items-center gap-4">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={200}
                  height={200}
                  className="rounded-xl shadow-md object-cover"
                />
                <p className="text-sm opacity-80">{imageFile?.name}</p>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-300">
                {isDragActive
                  ? "Drop the image here..."
                  : "Drag & drop an image, or click to upload"}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg">
          Create Post
        </button>
      </form>

      {/* PREVIEW */}
      {posts.length > 0 && (
        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Created Posts
          </h2>

          {posts.map((post, i) => (
            <div
              key={i}
              className="p-6 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {post.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {post.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Slug: /blog/{post.slug}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Date: {post.date}
              </p>

              <div className="mt-3">
                <Image
                  src={post.image}
                  alt="Preview image"
                  width={240}
                  height={160}
                  className="rounded-lg shadow-md object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
