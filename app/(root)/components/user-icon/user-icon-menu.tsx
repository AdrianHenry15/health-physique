/* eslint-disable react-hooks/refs */

"use client"

import { useAuthStore } from "@/stores/auth-store"
import { LogOut, User } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useEffect, useRef } from "react"

interface IUserIconMenuProps {
  closeMenu: () => void
}

const UserIconMenu = ({ closeMenu }: IUserIconMenuProps) => {
  const router = useRouter()
  const menuRef = useRef<HTMLDivElement | null>(null)
  const { user, signOut } = useAuthStore()

  const closeMenuRef = useRef(closeMenu)
  closeMenuRef.current = closeMenu

  useEffect(() => {
    const el = menuRef.current
    const firstFocusable = el?.querySelector<HTMLElement>(
      'button[role="menuitem"], a[role="menuitem"], [tabindex="0"]'
    )
    firstFocusable?.focus()

    const onDocClick = (e: MouseEvent) => {
      if (!menuRef.current) return
      if (e.target instanceof Node && !menuRef.current.contains(e.target)) {
        closeMenuRef.current()
      }
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenuRef.current()
    }

    document.addEventListener("click", onDocClick)
    document.addEventListener("keydown", onKey)

    return () => {
      document.removeEventListener("click", onDocClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [])

  const onActivate =
    (fn: () => void) => (e: React.KeyboardEvent | React.MouseEvent) => {
      if ("key" in e && (e as React.KeyboardEvent).key) {
        const key = (e as React.KeyboardEvent).key
        if (key !== "Enter" && key !== " ") return
        e.preventDefault()
      }
      fn()
    }

  const handleSignOut = async () => {
    closeMenu()
    try {
      await signOut()
      router.refresh()
    } catch {
      router.refresh()
    }
  }

  // NOT SIGNED IN --------------------------------------------------------------
  if (!user) {
    return (
      <div
        ref={menuRef}
        className="z-50 w-56 origin-top-right bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md shadow-lg absolute right-0 top-full mt-2 ring-1 ring-black/5 dark:ring-white/5"
        role="menu"
        aria-label="User menu">
        <div className="px-2 py-2 flex flex-col gap-1">
          <button
            role="menuitem"
            tabIndex={0}
            className="w-full text-left px-3 py-2 text-sm rounded-md text-black hover:text-white hover:bg-blue-500 dark:hover:bg-blue-900 dark:text-white cursor-pointer transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => {
              closeMenu()
              router.push("/sign-in")
            }}
            onKeyDown={onActivate(() => {
              closeMenu()
              router.push("/sign-in")
            })}>
            Sign In / Sign Up
          </button>
        </div>
      </div>
    )
  }

  // SIGNED-IN ------------------------------------------------------------------
  return (
    <div
      ref={menuRef}
      className="z-50 w-56 origin-top-right bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md shadow-lg absolute right-0 top-full mt-2 ring-1 ring-black/5 dark:ring-white/5"
      role="menu"
      aria-label="User menu">
      {/* USER HEADER */}
      <div className="flex items-center gap-2 px-3 py-3 border-b border-neutral-100 dark:border-neutral-800">
        <div className="w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-100">
          <User size={15} />
        </div>
        <div className="flex flex-col text-xs">
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            {user.email}
          </span>
        </div>
      </div>

      <div className="flex flex-col px-1 py-1">
        {/* Profile */}
        <button
          role="menuitem"
          tabIndex={0}
          className="w-full text-left px-3 py-2 text-sm rounded-md text-black hover:text-white hover:bg-blue-500 dark:hover:bg-blue-900 dark:text-white cursor-pointer transition-colors duration-150 flex items-center gap-2"
          onClick={() => {
            closeMenu()
            router.push("/profile")
          }}
          onKeyDown={onActivate(() => {
            closeMenu()
            router.push("/profile")
          })}>
          <User size={16} /> My Profile
        </button>

        <div className="my-1 border-t border-neutral-100 dark:border-neutral-800" />

        {/* Sign Out */}
        <button
          role="menuitem"
          tabIndex={0}
          className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 cursor-pointer transition-colors duration-150 flex items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          onClick={handleSignOut}
          onKeyDown={onActivate(handleSignOut)}>
          <LogOut size={16} /> Log Out
        </button>
      </div>
    </div>
  )
}

export default UserIconMenu
