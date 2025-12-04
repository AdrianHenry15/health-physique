"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import React from "react"

interface IThemeSelectorProps {
  closeMenu: () => void
  onActivate: (
    fn: () => void
  ) => (e: React.KeyboardEvent | React.MouseEvent) => void
}

const ThemeSelector = ({ closeMenu, onActivate }: IThemeSelectorProps) => {
  const { theme, setTheme } = useTheme()

  // Toggle logic: light → dark, dark → light
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    closeMenu()
  }

  return (
    <div className="border-b px-1 border-neutral-100 dark:border-neutral-800 pb-2 mb-2">
      <h5 className="ml-2 mb-1 mt-2 text-xs text-neutral-500 dark:text-neutral-400">
        Theme
      </h5>

      <button
        role="menuitem"
        tabIndex={0}
        className="w-full text-left px-3 py-2 my-1 text-sm rounded-md flex items-center gap-2 cursor-pointer transition-colors text-black dark:text-white hover:bg-blue-500 hover:text-white"
        onClick={toggleTheme}
        onKeyDown={onActivate(toggleTheme)}>
        {theme === "dark" ? (
          <>
            <Sun size={16} /> Light Mode
          </>
        ) : (
          <>
            <Moon size={16} /> Dark Mode
          </>
        )}
      </button>
    </div>
  )
}

export default ThemeSelector
