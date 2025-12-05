/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand"

type ModalType = "confirm" | null

interface ModalState {
  isOpen: boolean
  modalType: ModalType
  modalData: any
  openModal: (type: ModalType, data?: any) => void
  closeModal: () => void
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  modalType: null,
  modalData: null,

  openModal: (type, data) =>
    set({ isOpen: true, modalType: type, modalData: data }),
  closeModal: () => set({ isOpen: false, modalType: null, modalData: null }),
}))
