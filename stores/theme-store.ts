import { create } from "zustand"

type ThemeState = {
  theme: "light" | "dark"
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  toggleTheme: () =>
    set((s) => ({ theme: s.theme === "light" ? "dark" : "light" })),
}))
