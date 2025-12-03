"use client"

import { useState, memo, useEffect } from "react"
import Image from "next/image"
import UserIconMenu from "./user-icon-menu"
import { useAuthStore } from "@/stores/auth-store"

const UserIcon = () => {
  // Use auth context instead of local queries
  const { user, loading } = useAuthStore()

  const isLoading = loading

  // simple dropdown state (no body padding manipulation)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // Ask the browser to reserve scrollbar gutter space so showing/hiding
    // scrollbars won't change layout width (prevents page shift).
    try {
      if (typeof document !== "undefined" && document.documentElement?.style) {
        document.documentElement.style.setProperty("scrollbar-gutter", "stable")
      }
    } catch {
      /* ignore */
    }
    // cleanup on unmount: remove the property we set
    return () => {
      try {
        if (
          typeof document !== "undefined" &&
          document.documentElement?.style
        ) {
          document.documentElement.style.removeProperty("scrollbar-gutter")
        }
      } catch {
        /* ignore */
      }
    }
  }, [])

  // simplified open/close/toggle
  const closeMenu = () => setMenuOpen(false)
  const toggleMenu = () => setMenuOpen((s) => !s)

  if (isLoading) {
    return (
      <div className="w-full flex justify-end flex-1 relative">
        <div className="w-8 h-8 animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded-full" />
      </div>
    )
  }

  return (
    <div className="relative flex justify-end">
      <button
        className="flex cursor-pointer items-center gap-2 p-1 transition-colors rounded-full duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:outline-none"
        aria-label={`User menu for ${user?.email}`}
        aria-expanded={menuOpen}
        type="button"
        onClick={toggleMenu}>
        <Image
          width={32}
          height={32}
          quality={75}
          priority={false}
          src={"/user-default-image.png"}
          alt={`${user?.email || "User"} avatar`}
          className="w-8 h-8 p-1 rounded-full border-2 bg-neutral-100 dark:bg-neutral-600"
          sizes="32px"
        />
      </button>

      {menuOpen && <UserIconMenu closeMenu={closeMenu} />}
    </div>
  )
}

export default memo(UserIcon)
