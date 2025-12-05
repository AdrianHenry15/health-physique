"use client"

import { useModalStore } from "@/stores/modal-store"
import toast from "react-hot-toast"
import { useState } from "react"

export default function ConfirmModal() {
  const { isOpen, modalType, modalData, closeModal } = useModalStore()
  const [loading, setLoading] = useState(false)

  if (!isOpen || modalType !== "confirm") return null

  const {
    title = "Are you sure?",
    message = "This action cannot be undone.",
    onConfirm,
  } = modalData || {}

  const handleConfirm = async () => {
    if (!onConfirm) return

    setLoading(true)
    try {
      await onConfirm()
      closeModal()
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-3">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          {/* Cancel */}
          <button
            onClick={closeModal}
            disabled={loading}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            Cancel
          </button>

          {/* Confirm */}
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition">
            {loading ? "Working…" : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  )
}
