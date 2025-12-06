/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useRouter } from "next/navigation"
import { useModalStore } from "@/stores/modal-store"
import toast from "react-hot-toast"

export function useDeleteQuote() {
  const router = useRouter()
  const { openModal } = useModalStore()

  /** Reusable delete function */
  const deleteQuote = (quoteId: string, options?: { redirectTo?: string }) => {
    openModal("confirm", {
      title: "Delete This Motivational Quote?",
      message:
        "This action cannot be undone. Are you sure you want to permanently delete this quote?",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/admin/quotes/${quoteId}`, {
            method: "DELETE",
          })

          if (!res.ok) {
            const data = await res.json().catch(() => null)
            throw new Error(data?.error || "Failed to delete quote.")
          }

          toast.success("Quote deleted.")

          // Optional redirect
          if (options?.redirectTo) {
            router.push(options.redirectTo)
          }

          router.refresh()
        } catch (err: any) {
          console.error("❌ Delete error:", err)
          toast.error(err.message || "Failed to delete quote.")
        }
      },
    })
  }

  return { deleteQuote }
}
