"use client"

import { useModalStore } from "@/stores/modal-store"
import ConfirmDeleteModal from "./confirmation-modal"

export default function ModalRoot() {
  const { modalType, isOpen } = useModalStore()

  if (!isOpen || !modalType) return null

  switch (modalType) {
    case "confirm":
      return <ConfirmDeleteModal />
    default:
      return null
  }
}
