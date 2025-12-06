"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useAuthStore } from "@/stores/auth-store"
import type { MotivationalQuote } from "@/lib/types"
import { useDeleteQuote } from "@/hooks/use-delete-quote"

type QuoteFormProps = {
  initialData?: MotivationalQuote
  isEditing?: boolean
}

export default function QuoteForm({
  initialData,
  isEditing = false,
}: QuoteFormProps) {
  const router = useRouter()
  const { user, isAdmin, loading: authLoading } = useAuthStore()
  const { deleteQuote } = useDeleteQuote()
  const [text, setText] = useState(initialData?.text || "")
  const [saving, setSaving] = useState(false)

  // If initialData changes (e.g. edit page), sync state
  useEffect(() => {
    if (initialData) {
      setText(initialData.text || "")
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (authLoading) {
      toast.error("Checking authentication, please wait.")
      return
    }

    if (!user || !isAdmin) {
      toast.error("You must be an admin to manage motivational quotes.")
      return
    }

    if (!text.trim()) {
      toast.error("Quote text is required.")
      return
    }

    setSaving(true)
    const loadingToast = toast.loading(
      isEditing ? "Updating quote..." : "Saving quote..."
    )

    try {
      const payload = {
        text: text.trim(),
      }

      let res: Response

      if (isEditing && initialData) {
        res = await fetch(`/api/admin/quotes/${initialData.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      } else {
        res = await fetch("/api/admin/quotes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      }

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || "Failed to save quote.")
      }

      toast.success(isEditing ? "Quote updated!" : "Quote created!", {
        id: loadingToast,
      })

      // Redirect to a quotes admin list page (adjust path if needed)
      router.push("/admin/quotes")
      router.refresh()
    } catch (err: any) {
      console.error("❌ Save error:", err)
      toast.error(err.message || "Failed to save quote.", { id: loadingToast })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = () => {
    if (!initialData) return

    deleteQuote(initialData.id, {
      redirectTo: "/admin/quotes",
    })
  }

  // If user is not admin, show message
  if (!authLoading && (!user || !isAdmin)) {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          {isEditing ? "Edit Motivational Quote" : "Create Motivational Quote"}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300">
          You must be an admin to manage motivational quotes.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto py-24 px-4 sm:px-6">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
        {isEditing ? "Edit Motivational Quote" : "Create Motivational Quote"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Quote text */}
        <div className="space-y-2">
          <label className="font-semibold text-base sm:text-lg">
            Quote
            <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border bg-white dark:bg-neutral-900 text-sm sm:text-base"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. Discipline beats motivation."
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-4">
          {/* Primary submit button */}
          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 transition cursor-pointer">
            {saving
              ? isEditing
                ? "Updating..."
                : "Saving..."
              : isEditing
              ? "Update Quote"
              : "Create Quote"}
          </button>

          {/* Delete button only in edit mode */}
          {isEditing && initialData && (
            <button
              type="button"
              onClick={handleDelete}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-red-500 text-red-600 font-semibold hover:bg-red-50 dark:hover:bg-red-950/40 transition cursor-pointer">
              Delete Quote
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
