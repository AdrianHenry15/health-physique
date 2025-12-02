import { create } from "zustand"

type UIState = {
  theme: "light" | "dark"
  toggleTheme: () => void
}

export const useUIStore = create<UIState>((set) => ({
  theme: "light",
  toggleTheme: () =>
    set((s) => ({ theme: s.theme === "light" ? "dark" : "light" })),
}))
