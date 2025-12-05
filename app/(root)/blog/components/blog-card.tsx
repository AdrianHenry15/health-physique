"use client"

import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import { useAuthStore } from "@/stores/auth-store"
import { useModalStore } from "@/stores/modal-store"
import toast from "react-hot-toast"
import { deletePost } from "@/lib/supabase/blog"

type BlogCardProps = {
  id: string
  title: string
  description: string
  created_at: string
  slug: string
  image: string | StaticImageData
}

export default function BlogCard({
  id,
  title,
  description,
  created_at,
  slug,
  image,
}: BlogCardProps) {
  const { user } = useAuthStore()
  const { openModal } = useModalStore()

  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL_1

  const openDeleteModal = () => {
    openModal("confirm", {
      title: "Delete This Blog Post?",
      message:
        "This action cannot be undone. Do you want to permanently delete this post?",

      onConfirm: async () => {
        const { error } = await deletePost(id)

        if (error) {
          console.error(error)
          toast.error("Failed to delete post.")
          return
        }

        toast.success("Blog post deleted.")
      },
    })
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl transition bg-white dark:bg-gray-900">
      <Link href={`/blog/${slug}`}>
        {/* cover image */}
        <div className="relative h-52 w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="p-5 space-y-3">
          <h3 className="font-bold text-xl">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {description}
          </p>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Posted: {new Date(created_at).toLocaleDateString()}
          </span>
        </div>
      </Link>

      {isAdmin && (
        <div className="absolute top-3 right-3 flex gap-2 z-20">
          <Link
            href={`/admin/posts/${id}`}
            className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700">
            Edit
          </Link>

          <button
            onClick={openDeleteModal}
            className="px-3 py-1 rounded-lg text-xs font-semibold bg-red-600 text-white hover:bg-red-700">
            Delete
          </button>
        </div>
      )}
    </div>
  )
}
