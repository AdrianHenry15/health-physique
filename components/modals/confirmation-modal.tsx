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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      {/* px-4 above gives side padding on mobile */}
      <div
        className="
          w-full max-w-md 
          rounded-2xl 
          bg-white dark:bg-neutral-900 
          shadow-xl 
          p-4 sm:p-6 
          mx-auto
        ">
        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{title}</h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
          {message}
        </p>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
          {/* Cancel */}
          <button
            onClick={closeModal}
            disabled={loading}
            className="
              w-full sm:w-auto 
              px-4 py-2 
              rounded-lg 
              border border-gray-300 dark:border-gray-700 
              hover:bg-gray-100 dark:hover:bg-gray-800 
              transition
            ">
            Cancel
          </button>

          {/* Confirm */}
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="
              w-full sm:w-auto 
              px-4 py-2 
              rounded-lg 
              bg-red-600 text-white 
              hover:bg-red-700 
              disabled:opacity-50 
              transition
            ">
            {loading ? "Working…" : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  )
}
