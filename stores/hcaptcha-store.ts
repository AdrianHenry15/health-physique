import { create } from "zustand"

export interface HCaptchaState {
  token: string | null
  setToken: (token: string | null) => void
  reset: () => void
}

export const useHCaptchaStore = create<HCaptchaState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  reset: () => set({ token: null }),
}))
